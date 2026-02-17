import {
    Button,
    Grid,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { AccionMenu, CodCatalogo, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ViewEmployee from 'components/views/ViewEmployee';

import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { InsertOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import Accordion from 'components/accordion/Accordion';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    IconAlertTriangle,
    IconClipboardText,
    IconReport,
    IconReportAnalytics,
    IconReportMedical,
    IconReportSearch,
    IconStatusChange,
    IconUser
} from '@tabler/icons';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import { useBoolean } from 'hooks/use-boolean';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from "yup";

const validationSchema = yup.object().shape({
    documento: yup.string().required("El documento es requerido"),
});

const OccupationalMedicine = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const disabledInvestigacionEL = useBoolean(false);

    const [disabledButttons, setDisabledButttons] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [filePdf, setFilePdf] = useState(null);
    const [filePdfMin, setFilePdfMin] = useState(null);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsResumenCaso, setLsResumenCaso] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsEntidadMotiEnvio, setLsEntidadMotiEnvio] = useState([]);
    const [lsEntidadDondeEnvia, setLsEntidadDondeEnvia] = useState([]);
    const [lsInvestigado, setLsInvestigado] = useState([]);
    const [lsEntidadInformaInstanciaFinal, setLsEntidadInformaInstanciaFinal] = useState([]);
    const [lsSalaCalificadora, setLsSalaCalificadora] = useState([]);
    const [lsOrigenEPS, setLsOrigenEPS] = useState([]);
    const [lsOrigenARL, setLsOrigenARL] = useState([]);
    const [lsJuntaCalificadaJRC, setLsJuntaCalificadaJRC] = useState([]);
    const [lsInstanciaOrigen, setLsInstanciaOrigen] = useState([]);

    const [lsInvestigacionEL, setLsInvestigacionEL] = useState([]);
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsAsesorEL, setLsAsesorEL] = useState([]);
    const [lsSituacionEmpleado, setLsSituacionEmpleado] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [lsInvestigadoPor, setLsInvestigadoPor] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [textDiagnistico, setTextDiagnostico] = useState('');
    const [lsDiagnistico, setLsDiagnistico] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, reset, setValue, resetField, watch, formState: { errors } } = methods;
    const valueAplica = watch('aplica');
    const documento = watch('documento');

    async function downloadFile() { DownloadFile(`${documento}medicinallaboral${new Date().getTime()}.pdf`, filePdf.replace("data:application/pdf;base64,", "")); }
    async function downloadFileMin() { DownloadFile(`${documento}medicinallaboral${new Date().getTime()}.pdf`, filePdfMin.replace("data:application/pdf;base64,", "")); }

    const handleDocumento = async (event) => {
        try {
            setValue("documento", event?.target.value, { shouldValidate: true });

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
                setFilePdf(null);
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleFileMin = (event) => {
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

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerInvestigadoPor = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_INVESTIGADOPOR);
                setLsInvestigadoPor(lsServerInvestigadoPor.data);

                const lsEntidadInforma = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ENTIDADINFORMA);
                setLsEntidadInformaInstanciaFinal(lsEntidadInforma.data);

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

                const lsServerResultadoOrigen = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_RESULTADO_EN_ORIGEN);
                setLsResultadoOrigen(lsServerResultadoOrigen.data);

                const lsServerInvestigacionEL = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_INVESTIGACION_EL);
                setLsInvestigacionEL(lsServerInvestigacionEL.data);

                const lsServerAsesorEl = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_ASESOREL);
                setLsAsesorEL(lsServerAsesorEl.data);

                const lsServerSituacionEmpleado = await GetByTipoCatalogoCombo(CodCatalogo.SITUACION_EMPLEADO);
                setLsSituacionEmpleado(lsServerSituacionEmpleado.data);

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
            datos.cedula = documento;
            datos.usuarioModifico = user?.nameuser;
            datos.sede = lsEmployee.sede;

            // Archivos y campos base
            datos.urlDocumento = filePdf || null;
            datos.pdfMinisterio = filePdfMin || null;
            datos.diferenciaDia = null;

            // --- LISTADO INTEGRAL DE CAMPOS ---
            // Se incluyen fechas, IDs, strings y selectores.
            const camposAValidar = [
                // Fechas
                "fechaCalificacionUltimaInstancia", "fechaInvestigacion", "fechaRetiro", "fechaEstimadaInicioCaso",
                "fechaEntrega", "fechaEnvio", "fechaCalificacionEps", "fechaCalifiOrigenARL", "fechaCalificacionPclARL",
                "fechaEstructuraARL", "fechaRecalificacionPclARL", "fechaEstructuraRecalificadaARL", "fechaCalificaOrigenJRC",
                "fechaCalificacionPclJRC", "fechaEstructuraPclJRC", "fechaRecalificacionPclJRC", "fechaRecalificacionEstJRC",
                "fechaEstructuracionJRC", "fechaCalificaOrigenJNC", "fechaCalificacionPclJNC", "fechaEstructuraJNC",
                "fechaRecalificacionPclJNC", "fechaEstructuracionOrigenInstaFinal", "fechaCalificacionPclInstFinal",
                "fechaEstructuracionPclInstFinal", "fechaPagoInstaFinal", "fechaEntregaMin", "fechaPagoRecalificadoInstaFinal",
                "fechaRecibidoInstanciaFinal", "fechaCalificaOrigenAFP", "fechaCalificacionPclAFP", "fechaEstructuraAFP",

                // Información del Caso y Segmentos
                "resumenCaso", "situacionEmpleado", "codDx", "nroFurel", "segmentoAgrupado", "segmentoAfectado",
                "subsegmento", "regionInfoLaboral", "lateralidad", "entidadQueMotivaEnvio", "entidadDondeEnvia",
                "investigado", "observaciones",

                // EPS y ARL
                "origenEps", "noSolicitudARL1", "noSolicitudARL2", "origenARL", "pclARL", "pclRecalificadaARL",

                // JRC (Junta Regional)
                "juntaCalifica", "noDictamenJRC", "origenJRC", "controversia", "conclusion", "noDictamenPclJRC",
                "pclJRC", "noActaRecursoJRC", "noDictamenRecalificacionJRC", "juntaReCalificacionJRC", "pclRecalificadaJRC",

                // JNC (Junta Nacional)
                "noDictamenJNC", "origenJNC", "noDictamenPclJNC", "pclJNC", "noDictamenRecalificacionJNC",
                "pclRecalificacionJNC", "pclInstaFinal", "salaCalificadoraJNC", "medicoCalificadorJNC",
                "salaCalificadoraPCLJNC", "medicoCalificadorPCLJNC",

                // AFP
                "noDictamenAFP", "origenAFP", "noDictamenPclAFP", "pclAFP",

                // Investigación de Origen
                "idInvestigadoPor", "origenInvestigacion", "motivoIE", "resultadoOrigen", "aplica",

                // Instancia Final y Estado Laboral
                "origenInstaFinal", "instanciaOrigenInstaFinal", "pclFinalInstaFinal", "instanciaFinal",
                "indemnizado", "entregadoMin", "IdEntidadInformaInstanciaFinal", "indemnizadoRecalificado",
                "estadoRHT", "reintegro", "reubicado", "restringido", "jornadaLaboral", "indemnizacion"
            ];

            // Aplicar la lógica: Si el valor es falsy (vacío, undefined, 0, etc), poner null
            camposAValidar.forEach(f => {
                datos[f] = datos[f] || null;
            });

            const result = await InsertOccupationalMedicine(datos);
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
                    setValue("fechaCalificacionUltimaInstancia", "");
                    setValue("fechaInvestigacion", "");
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

    useEffect(() => {
        if (valueAplica == 4006) {
            resetField("idInvestigadoPor");
            resetField("origenInvestigacion");
            resetField("motivoIE");
            resetField("resultadoOrigen");
            setValue("fechaCalificacionUltimaInstancia", "");
            setValue("fechaInvestigacion", "");

            disabledInvestigacionEL.onTrue();
        } else {
            disabledInvestigacionEL.onFalse();
        }
    }, [valueAplica]);

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Medicinalaboral}>
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
                <FormProvider {...methods}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Registrar medicina laboral"
                            key={documento}
                            documento={documento}
                            onChange={(e) => setValue("documento", e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleDocumento}
                            errors={errors}
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
                            threshold={455}
                        >
                            <Grid item xs={12}>
                                <Accordion title={<><IconUser /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información Laboral</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha De Registro"
                                                name="fechaRetiro"
                                                defaultValue={new Date()}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="resumenCaso"
                                                label="Resumen Caso"
                                                options={lsResumenCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="situacionEmpleado"
                                                label="Situación Del Empleado"
                                                options={lsSituacionEmpleado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Estimada Inicio Caso"
                                                name="fechaEstimadaInicioCaso"
                                                defaultValue={null}
                                            />
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
                                            <InputSelect
                                                name="codDx"
                                                label="Diagnóstico"
                                                options={lsDiagnistico}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="nroFurel"
                                                label="No. FUREL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="segmentoAgrupado"
                                                label="Segmento Agrupado"
                                                options={lsSegmentoAgrupado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="segmentoAfectado"
                                                label="Segmento Afectado"
                                                options={lsSegmentoAfectado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="subsegmento"
                                                label="Subsegmento"
                                                options={lsSubsegmento}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="regionInfoLaboral"
                                                label="Región"
                                                options={lsRegion}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="lateralidad"
                                                label="Lateralidad"
                                                options={lsLateralidad}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="entidadQueMotivaEnvio"
                                                label="Entidad que motiva el envio"
                                                options={lsEntidadMotiEnvio}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="entidadDondeEnvia"
                                                label="Entidad Donde Envía"
                                                options={lsEntidadDondeEnvia}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha de Entrega"
                                                name="fechaEntrega"
                                                defaultValue={null}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha de Envío"
                                                name="fechaEnvio"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="investigado"
                                                label="Investigado"
                                                options={lsInvestigado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                multiline
                                                rows={4}
                                                name="observaciones"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconReportMedical /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Calificación EPS</Typography></>}>
                                    <Grid container spacing={2} sx={{ my: 1 }}>
                                        <Grid item xs={12} md={6}>
                                            <InputDatePicker
                                                label="Fecha de Calificación"
                                                name="fechaCalificacionEps"
                                                defaultValue={null}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <InputSelect
                                                name="origenEps"
                                                label="Orígenes"
                                                options={lsOrigenEPS}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconAlertTriangle /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Calificación ARL</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                fullWidth
                                                name="noSolicitudARL1"
                                                label="Nro. Solicitud 1"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                fullWidth
                                                name="noSolicitudARL2"
                                                label="Nro. Solicitud 2"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaCalifiOrigenARL"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="origenARL"
                                                label="Origen"
                                                options={lsOrigenARL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Calificación PCL"
                                                name="fechaCalificacionPclARL"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclARL"
                                                label="% PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraARL"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha ReCalificación PCL"
                                                name="fechaRecalificacionPclARL"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclRecalificadaARL"
                                                label="% PCL Recalificada"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraRecalificadaARL"
                                                defaultValue={null}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconClipboardText /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">JRC</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaCalificaOrigenJRC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="juntaCalifica"
                                                label="Junta Califica"
                                                options={lsJuntaCalificadaJRC}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenJRC"
                                                label="Nro. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="origenJRC"
                                                label="Origen"
                                                options={lsOrigenARL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="controversia"
                                                label="Controversia"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="conclusion"
                                                label="Conclusión"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Calificación PCL"
                                                name="fechaCalificacionPclJRC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenPclJRC"
                                                label="Nro. Dictamen PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="pclJRC"
                                                label="PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraPclJRC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="noActaRecursoJRC"
                                                label="Nro. Acta Recurso"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha ReCalificación PCL"
                                                name="fechaRecalificacionPclJRC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="noDictamenRecalificacionJRC"
                                                label="No Dictamen Recalificación"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputSelect
                                                name="juntaReCalificacionJRC"
                                                label="Junta Recalificación"
                                                options={lsJuntaCalificadaJRC}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclRecalificadaJRC"
                                                label="% PCL Recalificada"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Recalificación Est."
                                                name="fechaRecalificacionEstJRC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Estructuración JRC"
                                                name="fechaEstructuracionJRC"
                                                defaultValue={null}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconClipboardText /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">JNC</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaCalificaOrigenJNC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenJNC"
                                                label="Nro. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="origenJNC"
                                                label="Origen"
                                                options={lsOrigenARL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Calificación PCL"
                                                name="fechaCalificacionPclJNC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenPclJNC"
                                                label="No. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclJNC"
                                                label="% PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraJNC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputDatePicker
                                                label="Fecha Recalificación PCL"
                                                name="fechaRecalificacionPclJNC"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenRecalificacionJNC"
                                                label="No. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclRecalificacionJNC"
                                                label="% PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclInstaFinal"
                                                label="Pcl Instancia Final"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputSelect
                                                name="salaCalificadoraJNC"
                                                label="Sala Calificadora Origen"
                                                options={lsSalaCalificadora}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={9}>
                                            <InputText
                                                fullWidth
                                                name="medicoCalificadorJNC"
                                                label="Médico Calificador"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputSelect
                                                name="salaCalificadoraPCLJNC"
                                                label="Sala Calificadora PCL"
                                                options={lsSalaCalificadora}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={9}>
                                            <InputText
                                                fullWidth
                                                name="medicoCalificadorPCLJNC"
                                                label="Médico Calificador"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconClipboardText /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">AFP</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaCalificaOrigenAFP"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenAFP"
                                                label="Nro. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="origenAFP"
                                                label="Origen"
                                                options={lsOrigenARL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Calificación PCL"
                                                name="fechaCalificacionPclAFP"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                fullWidth
                                                name="noDictamenPclAFP"
                                                label="No. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="pclAFP"
                                                label="% PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraAFP"
                                                defaultValue={null}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconReportSearch /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Investigación de origen de enfermedad laboral</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                defaultValue=""
                                                name="aplica"
                                                label="Aplica"
                                                options={lsInvestigado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                defaultValue=""
                                                disabled={disabledInvestigacionEL.value}
                                                name="idInvestigadoPor"
                                                label="Investigador"
                                                options={lsInvestigadoPor}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputMultiselectTwo
                                                disabled={disabledInvestigacionEL.value}
                                                checkbox
                                                name="origenInvestigacion"
                                                label="Asesor ARL"
                                                options={lsAsesorEL}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                defaultValue=""
                                                disabled={disabledInvestigacionEL.value}
                                                name="motivoIE"
                                                label="Tipo de investigación"
                                                options={lsInvestigacionEL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                disabled={disabledInvestigacionEL.value}
                                                label="Fecha dictamen última instancia"
                                                name="fechaCalificacionUltimaInstancia"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                defaultValue=""
                                                disabled={disabledInvestigacionEL.value}
                                                name="resultadoOrigen"
                                                label="Resultado origen última instancia"
                                                options={lsResultadoOrigen}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                disabled={disabledInvestigacionEL.value}
                                                label="Fecha de investigación"
                                                name="fechaInvestigacion"
                                                defaultValue={null}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconReport /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Instancia Final</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="origenInstaFinal"
                                                label="Origen"
                                                options={lsOrigenARL}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Estructuración Origen"
                                                name="fechaEstructuracionOrigenInstaFinal"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="instanciaOrigenInstaFinal"
                                                label="Instancia Origen"
                                                options={lsInstanciaOrigen}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                fullWidth
                                                name="pclFinalInstaFinal"
                                                label="% PCL Final"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="instanciaFinal"
                                                label="Instancia Final"
                                                options={lsInstanciaOrigen}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Calificación PCL"
                                                name="fechaCalificacionPclInstFinal"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Estructuracion PCL"
                                                name="fechaEstructuracionPclInstFinal"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="indemnizado"
                                                label="Indemnizado"
                                                options={lsInvestigado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Pago"
                                                name="fechaPagoInstaFinal"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="entregadoMin"
                                                label="Entregado al MIN"
                                                options={lsInvestigado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha informe origen en firme"
                                                name="fechaRecibidoInstanciaFinal"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Entrega MIN"
                                                name="fechaEntregaMin"
                                                defaultValue={null}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="IdEntidadInformaInstanciaFinal"
                                                label="Entidad que informe a DLTD"
                                                options={lsEntidadInformaInstanciaFinal}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4} md={2} lg={1.3}>
                                            <Tooltip title={TitleButton.SubirArchivo}>
                                                <Button fullWidth size={matchesXS ? 'small' : 'large'} variant="outlined" component="label">
                                                    <input hidden accept="application/pdf" type="file" onChange={handleFileMin} />
                                                    <UploadIcon fontSize="medium" />
                                                </Button>
                                            </Tooltip>
                                        </Grid>

                                        <Grid item xs={4} md={2} lg={1.3}>
                                            <Tooltip title="Descargar">
                                                <Button disabled={filePdfMin === null ? true : false} variant="outlined" color="primary" size={matchesXS ? 'small' : 'large'} fullWidth onClick={downloadFileMin}>
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
                                            <InputSelect
                                                name="indemnizadoRecalificado"
                                                label="Indemnizado Recalificado"
                                                options={lsInvestigado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha Pago"
                                                name="fechaPagoRecalificadoInstaFinal"
                                                defaultValue={null}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconStatusChange /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Estado ARL</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                name="estadoRHT"
                                                label="Estado RHT"
                                                size={matchesXS ? 'small' : 'medium'}
                                                rows={4}
                                                multiline
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                name="reintegro"
                                                label="Reintegro"
                                                size={matchesXS ? 'small' : 'medium'}
                                                rows={4}
                                                multiline
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                name="reubicado"
                                                label="Reubicado"
                                                size={matchesXS ? 'small' : 'medium'}
                                                rows={4}
                                                multiline
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                name="restringido"
                                                label="Restringido"
                                                size={matchesXS ? 'small' : 'medium'}
                                                rows={4}
                                                multiline
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                name="jornadaLaboral"
                                                label="Jornada Laboral"
                                                size={matchesXS ? 'small' : 'medium'}
                                                rows={4}
                                                multiline
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                fullWidth
                                                name="indemnizacion"
                                                label="Indemnización"
                                                size={matchesXS ? 'small' : 'medium'}
                                                rows={4}
                                                multiline
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconReportAnalytics /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Resultado Investigación Laboral</Typography></>}>
                                    <Grid container spacing={2} sx={{ pb: 3 }}>
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
                </FormProvider>
            </Grid>
        </ValidateActionSkeleton>
    );


};

export default OccupationalMedicine;