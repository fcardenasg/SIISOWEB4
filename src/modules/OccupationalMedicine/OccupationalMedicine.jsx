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
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import { PostOccupationalMedicine } from 'formatdata/OccupationalMedicineForm';
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
import Accordion from 'components/accordion/Accordion';

import {
    IconUser, IconReportMedical, IconAlertTriangle,
    IconClipboardText, IconReportSearch,
    IconReport, IconStatusChange, IconReportAnalytics
} from '@tabler/icons';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';

const OccupationalMedicine = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [disabledButttons, setDisabledButttons] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
    const [lsSalaCalificadora, setLsSalaCalificadora] = useState([]);
    const [lsOrigenEPS, setLsOrigenEPS] = useState([]);
    const [lsOrigenARL, setLsOrigenARL] = useState([]);
    const [lsJuntaCalificadaJRC, setLsJuntaCalificadaJRC] = useState([]);
    const [lsInstanciaOrigen, setLsInstanciaOrigen] = useState([]);

    const [lsInvestigacionEL, setLsInvestigacionEL] = useState([]);
    const [lsEstadoEnfermedadLaboral, setLsEstadoEnfermedadLaboral] = useState([]);
    const [lsPeligroAsociado, setLsPeligroAsociado] = useState([]);
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsAsesorEL, setLsAsesorEL] = useState([]);
    const [lsSituacionEmpleado, setLsSituacionEmpleado] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [documento, setDocumento] = useState('');
    const [textDiagnistico, setTextDiagnostico] = useState('');
    const [lsDiagnistico, setLsDiagnistico] = useState([]);
    const [lsVistoBueno, setLsVistoBueno] = useState([]);

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
                    setErrorMessage(Message.ErrorDocumento);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
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
        async function getAll() {
            try {
                const lsServerRegion = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_REGION);
                setLsRegion(lsServerRegion.data);

                const lsServerSalaCalificadora = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_SALACALIFICADORA);
                setLsSalaCalificadora(lsServerSalaCalificadora.data);

                const lsServerJuntaCalificadaJRC = await GetByTipoCatalogoCombo(CodCatalogo.Departamento);
                setLsJuntaCalificadaJRC(lsServerJuntaCalificadaJRC.data);

                const lsServerInvestigado = await GetByTipoCatalogoCombo(CodCatalogo.Opciones_SINO);
                setLsInvestigado(lsServerInvestigado.data);

                const lsServerEntidadDondeEnvia = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ENDON_EN);
                setLsEntidadDondeEnvia(lsServerEntidadDondeEnvia.data);

                const lsServerResumenCaso = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_RECASO);
                setLsResumenCaso(lsServerResumenCaso.data);

                const lsServerOrigenEPS = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ORIGEN_EPS);
                setLsOrigenEPS(lsServerOrigenEPS.data);

                const lsServerOrigenARL = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ORI_CA_ARL);
                setLsOrigenARL(lsServerOrigenARL.data);

                const lsServerInstanciaOrigen = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_INS_ORIGEN);
                setLsInstanciaOrigen(lsServerInstanciaOrigen.data);

                const lsServerLateralidad = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_LATERA);
                setLsLateralidad(lsServerLateralidad.data);

                const lsServerEntidadMotiEnvio = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ENMO_EN);
                setLsEntidadMotiEnvio(lsServerEntidadMotiEnvio.data);

                const lsServerEstadoEnfermedadLaboral = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_ESTADO_ENFERMEDAD_LABORAL);
                setLsEstadoEnfermedadLaboral(lsServerEstadoEnfermedadLaboral.data);

                const lsServerPeligroAsociado = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_PELIGRO_ASOCIADO);
                setLsPeligroAsociado(lsServerPeligroAsociado.data);

                const lsServerResultadoOrigen = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_RESULTADO_EN_ORIGEN);
                setLsResultadoOrigen(lsServerResultadoOrigen.data);

                const lsServerInvestigacionEL = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_INVESTIGACION_EL);
                setLsInvestigacionEL(lsServerInvestigacionEL.data);

                const lsServerAsesorEl = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_ASESOREL);
                setLsAsesorEL(lsServerAsesorEl.data);

                const lsServerSituacionEmpleado = await GetByTipoCatalogoCombo(CodCatalogo.SITUACION_EMPLEADO);
                setLsSituacionEmpleado(lsServerSituacionEmpleado.data);

                const lsServerVistoBueno = await GetByTipoCatalogoCombo(CodCatalogo.VISTO_BUENO);
                setLsVistoBueno(lsServerVistoBueno.data);

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
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostOccupationalMedicine(documento, datos.resumenCaso, datos.situacionEmpleado, FormatDate(datos.fechaRetiro), datos.segmentoAgrupado, datos.segmentoAfectado,
                datos.subsegmento, datos.codDx, datos.nroFurel, datos.regionInfoLaboral, datos.lateralidad, datos.entidadQueMotivaEnvio, datos.entidadDondeEnvia, FormatDate(datos.fechaEntrega),
                FormatDate(datos.fechaEnvio), datos.investigado, datos.observaciones, FormatDate(datos.fechaCalificacionEps), datos.origenEps, datos.noSolicitudARL1, datos.noSolicitudARL2,
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
                datos.restringido, datos.jornadaLaboral, datos.indemnizacion, lsEmployee.sede, filePdf,
                datos.aplica, datos.motivoIE, datos.estadoEnfermedadLaboral, datos.resultadoOrigen, fechaCaliUltimaInstancia, fechaInvestigacion,
                datos.origenInvestigacion, diasDiferencia, datos.resumenWR, datos.accTrabajador, datos.resumenSG, datos.accSistema, datos.peligroAsociadoEnfermedad,
                datos.fechaEntregaMin, filePdfMin, user.nameuser, undefined, undefined, undefined,
                datos.fechaEstimadaInicioCaso, datos.vistoBueno, datos.pclInstaFinal, datos.fechaEstructuracionJRC, datos.salaCalificadoraJNC, datos.medicoCalificadorJNC);

            const result = await InsertOccupationalMedicine(DataToInsert);
            if (result.status === 200) {
                if (result.data === Message.ErrorDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                } else if (result.data === Message.NoExisteDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.NoExisteDocumento);
                } else if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                    setDisabledButttons(true);
                    reset();
                    setFilePdf(null);
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
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
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
                    <StickyActionBar
                        mainTitle="Acciones"
                        titleButtonOne={TitleButton.Guardar}
                        titleButtonTwo={TitleButton.Cancelar}
                        onClickSave={handleSubmit(handleClick)}
                        onClickUpdate={() => navigate('/occupationalmedicine/list')}
                        disabledUpdate={false}
                        disabledSave={disabledButttons}
                        showButton={false}
                        threshold={510}
                    >
                        <Grid item xs={12}>
                            <Accordion title={<><IconUser /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información Laboral</Typography></>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha De Registro"
                                                name="fechaRetiro"
                                                defaultValue={new Date()}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                label="Fecha Estimada Inicio Caso"
                                                name="fechaEstimadaInicioCaso"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputOnChange
                                            label="DX"
                                            onKeyDown={handleDiagnostico}
                                            onChange={(e) => setTextDiagnostico(e?.target.value)}
                                            value={textDiagnistico}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha de Envío"
                                                name="fechaEnvio"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
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
                                                defaultValue={null}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
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
                            </Accordion>
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconAlertTriangle /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Calificación ARL</Typography></>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
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
                                                label="Fecha Calificación Origen"
                                                name="fechaCalifiOrigenARL"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
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

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraARL"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha ReCalificación PCL"
                                                name="fechaRecalificacionPclARL"
                                                defaultValue={null}
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
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraRecalificadaARL"
                                                defaultValue={null}
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputText
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputText
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
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

                                    <Grid item xs={12} md={6} lg={3}>
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

                                    <Grid item xs={12} md={6} lg={3}>
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

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Recalificación Est."
                                                name="fechaRecalificacionEstJRC"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructuración JRC"
                                                name="fechaEstructuracionJRC"
                                                defaultValue={null}
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
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
                                                name="origenJNC"
                                                label="Origen"
                                                options={lsOrigenARL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaCalificacionPclJNC"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenPclJNC"
                                                label="No. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
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

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraJNC"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaRecalificacionPclJNC"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenRecalificacionJNC"
                                                label="No. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
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

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclInstaFinal"
                                                label="Pcl Instancia Final"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="salaCalificadoraJNC"
                                                label="Sala Calificadora"
                                                options={lsSalaCalificadora}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={10} lg={8}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="medicoCalificadorJNC"
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
                                                name="motivoIE"
                                                label="Investigación EL"
                                                options={lsInvestigacionEL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                            </Accordion>
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconReport /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Instancia Final</Typography></>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                fullWidth
                                                name="pclFinalInstaFinal"
                                                label="% PCL Final"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
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

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Calificación PCL"
                                                name="fechaCalificacionPclInstFinal"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructuracion PCL"
                                                name="fechaEstructuracionPclInstFinal"
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={6} md={2}>
                                        <Button fullWidth size={matchesXS ? 'small' : 'large'} variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                            {TitleButton.SubirArchivo}
                                            <input hidden accept="application/pdf" type="file" onChange={handleFile1} />
                                        </Button>
                                    </Grid>

                                    <Grid item xs={6} md={2}>
                                        <Button disabled={filePdfMin === null ? true : false} variant="outlined" color="info" size={matchesXS ? 'small' : 'large'} fullWidth
                                            onClick={() => setOpenViewArchivo(true)} startIcon={<VisibilityIcon fontSize="large" />}>
                                            {TitleButton.VerArchivo}
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
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
                                                defaultValue={null}
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
                                <Grid container spacing={12}>
                                    <Grid textAlign="center" item xs={12}>
                                        <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                            Subir Resultado En PDF
                                            <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ pt: 4 }}>
                                    {filePdf && (
                                        <object type="application/pdf"
                                            data={filePdf}
                                            width="1100"
                                            height="500"
                                        />
                                    )}
                                </Grid>
                            </Accordion>
                        </Grid>
                    </StickyActionBar>
                </Grid>
            </Grid>
        </Fragment>
    );


};

export default OccupationalMedicine;