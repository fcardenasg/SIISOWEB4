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
    TablePagination
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { AddCircle, ClearAll, Close, Edit } from '@mui/icons-material';
import EmptyState from 'components/loading/EmptyState';
import InputRadioGroup from 'components/input/InputRadioGroup';
import InputTextEditor from 'components/input/InputTextEditor';

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

const DATA = [
    {
        segmento: 'Espalda',
        calificacion: '(1*0,167) + (1*0,542) + (1*0,014) + (2*0,028)',
        accionValor: '0.751 = 1',
        accionCategoria: 'Categoría leve'
    },
    {
        segmento: 'Miembros superiores',
        calificacion: '(1*0,167) + (1*0,542) + (1*0,014) + (1*0,028)',
        accionValor: '0,751 = 1',
        accionCategoria: 'Categoría leve'
    },
    {
        segmento: 'Miembros inferiores',
        calificacion: '(2*0,167) + (1*0,542) + (1*0,014) + (2*0,028)',
        accionValor: '0,946 = 1',
        accionCategoria: 'Categoría leve'
    },
];

const validationCategory = yup.object().shape({
    idSegmento: yup.string().required("El segmento es requerido"),
    calificacion: yup.string().required("La calificación es requerida"),
    categoriaAccion: yup.string().required("La categoría de acción es requerida")
});

