import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, styled, Tooltip, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha } from '@mui/material/styles';

const calcularTiempoTranscurridoDetallado = (fechaRegistro) => {
    const fechaInicio = new Date(fechaRegistro);
    const fechaActual = new Date();

    if (isNaN(fechaInicio.getTime())) {
        return { totalMinutos: 0, horas: 0, minutos: 0, esValido: false };
    }

    const diferenciaMs = fechaActual.getTime() - fechaInicio.getTime();

    if (diferenciaMs < 0) {
        return { totalMinutos: 0, horas: 0, minutos: 0, esValido: true, esFuturo: true };
    }

    const totalMinutos = Math.floor(diferenciaMs / (1000 * 60));
    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;

    return { totalMinutos, horas, minutos, esValido: true, esFuturo: false };
};

const AnimatedTimeDisplay = ({ fechaRegistro }) => {
    const theme = useTheme();

    const [timeState, setTimeState] = useState(() => {
        const initialTime = calcularTiempoTranscurridoDetallado(fechaRegistro);
        return {
            ...initialTime,
            hourKey: `h-${initialTime.horas}`,
            minuteKey: `m-${initialTime.minutos}`
        };
    });

    const timeColor = (() => {
        if (timeState.totalMinutos >= 40) {
            return theme.palette.error.main;
        } else if (timeState.totalMinutos >= 20) {
            return theme.palette.warning.main;
        } else {
            return theme.palette.success.main;
        }
    })();

    const TimeDisplayContainer = styled(Box)(() => ({
        display: 'inline-flex',
        alignItems: 'center',
        padding: theme.spacing(0.7, 1.5),
        borderRadius: theme.shape.borderRadius * 3,
        border: `2px solid ${timeColor}`,
        backgroundColor: alpha(timeColor, 0.08),
        transition: 'border-color 0.5s ease, background-color 0.5s ease',
    }));

    const NumberWrapper = styled(motion.span)({
        display: 'inline-block',
        minWidth: '20px',
        textAlign: 'center',
    });

    useEffect(() => {
        const actualizarReloj = () => {
            const newTimeParts = calcularTiempoTranscurridoDetallado(fechaRegistro);

            setTimeState(prev => {
                let newHourKey = prev.hourKey;
                let newMinuteKey = prev.minuteKey;

                if (newTimeParts.horas !== prev.horas) {
                    newHourKey = `h-${newTimeParts.horas}`;
                    newMinuteKey = `m-${newTimeParts.minutos}`;
                }
                else if (newTimeParts.minutos !== prev.minutos) {
                    newMinuteKey = `m-${newTimeParts.minutos}`;
                }

                return {
                    ...newTimeParts,
                    hourKey: newHourKey,
                    minuteKey: newMinuteKey
                };
            });
        };

        const intervalId = setInterval(actualizarReloj, 60000);

        return () => clearInterval(intervalId);
    }, [fechaRegistro]);

    const { horas, minutos, hourKey, minuteKey } = timeState;

    const variants = {
        enter: { y: 20, opacity: 0 },
        center: { y: 0, opacity: 1, transition: { duration: 0.3 } },
        exit: { y: -20, opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <Tooltip placement="top" title="Tiempo transcurrido desde el registro de atención">
            <TimeDisplayContainer
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AccessTimeIcon sx={{ color: timeColor, fontSize: 18, mr: 1, transition: 'color 0.5s ease' }} />

                {horas > 0 && (
                    <>
                        <AnimatePresence mode="wait">
                            <NumberWrapper key={hourKey} variants={variants} initial="enter" animate="center" exit="exit">
                                <Typography variant="subtitle2" fontWeight="bold" component="span" sx={{ color: timeColor }}>
                                    {horas}
                                </Typography>
                            </NumberWrapper>
                        </AnimatePresence>
                        <Typography variant="subtitle2" sx={{ mx: 0.5, color: theme.palette.text.primary }}>
                            {horas === 1 ? 'hr' : 'hrs'}
                        </Typography>
                    </>
                )}

                <AnimatePresence mode="wait">
                    <NumberWrapper key={minuteKey} variants={variants} initial="enter" animate="center" exit="exit">
                        <Typography variant="subtitle2" fontWeight="bold" component="span" sx={{ color: timeColor }}>
                            {minutos}
                        </Typography>
                    </NumberWrapper>
                </AnimatePresence>
                <Typography variant="subtitle2" sx={{ ml: 0.5, color: theme.palette.text.primary }}>
                    {minutos === 1 ? 'min' : 'mins'}
                </Typography>
            </TimeDisplayContainer>
        </Tooltip>
    );
};

export default AnimatedTimeDisplay;