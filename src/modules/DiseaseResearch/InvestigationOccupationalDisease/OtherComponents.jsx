import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetComboCompany } from 'api/clients/CompanyClient';
import { DeleteIELMetodoControl, GetIELFirma, GetIELHistoriaLaboralDLTD, GetIELHistoriaLaboralOtrosEmpresas, GetIELMetodoControl, InsertIELFirma, InsertIELHistoriaLaboralDLTD, InsertIELHistoriaLaboralOE, InsertIELMetodoControl } from 'api/clients/InvestigationClient';
import { ParamDelete } from 'components/alert/AlertAll';
import { CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import InputTextEditor from 'components/input/InputTextEditor';
import { UploadBox } from 'components/upload';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import {
    TableCharacterizationAbsenteeism,
    TableControlMethods,
    TableDiagnosisRating,
    TableDLTD,
    TableOtherCompanies,
    TablePreventiveActions
} from './components/Table';
import TableDiagnosis from './components/Table/TableDiagnosis';
import TableHealth from './components/Table/TableHealth';
import { yupResolver } from '@hookform/resolvers/yup';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';

export const CompanyDetails = ({ dataModel, matchesXS, disabledControl }) => {
    const [lsSede, setLsSede] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsDepartamento, setLsDepartamento] = useState([]);
    const [lsCompany, setLsCompany] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerCompany = await GetComboCompany();
            setLsCompany(lsServerCompany.data);

            const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
            setLsSede(lsServerSede.data);

            const lsServerArea = await GetByTipoCatalogoCombo(CodCatalogo.Area);
            setLsArea(lsServerArea.data);

            const lsServerDepartamento = await GetByTipoCatalogoCombo(CodCatalogo.DepartEmpresa);
            setLsDepartamento(lsServerDepartamento.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <InputDatePicker
                    label="Fecha de la investigación"
                    name="fechaInvestigacion"
                    defaultValue={dataModel?.fechaInvestigacion}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="razonSocial"
                    label="Razón social"
                    defaultValue={dataModel?.razonSocial}
                    options={lsCompany}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    disabled
                    defaultValue={dataModel?.nit}
                    fullWidth
                    name="nit"
                    label="NIT"
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <InputText
                    defaultValue={dataModel?.actividadEconomica}
                    fullWidth
                    name="actividadEconomica"
                    label="Actividad económica de la empresa"
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="sedeTrabajo"
                    label="Sede de trabajo"
                    defaultValue={dataModel?.sedeTrabajo}
                    options={lsSede}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="departamento"
                    label="Departamento"
                    defaultValue={dataModel?.departamento}
                    options={lsDepartamento}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="area"
                    label="Área"
                    defaultValue={dataModel?.area}
                    options={lsArea}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>
        </Grid>
    )
}

const validationWHDLTD = yup.object().shape({
    fecha: yup.date().nullable().typeError(ValidationMessage.Requerido).required(ValidationMessage.Requerido),
    cargoInicial: yup.object().nullable().required(ValidationMessage.Requerido),
    turnoControl: yup.string().required(ValidationMessage.Requerido),
    rotacion: yup.string().required(ValidationMessage.Requerido),
    anios: yup.string().required(ValidationMessage.Requerido),
    meses: yup.string().required(ValidationMessage.Requerido),
});

