import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Provider } from 'react-redux';
import { store } from 'store';
import { yupResolver } from "@hookform/resolvers/yup";
import {
    ArrowBack,
    Assessment,
    BusinessCenter,
    Description,
    LocalHospital,
    OpenInNew,
    Person,
    Save,
    SupervisorAccount,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    Stack,
} from "@mui/material";
import { ComboEvaluador, SaveAPTCalificacion } from "api/clients/APTRatingClient";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetComboCompany } from "api/clients/CompanyClient";
import { GetByIdEmployee } from "api/clients/EmployeeClient";
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import {
    AccionMenu,
    CodCatalogo,
    Modulo
} from "components/helpers/Enums";
import InputDatePicker from "components/input/InputDatePicker";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import ViewEmployee from "components/views/ViewEmployee";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as yup from "yup";
import DetailAgentes from "./Components/DetailAgentes";
import DetailFuentes from "./Components/DetailFuentes";
import DiagnosisAPT from "./Components/DiagnosisAPT";
import TableFactors, { TableResultFactors } from "./Components/TableFactors";
import SubCard from "ui-component/cards/SubCard";
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";
import SectionCard from "./Components/SectionCard";

const validationSchema = yup.object().shape({
    fecha: yup.date().required("La fecha es requerida"),
    documento: yup.string().required("El documento es requerido"),
});

