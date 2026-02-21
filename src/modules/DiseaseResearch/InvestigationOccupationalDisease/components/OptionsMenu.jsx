import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    HighlightOff as HighlightOffIcon,
    MoreVert as MoreVertIcon,
    Print as PrintIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import {
    Divider,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { Url } from 'api/instances/AuthRoute';
import axios from 'axios';
import ValidateAction from 'components/ValidateAction/ValidateAction';
import FullScreenModal from 'components/controllers/FullScreenModal';
import { AccionMenu, Modulo } from 'components/helpers/Enums';
import { useBoolean } from 'hooks/use-boolean';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { InvestigationActionsContext } from '../contexts/InvestigationActionsContext';

const OptionsMenu = ({
    idInvestigation,
    idAsignacion,
    disabledRevisar,
    estadoInvestigacion,
    variant = 'list',
    actions: propsActions
}) => {
    const investigationActions = useContext(InvestigationActionsContext) || {};
    const [loading, setLoading] = useState(false);
    const [reportUrl, setReportUrl] = useState(null);
    const openReport = useBoolean(false);

    const actions = { ...investigationActions, ...propsActions };
    const { onGoAttention, onDelete, onRestore, onReview, numStatus } = actions;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const isCard = variant === 'card';

    async function handleReport() {
        if (!idInvestigation) return;
        setLoading(true);
        handleClose();
        openReport.onTrue();

        try {
            const response = await axios.get(`${Url.Base}${Url.Investigacion}/report/${idInvestigation}`, {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/pdf'
                }
            });

            if (response.data.type !== 'application/pdf') {
                throw new Error('El archivo recibido no es un PDF válido.');
            }

            const url = URL.createObjectURL(response.data);
            setReportUrl(url);
        } catch (err) {
            if (err.response?.data instanceof Blob && err.response.data.type === 'application/json') {
                const reader = new FileReader();
                reader.onload = () => {
                    const errorData = JSON.parse(reader.result);
                    toast.error(errorData.message || 'Error al generar el reporte');
                    openReport.onFalse();
                };

                reader.readAsText(err.response.data);
            } else {
                toast.error(err.message || 'No se pudo cargar el reporte.');
                openReport.onFalse();
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    return (
        <>
            {openReport.value &&
                <FullScreenModal onClose={openReport.onFalse} loading={loading}>
                    <iframe
                        src={`${reportUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="Visualizador de Reporte"
                        loading="lazy"
                    />
                </FullScreenModal>
            }

            <IconButton
                onClick={handleClick}
                edge={!isCard ? "end" : undefined}
                size={!isCard ? "medium" : undefined}
                sx={{
                    mr: !isCard ? 0.2 : 0,
                    color: isCard ? 'white' : '#757575',
                    '&:hover': isCard ? {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                    } : undefined,
                    zIndex: isCard ? 2 : undefined,
                }}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={isCard ? {
                    vertical: 'top',
                    horizontal: 'left',
                } : {
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={isCard ? {
                    vertical: 'top',
                    horizontal: 'right',
                } : {
                    vertical: 'center',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        elevation: isCard ? 2 : undefined,
                        sx: {
                            mt: isCard ? 1 : 0,
                            borderRadius: isCard ? '12px' : '14px',
                            minWidth: isCard ? 180 : 200,
                            boxShadow: isCard ? '0 4px 12px rgba(0,0,0,0.1)' : '0 6px 20px rgba(0,0,0,0.12)',
                        },
                    },
                }}
            >
                <MenuItem
                    onClick={() => { onGoAttention && onGoAttention(idAsignacion); handleClose(); }}
                    disabled={((estadoInvestigacion === 3 || estadoInvestigacion === 5) && numStatus === 2) || (estadoInvestigacion === 5 && numStatus === 1)}
                >
                    <EditIcon sx={{ mr: 1.2, color: 'primary.main' }} /> Atender
                </MenuItem>

                {onReview && (numStatus === 1 || numStatus === 3) &&
                    <MenuItem onClick={() => { onReview(idAsignacion); handleClose(); }} disabled={disabledRevisar}>
                        <VisibilityIcon sx={{ mr: 1.2, color: 'primary.main' }} /> Revisar
                    </MenuItem>
                }

                {onRestore &&
                    <MenuItem onClick={() => { onRestore(idAsignacion); handleClose(); }}>
                        <HighlightOffIcon sx={{ mr: 1.2, color: 'error.main' }} /> Devolver
                    </MenuItem>
                }

                <MenuItem onClick={handleReport} disabled={!idInvestigation}>
                    <PrintIcon sx={{ mr: 1.2 }} /> Imprimir
                </MenuItem>

                <ValidateAction idAccion={AccionMenu.eliminar} idModulo={Modulo.InvestigacionEnfermedadLaboral}>
                    {onDelete && <Divider sx={{ my: 0.5 }} />}

                    {onDelete &&
                        <MenuItem onClick={() => { onDelete(idAsignacion); handleClose(); }} sx={{ color: 'error.main' }}>
                            <DeleteIcon sx={{ mr: 1.2 }} /> Eliminar
                        </MenuItem>
                    }
                </ValidateAction>
            </Menu>
        </>
    );
};

export const OptionsMenuList = (props) => <OptionsMenu {...props} variant="list" />;
export const OptionsMenuCard = (props) => <OptionsMenu {...props} variant="card" />;

export default OptionsMenu;