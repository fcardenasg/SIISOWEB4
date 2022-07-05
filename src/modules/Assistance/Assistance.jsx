import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import InputDatePicker from 'components/input/InputDatePicker';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { FormatDate } from 'components/helpers/Format'
import InputMultiSelects from 'components/input/InputMultiSelects';
import InputText from 'components/input/InputText';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PostAssistance } from 'formatdata/AssistanceForm';
import { InsertMedicalHistory } from 'api/clients/MedicalHistoryClient';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },
]

const Assistance = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [buttonReport, setButtonReport] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openExamenParaclinico, setOpenExamenParaclinico] = useState(false);
    const [openExamenFisico, setOpenExamenFisico] = useState(false);
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsCie11, setLsCie11] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsDiaTurno, setLsDiaTurno] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
    }

    async function GetAll() {
        try {
            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

            const lsServerAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION);
            var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAtencion(resultAtencion);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Turno);
            var resultTurno = lsServerTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTurno(resultTurno);

            const lsServerDiaTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DiaTurno);
            var resultDiaTurno = lsServerDiaTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDiaTurno(resultDiaTurno);

            const lsServerRemitido = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultRemitido = lsServerRemitido.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRemitido(resultRemitido);

            const lsServerConceptoAptitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_CONCEP_ACTITUD);
            var resultConceptoAptitud = lsServerConceptoAptitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoAptitud(resultConceptoAptitud);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostAssistance(documento, FormatDate(datos.fecha), datos.idAtencion, datos.idContingencia, datos.idTurno, datos.idDiaTurno,
                datos.motivoConsulta, datos.enfermedadActual, datos.antecedentes, datos.revisionSistema, datos.examenFisico, datos.examenParaclinico,
                JSON.stringify(diagnosticoArray), datos.planManejo, datos.idConceptoActitud, DefaultValue.SINREGISTRO_GLOBAL, user.email, FormatDate(new Date()), '',
                FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicalHistory(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    setDiagnosticoArray([]);
                    reset();
                    setButtonReport(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openExamenFisico}
                title="VISTA DE EXAMEN FÍSICO"
                handleClose={() => setOpenExamenFisico(false)}
            >

            </FullScreenDialog>

            <FullScreenDialog
                open={openExamenParaclinico}
                title="VISTA DE EXAMEN PARACLÍNICO"
                handleClose={() => setOpenExamenParaclinico(false)}
            >

            </FullScreenDialog>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idAtencion"
                                        label="Atención"
                                        defaultValue=""
                                        options={lsAtencion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idContingencia"
                                        label="Contingencia"
                                        defaultValue=""
                                        options={lsContingencia}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTurno"
                                        label="Turno"
                                        defaultValue=""
                                        options={lsTurno}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idDiaTurno"
                                        label="Día del Turno"
                                        defaultValue=""
                                        options={lsDiaTurno}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        fullWidth
                                        name="motivoConsulta"
                                        label="Motivo de Consulta"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="enfermedadActual"
                                        label="Enfermedad Actual"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="antecedentes"
                                        label="Antecedentes"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="revisionSistema"
                                        label="Revisión Por Sistemas"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="examenFisico"
                                        label="Examen Fisico"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />

                                <DetailedIcon
                                    title={DetailIcons[2].title}
                                    onClick={() => setOpenExamenFisico(true)}
                                    icons={DetailIcons[2].icons}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="examenParaclinico"
                                        label="Examenes Paraclínicos"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />

                                <DetailedIcon
                                    title={DetailIcons[3].title}
                                    onClick={() => setOpenExamenParaclinico(true)}
                                    icons={DetailIcons[3].icons}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">DIAGNÓSTICOS</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnosticoArray(value)}
                                    value={diagnosticoArray}
                                    label="Diagnósticos"
                                    options={lsCie11}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="planManejo"
                                        label="Plan de Manejo"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">CONCEPTO DE APTITUD PSICOFÍSICA</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoActitud"
                                        label="Concepto De Aptitud Psicofísica"
                                        defaultValue=""
                                        options={lsConceptoAptitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            {/* <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idRemitido"
                                        label="Remitido"
                                        defaultValue=""
                                        options={lsRemitido}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid> */}
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={buttonReport ? 4 : 6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                {buttonReport ?
                                    <Grid item xs={buttonReport ? 4 : 6}>
                                        <AnimateButton>
                                            <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
                                                Imprimir
                                            </Button>
                                        </AnimateButton>
                                    </Grid> : <></>}
                                <Grid item xs={buttonReport ? 4 : 6}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/assistance/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Assistance;