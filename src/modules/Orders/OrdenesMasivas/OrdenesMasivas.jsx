import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Grid, Button,
    useMediaQuery,
    IconButton,
    Typography
} from '@mui/material';

import { GetAllEmployeeOrdenes } from 'api/clients/EmployeeClient';

import { useNavigate } from 'react-router-dom';
import { Message, TitleButton } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError, MessageDelete, ParamDelete, ParamOrderMasiva } from 'components/alert/AlertAll';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import PersonIcon from '@mui/icons-material/Person';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { PostOrders, PostOrdersMasiva } from 'formatdata/OrdersForm';
import { DeleteOrders, GetAllOrdersParaclinicos, GetByIdOrders, GetByOrders, InsertOrders, InsertOrdersParaclinicosMasiva } from 'api/clients/OrdersClient';

import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import Accordion from 'components/accordion/Accordion';
import InputOnChange from 'components/input/InputOnChange';
import SearchIcon from '@mui/icons-material/Search';
import CardsEmployee from './Cards/CardsEmployee';
import SelectOnChange from 'components/input/SelectOnChange';
import InputCheck from 'components/input/InputCheck';
import InputDatePick from 'components/input/InputDatePick';
import swal from 'sweetalert';
import ListParaclinico from './ListParaclinico';
import { GetByMail } from 'api/clients/UserClient';
import { generateReporteIndex } from '../Report';
import { SendParaclinicalExams } from 'api/clients/MailClient';
import UpdateEmployee from 'modules/Programming/Attention/OccupationalExamination/Update/UpdateEmployee';

const lsIdOrdenes = [];

