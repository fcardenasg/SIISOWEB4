import {
    Groups as GroupsIcon,
    LocalHospital as LocalHospitalIcon,
    ScheduleTwoTone as ScheduleTwoToneIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Chip,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ViewFormat } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import InvestigationProgress from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/InvestigationProgress';
import OptionsMenu from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/OptionsMenu';
import { StyledChip } from 'modules/Programming/NewProgramming/components/methods';
import { getStatusConfig } from '../methods';
import AnimatedTimeDisplay from 'modules/Programming/NewProgramming/components/AnimatedTimeDisplay';
import { useInvestigationActions } from '../../contexts/InvestigationActionsContext';

const ViewList = ({ dataInfo, index }) => {
    const theme = useTheme();
    const { onOpenChat } = useInvestigationActions();
    const statusConfig = getStatusConfig(dataInfo.estadoInvestigacion);

    return (
        <ListItem
            key={index}
            sx={{
                borderRadius: '16px',
                border: '1px solid #f0f0f0',
                mb: 2,
                backgroundColor: '#fff',
                boxShadow: '0 3px 10px rgba(0,0,0,0.03)',
                '&:hover': {
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                    transform: 'translateX(6px)',
                    transition: 'all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                },
            }}
            secondaryAction={
                <OptionsMenu
                    idInvestigation={dataInfo.id}
                    disabledRevisar={dataInfo.estadoInvestigacion !== 3}
                    estadoInvestigacion={dataInfo.estadoInvestigacion}
                />
            }
        >
            <ListItemAvatar>
                <Avatar
                    src={dataInfo.foto}
                    alt="Foto del empleado"
                    sx={{
                        width: 120,
                        height: 120,
                        mr: 2,
                        borderRadius: '12px',
                        border: '2px solid #f8f8f8',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                >
                    {dataInfo.nombreEmpleado.charAt(0).toUpperCase()}
                </Avatar>
            </ListItemAvatar>

            <ListItemText
                primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Typography variant="subtitle1" fontWeight="bold" fontSize="1.15rem" color="#1a1a1a">
                                {dataInfo.nombreEmpleado}
                            </Typography>

                            {dataInfo.usuarioCierreInvestigacion &&
                                <Tooltip placement="top" title="Usuario atendiendo">
                                    <StyledChip label={dataInfo.usuarioCierreInvestigacion} timeColor={theme.palette.success.main} />
                                </Tooltip>
                            }
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Box sx={{
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                }
                            }}>
                                <Tooltip placement="top" title="Asistente de SIISO">
                                    <IconButton
                                        onClick={() => onOpenChat(true, { documento: dataInfo.documento, nameEmpleado: dataInfo.nombreEmpleado })}
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

                            <AnimatedTimeDisplay fechaRegistro={dataInfo?.fechaRegistro} />
                        </Box>
                    </Box>
                }
                secondary={
                    <Box sx={{ mt: 1.2, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                            <strong>Fecha:</strong> {ViewFormat(dataInfo.fecha)} • <strong>C.C.</strong> {dataInfo.documento} • <strong>Edad:</strong> {dataInfo.edad} años • <strong>Sexo:</strong> {dataInfo.nombreSexo}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', fontSize: '0.92rem', color: '#555' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                                <WorkIcon sx={{ fontSize: '16px', color: 'success.main' }} /> <strong>Roster position:</strong> {dataInfo.nombreRoster}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, textTransform: 'capitalize' }}>
                                <LocalHospitalIcon sx={{ fontSize: '16px', color: 'primary.800' }} /> <strong>EPS:</strong> {dataInfo.nombreEPS}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                                <ScheduleTwoToneIcon sx={{ fontSize: '16px', color: 'secondary.200' }} /> <strong>Turno:</strong> {dataInfo.nombreTurno || 'Sin registro'}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                                <GroupsIcon sx={{ fontSize: '16px', color: 'warning.main' }} /> <strong>Grupo:</strong> {dataInfo.nombreGrupo}
                            </Box>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" fontWeight="medium" color="text.secondary">
                                    Estado de atención
                                </Typography>

                                <Chip
                                    label={statusConfig.label}
                                    size="small"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.78rem',
                                        height: 24,
                                        backgroundColor: statusConfig.color + '20',
                                        color: statusConfig.color,
                                        borderRadius: '12px',
                                    }}
                                />
                            </Box>

                            <InvestigationProgress config={statusConfig} requiresStatusLabel={false} />
                        </Box>
                    </Box>
                }
            />
        </ListItem>
    );
};

export default ViewList;