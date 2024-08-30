import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Tooltip,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import { NumeroDias } from 'components/helpers/Format';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllByTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import UploadIcon from '@mui/icons-material/Upload';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdOccupationalMedicine, UpdateOccupationalMedicines } from 'api/clients/OccupationalMedicineClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import InputDatePick from 'components/input/InputDatePick';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import Accordion from 'components/accordion/Accordion';

import {
    IconUser, IconReportMedical, IconAlertTriangle,
    IconClipboardText, IconReportSearch,
    IconReport, IconStatusChange, IconReportAnalytics
} from '@tabler/icons';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import AnimateButton from 'ui-component/extended/AnimateButton';

const OccupationalMedicine = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const [timeWait, setTimeWait] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [filePdf, setFilePdf] = useState(null);
    const [filePdfMin, setFilePdfMin] = useState(null);

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

    const [lsInvestigadoPor, setLsInvestigadoPor] = useState([]);
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [documento, setDocumento] = useState('');
    const [textDiagnistico, setTextDiagnostico] = useState('');
    const [lsDiagnistico, setLsDiagnistico] = useState([]);
    const [lsOccupationalMedicine, setLsOccupationalMedicine] = useState([]);

    const [lsInvestigacionEL, setLsInvestigacionEL] = useState([]);
    const [lsEstadoEnfermedadLaboral, setLsEstadoEnfermedadLaboral] = useState([]);
    const [lsPeligroAsociado, setLsPeligroAsociado] = useState([]);
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsAsesorEL, setLsAsesorEL] = useState([]);
    const [lsSituacionEmpleado, setLsSituacionEmpleado] = useState([]);

    const [fechaCaliUltimaInstancia, setFechaCaliUltimaInstancia] = useState(null);
    const [fechaInvestigacion, setFechaInvestigacion] = useState(null);
    const [diasDiferencia, setDiasDiferencia] = useState(0);
    const [lsVistoBueno, setLsVistoBueno] = useState([]);
    const [lsSalaCalificadora, setLsSalaCalificadora] = useState([]);

    const methods = useForm();
    const { handleSubmit } = methods;

    async function downloadFile() { DownloadFile(`${documento}medicinallaboral${new Date().getTime()}.pdf`, filePdf.replace("data:application/pdf;base64,", "")); }
    async function downloadFileMin() { DownloadFile(`${documento}medicinallaboral${new Date().getTime()}.pdf`, filePdfMin.replace("data:application/pdf;base64,", "")); }

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

    useEffect(() => {
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

                const lsServerInvestigadoPor = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_INVESTIGADOPOR);
                setLsInvestigadoPor(lsServerInvestigadoPor.data);

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

                const lsServerSalaCalificadora = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_SALACALIFICADORA);
                var resultSala = lsServerSalaCalificadora.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsSalaCalificadora(resultSala);

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

                const lsServerSituacionEmpleado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SITUACION_EMPLEADO);
                var resultSituacionEmpleado = lsServerSituacionEmpleado.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsSituacionEmpleado(resultSituacionEmpleado);

                const lsServerVistoBueno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.VISTO_BUENO);
                var resultVistoBueno = lsServerVistoBueno.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsVistoBueno(resultVistoBueno);
            } catch (error) { }
        }

        getAll();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const lsServerAtencion = await GetByIdOccupationalMedicine(id);
                if (lsServerAtencion.status === 200) {
                    setDocumento(lsServerAtencion.data.cedula);
                    const event = {
                        target: { value: lsServerAtencion.data.cedula }
                    }
                    handleLoadingDocument(event);

                    setLsOccupationalMedicine(lsServerAtencion.data);
                    setTextDiagnostico(lsServerAtencion.data.codDx);

                    setFechaCaliUltimaInstancia(lsServerAtencion.data.fechaCalificacionUltimaInstancia);
                    setFechaInvestigacion(lsServerAtencion.data.fechaInvestigacion);

                    var diasCalculados = NumeroDias(lsServerAtencion.data.fechaCalificacionUltimaInstancia, lsServerAtencion.data.fechaInvestigacion);
                    setDiasDiferencia(diasCalculados);

                    setFilePdfMin(lsServerAtencion.data.pdfMinisterio);
                    setFilePdf(lsServerAtencion.data.urlDocumento);

                    if (lsServerAtencion.data.codDx !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsServerAtencion.data.codDx);
                        setLsDiagnistico(lsServerCie11.data);
                    }
                }
            } catch (error) { }
        }

        getData();
    }, [id]);

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                setOpenError(true);
                setErrorMessage(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleDiagnostico = async (event) => {
        try {
            setTextDiagnostico(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDiagnistico(lsServerCie11.data);
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
                setFilePdfMin(null);
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleClick = async (datos) => {
        try {
            datos.id = id;
            datos.cedula = documento;
            datos.usuarioModifico = user.nameuser;
            datos.sede = lsEmployee.sede;
            datos.urlDocumento = filePdf || null;
            datos.fechaCalificacionUltimaInstancia = fechaCaliUltimaInstancia || null;
            datos.fechaInvestigacion = fechaInvestigacion || null;
            datos.diferenciaDia = diasDiferencia || null;
            datos.pdfMinisterio = filePdfMin || null;

            datos.fechaRetiro = datos.fechaRetiro || null;
            datos.fechaEstimadaInicioCaso = datos.fechaEstimadaInicioCaso || null;
            datos.fechaEntrega = datos.fechaEntrega || null;
            datos.fechaEnvio = datos.fechaEnvio || null;
            datos.fechaCalificacionEps = datos.fechaCalificacionEps || null;
            datos.fechaCalifiOrigenARL = datos.fechaCalifiOrigenARL || null;
            datos.fechaCalificacionPclARL = datos.fechaCalificacionPclARL || null;
            datos.fechaEstructuraARL = datos.fechaEstructuraARL || null;
            datos.fechaRecalificacionPclARL = datos.fechaRecalificacionPclARL || null;
            datos.fechaEstructuraRecalificadaARL = datos.fechaEstructuraRecalificadaARL || null;
            datos.fechaCalificaOrigenJRC = datos.fechaCalificaOrigenJRC || null;
            datos.fechaCalificacionPclJRC = datos.fechaCalificacionPclJRC || null;
            datos.fechaEstructuraPclJRC = datos.fechaEstructuraPclJRC || null;
            datos.fechaRecalificacionPclJRC = datos.fechaRecalificacionPclJRC || null;
            datos.fechaRecalificacionEstJRC = datos.fechaRecalificacionEstJRC || null;
            datos.fechaEstructuracionJRC = datos.fechaEstructuracionJRC || null;
            datos.fechaCalificaOrigenJNC = datos.fechaCalificaOrigenJNC || null;
            datos.fechaCalificacionPclJNC = datos.fechaCalificacionPclJNC || null;
            datos.fechaEstructuraJNC = datos.fechaEstructuraJNC || null;
            datos.fechaRecalificacionPclJNC = datos.fechaRecalificacionPclJNC || null;
            datos.fechaEstructuracionOrigenInstaFinal = datos.fechaEstructuracionOrigenInstaFinal || null;
            datos.fechaCalificacionPclInstFinal = datos.fechaCalificacionPclInstFinal || null;
            datos.fechaEstructuracionPclInstFinal = datos.fechaEstructuracionPclInstFinal || null;
            datos.fechaPagoInstaFinal = datos.fechaPagoInstaFinal || null;
            datos.fechaEntregaMin = datos.fechaEntregaMin || null;
            datos.fechaPagoRecalificadoInstaFinal = datos.fechaPagoRecalificadoInstaFinal || null;

            const result = await UpdateOccupationalMedicines(datos);
            if (result.status === 200) {
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsOccupationalMedicine.length !== 0)
            setTimeWait(true);
    }, 2000);

    return (
        <Fragment>
            <ControlModal
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
            >
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Button variant="outlined" color="error" size={matchesXS ? 'small' : 'large'} /* fullWidth */
                            onClick={() => setFilePdfMin(null)} startIcon={<RemoveCircleOutlineIcon fontSize="large" />}>
                            Remover Archivo
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button fullWidth size={matchesXS ? 'small' : 'large'} variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                            {TitleButton.SubirArchivo}
                            <input hidden accept="application/pdf" type="file" onChange={handleFile1} />
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <ViewPDF dataPDF={filePdfMin} />
                    </Grid>
                </Grid>
            </ControlModal>

            {timeWait ?
                <Fragment>
                    <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                title="Actualizar Medicina Laboral"
                                disabled={true}
                                key={lsEmployee.documento}
                                documento={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <StickyActionBar
                                mainTitle="Acciones"
                                titleButtonOne={TitleButton.Actualizar}
                                titleButtonTwo={TitleButton.Cancelar}
                                onClickSave={handleSubmit(handleClick)}
                                onClickUpdate={() => navigate('/occupationalmedicine/list')}
                                disabledUpdate={false}
                                disabledSave={false}
                                showButton={false}
                                threshold={550}
                            >
                                <Grid item xs={12}>
                                    <Accordion title={<><IconUser /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información Laboral</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha De Registro"
                                                        name="fechaRetiro"
                                                        defaultValue={lsOccupationalMedicine.fechaRetiro}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.resumenCaso}
                                                        name="resumenCaso"
                                                        label="Resumen Caso"
                                                        options={lsResumenCaso}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.situacionEmpleado}
                                                        name="situacionEmpleado"
                                                        label="Situación Del Empleado"
                                                        options={lsSituacionEmpleado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        defaultValue={lsOccupationalMedicine.fechaEstimadaInicioCaso}
                                                        label="Fecha Estimada Inicio Caso"
                                                        name="fechaEstimadaInicioCaso"
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <InputOnChange
                                                    label="Código de Diagnóstico"
                                                    onKeyDown={handleDiagnostico}
                                                    onChange={(e) => setTextDiagnostico(e?.target.value)}
                                                    value={textDiagnistico}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={9}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.codDx}
                                                        name="codDx"
                                                        label="Diagnóstico"
                                                        options={lsDiagnistico}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.nroFurel}
                                                        fullWidth
                                                        name="nroFurel"
                                                        label="No. FUREL"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.segmentoAgrupado}
                                                        name="segmentoAgrupado"
                                                        label="Segmento Agrupado"
                                                        options={lsSegmentoAgrupado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.segmentoAfectado}
                                                        name="segmentoAfectado"
                                                        label="Segmento Afectado"
                                                        options={lsSegmentoAfectado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.subsegmento}
                                                        name="subsegmento"
                                                        label="Subsegmento"
                                                        options={lsSubsegmento}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.regionInfoLaboral}
                                                        name="regionInfoLaboral"
                                                        label="Región"
                                                        options={lsRegion}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.lateralidad}
                                                        name="lateralidad"
                                                        label="Lateralidad"
                                                        options={lsLateralidad}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.entidadQueMotivaEnvio}
                                                        name="entidadQueMotivaEnvio"
                                                        label="Entidad que motiva el envio"
                                                        options={lsEntidadMotiEnvio}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.entidadDondeEnvia}
                                                        name="entidadDondeEnvia"
                                                        label="Entidad Donde Envía"
                                                        options={lsEntidadDondeEnvia}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha de Entrega"
                                                        name="fechaEntrega"
                                                        defaultValue={lsOccupationalMedicine.fechaEntrega}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha de Envío"
                                                        name="fechaEnvio"
                                                        defaultValue={lsOccupationalMedicine.fechaEnvio}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.investigado}
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
                                                        defaultValue={lsOccupationalMedicine.observaciones}
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
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconReportMedical /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Calificación EPS</Typography></>}>
                                        <Grid container spacing={2} sx={{ my: 2 }}>
                                            <Grid item xs={12} md={6}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha de Calificación"
                                                        name="fechaCalificacionEps"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificacionEps}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.origenEps}
                                                        name="origenEps"
                                                        label="Orígenes"
                                                        options={lsOrigenEPS}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconAlertTriangle /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Calificación ARL</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noSolicitudARL1}
                                                        fullWidth
                                                        name="noSolicitudARL1"
                                                        label="Nro. Solicitud 1"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noSolicitudARL2}
                                                        fullWidth
                                                        name="noSolicitudARL2"
                                                        label="Nro. Solicitud 2"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        defaultValue={lsOccupationalMedicine.fechaCalifiOrigenARL}
                                                        label="Fecha Calificación Origen"
                                                        name="fechaCalifiOrigenARL"
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.origenARL}
                                                        name="origenARL"
                                                        label="Origen"
                                                        options={lsOrigenARL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Calificación PCL"
                                                        name="fechaCalificacionPclARL"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificacionPclARL}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclARL}
                                                        type="number"
                                                        fullWidth
                                                        name="pclARL"
                                                        label="% PCL"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructura"
                                                        name="fechaEstructuraARL"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuraARL}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha ReCalificación PCL"
                                                        name="fechaRecalificacionPclARL"
                                                        defaultValue={lsOccupationalMedicine.fechaRecalificacionPclARL}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        type="number"
                                                        fullWidth
                                                        name="pclRecalificadaARL"
                                                        label="% PCL Recalificada"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        defaultValue={lsOccupationalMedicine.pclRecalificadaARL}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructura"
                                                        name="fechaEstructuraRecalificadaARL"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuraRecalificadaARL}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconClipboardText /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">JRC</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Calificación Origen"
                                                        name="fechaCalificaOrigenJRC"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificaOrigenJRC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.juntaCalifica}
                                                        name="juntaCalifica"
                                                        label="Junta Califica"
                                                        options={lsJuntaCalificadaJRC}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noDictamenJRC}
                                                        fullWidth
                                                        name="noDictamenJRC"
                                                        label="Nro. Dictamen"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.origenJRC}
                                                        name="origenJRC"
                                                        label="Origen"
                                                        options={lsOrigenARL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.controversia}
                                                        fullWidth
                                                        name="controversia"
                                                        label="Controversia"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.conclusion}
                                                        fullWidth
                                                        name="conclusion"
                                                        label="Conclusión"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Calificación PCL"
                                                        name="fechaCalificacionPclJRC"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificacionPclJRC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noDictamenPclJRC}
                                                        fullWidth
                                                        name="noDictamenPclJRC"
                                                        label="Nro. Dictamen PCL"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclJRC}
                                                        type="number"
                                                        fullWidth
                                                        name="pclJRC"
                                                        label="PCL"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructura"
                                                        name="fechaEstructuraPclJRC"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuraPclJRC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noActaRecursoJRC}
                                                        fullWidth
                                                        name="noActaRecursoJRC"
                                                        label="Nro. Acta Recurso"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha ReCalificación PCL"
                                                        name="fechaRecalificacionPclJRC"
                                                        defaultValue={lsOccupationalMedicine.fechaRecalificacionPclJRC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noDictamenRecalificacionJRC}
                                                        type="number"
                                                        fullWidth
                                                        name="noDictamenRecalificacionJRC"
                                                        label="No Dictamen Recalificación"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.juntaReCalificacionJRC}
                                                        name="juntaReCalificacionJRC"
                                                        label="Junta Recalificación"
                                                        options={lsJuntaCalificadaJRC}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclRecalificadaJRC}
                                                        type="number"
                                                        fullWidth
                                                        name="pclRecalificadaJRC"
                                                        label="% PCL Recalificada"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Recalificación Est."
                                                        name="fechaRecalificacionEstJRC"
                                                        defaultValue={lsOccupationalMedicine.fechaRecalificacionEstJRC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructuración JRC"
                                                        name="fechaEstructuracionJRC"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuracionJRC}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconClipboardText /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">JNC</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Calificación Origen"
                                                        name="fechaCalificaOrigenJNC"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificaOrigenJNC}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noDictamenJNC}
                                                        fullWidth
                                                        name="noDictamenJNC"
                                                        label="Nro. Dictamen"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.origenJNC}
                                                        name="origenJNC"
                                                        label="Origen"
                                                        options={lsOrigenARL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Calificación PCL"
                                                        name="fechaCalificacionPclJNC"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificacionPclJNC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noDictamenPclJNC}
                                                        fullWidth
                                                        name="noDictamenPclJNC"
                                                        label="No. Dictamen"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclJNC}
                                                        type="number"
                                                        fullWidth
                                                        name="pclJNC"
                                                        label="% PCL"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructura"
                                                        name="fechaEstructuraJNC"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuraJNC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Recalificación Origen"
                                                        name="fechaRecalificacionPclJNC"
                                                        defaultValue={lsOccupationalMedicine.fechaRecalificacionPclJNC}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.noDictamenRecalificacionJNC}
                                                        fullWidth
                                                        name="noDictamenRecalificacionJNC"
                                                        label="No. Dictamen"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclRecalificacionJNC}
                                                        type="number"
                                                        fullWidth
                                                        name="pclRecalificacionJNC"
                                                        label="% PCL"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclInstaFinal}
                                                        type="number"
                                                        fullWidth
                                                        name="pclInstaFinal"
                                                        label="Pcl Instancia Final"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.salaCalificadoraJNC}
                                                        name="salaCalificadoraJNC"
                                                        label="Sala Calificadora"
                                                        options={lsSalaCalificadora}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={9}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.medicoCalificadorJNC}
                                                        fullWidth
                                                        name="medicoCalificadorJNC"
                                                        label="Médico Calificador"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.salaCalificadoraPCLJNC}
                                                        name="salaCalificadoraPCLJNC"
                                                        label="Sala Calificadora PCL"
                                                        options={lsSalaCalificadora}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={9}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.medicoCalificadorPCLJNC}
                                                        fullWidth
                                                        name="medicoCalificadorPCLJNC"
                                                        label="Médico Calificador"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconReportSearch /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Investigación Enfermedad Laboral</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.aplica}
                                                        name="aplica"
                                                        label="Aplica"
                                                        options={lsInvestigado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idInvestigadoPor"
                                                        label="Investigado Por"
                                                        options={lsInvestigadoPor}
                                                        defaultValue={lsOccupationalMedicine.idInvestigadoPor}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="motivoIE"
                                                        label="Investigación EL"
                                                        defaultValue={lsOccupationalMedicine.motivoIE}
                                                        options={lsInvestigacionEL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.estadoEnfermedadLaboral}
                                                        name="estadoEnfermedadLaboral"
                                                        label="Estado"
                                                        options={lsEstadoEnfermedadLaboral}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.origenInvestigacion}
                                                        name="origenInvestigacion"
                                                        label="Asesor EL"
                                                        options={lsAsesorEL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.resultadoOrigen}
                                                        name="resultadoOrigen"
                                                        label="Resultado Origen"
                                                        options={lsResultadoOrigen}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePick
                                                    label="Fecha Calificación Última Instancia"
                                                    value={fechaCaliUltimaInstancia}
                                                    onChange={handleFechaInicio}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePick
                                                    label="Fecha Investigación"
                                                    value={fechaInvestigacion}
                                                    onChange={handleFechaFin}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputOnChange
                                                    fullWidth
                                                    disabled
                                                    label="Diferencia De Día"
                                                    onChange={(e) => setDiasDiferencia(e.target.event)}
                                                    value={diasDiferencia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.vistoBueno}
                                                        name="vistoBueno"
                                                        label="Visto Bueno"
                                                        options={lsVistoBueno}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        fullWidth
                                                        defaultValue={lsOccupationalMedicine.resumenWR}
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
                                                        defaultValue={lsOccupationalMedicine.accTrabajador}
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
                                                        defaultValue={lsOccupationalMedicine.resumenSG}
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
                                                        defaultValue={lsOccupationalMedicine.accSistema}
                                                        name="accSistema"
                                                        label="ACC Sistema"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        rows={4}
                                                        multiline
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.peligroAsociadoEnfermedad}
                                                        name="peligroAsociadoEnfermedad"
                                                        label="Peligro Asociado A La Enfermedad"
                                                        options={lsPeligroAsociado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                        </Grid>
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconReport /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Instancia Final</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.origenInstaFinal}
                                                        name="origenInstaFinal"
                                                        label="Origen"
                                                        options={lsOrigenARL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructuración Origen"
                                                        name="fechaEstructuracionOrigenInstaFinal"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuracionOrigenInstaFinal}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.instanciaOrigenInstaFinal}
                                                        name="instanciaOrigenInstaFinal"
                                                        label="Instancia Origen"
                                                        options={lsInstanciaOrigen}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.pclFinalInstaFinal}
                                                        fullWidth
                                                        name="pclFinalInstaFinal"
                                                        label="% PCL Final"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.instanciaFinal}
                                                        name="instanciaFinal"
                                                        label="Instancia Final"
                                                        options={lsInstanciaOrigen}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Calificación PCL"
                                                        name="fechaCalificacionPclInstFinal"
                                                        defaultValue={lsOccupationalMedicine.fechaCalificacionPclInstFinal}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Estructuracion PCL"
                                                        name="fechaEstructuracionPclInstFinal"
                                                        defaultValue={lsOccupationalMedicine.fechaEstructuracionPclInstFinal}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.indemnizado}
                                                        name="indemnizado"
                                                        label="Indemnizado"
                                                        options={lsInvestigado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Pago"
                                                        name="fechaPagoInstaFinal"
                                                        defaultValue={lsOccupationalMedicine.fechaPagoInstaFinal}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.entregadoMin}
                                                        name="entregadoMin"
                                                        label="Entregado al MIN"
                                                        options={lsInvestigado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Entrega MIN"
                                                        name="fechaEntregaMin"
                                                        defaultValue={lsOccupationalMedicine.fechaEntregaMin}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={4} md={2} lg={1.3}>
                                                <Tooltip title={TitleButton.SubirArchivo}>
                                                    <Button fullWidth size={matchesXS ? 'small' : 'large'} variant="outlined" component="label">
                                                        <input hidden accept="application/pdf" type="file" onChange={handleFile1} />
                                                        <UploadIcon fontSize="medium" />
                                                    </Button>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item xs={4} md={2} lg={1.3}>
                                                <Tooltip title="Descargar">
                                                    <Button disabled={filePdfMin === null ? true : false} variant="outlined" color="info" size={matchesXS ? 'small' : 'large'} fullWidth onClick={downloadFileMin}>
                                                        <DownloadIcon fontSize="medium" />
                                                    </Button>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item xs={4} md={2} lg={1.3}>
                                                <Tooltip title={TitleButton.Eliminar}>
                                                    <Button disabled={filePdfMin === null ? true : false} variant="outlined" color="error" size={matchesXS ? 'small' : 'large'} fullWidth onClick={() => setFilePdfMin(null)}>
                                                        <ClearIcon fontSize="medium" />
                                                    </Button>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={lsOccupationalMedicine.indemnizadoRecalificado}
                                                        name="indemnizadoRecalificado"
                                                        label="Indemnizado Recalificado"
                                                        options={lsInvestigado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha Pago"
                                                        name="fechaPagoRecalificadoInstaFinal"
                                                        defaultValue={lsOccupationalMedicine.fechaPagoRecalificadoInstaFinal}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconStatusChange /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Estado ARL</Typography></>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsOccupationalMedicine.estadoRHT}
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
                                                        defaultValue={lsOccupationalMedicine.reintegro}
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
                                                        defaultValue={lsOccupationalMedicine.reubicado}
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
                                                        defaultValue={lsOccupationalMedicine.restringido}
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
                                                        defaultValue={lsOccupationalMedicine.jornadaLaboral}
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
                                                        defaultValue={lsOccupationalMedicine.indemnizacion}
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
                                    </Accordion>
                                </Grid>

                                <Grid item xs={12}>
                                    <Accordion title={<><IconReportAnalytics /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Resultado Investigación Laboral</Typography></>}>
                                        <Grid container spacing={2} sx={{ pb: 5 }}>
                                            <Grid item xs={6} md={4} lg={2}>
                                                <AnimateButton>
                                                    <Button fullWidth variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                                        {TitleButton.SubirArchivo}
                                                        <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={2}>
                                                <AnimateButton>
                                                    <Button variant="outlined" onClick={downloadFile} disabled={filePdf === null ? true : false} startIcon={<DownloadIcon fontSize="large" />} fullWidth>
                                                        Descargar
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={2}>
                                                <AnimateButton>
                                                    <Button variant="outlined" color="error" onClick={() => setFilePdf(null)} disabled={filePdf === null ? true : false} startIcon={<ClearIcon fontSize="large" />} fullWidth>
                                                        Eliminar
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Accordion>
                                </Grid>
                            </StickyActionBar>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </Fragment>
    );
};

export default OccupationalMedicine;