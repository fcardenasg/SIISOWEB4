// Import de Material-ui
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, useMediaQuery,
    Grid, Typography, Tooltip, Fab, Divider
} from '@mui/material';

import InputCheckBox from 'components/input/InputCheckBox';
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
import { GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
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

const MaperCatalogo = async (idTipoCatalogo) => {
    try {
        const lsServerCatalog = await GetAllByTipoCatalogo(0, 0, idTipoCatalogo);
        if (lsServerCatalog.status === 200) {
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            return resultCatalogo;
        }
    } catch (error) {
        console.log(error);
    }
}

const Emo = () => {
    const theme = useTheme();
    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);

    const [lsSupplier, setSupplier] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [lsVacuna, setLsVacuna] = useState([]);

    /* ACCIDENTES DE TRABAJO / ENFERMEDAD LABORAL */
    const [especifiqueAT, setEspecifiqueAT] = useState("");
    const [especifique1AT, setEspecifique1AT] = useState('');

    /* INMUNIZACIONES */
    const [vacunasIM, setVacunasIM] = useState([]);

    /* HÁBITOS */
    const [parentescoHB, setParentescoHB] = useState([]);
    const [tipoFobiaHB, setTipoFobiaHB] = useState([]);

    /* GINECO OBSTÉTRICOS */
    const [fUPGO, setFUPGO] = useState(new Date());
    const [fURGO, setFURGO] = useState(new Date());

    /* REVISIÓN POR SISTEMAS */
    const [observacionRS, setObservacionRS] = useState('');

    /* EXAMEN FÍSICO */
    const [especifiqueEMEFU, setEspecifiqueEMEFU] = useState('');

    /* EXPLORACIÓN FUNCIONAL */
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

    /* TRABAJO EN ALTURA - NOTIFICACIÓN EMPRESA */
    const [motivoAplazoNETA, setMotivoAplazoNETA] = useState('');
    const [descripcionResultadoNETA, setDescripcionResultadoNETA] = useState('');
    const [recomendacionesNETA, setRecomendacionesNETA] = useState('');

    /* TRABAJO EN ALTURA - NOTIFICACIÓN EMPLEADO */
    const [observacionesNEMTA, setObservacionesNEMTA] = useState('');

    /* FRAMINGHAM - INFORMACIÓN CARDIOVASCULAR */
    const [idAntecedenteCardiovascularFRA, setIdAntecedenteCardiovascularFRA] = useState([]);
    const [idMetabolicoFRA, setIdMetabolicoFRA] = useState([]);
    const [observacionFRA, setObservacionFRA] = useState('');
    const [fechaFRA, setFechaFRA] = useState(new Date());
    const [fechaLaboratorioFRA, setFechaLaboratorioFRA] = useState(new Date());

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
            setStateText({ especifiqueAP: transcript });
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

            setCatalog(await MaperCatalogo(CodCatalogo.Area));
            setLsVacuna(await MaperCatalogo(CodCatalogo.HCO_VACUNAS));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
        handleListen();
    }, [])

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    /* { resolver: yupResolver(validationSchema) } */

    const [congenitos, setCongenitos] = useState(false);


    useEffect(() => {
        handleListen();
    }, [isListening])

    const haldlerNote = (event) => setNote(event.target.value);

    const [stateText, setStateText] = useState({
        especifiqueAP: '',
    });

    return (
        <Fragment>
            <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES PATALÓGICOS</Typography>}>

                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="1. Congenitos"
                                name="congenitosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="2. Inmunoprevenible"
                                name="inmunoPrevenibleAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="3. Infecciosos"
                                name="infecciososAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="4. Ojos"
                                name="ojoAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="5. Agudeza Visual"
                                name="agudezaVisualAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="6. Oidos"
                                name="oidosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="7. Nasofaringe"
                                name="nasoFaringeAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="8. Cardiovascular"
                                name="cardiovascularAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="9. Pulmonar"
                                name="pulmonarAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="10. Gastrointestinal"
                                name="gastrointestinalAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="11. Genitourinario"
                                name="gimitoUrinarioAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="12. Neurológico"
                                name="neurologicoAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="13. Trastornos de piel"
                                name="transtornoPielAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="14. Osteomusculares"
                                name="osteoMuscularAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="15. Alérgicos"
                                name="alergicosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="16. Tóxicos"
                                name="toxicoAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="17. Farmacólogicos"
                                name="faRmacologicosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="18. Quirúrgicos"
                                name="quirurgicosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="19. Traumático"
                                name="traumaticosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="20. Transfusiones"
                                name="tranfuccionesAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="21. ETS"
                                name="etsAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="22. Deformidades"
                                name="deformidadesAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="23. Psiquiatrico"
                                name="ciquiatricosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="24. Farmacodependencia"
                                name="farmacoDependenciaAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="25. E.M."
                                name="emAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="26. Renal"
                                name="renalAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="27. Asma"
                                name="asmaAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="28. O.R.L."
                                name="orlAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="29. Cancer"
                                name="cancerAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pt: 2 }}>

                    {/* CONTROL DE TEXTO CONTROLADO */}
                    <InputOnChange
                        rows={4}
                        multiline
                        label="Especifique"
                        name="especifiqueAP"
                        size={matchesXS ? 'small' : 'medium'}
                        value={stateText.especifiqueAP}
                        onChange={(e) => setStateText({ especifiqueAP: e.target.value })}
                    />

                    {/* CONTROL DE TEXTO NO CONTROLADO */}
                    <FormProvider {...methods}>
                        <InputText
                            multiline
                            rows={4}
                            defaultValue=""
                            fullWidth
                            name="especifiqueAP"
                            label="Especifique"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
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
                                            onClick={() => setIsListening(prevState1 => !prevState1)}
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

            </SubCard>
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
                            name="especifiqueAT"
                            size={matchesXS ? 'small' : 'medium'}
                            value={especifiqueAT}
                            onChange={(e) => setEspecifiqueAT(e.target.value)}
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

            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">INMUNIZACIONES</Typography>}>
                <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >
                    <Grid item xs={12} >
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setVacunasIM(value)}
                            value={vacunasIM.value}
                            label="Vacuna"
                            options={lsVacuna}
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
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">HÁBITOS</Typography>}>
                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Fuma"
                                name="fumaHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Fumaba"
                                name="fumabaHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Practica Deporte"
                                name="practicaDeporteHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Hobby/Pasatiempos"
                                name="hobbiesPasatiempoHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="¿Consume Bebidas Alcohólicas?"
                                name="consumeBebidasAlcoholicasHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Fobias"
                                name="fobiasHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Heredo familiar"
                                name="heredoFamiliarHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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

            </SubCard>
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

                    <Grid item xs={1.5}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Amenorrea"
                                name="amenoreaGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.5}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Dismenorrea"
                                name="disminureaGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.5} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Leucorrea"
                                name="leucoreaGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="ETS"
                                name="eTSGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Quiste de Ovarios - Miomas"
                                name="quisteOvariosBiomasGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.5}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Endometriosis"
                                name="endometriosisGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="EPI"
                                name="ePIGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={1.5} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Planifica"
                                name="planificaGO"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
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
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">REVISIÓN POR SISTEMAS</Typography>}>
                <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="1. Cabeza - Cefalea"
                                name="cabezaRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="2. Ojos(A. Visual, dolor, congestion, etc)"
                                name="ojosRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="3. Oidos(A. Auditiva, dolor, secreción)"
                                name="oidosRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="4. Nariz (Congestión, epistaxis, rinorrea)"
                                name="narizRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="5. Boca (eraciones, sangrado de encias)"
                                name="bocaRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="6. Garganta (Dolor, ardor, disfagia, disfonía)"
                                name="gargantaRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="7. Cuello (Dolor, torticolis, opatías)"
                                name="cuellosRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="8. Cardio-Respiratorio"
                                name="cardioRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="9. Gastrointestinal"
                                name="gastrointestinalRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="10. GenitoUrinario"
                                name="genitoUrinarioRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="11. Osteo-Articular"
                                name="osteoRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="12.Neuro-Muscular"
                                name="neuroRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="13. Piel y Anexos"
                                name="pielRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="14. Psiquiátrico"
                                name="psiquiatricoRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <InputOnChange
                        rows={4}
                        label="Observaciones"
                        placeholder="Esperando dictado..."

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

            </SubCard>
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
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. Estado Nutricional"
                                    name="estadoNitricionalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. Piel-Faneras"
                                    name="pielFaneraEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. Craneo"
                                    name="craneoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4. Parpados"
                                    name="parpadoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5. Conjuntivas"
                                    name="conjuntivasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Corneas"
                                    name="corniasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="7. Pupilas"
                                    name="pupilasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="8. Reflejo Fotomotors"
                                    name="reflejoFotomotorEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="9. Reflejo Corneal"
                                    name="reflejoCornialEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Fondo Ojos"
                                    name="fondoOjosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="11. Inspección Externa Oidos"
                                    name="inspeccionEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="12. Otoscopia"
                                    name="otoscopiaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="13. Inpección Externa de Nariz"
                                    name="inspeccionNarizEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="14. Rinoscopia"
                                    name="rinoscopioEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="15. Labios"
                                    name="labiosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="16. Mucosa Oral"
                                    name="mucosaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="17. Encias"
                                    name="enciasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="18. Paladar"
                                    name="paladarEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="19. Dientes"
                                    name="dientesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="20. Lengua"
                                    name="lenguaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="21. Faringe"
                                    name="faringeEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="22. Amigdalas"
                                    name="amigdalasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="23. Cuello Tiroides"
                                    name="cuellosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="24. Inspección de Torax-Mamas"
                                    name="inspeccionToraxEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="25. Auscultación Cardiaca"
                                    name="auscultacionCardiacaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="26. Auscultación Respiratoria"
                                    name="auscultacionRespiratoriaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="27. Inspección Abdomen"
                                    name="inspeccionAbdomenEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="28. Palpación Abdomen"
                                    name="palpacionAbdomenEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="29. Exploración Higado"
                                    name="exploracionHigadoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="30. Exploración de Bazo"
                                    name="exploracionVasoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="31. Exploración Riñones"
                                    name="exploracionRinionesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="32. Anillos Inguinale"
                                    name="anillosInguinalesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="33. Anillo Umbilical"
                                    name="anilloUmbilicalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="34. Genitales Externos"
                                    name="genitalesExternosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="35. Región Anal"
                                    name="regionAnalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="36. Tacto Rectal"
                                    name="tactoRectalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="37. Tacto Vaginal"
                                    name="tactoVaginalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="38. Extremidades Superiores"
                                    name="extremidadesSuperioresEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="39. Extremidades Inferiores"
                                    name="extremidadesInferioresEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="40. Pulsos"
                                    name="pulsosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="41. Columna Vertebral"
                                    name="columnaVertebralEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="42. Articulaciones"
                                    name="articulacionesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <InputOnChange
                        multiline
                        rows={4}
                        label="Especifique"
                        placeholder="Esperando dictado..."

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
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXPLORACIÓN FUNCIONAL</Typography>}>
                <Grid container xs={12} spacing={1} sx={{ pb: 2 }}>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="1. Movilidad Ocular"
                                name="movilidadEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="2. Equilibrio"
                                name="equilibrioEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="3. Marcha Coordinación"
                                name="marchaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="4. Movilidad Hombro"
                                name="movilidadHombroEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="5. Movilidad Codo"
                                name="movilidadCodoEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="6. Movilidad Muñeca"
                                name="movilidadMuniecaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="7. Signo de Tinel"
                                name="signoTinelEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="8. Signo de Phalen"
                                name="signoPhalenEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="9. Movilidad Manos"
                                name="movilidadManosEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="10. Movilidad Cadera"
                                name="movilidadCaderaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="11. Movilidad Rodilla"
                                name="movilidadRodillaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="12. Movilidad Tobillo"
                                name="movilidadTobilloEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="13. Movilidad Cuello (C1-C4)"
                                name="movilidadCuelloEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="14. ROT Bicipital (C5)"
                                name="rOTVisipitalEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="15. ROT Rotuliano (L4)"
                                name="rOTRotuleanoEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="16. Extencion Primer Artejo (L5)"
                                name="extencionEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="17. Sensibilidad cara anterior pie (L5)"
                                name="sensibilidadCaraAnteriorEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="18. Eversión Pie(S1)"
                                name="eversionPiesEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="19. Sensibilidad cara lateral pie (L5)"
                                name="sensibilidadCaraLateralEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="20. ROT Aquiliano"
                                name="rOTAquileanoEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="21. Signo de la Laségue"
                                name="signoLasegueEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="22. Indice Wells"
                                name="indiceWellsEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} spacing={4}>
                    <InputOnChange
                        multiline
                        rows={4}
                        label="Observaciones"
                        placeholder="Esperando dictado..."

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
            </SubCard>
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
            </SubCard>
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
                            /* name="inputArea" */
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
            </SubCard>
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
                                    name="conceptoAplazadoNETA"
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
                                    name="conceptoActitudNETA"
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
                                /* name="inputArea" */
                                size={matchesXS ? 'small' : 'medium'}
                                value={motivoAplazoNETA}
                                onChange={(e) => setMotivoAplazoNETA(e?.target.value)}
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
                                /* name="inputArea" */
                                size={matchesXS ? 'small' : 'medium'}
                                value={descripcionResultadoNETA}
                                onChange={(e) => setDescripcionResultadoNETA(e?.target.value)}
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
                                /* name="inputArea" */
                                size={matchesXS ? 'small' : 'medium'}
                                value={recomendacionesNETA}
                                onChange={(e) => setRecomendacionesNETA(e?.target.value)}
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
                                    name="remitidoNETA"
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
                                    name="remididoDondeNETA"
                                    label="A Donde:"
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


                <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPLEADO</Typography>}>
                    <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
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

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
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

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
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
                                    disabled
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
                    </Grid>

                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idRiesgoCardiovascularNEMTA"
                                    label="Riesgo Cardiovascular"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idClasificacionNEMTA"
                                    label="Clasificación"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. Menor de Edad."
                                    name="idMenorEdadNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. Mujer embarazada con cualquier edad de Gestacíón."
                                    name="idMujerEmbarazadaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. Arritmias Cardiacas."
                                    name="idArimiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4. Enfermedades o malformaciones cardiacas asintomáticas."
                                    name="idEnfermedadNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5. Historia de Hipotensión ortostática (no basta presentar episodios aislados)."
                                    name="idHistoriaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Hipertensión arterial no controlada o resistente al tratamiento."
                                    name="idHipertensionNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="7. Hipertrigliceridemia aislada severa, con cifras mayores a 500 mg/dl."
                                    name="idHipertrigliceridemiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="8. Cifras LDL mayores a 190 mg/dl."
                                    name="idCifrasNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="9. Diabetes controladas"
                                    name="idDiabetesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Dislipemia de moderada a severa asociada a diabetes, HTA, obesidad, hipotiroidismo."
                                    name="idDislipidemiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="11. Diagnóstico o sospecha de dislipemia de origen familiar (genético)."
                                    name="idDiagnosticoNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="12. Riesgo Cardivascular a 10 años ≥ 20% según Método de Framingham."
                                    name="idRiesgoCardiovascular1NEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="13. Riesgo Cardiovascular entre 10 y 20% si existen dos o mas factores mayores de riesgo."
                                    name="idRiesgoCardiovascular2NEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="14. Hipertiroidismo no controlado o sintomático."
                                    name="idHipertiroidismoNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="15. Alteración auditiva severa y bilateral que comprometa bandas conversacionales (500 a 2000 Hz)."
                                    name="idAlteracionAuditivaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="16. Vertigo y otras alteraciones del equilibrio."
                                    name="idVertigoAlteracionesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="17. Epilepsia u otra enfermedad neurológica, que pueda generar alteraciones de la conciencia o el equilibrio."
                                    name="idEpilegsiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="18. Ceguera Temporal o permanente o alteraciones visuales significativas y severas."
                                    name="idCegueraTemporalNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="19. Historia de fobias o episodios de pánico relacionados con altura."
                                    name="idHistoriaFobiasNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="20. Transtornos psiquiátricos, incluyendo adicciones a sustancias psicoactivas."
                                    name="idTranstornoPsiquiatricoNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="21. Limitacionesn permanentes para deambular por sus propios medios o lesiones con compromiso funcional del cuello, espalda o extremidades, que afecten el agarre requerido en estas labores."
                                    name="idLimitacionesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="22. Obesidad Morbida (IMC mayor a 35) o peso mayor de 120 kg, por limitaciones de sistemas de arneses."
                                    name="idObesidadMorbidaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="23. De forma temporal, el uso de medicamentos que produzcan sueño o deprivación de sueño mas de un turno."
                                    name="idDeformaTemporalNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>

                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="24. Otras alteraciones Cardiovasculares, pulmonares, musculares, hepáticas, sanguíneas o renales, que por su severidad
                                o progreso puedan general alteraciones del equilibrio o de la conciencia en concepto  del médico tratante."
                                    name="idOtrasAlteracionesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <InputOnChange
                                multiline
                                rows={4}
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                /* name="inputArea" */
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionesNEMTA}
                                onChange={(e) => setObservacionesNEMTA(e?.target.value)}
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
                                    name="conceptoActitudMedicoNEMTA"
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
                                value={fechaFRA}
                                onChange={(e) => setFechaFRA(e)}
                            />
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tencionFRA"
                                    label="Tensión Arterial"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTencionArterialFRA"
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
                                onChange={(event, value) => setIdAntecedenteCardiovascularFRA(value)}
                                value={idAntecedenteCardiovascularFRA}
                                label="Antecedentes Cardiovascular"
                                options={lsSupplier}
                            />
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idDeporteFRA"
                                    label="Deporte"
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
                                    name="idBebidaFRA"
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
                                value={fechaLaboratorioFRA}
                                onChange={(e) => setFechaLaboratorioFRA(e)}
                            />
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="colesterolTotalFRA"
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
                                    name="hDLFRA"
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
                                    name="triglicericosFRA"
                                    label="Trigliceridos"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setIdMetabolicoFRA(value)}
                                value={idMetabolicoFRA}
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
                                    name="glisemiaFRA"
                                    label="Glicemia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="fumaFRA"
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
                                /* name="inputArea" */
                                size={matchesXS ? 'small' : 'medium'}
                                value={observacionFRA}
                                onChange={(e) => setObservacionFRA(e?.target.value)}
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

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="lDLFRA"
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
                                    name="relacionFRA"
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
                                    name="fRLEdadFRA"
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
                                    name="fRLColesterolFRA"
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
                                    name="fRHDLFRA"
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
                                    name="fRGlisemiaFRA"
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
                                    name="fRTencionFRA"
                                    label="Fr Tensión Arterial"
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
                                    name="fRTabaquismoFRA"
                                    label="FR Tabaquismo"
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
                                    name="puntajeFRA"
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
                                    name="riesgoAbsolutoFRA"
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
                                    name="riesgoRelativoFRA"
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
                                    name="interpretacionFRA"
                                    label="Interpretación  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Divider />
        </Fragment >
    );
};

export default Emo;