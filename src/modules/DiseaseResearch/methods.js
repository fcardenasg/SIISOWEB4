import { AssignmentLateOutlined, AutoAwesomeOutlined } from '@mui/icons-material';
import { Box, Stack, TableRow, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export const ArrayOptions = [
    { value: 1, label: "DATOS DE LA EMPRESA" },
    { value: 2, label: "HISTORIA LABORAL EN DLTD" },
    { value: 3, label: "HISTORIA LABORAL EN OTRAS EMPRESAS" },
    { value: 4, label: "DATOS DEL DIAGNÓSTICO Y DEL PROCESO DE CALIFICACIÓN" },
    { value: 5, label: "DATOS SOBRE LA EXPOSICIÓN EN LA EMPRESA" },
    { value: 6, label: "MÉTODOS DE CONTROL DISPONIBLES" },
    { value: 7, label: "DATOS CLÍNICOS Y PARACLÍNICOS" },
    { value: 8, label: "ANTECEDENTES PERSONALES, FAMILIARES Y LABORALES" },
    { value: 9, label: "OTROS DATOS CLÍNICOS" },
    { value: 10, label: "CARACTERIZACIÓN DEL AUSENTISMO LABORAL" },
    { value: 11, label: "REVISIÓN DE LA BIBLIOGRAFÍA APLICABLE" },
    { value: 12, label: "ANÁLISIS DE CAUSAS" },
    { value: 13, label: "CAUSA BÁSICA DETECTADA" },
    { value: 14, label: "CONCLUSIÓN" },
    { value: 15, label: "ACCIONES PREVENTIVAS O CORRECTIVAS" }
];

export const ComponentNote = ({ title }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1.5,
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: 'rgba(25, 118, 210, 0.04)',
                borderLeft: '4px solid',
                borderColor: 'primary.main'
            }}
        >
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ lineHeight: 1.5 }}
            >
                <Box component="span" sx={{ fontWeight: 700, color: 'primary.main', mr: 0.5 }}>
                    NOTA:
                </Box>
                {title}
            </Typography>
        </Box>
    );
};

export const EmptyState = ({ title, description }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            gap: 5,
            width: '100%'
        }}
    >
        <Box sx={{ position: 'relative', display: 'flex' }}>
            <AssignmentLateOutlined
                sx={{
                    fontSize: 55,
                    color: 'text.disabled',
                    opacity: 0.4
                }}
            />
            <AutoAwesomeOutlined
                sx={{
                    fontSize: 22,
                    position: 'absolute',
                    top: -15,
                    right: -15,
                    color: 'primary.main',
                    animation: 'pulse 2s infinite ease-in-out',
                    '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', opacity: 1 },
                        '50%': { transform: 'scale(1.2)', opacity: 0.7 },
                        '100%': { transform: 'scale(1)', opacity: 1 },
                    }
                }}
            />
        </Box>

        <Stack spacing={0.5} textAlign="left">
            <Typography variant="h5">
                {title}
            </Typography>

            <Typography
                variant="body2"
                color="text.disabled"
                sx={{ maxWidth: 400, lineHeight: 1.4 }}
            >
                {description}
            </Typography>
        </Stack>
    </Box>
);

export const MotionTableRow = motion(TableRow);