import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    FormHelperText,
    Grid,
    IconButton,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllDxEmployeeResearchAssignment, GetDataMedicalOccupationalReseAssig, InsertResearchAssignment } from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import {
    AccionMenu,
    CodCatalogo,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
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
import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';

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
    const [lsDx, setLsDx] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset, watch, setError, setValue } = methods;
    const documento = watch("documento");
    const listaDetalle = watch("listaDetalle");
    const dx = watch("dx");

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerCombo = await GetAllComboAsesorInvestigacion();
                if (lsServerCombo.status === 200)
                    setLsInvestigacion(lsServerCombo.data);

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

                    const listDxEmployee = await GetAllDxEmployeeResearchAssignment(document);
                    if (listDxEmployee.data.exito) {
                        setValue("listaDetalle", listDxEmployee.data.datos, { shouldValidate: true });
                    }

                    const dataMedical = await GetDataMedicalOccupationalReseAssig(document);
                    if (dataMedical.data.exito) {
                        const datamodel = dataMedical.data.datos; 
                        setValue("fechaEntrega", datamodel?.fechaEntrega);
                        setValue("idSegmentoAgrupado", datamodel?.segmentoAgrupado);
                        setValue("idSegmentoAfectado", datamodel?.segmentoAfectado);
                        setValue("idSubsegmento", datamodel?.subsegmento);
                        setValue("idRegion", datamodel?.regionInfoLaboral);
                        setValue("idLateralidad", datamodel?.lateralidad);
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
                fechaDx: new Date(),
                dx,
                modulo: "Asignación de Investigación",
                nombreDx: nombreDx?.split(" - ")[1]
            };

            const updatedDetails = [...currentDetails, newDetail];
            setValue('listaDetalle', updatedDetails, { shouldValidate: true });
            toast.success("Diagnóstico agregado a la lista correctamente");

            setTextDx("");
            setLsDx([]);
            setValue('dx', '');
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
            const result = await InsertResearchAssignment(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                reset();
                setModelEmployee([]);
                setValue('documento', '');
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
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.fecha}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePicker
                                        label="Fecha de entrega"
                                        name="fechaEntrega"
                                        defaultValue={null}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.fecha}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePicker
                                        label="Fecha de revisión"
                                        name="fechaRevision"
                                        defaultValue={null}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.fecha}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputDatePicker
                                        label="Fecha de visto bueno"
                                        name="fechaVistoBueno"
                                        defaultValue={null}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.fecha}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        name="idSegmentoAgrupado"
                                        label="Segmento agrupado"
                                        defaultValue=""
                                        options={lsSegmentoAgrupado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idSegmentoAgrupado}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        name="idSegmentoAfectado"
                                        label="Segmento afectado"
                                        defaultValue=""
                                        options={lsSegmentoAfectado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idSegmentoAfectado}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        name="idSubsegmento"
                                        label="Subsegmento"
                                        defaultValue=""
                                        options={lsSubsegmento}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idSubsegmento}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        name="idRegion"
                                        label="Región"
                                        defaultValue=""
                                        options={lsRegion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idRegion}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        name="idLateralidad"
                                        label="Lateralidad"
                                        defaultValue=""
                                        options={lsLateralidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idLateralidad}
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
                                        options={lsInvestigacion}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <SubCard title="Diagnósticos del empleado (Buscados en EMO y medicina laboral)">
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

                                            <Grid item xs={12} md={4} lg={9}>
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

                                            <Grid item xs={12}>
                                                <DetailRA
                                                    lsData={listaDetalle}
                                                    loadingModulo={loadingModulo}
                                                    onDelete={handleClickRemoveDetail}
                                                />
                                            </Grid>

                                            {!!errors.listaDetalle && <FormHelperText sx={{ margin: 1 }} error={!!errors.listaDetalle}>{errors?.listaDetalle.message}</FormHelperText>}
                                        </Grid>
                                    </SubCard>
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