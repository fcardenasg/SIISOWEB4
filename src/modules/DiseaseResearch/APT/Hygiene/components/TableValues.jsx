import {
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, CircularProgress, Typography,
    Box, Fade
} from '@mui/material';
import { UpperFirstChar } from 'components/helpers/Format';
import { Fragment, useEffect, useState } from 'react';
import { GetDataTableAPTHPValoracion } from 'api/clients/APTHigienePlantillaClient';
import Iconify from 'components/iconify/iconify';

const TableValues = ({ idAPT }) => {
    const [assessmentData, setAssessmentData] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (idAPT) {
            setIsLoading(true);
            GetDataTableAPTHPValoracion(idAPT).then((response) => {
                const payload = response?.data?.datos || {};
                if (response?.data?.exito) {
                    setActividades(payload.listaActividades || []);
                    setParametros(payload.listaParametros || []);
                    const sortedSegments = (payload.listaSegmentos || []).slice().sort((a, b) => {
                        const av = a.idSegmento ?? 0;
                        const bv = b.idSegmento ?? 0;
                        return av - bv;
                    });
                    setAssessmentData(sortedSegments);
                } else {
                    setActividades([]);
                    setParametros([]);
                    setAssessmentData([]);
                }
            }).catch((error) => {
                console.error("Error al cargar la valoración:", error);
            }).finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
        } else {
            setIsLoading(false);
        }
    }, [idAPT]);

    const activityCellWidth = actividades.length ? `${100 / actividades.length}%` : 'auto';
    const subCellWidth = actividades.length ? `${100 / (actividades.length * 2)}%` : 'auto';

    const noSpinnersSx = {
        width: '100%',
        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
            display: 'none',
            WebkitAppearance: 'none',
            margin: 0,
        },
        '& input[type=number]': {
            MozAppearance: 'textfield',
        },
    };

    const handleKeyDown = (e) => {
        if (['-', '+', 'e', 'E'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const segmentoRowSpans = {};
    assessmentData.forEach(item => {
        segmentoRowSpans[item.segmento] = (segmentoRowSpans[item.segmento] || 0) + parametros.length + 2;
    });

    const maxTareas = actividades.length;

    if (isLoading) {
        return (
            <Fade in={true} timeout={400}>
                <Box
                    sx={{
                        borderRadius: 3,
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 400,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                >
                    <Box sx={{ color: 'primary.main', display: 'flex', mb: 3 }}>
                        <Iconify icon="line-md:loading-twotone-loop" width={100} />
                    </Box>

                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        Cargando valoración ergonómica
                    </Typography>

                    <Typography variant="caption" color="text.disabled">
                        Por favor, espere un momento...
                    </Typography>
                </Box>
            </Fade>
        );
    }

    return (
        <Fade in={!isLoading} timeout={800}>
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'visible', width: '100%', boxSizing: 'border-box' }}>
                <Table sx={{ minWidth: 800, border: '1px solid #ccc', tableLayout: 'fixed' }} aria-label="ergonomic assessment table">
                    <TableHead sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <TableRow>
                            <TableCell align="center" sx={{ backgroundColor: '#e0e0e0', width: '100px', fontWeight: 'bold', border: '1px solid #ccc', py: 1, px: 1, letterSpacing: '0.05em', fontSize: '0.85rem' }}>SEGMENTO</TableCell>
                            <TableCell sx={{ backgroundColor: '#e0e0e0', width: '130px', fontWeight: 'bold', border: '1px solid #ccc', py: 1, px: 1, letterSpacing: '0.05em', fontSize: '0.85rem' }}>PARÁMETROS</TableCell>
                            {actividades.map((act, idx) => (
                                <TableCell key={act.value} align="center" colSpan={2} sx={{ backgroundColor: '#e0e0e0', fontWeight: 'bold', border: '1px solid #ccc', py: 1, px: 1, letterSpacing: '0.05em', fontSize: '0.85rem', width: activityCellWidth }}>
                                    {`Actividad ${idx + 1}: ${UpperFirstChar(act.label)}`}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2} sx={{ backgroundColor: '#f5f5f5', border: '1px solid #ccc', py: 1, px: 1 }} />
                            {actividades.map((act) => (
                                <Fragment key={`sub-${act.value}`}>
                                    <TableCell align="center" sx={{ backgroundColor: '#f5f5f5', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #ccc', py: 0.5, px: 1, letterSpacing: '0.05em', textAlign: 'center', width: subCellWidth }}>MSD</TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: '#f5f5f5', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #ccc', py: 0.5, px: 1, letterSpacing: '0.05em', textAlign: 'center', width: subCellWidth }}>MSI</TableCell>
                                </Fragment>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {assessmentData.map((row, index) => {
                            const isFirstOfSegmento = index === 0 || assessmentData[index - 1].segmento !== row.segmento;

                            return (
                                <Fragment key={index}>
                                    <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                        {isFirstOfSegmento && (
                                            <TableCell
                                                rowSpan={segmentoRowSpans[row.segmento]}
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    verticalAlign: 'middle',
                                                    border: '1px solid #ccc',
                                                    backgroundColor: '#fafafa',
                                                    py: 0.5,
                                                    px: 1
                                                }}
                                            >
                                                {UpperFirstChar(row.segmento)}
                                            </TableCell>
                                        )}
                                        <TableCell align="center" colSpan={maxTareas * 2 + 1} sx={{ fontWeight: 'bold', border: '1px solid #ccc', py: 0.5, px: 1 }}>
                                            {UpperFirstChar(row.movimiento)}
                                        </TableCell>
                                    </TableRow>

                                    {parametros.map((param) => (
                                        <TableRow key={param.value} hover>
                                            <TableCell sx={{ py: 0.5, px: 1, border: '1px solid #ccc', fontSize: '0.8rem' }}>{param.label}</TableCell>
                                            {actividades.map((tarea) => (
                                                <Fragment key={`tarea-${tarea.value}`}>
                                                    <TableCell align="center" sx={{ py: 0.5, px: 1, border: '1px solid #ccc', width: subCellWidth }}>
                                                        <TextField
                                                            defaultValue={0}
                                                            size="small"
                                                            type="number"
                                                            variant="standard"
                                                            InputProps={{ disableUnderline: true, inputProps: { min: 0, style: { textAlign: 'center' } } }}
                                                            sx={noSpinnersSx}
                                                            onKeyDown={handleKeyDown}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ py: 0.5, px: 1, border: '1px solid #ccc', width: subCellWidth }}>
                                                        <TextField
                                                            defaultValue={0}
                                                            size="small"
                                                            type="number"
                                                            variant="standard"
                                                            InputProps={{ disableUnderline: true, inputProps: { min: 0, style: { textAlign: 'center' } } }}
                                                            sx={noSpinnersSx}
                                                            onKeyDown={handleKeyDown}
                                                        />
                                                    </TableCell>
                                                </Fragment>
                                            ))}
                                        </TableRow>
                                    ))}

                                    <TableRow sx={{ backgroundColor: '#fafafa' }}>
                                        <TableCell sx={{ py: 0.5, px: 1, border: '1px solid #ccc', fontWeight: 'bold', fontSize: '0.8rem' }}>Total</TableCell>
                                        {actividades.map((tarea) => (
                                            <Fragment key={`total-${tarea.value}`}>
                                                <TableCell align="center" sx={{ py: 0.5, px: 1, border: '1px solid #ccc', fontWeight: 'bold', width: subCellWidth }}>
                                                    0
                                                </TableCell>
                                                <TableCell align="center" sx={{ py: 0.5, px: 1, border: '1px solid #ccc', fontWeight: 'bold', width: subCellWidth }}>
                                                    0
                                                </TableCell>
                                            </Fragment>
                                        ))}
                                    </TableRow>
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fade>
    );
};

export default TableValues;