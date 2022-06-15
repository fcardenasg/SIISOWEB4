import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { TitleButton } from 'components/helpers/Enums';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

const AlertDelete = ({ title, subtitle, open, onClickDelete, onClickCancelar }) => {
    const theme = useTheme();

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={onClickCancelar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ p: 3 }}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body2" component="span">
                            {subtitle}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                        onClick={onClickDelete}
                        color="secondary"
                    >
                        {TitleButton.Eliminar}
                    </Button>

                    <Button variant="contained" size="small" onClick={onClickCancelar} autoFocus>
                        {TitleButton.Cerrar}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AlertDelete;

AlertDelete.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onClickCancelar: PropTypes.object,
    onClickDelete: PropTypes.object,
    open: PropTypes.bool,
};