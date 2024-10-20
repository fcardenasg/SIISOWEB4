import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import Transitions from 'ui-component/extended/Transitions';
import InputOnChange from 'components/input/InputOnChange';
import InputDatePick from 'components/input/InputDatePick';
import useAuth from 'hooks/useAuth';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import CheckListRefund from './CheckListRefund';
import { PostRefund } from 'formatdata/RefundForm';
import { GetByIdRefund, InsertRefund } from 'api/clients/RefundClient';
import { GetAllComboUser, GetByMail } from 'api/clients/UserClient';
import { generateReportRefund } from './ReportRefund';
import ViewPDF from 'components/components/ViewPDF';
import SelectOnChange from 'components/input/SelectOnChange';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes', icons: <AddBoxIcon fontSize="small" /> },
]

const Refund = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [idMedico, setIdMedico] = useState(undefined);
    const [ordenadoPor, setOrdenadoPor] = useState(undefined);

    const [openReport, setOpenReport] = useState(false);
    const [viewListRefund, setViewListRefund] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [fechaFin, setFechaFin] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);

    const [numeroDia, setNumeroDia] = useState(0);
    const [documento, setDocumento] = useState('');
    const [resultData, setResultData] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsEstadoEmpleado, setLsEstadoEmpleado] = useState([]);
    const [lsEstadoRestriccion, setLsEstadoRestriccion] = useState([]);
    const [lsTipoRestriccion, setLsTipoRestriccion] = useState([]);

    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);
    const [lsOrdenarPorHorario, setLsOrdenarPorHorario] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsOrdenadoPor, setLsOrdenadoPor] = useState([]);
    const [lsOrigenReintegro, setLsOrigenReintegro] = useState([]);
    const [lsUsuarios, setLsUsuarios] = useState([]);

    const [lsDx1, setLsDx1] = useState([]);
    const [textDx1, setTextDx1] = useState('');

    const [lsDx2, setLsDx2] = useState([]);
    const [textDx2, setTextDx2] = useState('');
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdRefund(resultData);
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReportRefund(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx1(lsServerCie11.data);
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Hubo un problema al buscar el Diagnóstico');
        }
    }

    const handleDx2 = async (event) => {
        try {
            setTextDx2(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx2(lsServerCie11.data);
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Hubo un problema al buscar el Diagnóstico');
        }
    }

    async function getAll() {
        try {
            const lsServerEstadoEmpleado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTADO_EMPLEADO);
            var resultEstadoEmpleado = lsServerEstadoEmpleado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoEmpleado(resultEstadoEmpleado);

            const lsServerUsuario = await GetAllComboUser();
            setLsUsuarios(lsServerUsuario.data);

            const lsServerEstadoRestriccion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTADO_RESTRICCION);
            var resultEstadoRestriccion = lsServerEstadoRestriccion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoRestriccion(resultEstadoRestriccion);

            const lsServerTipoRestriccion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_RESTRICCION);
            var resultTipoRestriccion = lsServerTipoRestriccion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoRestriccion(resultTipoRestriccion);

            const lsServerOrdenadoPor = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ORDENADO_POR);
            var resultOrdenadoPor = lsServerOrdenadoPor.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrdenadoPor(resultOrdenadoPor);

            const lsServerConceptoAptitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CONCEPTO_APTITUD_REINTEGRO);
            var resultConceptoAptitud = lsServerConceptoAptitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoAptitud(resultConceptoAptitud);

            const lsServerOrdenarPorHorario = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ORDENADO_POR_HORARIO);
            var resultOrdenarPorHorario = lsServerOrdenarPorHorario.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrdenarPorHorario(resultOrdenarPorHorario);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTADO_CASO);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoCaso(resultEstadoCaso);

            const lsServerOrigenReintegro = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ORIGEN_REINTEGRO);
            var resultOrigenReintegro = lsServerOrigenReintegro.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrigenReintegro(resultOrigenReintegro);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            var fechaFinFormateada = fechaFin === '' ? null : fechaFin;

            const DataToInsert = PostRefund(documento, datos.dx1, datos.dx2, datos.idOrigenDx1, datos.idOrigenDx2, datos.resumen,
                datos.idEstadoEmpleado, datos.idEstadoRestriccion, datos.idTipoRestriccion, fechaInicio,
                fechaFinFormateada, numeroDia, ordenadoPor, idMedico, datos.porcentajePCL, datos.recomendaciones,
                datos.idConceptoReintegro, datos.inicioReubicacion, datos.finReubicacion, datos.descripcion,
                datos.idTipoHorario, datos.idOrdenadoPorHorario, datos.fechaInicioHorario, datos.fechaFinHorario,
                datos.idEstadoCaso, user.nameuser, undefined, undefined, undefined);

            const result = await InsertRefund(DataToInsert);
            if (result.status === 200) {
                if (result.data === Message.ErrorDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                } else if (result.data === Message.NoExisteDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.NoExisteDocumento);
                } else if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                    setResultData(result.data);

                    setTimeout(() => {
                        if (result.status === 200) {
                            setViewListRefund(true);
                        }
                    }, 1500);
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

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

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

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar reintegro"
                        key={lsEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Descripción Patológica</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <InputOnChange
                                    label="Dx 1"
                                    onKeyDown={handleDx1}
                                    onChange={(e) => setTextDx1(e?.target.value)}
                                    value={textDx1}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="dx1"
                                        label="Diagnóstico 1"
                                        options={lsDx1}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.dx1}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idOrigenDx1"
                                        label="Origen"
                                        options={lsOrigenReintegro}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idOrigenDx1}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <InputOnChange
                                    label="Dx 2"
                                    onKeyDown={handleDx2}
                                    onChange={(e) => setTextDx2(e?.target.value)}
                                    value={textDx2}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="dx2"
                                        label="Diagnóstico 2"
                                        options={lsDx2}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.dx2}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idOrigenDx2"
                                        label="Origen"
                                        options={lsOrigenReintegro}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idOrigenDx2}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="resumen"
                                        label="Resumen"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={4}
                                        bug={errors.resumen}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEstadoEmpleado"
                                        label="Estado del Empleado"
                                        options={lsEstadoEmpleado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idEstadoEmpleado}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEstadoRestriccion"
                                        label="Estado de Restricción"
                                        options={lsEstadoRestriccion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idEstadoRestriccion}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoRestriccion"
                                        label="Tipo de Restricción"
                                        options={lsTipoRestriccion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idTipoRestriccion}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Inicio de Restricción"
                                    value={fechaInicio}
                                    onChange={(e) => {
                                        setFechaInicio(e.target.value);
                                        if (fechaFin) {
                                            var result = NumeroDias(e.target.value, fechaFin);
                                            setNumeroDia(result);
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Fin de Restricción"
                                    value={fechaFin}
                                    onChange={(e) => {
                                        setFechaFin(e.target.value);
                                        if (fechaInicio) {
                                            var result = NumeroDias(fechaInicio, e.target.value);
                                            setNumeroDia(result);
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputOnChange
                                    label="# Días Restringido"
                                    value={numeroDia}
                                    onChange={(e) => setNumeroDia(e?.target.value)}
                                    disabled
                                    type="number"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <SelectOnChange
                                        name="idOrdenadoPor"
                                        label="Ordenado Por"
                                        onChange={(e) => {
                                            if (e.target.value !== DefaultValue.OrdenadoPor_Reintegro_MedicoDLTD) {
                                                setIdMedico(undefined);
                                            }
                                            setOrdenadoPor(e.target.value)
                                        }}
                                        value={ordenadoPor}
                                        options={lsOrdenadoPor}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <SelectOnChange
                                        name="idMedico"
                                        label="Médico"
                                        onChange={(e) => setIdMedico(e.target.value)}
                                        value={idMedico}
                                        options={lsUsuarios}
                                        size={matchesXS ? 'small' : 'medium'}
                                        disabled={ordenadoPor === DefaultValue.OrdenadoPor_Reintegro_MedicoDLTD && ordenadoPor !== '' ? false : true}
                                    />
                                </FormProvider>
                            </Grid>

                            {/* <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <SelectOnChange
                                        name="idOrdenadoPor"
                                        label="Ordenado Por"
                                        onChange={(e) => setOrdenadoPor(e.target.value)}
                                        value={ordenadoPor}
                                        options={lsOrdenadoPor}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idOrdenadoPor}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idMedico"
                                        label="Médico"
                                        disabled={ordenadoPor === DefaultValue.OrdenadoPor_Reintegro_MedicoDLTD && ordenadoPor !== '' ? false : true}
                                        options={lsUsuarios}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idMedico}
                                    />
                                </FormProvider>
                            </Grid> */}

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="porcentajePCL"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.porcentajePCL}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        fullWidth
                                        name="recomendaciones"
                                        label="Recomendaciones / Modificaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.recomendaciones}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Concepto De Reintegro Ocupacional</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoReintegro"
                                        label="Concepto de Aptitud"
                                        options={lsConceptoAptitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idConceptoReintegro}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Datos De Reubicación</Typography>}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Inicio de Reubicación"
                                        name="inicioReubicacion"
                                        defaultValue={null}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fin de Reubicación"
                                        name="finReubicacion"
                                        defaultValue={null}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="descripcion"
                                        label="Descripción de Funciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={4}
                                        bug={errors.descripcion}
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
                                <SubCard darkTitle title={<Typography variant="h4">Sin Horario Extendido</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idTipoHorario"
                                                    label="Tipo"
                                                    options={lsTipoRestriccion}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idTipoHorario}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idOrdenadoPorHorario"
                                                    label="Ordenada Por"
                                                    options={lsOrdenarPorHorario}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idOrdenadoPorHorario}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha Inicio"
                                                    name="fechaInicioHorario"
                                                    defaultValue={null}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha Fin"
                                                    name="fechaFinHorario"
                                                    defaultValue={null}
                                                />
                                            </FormProvider>
                                        </Grid>

                                    </Grid>
                                </SubCard>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEstadoCaso"
                                        label="Estado del Caso"
                                        options={lsEstadoCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idEstadoCaso}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Lista de chequeo</Typography>}>

                        <Transitions type="collapse" in={viewListRefund} position="top-left" direction="up">
                            <CheckListRefund idReintegro={resultData} />
                        </Transitions>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={4} md={2}>
                                <AnimateButton>
                                    <Button disabled={resultData === '' ? false : true} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={4} md={2}>
                                <AnimateButton>
                                    <Button disabled={resultData !== '' ? false : true} variant="outlined" fullWidth onClick={handleClickReport}>
                                        {TitleButton.Imprimir}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={4} md={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/refund/list")}>
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

export default Refund;