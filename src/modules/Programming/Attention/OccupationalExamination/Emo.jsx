import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, useMediaQuery,
    Grid, Typography, Tooltip,
} from '@mui/material';

import {
    IconLungs,
    IconFall,
    IconAffiliate,
    IconWoman,
    IconFriends,
    IconVaccine,
    IconEmpathize,
    IconDeviceDesktopAnalytics,
    IconUserSearch,
    IconHeartRateMonitor,
    IconYoga,
    IconReportMedical,
    IconWheelchair,
    IconCarCrash
} from '@tabler/icons';

import Chip from '@mui/material/Chip';
import InputOnChange from 'components/input/InputOnChange';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import DetailedIcon from 'components/controllers/DetailedIcon';
import InputCheckBox from 'components/input/InputCheckBox';
import InputCheck from 'components/input/InputCheck';
import Accordion from 'components/accordion/Accordion';
import SubCard from 'ui-component/cards/SubCard';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDatePicker from 'components/input/InputDatePicker';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { IconEdit } from '@tabler/icons';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import TableAntecedentes from './TableEmo/TableAntecedentes';
import RespiratorySymptoms from './RespiratorySymptoms';
import TableExamenesPara from './TableEmo/TableExamenesPara';
import { MessageError } from 'components/alert/AlertAll';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import Cargando from 'components/loading/Cargando';
import { GetAntecedente } from 'api/clients/MedicalHistoryClient';
import Framingham from './Framingham';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
    { title: 'Ver Antecedentes HC', icons: <AddBoxIcon fontSize="small" /> },
]

