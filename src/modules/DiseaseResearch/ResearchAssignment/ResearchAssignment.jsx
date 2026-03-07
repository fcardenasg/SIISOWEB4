import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Divider,
    FormHelperText,
    Grid,
    InputAdornment,
    Pagination,
    TextField,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetDataOccupationalMedicine, InsertResearchAssignment } from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import CustomFullScreenModal from 'components/controllers/CustomFullScreenModal';
import {
    AccionMenu,
    CodCatalogo,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import InputDatePick from 'components/input/InputDatePick';
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { useBoolean } from 'hooks/use-boolean';
import useAuth from 'hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { formatDateForInput } from '../InvestigationOccupationalDisease/components/methods';
import { ArrayOptions, ComponentNote } from '../methods';
import DetailAseInv from './Components/DetailAseInv';
import DetailRA from './Components/DetailRA';
import DiagnosisDetail from './Components/DiagnosisDetail';
import ListMedicine from './Components/ListMedicine';
import ReviewOccupationalMedicine from './Components/ReviewOccupationalMedicine';
import Iconify from 'components/iconify/iconify';

const validationSchema = yup.object().shape({
    documento: yup.string().required("El documento es requerido"),
    investigador: yup.array().min(1, "Debe seleccionar al menos un investigador"),
    listaDetalle: yup.array().required("Se requiere al menos un diagnóstico"),
    asignacionInvestigacionInvAses: yup.array().required("Se requiere al menos un registro de ítems a investigar"),
});

const ResearchAssignment = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const loadingModulo = useBoolean(false);
    const openEditOccupational = useBoolean(false);

    const [medicinaLaboral, setMedicinaLaboral] = useState(null);
    const [search, setSearch] = useState("");
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
    const [fechaRadicado, setFechaRadicado] = useState(null);
    const [lsEmotidoPor, setLsEmotidoPor] = useState([]);
    const [lsMedicinaLaboralDx, setLsMedicinaLaboralDx] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset, watch, setError, resetField, setValue } = methods;
    const documento = watch("documento");
    const listaDetalle = watch("listaDetalle");
    const asignacionInvestigacionInvAses = watch("asignacionInvestigacionInvAses");
    const dx = watch("dx");
    const idSegmentoAgrupado = watch("idSegmentoAgrupado");
    const idSegmentoAfectado = watch("idSegmentoAfectado");
    const idSubsegmento = watch("idSubsegmento");
    const idRegion = watch("idRegion");
    const idLateralidad = watch("idLateralidad");
    const asesorARL = watch("asesorARL");
    const itemInvestigacion = watch("itemInvestigacion");
    const isUpdateData = watch("isUpdateData");

    const assignedIds = useMemo(() => {
        const currentDetails = Array.isArray(asignacionInvestigacionInvAses) ? asignacionInvestigacionInvAses : [];
        return currentDetails.flatMap(detail => detail.itemInvestigacion || []);
    }, [asignacionInvestigacionInvAses]);

    const availableOptions = useMemo(() => {
        return ArrayOptions.filter(option => !assignedIds.includes(option.value));
    }, [assignedIds]);

    useEffect(() => {
        async function getCombo() {
            try {
                setValue("documento", 15671111);

                const lsServerInvestigacion = await GetAllComboAsesorInvestigacion(false);
                setLsInvestigacion(lsServerInvestigacion.data);

                const lsServerAsesorARL = await GetAllComboAsesorInvestigacion(true);
                setLsAsesorARL(lsServerAsesorARL.data);

                const lsServerResultadoOrigen = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_RESULTADO_EN_ORIGEN);
                setLsResultadoOrigen(lsServerResultadoOrigen.data);

                const lsServerInvestigacionEL = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_INVESTIGACION_EL);
                setLsInvestigacionEL(lsServerInvestigacionEL.data);

                const lsServerEntidadDondeEnvia = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ENDON_EN);
                setLsEmotidoPor(lsServerEntidadDondeEnvia.data);

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

                    var lsServerDx = await GetDataOccupationalMedicine(document);
                    if (lsServerDx?.data.exito) {
                        setLsMedicinaLaboralDx(lsServerDx.data.datos.medicina);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(document);
                    if (lsServerEmployee.data.status === 200) {
                        setModelEmployee(lsServerEmployee.data.data);
                    }

                    var lsServerDx = await GetDataOccupationalMedicine(document);
                    if (lsServerDx?.data.exito) {
                        setLsMedicinaLaboralDx(lsServerDx.data.datos.medicina);
                    }
                }
            } else {
                setModelEmployee([]);
                setLsMedicinaLaboralDx([]);
            }
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

            const currentDetails = Array.isArray(listaDetalle) ? listaDetalle : [];

            if (!isUpdateData) {
                const isDuplicate = currentDetails.some(detail => detail.dx === dx);
                if (isDuplicate) {
                    setError('dx', { type: 'manual', message: 'El diagnóstico ya está en la lista' });
                    return;
                }
            }

            const nombreDxFull = lsDx?.find(item => item.value === dx)?.label;
            const newDetail = {
                dx: dx || null,
                idSegmentoAgrupado: idSegmentoAgrupado || null,
                idSegmentoAfectado: idSegmentoAfectado || null,
                idSubsegmento: idSubsegmento || null,
                idRegion: idRegion || null,
                idLateralidad: idLateralidad || null,
                nombreDx: nombreDxFull?.includes(" - ") ? nombreDxFull.split(" - ")[1] : nombreDxFull,
                nombreSegmentoAgrupado: lsSegmentoAgrupado?.find(item => item.value === idSegmentoAgrupado)?.label || "N/A",
                nombreSegmentoAfectado: lsSegmentoAfectado?.find(item => item.value === idSegmentoAfectado)?.label || "N/A",
                nombreSubsegmento: lsSubsegmento?.find(item => item.value === idSubsegmento)?.label || "N/A",
                nombreRegion: lsRegion?.find(item => item.value === idRegion)?.label || "N/A",
                nombreLateralidad: lsLateralidad?.find(item => item.value === idLateralidad)?.label || "N/A",
            };

            let updatedDetails;
            if (isUpdateData) {
                updatedDetails = currentDetails.map(item => item.dx === dx ? newDetail : item);
                toast.success("Registro actualizado correctamente");
            } else {
                updatedDetails = [...currentDetails, newDetail];
                toast.success("Registro agregado correctamente");
            }

            setValue('listaDetalle', updatedDetails, { shouldValidate: true });
            handleClearForm();
            setValue('isUpdateData', false);
        } catch (error) {
        }
    };

    const handleClickInsertDetailAseInv = async () => {
        try {
            if (!asesorARL) {
                toast.error('El asesor ARL es obligatorio');
                return;
            }

            if (!itemInvestigacion || itemInvestigacion.length === 0) {
                toast.error('Debe seleccionar al menos un ítem');
                return;
            }

            const currentDetails = Array.isArray(asignacionInvestigacionInvAses) ? asignacionInvestigacionInvAses : [];
            const isDuplicateUser = currentDetails.some(detail => detail.idUsuario === asesorARL);
            if (isDuplicateUser) {
                toast.error('Este asesor ya se encuentra en la lista. Elimínelo o edítelo si desea cambiar sus ítems.');
                return;
            }

            const newDetail = {
                idUsuario: asesorARL,
                itemInvestigacion: itemInvestigacion,
                fechaRegistro: new Date(),
                usuarioRegistro: user?.nameuser || null,
                nameAsesorARL: lsAsesorARL?.find(item => item.value === asesorARL)?.label || "N/A",
                listItemInvestigacion: ArrayOptions?.filter(f => itemInvestigacion?.includes(f.value)) || [],
            };

            const updatedDetails = [...currentDetails, newDetail];
            setValue('asignacionInvestigacionInvAses', updatedDetails, { shouldValidate: true });

            toast.success("Asesor ARL agregado correctamente");
            resetField("asesorARL");
            resetField("itemInvestigacion");
        } catch (error) { }
    };

    const handleClickRemoveDetail = async (dataDx) => {
        try {
            const currentDetails = listaDetalle || [];
            const indexToRemove = currentDetails.findIndex(detail => detail.dx === dataDx.dx);

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

    const handleClickRemoveDetailAseInv = (dataInvAse) => {
        try {
            const currentDetails = Array.isArray(asignacionInvestigacionInvAses) ? asignacionInvestigacionInvAses : [];
            const updatedDetails = currentDetails.filter(detail => detail.idUsuario !== dataInvAse.idUsuario);

            if (updatedDetails.length === currentDetails.length) {
                toast.error("No se encontró el asesor en la lista");
                return;
            }

            setValue('asignacionInvestigacionInvAses', updatedDetails, { shouldValidate: true });
            toast.success("Ítem a investigar eliminado de la lista");
        } catch (error) {
            toast.error("Error al intentar eliminar el registro");
        }
    };

    const handleToggleSelection = (value) => {
        const isSelected = selectedValues.includes(value);
        const updatedSelection = isSelected
            ? selectedValues.filter((item) => item !== value)
            : [...selectedValues, value];

        setSelectedValues(updatedSelection);

        const insertValues = lsMedicinaLaboralDx.filter((detail) =>
            updatedSelection.includes(detail.idMedicinaLaboral)
        );

        setValue('listaDetalle', insertValues, { shouldValidate: true });
    };

    const handleEditRow = (row) => {
        setLsDx([{ value: row.dx, label: row.nombreDx }]);
        setTextDx(row.dx);
        setValue('dx', row.dx, { shouldValidate: true });
        setValue('idSegmentoAgrupado', row.idSegmentoAgrupado);
        setValue('idSegmentoAfectado', row.idSegmentoAfectado);
        setValue('idSubsegmento', row.idSubsegmento);
        setValue('idRegion', row.idRegion);
        setValue('idLateralidad', row.idLateralidad);
        setValue('isUpdateData', true);
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

    const handleClick = async (datos) => {
        try {
            datos.tipoInvestigacion = datos.tipoInvestigacion || null;
            datos.resultadoOrigen = datos.resultadoOrigen || null;
            datos.emitidoPor = datos.emitidoPor || null;
            datos.numRadicado = datos.numRadicado || null;

            datos.fechaEntrega = formatDateForInput(fechaEntrega);
            datos.fechaRevision = formatDateForInput(fechaRevision);
            datos.fechaVistoBueno = formatDateForInput(fechaVistoBueno);
            datos.fechaDictamen = formatDateForInput(fechaDictamen);
            datos.fechaRadicado = formatDateForInput(fechaRadicado);

            const result = await InsertResearchAssignment(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                setValue("documento", "");
                setModelEmployee([]);
                setFechaEntrega("");
                setFechaRevision("");
                setFechaVistoBueno("");
                setFechaDictamen("");
                setFechaRadicado("");
                setSelectedValues([]);
                setLsMedicinaLaboralDx([]);
                setSearch("");
                reset();
            } else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(error.message || "Error al agregar la asignación de investigación");
        }
    };

    const filteredDx = useMemo(() => {
        if (!search) return lsMedicinaLaboralDx;

        const searchTerm = search.toLowerCase().trim();

        return lsMedicinaLaboralDx.filter((item) => {
            return (
                item.dx?.toLowerCase().includes(searchTerm) ||
                item.nombreDx?.toLowerCase().includes(searchTerm) ||
                item.noDictamenJRC?.toLowerCase().includes(searchTerm) ||
                item.noDictamenJNC?.toLowerCase().includes(searchTerm) ||
                item.noDictamenAFP?.toLowerCase().includes(searchTerm)
            );
        });
    }, [search, lsMedicinaLaboralDx]);

    const handleOpenEdit = (medicinaLaboral) => {
        setMedicinaLaboral(medicinaLaboral);
        openEditOccupational.onTrue();
    };

    async function getDataMedicinaLaboral() {
        try {
            var lsServerDx = await GetDataOccupationalMedicine(documento);
            if (lsServerDx?.data.exito) {
                const list = lsServerDx.data.datos;
                setLsMedicinaLaboralDx(list?.medicina);
                setMedicinaLaboral(prev => {
                    const actualizado = list?.medicina.find(fil => fil.idMedicinaLaboral === prev?.idMedicinaLaboral);
                    return actualizado ?? prev;
                });
            }
        } catch (error) {
            toast.error(error.message || "Error al obtener los datos de medicina laboral");
        }
    }

    useEffect(() => {
        getDataMedicinaLaboral();
    }, []);

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
                        <SubCard title="Registros de medicina laboral">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ComponentNote title={
                                        <>Seleccione los registros de medicina laboral para vincularlos a "Diagnósticos del empleado".
                                            Puede buscar por cualquier columna, ver los expertos según el Dx o editar la información haciendo
                                            clic en el ícono del lápiz para abrir el modal de edición.</>
                                    } />
                                </Grid>

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
                                        disabled={isUpdateData}
                                        label="Buscar dx por palabras claves"
                                        onKeyDown={handleDx}
                                        onChange={(e) => setTextDx(e.target.value)}
                                        value={textDx}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6.5} lg={9}>
                                    <InputSelect
                                        disabled={isUpdateData}
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
                                        label="Fecha dictamen primera oportunidad"
                                        name="fechaDictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="emitidoPor"
                                        label="Emitido por"
                                        options={lsEmotidoPor}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="resultadoOrigen"
                                        label="Resultado origen"
                                        options={lsResultadoOrigen}
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

                                <Grid item xs={12}><Divider /></Grid>

                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <SubCard title="Ítem a investigar">
                                        <Grid container spacing={2} sx={{
                                            borderColor: !!errors.asignacionInvestigacionInvAses && 'error.main',
                                            borderStyle: !!errors.asignacionInvestigacionInvAses && 'dashed',
                                            borderWidth: !!errors.asignacionInvestigacionInvAses && 1
                                        }}>
                                            <Grid item xs={12} md={4} lg={3}>
                                                <InputSelect
                                                    disabled={availableOptions.length === 0}
                                                    defaultValue=""
                                                    name="asesorARL"
                                                    label="Asesor ARL"
                                                    options={lsAsesorARL}
                                                    bug={errors.asesorARL}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={8} lg={7}>
                                                <InputMultiselectTwo
                                                    disabled={availableOptions.length === 0}
                                                    showSelectAll
                                                    checkbox
                                                    name="itemInvestigacion"
                                                    label="Ítem a investigar"
                                                    options={availableOptions}
                                                    bug={errors.itemInvestigacion}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={2} display="flex" alignItems="center" justifyContent="center">
                                                <AnimateButton>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleClickInsertDetailAseInv}
                                                        startIcon={<AddCircleIcon />}
                                                    >
                                                        Agregar
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard content={false}>
                                                    <DetailAseInv
                                                        lsData={asignacionInvestigacionInvAses}
                                                        onDelete={handleClickRemoveDetailAseInv}
                                                    />
                                                </SubCard>
                                            </Grid>

                                            {!!errors.asignacionInvestigacionInvAses && <FormHelperText sx={{ margin: 1 }} error={!!errors.asignacionInvestigacionInvAses}>{errors?.asignacionInvestigacionInvAses.message}</FormHelperText>}
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.4}>
                                    <InputDatePick
                                        disabled
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        value={fechaEntrega}
                                        label="Fecha de entrega"
                                        name="fechaEntrega"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.4}>
                                    <InputDatePick
                                        disabled
                                        onChange={(e) => setFechaRevision(e.target.value)}
                                        value={fechaRevision}
                                        label="Fecha de revisión"
                                        name="fechaRevision"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.4}>
                                    <InputDatePick
                                        disabled
                                        onChange={(e) => setFechaVistoBueno(e.target.value)}
                                        value={fechaVistoBueno}
                                        label="Fecha de visto bueno"
                                        name="fechaVistoBueno"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.4}>
                                    <InputDatePick
                                        onChange={(e) => setFechaRadicado(e.target.value)}
                                        value={fechaRadicado}
                                        label="Fecha de radicado"
                                        name="fechaRadicado"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.4}>
                                    <InputText
                                        defaultValue=""
                                        name="numRadicado"
                                        label="Número radicado"
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
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

export default ResearchAssignment;