export const WorkHistoryDLTD = ({ documento, disabledControl = false, refreshDataState }) => {
    const methodsDLTD = useForm({ resolver: yupResolver(validationWHDLTD) });
    const { formState: { errors, isSubmitting }, handleSubmit, reset, setValue } = methodsDLTD;

    const [listHL, setListHL] = useState([]);
    const idIEL = useFormContext().getValues('id');

    const [lsRosterPosition, setLsRosterPosition] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerRosterPosition = await GetByTipoCatalogoCombo(CodCatalogo.RosterPosition);
                setLsRosterPosition(lsServerRosterPosition.data);

                const lsServerTurno = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
                setLsTurno(lsServerTurno.data);
            } catch (error) { }
        }

        getCombo();
    }, []);

    async function getData() {
        try {
            if (documento) {
                const statusData = Boolean(idIEL);
                const response = await GetIELHistoriaLaboralDLTD(documento, statusData);
                if (response.data.exito) {
                    const mappedData = (response.data.datos || []).map((item) => ({
                        id: item.id,
                        fecha: item.fecha,
                        cargo: item.nameCargo,
                        turno: item.nameTurno,
                        rotacion: item.nameRotacion,
                        anios: item.anio,
                        meses: item.meses
                    }));

                    setListHL(mappedData);
                }
            }
        } catch (error) {
            toast.error("Error al cargar la historia laboral DLTD");
        }
    }

    useEffect(() => {
        getData();
    }, [documento, idIEL]);

    const handleClick = async (datos) => {
        try {
            datos.idInvestigacion = idIEL;
            datos.cargo = datos.cargoInicial.label;
            datos.turno = lsTurno.find((item) => item.value === parseInt(datos.turnoControl)).label;
            datos.idCargo = datos.cargoInicial.value;

            const result = await InsertIELHistoriaLaboralDLTD(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                reset();
                setValue("fecha", "");

                if (listHL.length === 0) {
                    refreshDataState();
                }

                getData();
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al procesar la investigación");
        }
    }

    return (
        <Grid container spacing={2}>
            {!disabledControl &&
                <FormProvider {...methodsDLTD}>
                    {!idIEL && (
                        <>
                            <Grid item xs={12}>
                                <Alert severity="info" variant="outlined">
                                    <AlertTitle>Acción requerida</AlertTitle>
                                    Para comenzar a agregar historia laboral en DLTD, <strong>primero debe guardar la información general</strong> de la investigación.
                                </Alert>
                            </Grid>

                            <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>
                        </>
                    )}

                    <Grid item xs={12} md={6} lg={2}>
                        <InputDatePicker
                            defaultValue=""
                            label="Fecha de ingreso"
                            name="fecha"
                            size="small"
                            bug={errors.fecha}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2.5}>
                        <InputSelectAutocomplete
                            defaultValue={null}
                            name="cargoInicial"
                            label="Cargo inicial"
                            options={lsRosterPosition}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputSelect
                            name="turnoControl"
                            label="Turno"
                            defaultValue=""
                            options={lsTurno}
                            size="small"
                            bug={errors.turnoControl}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            name="rotacion"
                            label="Rotación"
                            defaultValue=""
                            size="small"
                            bug={errors.rotacion}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={1}>
                        <InputText
                            name="anios"
                            label="Años"
                            defaultValue=""
                            type="number"
                            size="small"
                            bug={errors.anios}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={1}>
                        <InputText
                            name="meses"
                            label="Meses"
                            defaultValue=""
                            type="number"
                            size="small"
                            bug={errors.meses}
                        />
                    </Grid>

                    <Grid item xs={6} md={4} lg={1.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(handleClick)}
                                disabled={isSubmitting || disabledControl || !idIEL}
                                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <AddCircleIcon />}
                                sx={{ minWidth: '110px' }}
                            >
                                {isSubmitting ? 'Guardando...' : 'Agregar'}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </FormProvider>
            }

            <Grid item xs={12}>
                <TableDLTD listData={listHL} />
            </Grid>
        </Grid>
    )
}

const validationWHDLTDOther = yup.object().shape({
    empresa: yup.string().required(ValidationMessage.Requerido),
    cargo: yup.string().required(ValidationMessage.Requerido),
    anios: yup.string().required(ValidationMessage.Requerido),
    meses: yup.string().required(ValidationMessage.Requerido),
});

