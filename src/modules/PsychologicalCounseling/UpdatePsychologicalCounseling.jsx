import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { PutMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import { GetByIdAdvice, SaveAdvice } from 'api/clients/AdviceClient';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { generateReportPsycho } from '../Programming/Attention/Report/Psychological';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import Cargando from 'components/loading/Cargando';
import InputCheck from 'components/input/InputCheck';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdatePsychologicalCounseling = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');
    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);

    const [openReport, setOpenReport] = useState(false);
    const [extenderDescripcion, setExtenderDescripcion] = useState(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [estadoAsesoria, setEstadoAsesoria] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [causaAsesoria, setCausaAsesoria] = useState([]);

    const [lsPsychologicalCounseling, setLsPsychologicalCounseling] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAdvice(id);
            if (lsServerAtencion.status === 200) {
                setLsPsychologicalCounseling(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);
                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);
            }

            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.MotivoPsicologia);
            setLsMotivo(lsServerMotivo.data);

            const lsServerEstadoCaso = await GetByTipoCatalogoCombo(CodCatalogo.EstadoCaso);
            setLsEstadoCaso(lsServerEstadoCaso.data);

            const lsServerTipoAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.ASME_TIPOASESORIA);
            setTipoAsesoria(lsServerTipoAsesoria.data);

            const lsServerEstadoAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.ESTADO_CASO);
            setEstadoAsesoria(lsServerEstadoAsesoria.data);

            const lsServerCausaAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.CausaAsesoria);
            setCausaAsesoria(lsServerCausaAsesoria.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const methods = useForm();
    const { handleSubmit } = methods;

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

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAdvice(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReportPsycho(lsDataReport.data, lsDataUser.data, extenderDescripcion);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutMedicalAdvice(id, documento, FormatDate(datos.fecha), lsPsychologicalCounseling.idRegistroAtencion, DefaultData.AsesoriaPsicologica, lsEmployee.sede,
                undefined, datos.idEstadoCaso, undefined, undefined, datos.idTipoAsesoria, datos.idMotivo, undefined, datos.idCausa, datos.motivoConsulta,
                datos.concepto, datos.pautasSeguir, datos.idEstadoAsesoria, undefined, undefined, user.nameuser, undefined);

            const result = await SaveAdvice(DataToUpdate);
            if (result.status === 200) {
                if (result.data === Message.ErrorDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                } else if (result.data === Message.NoExisteDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.NoExisteDocumento);
                } else if (!isNaN(result.data)) {
                    setOpenUpdate(true);
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsPsychologicalCounseling.length !== 0)
            setTimeWait(true);
    }, 1500);

    return (
        <Fragment>
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openApuntesPersonales}
                title="APUNTES PERSONALES"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
            </FullScreenDialog>

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

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
                            title="Actualizar Asesoría Psicológica"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Registrar La Atención</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsPsychologicalCounseling.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={lsPsychologicalCounseling.idEstadoCaso}
                                            name="idEstadoCaso"
                                            label="Estado del Caso"
                                            options={lsEstadoCaso}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={lsPsychologicalCounseling.idMotivo}
                                            name="idMotivo"
                                            label="Motivo"
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={lsPsychologicalCounseling.idCausa}
                                            name="idCausa"
                                            label="Causa de Asesoría"
                                            options={causaAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={lsPsychologicalCounseling.idTipoAsesoria}
                                            name="idTipoAsesoria"
                                            label="Tipo Asesoría"
                                            options={tipoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsPsychologicalCounseling.motivo}
                                            name="motivoConsulta"
                                            label="Motivo de consulta"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsPsychologicalCounseling.recomendaciones}
                                            name="concepto"
                                            label="Concepto"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <Grid item xs={2}>
                                        <InputCheck
                                            onChange={(e) => setExtenderDescripcion(e.target.checked)}
                                            checked={extenderDescripcion}
                                            label="Extender Reporte"
                                            name="extenderDescripcion"
                                            size={30}
                                            defaultValue={false}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsPsychologicalCounseling.pautas}
                                            name="pautasSeguir"
                                            label="Pautas a Seguir"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idEstadoAsesoria"
                                            label="Estado"
                                            defaultValue={lsPsychologicalCounseling.idEstadoAsesoria}
                                            options={estadoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={handleClickReport}>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/psychologicalcounseling/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
                : <Cargando />
            }
        </Fragment>
    );
};

export default UpdatePsychologicalCounseling;