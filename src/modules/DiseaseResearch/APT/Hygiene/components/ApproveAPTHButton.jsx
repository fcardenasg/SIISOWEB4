import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, useTheme } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ColorDrummondltd } from 'themes/colors';

const shineAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
`;

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSuccess' && prop !== 'approved',
})(({ theme, isSuccess, approved }) => ({
    position: 'relative',
    height: '54px',
    borderRadius: '16px',
    padding: '0 32px',
    textTransform: 'none',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.3px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    overflow: 'hidden',
    border: '1px solid transparent',
    transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',

    backgroundColor: (isSuccess || approved) ? ColorDrummondltd.GreenDrummond : ColorDrummondltd.RedDrummond,
    color: '#FFFFFF',

    boxShadow: theme.palette.mode === 'dark'
        ? `0 4px 20px 0 rgba(227, 25, 55, 0.2)`
        : `0 4px 16px 0 rgba(227, 25, 55, 0.25)`,

    '&:hover': {
        backgroundColor: (isSuccess || approved) ? '#7cb337' : '#c9142e',
        boxShadow: theme.palette.mode === 'dark'
            ? `0 6px 24px 0 rgba(227, 25, 55, 0.35), 0 0 12px ${ColorDrummondltd.RedDrummond}4D`
            : `0 6px 20px 0 rgba(227, 25, 55, 0.4), 0 0 8px ${ColorDrummondltd.RedDrummond}33`,

        '&::after': {
            animation: `${shineAnimation} 1.2s ease-in-out infinite`,
        }
    },

    '&.Mui-disabled': {
        backgroundColor: (isSuccess || approved) ? ColorDrummondltd.GreenDrummond : (theme.palette.mode === 'dark' ? '#2d2d2d' : '#f0f0f0'),
        color: (isSuccess || approved) ? '#FFFFFF !important' : (theme.palette.mode === 'dark' ? '#6d6d6d' : '#a0a0a0'),
        borderColor: (isSuccess || approved) ? 'transparent' : (theme.palette.mode === 'dark' ? '#3d3d3d' : '#e0e0e0'),
        boxShadow: 'none',
        cursor: (isSuccess || approved) ? 'default' : 'not-allowed',
        opacity: (isSuccess || approved) ? 0.9 : 1,
    },

    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '30%',
        left: '-100%',
        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%)',
        transform: 'skewX(-25deg)',
    }
}));

export const ApproveAPTHButton = ({
    loading = false,
    disabled = false,
    fullWidth = false,
    approved = false,
    onClick,
    children,
}) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [prevLoading, setPrevLoading] = useState(loading);

    useEffect(() => {
        if (prevLoading && !loading && !disabled && !approved) {
            setIsSuccess(true);
            const timer = setTimeout(() => {
                setIsSuccess(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
        setPrevLoading(loading);
    }, [loading, prevLoading, disabled, approved]);


    const iconVariants = {
        normal: { scale: 1, rotate: 0, x: 0 },
        hover: {
            scale: 1.05,
            rotate: 5,
            x: 2,
            transition: { type: 'spring', stiffness: 300, damping: 15 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            style={{ width: fullWidth ? '100%' : 'auto', display: 'inline-block' }}
        >
            <motion.div
                whileHover={(!loading && !disabled) ? "hover" : "normal"}
                whileTap={(!loading && !disabled) ? "tap" : "normal"}
                variants={{
                    normal: { scale: 1 },
                    hover: { scale: 1.03 },
                    tap: { scale: 0.97 }
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                <StyledButton
                    component={motion.button}
                    fullWidth={fullWidth}
                    disabled={disabled || loading}
                    onClick={onClick}
                    isSuccess={isSuccess}
                    approved={approved}
                    aria-busy={loading}
                    aria-live="polite"
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <Box
                                key="loading-state"
                                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <CircularProgress
                                    size={20}
                                    thickness={5}
                                    strokeLinecap="round"
                                    sx={{ color: '#FFFFFF' }}
                                />
                                <span>Aprobando...</span>
                            </Box>
                        ) : (isSuccess || approved) ? (
                            <Box
                                key="success-state"
                                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                                component={motion.div}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                            >
                                <Icon
                                    icon="solar:verified-check-bold"
                                    width="24"
                                    height="24"
                                />
                                <span>APT Aprobado</span>
                            </Box>
                        ) : (
                            <Box
                                key="normal-state"
                                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div variants={iconVariants}>
                                    <Icon
                                        icon="solar:shield-check-bold"
                                        width="24"
                                        height="24"
                                        style={{ display: 'block' }}
                                    />
                                </motion.div>
                                <span>{children || 'Aprobar APT'}</span>
                            </Box>
                        )}
                    </AnimatePresence>
                </StyledButton>
            </motion.div>
        </motion.div>
    );
};

export default ApproveAPTHButton;