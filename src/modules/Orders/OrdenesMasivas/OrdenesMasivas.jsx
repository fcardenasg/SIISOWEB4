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
import { GetAllOrdersParaclinicos, GetByIdOrders, GetByOrders, InsertOrders } from 'api/clients/OrdersClient';

import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import { generateReporteIndex } from '../Report';
import Accordion from 'components/accordion/Accordion';
import InputSelect from 'components/input/InputSelect';
import InputOnChange from 'components/input/InputOnChange';
import SearchIcon from '@mui/icons-material/Search';
import CardsEmployee from './Cards/CardsEmployee';
import SelectOnChange from 'components/input/SelectOnChange';
import InputCheck from 'components/input/InputCheck';
import InputDatePick from 'components/input/InputDatePick';

const lsOrdenesEmpleado = [];

const OrdenesMasivas = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);
    const [verHistoricoEmo, setVerHistoricoEmo] = useState(false);

    const [datosControlados, setDatosControlados] = useState({
        fecha: null,
        tipoExamen: '',
        citacion: false,
        consentimientoInformado: false
    });

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [search, setSearch] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsEmployeeTwo, setLsEmployeeTwo] = useState([]);

    const handleSearch = async () => {
        try {
            if (search !== '') {
                var lsServerEmployee = await GetAllEmployeeOrdenes(search);

                if (lsServerEmployee.status === 200) {
                    setLsEmployee(lsServerEmployee.data);
                    setLsEmployeeTwo(lsServerEmployee.data)
                }
            } else {
                setOpenError(true);
                setErrorMessage("Por favor ingrese el nombre o documento del empleado");
            }

        } catch (error) {
            setLsEmployee([]);
        }
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

    const handleClick = async (indexEmpleado) => {
        try {
            var documentoEmpleado = lsEmployee[indexEmpleado].documento;

            const DataToInsert = PostOrders(documentoEmpleado, datosControlados.fecha, datosControlados.tipoExamen, null,
                user.nameuser, undefined, '', undefined, datosControlados.citacion, datosControlados.consentimientoInformado);

            if (datosControlados.tipoExamen === '') {
                setOpenError(true);
                setErrorMessage("Por favor ingresar el tipo de examen");
            } else if (datosControlados.fecha === null) {
                setOpenError(true);
                setErrorMessage("Por favor ingresar la fecha de los exámenes");
            } else {
                const resultOrden = await InsertOrders(DataToInsert);
                if (resultOrden.status === 200) {
                    const lsResultado = await GetByOrders(resultOrden.data);
                    if (lsResultado.status === 200) {
                        lsOrdenesEmpleado.push({ ...lsResultado.data });
                    }

                    setOpenSuccess(true);
                    setErrorMessage("Empleado agregado para examen");
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                            <Grid item xs={2}>
                                <SelectOnChange
                                    onChange={(e) => setDatosControlados({ ...datosControlados, tipoExamen: e.target.value })}
                                    value={datosControlados.tipoExamen}
                                    name="idTipoExamen"
                                    label="Tipo Examen"
                                    options={lsTipoExamen}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <InputDatePick
                                    onChange={(e) => setDatosControlados({ ...datosControlados, fecha: e.target.value })}
                                    value={datosControlados.fecha}
                                    label="Fecha"
                                    name="fecha"
                                />
                            </Grid>

                            <Grid item xs={2.5}>
                                <InputCheck
                                    onChange={(e) => setDatosControlados({ ...datosControlados, consentimientoInformado: e.target.checked })}
                                    checked={datosControlados.consentimientoInformado}
                                    label="Consentimiento Informado"
                                    name="consentimientoInformado"
                                    size={30}
                                />
                            </Grid>

                            <Grid item xs={1.5}>
                                <InputCheck
                                    onChange={(e) => setDatosControlados({ ...datosControlados, citacion: e.target.checked })}
                                    checked={datosControlados.citacion}
                                    label="Citación"
                                    name="citacion"
                                    size={30}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <InputOnChange
                                            label="Buscar por"
                                            onChange={(e) => setSearch(e.target.value)}
                                            value={search}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
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

                                <Grid container spacing={2} sx={{ pt: 1 }}>
                                    {lsOrdenesEmpleado.map((enti, index) => (
                                        <Grid key={index} item xs={12} sm={6} lg={3}>
                                            {console.log("Datos => ", enti)}
                                            <CardsEmployee lsEmployee={enti} /* handleClick={() => handleClick(index)} */ />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Accordion>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default OrdenesMasivas;