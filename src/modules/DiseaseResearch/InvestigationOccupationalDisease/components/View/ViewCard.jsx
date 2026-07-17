import {
    Business as BusinessIcon,
    CalendarToday as CalendarTodayIcon,
    GroupWorkTwoTone as GroupWorkTwoToneIcon,
    LocationOn as LocationOnIcon,
    ScheduleTwoTone as ScheduleTwoToneIcon,
    Wc as WcIcon,
    Work as WorkIcon,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Iconify from 'components/iconify/iconify';
import OptionsMenu from '../OptionsMenu';
import { StyledChip } from 'modules/Programming/NewProgramming/components/methods';
import { useInvestigationActions } from '../../contexts/InvestigationActionsContext';
import { getStatusConfig } from '../methods';
import { useState } from 'react';
import EmployeeDetailModal from './EmployeeDetailModal';
import InvestigationProgress from '../InvestigationProgress';

const formatDateShort = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleString('es-CO', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

const StatItem = ({ icon, label, value, color = 'text.secondary', fullWidth = false }) => (
    <Box sx={{ gridColumn: fullWidth ? '1 / -1' : 'auto', minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
            <Box sx={{ display: 'flex', color, fontSize: '14px' }}>{icon}</Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                {label}
            </Typography>
        </Box>
        <Typography
            variant="body2"
            fontWeight={600}
            noWrap
            sx={{ textTransform: label === 'EPS' ? 'capitalize' : 'none', color: 'text.primary' }}
        >
            {value || 'Sin registro'}
        </Typography>
    </Box>
);

const ViewCard = ({ dataInfo, index }) => {
    const theme = useTheme();
    const { onOpenChat } = useInvestigationActions();
    const statusConfig = getStatusConfig(dataInfo.estadoInvestigacion);
    const [modalOpen, setModalOpen] = useState(false);

    const handleCardClick = (e) => {
        // Verificar si el clic fue en el menú de opciones o en sus hijos
        if (e.target.closest('.options-menu') || e.target.classList.contains('options-menu')) {
            // Si se hace clic en el menú de opciones, no abrir el modal
            return;
        }
        // En cualquier otro caso, abrir el modal
        setModalOpen(true);
    };

    return (
        <>
            <Card
                sx={{
                    borderRadius: '20px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                        transform: 'translateY(-3px)',
                        borderColor: 'primary.100',
                    },
                }}
                onClick={handleCardClick}
            >
                <Box
                    sx={{
                        position: 'relative',
                        height: 92,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    }}
                >
                    <Box
                        sx={{ position: 'absolute', top: 6, right: 6, zIndex: 2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <OptionsMenu
                            idInvestigation={dataInfo.idIEL}
                            idAsignacion={dataInfo.id}
                            disabledRevisar={dataInfo.estadoInvestigacion !== 3}
                            estadoInvestigacion={dataInfo.estadoInvestigacion}
                            variant="card"
                        />
                    </Box>

                    {dataInfo.usuarioCierreInvestigacion && (
                        <Box sx={{ position: 'absolute', top: 10, left: 12, zIndex: 2 }}>
                            <Tooltip placement="top" title="Usuario atendiendo">
                                <StyledChip
                                    label={dataInfo.usuarioCierreInvestigacion}
                                    timeColor={theme.palette.common.white}
                                    sx={{
                                        bgcolor: alpha('#fff', 0.18),
                                        color: '#fff',
                                        border: `1.5px solid ${alpha('#fff', 0.5)}`,
                                        backdropFilter: 'blur(4px)',
                                        fontWeight: 600,
                                        fontSize: '0.7rem',
                                    }}
                                />
                            </Tooltip>
                        </Box>
                    )}

                    <Chip
                        label={statusConfig.label}
                        size="small"
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 12,
                            height: 22,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            bgcolor: alpha('#fff', 0.92),
                            color: statusConfig.color,
                            zIndex: 2,
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '-44px', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={dataInfo.foto}
                            alt={dataInfo.nombreEmpleado}
                            variant="rounded"
                            sx={{
                                width: 88,
                                height: 88,
                                fontSize: '2.1rem',
                                fontWeight: 700,
                                borderRadius: '18px',
                                border: '3px solid white',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
                                bgcolor: dataInfo.foto ? 'background.paper' : alpha(statusConfig.color, 0.14),
                                color: dataInfo.foto ? 'text.secondary' : statusConfig.color,
                            }}
                        >
                            {!dataInfo.foto && dataInfo.nombreEmpleado?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box
                            sx={{
                                position: 'absolute',
                                right: -8,
                                bottom: -8,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { transform: 'scale(1.12)' },
                            }}
                        >
                            <Tooltip disableInteractive placement="top" title="Asistente de SIISO">
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que se abra el modal
                                        onOpenChat(true, { documento: dataInfo.documento, nameEmpleado: dataInfo.nombreEmpleado });
                                    }}
                                    sx={{
                                        bgcolor: 'white',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                        border: '2px solid white',
                                        '&:hover': { bgcolor: '#f5f5f5' },
                                        width: 30,
                                        height: 30,
                                    }}
                                >
                                    <Iconify icon="hugeicons:artificial-intelligence-08" sx={{ color: 'primary.main', fontSize: '15px' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>

                <CardContent sx={{ px: 2.5, pt: 1.5, pb: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            noWrap
                            title={dataInfo.nombreEmpleado}
                            sx={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: 1.3 }}
                        >
                            {dataInfo.nombreEmpleado}
                        </Typography>

                        {dataInfo.nombreRoster && (
                            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', mt: 0.25 }}>
                                {dataInfo.nombreRoster}
                            </Typography>
                        )}

                        <Stack
                            direction="row"
                            spacing={0.75}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 0.75, color: 'text.disabled', flexWrap: 'wrap', rowGap: 0.5 }}
                        >
                            <Typography variant="caption">CC {dataInfo.documento}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ height: 11, alignSelf: 'center' }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                <WcIcon sx={{ fontSize: '12px' }} />
                                <Typography variant="caption">{dataInfo.nombreSexo}</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem sx={{ height: 11, alignSelf: 'center' }} />
                            <Typography variant="caption">{dataInfo.edad} años</Typography>
                        </Stack>
                    </Box>

                    <InvestigationProgress config={statusConfig} requiresStatusLabel={false} />

                    <Divider sx={{ my: 2 }} />

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            rowGap: 1.75,
                            columnGap: 1.75,
                            flex: 1,
                            mt: 0.5,
                        }}
                    >
                        <StatItem
                            icon={<CalendarTodayIcon sx={{ fontSize: 'inherit' }} />}
                            label="Fecha Registro"
                            value={formatDateShort(dataInfo.fechaRegistro)}
                            color="primary.main"
                        />
                        <StatItem
                            icon={<BusinessIcon sx={{ fontSize: 'inherit' }} />}
                            label="EPS"
                            value={dataInfo.nombreEPS}
                            color="primary.dark"
                        />
                        <StatItem
                            icon={<ScheduleTwoToneIcon sx={{ fontSize: 'inherit' }} />}
                            label="Turno"
                            value={dataInfo.nombreTurno}
                            color="secondary.main"
                        />
                        <StatItem
                            icon={<GroupWorkTwoToneIcon sx={{ fontSize: 'inherit' }} />}
                            label="Grupo"
                            value={dataInfo.nombreGrupo}
                            color="warning.main"
                        />
                        {dataInfo.nombreSede && (
                            <StatItem
                                icon={<LocationOnIcon sx={{ fontSize: 'inherit' }} />}
                                label="Sede"
                                value={dataInfo.nombreSede}
                                color="info.main"
                            />
                        )}
                        {dataInfo.empresa && (
                            <StatItem
                                icon={<Iconify icon="solar:case-minimalistic-bold-duotone" sx={{ fontSize: 'inherit' }} />}
                                label="Empresa"
                                value={dataInfo.empresa}
                                color="success.main"
                            />
                        )}
                        {dataInfo.nombreDx && dataInfo.nombreDx.length > 0 && (
                            <StatItem
                                icon={<Iconify icon="solar:medical-kit-bold-duotone" sx={{ fontSize: 'inherit' }} />}
                                label="Diagnóstico"
                                value={dataInfo.nombreDx.map((dx, index) => (
                                    <Typography variant="body2" sx={{ fontSize: '12px' }} key={index}>
                                        {dx}
                                    </Typography>
                                ))}
                                color="error.main"
                                fullWidth
                            />
                        )}
                    </Box>
                </CardContent>
            </Card>

            <EmployeeDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                dataInfo={dataInfo}
                statusConfig={statusConfig}
                viewMode="card"
            />
        </>
    );
};

export default ViewCard;