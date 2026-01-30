import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import IconSend from '@mui/icons-material/Send';
import {
    Button,
    CircularProgress,
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
import { DeleteDetailResearchAssignment, GetAllDetailResearchAssignment, GetByIdResearchAssignment, InsertDetailResearchAssignment, SendAssignmentNotificationForward, UpdateCloseResearchAssignment, UpdateResearchAssignments } from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import { ParamDelete } from 'components/alert/AlertAll';
import RightDrawer from 'components/components/RightDrawer';
import ControlModal from 'components/controllers/ControlModal';
import {
    AccionMenu,
    CodCatalogo,
    Message,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import UpdateSkeleton from 'components/Skeleton/UpdateSkeleton';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { AnimatePresence, motion } from 'framer-motion';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import DetailRA from './DetailRA';
import ReasonAlert, { ReasonAlertModal } from './ReasonAlert';

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

const UpdateResearchAssignment = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const loadingModulo = useBoolean(false);
    const timeWait = useBoolean(false);
    const loadingSendNotification = useBoolean(false);
    const openModalDevoluciones = useBoolean(false);
    const openModalNotificacion = useBoolean(false);

    const [updateCompleted, setUpdateCompleted] = useState(false);
    const [textDx, setTextDx] = useState("");
    const [modelEmployee, setModelEmployee] = useState([]);
    const [lsUsuarioReenviarNotificacion, setLsUsuarioReenviarNotificacion] = useState([]);
    const [lsInvestigacion, setLsInvestigacion] = useState([]);
    const [lsAsesorARL, setLsAsesorARL] = useState([]);
    const [lsDx, setLsDx] = useState([]);
    const [dataModel, setDataModel] = useState(null);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsInvestigacionEL, setLsInvestigacionEL] = useState([]);
    const [idsUsuario, setIdsUsuario] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, watch, setError, resetField, setValue } = methods;
    const documento = watch("documento");
    const listaDetalle = watch("listaDetalle");
    const dx = watch("dx");
    const idSegmentoAgrupado = watch("idSegmentoAgrupado");
    const idSegmentoAfectado = watch("idSegmentoAfectado");
    const idSubsegmento = watch("idSubsegmento");
    const idRegion = watch("idRegion");
    const idLateralidad = watch("idLateralidad");
    const usuarioReenviarNotificacion = watch("usuarioReenviarNotificacion");

    const devolucionesCerradas = dataModel?.asignacionInvestigacionInvAses?.filter((item) => item.esDevolucion && item.cerroDevolucion);
    const devolucionesAbiertas = dataModel?.asignacionInvestigacionInvAses?.filter((item) => item.esDevolucion && !item.cerroDevolucion);

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerInvestigacion = await GetAllComboAsesorInvestigacion(false);
                setLsInvestigacion(lsServerInvestigacion.data);

                const lsServerAsesorARL = await GetAllComboAsesorInvestigacion(true);
                setLsAsesorARL(lsServerAsesorARL.data);

                const combinedUsers = [...lsServerInvestigacion.data, ...lsServerAsesorARL.data];
                setLsUsuarioReenviarNotificacion(Array.from(new Map(combinedUsers.map((item) => [item.value, item])).values()));

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

    useEffect(() => {
        async function getData() {
            try {
                const lsServer = await GetByIdResearchAssignment(id);
                if (lsServer.data.exito) {
                    const datos = lsServer.data.datos;
                    handleLoadingDocument({ target: { value: datos.documento } });
                    setValue('id', datos.id);
                    setDataModel(datos);
                    setValue('documento', datos.documento);
                    setValue('investigador', datos.investigador);
                    setValue('asesorARL', datos.asesorARL);
                    setIdsUsuario([...new Set([...datos.investigador, ...datos.asesorARL])]);
                    setTimeout(timeWait.onTrue, 1500);
                }
            } catch (error) {
                toast.error(error.message || "Error al cargar los datos");
            }
        }

        getData();
    }, [updateCompleted]);

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setModelEmployee(lsServerEmployee.data.data);
            } else {
                setModelEmployee(lsServerEmployee?.data.data);
                toast.error(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setModelEmployee([]);
            toast.error(Message.ErrorDeDatos);
        }
    }

    async function getDxEmployee() {
        try {
            const service = await GetAllDetailResearchAssignment(id, false);
            if (service.data.exito)
                setValue('listaDetalle', service.data.datos);
        } catch (error) {
            toast.error(error.message || "Error al cargar los datos");
        }
    }

    useEffect(() => {
        getDxEmployee();
    }, []);

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

            const newDetail = {
                idAsignacionInvestigacion: id,
                dx,
                idSegmentoAgrupado: idSegmentoAgrupado || null,
                idSegmentoAfectado: idSegmentoAfectado || null,
                idSubsegmento: idSubsegmento || null,
                idRegion: idRegion || null,
                idLateralidad: idLateralidad || null
            };

            const result = await InsertDetailResearchAssignment(newDetail);
            if (result.data.exito) {
                toast.success("Diagnóstico agregado a la lista correctamente");
                getDxEmployee();

                setTextDx("");
                resetField("dx");
                setLsDx([]);
                resetField("idSegmentoAgrupado");
                resetField("idSegmentoAfectado");
                resetField("idSubsegmento");
                resetField("idRegion");
                resetField("idLateralidad");
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {

        }
    };

    const handleClickRemoveDetail = async (modulo, dx) => {
        try {
            const currentDetails = listaDetalle || [];
            const dataModel = currentDetails.find(detail => detail.modulo === modulo && detail.dx === dx);

            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteDetailResearchAssignment(dataModel.id);
                    if (result.data.exito) {
                        toast.success("Diagnóstico eliminado de la lista correctamente");
                        getDxEmployee();
                    } else {
                        toast.error(result.data.mensaje);
                    }
                }
            });
        } catch (error) {
            toast.error(error.message || "Error al eliminar el diagnóstico de la lista");
        }
    }

    const handleClick = async (datos) => {
        try {
            const result = await UpdateResearchAssignments(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                setUpdateCompleted(!updateCompleted);
            }
            else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(error.message || "Error al actualizar la asignación de investigación");
        }
    };

    const handleClickClose = async (idInvAses) => {
        try {
            const result = await UpdateCloseResearchAssignment(idInvAses);
            if (result.data.exito) {
                setDataModel(prev => ({
                    ...prev,
                    asignacionInvestigacionInvAses: prev.asignacionInvestigacionInvAses.map(item =>
                        item.id === idInvAses ? { ...item, cerroDevolucion: true } : item
                    )
                }));
            }
        } catch (error) {
            toast.error(error.message || "Error al cerrar la asignación de investigación");
        }
    };

    const handleSendNotification = async () => {
        try {
            loadingSendNotification.onTrue();
            const result = await SendAssignmentNotificationForward(usuarioReenviarNotificacion, id);
            if (result.data.exito) {
                setTimeout(() => {
                    toast.success(result.data.mensaje, { autoClose: 6000 });
                    loadingSendNotification.onFalse();
                    openModalNotificacion.onFalse();
                    resetField("usuarioReenviarNotificacion");
                }, 500);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al enviar la notificación");
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                {timeWait.value ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                disabled
                                errors={errors}
                                title="Actualizar asignación de investigación"
                                key={modelEmployee?.documento}
                                documento={documento}
                                onChange={(e) => setValue("documento", e.target.value)}
                                lsEmployee={modelEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ mb: devolucionesAbiertas?.length > 0 && 2 }}>
                                        <Grid container spacing={2}>
                                            <AnimatePresence>
                                                {devolucionesAbiertas?.map((item) => (
                                                    <Grid item xs={12} key={item.id} component={motion.div} layout>
                                                        <ReasonAlert
                                                            reason={item.nombreMotivo}
                                                            observation={item.observacion}
                                                            date={new Date(item?.fechaModifico).toLocaleString()}
                                                            user={item.usuarioModifico}
                                                            onClose={() => handleClickClose(item.id)}
                                                        />
                                                    </Grid>
                                                ))}
                                            </AnimatePresence>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={dataModel?.fecha}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fecha}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha de entrega"
                                            name="fechaEntrega"
                                            defaultValue={dataModel?.fechaEntrega}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fecha}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha de revisión"
                                            name="fechaRevision"
                                            defaultValue={dataModel?.fechaRevision}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fecha}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha de visto bueno"
                                            name="fechaVistoBueno"
                                            defaultValue={dataModel?.fechaVistoBueno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fecha}
                                        />
                                    </Grid>

                                    <Grid item xs={12}><Divider /></Grid>

                                    <Grid item xs={12} sx={{ mb: 2 }}>
                                        <SubCard title="Diagnósticos del empleado">
                                            <Grid container spacing={2} sx={{
                                                borderColor: !!errors.listaDetalle && 'error.main',
                                                borderStyle: !!errors.listaDetalle && 'dashed',
                                                borderWidth: !!errors.listaDetalle && 1
                                            }}>
                                                <Grid item xs={12} md={4} lg={2}>
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
                                                        name="dx"
                                                        label="Diagnóstico"
                                                        defaultValue=""
                                                        options={lsDx}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors.dx}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={1.5} lg={1}>
                                                    <Tooltip placement="top" title="Agregar diagnóstico">
                                                        <motion.button
                                                            onClick={handleClickInsertDetail}
                                                            variants={buttonVariants}
                                                            whileHover="hover"
                                                            whileTap="tap"
                                                            style={{
                                                                border: 'none',
                                                                background: 'transparent',
                                                                cursor: 'pointer',
                                                                outline: 'none',
                                                            }}
                                                        >
                                                            <IconButton size="large" color="secondary">
                                                                <AddIcon sx={{ fontSize: '2rem' }} />
                                                            </IconButton>
                                                        </motion.button>
                                                    </Tooltip>
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
                                            defaultValue={dataModel?.tipoInvestigacion}
                                            name="tipoInvestigacion"
                                            label="Tipo de investigación"
                                            options={lsInvestigacionEL}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha de dictamen última instancia"
                                            name="fechaDictamen"
                                            defaultValue={dataModel?.fechaDictamen}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaDictamen}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={dataModel?.resultadoOrigen}
                                            name="resultadoOrigen"
                                            label="Resultado origen última instancia"
                                            options={lsResultadoOrigen}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha de investigación"
                                            name="fechaInvestigacion"
                                            defaultValue={dataModel?.fechaInvestigacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaInvestigacion}
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

                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={4} lg={2}>
                                                <AnimateButton>
                                                    <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                        {TitleButton.Actualizar}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={2}>
                                                <AnimateButton>
                                                    <Button variant="contained" onClick={openModalDevoluciones.onTrue} fullWidth disabled={devolucionesCerradas?.length === 0}>
                                                        Devoluciones
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={2}>
                                                <AnimateButton>
                                                    <Button variant="contained" onClick={openModalNotificacion.onTrue} fullWidth>
                                                        Notificar
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={2}>
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
                    </Grid> : <UpdateSkeleton />
                }

                <ControlModal
                    open={openModalNotificacion.value}
                    onClose={openModalNotificacion.onFalse}
                    title="Reenvio de Notificación"
                    width={500}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputMultiselectTwo
                                checkbox
                                name="usuarioReenviarNotificacion"
                                label="Usuario para reenvio de notificación"
                                options={lsUsuarioReenviarNotificacion.filter((item) => idsUsuario.includes(item.value))}
                            />
                        </Grid>

                        <Grid item>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size={matchesXS ? 'small' : 'medium'}
                                    onClick={handleSendNotification}
                                    endIcon={loadingSendNotification.value ? <CircularProgress size={20} color="inherit" /> : <IconSend />}
                                    disabled={!usuarioReenviarNotificacion?.length || loadingSendNotification.value}
                                >
                                    Notificar por correo
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </ControlModal>
            </FormProvider>

            <RightDrawer
                open={openModalDevoluciones.value}
                onClose={openModalDevoluciones.onFalse}
                title="Devoluciones"
                width={500}
            >
                <Grid container spacing={2}>
                    <AnimatePresence>
                        {devolucionesCerradas?.map((item) => (
                            <Grid item xs={12} key={item.id} component={motion.div} layout>
                                <ReasonAlertModal
                                    reason={item.nombreMotivo}
                                    observation={item.observacion}
                                    date={new Date(item?.fechaModifico).toLocaleString()}
                                    user={item.usuarioModifico}
                                />
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </RightDrawer>
        </ValidateActionSkeleton>
    );
};

export default UpdateResearchAssignment;