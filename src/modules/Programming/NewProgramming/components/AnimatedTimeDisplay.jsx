import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, styled, Tooltip, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha } from '@mui/material/styles';

const calcularTiempoTranscurridoDetallado = (fechaRegistro) => {
    const fechaInicio = new Date(fechaRegistro);
    const fechaActual = new Date();

    if (isNaN(fechaInicio.getTime())) {
        return { totalHoras: 0, dias: 0, horas: 0, esValido: false, esFuturo: false };
    }

    const diferenciaMs = fechaActual.getTime() - fechaInicio.getTime();

    if (diferenciaMs < 0) {
        return { totalHoras: 0, dias: 0, horas: 0, esValido: true, esFuturo: true };
    }

    const totalHoras = Math.floor(diferenciaMs / (1000 * 60 * 60));
    const dias = Math.floor(totalHoras / 24);
    const horas = totalHoras % 24;

    return { totalHoras, dias, horas, esValido: true, esFuturo: false };
};

const TimeDisplayContainer = styled(Box)(({ timeColor, theme }) => ({
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

const numberVariants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } }
};

const AnimatedTimeDisplay = ({ fechaRegistro }) => {
    const theme = useTheme();

    const [timeState, setTimeState] = useState(() => {
        const initialTime = calcularTiempoTranscurridoDetallado(fechaRegistro);
        return {
            ...initialTime,
            dayKey: `d-${initialTime.dias}`,
            hourKey: `h-${initialTime.horas}`,
        };
    });

    useEffect(() => {
        const actualizarReloj = () => {
            const newTimeParts = calcularTiempoTranscurridoDetallado(fechaRegistro);

            setTimeState(prev => {
                let newDayKey = prev.dayKey;
                let newHourKey = prev.hourKey;

                if (newTimeParts.dias !== prev.dias) {
                    newDayKey = `d-${newTimeParts.dias}`;
                    newHourKey = `h-${newTimeParts.horas}`;
                } else if (newTimeParts.horas !== prev.horas) {
                    newHourKey = `h-${newTimeParts.horas}`;
                }

                return {
                    ...newTimeParts,
                    dayKey: newDayKey,
                    hourKey: newHourKey
                };
            });
        };

        // Actualiza de inmediato (corrige el caso en que fechaRegistro cambia
        // y el valor inicial quedaba desactualizado hasta el primer tick)
        actualizarReloj();

        // Intervalo cada minuto es suficiente para una unidad mínima de "horas",
        // pero se reduce el riesgo de desfases largos vs. el original de 60s
        const intervalId = setInterval(actualizarReloj, 60 * 1000);

        return () => clearInterval(intervalId);
    }, [fechaRegistro]);

    const { totalHoras, dias, horas, esValido, esFuturo } = timeState;

    const timeColor = (() => {
        if (!esValido || esFuturo) {
            return theme.palette.text.disabled;
        }
        if (totalHoras >= 48) {
            // 2 días o más
            return theme.palette.error.main;
        } else if (totalHoras >= 24) {
            // entre 1 y 2 días
            return theme.palette.warning.main;
        } else {
            // menos de 24 horas
            return theme.palette.success.main;
        }
    })();

    if (!esValido) {
        return (
            <Tooltip placement="top" title="Fecha de registro inválida">
                <TimeDisplayContainer timeColor={timeColor}>
                    <AccessTimeIcon sx={{ color: timeColor, fontSize: 18, mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: timeColor }}>
                        Sin datos
                    </Typography>
                </TimeDisplayContainer>
            </Tooltip>
        );
    }

    if (esFuturo) {
        return (
            <Tooltip placement="top" title="La fecha de registro es posterior a la fecha actual">
                <TimeDisplayContainer timeColor={timeColor}>
                    <AccessTimeIcon sx={{ color: timeColor, fontSize: 18, mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: timeColor }}>
                        Pendiente
                    </Typography>
                </TimeDisplayContainer>
            </Tooltip>
        );
    }

    const { dayKey, hourKey } = timeState;
    const sinTiempo = dias === 0 && horas === 0;

    return (
        <Tooltip placement="top" title="Tiempo transcurrido desde el registro de atención">
            <TimeDisplayContainer
                timeColor={timeColor}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AccessTimeIcon sx={{ color: timeColor, fontSize: 18, mr: 1, transition: 'color 0.5s ease' }} />

                {dias > 0 && (
                    <>
                        <AnimatePresence mode="wait">
                            <NumberWrapper key={dayKey} variants={numberVariants} initial="enter" animate="center" exit="exit">
                                <Typography variant="subtitle2" fontWeight="bold" component="span" sx={{ color: timeColor }}>
                                    {dias}
                                </Typography>
                            </NumberWrapper>
                        </AnimatePresence>
                        <Typography variant="subtitle2" sx={{ mx: 0.5, color: theme.palette.text.primary }}>
                            {dias === 1 ? 'día' : 'días'}
                        </Typography>
                    </>
                )}

                {(horas > 0 || dias === 0) && (
                    <>
                        <AnimatePresence mode="wait">
                            <NumberWrapper key={hourKey} variants={numberVariants} initial="enter" animate="center" exit="exit">
                                <Typography variant="subtitle2" fontWeight="bold" component="span" sx={{ color: timeColor }}>
                                    {horas}
                                </Typography>
                            </NumberWrapper>
                        </AnimatePresence>
                        <Typography variant="subtitle2" sx={{ ml: 0.5, color: theme.palette.text.primary }}>
                            {horas === 1 ? 'hr' : 'hrs'}
                        </Typography>
                    </>
                )}

                {sinTiempo && (
                    <Typography variant="subtitle2" sx={{ ml: 0.5, color: theme.palette.text.secondary }}>
                        Recién registrado
                    </Typography>
                )}
            </TimeDisplayContainer>
        </Tooltip>
    );
};

export default memo(AnimatedTimeDisplay, (prevProps, nextProps) => {
    return prevProps.fechaRegistro === nextProps.fechaRegistro;
});