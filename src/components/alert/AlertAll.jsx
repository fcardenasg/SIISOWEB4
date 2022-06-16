import React from 'react';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { Message } from 'components/helpers/Enums';
import { Snackbar } from '@mui/material';

export const ParamDelete = {
    title: `${Message.TituloEliminar}`,
    text: `${Message.TextoEliminar}`,
    icon: "error",
    buttons: ["Cancelar", "SI"],
    dangerMode: true,
    confirm: {
        text: "SI",
    },
    cancel: {
        text: "Cancelar",
    },
}

export const ParamLoadingData = {
    title: `${Message.TituloCargar}`,
    text: `${Message.TextoCargar}`,
    icon: "warning",
    buttons: ["Cancelar", "SI"],
    dangerMode: true,
    confirm: {
        text: "SI",
    },
    cancel: {
        text: "Cancelar",
    },
}

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Alert = React.forwardRef(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    }
);

export const MessageSuccess = ({ open, onClose }) => {
    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            key={'alert'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
        >
            <Alert severity="success" sx={{ width: '100%' }}>
                {Message.Guardar}
            </Alert>
        </Snackbar>
    )
}

export const MessageUpdate = ({ open, onClose }) => {
    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            key={'alert'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
        >
            <Alert severity="success" sx={{ width: '100%' }}>
                {Message.Actualizar}
            </Alert>
        </Snackbar>
    )
}

export const MessageDelete = ({ open, onClose }) => {
    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            key={'alert'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            open={open}
            autoHideDuration={2500}
            onClose={onClose}
        >
            <Alert severity="error" sx={{ width: '100%' }}>
                {Message.Eliminar}
            </Alert>
        </Snackbar>
    )
}