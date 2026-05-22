import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useController, useFormContext } from 'react-hook-form';
import Lottie from 'lottie-react';
import animation from 'assets/img/animation.json';
import { DeleteAPTHPImage, GetAllAPTHPImage, SaveAPTHPImage } from 'api/clients/APTHigienePlantillaClient';
import { ImageInterpretationAI } from 'api/clients/ServiceIAClient';
import toast from 'react-hot-toast';

export default function ImageDropzone({ name, control, rules, objImage, disabled = false, exposureType, targetInput }) {
    const { setValue, getValues } = useFormContext();
    const {
        field: { onChange, value },
        fieldState: { error }
    } = useController({ name, control, rules });

    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const [serverImageId, setServerImageId] = useState(null);
    const fileInputRef = useRef(null);
    const cargoText = getValues('cargoAuto') || '';

    useEffect(() => {
        if (objImage?.idAPT && objImage?.idItemAcordeon && objImage?.idSegundarioModulo) {
            async function loadImage() {
                try {
                    const response = await GetAllAPTHPImage(objImage.idAPT, objImage.idItemAcordeon, objImage.idSegundarioModulo, objImage.tipoLogica);
                    if (response.data.exito) {
                        if (response.data.datos?.length > 0) {
                            const imageData = response.data.datos[0];
                            setServerImageId(imageData.id);
                            setPreview(imageData.urlServidor);
                            onChange(imageData.urlServidor);
                        }
                    } else {
                        setPreview(null);
                        onChange(null);
                        setServerImageId(null);
                        toast.error(response.data.mensaje || 'No se encontró imágenes para este registro');
                    }
                } catch (error) {
                    toast.error("Error cargando imagen:", error);
                }
            }
            loadImage();
        }
    }, [objImage?.idAPT, objImage?.idItemAcordeon, objImage?.idSegundarioModulo]);

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
        if (disabled) return;
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        if (disabled) return;
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (disabled) return;
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0 && files[0].type.startsWith('image/')) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (disabled) return;
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('Archivo', file);
            formData.append('IdAPT', objImage.idAPT);
            formData.append('IdItemAcordeon', objImage.idItemAcordeon);
            formData.append('IdSegundarioModulo', objImage.idSegundarioModulo);

            const response = await SaveAPTHPImage(formData, objImage.tipoLogica, true);
            if (response.data.exito) {
                onChange(file);
                toast.success("Imagen guardada correctamente");

                if (exposureType && targetInput) {
                    toast.loading("Analizando resultados con IA...", { id: "analyzing-image" });
                    try {
                        const promptText = `
                            Analiza las imágenes de exposición ${exposureType} para el cargo ${cargoText?.label}. Presenta los resultados en formato de lista con viñetas o puntos, similar al siguiente ejemplo:

                            - En el periodo se han realizado X mediciones
                            - El nivel promedio es de X (nivel permitido de Y)
                            - El índice de exposición promedio es de X (por debajo del nivel permitido / nivel permitido / por encima del nivel permitido)
                            - El índice de riesgo (peor escenario) es de X (por debajo del nivel permitido / nivel permitido / por encima del nivel permitido)
                            - Nota: observación general sobre las mediciones

                            Evalúa cada valor técnico (niveles promedio, índices de exposición y riesgo) comparándolos con los estándares internacionales reconocidos para ${exposureType} y determina si están: por debajo
                            del nivel permitido, en el nivel permitido, o por encima del nivel permitido. Extrae TODOS los valores numéricos visibles en las imágenes, tanto los medidos como los límites permitidos, y preséntalos con sus valores reales. 
                            No uses variables genéricas como "X" o "Y", sino los valores exactos obtenidos de las imágenes. Incluye los datos clave: número de mediciones, niveles promedio vs límites, índices de exposición y riesgo, 
                            comparaciones con/sin EPP, peores escenarios. Usa HTML con <ul> y <li> para las listas. Mantén el tono técnico y directo del ejemplo proporcionado.`;

                        const aiFormData = new FormData();
                        aiFormData.append('imageFile', file);
                        aiFormData.append('prompt', promptText);

                        const aiResponse = await ImageInterpretationAI(aiFormData);
                        if (aiResponse.data?.exito) {
                            let resultHtml = aiResponse.data.datos;
                            resultHtml = resultHtml.replace(/```html/gi, "").replace(/```/g, "").trim();
                            setValue(targetInput, resultHtml, { shouldValidate: true, shouldDirty: true });
                            toast.success("Análisis de IA completado", { id: "analyzing-image" });
                        } else {
                            toast.error("Error al analizar la imagen con IA", { id: "analyzing-image" });
                        }
                    } catch (error) {
                        toast.error("Ocurrió un error en el análisis de IA", { id: "analyzing-image" });
                    }
                }
            } else {
                onChange(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                toast.error(response.data.mensaje || "Error al guardar la imagen");
            }
        } catch (error) {
            onChange(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            toast.error("Error al guardar la imagen");
        }
    };

    const handleRemoveImage = async (e) => {
        e.stopPropagation();
        if (disabled) return;
        try {
            if (serverImageId) {
                const response = await DeleteAPTHPImage(serverImageId, objImage.tipoLogica);
                if (response.data.exito) {
                    toast.success("Imagen eliminada correctamente");
                }
            }
        } catch (error) {
            toast.error("Error al eliminar la imagen");
        }
        setServerImageId(null);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const fileName = value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

    return (
        <Box sx={{ width: '100%', opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
            <Paper
                variant="outlined"
                onClick={() => !preview && !disabled && fileInputRef.current?.click()}
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
                    cursor: disabled ? 'not-allowed' : preview ? 'default' : 'pointer',
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
                    disabled={disabled}
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

                        {!disabled && (
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
                        )}
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