import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

const lockAnimationVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    snap: {
        scale: 1.2,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            delay: 0.5,
        }
    },
    pulse: {
        scale: [1.2, 1.05, 1.2],
        opacity: [1, 0.9, 1],
        boxShadow: [
            "0 0 0 0px rgba(211, 47, 47, 0.2)",
            "0 0 0 20px rgba(211, 47, 47, 0)",
            "0 0 0 0px rgba(211, 47, 47, 0.2)"
        ],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
        }
    },
};

export default function UnauthorizedPage({
    title = "Acceso Restringido",
    subtitle = "No dispones de los permisos necesarios.",
    detailedMessage = "Tu perfil actual no cuenta con los privilegios de seguridad requeridos para navegar por este módulo ni visualizar sus registros. Si crees que se trata de un error de asignación, por favor contacta al administrador del sistema."
}) {
    const errorColor = '#d32f2f';
    const menu = window.localStorage.getItem('systemMenu');
    const itemsMenu = JSON.parse(menu);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                width: '100%'
            }}
        >
            <Container sx={{ width: '60%' }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            initial="hidden"
                            animate={["snap", "pulse"]}
                            variants={lockAnimationVariants}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: `${errorColor}15`,
                                marginBottom: 32,
                                color: errorColor,
                            }}
                        >
                            <LockIcon sx={{ fontSize: 40 }} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                {title}
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
                                {subtitle}
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'center',
                                    mb: 2,
                                    maxWidth: '90%',
                                    mx: 'auto',
                                    lineHeight: 1.8,
                                    opacity: 0.8
                                }}
                            >
                                {detailedMessage}
                            </Typography>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={() => navigate(itemsMenu[0]?.children[0]?.url)}
                                disableElevation
                                sx={{
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    backgroundColor: errorColor,
                                    boxShadow: `0 10px 20px -10px ${errorColor}80`,
                                    '&:hover': {
                                        backgroundColor: '#c42828',
                                        boxShadow: `0 15px 30px -12px ${errorColor}90`,
                                    }
                                }}
                            >
                                Volver al Dashboard
                            </Button>
                        </motion.div>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};