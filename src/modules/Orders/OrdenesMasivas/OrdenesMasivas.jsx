import { Fragment, useEffect, useState } from 'react';

import {
    Button,
    Grid,
    IconButton,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import PersonIcon from '@mui/icons-material/Person';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllEmployeeOrdenes } from 'api/clients/EmployeeClient';
import { DeleteOrders, GetAllOrdersParaclinicos, GetByIdOrders, GetByOrders, InsertOrders, InsertOrdersParaclinicosMasiva } from 'api/clients/OrdersClient';
import { MessageDelete, MessageError, MessageSuccess, ParamDelete, ParamOrderMasiva } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton } from 'components/helpers/Enums';
import { PostOrders, PostOrdersMasiva } from 'formatdata/OrdersForm';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

import SearchIcon from '@mui/icons-material/Search';
import { SendParaclinicalExams } from 'api/clients/MailClient';
import { GetByMail } from 'api/clients/UserClient';
import Accordion from 'components/accordion/Accordion';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import { FormatDate } from 'components/helpers/Format';
import InputCheck from 'components/input/InputCheck';
import InputDatePick from 'components/input/InputDatePick';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import UpdateEmployee from 'modules/Programming/Attention/OccupationalExamination/Update/UpdateEmployee';
import swal from 'sweetalert';
import { generateReporteIndex } from '../Report';
import CardsEmployee from './Cards/CardsEmployee';
import ListParaclinico from './ListParaclinico';

