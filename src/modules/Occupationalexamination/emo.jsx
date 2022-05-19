// Import de Material-ui
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, useMediaQuery,
    Grid, Typography, Tooltip, Fab, Divider
} from '@mui/material';

import Accordion from 'components/accordion/Accordion';
import { FormProvider, useForm } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputCheck from 'components/input/InputCheck';
import InputDatePick from 'components/input/InputDatePick';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { IconEdit } from '@tabler/icons';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { gridSpacing } from 'store/constant';
import { CodCatalogo } from 'components/helpers/Enums';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';

import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputOnChange from 'components/input/InputOnChange';

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'

const Emo = () => {
    const theme = useTheme();
    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);

    const [valueFechaNaci, setFechaNaci] = useState(null);

    const [supplierArray, setSupplierArray] = useState([]);

    /* ANTECEDENTES PATALÓGICOS */
    const [congenitosAP, setCongenitosAP] = useState(false);
    const [inmunoPrevenibleAP, setInmunoPrevenibleAP] = useState(false);
    const [infecciososAP, setInfecciososAP] = useState(false);
    const [ojoAP, setOjoAP] = useState(false);
    const [agudezaVisualAP, setAgudezaVisualAP] = useState(false);
    const [oidosAP, setOidosAP] = useState(false);
    const [nasoFaringeAP, setNasoFaringeAP] = useState(false);
    const [cardiovascularAP, setCardiovascularAP] = useState(false);
    const [pulmonarAP, setPulmonarAP] = useState(false);
    const [gastrointestinalAP, setGastrointestinalAP] = useState(false);
    const [gimitoUrinarioAP, setGimitoUrinarioAP] = useState(false);
    const [neurologicoAP, setNeurologicoAP] = useState(false);
    const [transtornoPielAP, setTranstornoPielAP] = useState(false);
    const [osteoMuscularAP, setOsteoMuscularAP] = useState(false);
    const [alergicosAP, setAlergicosAP] = useState(false);
    const [toxicoAP, setToxicoAP] = useState(false);
    const [faRmacologicosAP, setFaRmacologicosAP] = useState(false);
    const [quirurgicosAP, setQuirurgicosAP] = useState(false);
    const [traumaticosAP, setTraumaticosAP] = useState(false);
    const [tranfuccionesAP, setTranfuccionesAP] = useState(false);
    const [etsAP, setEtsAP] = useState(false);
    const [deformidadesAP, setDeformidadesAP] = useState(false);
    const [ciquiatricosAP, setCiquiatricosAP] = useState(false);
    const [farmacoDependenciaAP, setFarmacoDependenciaAP] = useState(false);
    const [emAP, setEmAP] = useState(false);
    const [renalAP, setRenalAP] = useState(false);
    const [asmaAP, setAsmaAP] = useState(false);
    const [orlAP, setOrlAP] = useState(false);
    const [cancerAP, setCancerAP] = useState(false);

    /* ACCIDENTES DE TRABAJO / ENFERMEDAD LABORAL */
    const [especifiqueAT, setEspecifiqueAT] = useState('');
    const [especifique1AT, setEspecifique1AT] = useState('');

    /* INMUNIZACIONES */
    const [vacunasIM, setVacunasIM] = useState([]);

    /* HÁBITOS */
    const [fumaHB, setFumaHB] = useState(false);
    const [fumabaHB, setFumabaHB] = useState(false);
    const [practicaDeporteHB, setPracticaDeporteHB] = useState(false);
    const [hobbiesPasatiempoHB, setHobbiesPasatiempoHB] = useState(false);
    const [consumeBebidasAlcoholicasHB, setConsumeBebidasAlcoholicasHB] = useState(false);
    const [fobiasHB, setFobiasHB] = useState(false);
    const [tipoFobiaHB, setTipoFobiaHB] = useState([]);
    const [heredoFamiliarHB, setHeredoFamiliarHB] = useState(false);
    const [parentescoHB, setParentescoHB] = useState([]);

    /* GINECO OBSTÉTRICOS */
    const [amenoreaGO, setAmenoreaGO] = useState(false);
    const [disminureaGO, setDisminureaGO] = useState(false);
    const [leucoreaGO, setLeucoreaGO] = useState(false);
    const [fUPGO, setFUPGO] = useState(new Date());
    const [fURGO, setFURGO] = useState(new Date());
    const [eTSGO, setETSGO] = useState(false);
    const [quisteOvariosBiomasGO, setQuisteOvariosBiomasGO] = useState(false);
    const [endometriosisGO, setEndometriosisGO] = useState(false);
    const [ePIGO, setEPIGO] = useState(false);
    const [planificaGO, setPlanificaGO] = useState(false);

    /* REVISIÓN POR SISTEMAS */
    const [cabezaRS, setCabezaRS] = useState(false);
    const [ojosRS, setOjosRS] = useState(false);
    const [oidosRS, setOidosRS] = useState(false);
    const [narizRS, setNarizRS] = useState(false);
    const [bocaRS, setBocaRS] = useState(false);
    const [gargantaRS, setGargantaRS] = useState(false);
    const [cuellosRS, setCuellosRS] = useState(false);
    const [cardioRS, setCardioRS] = useState(false);
    const [gastrointestinalRS, setGastrointestinalRS] = useState(false);
    const [genitoUrinarioRS, setGenitoUrinarioRS] = useState(false);
    const [osteoRS, setOsteoRS] = useState(false);
    const [neuroRS, setNeuroRS] = useState(false);
    const [pielRS, setPielRS] = useState(false);
    const [psiquiatricoRS, setPsiquiatricoRS] = useState(false);
    const [observacionRS, setObservacionRS] = useState('');

    /* EXAMEN FÍSICO */
    const [estadoNitricionalEF, setEstadoNitricionalEF] = useState(false);
    const [pielFaneraEF, setPielFaneraEF] = useState(false);
    const [craneoEF, setCraneoEF] = useState(false);
    const [parpadoEF, setParpadoEF] = useState(false);
    const [conjuntivasEF, setConjuntivasEF] = useState(false);
    const [corniasEF, setCorniasEF] = useState(false);
    const [pupilasEF, setPupilasEF] = useState(false);
    const [reflejoFotomotorEF, setReflejoFotomotorEF] = useState(false);
    const [reflejoCornialEF, setReflejoCornialEF] = useState(false);
    const [fondoOjosEF, setFondoOjosEF] = useState(false);
    const [inspeccionEF, setInspeccionEF] = useState(false);
    const [otoscopiaEF, setOtoscopiaEF] = useState(false);
    const [inspeccionNarizEF, setInspeccionNarizEF] = useState(false);
    const [rinoscopioEF, setRinoscopioEF] = useState(false);
    const [labiosEF, setLabiosEF] = useState(false);
    const [mucosaEF, setMucosaEF] = useState(false);
    const [enciasEF, setEnciasEF] = useState(false);
    const [paladarEF, setPaladarEF] = useState(false);
    const [dientesEF, setDientesEF] = useState(false);
    const [lenguaEF, setLenguaEF] = useState(false);
    const [faringeEF, setFaringeEF] = useState(false);
    const [amigdalasEF, setAmigdalasEF] = useState(false);
    const [cuellosEF, setCuellosEF] = useState(false);
    const [inspeccionToraxEF, setInspeccionToraxEF] = useState(false);
    const [auscultacionCardiacaEF, setAuscultacionCardiacaEF] = useState(false);
    const [auscultacionRespiratoriaEF, setAuscultacionRespiratoriaEF] = useState(false);
    const [inspeccionAbdomenEF, setInspeccionAbdomenEF] = useState(false);
    const [palpacionAbdomenEF, setPalpacionAbdomenEF] = useState(false);
    const [exploracionHigadoEF, setExploracionHigadoEF] = useState(false);
    const [exploracionVasoEF, setExploracionVasoEF] = useState(false);
    const [exploracionRinionesEF, setExploracionRinionesEF] = useState(false);
    const [anillosInguinalesEF, setAnillosInguinalesEF] = useState(false);
    const [anilloUmbilicalEF, setAnilloUmbilicalEF] = useState(false);
    const [genitalesExternosEF, setGenitalesExternosEF] = useState(false);
    const [regionAnalEF, setRegionAnalEF] = useState(false);
    const [tactoRectalEF, setTactoRectalEF] = useState(false);
    const [tactoVaginalEF, setTactoVaginalEF] = useState(false);
    const [extremidadesSuperioresEF, setExtremidadesSuperioresEF] = useState(false);
    const [extremidadesInferioresEF, setExtremidadesInferioresEF] = useState(false);
    const [pulsosEF, setPulsosEF] = useState(false);
    const [columnaVertebralEF, setColumnaVertebralEF] = useState(false);
    const [articulacionesEF, setArticulacionesEF] = useState(false);
    const [especifiqueEMEFU, setEspecifiqueEMEFU] = useState('');

    /* EXPLORACIÓN FUNCIONAL */
    const [movilidadEFU, setMovilidadEFU] = useState(false);
    const [equilibrioEFU, setEquilibrioEFU] = useState(false);
    const [marchaEFU, setMarchaEFU] = useState(false);
    const [movilidadHombroEFU, setMovilidadHombroEFU] = useState(false);
    const [movilidadCodoEFU, setMovilidadCodoEFU] = useState(false);
    const [movilidadMuniecaEFU, setMovilidadMuniecaEFU] = useState(false);
    const [signoTinelEFU, setSignoTinelEFU] = useState(false);
    const [signoPhalenEFU, setSignoPhalenEFU] = useState(false);
    const [movilidadManosEFU, setMovilidadManosEFU] = useState(false);
    const [movilidadCaderaEFU, setMovilidadCaderaEFU] = useState(false);
    const [movilidadRodillaEFU, setMovilidadRodillaEFU] = useState(false);
    const [movilidadTobilloEFU, setMovilidadTobilloEFU] = useState(false);
    const [movilidadCuelloEFU, setMovilidadCuelloEFU] = useState(false);
    const [rOTVisipitalEFU, setROTVisipitalEFU] = useState(false);
    const [rOTRotuleanoEFU, setROTRotuleanoEFU] = useState(false);
    const [extencionEFU, setExtencionEFU] = useState(false);
    const [sensibilidadCaraAnteriorEFU, setSensibilidadCaraAnteriorEFU] = useState(false);
    const [eversionPiesEFU, setEversionPiesEFU] = useState(false);
    const [sensibilidadCaraLateralEFU, setSensibilidadCaraLateralEFU] = useState(false);
    const [rOTAquileanoEFU, setROTAquileanoEFU] = useState(false);
    const [signoLasegueEFU, setSignoLasegueEFU] = useState(false);
    const [indiceWellsEFU, setIndiceWellsEFU] = useState(false);
    const [observacionEFU, setObservacionEFU] = useState('');

    /* EXÁMENES PARACLÍNICOS */
    const [fechaRxToraxEPA, setFechaRxToraxEPA] = useState(new Date());
    const [observacionesRxToraxEPA, setObservacionesRxToraxEPA] = useState('');
    const [fechaEspirometriaEPA, setFechaEspirometriaEPA] = useState(new Date());
    const [observacionesEspirometriaEPA, setObservacionesEspirometriaEPA] = useState('');
    const [fechaAudiometriaEPA, setFechaAudiometriaEPA] = useState(new Date());
    const [observacionesAudiometriaEPA, setObservacionesAudiometriaEPA] = useState('');
    const [fechaVisiometriaEPA, setFechaVisiometriaEPA] = useState(new Date());
    const [observacionesVisiometriaEPA, setObservacionesVisiometriaEPA] = useState('');
    const [fechaLaboratorioClinicoEPA, setFechaLaboratorioClinicoEPA] = useState(new Date());
    const [observacionesLaboratorioClinicoEPA, setObservacionesLaboratorioClinicoEPA] = useState('');
    const [fechaCuestionarioSintomaEPA, setFechaCuestionarioSintomaEPA] = useState(new Date());
    const [observacionesCuestionarioSintomaEPA, setObservacionesCuestionarioSintomaEPA] = useState('');
    const [fechaEkgEPA, setFechaEkgEPA] = useState(new Date());
    const [observacionesEkgEPA, setObservacionesEkgEPA] = useState('');
    const [fechaRnmLumbosacraEPA, setFechaRnmLumbosacraEPA] = useState(new Date());
    const [observacionesRnmLumbosacraEPA, setObservacionesRnmLumbosacraEPA] = useState('');
    const [fechaRnmCervicalEPA, setFechaRnmCervicalEPA] = useState(new Date());
    const [observacionesRnmCervicalEPA, setObservacionesRnmCervicalEPA] = useState('');
    const [observacionEPA, setObservacionEPA] = useState('');

    /* IMPRESIÓN DIAGNÓSTICA Y CONCEPTO FINAL */
    const [dxID, setDxID] = useState([]);
    const [observacionID, setObservacionID] = useState('');
    const [recomendacionesID, setRecomendacionesID] = useState('');

    const [lsSupplier, setSupplier] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const methods = useForm();

    const { handleSubmit, errors, reset } = methods;

    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }
        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
            setNote(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    async function GetAll() {
        try {
            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Proveedor);
            var resultSupplier = lsServerSupplier.data.entities.map((item) => ({
                nombre: item.nombre
            }));
            setSupplier(resultSupplier);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    /* { resolver: yupResolver(validationSchema) } */

    const [congenitos, setCongenitos] = useState(false);


    useEffect(() => {
        handleListen();
    }, [isListening])

    return (
        <Fragment>
            <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES PATALÓGICOS</Typography>}>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="1. Congenitos"
                            size={30}
                            checked={congenitosAP}
                            onChange={(event) => setCongenitosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="2. Inmunoprevenible"
                            size={30}
                            checked={inmunoPrevenibleAP}
                            onChange={(event) => setInmunoPrevenibleAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="3. Infecciosos"
                            size={30}
                            checked={infecciososAP}
                            onChange={(event) => setInfecciososAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="4. Ojos"
                            size={30}
                            checked={ojoAP}
                            onChange={(event) => setOjoAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="5. Agudeza Visual"
                            size={30}
                            checked={agudezaVisualAP}
                            onChange={(event) => setAgudezaVisualAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="6. Oidos"
                            size={30}
                            checked={oidosAP}
                            onChange={(event) => setOidosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="7. Nasofaringe"
                            size={30}
                            checked={nasoFaringeAP}
                            onChange={(event) => setNasoFaringeAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="8. Cardiovascular"
                            size={30}
                            checked={cardiovascularAP}
                            onChange={(event) => setCardiovascularAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="9. Pulmonar"
                            size={30}
                            checked={pulmonarAP}
                            onChange={(event) => setPulmonarAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="10. Gastrointestinal"
                            size={30}
                            checked={gastrointestinalAP}
                            onChange={(event) => setGastrointestinalAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="11. Genitourinario"
                            size={30}
                            checked={gimitoUrinarioAP}
                            onChange={(event) => setGimitoUrinarioAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="12. Neurológico"
                            size={30}
                            checked={neurologicoAP}
                            onChange={(event) => setNeurologicoAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="13. Trastornos de piel"
                            size={30}
                            checked={transtornoPielAP}
                            onChange={(event) => setTranstornoPielAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="14. Osteomusculares"
                            size={30}
                            checked={osteoMuscularAP}
                            onChange={(event) => setOsteoMuscularAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="15. Alérgicos"
                            size={30}
                            checked={alergicosAP}
                            onChange={(event) => setAlergicosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="16. Tóxicos"
                            size={30}
                            checked={toxicoAP}
                            onChange={(event) => setToxicoAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="17. Farmacólogicos"
                            size={30}
                            checked={faRmacologicosAP}
                            onChange={(event) => setFaRmacologicosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="18. Quirúrgicos"
                            size={30}
                            checked={quirurgicosAP}
                            onChange={(event) => setQuirurgicosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="19. Traumático"
                            size={30}
                            checked={traumaticosAP}
                            onChange={(event) => setTraumaticosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="20. Transfusiones"
                            size={30}
                            checked={tranfuccionesAP}
                            onChange={(event) => setTranfuccionesAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="21. ETS"
                            size={30}
                            checked={etsAP}
                            onChange={(event) => setEtsAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="22. Deformidades"
                            size={30}
                            checked={deformidadesAP}
                            onChange={(event) => setDeformidadesAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="23. Psiquiatrico"
                            size={30}
                            checked={ciquiatricosAP}
                            onChange={(event) => setCiquiatricosAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="24. Farmacodependencia"
                            size={30}
                            checked={farmacoDependenciaAP}
                            onChange={(event) => setFarmacoDependenciaAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="25. E.M."
                            size={30}
                            checked={emAP}
                            onChange={(event) => setEmAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="26. Renal"
                            size={30}
                            checked={renalAP}
                            onChange={(event) => setRenalAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="27. Asma"
                            size={30}
                            checked={asmaAP}
                            onChange={(event) => setAsmaAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="28. O.R.L."
                            size={30}
                            checked={orlAP}
                            onChange={(event) => setOrlAP(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <InputCheck
                            label="29. Cancer"
                            size={30}
                            checked={cancerAP}
                            onChange={(event) => setCancerAP(event.target.checked)}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pt: 2 }}>
                    <InputOnChange
                        multiline
                        rows={4}
                        label="Especifique"
                        placeholder="Esperando dictado..."
                        name="inputArea"
                        size={matchesXS ? 'small' : 'medium'}
                        value={note}
                        onChange={(e) => setNote(e?.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Plantilla de texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <ListAltSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Audio">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <SettingsVoiceIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Ver Historico">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <AddBoxIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">ACCIDENTES DE TRABAJO / ENFERMEDAD LABORAL</Typography>}>
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={3} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioAT"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <InputOnChange
                            rows={4}
                            label="Especifique"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={especifiqueAT}
                            onChange={(e) => setEspecifiqueAT(e?.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Plantilla de texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <ListAltSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Audio">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <SettingsVoiceIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Ver Historico">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <AddBoxIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={3} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anio1AT"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <InputOnChange
                            rows={4}
                            label="Especifique"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={especifique1AT}
                            onChange={(e) => setEspecifique1AT(e?.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Plantilla de texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <ListAltSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Audio">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <SettingsVoiceIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Ver Historico">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <AddBoxIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">INMUNIZACIONES</Typography>}>
                <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >
                    <Grid item xs={12} >
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setVacunasIM(value)}
                            value={vacunasIM}
                            label="Vacuna"
                            options={lsSupplier}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna1IM"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna2IM"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna3IM"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna4IM"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna5IM"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna6IM"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">HÁBITOS</Typography>}>
                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="Fuma"
                            size={30}
                            checked={fumaHB}
                            onChange={(event) => setFumaHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="cigarrillosDiasFumaHB"
                                label="Cigarrillos Al Día"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="aniosCigaFumaHB"
                                label="Años"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>

                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="mesesCigaFumaHB"
                                label="Meses"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionFumaHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="Fumaba"
                            size={30}
                            checked={fumabaHB}
                            onChange={(event) => setFumabaHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="cigarrillosDiasFumabaHB"
                                label="Cigarrillos Al Día"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="aniosCigaFumabaHB"
                                label="Años"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="mesesCigaFumabaHB"
                                label="Meses"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionFumabaHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="Practica Deporte"
                            size={30}
                            checked={practicaDeporteHB}
                            onChange={(event) => setPracticaDeporteHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idFrecuenciaDeporteHB"
                                label="Frecuencia Deporte"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idCualDeporteHB"
                                label="Cual Deporte"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionPracticaDeporHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="Hobby/Pasatiempos"
                            size={30}
                            checked={hobbiesPasatiempoHB}
                            onChange={(event) => setHobbiesPasatiempoHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={10} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="cualHobbiesHB"
                                label="Cual"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="¿Consume Bebidas Alcohólicas?"
                            size={30}
                            checked={consumeBebidasAlcoholicasHB}
                            onChange={(event) => setConsumeBebidasAlcoholicasHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idFrecuenciaBebidaAlHB"
                                label="Frecuencia de Bebidas"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={7}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="cualBebidasAlHB"
                                label="Cual"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="Fobias"
                            size={30}
                            checked={fobiasHB}
                            onChange={(event) => setFobiasHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={5} >
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setTipoFobiaHB(value)}
                            value={tipoFobiaHB}
                            label="Tipo de Fobia"
                            options={lsSupplier}
                        />
                    </Grid>

                    <Grid item xs={5} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="cualFobiaHB"
                                label="Cual"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <InputCheck
                            label="Heredo familiar"
                            size={30}
                            checked={heredoFamiliarHB}
                            onChange={(event) => setHeredoFamiliarHB(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={5} >
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setParentescoHB(value)}
                            value={parentescoHB}
                            label="Parentesco"
                            options={lsSupplier}
                        />
                    </Grid>

                    <Grid item xs={5}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionHeredoFamiHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">GINECO OBSTÉTRICOS</Typography>}>
                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2.5}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="menarquiaGO"
                                label="Menarquía (EDAD)"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2.5} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idCiclosGO"
                                label="Ciclos"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2.5} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="duracionGO"
                                label="Duración (DIAS)"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.5} >
                        <InputCheck
                            label="Amenorrea"
                            size={30}
                            checked={amenoreaGO}
                            onChange={(event) => setAmenoreaGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={1.5} >
                        <InputCheck
                            label="Dismenorrea"
                            size={30}
                            checked={disminureaGO}
                            onChange={(event) => setDisminureaGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={1.5} >
                        <InputCheck
                            label="Leucorrea"
                            size={30}
                            checked={leucoreaGO}
                            onChange={(event) => setLeucoreaGO(event.target.checked)}
                        />
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2.5}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="vidaMaritalGO"
                                label="Vida Marital (EDAD EN AÑOS)"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2.5}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="vidaObstetricaGO"
                                label="Vida Obstétrica (EDAD EN AÑOS)"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="gGO"
                                label="G"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="pGO"
                                label="P"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="aGO"
                                label="A"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="cSGO"
                                label="C"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="vGO"
                                label="V"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}  >
                    <Grid item xs={2.5}>
                        <InputDatePick
                            label="Fecha"
                            value={fUPGO}
                            onChange={(e) => setFUPGO(e)}
                        />
                    </Grid>

                    <Grid item xs={2.5}>
                        <InputDatePick
                            label="Fecha"
                            value={fURGO}
                            onChange={(e) => setFURGO(e)}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <InputCheck
                            label="ETS"
                            size={30}
                            checked={eTSGO}
                            onChange={(event) => setETSGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="gUALGO"
                                label="Cúal?"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container xs={12} spacing={2}>
                    <Grid item xs={2}>
                        <InputCheck
                            label="Quiste de Ovarios - Miomas"
                            size={30}
                            checked={quisteOvariosBiomasGO}
                            onChange={(event) => setQuisteOvariosBiomasGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={1.5}>
                        <InputCheck
                            label="Endometriosis"
                            size={30}
                            checked={endometriosisGO}
                            onChange={(event) => setEndometriosisGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <InputCheck
                            label="EPI"
                            size={30}
                            checked={ePIGO}
                            onChange={(event) => setEPIGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={1.5} >
                        <InputCheck
                            label="Planifica"
                            size={30}
                            checked={planificaGO}
                            onChange={(event) => setPlanificaGO(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idMetodoGO"
                                label="Método"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="ultimoAnioCitologiaGO"
                                label="Ultimo Año Citologia."
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idResultadoGO"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">REVISIÓN POR SISTEMAS</Typography>}>
                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={4}>
                        <InputCheck
                            label="1. Cabeza-Cefalea"
                            size={30}
                            checked={congenitos}
                            onChange={(event) => setCabezaRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="2. Ojos(A. Visual, dolor, congestion, etc)"
                            size={30}
                            checked={ojosRS}
                            onChange={(event) => setOjosRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="3. Oidos(A. Auditiva, dolor, secreción)"
                            size={30}
                            checked={oidosRS}
                            onChange={(event) => setOidosRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="4. Nariz (Congestión, epistaxis, rinorrea)"
                            size={30}
                            checked={narizRS}
                            onChange={(event) => setNarizRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="5. Boca (eraciones, sangrado de encias)"
                            size={30}
                            checked={bocaRS}
                            onChange={(event) => setBocaRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="6. Garganta (Dolor, ardor, disfagia, disfonía)"
                            size={30}
                            checked={gargantaRS}
                            onChange={(event) => setGargantaRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4} >
                        <InputCheck
                            label="7. Cuello (Dolor, torticolis, opatías)"
                            size={30}
                            checked={cuellosRS}
                            onChange={(event) => setCuellosRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="8. Cardio-Respiratorio"
                            size={30}
                            checked={cardioRS}
                            onChange={(event) => setCardioRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="9. Gastrointestinal"
                            size={30}
                            checked={gastrointestinalRS}
                            onChange={(event) => setGastrointestinalRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="10. GenitoUrinario"
                            size={30}
                            checked={genitoUrinarioRS}
                            onChange={(event) => setGenitoUrinarioRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="11. Osteo-Articular"
                            size={30}
                            checked={osteoRS}
                            onChange={(event) => setOsteoRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="12.Neuro-Muscular"
                            size={30}
                            checked={neuroRS}
                            onChange={(event) => setNeuroRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4} >
                        <InputCheck
                            label="13. Piel y Anexos"
                            size={30}
                            checked={pielRS}
                            onChange={(event) => setPielRS(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputCheck
                            label="14. Psiquiátrico"
                            size={30}
                            checked={psiquiatricoRS}
                            onChange={(event) => setPsiquiatricoRS(event.target.checked)}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <InputOnChange
                        rows={4}
                        label="Observaciones"
                        placeholder="Esperando dictado..."
                        name="inputArea"
                        size={matchesXS ? 'small' : 'medium'}
                        value={observacionRS}
                        onChange={(e) => setObservacionRS(e?.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Plantilla de texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <ListAltSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Audio">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <SettingsVoiceIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Ver Historico">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <AddBoxIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXAMEN FÍSICO</Typography>}>

                <SubCard title="Signos Vitales" secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tASentadoEF"
                                    label="TA Sentado"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tAAcostadoEF"
                                    label="TA Acostado"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="pulsoEF"
                                    label="Pulso"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fCEF"
                                    label="FC"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fREF"
                                    label="FR"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="temperaturaEF"
                                    label="Temperatura"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>

                <Grid sx={{ pb: 2 }} />

                <SubCard title="Antropometria" secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="pesoEF"
                                    label="Peso(Kilos)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tallaEF"
                                    label="Talla(Metros)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="iMCEF"
                                    label="IMC"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Clasificación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idBiotipoEF"
                                    label="Biotipo"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>

                <Grid sx={{ pb: 2 }} />

                <SubCard title="Exploración Morfologica" secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container xs={12} spacing={1} sx={{ pb: 2 }}>
                        <Grid item xs={3}>
                            <InputCheck
                                label="1. Estado Nutricional"
                                size={30}
                                checked={estadoNitricionalEF}
                                onChange={(event) => setEstadoNitricionalEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="2. Piel-Faneras"
                                size={30}
                                checked={pielFaneraEF}
                                onChange={(event) => setPielFaneraEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="3. Craneo"
                                size={30}
                                checked={craneoEF}
                                onChange={(event) => setCraneoEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="4. Parpados"
                                size={30}
                                checked={parpadoEF}
                                onChange={(event) => setParpadoEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="5. Conjuntivas"
                                size={30}
                                checked={conjuntivasEF}
                                onChange={(event) => setConjuntivasEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="6. Corneas"
                                size={30}
                                checked={corniasEF}
                                onChange={(event) => setCorniasEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3} >
                            <InputCheck
                                label="7. Pupilas"
                                size={30}
                                checked={pupilasEF}
                                onChange={(event) => setPupilasEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="8. Reflejo Fotomotors"
                                size={30}
                                checked={reflejoFotomotorEF}
                                onChange={(event) => setReflejoFotomotorEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="9. Reflejo Corneal"
                                size={30}
                                checked={reflejoCornialEF}
                                onChange={(event) => setReflejoCornialEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="10. Fondo Ojos"
                                size={30}
                                checked={fondoOjosEF}
                                onChange={(event) => setFondoOjosEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="11. Inspección Externa Oidos"
                                size={30}
                                checked={inspeccionEF}
                                onChange={(event) => setInspeccionEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="12. Otoscopia"
                                size={30}
                                checked={otoscopiaEF}
                                onChange={(event) => setOtoscopiaEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3} >
                            <InputCheck
                                label="13. Inpección Externa de Nariz"
                                size={30}
                                checked={inspeccionNarizEF}
                                onChange={(event) => setInspeccionNarizEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="14. Rinoscopia"
                                size={30}
                                checked={rinoscopioEF}
                                onChange={(event) => setRinoscopioEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="15. Labios"
                                size={30}
                                checked={labiosEF}
                                onChange={(event) => setLabiosEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="16. Mucosa Oral"
                                size={30}
                                checked={mucosaEF}
                                onChange={(event) => setMucosaEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="17. Encias"
                                size={30}
                                checked={enciasEF}
                                onChange={(event) => setEnciasEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="18. Paladar"
                                size={30}
                                checked={paladarEF}
                                onChange={(event) => setPaladarEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3} >
                            <InputCheck
                                label="19. Dientes"
                                size={30}
                                checked={dientesEF}
                                onChange={(event) => setDientesEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="20. Lengua"
                                size={30}
                                checked={lenguaEF}
                                onChange={(event) => setLenguaEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="21. Faringe"
                                size={30}
                                checked={faringeEF}
                                onChange={(event) => setFaringeEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="22. Amigdalas"
                                size={30}
                                checked={amigdalasEF}
                                onChange={(event) => setAmigdalasEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="23. Cuello Tiroides"
                                size={30}
                                checked={cuellosEF}
                                onChange={(event) => setCuellosEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="24. Inspección de Torax-Mamas"
                                size={30}
                                checked={inspeccionToraxEF}
                                onChange={(event) => setInspeccionToraxEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3} >
                            <InputCheck
                                label="25. Auscultación Cardiaca"
                                size={30}
                                checked={auscultacionCardiacaEF}
                                onChange={(event) => setAuscultacionCardiacaEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="26. Auscultación Respiratoria"
                                size={30}
                                checked={auscultacionRespiratoriaEF}
                                onChange={(event) => setAuscultacionRespiratoriaEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="27. Inspección Abdomen"
                                size={30}
                                checked={inspeccionAbdomenEF}
                                onChange={(event) => setInspeccionAbdomenEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="28. Palpación Abdomen"
                                size={30}
                                checked={palpacionAbdomenEF}
                                onChange={(event) => setPalpacionAbdomenEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="29. Exploración Higado"
                                size={30}
                                checked={exploracionHigadoEF}
                                onChange={(event) => setExploracionHigadoEF(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="30. Exploración de Bazo"
                                size={30}
                                checked={exploracionVasoEF}
                                onChange={(event) => setExploracionVasoEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="31. Exploración Riñones"
                                size={30}
                                checked={exploracionRinionesEF}
                                onChange={(event) => setExploracionRinionesEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="32. Anillos Inguinales"
                                size={30}
                                checked={anillosInguinalesEF}
                                onChange={(event) => setAnillosInguinalesEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="33. Anillo Umbilical"
                                size={30}
                                checked={anilloUmbilicalEF}
                                onChange={(event) => setAnilloUmbilicalEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="34. Genitales Externos"
                                size={30}
                                checked={genitalesExternosEF}
                                onChange={(event) => setGenitalesExternosEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="35. Región Anal"
                                size={30}
                                checked={regionAnalEF}
                                onChange={(event) => setRegionAnalEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="36. Tacto Rectal"
                                size={30}
                                checked={tactoRectalEF}
                                onChange={(event) => setTactoRectalEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="37. Tacto Vaginal"
                                size={30}
                                checked={tactoVaginalEF}
                                onChange={(event) => setTactoVaginalEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="38. Extremidades Superiores"
                                size={30}
                                checked={extremidadesSuperioresEF}
                                onChange={(event) => setExtremidadesSuperioresEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="39. Extremidades Inferiores"
                                size={30}
                                checked={extremidadesInferioresEF}
                                onChange={(event) => setExtremidadesInferioresEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="40. Pulsos"
                                size={30}
                                checked={pulsosEF}
                                onChange={(event) => setPulsosEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="41. Columna Vertebral"
                                size={30}
                                checked={columnaVertebralEF}
                                onChange={(event) => setColumnaVertebralEF(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="42. Articulaciones"
                                size={30}
                                checked={articulacionesEF}
                                onChange={(event) => setArticulacionesEF(event.target.checked)}
                            />
                        </Grid>
                    </Grid>

                    <InputOnChange
                        multiline
                        rows={4}
                        label="Especifique"
                        placeholder="Esperando dictado..."
                        name="inputArea"
                        size={matchesXS ? 'small' : 'medium'}
                        value={especifiqueEMEFU}
                        onChange={(e) => setEspecifiqueEMEFU(e?.target.value)}
                    />

                    <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Plantilla de texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <ListAltSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Audio">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <SettingsVoiceIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Ver Historico">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <AddBoxIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXPLORACIÓN FUNCIONAL</Typography>}>
                <Grid container xs={12} spacing={1} sx={{ pb: 2 }}>
                    <Grid item xs={3} >
                        <InputCheck
                            label="1. Movilidad Ocular"
                            size={30}
                            checked={movilidadEFU}
                            onChange={(event) => setMovilidadEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="2. Equilibrio"
                            size={30}
                            checked={equilibrioEFU}
                            onChange={(event) => setEquilibrioEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="3. Marcha Coordinación"
                            size={30}
                            checked={marchaEFU}
                            onChange={(event) => setMarchaEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="4. Movilidad Hombro"
                            size={30}
                            checked={movilidadHombroEFU}
                            onChange={(event) => setMovilidadHombroEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="5. Movilidad Codo"
                            size={30}
                            checked={movilidadCodoEFU}
                            onChange={(event) => setMovilidadCodoEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="6. Movilidad Muñeca"
                            size={30}
                            checked={movilidadMuniecaEFU}
                            onChange={(event) => setMovilidadMuniecaEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3} >
                        <InputCheck
                            label="7. Signo de Tinel"
                            size={30}
                            checked={signoTinelEFU}
                            onChange={(event) => setSignoTinelEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="8. Signo de Phalen"
                            size={30}
                            checked={signoPhalenEFU}
                            onChange={(event) => setSignoPhalenEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="9. Movilidad Manos"
                            size={30}
                            checked={movilidadManosEFU}
                            onChange={(event) => setMovilidadManosEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="10. Movilidad Cadera"
                            size={30}
                            checked={movilidadCaderaEFU}
                            onChange={(event) => setMovilidadCaderaEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="11. Movilidad Rodilla"
                            size={30}
                            checked={movilidadRodillaEFU}
                            onChange={(event) => setMovilidadRodillaEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="12. Movilidad Tobillo"
                            size={30}
                            checked={movilidadTobilloEFU}
                            onChange={(event) => setMovilidadTobilloEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3} >
                        <InputCheck
                            label="13. Movilidad Cuello (C1-C4)"
                            size={30}
                            checked={movilidadCuelloEFU}
                            onChange={(event) => setMovilidadCuelloEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="14. ROT Bicipital (C5)"
                            size={30}
                            checked={rOTVisipitalEFU}
                            onChange={(event) => setROTVisipitalEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="15. ROT Rotuliano (L4)"
                            size={30}
                            checked={rOTRotuleanoEFU}
                            onChange={(event) => setROTRotuleanoEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="16. Extencion Primer Artejo (L5)"
                            size={30}
                            checked={extencionEFU}
                            onChange={(event) => setExtencionEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="17. Sensibilidad cara anterior pie (L5)"
                            size={30}
                            checked={sensibilidadCaraAnteriorEFU}
                            onChange={(event) => setSensibilidadCaraAnteriorEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="18. Eversión Pie(S1)"
                            size={30}
                            checked={eversionPiesEFU}
                            onChange={(event) => setEversionPiesEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="19. Sensibilidad cara lateral pie (L5)"
                            size={30}
                            checked={sensibilidadCaraLateralEFU}
                            onChange={(event) => setSensibilidadCaraLateralEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="20. ROT Aquiliano"
                            size={30}
                            checked={rOTAquileanoEFU}
                            onChange={(event) => setROTAquileanoEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="21. Signo de la Laségue"
                            size={30}
                            checked={signoLasegueEFU}
                            onChange={(event) => setSignoLasegueEFU(event.target.checked)}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <InputCheck
                            label="22. Indice Wells"
                            size={30}
                            checked={indiceWellsEFU}
                            onChange={(event) => setIndiceWellsEFU(event.target.checked)}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} spacing={4}>
                    <InputOnChange
                        multiline
                        rows={4}
                        label="Observaciones"
                        placeholder="Esperando dictado..."
                        name="inputArea"
                        size={matchesXS ? 'small' : 'medium'}
                        value={observacionEFU}
                        onChange={(e) => setObservacionEFU(e?.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Plantilla de texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <ListAltSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Audio">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Todo Bien")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <SettingsVoiceIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid justifyContent="center" alignItems="center" container>
                                <AnimateButton>
                                    <Tooltip title="Ver Historico">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <AddBoxIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXÁMENES PARACLÍNICOS</Typography>}>
                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <InputDatePick
                            label="Rx de Torax(Criterios OIT)"
                            value={fechaRxToraxEPA}
                            onChange={(e) => setFechaRxToraxEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoRxToraxEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesRxToraxEPA}
                            onChange={(e) => setObservacionesRxToraxEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="Espirometria"
                            value={fechaEspirometriaEPA}
                            onChange={(e) => setFechaEspirometriaEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoEspirometriaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesEspirometriaEPA}
                            onChange={(e) => setObservacionesEspirometriaEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="Audiometria"
                            value={fechaAudiometriaEPA}
                            onChange={(e) => setFechaAudiometriaEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoAudiometriaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesAudiometriaEPA}
                            onChange={(e) => setObservacionesAudiometriaEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="Visiometria"
                            value={fechaVisiometriaEPA}
                            onChange={(e) => setFechaVisiometriaEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoVisiometriaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesVisiometriaEPA}
                            onChange={(e) => setObservacionesVisiometriaEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="Laboratorio Clinico"
                            value={fechaLaboratorioClinicoEPA}
                            onChange={(e) => setFechaLaboratorioClinicoEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoLaboratorioClinicoEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesLaboratorioClinicoEPA}
                            onChange={(e) => setObservacionesLaboratorioClinicoEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="Cuestionario de Sintomas Respiratorios"
                            value={fechaCuestionarioSintomaEPA}
                            onChange={(e) => setFechaCuestionarioSintomaEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoCuestionarioSintomaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesCuestionarioSintomaEPA}
                            onChange={(e) => setObservacionesCuestionarioSintomaEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="EKG"
                            value={fechaEkgEPA}
                            onChange={(e) => setFechaEkgEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoEkgEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesEkgEPA}
                            onChange={(e) => setObservacionesEkgEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="RNM-Columna Lumbosacra"
                            value={fechaRnmLumbosacraEPA}
                            onChange={(e) => setFechaRnmLumbosacraEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoRnmLumbosacraEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesRnmLumbosacraEPA}
                            onChange={(e) => setObservacionesRnmLumbosacraEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <InputDatePick
                            label="RNM-Columna Cervical"
                            value={fechaRnmCervicalEPA}
                            onChange={(e) => setFechaRnmCervicalEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoRnmCervicalEPA"
                                label="Resultado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <InputOnChange
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionesRnmCervicalEPA}
                            onChange={(e) => setObservacionesRnmCervicalEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} spacing={4}>
                        <InputOnChange
                            multiline
                            rows={4}
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionEPA}
                            onChange={(e) => setObservacionEPA(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Grid spacing={2} justifyContent="center" alignItems="center" container xs={12}>
                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={3}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard >
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">IMPRESIÓN DIAGNÓSTICA Y CONCEPTO FINAL</Typography>}>
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setDxID(value)}
                            value={dxID}
                            label="DX"
                            options={lsSupplier}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <InputOnChange
                            multiline
                            rows={4}
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={observacionID}
                            onChange={(e) => setObservacionID(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} spacing={4}>
                        <InputOnChange
                            multiline
                            rows={4}
                            label="Recomendaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={recomendacionesID}
                            onChange={(e) => setRecomendacionesID(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12} sx={{ pt: 2 }}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} spacing={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Concepto de Aptitud PsicoFisica"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard >


            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography variant="h4" color="inherit">TRABAJO EN ALTURA</Typography></>}>
                <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPRESA</Typography>}>
                    <Grid container xs={12} spacing={2}>


                    <Grid item xs={4}>
                        <InputDatePick
                            label="Fecha Del Concepto"
                            value={fechaRnmCervicalEPA}
                            onChange={(e) => setFechaRnmCervicalEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Concepto Aptitud"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="El Concepto de aptitud debe ser aplazado"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                   
                        <Grid item xs={12}>
                            <InputOnChange
                                multiline
                                rows={4}
                                label="Motivo de Aplazo"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionID}
                                onChange={(e) => setObservacionID(e?.target.value)}
                            />
                        </Grid>


                        <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                        <Grid item xs={12}>
                            <InputOnChange
                                multiline
                                rows={4}
                                label="Descripción de resultados(Resumen de limitaciones o restricciones)"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionID}
                                onChange={(e) => setObservacionID(e?.target.value)}
                            />
                        </Grid>


                        <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                        <Grid item xs={12}>
                            <InputOnChange
                                multiline
                                rows={4}
                                label="Recomendaciones (En términos sencillos de cuidados y controles requeridos)"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionID}
                                onChange={(e) => setObservacionID(e?.target.value)}
                            />
                        </Grid>


                        <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                        <Grid item xs={6} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Remitido"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="A Donde:"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    </Grid>
                </SubCard >

                <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPLEADO</Typography>}>
                    <Grid container xs={12} spacing={2}>


           

                    <Grid item xs={12} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="1. Menor de Edad."
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

           
                
 
                     <Grid item xs={12} >
                         <FormProvider {...methods}>
                             <InputSelect
                                 name="IdConceptoActitudID"
                                 label="2. Mujer embarazada con cualquier edad de Gestacíón."
                                 defaultValue=""
                                 options={catalog}
                                 size={matchesXS ? 'small' : 'medium'}
                                 bug={errors}
                             />
                         </FormProvider>
                     </Grid>


               
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="3. Arritmias Cardiacas."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

               
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="3. Arritmias Cardiacas."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

              
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="4. Enfermedades o malformaciones cardiacas asintomáticas."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

                 
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="5. Historia de Hipotensión ortostática (no basta presentar episodios aislados)."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

               
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="6. Hipertensión arterial no controlada o resistente al tratamiento."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

         
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="7. Hipertrigliceridemia aislada severa, con cifras mayores a 500 mg/dl."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

              
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="8. Cifras LDL mayores a 190 mg/dl."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

              
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="9. Diabetes controladas."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

                 
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="10. Dislipemia de moderada a severa asociada a diabetes, HTA, obesidad, hipotiroidismo."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

     
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="11. Diagnóstico o sospecha de dislipemia de origen familiar (genético)."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

             
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="12. Riesgo Cardivascular a 10 años ≥ 20% según Método de Framingham."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

         
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="13. Riesgo Cardiovascular entre 10 y 20% si existen dos o mas factores mayores de riesgo."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

           
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="14. Hipertiroidismo no controlado o sintomático."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

               
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="15. Alteración auditiva severa y bilateral que comprometa bandas conversacionales (500 a 2000 Hz)."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

             
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="16. Vertigo y otras alteraciones del equilibrio."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>
              
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="17. Epilepsia u otra enfermedad neurológica, que pueda generar alteraciones de la conciencia o el equilibrio."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

            
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="18. Ceguera Temporal o permanente o alteraciones visuales significativas y severas."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>
                 
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="19. Historia de fobias o episodios de pánico relacionados con altura."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

          
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="20. Transtornos psiquiátricos, incluyendo adicciones a sustancias psicoactivas."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

               
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="21. Limitacionesn permanentes para deambular por sus propios medios o lesiones con compromiso funcional del cuello, espalda o extremidades, que afecten el agarre requerido en estas labores."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

                 
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="22. Obesidad Morbida (IMC mayor a 35) o peso mayor de 120 kg, por limitaciones de sistemas de arneses."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>

                
  
                      <Grid item xs={12} >
                          <FormProvider {...methods}>
                              <InputSelect
                                  name="IdConceptoActitudID"
                                  label="23. De forma temporal, el uso de medicamentos que produzcan sueño o deprivación de sueño mas de un turno."
                                  defaultValue=""
                                  options={catalog}
                                  size={matchesXS ? 'small' : 'medium'}
                                  bug={errors}
                              />
                          </FormProvider>
                      </Grid>



                
 
                     <Grid item xs={12} >
                         <FormProvider {...methods}>
                             <InputSelect
                                 name="IdConceptoActitudID"
                                 label="24. Otras alteraciones Cardiovasculares, pulmonares, musculares, hepáticas, sanguíneas o renales, que por su severidad
                                 o progreso puedan general alteraciones del equilibrio o de la conciencia en concepto  del médico tratante."
                                 defaultValue=""
                                 options={catalog}
                                 size={matchesXS ? 'small' : 'medium'}
                                 bug={errors}
                             />
                         </FormProvider>
                     </Grid>






                        <Grid item xs={12}>
                            <InputOnChange
                                multiline
                                rows={4}
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionID}
                                onChange={(e) => setObservacionID(e?.target.value)}
                            />
                        </Grid>



                        <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                     



                        <Grid item xs={12} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Concepto de Aptitud Medica"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                  

                    </Grid>
                </SubCard >

            </Accordion>
            <Divider />
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">FRAMINGHAM</Typography></>}>
                <SubCard darkTitle title={<Typography variant="h4">INFORMACIÓN CARDIOVASCULAR</Typography>}>
                    <Grid container xs={12} spacing={2}>


                    <Grid item xs={4}>
                        <InputDatePick
                            label="Fecha"
                            value={fechaRnmCervicalEPA}
                            onChange={(e) => setFechaRnmCervicalEPA(e)}
                        />
                    </Grid>

                    <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Tensión Arterial"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Dx Tensión Arterial "
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>


                    <Grid item xs={4}>
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setDxID(value)}
                            value={dxID}
                            label="Antecedentes Cardiovascular"
                            options={lsSupplier}
                        />
                    </Grid>


                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Deporte  "
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

           
                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Bebidas "
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>


                    <Grid item xs={4}>
                        <InputDatePick
                            label="Fecha Laboratorio"
                            value={fechaRnmCervicalEPA}
                            onChange={(e) => setFechaRnmCervicalEPA(e)}
                        />
                    </Grid>



                    <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Colesterol Total"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="HDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Trigliceridos"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>



                        <Grid item xs={4}>
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setDxID(value)}
                            value={dxID}
                            label="Dx Metabólico"
                            options={lsSupplier}
                        />
                    </Grid>

                    <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Glicemia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdConceptoActitudID"
                                label="Fuma"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>



                        <Grid item xs={12}>
                            <InputOnChange
                                multiline
                                rows={4}
                                label="Observación"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionID}
                                onChange={(e) => setObservacionID(e?.target.value)}
                            />
                        </Grid>

                   <Grid item xs={12}>
                        <Grid spacing={2} justifyContent="left" alignItems="center" container xs={12}>
                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Todo Bien")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid justifyContent="center" alignItems="center" container>
                                    <AnimateButton>
                                        <Tooltip title="Ver Historico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Divider />


                    <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="LDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Relación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="FR Edad"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Fr Colesterol"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Fr HDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="FR Glicemia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Fr Tensión Arterial "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="FR Tabaquismo "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Puntaje"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Riesgo Absoluto  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>



                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Riesgo Relativo  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="clasificacionEF"
                                    label="Interpretación  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>





                  

                    </Grid>
                </SubCard >


            </Accordion>
            <Divider />
        </Fragment >
    );
};

export default Emo;