const OrdenesMasivas = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [loading, setLoading] = useState(false);
    const [documento, setDocumento] = useState('');
    const [openUpdate, setOpenUpdate] = useState(false);
    const [desabilitarSave, setDesabilitarSave] = useState(false);
    const [lsOrdenesParaclinicos, setLsOrdenesParaclinicos] = useState([]);
    const [lsOrdenesEmpleado, setLsOrdenesEmpleado] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);
    const [lsTipoExamen, setLsTipoExamen] = useState([]);

    const [lsArchivos, setLsArchivos] = useState([]);

    const [datosControlados, setDatosControlados] = useState({
        fecha: new Date(),
        tipoExamen: '',
        citacion: false,
        consentimientoInformado: false
    });

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [search, setSearch] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);

    const handleSearch = async () => {
        try {
            if (search !== '') {
                var lsServerEmployee = await GetAllEmployeeOrdenes(search);

                if (lsServerEmployee.status === 200) {
                    setLsEmployee(lsServerEmployee.data);

                    if (lsServerEmployee.data.length === 0) {
                        setOpenError(true);
                        setErrorMessage('No hay resultados');
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage('Por favor ingrese el nombre o documento del empleado');
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

    const handleClickReport = async (idOrden) => {
        try {

            setOpenReport(true);
            const lsDataReport = await GetByIdOrders(idOrden);
            const lsDataReportParaclinico = await GetAllOrdersParaclinicos(idOrden);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data);

            setDataPDF(dataPDFTwo.dataPDF);
        } catch (err) { }
    };

    const handleClickEnviar = async (correoEmpleado, idOrden) => {
        try {
            setLoading(true);
            const lsDataReport = await GetByIdOrders(idOrden);
            const lsDataReportParaclinico = await GetAllOrdersParaclinicos(idOrden);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);
            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data);

            setTimeout(() => {
                async function enviarReporte() {
                    const Correo = {
                        Correo: correoEmpleado,
                        Adjunto: dataPDFTwo.file64
                    }

                    const result = await SendParaclinicalExams(Correo);
                    if (result.status === 200) {
                        setErrorMessage(result.data);
                        setOpenSuccess(true);
                        setTimeout(() => {
                            setLoading(false);
                        }, 500);
                    }
                }

                enviarReporte();
            }, 1000);
        } catch (err) { }
    };

    const handleDelete = async (index, idOrden) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteOrders(idOrden);
                    if (result.status === 200) {
                        lsOrdenesEmpleado.splice(index, 1);

                        setOpenDelete(true);
                    }
                }
            });
        } catch (error) {

        }
    };

    const handleClickEmpleado = async (indexEmpleado) => {
        try {
            var documentoEmpleado = lsEmployee[indexEmpleado].documento;

            const DataToInsert = PostOrders(documentoEmpleado, datosControlados.fecha, datosControlados.tipoExamen, null,
                user.nameuser, undefined, '', undefined, datosControlados.citacion, datosControlados.consentimientoInformado);

            var existe = lsOrdenesEmpleado.some(x => x.documento === documentoEmpleado);

            if (!existe) {
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
                            setLsOrdenesEmpleado([...lsOrdenesEmpleado, lsResultado.data]);
                            lsIdOrdenes.push(resultOrden.data);
                        }

                        setOpenSuccess(true);
                        setErrorMessage("Empleado agregado para examen");
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage("Este empleado ya se agrego");
            }


        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleClickEditarEmpleado = async (docu) => {
        try {
            setDocumento(docu);
            setOpenUpdate(true);
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleLoadingDocument = async () => {
        try {
            if (search !== '') {
                var lsServerEmployee = await GetAllEmployeeOrdenes(search);

                if (lsServerEmployee.status === 200) {
                    setLsEmployee(lsServerEmployee.data);
                }
            } else {
                setOpenError(true);
                setErrorMessage("Por favor ingrese el nombre o documento del empleado");
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleClick = async () => {
        try {
            const DataToInsert = PostOrdersMasiva(lsIdOrdenes, lsOrdenesParaclinicos);

            if (lsIdOrdenes.length !== 0) {
                if (lsOrdenesParaclinicos.length !== 0) {
                    swal(ParamOrderMasiva).then(async (willSave) => {
                        if (willSave) {
                            const result = await InsertOrdersParaclinicosMasiva(DataToInsert);
                            if (result.status === 200) {
                                setErrorMessage(Message.Guardar);
                                setOpenSuccess(true);

                                setDesabilitarSave(true);
                            }
                        }
                    });
                } else {
                    setOpenError(true);
                    setErrorMessage('No se han registrado paraclinico');
                }
            } else {
                setOpenError(true);
                setErrorMessage('No hay empleado agregados para examenes');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => { setDataPDF(null); setOpenReport(false); }}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <ControlModal
                title="ACTUALIZAR EMPLEADO"
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                maxWidth="xl"
            >
                <UpdateEmployee idEmpleado={documento} getDataAttention={handleLoadingDocument} setOpenUpdateTwo={setOpenUpdate} />
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
                                            <CardsEmployee lsEmployee={enti}
                                                handleClick1={() => handleClickEmpleado(index)}
                                                handleClick2={() => handleClickEditarEmpleado(enti.documento)}
                                                vista='editEmployee' />
                                        </Grid>
                                    ))}
                                </Grid>

                            </Accordion>
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Accordion title={<><PersonIcon />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Empleados Seleccionados Para Examenes</Typography></>}>

                                <Grid container spacing={2} sx={{ pt: 1 }}>
                                    {lsOrdenesEmpleado && lsOrdenesEmpleado.map((enti, index) => (
                                        <Grid key={index} item xs={12} sm={6} lg={3}>
                                            <CardsEmployee lsEmployee={enti} handleClick1={() => handleDelete(index, enti.id)} vista='views' />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Accordion>
                        </Grid>

                        {lsOrdenesEmpleado.length !== 0 ?
                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Accordion title={<><PersonIcon />
                                    <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Asignar Examenes</Typography></>}>

                                    <ListParaclinico setLsOrdenesParaclinicos={setLsOrdenesParaclinicos} lsOrdenesParaclinicos={lsOrdenesParaclinicos} />
                                </Accordion>
                            </Grid> : null}


                        {desabilitarSave ?
                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Accordion title={<><PersonIcon />
                                    <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Imprimir O/Y Enviar Por Correo</Typography></>}>

                                    <Grid container spacing={2} sx={{ pt: 1 }}>
                                        {lsOrdenesEmpleado && lsOrdenesEmpleado.map((enti, index) => (
                                            <Grid key={index} item xs={12} sm={6} lg={3}>
                                                <CardsEmployee lsEmployee={enti}
                                                    handleClick1={() => handleClickReport(enti.id)}
                                                    handleClick2={() => handleClickEnviar(enti.correoEmpleado, enti.id)}
                                                    vista='print' loading={loading} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Accordion>
                            </Grid> : null}

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button disabled={desabilitarSave} variant="contained" fullWidth onClick={handleClick}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/orders/view")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default OrdenesMasivas;