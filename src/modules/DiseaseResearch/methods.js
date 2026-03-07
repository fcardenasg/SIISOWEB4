import { AssignmentLateOutlined, AutoAwesomeOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

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

/* const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        padding: '12px',
        border: `1px solid ${theme.palette.divider}`,
    },
    [`& .MuiTooltip-arrow`]: {
        color: theme.palette.background.paper,
        "&::before": { border: `1px solid ${theme.palette.divider}` }
    },
}));

export const LightTooltipExp = ({ listExpertos }) => {
    const totalExpertos = listExpertos.length;

    const renderExpertsTooltip = (expertos) => (
        <Stack spacing={1} sx={{ minWidth: 160 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                Detalle de Asesores
            </Typography>
            <Divider />
            {expertos.map((exp, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                    <Typography sx={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{exp.label?.toLowerCase()}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, bgcolor: 'grey.100', px: 0.8, borderRadius: 0.5 }}>
                        {exp.value}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );

    return (
        <LightTooltip title={renderExpertsTooltip(listExpertos)} arrow placement="left">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: '1.5px solid',
                    borderColor: totalExpertos > 0 ? (isSelected ? 'secondary.main' : 'primary.main') : 'grey.300',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: totalExpertos > 0 ? (isSelected ? 'secondary.main' : 'primary.main') : 'grey.400',
                    fontSize: '0.65rem', fontWeight: 800,
                    lineHeight: 0,
                    transition: 'all 0.2s'
                }}>
                    {totalExpertos}
                </Box>
                <Typography variant="caption" sx={{ color: isSelected ? 'secondary.main' : 'text.secondary', fontWeight: isSelected ? 700 : 500 }}>
                    {totalExpertos === 1 ? 'Asesor' : 'Asesores'}
                </Typography>
            </Box>
        </LightTooltip>
    )
} */