import { Dialog, DialogContent, Box, Fade, Fab, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FullScreenModal = ({ open, onClose, children }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Fade}
            transitionDuration={300}
            PaperProps={{
                sx: { overflow: 'hidden' }
            }}
        >
            {onClose && (
                <Tooltip title="Cerrar" placement="left">
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'fixed',
                            right: 16,
                            top: 15,
                            zIndex: 2000,
                            boxShadow: 4,
                            width: 35,
                            height: 35,
                            minHeight: 0
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </Fab>
                </Tooltip>
            )}

            <DialogContent
                sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.default',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            minHeight: '100%',
                            p: { xs: 2, sm: 3, md: 5 },
                            boxSizing: 'border-box'
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FullScreenModal;