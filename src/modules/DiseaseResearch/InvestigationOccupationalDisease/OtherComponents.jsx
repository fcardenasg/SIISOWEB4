import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetComboCompany } from 'api/clients/CompanyClient';
import { GetByIdIELComentario, GetIELMetodoControl, InsertIELComentario, InsertIELMetodoControl } from 'api/clients/InvestigationClient';
import { CodCatalogo } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import InputTextEditor from 'components/input/InputTextEditor';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import {
    TableCharacterizationAbsenteeism,
    TableControlMethods,
    TableDLTD,
    TableDiagnosisRating,
    TableOtherCompanies,
    TablePreventiveActions
} from './components/Table';
import TableDiagnosis from './components/Table/TableDiagnosis';
import TableHealth from './components/Table/TableHealth';

export const CompanyDetails = ({ dataModel, matchesXS }) => {
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
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="razonSocial"
                    label="Razón social"
                    defaultValue={dataModel?.razonSocial}
                    options={lsCompany}
                    size={matchesXS ? 'small' : 'medium'}
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
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="sedeTrabajo"
                    label="Sede de trabajo"
                    defaultValue={dataModel?.sedeTrabajo}
                    options={lsSede}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="departamento"
                    label="Departamento"
                    defaultValue={dataModel?.departamento}
                    options={lsDepartamento}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="area"
                    label="Área"
                    defaultValue={dataModel?.area}
                    options={lsArea}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export const WorkHistoryDLTD = ({ methods, documento }) => {
    return (
        <TableDLTD methods={methods} documento={documento} />
    )
}

{/* <Grid container spacing={2}>
            <Grid item xs={12}>
                <TableDLTD methods={methods} documento={documento} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4">Otros cargos</Typography>
            </Grid>

            <Grid item xs={12}>
                <TableDLTD methods={methods} documento={documento} />
            </Grid>
        </Grid> */}

export const WorkHistoryOtherCompanies = ({ methods, documento }) => {
    return (
        <TableOtherCompanies methods={methods} documento={documento} />
    )
}

export const DataDiagnosisQualificationProcess = ({ dataModel, matchesXS, methods }) => {
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
                <TableDiagnosis methods={methods} />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idGeneroIncapacidad"
                    label="Generó incapacidad"
                    defaultValue={dataModel?.idGeneroIncapacidad}
                    options={lsOpcionesSino}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="diasIncapacidad"
                    label="Días de incapacidad"
                    defaultValue={dataModel?.diasIncapacidad}
                    size={matchesXS ? 'small' : 'medium'}
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
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="numeroFurel"
                    label="FUREL #"
                    defaultValue={dataModel?.numeroFurel}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaFurel"
                    label="Fecha del FUREL"
                    defaultValue={dataModel?.fechaFurel}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaEstructuracionOrigen"
                    label="Fecha de estructuración de origen"
                    defaultValue={dataModel?.fechaEstructuracionOrigen}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12}>
                <TableDiagnosisRating methods={methods} />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idCalificacionPCL"
                    label="Calificación PCL"
                    defaultValue={dataModel?.idCalificacionPCL}
                    options={lsOpcionesSino}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="porcentajePCL"
                    label="% PCL"
                    defaultValue={dataModel?.porcentajePCL}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="instancia"
                    label="Instancia"
                    defaultValue={dataModel?.instancia}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="dictamen"
                    label="Dictamen #"
                    defaultValue={dataModel?.dictamen}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idCalificacionIntegral"
                    label="Calificación integral"
                    defaultValue={dataModel?.idCalificacionIntegral}
                    options={lsOpcionesSino}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={9}>
                <InputText
                    name="otrasPatologias"
                    label="Otras patologías que hacen parte de la calificación de PCL"
                    defaultValue={dataModel?.otrasPatologias}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export const DataExposureCompany = ({ resumenResultadosAnalisisPuesto, resumenValoracionRiesgo }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Resumen de los resultados del análisis del puesto de trabajo" name="resumenResultadosAnalisisPuesto" defaultValue={resumenResultadosAnalisisPuesto} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Resumen de la valoración del riesgo" name="resumenValoracionRiesgo" defaultValue={resumenValoracionRiesgo} />
            </Grid>
        </Grid>
    )
}

export const AvailableControlMethods = () => {
    const theme = useTheme();
    const { idInvestigacion } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [lsMetodoControl, setLsMetodoControl] = useState([]);
    const [lsControl, setLsControl] = useState([]);
    const [lsTipoControl, setLsTipoControl] = useState([]);

    const methods = useForm();
    const { handleSubmit } = methods;

    async function getData() {
        try {
            const result = await GetIELMetodoControl(1);
            if (result.data.exito) {
                if (result.data.datos !== null) {
                    setLsMetodoControl(result.data.datos);
                }
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al obtener los métodos de control");
        }
    }

    useEffect(() => {
        getData();
    }, []);

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
            data.idInvestigacion = parseInt(idInvestigacion);

            const result = await InsertIELMetodoControl(data);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.response.data.mensaje);
        }
    }

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} lg={5}>
                    <InputSelect
                        name="control"
                        label="Control"
                        defaultValue=""
                        options={lsControl}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputSelect
                        name="tipoControl"
                        label="Tipo de control"
                        defaultValue=""
                        options={lsTipoControl}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(handleSave)}
                        size={matchesXS ? 'small' : 'medium'}
                        startIcon={<AddCircleIcon />}
                    >
                        Agregar
                    </Button>
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
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard content={false}>
                        <TableControlMethods listMC={lsMetodoControl} />
                    </SubCard>
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export const ClinicalData = ({ datosClinicos }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Datos clínicos y paraclínicos" name="datosClinicos" defaultValue={datosClinicos} />
            </Grid>
        </Grid>
    )
}