export const CategoryTableSegment = () => {
    const methods = useForm({ resolver: yupResolver(validationCategory) });
    const { handleSubmit, formState: { errors, isSubmitting }, reset, watch, setError, resetField, setValue } = methods;

    const handleClick = () => {
        console.log('click');
    };

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Categoría por segmento</Typography>
                </Grid>

                <Grid item xs={12} md={4} lg={3.5}>
                    <InputSelect defaultValue="" name="idSegmento" label="Segmento" options={[]} bug={errors.idSegmento} size='small' />
                </Grid>

                <Grid item xs={12} md={8} lg={3.5}>
                    <InputText name="calificacion" label="Calificación" bug={errors.calificacion} size='small' />
                </Grid>

                <Grid item xs={12} md={8} lg={3.5}>
                    <InputText name="categoriaAccion" label="Categoría de acción" bug={errors.categoriaAccion} size='small' />
                </Grid>

                <Grid item xs={6} md={4} lg={1.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(handleClick)}
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <AddCircle />}
                            sx={{ minWidth: '110px' }}
                        >
                            {isSubmitting ? 'Guardando...' : 'Agregar'}
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #e0e0e0', borderRadius: '12px' }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de segmentos">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Segmento</StyledTableCell>
                                    <StyledTableCell align="center">Calificación</StyledTableCell>
                                    <StyledTableCell align="center">Categoría de acción</StyledTableCell>
                                    <StyledTableCell align="center">Acción</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {DATA.length > 0 ? (
                                    DATA.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{item.segmento?.toUpperCase()}</StyledTableCell>
                                            <StyledTableCell align="center">{item.calificacion}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Stack spacing={0} alignItems="center" sx={{ lineHeight: 1 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                                        {item.accionValor}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                                        {item.accionCategoria}
                                                    </Typography>
                                                </Stack>
                                            </StyledTableCell>

                                            <StyledTableCell align="center" sx={{ userSelect: 'none' }}>
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
                                            </StyledTableCell>
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
        </FormProvider>
    );
};

const validationOrganizational = yup.object().shape({
    item: yup.string().required("El item es requerido"),
    aplica: yup.string().required("Debe indicar si el factor aplica o no")
});

export const OrganizationalFactorTable = () => {
    const methods = useForm({ resolver: yupResolver(validationOrganizational) });
    const { handleSubmit, formState: { errors, isSubmitting }, reset } = methods;

    const [lsOrganizationalFactor, setLsOrganizationalFactor] = useState([]);

    const totalNo = lsOrganizationalFactor.filter(item => item.aplica == 0).length;
    const totalSi = lsOrganizationalFactor.filter(item => item.aplica == 1).length;

    const puntuacionFinal = ((totalSi / 10) + 1).toLocaleString('es-ES', { minimumFractionDigits: 1 });

    const handleClick = (datos) => {
        const nuevoRegistro = { ...datos, aplica: Number(datos.aplica) };
        setLsOrganizationalFactor(prev => [...prev, nuevoRegistro]);
        reset({ item: '', aplica: '' });
    };

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Factor organizacional</Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText name="item" label="Ítem" bug={errors.item} size='small' defaultValue="" />
                </Grid>

                <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body1">Aplica:</Typography>
                    <InputRadioGroup row name="aplica" options={[{ value: 0, label: "No" }, { value: 1, label: "Si" }]} defaultValue="" />
                </Grid>

                <Grid item xs={6} md={2} lg={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(handleClick)}
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <AddCircle />}
                            sx={{ minWidth: '110px' }}
                        >
                            {isSubmitting ? 'Guardando...' : 'Agregar'}
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ overflowX: 'auto', elevation: 0, border: '1px solid #e0e0e0', borderRadius: '12px' }}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de segmentos">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Item</StyledTableCell>
                                    <StyledTableCell align="center">No (0)</StyledTableCell>
                                    <StyledTableCell align="center">Si (1)</StyledTableCell>
                                    <StyledTableCell align="center">Puntuación</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lsOrganizationalFactor.length > 0 ? (
                                    <>
                                        {lsOrganizationalFactor.map((item, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell>{item.item?.toUpperCase()}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {item.aplica === 0 ? 0 : '-'}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {item.aplica === 1 ? 1 : '-'}
                                                </StyledTableCell>

                                                {index === 0 && (
                                                    <StyledTableCell
                                                        align="center"
                                                        rowSpan={lsOrganizationalFactor.length + 1}
                                                        sx={{
                                                            verticalAlign: 'middle',
                                                            borderLeft: '1px solid #e0e0e0',
                                                            fontWeight: 'bold',
                                                            backgroundColor: '#fff'
                                                        }}
                                                    >
                                                        Total ({totalSi}/10) + 1 = {puntuacionFinal}
                                                    </StyledTableCell>
                                                )}
                                            </StyledTableRow>
                                        ))}

                                        <TableRow sx={{ backgroundColor: '#eeeeee' }}>
                                            <StyledTableCell sx={{ fontWeight: 'bold' }}>TOTAL</StyledTableCell>
                                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                                                {totalNo}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                                                {totalSi}
                                            </StyledTableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                    <StyledTableRow>
                                        <StyledTableCell colSpan={4} align="center">
                                            <EmptyState seeSubtitle={false} title="No hay registros" />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </FormProvider>
    );
}

const validationReference = yup.object().shape({
    segmentoCorporal: yup.string().required("El segmento corporal es requerido"),
    valorReferencia: yup.number().typeError('El valor de referencia debe ser un número')
        .required('El valor de referencia es requerido')
        .positive('El valor de referencia debe ser diferente a 0'),
});

