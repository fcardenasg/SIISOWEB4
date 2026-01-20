import PropTypes from 'prop-types';
import { Box, CircularProgress, LinearProgress, Typography, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Iconify from 'components/iconify/iconify';

const SaveLoader = ({
    isSaving,
    title = "Guardando información",
    message = "Estamos asegurando que todos los cambios se sincronicen correctamente."
}) => {
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
                        width: '100%',
                        height: '100%',
                        zIndex: theme.zIndex.modal + 2000,
                        background: alpha(theme.palette.background.default, 0.8),
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component={motion.div}
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        sx={{
                            textAlign: 'center',
                            p: 6,
                            borderRadius: 3,
                            bgcolor: 'background.paper',
                            boxShadow: theme.customShadows?.z24 || 24,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: 480,
                            mx: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                    >
                        <Box sx={{ position: 'relative', display: 'flex', mb: 4 }}>
                            <CircularProgress
                                size={100}
                                thickness={2}
                                sx={{ color: alpha(theme.palette.primary.main, 0.1) }}
                            />
                            <CircularProgress
                                size={100}
                                thickness={3}
                                sx={{
                                    color: 'primary.main',
                                    position: 'absolute',
                                    left: 0,
                                    strokeLinecap: 'round',
                                }}
                            />
                            <Box
                                component={motion.div}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Iconify
                                    icon="solar:cloud-upload-bold-duotone"
                                    width={48}
                                    sx={{ color: 'primary.main' }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
                            {title}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, px: 2 }}>
                            {message}
                        </Typography>

                        <Box sx={{ width: '100%', mb: 3 }}>
                            <LinearProgress
                                color="primary"
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                    }
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                bgcolor: alpha(theme.palette.warning.main, 0.08)
                            }}
                        >
                            <Iconify icon="solar:danger-triangle-bold" width={20} sx={{ color: 'warning.main' }} />
                            <Typography variant="subtitle2" sx={{ color: 'warning.dark', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Por favor, no cierres ni refresques la página
                            </Typography>
                        </Box>
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