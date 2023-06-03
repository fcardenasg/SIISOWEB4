import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Grid, Button,
    useMediaQuery,
    Tooltip,
    IconButton
} from '@mui/material';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DefaultValue, Message, TitleButton } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { PutOrders } from 'formatdata/OrdersForm';
import { GetAllOrdersParaclinicos, GetByIdOrders, UpdateOrders } from 'api/clients/OrdersClient';

import SendIcon from '@mui/icons-material/Send';
import ViewEmployee from 'components/views/ViewEmployee';
import ListParaclinico from './ListParaclinico';
import Cargando from 'components/loading/Cargando';
import ListHistoryEmo from './ListHistoryEmo';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetByMail } from 'api/clients/UserClient';
import { generateReporteIndex } from '../Report';
import InputCheckBox from 'components/input/InputCheckBox';
import { SendParaclinicalExams } from 'api/clients/MailClient';
import { LoadingButton } from '@mui/lab';

const UpdateOrdersIndividual = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [loading, setLoading] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [timeWait, setTimeWait] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [verHistoricoEmo, setVerHistoricoEmo] = useState(false);
    const [tipoExamen, setTipoExamen] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [documento, setDocumento] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsDataOrdenes, setLsDataOrdenes] = useState([]);

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const methods = useForm();
    const { handleSubmit } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipoExamen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_EXAMEN_PARACLINICOS);
                var resultTipoExamen = lsServerTipoExamen.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoExamen(resultTipoExamen);
            } catch (error) { }
        }

        getAll();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const serverData = await GetByIdOrders(id);
                if (serverData.status === 200) {
                    setLsDataOrdenes(serverData.data);
                    setDocumento(serverData.data.documento);
                    setTipoExamen(serverData.data.idTipoExamen);

                    const event = {
                        target: { value: serverData.data.documento }
                    }
                    handleLoadingDocument(event);

                    setTimeout(() => {
                        if (serverData.status === 200)
                            setTimeWait(true);
                    }, 2000);
                }
            } catch (error) { }
        }

        getData();
    }, []);

    async function generateReport(action = '') {
        try {
            if (action === 'correo') {
                setLoading(true);
            }

            const lsDataReport = await GetByIdOrders(id);
            const lsDataReportParaclinico = await GetAllOrdersParaclinicos(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);
            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data);

            if (action === 'correo') {
                if (lsEmployee.email !== '' || lsEmployee.email !== undefined) {
                    const Correo = {
                        Correo: lsEmployee.email,
                        Adjunto: dataPDFTwo.file64
                    }

                    const result = await SendParaclinicalExams(Correo);
                    if (result.status === 200) {
                        if (result.data === 'Correo enviado') {

                            setTimeout(() => {
                                if (result.status === 200) {
                                    setErrorMessage(result.data);
                                    setOpenSuccess(true);
                                    setLoading(false);
                                }
                            }, 2000);
                        } else {
                            setOpenError(true);
                            setErrorMessage(Message.CorreoNoEnviado);
                        }
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.SinCorreo);
                }
            } else {
                setOpenReport(true);
                setDataPDF(dataPDFTwo.dataPDF);
            }
        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutOrders(id, documento, datos.fecha, tipoExamen, datos.observaciones,
                user.nameuser, undefined, '', undefined, datos.citacion, datos.consentimientoInformado);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateOrders(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageUpdate message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="Historico De Controles Periódicos"
                open={verHistoricoEmo}
                onClose={() => setVerHistoricoEmo(false)}
                maxWidth="md"
            >
                <ListHistoryEmo documento={documento} />
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
                            title="Actualizar Ordenes Individuales"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsDataOrdenes.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={DefaultValue.TIPO_EXAMEN_CONTROLPERIODICO === tipoExamen ? 5.2 : 6}>
                                    <SelectOnChange
                                        name="idTipoExamen"
                                        label="Tipo Examen"
                                        value={tipoExamen}
                                        onChange={(e) => setTipoExamen(e.target.value)}
                                        options={lsTipoExamen}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                {DefaultValue.TIPO_EXAMEN_CONTROLPERIODICO === tipoExamen ?
                                    <Grid item xs={0.8}>
                                        <AnimateButton>
                                            <Tooltip disabled={lsEmployee.length === 0 ? true : false} title="Ver Historico De HCO" onClick={() => setVerHistoricoEmo(true)}>
                                                <IconButton aria-label="delete" size="large" color="primary">
                                                    <VisibilityIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </AnimateButton>
                                    </Grid> : null}

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Consentimiento Informado"
                                            name="consentimientoInformado"
                                            size={30}
                                            defaultValue={lsDataOrdenes.consentimientoInformado}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Citación"
                                            name="citacion"
                                            size={30}
                                            defaultValue={lsDataOrdenes.citacion}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <ListParaclinico setDisabledButton={setDisabledButton} disabledButton={disabledButton} lsEmployee={lsEmployee} idOrdenes={id} />
                                </Grid>

                                <Grid item xs={12}>
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
                                                <Button disabled={disabledButton ? false : true} variant="outlined" fullWidth onClick={() => setOpenReport(true)}>
                                                    {TitleButton.Imprimir}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <LoadingButton
                                                    fullWidth
                                                    disabled={!disabledButton}
                                                    onClick={() => generateReport('correo')}
                                                    loading={loading}
                                                    loadingPosition="end"
                                                    startIcon={<SendIcon />}
                                                    variant="outlined"
                                                >
                                                    {TitleButton.EnviarCorreo}
                                                </LoadingButton>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/orders-individual/list")}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid> : <Cargando />}
        </Fragment>
    );
};

export default UpdateOrdersIndividual;