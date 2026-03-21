import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import IconSend from '@mui/icons-material/Send';
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormHelperText,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import {
    ComboNotifyResearchAssignment,
    DeleteDetailResearchAssignment, GetAllDetailResearchAssignment, GetByIdAssignDetailInvAse,
    GetByIdResearchAssignment, GetDataOccupationalMedicine,
    InsertDetailResearchAssignment,
    SendAssignmentNotificationForward, UpdateCloseResearchAssignment, UpdateResearchAssignments
} from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import { ParamDelete } from 'components/alert/AlertAll';
import RightDrawer from 'components/components/RightDrawer';
import ControlModal from 'components/controllers/ControlModal';
import CustomFullScreenModal from 'components/controllers/CustomFullScreenModal';
import {
    AccionMenu,
    CodCatalogo,
    Message,
    Modulo,
    TitleButton,
    ValidationMessage
} from 'components/helpers/Enums';
import Iconify from 'components/iconify/iconify';
import InputDatePicker from 'components/input/InputDatePicker';
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import SelectOnChange from 'components/input/SelectOnChange';
import UpdateSkeleton from 'components/Skeleton/UpdateSkeleton';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { AnimatePresence, motion } from 'framer-motion';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { ArrayOptions, ComponentNote, OptionSearch, RankingAdvisors } from '../methods';
import DetailRA from './Components/DetailRA';
import DiagnosisDetail from './Components/DiagnosisDetail';
import ListMedicine from './Components/ListMedicine';
import ReasonAlert, { ReasonAlertModal } from './Components/ReasonAlert';
import ReviewOccupationalMedicine from './Components/ReviewOccupationalMedicine';