export const Background = ({ personales, otrasEnfermedadesLaborales, familiares }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Personales (enfermedades, cirugías, traumas, farmacológicos)" name="personales" defaultValue={personales} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Otras enfermedades laborales calificadas o en proceso de calificación" name="otrasEnfermedadesLaborales" defaultValue={otrasEnfermedadesLaborales} />
            </Grid>

            <Grid item xs={12}>
                <TableHealth />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Familiares" name="familiares" defaultValue={familiares} />
            </Grid>
        </Grid>
    )
}

export const OtherClinicalData = ({ otrosDatosClinicos }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Otros datos clínicos de interés relacionados con la patología" name="otrosDatosClinicos" defaultValue={otrosDatosClinicos} />
            </Grid>
        </Grid>
    )
}

export const CharacterizationAbsenteeism = () => {
    return (
        <TableCharacterizationAbsenteeism />
    )
}

export const BiographyReview = ({ revisionBibliografia }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Revisión de la bibliografía" name="revisionBibliografia" defaultValue={revisionBibliografia} />
            </Grid>
        </Grid>
    )
}

export const CauseAnalysis = ({ analisisCausas }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Análisis de causas" name="analisisCausas" defaultValue={analisisCausas} />
            </Grid>
        </Grid>
    )
}

export const UnderlyingCauseDetected = ({ causaBasicaDetectada }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Causa básica detectada" name="causaBasicaDetectada" defaultValue={causaBasicaDetectada} />
            </Grid>
        </Grid>
    )
}

export const Conclusion = ({ conclusion, methods, idInvestigation }) => {
    const { user } = useAuth();
    const conclusionForm = methods.watch("conclusion");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Conclusión" name="conclusion" defaultValue={conclusion} />
            </Grid>

            {idInvestigation &&
                <Grid item xs={12} sx={{ mt: 1.5 }}>
                    <CommentSection currentUser={user} conclusion={conclusionForm} idInvestigation={idInvestigation} />
                </Grid>
            }
        </Grid>
    )
}

export const PreventiveActions = ({ methods }) => {
    return (
        <TablePreventiveActions methods={methods} />
    );
}

export const Signatures = () => {
    return (
        <div>Signatures</div>
    )
}

const MotionCommentCard = motion(Card);
const commentVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 10, stiffness: 100 } },
    exit: { opacity: 0, height: 0, padding: 0, transition: { duration: 0.3 } }
};

export const CommentSection = ({ currentUser, conclusion, idInvestigation }) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');

    async function getDataComentario() {
        try {
            const listComentarios = await GetByIdIELComentario(idInvestigation);
            if (listComentarios.data.exito)
                setComments(listComentarios.data.datos);
            else
                toast.error(listComentarios.data.mensaje)
        } catch (error) {
            toast.error("No se pudo traer los comentarios");
        }
    }

    useEffect(() => {
        if (idInvestigation)
            getDataComentario();
    }, [idInvestigation]);

    const handleSubmitComment = async (event) => {
        try {
            event.preventDefault();
            if (!newCommentText.trim()) return;

            const newComment = {
                idInvestigacion: idInvestigation,
                usuarioComento: currentUser?.id,
                color: "#E31937",
                comentario: newCommentText.trim(),
                conclusion
            };

            const result = await InsertIELComentario(newComment);
            if (!result.data.exito) {
                toast.error(result.data.mensaje)
                return;
            }

            getDataComentario();
            setNewCommentText('');
        } catch (error) {
            toast.error("No se pudo realizar el comentario");
        }
    };

    return (
        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fafafa' }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Comentarios {comments.length !== 0 && `(${comments.length})`}
            </Typography>

            <Box component="form" onSubmit={handleSubmitComment} sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>
                    <Typography variant="h4" sx={{ color: "white" }}>{currentUser?.nameuser.charAt(0)}</Typography>
                </Avatar>

                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    minRows={1}
                    maxRows={5}
                    size="small"
                    label="Escribe un comentario..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    sx={{ flexGrow: 1, mr: 1 }}
                />

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<SendIcon />}
                        disabled={!newCommentText.trim()}
                    >
                        Enviar
                    </Button>
                </motion.div>
            </Box>

            <AnimatePresence initial={false}>
                {comments.map((comment) => (
                    <MotionCommentCard
                        key={comment.id}
                        variants={commentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                        sx={{ mb: 2, boxShadow: 1, borderLeft: `4px solid ${comment.color}` }}
                    >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: comment.color }}>
                                    <Typography variant="h4" sx={{ color: "white" }} >{comment?.usuarioRegistro.charAt(0)}</Typography>
                                </Avatar>

                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
                                    {comment.nameUsuarioComento}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    • {comment.fechaRegistro}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ ml: 4.5 }}>
                                {comment.comentario}
                            </Typography>
                        </CardContent>
                    </MotionCommentCard>
                ))}
            </AnimatePresence>
        </Box>
    );
}