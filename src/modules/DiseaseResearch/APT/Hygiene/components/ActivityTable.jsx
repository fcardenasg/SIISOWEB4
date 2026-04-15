import { yupResolver } from '@hookform/resolvers/yup';
import { AccessTime, Add, Close, Edit, ImageNotSupported, PhotoLibrary, PlaylistAddCheck } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    CardMedia,
    Chip,
    Divider,
    Fade,
    Grid,
    IconButton,
    Modal,
    Stack,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { UpperFirstChar } from 'components/helpers/Format';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import * as yup from 'yup';

const TruncatedText = ({ text, variant = "body1", sx = {}, ...props }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef(null);

    const checkTruncation = () => {
        const el = textRef.current;
        if (el) {
            const isOverflowing = el.scrollHeight > el.clientHeight;
            setIsTruncated(isOverflowing);
        }
    };

    useEffect(() => {
        checkTruncation();
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
    }, [text]);

    return (
        <Tooltip
            title={text}
            disableHoverListener={!isTruncated}
            disableInteractive
            placement="top"
            enterDelay={500}
        >
            <Typography
                ref={textRef}
                variant={variant}
                {...props}
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    ...sx
                }}
            >
                {text}
            </Typography>
        </Tooltip>
    );
};

const modalStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper', borderRadius: 3, boxShadow: 24, p: 4, outline: 'none'
};

const schema = yup.object().shape({
    actividad: yup.string().required('La actividad es requerida'),
    tiempoPromedio: yup.number().typeError('El tiempo promedio debe ser un número').required('El tiempo promedio es requerido').positive('El tiempo promedio debe ser diferente a 0'),
    descripcion: yup.string().required('La descripción es requerida'),
});

const ExigenciaRow = ({ index }) => {
    const { watch, setValue } = useFormContext();
    const aplica = watch(`listaExigenciaBiomecanica.${index}.exigenciaAplica`);
    const nameExigencia = watch(`listaExigenciaBiomecanica.${index}.nameExigencia`);

    useEffect(() => {
        if (!aplica) {
            setValue(`listaExigenciaBiomecanica.${index}.descripcion`, '');
        }
    }, [aplica, index, setValue]);

    return (
        <>
            <Grid item xs={12} md={4} lg={2.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <InputCheckBox name={`listaExigenciaBiomecanica.${index}.exigenciaAplica`} defaultValue={false} label="" />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {nameExigencia}
                </Typography>
            </Grid>

            <Grid item xs={12} md={8} lg={9.5}>
                <InputText
                    name={`listaExigenciaBiomecanica.${index}.descripcion`}
                    label="Descripción"
                    multiline
                    fullWidth
                    disabled={!aplica}
                />
            </Grid>
        </>
    );
};

const ActivityFormModal = ({ open, onClose, onSave }) => {
    const methods = useForm({ resolver: yupResolver(schema) });
    const { control, handleSubmit, reset, watch, setValue, formState: { errors } } = methods;
    const { fields } = useFieldArray({ control, name: "listaExigenciaBiomecanica" });

    useEffect(() => {
        async function getData() {
            try {
                const lsServerArea = await GetByTipoCatalogoCombo(CodCatalogo.APTHIGIENE_EXIGENCIA_BIOMECANICA);
                const sortedData = lsServerArea.data.sort((a, b) => a.value - b.value);

                const initialExigencias = sortedData.map(item => ({
                    idExigenciaBiomecanica: item.value,
                    nameExigencia: UpperFirstChar(item.label),
                    descripcion: '',
                    exigenciaAplica: false
                }));

                reset({
                    actividad: '',
                    tiempoPromedio: '',
                    descripcion: '',
                    evidencias: [],
                    listaExigenciaBiomecanica: initialExigencias
                });
            } catch (error) {
                toast.error("Error cargando las exigencias biomecánicas", error);
            }
        }

        if (open) getData();
    }, [open, reset]);

    const onSubmit = (data) => {
        const filteredData = { ...data };
        onSave(filteredData);
        reset();
        toast.success("Actividad registrada correctamente");
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const currentPhotos = watch('evidencias') || [];
        setValue('evidencias', [...currentPhotos, ...newFiles]);
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FormProvider {...methods}>
                <Box sx={{
                    ...modalStyle,
                    width: '95%',
                    maxWidth: 1200,
                    maxHeight: '92vh',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 2, md: 4 },
                    overflow: 'hidden'
                }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="h4">Registrar Actividad</Typography>
                            <Typography variant="caption" color="text.secondary">Complete los detalles técnicos para cada exigencia biomecánica</Typography>
                        </Box>

                        <IconButton
                            onClick={onClose}
                            sx={{
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark', transform: 'rotate(90deg)' },
                                transition: 'all 0.3s'
                            }}
                        >
                            <Close fontSize="small" sx={{ color: 'white' }} />
                        </IconButton>
                    </Stack>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{
                        overflowY: 'auto',
                        flex: 1,
                        pr: 1,
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '10px' }
                    }}>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12} md={9} lg={10}>
                                <InputSelect options={[]} name="actividad" label="Actividad o subactividad" defaultValue="" />
                            </Grid>

                            <Grid item xs={12} md={3} lg={2}>
                                <InputText name="tiempoPromedio" label="Tiempo (min)" type="number" bug={errors.tiempoPromedio} />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText name="descripcion" label="Descripción general" multiline minRows={2} bug={errors.descripcion} />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <SubCard darkTitle title="Registrar exigencias biomecánicas de la actividad">
                                    <Grid container spacing={2}>
                                        {fields.map((field, index) => (
                                            <ExigenciaRow key={field.id} index={index} />
                                        ))}
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button variant="outlined" component="label" startIcon={<PhotoLibrary />} size="large">
                                Imágenes de referencia
                                <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                            </Button>
                            <Chip label={`${watch('evidencias')?.length || 0} imágenes`} size="large" color="secondary" variant="soft" />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={onClose} color="secondary">Cancelar</Button>
                            <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ px: 6 }}>
                                Guardar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </FormProvider>
        </Modal>
    );
};

