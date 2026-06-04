import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Add, AddCircle, ClearAll, Close, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from "@mui/material";
import { ActivityRecordsExist, DeleteAPTHPMetodoControl, GetAllAPTHPMetodoControl, SaveAPTHPMetodoControl, ValorRefeSegmentoRecordsExist } from "api/clients/APTHigienePlantillaClient";
import { GetByTipoCatalogoCombo, InsertCatalog } from "api/clients/CatalogClient";
import { GetByIdCompany } from "api/clients/CompanyClient";
import ControlModal from 'components/controllers/ControlModal';
import { CodCatalogo, DefaultData } from "components/helpers/Enums";
import InputCheckBox from "components/input/InputCheckBox";
import InputSelect from "components/input/InputSelect";
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";
import InputText from "components/input/InputText";
import InputTextEditor from "components/input/InputTextEditor";
import EmptyState from 'components/loading/EmptyState';
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import ActivityTable from "./ActivityTable";
import AnimatedSearchBar from './AnimatedSearchBar';
import BiomechanicalRiskAssessment from "./BiomechanicalRiskAssessment";
import CustomAlert from "./CustomAlert";
import ImageDropzone from "./ImageDropzone";
import PhotographicEvidence from "./PhotographicEvidence";
import { OWASMethodTables, OrganizationalFactorTable, StyledTableCell, StyledTableRow, TableReferenceValuesSegment } from "./TableAPT";
import TableValues from "./TableValues";
import WorkCycleDropzone from "./WorkCycleDropzone";

export const CompanyInformation = () => {
    const { setValue, formState: { errors } } = useFormContext();

    const [lsCompany, setLsCompany] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsDepartamento, setLsDepartamento] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerCompany = await GetByIdCompany(DefaultData.EmpresaDrummond);
            const lsCompany = [{ value: lsServerCompany.data?.codigo, label: lsServerCompany.data?.descripcionSpa, codigo: lsServerCompany.data?.actividadEconomica }];
            setLsCompany(lsCompany);
            setValue('actividadEconomica', lsServerCompany.data?.actividadEconomica || '');
            setValue('empresa', lsServerCompany.data?.codigo || '');

            const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_SEDE);
            setLsSede(lsServerSede.data);

            const lsServerArea = await GetByTipoCatalogoCombo(CodCatalogo.Area);
            setLsArea(lsServerArea.data);

            const lsServerDepartamento = await GetByTipoCatalogoCombo(CodCatalogo.DepartEmpresa);
            setLsDepartamento(lsServerDepartamento.data);

            const lsServerCargo = await GetByTipoCatalogoCombo(CodCatalogo.DescripcionRosterPosition);
            setLsCargo(lsServerCargo.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    disabled
                    name="empresa"
                    label="Empresa"
                    options={lsCompany}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    disabled
                    fullWidth
                    name="actividadEconomica"
                    label="Actividad económica"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="sede"
                    label="Sede"
                    options={lsSede}
                    bug={errors.sede}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelectAutocomplete
                    name="departamentoAuto"
                    label="Departamento"
                    options={lsDepartamento}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelectAutocomplete
                    name="areaAuto"
                    label="Área"
                    options={lsArea}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelectAutocomplete
                    name="cargoAuto"
                    label="Cargo"
                    options={lsCargo}
                />
            </Grid>
        </Grid>
    )
}

export const OrganizationalAspects = () => {
    const [lsTurno, setLsTurno] = useState([]);
    const [lsCategoriaCargo, setLsCategoriaCargo] = useState([]);
    const [lsJornadaTrabajo, setLsJornadaTrabajo] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerTurno = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
            setLsTurno(lsServerTurno.data);

            const lsServerCategoriaCargo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_CATEGORIA_CARGO);
            setLsCategoriaCargo(lsServerCategoriaCargo.data);

            const lsServerJornadaTrabajo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_JORNADATRABAJO);
            setLsJornadaTrabajo(lsServerJornadaTrabajo.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="jornadaLaboralHoras"
                    label="Jornada de trabajo"
                    options={lsJornadaTrabajo}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="turno"
                    label="Turno"
                    options={lsTurno}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="rotaciones"
                    label="Rotaciones"
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="ritmoTrabajo"
                    label="Ritmo de trabajo"
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="tiempoPausa"
                    label="Tiempos de pausa"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    showAI
                    showVoice
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="categoriaCargo"
                    label="Categoría del cargo"
                    options={lsCategoriaCargo}
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="organizacionTrabajoIndividual"
                    label="Organización del trabajo (Individual)"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    showAI
                    showVoice
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="organizacionTrabajoEquipo"
                    label="Organización del trabajo (En equipo)"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    showAI
                    showVoice
                />
            </Grid>
        </Grid>
    )
}

