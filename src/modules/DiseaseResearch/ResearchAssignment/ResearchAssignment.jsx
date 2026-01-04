import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { InsertResearchAssignment } from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import {
    AccionMenu,
    CodCatalogo,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';
import InputDatePick from 'components/input/InputDatePick';
import InputDatePicker from 'components/input/InputDatePicker';
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { motion } from 'framer-motion';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import DetailRA from './DetailRA';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const buttonVariants = {
    hover: {
        rotate: 90,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.9,
        transition: { duration: 0.2 },
    },
};

const validationSchema = yup.object().shape({
    fecha: yup.date().required("La fecha es requerida"),
    documento: yup.string().required("El documento es requerido"),
    investigador: yup.array().min(1, "Debe seleccionar al menos un investigador"),
    asesorARL: yup.array().min(1, "Debe seleccionar al menos un asesor ARL"),
    listaDetalle: yup.array().required("Se requiere al menos un diagnóstico"),
});

const ResearchAssignment = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const loadingModulo = useBoolean(false);

    const [textDx, setTextDx] = useState("");
    const [modelEmployee, setModelEmployee] = useState([]);
    const [lsInvestigacion, setLsInvestigacion] = useState([]);
    const [lsAsesorARL, setLsAsesorARL] = useState([]);
    const [lsDx, setLsDx] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsInvestigacionEL, setLsInvestigacionEL] = useState([]);

    const [fechaEntrega, setFechaEntrega] = useState(null);
    const [fechaRevision, setFechaRevision] = useState(null);
    const [fechaVistoBueno, setFechaVistoBueno] = useState(null);
    const [fechaDictamen, setFechaDictamen] = useState(null);
    const [fechaInvestigacion, setFechaInvestigacion] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset, watch, setError, resetField, setValue } = methods;
    const documento = watch("documento");
    const listaDetalle = watch("listaDetalle");
    const dx = watch("dx");
    const idSegmentoAgrupado = watch("idSegmentoAgrupado");
    const idSegmentoAfectado = watch("idSegmentoAfectado");
    const idSubsegmento = watch("idSubsegmento");
    const idRegion = watch("idRegion");
    const idLateralidad = watch("idLateralidad");

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerInvestigacion = await GetAllComboAsesorInvestigacion(false);
                setLsInvestigacion(lsServerInvestigacion.data);

                const lsServerAsesorARL = await GetAllComboAsesorInvestigacion(true);
                setLsAsesorARL(lsServerAsesorARL.data);

                const lsServerResultadoOrigen = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_RESULTADO_EN_ORIGEN);
                setLsResultadoOrigen(lsServerResultadoOrigen.data);

                const lsServerInvestigacionEL = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_INVESTIGACION_EL);
                setLsInvestigacionEL(lsServerInvestigacionEL.data);

                const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
                var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsSegmentoAgrupado(resultSegAgrupado);

                const lsServerSegAfectado = await GetAllBySegmentoAfectado(0, 0);
                var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsSegmentoAfectado(resultSegAfectado);

                const lsServerSubsegmento = await GetAllBySubsegment(0, 0);
                var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsSubsegmento(resultSubsegmento);

                const lsServerLateralidad = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_LATERA);
                setLsLateralidad(lsServerLateralidad.data);

                const lsServerRegion = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_REGION);
                setLsRegion(lsServerRegion.data);
            } catch (error) { }
        }

        getCombo();
    }, []);

    const handleDocumento = async (event) => {
        try {
            const document = event?.target.value;
            setValue("documento", document, { shouldValidate: true });

            if (document !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(document);

                    if (lsServerEmployee?.data.status === 200) {
                        setModelEmployee(lsServerEmployee.data.data);
                    } else {
                        setModelEmployee(lsServerEmployee?.data.data);
                        toast.error(lsServerEmployee?.data.message);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(document);
                    if (lsServerEmployee.data.status === 200) {
                        setModelEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setModelEmployee([]);
        } catch (error) { }
    }

    const handleDx = async (event) => {
        const value = event.target.value;
        setTextDx(value);

        if (event.key === 'Enter' && value.trim()) {
            try {
                const listData = await GetAllByCodeOrName(value.trim());
                setLsDx(listData.data);
            } catch {
                toast.error('Error al buscar el diagnóstico');
            }
        } else if (event.key === 'Enter') {
            toast.error('Ingrese un código o nombre de diagnóstico');
        }
    };

    const handleClickInsertDetail = async () => {
        try {
            if (!dx) {
                setError('dx', { type: 'manual', message: 'Debe buscar y seleccionar un diagnóstico' });
                return;
            }

            //Validar si ya existe en la lista
            const currentDetails = Array.isArray(listaDetalle) ? listaDetalle : [];
            const isDuplicate = currentDetails.some(detail => detail.dx === dx);
            if (isDuplicate) {
                setError('dx', { type: 'manual', message: 'El diagnóstico ya está en la lista' });
                return;
            }

            const nombreDx = lsDx?.find(item => item.value === dx)?.label;
            const newDetail = {
                dx: dx || null,
                idSegmentoAgrupado: idSegmentoAgrupado || null,
                idSegmentoAfectado: idSegmentoAfectado || null,
                idSubsegmento: idSubsegmento || null,
                idRegion: idRegion || null,
                idLateralidad: idLateralidad || null,
                nombreDx: nombreDx?.split(" - ")[1],
                nombreSegmentoAgrupado: lsSegmentoAgrupado?.find(item => item.value === idSegmentoAgrupado)?.label || "N/A",
                nombreSegmentoAfectado: lsSegmentoAfectado?.find(item => item.value === idSegmentoAfectado)?.label || "N/A",
                nombreSubsegmento: lsSubsegmento?.find(item => item.value === idSubsegmento)?.label || "N/A",
            };

            const updatedDetails = [...currentDetails, newDetail];
            setValue('listaDetalle', updatedDetails, { shouldValidate: true });
            toast.success("Diagnóstico agregado a la lista correctamente");

            setTextDx("");
            resetField("dx");
            setLsDx([]);
            resetField("idSegmentoAgrupado");
            resetField("idSegmentoAfectado");
            resetField("idSubsegmento");
            resetField("idRegion");
            resetField("idLateralidad");
        } catch (error) {

        }
    };

    const handleClickRemoveDetail = async (modulo, dx) => {
        try {
            const currentDetails = listaDetalle || [];
            const indexToRemove = currentDetails.findIndex(detail => detail.modulo === modulo && detail.dx === dx);

            if (indexToRemove === -1) {
                setError('listaDetalle', { type: 'manual', message: 'El diagnóstico no está en la lista' });
                return;
            }

            const updatedDetails = currentDetails.filter((_, index) => index !== indexToRemove);
            setValue('listaDetalle', updatedDetails, { shouldValidate: true });
            toast.success("Diagnóstico eliminado de la lista correctamente");
        } catch (error) {
            toast.error(error.message || "Error al eliminar el diagnóstico de la lista");
        }
    }

    const handleClick = async (datos) => {
        try {
            datos.tipoInvestigacion = datos.tipoInvestigacion || null;
            datos.resultadoOrigen = datos.resultadoOrigen || null;

            datos.fechaEntrega = FormatDate(fechaEntrega);
            datos.fechaRevision = FormatDate(fechaRevision);
            datos.fechaVistoBueno = FormatDate(fechaVistoBueno);
            datos.fechaDictamen = FormatDate(fechaDictamen);
            datos.fechaInvestigacion = FormatDate(fechaInvestigacion);

            const result = await InsertResearchAssignment(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                setValue("documento", "");
                setModelEmployee([]);
                setFechaEntrega("");
                setFechaRevision("");
                setFechaVistoBueno("");
                setFechaDictamen("");
                setFechaInvestigacion("");
                reset();
            } else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(error.message || "Error al agregar la asignación de investigación");
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            errors={errors}
                            title="Asignación de investigación"
                            key={modelEmployee?.documento}
                            documento={documento}
                            onChange={(e) => setValue("documento", e.target.value)}
                            lsEmployee={modelEmployee}
                            handleDocumento={handleDocumento}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePicker
                                        defaultValue={new Date()}
                                        label="Fecha"
                                        name="fecha"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePick
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        value={fechaEntrega}
                                        label="Fecha de entrega"
                                        name="fechaEntrega"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePick
                                        onChange={(e) => setFechaRevision(e.target.value)}
                                        value={fechaRevision}
                                        label="Fecha de revisión"
                                        name="fechaRevision"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePick
                                        onChange={(e) => setFechaVistoBueno(e.target.value)}
                                        value={fechaVistoBueno}
                                        label="Fecha de visto bueno"
                                        name="fechaVistoBueno"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12}><Divider /></Grid>

                                <Grid item xs={12}>
                                    <SubCard title="Diagnósticos del empleado">
                                        <Grid container spacing={2} sx={{
                                            borderColor: !!errors.listaDetalle && 'error.main',
                                            borderStyle: !!errors.listaDetalle && 'dashed',
                                            borderWidth: !!errors.listaDetalle && 1
                                        }}>
                                            <Grid item xs={12} md={4} lg={3}>
                                                <InputOnChange
                                                    label="Buscar dx por palabras claves"
                                                    onKeyDown={handleDx}
                                                    onChange={(e) => setTextDx(e.target.value)}
                                                    value={textDx}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6.5} lg={9}>
                                                <InputSelect
                                                    defaultValue=""
                                                    name="dx"
                                                    label="Diagnóstico"
                                                    options={lsDx}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.dx}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputSelect
                                                    defaultValue=""
                                                    name="idSegmentoAgrupado"
                                                    label="Segmento agrupado"
                                                    options={lsSegmentoAgrupado}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idSegmentoAgrupado}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputSelect
                                                    defaultValue=""
                                                    name="idSegmentoAfectado"
                                                    label="Segmento afectado"
                                                    options={lsSegmentoAfectado}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idSegmentoAfectado}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputSelect
                                                    defaultValue=""
                                                    name="idSubsegmento"
                                                    label="Subsegmento"
                                                    options={lsSubsegmento}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idSubsegmento}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <InputSelect
                                                    defaultValue=""
                                                    name="idRegion"
                                                    label="Región"
                                                    options={lsRegion}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idRegion}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <InputSelect
                                                    defaultValue=""
                                                    name="idLateralidad"
                                                    label="Lateralidad"
                                                    options={lsLateralidad}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idLateralidad}
                                                />
                                            </Grid>

                                            <Grid item xs={12} textAlign="right">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleClickInsertDetail}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    startIcon={<AddCircleIcon />}
                                                >
                                                    Agregar
                                                </Button>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard content={false}>
                                                    <DetailRA
                                                        lsData={listaDetalle}
                                                        loadingModulo={loadingModulo}
                                                        onDelete={handleClickRemoveDetail}
                                                    />
                                                </SubCard>
                                            </Grid>

                                            {!!errors.listaDetalle && <FormHelperText sx={{ margin: 1 }} error={!!errors.listaDetalle}>{errors?.listaDetalle.message}</FormHelperText>}
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}><Divider /></Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="tipoInvestigacion"
                                        label="Tipo de investigación"
                                        options={lsInvestigacionEL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePick
                                        onChange={(e) => setFechaDictamen(e.target.value)}
                                        value={fechaDictamen}
                                        label="Fecha dictamen última instancia"
                                        name="fechaDictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="resultadoOrigen"
                                        label="Resultado origen última instancia"
                                        options={lsResultadoOrigen}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePick
                                        onChange={(e) => setFechaInvestigacion(e.target.value)}
                                        value={fechaInvestigacion}
                                        label="Fecha de investigación"
                                        name="fechaInvestigacion"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputMultiselectTwo
                                        checkbox
                                        name="investigador"
                                        label="Investigadores"
                                        options={lsInvestigacion}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputMultiselectTwo
                                        checkbox
                                        name="asesorARL"
                                        label="Asesor ARL"
                                        options={lsAsesorARL}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                    {TitleButton.Guardar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/research-assignment/list")}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default ResearchAssignment;