const modalStyleDetail = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: 1200,
    bgcolor: 'background.paper',
    borderRadius: '24px',
    boxShadow: '0px 25px 50px rgba(0,0,0,0.2)',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: '85vh',
    overflow: 'hidden',
};

const ActivityDetailModal = ({ activity, onClose }) => {
    const isOpen = Boolean(activity);
    const evidencias = activity?.evidencias || [];

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500, sx: { backdropFilter: 'blur(8px)' } }, }}
        >
            <Fade in={isOpen}>
                <Box sx={modalStyleDetail}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">Detalle de Actividad</Typography>

                            <IconButton
                                onClick={onClose}
                                sx={{
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.dark', transform: 'rotate(90deg)' },
                                    transition: 'all 0.3s',
                                }}
                            >
                                <Close fontSize="small" sx={{ color: 'white' }} />
                            </IconButton>
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                    </Box>

                    <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
                        <Grid
                            item xs={12} md={7}
                            sx={{
                                p: 3,
                                pt: 1,
                                height: '100%',
                                overflowY: 'auto',
                                borderRight: { md: '1px solid #f0f0f0' },
                                '&::-webkit-scrollbar': { width: '6px' },
                                '&::-webkit-scrollbar-thumb': { backgroundColor: '#e0e0e0', borderRadius: '10px' }
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                                    {activity?.actividad}
                                </Typography>

                                <Chip
                                    icon={<AccessTime sx={{ fontSize: '16px !important' }} />}
                                    label={`${activity?.tiempoPromedio} minutos de duración`}
                                    size="small"
                                    sx={{ mb: 2, fontWeight: 600, bgcolor: '#f0f7ff', color: '#007fff' }}
                                />

                                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, textAlign: 'justify' }}>
                                    {activity?.descripcion}
                                </Typography>

                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                                    Exigencias biomecánicas de la actividad
                                </Typography>

                                <Stack spacing={2}>
                                    {activity?.listaExigenciaBiomecanica?.map((ex, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                p: 2,
                                                bgcolor: '#f8f9fa',
                                                borderRadius: '16px',
                                                border: '1px solid #edf2f7',
                                                transition: 'all 0.2s',
                                                '&:hover': { transform: 'translateX(5px)', borderColor: 'primary.light', bgcolor: '#fff' }
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                                <Box component="span" sx={{ fontWeight: 800, color: 'primary.main', mr: 0.5 }}>
                                                    {ex.nameExigencia}:
                                                </Box>
                                                <Box component="span" sx={{ color: 'text.secondary' }}>
                                                    {ex.descripcionExigencia}
                                                </Box>
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </motion.div>
                        </Grid>

                        {/* Columna Derecha: Evidencias */}
                        <Grid item xs={12} md={5} sx={{ p: 3, bgcolor: '#fcfcfc' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                                Imágenes de referencia
                            </Typography>

                            {evidencias.length > 0 ? (
                                <Box sx={{
                                    display: 'grid',
                                    gap: 2,
                                    gridTemplateColumns: evidencias.length === 1 ? '1fr' : '1fr 1fr'
                                }}>
                                    {evidencias.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.04 }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Box sx={{
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                height: evidencias.length === 1 ? 280 : 160,
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                                position: 'relative'
                                            }}>
                                                <img
                                                    src={URL.createObjectURL(img)}
                                                    alt={img.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <Box sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    width: '100%',
                                                    p: 1,
                                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                                }}>
                                                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 500, display: 'block', px: 1 }} noWrap>
                                                        {img.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </motion.div>
                                    ))}
                                </Box>
                            ) : (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        height: '200px',
                                        bgcolor: '#f1f3f5',
                                        borderRadius: '20px',
                                        border: '2px dashed #dee2e6',
                                        color: 'text.disabled',
                                        p: 3,
                                        textAlign: 'center'
                                    }}
                                >
                                    <ImageNotSupported sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        No hay imágenes registradas para esta actividad
                                    </Typography>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
};

