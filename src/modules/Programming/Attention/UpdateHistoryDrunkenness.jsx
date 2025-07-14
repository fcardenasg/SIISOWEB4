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
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
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

const UpdateHistoryDrunkenness = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsAtencionn, setLsAtencionn] = useState([]);
    const [dataNotaEnfermeria, setDataNotaEnfermeria] = useState([]);
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
    const [procedimiento, setProcedimiento] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsProcedimiento, setLsProcedimiento] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);

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

    const handleAtencion = async (sede, tipoAtencion) => {
        if (sede === DefaultValue.SEDE_PUERTO && tipoAtencion === DefaultValue.TIPO_ATENCION_ENFERMERIA) {

            var resultMapsTipoAM = [];
            var resultMapsTipoAE = [];
            /* AQUÍ SE CARGAN LAS ATENCIONES MÉDICAS */
            var lsGetTipoAtencionMedica = await GetAllBySubTipoCatalogo(0, 0, 'SER01', 5);
            if (lsGetTipoAtencionMedica.status === 200) {
                resultMapsTipoAM = lsGetTipoAtencionMedica.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
            }

            /* AQUÍ SE CARGAN LAS ATENCIONES DE ENFERMERIA */
            const lsServerAtencionn = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA);
            if (lsServerAtencionn.status === 200) {
                resultMapsTipoAE = lsServerAtencionn.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
            }

            const arrayAtencion = resultMapsTipoAE.concat(resultMapsTipoAM);
            setLsAtencionn(arrayAtencion);

        } else {
            const lsServerAtencionn = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA);
            if (lsServerAtencionn.status === 200) {
                var resultAtencionn = lsServerAtencionn.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsAtencionn(resultAtencionn);
            }
        }
    }

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setLsAtencion(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);
                handleAtencion(lsServerAtencion.data.sede, lsServerAtencion.data.tipo);

                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);
            }

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerProcedimiento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PROCEDIMIENTO_ENFERMERIA);
            var resultProcedimiento = lsServerProcedimiento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsProcedimiento(resultProcedimiento);

            const lsServerData = await ValidateIdRegistroAtencion(id, CodRegistroAtencion.NotaEnfermeria);
            if (lsServerData.status === 200) {
                setDataNotaEnfermeria(lsServerData.data.entities);
                setResultIdRegistroAtencion(lsServerData.data.estado);
                setResultData(lsServerData.data.entities.id);
                setProcedimiento(JSON.parse(lsServerData.data.entities.procedimientos));
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const UpdateToInsert = PutNoteInfirmary(resultData, id, documento, datos.fecha, datos.idAtencion, datos.idContingencia, datos.dx1,
                datos.dx2, datos.dx3, JSON.stringify(procedimiento), datos.notaEnfermedad, user?.nameuser, undefined, user?.nameuser, undefined, procedimiento);

            if (resultIdRegistroAtencion) {
                const result1 = await UpdateNoteInfirmarys(UpdateToInsert);
                if (result1.status === 200) {
                    setOpenUpdate(true);
                    const lsServerValidate = await ValidateIdRegistroAtencion(id, CodRegistroAtencion.NotaEnfermeria)
                    if (lsServerValidate.status === 200) {
                        setResultIdRegistroAtencion(lsServerValidate.data.estado);
                    }
                }
            } else {
                const result2 = await InsertNoteInfirmary(UpdateToInsert);
                if (result2.status === 200) {
                    setResultData(result2.data);
                    setOpenUpdate(true);

                    const lsServerValidate = await ValidateIdRegistroAtencion(id, CodRegistroAtencion.NotaEnfermeria)
                    if (lsServerValidate.status === 200) {
                        setResultIdRegistroAtencion(lsServerValidate.data.estado);
                    }
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsAtencion.length !== 0)
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
                                                <InputSelect
                                                    name="idInstitucionDondeExamen"
                                                    label="Institución donde se realiza el examen"
                                                    defaultValue={lsAtencion?.atencion}
                                                    options={lsAtencionn}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputSelect
                                                    name="idCiudadExamen"
                                                    label="Ciudad del examen"
                                                    defaultValue={lsAtencion?.atencion}
                                                    options={lsAtencionn}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    label="Fecha del examen"
                                                    name="fechaExamen"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="horaExamen"
                                                    label="Hora del examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="noRadicacion"
                                                    label="No. de radicación"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="solicitante"
                                                    label="Solicitante"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    label="Fecha oficio petitorio"
                                                    name="fechaOficioPetitorio"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="noticiaCriminal"
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
                                                <Typography variant="caption" align="justify" fontSize={12}>Explicar brevemente en qué consiste la valoración forense incluyendo todos los procedimientos relacionados, así como su importancia dentro de la investigación. Registre en el espacio de <b>Observaciones</b> la constancia sobre el Consentimiento Informado; también cuando sea el caso, el nombre de cualquier persona diferente al personal forense o de salud presente durante el examen; entre otros.</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    defaultValue=""
                                                    name="observaciones"
                                                    label="Observaciones"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Datos del defensor(a) presente:">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" align="justify" fontSize={12}>Solo si la persona por examinar es el imputado dentro de una investigación o proceso penal.</Typography>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="nombreDefensor"
                                                                label="Nombre completo del defensor(a)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="tarjetaProfesional"
                                                                label="Tarjeta profesional"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="firmaDefensor"
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
                                                    name="fechaInvestigado"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    fullWidth
                                                    defaultValue=""
                                                    name="horaExamen"
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
                                                    name="relatoHechosCircunstanciaRelacionada"
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
                                                    name="relatoHechosCircunstanciaRelacionada"
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
                                                    name="relatoHechosCircunstanciaRelacionada"
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
                                                    name="antecedentes"
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
                                                    name="conductamotriz"
                                                    label="Presentación, porte, actitud, conducta motriz"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Olores asociados">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="alientoalcoholico"
                                                                label="Aliento alcohólico:"
                                                                defaultValue={null}
                                                                options={arrayAliento}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="otrosoleros"
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
                                                                name="estadoconciencia"
                                                                label="Estado de conciencia:"
                                                                defaultValue={null}
                                                                options={arrayEstadoConciencia}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="orientacion"
                                                                label="Orientación"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="orientacion"
                                                                label="Orientación:"
                                                                defaultValue={null}
                                                                options={arrayOrientacion}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="memoria"
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
                                                    name="afecto"
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
                                                                name="flujolenguaje"
                                                                label="Flujo del lenguaje:"
                                                                defaultValue={null}
                                                                options={arrayFlujoLenguaje}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="disartria"
                                                                label="Disartria:"
                                                                defaultValue={null}
                                                                options={arrayDisartria}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="otrasalteraciones"
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
                                                    name="alteracionespensamiento"
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
                                                                name="frecuenciacardiaca"
                                                                label="Frecuencia cardíaca (En lpm)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="frecuenciarespiratoria"
                                                                label="Frecuencia respiratoria"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="presionarterial"
                                                                label="Presión arterial"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="temperatura"
                                                                label="Temperatura (En °C)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}><Divider /></Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="talla"
                                                                label="Talla (En cm)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={3}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="peso"
                                                                label="Peso (En KG)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                defaultValue=""
                                                                name="pielmucosas"
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
                                                                name="congestionconjuntival"
                                                                label="Congestión conjuntival"
                                                                options={arrayOpcion}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="congestionconjuntival"
                                                                label="Pupilas"
                                                                options={arrayPupila}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="congestionconjuntival"
                                                                label="Reflejo fomotomor"
                                                                options={arrayReflejo}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="congestionconjuntival"
                                                                label="Reflejo consensual"
                                                                options={arrayReflejo}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="convergenciaocular"
                                                                label="Convergencia ocular"
                                                                options={arrayReflejo}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputSelect
                                                                name="convergenciaocular"
                                                                label="Reflejos osteotendinosos"
                                                                options={arrayReflejoOsteotendinosos}
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
                                                                name="pruebasmoviento"
                                                                label="Pruebas de movimiento punto a punto (dedo-nariz, dedo-dedo):"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="pruebasmoviento"
                                                                label="Test de movimientos rápidos alternos:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="pruebasmoviento"
                                                                label="Prueba de Romberg:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="pruebasmoviento"
                                                                label="Prueba de marcha en tandem (punta-talón):"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputRadioGroup
                                                                name="pruebasmoviento"
                                                                label="Prueba de marcha en las puntas de los pies y en los talones:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="alteracionespensamiento"
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
                                                                name="pruebasmoviento"
                                                                label="Nistagmus espontáneo:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={2}>
                                                            <InputSelect
                                                                name="convergenciaocular"
                                                                label="Resultado"
                                                                options={arrayReflejoOsteotendinosos}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputRadioGroup
                                                                name="pruebasmoviento"
                                                                label="Prueba de nistagmus a mirada extrema:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={2}>
                                                            <InputSelect
                                                                name="convergenciaocular"
                                                                label="Resultado"
                                                                options={arrayReflejoOsteotendinosos}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputRadioGroup
                                                                name="pruebasmoviento"
                                                                label="Prueba de nistagmus post-rotacional:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={2}>
                                                            <InputSelect
                                                                name="convergenciaocular"
                                                                label="Resultado"
                                                                options={arrayReflejoOsteotendinosos}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputText
                                                                fullWidth
                                                                rows={2}
                                                                multiline
                                                                defaultValue=""
                                                                name="alteracionespensamiento"
                                                                label="Observaciones"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <InputRadioGroup
                                                                name="pruebaromberg"
                                                                label="Prueba de Romberg:"
                                                                defaultValue={null}
                                                                options={arrayReflejo}
                                                                row={true}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
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