const APTQualification = () => {
    const navigate = useNavigate();
    const agentesPopupRef = useRef(null);

    const [modelEmployee, setModelEmployee] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsEvaluador, setLsEvaluador] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),

        defaultValues: {
            fecha: new Date(),
            documento: "",
            idEmpresaAuto: null,
            idPuestoTrabajoAuto: null,
            fechaIngresoEmpresa: null,
            fechaIngresoPuesto: null,
            direccionCorrespondencia: "",
            telefono: "",
            documentoEvaluador: "",
            acercaPeriodo: "",
            expectativasProceso: "",
            antecedentesOcupacionales: "",
            aspectosOrganizacionales: "",
            fechaCargo: null,
            idCargoAuto: null,
            idAreaAuto: null,
            mision: "",
            proceso: "",
            caracteristicas: "",
            descripcionAgentes: "",
            aspectosIndividuales: "",
            condicionesIndividuo: "",
            dx1: "",
            dx2: "",
            dx3: "",
        },
    });

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = methods;

    const documento = watch("documento");
    const idAPTCalificacion = watch("idAPTCalificacion");

    useEffect(() => {
        async function initializeData() {
            try {
                const empresa = await GetComboCompany();
                setCompany(empresa.data);

                const catalogConfigs = [
                    { method: CodCatalogo.DescripcionRosterPosition, setter: setLsCargo },
                    { method: CodCatalogo.Area, setter: setLsArea }
                ];

                const catalogResults = await Promise.all(
                    catalogConfigs.map(config =>
                        GetByTipoCatalogoCombo(config.method)
                    )
                );

                catalogResults.forEach((result, index) => {
                    catalogConfigs[index].setter(result.data || []);
                });

                const lsServerEvaluador = await ComboEvaluador();
                var mapEvaluador = lsServerEvaluador.data.datos.map(eva => ({
                    ...eva,
                    value: eva.documento,
                    label: eva.nombre,
                }));
                setLsEvaluador(mapEvaluador);
            } catch (error) {
                toast.error("Error cargando datos");
            }
        }

        initializeData();
    }, []);

    const handleSave = async (data) => {
        try {
            setIsSubmitting(true);
            const payload = {
                id: idAPTCalificacion || 0,
                documento: data.documento,
                fecha: data.fecha || null,

                idEmpresa: data.idEmpresaAuto?.value || null,
                idPuestoTrabajo: data.idPuestoTrabajoAuto?.value || null,

                fechaIngresoEmpresa: data.fechaIngresoEmpresa || null,
                fechaIngresoPuesto: data.fechaIngresoPuesto || null,
                direccionCorrespondencia: data.direccionCorrespondencia || null,
                telefono: data.telefono || null,
                documentoEvaluador: data.documentoEvaluador || null,
                acercaPeriodo: data.acercaPeriodo || null,
                expectativasProceso: data.expectativasProceso || null,
                antecedentesOcupacionales: data.antecedentesOcupacionales || null,
                aspectosOrganizacionales: data.aspectosOrganizacionales || null,
                fechaCargo: data.fechaCargo || null,

                idCargo: data.idCargoAuto?.value || null,
                idArea: data.idAreaAuto?.value || null,

                mision: data.mision || null,
                proceso: data.proceso || null,
                caracteristicas: data.caracteristicas || null,
                descripcionAgentes: data.descripcionAgentes || null,
                aspectosIndividuales: data.aspectosIndividuales || null,
                CondicionesIndividuo: data.condicionesIndividuo || null,

                dX1: data.dx1 || null,
                dX2: data.dx2 || null,
                dX3: data.dx3 || null
            };

            const result = await SaveAPTCalificacion(payload);
            if (result.data.exito) {
                setValue("idAPTCalificacion", result.data.datos);
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje || "No se pudo guardar");
            }
        } catch (error) {
            toast.error("Error al guardar");
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSubmitting(false);
        }
    };

    const handleDocumento = async (event) => {
        try {
            const document = event?.target?.value;
            setValue("documento", document);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var responseEmployee = await GetByIdEmployee(event?.target.value);
                    if (responseEmployee?.status === 200) {
                        if (responseEmployee?.data.status !== 200)
                            toast.error(responseEmployee?.data.message);

                        const employee = responseEmployee.data.data;
                        setModelEmployee(employee);
                        setValue("telefono", employee?.celular);
                        setValue("direccionCorrespondencia", employee.direccionResidencia);
                        setValue("idEmpresaAuto", { value: employee.empresa, label: employee.nameCompany });
                        setValue("idPuestoTrabajoAuto", { value: employee.rosterPosition, label: employee.nameRosterPosition });
                        setValue("idCargoAuto", { value: employee.rosterPosition, label: employee.nameRosterPosition });
                        setValue("idAreaAuto", { value: employee.area, label: employee.nameArea });
                    }
                }
            } else setModelEmployee([]);
        } catch (error) { }
    }

    const handleEvaluador = async (event) => {
        try {
            setValue("documentoEvaluador", event.target.value);

            const listEvaluador = lsEvaluador;
            const dataEvalu = listEvaluador.find(fi => fi.value == event.target.value);
            setValue("evaluadorDocumento", dataEvalu.documento);
            setValue("evaluadorProfesion", dataEvalu.profesion);
            setValue("evaluadorPostgrado", dataEvalu.nameEspecialidad);
            setValue("evaluadorTarjetaPro", dataEvalu.tarjetaProfesional);
            setValue("evaluadorNumLicencia", dataEvalu.licencia);
        } catch (error) {

        }
    };

    const closeAgentesPopup = useCallback(() => {
        if (agentesPopupRef.current && !agentesPopupRef.current.closed) {
            agentesPopupRef.current.close();
            agentesPopupRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => closeAgentesPopup();
    }, [closeAgentesPopup]);

    const handleOpenAgentesPopup = () => {
        if (agentesPopupRef.current && !agentesPopupRef.current.closed) {
            agentesPopupRef.current.focus();
            return;
        }

        const width = window.screen.availWidth;
        const height = window.screen.availHeight;
        const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=0,top=0`);

        if (popupWindow) {
            agentesPopupRef.current = popupWindow;
            popupWindow.document.title = "Agentes de Riesgo";
            popupWindow.document.body.innerHTML = '<div id="popup-root-agentes"></div>';
            popupWindow.document.body.style.margin = '0';

            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(styleNode => {
                popupWindow.document.head.appendChild(styleNode.cloneNode(true));
            });

            const popupCache = createCache({
                key: 'popup-mui-agentes',
                container: popupWindow.document.head,
            });

            ReactDOM.render(
                <Provider store={store}>
                    <CacheProvider value={popupCache}>
                        <DetailAgentes idAPTCalificacion={idAPTCalificacion} />
                    </CacheProvider>
                </Provider>,
                popupWindow.document.getElementById('popup-root-agentes')
            );
        }
    };

    return (
        <ValidateActionSkeleton
            idAccion={AccionMenu.agregar}
            idModulo={Modulo.APTCalificacion}
        >
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            errors={errors}
                            title="Registrar APT Calificación"
                            key={modelEmployee?.documento}
                            documento={documento}
                            onChange={(e) => setValue("documento", e.target.value)}
                            lsEmployee={modelEmployee}
                            handleDocumento={handleDocumento}
                            handleEnter={handleDocumento}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StickyActionBar
                            mainTitle="Acciones"
                            showButton={false}
                            showButtonAction={false}
                            othersButton={
                                <>
                                    <Grid item xs={6} md={4} lg={2.5}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                startIcon={<ArrowBack />}
                                                onClick={() => navigate("/apt-qualification/list")}
                                                sx={{ borderRadius: 2 }}
                                            >
                                                Cerrar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={4} lg={2.5}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={handleSubmit(handleSave)}
                                                disabled={isSubmitting}
                                                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Save />}
                                            >
                                                {isSubmitting
                                                    ? "Guardando..."
                                                    : (idAPTCalificacion ? "Actualizar" : "Guardar")
                                                }
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </>
                            }
                        >
                            <Box sx={{ width: "100%" }}>
                                <Stack spacing={3}>
                                    <SectionCard
                                        icon={Person}
                                        title="Información del empleado"
                                        subtitle="Análisis de factores de riesgo psicosocial a nivel intra y extralaboral"
                                    >
                                        <Grid container spacing={2.5} sx={{ paddingRight: 3 }}>
                                            <Grid item xs={12} md={4}>
                                                <InputDatePicker
                                                    name="fecha"
                                                    label="Fecha"
                                                    bug={errors.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <InputText name="telefono" label="Teléfono" />
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <InputText
                                                    name="direccionCorrespondencia"
                                                    label="Dirección"
                                                />
                                            </Grid>
                                        </Grid>
                                    </SectionCard>

                                    <SectionCard
                                        icon={BusinessCenter}
                                        title="Información laboral"
                                        subtitle="Datos de empresa, puesto y fechas de ingreso."
                                    >
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12} md={6}>
                                                <InputSelectAutocomplete
                                                    name="idEmpresaAuto"
                                                    label="Empresa"
                                                    options={company}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputSelectAutocomplete
                                                    name="idPuestoTrabajoAuto"
                                                    label="Puesto de Trabajo"
                                                    options={lsCargo}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputDatePicker
                                                    name="fechaIngresoEmpresa"
                                                    label="Ingreso Empresa"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputDatePicker
                                                    name="fechaIngresoPuesto"
                                                    label="Ingreso Puesto"
                                                />
                                            </Grid>
                                        </Grid>
                                    </SectionCard>

                                    <SectionCard
                                        icon={LocalHospital}
                                        title="Diagnóstico"
                                        subtitle="Selecciona uno o varios diagnósticos clínicos asociados al caso."
                                    >
                                        <DiagnosisAPT />
                                    </SectionCard>

                                    <SectionCard
                                        icon={SupervisorAccount}
                                        title="Evaluador"
                                        subtitle="Datos de la persona responsable de la evaluación."
                                    >
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputSelect
                                                    name="documentoEvaluador"
                                                    label="Evaluador"
                                                    options={lsEvaluador}
                                                    onChange={handleEvaluador}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    name="evaluadorDocumento"
                                                    label="Documento del Evaluador"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    name="evaluadorProfesion"
                                                    label="Profesión"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    name="evaluadorPostgrado"
                                                    label="Postgrado"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    name="evaluadorTarjetaPro"
                                                    label="No. Tarjeta profesional"
                                                    disabled
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    name="evaluadorNumLicencia"
                                                    label="No. De licencia en salud ocupacional"
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </SectionCard>

                                    <SectionCard
                                        icon={Description}
                                        title="Narrativa y contexto"
                                        subtitle="Describe el periodo, expectativas, antecedentes y aspectos organizacionales."
                                    >
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="acercaPeriodo"
                                                    label="Acerca del Período"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="expectativasProceso"
                                                    label="Expectativas del Proceso"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="antecedentesOcupacionales"
                                                    label="Antecedentes Ocupacionales"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="aspectosOrganizacionales"
                                                    label="Aspectos Organizacionales"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Factores de Riesgo Psicosocial a Nivel Intra y Extralaboral" darkTitle>
                                                    <Grid container spacing={2.5}>
                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputDatePicker
                                                                name="fechaCargo"
                                                                label="Fecha Cargo"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelectAutocomplete
                                                                name="idCargoAuto"
                                                                label="Cargo"
                                                                options={lsCargo}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelectAutocomplete
                                                                name="idAreaAuto"
                                                                label="Área"
                                                                options={lsArea}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                multiline
                                                                minRows={4}
                                                                name="mision"
                                                                label="Misión u objetivos del cargo"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                multiline
                                                                minRows={4}
                                                                name="proceso"
                                                                label="Descripción del proceso"
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                multiline
                                                                minRows={4}
                                                                name="caracteristicas"
                                                                label="Características del puesto de trabajo"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    </SectionCard>

                                    <SectionCard
                                        icon={Description}
                                        title="Fuentes y agentes"
                                        subtitle="Registra fuentes y agentes con una edición más visual y compacta."
                                    >
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12}>
                                                <DetailFuentes />
                                            </Grid>

                                            <Grid item xs={12} sx={{ my: 1.5 }}>
                                                <Divider />
                                            </Grid>

                                            <Grid item xs={12}>
                                                {!idAPTCalificacion && (
                                                    <Box>
                                                        <Alert severity="warning" variant="outlined" sx={{ borderRadius: "8px" }}>
                                                            Debe guardar la calificación principal primero para poder registrar los agentes de riesgo.
                                                        </Alert>
                                                    </Box>
                                                )}
                                            </Grid>

                                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'left' }}>
                                                <AnimateButton>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleOpenAgentesPopup}
                                                        disabled={!idAPTCalificacion}
                                                        startIcon={<OpenInNew sx={{ fontSize: '1.1rem' }} />}
                                                        sx={{
                                                            borderRadius: '8px',
                                                            px: 3,
                                                            py: 1.2,
                                                            fontWeight: 500,
                                                            letterSpacing: '0.02em',
                                                            textTransform: 'none',
                                                            fontSize: '0.875rem',
                                                            transformOrigin: 'center',
                                                            background: (t) => !idAPTCalificacion
                                                                ? undefined
                                                                : `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${t.palette.primary.dark} 100%)`,
                                                            boxShadow: (t) => idAPTCalificacion
                                                                ? `0 4px 12px rgba(0, 0, 0, 0.08)`
                                                                : 'none',
                                                            transition: 'all 0.2s ease-in-out',
                                                            '&:hover': {
                                                                background: (t) => !idAPTCalificacion
                                                                    ? undefined
                                                                    : `linear-gradient(135deg, ${t.palette.primary.dark} 0%, ${t.palette.primary.main} 100%)`,
                                                                boxShadow: (t) => idAPTCalificacion
                                                                    ? `0 6px 16px rgba(0, 0, 0, 0.12)`
                                                                    : 'none',
                                                                transform: idAPTCalificacion ? 'translateY(-1px)' : 'none',
                                                            },
                                                            '&.Mui-disabled': {
                                                                background: (t) => t.palette.action.disabledBackground,
                                                                color: (t) => t.palette.action.disabled,
                                                            }
                                                        }}
                                                    >
                                                        Ver agentes de riesgo
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="descripcionAgentes"
                                                    label="Descripción Agentes"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="aspectosIndividuales"
                                                    label="Aspectos Individuales"
                                                />
                                            </Grid>
                                        </Grid>
                                    </SectionCard>

                                    <SectionCard
                                        icon={Assessment}
                                        title="Resultados"
                                        subtitle="Captura los valores de evaluación y condiciones finales del individuo."
                                    >
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12} md={6}>
                                                <TableFactors idAPTCalificacion={idAPTCalificacion} tipo={1} tipoFactor="Intralaboral" />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TableFactors idAPTCalificacion={idAPTCalificacion} tipo={2} tipoFactor="Extralaboral" />
                                            </Grid>

                                            <Grid item xs={12} sx={{ mb: 2 }}>
                                                <TableResultFactors />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    multiline
                                                    minRows={4}
                                                    name="condicionesIndividuo"
                                                    label="Condiciones Individuo"
                                                />
                                            </Grid>
                                        </Grid>
                                    </SectionCard>
                                </Stack>
                            </Box>
                        </StickyActionBar>
                    </Grid>
                </Grid>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default APTQualification;