export const TableReferenceValuesSegment = () => {
    const methods = useForm({
        resolver: yupResolver(validationReference),
        defaultValues: { isUpdateRegister: false, segmentoCorporal: '', valorReferencia: '' }
    });

    const { handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = methods;
    const isUpdateRegister = watch('isUpdateRegister');
    const [lsReferenceValuesSegment, setLsReferenceValuesSegment] = useState([
        { id: 1, segmentoCorporal: 'Hombro flexo extensión', valorReferencia: 6 },
        { id: 2, segmentoCorporal: 'Hombro abducción', valorReferencia: 6 },
        { id: 3, segmentoCorporal: 'Antebrazo', valorReferencia: 5 },
        { id: 4, segmentoCorporal: 'Muñeca', valorReferencia: 6 },
        { id: 5, segmentoCorporal: 'Agarre prensión de herramientas', valorReferencia: 4 },
        { id: 6, segmentoCorporal: 'Tipo de agarre', valorReferencia: 4 },
        { id: 7, segmentoCorporal: 'Dedos pulsaciones', valorReferencia: 4 },
        { id: 8, segmentoCorporal: 'Dedos acción gatillo', valorReferencia: 3 },
        { id: 9, segmentoCorporal: 'Cuello', valorReferencia: 4 },
    ]);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClear = () => {
        reset({ segmentoCorporal: '', valorReferencia: '', isUpdateRegister: false });
        setSelectedId(null);
    };

    const handleDoubleClick = (item) => {
        setValue('segmentoCorporal', item.segmentoCorporal, { shouldValidate: true });
        setValue('valorReferencia', item.valorReferencia, { shouldValidate: true });
        setValue('isUpdateRegister', true);
        setSelectedId(item.id);
    };

    const handleClick = (datos) => {
        if (isUpdateRegister) {
            setLsReferenceValuesSegment(prev =>
                prev.map(item => item.id === selectedId ? { ...datos, id: selectedId } : item)
            );
        } else {
            const nuevoRegistro = { ...datos, id: Date.now() };
            setLsReferenceValuesSegment(prev => [...prev, nuevoRegistro]);
        }
        handleClear();
    };

    const handleDelete = (id) => {
        setLsReferenceValuesSegment(prev => prev.filter(item => item.id !== id));
        if (selectedId === id) handleClear();
    };

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4">Valores de referencia por segmento</Typography>
                </Grid>

                <Grid item xs={12} md={5}>
                    <InputText name="segmentoCorporal" label="Segmento corporal" bug={errors.segmentoCorporal} size='small' />
                </Grid>

                <Grid item xs={12} md={2}>
                    <InputText name="valorReferencia" label="Valor de referencia" bug={errors.valorReferencia} size='small' type='number' />
                </Grid>

                <Grid item xs={12} md={5}>
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
                            <Button disabled={!(isUpdateRegister || watch('segmentoCorporal'))} variant="outlined" onClick={handleClear} startIcon={<ClearAll />}>
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
                                    <StyledTableCell>Segmento corporal</StyledTableCell>
                                    <StyledTableCell align="center">Valor de referencia</StyledTableCell>
                                    <StyledTableCell align="center">Acción</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lsReferenceValuesSegment.length > 0 ? (
                                    lsReferenceValuesSegment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                        <StyledTableRow
                                            key={item.id}
                                            isselected={selectedId === item.id ? 1 : 0}
                                            onDoubleClick={() => handleDoubleClick(item)}
                                        >
                                            <StyledTableCell>
                                                {item.segmentoCorporal?.toUpperCase()}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {item.valorReferencia}
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
                                        <StyledTableCell colSpan={3} align="center">
                                            <EmptyState seeSubtitle={false} title="No hay registros" />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>

                        {lsReferenceValuesSegment.length > 5 &&
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={lsReferenceValuesSegment.length}
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

const validationControlMethods = yup.object().shape({
    control: yup.string().required("El control es requerido"),
    jerarquiaControl: yup.string().required("La jerarquía del control es requerida"),
    descripcionControl: yup.string().required("La descripción del control es requerida"),
});

export const TableControlMethods = () => {
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
    };

    const handleClick = (datos) => {
        if (isUpdateRegister) {
            setLsControlMethods(prev =>
                prev.map(item => item.id === selectedId ? { ...datos, id: selectedId } : item)
            );
        } else {
            const nuevoRegistro = { ...datos, id: Date.now() };
            setLsControlMethods(prev => [...prev, nuevoRegistro]);
        }
        handleClear();
    };

    const handleDelete = (id) => {
        setLsControlMethods(prev => prev.filter(item => item.id !== id));
        if (selectedId === id) handleClear();
    };

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4">Valores de referencia por segmento</Typography>
                </Grid>

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
                            <Button disabled={!(isUpdateRegister || watch('segmentoCorporal'))} variant="outlined" onClick={handleClear} startIcon={<ClearAll />}>
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
                                {lsControlMethods.length > 0 ? (
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