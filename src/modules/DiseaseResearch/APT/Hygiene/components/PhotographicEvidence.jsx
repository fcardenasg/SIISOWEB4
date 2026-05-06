import { AddPhotoAlternateOutlined, Close, DeleteOutline, PhotoLibraryOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, Fade, Grid, IconButton, Paper, Stack, TextField, Typography, Slide } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DeleteAPTHPImage, GetAllAPTHPImage, SaveAPTHPImage } from 'api/clients/APTHigienePlantillaClient';
import toast from 'react-hot-toast';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PhotographicEvidence = ({ name, objImage }) => {
    const { control } = useFormContext();
    const { fields, remove, replace } = useFieldArray({
        control,
        name
    });

    const [titulo, setTitulo] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const fileInputRef = useRef(null);

    const loadImages = useCallback(async () => {
        if (!objImage?.idAPT || !objImage?.idItemAcordeon || !objImage?.idSegundarioModulo) return;
        try {
            const response = await GetAllAPTHPImage(objImage.idAPT, objImage.idItemAcordeon, objImage.idSegundarioModulo);
            if (response.data.exito && response.data.datos) {
                const newEvidences = response.data.datos.map((imageData, index) => ({
                    titulo: imageData.titulo || imageData.nombre,
                    fechaSubida: new Date(imageData.fechaRegistro).toISOString() || new Date().toISOString(),
                    preview: imageData.urlServidor,
                    serverId: imageData.id
                }));
                replace(newEvidences);
            }
        } catch (error) {
        }
    }, [objImage?.idAPT, objImage?.idItemAcordeon, objImage?.idSegundarioModulo, replace]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const handleOpenModal = (field) => {
        setTempImage(field);
        setSelectedId(field.id);
    };

    const handleAnimationExited = () => {
        setTempImage(null);
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('Archivo', file);
                formData.append('IdAPT', objImage.idAPT);
                formData.append('IdItemAcordeon', objImage.idItemAcordeon);
                formData.append('IdSegundarioModulo', objImage.idSegundarioModulo);
                formData.append('ThisRecordIsNotValidated', objImage.thisRecordIsNotValidated === true);
                if (titulo.trim()) {
                    formData.append('Titulo', titulo.trim());
                }

                const response = await SaveAPTHPImage(formData, true);
                if (response.data.exito) {
                    await loadImages();
                    toast.success("Imagen guardada correctamente");
                }
            } catch (error) {
                toast.error("Error al guardar la imagen");
            }
            setTitulo('');
            e.target.value = null;
        }
    };

    const handleDeleteImage = async (index, field) => {
        try {
            if (field.serverId) {
                const response = await DeleteAPTHPImage(field.serverId);
                if (response.data.exito) {
                    toast.success("Imagen eliminada correctamente");
                    await loadImages();
                } else {
                    toast.error(response.data.mensaje || "Error al eliminar la imagen");
                }
            } else {
                remove(index);
            }
        } catch (error) {
            toast.error("Error al eliminar la imagen");
        }
    };

    useEffect(() => {
        return () => {
            fields.forEach((field) => {
                if (field.preview && field.preview.startsWith('blob:')) {
                    URL.revokeObjectURL(field.preview);
                }
            });
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={4}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Título de la evidencia (opcional)..."
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'background.paper' } }}
                />
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<AddPhotoAlternateOutlined />}
                    disableElevation
                    sx={{
                        borderRadius: 3,
                        whiteSpace: 'nowrap',
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        fontWeight: 700,
                        bgcolor: 'text.primary',
                        '&:hover': { bgcolor: 'text.secondary' }
                    }}
                >
                    Subir Evidencia
                    <input type="file" hidden accept="image/*" ref={fileInputRef} onChange={handleFileSelect} />
                </Button>
            </Stack>

            <Grid container spacing={2}>
                <AnimatePresence mode="popLayout">
                    {fields.length > 0 ? (
                        fields.map((field, index) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                key={field.id}
                                component={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                layout
                            >
                                <Paper
                                    variant="outlined"
                                    onClick={() => handleOpenModal(field)}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.01)',
                                            borderColor: 'primary.main',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
                                            transform: 'translateY(-2px)',
                                            '& .delete-btn': { opacity: 1 }
                                        }
                                    }}
                                >
                                    <Box sx={{ width: 85, height: 85, borderRadius: 3, overflow: 'hidden', flexShrink: 0, bgcolor: 'grey.100' }}>
                                        <img src={field.preview} alt={field.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>

                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                                            {field.titulo}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontWeight: 500 }}>
                                            {new Date(field.fechaSubida).toLocaleDateString('es-CO', {
                                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        className="delete-btn"
                                        size="medium"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteImage(index, field); }}
                                        sx={{
                                            opacity: 0,
                                            transition: 'all 0.2s',
                                            bgcolor: 'secondary.main',
                                            '&:hover': { color: 'secondary.dark', bgcolor: 'secondary.main' }
                                        }}
                                    >
                                        <DeleteOutline fontSize="medium" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    py: 4,
                                    borderRadius: 4,
                                    borderStyle: 'dashed',
                                    borderWidth: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(0,0,0,0.01)',
                                    color: 'text.disabled'
                                }}
                            >
                                <PhotoLibraryOutlined sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                    Aún no hay evidencias
                                </Typography>
                                <Typography variant="body2">
                                    Las fotos que cargues aparecerán en esta sección.
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </AnimatePresence>
            </Grid>

            <Dialog
                open={Boolean(selectedId)}
                onClose={() => setSelectedId(null)}
                maxWidth="md"
                fullWidth
                TransitionComponent={Transition}
                TransitionProps={{ onExited: handleAnimationExited }}
                transitionDuration={{ enter: 400, exit: 300 }}
                PaperProps={{ sx: { borderRadius: 5, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' } }}
            >
                <Fade in={Boolean(selectedId)} timeout={800}>
                    <IconButton
                        onClick={() => setSelectedId(null)}
                        sx={{
                            position: 'absolute', top: 20, right: 20, zIndex: 10,
                            bgcolor: 'secondary.main', color: 'white', backdropFilter: 'blur(10px)',
                            '&:hover': { bgcolor: 'secondary.dark', transform: 'rotate(90deg)' }
                        }}
                    >
                        <Close sx={{ color: 'white' }} />
                    </IconButton>
                </Fade>

                <DialogContent sx={{ p: 0 }}>
                    {tempImage && (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ bgcolor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                                <img
                                    src={tempImage.preview}
                                    alt={tempImage.titulo}
                                    style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                                />
                            </Box>
                            <Box sx={{ p: 4, bgcolor: 'background.paper' }}>
                                <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                                    {tempImage.titulo}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                                    Registrado el {new Date(tempImage.fechaSubida).toLocaleString('es-CO', {
                                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PhotographicEvidence;