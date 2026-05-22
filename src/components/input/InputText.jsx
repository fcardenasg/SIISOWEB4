import {
    FormHelperText,
    Grid,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    useMediaQuery,
    useTheme,
    Box
} from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ImproveTextAndWriting } from "api/clients/ServiceIAClient";
import { AIProcessingStatus } from "components/controllers/ControlImproveText";
import ControlVoiceDictation from "components/controllers/ControlVoiceDictation";
import Iconify from "components/iconify/iconify";
import { useBoolean } from "hooks/use-boolean";
import AnimateButton from "ui-component/extended/AnimateButton";

const InputText = ({
    bug,
    defaultValue = "",
    label,
    size,
    fullWidth = true,
    name,
    showVoice = false,
    showAI = false,
    disabled = false,
    ...others
}) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { setValue, control } = useFormContext();

    const improvingText = useBoolean(false);
    const [hasSelection, setHasSelection] = useState(false);
    const inputRef = useRef(null);
    const lastInterimLengthRef = useRef(0);

    const checkSelection = () => {
        if (inputRef.current) {
            const { selectionStart, selectionEnd } = inputRef.current;
            setHasSelection(selectionStart !== selectionEnd);
        }
    };

    const handleVoiceResult = (transcript, isFinal) => {
        const input = inputRef.current;
        if (!input) return;

        const start = input.selectionStart;
        const end = input.selectionEnd;
        const fullText = input.value;

        const textBefore = fullText.substring(0, start - lastInterimLengthRef.current);
        const textAfter = fullText.substring(end);

        const textToInsert = isFinal ? transcript + " " : transcript;
        const newValue = textBefore + textToInsert + textAfter;

        setValue(name, newValue, { shouldValidate: true, shouldDirty: true });

        if (isFinal) {
            lastInterimLengthRef.current = 0;
            setTimeout(() => {
                const newPos = textBefore.length + textToInsert.length;
                input.setSelectionRange(newPos, newPos);
                input.focus();
            }, 0);
        } else {
            lastInterimLengthRef.current = textToInsert.length;
        }
    };

    const handleImproveSelection = async () => {
        const input = inputRef.current;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const selectedText = input.value.substring(start, end);

        if (!selectedText.trim()) return;

        improvingText.onTrue();

        try {
            const prompt = `Instrucción: Eres un editor experto. Mejora la redacción y gramática del siguiente texto. 
            Devuelve únicamente el texto corregido en texto plano, sin etiquetas HTML ni Markdown.
            Texto: ${selectedText}`;

            const response = await ImproveTextAndWriting({ text: prompt });

            if (response.data.exito) {
                let improvedResult = response.data.datos;
                improvedResult = improvedResult.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();

                const fullText = input.value;
                const newValue = fullText.substring(0, start) + improvedResult + fullText.substring(end);

                setValue(name, newValue, { shouldValidate: true, shouldDirty: true });
                setHasSelection(false);
                toast.success("Texto mejorado", { icon: '📝' });
            }
        } catch (error) {
            toast.error("Error al mejorar texto");
        } finally {
            setTimeout(() => improvingText.onFalse(), 300);
        }
    };

    return (
        <Grid container spacing={0.5}>
            <Grid item xs={12}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            {...others}
                            inputRef={(e) => {
                                field.ref(e);
                                inputRef.current = e;
                            }}
                            onSelect={checkSelection}
                            onKeyUp={checkSelection}
                            onClick={checkSelection}
                            onBlur={(e) => {
                                field.onBlur(e);
                                setTimeout(() => setHasSelection(false), 200);
                            }}
                            label={label}
                            disabled={disabled || improvingText.value}
                            size={size || (matchesXS ? 'small' : 'medium')}
                            InputLabelProps={{
                                className: bug && 'required-label',
                                required: !!bug
                            }}
                            error={!!bug}
                            fullWidth={fullWidth}
                            sx={{
                                ...(improvingText.value && {
                                    '& .MuiInputBase-root': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.error.light,
                                    }
                                }),
                                ...others.sx
                            }}
                        />
                    )}
                />
            </Grid>

            {bug && (
                <Grid item xs={12}>
                    <FormHelperText error sx={{ ml: 1, mt: 0 }}>{bug.message}</FormHelperText>
                </Grid>
            )}

            {(showVoice || showAI) && !disabled && (
                <Grid item xs={12}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        {showAI && (
                            <AnimateButton>
                                <Tooltip
                                    title={!hasSelection ? "Selecciona texto para mejorar" : (improvingText.value ? "Mejorando..." : "Mejorar Selección")}
                                    placement="top"
                                >
                                    <span>
                                        <IconButton
                                            onClick={handleImproveSelection}
                                            disabled={!hasSelection || improvingText.value}
                                            color="error"
                                            sx={{
                                                width: 42,
                                                height: 42,
                                                boxShadow: hasSelection ? 3 : 0,
                                                bgcolor: 'background.paper',
                                                '&:hover': {
                                                    bgcolor: 'background.paper',
                                                    boxShadow: hasSelection ? 8 : 0
                                                },
                                                '&.Mui-disabled': {
                                                    bgcolor: 'action.disabledBackground',
                                                    color: 'action.disabled'
                                                },
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
                        )}

                        {showVoice && (
                            <ControlVoiceDictation
                                onTranscript={handleVoiceResult}
                                disabled={improvingText.value}
                            />
                        )}

                        {showAI && <AIProcessingStatus isProcessing={improvingText.value} />}
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};

export default InputText;