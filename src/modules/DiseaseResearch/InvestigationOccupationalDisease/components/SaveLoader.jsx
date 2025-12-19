import PropTypes from 'prop-types';
import { Box, CircularProgress, Grid, LinearProgress, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Iconify from 'components/iconify/iconify';

const SaveLoader = ({ isSaving, title = "Guardando información", message = "Estamos asegurando que toda la información se guarde correctamente." }) => {
    const theme = useTheme();

    return (
        <AnimatePresence>
            {isSaving && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: theme.zIndex.modal + 10,
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component={motion.div}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        sx={{
                            textAlign: 'center',
                            p: 5,
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            boxShadow: theme.customShadows?.z24 || 24,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            maxWidth: 420,
                            mx: 2
                        }}
                    >
                        {/* Loader de Doble Anillo con Icono Animado */}
                        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                            <CircularProgress
                                size={80}
                                thickness={2}
                                sx={{ color: theme.palette.primary.lighter }}
                            />
                            <CircularProgress
                                size={80}
                                thickness={4}
                                sx={{
                                    color: theme.palette.primary.main,
                                    position: 'absolute',
                                    left: 0,
                                    strokeLinecap: 'round',
                                }}
                            />
                            <Box
                                component={motion.div}
                                animate={{
                                    opacity: [1, 0.5, 1],
                                    scale: [1, 0.9, 1]
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex'
                                }}
                            >
                                <Iconify icon="fluent:save-sync-24-regular" width={32} sx={{ color: 'primary.main' }} />
                            </Box>
                        </Box>

                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                            {title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                            {message}
                        </Typography>

                        <Box sx={{ width: '100%', px: 4 }}>
                            <LinearProgress
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: theme.palette.primary.lighter,
                                }}
                            />
                        </Box>

                        <Typography variant="caption" sx={{ mt: 2, color: 'warning.main', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                            ⚠️ No refresques la página
                        </Typography>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

SaveLoader.propTypes = {
    isSaving: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string
};

export default SaveLoader;