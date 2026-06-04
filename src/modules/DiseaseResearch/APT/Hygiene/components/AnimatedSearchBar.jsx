import { Box, InputBase, Paper, Typography, IconButton } from '@mui/material';
import Iconify from 'components/iconify/iconify';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { GetAllComboAPTHPMetodoControl } from 'api/clients/APTHigienePlantillaClient';

const normalizeText = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const AnimatedSearchBar = ({ onSelect, idAPT }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allControlMethods, setAllControlMethods] = useState([]);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchAllControlMethods = async () => {
            if (!idAPT) return;

            setIsLoading(true);
            try {
                const response = await GetAllComboAPTHPMetodoControl(idAPT);

                if (response.data?.exito) {
                    const normalizedData = response.data.datos.map(item => ({
                        ...item,
                        normalizedLabel: normalizeText(item.label)
                    }));
                    setAllControlMethods(normalizedData);
                } else {
                    console.error('Error en la respuesta:', response.data);
                    setAllControlMethods([]);
                }
            } catch (error) {
                setAllControlMethods([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllControlMethods();
    }, [idAPT]);

    useEffect(() => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const normalizedQuery = normalizeText(query);
        const filtered = allControlMethods
            .filter(item => item.normalizedLabel.includes(normalizedQuery))
            .slice(0, 4);
        setSearchResults(filtered);
    }, [query, allControlMethods]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (item) => {
        setQuery(item.label);
        setSearchResults([]);
        setIsFocused(false);
        onSelect?.(item);
    };

    const handleClear = () => {
        setQuery('');
        setSearchResults([]);
        setIsFocused(true);
        inputRef.current?.focus();
    };

    const containerVariants = {
        blur: {
            scale: 1,
            boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.03)', // Más tenue en reposo
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
        focus: {
            scale: 1.01,
            boxShadow: '0px 4px 12px rgba(227, 25, 55, 0.08)', // Sombra reducida un 40% para un look más limpio
            borderColor: '#E31937',
        },
    };

    const searchIconVariants = {
        blur: { x: 0, rotate: 0, color: '#757575', scale: 1 },
        focus: { x: -2, rotate: 90, color: '#E31937', scale: 1.05 },
    };

    const fastSpring = { type: 'spring', stiffness: 550, damping: 28 };

    return (
        <Box ref={containerRef} width="100%" position="relative">
            <motion.div
                variants={containerVariants}
                animate={isFocused ? 'focus' : 'blur'}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '24px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    backgroundColor: '#ffffff',
                    padding: '10px 16px',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <motion.div
                    variants={searchIconVariants}
                    animate={isFocused ? 'focus' : 'blur'}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'flex', marginRight: '10px' }}
                >
                    <Iconify icon="mdi:magnify" width={20} height={20} />
                </motion.div>

                <InputBase
                    inputRef={inputRef}
                    sx={{
                        flex: 1,
                        fontFamily: 'inherit',
                        fontSize: '0.95rem',
                        '& .MuiInputBase-input': {
                            py: 0.5,
                            px: 0,
                        }
                    }}
                    placeholder="Buscar métodos de control..."
                    value={query?.toUpperCase()}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    inputProps={{ 'aria-label': 'buscar métodos de control' }}
                />

                <AnimatePresence>
                    {query && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.1 }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                aria-label="limpiar búsqueda"
                                sx={{
                                    color: '#9e9e9e',
                                    '&:hover': {
                                        color: '#E31937',
                                        backgroundColor: 'rgba(227, 25, 55, 0.08)'
                                    },
                                    ml: 0.5
                                }}
                            >
                                <Iconify icon="mdi:close" width={18} height={18} />
                            </IconButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isFocused && searchResults.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={fastSpring}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            marginTop: '8px',
                            borderRadius: '16px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.08)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            overflow: 'hidden',
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                maxHeight: '240px',
                                overflowY: 'auto',
                                p: 1,
                                '&::-webkit-scrollbar': { width: '5px' },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'rgba(0, 0, 0, 0.08)',
                                    borderRadius: '4px',
                                },
                            }}
                        >
                            {searchResults.map((item, index) => (
                                <motion.div
                                    key={item.value}
                                    initial={{ opacity: 0, y: 3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.015, ease: 'easeOut' }}

                                    whileHover={{
                                        backgroundColor: 'rgba(227, 25, 55, 0.04)',
                                        x: 4,
                                        transition: { type: 'spring', stiffness: 400, damping: 20 }
                                    }}
                                    whileTap={{ scale: 0.995 }}
                                    onClick={() => handleSelect(item)}
                                    style={{
                                        padding: '10px 14px',
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        marginBottom: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'background-color 0.1s ease'
                                    }}
                                >
                                    <Iconify
                                        icon="hugeicons:new-job"
                                        style={{
                                            color: '#E31937',
                                            marginRight: '12px',
                                            flexShrink: 0
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#2d3748',
                                            fontWeight: 400,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            fontSize: '0.88rem'
                                        }}
                                    >
                                        {item.label?.toUpperCase()}
                                    </Typography>
                                </motion.div>
                            ))}
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLoading && !searchResults.length && query && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            marginTop: '8px',
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid rgba(0, 0, 0, 0.06)',
                                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" fontWeight={400}>
                                Buscando métodos...
                            </Typography>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default AnimatedSearchBar;