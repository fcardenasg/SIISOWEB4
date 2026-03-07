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

import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import UploadIcon from '@mui/icons-material/Upload';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { AccionMenu, CodCatalogo, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ViewEmployee from 'components/views/ViewEmployee';

import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdOccupationalMedicine, UpdateOccupationalMedicines } from 'api/clients/OccupationalMedicineClient';
import Accordion from 'components/accordion/Accordion';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import InputOnChange from 'components/input/InputOnChange';
import Cargando from 'components/loading/Cargando';

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
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import InputMultiselectTwo from 'components/input/InputMultiselectTwo';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { useBoolean } from 'hooks/use-boolean';
import toast from 'react-hot-toast';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ReviewOccupationalMedicine = ({ medicinaLaboral, handleRefresh, openEditOccupational }) => {
    const theme = useTheme();
    const disabledInvestigacionEL = useBoolean(false);

    const [timeWait, setTimeWait] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
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
    const [lsResultadoOrigen, setLsResultadoOrigen] = useState([]);
    const [lsAsesorEL, setLsAsesorEL] = useState([]);
    const [lsSituacionEmpleado, setLsSituacionEmpleado] = useState([]);
    const [lsEntidadInformaInstanciaFinal, setLsEntidadInformaInstanciaFinal] = useState([]);
    const [lsSalaCalificadora, setLsSalaCalificadora] = useState([]);

    const methods = useForm();
    const { handleSubmit, setValue, watch } = methods;
    const valueAplica = watch("aplica");

    async function downloadFile() { DownloadFile(`${documento}medicinallaboral${new Date().getTime()}.pdf`, filePdf.replace("data:application/pdf;base64,", "")); }
    async function downloadFileMin() { DownloadFile(`${documento}medicinallaboral${new Date().getTime()}.pdf`, filePdfMin.replace("data:application/pdf;base64,", "")); }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerAsesorEl = await GetByTipoCatalogoCombo(CodCatalogo.MEDICINA_LABORAL_ASESOREL);
                setLsAsesorEL(lsServerAsesorEl.data);

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

                const lsServerEntidadInformeInstancia = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_ENTIDADINFORMA);
                setLsEntidadInformaInstanciaFinal(lsServerEntidadInformeInstancia.data);

                const lsServerSubsegmento = await GetAllBySubsegment(0, 0);
                var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsSubsegmento(resultSubsegmento);

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

                const lsServerSituacionEmpleado = await GetByTipoCatalogoCombo(CodCatalogo.SITUACION_EMPLEADO);
                setLsSituacionEmpleado(lsServerSituacionEmpleado.data);
            } catch (error) {

            }
        }

        getAll();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const lsServerAtencion = await GetByIdOccupationalMedicine(medicinaLaboral.idMedicinaLaboral);
                if (lsServerAtencion.status === 200) {
                    setDocumento(lsServerAtencion.data.cedula);
                    const event = { target: { value: lsServerAtencion.data.cedula } };
                    handleLoadingDocument(event);

                    setLsOccupationalMedicine(lsServerAtencion.data);
                    setTextDiagnostico(lsServerAtencion.data.codDx);
                    setFilePdfMin(lsServerAtencion.data.pdfMinisterio);
                    setFilePdf(lsServerAtencion.data.urlDocumento);

                    if (lsServerAtencion.data.codDx !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsServerAtencion.data.codDx);
                        setLsDiagnistico(lsServerCie11.data);
                    }

                    if (lsServerAtencion.data.aplica == 4006)
                        disabledInvestigacionEL.onTrue();

                    setValue("aplica", lsServerAtencion.data.aplica);
                    setValue("origenInvestigacion", lsServerAtencion.data.origenInvestigacion);
                    setValue("idInvestigadoPor", lsServerAtencion.data.idInvestigadoPor);
                    setValue("motivoIE", lsServerAtencion.data.motivoIE);
                    setValue("resultadoOrigen", lsServerAtencion.data.resultadoOrigen);

                    setTimeout(() => {
                        setTimeWait(true);
                    }, 1000);
                }
            } catch (error) { }
        }

        getData();
    }, [medicinaLaboral]);

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                toast.error(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            toast.error(Message.ErrorDeDatos);
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
                    toast.error('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            toast.error('Hubo un problema al buscar el Diagnóstico');
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
                toast.error('Este forma no es un PDF');
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
                toast.error('Este forma no es un PDF');
            }
        }
    }

    const handleClick = async (datos) => {
        try {
            datos.id = medicinaLaboral.idMedicinaLaboral;
            datos.cedula = documento;
            datos.sede = lsEmployee.sede;

            datos.urlDocumento = filePdf || null;
            datos.pdfMinisterio = filePdfMin || null;
            datos.diferenciaDia = null;

            const camposAValidar = [
                "fechaCalificacionUltimaInstancia", "fechaInvestigacion", "fechaRetiro", "fechaEstimadaInicioCaso",
                "fechaEntrega", "fechaEnvio", "fechaCalificacionEps", "fechaCalifiOrigenARL", "fechaCalificacionPclARL",
                "fechaEstructuraARL", "fechaRecalificacionPclARL", "fechaEstructuraRecalificadaARL", "fechaCalificaOrigenJRC",
                "fechaCalificacionPclJRC", "fechaEstructuraPclJRC", "fechaRecalificacionPclJRC", "fechaRecalificacionEstJRC",
                "fechaEstructuracionJRC", "fechaCalificaOrigenJNC", "fechaCalificacionPclJNC", "fechaEstructuraJNC",
                "fechaRecalificacionPclJNC", "fechaEstructuracionOrigenInstaFinal", "fechaCalificacionPclInstFinal",
                "fechaEstructuracionPclInstFinal", "fechaPagoInstaFinal", "fechaEntregaMin", "fechaPagoRecalificadoInstaFinal",
                "fechaRecibidoInstanciaFinal", "fechaCalificaOrigenAFP", "fechaCalificacionPclAFP", "fechaEstructuraAFP",

                "resumenCaso", "situacionEmpleado", "codDx", "nroFurel", "segmentoAgrupado", "segmentoAfectado",
                "subsegmento", "regionInfoLaboral", "lateralidad", "entidadQueMotivaEnvio", "entidadDondeEnvia",
                "investigado", "observaciones", "aplica",

                "origenEps", "noSolicitudARL1", "noSolicitudARL2", "origenARL", "pclARL", "pclRecalificadaARL",

                "juntaCalifica", "noDictamenJRC", "origenJRC", "controversia", "conclusion", "noDictamenPclJRC",
                "pclJRC", "noActaRecursoJRC", "noDictamenRecalificacionJRC", "juntaReCalificacionJRC", "pclRecalificadaJRC",

                "noDictamenJNC", "origenJNC", "noDictamenPclJNC", "pclJNC", "noDictamenRecalificacionJNC",
                "pclRecalificacionJNC", "pclInstaFinal", "salaCalificadoraJNC", "medicoCalificadorJNC",
                "salaCalificadoraPCLJNC", "medicoCalificadorPCLJNC",

                "noDictamenAFP", "origenAFP", "noDictamenPclAFP", "pclAFP",

                "idInvestigadoPor", "origenInvestigacion", "motivoIE", "resultadoOrigen", "aplica",

                "invesOrigenExamenesEstudiosAdicionales", "invesOrigenRemisionEspecificar",
                "invesOrigenNecesidadesFormacion", "invesOrigenRevisionEpp", "invesOrigenNormasTrabajo",
                "invesOrigenEvaluacionMedicionRiesgo", "invesOrigenControlesAdministrativos",
                "invesOrigenControlesAdicionales", "invesOrigenModificacionActividades",
                "invesOrigenReubicacion", "invesOrigenOtras", "peligroAsociadoEnfermedad",
            ];

            camposAValidar.forEach(f => {
                datos[f] = datos[f] || null;
            });

            const result = await UpdateOccupationalMedicines(datos);
            if (result.status === 200) {
                toast.success(Message.Actualizar);
                handleRefresh();
            }
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    useEffect(() => {
        if (valueAplica == 4006) {
            setValue("idInvestigadoPor", "");
            setValue("origenInvestigacion", "");
            setValue("motivoIE", "");
            setValue("fechaCalificacionUltimaInstancia", "");
            setValue("resultadoOrigen", "");
            setValue("fechaInvestigacion", "");

            disabledInvestigacionEL.onTrue();
        } else {
            disabledInvestigacionEL.onFalse();
        }
    }, [valueAplica]);

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Medicinalaboral}>
            <ControlModal
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
            >
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Button variant="outlined" color="error" size={matchesXS ? 'small' : 'large'}
                            onClick={() => setFilePdfMin(null)} startIcon={<RemoveCircleOutlineIcon fontSize="large" />}>
                            Remover archivo
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
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                title="Medicina laboral"
                                disabled={true}
                                key={lsEmployee.documento}
                                documento={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconUser /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información Laboral</Typography></>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha De Registro"
                                            name="fechaRetiro"
                                            defaultValue={lsOccupationalMedicine.fechaRetiro}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.resumenCaso}
                                            name="resumenCaso"
                                            label="Resumen Caso"
                                            options={lsResumenCaso}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.situacionEmpleado}
                                            name="situacionEmpleado"
                                            label="Situación Del Empleado"
                                            options={lsSituacionEmpleado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            defaultValue={lsOccupationalMedicine.fechaEstimadaInicioCaso}
                                            label="Fecha Estimada Inicio Caso"
                                            name="fechaEstimadaInicioCaso"
                                        />
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
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.codDx}
                                            name="codDx"
                                            label="Diagnóstico"
                                            options={lsDiagnistico}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.nroFurel}
                                            fullWidth
                                            name="nroFurel"
                                            label="No. FUREL"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.segmentoAgrupado}
                                            name="segmentoAgrupado"
                                            label="Segmento Agrupado"
                                            options={lsSegmentoAgrupado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.segmentoAfectado}
                                            name="segmentoAfectado"
                                            label="Segmento Afectado"
                                            options={lsSegmentoAfectado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.subsegmento}
                                            name="subsegmento"
                                            label="Subsegmento"
                                            options={lsSubsegmento}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.regionInfoLaboral}
                                            name="regionInfoLaboral"
                                            label="Región"
                                            options={lsRegion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.lateralidad}
                                            name="lateralidad"
                                            label="Lateralidad"
                                            options={lsLateralidad}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.entidadQueMotivaEnvio}
                                            name="entidadQueMotivaEnvio"
                                            label="Entidad que motiva el envio"
                                            options={lsEntidadMotiEnvio}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.entidadDondeEnvia}
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
                                            defaultValue={lsOccupationalMedicine.fechaEntrega}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha de Envío"
                                            name="fechaEnvio"
                                            defaultValue={lsOccupationalMedicine.fechaEnvio}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.investigado}
                                            name="investigado"
                                            label="Investigado"
                                            options={lsInvestigado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.observaciones}
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
                                <Grid container spacing={2} sx={{ my: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <InputDatePicker
                                            label="Fecha de Calificación"
                                            name="fechaCalificacionEps"
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionEps}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.origenEps}
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
                                            defaultValue={lsOccupationalMedicine.noSolicitudARL1}
                                            fullWidth
                                            name="noSolicitudARL1"
                                            label="Nro. Solicitud 1"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noSolicitudARL2}
                                            fullWidth
                                            name="noSolicitudARL2"
                                            label="Nro. Solicitud 2"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            defaultValue={lsOccupationalMedicine.fechaCalifiOrigenARL}
                                            label="Fecha Calificación Origen"
                                            name="fechaCalifiOrigenARL"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.origenARL}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionPclARL}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclARL}
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
                                            defaultValue={lsOccupationalMedicine.fechaEstructuraARL}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            label="Fecha ReCalificación PCL"
                                            name="fechaRecalificacionPclARL"
                                            defaultValue={lsOccupationalMedicine.fechaRecalificacionPclARL}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            type="number"
                                            fullWidth
                                            name="pclRecalificadaARL"
                                            label="% PCL Recalificada"
                                            size={matchesXS ? 'small' : 'medium'}
                                            defaultValue={lsOccupationalMedicine.pclRecalificadaARL}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            label="Fecha Estructura"
                                            name="fechaEstructuraRecalificadaARL"
                                            defaultValue={lsOccupationalMedicine.fechaEstructuraRecalificadaARL}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificaOrigenJRC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.juntaCalifica}
                                            name="juntaCalifica"
                                            label="Junta Califica"
                                            options={lsJuntaCalificadaJRC}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noDictamenJRC}
                                            fullWidth
                                            name="noDictamenJRC"
                                            label="Nro. Dictamen"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.origenJRC}
                                            name="origenJRC"
                                            label="Origen"
                                            options={lsOrigenARL}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.controversia}
                                            fullWidth
                                            name="controversia"
                                            label="Controversia"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.conclusion}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionPclJRC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noDictamenPclJRC}
                                            fullWidth
                                            name="noDictamenPclJRC"
                                            label="Nro. Dictamen PCL"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclJRC}
                                            type="number"
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
                                            defaultValue={lsOccupationalMedicine.fechaEstructuraPclJRC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noActaRecursoJRC}
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
                                            defaultValue={lsOccupationalMedicine.fechaRecalificacionPclJRC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noDictamenRecalificacionJRC}
                                            type="number"
                                            fullWidth
                                            name="noDictamenRecalificacionJRC"
                                            label="No Dictamen Recalificación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.juntaReCalificacionJRC}
                                            name="juntaReCalificacionJRC"
                                            label="Junta Recalificación"
                                            options={lsJuntaCalificadaJRC}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclRecalificadaJRC}
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
                                            defaultValue={lsOccupationalMedicine.fechaRecalificacionEstJRC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha Estructuración JRC"
                                            name="fechaEstructuracionJRC"
                                            defaultValue={lsOccupationalMedicine.fechaEstructuracionJRC}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificaOrigenJNC}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noDictamenJNC}
                                            fullWidth
                                            name="noDictamenJNC"
                                            label="Nro. Dictamen"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.origenJNC}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionPclJNC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noDictamenPclJNC}
                                            fullWidth
                                            name="noDictamenPclJNC"
                                            label="No. Dictamen"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclJNC}
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
                                            defaultValue={lsOccupationalMedicine.fechaEstructuraJNC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha Recalificación Origen"
                                            name="fechaRecalificacionPclJNC"
                                            defaultValue={lsOccupationalMedicine.fechaRecalificacionPclJNC}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.noDictamenRecalificacionJNC}
                                            fullWidth
                                            name="noDictamenRecalificacionJNC"
                                            label="No. Dictamen"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclRecalificacionJNC}
                                            type="number"
                                            fullWidth
                                            name="pclRecalificacionJNC"
                                            label="% PCL"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclInstaFinal}
                                            type="number"
                                            fullWidth
                                            name="pclInstaFinal"
                                            label="Pcl Instancia Final"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.salaCalificadoraJNC}
                                            name="salaCalificadoraJNC"
                                            label="Sala Calificadora"
                                            options={lsSalaCalificadora}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.medicoCalificadorJNC}
                                            fullWidth
                                            name="medicoCalificadorJNC"
                                            label="Médico Calificador"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.salaCalificadoraPCLJNC}
                                            name="salaCalificadoraPCLJNC"
                                            label="Sala Calificadora PCL"
                                            options={lsSalaCalificadora}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.medicoCalificadorPCLJNC}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificaOrigenAFP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            fullWidth
                                            name="noDictamenAFP"
                                            label="Nro. Dictamen"
                                            size={matchesXS ? 'small' : 'medium'}
                                            defaultValue={lsOccupationalMedicine.noDictamenAFP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            name="origenAFP"
                                            label="Origen"
                                            options={lsOrigenARL}
                                            size={matchesXS ? 'small' : 'medium'}
                                            defaultValue={lsOccupationalMedicine.origenAFP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            label="Fecha Calificación PCL"
                                            name="fechaCalificacionPclAFP"
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionPclAFP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            fullWidth
                                            name="noDictamenPclAFP"
                                            label="No. Dictamen"
                                            size={matchesXS ? 'small' : 'medium'}
                                            defaultValue={lsOccupationalMedicine.noDictamenPclAFP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            type="number"
                                            fullWidth
                                            name="pclAFP"
                                            label="% PCL"
                                            size={matchesXS ? 'small' : 'medium'}
                                            defaultValue={lsOccupationalMedicine.pclAFP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            label="Fecha Estructura"
                                            name="fechaEstructuraAFP"
                                            defaultValue={lsOccupationalMedicine.fechaEstructuraAFP}
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
                                            name="motivoIE"
                                            label="Tipo de investigación"
                                            options={lsInvestigacionEL}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue=""
                                            name="idPrioridad"
                                            label="Prioridad"
                                            options={[]}
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
                                            defaultValue={[]}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            disabled={disabledInvestigacionEL.value}
                                            label="Fecha dictamen última instancia"
                                            name="fechaCalificacionUltimaInstancia"
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionUltimaInstancia}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            disabled={disabledInvestigacionEL.value}
                                            label="Fecha de investigación"
                                            name="fechaInvestigacion"
                                            defaultValue={lsOccupationalMedicine.fechaInvestigacion}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue=""
                                            name="resultadoOrigen"
                                            label="Resultado origen última instancia"
                                            options={lsResultadoOrigen}
                                            size={matchesXS ? 'small' : 'medium'}
                                            disabled
                                            helperText="El resultado es seleccionado desde investigación"
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
                                            defaultValue={lsOccupationalMedicine.origenInstaFinal}
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
                                            defaultValue={lsOccupationalMedicine.fechaEstructuracionOrigenInstaFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.instanciaOrigenInstaFinal}
                                            name="instanciaOrigenInstaFinal"
                                            label="Instancia Origen"
                                            options={lsInstanciaOrigen}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            defaultValue={lsOccupationalMedicine.pclFinalInstaFinal}
                                            fullWidth
                                            name="pclFinalInstaFinal"
                                            label="% PCL Final"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.instanciaFinal}
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
                                            defaultValue={lsOccupationalMedicine.fechaCalificacionPclInstFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            label="Fecha Estructuracion PCL"
                                            name="fechaEstructuracionPclInstFinal"
                                            defaultValue={lsOccupationalMedicine.fechaEstructuracionPclInstFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.indemnizado}
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
                                            defaultValue={lsOccupationalMedicine.fechaPagoInstaFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            defaultValue={lsOccupationalMedicine.entregadoMin}
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
                                            defaultValue={lsOccupationalMedicine?.fechaRecibidoInstanciaFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputDatePicker
                                            label="Fecha Entrega MIN"
                                            name="fechaEntregaMin"
                                            defaultValue={lsOccupationalMedicine?.fechaEntregaMin}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            name="idEntidadInformaInstanciaFinal"
                                            label="Entidad que informe a DLTD"
                                            options={lsEntidadInformaInstanciaFinal}
                                            size={matchesXS ? 'small' : 'medium'}
                                            defaultValue={lsOccupationalMedicine?.idEntidadInformaInstanciaFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={4} md={2} lg={1.3}>
                                        <Tooltip title={TitleButton.SubirArchivo}>
                                            <span>
                                                <Button fullWidth size={matchesXS ? 'small' : 'large'} variant="outlined" component="label">
                                                    <input hidden accept="application/pdf" type="file" onChange={handleFile1} />
                                                    <UploadIcon fontSize="medium" />
                                                </Button>
                                            </span>
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
                                            defaultValue={lsOccupationalMedicine.indemnizadoRecalificado}
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
                                            defaultValue={lsOccupationalMedicine.fechaPagoRecalificadoInstaFinal}
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
                                            defaultValue={lsOccupationalMedicine.estadoRHT}
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
                                            defaultValue={lsOccupationalMedicine.reintegro}
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
                                            defaultValue={lsOccupationalMedicine.reubicado}
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
                                            defaultValue={lsOccupationalMedicine.restringido}
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
                                            defaultValue={lsOccupationalMedicine.jornadaLaboral}
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
                                            defaultValue={lsOccupationalMedicine.indemnizacion}
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

                        <Grid item xs={12} sx={{ my: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4} lg={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={6} md={4} lg={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={openEditOccupational.onFalse}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider> : <Cargando />
            }
        </ValidateActionSkeleton>
    );
};

export default ReviewOccupationalMedicine;