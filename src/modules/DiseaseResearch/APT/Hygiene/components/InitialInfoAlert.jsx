import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Iconify from 'components/iconify/iconify';

const InitialInfoAlert = () => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    p: { xs: 2, sm: 3 },
                    mt: 1,
                    mb: 2,
                    borderRadius: '24px',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.warning.light, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                    boxShadow: `0 10px 40px -10px ${alpha(theme.palette.warning.main, 0.2)}`,
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '6px',
                        height: '100%',
                        background: `linear-gradient(to bottom, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
                        borderRadius: '24px 0 0 24px'
                    }
                }}
            >
                {/* Ícono animado usando Framer Motion y Iconify */}
                <Box
                    component={motion.div}
                    animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.warning.main, 0.15),
                        color: theme.palette.warning.main,
                        flexShrink: 0,
                        boxShadow: `0 0 20px ${alpha(theme.palette.warning.main, 0.4)}`
                    }}
                >
                    <Iconify icon="solar:info-circle-bold-duotone" width={36} height={36} />
                </Box>

                <Stack spacing={1} sx={{ flex: 1 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.mode === 'dark' ? theme.palette.warning.light : theme.palette.warning.dark,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        Información Principal Requerida
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}
                    >
                        Para continuar con el análisis de puesto de trabajo (secciones y acordeones adicionales),
                        primero debe <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>diligenciar de forma obligatoria la información de esta sección</Box> y
                        hacer clic en el botón <Box component="span" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>Guardar</Box>.
                    </Typography>
                </Stack>

                {/* Elemento decorativo en el fondo */}
                <Box
                    sx={{
                        position: 'absolute',
                        right: -20,
                        bottom: -40,
                        opacity: 0.05,
                        transform: 'rotate(-15deg)',
                        pointerEvents: 'none'
                    }}
                >
                    <Iconify icon="solar:document-add-bold-duotone" width={160} height={160} color={theme.palette.warning.main} />
                </Box>
            </Box>
        </motion.div>
    );
};

export default InitialInfoAlert;