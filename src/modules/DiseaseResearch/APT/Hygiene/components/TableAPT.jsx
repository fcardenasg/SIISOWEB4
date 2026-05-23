import { yupResolver } from '@hookform/resolvers/yup';
import { Add, AddCircle, ClearAll, Close, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Checkbox,
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import {
    DeleteAPTHPMetodoControl,
    DeleteAPTHPOrganizationalFactor,
    DeleteAPTHPValorRefeSegmento,
    ActivityRecordsExist,
    GetAllAPTHPMetodoControl,
    GetAllAPTHPMetodoOWAS,
    GetAllAPTHPOrganizationalFactor,
    GetAllAPTHPValorRefeSegmento,
    SaveAPTHPMetodoControl,
    SaveAPTHPMetodoOWAS,
    SaveAPTHPOrganizationalFactor,
    SaveAPTHPValorRefeSegmento
} from 'api/clients/APTHigienePlantillaClient';
import { GetByTipoCatalogoCombo, InsertCatalog } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { UpperFirstChar } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import InputSelect from 'components/input/InputSelect';
import InputTextEditor from 'components/input/InputTextEditor';
import EmptyState from 'components/loading/EmptyState';
import { useEffect, useState, useCallback } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import CustomAlert from './CustomAlert';
import { formatearResultado, posturasErgonomicasOWAS } from './ArrayAPT';
import ControlModal from 'components/controllers/ControlModal';
import AnimatedSearchBar from './AnimatedSearchBar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E0E0E0',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        padding: '8px 12px',
        userSelect: 'none',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '6px 12px',
        userSelect: 'none',
        cursor: 'default',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme, isselected }) => ({
    backgroundColor: isselected ? '#bbdefb !important' : 'inherit',
    borderLeft: isselected && `5px solid ${theme.palette.primary.main}`,
    transition: 'all 0.2s ease',

    '&:nth-of-type(odd)': {
        backgroundColor: isselected ? '#bbdefb !important' : theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: isselected ? '#bbdefb !important' : '#f5f5f5',
        cursor: 'pointer'
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ExcelTableCell = styled(StyledTableCell)(() => ({
    border: '1px solid #bdbdbd',
}));

const StyledNumberInput = styled('input')({
    width: '80px',
    textAlign: 'center',
    color: 'red',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '4px',
    outline: 'none',
    display: 'block',
    margin: '0 auto',
    '&[type=number]': {
        MozAppearance: 'textfield',
    },
    '&::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
});

const PostureCard = ({ item, onClick }) => (
    <Card
        onClick={onClick}
        sx={{
            display: 'flex',
            mb: 2,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            border: '1px solid #eef2f6',
            borderRadius: '16px', // Bordes más suaves
            overflow: 'hidden',
            background: '#ffffff',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                borderColor: 'primary.main',
                '& .code-badge': {
                    bgcolor: 'primary.main',
                    color: '#fff'
                }
            }
        }}
    >
        <Box sx={{
            width: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fcfcfc',
            borderRight: '1px solid #f0f0f0'
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                }}
                image={item.imagen}
                alt={item.nombre}
            />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2, position: 'relative' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2d3436', lineHeight: 1.2 }}>
                {item.nombre}
            </Typography>

            {item.descripcion && (
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, lineHeight: 1.4 }}>
                    {item.descripcion}
                </Typography>
            )}

            <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center' }}>
                <Typography
                    className="code-badge"
                    variant="caption"
                    sx={{
                        fontWeight: 900,
                        bgcolor: '#f1f2f6',
                        color: 'primary.main',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        transition: 'all 0.3s'
                    }}
                >
                    Código: {item.codigo}
                </Typography>
            </Box>
        </Box>
    </Card>
);

