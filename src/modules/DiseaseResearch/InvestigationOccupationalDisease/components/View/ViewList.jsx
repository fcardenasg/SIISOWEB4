import {
    AssignmentInd as AssignmentIndIcon,
    Badge as BadgeIcon,
    Business as BusinessIcon,
    CalendarMonth as CalendarMonthIcon,
    Close as CloseIcon,
    EmailOutlined as EmailIcon,
    EventBusy as EventBusyIcon,
    LocalHospital as LocalHospitalIcon,
    LocationOn as LocationOnIcon,
    MedicalServices as DxIcon,
    MoreVert as MoreVertIcon,
    PhoneOutlined as PhoneIcon,
    ScheduleTwoTone as ScheduleTwoToneIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Chip,
    Divider,
    IconButton,
    ListItem,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import InvestigationProgress from '../InvestigationProgress';
import OptionsMenu from '../OptionsMenu';
import AnimatedTimeDisplay from 'modules/Programming/NewProgramming/components/AnimatedTimeDisplay';
import { StyledChip } from 'modules/Programming/NewProgramming/components/methods';
import { useState } from 'react';
import { useInvestigationActions } from '../../contexts/InvestigationActionsContext';
import { getStatusConfig } from '../methods';
import EmployeeDetailModal from './EmployeeDetailModal';
import Iconify from 'components/iconify/iconify';

const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

const formatDateShort = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });
};

const calcularAntiguedad = (fechaIngreso) => {
    if (!fechaIngreso) return null;
    const inicio = new Date(fechaIngreso);
    const hoy = new Date();
    const años = hoy.getFullYear() - inicio.getFullYear();
    const meses = hoy.getMonth() - inicio.getMonth();
    const totalMeses = años * 12 + meses;
    if (totalMeses < 1) return 'Recién ingresado';
    const a = Math.floor(totalMeses / 12);
    const m = totalMeses % 12;
    if (a === 0) return `${m} mes${m !== 1 ? 'es' : ''}`;
    if (m === 0) return `${a} año${a !== 1 ? 's' : ''}`;
    return `${a} año${a !== 1 ? 's' : ''} ${m} mes${m !== 1 ? 'es' : ''}`;
};

const InfoChip = ({ icon, label, value, color = 'text.secondary' }) => {
    if (!value) return null;
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: 0.75,
            px: 1.25, py: 0.5, borderRadius: '10px',
            bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.100',
        }}>
            <Box sx={{ display: 'flex', color, fontSize: '15px' }}>{icon}</Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                <Box component="span" sx={{ fontWeight: 600, color: 'text.primary', mr: 0.5 }}>{label}</Box>
                {value}
            </Typography>
        </Box>
    );
};

