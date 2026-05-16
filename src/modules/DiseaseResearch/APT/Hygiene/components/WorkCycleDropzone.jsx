import { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useController, useFormContext } from 'react-hook-form';
import Lottie from 'lottie-react';
import animation from 'assets/img/animation.json';
import { DeleteAPTHPImage, GetAllAPTHPImage, SaveAPTHPImage } from 'api/clients/APTHigienePlantillaClient';
import { ImageInterpretationAI } from 'api/clients/ServiceIAClient';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { ParamDelete } from 'components/alert/AlertAll';

export default function WorkCycleDropzone({ name, control, rules, idAPT, tipoLogica, disabled = false }) {
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

    const idItemAcordeon = 44;
    const idSegundarioModulo = null;

    const fetchImageData = async () => {
        try {
            const params = { idAPT, idItemAcordeon };
            if (idSegundarioModulo) params.idSegundarioModulo = idSegundarioModulo;

            const response = await GetAllAPTHPImage(params.idAPT, params.idItemAcordeon, params.idSegundarioModulo, tipoLogica);
            if (response.data.exito) {
                if (response.data.datos?.length > 0) {
                    const imageData = response.data.datos[0];
                    setServerImageId(imageData.id);
                    setPreview(imageData.urlServidor);
                    onChange(imageData.urlServidor);
                } else {
                    setPreview(null);
                    onChange(null);
                    setServerImageId(null);
                }
            } else {
                setPreview(null);
                onChange(null);
                setServerImageId(null);
                toast.error(response.data.mensaje || "No se encontró imagen de ciclo de trabajo");
            }
        } catch (error) {
            toast.error("Error cargando imagen:", error);
        }
    };

    useEffect(() => {
        if (idAPT) {
            fetchImageData();
        }
    }, [idAPT]);

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
            formData.append('IdAPT', idAPT);
            formData.append('IdItemAcordeon', idItemAcordeon);
            if (idSegundarioModulo) formData.append('IdSegundarioModulo', idSegundarioModulo);

            const response = await SaveAPTHPImage(formData, tipoLogica, true);
            if (response.data.exito) {
                await fetchImageData();
                toast.success("Imagen de ciclo de trabajo guardada correctamente");
                toast.loading("Analizando ciclo de trabajo con IA...", { id: "analyzing-cycle" });

                try {
                    const promptText = `Actúa como un Especialista en Ingeniería de Métodos. Tu tarea es extraer y analizar los datos técnicos de la imagen adjunta para el cargo: ${cargoText?.label}.

                    REGLAS DE ORO:
                    1. Retorna ÚNICAMENTE código HTML (sin bloques de código Markdown, sin triple comillas \`\`\`).
                    2. NO incluyas introducciones ("Aquí tienes...", "El análisis es...") ni conclusiones.
                    3. El nombre del cargo debe aparecer como un título <h4> en Mayúsculas Iniciales (ej: Operador De Camión).
                    4. NO inventes valores; extrae ÚNICAMENTE los que aparecen en la imagen actual.

                    CONTENIDO A GENERAR (Usa <ul> y <li>):

                    <h4>Interpretación del Ciclo: ${cargoText?.label?.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</h4>
                    <ul>
                    <li><strong>Resumen de Jornada:</strong> Describe la duración total, el tiempo de operación efectiva y el número de ciclos según los datos detectados en la imagen.</li>
                    <li><strong>Desglose del Ciclo:</strong> Identifica el tiempo por ciclo (total) y propón una distribución técnica de sus fases (Cargue, Desplazamiento, Descargue, etc.) adaptadas a las funciones de un ${cargoText?.label}, asegurando que la suma coincida con el total de la imagen.</li>
                    <li><strong>Tiempos Complementarios:</strong> Detalla los minutos y porcentajes destinados a inspección y pausas organizacionales según el gráfico.</li>
                    <li><strong>Observación Técnica:</strong> Una breve frase sobre la naturaleza del ciclo (repetitivo, intermitente, etc.) basada en la secuencia visual.</li>
                    </ul>`;

                    const aiFormData = new FormData();
                    aiFormData.append('imageFile', file);
                    aiFormData.append('prompt', promptText);

                    const aiResponse = await ImageInterpretationAI(aiFormData);
                    if (aiResponse.data?.exito) {
                        let resultHtml = aiResponse.data.datos;
                        resultHtml = resultHtml.replace(/```html/gi, "").replace(/```/g, "").trim();
                        setValue('interpretacionCicloTrabajo', resultHtml, { shouldValidate: true, shouldDirty: true });
                        toast.success("Análisis de ciclo completado", { id: "analyzing-cycle" });
                    } else {
                        toast.error("Error al analizar el ciclo con IA", { id: "analyzing-cycle" });
                    }
                } catch (error) {
                    toast.error("Ocurrió un error en el análisis de IA", { id: "analyzing-cycle" });
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
            const willDelete = await swal(ParamDelete);
            if (willDelete) {
                if (serverImageId) {
                const response = await DeleteAPTHPImage(serverImageId, tipoLogica);
                    if (response.data.exito) {
                        toast.success("Imagen eliminada correctamente");
                        setServerImageId(null);
                        setPreview(null);
                        onChange(null);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    } else {
                        toast.error(response.data.mensaje || "Error al eliminar la imagen de la base de datos");
                    }
                } else {
                    // Si no hay ID de servidor, solo limpiamos el estado local
                    setServerImageId(null);
                    setPreview(null);
                    onChange(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }
            }
        } catch (error) {
            toast.error("Error al procesar la eliminación");
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
                            Sube la imagen del ciclo de trabajo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Arrastra y suelta para analizar con IA
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