export const WorkHistoryOtherCompanies = ({ documento, disabledControl = false, refreshDataState }) => {
    const methodsOtherCompanies = useForm({ resolver: yupResolver(validationWHDLTDOther) });
    const { formState: { errors, isSubmitting }, handleSubmit, reset } = methodsOtherCompanies;

    const [listHLOE, setListHLOE] = useState([]);
    const idIEL = useFormContext().getValues('id');

    async function getData() {
        try {
            if (documento) {
                const statusData = Boolean(idIEL);
                const response = await GetIELHistoriaLaboralOtrosEmpresas(documento, statusData);
                if (response.data.exito) {
                    setListHLOE(response.data.datos);
                }
            }
        } catch (error) {
            toast.error("Error al cargar la historia laboral de otras empresas");
        }
    }

    useEffect(() => {
        getData();
    }, [documento, idIEL]);

    const handleClick = async (datos) => {
        try {
            datos.idInvestigacion = idIEL;

            const result = await InsertIELHistoriaLaboralOE(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                reset();

                if (listHLOE.length === 0) {
                    refreshDataState();
                }

                getData();
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al procesar la investigación");
        }
    }

    return (
        <Grid container spacing={2}>
            {!disabledControl &&
                <FormProvider {...methodsOtherCompanies}>
                    {!idIEL && (
                        <>
                            <Grid item xs={12}>
                                <Alert severity="info" variant="outlined">
                                    <AlertTitle>Acción requerida</AlertTitle>
                                    Para comenzar a agregar historia laboral en otras empresas, <strong>primero debe guardar la información general</strong> de la investigación.
                                </Alert>
                            </Grid>

                            <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>
                        </>
                    )}

                    <Grid item xs={12} md={6} lg={3.5}>
                        <InputText
                            name="empresa"
                            label="Empresa"
                            defaultValue=""
                            size="small"
                            bug={errors.empresa}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3.5}>
                        <InputText
                            name="cargo"
                            label="Cargo"
                            defaultValue=""
                            size="small"
                            bug={errors.cargo}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.5}>
                        <InputText
                            name="anios"
                            label="Años"
                            defaultValue=""
                            type="number"
                            size="small"
                            bug={errors.anios}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.5}>
                        <InputText
                            name="meses"
                            label="Meses"
                            defaultValue=""
                            type="number"
                            size="small"
                            bug={errors.meses}
                        />
                    </Grid>

                    <Grid item xs={6} md={4} lg={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(handleClick)}
                                disabled={isSubmitting || disabledControl || !idIEL}
                                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <AddCircleIcon />}
                                sx={{ minWidth: '110px' }}
                            >
                                {isSubmitting ? 'Guardando...' : 'Agregar'}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </FormProvider>
            }

            <Grid item xs={12}>
                <TableOtherCompanies listData={listHLOE} />
            </Grid>
        </Grid>
    )
}

export const DataDiagnosisQualificationProcess = ({ dataModel, matchesXS, methods, disabledControl }) => {
    const [lsOpcionesSino, setLsOpcionesSino] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerOpcionesSino = await GetByTipoCatalogoCombo(CodCatalogo.Opciones_SINO);
            setLsOpcionesSino(lsServerOpcionesSino.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard content={false}>
                    <TableDiagnosis methods={methods} disabledControl={disabledControl} />
                </SubCard>
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idGeneroIncapacidad"
                    label="Generó incapacidad"
                    defaultValue={dataModel?.idGeneroIncapacidad}
                    options={lsOpcionesSino}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="diasIncapacidad"
                    label="Días de incapacidad"
                    defaultValue={dataModel?.diasIncapacidad}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="observacionesIncapacidad"
                    label="Observaciones a la incapacidad"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.observacionesIncapacidad}
                    size={matchesXS ? 'small' : 'medium'}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="numeroFurel"
                    label="FUREL #"
                    defaultValue={dataModel?.numeroFurel}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaFurel"
                    label="Fecha del FUREL"
                    defaultValue={dataModel?.fechaFurel}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaEstructuracionOrigen"
                    label="Fecha de estructuración de origen"
                    defaultValue={dataModel?.fechaEstructuracionOrigen}
                    disabled={disabledControl}
                />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12}>
                <SubCard content={false}>
                    <TableDiagnosisRating methods={methods} disabledControl={disabledControl} />
                </SubCard>
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idCalificacionPCL"
                    label="Calificación PCL"
                    defaultValue={dataModel?.idCalificacionPCL}
                    options={lsOpcionesSino}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="porcentajePCL"
                    label="% PCL"
                    defaultValue={dataModel?.porcentajePCL}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="instancia"
                    label="Instancia"
                    defaultValue={dataModel?.instancia}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="dictamen"
                    label="Dictamen #"
                    defaultValue={dataModel?.dictamen}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idCalificacionIntegral"
                    label="Calificación integral"
                    defaultValue={dataModel?.idCalificacionIntegral}
                    options={lsOpcionesSino}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={9}>
                <InputText
                    name="otrasPatologias"
                    label="Otras patologías que hacen parte de la calificación de PCL"
                    defaultValue={dataModel?.otrasPatologias}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export const DataExposureCompany = ({ resumenResultadosAnalisisPuesto, resumenValoracionRiesgo, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Resumen de los resultados del análisis del puesto de trabajo" name="resumenResultadosAnalisisPuesto" defaultValue={resumenResultadosAnalisisPuesto} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Resumen de la valoración del riesgo" name="resumenValoracionRiesgo" defaultValue={resumenValoracionRiesgo} />
            </Grid>
        </Grid>
    )
}

