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
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import * as yup from 'yup';

import Transitions from 'ui-component/extended/Transitions';
import InputOnChange from 'components/input/InputOnChange';
import InputDatePick from 'components/input/InputDatePick';
import useAuth from 'hooks/useAuth';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import CheckListRefund from './CheckListRefund';
import { PostRefund, PutRefund } from 'formatdata/RefundForm';
import { GetByIdRefund, UpdateRefunds } from 'api/clients/RefundClient';
import { GetAllUser } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes', icons: <AddBoxIcon fontSize="small" /> },
]

/* const validationSchema = yup.object().shape({
    resumen: yup.string().required(`${ValidationMessage.Requerido}`),
}); */

const Refund = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [viewListRefund, setViewListRefund] = useState(false);

    const [timeWait, setTimeWait] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);

    const [numeroDia, setNumeroDia] = useState('');
    const [documento, setDocumento] = useState('');
    const [lsRefund, setLsRefund] = useState([]);
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

    const methods = useForm(
        /* { resolver: yupResolver(validationSchema) } */
    );

    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200)
                setLsEmployee(lsServerEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx1(resultCie11);
                    }
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
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx2(resultCie11);
                    }
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

            const lsServerUsuario = await GetAllUser(0, 0);
            var resultUsuario = lsServerUsuario.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsUsuarios(resultUsuario);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const lsServerAtencion = await GetByIdRefund(id);
                if (lsServerAtencion.status === 200) {
                    setDocumento(lsServerAtencion.data.documento);
                    handleLoadingDocument(lsServerAtencion.data.documento);
                    setLsRefund(lsServerAtencion.data);
                    setFechaInicio(lsServerAtencion.data.fechaInicio);
                    setFechaFin(lsServerAtencion.data.fechaInicio);
                    setNumeroDia(lsServerAtencion.data.numeroDia);
                    setViewListRefund(true);

                    if (lsServerAtencion.data.dx1 !== undefined || lsServerAtencion.data.dx1 !== '') {
                        var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsServerAtencion.data.dx1);
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx1(resultCie11);
                        setTextDx1(lsServerAtencion.data.dx1);
                    }

                    if (lsServerAtencion.data.dx2 !== undefined || lsServerAtencion.data.dx2 !== '') {
                        var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsServerAtencion.data.dx2);
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx2(resultCie11);
                        setTextDx2(lsServerAtencion.data.dx2);
                    }
                }
            } catch (error) { }
        }

        getData();
    }, [id]);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutRefund(id, documento, datos.dx1, datos.dx2, datos.idOrigenDx1, datos.idOrigenDx2, datos.resumen,
                datos.idEstadoEmpleado, datos.idEstadoRestriccion, datos.idTipoRestriccion, FormatDate(fechaInicio),
                FormatDate(fechaFin), numeroDia, datos.idOrdenadoPor, datos.idMedico, datos.porcentajePCL, datos.recomendaciones,
                datos.idConceptoReintegro, FormatDate(datos.inicioReubicacion), FormatDate(datos.finReubicacion), datos.descripcion,
                datos.idTipoHorario, datos.idOrdenadoPorHorario, FormatDate(datos.fechaInicioHorario), FormatDate(datos.fechaFinHorario),
                datos.idEstadoCaso, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await UpdateRefunds(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorNoHayDatos}`);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsRefund.length !== 0)
            setTimeWait(true);
    }, 2000);

    return (
        <Fragment>
            <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
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

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="REGISTRAR MEDICINA LABORAL"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">DESCRIPCIÓN PATOLÓGICA</Typography>}>
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
                                            defaultValue={lsRefund.dx1}
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
                                            defaultValue={lsRefund.idOrigenDx1}
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
                                            defaultValue={lsRefund.dx2}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idOrigenDx2"
                                            label="Origen"
                                            defaultValue={lsRefund.idOrigenDx2}
                                            options={lsOrigenReintegro}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idOrigenDx2}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsRefund.resumen}
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
                                            defaultValue={lsRefund.idEstadoEmpleado}
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
                                            defaultValue={lsRefund.idEstadoRestriccion}
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
                                            defaultValue={lsRefund.idTipoRestriccion}
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
                                            defaultValue={lsRefund.idOrdenadoPor}
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
                                            defaultValue={lsRefund.idMedico}
                                            options={lsUsuarios}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idMedico}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            type="number"
                                            defaultValue={lsRefund.porcentajePCL}
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
                                            defaultValue={lsRefund.recomendaciones}
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
                        <SubCard darkTitle title={<Typography variant="h4">CONCEPTO DE REINTEGRO OCUPACIONAL</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idConceptoReintegro"
                                            label="Concepto de Aptitud"
                                            defaultValue={lsRefund.idConceptoReintegro}
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
                        <SubCard darkTitle title={<Typography variant="h4">DATOS DE REUBICACIÓN</Typography>}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Inicio de Restricción"
                                            name="inicioReubicacion"
                                            defaultValue={lsRefund.inicioReubicacion}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fin de Restricción"
                                            name="finReubicacion"
                                            defaultValue={lsRefund.finReubicacion}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsRefund.descripcion}
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
                                    <SubCard darkTitle title={<Typography variant="h4">SIN HORARIO EXTENDIDO</Typography>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTipoHorario"
                                                        label="Tipo"
                                                        defaultValue={lsRefund.idTipoHorario}
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
                                                        defaultValue={lsRefund.idOrdenadoPorHorario}
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
                                                        defaultValue={lsRefund.fechaInicioHorario}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Fin"
                                                        name="fechaFinHorario"
                                                        defaultValue={lsRefund.fechaFinHorario}
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
                                            defaultValue={lsRefund.idEstadoCaso}
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
                        <SubCard darkTitle title={<Typography variant="h4">LISTA DE CHEQUEO</Typography>}>

                            <Transitions type="collapse" in={viewListRefund} position="top-left" direction="up">
                                <CheckListRefund idReintegro={id} />
                            </Transitions>

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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/refund/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default Refund;