const Emo = ({
    atencion,
    setPeso, peso,
    setTalla, talla,
    setIMC, imc,
    setClasificacion, clasificacion,
    setClasificacionColor, clasificacionColor,
    lsLastRecord,

    setIndiceWellsEFU,
    indiceWellsEFU,
    documento,
    setEstadoVacuna,
    estadoVacuna,
    lsEmployee,
    setTipoFobia,
    tipoFobia,


    calculoFramingham,
    frFuma,
    frColesterol,
    frTencion,
    frEdad,
    frGlicemia,
    frPuntaje,
    relacion,
    frLdl,
    frHdl,
    riesgo,

    handleHdl,
    hdl,
    handleColesterol,
    colesterol,
    handleTrigliceridos,
    trigliceridos,
    handleFuma,
    fuma,
    handleGlicemia,
    glicemia,
    handleTencion,
    tencion
}) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [timeWait, setTimeWait] = useState(false);
    const [openAntecedente, setOpenAntecedente] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [cadenaHistory, setCadenaHistory] = useState('');

    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);
    const [lsDeporte, setLsDeporte] = useState([]);
    const [lsTipoFobia, setLsTipoFobia] = useState([]);
    const [lsFrecuencia, setLsFrecuencia] = useState([]);
    const [lsRefuerzo, setLsRefuerzo] = useState([]);
    const [lsEspacioConfinado, setLsEspacioConfinado] = useState([]);
    const [lsPariente, setLsPariente] = useState([]);
    const [lsGineMetodo, setLsGineMetodo] = useState([]);
    const [lsBiotipo, setLsBiotipo] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);
    const [lsCiclos, setLsCiclos] = useState([]);

    const [lsNeConceptoActi, setLsNeConceptoActi] = useState([]);
    const [lsOpcion, setLsOpcion] = useState([]);
    const [lsNeADonde, setLsNeADonde] = useState([]);
    const [lsRiesClasifi, setLsRiesClasifi] = useState([]);
    const [lsEPSintomas, setLsEPSintomas] = useState([]);

    const [lsIngreso, setLsIngreso] = useState([]);
    const [lsControlPeriodico, setLsControlPeriodico] = useState([]);

    const [textAntecedente, setTextAntecedente] = useState('');
    const [textParaclinico, setTextParaclinico] = useState('');
    const [openParaclinico, setOpenParaclinico] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textDx1, setTextDx1] = useState('');
    const [textDx2, setTextDx2] = useState('');
    const [textDx3, setTextDx3] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [lsDx2, setLsDx2] = useState([]);
    const [lsDx3, setLsDx3] = useState([]);

    const [lsLateralidad, setLsLateralidad] = useState([]);

    async function getAll() {
        try {
            const lsServerRiesClasifi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RIESGO_CLASIFICACION);
            var resultRiesClasifi = lsServerRiesClasifi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesClasifi(resultRiesClasifi);

            const lsServerSintomasRespiratorio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EP_EMO_SintomasRespiratorios);
            var resultSintomasRespiratorios = lsServerSintomasRespiratorio.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEPSintomas(resultSintomasRespiratorios);

            const lsServerLateralidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.LATERALIDAD);
            var resultLateralidad = lsServerLateralidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsLateralidad(resultLateralidad);

            const lsServerNeConceptoActi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEPTO_APTI_MEDICA);
            var resultNeConceptoActi = lsServerNeConceptoActi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsNeConceptoActi(resultNeConceptoActi);

            const lsServerEspacioConfinado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CONCEPTO_ESPACIOCONFINADO);
            var resultEspacioConfinado = lsServerEspacioConfinado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEspacioConfinado(resultEspacioConfinado);

            const lsServerOpcion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultOpcion = lsServerOpcion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOpcion(resultOpcion);

            const lsServerNeADonde = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_NEADONDE);
            var resultNeADonde = lsServerNeADonde.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsNeADonde(resultNeADonde);

            const lsServerCiclos = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_GINECOCICLO);
            var resultCiclos = lsServerCiclos.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCiclos(resultCiclos);

            const lsServerPariente = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_PARENTES);
            var resultPariente = lsServerPariente.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsPariente(resultPariente);

            const lsServerGineMetodo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_GINECOMETO);
            var resultGineMetodo = lsServerGineMetodo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGineMetodo(resultGineMetodo);

            const lsServerBiotipo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_BIOTIPO);
            var resultBiotipo = lsServerBiotipo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsBiotipo(resultBiotipo);

            const lsServerResultado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RESULTADO);
            var resultResultado = lsServerResultado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResultado(resultResultado);

            const lsServerDeporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HC_DEPORTE);
            var resultDeporte = lsServerDeporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDeporte(resultDeporte);

            const lsServerFrecuencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_FRECUENCIAS);
            var resultFrecuencia = lsServerFrecuencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsFrecuencia(resultFrecuencia);

            const lsServerRefuerzo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_REFUERZO);
            var resultRefuerzo = lsServerRefuerzo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRefuerzo(resultRefuerzo);

            const lsServerTipoFobia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HC_TIFOBIA);
            var resultTipoFobia = lsServerTipoFobia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoFobia(resultTipoFobia);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [documento]);

    async function getAllConceptos() {
        try {
            const lsServerConceptoActitudIngreso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEP_APTI_PSICO_INGRESO);
            var resultConceptoActitudIngreso = lsServerConceptoActitudIngreso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsIngreso(resultConceptoActitudIngreso);

            const lsServerConceptoActitudControl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEP_APTI_PSICO_CONTROL);
            var resultConceptoActitudControl = lsServerConceptoActitudControl.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsControlPeriodico(resultConceptoActitudControl);
        } catch (error) { }
    }

    useEffect(() => {
        getAllConceptos();
    }, [atencion]);

    useEffect(() => {
        async function getAllDxs() {
            try {
                var dataAntecente = await GetAntecedente(documento);
                if (dataAntecente.status === 200) {
                    setTextAntecedente(dataAntecente.data);
                }

                if (lsLastRecord) {
                    if (lsLastRecord.dx1 !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsLastRecord.dx1);
                        setLsDx1(lsServerCie11.data);
                        setTextDx1(lsLastRecord.dx1);
                    }

                    if (lsLastRecord.dx2 !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsLastRecord.dx2);
                        setLsDx2(lsServerCie11.data);
                        setTextDx2(lsLastRecord.dx2);
                    }

                    if (lsLastRecord.dx3 !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsLastRecord.dx3);
                        setLsDx3(lsServerCie11.data);
                        setTextDx3(lsLastRecord.dx3);
                    }
                }
            } catch (error) { }
        }

        getAllDxs();
    }, [lsLastRecord]);

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

    const handleDx3 = async (event) => {
        try {
            setTextDx3(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx3(lsServerCie11.data);
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

    useEffect(() => {

    }, []);

    const handleChangeTalla = (event) => {
        try {
            setTalla(event.target.value);
            var talla = event.target.value;
            var imcFinal = Number(peso) / Math.pow(talla, 2);
            setIMC(imcFinal.toFixed(1));

            if (imcFinal < 18.4) {
                setClasificacion("BAJO DE PESO")
                setClasificacionColor("info");
            } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                setClasificacion("NORMAL")
                setClasificacionColor("success");
            } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                setClasificacion("SOBREPESO")
                setClasificacionColor("warning");
            } else if (imcFinal >= 30 && imcFinal <= 34.9) {
                setClasificacion("OBESIDAD GRADO I")
                setClasificacionColor("error");
            } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                setClasificacion("OBESIDAD GRADO II")
                setClasificacionColor("error");
            } else if (imcFinal > 40) {
                setClasificacion("OBESIDAD GRADO III")
                setClasificacionColor("error");
            }
        } catch (error) { }
    }

    const handleChangePeso = (event) => {
        try {
            setPeso(event.target.value);

            var imcFinal = event.target.value / Math.pow(talla, 2);
            setIMC(imcFinal.toFixed(1));

            if (imcFinal < 18.4) {
                setClasificacion("BAJO DE PESO")
                setClasificacionColor("info");
            } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                setClasificacion("NORMAL")
                setClasificacionColor("success");
            } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                setClasificacion("SOBREPESO")
                setClasificacionColor("warning");
            } else if (imcFinal >= 30 && imcFinal <= 34.9) {
                setClasificacion("OBESIDAD GRADO I")
                setClasificacionColor("error");
            } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                setClasificacion("OBESIDAD GRADO II")
                setClasificacionColor("error");
            } else if (imcFinal > 40) {
                setClasificacion("OBESIDAD GRADO III")
                setClasificacionColor("error");
            }
        } catch (error) { }
    }

    setTimeout(() => {
        setTimeWait(true);
    }, 3000);

    return (
        <Fragment>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <ControlModal
                maxWidth="lg"
                open={openAntecedente}
                onClose={() => setOpenAntecedente(false)}
                title="ANTECEDENTES DE HISTORIA CLÍNICA"
            >
                <InputOnChange
                    onChange={(e) => setTextAntecedente(e.target.value)}
                    value={textAntecedente}
                    multiline
                    rows={20}
                    disabled
                />
            </ControlModal>

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openApuntesPersonales}
                title="APUNTES PERSONALES"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openHistory}
                title="VISTA DE HISTÓRICO"
                handleClose={() => setOpenHistory(false)}
            >
                <TableAntecedentes documento={documento} param={cadenaHistory} />
            </FullScreenDialog>

            <FullScreenDialog
                open={openParaclinico}
                title={textParaclinico === DefaultValue.PARACLINICO_AUDIOMETRIA ? 'AUDIOMETRÍA' :
                    textParaclinico === DefaultValue.PARACLINICO_CITOLOGIA ? 'CITOLIGÍA' :
                        textParaclinico === DefaultValue.PARACLINICO_ELECTRO ? 'EKG' :
                            textParaclinico === DefaultValue.PARACLINICO_ESPIROMETRIA ? 'ESPIROMETRÍA' :
                                textParaclinico === DefaultValue.PARACLINICO_LABORATORIO ? 'LABORATORIO CLÍNICO' :
                                    textParaclinico === DefaultValue.PARACLINICO_RNM ? 'RNM' :
                                        textParaclinico === DefaultValue.PARACLINICO_RXTORAX ? 'RX DE TORAX (CRITERIOS OIT)' :
                                            textParaclinico === DefaultValue.PARACLINICO_VISIOMETRIA ? 'VISIOMETRÍA' : ''}
                handleClose={() => setOpenParaclinico(false)}
            >
                <TableExamenesPara idTipoParaclinico={textParaclinico} documento={documento} />
            </FullScreenDialog>

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Accordion title={<><IconAffiliate />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ANTECEDENTES PATOLÓGICOS</Typography></>}>
                            <SubCard>
                                <Grid container spacing={0.5}>
                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="1. Congenitos"
                                            name="congenitosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.congenitosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="2. Inmunoprevenible"
                                            name="inmunoPrevenibleAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.inmunoPrevenibleAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="3. Infecciosos"
                                            name="infecciososAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.infecciososAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="4. Ojos"
                                            name="ojoAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.ojoAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="5. Agudeza Visual"
                                            name="agudezaVisualAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.agudezaVisualAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="6. Oidos"
                                            name="oidosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.oidosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4} >
                                        <InputCheckBox
                                            label="7. Nasofaringe"
                                            name="nasoFaringeAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.nasoFaringeAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="8. Cardiovascular"
                                            name="cardiovascularAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.cardiovascularAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="9. Pulmonar"
                                            name="pulmonarAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.pulmonarAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="10. Gastrointestinal"
                                            name="gastrointestinalAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.gastrointestinalAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="11. Genitourinario"
                                            name="gimitoUrinarioAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.gimitoUrinarioAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="12. Neurológico"
                                            name="neurologicoAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.neurologicoAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="13. Trastornos de piel"
                                            name="transtornoPielAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.transtornoPielAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="14. Osteomusculares"
                                            name="osteoMuscularAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.osteoMuscularAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="15. Alérgicos"
                                            name="alergicosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.alergicosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="16. Tóxicos"
                                            name="toxicoAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.toxicoAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="17. Farmacólogicos"
                                            name="faRmacologicosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.faRmacologicosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="18. Quirúrgicos"
                                            name="quirurgicosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.quirurgicosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4} >
                                        <InputCheckBox
                                            label="19. Traumático"
                                            name="traumaticosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.traumaticosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="20. Transfusiones"
                                            name="tranfuccionesAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.tranfuccionesAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="21. ETS"
                                            name="etsAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.etsAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="22. Deformidades"
                                            name="deformidadesAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.deformidadesAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="23. Psiquiatrico"
                                            name="psiquiatricosAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.psiquiatricosAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="24. Farmacodependencia"
                                            name="farmacoDependenciaAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.farmacoDependenciaAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="25. Enf. Metab."
                                            name="emAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.emAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="26. Renal"
                                            name="renalAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.renalAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="27. Asma"
                                            name="asmaAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.asmaAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="28. O.R.L."
                                            name="orlAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.orlAP}
                                        />
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <InputCheckBox
                                            label="29. Cancer"
                                            name="cancerAP"
                                            size={30}
                                            defaultValue={lsLastRecord?.cancerAP}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ pt: 4 }}>
                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue={lsLastRecord?.especifiqueAP}
                                        fullWidth
                                        name="especifiqueAP"
                                        label="Especifique"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('ANTECEDENTES_PATALOGICOS') }}
                                        icons={DetailIcons[3].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[4].title}
                                        onClick={() => setOpenAntecedente(true)}
                                        icons={DetailIcons[4].icons}
                                    />
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconCarCrash />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ACCIDENTES DE TRABAJO</Typography></>}>

                            <SubCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={3} >
                                        <InputText
                                            type="number"
                                            defaultValue={lsLastRecord?.anioAT}
                                            fullWidth
                                            name="anioAT"
                                            label="Año"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.especifiqueAT}
                                            fullWidth
                                            name="especifiqueAT"
                                            label="Especifique"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('ACCIDENTES_TRABAJO') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconWheelchair />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ENFERMEDAD LABORAL</Typography></>}>

                            <SubCard>
                                <Grid container spacing={2} sx={{ pt: 2 }}>
                                    <Grid item xs={3} >
                                        <InputText
                                            type="number"
                                            defaultValue={lsLastRecord?.anio1AT}
                                            fullWidth
                                            name="anio1AT"
                                            label="Año"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.especifique1AT}
                                            fullWidth
                                            name="especifique1AT"
                                            label="Especifique"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('ACCIDENTES_TRABAJO') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconVaccine />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">INMUNIZACIONES</Typography></>}>
                            <SubCard>
                                <Grid container spacing={3}>
                                    <Grid item xs={2} >
                                        <InputCheck
                                            label="Tetano"
                                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, tetanoIM: e.target.checked })}
                                            size={30}
                                            checked={estadoVacuna.tetanoIM}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputCheck
                                            label="Influenza"
                                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, influenzaIM: e.target.checked })}
                                            size={30}
                                            checked={estadoVacuna.influenzaIM}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputCheck
                                            label="Fiebre Amarilla"
                                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, fiebreAmarillaIM: e.target.checked })}
                                            size={30}
                                            checked={estadoVacuna.fiebreAmarillaIM}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputCheck
                                            label="Rubéola - Sarampión"
                                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, rubeolaSarampionIM: e.target.checked })}
                                            size={30}
                                            checked={estadoVacuna.rubeolaSarampionIM}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputCheck
                                            label="COVID-19"
                                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, covid19IM: e.target.checked })}
                                            size={30}
                                            checked={estadoVacuna.covid19IM}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputCheck
                                            label="Otras"
                                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, otrasIM: e.target.checked })}
                                            size={30}
                                            checked={estadoVacuna.otrasIM}
                                        />
                                    </Grid>

                                    {estadoVacuna.tetanoIM ?
                                        <Grid item xs={2}>
                                            <InputText
                                                type="number"
                                                defaultValue={lsLastRecord?.anioVacuna1IM}
                                                fullWidth
                                                name="anioVacuna1IM"
                                                label="Año Tetano"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid> : null}
                                    {estadoVacuna.influenzaIM ?
                                        <Grid item xs={2} >
                                            <InputText
                                                type="number"
                                                defaultValue={lsLastRecord?.anioVacuna2IM}
                                                fullWidth
                                                name="anioVacuna2IM"
                                                label="Año Influenza"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid> : null}
                                    {estadoVacuna.fiebreAmarillaIM ?
                                        <Grid item xs={2} >
                                            <InputText
                                                type="number"
                                                defaultValue={lsLastRecord?.anioVacuna3IM}
                                                fullWidth
                                                name="anioVacuna3IM"
                                                label="Año Fiebre Amarilla"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid> : null}
                                    {estadoVacuna.rubeolaSarampionIM ?
                                        <Grid item xs={2} >
                                            <InputText
                                                type="number"
                                                defaultValue={lsLastRecord?.anioVacuna4IM}
                                                fullWidth
                                                name="anioVacuna4IM"
                                                label="Año Rubéola - Sarampion"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid> : null}
                                    {estadoVacuna.covid19IM ?
                                        <Fragment>
                                            <Grid item xs={2} >
                                                <InputText
                                                    type="number"
                                                    defaultValue={lsLastRecord?.anioVacuna5IM}
                                                    fullWidth
                                                    name="anioVacuna5IM"
                                                    label="Año Esquema Completo"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <InputSelect
                                                    name="idRefuerzoIM"
                                                    label="Refuerzo"
                                                    defaultValue={lsLastRecord?.idRefuerzoIM}
                                                    options={lsRefuerzo}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Fragment> : null}
                                    {estadoVacuna.otrasIM ?
                                        <Fragment>
                                            <Grid item xs={2}>
                                                <InputCheckBox
                                                    label="BCG"
                                                    name="vacunaBCGIM"
                                                    size={30}
                                                    defaultValue={lsLastRecord?.vacunaBCGIM}
                                                />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <InputCheckBox
                                                    label="VHB"
                                                    name="vacunaVHBIM"
                                                    size={30}
                                                    defaultValue={lsLastRecord?.vacunaVHBIM}
                                                />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <InputCheckBox
                                                    label="VHC"
                                                    name="vacunaVHCIM"
                                                    size={30}
                                                    defaultValue={lsLastRecord?.vacunaVHCIM}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <InputText
                                                    defaultValue={lsLastRecord?.anioVacuna6IM}
                                                    fullWidth
                                                    name="anioVacuna6IM"
                                                    label="Observación"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Fragment>
                                        : null}
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconFriends />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ANTECEDENTES PATOLÓGICOS FAMILIAR</Typography></>}>
                            <SubCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <InputSelect
                                            name="parentesco1ANFA"
                                            label="Parentesco"
                                            defaultValue={lsLastRecord?.parentesco1ANFA}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={9}>
                                        <InputText
                                            defaultValue={lsLastRecord?.parentesco1ObserANFA}
                                            fullWidth
                                            name="parentesco1ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputSelect
                                            name="parentesco2ANFA"
                                            label="Parentesco"
                                            defaultValue={lsLastRecord?.parentesco2ANFA}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={9}>
                                        <InputText
                                            defaultValue={lsLastRecord?.parentesco2ObserANFA}
                                            fullWidth
                                            name="parentesco2ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputSelect
                                            name="parentesco3ANFA"
                                            label="Parentesco"
                                            defaultValue={lsLastRecord?.parentesco3ANFA}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={9}>
                                        <InputText
                                            defaultValue={lsLastRecord?.parentesco3ObserANFA}
                                            fullWidth
                                            name="parentesco3ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputSelect
                                            name="parentesco4ANFA"
                                            label="Parentesco"
                                            defaultValue={lsLastRecord?.parentesco4ANFA}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={9}>
                                        <InputText
                                            defaultValue={lsLastRecord?.parentesco4ObserANFA}
                                            fullWidth
                                            name="parentesco4ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconEmpathize />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">HÁBITOS</Typography></>}>
                            <SubCard>
                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2} >
                                        <InputCheckBox
                                            label="Fuma"
                                            name="fumaHB"
                                            size={30}
                                            defaultValue={lsLastRecord?.fumaHB}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputText
                                            defaultValue={lsLastRecord?.cigarrillosDiasFumaHB}
                                            fullWidth
                                            type="number"
                                            name="cigarrillosDiasFumaHB"
                                            label="Cigarrillos Al Día"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputText
                                            defaultValue={lsLastRecord?.aniosCigaFumaHB}
                                            fullWidth
                                            type="number"
                                            name="aniosCigaFumaHB"
                                            label="Años"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />

                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputText
                                            defaultValue={lsLastRecord?.mesesCigaFumaHB}
                                            fullWidth
                                            type="number"
                                            name="mesesCigaFumaHB"
                                            label="Meses"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={4} >
                                        <InputText
                                            defaultValue={lsLastRecord?.observacionFumaHB}
                                            fullWidth
                                            name="observacionFumaHB"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2}>
                                        <InputCheckBox
                                            label="Fumaba"
                                            name="fumabaHB"
                                            size={30}
                                            defaultValue={lsLastRecord?.fumabaHB}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputText
                                            defaultValue={lsLastRecord?.cigarrillosDiasFumabaHB}
                                            fullWidth
                                            type="number"
                                            name="cigarrillosDiasFumabaHB"
                                            label="Cigarrillos Al Día"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputText
                                            defaultValue={lsLastRecord?.aniosCigaFumabaHB}
                                            fullWidth
                                            type="number"
                                            name="aniosCigaFumabaHB"
                                            label="Años"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputText
                                            defaultValue={lsLastRecord?.mesesCigaFumabaHB}
                                            fullWidth
                                            type="number"
                                            name="mesesCigaFumabaHB"
                                            label="Meses"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={4} >
                                        <InputText
                                            defaultValue={lsLastRecord?.observacionFumabaHB}
                                            fullWidth
                                            name="observacionFumabaHB"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2}>
                                        <InputCheckBox
                                            label="Practica Deporte"
                                            name="practicaDeporteHB"
                                            size={30}
                                            defaultValue={lsLastRecord?.practicaDeporteHB}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputSelect
                                            name="idFrecuenciaDeporteHB"
                                            label="Frecuencia Deporte"
                                            defaultValue={lsLastRecord?.idFrecuenciaDeporteHB}
                                            options={lsFrecuencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputSelect
                                            name="idCualDeporteHB"
                                            label="Cual Deporte"
                                            defaultValue={lsLastRecord?.idCualDeporteHB}
                                            options={lsDeporte}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6} >
                                        <InputText
                                            defaultValue={lsLastRecord?.observacionPracticaDeporHB}
                                            fullWidth
                                            name="observacionPracticaDeporHB"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2}>
                                        <InputCheckBox
                                            label="Hobby/Pasatiempos"
                                            name="hobbiesPasatiempoHB"
                                            size={30}
                                            defaultValue={lsLastRecord?.hobbiesPasatiempoHB}
                                        />
                                    </Grid>

                                    <Grid item xs={10} >
                                        <InputText
                                            defaultValue={lsLastRecord?.cualHobbiesHB}
                                            fullWidth
                                            name="cualHobbiesHB"
                                            label="Cual"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2} >
                                        <InputCheckBox
                                            label="¿Consume Bebidas Alcohólicas?"
                                            name="consumeBebidasAlcoholicasHB"
                                            size={30}
                                            defaultValue={lsLastRecord?.consumeBebidasAlcoholicasHB}
                                        />
                                    </Grid>

                                    <Grid item xs={3} >
                                        <InputSelect
                                            name="idFrecuenciaBebidaAlHB"
                                            label="Frecuencia de Bebidas"
                                            defaultValue={lsLastRecord?.idFrecuenciaBebidaAlHB}
                                            options={lsFrecuencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={7}>
                                        <InputText
                                            defaultValue={lsLastRecord?.cualBebidasAlHB}
                                            fullWidth
                                            name="cualBebidasAlHB"
                                            label="Cual"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2}>
                                        <InputCheckBox
                                            label="Fobias"
                                            name="fobiasHB"
                                            size={30}
                                            defaultValue={lsLastRecord?.fobiasHB}
                                        />
                                    </Grid>

                                    <Grid item xs={5} >
                                        <InputMultiSelects
                                            fullWidth
                                            onChange={(event, value) => setTipoFobia(value)}
                                            value={tipoFobia}
                                            label="Tipo de Fobia"
                                            options={lsTipoFobia}
                                        />
                                    </Grid>

                                    <Grid item xs={5} >
                                        <InputText
                                            defaultValue={lsLastRecord?.cualFobiaHB}
                                            fullWidth
                                            name="cualFobiaHB"
                                            label="Cual"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    {lsEmployee.genero === DefaultValue.GeneroWomen ?
                        <Grid item xs={12}>
                            <Accordion title={<><IconWoman />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">GINECO OBSTÉTRICOS</Typography></>}>
                                <SubCard>
                                    <Grid container spacing={2} sx={{ pb: 2 }}>
                                        <Grid item xs={2.5}>
                                            <InputText
                                                defaultValue={lsLastRecord?.menarquiaGO}
                                                fullWidth
                                                type="number"
                                                name="menarquiaGO"
                                                label="Menarquía (EDAD)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2.5} >
                                            <InputSelect
                                                name="idCiclosGO"
                                                label="Ciclos"
                                                defaultValue={lsLastRecord?.idCiclosGO}
                                                options={lsCiclos}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2.5} >
                                            <InputText
                                                defaultValue={lsLastRecord?.duracionGO}
                                                fullWidth
                                                type="number"
                                                name="duracionGO"
                                                label="Duración (DIAS)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={1.5}>
                                            <InputCheckBox
                                                label="Amenorrea"
                                                name="amenoreaGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.amenoreaGO}
                                            />
                                        </Grid>

                                        <Grid item xs={1.5}>
                                            <InputCheckBox
                                                label="Dismenorrea"
                                                name="disminureaGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.disminureaGO}
                                            />
                                        </Grid>

                                        <Grid item xs={1.5} >
                                            <InputCheckBox
                                                label="Leucorrea"
                                                name="leucoreaGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.leucoreaGO}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} sx={{ pb: 2 }}>
                                        <Grid item xs={2.5}>
                                            <InputText
                                                defaultValue={lsLastRecord?.vidaMaritalGO}
                                                fullWidth
                                                type="number"
                                                name="vidaMaritalGO"
                                                label="Vida Marital (EDAD EN AÑOS)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <InputText
                                                defaultValue={lsLastRecord?.vidaObstetricaGO}
                                                fullWidth
                                                type="number"
                                                name="vidaObstetricaGO"
                                                label="Vida Obstétrica (EDAD EN AÑOS)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={1.4}>
                                            <InputText
                                                defaultValue={lsLastRecord?.ggo}
                                                fullWidth
                                                type="number"
                                                name="gGO"
                                                label="G"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={1.4} >
                                            <InputText
                                                defaultValue={lsLastRecord?.pgo}
                                                fullWidth
                                                type="number"
                                                name="pGO"
                                                label="P"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={1.4} >
                                            <InputText
                                                defaultValue={lsLastRecord?.ago}
                                                fullWidth
                                                type="number"
                                                name="aGO"
                                                label="A"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={1.4} >
                                            <InputText
                                                defaultValue={lsLastRecord?.csgo}
                                                fullWidth
                                                type="number"
                                                name="cSGO"
                                                label="C"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={1.4} >
                                            <InputText
                                                defaultValue={lsLastRecord?.vgo}
                                                fullWidth
                                                type="number"
                                                name="vGO"
                                                label="V"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} sx={{ pb: 2 }}  >
                                        <Grid item xs={2.5}>
                                            <InputDatePicker
                                                label="Fecha FUP"
                                                name="fUPGO"
                                                defaultValue={lsLastRecord?.fupgo}
                                            />
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <InputDatePicker
                                                label="Fecha FUR"
                                                name="fURGO"
                                                defaultValue={lsLastRecord?.furgo}
                                            />
                                        </Grid>

                                        <Grid item xs={1}>
                                            <InputCheckBox
                                                label="ETS"
                                                name="eTSGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.etsgo}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <InputText
                                                defaultValue={lsLastRecord?.cualgo}
                                                fullWidth
                                                name="cUALGO"
                                                label="Cúal?"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} sx={{ pb: 2 }}>
                                        <Grid item xs={2}>
                                            <InputCheckBox
                                                label="Quiste de Ovarios - Miomas"
                                                name="quisteOvariosBiomasGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.quisteOvariosBiomasGO}
                                            />
                                        </Grid>

                                        <Grid item xs={1.5}>
                                            <InputCheckBox
                                                label="Endometriosis"
                                                name="endometriosisGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.endometriosisGO}
                                            />
                                        </Grid>

                                        <Grid item xs={1}>
                                            <InputCheckBox
                                                label="EPI"
                                                name="ePIGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.epigo}
                                            />
                                        </Grid>

                                        <Grid item xs={1.5} >
                                            <InputCheckBox
                                                label="Planifica"
                                                name="planificaGO"
                                                size={30}
                                                defaultValue={lsLastRecord?.planificaGO}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputSelect
                                                name="idMetodoGO"
                                                label="Método"
                                                defaultValue={lsLastRecord?.idMetodoGO}
                                                options={lsGineMetodo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputText
                                                defaultValue={lsLastRecord?.ultimoAnioCitologiaGO}
                                                fullWidth
                                                type="number"
                                                name="ultimoAnioCitologiaGO"
                                                label="Ultimo Año Citologia."
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputSelect
                                                name="idResultadoGO"
                                                label="Resultado"
                                                defaultValue={lsLastRecord?.idResultadoGO}
                                                options={lsResultado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <InputText
                                                multiline
                                                rows={4}
                                                defaultValue={lsLastRecord?.observacionesGO}
                                                fullWidth
                                                name="observacionesGO"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                title={DetailIcons[1].title}
                                                onClick={() => setOpenApuntesPersonales(true)}
                                                icons={DetailIcons[1].icons}
                                            />

                                            <DetailedIcon
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Accordion>
                        </Grid> : null
                    }

                    <Grid item xs={12}>
                        <Accordion title={<><IconDeviceDesktopAnalytics />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">
                                REVISIÓN POR SISTEMAS (Seleccione el ítem que encuentre Anormal o No Explorado y descríbalo en la casilla observación)</Typography>
                        </>}>
                            <SubCard>
                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="1. Cabeza - Cefalea"
                                            name="cabezaRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.cabezaRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="2. Ojos(A. Visual, dolor, congestion, etc)"
                                            name="ojosRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.ojosRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="3. Oidos(A. Auditiva, dolor, secreción)"
                                            name="oidosRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.oidosRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="4. Nariz (Congestión, epistaxis, rinorrea)"
                                            name="narizRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.narizRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="5. Boca (eraciones, sangrado de encias)"
                                            name="bocaRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.bocaRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="6. Garganta (Dolor, ardor, disfagia, disfonía)"
                                            name="gargantaRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.gargantaRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4} >
                                        <InputCheckBox
                                            label="7. Cuello (Dolor, torticolis, opatías)"
                                            name="cuellosRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.cuellosRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="8. Cardio-Respiratorio"
                                            name="cardioRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.cardioRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="9. Gastrointestinal"
                                            name="gastrointestinalRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.gastrointestinalRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="10. GenitoUrinario"
                                            name="genitoUrinarioRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.genitoUrinarioRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="11. Osteo-Articular"
                                            name="osteoRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.osteoRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="12.Neuro-Muscular"
                                            name="neuroRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.neuroRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4} >
                                        <InputCheckBox
                                            label="13. Piel y Anexos"
                                            name="pielRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.pielRS}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputCheckBox
                                            label="14. Psiquiátrico"
                                            name="psiquiatricoRS"
                                            size={30}
                                            defaultValue={lsLastRecord?.psiquiatricoRS}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue={lsLastRecord?.observacionRS}
                                        fullWidth
                                        name="observacionRS"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('REVISION_SISTEMAS') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconUserSearch />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">EXAMEN FÍSICO</Typography></>}>
                            <SubCard>

                                <SubCard title="Lateralidad">
                                    <Grid item xs={6}>
                                        <InputSelect
                                            name="lateralidadExamenesFisico"
                                            label="Lateralidad"
                                            defaultValue={lsLastRecord?.lateralidadExamenesFisico}
                                            options={lsLateralidad}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </SubCard>
                                <Grid sx={{ pb: 2 }} />

                                <SubCard
                                    title="Signos Vitales/Tensión Arterial"
                                    secondary={
                                        <Tooltip title="Historico Signos Vitales/Tensión Arterial">
                                            <Button onClick={() => { setOpenHistory(true); setCadenaHistory('SIGNOS_VITALES') }}>
                                                <IconEdit stroke={1.5} size="1.3rem" />
                                            </Button>
                                        </Tooltip>
                                    }
                                >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={4}>
                                            <InputText
                                                fullWidth
                                                defaultValue={lsLastRecord?.taSentadoEF}
                                                name="tASentadoEF"
                                                label="TA Sentado"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InputText
                                                fullWidth
                                                defaultValue={lsLastRecord?.taAcostadoEF}
                                                name="tAAcostadoEF"
                                                label="TA Acostado"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InputText
                                                fullWidth
                                                defaultValue={lsLastRecord?.pulsoEF}
                                                type="number"
                                                name="pulsoEF"
                                                label="Pulso"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InputText
                                                fullWidth
                                                defaultValue={lsLastRecord?.fcef}
                                                type="number"
                                                name="fCEF"
                                                label="FC"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InputText
                                                fullWidth
                                                defaultValue={lsLastRecord?.fref}
                                                type="number"
                                                name="fREF"
                                                label="FR"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <InputText
                                                fullWidth
                                                defaultValue={lsLastRecord?.temperaturaEF}
                                                type="number"
                                                name="temperaturaEF"
                                                label="Temperatura"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                                <Grid sx={{ pb: 2 }} />

                                <SubCard
                                    title="Antropometria"
                                    secondary={<Button onClick={() => { setOpenHistory(true); setCadenaHistory('ANTROPOMETRIA') }}>
                                        <IconEdit stroke={1.5} size="1.3rem" />
                                    </Button>}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <InputOnChange
                                                type="number"
                                                label="Peso(Kilos)"
                                                onChange={handleChangePeso}
                                                value={peso}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputOnChange
                                                type="number"
                                                label="Talla(Metros)"
                                                onChange={handleChangeTalla}
                                                value={talla}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputOnChange
                                                type="number"
                                                label="IMC"
                                                disabled
                                                onChange={(e) => setIMC(e?.target.value)}
                                                value={imc}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Chip
                                                size="medium"
                                                label={clasificacion}
                                                color={clasificacionColor}
                                                sx={{ fontSize: '20px', width: '300px', height: '50px' }}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputSelect
                                                name="idBiotipoEF"
                                                label="Biotipo"
                                                defaultValue={lsLastRecord?.idBiotipoEF}
                                                options={lsBiotipo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                                <Grid sx={{ pb: 2 }} />

                                <SubCard title="Exploración Morfológica - Aspecto (Seleccione el ítem que encuentre Anormal o No Explorado y descríbalo en la casilla observación)">
                                    <Grid container spacing={1} sx={{ pb: 2 }}>
                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="1. Estado Nutricional"
                                                name="estadoNitricionalEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.estadoNitricionalEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="2. Piel-Faneras"
                                                name="pielFaneraEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.pielFaneraEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="3. Craneo"
                                                name="craneoEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.craneoEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="4. Parpados"
                                                name="parpadoEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.parpadoEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="5. Conjuntivas"
                                                name="conjuntivasEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.conjuntivasEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="6. Corneas"
                                                name="corniasEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.corniasEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3} >
                                            <InputCheckBox
                                                label="7. Pupilas"
                                                name="pupilasEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.pupilasEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="8. Reflejo Fotomotors"
                                                name="reflejoFotomotorEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.reflejoFotomotorEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="9. Reflejo Corneal"
                                                name="reflejoCornialEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.reflejoCornialEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="10. Fondo Ojos"
                                                name="fondoOjosEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.fondoOjosEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="11. Inspección Externa Oidos"
                                                name="inspeccionEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.inspeccionEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="12. Otoscopia"
                                                name="otoscopiaEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.otoscopiaEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="13. Inpección Externa de Nariz"
                                                name="inspeccionNarizEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.inspeccionNarizEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="14. Rinoscopia"
                                                name="rinoscopioEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.rinoscopioEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="15. Labios"
                                                name="labiosEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.labiosEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="16. Mucosa Oral"
                                                name="mucosaEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.mucosaEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="17. Encías"
                                                name="enciasEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.enciasEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="18. Paladar"
                                                name="paladarEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.paladarEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="19. Dientes"
                                                name="dientesEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.dientesEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="20. Lengua"
                                                name="lenguaEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.lenguaEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="21. Faringe"
                                                name="faringeEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.faringeEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="22. Amigdalas"
                                                name="amigdalasEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.amigdalasEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="23. Cuello Tiroides"
                                                name="cuellosEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.cuellosEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="24. Inspección de Torax-Mamas"
                                                name="inspeccionToraxEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.inspeccionToraxEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="25. Auscultación Cardiaca"
                                                name="auscultacionCardiacaEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.auscultacionCardiacaEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="26. Auscultación Respiratoria"
                                                name="auscultacionRespiratoriaEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.auscultacionRespiratoriaEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="27. Inspección Abdomen"
                                                name="inspeccionAbdomenEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.inspeccionAbdomenEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="28. Palpación Abdomen"
                                                name="palpacionAbdomenEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.palpacionAbdomenEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="29. Exploración Higado"
                                                name="exploracionHigadoEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.exploracionHigadoEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="30. Exploración de Bazo"
                                                name="exploracionVasoEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.exploracionVasoEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="31. Exploración Riñones"
                                                name="exploracionRinionesEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.exploracionRinionesEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="32. Anillos Inguinale"
                                                name="anillosInguinalesEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.anillosInguinalesEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="33. Anillo Umbilical"
                                                name="anilloUmbilicalEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.anilloUmbilicalEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="34. Genitales Externos"
                                                name="genitalesExternosEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.genitalesExternosEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="35. Región Anal"
                                                name="regionAnalEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.regionAnalEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="36. Tacto Rectal"
                                                name="tactoRectalEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.tactoRectalEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="37. Tacto Vaginal"
                                                name="tactoVaginalEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.tactoVaginalEF}
                                                disabled={lsEmployee.genero === DefaultValue.GeneroWomen ? false : true}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="38. Extremidades Superiores"
                                                name="extremidadesSuperioresEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.extremidadesSuperioresEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="39. Extremidades Inferiores"
                                                name="extremidadesInferioresEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.extremidadesInferioresEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="40. Pulsos"
                                                name="pulsosEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.pulsosEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="41. Columna Vertebral"
                                                name="columnaVertebralEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.columnaVertebralEF}
                                            />
                                        </Grid>

                                        <Grid item xs={3}>
                                            <InputCheckBox
                                                label="42. Articulaciones"
                                                name="articulacionesEF"
                                                size={30}
                                                defaultValue={lsLastRecord?.articulacionesEF}
                                            />
                                        </Grid>
                                    </Grid>

                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue={lsLastRecord?.especifiqueEMEFU}
                                        fullWidth
                                        name="especifiqueEMEFU"
                                        label="Observación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[1].title}
                                            onClick={() => setOpenApuntesPersonales(true)}
                                            icons={DetailIcons[1].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('EXPLORACION_MORFOLOGICA') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>
                                </SubCard>
                                <Grid sx={{ pb: 2 }} />
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconYoga />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">
                                EXPLORACIÓN FUNCIONAL (Seleccione el ítem que encuentre Anormal o No Explorado y descríbalo en la casilla observación)
                            </Typography></>}>
                            <SubCard>
                                <Grid container spacing={1} sx={{ pb: 2 }}>
                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="1. Movilidad Ocular"
                                            name="movilidadEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="2. Equilibrio"
                                            name="equilibrioEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.equilibrioEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="3. Marcha Coordinación"
                                            name="marchaEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.marchaEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="4. Movilidad Hombro"
                                            name="movilidadHombroEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadHombroEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="5. Movilidad Codo"
                                            name="movilidadCodoEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadCodoEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="6. Movilidad Muñeca"
                                            name="movilidadMuniecaEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadMuniecaEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="7. Signo de Tinel"
                                            name="signoTinelEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.signoTinelEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="8. Signo de Phalen"
                                            name="signoPhalenEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.signoPhalenEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="9. Movilidad Manos"
                                            name="movilidadManosEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadManosEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="10. Movilidad Cadera"
                                            name="movilidadCaderaEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadCaderaEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="11. Movilidad Rodilla"
                                            name="movilidadRodillaEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadRodillaEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="12. Movilidad Tobillo"
                                            name="movilidadTobilloEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadTobilloEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="13. Movilidad Cuello (C1-C4)"
                                            name="movilidadCuelloEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.movilidadCuelloEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="14. ROT Bicipital (C5)"
                                            name="rOTVisipitalEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.rotVisipitalEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="15. ROT Rotuliano (L4)"
                                            name="rOTRotuleanoEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.rotRotuleanoEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="16. Extencion Primer Artejo (L5)"
                                            name="extencionEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.extencionEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="17. Sensibilidad cara anterior pie (L5)"
                                            name="sensibilidadCaraAnteriorEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.sensibilidadCaraAnteriorEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="18. Eversión Pie(S1)"
                                            name="eversionPiesEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.eversionPiesEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="19. Sensibilidad cara lateral pie (L5)"
                                            name="sensibilidadCaraLateralEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.sensibilidadCaraLateralEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="20. ROT Aquiliano"
                                            name="rOTAquileanoEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.rotAquileanoEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheckBox
                                            label="21. Signo de la Laségue"
                                            name="signoLasegueEFU"
                                            size={30}
                                            defaultValue={lsLastRecord?.signoLasegueEFU}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputCheck
                                            label="22. Indice Wells"
                                            size={30}
                                            onChange={(e) => setIndiceWellsEFU(e.target.checked)}
                                            checked={indiceWellsEFU}
                                        />
                                    </Grid>

                                    {indiceWellsEFU ?
                                        <Grid item xs={3}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="valorIndiceWellsEFU"
                                                label="Valor De IndiceWells"
                                                size={matchesXS ? 'small' : 'medium'}
                                                defaultValue={lsLastRecord?.valorIndiceWellsEFU}
                                            />
                                        </Grid> : null
                                    }
                                </Grid>

                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue={lsLastRecord?.observacionEFU}
                                    fullWidth
                                    name="observacionEFU"
                                    label="Observaciones"
                                    size={matchesXS ? 'small' : 'medium'}
                                />

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpenApuntesPersonales(true)}
                                        icons={DetailIcons[1].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('EXPLORACION_FUNCIONAL') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconHeartRateMonitor />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">EXÁMENES PARACLÍNICOS</Typography></>}>
                            <SubCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="Rx de Torax(Criterios OIT)"
                                            name="fechaRxToraxEPA"
                                            defaultValue={lsLastRecord?.fechaRxToraxEPA}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoRxToraxEPA}
                                            name="resultadoRxToraxEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesRxToraxEPA}
                                            name="observacionesRxToraxEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_RXTORAX) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="Espirometria"
                                            name="fechaEspirometriaEPA"
                                            defaultValue={lsLastRecord?.fechaEspirometriaEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoEspirometriaEPA}
                                            name="resultadoEspirometriaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesEspirometriaEPA}
                                            name="observacionesEspirometriaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_ESPIROMETRIA) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="Audiometria"
                                            name="fechaAudiometriaEPA"
                                            defaultValue={lsLastRecord?.fechaAudiometriaEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoAudiometriaEPA}
                                            name="resultadoAudiometriaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesAudiometriaEPA}
                                            name="observacionesAudiometriaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_AUDIOMETRIA) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="Visiometria"
                                            name="fechaVisiometriaEPA"
                                            defaultValue={lsLastRecord?.fechaVisiometriaEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoVisiometriaEPA}
                                            name="resultadoVisiometriaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6} >
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesVisiometriaEPA}
                                            name="observacionesVisiometriaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_VISIOMETRIA) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="Laboratorio Clinico"
                                            name="fechaLaboratorioClinicoEPA"
                                            defaultValue={lsLastRecord?.fechaLaboratorioClinicoEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoLaboratorioClinicoEPA}
                                            name="resultadoLaboratorioClinicoEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesLaboratorioClinicoEPA}
                                            name="observacionesLaboratorioClinicoEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_LABORATORIO) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="Cuestionario de Sintomas Respiratorios"
                                            name="fechaCuestionarioSintomaEPA"
                                            defaultValue={lsLastRecord?.fechaCuestionarioSintomaEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoCuestionarioSintomaEPA}
                                            name="resultadoCuestionarioSintomaEPA"
                                            label="Resultado"
                                            options={lsEPSintomas}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesCuestionarioSintomaEPA}
                                            name="observacionesCuestionarioSintomaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_ELECTRO) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="EKG"
                                            name="fechaEkgEPA"
                                            defaultValue={lsLastRecord?.fechaEkgEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoEkgEPA}
                                            name="resultadoEkgEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesEkgEPA}
                                            name="observacionesEkgEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_ELECTRO) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="RNM-Columna Lumbosacra"
                                            name="fechaRnmLumbosacraEPA"
                                            defaultValue={lsLastRecord?.fechaRnmLumbosacraEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoRnmLumbosacraEPA}
                                            name="resultadoRnmLumbosacraEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesRnmLumbosacraEPA}
                                            name="observacionesRnmLumbosacraEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_RNM) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputDatePicker
                                            label="RNM-Columna Cervical"
                                            name="fechaRnmCervicalEPA"
                                            defaultValue={lsLastRecord?.fechaRnmCervicalEPA}

                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <InputSelect
                                            defaultValue={lsLastRecord?.resultadoRnmCervicalEPA}
                                            name="resultadoRnmCervicalEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputText
                                            fullWidth
                                            defaultValue={lsLastRecord?.observacionesRnmCervicalEPA}
                                            name="observacionesRnmCervicalEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpenTemplate(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />

                                            <DetailedIcon
                                                xs={4}
                                                title={DetailIcons[3].title}
                                                onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_RNM) }}
                                                icons={DetailIcons[3].icons}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.observacionEPA}
                                            fullWidth
                                            name="observacionEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('EXAMENES_PARACLINICOS') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Framingham
                            calculoFramingham={calculoFramingham}
                            frFuma={frFuma}
                            frColesterol={frColesterol}
                            frTencion={frTencion}
                            frEdad={frEdad}
                            frGlicemia={frGlicemia}
                            frPuntaje={frPuntaje}
                            relacion={relacion}
                            frLdl={frLdl}
                            frHdl={frHdl}
                            riesgo={riesgo}

                            handleHdl={handleHdl}
                            hdl={hdl}
                            handleColesterol={handleColesterol}
                            colesterol={colesterol}
                            handleTrigliceridos={handleTrigliceridos}
                            trigliceridos={trigliceridos}
                            handleFuma={handleFuma}
                            fuma={fuma}
                            handleGlicemia={handleGlicemia}
                            glicemia={glicemia}
                            handleTencion={handleTencion}
                            tencion={tencion}

                            documento={documento}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconReportMedical />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">IMPRESIÓN DIAGNÓSTICA Y CONCEPTO FINAL</Typography></>}>
                            <SubCard>
                                <Grid container spacing={2}>
                                    <Fragment>
                                        <Grid item xs={2}>
                                            <InputOnChange
                                                label="Dx 1"
                                                onKeyDown={handleDx1}
                                                onChange={(e) => setTextDx1(e?.target.value)}
                                                value={textDx1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <InputSelect
                                                name="dx1"
                                                label="Dx1"
                                                defaultValue={lsLastRecord?.dx1}
                                                options={lsDx1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputOnChange
                                                label="Dx 2"
                                                onKeyDown={handleDx2}
                                                onChange={(e) => setTextDx2(e.target.value)}
                                                value={textDx2}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <InputSelect
                                                name="dx2"
                                                label="Dx2"
                                                defaultValue={lsLastRecord?.dx2}
                                                options={lsDx2}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <InputOnChange
                                                label="Dx 3"
                                                onKeyDown={handleDx3}
                                                onChange={(e) => setTextDx3(e.target.value)}
                                                value={textDx3}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <InputSelect
                                                name="dx3"
                                                label="Dx3"
                                                defaultValue={lsLastRecord?.dx3}
                                                options={lsDx3}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Fragment>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.observacionID}
                                            fullWidth
                                            name="observacionID"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[1].title}
                                            onClick={() => setOpenApuntesPersonales(true)}
                                            icons={DetailIcons[1].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('IMPRESION_DIAGNOSTICA') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.recomendacionesID}
                                            fullWidth
                                            name="recomendacionesID"
                                            label="Recomendaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[1].title}
                                            onClick={() => setOpenApuntesPersonales(true)}
                                            icons={DetailIcons[1].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('IMPRESION_DIAGNOSTICA') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.idConceptoActitudID}
                                            disabled={atencion === DefaultValue.EMO_ATENCION_EGRESO ? true : false}
                                            name="idConceptoActitudID"
                                            label="Concepto de Aptitud PsicoFisica"
                                            options={
                                                atencion === DefaultValue.EMO_ATENCION_INGRESO ? lsIngreso :
                                                    atencion === DefaultValue.EMO_ATENCION_CONTRO ? lsControlPeriodico :
                                                        atencion === DefaultValue.EMO_ATENCION_PROMO ? lsControlPeriodico :
                                                            atencion === DefaultValue.EMO_ATENCION_EGRESO ? [] : lsControlPeriodico
                                            }
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconLungs />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">SINTOMAS RESPIRATORIOS</Typography></>}>
                            <RespiratorySymptoms
                                lsLastRecord={lsLastRecord}
                                setOpenApuntesPersonales={setOpenApuntesPersonales}
                                setCadenaHistory={setCadenaHistory}
                                setOpen={setOpen}
                                setOpenHistory={setOpenHistory}
                                setOpenTemplate={setOpenTemplate}
                            />
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconFall />
                            <Typography sx={{ pl: 2 }} variant="h5" color="inherit">TRABAJO EN ALTURA / ESPACIO CONFINADO</Typography></>}>
                            <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPRESA</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <InputDatePicker
                                            label="Fecha Del Concepto"
                                            name="fechaConceptoNETA"
                                            defaultValue={new Date()}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.conceptoActitudNETA}
                                            name="conceptoActitudNETA"
                                            label="Concepto De Trabajo En Altura"
                                            options={lsNeConceptoActi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    {/* ESPACIO CONFINADO */}
                                    <Grid item xs={6}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.idConceptoEspacioConfinado}
                                            name="idConceptoEspacioConfinado"
                                            label="Concepto De Trabajo En Espacio Confinado"
                                            options={lsEspacioConfinado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputSelect
                                            name="conceptoAplazadoNETA"
                                            label="El Concepto de aptitud debe ser aplazado"
                                            defaultValue={lsLastRecord?.conceptoAplazadoNETA}
                                            options={lsOpcion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.motivoAplazoNETA}
                                            fullWidth
                                            name="motivoAplazoNETA"
                                            label="Motivo de Aplazo"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[1].title}
                                            onClick={() => setOpenApuntesPersonales(true)}
                                            icons={DetailIcons[1].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPRESA') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.descripcionResultadoNETA}
                                            fullWidth
                                            name="descripcionResultadoNETA"
                                            label="Descripción de resultados(Resumen de limitaciones o restricciones)"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[1].title}
                                            onClick={() => setOpenApuntesPersonales(true)}
                                            icons={DetailIcons[1].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPRESA') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.recomendacionesNETA}
                                            fullWidth
                                            name="recomendacionesNETA"
                                            label="Recomendaciones (En términos sencillos de cuidados y controles requeridos)"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPRESA') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>

                                    <Grid item xs={6} >
                                        <InputSelect
                                            name="remitidoNETA"
                                            label="Remitido"
                                            defaultValue={lsLastRecord?.remitidoNETA}
                                            options={lsOpcion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6} >
                                        <InputSelect
                                            name="remididoDondeNETA"
                                            label="A Donde:"
                                            defaultValue={lsLastRecord?.remididoDondeNETA}
                                            options={lsNeADonde}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                            <Grid sx={{ pb: 2 }} />

                            <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPLEADO</Typography>}>
                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={3}>
                                        <InputOnChange
                                            disabled
                                            type="number"
                                            label="Peso(Kilos)"
                                            onChange={(e) => setPeso(e.target.value)}
                                            value={peso}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputOnChange
                                            disabled
                                            type="number"
                                            label="Talla(Metros)"
                                            onChange={(e) => setTalla(e.target.value)}
                                            value={talla}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <InputOnChange
                                            type="number"
                                            label="IMC"
                                            disabled
                                            onChange={(e) => setIMC(e?.target.value)}
                                            value={imc}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Chip
                                            size="medium"
                                            label={clasificacion}
                                            color={clasificacionColor}
                                            sx={{ fontSize: '20px', width: '300px', height: '50px' }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.idRiesgoCardiovascularNEMTA}
                                            name="idRiesgoCardiovascularNEMTA"
                                            label="Riesgo Cardiovascular"
                                            options={lsRiesClasifi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <InputSelect
                                            defaultValue={lsLastRecord?.idClasificacionNEMTA}
                                            name="idClasificacionNEMTA"
                                            label="Clasificación"
                                            options={lsRiesClasifi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="1. Menor de Edad."
                                            name="idMenorEdadNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idMenorEdadNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="2. Mujer embarazada con cualquier edad de Gestacíón."
                                            name="idMujerEmbarazadaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idMujerEmbarazadaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="3. Arritmias Cardiacas."
                                            name="idArimiaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idArimiaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="4. Enfermedades o malformaciones cardiacas asintomáticas."
                                            name="idEnfermedadNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idEnfermedadNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="5. Historia de Hipotensión ortostática (no basta presentar episodios aislados)."
                                            name="idHistoriaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idHistoriaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="6. Hipertensión arterial no controlada o resistente al tratamiento."
                                            name="idHipertensionNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idHipertensionNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="7. Hipertrigliceridemia aislada severa, con cifras mayores a 500 mg/dl."
                                            name="idHipertrigliceridemiaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idHipertrigliceridemiaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="8. Cifras LDL mayores a 190 mg/dl."
                                            name="idCifrasNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idCifrasNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="9. Diabetes controladas"
                                            name="idDiabetesNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idDiabetesNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="10. Dislipemia de moderada a severa asociada a diabetes, HTA, obesidad, hipotiroidismo."
                                            name="idDislipidemiaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idDislipidemiaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="11. Diagnóstico o sospecha de dislipemia de origen familiar (genético)."
                                            name="idDiagnosticoNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idDiagnosticoNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="12. Riesgo Cardivascular a 10 años ≥ 20% según Método de Framingham."
                                            name="idRiesgoCardiovascular1NEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idRiesgoCardiovascular1NEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="13. Riesgo Cardiovascular entre 10 y 20% si existen dos o mas factores mayores de riesgo."
                                            name="idRiesgoCardiovascular2NEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idRiesgoCardiovascular2NEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="14. Hipertiroidismo no controlado o sintomático."
                                            name="idHipertiroidismoNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idHipertiroidismoNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="15. Alteración auditiva severa y bilateral que comprometa bandas conversacionales (500 a 2000 Hz)."
                                            name="idAlteracionAuditivaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idAlteracionAuditivaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="16. Vertigo y otras alteraciones del equilibrio."
                                            name="idVertigoAlteracionesNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idVertigoAlteracionesNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="17. Epilepsia u otra enfermedad neurológica, que pueda generar alteraciones de la conciencia o el equilibrio."
                                            name="idEpilegsiaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idEpilegsiaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="18. Ceguera Temporal o permanente o alteraciones visuales significativas y severas."
                                            name="idCegueraTemporalNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idCegueraTemporalNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="19. Historia de fobias o episodios de pánico relacionados con altura."
                                            name="idHistoriaFobiasNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idHistoriaFobiasNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="20. Transtornos psiquiátricos, incluyendo adicciones a sustancias psicoactivas."
                                            name="idTranstornoPsiquiatricoNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idTranstornoPsiquiatricoNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="21. Limitacionesn permanentes para deambular por sus propios medios o lesiones con compromiso funcional del cuello, espalda o extremidades, que afecten el agarre requerido en estas labores."
                                            name="idLimitacionesNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idLimitacionesNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="22. Obesidad Morbida (IMC mayor a 35) o peso mayor de 120 kg, por limitaciones de sistemas de arneses."
                                            name="idObesidadMorbidaNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idObesidadMorbidaNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="23. De forma temporal, el uso de medicamentos que produzcan sueño o deprivación de sueño mas de un turno."
                                            name="idDeformaTemporalNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idDeformaTemporalNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputCheckBox
                                            label="24. Otras alteraciones Cardiovasculares, pulmonares, musculares, hepáticas, sanguíneas o renales, que por su severidad
                                o progreso puedan general alteraciones del equilibrio o de la conciencia en concepto  del médico tratante."
                                            name="idOtrasAlteracionesNEMTA"
                                            size={30}
                                            defaultValue={lsLastRecord?.idOtrasAlteracionesNEMTA}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsLastRecord?.observacionesNEMTA}
                                            fullWidth
                                            name="observacionesNEMTA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                        <DetailedIcon
                                            title={DetailIcons[0].title}
                                            onClick={() => setOpenTemplate(true)}
                                            icons={DetailIcons[0].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[1].title}
                                            onClick={() => setOpenApuntesPersonales(true)}
                                            icons={DetailIcons[1].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPLEADO') }}
                                            icons={DetailIcons[3].icons}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputSelect
                                            disabled
                                            defaultValue=""
                                            name="conceptoActitudNETA"
                                            label="Concepto De Trabajo En Altura"
                                            options={lsNeConceptoActi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputSelect
                                            disabled
                                            defaultValue=""
                                            name="idConceptoEspacioConfinado"
                                            label="Concepto De Trabajo En Espacio Confinado"
                                            options={lsEspacioConfinado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard >
                        </Accordion>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default Emo;