import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Fade,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { GetDataAgenteRiesgo, GetAllAgentesAPT, SaveAgenteAPT } from 'api/clients/APTRatingClient';
import 'assets/scss/otherstyles.scss';
import Iconify from 'components/iconify/iconify';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

// Componente auxiliar para evitar lag al escribir en textareas
const DebouncedTextarea = ({ value, onChange, registerRef, ...props }) => {
  const [localValue, setLocalValue] = useState(value || '');
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);

    // Ajuste de altura inmediato
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  const handleBlur = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onChange(localValue);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <textarea
      ref={registerRef}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
};

const DetailAgentes = ({ idAPTCalificacion }) => {
  const [agentesData, setAgentesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: null, message: '' });
  const [tableValues, setTableValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [structureResponse, savedResponse] = await Promise.all([
          GetDataAgenteRiesgo(),
          idAPTCalificacion ? GetAllAgentesAPT(idAPTCalificacion) : Promise.resolve(null)
        ]);

        let agents = [];
        if (structureResponse?.data?.exito) {
          agents = structureResponse.data.datos || [];
          setAgentesData(agents);
        } else {
          setAgentesData([]);
        }

        const savedValues = savedResponse?.data?.datos || [];

        const initialValues = {};
        agents.forEach(agente => {
          (agente.itemAgente || []).forEach(item => {
            const key = `${agente.idAgenteRiesgo}-${item.id}`;
            initialValues[key] = {
              id: 0,
              exposicion: '',
              frecuencia: '',
              intensidad: '',
              escalaProtocolo: '',
              tipo: item.tipo
            };
          });
        });

        if (Array.isArray(savedValues) && savedValues.length > 0) {
          savedValues.forEach(val => {
            const key = `${val.idGrupoCondicion}-${val.idCondicion}`;
            initialValues[key] = {
              id: val.id || 0,
              exposicion: val.exposicion !== null && val.exposicion !== undefined ? val.exposicion.toString() : '',
              frecuencia: val.frecuencia !== null && val.frecuencia !== undefined ? val.frecuencia.toString() : '',
              intensidad: val.inten !== null && val.inten !== undefined ? val.inten.toString() : '',
              escalaProtocolo: val.descripcion || '',
              tipo: val.tipo !== null && val.tipo !== undefined ? val.tipo : initialValues[key]?.tipo
            };
          });
        }

        setTableValues(initialValues);
      } catch (error) {
        console.error("Error al cargar agentes de riesgo:", error);
        setAgentesData([]);
        setTableValues({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idAPTCalificacion]);

  const handleValueChange = useCallback((idAgente, idItem, field, value) => {
    const key = `${idAgente}-${idItem}`;

    setTableValues(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  }, []);

  const collectAllValues = () => {
    const valuesToSave = [];

    agentesData.forEach(agente => {
      (agente.itemAgente || []).forEach(item => {
        const key = `${agente.idAgenteRiesgo}-${item.id}`;
        const value = tableValues[key] || {
          id: 0,
          exposicion: '',
          frecuencia: '',
          intensidad: '',
          escalaProtocolo: '',
          tipo: item.tipo
        };

        valuesToSave.push({
          id: value.id || 0,
          idAPTCalificacion: idAPTCalificacion,
          idGrupoCondicion: agente.idAgenteRiesgo,
          idCondicion: item.id,
          exposicion: value.exposicion !== '' && value.exposicion !== null && value.exposicion !== undefined ? parseInt(value.exposicion, 10) : null,
          frecuencia: value.frecuencia !== '' && value.frecuencia !== null && value.frecuencia !== undefined ? parseInt(value.frecuencia, 10) : null,
          inten: value.intensidad !== '' && value.intensidad !== null && value.intensidad !== undefined ? parseInt(value.intensidad, 10) : null,
          tipo: value.tipo !== null && value.tipo !== undefined ? parseInt(value.tipo, 10) : parseInt(item.tipo, 10),
          descripcion: value.escalaProtocolo || null
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
      console.log('Datos a guardar:', valuesToSave);

      const response = await SaveAgenteAPT(valuesToSave);
      if (!response?.data?.exito) {
        throw new Error(response?.data?.mensaje || 'Error al guardar los valores. Por favor, intente nuevamente.');
      }

      setSaveStatus({
        success: true,
        message: response.data.mensaje || 'Datos guardados correctamente.'
      });

      // Notificar a TableFactors que recargue los factores (los cálculos dependen de estos datos)
      window.dispatchEvent(new CustomEvent('refresh-factors-apt'));

      // Recargar los valores guardados para obtener los IDs asignados por la BD
      const savedResponse = await GetAllAgentesAPT(idAPTCalificacion);
      if (savedResponse?.data?.exito) {
        const savedValues = savedResponse.data.datos || [];
        setTableValues(prev => {
          const updated = { ...prev };
          savedValues.forEach(val => {
            const key = `${val.idGrupoCondicion}-${val.idCondicion}`;
            if (updated[key]) {
              updated[key].id = val.id || 0;
            }
          });
          return updated;
        });
      }

      setTimeout(() => {
        setSaveStatus({ success: null, message: '' });
      }, 3500);
    } catch (error) {
      setSaveStatus({
        success: false,
        message: error.message || 'Error al guardar los valores. Por favor, intente nuevamente.'
      });

      setTimeout(() => {
        setSaveStatus({ success: null, message: '' });
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNumberChange = (idAgente, idItem, field, value) => {
    if (value === '' || (value >= 1 && value <= 3 && /^\d+$/.test(value))) {
      handleValueChange(idAgente, idItem, field, value);
    }
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = Math.min(element.scrollHeight, 100) + 'px';
  };

  const handleTextareaChange = (idAgente, idItem, field, event) => {
    const textarea = event.target;
    handleValueChange(idAgente, idItem, field, textarea.value);

    // Ajustar altura después del cambio
    requestAnimationFrame(() => {
      adjustTextareaHeight(textarea);
    });
  };

  // Ref para manejar el textarea
  const textareaRefs = useRef({});

  const registerTextareaRef = (key, element) => {
    if (element) {
      textareaRefs.current[key] = element;
      adjustTextareaHeight(element);
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
            Cargando evaluación de agentes de riesgo
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        p: 2.5,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Header con título y botón de guardar */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          borderBottom: '1px solid #ccc',
          flexShrink: 0
        }}>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="text.primary"
              sx={{ mb: 0.5 }}
            >
              Evaluación de Agentes de Riesgo
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Gestione los valores de exposición, frecuencia, intensidad y escala de protocolo
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
              startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save />}
            >
              {isSaving ? 'Guardando...' : 'Guardar'}
            </Button>
          </Box>
        </Box>

        {/* Alerta de estado */}
        {saveStatus.success !== null && (
          <Box sx={{ mt: 2, flexShrink: 0 }}>
            <div className="alert-animation">
              <Alert severity={saveStatus.success ? 'success' : 'error'}>
                {saveStatus.message}
              </Alert>
            </div>
          </Box>
        )}

        {/* Contenedor de la Tabla */}
        <TableContainer component={Paper} elevation={3} sx={{
          borderRadius: 2,
          overflow: 'auto',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          flex: 1,
          mt: 2,
          border: '1px solid #ccc'
        }}>
          <Table sx={{
            border: 'none',
            tableLayout: 'fixed',
            width: '100%'
          }} aria-label="risk agent assessment table">
            <TableHead sx={{ position: 'sticky', top: 0, zIndex: 11 }}>
              {/* Fila de encabezados de columnas */}
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    width: '30%'
                  }}
                >
                  Agente de riesgo
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    width: '5%'
                  }}
                >
                  EXPO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    width: '5%'
                  }}
                >
                  FREC
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    width: '5%'
                  }}
                >
                  INTEN
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem',
                    width: '55%'
                  }}
                >
                  Escala de protocolo
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* CONDICIONES DE TIPO INTRALABORAL - SUBHEADER SINGLE */}
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell
                  colSpan={5}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    color: '#0d47a1',
                    py: 1.25,
                    px: 3,
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  1. CONDICIONES DE TIPO INTRALABORAL
                </TableCell>
              </TableRow>

              {/* GRUPO INTRALABORAL */}
              {(() => {
                let intraCounter = 0;
                return agentesData.map((agente, agenteIndex) => {
                  const intralaborales = (agente.itemAgente || []).filter(item => item.tipo === 1);
                  if (intralaborales.length === 0) return null;

                  intraCounter++;
                  const formattedIndex = `1.${intraCounter}`;

                  return (
                    <Fragment key={`intra-${agente.idAgenteRiesgo}`}>
                      <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableCell
                          colSpan={5}
                          sx={{
                            fontWeight: 'bold',
                            border: '1px solid #ccc',
                            backgroundColor: '#fafafa',
                            textTransform: 'uppercase'
                          }}
                        >
                          {`${formattedIndex}. ${agente.agenteRiesgo}`}
                        </TableCell>
                      </TableRow>

                      {intralaborales.map((item, itemIndex) => {
                        const key = `${agente.idAgenteRiesgo}-${item.id}`;
                        const value = tableValues[key] || { exposicion: '', frecuencia: '', intensidad: '', escalaProtocolo: '' };

                        return (
                          <TableRow key={`${agente.idAgenteRiesgo}-${item.id}`} hover>
                            <TableCell
                              align="left"
                              sx={{
                                fontWeight: 'normal',
                                border: '1px solid #ccc',
                                py: 0.5,
                                px: 2,
                                fontSize: '0.8rem'
                              }}
                            >
                              <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.primary' }}>
                                {`${itemIndex + 1}. ${item.nombre}`}
                              </Typography>
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                position: 'relative'
                              }}
                            >
                              <input
                                value={value.exposicion}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  outline: 'none',
                                  textAlign: 'center',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  appearance: 'none',
                                  MozAppearance: 'textfield',
                                  boxSizing: 'border-box'
                                }}
                                onKeyDown={(e) => {
                                  if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    if (!/^\d$/.test(e.key) || e.target.value.length >= 1) {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (inputValue === '' || (inputValue >= 1 && inputValue <= 3 && /^\d+$/.test(inputValue))) {
                                    handleNumberChange(agente.idAgenteRiesgo, item.id, 'exposicion', inputValue);
                                  }
                                }}
                              />
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                position: 'relative'
                              }}
                            >
                              <input
                                value={value.frecuencia}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  outline: 'none',
                                  textAlign: 'center',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  appearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                                onKeyDown={(e) => {
                                  if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    if (!/^\d$/.test(e.key) || e.target.value.length >= 1) {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (inputValue === '' || (inputValue >= 1 && inputValue <= 3 && /^\d+$/.test(inputValue))) {
                                    handleNumberChange(agente.idAgenteRiesgo, item.id, 'frecuencia', inputValue);
                                  }
                                }}
                              />
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                position: 'relative'
                              }}
                            >
                              <input
                                value={value.intensidad}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  outline: 'none',
                                  textAlign: 'center',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  appearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                                onKeyDown={(e) => {
                                  if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    if (!/^\d$/.test(e.key) || e.target.value.length >= 1) {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (inputValue === '' || (inputValue >= 1 && inputValue <= 3 && /^\d+$/.test(inputValue))) {
                                    handleNumberChange(agente.idAgenteRiesgo, item.id, 'intensidad', inputValue);
                                  }
                                }}
                              />
                            </TableCell>

                            <TableCell
                              align="left"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                px: 1,
                                position: 'relative'
                              }}
                            >
                              <DebouncedTextarea
                                value={value.escalaProtocolo}
                                registerRef={(el) => registerTextareaRef(key, el)}
                                style={{
                                  width: '100%',
                                  minHeight: '50px',
                                  maxHeight: '100px',
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  resize: 'none',
                                  overflow: 'hidden',
                                  boxSizing: 'border-box'
                                }}
                                onChange={(val) => handleValueChange(agente.idAgenteRiesgo, item.id, 'escalaProtocolo', val)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </Fragment>
                  );
                });
              })()}

              {/* CONDICIONES DE TIPO EXTRALABORAL - SUBHEADER SINGLE */}
              <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                <TableCell
                  colSpan={5}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    border: '1px solid #ccc',
                    letterSpacing: '0.05em',
                    color: '#1b5e20',
                    py: 1.25,
                    px: 3,
                    textTransform: 'uppercase',
                    textAlign: 'center'
                  }}
                >
                  2. CONDICIONES DE TIPO EXTRALABORAL
                </TableCell>
              </TableRow>

              {/* GRUPO EXTRALABORAL */}
              {(() => {
                let extraCounter = 0;
                return agentesData.map((agente) => {
                  const extralaborales = (agente.itemAgente || []).filter(item => item.tipo === 2);
                  if (extralaborales.length === 0) return null;

                  extraCounter++;
                  const formattedIndex = `2.${extraCounter}`;

                  return (
                    <Fragment key={`extra-${agente.idAgenteRiesgo}`}>
                      <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableCell
                          colSpan={5}
                          sx={{
                            fontWeight: 'bold',
                            border: '1px solid #ccc',
                            backgroundColor: '#fafafa',
                            textTransform: 'uppercase'
                          }}
                        >
                          {`${formattedIndex}. ${agente.agenteRiesgo}`}
                        </TableCell>
                      </TableRow>

                      {extralaborales.map((item, itemIndex) => {
                        const key = `${agente.idAgenteRiesgo}-${item.id}`;
                        const value = tableValues[key] || { exposicion: '', frecuencia: '', intensidad: '', escalaProtocolo: '' };

                        return (
                          <TableRow key={`${agente.idAgenteRiesgo}-${item.id}`} hover>
                            <TableCell
                              align="left"
                              sx={{
                                fontWeight: 'normal',
                                border: '1px solid #ccc',
                                py: 0.5,
                                px: 2,
                                fontSize: '0.8rem'
                              }}
                            >
                              <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.primary' }}>
                                {`${itemIndex + 1}. ${item.nombre}`}
                              </Typography>
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                position: 'relative'
                              }}
                            >
                              <input
                                value={value.exposicion}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  outline: 'none',
                                  textAlign: 'center',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  appearance: 'none',
                                  MozAppearance: 'textfield',
                                  boxSizing: 'border-box'
                                }}
                                onKeyDown={(e) => {
                                  if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    if (!/^\d$/.test(e.key) || e.target.value.length >= 1) {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (inputValue === '' || (inputValue >= 1 && inputValue <= 3 && /^\d+$/.test(inputValue))) {
                                    handleNumberChange(agente.idAgenteRiesgo, item.id, 'exposicion', inputValue);
                                  }
                                }}
                              />
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                position: 'relative'
                              }}
                            >
                              <input
                                value={value.frecuencia}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  outline: 'none',
                                  textAlign: 'center',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  appearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                                onKeyDown={(e) => {
                                  if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    if (!/^\d$/.test(e.key) || e.target.value.length >= 1) {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (inputValue === '' || (inputValue >= 1 && inputValue <= 3 && /^\d+$/.test(inputValue))) {
                                    handleNumberChange(agente.idAgenteRiesgo, item.id, 'frecuencia', inputValue);
                                  }
                                }}
                              />
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                position: 'relative'
                              }}
                            >
                              <input
                                value={value.intensidad}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: 'none',
                                  outline: 'none',
                                  textAlign: 'center',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  appearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                                onKeyDown={(e) => {
                                  if (!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    if (!/^\d$/.test(e.key) || e.target.value.length >= 1) {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (inputValue === '' || (inputValue >= 1 && inputValue <= 3 && /^\d+$/.test(inputValue))) {
                                    handleNumberChange(agente.idAgenteRiesgo, item.id, 'intensidad', inputValue);
                                  }
                                }}
                              />
                            </TableCell>

                            <TableCell
                              align="left"
                              sx={{
                                border: '1px solid #ccc',
                                py: 0.5,
                                px: 1,
                                position: 'relative'
                              }}
                            >
                              <DebouncedTextarea
                                value={value.escalaProtocolo}
                                registerRef={(el) => registerTextareaRef(key, el)}
                                style={{
                                  width: '100%',
                                  minHeight: '50px',
                                  maxHeight: '100px',
                                  border: 'none',
                                  outline: 'none',
                                  background: 'transparent',
                                  fontSize: '0.8rem',
                                  padding: '4px 0',
                                  resize: 'none',
                                  overflow: 'hidden',
                                  boxSizing: 'border-box'
                                }}
                                onChange={(val) => handleValueChange(agente.idAgenteRiesgo, item.id, 'escalaProtocolo', val)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </Fragment>
                  );
                });
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  );
};

export default DetailAgentes;