export const OWASMethodTables = () => {
    const { watch: watchMain } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const categoriaCargo = watchMain("categoriaCargo");

    const [lsCategorySegment, setLsCategorySegment] = useState([]);
    const [lsMetodoOWAS, setLsMetodoOWAS] = useState([]);
    const [lsPosturasOWAS, setLsPosturasOWAS] = useState([]);
    const [openTooltip, setOpenTooltip] = useState({ id: null, category: null });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    const totalTiempo = lsMetodoOWAS.reduce((acc, item) => acc + (Number(item.tiempoPromedio) || 0), 0);
    const totalEspalda = lsMetodoOWAS.reduce((acc, item) => acc + (Number(item.idEspalda) || 0), 0);
    const totalMSS = lsMetodoOWAS.reduce((acc, item) => acc + (Number(item.idMiembroSuperior) || 0), 0);
    const totalMSI = lsMetodoOWAS.reduce((acc, item) => acc + (Number(item.idMiembroInferiores) || 0), 0);
    const totalPeso = lsMetodoOWAS.reduce((acc, item) => acc + (Number(item.idPeso) || 0), 0);
    const totalCategoria = lsMetodoOWAS.reduce((acc, item) => acc + (Number(item.resultadoCateAccion) || 0), 0);

    const getData = async () => {
        try {
            // Validación 1: Categoría de cargo
            if (!categoriaCargo) {
                setAlert({
                    open: true,
                    message: "Debe seleccionar una categoría de cargo (Sección de Aspectos Organacionales) para continuar",
                    severity: "error"
                });
                setLsCategorySegment([]);
                setLsMetodoOWAS([]);
                return;
            }

            // Validación 2: Actividades registradas
            const resActivities = await ActivityRecordsExist(idAPT, tipoLogica);
            const existsActivities = resActivities.data.datos || false;

            if (!existsActivities) {
                setAlert({
                    open: true,
                    message: "No se han registrado actividades aún (Sección de Actividad Laboral, en la parte final), por favor complete ese paso primero",
                    severity: "error"
                });
                setLsCategorySegment([]);
                setLsMetodoOWAS([]);
                return;
            }

            // Si pasa las validaciones, limpiamos la alerta
            setAlert({ open: false, message: '', severity: 'info' });

            const response = await GetAllAPTHPMetodoOWAS(idAPT, tipoLogica);
            const metodosOWAS = response.data.datos?.metodosOWAS || [];
            const categoriasSegmento = response.data.datos?.categoriasSegmento || [];

            setLsMetodoOWAS(metodosOWAS);
            setLsCategorySegment(categoriasSegmento);
            setLsPosturasOWAS(posturasErgonomicasOWAS);
        } catch (error) {
            toast.error("Error al cargar los datos del método OWAS");
            setLsCategorySegment([]);
            setLsMetodoOWAS([]);
        }
    };

    const handleSavePostura = async (row, postureId, category) => {
        try {
            const payload = {
                id: row.id,
                idEspalda: category.toLowerCase() === 'espalda' ? postureId : null,
                idMiembroSuperior: category.toLowerCase() === 'brazos' ? postureId : null,
                idMiembroInferiores: category.toLowerCase() === 'piernas' ? postureId : null,
                idPeso: category.toLowerCase() === 'fuerza' ? postureId : null,
            };

            const response = await SaveAPTHPMetodoOWAS(payload, tipoLogica);
            if (response.data.exito) {
                toast.success(`Código de postura registrado para ${category}`);
                getData();
                setOpenTooltip({ id: null, category: null });
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al guardar la postura");
        }
    };

    const renderPostureTooltip = (category, row) => {
        const filtered = lsPosturasOWAS.filter(p => p.categoria?.toLowerCase() === category.toLowerCase());

        return (
            <Box sx={{
                p: 2,
                maxWidth: 380,
                maxHeight: 450,
                overflowY: 'auto',
                borderRadius: '20px',
                position: 'relative',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px'
                },
                '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.3)' }
            }}>
                <IconButton
                    size="small"
                    onClick={() => setOpenTooltip({ id: null, category: null })}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#fff',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
                <Typography variant="h6" sx={{
                    mb: 2.5,
                    fontWeight: 800,
                    textAlign: 'center',
                    color: '#fff',
                    letterSpacing: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    pb: 1,
                    pr: 4
                }}>
                    Postura: {category}
                </Typography>

                {filtered.map((item, idx) => (
                    <PostureCard
                        key={idx}
                        item={item}
                        onClick={() => handleSavePostura(row, item.codigo, category)}
                    />
                ))}
            </Box>
        );
    };

    useEffect(() => {
        const handleRefresh = () => {
            if (idAPT) getData();
        };

        window.addEventListener('refresh-owas-table', handleRefresh);
        return () => window.removeEventListener('refresh-owas-table', handleRefresh);
    }, [idAPT]);

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT, categoriaCargo]);

    return (
        <SubCard darkTitle title="Aplicación del método OWAS">
            <Grid container spacing={2}>
                {alert.open && (
                    <Grid item xs={12}>
                        <CustomAlert
                            message={alert.message}
                            severity={alert.severity}
                            open={alert.open}
                            onClose={() => setAlert({ ...alert, open: false })}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #bdbdbd', borderRadius: '4px' }}>
                        <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} size="small" aria-label="tabla de segmentos">
                            <TableHead>
                                <TableRow>
                                    <ExcelTableCell rowSpan={2} sx={{ backgroundColor: '#f0f0f0' }}>Actividades Diarias Realizadas</ExcelTableCell>
                                    <ExcelTableCell rowSpan={2} align="center" sx={{ backgroundColor: '#f0f0f0' }}>% Del Tiempo</ExcelTableCell>
                                    <ExcelTableCell colSpan={5} align="center" sx={{ backgroundColor: '#f0f0f0' }}>Calificación</ExcelTableCell>
                                </TableRow>
                                <TableRow>
                                    <ExcelTableCell align="center" sx={{ top: 0, backgroundColor: '#f5f5f5' }}>Espalda</ExcelTableCell>
                                    <ExcelTableCell align="center" sx={{ top: 0, backgroundColor: '#f5f5f5' }}>Miembros superiores</ExcelTableCell>
                                    <ExcelTableCell align="center" sx={{ top: 0, backgroundColor: '#f5f5f5' }}>Miembros inferiores</ExcelTableCell>
                                    <ExcelTableCell align="center" sx={{ top: 0, backgroundColor: '#f5f5f5' }}>Peso</ExcelTableCell>
                                    <ExcelTableCell align="center" sx={{ top: 0, backgroundColor: '#f5f5f5' }}>Categoría de acción</ExcelTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(lsMetodoOWAS) && lsMetodoOWAS.length > 0 ? (
                                    <>
                                        {lsMetodoOWAS.map((item, index) => (
                                            <StyledTableRow key={index}>
                                                <ExcelTableCell>{UpperFirstChar(item.nameActividad)}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.porcentajeTiempo}</ExcelTableCell>
                                                <ExcelTableCell align="center">
                                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                        {item.idEspalda}
                                                        <Tooltip
                                                            open={openTooltip.id === item.id && openTooltip.category === 'Espalda'}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            arrow
                                                            interactive
                                                            title={renderPostureTooltip('Espalda', item)}
                                                            placement="right"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => setOpenTooltip(prev =>
                                                                    prev.id === item.id && prev.category === 'Espalda'
                                                                        ? { id: null, category: null }
                                                                        : { id: item.id, category: 'Espalda' }
                                                                )}
                                                            >
                                                                <Iconify icon="lets-icons:file-dock-search-light" width={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </ExcelTableCell>
                                                <ExcelTableCell align="center">
                                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                        {item.idMiembroSuperior}
                                                        <Tooltip
                                                            open={openTooltip.id === item.id && openTooltip.category === 'Brazos'}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            arrow
                                                            interactive
                                                            title={renderPostureTooltip('Brazos', item)}
                                                            placement="right"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => setOpenTooltip(prev =>
                                                                    prev.id === item.id && prev.category === 'Brazos'
                                                                        ? { id: null, category: null }
                                                                        : { id: item.id, category: 'Brazos' }
                                                                )}
                                                            >
                                                                <Iconify icon="lets-icons:file-dock-search-light" width={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </ExcelTableCell>
                                                <ExcelTableCell align="center">
                                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                        {item.idMiembroInferiores}
                                                        <Tooltip
                                                            open={openTooltip.id === item.id && openTooltip.category === 'Piernas'}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            arrow
                                                            interactive
                                                            title={renderPostureTooltip('Piernas', item)}
                                                            placement="left"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => setOpenTooltip(prev =>
                                                                    prev.id === item.id && prev.category === 'Piernas'
                                                                        ? { id: null, category: null }
                                                                        : { id: item.id, category: 'Piernas' }
                                                                )}
                                                            >
                                                                <Iconify icon="lets-icons:file-dock-search-light" width={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </ExcelTableCell>
                                                <ExcelTableCell align="center">
                                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                        {item.idPeso}
                                                        <Tooltip
                                                            open={openTooltip.id === item.id && openTooltip.category === 'Fuerza'}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            arrow
                                                            interactive
                                                            title={renderPostureTooltip('Fuerza', item)}
                                                            placement="left"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={() => setOpenTooltip(prev =>
                                                                    prev.id === item.id && prev.category === 'Fuerza'
                                                                        ? { id: null, category: null }
                                                                        : { id: item.id, category: 'Fuerza' }
                                                                )}
                                                            >
                                                                <Iconify icon="lets-icons:file-dock-search-light" width={20} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </ExcelTableCell>
                                                <ExcelTableCell align="center">{item.categoriaAccion}</ExcelTableCell>
                                            </StyledTableRow>
                                        ))}

                                        <StyledTableRow sx={{ backgroundColor: '#f9f9f9 !important' }}>
                                            <ExcelTableCell sx={{ fontWeight: 'bold' }}>TOTAL</ExcelTableCell>
                                            <ExcelTableCell align="center" sx={{ fontWeight: 'bold' }}>{totalTiempo || ''}</ExcelTableCell>
                                            <ExcelTableCell align="center" sx={{ fontWeight: 'bold' }}>{totalEspalda || ''}</ExcelTableCell>
                                            <ExcelTableCell align="center" sx={{ fontWeight: 'bold' }}>{totalMSS || ''}</ExcelTableCell>
                                            <ExcelTableCell align="center" sx={{ fontWeight: 'bold' }}>{totalMSI || ''}</ExcelTableCell>
                                            <ExcelTableCell align="center" sx={{ fontWeight: 'bold' }}>{totalPeso || ''}</ExcelTableCell>
                                            <ExcelTableCell align="center" sx={{ fontWeight: 'bold' }}>{formatearResultado(totalCategoria) || ''}</ExcelTableCell>
                                        </StyledTableRow>
                                    </>
                                ) : (
                                    <StyledTableRow>
                                        <ExcelTableCell colSpan={7} align="center">
                                            <EmptyState seeSubtitle={false} title="No hay registros" />
                                        </ExcelTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h4">Categoría por segmento</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0 }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de categoria por segmento">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Segmento</StyledTableCell>
                                    <StyledTableCell align="center">Calificación</StyledTableCell>
                                    <StyledTableCell align="center">Categoría De Acción</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lsCategorySegment.length > 0 ? (
                                    lsCategorySegment.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell sx={{ textTransform: 'capitalize' }}>{item.nameSegmento?.toLowerCase()}</StyledTableCell>
                                            <StyledTableCell align="center">{item.calificacion || '-'}</StyledTableCell>
                                            <StyledTableCell align="center">{item.resultado || '-'}</StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={3} align="center">
                                            <EmptyState seeSubtitle={false} title="No hay registros" />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export const OrganizationalFactorTable = () => {
    const { watch: watchMain } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const [lsOrganizationalFactor, setLsOrganizationalFactor] = useState([]);

    const getData = async () => {
        try {
            const [resCatalog, resSaved] = await Promise.all([
                GetByTipoCatalogoCombo(CodCatalogo.APTHIGIENE_FACTOR_ORGANIZACIONAL),
                GetAllAPTHPOrganizationalFactor(idAPT, tipoLogica)
            ]);

            const catalogData = resCatalog.data || [];
            const savedData = resSaved.data.datos || [];

            const mergedData = catalogData.map(catItem => {
                const existing = savedData.find(x => x.item === catItem.value);
                if (existing) {
                    return { ...existing, nameItem: catItem.label };
                }

                return { id: 0, item: catItem.value, nameItem: catItem.label, aplica: null };
            }).sort((a, b) => a.item - b.item);

            setLsOrganizationalFactor(mergedData);
        } catch (error) {
            toast.error("Error al cargar los factores organizacionales");
            setLsOrganizationalFactor([]);
        }
    };

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT]);

    const displayFactors = lsOrganizationalFactor;

    const totalNo = displayFactors.filter(item => item.aplica != null && Number(item.aplica) === 0).length;
    const totalSi = displayFactors.filter(item => item.aplica != null && Number(item.aplica) === 1).length;
    const puntuacionFinal = ((totalSi / 10) + 1).toFixed(1);

    const handleCheck = async (row, val) => {
        if (!idAPT) {
            toast.error("Debe guardar la plantilla principal para poder asociar opciones.");
            return;
        }
        try {
            if (row.aplica != null && Number(row.aplica) === val) {
                if (row.id > 0) {
                    const res = await DeleteAPTHPOrganizationalFactor(row.id, tipoLogica);
                    if (res.data.exito) getData();
                }
                return;
            }

            const payload = {
                id: row.id || 0,
                item: row.item,
                idAPT: idAPT,
                aplica: val
            };

            const response = await SaveAPTHPOrganizationalFactor(payload, tipoLogica);
            if (response.data.exito) {
                getData();
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al actualizar el factor organizacional");
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Factor organizacional</Typography>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #e0e0e0', borderRadius: '12px' }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de factores organizacionales">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Ítem</StyledTableCell>
                                <StyledTableCell align="center">No (0)</StyledTableCell>
                                <StyledTableCell align="center">Si (1)</StyledTableCell>
                                <StyledTableCell align="center">Puntuación</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayFactors.length > 0 ? (
                                <>
                                    {displayFactors.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{UpperFirstChar(item.nameItem)}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Checkbox
                                                    checked={item.aplica != null && Number(item.aplica) === 0}
                                                    onChange={() => handleCheck(item, 0)}
                                                    color="primary"
                                                    size="small"
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Checkbox
                                                    checked={item.aplica != null && Number(item.aplica) === 1}
                                                    onChange={() => handleCheck(item, 1)}
                                                    color="primary"
                                                    size="small"
                                                />
                                            </StyledTableCell>

                                            {index === 0 && (
                                                <StyledTableCell
                                                    align="center"
                                                    rowSpan={displayFactors.length + 1}
                                                    sx={{
                                                        verticalAlign: 'middle',
                                                        borderLeft: '1px solid #e0e0e0',
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#fff'
                                                    }}
                                                >
                                                    ( {totalSi} / 10 ) + 1 = {puntuacionFinal}
                                                </StyledTableCell>
                                            )}
                                        </StyledTableRow>
                                    ))}

                                    <TableRow sx={{ backgroundColor: '#eeeeee' }}>
                                        <StyledTableCell sx={{ fontWeight: 'bold' }}>TOTAL</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2} sx={{ fontWeight: 'bold' }}>
                                            {(totalNo > 0 || totalSi > 0) ? totalSi : ''}
                                        </StyledTableCell>
                                    </TableRow>
                                </>
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export const TableReferenceValuesSegment = () => {
    const { watch: watchMain } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const [lsReferenceValuesSegment, setLsReferenceValuesSegment] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const getData = async () => {
        try {
            if (!idAPT) return;

            const [resCatalog, resSaved] = await Promise.all([
                GetByTipoCatalogoCombo(CodCatalogo.APTHIGIENE_VALOR_REF_SEGMENTO),
                GetAllAPTHPValorRefeSegmento(idAPT, tipoLogica)
            ]);

            const catalogData = (resCatalog.data || []).sort((a, b) => Number(a.value) - Number(b.value));
            const savedData = resSaved.data.datos || [];

            const mergedData = catalogData.map(catItem => {
                const existing = savedData.find(x => x.segmentoCorporal === Number(catItem.value));

                let defaultValue = 0;
                if (catItem.codigo) {
                    const lastChar = catItem.codigo.slice(-1);
                    defaultValue = parseInt(lastChar, 10) || 0;
                }

                if (existing) {
                    return {
                        id: existing.id,
                        segmentoCorporal: Number(catItem.value),
                        nameSegmentoCorporal: UpperFirstChar(catItem.label),
                        valorReferencia: existing.valorReferencia,
                        cambioRegistro: false
                    };
                }

                return {
                    id: 0,
                    segmentoCorporal: Number(catItem.value),
                    nameSegmentoCorporal: UpperFirstChar(catItem.label),
                    valorReferencia: defaultValue,
                    cambioRegistro: false
                };
            });

            const pairedData = [];
            for (let i = 0; i < mergedData.length; i += 2) {
                pairedData.push({
                    left: mergedData[i],
                    right: mergedData[i + 1] || null
                });
            }

            setLsReferenceValuesSegment(pairedData);
        } catch (error) {
            toast.error("Error al cargar los valores de referencia");
            setLsReferenceValuesSegment([]);
        }
    };

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT]);

    const handleInputChange = (segmentoObj, val) => {
        setLsReferenceValuesSegment(prev => prev.map(row => {
            const newRow = { ...row };
            if (newRow.left && newRow.left.segmentoCorporal === segmentoObj.segmentoCorporal) {
                newRow.left = { ...newRow.left, valorReferencia: val, cambioRegistro: true };
            }
            if (newRow.right && newRow.right.segmentoCorporal === segmentoObj.segmentoCorporal) {
                newRow.right = { ...newRow.right, valorReferencia: val, cambioRegistro: true };
            }
            return newRow;
        }));
    };

    const handleSaveAll = async () => {
        if (!idAPT) {
            toast.error("Debe guardar la plantilla principal primero.");
            return;
        }

        setIsSaving(true);

        try {
            const allItemsToSave = lsReferenceValuesSegment.flatMap(row => [row.left, row.right]).filter(Boolean);
            const isUpdateSave = allItemsToSave.some(item => item.id > 0);

            const itemsToSend = isUpdateSave ? allItemsToSave.filter(item => item.cambioRegistro) : allItemsToSave;

            if (isUpdateSave && itemsToSend.length === 0) {
                toast.error("No hay datos nuevos o modificados para guardar.");
                setIsSaving(false);
                return;
            }

            const payloadList = itemsToSend.map(item => ({
                id: item.id || 0,
                SegmentoCorporal: item.segmentoCorporal,
                ValorReferencia: Number(item.valorReferencia),
                idAPT: idAPT,
                cambioRegistro: true
            }));

            const result = await SaveAPTHPValorRefeSegmento(payloadList, tipoLogica);

            if (!result.data.exito) {
                toast.error("Hubo errores al guardar algunos valores.");
            } else {
                toast.success("Valores guardados correctamente.");
                window.dispatchEvent(new CustomEvent('refresh-assessment-validations'));
            }

            await getData();
        } catch (error) {
            toast.error("Error al guardar los valores de referencia");
        } finally {
            setIsSaving(false);
        }
    };

    const allItemsRender = lsReferenceValuesSegment.flatMap(row => [row.left, row.right]).filter(Boolean);
    const isUpdateRender = allItemsRender.some(item => item.id > 0);
    const hasChangesRender = allItemsRender.some(item => item.cambioRegistro);
    const isSaveDisabled = isSaving || (isUpdateRender && !hasChangesRender);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h4">Valores de referencia por segmento</Typography>
                <AnimateButton>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveAll}
                        disabled={isSaveDisabled}
                        sx={{ minWidth: '110px' }}
                    >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                </AnimateButton>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #bdbdbd', borderRadius: '4px' }}>
                    <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} size="small">
                        <TableHead>
                            <TableRow>
                                <ExcelTableCell width="35%" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Segmento Corporal</ExcelTableCell>
                                <ExcelTableCell width="15%" align="center" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Valor Referencia</ExcelTableCell>
                                <ExcelTableCell width="35%" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Segmento Corporal</ExcelTableCell>
                                <ExcelTableCell width="15%" align="center" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>Valor Referencia</ExcelTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lsReferenceValuesSegment.map((row, idx) => (
                                <TableRow key={idx}>
                                    {row.left && (
                                        <>
                                            <ExcelTableCell>{row.left.nameSegmentoCorporal}</ExcelTableCell>
                                            <ExcelTableCell align="center">
                                                <StyledNumberInput
                                                    type="number"
                                                    min="0"
                                                    value={row.left.valorReferencia ?? ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === '' || Number(val) >= 0) handleInputChange(row.left, val);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (['-', 'e', '+', 'E'].includes(e.key)) e.preventDefault();
                                                    }}
                                                />
                                            </ExcelTableCell>
                                        </>
                                    )}

                                    {row.right ? (
                                        <>
                                            <ExcelTableCell>{row.right.nameSegmentoCorporal}</ExcelTableCell>
                                            <ExcelTableCell align="center">
                                                <StyledNumberInput
                                                    type="number"
                                                    min="0"
                                                    value={row.right.valorReferencia ?? ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === '' || Number(val) >= 0) handleInputChange(row.right, val);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (['-', 'e', '+', 'E'].includes(e.key)) e.preventDefault();
                                                    }}
                                                />
                                            </ExcelTableCell>
                                        </>
                                    ) : (
                                        <>
                                            <ExcelTableCell />
                                            <ExcelTableCell />
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};