const ViewList = ({ dataInfo, index }) => {
    const theme = useTheme();
    const { onOpenChat } = useInvestigationActions();
    const statusConfig = getStatusConfig(dataInfo?.estadoInvestigacion);
    const [modalOpen, setModalOpen] = useState(false);

    const antiguedad = calcularAntiguedad(dataInfo?.fechaIngreso);
    const tieneEgreso = !!(dataInfo?.fechaEgreso || dataInfo?.termDate);

    if (!dataInfo) return null;

    return (
        <>
            <ListItem
                key={index}
                sx={{
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    mb: 2,
                    p: 0,
                    pr: 6,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    overflow: 'hidden',
                    alignItems: 'stretch',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        borderColor: 'primary.100',
                    },
                }}
                secondaryAction={
                    <OptionsMenu
                        idInvestigation={dataInfo?.idIEL}
                        idAsignacion={dataInfo?.id}
                        disabledRevisar={dataInfo?.estadoInvestigacion !== 3}
                        estadoInvestigacion={dataInfo?.estadoInvestigacion}
                    />
                }
            >
                <Box
                    sx={{
                        position: 'relative',
                        flexShrink: 0,
                        width: { xs: 130, sm: 165 },
                        alignSelf: 'stretch',
                        borderRight: '1px solid',
                        borderColor: 'grey.100',
                        cursor: 'pointer',
                    }}
                    onClick={() => setModalOpen(true)}
                >
                    <Avatar
                        src={dataInfo?.foto}
                        alt="Foto del empleado"
                        variant="square"
                        sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: 175,
                            position: 'absolute',
                            inset: 0,
                            bgcolor: dataInfo?.foto ? 'grey.200' : alpha(statusConfig.color, 0.12),
                            color: dataInfo?.foto ? 'text.primary' : statusConfig.color,
                            fontSize: '2.75rem',
                            fontWeight: 700,
                            borderRadius: 0,
                            '& .MuiAvatar-img': { objectFit: 'cover' },
                        }}
                    >
                        {!dataInfo?.foto && dataInfo?.nombreEmpleado?.charAt(0).toUpperCase()}
                    </Avatar>

                    {(dataInfo?.nombrePayStatus || dataInfo?.bandera) && (
                        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {dataInfo?.nombrePayStatus && (
                                <Chip
                                    label={dataInfo?.nombrePayStatus}
                                    size="small"
                                    sx={{
                                        height: 20, fontSize: '0.65rem', fontWeight: 700,
                                        bgcolor: alpha('#fff', 0.88),
                                        color: dataInfo?.payStatus === 1 ? 'success.dark' : 'error.dark',
                                        backdropFilter: 'blur(4px)',
                                        border: '1px solid',
                                        borderColor: dataInfo?.payStatus === 1
                                            ? alpha(theme.palette.success.main, 0.4)
                                            : alpha(theme.palette.error.main, 0.4),
                                    }}
                                />
                            )}
                        </Box>
                    )}

                    <Box
                        sx={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            py: 0.6, textAlign: 'center',
                            backgroundColor: alpha(statusConfig.color, 0.88),
                            backdropFilter: 'blur(2px)',
                        }}
                    >
                        <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, fontSize: '0.68rem', letterSpacing: 0.4 }}>
                            {statusConfig.label}
                        </Typography>
                    </Box>
                </Box>

                <ListItemText
                    disableTypography
                    sx={{ m: 0, p: 2.5, minWidth: 0 }}
                    primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
                                    <Typography variant="subtitle1" fontWeight={700} fontSize="1.15rem" color="#1a1a1a">
                                        {dataInfo?.nombreEmpleado}
                                    </Typography>
                                    {dataInfo?.usuarioCierreInvestigacion &&
                                        <Tooltip placement="top" title="Usuario atendiendo">
                                            <StyledChip label={dataInfo?.usuarioCierreInvestigacion} timeColor={theme.palette.success.main} />
                                        </Tooltip>
                                    }
                                </Box>

                                {dataInfo?.nombreRoster && (
                                    <Typography variant="body2" fontWeight={500} color="text.secondary" sx={{ lineHeight: 1.3 }}>
                                        {dataInfo?.nombreRoster}
                                    </Typography>
                                )}

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mt: 0.5, flexWrap: 'wrap', rowGap: 0.5 }}
                                >
                                    {dataInfo?.documento && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
                                            <BadgeIcon sx={{ fontSize: '13px' }} />
                                            <Typography variant="caption">CC {dataInfo?.documento}</Typography>
                                        </Box>
                                    )}
                                    {dataInfo?.empresa && (
                                        <>
                                            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
                                                <BusinessIcon sx={{ fontSize: '13px' }} />
                                                <Typography variant="caption">{dataInfo?.empresa}</Typography>
                                            </Box>
                                        </>
                                    )}
                                    {dataInfo?.nombreArea && (
                                        <>
                                            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
                                                <WorkIcon sx={{ fontSize: '13px' }} />
                                                <Typography variant="caption">{dataInfo?.nombreArea}</Typography>
                                            </Box>
                                        </>
                                    )}
                                    {dataInfo?.nombreTurno && (
                                        <>
                                            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
                                                <ScheduleTwoToneIcon sx={{ fontSize: '13px' }} />
                                                <Typography variant="caption">{dataInfo?.nombreTurno}</Typography>
                                            </Box>
                                        </>
                                    )}
                                    {dataInfo?.nombreSede && (
                                        <>
                                            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: 'text.secondary' }}>
                                                <LocationOnIcon sx={{ fontSize: '13px' }} />
                                                <Typography variant="caption">{dataInfo?.nombreSede}</Typography>
                                            </Box>
                                        </>
                                    )}
                                </Stack>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                                <Tooltip disableInteractive placement="top" title="Asistente de SIISO">
                                    <IconButton
                                        onClick={() => onOpenChat(true, { documento: dataInfo?.documento, nameEmpleado: dataInfo?.nombreEmpleado })}
                                        sx={{
                                            bgcolor: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                            '&:hover': { bgcolor: '#f5f5f5' },
                                            transition: 'transform 0.2s ease-in-out',
                                            '&:hover:not(:active)': { transform: 'scale(1.1)' },
                                            width: 35, height: 35,
                                        }}
                                    >
                                        <Iconify icon="hugeicons:artificial-intelligence-08" sx={{ color: 'primary.main' }} />
                                    </IconButton>
                                </Tooltip>

                                <AnimatedTimeDisplay fechaRegistro={dataInfo?.fechaRegistro} />
                            </Box>
                        </Box>
                    }
                    secondary={
                        <Box sx={{ mt: 1.75, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Typography variant="caption" color="text.disabled">
                                Registrado el {formatDate(dataInfo?.fechaRegistro)}
                                {dataInfo?.usuarioRegistro && ` por ${dataInfo?.usuarioRegistro}`}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <InfoChip
                                    icon={<WorkIcon sx={{ fontSize: 'inherit' }} />}
                                    label="Contrato:"
                                    value={dataInfo?.nombreTipoContrato}
                                    color="info.main"
                                    Sherry />
                                <InfoChip
                                    icon={<WorkIcon sx={{ fontSize: 'inherit' }} />}
                                    label="Grupo:"
                                    value={dataInfo?.nombreGrupo}
                                    color="warning.main"
                                />
                                {antiguedad && (
                                    <InfoChip
                                        icon={<CalendarMonthIcon sx={{ fontSize: 'inherit' }} />}
                                        label="Antiguedad:"
                                        value={antiguedad}
                                        color="success.main"
                                    />
                                )}
                                {tieneEgreso && (
                                    <InfoChip
                                        icon={<EventBusyIcon sx={{ fontSize: 'inherit' }} />}
                                        label="Egreso:"
                                        value={formatDateShort(dataInfo?.fechaEgreso || dataInfo?.termDate)}
                                        color="error.main"
                                    />
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                                <Stack direction="row" spacing={0.75}>
                                    {dataInfo?.celular && (
                                        <Tooltip placement="top" title={`Llamar: ${dataInfo?.celular}`}>
                                            <IconButton
                                                component="a"
                                                href={`tel:${dataInfo?.celular}`}
                                                size="small"
                                                sx={{
                                                    bgcolor: alpha(theme.palette.success.main, 0.08),
                                                    color: 'success.main',
                                                    border: '1px solid',
                                                    borderColor: alpha(theme.palette.success.main, 0.2),
                                                    '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.16) },
                                                    width: 30, height: 30,
                                                }}
                                            >
                                                <PhoneIcon sx={{ fontSize: '16px' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {dataInfo?.email && (
                                        <Tooltip placement="top" title={`Correo: ${dataInfo?.email}`}>
                                            <IconButton
                                                component="a"
                                                href={`mailto:${dataInfo?.email}`}
                                                size="small"
                                                sx={{
                                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                                    color: 'primary.main',
                                                    border: '1px solid',
                                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
                                                    width: 30, height: 30,
                                                }}
                                            >
                                                <EmailIcon sx={{ fontSize: '16px' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>

                                <Tooltip placement="top" title="Ver detalle completo">
                                    <Chip
                                        icon={<MoreVertIcon sx={{ fontSize: '15px !important' }} />}
                                        label="Ver detalle"
                                        size="small"
                                        onClick={() => setModalOpen(true)}
                                        sx={{
                                            height: 26, fontSize: '0.72rem',
                                            bgcolor: 'grey.50',
                                            border: '1px solid', borderColor: 'grey.200',
                                            cursor: 'pointer',
                                            '&:hover': { bgcolor: 'grey.100' },
                                        }}
                                    />
                                </Tooltip>
                            </Box>

                            <Box sx={{ mt: 0.25 }}>
                                <InvestigationProgress config={statusConfig} requiresStatusLabel={false} />
                            </Box>
                        </Box>
                    }
                />
            </ListItem>

            <EmployeeDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                dataInfo={dataInfo}
                statusConfig={statusConfig}
                viewMode="list"
            />
        </>
    );
};

export default ViewList;