const validationSchema = yup.object().shape({
    documento: yup.string().required("El documento es requerido"),
    listaDetalle: yup.array().required("Se requiere al menos un diagnóstico"),
    asesorARL: yup.string().required(ValidationMessage.Requerido),
    investigador: yup.string().required(ValidationMessage.Requerido),
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
    const openEditOccupational = useBoolean(false);

    const [medicinaLaboral, setMedicinaLaboral] = useState(null);
    const [textDx, setTextDx] = useState("");
    const [search, setSearch] = useState("");
    const [modelEmployee, setModelEmployee] = useState([]);
    const [lsReenviarNotificacion, setLsReenviarNotificacion] = useState([]);
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
    const [lsEmotidoPor, setLsEmotidoPor] = useState([]);
    const [lsMedicinaLaboralDx, setLsMedicinaLaboralDx] = useState([]);
    const [lsMedicinaLaboralExp, setLsMedicinaLaboralExp] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [opcionBusqueda, setOpcionBusqueda] = useState(1);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, watch, setError, resetField, setValue } = methods;
    const documento = watch("documento");
    const listaDetalle = watch("listaDetalle");
    const idAsignacionDetalle = watch("idAsignacionDetalle");
    const dx = watch("dx");
    const idSegmentoAgrupado = watch("idSegmentoAgrupado");
    const idSegmentoAfectado = watch("idSegmentoAfectado");
    const idSubsegmento = watch("idSubsegmento");
    const idRegion = watch("idRegion");
    const idLateralidad = watch("idLateralidad");
    const usuarioReenviarNotificacion = watch("usuarioReenviarNotificacion");
    const isUpdateData = watch("isUpdateData");

    const devolucionesCerradas = dataModel?.asignacionInvestigacionInvAses?.filter((item) => item.esDevolucion && item.cerroDevolucion);
    const devolucionesAbiertas = dataModel?.asignacionInvestigacionInvAses?.filter((item) => item.esDevolucion && !item.cerroDevolucion);

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerAsesorARL = await GetAllComboAsesorInvestigacion(true);
                setLsAsesorARL(lsServerAsesorARL.data);

                const lsServerEntidadDondeEnvia = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ENDON_EN);
                setLsEmotidoPor(lsServerEntidadDondeEnvia.data);

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
                    setValue('investigador', datos?.investigador);
                    /* setIdsUsuario([...new Set([...datos?.investigador, ...datos.asesorARLData])]); */

                    var lsServerDx = await GetDataOccupationalMedicine(datos.documento);
                    if (lsServerDx?.data.exito) {
                        const list = lsServerDx.data.datos;
                        setLsMedicinaLaboralDx(list?.medicina);
                        setLsMedicinaLaboralExp(list?.expertos);
                    }

                    setTimeout(timeWait.onTrue, 1500);
                }
            } catch (error) {
                toast.error(error.message || "Error al cargar los datos");
            }
        }

        getData();
    }, []);

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
            if (service.data.exito) {
                const datos = service.data.datos;
                setSelectedValues(datos.map((item) => item.idMedicinaLaboral));
                setValue('listaDetalle', datos);
            }
        } catch (error) {
            toast.error(error.message || "Error al cargar los datos");
        }
    }

    useEffect(() => {
        getDxEmployee();
    }, []);

    async function getDetailAssignDetailInvAse() {
        try {
            const service = await GetByIdAssignDetailInvAse(id);
            if (service.data.exito) {
                const datos = service.data.datos;
                var mapperData = datos.map((item) => ({
                    ...item,
                    nameAsesorARL: item.usuario,
                    listItemInvestigacion: item.itemInvestigacion.map((investigador) => ({
                        value: investigador,
                        label: ArrayOptions.find((option) => option.value === investigador)?.label
                    })),
                }));

                setValue('asignacionInvestigacionInvAses', mapperData);
            }
        } catch (error) {
            toast.error(error.message || "Error al cargar los datos");
        }
    }

    useEffect(() => {
        getDetailAssignDetailInvAse();
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

            const newDetail = {
                id: idAsignacionDetalle || 0,
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
                handleClearForm();
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {

        }
    };

    const handleClickRemoveDetail = async (dataDx) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteDetailResearchAssignment(dataDx.id);
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
            datos.fechaDictamen = datos.fechaDictamen || null;
            datos.fechaRadicado = datos.fechaRadicado || null;

            const result = await UpdateResearchAssignments(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                setValue('isUpdateData', false);
                getComboNotify();
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
                loadingSendNotification.onFalse();
            }
        } catch (error) {
            toast.error(error.message || "Error al enviar la notificación");
            loadingSendNotification.onFalse();
        }
    };

    const handleClearForm = () => {
        setLsDx([]);
        setTextDx("");
        resetField('dx');
        resetField('idSegmentoAgrupado');
        resetField('idSegmentoAfectado');
        resetField('idSubsegmento');
        resetField('idRegion');
        resetField('idLateralidad');
        setValue('isUpdateData', false);
    };

    const handleEditRow = (row) => {
        setLsDx([{ value: row.dx, label: row.nombreDx }]);
        setTextDx(row.dx);
        setValue('dx', row.dx, { shouldValidate: true });
        setValue('idAsignacionDetalle', row.id);
        setValue('idSegmentoAgrupado', row.idSegmentoAgrupado);
        setValue('idSegmentoAfectado', row.idSegmentoAfectado);
        setValue('idSubsegmento', row.idSubsegmento);
        setValue('idRegion', row.idRegion);
        setValue('idLateralidad', row.idLateralidad);
        setValue('isUpdateData', true);
    };

    const filteredDx = useMemo(() => {
        let filteredList = lsMedicinaLaboralDx;

        if (opcionBusqueda !== 1) {
            filteredList = lsMedicinaLaboralDx.filter((item) => {
                const investigado = item.investigado?.toUpperCase().trim();

                if (opcionBusqueda === 2) return investigado === "SI";
                if (opcionBusqueda === 3) return investigado === "NO";
                if (opcionBusqueda === 4) return !investigado || investigado === "";

                return true;
            });
        }

        if (!search) return filteredList;

        const searchTerm = search.toLowerCase().trim();

        return filteredList.filter((item) => {
            return (
                item.dx?.toLowerCase().includes(searchTerm) ||
                item.nombreDx?.toLowerCase().includes(searchTerm) ||
                item.noDictamenJRC?.toLowerCase().includes(searchTerm) ||
                item.noDictamenJNC?.toLowerCase().includes(searchTerm) ||
                item.noDictamenAFP?.toLowerCase().includes(searchTerm)
            );
        });
    }, [search, lsMedicinaLaboralDx, opcionBusqueda]);

    const handleOpenEdit = (medicinaLaboral) => {
        setMedicinaLaboral(medicinaLaboral);
        openEditOccupational.onTrue();
    };

    async function getDataMedicinaLaboral() {
        try {
            if (documento) {
                var lsServerDx = await GetDataOccupationalMedicine(documento);
                if (lsServerDx?.data.exito) {
                    const list = lsServerDx.data.datos;
                    setLsMedicinaLaboralDx(list?.medicina);
                    setLsMedicinaLaboralExp(list?.expertos);
                    setMedicinaLaboral(prev => {
                        const actualizado = list?.medicina.find(fil => fil.idMedicinaLaboral === prev?.idMedicinaLaboral);
                        return actualizado ?? prev;
                    });
                }
            }
        } catch (error) {
            toast.error(error.message || "Error al obtener los datos de medicina laboral");
        }
    }

    useEffect(() => {
        getDataMedicinaLaboral();
    }, [documento, isUpdateData]);

    const handleToggleSelection = async (value) => {
        try {
            const isSelected = selectedValues.includes(value);
            const selectedItem = lsMedicinaLaboralDx.find((item) => item.idMedicinaLaboral === value);

            if (!isSelected) {
                if (selectedItem) {
                    const newDetail = {
                        idMedicinaLaboral: selectedItem.idMedicinaLaboral,
                        idAsignacionInvestigacion: id,
                        dx: selectedItem.dx,
                        idSegmentoAgrupado: selectedItem.idSegmentoAgrupado || null,
                        idSegmentoAfectado: selectedItem.idSegmentoAfectado || null,
                        idSubsegmento: selectedItem.idSubsegmento || null,
                        idRegion: selectedItem.idRegion || null,
                        idLateralidad: selectedItem.idLateralidad || null
                    };

                    const result = await InsertDetailResearchAssignment(newDetail);
                    if (result.data.exito) {
                        toast.success("Diagnóstico agregado correctamente");
                        getDataMedicinaLaboral();
                        getDxEmployee();
                    } else {
                        toast.error(result.data.mensaje);
                    }
                }
            } else {
                const idAEliminar = listaDetalle.find((item) => item.idMedicinaLaboral === value)?.id;
                if (!idAEliminar) {
                    toast.error("No se encontró el ID para eliminar este registro");
                    return;
                }

                const result = await DeleteDetailResearchAssignment(idAEliminar);
                if (result.data.exito) {
                    toast.success("Diagnóstico eliminado correctamente");
                    setSelectedValues(prevSelected => prevSelected.filter(item => item !== value));
                    getDataMedicinaLaboral();
                    getDxEmployee();
                } else {
                    toast.error(result.data.mensaje);
                }
            }
        } catch (error) {

        }
    };

    async function getComboNotify() {
        try {
            const service = await ComboNotifyResearchAssignment(id);
            if (service.data.exito) {
                const datos = service.data.datos;
                setLsReenviarNotificacion(datos);
            }
        } catch (error) {
            toast.error(error.message || "Error al cargar los datos");
        }
    }

    useEffect(() => {
        getComboNotify();
    }, [id]);

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

                        {devolucionesAbiertas?.length > 0 &&
                            <Grid item xs={12}>
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
                        }

                        <Grid item xs={12}>
                            <SubCard title="Registros de medicina laboral">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <ComponentNote title={
                                            <>Seleccione los registros de medicina laboral para vincularlos a "Diagnósticos del empleado".
                                                Puede buscar por cualquier columna, ver los expertos según el Dx o editar la información haciendo
                                                clic en el ícono del lápiz para abrir el modal de edición.</>
                                        } />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={3}>
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Box
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: '12px',
                                                            bgcolor: 'white',
                                                            border: '1px solid #E2E8F0',
                                                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                                            color: '#3b82f6'
                                                        }}
                                                    >
                                                        <Iconify icon="solar:chart-bold-duotone" width={28} />
                                                    </Box>

                                                    <Box>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontWeight: 800,
                                                                lineHeight: 1.2,
                                                                WebkitBackgroundClip: 'text',
                                                            }}
                                                        >
                                                            Ranking de Asesorías
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: 'text.secondary',
                                                                fontWeight: 600,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                mt: 0.5
                                                            }}
                                                        >
                                                            Asesores con mayor gestión
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={9}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: { xs: 'center', md: 'flex-start' }
                                                }}
                                            >
                                                <RankingAdvisors data={lsMedicinaLaboralExp} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}><Divider sx={{ my: 0.5 }} /></Grid>

                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Buscar por todo"
                                            value={search}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <SelectOnChange
                                            name="idFiltrarInv"
                                            label="Filtrar Inv."
                                            value={opcionBusqueda}
                                            options={OptionSearch}
                                            onChange={(e) => setOpcionBusqueda(e.target.value)}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <ListMedicine
                                            records={filteredDx}
                                            selectedValues={selectedValues}
                                            handleToggleSelection={handleToggleSelection}
                                            handleOpenEdit={handleOpenEdit}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

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
                                            name="dx"
                                            label="Diagnóstico"
                                            defaultValue=""
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

                                    <Grid item xs={6} md={4} lg={1.5}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={handleClickInsertDetail}
                                                size={matchesXS ? 'small' : 'medium'}
                                                startIcon={isUpdateData ? <EditIcon /> : <AddCircleIcon />}
                                            >
                                                {isUpdateData ? 'Actualizar' : 'Agregar'}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={4} lg={1.5}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                disabled={!isUpdateData}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleClearForm}
                                                size={matchesXS ? 'small' : 'medium'}
                                                startIcon={<ClearIcon />}
                                            >
                                                Limpiar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={12}><Divider /></Grid>

                                    <Grid item xs={12}>
                                        <ComponentNote
                                            title={
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        verticalAlign: 'middle',
                                                        gap: 0.5,
                                                        fontSize: '0.75rem',
                                                        ml: 0.5
                                                    }}
                                                >
                                                    <Iconify icon="mdi:drugs" width={18} sx={{ color: "secondary.main" }} />
                                                    <span>
                                                        Registros con este icono están <strong>vinculados a Medicina Laboral</strong>.
                                                        Para editar cualquier registro, haga <strong>doble clic</strong> o use <strong>Limpiar</strong> para uno nuevo.
                                                    </span>
                                                </Box>
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <SubCard content={false}>
                                            <DetailRA
                                                lsData={listaDetalle}
                                                loadingModulo={loadingModulo}
                                                onDelete={handleClickRemoveDetail}
                                                onEdit={handleEditRow}
                                            />
                                        </SubCard>
                                    </Grid>

                                    {!!errors.listaDetalle && <FormHelperText sx={{ margin: 1 }} error={!!errors.listaDetalle}>{errors?.listaDetalle.message}</FormHelperText>}
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard>
                                <Grid container spacing={2}>
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
                                            label="Fecha dictamen primera oportunidad"
                                            name="fechaDictamen"
                                            defaultValue={dataModel?.fechaDictamen}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaDictamen}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={dataModel?.emitidoPor}
                                            name="emitidoPor"
                                            label="Emitido por"
                                            options={lsEmotidoPor}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={dataModel?.resultadoOrigen}
                                            name="resultadoOrigen"
                                            label="Resultado origen"
                                            options={lsResultadoOrigen}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <InputText
                                            disabled
                                            defaultValue={dataModel?.investigadorEtiqueta}
                                            name="investigadorEtiqueta"
                                            label="Investigador"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <InputSelect
                                            defaultValue={dataModel?.asesorARL || ""}
                                            name="asesorARL"
                                            label="Asesor ARL"
                                            options={lsAsesorARL}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.asesorARL}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>

                                    <Grid item xs={12} md={6} lg={2.4}>
                                        <InputDatePicker
                                            disabled
                                            label="Fecha de entrega"
                                            name="fechaEntrega"
                                            defaultValue={dataModel?.fechaEntrega}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaEntrega}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2.4}>
                                        <InputDatePicker
                                            disabled
                                            label="Fecha de revisión"
                                            name="fechaRevision"
                                            defaultValue={dataModel?.fechaRevision}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaRevision}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2.4}>
                                        <InputDatePicker
                                            disabled
                                            label="Fecha de visto bueno"
                                            name="fechaVistoBueno"
                                            defaultValue={dataModel?.fechaVistoBueno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaVistoBueno}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2.4}>
                                        <InputDatePicker
                                            label="Fecha de radicado"
                                            name="fechaRadicado"
                                            defaultValue={dataModel?.fechaRadicado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.fechaRadicado}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2.4}>
                                        <InputText
                                            defaultValue={dataModel?.numRadicado}
                                            name="numRadicado"
                                            label="Número radicado"
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
                                label="Usuario para reenvío de notificación"
                                options={lsReenviarNotificacion}
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

            <CustomFullScreenModal
                open={openEditOccupational.value}
                onClose={openEditOccupational.onFalse}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DiagnosisDetail data={medicinaLaboral} />
                    </Grid>

                    <Grid item xs={12}>
                        <ReviewOccupationalMedicine
                            openEditOccupational={openEditOccupational}
                            medicinaLaboral={medicinaLaboral}
                            handleRefresh={getDataMedicinaLaboral}
                        />
                    </Grid>
                </Grid>
            </CustomFullScreenModal>
        </ValidateActionSkeleton>
    );
};

export default UpdateResearchAssignment;