export const WorkActivity = () => {
    const { watch: watchMain } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const disenoObjImage = { idAPT, idItemAcordeon: 3, idSegundarioModulo: 1, tipoLogica };
    const mobiliariorObjImage = { idAPT, idItemAcordeon: 3, idSegundarioModulo: 2, tipoLogica };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Objetivo del cargo" name="objetivoCargo" />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Características de diseño del puesto de trabajo" name="caracteristicasDisenoPuesto" />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Evidencias fotográficas de las características de diseño del puesto de trabajo">
                    <PhotographicEvidence name="fotosCaracteristicasDisenoPuesto" objImage={disenoObjImage} />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Mobiliario" name="mobiliario" />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Evidencias fotográficas del mobiliario">
                    <PhotographicEvidence name="fotosMobiliario" objImage={mobiliariorObjImage} />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Herramientas, equipos y materiales" name="herramientasEquipos" />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Ayudas mecánicas" name="ayudasMecanicas" />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Elementos de confort" name="elementosConfort" />
            </Grid>
        </Grid>
    )
}

export const EnvironmentalAspects = () => {
    const [lsAgenteBiologico, setLsAgenteBiologico] = useState([]);
    const [lsAgenteQuimico, setLsAgenteQuimico] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerAgenteBiologico = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_AGENTE_BIOLOGICO);
            setLsAgenteBiologico(lsServerAgenteBiologico.data);

            const lsServerAgenteQuimico = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_AGENTE_QUIMICO);
            setLsAgenteQuimico(lsServerAgenteQuimico.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="condicionesOrdenAseo"
                    label="Condiciones de orden y aseo"
                    multiline
                    rows={2}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="agentesBiologicos"
                    label="Agentes biológicos"
                    options={lsAgenteBiologico}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="agentesQuimicos"
                    label="Agentes químicos"
                    options={lsAgenteQuimico}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="iluminacion"
                    label="Iluminación"
                    multiline
                    rows={2}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="materialParticulado"
                    label="Material particulado"
                    multiline
                    rows={2}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="ruido"
                    label="Ruido"
                    multiline
                    rows={3}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="temperatura"
                    label="Temperatura"
                    multiline
                    rows={3}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="ventilacion"
                    label="Ventilación"
                    multiline
                    rows={3}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="vibracion"
                    label="Vibración"
                    multiline
                    rows={3}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export const WorkActivityTwo = () => {
    const { watch: watchMain, control } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Descripción general del cargo" name="descripcionGeneralCargo" />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Rotaciones establecidas para el cargo" name="rotacionesCargo" />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Ciclo de trabajo">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <WorkCycleDropzone name="fotoCicloTrabajo" control={control} idAPT={idAPT} tipoLogica={tipoLogica} />
                        </Grid>

                        <Grid item xs={12}>
                            <InputTextEditor
                                label="Interpretación del ciclo de trabajo"
                                name="interpretacionCicloTrabajo"
                            />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <ActivityTable />
            </Grid>
        </Grid>
    )
}

