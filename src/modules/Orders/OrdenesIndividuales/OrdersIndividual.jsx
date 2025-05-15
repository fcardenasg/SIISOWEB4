import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Grid, Button,
    useMediaQuery,
    IconButton,
    Tooltip
} from '@mui/material';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { AccionMenu, DefaultValue, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo } from 'components/helpers/Enums';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { PostOrders } from 'formatdata/OrdersForm';
import { GetAllOrdersParaclinicos, GetByIdOrders, InsertOrders } from 'api/clients/OrdersClient';

import SendIcon from '@mui/icons-material/Send';
import ViewEmployee from 'components/views/ViewEmployee';
import ListParaclinico from './ListParaclinico';
import SelectOnChange from 'components/input/SelectOnChange';
import ControlModal from 'components/controllers/ControlModal';
import ListHistoryEmo from './ListHistoryEmo';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import { generateReporteIndex } from '../Report';
import InputCheckBox from 'components/input/InputCheckBox';
import { SendParaclinicalExams } from 'api/clients/MailClient';
import { LoadingButton } from '@mui/lab';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const OrdersIndividual = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataPDF, setDataPDF] = useState(null);
    const [loading, setLoading] = useState(false);

    const [resultData, setResultData] = useState('');
    const [tipoExamen, setTipoExamen] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [verHistoricoEmo, setVerHistoricoEmo] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [documento, setDocumento] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const isValid = (documento === '' && lsEmployee.length === 0) || resultData !== '';
    const isValidTipoExamen = DefaultValue.TIPO_EXAMEN_CONTROLPERIODICO === tipoExamen ? true : false;
    const isValidSeeOrdenes = DefaultValue.TIPO_EXAMEN_INGRESO === tipoExamen ? true : false;

    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
                    }

                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee([]);
        } catch (error) { }
    }

    async function generateReport(action = '') {
        try {
            if (action === 'correo')
                setLoading(true);

            const lsDataReport = await GetByIdOrders(resultData);
            const lsDataReportParaclinico = await GetAllOrdersParaclinicos(resultData);
            var lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);
            lsDataUser.data.usuarioActivo = user?.nombreusuario;
            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data);

            if (action === 'correo') {
                const Correo = {
                    Correo: lsEmployee.email,
                    Adjunto: dataPDFTwo.file64,
                    IdOrden: resultData
                }

                const result = await SendParaclinicalExams(Correo);
                if (result.status === 200) {
                    setTimeout(() => {
                        if (result.status === 200) {
                            setErrorMessage(result.data);
                            setOpenSuccess(true);
                            setLoading(false);
                        }
                    }, 500);
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.CorreoNoEnviado);
                }
            } else {
                setOpenReport(true);
                setDataPDF(dataPDFTwo.dataPDF);
            }
        } catch (error) { }
    }

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

    const handleClick = async (datos) => {
        try {
            if (tipoExamen == '') {
                setOpenError(true);
                setErrorMessage("Debe elegir un tipo de examen");
                return;
            }

            const DataToInsert = PostOrders(documento, datos.fecha, tipoExamen, datos.observaciones,
                user?.nameuser, undefined, '', undefined, datos.citacion, datos.consentimientoInformado,
                datos.vih, datos.pruebaEmbarazo);

            if (documento !== '' && lsEmployee.length !== 0) {
                const result = await InsertOrders(DataToInsert);
                if (result.status === 200) {
                    setResultData(result.data);
                    setErrorMessage(Message.Guardar);
                    setOpenSuccess(true);
                }
            } else {
                setOpenError(true);
                setErrorMessage(Message.ErrorNoHayDatos);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleChangeTipoExamen = async (event) => {
        const { value } = event.target;
        setTipoExamen(value);

        if (value != DefaultValue.TIPO_EXAMEN_INGRESO) {
            setValue("vih", false);
            setValue("pruebaEmbarazo", false);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Ordenesindividuales}>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
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

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Ordenes Individuales"
                        key={lsEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={!isValidSeeOrdenes ? 3 : 4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={isValidTipoExamen ? 2.4 : !isValidSeeOrdenes ? 3 : 4}>
                                <SelectOnChange
                                    name="idTipoExamen"
                                    label="Tipo Examen"
                                    value={tipoExamen}
                                    onChange={handleChangeTipoExamen}
                                    options={lsTipoExamen}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            {isValidTipoExamen &&
                                <Grid item xs={0.6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <AnimateButton>
                                        <Tooltip disabled={lsEmployee.length === 0} title="Ver Histórico De HCO" onClick={() => setVerHistoricoEmo(true)}>
                                            <IconButton aria-label="delete" size="large" color="primary">
                                                <VisibilityIcon fontSize="inherit" />
                                            </IconButton>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            }

                            <Grid item xs={12} md={6} lg={!isValidSeeOrdenes ? 3 : 4}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Consentimiento Informado"
                                        name="consentimientoInformado"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={!isValidSeeOrdenes ? 3 : 4}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Citación"
                                        name="citacion"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            {isValidSeeOrdenes &&
                                <>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="¿Ordenar prueba de VIH?"
                                                name="vih"
                                                size={30}
                                                defaultValue={false}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    {lsEmployee.genero == DefaultValue.GeneroWomen &&
                                        <Grid item xs={12} md={6} lg={4}>
                                            <FormProvider {...methods}>
                                                <InputCheckBox
                                                    label="¿Ordenar prueba de embarazo?"
                                                    name="pruebaEmbarazo"
                                                    size={30}
                                                    defaultValue={false}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    }
                                </>
                            }

                            {resultData &&
                                <Grid item xs={12}>
                                    <ListParaclinico setDisabledButton={setDisabledButton} lsEmployee={lsEmployee} idOrdenes={resultData} />
                                </Grid>
                            }

                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ pt: 4 }}>
                                    <Grid item xs={6} md={4} lg={2}>
                                        <AnimateButton>
                                            <Button disabled={isValid} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={4} lg={2}>
                                        <AnimateButton>
                                            <Button disabled={!disabledButton} variant="outlined" fullWidth onClick={() => generateReport('imprimir')}>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={4} lg={2}>
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

                                    <Grid item xs={6} md={4} lg={2}>
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
            </Grid >
        </ValidateActionSkeleton>
    );
};

export default OrdersIndividual;