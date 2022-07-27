import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Box, Tab, Tabs,
    Grid, Button,
    TextField,
    useMediaQuery,
    Typography,
    Avatar
} from '@mui/material';

import PersonalData from './PersonalData';
import WorkHistory from './WorkHistory/WorkHistory';
import Emo from './Emo';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import Transitions from 'ui-component/extended/Transitions';
import { useNavigate } from 'react-router-dom';
import DialogFormula from './Modal/DialogFormula';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import HoverSocialCard from './Framingham/HoverSocialCard';
import ControlModal from 'components/controllers/ControlModal';
import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';

import { IconStairsDown, IconStairsUp } from '@tabler/icons';
import ChartAnthropometry from './ChartData/ChartAnthropometry';
import { GetLastRecordOccupationalExamination } from 'api/clients/OccupationalExaminationClient';
import { GetAllOccupationalExamination, InsertOccupationalExamination } from 'api/clients/OccupationalExaminationClient';
import { DefaultValue, Message } from 'components/helpers/Enums';
import { TitleButton } from 'components/helpers/Enums';
import { FormatDate, GetEdad, EdadFramigan, GetRiesgos, FrHdl, FrGlicemia, FrFuma, FrColesterol, FrTension, FrLdl_FrRelacion } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import User from 'assets/img/user.png';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOccupationalExamination } from 'formatdata/OccupationalExaminationForm';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdAttention, UpdateAttentions } from 'api/clients/AttentionClient';
import Cargando from 'components/loading/Cargando';
import { PutAttention } from 'formatdata/AttentionForm';
import Framingham from './Framingham';
import { ColorDrummondltd } from 'themes/colors';
import ListMedicalFormula from './MedicalOrder/ListMedicalFormula';
import MedicalFormula from './MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from './MedicalOrder/UpdateMedicalFormula';
import ViewReport from './Report/ViewReport';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const tabsOption = [
    {
        label: 'Datos Laborales',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Historia Laboral',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Historia Ocupacional',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

const calculateImc = (peso, talla) => {
    var imcFinal = peso / Math.pow(talla, 2);
    var imc = imcFinal.toFixed(1);

    var clasificacion = '';
    var clasificacionColor = '';

    if (imcFinal < 18.4) {
        clasificacion = "Bajo de Peso";
        clasificacionColor = "info";
    } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
        clasificacion = "Normal";
        clasificacionColor = "success";
    } else if (imcFinal >= 25 && imcFinal <= 29.9) {
        clasificacion = "Sobrepeso";
        clasificacionColor = "warning";
    } else if (imcFinal >= 30 && imcFinal <= 34.9) {
        clasificacion = "Normal";
        clasificacionColor = "error";
    } else if (imcFinal >= 35 && imcFinal <= 39.9) {
        clasificacion = "besidad Grado II";
        clasificacionColor = "error";
    } else if (imcFinal > 40) {
        clasificacion = "besidad Grado III";
        clasificacionColor = "error";
    }

    return { imc, clasificacion, clasificacionColor }
}

const OccupationalExamination = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [disabledButton, setDisabledButton] = useState({
        buttonSave: false,
        buttonReport: false
    });

    const [openReport, setOpenReport] = useState(false);
    const [openFormula, setOpenFormula] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [newMedicalFormula, setNewMedicalFormula] = useState(false);
    const [updateMedicalFormula, setUpdateMedicalFormula] = useState(false);
    const [listMedicalFormula, setListMedicalFormula] = useState(true);
    const [titleModal, setTitleModal] = useState('');
    const [numberId, setNumberId] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [value, setValue] = useState(0);
    const [timeWait, setTimeWait] = useState(false);
    const [viewChart, setViewChart] = useState(false);

    const [documento, setDocumento] = useState('');
    const [atencion, setAtencion] = useState('');
    const [lastRecord, setLastRecord] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsAnthropometry, setLsAnthropometry] = useState([]);
    const [lsAtencionEMO, setLsAtencionEMO] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [arrays, setArrays] = useState({
        tipoFobia: [],
        dx: [],
        antecedentesCardio: [],
        metabolico: [],
    });

    const [fuma, setFuma] = useState('');
    const [colesterol, setColesterol] = useState('');
    const [glicemia, setGlicemia] = useState('');
    const [tencion, setTencion] = useState('');

    const [frFuma, setFrFuma] = useState(null);
    const [hdl, setHdl] = useState(null);
    const [trigliceridos, setTrigliceridos] = useState(null);
    const [frLdl, setFrLdl] = useState(null);
    const [relacion, setRelacion] = useState(null);

    const [frEdad, setFrEdad] = useState(null);
    const [frColesterol, setFrColesterol] = useState(null);
    const [frHdl, setFrHdl] = useState(null);
    const [frGlicemia, setFrGlicemia] = useState(null);
    const [frTencion, setFrTencion] = useState(null);
    const [frPuntaje, setFrPuntaje] = useState(null);

    const [riesgo, setRiesgo] = useState({
        riesgoAbsoluto: '',
        riesgoRelativo: '',
        dxRiesgo: ''
    });

    const [talla, setTalla] = useState('');
    const [peso, setPeso] = useState('');
    const [imc, setIMC] = useState('');
    const [clasificacion, setClasificacion] = useState('Clasificación');
    const [clasificacionColor, setClasificacionColor] = useState('info');

    const [estadoVacuna, setEstadoVacuna] = useState({
        tetanoIM: false,
        influenzaIM: false,
        fiebreAmarillaIM: false,
        rubeolaSarampionIM: false,
        covid19IM: false,
        otrasIM: false,
    });

    const handleHdl = (event) => {
        try {
            setHdl(event.target.value);
            var result = FrLdl_FrRelacion(event.target.value, colesterol, trigliceridos);
            setFrLdl(result.ldl);
            setRelacion(result.relacion);

        } catch (error) { }
    }

    const handleColesterol = (event) => {
        try {
            setColesterol(event.target.value);
            var resultColes = FrColesterol(event.target.value, lsEmployee.nameGenero);
            setFrColesterol(resultColes);

            var result = FrLdl_FrRelacion(hdl, event.target.value, trigliceridos);
            setFrLdl(result.ldl);
            setRelacion(result.relacion);

            /* PUNTAJE */
            var puntajeFR = parseInt(frEdad) + parseInt(resultColes) + parseInt(frHdl) + parseInt(frGlicemia) + parseInt(frTencion) + parseInt(frFuma);
            setFrPuntaje(puntajeFR);

            var datos = GetRiesgos(puntajeFR, GetEdad(new Date(lsEmployee.fechaNaci)), lsEmployee.nameGenero);
            setRiesgo({
                dxRiesgo: datos.dxRiesgo,
                riesgoAbsoluto: lsEmployee.nameGenero === 'HOMBRE' ? datos.riesgoAbsolutoH : datos.riesgoAbsolutoM,
                riesgoRelativo: datos.riesgoRelativo
            });
        } catch (error) { }
    }

    const handleTrigliceridos = (event) => {
        try {
            setTrigliceridos(event.target.value);

            var result = FrLdl_FrRelacion(hdl, colesterol, event.target.value);
            setFrLdl(result.ldl);
            setRelacion(result.relacion);
        } catch (error) { }
    }

    const handleTencion = (event) => {
        try {
            setTencion(event.target.value);

            var tencionResul = FrTension(event.target.value, lsEmployee.nameGenero);
            setFrTencion(tencionResul);

            /* PUNTAJE */
            var puntajeFR = parseInt(frEdad) + parseInt(frColesterol) + parseInt(frHdl) + parseInt(frGlicemia) + parseInt(tencionResul) + parseInt(frFuma);
            setFrPuntaje(puntajeFR);

            var datos = GetRiesgos(puntajeFR, GetEdad(new Date(lsEmployee.fechaNaci)), lsEmployee.nameGenero);
            setRiesgo({
                dxRiesgo: datos.dxRiesgo,
                riesgoAbsoluto: lsEmployee.nameGenero === 'HOMBRE' ? datos.riesgoAbsolutoH : datos.riesgoAbsolutoM,
                riesgoRelativo: datos.riesgoRelativo
            });
        } catch (error) { }
    }

    const handleGlicemia = (event) => {
        try {
            setGlicemia(event.target.value);

            var glicemiaResul = FrGlicemia(event.target.value, lsEmployee.nameGenero);
            setFrGlicemia(glicemiaResul);

            /* PUNTAJE */
            var puntajeFR = parseInt(frEdad) + parseInt(frColesterol) + parseInt(frHdl) + parseInt(glicemiaResul) + parseInt(frTencion) + parseInt(frFuma);
            setFrPuntaje(puntajeFR);

            var datos = GetRiesgos(puntajeFR, GetEdad(new Date(lsEmployee.fechaNaci)), lsEmployee.nameGenero);
            setRiesgo({
                dxRiesgo: datos.dxRiesgo,
                riesgoAbsoluto: lsEmployee.nameGenero === 'HOMBRE' ? datos.riesgoAbsolutoH : datos.riesgoAbsolutoM,
                riesgoRelativo: datos.riesgoRelativo
            });
        } catch (error) { }
    }

    const handleFuma = (event) => {
        try {
            setFuma(event.target.value);
            var fumaResult = FrFuma(event.target.value);
            setFrFuma(fumaResult);

            /* PUNTAJE */
            var puntajeFR = parseInt(frEdad) + parseInt(frColesterol) + parseInt(frHdl) + parseInt(frGlicemia) + parseInt(frTencion) + parseInt(fumaResult);
            setFrPuntaje(puntajeFR);

            var datos = GetRiesgos(puntajeFR, GetEdad(new Date(lsEmployee.fechaNaci)), lsEmployee.nameGenero);
            setRiesgo({
                dxRiesgo: datos.dxRiesgo,
                riesgoAbsoluto: lsEmployee.nameGenero === 'HOMBRE' ? datos.riesgoAbsolutoH : datos.riesgoAbsolutoM,
                riesgoRelativo: datos.riesgoRelativo
            });
        } catch (error) { }
    }

    const handleUpdateAttention = async (DataToUpdate) => {
        try {
            const result = await UpdateAttentions(DataToUpdate);
            if (result.status === 200) {
                setOpenSuccess(true);
            }

        } catch (error) { }
    }

    const handleUpdateAttentionClose = async (estadoPac = '') => {
        try {
            const DataToUpdate = PutAttention(id, lsAtencion.documento, lsAtencion.fecha, lsAtencion.sede, lsAtencion.tipo, lsAtencion.atencion,
                lsAtencion.estadoCaso, lsAtencion.observaciones, lsAtencion.numeroHistoria, estadoPac, lsAtencion.contingencia,
                lsAtencion.turno, lsAtencion.diaTurno, lsAtencion.motivo, lsAtencion.medico, lsAtencion.docSolicitante, lsAtencion.talla, lsAtencion.peso,
                lsAtencion.iMC, lsAtencion.usuarioCierreAtencion, lsAtencion.fechaDigitacion, lsAtencion.fechaCierreAtencion, lsAtencion.duracion,
                lsAtencion.usuarioRegistro, lsAtencion.fechaRegistro, lsAtencion.usuarioModifico, lsAtencion.fechaModifico);

            const result = await UpdateAttentions(DataToUpdate);
            if (result.status === 200) {
                setOpenSuccess(true);
            }

        } catch (error) { }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
                setFrEdad(EdadFramigan(GetEdad(new Date(lsServerEmployee.data.fechaNaci)), lsServerEmployee.data.nameGenero));
                setFrHdl(FrHdl(GetEdad(new Date(lsServerEmployee.data.fechaNaci)), lsServerEmployee.data.nameGenero));
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerAtencion = await GetByIdAttention(id);
                if (lsServerAtencion.status === 200) {
                    const DataToUpdate = PutAttention(id, lsServerAtencion.data.documento, lsServerAtencion.data.fecha, lsServerAtencion.data.sede,
                        lsServerAtencion.data.tipo, lsServerAtencion.data.atencion, lsServerAtencion.data.estadoCaso, lsServerAtencion.data.observaciones,
                        lsServerAtencion.data.numeroHistoria, "ESTÁ SIENDO ATENDIDO", lsServerAtencion.data.contingencia, lsServerAtencion.data.turno,
                        lsServerAtencion.data.diaTurno, lsServerAtencion.data.motivo, lsServerAtencion.data.medico, lsServerAtencion.data.docSolicitante,
                        lsServerAtencion.data.talla, lsServerAtencion.data.peso, lsServerAtencion.data.iMC, lsServerAtencion.data.usuarioCierreAtencion,
                        lsServerAtencion.data.fechaDigitacion, lsServerAtencion.data.fechaCierreAtencion, lsServerAtencion.data.duracion,
                        lsServerAtencion.data.usuarioRegistro, lsServerAtencion.data.fechaRegistro, lsServerAtencion.data.usuarioModifico,
                        lsServerAtencion.data.fechaModifico);

                    await handleUpdateAttention(DataToUpdate);

                    setIMC(lsServerAtencion.data.imc);
                    setTalla(lsServerAtencion.data.talla);
                    setPeso(lsServerAtencion.data.peso);
                    setLsAtencion(lsServerAtencion.data);
                    setDocumento(lsServerAtencion.data.documento);
                    handleLoadingDocument(lsServerAtencion.data.documento);
                    setAtencion(lsServerAtencion.data.atencion);

                    var resultImc = calculateImc(lsServerAtencion.data.peso, lsServerAtencion.data.talla);
                    setIMC(resultImc.imc);
                    setClasificacion(resultImc.clasificacion);
                    setClasificacionColor(resultImc.clasificacionColor);
                }

                const lsServerUltimoRegistro = await GetLastRecordOccupationalExamination(lsServerAtencion.data.documento);
                if (lsServerUltimoRegistro.status === 200)
                    setLastRecord(lsServerUltimoRegistro.data);

                const lsAnthropometry = await GetAllOccupationalExamination(0, 0);
                if (lsAnthropometry.status === 200) {
                    var resultPeso = lsAnthropometry.data.entities.map((item) => (
                        item.pesoEF
                    ));

                    var resultImc = lsAnthropometry.data.entities.map((item) => (
                        item.imcef
                    ));

                    var resultAnio = lsAnthropometry.data.entities.map((item) => (
                        new Date(item.fecha).getFullYear()
                    ));

                    const chartData = {
                        height: 250,
                        series: [
                            {
                                name: 'PESO',
                                data: resultPeso
                            },
                            {
                                name: 'IMC',
                                data: resultImc
                            }
                        ],
                        options: {
                            chart: {
                                height: 350,
                                type: 'area'
                            },
                            dataLabels: {
                                enabled: true
                            },
                            stroke: {
                                curve: 'smooth'
                            },
                            xaxis: {
                                categories: resultAnio
                            },
                            tooltip: {
                                x: {
                                    format: 'dd/MM/yy HH:mm'
                                },
                            },
                        },
                    };
                    setLsAnthropometry(chartData);
                }

                const lsServerAtencionEMO = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AtencionEMO);
                var resultAtencionEMO = lsServerAtencionEMO.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsAtencionEMO(resultAtencionEMO);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            setDisabledButton({ ...disabledButton, buttonSave: true });

            const DataToInset = PostOccupationalExamination(
                101010, documento, FormatDate(datos.fecha), atencion,

                datos.congenitosAP, datos.inmunoPrevenibleAP, datos.infecciososAP, datos.ojoAP, datos.agudezaVisualAP, datos.oidosAP, datos.nasoFaringeAP,
                datos.cardiovascularAP, datos.pulmonarAP, datos.gastrointestinalAP, datos.gimitoUrinarioAP, datos.neurologicoAP, datos.transtornoPielAP,
                datos.osteoMuscularAP, datos.alergicosAP, datos.toxicoAP, datos.faRmacologicosAP, datos.quirurgicosAP, datos.traumaticosAP, datos.tranfuccionesAP,
                datos.etsAP, datos.deformidadesAP, datos.psiquiatricosAP, datos.farmacoDependenciaAP, datos.emAP, datos.renalAP, datos.asmaAP, datos.orlAP,
                datos.cancerAP, datos.especifiqueAP,

                datos.anioAT, datos.especifiqueAT, datos.anio1AT, datos.especifique1AT,

                estadoVacuna.tetanoIM, estadoVacuna.influenzaIM, estadoVacuna.fiebreAmarillaIM, estadoVacuna.rubeolaSarampionIM, estadoVacuna.covid19IM,
                estadoVacuna.otrasIM, datos.anioVacuna1IM, datos.anioVacuna2IM, datos.anioVacuna3IM, datos.anioVacuna4IM, datos.anioVacuna5IM,
                datos.idRefuerzoIM, datos.anioVacuna6IM,

                datos.fumaHB, datos.cigarrillosDiasFumaHB, datos.aniosCigaFumaHB, datos.mesesCigaFumaHB, datos.observacionFumaHB, datos.fumabaHB,
                datos.cigarrillosDiasFumabaHB, datos.aniosCigaFumabaHB, datos.mesesCigaFumabaHB, datos.observacionFumabaHB, datos.practicaDeporteHB,
                datos.idFrecuenciaDeporteHB, datos.idCualDeporteHB, datos.observacionPracticaDeporHB, datos.hobbiesPasatiempoHB, datos.cualHobbiesHB,
                datos.consumeBebidasAlcoholicasHB, datos.idFrecuenciaBebidaAlHB, datos.cualBebidasAlHB, datos.fobiasHB, JSON.stringify(arrays.tipoFobia),
                datos.cualFobiaHB,

                datos.menarquiaGO, datos.idCiclosGO, datos.duracionGO, datos.amenoreaGO, datos.disminureaGO, datos.leucoreaGO, datos.vidaMaritalGO,
                datos.vidaObstetricaGO, datos.gGO, datos.pGO, datos.aGO, datos.cSGO, datos.vGO, FormatDate(datos.fUPGO), FormatDate(datos.fURGO), datos.eTSGO, datos.cUALGO,
                datos.quisteOvariosBiomasGO, datos.endometriosisGO, datos.ePIGO, datos.planificaGO, datos.idMetodoGO, datos.ultimoAnioCitologiaGO, datos.idResultadoGO,

                datos.cabezaRS, datos.ojosRS, datos.oidosRS, datos.narizRS, datos.bocaRS, datos.gargantaRS, datos.cuellosRS, datos.cardioRS, datos.gastrointestinalRS,
                datos.genitoUrinarioRS, datos.osteoRS, datos.neuroRS, datos.pielRS, datos.psiquiatricoRS, datos.observacionRS,

                datos.tASentadoEF, datos.tAAcostadoEF, datos.pulsoEF, datos.fCEF, datos.fREF, datos.temperaturaEF, peso, talla, imc,
                clasificacion, datos.idBiotipoEF, datos.estadoNitricionalEF, datos.pielFaneraEF, datos.craneoEF, datos.parpadoEF, datos.conjuntivasEF,
                datos.corniasEF, datos.pupilasEF, datos.reflejoFotomotorEF, datos.reflejoCornialEF, datos.fondoOjosEF, datos.inspeccionEF, datos.otoscopiaEF,
                datos.inspeccionNarizEF, datos.rinoscopioEF, datos.labiosEF, datos.mucosaEF, datos.enciasEF, datos.paladarEF, datos.dientesEF, datos.lenguaEF,
                datos.faringeEF, datos.amigdalasEF, datos.cuellosEF, datos.inspeccionToraxEF, datos.auscultacionCardiacaEF, datos.auscultacionRespiratoriaEF,
                datos.inspeccionAbdomenEF, datos.palpacionAbdomenEF, datos.exploracionHigadoEF, datos.exploracionVasoEF, datos.exploracionRinionesEF,
                datos.anillosInguinalesEF, datos.anilloUmbilicalEF, datos.genitalesExternosEF, datos.regionAnalEF, datos.tactoRectalEF, datos.tactoVaginalEF,
                datos.extremidadesSuperioresEF, datos.extremidadesInferioresEF, datos.pulsosEF, datos.columnaVertebralEF, datos.articulacionesEF,

                datos.especifiqueEMEFU, datos.movilidadEFU, datos.equilibrioEFU, datos.marchaEFU, datos.movilidadHombroEFU, datos.movilidadCodoEFU,
                datos.movilidadMuniecaEFU, datos.signoTinelEFU, datos.signoPhalenEFU, datos.movilidadManosEFU, datos.movilidadCaderaEFU, datos.movilidadRodillaEFU,
                datos.movilidadTobilloEFU, datos.movilidadCuelloEFU, datos.rOTVisipitalEFU, datos.rOTRotuleanoEFU, datos.extencionEFU, datos.sensibilidadCaraAnteriorEFU,
                datos.eversionPiesEFU, datos.sensibilidadCaraLateralEFU, datos.rOTAquileanoEFU, datos.signoLasegueEFU, datos.indiceWellsEFU, datos.observacionEFU,

                FormatDate(datos.fechaRxToraxEPA), datos.resultadoRxToraxEPA, datos.observacionesRxToraxEPA, FormatDate(datos.fechaEspirometriaEPA),
                datos.resultadoEspirometriaEPA, datos.observacionesEspirometriaEPA, FormatDate(datos.fechaAudiometriaEPA), datos.resultadoAudiometriaEPA,
                datos.observacionesAudiometriaEPA, FormatDate(datos.fechaVisiometriaEPA), datos.resultadoVisiometriaEPA, datos.observacionesVisiometriaEPA,
                FormatDate(datos.fechaLaboratorioClinicoEPA), datos.resultadoLaboratorioClinicoEPA, datos.observacionesLaboratorioClinicoEPA,
                FormatDate(datos.fechaCuestionarioSintomaEPA), datos.resultadoCuestionarioSintomaEPA, datos.observacionesCuestionarioSintomaEPA,
                FormatDate(datos.fechaEkgEPA), datos.resultadoEkgEPA, datos.observacionesEkgEPA, FormatDate(datos.fechaRnmLumbosacraEPA),
                datos.resultadoRnmLumbosacraEPA, datos.observacionesRnmLumbosacraEPA, FormatDate(datos.fechaRnmCervicalEPA), datos.resultadoRnmCervicalEPA,
                datos.observacionesRnmCervicalEPA, datos.observacionEPA,

                JSON.stringify(arrays.dx), datos.observacionID, datos.recomendacionesID, datos.idConceptoActitudID,

                FormatDate(datos.fechaConceptoNETA), datos.conceptoAplazadoNETA, datos.conceptoActitudNETA, datos.motivoAplazoNETA, datos.descripcionResultadoNETA,
                datos.recomendacionesNETA, datos.remitidoNETA, datos.remididoDondeNETA,

                datos.idRiesgoCardiovascularNEMTA, datos.idClasificacionNEMTA, datos.idMenorEdadNEMTA, datos.idMujerEmbarazadaNEMTA, datos.idArimiaNEMTA,
                datos.idEnfermedadNEMTA, datos.idHistoriaNEMTA, datos.idHipertensionNEMTA, datos.idHipertrigliceridemiaNEMTA, datos.idCifrasNEMTA,
                datos.idDiabetesNEMTA, datos.idDislipidemiaNEMTA, datos.idDiagnosticoNEMTA, datos.idRiesgoCardiovascular1NEMTA, datos.idRiesgoCardiovascular2NEMTA,
                datos.idHipertiroidismoNEMTA, datos.idAlteracionAuditivaNEMTA, datos.idVertigoAlteracionesNEMTA, datos.idEpilegsiaNEMTA, datos.idCegueraTemporalNEMTA,
                datos.idHistoriaFobiasNEMTA, datos.idTranstornoPsiquiatricoNEMTA, datos.idLimitacionesNEMTA, datos.idObesidadMorbidaNEMTA, datos.idDeformaTemporalNEMTA,
                datos.idOtrasAlteracionesNEMTA, datos.observacionesNEMTA, DefaultValue.SINREGISTRO_GLOBAL,

                FormatDate(datos.fechaFRA), datos.tencionFRA, datos.idTencionArterialFRA, JSON.stringify(arrays.antecedentesCardio), datos.idDeporteFRA, datos.idBebidaFRA,
                FormatDate(datos.fechaLaboratorioFRA), datos.colesterolTotalFRA, datos.hDLFRA, datos.triglicericosFRA, JSON.stringify(arrays.metabolico), datos.glisemiaFRA,
                datos.fumaFRA, datos.observacionFRA, datos.lDLFRA, datos.relacionFRA, datos.fRLEdadFRA, datos.fRLColesterolFRA, datos.fRHDLFRA, datos.fRGlisemiaFRA,
                datos.fRTencionFRA, datos.fRTabaquismoFRA, datos.puntajeFRA, datos.riesgoAbsolutoFRA, datos.riesgoRelativoFRA, datos.interpretacionFRA,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()),

                datos.tosAUsualSin, datos.tosEnLaSemanaSintR, datos.tosMananaSintR, datos.tosConsecutivaSintR, datos.anosConTosSintR, datos.esputoASintR,
                datos.esputoBSintR, datos.esputoCSintR, datos.esputoDSintR, datos.esputoESintR, datos.episoTosEspuASintR, datos.episoTosEsputoBSintR,
                datos.sibilanciasASintR, datos.sibilanciasA1SintR, datos.sibilanciasA2SintR, datos.sibilanciasA3SintR, datos.sibilanciasBSintR,
                datos.ataquesSilbiASintR, datos.ataquesSilbiBSintR, datos.ataquesSilbiCSintR, datos.ataquesSilbiDSintR, datos.otrasEnfInhaASintR,
                datos.otrasEnfInhaBSintR, datos.otrasEnfInhaDescriSintR, datos.disneaASintR, datos.disneaBSintR, datos.disneaCSintR, datos.disneaDSintR,
                datos.disneaESintR, datos.enferToraxASintR, datos.enferToraxBSintR, datos.enferToraxCSintR, datos.enferToraxD, datos.antecedentesASintR,
                datos.antecedentesB1SintR, datos.antecedentesB1ASintR, datos.antecedentesB2Sintr, datos.antecedentesB2ASintR,
                datos.antecedentesB3SintR, datos.antecedentesB3ASintR, datos.antecedentesB3BSintR, datos.antecedentesB3CSintR, datos.antecdentesB4SintR,
                datos.antecedenteB4ASintR, datos.antecedentesB4BSintR, datos.antecedentesB4CSintR, datos.antecedentesB5SintR, datos.antecedentesB5ASintR,
                datos.antecedentesB5BSintR, datos.antecedentesB5CSintR, datos.otrasEnfToraxA, datos.otrasEnfToraxB,
                datos.ciruToraxASintR, datos.ciruToraxBSintR, datos.traumaToraxASintR, datos.traumaToraxBSintR, datos.problemCoraASintR, datos.problemCoraBSintR,
                datos.problemaCoraCSintR, datos.presionAltaASintR, datos.presionAltaBSintR, datos.historiaOcupASintR, datos.historiaOcupBSintR,
                datos.historiaOcupB1SintR, datos.historiaOcupB2SintR, datos.historiaOcupB3SintR, datos.historiaOcupCSintR, datos.historiaOcupC1SintR,
                datos.historiaOcupC2SintR, datos.historiaOcupC3SintR, datos.historiaOcupD1SintR, datos.historiaOcupD2SintR, datos.historiaOcupD3,
                datos.tabaquismoASintR, datos.tabaquismoBSintR, datos.tabaquismoCSintR, datos.tabaquismoDSintR, datos.tabaquismoESintR, datos.actDeportASintR,
                datos.actDeporA1SintR, datos.actDeporA2SintR, datos.actDeporA3SintR, datos.actDeporA4SintR, datos.recoSintR,

                datos.parentesco1ANFA, datos.parentesco1ObserANFA, datos.parentesco2ANFA, datos.parentesco2ObserANFA, datos.parentesco3ANFA,
                datos.parentesco3ObserANFA, datos.parentesco4ANFA, datos.parentesco4ObserANFA,
            );

            console.log("Datos = ", DataToInset);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertOccupationalExamination(DataToInset);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    await handleUpdateAttention("ATENDIDO");
                    setDisabledButton(false);
                    setTimeout(() => {
                        setDisabledButton({ ...disabledButton, buttonSave: false, buttonReport: true });
                    }, 1500);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    setTimeout(() => {
        if (lsAtencion.length != 0) {
            setTimeWait(true);
        }
    }, 1500);

    return (
        <MainCard>
            {timeWait ?
                <Fragment>
                    <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                    <ControlModal
                        title={"Ordenes Medicas - " + titleModal}
                        open={openForm}
                        onClose={() => {
                            setOpenForm(false);
                            setListMedicalFormula(true);
                            setNewMedicalFormula(false);
                            setUpdateMedicalFormula(false);
                            setNewMedicalFormula(false)
                        }}
                        maxWidth="md"
                    >
                        {newMedicalFormula ?
                            <MedicalFormula
                                setUpdateMedicalFormula={setUpdateMedicalFormula}
                                setListMedicalFormula={setListMedicalFormula}
                                setNewMedicalFormula={setNewMedicalFormula}
                                tipoOrden={titleModal}
                                lsEmployee={lsEmployee}
                                setDocumento={setDocumento}
                                documento={documento}
                                lsAtencion={lsAtencion}
                            />
                            : listMedicalFormula ?
                                <ListMedicalFormula
                                    setListMedicalFormula={setListMedicalFormula}
                                    setNewMedicalFormula={setNewMedicalFormula}
                                    setUpdateMedicalFormula={setUpdateMedicalFormula}
                                    setNumberId={setNumberId}
                                />
                                : updateMedicalFormula ?
                                    <UpdateMedicalFormula
                                        setListMedicalFormula={setListMedicalFormula}
                                        setNewMedicalFormula={setNewMedicalFormula}
                                        setUpdateMedicalFormula={setUpdateMedicalFormula}
                                        numberId={numberId}
                                        lsEmployee={lsEmployee}
                                        lsAtencion={lsAtencion}
                                        tipoOrden={titleModal}
                                    /> : ''
                        }
                    </ControlModal>

                    <ControlModal
                        title={"VISTA DE REPORTE"}
                        open={openReport}
                        onClose={() => setOpenReport(false)}
                        maxWidth="xl"
                    >
                        <ViewReport />
                    </ControlModal>

                    <DialogFormula
                        title="Ordenes Medicas"
                        open={openFormula}
                        handleCloseDialog={() => setOpenFormula(false)}
                    >
                        <Grid item xs={12}>
                            <HoverSocialCard
                                onClick={() => { setOpenForm(true); setTitleModal('Formula') }}
                                secondary="Formula"
                                iconPrimary={AssignmentIcon}
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <HoverSocialCard
                                onClick={() => { setOpenForm(true); setTitleModal('Laboratorio') }}
                                secondary="Laboratorio"
                                iconPrimary={BiotechIcon}
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <HoverSocialCard
                                onClick={() => { setOpenForm(true); setTitleModal('Imagenes') }}
                                secondary="Imagenes"
                                iconPrimary={ImageIcon}
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <HoverSocialCard
                                onClick={() => { setOpenForm(true); setTitleModal('Examenes') }}
                                secondary="Examenes"
                                iconPrimary={FolderOpenIcon}
                                color={ColorDrummondltd.RedDrummond}
                            />
                        </Grid>
                    </DialogFormula>

                    <Transitions type="collapse" in={viewChart} position="top-left" direction="up">
                        <ChartAnthropometry datos={lsAnthropometry} lastRecord={lastRecord} />
                        <Grid sx={{ pb: 2 }} />
                    </Transitions>

                    <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}
                        secondary={
                            <Fragment>
                                {viewChart ?
                                    <Button onClick={() => setViewChart(false)}>
                                        <IconStairsUp stroke={1.5} size="1.3rem" />
                                    </Button>
                                    :
                                    <Button onClick={() => setViewChart(true)}>
                                        <IconStairsDown stroke={1.5} size="1.3rem" />
                                    </Button>
                                }
                            </Fragment>
                        }
                    >
                        <Grid container justifyContent="left" alignItems="center" spacing={2}>
                            <Grid item xs={5}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={4}>
                                        <Avatar sx={{ width: 100, height: 100 }} src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            value={documento}
                                            onChange={(e) => setDocumento(e.target.value)}
                                            onKeyDown={handleLoadingDocument}
                                            fullWidth
                                            disabled={true}
                                            id="standard-basic"
                                            label="Documento"
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {lsEmployee.length != 0 ?
                                <Grid item xs={7}>
                                    <Typography variant="h2" component="div">
                                        {lsEmployee.nombres}
                                    </Typography>
                                    <Grid container spacing={1} direction="row" justifyContent="left" alignItems="center">
                                        <Grid item>
                                            <Typography variant="h5">{lsEmployee.nameGenero}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">{GetEdad(new Date(lsEmployee.fechaNaci))} AÑOS</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid> : <Grid item xs={7}></Grid>
                            }
                        </Grid>

                        <Grid container sx={{ pt: 6 }} spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <SelectOnChange
                                    name="idAtencion"
                                    label="Atención"
                                    value={atencion}
                                    onChange={(e) => setAtencion(e.target.value)}
                                    options={lsAtencionEMO}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                    <Grid sx={{ pb: 2 }} />

                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(event, newValue) => setValue(newValue)}
                        aria-label="simple tabs example"
                        variant="scrollable"
                        sx={{
                            mb: 3,
                            '& a': {
                                minHeight: 'auto',
                                minWidth: 10,
                                py: 1.5,
                                px: 1,
                                mr: 2.25,
                                color: theme.palette.grey[600],
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& a.Mui-selected': {
                                color: theme.palette.primary.main
                            },
                            '& .MuiTabs-indicator': {
                                bottom: 2
                            },
                            '& a > svg': {
                                marginBottom: '0px !important',
                                mr: 1.25
                            }
                        }}
                    >
                        {tabsOption.map((tab, index) => (
                            <Tab disabled={atencion === '' ? true : false} key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <PersonalData lsEmployee={lsEmployee} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <WorkHistory
                            lsEmpleado={lsEmployee}
                            documento={documento}
                            atencion={atencion}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Emo
                            atencion={atencion}
                            peso={peso}
                            setPeso={setPeso}
                            talla={talla}
                            setTalla={setTalla}
                            imc={imc}
                            setIMC={setIMC}
                            clasificacion={clasificacion}
                            setClasificacion={setClasificacion}
                            clasificacionColor={clasificacionColor}
                            setClasificacionColor={setClasificacionColor}

                            documento={documento}
                            errors={errors}
                            setArrays={setArrays}
                            arrays={arrays}
                            setEstadoVacuna={setEstadoVacuna}
                            estadoVacuna={estadoVacuna}
                            lsEmployee={lsEmployee}
                            {...methods}
                        />

                        <Framingham
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

                            errors={errors}
                            documento={documento}
                            {...methods}
                        />
                    </TabPanel>

                    <Grid container spacing={2} sx={{ pt: 5 }}>
                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button disabled={disabledButton.buttonSave} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
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
                                <Button variant="outlined" fullWidth onClick={() => setOpenFormula(true)}>
                                    {TitleButton.OrdenesMedicas}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => {
                                    navigate("/programming/list");
                                    handleUpdateAttentionClose("PENDIENTE POR ATENCIÓN");
                                }}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => {
                                    navigate("/programming/list");
                                    handleUpdateAttentionClose("ATENDIDO");
                                }}>
                                    {TitleButton.CerrarCaso}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </MainCard >
    );
};

export default OccupationalExamination;