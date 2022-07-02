import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InsertOccupationalExamination, GetLastRecordOccupationalExamination } from 'api/clients/OccupationalExaminationClient';
import { Message } from 'components/helpers/Enums';
import { SNACKBAR_OPEN } from 'store/actions';
import { TitleButton } from 'components/helpers/Enums';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import User from 'assets/img/user.png'
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOccupationalExamination } from 'formatdata/OccupationalExaminationForm';
import SubCard from 'ui-component/cards/SubCard';

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

const OccupationalExamination = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [value, setValue] = useState(0);

    const [documento, setDocumento] = useState('');
    const [atencion, setAtencion] = useState('');
    const [lsAtencionEMO, setLsAtencionEMO] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsLastRecord, setLsLastRecord] = useState([]);
    const [arrays, setArrays] = useState({
        tipoFobia: [],
        dx: [],
        antecedentesCardio: [],
        metabolico: [],
    });

    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [imc, setIMC] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [clasificacionColor, setClasificacionColor] = useState('');

    const [estadoVacuna, setEstadoVacuna] = useState({
        tetanoIM: false,
        influenzaIM: false,
        fiebreAmarillaIM: false,
        rubeolaSarampionIM: false,
        covid19IM: false,
        otrasIM: false,
    });

    const handleDocumento = async (event) => {
        try {
            setDocumento(event.target.value);
            const lsServerDataEmployee = await GetByIdEmployee(event.target.value);
            if (lsServerDataEmployee.status === 200)
                setLsEmployee(lsServerDataEmployee.data);

            const lsServerUltimoRegistro = await GetLastRecordOccupationalExamination(event.target.value);
            if (lsServerUltimoRegistro.status === 200)
                setLsLastRecord(lsServerDataEmployee.data);

        } catch (error) {
            setLsEmployee([]);
            console.log(error);
        }
    }

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;
    /* { resolver: yupResolver(validationSchema) } */

    useEffect(() => {
        async function GetAll() {
            try {
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
            const DataToInset = PostOccupationalExamination(
                101010, documento, FormatDate(datos.fecha), atencion,

                datos.congenitosAP, datos.inmunoPrevenibleAP, datos.infecciososAP, datos.ojoAP, datos.agudezaVisualAP, datos.oidosAP, datos.nasoFaringeAP,
                datos.cardiovascularAP, datos.pulmonarAP, datos.gastrointestinalAP, datos.gimitoUrinarioAP, datos.neurologicoAP, datos.transtornoPielAP,
                datos.osteoMuscularAP, datos.alergicosAP, datos.toxicoAP, datos.faRmacologicosAP, datos.quirurgicosAP, datos.traumaticosAP, datos.tranfuccionesAP,
                datos.etsAP, datos.deformidadesAP, datos.psiquiatricosAP, datos.farmacoDependenciaAP, datos.emAP, datos.renalAP, datos.asmaAP, datos.orlAP,
                datos.cancerAP, datos.especifiqueAP,

                datos.anioAT, datos.especifiqueAT, datos.anio1AT, datos.especifique1AT,

                estadoVacuna.tetanoIM, estadoVacuna.influenzaIM, estadoVacuna.fiebreAmarillaIM, estadoVacuna.rubeolaSarampionIM, estadoVacuna.covid19IM,
                estadoVacuna.otrasIM, datos.anioVacuna1IM, datos.anioVacuna2IM, datos.anioVacuna3IM, datos.anioVacuna4IM, datos.anioVacuna5IM, datos.anioVacuna6IM,

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
                datos.idOtrasAlteracionesNEMTA, datos.observacionesNEMTA, datos.conceptoActitudMedicoNEMTA,

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
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Guardar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                    reset();
                    setLsEmployee([]);
                    setArrays({
                        tipoFobia: [],
                        dx: [],
                        antecedentesCardio: [],
                        metabolico: [],
                    });
                    setAtencion('');
                    setDocumento('');
                    setEstadoVacuna({
                        tetanoIM: false,
                        influenzaIM: false,
                        fiebreAmarillaIM: false,
                        rubeolaSarampionIM: false,
                        covid19IM: false,
                        otrasIM: false,
                    });
                    setValue(0);
                }
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Hubo un error al guardar la Historia Ocupacional',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard>
            <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                <Grid container justifyContent="left" alignItems="center" spacing={2}>
                    <Grid item xs={5}>
                        <Grid container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={4}>
                                <Avatar sx={{ width: 100, height: 100 }} src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={documento} onChange={(e) => setDocumento(e.target.value)} onKeyDown={handleDocumento} fullWidth id="standard-basic" label="Documento" variant="standard" />
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
                                    <Typography variant="h5">{GetEdad(new Date(lsEmployee.fechaNaci))}</Typography>
                                </Grid>
                            </Grid>
                        </Grid> : <Grid item xs={7}></Grid>}
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h3">REGISTRAR LA  ATENCIÓN</Typography>}>
                <Grid container spacing={2}>
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
                    <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                ))}
            </Tabs>

            <TabPanel value={value} index={0}>
                <PersonalData lsEmployee={lsEmployee} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <WorkHistory
                    lsEmpleado={lsEmployee}
                    documento={documento}
                    atencion={atencion} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Emo
                    setPeso={setPeso}
                    peso={peso}
                    setTalla={setTalla}
                    talla={talla}
                    setIMC={setIMC}
                    imc={imc}
                    setClasificacion={setClasificacion}
                    clasificacion={clasificacion}
                    setClasificacionColor={setClasificacionColor}
                    clasificacionColor={clasificacionColor}
                    lsLastRecord={lsLastRecord}
                    documento={documento}
                    errors={errors}
                    setArrays={setArrays}
                    arrays={arrays}
                    setEstadoVacuna={setEstadoVacuna}
                    estadoVacuna={estadoVacuna}
                    lsEmployee={lsEmployee}
                    {...methods}
                />
            </TabPanel>

            <Grid container spacing={1} sx={{ pt: 5 }}>
                <Grid item xs={6}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                            {TitleButton.Guardar}
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={6}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => navigate("/occupational-examination/list")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default OccupationalExamination;