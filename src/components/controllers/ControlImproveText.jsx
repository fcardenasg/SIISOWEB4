import { Collapse, Fade, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ImproveTextAndWriting } from 'api/clients/ServiceIAClient';
import Iconify from 'components/iconify/iconify';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import AnimateButton from 'ui-component/extended/AnimateButton';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const ControlImproveText = ({ textImprove, improvingText, nameControl, setValue, promptIsHtml }) => {
    async function serviceImproveText() {
        improvingText.onTrue();

        const prompt = `Actúa como un experto en redacción. Mejora la ortografía, gramática y signos de 
        puntuación del siguiente texto: ${textImprove}. Devuelve únicamente el texto corregido, sin introducciones, 
        conclusiones ni comentarios adicionales. ${promptIsHtml}`;

        try {
            const aiText = await ImproveTextAndWriting(prompt);
            if (aiText.data.exito) {
                setValue(nameControl, aiText.data.datos);
                toast.success("Redacción mejorada correctamente", {
                    icon: '📝',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.error(aiText.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al conectar con el servicio de IA");
        } finally {
            setTimeout(() => {
                improvingText.onFalse();
            }, 400);
        }
    }

    return (
        <AnimateButton>
            <Tooltip title={!textImprove ? 'Ingrese un texto para mejorar' : 'Mejorar redacción y ortografía con IA'} placement="top" disableInteractive>
                <span>
                    <IconButton
                        disabled={!textImprove || improvingText.value}
                        onClick={serviceImproveText}
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
    )
}

export default ControlImproveText;

export const AIProcessingStatus = ({ isProcessing }) => {
    const [visible, setVisible] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (isProcessing) {
            setVisible(true);
            setFinished(false);
        } else if (visible) {
            setFinished(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isProcessing, visible]);

    return (
        <Collapse in={visible}>
            <Fade in={visible}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        pt: 2, pb: 1, px: 1,
                        color: finished ? 'success.main' : 'error.main',
                        transition: 'color 0.3s ease',
                    }}
                >
                    <Iconify
                        icon={isProcessing ? "svg-spinners:ring-resize" : "solar:check-circle-bold"}
                        width={20}
                        sx={{ animation: isProcessing ? `${pulse} 1.5s infinite` : 'none' }}
                    />

                    <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {isProcessing ? "Optimizando redacción..." : "¡Redacción mejorada con éxito!"}
                    </Typography>
                </Stack>
            </Fade>
        </Collapse>
    );
};