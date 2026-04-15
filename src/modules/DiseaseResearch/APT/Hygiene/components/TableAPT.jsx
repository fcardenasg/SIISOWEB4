import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Stack,
    Grid,
    Button,
    CircularProgress,
    Tooltip,
    styled,
    IconButton,
    Divider,
    tableCellClasses,
    TablePagination,
    Checkbox
} from '@mui/material';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { AddCircle, ClearAll, Close, Edit } from '@mui/icons-material';
import EmptyState from 'components/loading/EmptyState';
import InputRadioGroup from 'components/input/InputRadioGroup';
import InputTextEditor from 'components/input/InputTextEditor';
import {
    DeleteAPTHPCategorySegment,
    DeleteAPTHPOrganizationalFactor,
    DeleteAPTHPMetodoControl,
    DeleteAPTHPValorRefeSegmento,
    GetAllAPTHPCategorySegment,
    GetAllAPTHPOrganizationalFactor,
    GetAllAPTHPMetodoControl,
    GetAllAPTHPValorRefeSegmento,
    SaveAPTHPCategorySegment,
    SaveAPTHPOrganizationalFactor,
    SaveAPTHPMetodoControl,
    SaveAPTHPValorRefeSegmento
} from 'api/clients/APTHigienePlantillaClient';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import SubCard from 'ui-component/cards/SubCard';

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

const validationCategory = yup.object().shape({
    idSegmento: yup.string().required("El segmento es requerido"),
    calificacion: yup.string().required("La calificación es requerida"),
    categoriaAccion: yup.string().required("La categoría de acción es requerida")
});

const ExcelTableCell = styled(StyledTableCell)(() => ({
    border: '1px solid #bdbdbd',
}));

