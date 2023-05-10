import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ValidationMessage } from 'components/helpers/Enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdRequests, InsertRequests } from 'api/clients/RequestsClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import { GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostRequests } from 'formatdata/RequestsForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReportRequests } from './ReportRequests';
import ViewPDF from 'components/components/ViewPDF';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';

const validationSchema = yup.object().shape({
    idContingencia: yup.string().required(`${ValidationMessage.Requerido}`),
});


const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const Requests = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsRuta, setLsRuta] = useState([]);
    const [lsDestino, setLsDestino] = useState([]);
    const [lsnroTaxi, setLsnroTaxi] = useState([]);
    const [lsCargadoa, setLsCargadoa] = useState([]);
    const [lsCupo, setLsCupo] = useState([]);
    const [lsMedico, setLsMedico] = useState([]);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [documento, setDocumento] = useState('');
    const [open, setOpen] = useState(false);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [result, setResult] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdRequests(result.idSolicitudes);
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReportRequests(lsDataReport.data, lsDataUser.data);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    async function GetAll() {
        try {

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostRequests(FormatDate(datos.fechaRecibo), datos.recibio, documento, datos.nombre, datos.area,
                datos.idCargoOficio, datos.idTipoSolicitud, datos.idResponsableRespuesta, FormatDate(datos.fechaLimiteRespuesta),
                FormatDate(datos.fechaRespuesta), datos.personaResponde, datos.grupo, datos.documentoResponde, datos.entidadSolicitante,
                datos.medioUtilizado, datos.numeroGuia, datos.observaciones, datos.direccion, datos.correo, datos.telefono,
                FormatDate(datos.fechaEntrega), FormatDate(datos.fechaReciboDLTD), datos.usuarioReciboDLTD, datos.estado, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertRequests(DataToInsert);

                if (result.status === 200) {
                    setOpenSuccess(true);
                    setResult(result.data.id)
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };


    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Solicitudes"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SubCard darkTitle title={<Typography variant="h4">Recibio en DLTD</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Recibido"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>


                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        label="Recibido por"
                                        defaultValue={user.nameuser}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <SubCard darkTitle title={<Typography variant="h4">Departamento De Salud E Higiene</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Recibido"
                                        name="fechaRespuesta"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Limite de Respuesta "
                                        name="fechaLimiteRespuesta"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Datos Del Solicitante</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        label="Dirección"
                                        name="direccion"
                                        size={matchesXS ? 'small' : 'medium'}

                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        label="Correo Electrónico"
                                        name="correo"
                                        size={matchesXS ? 'small' : 'medium'}

                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        label="Teléfono"
                                        name="telefono"
                                        size={matchesXS ? 'small' : 'medium'}

                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>


                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Detalle de Solicitud</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoSolicitud"
                                        label="Solicitud"
                                        defaultValue=""
                                        options={lsRuta}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idTipoSolicitud}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idResponsableRespuesta"
                                        label="Responsable de respuesta"
                                        defaultValue=""
                                        options={lsRuta}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idResponsableRespuesta}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Respuesta"
                                        name="fechaRespuesta"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Detalle de solicitud</Typography>}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        multiline
                                        rows={5}
                                        name="motivoTraslado"
                                        label="Motivo de Traslado"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.motivoTraslado}
                                    />
                                </FormProvider>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} sx={{ pt: 6 }}>
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
                                        <Button variant="contained" onClick={handleClickReport} fullWidth>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/requests/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default Requests;