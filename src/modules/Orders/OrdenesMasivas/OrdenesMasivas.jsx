import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Grid, Button,
    useMediaQuery,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';

import { GetAllEmployeeOrdenes, GetByIdEmployee } from 'api/clients/EmployeeClient';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DefaultValue, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo } from 'components/helpers/Enums';
import PersonIcon from '@mui/icons-material/Person';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { PostOrders } from 'formatdata/OrdersForm';
import { GetAllOrdersParaclinicos, GetByIdOrders, InsertOrders } from 'api/clients/OrdersClient';

import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import { generateReporteIndex } from '../Report';
import Accordion from 'components/accordion/Accordion';
import InputSelect from 'components/input/InputSelect';
import InputOnChange from 'components/input/InputOnChange';
import SearchIcon from '@mui/icons-material/Search';
import CardsEmployee from './Cards/CardsEmployee';

const validationSchema = yup.object().shape({
    idTipoExamen: yup.string().required(`${ValidationMessage.Requerido}`),
});

const OrdenesMasivas = () => {
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

    const [search, setSearch] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, formState: { errors } } = methods;

    const handleSearch = async () => {
        try {
            if (search !== '') {
                var lsServerEmployee = await GetAllEmployeeOrdenes(search);

                if (lsServerEmployee.status === 200)
                    setLsEmployee(lsServerEmployee.data);
            } else {
                setOpenError(true);
                setErrorMessage("Por favor ingrese el nombre o documento del empleado");
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

    const handleClick = async (empleado) => {
        try {
            const documentoEmpleado = lsEmployee[empleado].documento;




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
                {/* <ListHistoryEmo documento={documento} /> */}
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
                    <SubCard title="Registrar Ordenes Masivas">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoExamen"
                                        label="Tipo Examen"
                                        options={lsTipoExamen}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idTipoExamen}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={8}>
                                <Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                    <Grid item xs={6}>
                                        <InputOnChange
                                            label="Buscar por"
                                            onChange={(e) => setSearch(e.target.value)}
                                            value={search}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={1.5}>
                                        <AnimateButton>
                                            <Button variant="outlined" size="small" onClick={handleSearch} fullWidth>
                                                <IconButton aria-label="delete">
                                                    <SearchIcon />
                                                </IconButton>
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Accordion title={<><PersonIcon />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Lista De Empleados</Typography></>}>

                                <Grid container spacing={2} sx={{ pt: 1 }}>
                                    {lsEmployee.map((enti, index) => (
                                        <Grid key={index} item xs={12} sm={6} lg={3}>
                                            <CardsEmployee lsEmployee={enti} handleClick={() => handleClick(index)} />
                                        </Grid>
                                    ))}
                                </Grid>

                            </Accordion>
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Accordion title={<><PersonIcon />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Empleados Seleccionados Para Examenes</Typography></>}>
                            </Accordion>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default OrdenesMasivas;