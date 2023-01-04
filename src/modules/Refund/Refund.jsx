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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import CheckListRefund from './CheckListRefund';
import { PostRefund } from 'formatdata/RefundForm';
import { InsertRefund } from 'api/clients/RefundClient';

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

    const [openReport, setOpenReport] = useState(false);
    const [viewListRefund, setViewListRefund] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openExamen, setOpenExamen] = useState(false);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);

    const [numeroDia, setNumeroDia] = useState('');
    const [documento, setDocumento] = useState('');
    const [resultData, setResultData] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsEstadoEmpleado, setLsEstadoEmpleado] = useState([]);
    const [lsEstadoRestriccion, setLsEstadoRestriccion] = useState([]);
    const [lsTipoRestriccion, setLsTipoRestriccion] = useState([]);

    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);
    const [lsOrdenarPorHorario, setLsOrdenarPorHorario] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsOrdenadoPor, setLsOrdenadoPor] = useState([]);
    const [lsOrigenReintegro, setLsOrigenReintegro] = useState([]);

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
                    setLsEmployee([]);
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

            const lsServerEstadoEmpleado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTADO_EMPLEADO);
            var resultEstadoEmpleado = lsServerEstadoEmpleado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoEmpleado(resultEstadoEmpleado);

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
        GetAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostRefund(documento, JSON.stringify(diagnosticoArray), datos.idOrigen, datos.resumen,
                datos.idEstadoEmpleado, datos.idEstadoRestriccion, datos.idTipoRestriccion, FormatDate(fechaInicio),
                FormatDate(fechaFin), numeroDia, datos.idOrdenadoPor, datos.idMedico, datos.porcentajePCL, datos.recomendaciones,
                datos.idConceptoReintegro, FormatDate(datos.inicioReubicacion), FormatDate(datos.finReubicacion), datos.descripcion,
                datos.idTipoHorario, datos.idOrdenadoPorHorario, FormatDate(datos.fechaInicioHorario), FormatDate(datos.fechaFinHorario),
                datos.idEstadoCaso, user.email, FormatDate(new Date()), '', FormatDate(new Date()));


            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertRefund(DataToInsert);
                    if (result.status === 200) {
                        setResultData(result.data);
                        setOpenSuccess(true);
                        setDocumento('');
                        setLsEmployee([]);
                        setDiagnosticoArray([]);
                        setFechaInicio(null);
                        setFechaFin(null);
                        setNumeroDia('');
                        reset();

                        setTimeout(() => {
                            if (result.status === 200) {
                                setViewListRefund(true);
                            }
                        }, 2500);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorNoHayDatos}`);
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
                open={openExamen}
                title="VISTA DE EXAMENES"
                handleClose={() => setOpenExamen(false)}
            >

            </FullScreenDialog>

            <ControlModal
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >

            </ControlModal>

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
                    <SubCard darkTitle title={<Typography variant="h4">DESCRIPCIÓN PATOLÓGICA</Typography>}>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnosticoArray(value)}
                                    value={diagnosticoArray}
                                    label="Diagnósticos"
                                    options={lsCie11}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idOrigen"
                                        label="Origen"
                                        defaultValue=""
                                        options={lsOrigenReintegro}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEstadoEmpleado"
                                        label="Estado del Empleado"
                                        defaultValue=""
                                        options={lsEstadoEmpleado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEstadoRestriccion"
                                        label="Estado de Restricción"
                                        defaultValue=""
                                        options={lsEstadoRestriccion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoRestriccion"
                                        label="Tipo de Restricción"
                                        defaultValue=""
                                        options={lsTipoRestriccion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Inicio de Restricción"
                                    value={fechaInicio}
                                    onChange={(e) => {
                                        setFechaInicio(e);
                                        if (fechaFin) {
                                            var result = NumeroDias(e, fechaFin);
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
                                        setFechaFin(e);
                                        if (fechaInicio) {
                                            var result = NumeroDias(fechaInicio, e);
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
                                    <InputSelect
                                        name="idOrdenadoPor"
                                        label="Ordenado Por"
                                        defaultValue=""
                                        options={lsOrdenadoPor}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idMedico"
                                        label="Médico"
                                        defaultValue=""
                                        options={lsEstadoEmpleado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="porcentajePCL"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">CONCEPTO DE REINTEGRO OCUPACIONAL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoReintegro"
                                        label="Concepto de Aptitud"
                                        defaultValue=""
                                        options={lsConceptoAptitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DE REUBICACIÓN</Typography>}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Inicio de Restricción"
                                        name="inicioReubicacion"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fin de Restricción"
                                        name="finReubicacion"
                                        defaultValue={new Date()}
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
                                <SubCard darkTitle title={<Typography variant="h4">SIN HORARIO EXTENDIDO</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idTipoHorario"
                                                    label="Tipo"
                                                    defaultValue=""
                                                    options={lsTipoRestriccion}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idOrdenadoPorHorario"
                                                    label="Ordenada Por"
                                                    defaultValue=""
                                                    options={lsOrdenarPorHorario}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha Inicio"
                                                    name="fechaInicioHorario"
                                                    defaultValue={new Date()}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha Fin"
                                                    name="fechaFinHorario"
                                                    defaultValue={new Date()}
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
                                        defaultValue=""
                                        options={lsEstadoCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">LISTA DE CHEQUEO</Typography>}>

                        <Transitions type="collapse" in={viewListRefund} position="top-left" direction="up">
                            <CheckListRefund idReintegro={resultData.id} />
                        </Transitions>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => setOpenReport(true)}>
                                        {TitleButton.Imprimir}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
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