import {
    Business as BusinessIcon,
    CalendarToday as CalendarTodayIcon,
    GroupWorkTwoTone as GroupWorkTwoToneIcon,
    ScheduleTwoTone as ScheduleTwoToneIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import { ViewFormat } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import InvestigationProgress from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/InvestigationProgress';
import { OptionsMenuCard } from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/OptionsMenu';
import { StyledChip } from 'modules/Programming/NewProgramming/components/methods';
import { getStatusConfig } from '../methods';

const variants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 120,
            damping: 15,
        },
    }),
};

const ViewCard = ({ dataInfo, onClickOpenChat }) => {
    const statusConfig = getStatusConfig(dataInfo.estadoInvestigacion);

    return (
        <Card
            sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
                position: 'relative',
                '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px) scale(1.01)',
                    transition: 'all 0.3s ease',
                },
            }}
        >
            <CardHeader
                title={dataInfo.usuarioCierreAtencion && (
                    <Tooltip placement="top" title="Usuario atendiendo">
                        <StyledChip
                            label={dataInfo.usuarioCierreAtencion}
                            timeColor="#f3e6d9"
                        />
                    </Tooltip>
                )}
                action={<OptionsMenuCard idAsignacion={dataInfo.id} />}
                sx={{
                    backgroundColor: "primary.main",
                    color: 'white',
                    textAlign: 'left',
                    py: 2.5,
                    px: 2,
                    position: 'relative',
                    '& .MuiCardHeader-action': {
                        alignSelf: 'center',
                        marginTop: 0,
                        marginRight: 0,
                    },
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    top: '-45px',
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        width: 90,
                        height: 90,
                        flexShrink: 0,
                    }}
                >
                    <Avatar
                        src={dataInfo.foto}
                        alt={dataInfo.nombreEmpleado}
                        sx={{
                            width: '100%',
                            height: '100%',
                            fontSize: '2rem',
                            border: '2px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            borderRadius: '16px',
                        }}
                    >
                        {dataInfo.nombreEmpleado?.charAt(0)}
                    </Avatar>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        right: 16,
                        bottom: 0,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    <Tooltip placement="top" title="Asistente de SIISO">
                        <IconButton
                            onClick={() => onClickOpenChat(true, { documento: dataInfo.documento, nameEmpleado: dataInfo.nombreEmpleado })}
                            sx={{
                                bgcolor: 'white',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                '&:hover': { bgcolor: '#f5f5f5' },
                                width: 35,
                                height: 35,
                            }}
                        >
                            <Iconify icon="hugeicons:artificial-intelligence-08" sx={{ color: "primary.main" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <CardContent sx={{ p: 2.5, pt: 0, position: 'relative', top: '-28px', mb: -4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        C.C.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dataInfo.documento}
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                    noWrap
                >
                    {dataInfo.nombreEmpleado}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {dataInfo.nombreSexo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dataInfo.edad} años
                    </Typography>
                </Box>

                <InvestigationProgress config={statusConfig} />

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: '14px' }} />
                            <Typography variant="caption" color="text.secondary">
                                Fecha:
                            </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium" noWrap>
                            {ViewFormat(dataInfo.fecha)}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <BusinessIcon sx={{ color: 'primary.800', fontSize: '14px' }} />
                            <Typography variant="caption" color="text.secondary">
                                EPS:
                            </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium" noWrap textTransform="capitalize">
                            {dataInfo.nombreEPS}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ScheduleTwoToneIcon sx={{ color: 'secondary.200', fontSize: '14px' }} />
                            <Typography variant="caption" color="text.secondary">
                                Turno:
                            </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium" noWrap>
                            {dataInfo.nombreTurno || 'Sin registro'}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <GroupWorkTwoToneIcon sx={{ color: 'warning.main', fontSize: '14px' }} />
                            <Typography variant="caption" color="text.secondary">
                                Grupo:
                            </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium" noWrap>
                            {dataInfo.nombreGrupo}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <WorkIcon sx={{ color: 'success.main', fontSize: '14px' }} />
                            <Typography variant="caption" color="text.secondary">
                                Roster position:
                            </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium" noWrap>
                            {dataInfo?.nombreRoster}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ViewCard;