export const AvailableControlMethods = ({ disabledControl, methodsMain }) => {
    const theme = useTheme();
    const idIEL = methodsMain.getValues('id');
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [lsMetodoControl, setLsMetodoControl] = useState([]);
    const [lsControl, setLsControl] = useState([]);
    const [lsTipoControl, setLsTipoControl] = useState([]);

    const isDisabled = !idIEL;
    const methods = useForm();
    const { handleSubmit, reset } = methods;

    async function getData() {
        try {
            const result = await GetIELMetodoControl(idIEL);
            if (result.data.exito) {
                setLsMetodoControl(result.data.datos);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al obtener los métodos de control");
        }
    }

    useEffect(() => {
        if (idIEL) {
            getData();
        }
    }, [idIEL]);

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerControl = await GetByTipoCatalogoCombo(CodCatalogo.IEL_CONTROL);
                setLsControl(lsServerControl.data);

                const lsServerTipoControl = await GetByTipoCatalogoCombo(CodCatalogo.IEL_TIPO_CONTROL);
                setLsTipoControl(lsServerTipoControl.data);
            } catch (error) {
                toast.error("Error al obtener los tipos de control");
            }
        }

        getCombo();
    }, []);

    const handleSave = async (data) => {
        try {
            data.idInvestigacion = parseInt(idIEL);
            const result = await InsertIELMetodoControl(data);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                getData();
                reset();
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.response.data.mensaje);
        }
    }

    const handleDelete = async (idCheck) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteIELMetodoControl(idCheck);
                    if (result.data.exito) {
                        toast.success(result.data.mensaje);
                        getData();
                    } else {
                        toast.error(result.data.mensaje);
                    }
                }
            });
        } catch (error) {
            toast.error("Error al eliminar el método de control");
        }
    }

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2} alignItems="center">
                {isDisabled && (
                    <Grid item xs={12}>
                        <Alert severity="info" variant="outlined">
                            <AlertTitle>Acción requerida</AlertTitle>
                            Para comenzar a agregar métodos de control, <strong>primero debe guardar la información general</strong> de la investigación.
                        </Alert>
                    </Grid>
                )}

                {!disabledControl &&
                    <>
                        <Grid item xs={12} md={6}>
                            <InputSelect
                                name="control"
                                label="Control"
                                defaultValue=""
                                options={lsControl}
                                size={matchesXS ? 'small' : 'medium'}
                                disabled={isDisabled}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputSelect
                                name="tipoControl"
                                label="Tipo de control"
                                defaultValue=""
                                options={lsTipoControl}
                                size={matchesXS ? 'small' : 'medium'}
                                disabled={isDisabled}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={4}
                                name="observacionBrindado"
                                label="Observaciones sobre uso brindado"
                                size={matchesXS ? 'small' : 'medium'}
                                disabled={isDisabled}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={4}
                                name="observacionNivelProteccionBrindado"
                                label="Observaciones sobre nivel de protección brindado"
                                size={matchesXS ? 'small' : 'medium'}
                                disabled={isDisabled}
                            />
                        </Grid>

                        <Grid item xs={12} textAlign="right">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(handleSave)}
                                size={matchesXS ? 'small' : 'medium'}
                                startIcon={<AddCircleIcon />}
                                disabled={isDisabled}
                            >
                                Agregar
                            </Button>
                        </Grid>

                        <Grid item xs={12}><Divider /></Grid>
                    </>
                }

                <Grid item xs={12}>
                    <SubCard
                        content={false}
                        sx={{ opacity: isDisabled ? 0.5 : 1, pointerEvents: isDisabled ? 'none' : 'auto' }}
                    >
                        <TableControlMethods listMC={lsMetodoControl} handleDelete={handleDelete} disabledControl={disabledControl} />
                    </SubCard>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export const ClinicalData = ({ datosClinicos, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Datos clínicos y paraclínicos" name="datosClinicos" defaultValue={datosClinicos} />
            </Grid>
        </Grid>
    )
}

