import { Box, Divider, Typography } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

const loadingSteps = [
    { text: "Leyendo datos del archivo…", icon: "mdi:table" },
    { text: "Identificando información del cargo…", icon: "mdi:briefcase" },
    { text: "Procesando parámetros GES…", icon: "mdi:clipboard-text" },
    { text: "Verificando información adicional…", icon: "mdi:database-search" },
];

const LoadingBasicInformation = ({ animationData, size = 420, textDuration = 2500 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % loadingSteps.length);
        }, textDuration);

        return () => clearInterval(interval);
    }, [textDuration]);

    const { text, icon } = loadingSteps[currentTextIndex];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                p: 2,
                minHeight: "220px",
            }}
        >
            <Lottie animationData={animationData} loop={true} style={{ width: size }} />
            <Divider sx={{ width: "42%" }} />
            <Typography sx={{ fontSize: ".95rem", fontWeight: 500, color: "#444", textAlign: "center", maxWidth: 400, lineHeight: 1.3 }}>
                Estamos preparando y extrayendo la información del archivo. Esto podría tomar unos momentos.
            </Typography>

            <Box
                sx={{
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTextIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.55,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            position: "absolute",
                            willChange: "opacity"
                        }}
                    >
                        <Iconify icon={icon} sx={{ color: "primary.main" }} />

                        <Typography
                            sx={{
                                fontSize: ".90rem",
                                color: "#555",
                                fontWeight: 400,
                            }}
                        >
                            {text}
                        </Typography>
                    </motion.div>
                </AnimatePresence>

            </Box>
        </Box>
    );
};

export default LoadingBasicInformation;