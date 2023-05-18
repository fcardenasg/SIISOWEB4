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
import { DefaultValue, Message, TitleButton } from 'components/helpers/Enums';
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

import ViewEmployee from 'components/views/ViewEmployee';
import ListParaclinico from './ListParaclinico';
import SelectOnChange from 'components/input/SelectOnChange';
import ControlModal from 'components/controllers/ControlModal';
import ListHistoryEmo from './ListHistoryEmo';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import { generateReporteIndex } from '../Report';
import InputCheckBox from 'components/input/InputCheckBox';

const OrdersIndividual = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [resultData, setResultData] = useState('');
    const [tipoExamen, setTipoExamen] = useState('');
    const [dataPDF, setDataPDF] = useState(null);
    const [disabledButton, setDisabledButton] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [verHistoricoEmo, setVerHistoricoEmo] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [documento, setDocumento] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const methods = useForm();
    const { handleSubmit } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event.target.value !== '') {
                if (event.key === 'Enter') {
                    if (event?.target.value != "") {
                        var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                        if (lsServerEmployee.status === 200) {
                            setLsEmployee(lsServerEmployee.data);
                        }
                    } else {
                        setOpenError(true);
                        setErrorMessage(Message.ErrorDocumento);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                }
            }
        } catch (error) {
            setLsEmployee([]);
        }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdOrders(resultData);
            const lsDataReportParaclinico = await GetAllOrdersParaclinicos(0, 0, resultData);
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data.entities);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipoExamen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_EXAMEN_PARACLINICOS);
                var resultTipoExamen = lsServerTipoExamen.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoExamen(resultTipoExamen);
                setTipoExamen(resultTipoExamen[0].value);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostOrders(documento, datos.fecha, tipoExamen, datos.observaciones,
                user.nameuser, undefined, '', undefined, datos.citacion, datos.consentimientoInformado);

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertOrders(DataToInsert);
                    if (result.status === 200) {
                        setResultData(result.data.id);
                        setOpenSuccess(true);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorNoHayDatos);
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
                title="Historico De Controles Periódicos"
                open={verHistoricoEmo}
                onClose={() => setVerHistoricoEmo(false)}
                maxWidth="md"
            >
                <ListHistoryEmo documento={documento} />
            </ControlModal>

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
                        title="Registrar Ordenes Individuales"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
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
                                        defaultValue={new Date()}
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
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Citación"
                                        name="citacion"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            {resultData !== '' ?
                                <Grid item xs={12}>
                                    <ListParaclinico setDisabledButton={setDisabledButton} lsEmployee={lsEmployee} idOrdenes={resultData} />
                                </Grid> : null}

                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ pt: 4 }}>
                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button disabled={resultData !== '' ? true : false} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button disabled={disabledButton ? false : true} variant="outlined" fullWidth onClick={handleClickReport}>
                                                {TitleButton.Imprimir}
                                            </Button>
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
            </Grid >
        </Fragment >
    );
};

export default OrdersIndividual;