export const Background = ({ dataModel, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Personales (enfermedades, cirugías, traumas, farmacológicos)" name="personales" defaultValue={dataModel?.personales} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Otras enfermedades laborales calificadas o en proceso de calificación" name="otrasEnfermedadesLaborales" defaultValue={dataModel?.otrasEnfermedadesLaborales} />
            </Grid>

            <Grid item xs={12}>
                <TableHealth dataModel={dataModel} disabledControl={disabledControl} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Familiares" name="familiares" defaultValue={dataModel?.familiares} />
            </Grid>
        </Grid>
    )
}

export const OtherClinicalData = ({ otrosDatosClinicos, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Otros datos clínicos de interés relacionados con la patología" name="otrosDatosClinicos" defaultValue={otrosDatosClinicos} />
            </Grid>
        </Grid>
    )
}

export const CharacterizationAbsenteeism = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard content={false}>
                    <TableCharacterizationAbsenteeism />
                </SubCard>
            </Grid>
        </Grid>
    )
}

export const BiographyReview = ({ revisionBibliografia, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Revisión de la bibliografía" name="revisionBibliografia" defaultValue={revisionBibliografia} />
            </Grid>
        </Grid>
    )
}

export const CauseAnalysis = ({ analisisCausas, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Análisis de causas" name="analisisCausas" defaultValue={analisisCausas} />
            </Grid>
        </Grid>
    )
}

export const UnderlyingCauseDetected = ({ causaBasicaDetectada, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Causa básica detectada" name="causaBasicaDetectada" defaultValue={causaBasicaDetectada} />
            </Grid>
        </Grid>
    )
}

export const Conclusion = ({ conclusion, disabledControl }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor disabled={disabledControl} label="Conclusión" name="conclusion" defaultValue={conclusion} />
            </Grid>
        </Grid>
    )
}

export const PreventiveActions = ({ methods, disabledControl }) => {
    return (
        <SubCard content={false}>
            <TablePreventiveActions methods={methods} disabledControl={disabledControl} />
        </SubCard>
    );
}

