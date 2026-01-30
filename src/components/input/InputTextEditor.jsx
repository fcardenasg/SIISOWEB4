import { Box, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@mui/material";
import { ImproveTextAndWriting } from "api/clients/ServiceIAClient";
import { AIProcessingStatus } from "components/controllers/ControlImproveText";
import ControlVoiceDictation from "components/controllers/ControlVoiceDictation";
import Iconify from "components/iconify/iconify";
import { useBoolean } from "hooks/use-boolean";
import { useMemo, useRef, useState } from "react";
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
    const quillRef = useRef(null);

    const lastInterimLengthRef = useRef(0);
    const [selectedRange, setSelectedRange] = useState(null);

    const modules = useMemo(() => ({
        toolbar: FULL_TOOLBAR_OPTIONS,
    }), []);

    const handleSelectionChange = (range) => {
        if (range && range.length > 0) {
            setSelectedRange(range);
        } else {
            setSelectedRange(null);
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
            setValue(name, editor.root.innerHTML, { shouldValidate: true, shouldDirty: true });
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

            const prompt = `Instrucción: Eres un editor de texto enriquecido experto. Tu objetivo es mejorar la redacción, gramática y coherencia del texto, y además aplicar un estilo visual profesional.

                REGLAS:
                1. Mantén la estructura de etiquetas original, pero siéntete libre de añadir etiquetas <strong> para resaltar conceptos clave, <em> para énfasis y <span style="color: ..."> para dar un toque de color elegante a palabras importantes.
                2. No apliques estilos a todo el texto; busca un equilibrio que mejore la legibilidad y el impacto visual.
                3. Si detectas texto que represente una lista, asegúrate de usar el formato HTML correcto (<ul>, <ol>, <li>).
                4. Si un <span> existente tiene un atributo 'style', mantenlo o mejóralo si es necesario para la coherencia visual.
                5. Analiza el texto y añade saltos de línea o divisiones de párrafo siempre que lo consideres necesario para mejorar la legibilidad y estructura.
                6. Devuelve EXCLUSIVAMENTE el HTML resultante. No incluyas explicaciones ni bloques de código markdown.

                HTML a procesar:
                ${selectedHtml}`;

            const response = await ImproveTextAndWriting({ text: prompt });

            if (response.data.exito) {
                let improvedResult = response.data.datos;
                improvedResult = improvedResult.replace(/^```html/, "").replace(/```$/, "").trim();

                editor.deleteText(selectedRange.index, selectedRange.length);
                editor.clipboard.dangerouslyPasteHTML(selectedRange.index, improvedResult);

                toast.success("Redacción mejorada", {
                    icon: '📝',
                    style: { borderRadius: '10px', background: '#333', color: '#fff' },
                });

                setSelectedRange(null);
            }
        } catch (error) {
            toast.error("Error al procesar la mejora");
            console.error(error);
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
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                                borderColor: error ? "error.main" : "divider",
                                backgroundColor: "#f8f9fa"
                            },
                            "& .ql-container": {
                                borderBottomLeftRadius: "8px",
                                borderBottomRightRadius: "8px",
                                borderColor: error ? "error.main" : "divider",
                                minHeight: "200px",
                                fontSize: '16px'
                            },
                            "& .ql-editor": { minHeight: "180px" }
                        }}>
                            <ReactQuill
                                ref={quillRef}
                                theme="snow"
                                value={field.value || ""}
                                onChange={(content) => field.onChange(content)}
                                onBlur={field.onBlur}
                                onChangeSelection={handleSelectionChange}
                                modules={modules}
                                placeholder="Escribe aquí o usa el dictado por voz..."
                                readOnly={disabled}
                            />
                        </Box>

                        {error && <FormHelperText error sx={{ ml: 1, mt: 0.5 }}>{error.message}</FormHelperText>}
                    </>
                )}
            />

            {!disabled &&
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <AIProcessingStatus isProcessing={improvingText.value} />
                    </Grid>

                    <Grid item>
                        <AnimateButton>
                            <Tooltip title={improvingText.value ? "Mejorando..." : "Mejorar Selección"} placement="top">
                                <span>
                                    <IconButton
                                        disabled={!selectedRange || selectedRange.length === 0 || improvingText.value}
                                        onClick={handleImproveSelection}
                                        color="error"
                                        sx={{
                                            boxShadow: 3,
                                            bgcolor: 'background.paper',
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
                    </Grid>

                    <Grid item>
                        <ControlVoiceDictation
                            onTranscript={handleVoiceResult}
                            disabled={selectedRange !== null || improvingText.value}
                        />
                    </Grid>
                </Grid>
            }
        </>
    );
}