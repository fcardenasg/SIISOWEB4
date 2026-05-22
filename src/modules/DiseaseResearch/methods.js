import { AssignmentLateOutlined, AutoAwesomeOutlined } from '@mui/icons-material';
import { Box, Card, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { motion } from 'framer-motion';

export const DownloadFileBlob = (data, fileName = 'Reporte') => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const urlDownload = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlDownload;
    const fullFileName = `${fileName}${new Date().getTime()}.xlsx`;
    link.setAttribute('download', fullFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlDownload);
};

export const OptionSearch = [
    { value: 1, label: "TODOS" },
    { value: 2, label: "SI" },
    { value: 3, label: "NO" },
    { value: 4, label: "VACÍO" },
]

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

export const RankingAdvisors = ({ data = [] }) => {
    const normalAdvisors = data.filter(item => item.codigo !== 'yes');
    const othersRecord = data.find(item => item.codigo === 'yes');

    const topThree = [...normalAdvisors]
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);

    if (topThree.length === 0 && !othersRecord) return null;

    const getRankStyle = (index) => {
        const styles = [
            { color: '#EAB308', border: '#EAB308', icon: 'solar:crown-bold-duotone' },
            { color: '#64748B', border: '#94A3B8', icon: 'solar:medal-ribbons-star-bold-duotone' },
            { color: '#92400E', border: '#D97706', icon: 'solar:medal-ribbon-bold-duotone' },
        ];
        return styles[index] || styles[2];
    };

    return (
        <Grid container spacing={1.5} alignItems="stretch">
            {topThree.map((asesor, index) => {
                const style = getRankStyle(index);
                return (
                    <Grid item xs={12} sm={6} md={4} lg={othersRecord ? 3 : 4} key={index}>
                        <RankCard
                            label={asesor.label}
                            value={asesor.value}
                            style={style}
                        />
                    </Grid>
                );
            })}

            {othersRecord && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                display: { xs: 'none', lg: 'block' },
                                mr: 1.5,
                                borderStyle: 'dashed'
                            }}
                        />
                        <RankCard
                            label={othersRecord.label}
                            value={othersRecord.value}
                            isSpecial
                            style={{
                                color: '#475569',
                                border: '#CBD5E1',
                                icon: 'solar:user-block-bold-duotone'
                            }}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};

const RankCard = ({ label, value, style, isSpecial = false }) => (
    <Paper
        elevation={0}
        component={motion.div}
        whileHover={{ y: -3 }}
        sx={{
            display: 'flex',
            alignItems: 'center',
            p: '8px 12px',
            height: '100%',
            borderRadius: '10px',
            bgcolor: isSpecial ? '#F1F5F9' : 'white',
            border: '1px solid',
            borderColor: '#E2E8F0',
            borderLeft: `4px solid ${style.border}`,
            boxShadow: isSpecial ? 'none' : '0 2px 4px rgba(0,0,0,0.02)',
        }}
    >
        <Iconify
            icon={style.icon}
            width={22}
            sx={{ color: style.color, mr: 1.5, flexShrink: 0 }}
        />
        <Box sx={{ minWidth: 0 }}>
            <Typography
                noWrap
                sx={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: isSpecial ? '#64748B' : '#1E293B',
                    lineHeight: 1.2,
                    textTransform: 'capitalize'
                }}
            >
                {label?.toLowerCase()}
            </Typography>
            <Typography
                sx={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: style.color,
                }}
            >
                {value} {value === 1 ? 'asesoría' : 'asesorías'}
            </Typography>
        </Box>
    </Paper>
);

export const getSimilarity = (s1, s2) => {
    let longer = s1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    let shorter = s2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    if (longer.length < shorter.length) {
        let tmp = longer;
        longer = shorter;
        shorter = tmp;
    }

    let longerLength = longer.length;
    if (longerLength === 0) return 1.0;

    const editDistance = (s1, s2) => {
        let costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) costs[j] = j;
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };

    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

export const findBestMatch = (list, targetLabel) => {
    if (!list || !targetLabel) return null;

    let bestMatch = null;
    let highestScore = -1;

    list.forEach((item) => {
        const score = getSimilarity(item.label, targetLabel);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
        }
    });

    return highestScore > 0.5 ? bestMatch : null;
};