const ComponentSignatures = ({ index, title, nameCargo, numFirma, refreshData }) => {
    const { setValue, watch } = useFormContext();
    const [loading, setLoading] = useState(false);
    const currentUser = watch(`listFirma.${index}`);

    const showFirmarButton = numFirma === 1 && !currentUser?.firmado;
    const isSigned = currentUser?.firmado;

    const handleFirmar = async () => {
        try {
            setLoading(true);
            const firmaData = {
                id: currentUser.id,
                idUsuario: 12
            };

            const result = await InsertIELFirma(firmaData);
            if (result.data.exito) {
                toast.success("Firma registrada correctamente");
                setValue(`listFirma.${index}.firmado`, true);
                refreshData();
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al registrar la firma");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{
                p: 2.5,
                border: '1px solid',
                borderColor: isSigned ? 'success.light' : 'divider',
                boxShadow: 'none',
                position: 'relative',
                transition: 'all 0.2s ease',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
                '&::before': isSigned ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    backgroundColor: 'success.main',
                } : {}
            }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'grey.50',
                            borderRadius: 1,
                            border: '1px dashed',
                            borderColor: 'divider',
                            overflow: 'hidden'
                        }}>
                            {loading && (
                                <Box sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(255,255,255,0.8)',
                                    backdropFilter: 'blur(1px)'
                                }}>
                                    <CircularProgress size={24} />
                                </Box>
                            )}

                            <UploadBox
                                disabled
                                name={`listFirma.${index}.firma`}
                                defaultValue={currentUser?.firma || null}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    '& img': {
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                        p: 1
                                    }
                                }}
                                placeholder={
                                    <Stack alignItems="center" spacing={0.5}>
                                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                                            {isSigned ? 'FIRMA ELECTRÓNICA' : 'PENDIENTE'}
                                        </Typography>
                                    </Stack>
                                }
                            />
                        </Box>
                    </Grid>

                    {/* Columna Derecha - Info */}
                    <Grid item xs={12} md={showFirmarButton ? 6 : 9}>
                        <Stack spacing={0.5}>
                            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1.2 }}>
                                {title}
                            </Typography>

                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                {currentUser?.nombre || 'Pendiente de asignar'}
                            </Typography>

                            <Grid container spacing={1} sx={{ mt: 0.5 }}>
                                {[
                                    { label: 'Especialidad', value: currentUser?.especialidad },
                                    { label: 'Registro', value: currentUser?.registro },
                                    { label: 'Licencia', value: currentUser?.licencia }
                                ].map((item, i) => (
                                    <Grid item key={i}>
                                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', display: 'flex', gap: 0.5 }}>
                                            <Box component="span" sx={{ fontWeight: 600 }}>{item.label}:</Box>
                                            {item.value || '---'}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>

                            <Typography sx={{
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                fontStyle: 'italic',
                                mt: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}>
                                {nameCargo}
                                {isSigned && <CheckCircleIcon sx={{ fontSize: 14, color: 'success.main' }} />}
                            </Typography>
                        </Stack>
                    </Grid>

                    {showFirmarButton && (
                        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                onClick={handleFirmar}
                                startIcon={<EditIcon />}
                                disabled={loading}
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    boxShadow: '0 4px 10px rgba(var(--mui-palette-primary-mainChannel), 0.2)'
                                }}
                            >
                                {loading ? 'Firmando...' : 'Firmar'}
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Card>
        </Box>
    );
};

export const Signatures = () => {
    const { control, getValues } = useFormContext();
    const idIEL = getValues('id');

    const { fields, replace } = useFieldArray({
        control,
        name: "listFirma"
    });

    const CARGOS_DEFAULT = [
        { title: "Realizado por", nameCargo: "Gerente Salud Ocupacional Drummond Ltd", numFirma: 1 },
        { nameCargo: "Ergonomista Drummond Ltd", numFirma: 2 },
        { nameCargo: "Supervisor higiene industrial Drummond Ltd", numFirma: 3 },
        { title: "Asesorado por", nameCargo: "Asesor", numFirma: 4 },
    ];

    async function getData() {
        if (!idIEL) return;
        try {
            const response = await GetIELFirma(idIEL);
            if (response.data.exito) {
                const mappedData = CARGOS_DEFAULT.map((cargo) => {
                    const serverData = response.data.datos.find(d => d.numFirma === cargo.numFirma);
                    return {
                        ...cargo,
                        id: serverData?.id || null,
                        idUsuario: serverData?.idUsuario || null,
                        nombre: serverData?.nombre || null,
                        especialidad: serverData?.especialidad || null,
                        registro: serverData?.registro || null,
                        licencia: serverData?.licencia || null,
                        firma: serverData?.firma || null,
                        firmado: serverData?.firma !== null && serverData?.firma !== undefined
                    };
                });

                replace(mappedData);
            }
        } catch (error) {
            toast.error("Error cargando firmas");
        }
    }

    useEffect(() => {
        getData();
    }, [idIEL, replace]);

    if (!idIEL) {
        return (
            <Alert severity="info" variant="outlined" sx={{ width: '100%', py: 2 }}>
                <AlertTitle sx={{ fontWeight: 'bold' }}>Acción Requerida: Guardar Investigación</AlertTitle>
                Debe guardar primero el registro para poder habilitar la sección de firmas. Este paso es obligatorio ya que se debe digitar toda la información correctamente y dar cierre formal a la investigación para que esta pueda ser revisada y firmada por los responsables correspondientes.
            </Alert>
        );
    }

    return (
        <Grid container spacing={2}>
            {fields.map((field, index) => (
                <Grid item xs={12} key={field.id}>
                    <ComponentSignatures
                        index={index}
                        title={field.title}
                        nameCargo={field.nameCargo}
                        numFirma={field.numFirma}
                        refreshData={getData}
                    />
                </Grid>
            ))}
        </Grid>
    );
};