const OrdenesMasivas = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [loadingStates, setLoadingStates] = useState({});
    const [documento, setDocumento] = useState('');
    const [openUpdate, setOpenUpdate] = useState(false);
    const [desabilitarSave, setDesabilitarSave] = useState(false);
    const [lsOrdenesParaclinicos, setLsOrdenesParaclinicos] = useState([]);
    const [lsOrdenesEmpleado, setLsOrdenesEmpleado] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [datosControlados, setDatosControlados] = useState({
        fecha: FormatDate(new Date()),
        tipoExamen: '',
        citacion: false,
        consentimientoInformado: false
    });
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [search, setSearch] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsIdOrdenes, setLsIdOrdenes] = useState([]); // Cambiado a useState

    const handleSearch = async () => {
        if (search.trim() === '') {
            setOpenError(true);
            setErrorMessage('Por favor ingrese el nombre o documento del empleado');
            return;
        }

        try {
            const lsServerEmployee = await GetAllEmployeeOrdenes(search);
            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
                if (lsServerEmployee.data.length === 0) {
                    setOpenError(true);
                    setErrorMessage('No hay resultados');
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
        }
    };

    const handleLoadingDocument = async () => {
        if (search.trim() === '') {
            setOpenError(true);
            setErrorMessage("Por favor ingrese el nombre o documento del empleado");
            return;
        }

        try {
            const lsServerEmployee = await GetAllEmployeeOrdenes(search);
            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
        }
    };

    useEffect(() => {
        const getAllTipoExamen = async () => {
            try {
                const lsServerTipoExamen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_EXAMEN_PARACLINICOS);
                const resultTipoExamen = lsServerTipoExamen.data.entities.map(item => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoExamen(resultTipoExamen);
            } catch (error) {
            }
        };

        getAllTipoExamen();
    }, []);

    const handleClickReport = async (idOrden) => {
        try {
            setOpenReport(true);
            const [lsDataReport, lsDataReportParaclinico] = await Promise.all([
                GetByIdOrders(idOrden),
                GetAllOrdersParaclinicos(idOrden)
            ]);

            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data);
            setDataPDF(dataPDFTwo.dataPDF);
        } catch (err) {
        }
    };

    const handleClickEnviar = async (correoEmpleado, idOrden, index) => {
        try {
            setLoadingStates(prev => ({ ...prev, [index]: true }));

            const [lsDataReport, lsDataReportParaclinico] = await Promise.all([
                GetByIdOrders(idOrden),
                GetAllOrdersParaclinicos(idOrden)
            ]);

            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReporteIndex(lsDataReport.data, lsDataUser.data, lsDataReportParaclinico.data);

            const Correo = {
                Correo: correoEmpleado,
                Adjunto: dataPDFTwo.file64,
                IdOrden: idOrden
            };

            const result = await SendParaclinicalExams(Correo);
            if (result.status === 200) {
                setErrorMessage(result.data);
                setOpenSuccess(true);
            }
        } catch (err) {
            setErrorMessage("No se pudo enviar el correo electrónico");
            setOpenError(true);
        } finally {
            setLoadingStates(prev => ({ ...prev, [index]: false }));
        }
    };

    const handleDelete = async (index, idOrden) => {
        try {
            const willDelete = await swal(ParamDelete);
            if (willDelete) {
                const result = await DeleteOrders(idOrden);
                if (result.status === 200) {
                    setLsOrdenesEmpleado(prev => prev.filter((_, i) => i !== index));
                    setOpenDelete(true);
                }
            }
        } catch (error) {
        }
    };

    const handleClickEmpleado = async (indexEmpleado) => {
        const documentoEmpleado = lsEmployee[indexEmpleado].documento;

        if (lsOrdenesEmpleado.some(x => x.documento === documentoEmpleado)) {
            setOpenError(true);
            setErrorMessage("Este empleado ya se agregó");
            return;
        }

        if (!datosControlados.tipoExamen || !datosControlados.fecha) {
            setOpenError(true);
            setErrorMessage(!datosControlados.tipoExamen ? "Por favor ingresar el tipo de examen" : "Por favor ingresar la fecha de los exámenes");
            return;
        }

        try {
            const DataToInsert = PostOrders(documentoEmpleado, datosControlados.fecha, datosControlados.tipoExamen, null, user?.nameuser, undefined, '', undefined, datosControlados.citacion, datosControlados.consentimientoInformado);
            const resultOrden = await InsertOrders(DataToInsert);
            if (resultOrden.status === 200) {
                const lsResultado = await GetByOrders(resultOrden.data);
                if (lsResultado.status === 200) {
                    setLsOrdenesEmpleado(prev => [...prev, lsResultado.data]);
                    setLsIdOrdenes(prev => [...prev, resultOrden.data]); // Actualiza lsIdOrdenes
                    setOpenSuccess(true);
                    setErrorMessage("Empleado agregado para examen");
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleClickEditarEmpleado = (docu) => {
        setDocumento(docu);
        setOpenUpdate(true);
    };

    const handleClick = async () => {
        if (lsIdOrdenes.length === 0 || lsOrdenesParaclinicos.length === 0) {
            setOpenError(true);
            setErrorMessage(lsIdOrdenes.length === 0 ? 'No hay empleado agregados para exámenes' : 'No se han registrado paraclinicos');
            return;
        }

        const DataToInsert = PostOrdersMasiva(lsIdOrdenes, lsOrdenesParaclinicos);
        const willSave = await swal(ParamOrderMasiva);
        if (willSave) {
            try {
                const result = await InsertOrdersParaclinicosMasiva(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setErrorMessage(Message.Guardar);
                    setDesabilitarSave(true);
                }
            } catch (error) {
                setOpenError(true);
                setErrorMessage(Message.RegistroNoGuardado);
            }
        }
    };

    const handleClickBack = () => {
        navigate("/orders/view");
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
                    <SubCard title={<Typography variant="h4">Registrar ordenes masivas</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.5}>
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

                            <Grid item xs={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <InputOnChange
                                            label="Buscar por cédula o nombre"
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
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Lista de empleados</Typography></>}>

                                <Grid container spacing={2} sx={{ pt: 1 }}>
                                    {lsEmployee.map((enti, index) => (
                                        <Grid key={index} item xs={12} sm={6} lg={3}>
                                            <CardsEmployee
                                                lsEmployee={enti}
                                                handleClick1={() => handleClickEmpleado(index)}
                                                handleClick2={() => handleClickEditarEmpleado(enti.documento)}
                                                vista='editEmployee'
                                            />
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
                                            <CardsEmployee
                                                lsEmployee={enti}
                                                handleClick1={() => handleDelete(index, enti.id)}
                                                vista='views'
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Accordion>
                        </Grid>

                        {lsOrdenesEmpleado.length > 0 && (
                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Accordion title={<><PersonIcon />
                                    <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Asignar Examenes</Typography></>}>

                                    <ListParaclinico setLsOrdenesParaclinicos={setLsOrdenesParaclinicos} lsOrdenesParaclinicos={lsOrdenesParaclinicos} />
                                </Accordion>
                            </Grid>
                        )}

                        {desabilitarSave && (
                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Accordion title={<><PersonIcon />
                                    <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Imprimir O/Y Enviar Por Correo</Typography></>}>

                                    <Grid container spacing={2} sx={{ pt: 1 }}>
                                        {lsOrdenesEmpleado.map((enti, index) => (
                                            <Grid key={index} item xs={12} sm={6} lg={3}>
                                                <CardsEmployee
                                                    lsEmployee={enti}
                                                    handleClick1={() => handleClickReport(enti.id)}
                                                    handleClick2={() => handleClickEnviar(enti.correoEmpleado, enti.id, index)}
                                                    vista='print'
                                                    loading={loadingStates[index] || false}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Accordion>
                            </Grid>
                        )}

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
                                    <Button variant="outlined" fullWidth onClick={handleClickBack}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default OrdenesMasivas;