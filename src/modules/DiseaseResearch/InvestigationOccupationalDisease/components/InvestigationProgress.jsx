import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const InvestigationProgress = ({ config, requiresStatusLabel = true }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Box sx={{ mb: requiresStatusLabel ? 2.5 : 0, textAlign: 'center', width: '100%', mx: 'auto' }}>
            {requiresStatusLabel &&
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {React.cloneElement(config.icon, {
                            sx: { color: config.color, fontSize: '1.25rem' },
                        })}
                    </motion.div>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: config.color, fontSize: '0.9rem' }}>
                        {config.label}
                    </Typography>
                </Box>
            }

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
                    animate={{ width: isMounted ? `${config.percent}%` : '0%' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                        height: '100%',
                        backgroundColor: config.color,
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {config.step === 1 && (
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
                            backgroundColor: config.percent >= pos ? config.color : '#ccc',
                            zIndex: 2,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default InvestigationProgress;