const validationControlMethods = yup.object().shape({
    control: yup.string().required("El control es requerido"),
    tipoControl: yup.string().required("El tipo de control es requerido"),
    observacionesUso: yup.string().required("Las observaciones sobre uso brindado es requerida"),
    observacionesNivel: yup.string().required("Las observaciones sobre nivel de protección brindado es requerida"),
});

const AddCatalogoData = ({ getDataCombo, onClose, idTipoCatalogo, codCatalogo }) => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            setError(true);
            return;
        }

        try {
            const objCatalogo = {
                nombre: nombre,
                codigo: codCatalogo,
                idTipoCatalogo: idTipoCatalogo,
                estado: true,
            }

            const result = await InsertCatalog(objCatalogo);
            if (result.status === 200) {
                await getDataCombo();
                toast.success("Registro agregado correctamente");
                onClose();
                setNombre('');
            }
        } catch (error) {
            toast.error("Error al agregar el registro");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', mb: 4 }}
        >
            <Stack direction="row" spacing={2.5} alignItems="center">
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => {
                        setNombre(e.target.value);
                        if (error) setError(false);
                    }}
                    error={error}
                    helperText={error && "El nombre es requerido"}
                />

                <AnimateButton>
                    <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        startIcon={<Add />}
                        sx={{
                            height: 40,
                            px: 3,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 2
                        }}
                    >
                        Agregar
                    </Button>
                </AnimateButton>
            </Stack>
        </Box>
    );
}