export const AssessmentPhysicalLoad = () => {
    const { watch: watchMain } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const valoresPopupRef = useRef(null);

    const [hasActivities, setHasActivities] = useState(false);
    const [hasReferenceValues, setHasReferenceValues] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    const checkValidations = useCallback(async () => {
        if (!idAPT) return;

        try {
            // Verificar actividades
            const resActivities = await ActivityRecordsExist(idAPT, tipoLogica);
            const existsActivities = resActivities.data.datos || false;
            setHasActivities(existsActivities);

            // Verificar valores de referencia
            const resRefValues = await ValorRefeSegmentoRecordsExist(idAPT, tipoLogica);
            const existsRefValues = resRefValues.data.datos || false;
            setHasReferenceValues(existsRefValues);

            // Determinar alerta
            if (!existsActivities) {
                setAlert({
                    open: true,
                    message: "No se han registrado actividades aún, por favor complete ese paso primero para habilitar la valoración.",
                    severity: "warning"
                });
            } else if (!existsRefValues) {
                setAlert({
                    open: true,
                    message: "Debe guardar los 'Valores de referencia por segmento' para habilitar las tablas de valoración.",
                    severity: "warning"
                });
            } else {
                setAlert({ open: false, message: '', severity: 'info' });
            }
        } catch (error) {
            console.error("Error en validaciones de valoración:", error);
        }
    }, [idAPT]);

    useEffect(() => {
        checkValidations();
    }, [checkValidations]);

    // Escuchar eventos de actualización (por ejemplo, cuando se guarda una actividad o valor de referencia)
    useEffect(() => {
        const handleRefresh = () => checkValidations();
        window.addEventListener('refresh-assessment-validations', handleRefresh);
        window.addEventListener('refresh-owas-table', handleRefresh); // Reutilizar este evento si aplica
        return () => {
            window.removeEventListener('refresh-assessment-validations', handleRefresh);
            window.removeEventListener('refresh-owas-table', handleRefresh);
        };
    }, [checkValidations]);

    const closePopup = useCallback(() => {
        if (valoresPopupRef.current && !valoresPopupRef.current.closed) {
            valoresPopupRef.current.close();
            valoresPopupRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => closePopup();
    }, [location.pathname, closePopup]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'serviceToken' && !e.newValue) {
                closePopup();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [closePopup]);

    const handleOpenPopup = () => {
        if (valoresPopupRef.current && !valoresPopupRef.current.closed) {
            valoresPopupRef.current.focus();
            return;
        }

        const width = window.screen.availWidth;
        const height = window.screen.availHeight;
        const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=0,top=0`);
        if (popupWindow) {
            valoresPopupRef.current = popupWindow;
            popupWindow.document.title = "Valoración";
            popupWindow.document.body.innerHTML = '<div id="popup-root-valores"></div>';
            popupWindow.document.body.style.margin = '0';

            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(styleNode => {
                popupWindow.document.head.appendChild(styleNode.cloneNode(true));
            });

            const popupCache = createCache({
                key: 'popup-mui',
                container: popupWindow.document.head,
            });

            ReactDOM.render(
                <CacheProvider value={popupCache}>
                    <TableValues idAPT={idAPT} tipoLogica={tipoLogica} />
                </CacheProvider>,
                popupWindow.document.getElementById('popup-root-valores')
            );
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OWASMethodTables />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Aplicación de la metodología ANSI">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <OrganizationalFactorTable />
                        </Grid>

                        <Grid item xs={12}><Divider /></Grid>

                        <Grid item xs={12}>
                            <TableReferenceValuesSegment />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Valoración">
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
                            <Button
                                variant="outlined"
                                onClick={handleOpenPopup}
                                disabled={!hasActivities || !hasReferenceValues}
                            >
                                Ver tablas de valoración
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <InputTextEditor label="Observación de los resultados" name="observacionResultadosValoracion" />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Valoración consolidada del riesgo biomecánico">
                    <BiomechanicalRiskAssessment />
                </SubCard>
            </Grid>
        </Grid>
    )
}

export const ApplicableEnvironmentalMeasurements = () => {
    const { watch: watchMain, control } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const habilitadoVibracion = watchMain("habilitadoVibracion");
    const habilitadoRuido = watchMain("habilitadoRuido");
    const habilitadoMateriaParticulado = watchMain("habilitadoMateriaParticulado");

    const vibrationObjImage = { idAPT, idItemAcordeon: 6, idSegundarioModulo: 1, tipoLogica };
    const noiseObjImage = { idAPT, idItemAcordeon: 6, idSegundarioModulo: 2, tipoLogica };
    const particulateObjImage = { idAPT, idItemAcordeon: 6, idSegundarioModulo: 3, tipoLogica };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a vibración" secondary={<InputCheckBox name="habilitadoVibracion" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoVibracion && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <CustomAlert severity="warning" message="Para registrar la exposición a vibración debe habilitarla dando en el check, de lo contrario se interpretará como no aplica." />
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="vibrationImage" control={control} objImage={vibrationObjImage} disabled={!habilitadoVibracion} exposureType="vibración" targetInput="interpretacionVibracion" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionVibracion" disabled={!habilitadoVibracion} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a ruido" secondary={<InputCheckBox name="habilitadoRuido" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoRuido && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <CustomAlert severity="warning" message="Para registrar la exposición a ruido debe habilitarla dando en el check, de lo contrario se interpretará como no aplica." />
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="ruidoImage" control={control} objImage={noiseObjImage} disabled={!habilitadoRuido} exposureType="ruido" targetInput="interpretacionRuido" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionRuido" disabled={!habilitadoRuido} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a material particulado" secondary={<InputCheckBox name="habilitadoMateriaParticulado" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoMateriaParticulado && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <CustomAlert severity="warning" message="Para registrar la exposición a material particulado debe habilitarla dando en el check, de lo contrario se interpretará como no aplica." />
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="particulateImage" control={control} objImage={particulateObjImage} disabled={!habilitadoMateriaParticulado} exposureType="material particulado" targetInput="interpretacionMaterialParticulado" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionMaterialParticulado" disabled={!habilitadoMateriaParticulado} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    )
}

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

const validationControlMethods = yup.object().shape({
    control: yup.string().required("El control es requerido"),
    tipoControl: yup.string().required("El tipo de control es requerido"),
    observacionesUso: yup.string().required("Las observaciones sobre uso brindado es requerida"),
    observacionesNivel: yup.string().required("Las observaciones sobre nivel de protección brindado es requerida"),
});

export const AvailableControlMethods = () => {
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

    const handleSelectMethod = (data) => {
        console.log(data);
    }

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
                <Grid item xs={12} md={6} lg={5}>
                    <AnimatedSearchBar idAPT={idAPT} onSelect={handleSelectMethod} />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 1.5 }} />
                </Grid>

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

export const ConclusionAndSource = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Conclusiones" name="conclusion" />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Fuentes de información" name="fuenteInformacion" />
            </Grid>
        </Grid>
    )
}