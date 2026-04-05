import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useController } from 'react-hook-form';
import Lottie from 'lottie-react';
import animation from 'assets/img/animation.json';

export default function ImageDropzone({ name, control, rules }) {
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({ name, control, rules });

    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (value && value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof value === 'string') {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0 && files[0].type.startsWith('image/')) {
            onChange(files[0]);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onChange(files[0]);
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const fileName = value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                variant="outlined"
                onClick={() => !preview && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: isDragging ? 'primary.main' : error ? 'error.main' : '#e0e0e0',
                    backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.02)' : '#fcfcfc',
                    cursor: preview ? 'default' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 4,
                    p: 1.5,
                    transition: 'border-color 0.2s, background-color 0.2s',
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {preview ? (
                    <Box
                        sx={{
                            width: '98%',
                            height: '98%',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            borderRadius: 3,
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            component="img"
                            src={preview}
                            alt="Preview"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                py: 1,
                                px: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                borderTop: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    userSelect: 'none',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '80%'
                                }}
                            >
                                {fileName}
                            </Typography>
                        </Box>

                        <Tooltip title="Remover" placement='top' disableInteractive>
                            <IconButton
                                onClick={handleRemoveImage}
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    backgroundColor: 'secondary.main',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'secondary.dark',
                                        transform: 'scale(1.05)'
                                    },
                                    zIndex: 2
                                }}
                                size="small"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <Box sx={{ width: 220, height: 220 }}>
                            <Lottie
                                animationData={animation}
                                loop={true}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Box>
                        <Typography variant="h5" color="text.primary" sx={{ mt: 2, fontWeight: 600 }}>
                            Sube tu documento o imagen
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Arrastra y suelta para ver todos los detalles
                        </Typography>
                    </Box>
                )}
            </Paper>

            {error && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 1, display: 'block', textAlign: 'center', fontWeight: 600 }}
                >
                    {error.message}
                </Typography>
            )}
        </Box>
    );
}