export const TableControlMethods = () => {
    const { watch: watchMain } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const methods = useForm({
        resolver: yupResolver(validationControlMethods),
        defaultValues: { isUpdateRegister: false, control: '', tipoControl: '', observacionesUso: '', observacionesNivel: '' }
    });

    const { handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = methods;
    const isUpdateRegister = watch('isUpdateRegister');

    const [openModal, setOpenModal] = useState(false);
    const [idTipoCatalogo, setIdTipoCatalogo] = useState(0);
    const [codCatalogo, setCodCatalogo] = useState("");

    const [lsControl, setLsControl] = useState([]);
    const [lsTipoControl, setLsTipoControl] = useState([]);
    const [lsControlMethods, setLsControlMethods] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    async function getCombo() {
        const lsServerTipoControl = await GetByTipoCatalogoCombo(CodCatalogo.IEL_TIPO_CONTROL);
        setLsTipoControl(lsServerTipoControl.data);

        const lsServerControl = await GetByTipoCatalogoCombo(CodCatalogo.IEL_CONTROL);
        setLsControl(lsServerControl.data);
    }

    useEffect(() => {
        getCombo();
    }, []);

    const getData = async () => {
        try {
            const response = await GetAllAPTHPMetodoControl(idAPT, tipoLogica);
            setLsControlMethods(response.data.datos || []);
        } catch (error) {
            toast.error("Error al cargar los métodos de control");
            setLsControlMethods([]);
        }
    };

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT, tipoLogica]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClear = () => {
        reset({ control: '', tipoControl: '', observacionesUso: '', observacionesNivel: '', isUpdateRegister: false });
        setSelectedId(null);
    };

    const handleDoubleClick = (item) => {
        setValue('control', item.control, { shouldValidate: true });
        setValue('tipoControl', item.tipoControl, { shouldValidate: true });
        setValue('observacionesUso', item.observacionesUso === '<p><br></p>' ? '' : item.observacionesUso, { shouldValidate: true });
        setValue('observacionesNivel', item.observacionesNivel === '<p><br></p>' ? '' : item.observacionesNivel, { shouldValidate: true });
        setValue('isUpdateRegister', true);
        setSelectedId(item.id);
    };

    const handleClick = async (datos) => {
        try {
            const payload = {
                ...datos,
                observacionesUso: datos.observacionesUso === '<p><br></p>' ? '' : datos.observacionesUso,
                observacionesNivel: datos.observacionesNivel === '<p><br></p>' ? '' : datos.observacionesNivel,
                id: isUpdateRegister ? selectedId : 0,
                idAPT: idAPT
            };

            const response = await SaveAPTHPMetodoControl(payload, tipoLogica);
            if (response.data.exito) {
                toast.success(response.data.mensaje);
                await getData();
                handleClear();
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al guardar el método de control");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await DeleteAPTHPMetodoControl(id, tipoLogica);
            if (response.data.exito) {
                toast.success(response.data.mensaje);
                await getData();
                if (selectedId === id) handleClear();
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al eliminar el método de control");
        }
    };

    return (
        <FormProvider {...methods}>
            <ControlModal
                maxWidth="md"
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Agregar nuevo registro"
            >
                <AddCatalogoData idTipoCatalogo={idTipoCatalogo} codCatalogo={codCatalogo} getDataCombo={getCombo} onClose={() => setOpenModal(false)} />
            </ControlModal>

            <Grid container spacing={2} alignItems="center">
                {/* {tipoLogica == 1 &&
                    <Grid item xs={12}>
                        <AnimatedSearchBar />
                    </Grid>
                } */}

                <Grid item xs={12} md={6}>
                    <InputSelect
                        options={lsControl}
                        name="control"
                        label="Control"
                        defaultValue=""
                        bug={errors.control}
                        onAddClick={() => {
                            setIdTipoCatalogo(CodCatalogo.IEL_CONTROL);
                            setCodCatalogo(`IELCONT0${lsControl.length + 1}`);
                            setOpenModal(true);
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputSelect
                        options={lsTipoControl}
                        name="tipoControl"
                        label="Tipo de control"
                        defaultValue=""
                        bug={errors.tipoControl}
                        onAddClick={() => {
                            setIdTipoCatalogo(CodCatalogo.IEL_TIPO_CONTROL);
                            setCodCatalogo(`IELTI0${lsTipoControl.length + 1}`);
                            setOpenModal(true);
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputTextEditor label="Observaciones sobre uso brindado (Si aplica)" name="observacionesUso" defaultValue="" />
                </Grid>

                <Grid item xs={12}>
                    <InputTextEditor label="Observaciones sobre nivel de protección brindado" name="observacionesNivel" defaultValue="" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Stack direction="row" spacing={1}>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(handleClick)}
                                disabled={isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : isUpdateRegister ? <Edit /> : <AddCircle />}
                                sx={{ minWidth: '110px' }}
                            >
                                {isSubmitting ? 'Guardando...' : isUpdateRegister ? 'Actualizar' : 'Agregar'}
                            </Button>
                        </AnimateButton>

                        <AnimateButton>
                            <Button disabled={!(isUpdateRegister || watch('control'))} variant="outlined" onClick={handleClear} startIcon={<ClearAll />}>
                                Limpiar
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #e0e0e0', borderRadius: '12px' }}>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Control</StyledTableCell>
                                    <StyledTableCell>Tipo de control</StyledTableCell>
                                    <StyledTableCell align="center">Observaciones sobre uso brindado (Si aplica)</StyledTableCell>
                                    <StyledTableCell align="center">Observaciones sobre nivel de protección brindado</StyledTableCell>
                                    <StyledTableCell align="center">Acción</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(lsControlMethods) && lsControlMethods.length > 0 ? (
                                    lsControlMethods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                        <StyledTableRow
                                            key={item.id}
                                            isselected={selectedId === item.id ? 1 : 0}
                                            onDoubleClick={() => handleDoubleClick(item)}
                                        >
                                            <StyledTableCell sx={{ width: '15%' }}>{item.nameControl}</StyledTableCell>
                                            <StyledTableCell sx={{ width: '15%' }}>{item.nameTipoControl}</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '35%' }}>
                                                <Box
                                                    dangerouslySetInnerHTML={{ __html: item.observacionesUso }}
                                                    sx={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        lineHeight: '1.5',
                                                        fontSize: '0.875rem',
                                                        color: 'text.secondary',
                                                        textAlign: 'justify',
                                                        px: 1,
                                                        '& > *': {
                                                            display: 'inline',
                                                            margin: 0,
                                                        },
                                                        '& p, & div': {
                                                            '&:not(:last-child):after': {
                                                                content: '" "',
                                                                whiteSpace: 'pre',
                                                            }
                                                        }
                                                    }}
                                                />
                                            </StyledTableCell>

                                            <StyledTableCell align="left" sx={{ width: '35%' }}>
                                                <Box
                                                    dangerouslySetInnerHTML={{ __html: item.observacionesNivel }}
                                                    sx={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        lineHeight: '1.5',
                                                        fontSize: '0.875rem',
                                                        color: 'text.secondary',
                                                        textAlign: 'justify',
                                                        px: 1,
                                                        '& > *': {
                                                            display: 'inline',
                                                            margin: 0,
                                                        },
                                                        '& p, & div': {
                                                            '&:not(:last-child):after': {
                                                                content: '" "',
                                                                whiteSpace: 'pre',
                                                            }
                                                        }
                                                    }}
                                                />
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Stack direction="row" spacing={1.5} justifyContent="center">
                                                    <Tooltip disableInteractive placement='top' title="Actualizar">
                                                        <IconButton color="primary" onClick={() => handleDoubleClick(item)} size="small">
                                                            <Edit fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip disableInteractive placement='top' title="Eliminar">
                                                        <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
                                                            <Close fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={5} align="center">
                                            <EmptyState seeSubtitle={false} title="No hay registros" />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>

                        {lsControlMethods.length > 5 &&
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={lsControlMethods.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                            />
                        }
                    </TableContainer>
                </Grid>
            </Grid>
        </FormProvider>
    );
};