const modalStyleImg = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
    outline: 'none'
};

const PhotoGalleryModal = ({ openPhotos, setOpenPhotos }) => {
    const [displayPhotos, setDisplayPhotos] = useState([]);
    const isOpen = Boolean(openPhotos);

    useEffect(() => {
        if (openPhotos) {
            setDisplayPhotos(openPhotos);
        }
    }, [openPhotos]);

    const handleClose = () => {
        setOpenPhotos(null);

        setTimeout(() => {
            setDisplayPhotos([]);
        }, 600);
    };

    const photoCount = displayPhotos.length;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: { timeout: 500, sx: { backdropFilter: 'blur(4px)' } },
            }}
        >
            <Fade in={isOpen}>
                <Box sx={modalStyleImg}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">Imágenes de referencia</Typography>

                        <IconButton
                            onClick={handleClose}
                            sx={{
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark', transform: 'rotate(90deg)' },
                                transition: 'all 0.3s'
                            }}
                        >
                            <Close fontSize="small" sx={{ color: 'white' }} />
                        </IconButton>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        pr: 1,
                        '&::-webkit-scrollbar': { width: '5px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#CED6E0', borderRadius: '10px' }
                    }}>
                        <Box
                            style={{
                                display: 'grid',
                                gap: '16px',
                                gridTemplateColumns: photoCount === 1 ? '1fr' : 'repeat(2, 1fr)',
                            }}
                        >
                            <AnimatePresence>
                                {displayPhotos.map((img, i) => (
                                    <motion.div
                                        key={img.url || i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: i * 0.08 }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <Box sx={{
                                            position: 'relative',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                            lineHeight: 0
                                        }}>
                                            <CardMedia
                                                component="img"
                                                image={URL.createObjectURL(img)}
                                                alt={img.name}
                                                sx={{
                                                    width: '100%',
                                                    height: photoCount === 1 ? 'auto' : '240px',
                                                    objectFit: 'cover',
                                                }}
                                            />

                                            <Box sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                width: '100%',
                                                p: 1,
                                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                            }}>
                                                <Typography variant="caption" sx={{ color: 'white', fontWeight: 500, opacity: 0.9 }}>
                                                    {img.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

const ActivityTable = () => {
    const [openForm, setOpenForm] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [openPhotos, setOpenPhotos] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const { setValue, watch } = useFormContext();
    const listaActividades = watch("listaActividades") || [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listaActividades.length) : 0;
    const currentItems = listaActividades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleSaveActivity = (data) => {
        const actuales = listaActividades;
        setValue("listaActividades", [...actuales, { ...data, id: Date.now() }]);
    };

    return (
        <>
            <SubCard
                darkTitle
                title="Actividades o subactividades realizadas"
                secondary={
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenForm(true)}
                        color="secondary"
                    >
                        Agregar Actividad
                    </Button>
                }
            >
                <TableContainer>
                    <Table size="medium">
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', width: '25%', userSelect: 'none', cursor: "default" }}>Actividad</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', width: '30%', userSelect: 'none', cursor: "default" }}>Descripción</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary', userSelect: 'none', cursor: "default" }}>
                                    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <AccessTime fontSize="small" /> <span>Tiempo</span>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', userSelect: 'none', cursor: "default" }}>Exigencias biomecánicas</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary', userSelect: 'none', cursor: "default" }}>Referencia</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary', userSelect: 'none', cursor: "default" }}>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaActividades.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4, borderBottom: 'none' }}>
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Stack alignItems="center" spacing={2}>
                                                <Box sx={{ backgroundColor: 'primary.main', borderRadius: '50%', p: 2, display: 'flex', opacity: 0.8 }}>
                                                    <PlaylistAddCheck sx={{ fontSize: 25, color: 'white' }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h4" color="primary.main">Sin registros de actividad</Typography>
                                                    <Typography variant="body1" color="text.secondary">Haga clic en <strong>"Agregar Actividad"</strong> para comenzar.</Typography>
                                                </Box>
                                            </Stack>
                                        </motion.div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    <AnimatePresence mode="wait">
                                        {currentItems.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                onDoubleClick={() => setSelectedActivity(row)}
                                                hover
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                            >
                                                <TableCell sx={{ userSelect: 'none' }}>
                                                    <TruncatedText text={row.actividad} />
                                                </TableCell>

                                                <TableCell sx={{ userSelect: 'none' }}>
                                                    <TruncatedText text={row.descripcion} variant="body2" />
                                                </TableCell>

                                                <TableCell align="center" sx={{ userSelect: 'none' }}>
                                                    <Chip
                                                        label={`${row.tiempoPromedio} min`}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontWeight: 600, color: 'primary.main', borderColor: 'primary.main' }}
                                                    />
                                                </TableCell>

                                                <TableCell sx={{ userSelect: 'none' }}>
                                                    <Stack spacing={0.5}>
                                                        {row.listaExigenciaBiomecanica.slice(0, 2).map((ex, i) => (
                                                            <Box key={i} sx={{ display: 'flex', gap: 0.5 }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'secondary.main', whiteSpace: 'nowrap' }}>
                                                                    {ex.nameExigencia}:
                                                                </Typography>
                                                                <Typography variant="caption" noWrap sx={{ maxWidth: 150 }}>
                                                                    {ex.descripcionExigencia}
                                                                </Typography>
                                                            </Box>
                                                        ))}

                                                        {row.listaExigenciaBiomecanica.length > 2 && (
                                                            <Typography variant="caption" color="text.disabled italic">
                                                                +{row.listaExigenciaBiomecanica.length - 2} más...
                                                            </Typography>
                                                        )}
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="center" sx={{ userSelect: 'none' }}>
                                                    <Tooltip title="Ver imágenes" placement="top" disableInteractive>
                                                        <IconButton
                                                            color={row.evidencias?.length > 0 ? "primary" : "default"}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenPhotos(row.evidencias);
                                                            }}
                                                            disabled={!row.evidencias?.length}
                                                        >
                                                            <PhotoLibrary />
                                                            {row.evidencias?.length > 0 && (
                                                                <Typography variant="caption" sx={{ ml: 1 }}>
                                                                    {row.evidencias.length}
                                                                </Typography>
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell align="center" sx={{ userSelect: 'none' }}>
                                                    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                                        <Tooltip title="Actualizar" placement="top" disableInteractive>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => {/* Tu método aquí */ }}
                                                                size="small"
                                                            >
                                                                <Edit fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip title="Eliminar" placement="top" disableInteractive>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => {/* Tu método aquí */ }}
                                                                size="small"
                                                            >
                                                                <Close fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </AnimatePresence>

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 61 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider />

                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={listaActividades.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
            </SubCard>

            <ActivityFormModal open={openForm} onClose={() => setOpenForm(false)} onSave={handleSaveActivity} />
            <ActivityDetailModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
            <PhotoGalleryModal openPhotos={openPhotos} setOpenPhotos={setOpenPhotos} />
        </>
    );
};

export default ActivityTable;