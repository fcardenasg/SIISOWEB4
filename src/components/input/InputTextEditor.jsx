import { Box, FormHelperText, Grid, IconButton, InputLabel, Stack, Tooltip } from "@mui/material";
import { ImproveTextAndWriting } from "api/clients/ServiceIAClient";
import { AIProcessingStatus } from "components/controllers/ControlImproveText";
import ControlVoiceDictation from "components/controllers/ControlVoiceDictation";
import Iconify from "components/iconify/iconify";
import config from "config";
import { useBoolean } from "hooks/use-boolean";
import { useMemo, useRef, useState, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AnimateButton from "ui-component/extended/AnimateButton";

const FULL_TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["image"],
    ["blockquote"],
];

export default function InputTextEditor({ name, label, defaultValue = "", disabled = false }) {
    const { control, setValue } = useFormContext();
    const improvingText = useBoolean(false);
    const isSpeaking = useBoolean(false);

    const quillRef = useRef(null);
    const audioRef = useRef(null);
    const lastInterimLengthRef = useRef(0);

    const [selectedRange, setSelectedRange] = useState(null);

    const [hasPlainText, setHasPlainText] = useState(() => {
        const safeValue = defaultValue || "";
        return !!safeValue.replace(/<[^>]*>/g, '').trim().length;
    });

    const modules = useMemo(() => ({
        toolbar: FULL_TOOLBAR_OPTIONS,
    }), []);

    const updateHasTextState = useCallback((content) => {
        const safeContent = content || "";
        const isCurrentlyEmpty = safeContent.replace(/<[^>]*>/g, '').trim().length === 0;
        if (hasPlainText === isCurrentlyEmpty) {
            setHasPlainText(!isCurrentlyEmpty);
        }
    }, [hasPlainText]);

    const handleSelectionChange = (range) => {
        if (range && range.length > 0) {
            setSelectedRange(range);
        } else {
            setSelectedRange(null);
        }
    };

    const handleSpeak = async () => {
        if (isSpeaking.value) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            isSpeaking.onFalse();
            return;
        }

        const editor = quillRef.current?.getEditor();
        if (!editor) return;

        const plainText = editor.getText().trim();
        if (!plainText) return;

        isSpeaking.onTrue();

        try {
            const API_KEY = config.apiKeySpeech.elevenlabs;
            const VOICE_ID = "W1hAcdh0RNsPYUA7fkJh";
            const MODEL_ID = "eleven_flash_v2_5";

            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': API_KEY,
                },
                body: JSON.stringify({
                    text: plainText,
                    model_id: MODEL_ID,
                    voice_settings: { stability: 0.45, similarity_boost: 0.55 }
                }),
            });

            if (!response.ok) throw new Error('Error en ElevenLabs');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audioRef.current = audio;

            audio.onended = () => {
                isSpeaking.onFalse();
                audioRef.current = null;
                URL.revokeObjectURL(url);
            };

            audio.onerror = () => {
                isSpeaking.onFalse();
                audioRef.current = null;
                toast.error("Error al reproducir audio");
            };

            audio.play();
        } catch (error) {
            console.error(error);
            toast.error("Error al generar audio");
            isSpeaking.onFalse();
        }
    };

    const handleVoiceResult = (transcript, isFinal) => {
        const editor = quillRef.current.getEditor();
        const selection = editor.getSelection() || { index: editor.getLength(), length: 0 };
        const cursorIndex = selection.index;

        if (lastInterimLengthRef.current > 0) {
            editor.deleteText(cursorIndex - lastInterimLengthRef.current, lastInterimLengthRef.current);
        }

        const textToInsert = isFinal ? transcript + " " : transcript;
        const newInsertIndex = cursorIndex - lastInterimLengthRef.current;
        editor.insertText(newInsertIndex, textToInsert);
        editor.setSelection(newInsertIndex + textToInsert.length);

        if (isFinal) {
            lastInterimLengthRef.current = 0;
            const content = editor.root.innerHTML;
            setValue(name, content, { shouldValidate: true, shouldDirty: true });
            updateHasTextState(content);
        } else {
            lastInterimLengthRef.current = textToInsert.length;
        }
    };

    const handleImproveSelection = async () => {
        if (!selectedRange || selectedRange.length === 0) return;
        improvingText.onTrue();

        try {
            const editor = quillRef.current.getEditor();
            const delta = editor.getContents(selectedRange.index, selectedRange.length);
            const tempContainer = document.createElement('div');
            const tempQuill = new ReactQuill.Quill(tempContainer);
            tempQuill.setContents(delta);
            const selectedHtml = tempQuill.root.innerHTML;

            const prompt = `Instrucción: Eres un editor de texto técnico. 
                Tu UNICA tarea es mejorar la redacción y ortografía del HTML proporcionado.
                REGLAS ESTRICTAS:
                - Retorna UNICAMENTE el código HTML mejorado.
                - NO incluyas introducciones (ej. "Aquí tienes...").
                - NO incluyas explicaciones de cambios ni bloques de Markdown (\`\`\`html).
                - Mantén las etiquetas HTML originales.
                
                HTML a procesar: ${selectedHtml}`;

            const response = await ImproveTextAndWriting({ text: prompt });

            if (response.data.exito) {
                let improvedResult = response.data.datos;

                improvedResult = improvedResult
                    .replace(/```html/gi, "")
                    .replace(/```/g, "")
                    .split(/###|Cambios realizados|Explicación/i)[0]
                    .trim();

                editor.deleteText(selectedRange.index, selectedRange.length);
                editor.clipboard.dangerouslyPasteHTML(selectedRange.index, improvedResult);

                const fullContent = editor.root.innerHTML;
                setValue(name, fullContent, { shouldValidate: true, shouldDirty: true });
                updateHasTextState(fullContent);

                toast.success("Redacción mejorada", { icon: '📝' });
                setSelectedRange(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al procesar la mejora");
        } finally {
            setTimeout(() => improvingText.onFalse(), 300);
        }
    };

    return (
        <>
            {label && (
                <InputLabel shrink sx={{ fontSize: "1.1rem", fontWeight: "bold", mb: 1, color: "text.primary", position: "static", transform: "none" }}>
                    {label}
                </InputLabel>
            )}

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Box sx={{
                            "& .ql-toolbar": {
                                borderTopLeftRadius: "8px", borderTopRightRadius: "8px",
                                borderColor: error ? "error.main" : "divider",
                                backgroundColor: "#f8f9fa"
                            },
                            "& .ql-container": {
                                borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px",
                                borderColor: error ? "error.main" : "divider",
                                minHeight: "200px", fontSize: '16px'
                            },
                            "& .ql-editor": { minHeight: "180px" }
                        }}>
                            <ReactQuill
                                ref={quillRef}
                                theme="snow"
                                value={field.value === '<p><br></p>' ? '' : (field.value || "")}
                                onChange={(content) => {
                                    const sanitizedContent = content === '<p><br></p>' ? '' : content;
                                    field.onChange(sanitizedContent);
                                    updateHasTextState(sanitizedContent);
                                }}
                                onBlur={field.onBlur}
                                onChangeSelection={handleSelectionChange}
                                modules={modules}
                                placeholder="Escribe aquí o usa el dictado por voz..."
                                readOnly={disabled || improvingText.value}
                            />
                        </Box>
                        {error && <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>{error.message}</FormHelperText>}
                    </>
                )}
            />

            {!disabled && (
                <Grid container spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Grid item xs={12}>
                        <AIProcessingStatus isProcessing={improvingText.value} />
                    </Grid>

                    <Grid item>
                        <Stack direction="row" spacing={1.5}>
                            <AnimateButton>
                                <Tooltip
                                    title={isSpeaking.value ? "Detener audio" : (hasPlainText ? "Escuchar texto" : "No hay texto")}
                                    placement="top"
                                >
                                    <span>
                                        <IconButton
                                            onClick={handleSpeak}
                                            disabled={improvingText.value || (!hasPlainText && !isSpeaking.value)}
                                            sx={{
                                                width: 42, height: 42, boxShadow: 3, transition: 'all 0.3s ease',
                                                bgcolor: isSpeaking.value ? 'primary.main' : 'background.paper',
                                                color: isSpeaking.value ? 'white' : 'primary.main',
                                                '&:hover': { bgcolor: isSpeaking.value ? 'primary.dark' : 'background.paper', boxShadow: 8 },
                                                ...(isSpeaking.value && {
                                                    animation: 'pulse-blue 1.5s infinite',
                                                    '@keyframes pulse-blue': {
                                                        '0%': { boxShadow: '0 0 0 0px rgba(33, 150, 243, 0.7)' },
                                                        '70%': { boxShadow: '0 0 0 12px rgba(33, 150, 243, 0)' },
                                                        '100%': { boxShadow: '0 0 0 0px rgba(33, 150, 243, 0)' }
                                                    }
                                                })
                                            }}
                                        >
                                            <Iconify
                                                icon={isSpeaking.value ? "solar:stop-circle-bold" : "solar:volume-loud-bold-duotone"}
                                                width={24}
                                            />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </AnimateButton>

                            <AnimateButton>
                                <Tooltip title={improvingText.value ? "Mejorando..." : "Mejorar Selección"} placement="top">
                                    <span>
                                        <IconButton
                                            disabled={!selectedRange || selectedRange.length === 0 || improvingText.value || isSpeaking.value}
                                            onClick={handleImproveSelection}
                                            color="error"
                                            sx={{
                                                width: 42, height: 42, boxShadow: 3, bgcolor: 'background.paper',
                                                '&:hover': { bgcolor: 'background.paper', boxShadow: 8 },
                                                ...(improvingText.value && {
                                                    animation: 'rotate 2s linear infinite',
                                                    '@keyframes rotate': {
                                                        '0%': { transform: 'rotate(0deg)' },
                                                        '100%': { transform: 'rotate(360deg)' }
                                                    }
                                                })
                                            }}
                                        >
                                            <Iconify
                                                icon={improvingText.value ? "eos-icons:loading" : "fluent:draw-text-24-filled"}
                                                width={24}
                                            />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </AnimateButton>

                            <ControlVoiceDictation
                                onTranscript={handleVoiceResult}
                                disabled={selectedRange !== null || improvingText.value || isSpeaking.value}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </>
    );
}