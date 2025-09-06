import {
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { ParamCloseCase } from 'components/alert/AlertAll';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { GetByIdAttention, UpdateEstadoRegistroAtencion, ValidateIdRegistroAtencion } from 'api/clients/AttentionClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdNoteInfirmary, InsertNoteInfirmary, UpdateNoteInfirmarys } from 'api/clients/NoteInfirmaryClient';
import { GetByMail } from 'api/clients/UserClient';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { CodCatalogo, CodRegistroAtencion, DefaultValue, Message, TitleButton } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { PutNoteInfirmary } from 'formatdata/NoteInfirmaryForm';
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { generateReportNursing } from './Report/Nursing';
import InputRadioGroup from 'components/input/InputRadioGroup';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';

const lsReglejoCoordinacion = [];
const lsConvergencia = [];
const lsOpcionRealiza = [];

const arrayAliento = [
    { value: 1, label: "Negativo" },
    { value: 2, label: "Discreto" },
    { value: 3, label: "Evidente" },
    { value: 4, label: "Dudoso" }
]

const arrayEstadoConciencia = [
    { value: 1, label: "Alerta" },
    { value: 2, label: "Hiperalerta" },
    { value: 3, label: "Somnoliento" },
    { value: 4, label: "Estuporoso" },
    { value: 5, label: "Comatoso" },
    { value: 6, label: "Obnubilado" },
    { value: 7, label: "Confuso" }
]

const arrayOrientacion = [
    { value: 1, label: "Normal" },
    { value: 2, label: "Aumentada" },
    { value: 3, label: "Disminuida" },
    { value: 4, label: "Dispersa" }
]

const arrayFlujoLenguaje = [
    { value: 1, label: "Normal" },
    { value: 2, label: "Aumentado (taquialia o logorrea)" },
    { value: 3, label: "Disminuido (bradilalia)" }
]

const arrayDisartria = [
    { value: 1, label: "Negativa" },
    { value: 2, label: "Discreta" },
    { value: 3, label: "Evidente" }
]

const arrayOpcion = [
    { value: 1, label: "Si" },
    { value: 2, label: "No" }
]

const arrayPupila = [
    { value: 1, label: "Isocóricas mióticas" },
    { value: 2, label: "Isocóricas midriáticas" },
    { value: 3, label: "Anisocóricas" }
]

const arrayReflejo = [
    { value: 1, label: "Normal" },
    { value: 2, label: "Alterado" },
    { value: 3, label: "No se realizan" },
]

const arrayReflejoOsteotendinosos = [
    { value: 1, label: "Hiporreflexia" },
    { value: 2, label: "Hiperreflexia" },
    { value: 3, label: "Normoreflexia" }
]

const arrayCuandoPositivo = [
    { value: 1, label: "Leve" },
    { value: 2, label: "Evidente" },
    { value: 3, label: "Horizontal" },
    { value: 4, label: "Vertical" }
]

const arrayDeterminacion = [
    { value: 1, label: "No se realiza" },
    { value: 2, label: "Sí se realiza" }
]

const UpdateHistoryDrunkenness = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [lsAtencion, setLsAtencion] = useState(null);
    const [resultIdRegistroAtencion, setResultIdRegistroAtencion] = useState(false);

    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [documento, setDocumento] = useState('');
    const [openTemplate, setOpenTemplate] = useState(false);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsAliento, setLsAliento] = useState([]);
    const [lsEstadoConciencia, setLsEstadoConciencia] = useState([]);
    const [lsResultAtencion, setLsResultAtencion] = useState([]);
    const [lsFlujoLen, setLsFlujoLen] = useState([]);
    const [lsOpcion, setLsOpcion] = useState([]);
    const [lsDisatria, setLsDisatria] = useState([]);
    const [lsPupila, setLsPupila] = useState([]);
    const [lsOtrasOpciones, setLsOtrasOpciones] = useState([]);
    const [lsOpcionesAusenPrese, setLsOpcionesAusenPrese] = useState([]);
    const [lsReflejoOsteo, setLsReflejoOsteo] = useState([]);
    const [lsResultEvaluacion, setLsResultEvaluacion] = useState([]);
    const [lsDeterminacion, setLsDeterminacion] = useState([]);
    const [lsResultPosNeg, setLsResultPosNeg] = useState([]);

    const [resultData, setResultData] = useState(0);
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm();

    const { handleSubmit } = methods;

    //Metodo Imprimir
    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdNoteInfirmary(resultData);
            const lsDataUser = await GetByMail(user?.nameuser);

            const dataPDFTwo = generateReportNursing(lsDataReport.data, lsDataUser.data, user?.namesede);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleUpdateAttentionClose = async (estadoPac) => {
        try {
            const DataToUpdate = {
                id: id,
                estadoPac: estadoPac,
                usuario: estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO ? '' : user?.nameuser
            }

            if (estadoPac === DefaultValue.ATENCION_ATENDIDO) {
                swal(ParamCloseCase).then(async (willDelete) => {
                    if (willDelete) {
                        await UpdateEstadoRegistroAtencion(DataToUpdate);
                        navigate('/programming/list');
                    }
                });
            } else if (estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO) {
                await UpdateEstadoRegistroAtencion(DataToUpdate);
                navigate('/programming/list');
            }
        } catch (error) { }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                setOpenError(true);
                setErrorMessage(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setLsAtencion(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);

                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);
            }

            const lsServerAliento = await GetByTipoCatalogoCombo(CodCatalogo.ALIENTOALCOHOLICO);
            setLsAliento(lsServerAliento.data);

            const lsServerResultPosNeg = await GetByTipoCatalogoCombo(CodCatalogo.PAD_RESULTADO);
            setLsResultPosNeg(lsServerResultPosNeg.data.sort((a, b) => b.value - a.value));

            const lsServerEstadoConciencia = await GetByTipoCatalogoCombo(CodCatalogo.ESTADOCONCIENCIA);
            setLsEstadoConciencia(lsServerEstadoConciencia.data);

            const lsServerResultAtencion = await GetByTipoCatalogoCombo(CodCatalogo.ATENCION);
            setLsResultAtencion(lsServerResultAtencion.data);

            const lsServerFlujoLen = await GetByTipoCatalogoCombo(CodCatalogo.FLUJOLENGUAJE);
            setLsFlujoLen(lsServerFlujoLen.data);

            const lsServerDisatria = await GetByTipoCatalogoCombo(CodCatalogo.DISARTRIA);
            setLsDisatria(lsServerDisatria.data);

            const lsServerOpcion = await GetByTipoCatalogoCombo(CodCatalogo.Opciones_SINO);
            setLsOpcion(lsServerOpcion.data);

            const lsServerPupila = await GetByTipoCatalogoCombo(CodCatalogo.PUPILA);
            setLsPupila(lsServerPupila.data);

            const lsServerOtrasOpciones = await GetByTipoCatalogoCombo(CodCatalogo.OTRASOPCIONES);
            setLsOtrasOpciones(lsServerOtrasOpciones.data.sort((a, b) => a.value - b.value));

            const lsServerReflejoOsteo = await GetByTipoCatalogoCombo(CodCatalogo.REFLEJOSOSTEOTENDINOSOS);
            setLsReflejoOsteo(lsServerReflejoOsteo.data);

            const lsServerOpcionesAusenPrese = await GetByTipoCatalogoCombo(CodCatalogo.OPCIONESAUSENTEPRESENTE);
            setLsOpcionesAusenPrese(lsServerOpcionesAusenPrese.data);

            const lsServerResultEvaluacion = await GetByTipoCatalogoCombo(CodCatalogo.CUANDOPOSITIVO);
            setLsResultEvaluacion(lsServerResultEvaluacion.data);

            const lsServerDeterminacion = await GetByTipoCatalogoCombo(CodCatalogo.DETERMINACION);
            setLsDeterminacion(lsServerDeterminacion.data);

            const lsServerCiudad = await GetByTipoCatalogoCombo(CodCatalogo.CIUDADES);
            setLsCiudad(lsServerCiudad.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {

        } catch (error) {

        }
    };

    setTimeout(() => {
        if (lsAtencion !== null)
            setTimeWait(true);
    }, 1500);

    return (
        <FormProvider {...methods}>
            <MessageSuccess open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="Dictado por voz"
            >
                <ControllerListen />
            </ControlModal>

            <FullScreenDialog
                open={openTemplate}
                title="Listado de plantilla"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openApuntesPersonales}
                title="Apuntes personales"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
            </FullScreenDialog>

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Historia de embriaguez"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StickyActionBar
                            onClickSave={handleSubmit(handleClick)}
                            onClickUpdate={handleSubmit(handleClick)}
                            disabledUpdate={!resultIdRegistroAtencion}
                            disabledSave={resultIdRegistroAtencion}
                            showButton={false}
                            threshold={510}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Información general">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="infoGeneIntitutoRealizaExamen"
                                                    label="Institución donde se realiza el examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputSelectAutocomplete
                                                    name="infoGeneCiudadExamen"
                                                    label="Ciudad del examen"
                                                    options={lsCiudad}
                                                    defaultValue={null}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    label="Fecha del examen"
                                                    name="infoGeneFechaExamen"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="infoGeneHoraExamen"
                                                    label="Hora del examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="infoGeneNumRadicacion"
                                                    label="No. de radicación"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="infoGenesolicitante"
                                                    label="Solicitante"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    label="Fecha oficio petitorio"
                                                    name="infoGeneFechaOficioPetitorio"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="infoGeneNoticiaCriminal"
                                                    label="NUNC (Noticia criminal)"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Consentimiento informado">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: Explicar brevemente en qué consiste la valoración forense incluyendo todos los procedimientos relacionados, así como su importancia dentro de la investigación. Registre en el espacio de <b>Observaciones</b> la constancia sobre el Consentimiento Informado; también cuando sea el caso, el nombre de cualquier persona diferente al personal forense o de salud presente durante el examen; entre otros.</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="conseInforObservaciones"
                                                    label="Observaciones"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Datos del defensor(a) presente:">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" align="justify" fontSize={12}>Nota: Solo si la persona por examinar es el imputado dentro de una investigación o proceso penal.</Typography>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="conseInforNombreDefensor"
                                                                label="Nombre completo del defensor(a)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="conseInforTarjetaProfesional"
                                                                label="Tarjeta profesional"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="conseInforFirmaDefensor"
                                                                label="Firma del defensor(a)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Resumen de la información disponible">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    label="Fecha del hecho investigado"
                                                    name="resInfoDispoFechaInvestigado"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="resInfoDispoHoraExamen"
                                                    label="Hora del examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: (Hechos que generaron la solicitud del examen, actividades desarrolladas durante las horas inmediatamente anteriores a tales hechos, traumas físicos sufridos durante el evento, síntomas referidos, atención médica recibida, entre otros).</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="resInfoDispoRelatoHechos"
                                                    label="Relato de los hechos y circunstancias relacionadas"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: (Haga una breve referencia de los documentos aportados con el caso y extraiga de los mismos lo pertinente, como la historia clínica, resultados de exámenes paraclínicos, documentos remitidos por la autoridad u otros).</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="resInfoDispoInformacionAdicional"
                                                    label="Información adicional al comenzar el examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="resInfoDispoRevisionSistemas"
                                                    label="Revisión por sistemas"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: (Registre aquí los antecedentes toxicológicos y farmacológicos, médico legales –valoraciones previas–, patológicos, psiquiátricos o psicológicos, quirúrgicos, traumáticos, hospitalarios, alérgicos, gineco-obstétricos, sociales y familiares).</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="resInfoDispoAntecedentes"
                                                    label="Antecedentes"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Examen clínico forense">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={2}
                                                    multiline
                                                    defaultValue=""
                                                    name="exaCliForeConductaMotriz"
                                                    label="Presentación, porte, actitud, conducta motriz"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Olores asociados">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeOlorAlientoAlcoholico"
                                                                label="Aliento alcohólico:"
                                                                defaultValue={null}
                                                                options={lsAliento}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="exaCliForeOlorOtros"
                                                                label="Otros (describalos)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Sensorio">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeSensoEstadoConciencia"
                                                                label="Estado de conciencia:"
                                                                defaultValue={null}
                                                                options={lsEstadoConciencia}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSensoOrientacion"
                                                                label="Orientación"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeSensoAtencion"
                                                                label="Atención:"
                                                                defaultValue={null}
                                                                options={lsResultAtencion}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSensoMemoria"
                                                                label="Memoria"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: (Tipo de afecto, modulación, congruencia, adecuado o inadecuado en relación con las circunstancias).</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={2}
                                                    multiline
                                                    defaultValue=""
                                                    name="exaCliForeAfecto"
                                                    label="Afecto"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Lenguaje">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeLengFlujoLenguaje"
                                                                label="Flujo del lenguaje:"
                                                                defaultValue={null}
                                                                options={lsFlujoLen}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeLengDisartria"
                                                                label="Disartria:"
                                                                defaultValue={null}
                                                                options={lsDisatria}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="exaCliForeLengOtrasAlteraciones"
                                                                label="Otras alteraciones (describalas)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={2}
                                                    multiline
                                                    defaultValue=""
                                                    name="exaCliForeAlteracionesPensamiento"
                                                    label="Alteraciones del pensamiento, sensopercepción, inteligencia, juicio, racioncinio e introspección (describalas):"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Signos vitales y otros">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoFrecuenciaCardiaca"
                                                                label="Frecuencia cardíaca (En lpm)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoFrecuenciaRespiratoria"
                                                                label="Frecuencia respiratoria"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoPresionArterial"
                                                                label="Presión arterial"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoTemperatura"
                                                                label="Temperatura (En °C)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}><Divider /></Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoTalla"
                                                                label="Talla (En cm)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoPeso"
                                                                label="Peso (En KG)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="exaCliForeSignoPielMucosas"
                                                                label="Piel y mucosas"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Ojos">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="exaCliForeOjoCongestionConjuntival"
                                                                label="Congestión conjuntival"
                                                                options={lsOpcion}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="exaCliForeOjoPupilas"
                                                                label="Pupilas"
                                                                options={lsPupila}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="exaCliForeOjoReflejoFomotomor"
                                                                label="Reflejo fomotomor"
                                                                options={lsOtrasOpciones}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="exaCliForeOjoReflejoConsensual"
                                                                label="Reflejo consensual"
                                                                options={lsOtrasOpciones}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="exaCliForeOjoConvergenciaOcular"
                                                                label="Convergencia ocular"
                                                                options={lsOtrasOpciones}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="exaCliForeOjoReflejoOsteotendinosos"
                                                                label="Reflejos osteotendinosos"
                                                                options={lsReflejoOsteo}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Coordinación motora, equilibrio y marcha">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeCoordinaPruebasMoviento"
                                                                label="Pruebas de movimiento punto a punto (dedo-nariz, dedo-dedo):"
                                                                defaultValue={null}
                                                                options={lsOtrasOpciones}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="exaCliForeCoordinaTestMovimiento"
                                                                label="Test de movimientos rápidos alternos:"
                                                                defaultValue={null}
                                                                options={lsOtrasOpciones}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="exaCliForeCoordinaPruebaRomberg"
                                                                label="Prueba de Romberg:"
                                                                defaultValue={null}
                                                                options={lsOtrasOpciones}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="exaCliForeCoordinaPruebaMarca"
                                                                label="Prueba de marcha en tandem (punta-talón):"
                                                                defaultValue={null}
                                                                options={lsOtrasOpciones}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="exaCliForeCoordinaPruebaMarcha"
                                                                label="Prueba de marcha en las puntas de los pies y en los talones:"
                                                                defaultValue={null}
                                                                options={lsOtrasOpciones}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="exaCliForeCoordinaObservaciones"
                                                                label="Observaciones"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Evaluación de nistagmus">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputRadioGroup
                                                                name="exaCliForeEvalNistagmusEspontaneo"
                                                                label="Nistagmus espontáneo:"
                                                                defaultValue={null}
                                                                options={lsOpcionesAusenPrese}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={2}>
                                                            <InputSelect
                                                                name="exaCliForeEvalResultadoNistagmusEspontaneo"
                                                                label="Resultado"
                                                                options={lsResultEvaluacion}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputRadioGroup
                                                                name="exaCliForeEvalPruebaNistagmusMirada"
                                                                label="Prueba de nistagmus a mirada extrema:"
                                                                defaultValue={null}
                                                                options={lsResultPosNeg}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={2}>
                                                            <InputSelect
                                                                name="exaCliForeEvalResultadoPruebaNistagmusMirada"
                                                                label="Resultado"
                                                                options={lsResultEvaluacion}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputRadioGroup
                                                                name="exaCliForeEvalPruebaNistagmusPostRocional"
                                                                label="Prueba de nistagmus post-rotacional:"
                                                                defaultValue={null}
                                                                options={lsResultPosNeg}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={2}>
                                                            <InputSelect
                                                                name="exaCliForeEvalResultadoPruebaNistagmusPostRocional"
                                                                label="Resultado"
                                                                options={lsResultEvaluacion}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="exaCliForeEvalObservaciones"
                                                                label="Observaciones"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="exaCliForeEvalPruebaRomberg"
                                                                label="Prueba de Romberg:"
                                                                defaultValue={null}
                                                                options={lsOtrasOpciones}
                                                                row={true}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Muestras y elementos para estudio">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: Mencione aquí si recolecta muestras para estudio toxicológico. Asegúrese de diligenciar adecuadamente los formatos de cadena de custodia de las muestras recolectadas.</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputRadioGroup
                                                    name="muestraEstudioDeterminacion"
                                                    label="Determinación de alcoholemia indirecta mediante alcohosensor:"
                                                    defaultValue={null}
                                                    options={lsDeterminacion}
                                                    row={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioResultado"
                                                    label="Resultados"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioRegistrosAdjuntos"
                                                    label="Registros adjuntos"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={2}
                                                    multiline
                                                    defaultValue=""
                                                    name="muestraEstudioObservaciones"
                                                    label="Observaciones"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}><Divider /></Grid>

                                            <Grid item xs={12} md={6} lg={2}>
                                                <InputRadioGroup
                                                    name="muestraEstudioSangre"
                                                    label="Muestra de sangre:"
                                                    defaultValue={null}
                                                    options={lsOpcion}
                                                    row={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={5}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioSangreAnalisisSolicitado"
                                                    label="Análisis solicitado"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={5}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioSangreDestino"
                                                    label="Destino"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={2}>
                                                <InputRadioGroup
                                                    name="muestraEstudioOrina"
                                                    label="Muestra de orina:"
                                                    defaultValue={null}
                                                    options={lsOpcion}
                                                    row={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={5}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioOrinaAnalisisSolicitado"
                                                    label="Análisis solicitado"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={5}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioOrinaDestino"
                                                    label="Destino"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={2}>
                                                <InputRadioGroup
                                                    name="muestraEstudioSaliva"
                                                    label="Muestra de saliva:"
                                                    defaultValue={null}
                                                    options={lsOpcion}
                                                    row={true}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={5}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioSalivaAnalisisSolicitado"
                                                    label="Análisis solicitado"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={5}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="muestraEstudioSalivaDestino"
                                                    label="Destino"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Análisis, interpretación y conclusiones">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: Integre la información obtenida, incluyendo los hallazgos relevantes para el caso específico</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="analiInformacionObtenida"
                                                    label="Información obtenida"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={handleClickReport}>
                                                    {TitleButton.Imprimir}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_PENDIENTE_ATENDIDO)}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_ATENDIDO)}>
                                                    {TitleButton.CerrarCaso}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </StickyActionBar>
                    </Grid>
                </Grid> : <Cargando />
            }
        </FormProvider>
    );
};

export default UpdateHistoryDrunkenness;