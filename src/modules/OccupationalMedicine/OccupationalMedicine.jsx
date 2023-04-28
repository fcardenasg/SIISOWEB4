import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOccupationalMedicine } from 'formatdata/OccupationalMedicineForm';
import SubCard from 'ui-component/cards/SubCard';
import UploadIcon from '@mui/icons-material/Upload';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { InsertOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import InputDatePick from 'components/input/InputDatePick';

const OccupationalMedicine = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [filePdf, setFilePdf] = useState(null);
    const [filePdfMin, setFilePdfMin] = useState(null);

    const [fechaCaliUltimaInstancia, setFechaCaliUltimaInstancia] = useState(null);
    const [fechaInvestigacion, setFechaInvestigacion] = useState(null);
    const [diasDiferencia, setDiasDiferencia] = useState(0);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsResumenCaso, setLsResumenCaso] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsEntidadMotiEnvio, setLsEntidadMotiEnvio] = useState([]);
    const [lsEntidadDondeEnvia, setLsEntidadDondeEnvia] = useState([]);
    const [lsInvestigado, setLsInvestigado] = useState([]);
    const [lsOrigenEPS, setLsOrigenEPS] = useState([]);
    const [lsOrigenARL, setLsOrigenARL] = useState([]);
    const [lsJuntaCalificadaJRC, setLsJuntaCalificadaJRC] = useState([]);
    const [lsInstanciaOrigen, setLsInstanciaOrigen] = useState([]);

    const [lsInvestigacionEL, setLsInvestigacionEL] = useState([]);
    const [lsEstadoEnfermedadLaboral, setLsEstadoEnfermedadLaboral] = useState([]);
    const [lsPeligroAsociado, setLsPeligroAsociado] = useState([]);
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsAsesorEL, setLsAsesorEL] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState(undefined);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState(undefined);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [documento, setDocumento] = useState('');
    const [textDiagnistico, setTextDiagnostico] = useState('');
    const [lsDiagnistico, setLsDiagnistico] = useState([]);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const handleFechaInicio = async (event) => {
        try {
            setFechaCaliUltimaInstancia(event.target.value);
            var result = NumeroDias(event.target.value, fechaInvestigacion);
            setDiasDiferencia(result);
        } catch (error) {
            setDiasDiferencia(0);
            setOpenError(true);
            setErrorMessage(error.message);
        }
    }

    const handleFechaFin = async (event) => {
        try {
            setFechaInvestigacion(event.target.value);
            var result = NumeroDias(fechaCaliUltimaInstancia, event.target.value);
            setDiasDiferencia(result);
        } catch (error) {
            setDiasDiferencia(0);
            setOpenError(true);
            setErrorMessage(error.message);
        }
    }

    async function getAll() {
        try {
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerSegAfectado = await GetAllBySegmentoAfectado(0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAfectado(resultSegAfectado);

            const lsServerSubsegmento = await GetAllBySubsegment(0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSubsegmento(resultSubsegmento);

            const lsServerRegion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_REGION);
            var resultRegion = lsServerRegion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRegion(resultRegion);

            const lsServerJuntaCalificadaJRC = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultJuntaCalificadaJRC = lsServerJuntaCalificadaJRC.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsJuntaCalificadaJRC(resultJuntaCalificadaJRC);

            const lsServerInvestigado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultInvestigado = lsServerInvestigado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInvestigado(resultInvestigado);

            const lsServerEntidadDondeEnvia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ENDON_EN);
            var resultEntidadDondeEnvia = lsServerEntidadDondeEnvia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEntidadDondeEnvia(resultEntidadDondeEnvia);

            const lsServerResumenCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_RECASO);
            var resultResumenCaso = lsServerResumenCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResumenCaso(resultResumenCaso);

            const lsServerOrigenEPS = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ORIGEN_EPS);
            var resultOrigenEPS = lsServerOrigenEPS.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrigenEPS(resultOrigenEPS);

            const lsServerOrigenARL = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ORI_CA_ARL);
            var resultOrigenARL = lsServerOrigenARL.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrigenARL(resultOrigenARL);

            const lsServerInstanciaOrigen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_INS_ORIGEN);
            var resultInstanciaOrigen = lsServerInstanciaOrigen.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInstanciaOrigen(resultInstanciaOrigen);

            const lsServerLateralidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_LATERA);
            var resultLateralidad = lsServerLateralidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsLateralidad(resultLateralidad);

            const lsServerEntidadMotiEnvio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ENMO_EN);
            var resultEntidadMotiEnvio = lsServerEntidadMotiEnvio.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEntidadMotiEnvio(resultEntidadMotiEnvio);


            const lsServerEstadoEnfermedadLaboral = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDICINA_LABORAL_ESTADO_ENFERMEDAD_LABORAL);
            var resultEstadoEnfermedadLaboral = lsServerEstadoEnfermedadLaboral.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoEnfermedadLaboral(resultEstadoEnfermedadLaboral);

            const lsServerPeligroAsociado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDICINA_LABORAL_PELIGRO_ASOCIADO);
            var resultPeligroAsociado = lsServerPeligroAsociado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsPeligroAsociado(resultPeligroAsociado);

            const lsServerResultadoOrigen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDICINA_LABORAL_RESULTADO_EN_ORIGEN);
            var resultResultadoOrigen = lsServerResultadoOrigen.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResultadoOrigen(resultResultadoOrigen);

            const lsServerInvestigacionEL = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDICINA_LABORAL_INVESTIGACION_EL);
            var resultInvestigacionEL = lsServerInvestigacionEL.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInvestigacionEL(resultInvestigacionEL);


            const lsServerAsesorEl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDICINA_LABORAL_ASESOREL);
            var resultAsesorEL = lsServerAsesorEl.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAsesorEL(resultAsesorEL);
        } catch (error) { }
    }

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

    const handleDiagnostico = async (event) => {
        try {
            setTextDiagnostico(event.target.value);
            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {


                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDiagnistico(resultCie11);

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

    const allowedFiles = ['application/pdf'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFilePdf(e.target.result);
                }
            }
            else {
                setFilePdf('');
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleFile1 = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFilePdfMin(e.target.result);
                }
            }
            else {
                setFilePdfMin('');
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostOccupationalMedicine(documento, datos.resumenCaso, FormatDate(datos.fechaRetiro), segmentoAgrupado, segmentoAfectado, datos.subsegmento,
                datos.codDx, datos.nroFurel, datos.regionInfoLaboral, datos.lateralidad, datos.entidadQueMotivaEnvio, datos.entidadDondeEnvia, FormatDate(datos.fechaEntrega),
                FormatDate(datos.fechaEnvio), datos.investigado, datos.observaciones, FormatDate(datos.fechaCalificacionEps), datos.origenEps, datos.noSolicitudARL,
                FormatDate(datos.fechaCalifiOrigenARL), datos.origenARL, FormatDate(datos.fechaCalificacionPclARL), datos.pclARL, FormatDate(datos.fechaEstructuraARL),
                FormatDate(datos.fechaRecalificacionPclARL), datos.pclRecalificadaARL, FormatDate(datos.fechaEstructuraRecalificadaARL), FormatDate(datos.fechaCalificaOrigenJRC),
                datos.juntaCalifica, datos.noDictamenJRC, datos.origenJRC, datos.controversia, datos.conclusion, FormatDate(datos.fechaCalificacionPclJRC), datos.noDictamenPclJRC,
                datos.pclJRC, FormatDate(datos.fechaEstructuraPclJRC), datos.noActaRecursoJRC, FormatDate(datos.fechaRecalificacionPclJRC), datos.noDictamenRecalificacionJRC,
                datos.juntaReCalificacionJRC, datos.pclRecalificadaJRC, FormatDate(datos.fechaRecalificacionEstJRC), FormatDate(datos.fechaCalificaOrigenJNC),
                datos.noDictamenJNC, datos.origenJNC, FormatDate(datos.fechaCalificacionPclJNC), datos.noDictamenPclJNC, datos.pclJNC, FormatDate(datos.fechaEstructuraJNC),
                FormatDate(datos.fechaRecalificacionPclJNC), datos.noDictamenRecalificacionJNC, datos.pclRecalificacionJNC, datos.origenInstaFinal,
                FormatDate(datos.fechaEstructuracionOrigenInstaFinal), datos.instanciaOrigenInstaFinal, datos.pclFinalInstaFinal, datos.instanciaFinal,
                FormatDate(datos.fechaCalificacionPclInstFinal), FormatDate(datos.fechaEstructuracionPclInstFinal), datos.indemnizado, FormatDate(datos.fechaPagoInstaFinal),
                datos.entregadoMin, datos.indemnizadoRecalificado, FormatDate(datos.fechaPagoRecalificadoInstaFinal), datos.estadoRHT, datos.reintegro, datos.reubicado,
                datos.restringido, datos.jornadaLaboral, datos.indemnizacion, lsEmployee.sede, user.nameuser, user.nameuser, FormatDate(new Date()), FormatDate(new Date()),
                FormatDate(new Date()), FormatDate(new Date()), "", "", filePdf,

                datos.aplica, datos.motivoIE, datos.estadoEnfermedadLaboral, datos.resultadoOrigen, fechaCaliUltimaInstancia, fechaInvestigacion,
                datos.origenInvestigacion, diasDiferencia, datos.resumenWR, datos.accTrabajador, datos.resumenSG, datos.accSistema, datos.peligroAsociadoEnfermedad,
                datos.fechaEntregaMin, filePdfMin);

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertOccupationalMedicine(DataToInsert);

                    if (result.status === 200) {
                        setOpenSuccess(true);
                        reset();
                        setFilePdf(null);
                        setLsSegmentoAfectado([]);
                        setSegmentoAgrupado('');
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorNoHayDatos}`);
                }
            } else {
                setOpenError(true);
                setErrorMessage(`${Message.ErrorNoHayDatos}`);
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
                title="VISUALIZAR ARCHIVO"
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={filePdfMin} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Medicina Laboral"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Información Laboral</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="resumenCaso"
                                        label="Resumen Caso"
                                        options={lsResumenCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Retiro"
                                        name="fechaRetiro"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <InputOnChange
                                    label="DX"
                                    onKeyDown={handleDiagnostico}
                                    onChange={(e) => setTextDiagnostico(e?.target.value)}
                                    value={textDiagnistico}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={9}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="codDx"
                                        label="Diagnóstico"
                                        defaultValue=""
                                        options={lsDiagnistico}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="nroFurel"
                                        label="No. FUREL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="segmentoAgrupado"
                                    label="Segmento Agrupado"
                                    options={lsSegmentoAgrupado}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={segmentoAgrupado}
                                    onChange={(e) => setSegmentoAgrupado(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="segmentoAfectado"
                                    label="Segmento Afectado"
                                    options={lsSegmentoAfectado}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={segmentoAfectado}
                                    onChange={(e) => setSegmentoAfectado(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="subsegmento"
                                        label="Subsegmento"
                                        options={lsSubsegmento}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="regionInfoLaboral"
                                        label="Región"
                                        options={lsRegion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="lateralidad"
                                        label="Lateralidad"
                                        options={lsLateralidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entidadQueMotivaEnvio"
                                        label="Entidad que motiva el envio"
                                        options={lsEntidadMotiEnvio}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entidadDondeEnvia"
                                        label="Entidad Donde Envía"
                                        options={lsEntidadDondeEnvia}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Entrega"
                                        name="fechaEntrega"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Envío"
                                        name="fechaEnvio"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="investigado"
                                        label="Investigado"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="observaciones"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Calificación EPS</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Calificación"
                                        name="fechaCalificacionEps"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenEps"
                                        label="Orígenes"
                                        options={lsOrigenEPS}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Calificación ARL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noSolicitudARL"
                                        label="Nro. Solicitud"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalifiOrigenARL"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenARL"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación PCL"
                                        name="fechaCalificacionPclARL"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclARL"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraARL"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha ReCalificación PCL"
                                        name="fechaRecalificacionPclARL"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclRecalificadaARL"
                                        label="% PCL Recalificada"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraRecalificadaARL"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">JRC</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalificaOrigenJRC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="juntaCalifica"
                                        label="Junta Califica"
                                        options={lsJuntaCalificadaJRC}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenJRC"
                                        label="Nro. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenJRC"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="controversia"
                                        label="Controversia"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="conclusion"
                                        label="Conclusión"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación PCL"
                                        name="fechaCalificacionPclJRC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenPclJRC"
                                        label="Nro. Dictamen PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclJRC"
                                        label="PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraPclJRC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noActaRecursoJRC"
                                        label="Nro. Acta Recurso"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha ReCalificación PCL"
                                        name="fechaRecalificacionPclJRC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="noDictamenRecalificacionJRC"
                                        label="No Dictamen Recalificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="juntaReCalificacionJRC"
                                        label="Junta Recalificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclRecalificadaJRC"
                                        label="% PCL Recalificada"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Recalificación Est."
                                        name="fechaRecalificacionEstJRC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">JNC</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalificaOrigenJNC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenJNC"
                                        label="Nro. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenJNC"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalificacionPclJNC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenPclJNC"
                                        label="No. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclJNC"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraJNC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaRecalificacionPclJNC"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenRecalificacionJNC"
                                        label="No. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclRecalificacionJNC"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Investigación Enfermedad Laboral</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="aplica"
                                        label="Aplica"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="motivoIE"
                                        label="Investigación EL"
                                        options={lsInvestigacionEL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="estadoEnfermedadLaboral"
                                        label="Estado"
                                        options={lsEstadoEnfermedadLaboral}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenInvestigacion"
                                        label="Asesor EL"
                                        options={lsAsesorEL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="resultadoOrigen"
                                        label="Resultado Origen"
                                        options={lsResultadoOrigen}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <InputDatePick
                                    label="Fecha Calificación Última Instancia"
                                    value={fechaCaliUltimaInstancia}
                                    onChange={handleFechaInicio}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <InputDatePick
                                    label="Fecha Investigación"
                                    value={fechaInvestigacion}
                                    onChange={handleFechaFin}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <InputOnChange
                                    fullWidth
                                    disabled
                                    label="Diferencia De Día"
                                    onChange={(e) => setDiasDiferencia(e.target.event)}
                                    value={diasDiferencia}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="resumenWR"
                                        label="Resumen WR"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="accTrabajador"
                                        label="ACC Trabajador"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="resumenSG"
                                        label="Resumen SG"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="accSistema"
                                        label="ACC Sistema"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="peligroAsociadoEnfermedad"
                                        label="Peligro Asociado A La Enfermedad"
                                        options={lsPeligroAsociado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Instancia Final</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenInstaFinal"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructuración Origen"
                                        name="fechaEstructuracionOrigenInstaFinal"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="instanciaOrigenInstaFinal"
                                        label="Instancia Origen"
                                        options={lsInstanciaOrigen}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclFinalInstaFinal"
                                        label="% PCL Final"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="instanciaFinal"
                                        label="Instancia Final"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación PCL"
                                        name="fechaCalificacionPclInstFinal"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructuracion PCL"
                                        name="fechaEstructuracionPclInstFinal"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="indemnizado"
                                        label="Indemnizado"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Pago"
                                        name="fechaPagoInstaFinal"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entregadoMin"
                                        label="Entregado al MIN"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Entrega MIN"
                                        name="fechaEntregaMin"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <Button fullWidth size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                    {TitleButton.SubirArchivo}
                                    <input hidden accept="application/pdf" type="file" onChange={handleFile1} />
                                </Button>
                            </Grid>

                            <Grid item xs={2}>
                                <Button disabled={filePdfMin === null ? true : false} variant="outlined" color="info" size="large" fullWidth
                                    onClick={() => setOpenViewArchivo(true)} startIcon={<VisibilityIcon fontSize="large" />}>
                                    {TitleButton.VerArchivo}
                                </Button>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="indemnizadoRecalificado"
                                        label="Indemnizado Recalificado"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Pago"
                                        name="fechaPagoRecalificadoInstaFinal"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Estado ARL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="estadoRHT"
                                        label="Estado RHT"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="reintegro"
                                        label="Reintegro"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="reubicado"
                                        label="Reubicado"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="restringido"
                                        label="Restringido"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="jornadaLaboral"
                                        label="Jornada Laboral"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="indemnizacion"
                                        label="Indemnización"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Resultado Investigación Laboral</Typography>}>
                        <Grid container spacing={12}>
                            <Grid textAlign="center" item xs={12}>
                                <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                    SUBIR RESULTADO EN PDF
                                    <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            {filePdf && (
                                <object type="application/pdf"
                                    data={filePdf}
                                    width="1180"
                                    height="500"
                                />
                            )}
                        </Grid>

                        <Grid item sx={{ pt: 4 }} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/occupationalmedicine/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );


};

export default OccupationalMedicine;