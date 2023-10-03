import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Message } from 'components/helpers/Enums';

const ControlModal = ({ open, onClose, maxWidth, title, children }) => {
    const theme = useTheme();
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={title === Message.VistaReporte || title === Message.VistaArchivo ? "md" : maxWidth}
                open={open}
            >
                <Grid container>
                    <Grid item xs={10}>
                        <DialogTitle>{title}</DialogTitle>
                    </Grid>

                    <Grid item xs={2}>
                        <DialogActions>
                            <AnimateButton>
                                <Tooltip title="" onClick={onClose}>
                                    <IconButton>
                                        <CloseIcon sx={{ fontSize: '2rem', color: theme.palette.error.main }} />
                                    </IconButton>
                                </Tooltip>
                            </AnimateButton>
                        </DialogActions>
                    </Grid>
                </Grid>

                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ControlModal;

ControlModal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node,
};