export const CategoryTableSegment = () => {
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const methods = useForm({
        resolver: yupResolver(validationCategory),
        defaultValues: { isUpdateRegister: false, idSegmento: '', calificacion: '', categoriaAccion: '' }
    });
    const { handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = methods;
    const isUpdateRegister = watch('isUpdateRegister');

    const [lsCategorySegment, setLsCategorySegment] = useState([]);
    const [lsSegmento, setLsSegmento] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const getData = async () => {
        try {
            const response = await GetAllAPTHPCategorySegment(idAPT);
            setLsCategorySegment(response.data.datos || []);
        } catch (error) {
            toast.error("Error al cargar las categorías por segmento");
            setLsCategorySegment([]);
        }
    };

    useEffect(() => {
        async function getCatalog() {
            const lsServerSegmento = await GetByTipoCatalogoCombo(CodCatalogo.PANO_RIESGO); // Supongamos que es este catálogo o similar
            setLsSegmento(lsServerSegmento.data);
        }
        getCatalog();
    }, []);

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT]);

    const handleClear = () => {
        reset({ idSegmento: '', calificacion: '', categoriaAccion: '', isUpdateRegister: false });
        setSelectedId(null);
    };

    const handleDoubleClick = (item) => {
        setValue('idSegmento', item.idSegmento, { shouldValidate: true });
        setValue('calificacion', item.calificacion, { shouldValidate: true });
        setValue('categoriaAccion', item.categoriaAccion, { shouldValidate: true });
        setValue('isUpdateRegister', true);
        setSelectedId(item.id);
    };

    const handleClick = async (datos) => {
        try {
            const payload = {
                ...datos,
                id: isUpdateRegister ? selectedId : 0,
                idAPT: idAPT
            };

            const response = await SaveAPTHPCategorySegment(payload);
            if (response.data.exito) {
                toast.success(response.data.mensaje);
                getData();
                handleClear();
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al guardar la categoría por segmento");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await DeleteAPTHPCategorySegment(id);
            if (response.data.exito) {
                toast.success(response.data.mensaje);
                getData();
                if (selectedId === id) handleClear();
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al eliminar la categoría por segmento");
        }
    };

    return (
        <SubCard darkTitle title="Aplicación del método OWAS" secondary={
            <AnimateButton>
                <Button
                    variant="contained"
                    color="primary"
                    /* onClick={handleSubmit(handleClick)} */
                    disabled={isSubmitting}
                    startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
                    sx={{ minWidth: '110px' }}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </AnimateButton>
        }>
            <FormProvider {...methods}>
                <Grid container spacing={2}>
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
                                    {Array.isArray(lsCategorySegment) && lsCategorySegment.length > 0 ? (
                                        lsCategorySegment.map((item, index) => (
                                            <StyledTableRow key={index} onDoubleClick={() => handleDoubleClick(item)} isselected={selectedId === item.id ? 1 : 0}>
                                                <ExcelTableCell>{item.actividadesDiariasRealizadas || item.nameSegmento?.toUpperCase() || item.idSegmento}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.porcentajeTiempo || '-'}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.espalda || item.calificacion?.toString().charAt(0) || '-'}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.miembrosSuperiores || item.calificacion?.toString().charAt(1) || '-'}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.miembrosInferiores || item.calificacion?.toString().charAt(2) || '-'}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.peso || item.calificacion?.toString().charAt(3) || '-'}</ExcelTableCell>
                                                <ExcelTableCell align="center">{item.categoriaAccion}</ExcelTableCell>
                                            </StyledTableRow>
                                        ))
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
                                    {['Espalda', 'Miembros Superiores', 'Miembros Inferiores'].map((segmento, index) => (
                                        <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <StyledTableCell>{segmento}</StyledTableCell>
                                            <StyledTableCell align="center">-</StyledTableCell>
                                            <StyledTableCell align="center">-</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </FormProvider>
        </SubCard>
    );
};

const STATIC_FACTORS = [
    "Tareas al ritmo de la máquina",
    "Se cobran incentivos",
    "Existe como rutina horas extras",
    "Control estricto de los tiempos de trabajo",
    "Escasa posibilidad de toma de decisiones",
    "Trabajo monótono"
];

export const OrganizationalFactorTable = () => {
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const [lsOrganizationalFactor, setLsOrganizationalFactor] = useState([]);

    const getData = async () => {
        try {
            const response = await GetAllAPTHPOrganizationalFactor(idAPT);
            setLsOrganizationalFactor(response.data.datos || []);
        } catch (error) {
            toast.error("Error al cargar los factores organizacionales");
            setLsOrganizationalFactor([]);
        }
    };

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT]);

    const mergedFactors = STATIC_FACTORS.map(staticItem => {
        const existing = (lsOrganizationalFactor || []).find(x => x.item?.toLowerCase() === staticItem.toLowerCase());
        if (existing) return existing;
        return { id: 0, item: staticItem, aplica: null };
    });

    const customFactors = (lsOrganizationalFactor || []).filter(
        existing => !STATIC_FACTORS.some(staticItem => staticItem.toLowerCase() === existing.item?.toLowerCase())
    );

    const displayFactors = [...mergedFactors, ...customFactors];

    const totalNo = displayFactors.filter(item => item.aplica != null && Number(item.aplica) === 0).length;
    const totalSi = displayFactors.filter(item => item.aplica != null && Number(item.aplica) === 1).length;
    const puntuacionFinal = ((totalSi / 10) + 1).toFixed(1);

    const handleCheck = async (row, val) => {
        if (!idAPT) {
            toast.error("Debe guardar la plantilla principal para poder asociar opciones.");
            return;
        }
        try {
            /* if (row.aplica != null && Number(row.aplica) === val) {
                if (row.id > 0) {
                    const res = await DeleteAPTHPOrganizationalFactor(row.id);
                    if (res.data.exito) getData();
                }
                return;
            } */

            const payload = {
                id: row.id || 0,
                item: row.item,
                idAPT: idAPT,
                aplica: val
            };
            /* const response = await SaveAPTHPOrganizationalFactor(payload);
            if (response.data.exito) {
                getData();
            } else {
                toast.error(response.data.mensaje);
            } */
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
                                            <StyledTableCell>{item.item}</StyledTableCell>
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

const REFERENCE_SEGMENTS = [
    { left: "Hombro flexo extensión", right: "Hombro abducción" },
    { left: "Antebrazo", right: "Muñeca" },
    { left: "Agarre prensión de herramientas", right: "Tipo de agarre" },
    { left: "Dedos pulsaciones", right: "Dedos acción gatillo" }
];

export const TableReferenceValuesSegment = () => {
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const [lsReferenceValuesSegment, setLsReferenceValuesSegment] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const getData = async () => {
        try {
            if (!idAPT) return;
            const response = await GetAllAPTHPValorRefeSegmento(idAPT);
            setLsReferenceValuesSegment(response.data.datos || []);
        } catch (error) {
            toast.error("Error al cargar los valores de referencia");
            setLsReferenceValuesSegment([]);
        }
    };

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT]);

    useEffect(() => {
        const newVals = {};
        lsReferenceValuesSegment.forEach(item => {
            if (item.segmentoCorporal) {
                const lowerSegment = item.segmentoCorporal.toLowerCase();
                newVals[lowerSegment] = { id: item.id, valor: item.valorReferencia };
            }
        });
        setInputValues(newVals);
    }, [lsReferenceValuesSegment]);

    const handleInputChange = (segmento, val) => {
        const lowerSegment = segmento.toLowerCase();
        setInputValues(prev => ({
            ...prev,
            [lowerSegment]: { ...prev[lowerSegment], valor: val }
        }));
    };

    const handleSaveAll = async () => {
        if (!idAPT) {
            toast.error("Debe guardar la plantilla principal primero.");
            return;
        }
        setIsSaving(true);
        try {
            const allItems = REFERENCE_SEGMENTS.flatMap(row => [row.left, row.right]);
            const promises = [];

            for (const seg of allItems) {
                const lowerSeg = seg.toLowerCase();
                const stateObj = inputValues[lowerSeg];

                if (stateObj) {
                    const valStr = String(stateObj.valor || '');
                    if (valStr.trim() !== '') {
                        const payload = {
                            id: stateObj.id || 0,
                            segmentoCorporal: seg,
                            valorReferencia: Number(valStr),
                            idAPT: idAPT
                        };
                        promises.push(SaveAPTHPValorRefeSegmento(payload));
                    } else if (stateObj.id > 0) {
                        promises.push(DeleteAPTHPValorRefeSegmento(stateObj.id));
                    }
                }
            }

            if (promises.length === 0) {
                toast.error("No hay datos nuevos para guardar.");
                setIsSaving(false);
                return;
            }

            const results = await Promise.all(promises);
            const hasErrors = results.some(r => r && r.data && !r.data.exito);

            if (hasErrors) {
                toast.error("Hubo errores al guardar algunos valores.");
            } else {
                toast.success("Valores guardados correctamente.");
            }
            getData();
        } catch (error) {
            toast.error("Error al guardar los valores de referencia");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="h4">Valores de referencia por segmento</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveAll}
                    disabled={isSaving}
                    sx={{ minWidth: '110px' }}
                >
                    {isSaving ? 'Guardando...' : 'Guardar'}
                </Button>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #bdbdbd', borderRadius: '4px' }}>
                    <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} size="small">
                        <TableHead>
                            <TableRow>
                                <ExcelTableCell width="35%" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>SEGMENTO CORPORAL</ExcelTableCell>
                                <ExcelTableCell width="15%" align="center" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>VALOR REFERENCIA</ExcelTableCell>
                                <ExcelTableCell width="35%" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>SEGMENTO CORPORAL</ExcelTableCell>
                                <ExcelTableCell width="15%" align="center" sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>VALOR REFERENCIA</ExcelTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {REFERENCE_SEGMENTS.map((row, idx) => (
                                <TableRow key={idx}>
                                    <ExcelTableCell sx={{ color: 'red' }}>{row.left}</ExcelTableCell>
                                    <ExcelTableCell align="center">
                                        <input
                                            type="number"
                                            style={{ width: '80px', textAlign: 'center', color: 'red', border: '1px solid #ccc', borderRadius: '4px', padding: '4px', outline: 'none' }}
                                            value={inputValues[row.left.toLowerCase()]?.valor ?? ''}
                                            onChange={(e) => handleInputChange(row.left, e.target.value)}
                                        />
                                    </ExcelTableCell>
                                    <ExcelTableCell sx={{ color: 'red' }}>{row.right}</ExcelTableCell>
                                    <ExcelTableCell align="center">
                                        <input
                                            type="number"
                                            style={{ width: '80px', textAlign: 'center', color: 'red', border: '1px solid #ccc', borderRadius: '4px', padding: '4px', outline: 'none' }}
                                            value={inputValues[row.right.toLowerCase()]?.valor ?? ''}
                                            onChange={(e) => handleInputChange(row.right, e.target.value)}
                                        />
                                    </ExcelTableCell>
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
    jerarquiaControl: yup.string().required("La jerarquía del control es requerida"),
    descripcionControl: yup.string().required("La descripción del control es requerida"),
});

export const TableControlMethods = () => {
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const methods = useForm({
        resolver: yupResolver(validationControlMethods),
        defaultValues: { isUpdateRegister: false, control: '', jerarquiaControl: '', descripcionControl: '' }
    });

    const { handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = methods;
    const isUpdateRegister = watch('isUpdateRegister');
    const [lsControlMethods, setLsControlMethods] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const getData = async () => {
        try {
            const response = await GetAllAPTHPMetodoControl(idAPT);
            setLsControlMethods(response.data.datos || []);
        } catch (error) {
            toast.error("Error al cargar los métodos de control");
            setLsControlMethods([]);
        }
    };

    useEffect(() => {
        if (idAPT) getData();
    }, [idAPT]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClear = () => {
        reset({ control: '', jerarquiaControl: '', descripcionControl: '', isUpdateRegister: false });
        setSelectedId(null);
    };

    const handleDoubleClick = (item) => {
        setValue('control', item.control, { shouldValidate: true });
        setValue('jerarquiaControl', item.jerarquiaControl, { shouldValidate: true });
        setValue('descripcionControl', item.descripcionControl, { shouldValidate: true });
        setValue('isUpdateRegister', true);
        setSelectedId(item.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClick = async (datos) => {
        try {
            const payload = {
                ...datos,
                id: isUpdateRegister ? selectedId : 0,
                idAPT: idAPT
            };

            const response = await SaveAPTHPMetodoControl(payload);
            if (response.data.exito) {
                toast.success(response.data.mensaje);
                getData();
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
            const response = await DeleteAPTHPMetodoControl(id);
            if (response.data.exito) {
                toast.success(response.data.mensaje);
                getData();
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
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <InputText name="control" label="Control" bug={errors.control} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputText name="jerarquiaControl" label="Jerarquía de control" bug={errors.jerarquiaControl} />
                </Grid>

                <Grid item xs={12}>
                    <InputTextEditor label="Descripción del control" name="descripcionControl" />
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
                                    <StyledTableCell align="center">Jerarquía de control</StyledTableCell>
                                    <StyledTableCell align="center">Descripción del control</StyledTableCell>
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
                                            <StyledTableCell sx={{ width: '15%' }}>{item.control}</StyledTableCell>
                                            <StyledTableCell sx={{ width: '15%' }}>{item.jerarquiaControl}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Box
                                                    dangerouslySetInnerHTML={{ __html: item.descripcionControl }}
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
                                        <StyledTableCell colSpan={4} align="center">
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