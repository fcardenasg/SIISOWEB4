import { Box, Divider, Typography } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

const LoadingSave = ({ loadingSteps = [], jsonAnimation }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % loadingSteps.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const { text, icon } = loadingSteps[index];

    return (
        <Box
            sx={{
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                textAlign: "center"
            }}
        >
            <Lottie animationData={jsonAnimation} loop={true} style={{ width: 180 }} />
            <Divider sx={{ width: "55%" }} />
            <Typography sx={{ fontSize: "1.1rem", color: "#333", fontWeight: 600 }}>
                Procesando y guardando la información… por favor espera.
            </Typography>

            <Box sx={{ position: "relative", width: 300 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        <Iconify icon={icon} sx={{ color: "primary.main" }} />
                        <Typography sx={{ fontSize: ".95rem", color: "#666", fontWeight: 400, }}>
                            {text}
                        </Typography>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Box>
    )
}

export default LoadingSave;