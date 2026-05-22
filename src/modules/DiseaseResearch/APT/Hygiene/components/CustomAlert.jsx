import React from 'react';
import { Alert, AlertTitle, Collapse, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Componente de alerta reutilizable para el módulo de Higiene.
 * 
 * @param {string} title - Título de la alerta (opcional).
 * @param {string} message - Mensaje de la alerta.
 * @param {string} severity - Tipo de alerta: 'error', 'warning', 'info', 'success'.
 * @param {boolean} open - Estado de visibilidad de la alerta.
 * @param {function} onClose - Función para cerrar la alerta (opcional).
 * @param {object} sx - Estilos adicionales (opcional).
 */
const CustomAlert = ({ 
    title, 
    message, 
    severity = 'info', 
    open = true, 
    onClose, 
    sx = {} 
}) => {
    return (
        <Box sx={{ width: '100%', mb: 2, ...sx }}>
            <Collapse in={open}>
                <Alert
                    severity={severity}
                    action={
                        onClose ? (
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={onClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        ) : null
                    }
                    sx={{
                        borderRadius: '8px',
                        '& .MuiAlert-message': {
                            width: '100%'
                        }
                    }}
                >
                    {title && <AlertTitle sx={{ fontWeight: 'bold' }}>{title}</AlertTitle>}
                    {message}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default CustomAlert;
