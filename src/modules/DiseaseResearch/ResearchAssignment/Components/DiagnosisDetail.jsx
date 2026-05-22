import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StyleIcon from '@mui/icons-material/Style';
import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material';

const DiagnosisDetail = ({ data }) => {
    const Label = ({ children }) => (
        <Typography variant="h4" sx={{ mb: 0.7 }}>
            {children}
        </Typography>
    );

    const Value = ({ children }) => (
        <Typography variant="subtitle2">
            {children || '—'}
        </Typography>
    );

    const DictamenBadge = ({ label, value }) => (
        <Box sx={{
            flex: 1,
            p: 1.2,
            bgcolor: value ? '#f0f7ff' : '#f8fafc',
            borderRadius: 2,
            border: '1px solid',
            borderColor: value ? 'primary.100' : 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5
        }}>
            <Typography sx={{ fontSize: '0.55rem', fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase' }}>{label}</Typography>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: value ? 'primary.main' : 'text.disabled' }}>
                {value || ''}
            </Typography>
        </Box>
    );

    return (
        <Paper elevation={0} sx={{
            width: '100%',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: '#ffffff',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease',
            '&:hover': { boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)' }
        }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.50', bgcolor: '#fcfcfd' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, display: 'flex' }}>
                            <HealthAndSafetyIcon sx={{ color: '#fff', fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 900, color: 'primary.main' }}>
                                DX • {data.dx}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                                {data.nombreDx}
                            </Typography>
                        </Box>
                    </Stack>
                    <Chip
                        label="Diagnóstico Registrado"
                        size="small"
                        icon={<StyleIcon sx={{ fontSize: '12px !important' }} />}
                        sx={{ fontWeight: 700, fontSize: '0.65rem', px: 1 }}
                    />
                </Stack>
            </Box>

            <Box sx={{ p: 2.5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Box sx={{ mb: 2.5 }}>
                            <Label>Segmento Agrupado</Label>
                            <Value>{data.nombreSegmentoAgrupado}</Value>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                                <Label>Segmento Afectado</Label>
                                <Value>{data.nombreSegmentoAfectado}</Value>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Label>Subsegmento</Label>
                                <Value>{data.nombreSubsegmento}</Value>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Label>Región</Label>
                                <Value>{data.nombreRegion}</Value>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Label>Lateralidad</Label>
                                <Value>{data.nombreLateralidad}</Value>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ReceiptLongIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                <Typography variant="h4">
                                    Resumen de Dictámenes
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <DictamenBadge label="JRC" value={data.noDictamenJRC} />
                                <DictamenBadge label="JNC" value={data.noDictamenJNC} />
                                <DictamenBadge label="AFP" value={data.noDictamenAFP} />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default DiagnosisDetail;