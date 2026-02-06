import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    AlertTitle,
    alpha,
    Box,
    Button,
    Card,
    CircularProgress,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetComboCompany } from 'api/clients/CompanyClient';
import { DeleteIELMetodoControl, GetIELFirma, GetIELMetodoControl, InsertIELFirma, InsertIELMetodoControl } from 'api/clients/InvestigationClient';
import { GetAllComboAsesorInvestigacion, GetByIdUser } from 'api/clients/UserClient';
import animation from 'assets/img/animation.json';
import { ParamDelete } from 'components/alert/AlertAll';
import { CodCatalogo } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import InputTextEditor from 'components/input/InputTextEditor';
import { UploadBox } from 'components/upload';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
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

export const WorkHistoryDLTD = ({ methods, documento, disabledControl = false }) => {
    return (
        <Grid container spacing={2}>
            {!disabledControl &&
                <>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputDatePicker
                            label="Fecha de ingreso"
                            name="fechaIngreso"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="cargoInicial"
                            label="Cargo inicial"
                            defaultValue=""
                            options={[]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="turno"
                            label="Turno"
                            defaultValue=""
                            options={[]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            name="rotacion"
                            label="Rotación"
                            defaultValue=""
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            name="anios"
                            label="Años"
                            defaultValue=""
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            name="meses"
                            label="Meses"
                            defaultValue=""
                            type="number"
                        />
                    </Grid>
                </>
            }

            <Grid item xs={12}>
                <TableDLTD methods={methods} documento={documento} />
            </Grid>
        </Grid>
    )
}

export const WorkHistoryOtherCompanies = ({ methods, documento, disabledControl = false }) => {
    return (
        <Grid container spacing={2}>
            {!disabledControl &&
                <>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            name="empresa"
                            label="Empresa"
                            defaultValue=""
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            name="cargo"
                            label="Cargo"
                            defaultValue=""
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            name="anios"
                            label="Años"
                            defaultValue=""
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            name="meses"
                            label="Meses"
                            defaultValue=""
                            type="number"
                        />
                    </Grid>
                </>
            }

            <Grid item xs={12}>
                <TableOtherCompanies methods={methods} documento={documento} />
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
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaEstructuracionOrigen"
                    label="Fecha de estructuración de origen"
                    defaultValue={dataModel?.fechaEstructuracionOrigen}
                    disabled={disabledControl}
                    size={matchesXS ? 'small' : 'medium'}
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

const ComponentSignatures = ({ index, title, nameCargo }) => {
    const { setValue, watch } = useFormContext();
    const [lsInvestigacion, setLsInvestigacion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userCache, setUserCache] = useState({});
    const currentUser = watch(`listFirma.${index}`);

    useEffect(() => {
        async function getCombo() {
            const res = await GetAllComboAsesorInvestigacion(false);
            setLsInvestigacion(res.data);
        }
        getCombo();
    }, []);

    const onChangeCombo = async (e) => {
        const idUsuario = e.target.value;
        setValue(`listFirma.${index}.idUsuario`, idUsuario);
        setValue(`listFirma.${index}.cambioRegistro`, true);

        if (!idUsuario) return;

        if (userCache[idUsuario]) {
            fillData(userCache[idUsuario]);
            return;
        }

        try {
            setLoading(true);
            const dataUser = await GetByIdUser(idUsuario);
            if (dataUser.status === 200) {
                const u = dataUser.data;
                setUserCache(prev => ({ ...prev, [idUsuario]: u }));
                fillData(u);
            }
        } catch (error) {
            toast.error("Error cargando usuario");
        } finally {
            setLoading(false);
        }
    };

    const fillData = (u) => {
        setValue(`listFirma.${index}.nombre`, u.nombre);
        setValue(`listFirma.${index}.especialidad`, u.nameEspecialidad);
        setValue(`listFirma.${index}.registro`, u.registroMedico);
        setValue(`listFirma.${index}.licencia`, u.licencia);
        setValue(`listFirma.${index}.firma`, u.firma);
    };

    const handleSaveSingle = async () => {
        try {
            setLoading(true);

            const firmaData = {
                id: currentUser.id,
                idUsuario: currentUser.idUsuario
            };

            const result = await InsertIELFirma(firmaData);
            if (result.data.exito) {
                toast.success("Firma actualizada correctamente");
                setTimeout(() => { setValue(`listFirma.${index}.cambioRegistro`, false); }, 700);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al guardar la firma");
        } finally {
            setTimeout(() => setLoading(false), 700);
        }
    };

    return (
        <Grid container spacing={2} sx={{ position: 'relative', mb: 2 }}>
            <Grid item xs={12} md={4}>
                <Card sx={{
                    position: 'relative',
                    border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.3)}`,
                    minHeight: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {loading && (
                        <Box sx={{ position: 'absolute', zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(2px)' }}>
                            <CircularProgress size={40} />
                        </Box>
                    )}

                    <UploadBox
                        disabled
                        size="100px"
                        name={`listFirma.${index}.firma`}
                        defaultValue={currentUser?.firma || null}
                        placeholder={
                            <Stack alignItems="center" sx={{ color: 'text.disabled' }}>
                                <Box sx={{ alignContent: 'center', width: '150px', height: '150px', marginX: 'auto' }}>
                                    <Lottie animationData={animation} />
                                </Box>
                            </Stack>
                        }
                        sx={{ width: 'auto', height: 'auto', borderRadius: 1.5 }}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <InputSelect
                            name={`listFirma.${index}.idUsuario`}
                            label={title}
                            options={lsInvestigacion}
                            onChange={onChangeCombo}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        {currentUser?.cambioRegistro && (
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveSingle}
                                    startIcon={<SaveIcon />}
                                    disabled={loading}
                                >
                                    Guardar Firma
                                </Button>
                            </AnimateButton>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={0.5}>
                            {loading ? (
                                <><Skeleton width="80%" /><Skeleton width="50%" /><Skeleton width="90%" /><Skeleton width="70%" /></>
                            ) : (
                                <>
                                    <Typography sx={{ fontSize: '0.9rem', textTransform: 'capitalize' }}>
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>Nombre: </Box>
                                        {currentUser?.nombre?.toLowerCase() || '------'}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem', textTransform: 'capitalize' }}>
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>Especialidad: </Box>
                                        {currentUser?.especialidad?.toLowerCase() || '------'}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>Registro y licencia: </Box>
                                        {currentUser?.registro || ''} {currentUser?.licencia || '------'}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem', color: 'primary.main', fontWeight: 'medium' }}>
                                        {nameCargo}
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
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
        { title: "Realizado por", nameCargo: "Ergonomista Drummond Ltd", numFirma: 2 },
        { title: "Realizado por", nameCargo: "Supervisor higiene industrial Drummond Ltd", numFirma: 3 },
        { title: "Asesorado por", nameCargo: "Asesor", numFirma: 4 },
    ];

    useEffect(() => {
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
                            cambioRegistro: false
                        };
                    });
                    replace(mappedData);
                }
            } catch (error) {
                toast.error("Error cargando firmas");
            }
        }
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
        <Grid container spacing={3}>
            {fields.map((field, index) => (
                <Grid item xs={12} key={field.id}>
                    <ComponentSignatures
                        index={index}
                        title={field.title}
                        nameCargo={field.nameCargo}
                    />
                </Grid>
            ))}
        </Grid>
    );
};