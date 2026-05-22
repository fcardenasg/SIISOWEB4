import React from 'react';
import { Box, Typography, Paper, Divider, Stack, IconButton } from '@mui/material';
import {
    CalendarToday,
    PersonOutline,
    AssignmentLate,
    Close,
    FormatQuote
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ReasonAlert = ({ reason, observation, date, user, onClose }) => {
    if (!reason && !observation) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                boxShadow: [
                    "0px 10px 20px rgba(2, 136, 209, 0.1)",
                    "0px 10px 30px rgba(2, 136, 209, 0.25)",
                    "0px 10px 20px rgba(2, 136, 209, 0.1)"
                ]
            }}
            exit={{
                opacity: 0,
                scale: 0.5,
                y: -40,
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: "backIn" }
            }}
            transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                default: { type: "spring", stiffness: 300, damping: 25 }
            }}
            style={{ borderRadius: '16px', width: '100%' }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '8px',
                        backgroundColor: 'secondary.main',
                    }
                }}
            >
                <Box sx={{ pl: 4, pr: 3, py: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
                                <AssignmentLate color="secondary" sx={{ fontSize: 22 }} />
                                <Typography
                                    variant="overline"
                                    sx={{
                                        fontWeight: 800,
                                        color: 'secondary.main',
                                        letterSpacing: 1.2,
                                        lineHeight: 1
                                    }}
                                >
                                    Motivo de devolución
                                </Typography>
                            </Stack>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    color: 'text.primary',
                                    letterSpacing: -0.5,
                                    mt: 1
                                }}
                            >
                                {reason || 'Sin motivo especificado'}
                            </Typography>
                        </Box>

                        <IconButton
                            size="small"
                            onClick={onClose}
                            sx={{
                                bgcolor: 'rgba(0,0,0,0.04)',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    transform: 'rotate(90deg)'
                                }
                            }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" spacing={2} sx={{ mt: 2, mb: 2.5 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: 'secondary.lighter',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '20px',
                            border: '1px solid',
                            borderColor: 'secondary.outline'
                        }}>
                            <PersonOutline sx={{ fontSize: 16, color: 'secondary.main' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                                {user || 'Sistema'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, px: 1 }}>
                            <CalendarToday sx={{ fontSize: 14, color: 'text.disabled' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {date}
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ mb: 3, opacity: 0.6, borderStyle: 'dashed' }} />

                    <Box sx={{ position: 'relative', px: { xs: 2, sm: 4 }, py: 1 }}>
                        <FormatQuote
                            sx={{
                                transform: 'rotate(180deg)',
                                color: 'secondary.main',
                                fontSize: 38,
                                opacity: 0.15,
                                position: 'absolute',
                                left: 0,
                                top: -15
                            }}
                        />

                        <Typography
                            variant="body1"
                            sx={{
                                fontStyle: 'italic',
                                color: 'text.secondary',
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.8,
                                fontSize: '1.05rem',
                                position: 'relative',
                                zIndex: 1,
                                textAlign: 'justify'
                            }}
                        >
                            {observation || "No se adjuntaron observaciones adicionales."}
                        </Typography>

                        <FormatQuote
                            sx={{
                                color: 'secondary.main',
                                fontSize: 38,
                                opacity: 0.15,
                                position: 'absolute',
                                right: 0,
                                bottom: -15
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default ReasonAlert;

const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 12 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export const ReasonAlertModal = ({ reason, observation, date, user }) => {
    return (
        <motion.div
            variants={itemVariants}
            layout
            style={{ width: '100%' }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#ffffff',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '5px',
                        backgroundColor: 'secondary.main',
                    }
                }}
            >
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AssignmentLate color="secondary" sx={{ fontSize: 18 }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                {reason}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'secondary.main', fontWeight: 600 }}>
                            <PersonOutline sx={{ fontSize: 14 }} /> {user}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
                            <CalendarToday sx={{ fontSize: 12 }} /> {date}
                        </Typography>
                    </Stack>

                    <Box sx={{ position: 'relative', mt: 1, px: 2, py: 0.5 }}>
                        <FormatQuote sx={{ transform: 'rotate(180deg)', color: 'secondary.main', fontSize: 18, opacity: 0.2, position: 'absolute', left: -5, top: -5 }} />
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: 'justify',
                                fontStyle: 'italic',
                                color: 'text.secondary',
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}
                        >
                            {observation}
                        </Typography>
                        <FormatQuote sx={{ color: 'secondary.main', fontSize: 18, opacity: 0.2, position: 'absolute', right: -5, bottom: -5 }} />
                    </Box>
                </Stack>
            </Paper>
        </motion.div>
    );
};