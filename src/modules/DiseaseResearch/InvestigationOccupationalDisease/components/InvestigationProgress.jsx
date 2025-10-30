import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import React, { useEffect, useState } from 'react';
import { ColorDrummondltd } from 'themes/colors';

const InvestigationProgress = ({ status }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const config = {
        1: {
            step: 0,
            icon: <PendingActionsIcon />,
            color: ColorDrummondltd.GrayDrummond,
            label: 'Pendiente',
        },
        2: {
            step: 1,
            icon: <HourglassEmptyIcon />,
            color: ColorDrummondltd.OrangeDrummond,
            label: 'En progreso',
        },
        3: {
            step: 2,
            icon: <CheckCircleIcon />,
            color: ColorDrummondltd.GreenDrummond,
            label: 'Completada',
        },
    };

    const current = config[status] || config[1];
    const percent = (current.step / 2) * 100;

    return (
        <Box sx={{ mb: 2.5, textAlign: 'center', width: '100%', maxWidth: 340, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    {React.cloneElement(current.icon, {
                        sx: { color: current.color, fontSize: '1.25rem' },
                    })}
                </motion.div>
                <Typography variant="body2" fontWeight="bold" sx={{ color: current.color, fontSize: '0.9rem' }}>
                    {current.label}
                </Typography>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    height: 10,
                    backgroundColor: '#eaeaea',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <motion.div
                    initial={false}
                    animate={{ width: isMounted ? `${percent}%` : '0%' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                        height: '100%',
                        backgroundColor: current.color,
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {status === 2 && (
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '50%',
                                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)`,
                            }}
                        />
                    )}
                </motion.div>

                {[0, 50, 100].map((pos, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            left: `${pos}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: percent >= pos ? current.color : '#ccc',
                            zIndex: 2,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default InvestigationProgress;