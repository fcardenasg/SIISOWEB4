import { Box, IconButton, InputBase } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const AnimatedSearchBar = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Variantes de animación para el contenedor principal
    const containerVariants = {
        blur: {
            scale: 1,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
        focus: {
            scale: 1.02,
            boxShadow: '0px 8px 24px rgba(25, 118, 210, 0.25)',
            borderColor: '#1976d2', // Color primario de MUI
        },
    };

    // Variantes para el icono de búsqueda
    const searchIconVariants = {
        blur: { rotate: 0, color: '#9e9e9e', scale: 1 },
        focus: { rotate: 90, color: '#1976d2', scale: 1.2 },
    };

    const handleClear = () => {
        setQuery('');
    };

    return (
        <Box width="100%" maxWidth={600} mx="auto" my={4}>
            <motion.div
                variants={containerVariants}
                animate={isFocused ? 'focus' : 'blur'}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '30px',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    backgroundColor: '#fff',
                    padding: '8px 16px',
                    overflow: 'hidden',
                }}
            >
                {/* Icono de búsqueda animado */}
                <motion.div
                    variants={searchIconVariants}
                    animate={isFocused ? 'focus' : 'blur'}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    style={{ display: 'flex', marginRight: '12px' }}
                >
                    <Iconify icon="mdi:magnify" width={24} />
                </motion.div>

                {/* Input base de MUI */}
                <InputBase
                    sx={{ flex: 1, fontFamily: 'inherit', fontSize: '1rem' }}
                    placeholder="Buscar métodos de control en otras plantillas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    inputProps={{ 'aria-label': 'buscar métodos de control' }}
                />

                {/* Botón de limpiar con animación de entrada/salida */}
                <AnimatePresence>
                    {query && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                aria-label="limpiar búsqueda"
                                sx={{ color: '#9e9e9e', '&:hover': { color: '#1976d2' } }}
                            >
                                <Iconify icon="mdi:close-circle" width={20} />
                            </IconButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Box>
    );
};

export default AnimatedSearchBar;