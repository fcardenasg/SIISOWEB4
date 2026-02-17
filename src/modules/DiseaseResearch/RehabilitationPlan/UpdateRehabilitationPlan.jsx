import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetAllByCodeOrName } from "api/clients/CIE11Client";
import { GetByIdEmployee } from "api/clients/EmployeeClient";
import { GetByIdRehabilitationPlan, UpdateRehabilitationPlans } from "api/clients/RehabilitationPlanClient";
import { GetAllComboUser, GetAllUser } from "api/clients/UserClient";
import { CodCatalogo, TitleButton } from "components/helpers/Enums";
import InputDatePicker from "components/input/InputDatePicker";
import InputOnChange from "components/input/InputOnChange";
import InputSelect from "components/input/InputSelect";
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";
import InputText from "components/input/InputText";
import UpdateSkeleton from "components/Skeleton/UpdateSkeleton";
import ViewEmployee from "components/views/ViewEmployee";
import { useBoolean } from "hooks/use-boolean";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    documento: Yup.string().required("El documento es requerido")
});

const UpdateRehabilitationPlan = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const loadingData = useBoolean(true);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            documento: "",
        },
    });

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = methods;

    const documento = watch("documento");
    const dx1 = watch("dx1");
    const dx2 = watch("dx2");
    const dx3 = watch("dx3");

    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsMedico, setLsMedico] = useState([]);
    const [lsTipoContingencia, setLsTipoContingencia] = useState([]);
    const [lsEstadoCasos, setLsEstadoCasos] = useState([]);

    const [textDx1, setTextDx1] = useState('');
    const [textDx2, setTextDx2] = useState('');
    const [textDx3, setTextDx3] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [lsDx2, setLsDx2] = useState([]);
    const [lsDx3, setLsDx3] = useState([]);

    const [modelEmployee, setModelEmployee] = useState([]);
    const [dataModel, setDataModel] = useState(null);

    useEffect(() => {
        async function getCombos() {
            try {
                const [
                    resCiudad,
                    resContingencia,
                    resEstadoCasos
                ] = await Promise.all([
                    GetByTipoCatalogoCombo(CodCatalogo.CIUDADES),
                    GetByTipoCatalogoCombo(CodCatalogo.Contingencia),
                    GetByTipoCatalogoCombo(CodCatalogo.PR_ESTADO_CASO),
                ]);

                if (resCiudad?.data) setLsCiudad(resCiudad.data);
                if (resContingencia?.data) setLsTipoContingencia(resContingencia.data);
                if (resEstadoCasos?.data) setLsEstadoCasos(resEstadoCasos.data);

                const resUser = await GetAllUser();
                if (resUser?.status === 200) {
                    var mapper = resUser.data.map((item) => ({
                        value: item.id,
                        label: item.nombre?.toUpperCase(),
                        especialidad: item?.nombreEspacilidad,
                    }));

                    setLsMedico(mapper);
                }
            } catch (error) {
                toast.error("Error al cargar los combos del formulario");
            }
        }
        getCombos();
    }, []);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await GetByIdRehabilitationPlan(id);
                if (response?.status === 200 && response.data) {
                    const datos = response.data;
                    setTextDx1(datos?.dx1);
                    setTextDx2(datos?.dx2);
                    setTextDx3(datos?.dx3);

                    setLsDx1(datos?.listDx1);
                    setLsDx2(datos?.listDx2);
                    setLsDx3(datos?.listDx3);

                    setDataModel(datos);
                    setValue("documento", datos.documento);
                    setValue("especialidad", datos?.especialidad);

                    if (datos.documento) {
                        await handleLoadingDocument(datos.documento);
                    }

                    setTimeout(() => {
                        loadingData.onFalse();
                    }, 700);
                } else {
                    toast.error("No se encontró el plan de rehabilitación");
                    navigate("/rehabilitation-plan/list");
                }
            } catch (error) {
                toast.error("Error al cargar los datos del plan de rehabilitación");
                navigate("/rehabilitation-plan/list");
            }
        }
        loadData();
    }, [id]);

    const handleLoadingDocument = async (documentValue) => {
        try {
            const lsServerEmployee = await GetByIdEmployee(documentValue);
            if (lsServerEmployee?.data.status === 200) {
                setModelEmployee(lsServerEmployee.data.data);
            } else {
                setModelEmployee([]);
                toast.error(lsServerEmployee?.data.message || "Empleado no encontrado");
            }
        } catch (error) {
            setModelEmployee([]);
            toast.error("Error al cargar la información del empleado");
        }
    };

    const handleDx = async (event, dxType) => {
        const value = event.target.value;
        if (dxType === 1) setTextDx1(value);
        else if (dxType === 2) setTextDx2(value);
        else if (dxType === 3) setTextDx3(value);

        if (event.key === 'Enter' && value.trim()) {
            try {
                const { data } = await GetAllByCodeOrName(value.trim());
                switch (dxType) {
                    case 1: setLsDx1(data); break;
                    case 2: setLsDx2(data); break;
                    case 3: setLsDx3(data); break;
                }
            } catch {
                toast.error('Error al buscar el diagnóstico');
            }
        } else if (event.key === 'Enter') {
            toast.error('Ingrese un código o nombre de diagnóstico');
        }
    };

    const handleMedico = (event) => {
        setValue("idMedico", event.target.value);
        const medico = lsMedico.find((item) => item.value === event.target.value);
        if (medico) {
            setValue("especialidad", medico?.especialidad?.toUpperCase());
        }
    };

    useEffect(() => {
        if (!dx1) {
            setLsDx1([]);
            setTextDx1('');
        }

        if (!dx2) {
            setLsDx2([]);
            setTextDx2('');
        }

        if (!dx3) {
            setLsDx3([]);
            setTextDx3('');
        }

        setValue('dx1', dx1);
        setValue('dx2', dx2);
        setValue('dx3', dx3);

    }, [dx1, dx2, dx3, setValue]);

    const onSubmit = async (formData) => {
        try {
            const updateData = {
                id: id,
                documento: formData.documento || null,
                fechaIngreso: formData.fechaIngreso || null,
                idCiudad: formData.comboCiudad ? formData.comboCiudad.value : (dataModel?.idCiudad || null),
                idMedico: formData.idMedico || null,
                idTipoContingencia: formData.idTipoContingencia || null,
                sinisestroNumero: formData.sinisestroNumero || null,
                especialidad: formData.especialidad || null,
                dx1: formData.dx1 || null,
                dx2: formData.dx2 || null,
                dx3: formData.dx3 || null,
                comorvilidad: formData.comorvilidad || null,
                resumenHistorico: formData.resumenHistorico || null,
                evaluacion: formData.evaluacion || null,
                reabilitacionFuncional: formData.reabilitacionFuncional || null,
                rehabilitacionLaboral: formData.rehabilitacionLaboral || null,
                pronosticoInicial: formData.pronosticoInicial || null,
                objetivosPR: formData.objetivosPR || null,
                metasPR: formData.metasPR || null,
                estrategiasPR: formData.estrategiasPR || null,
                actividadesPR: formData.actividadesPR || null,
                tiempoCumplimientoPR: formData.tiempoCumplimientoPR || null,
                estadoCasosPR: formData.estadoCasosPR || null,
                idProfesionalPR: formData.idProfesionalPR || null,
                idProfesionalSeguimiento: formData.idProfesionalSeguimiento || null,
            };

            const result = await UpdateRehabilitationPlans(updateData);
            if (result.status === 200) {
                toast.success("Registro actualizado correctamente");
            } else {
                toast.error(result.message || "Error al actualizar el registro");
            }
        } catch (error) {
            toast.error(error.message || "Error al actualizar el registro");
        }
    };

    if (loadingData.value) {
        return <UpdateSkeleton />;
    }

    return (
        <FormProvider {...methods}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ViewEmployee
                        disabled
                        errors={errors}
                        title="Actualizar plan de rehabilitación"
                        key={modelEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setValue("documento", e.target.value)}
                        lsEmployee={modelEmployee}
                        handleDocumento={(e) => handleLoadingDocument(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Información General">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <InputDatePicker
                                    label="Fecha de ingreso"
                                    name="fechaIngreso"
                                    defaultValue={dataModel?.fechaIngreso}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputSelectAutocomplete
                                    name="comboCiudad"
                                    label="Ciudad"
                                    options={lsCiudad}
                                    defaultValue={lsCiudad.find(opt => opt.value === dataModel?.idCiudad) || null}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputSelect
                                    name="idTipoContingencia"
                                    label="Tipo contingencia"
                                    options={lsTipoContingencia}
                                    defaultValue={dataModel?.idTipoContingencia}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputSelect
                                    name="idMedico"
                                    label="Médico"
                                    options={lsMedico}
                                    defaultValue={dataModel?.idMedico}
                                    onChange={handleMedico}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputText
                                    name="especialidad"
                                    label="Especialidad"
                                    defaultValue={dataModel?.especialidad}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputText
                                    name="sinisestroNumero"
                                    label="Número siniestro"
                                    defaultValue={dataModel?.sinisestroNumero}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Diagnósticos y Comorbilidad">
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={2}>
                                <InputOnChange
                                    label="Buscar dx por palabras claves"
                                    onKeyDown={(e) => handleDx(e, 1)}
                                    onChange={(e) => setTextDx1(e?.target.value)}
                                    value={textDx1}
                                />
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <InputSelect
                                    clearable
                                    name="dx1"
                                    label="Diagnóstico 1"
                                    options={lsDx1}
                                    defaultValue={dataModel?.dx1}
                                />
                            </Grid>

                            <Grid item xs={4} md={2}>
                                <InputOnChange
                                    label="Buscar dx por palabras claves"
                                    onKeyDown={(e) => handleDx(e, 2)}
                                    onChange={(e) => setTextDx2(e.target.value)}
                                    value={textDx2}
                                />
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <InputSelect
                                    clearable
                                    name="dx2"
                                    label="Diagnóstico 2"
                                    options={lsDx2}
                                    defaultValue={dataModel?.dx2}
                                />
                            </Grid>

                            <Grid item xs={4} md={2}>
                                <InputOnChange
                                    label="Buscar dx por palabras claves"
                                    onKeyDown={(e) => handleDx(e, 3)}
                                    onChange={(e) => setTextDx3(e.target.value)}
                                    value={textDx3}
                                />
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <InputSelect
                                    clearable
                                    name="dx3"
                                    label="Diagnóstico 3"
                                    options={lsDx3}
                                    defaultValue={dataModel?.dx3}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    name="comorvilidad"
                                    label="Comorbilidad"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    defaultValue={dataModel?.comorvilidad}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Detalles de la Evolución">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputText
                                    name="resumenHistorico"
                                    label="Resumen de la historia"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.resumenHistorico}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="evaluacion"
                                    label="Evaluación de arcos de movimiento según la parte afectada"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.evaluacion}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="reabilitacionFuncional"
                                    label="Rehabilitación funcional"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.reabilitacionFuncional}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="rehabilitacionLaboral"
                                    label="Rehabilitación laboral"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.rehabilitacionLaboral}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="pronosticoInicial"
                                    label="Pronóstico inicial"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.pronosticoInicial}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Plan de Rehabilitación">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputText
                                    name="objetivosPR"
                                    label="Objetivos"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.objetivosPR}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="metasPR"
                                    label="Metas"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.metasPR}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="estrategiasPR"
                                    label="Estrategias"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.estrategiasPR}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputText
                                    name="actividadesPR"
                                    label="Actividades"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={dataModel?.actividadesPR}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputText
                                    name="tiempoCumplimientoPR"
                                    label="Tiempo de cumplimiento"
                                    fullWidth
                                    defaultValue={dataModel?.tiempoCumplimientoPR}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputSelect
                                    name="estadoCasosPR"
                                    label="Estado del caso"
                                    options={lsEstadoCasos}
                                    defaultValue={dataModel?.estadoCasosPR}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputSelect
                                    name="idProfesionalPR"
                                    label="Médico tratante"
                                    options={lsMedico}
                                    defaultValue={dataModel?.idProfesionalPR}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputSelect
                                    name="idProfesionalSeguimiento"
                                    label="Profesional quien realiza el seguimiento"
                                    options={lsMedico}
                                    defaultValue={dataModel?.idProfesionalSeguimiento}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={4} lg={2}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSubmit(onSubmit)}
                                                disabled={loadingData.value}
                                                startIcon={loadingData.value ? <CircularProgress size={20} color="inherit" /> : null}
                                            >
                                                {TitleButton.Actualizar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={6} md={4} lg={2}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="error"
                                            onClick={() => navigate("/rehabilitation-plan/list")}
                                        >
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default UpdateRehabilitationPlan;