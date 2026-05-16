import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Fade,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from '@mui/material';
import {
    GetAllAPTHPValoracion,
    GetDataTableAPTHPValoracion,
    SaveAPTHPValoracion
} from 'api/clients/APTHigienePlantillaClient';
import { UpperFirstChar } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import { Fragment, useCallback, useEffect, useState } from 'react';
import 'assets/scss/otherstyles.scss';

const TableValues = ({ idAPT, tipoLogica }) => {
    // Persistencia de idAPT y tipoLogica en sessionStorage para soportar F5 en la ventana emergente
    const [effectiveIdAPT, setEffectiveIdAPT] = useState(() => {
        if (idAPT) {
            sessionStorage.setItem('current_idAPT', idAPT);
            return idAPT;
        }
        return sessionStorage.getItem('current_idAPT');
    });

    const [effectiveTipoLogica, setEffectiveTipoLogica] = useState(() => {
        if (tipoLogica) {
            sessionStorage.setItem('current_tipoLogica', tipoLogica);
            return tipoLogica;
        }
        return sessionStorage.getItem('current_tipoLogica');
    });

    const [assessmentData, setAssessmentData] = useState([]);
    const [parametros, setParametros] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState({ success: null, message: '' });
    const [tableValues, setTableValues] = useState({});

    useEffect(() => {
        if (effectiveIdAPT) {
            setIsLoading(true);

            // Cargar estructura de la tabla y valores guardados en paralelo
            Promise.all([
                GetDataTableAPTHPValoracion(effectiveIdAPT, effectiveTipoLogica),
                GetAllAPTHPValoracion(effectiveIdAPT, effectiveTipoLogica)
            ]).then(([tableResponse, valuesResponse]) => {
                const payload = tableResponse?.data?.datos || {};
                const savedValues = valuesResponse?.data?.datos || [];

                if (tableResponse?.data?.exito) {
                    const currentActividades = payload.listaActividades || [];
                    const currentParametros = payload.listaParametros || [];
                    const sortedSegments = (payload.listaSegmentos || []).slice().sort((a, b) => {
                        const av = a.idSegmento ?? 0;
                        const bv = b.idSegmento ?? 0;
                        return av - bv;
                    });

                    setActividades(currentActividades);
                    setParametros(currentParametros);
                    setAssessmentData(sortedSegments);

                    // Inicializar valores de la tabla con ceros
                    const initialValues = {};
                    sortedSegments.forEach(segment => {
                        currentParametros.forEach(param => {
                            currentActividades.forEach(activity => {
                                const key = `${segment.idSegmento}-${segment.idMovimiento}-${param.value}-${activity.value}`;
                                initialValues[key] = { msd: 0, msi: 0 };
                            });
                        });
                    });

                    // Sobrescribir con los valores guardados que vienen de la DB
                    if (Array.isArray(savedValues)) {
                        savedValues.forEach(val => {
                            const key = `${val.idSegmento}-${val.idMovimiento}-${val.idParametro}-${val.idActividad}`;
                            if (initialValues.hasOwnProperty(key)) {
                                initialValues[key] = {
                                    msd: val.msd || 0,
                                    msi: val.msi || 0
                                };
                            }
                        });
                    }

                    setTableValues(initialValues);
                } else {
                    setActividades([]);
                    setParametros([]);
                    setAssessmentData([]);
                    setTableValues({});
                }
            }).catch((error) => {
            }).finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
        } else {
            setIsLoading(false);
        }
    }, [effectiveIdAPT]);

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

    const safeNumber = (val) => {
        if (val === '' || val === null || val === undefined) return 0;
        const n = parseFloat(val);
        return isNaN(n) ? 0 : n;
    };

    const handleValueChange = useCallback((idSegmento, idMovimiento, idParametro, idActividad, type, value) => {
        const key = `${idSegmento}-${idMovimiento}-${idParametro}-${idActividad}`;
        const parsed = safeNumber(value);

        setTableValues(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [type]: parsed
            }
        }));
    }, []);

    const calcMovementTotal = useCallback((row, tareaValue, type) => {
        const paramCount = parametros.length;
        if (paramCount === 0) return 0;

        let sum = 0;
        for (let i = 0; i < paramCount; i++) {
            const key = `${row.idSegmento}-${row.idMovimiento}-${parametros[i].value}-${tareaValue}`;
            const cellVal = tableValues[key];
            sum += safeNumber(cellVal?.[type]);
        }

        const valRef = safeNumber(row.valRefSegmento);
        const result = (sum / paramCount) * valRef;
        return isNaN(result) ? 0 : parseFloat(result.toFixed(2));
    }, [parametros, tableValues]);

    const collectAllValues = () => {
        const valuesToSave = [];

        assessmentData.forEach(segment => {
            parametros.forEach(param => {
                actividades.forEach(activity => {
                    const key = `${segment.idSegmento}-${segment.idMovimiento}-${param.value}-${activity.value}`;
                    const value = tableValues[key] || { msd: 0, msi: 0 };

                    valuesToSave.push({
                        idAPT: effectiveIdAPT,
                        idSegmento: segment.idSegmento,
                        idMovimiento: segment.idMovimiento,
                        idParametro: param.value,
                        idActividad: activity.value,
                        msd: value.msd,
                        msi: value.msi
                    });
                });
            });
        });

        return valuesToSave;
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus({ success: null, message: '' });

        try {
            const valuesToSave = collectAllValues();
            var result = await SaveAPTHPValoracion(valuesToSave, effectiveTipoLogica);
            if (!result.data.exito)
                throw new Error(result.data.mensaje || 'Error al guardar los valores. Por favor, intente nuevamente.');

            setSaveStatus({
                success: true,
                message: 'Valores guardados correctamente'
            });

            // Limpiar el estado después de 3 segundos para que la animación de salida se ejecute
            setTimeout(() => {
                setSaveStatus({ success: null, message: '' });
            }, 3500);
        } catch (error) {
            setSaveStatus({
                success: false,
                message: error.message || 'Error al guardar los valores. Por favor, intente nuevamente.'
            });

            // También limpiar el error después de 5 segundos
            setTimeout(() => {
                setSaveStatus({ success: null, message: '' });
            }, 5000);
        } finally {
            setTimeout(() => {
                setIsSaving(false);
            }, 500);
        }
    };

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
            <TableContainer component={Paper} elevation={3} sx={{
                borderRadius: 2,
                overflow: 'visible',
                width: '100%',
                boxSizing: 'border-box',
                position: 'relative'
            }}>
                <Table sx={{
                    minWidth: 800,
                    border: '1px solid #ccc',
                    tableLayout: 'fixed'
                }} aria-label="ergonomic assessment table">
                    <TableHead sx={{ position: 'sticky', top: 0, zIndex: 11 }}>
                        {/* Nueva fila para título y botón de guardar - dentro del TableHead */}
                        <TableRow>
                            <TableCell
                                colSpan={maxTareas * 2 + 2}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #ccc',
                                    py: 1,
                                    px: 2,
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 11
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color="text.primary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            Valoración Ergonómica
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Gestione los valores MSD y MSI para cada parámetro y actividad
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            transition: 'transform 0.15s ease',
                                            '&:hover': { transform: 'scale(1.04)' },
                                            '&:active': { transform: 'scale(0.9)' },
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : null}
                                        >
                                            {isSaving ? 'Guardando...' : 'Guardar'}
                                        </Button>
                                    </Box>
                                </Box>

                                <Box sx={{ my: 1.5 }}>
                                    {saveStatus.success !== null && (
                                        <div className="alert-animation">
                                            <Alert severity={saveStatus.success ? 'success' : 'error'}>
                                                {saveStatus.message}
                                            </Alert>
                                        </div>
                                    )}
                                </Box>
                            </TableCell>
                        </TableRow>

                        {/* Fila original de segmentos y parámetros */}
                        <TableRow>
                            <TableCell align="center" sx={{ backgroundColor: '#e0e0e0', width: '100px', fontWeight: 'bold', border: '1px solid #ccc', py: 1, px: 1, letterSpacing: '0.05em', fontSize: '0.85rem' }}>SEGMENTO</TableCell>
                            <TableCell sx={{ backgroundColor: '#e0e0e0', width: '130px', fontWeight: 'bold', border: '1px solid #ccc', py: 1, px: 1, letterSpacing: '0.05em', fontSize: '0.85rem' }}>PARÁMETROS</TableCell>
                            {actividades.map((act, idx) => (
                                <TableCell
                                    key={act.value}
                                    align="center"
                                    colSpan={2}
                                    sx={{
                                        backgroundColor: '#e0e0e0',
                                        fontWeight: 'bold',
                                        border: '1px solid #ccc',
                                        py: 1,
                                        px: 1,
                                        letterSpacing: '0.05em',
                                        fontSize: '0.85rem',
                                        width: activityCellWidth
                                    }}
                                >
                                    {`Actividad ${idx + 1}: ${UpperFirstChar(act.label)}`}
                                </TableCell>
                            ))}
                        </TableRow>

                        {/* Fila original de MSD y MSI */}
                        <TableRow>
                            <TableCell colSpan={2} sx={{
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #ccc',
                                py: 1,
                                px: 1,
                                position: 'sticky',
                                left: 0,
                                zIndex: 8
                            }} />

                            {actividades.map((act) => (
                                <Fragment key={`sub-${act.value}`}>
                                    <TableCell align="center" sx={{
                                        backgroundColor: '#f5f5f5',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        border: '1px solid #ccc',
                                        py: 0.5,
                                        px: 1,
                                        letterSpacing: '0.05em',
                                        textAlign: 'center',
                                        width: subCellWidth
                                    }}>
                                        MSD
                                    </TableCell>
                                    <TableCell align="center" sx={{
                                        backgroundColor: '#f5f5f5',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        border: '1px solid #ccc',
                                        py: 0.5,
                                        px: 1,
                                        letterSpacing: '0.05em',
                                        textAlign: 'center',
                                        width: subCellWidth
                                    }}>
                                        MSI
                                    </TableCell>
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
                                                    px: 1,
                                                    position: 'sticky',
                                                    left: 0,
                                                    zIndex: 7
                                                }}
                                            >
                                                {UpperFirstChar(row.segmento)}
                                            </TableCell>
                                        )}
                                        <TableCell align="center" colSpan={maxTareas * 2 + 1} sx={{
                                            fontWeight: 'bold',
                                            border: '1px solid #ccc',
                                            py: 0.5,
                                            px: 1,
                                            position: 'sticky',
                                            left: '100px',
                                            zIndex: 7
                                        }}>
                                            {`${UpperFirstChar(row.movimiento)} (${row.valRefSegmento})`}
                                        </TableCell>
                                    </TableRow>

                                    {parametros.map((param) => (
                                        <TableRow key={param.value} hover>
                                            <TableCell sx={{
                                                py: 0.5,
                                                px: 1,
                                                border: '1px solid #ccc',
                                                fontSize: '0.8rem',
                                                position: 'sticky',
                                                left: '100px',
                                                zIndex: 6,
                                                backgroundColor: 'inherit'
                                            }}>
                                                {param.label}
                                            </TableCell>
                                            {actividades.map((tarea) => {
                                                const key = `${row.idSegmento}-${row.idMovimiento}-${param.value}-${tarea.value}`;
                                                const value = tableValues[key] || { msd: 0, msi: 0 };

                                                return (
                                                    <Fragment key={`tarea-${tarea.value}`}>
                                                        <TableCell align="center" sx={{
                                                            py: 0.5,
                                                            px: 1,
                                                            border: '1px solid #ccc',
                                                            width: subCellWidth
                                                        }}>
                                                            <TextField
                                                                value={value.msd}
                                                                size="small"
                                                                type="number"
                                                                variant="standard"
                                                                InputProps={{
                                                                    disableUnderline: true,
                                                                    inputProps: {
                                                                        min: 0,
                                                                        style: { textAlign: 'center' }
                                                                    }
                                                                }}
                                                                sx={noSpinnersSx}
                                                                onKeyDown={handleKeyDown}
                                                                onChange={(e) => handleValueChange(
                                                                    row.idSegmento,
                                                                    row.idMovimiento,
                                                                    param.value,
                                                                    tarea.value,
                                                                    'msd',
                                                                    e.target.value
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center" sx={{
                                                            py: 0.5,
                                                            px: 1,
                                                            border: '1px solid #ccc',
                                                            width: subCellWidth
                                                        }}>
                                                            <TextField
                                                                value={value.msi}
                                                                size="small"
                                                                type="number"
                                                                variant="standard"
                                                                InputProps={{
                                                                    disableUnderline: true,
                                                                    inputProps: {
                                                                        min: 0,
                                                                        style: { textAlign: 'center' }
                                                                    }
                                                                }}
                                                                sx={noSpinnersSx}
                                                                onKeyDown={handleKeyDown}
                                                                onChange={(e) => handleValueChange(
                                                                    row.idSegmento,
                                                                    row.idMovimiento,
                                                                    param.value,
                                                                    tarea.value,
                                                                    'msi',
                                                                    e.target.value
                                                                )}
                                                            />
                                                        </TableCell>
                                                    </Fragment>
                                                );
                                            })}
                                        </TableRow>
                                    ))}

                                    <TableRow sx={{ backgroundColor: '#fafafa' }}>
                                        <TableCell sx={{
                                            py: 0.5,
                                            px: 1,
                                            border: '1px solid #ccc',
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                            position: 'sticky',
                                            left: '100px',
                                            zIndex: 5,
                                            backgroundColor: 'inherit'
                                        }}>
                                            Total
                                        </TableCell>
                                        {actividades.map((tarea) => (
                                            <Fragment key={`total-${tarea.value}`}>
                                                <TableCell align="center" sx={{
                                                    py: 0.5,
                                                    px: 1,
                                                    border: '1px solid #ccc',
                                                    fontWeight: 'bold',
                                                    width: subCellWidth
                                                }}>
                                                    {calcMovementTotal(row, tarea.value, 'msd')}
                                                </TableCell>
                                                <TableCell align="center" sx={{
                                                    py: 0.5,
                                                    px: 1,
                                                    border: '1px solid #ccc',
                                                    fontWeight: 'bold',
                                                    width: subCellWidth
                                                }}>
                                                    {calcMovementTotal(row, tarea.value, 'msi')}
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