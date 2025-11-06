import {
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
    MoreVert as MoreVertIcon,
    Print as PrintIcon,
} from '@mui/icons-material';
import {
    Divider,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OptionsMenuList = ({ idAsignacion }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleAction = (action) => {
        if (action === 1) {
            navigate(`/investigation-occupational-disease/investigate/${idAsignacion}`);
        }

        handleClose();
    };

    return (
        <>
            <IconButton sx={{ mr: 0.2 }} edge="end" onClick={handleClick} size="medium">
                <MoreVertIcon sx={{ color: '#757575' }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        borderRadius: '14px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                        minWidth: 200
                    },
                }}
            >
                <MenuItem onClick={() => handleAction(1)}>
                    <EditIcon sx={{ mr: 1.2, color: 'primary.main' }} /> Atender
                </MenuItem>
                <MenuItem onClick={() => handleAction('exportar')}>
                    <DownloadIcon sx={{ mr: 1.2 }} /> Exportar PDF
                </MenuItem>
                <MenuItem onClick={() => handleAction('imprimir')}>
                    <PrintIcon sx={{ mr: 1.2 }} /> Imprimir
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => handleAction('eliminar')} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1.2 }} /> Eliminar
                </MenuItem>
            </Menu>
        </>
    )
}

export const OptionsMenuCard = ({ idAsignacion }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleAction = (action) => {
        if (action === 1) {
            navigate(`/investigation-occupational-disease/investigate/${idAsignacion}`);
        }

        handleClose();
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                    zIndex: 2,
                }}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        mt: 1,
                        borderRadius: '12px',
                        minWidth: 180,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                }}
            >
                <MenuItem onClick={() => handleAction('ver')}>
                    <EditIcon sx={{ mr: 1, color: 'primary.main' }} /> Atender
                </MenuItem>
                <MenuItem onClick={() => handleAction('exportar')}>
                    <DownloadIcon sx={{ mr: 1 }} /> Exportar PDF
                </MenuItem>
                <MenuItem onClick={() => handleAction('imprimir')}>
                    <PrintIcon sx={{ mr: 1 }} /> Imprimir
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleAction('eliminar')} sx={{ color: 'primary.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} /> Eliminar
                </MenuItem>
            </Menu>
        </>
    )
}