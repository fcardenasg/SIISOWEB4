// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, CardActions, Checkbox, Divider, useMediaQuery,
    FormControlLabel, Grid, Switch, Typography, Tooltip, Fab, TextField
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { FormProvider, useForm } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputOnChange from 'components/input/InputOnChange';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import SideIconCard from 'ui-component/cards/SideIconCard';
import InputCheck from 'components/input/InputCheck';
import InputArea from 'components/input/InputArea';
import InputDatePick from 'components/input/InputDatePick';
import { useNavigate } from 'react-router-dom';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { IconEdit } from '@tabler/icons';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { PostSupplier } from 'formatdata/SupplierForm';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { gridSpacing } from 'store/constant';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import Avatar3 from 'assets/images/users/avatar-3.png';
import Avatar from 'ui-component/extended/Avatar';
// Import de Material-ui
import { useCallback, useRef } from 'react';


import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto

import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';

import { FormatDate } from 'components/helpers/Format';


// Audio


const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'




// ==============================|| PROFILE 1 - SETTINGS ||============================== //

const Emo = () => {
    const theme = useTheme();
    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);

    const [valueFechaNaci, setFechaNaci] = useState(null);

    const [supplierArray, setSupplierArray] = useState([]);
    const [lsSupplier, setSupplier] = useState([]);
    const [open, setOpen] = useState(false);
    const [buttonReport, setButtonReport] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);
    const [catalog, setCatalog] = useState([]);
    /* ESTADOS PARA EL CONTROL DE VOZ */
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

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])


    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));


    /* { resolver: yupResolver(validationSchema) } */



    const [state1, setState1] = useState({
        checkedA: true,
        checkedB: false
    });
    const [state2, setState2] = useState({
        checkedA: true,
        checkedB: false,
        checkedC: true
    });
    const [state3, setState3] = useState({
        checkedA: true,
        checkedB: true,
        checkedC: false
    });
    const handleSwitchChange1 = (event) => {
        setState1({ ...state1, [event.target.name]: event.target.checked });
    };
    const handleSwitchChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
    };
    const handleSwitchChange3 = (event) => {
        setState3({ ...state3, [event.target.name]: event.target.checked });
    };

    const [congenitos, setCongenitos] = useState(false);



    const handleClearController = () => {

        setCongenitos(false);

    }




    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
        checkedC: false,
        checkedD: false,
        checkedE: false
    });
    const handleChangeState = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    useEffect(() => {
        handleListen();
    }, [isListening])


    return (

        <Grid container>
            <Grid item xs={12}>


                <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES PATALÓGICOS</Typography>}>

                    <Grid container xs={12} spacing={2} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="1. Congenitos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="2. Inmunoprevenible"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputCheck
                                label="3. Infecciosos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="4. Ojos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={2}>
                            <InputCheck
                                label="5. Agudeza Visual"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="6. Oidos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>


                    <Grid container xs={12} spacing={2} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="7. Nasofaringe"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="8. Cardiovascular"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputCheck
                                label="9. Pulmonar"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="10. Gastrointestinal"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={2}>
                            <InputCheck
                                label="11. Genitourinario"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="12. Neurológico"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>



                    <Grid container xs={12} spacing={2} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="13. Trastornos de piel"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="14. Osteomusculares"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputCheck
                                label="15. Alérgicos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="16. Tóxicos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={2}>
                            <InputCheck
                                label="17. Farmacólogicos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="18. Quirúrgicos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>


                    <Grid container xs={12} spacing={2} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="19. Traumático"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="20. Transfusiones"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputCheck
                                label="21. ETS"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="22. Deformidades"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={2}>
                            <InputCheck
                                label="23. Psiquiatrico"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="24. Farmacodependencia"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                    </Grid>

                    <Grid container xs={12} spacing={2} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="25. E.M."
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="26. Renal"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <InputCheck
                                label="27. Asma"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={2}>
                            <InputCheck
                                label="28. O.R.L."
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={2}>
                            <InputCheck
                                label="29. Cancer"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>

                    <Grid item xs={12}>
                        <InputArea
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
                        <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>
                            <Grid item xs={2}>
                                <Tooltip title="Plantilla de texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <ListAltSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>

                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => setNote('')}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>

                            </Grid>

                            <Grid item xs={2}>
                                <Tooltip title="Audio">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setIsListening(prevState => !prevState)}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <SettingsVoiceIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="Ver Historico ">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <AddBoxIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>

                </SubCard >


            </Grid>

            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">ACCIDENTES DE TRABAJO / ENFERMEDAD LABORAL</Typography>}>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="ano"
                                    label="Ańo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={12}>
                            <InputArea
                                rows={4}
                                label="Especifique"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>





                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={3} container xs={12} sx={{ pt: 2 }}>
                            <Grid item xs={2}>
                                <Tooltip title="Plantilla de texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <ListAltSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>

                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => setNote('')}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>

                            </Grid>

                            <Grid item xs={2}>
                                <Tooltip title="Audio">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setIsListening(prevState => !prevState)}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <SettingsVoiceIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="Ver Historico ">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <AddBoxIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="ano1"
                                    label="Ańo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={12}>
                            <InputArea
                                rows={4}
                                label="Especifique"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>





                    </Grid>


                    <Grid item xs={12}>
                        <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>
                            <Grid item xs={2}>
                                <Tooltip title="Plantilla de texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <ListAltSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>

                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => setNote('')}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>

                            </Grid>

                            <Grid item xs={2}>
                                <Tooltip title="Audio">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setIsListening(prevState => !prevState)}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <SettingsVoiceIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="Ver Historico ">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <AddBoxIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>

                </SubCard >



            </Grid>


            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">INMUNIZACIONES</Typography>}>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >

                        <Grid item xs={12} >
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setSupplierArray(value)}
                                value={supplierArray}
                                label="Vacuna"
                                options={lsSupplier}
                            />
                        </Grid>




                    </Grid>




                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="ano1"
                                    label="Ańo"
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
                                    name="ano2"
                                    label="Ańo"
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
                                    name="ano3"
                                    label="Ańo"
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
                                    name="ano4"
                                    label="Ańo"
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
                                    name="ano5"
                                    label="Ańo"
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
                                    name="ano6"
                                    label="Ańo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>






                    </Grid>



                </SubCard >



            </Grid>



            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">HÁBITOS</Typography>}>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >



                        <Grid item xs={2} >
                            <InputCheck
                                label="Fuma"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="cigarrillosalldía"
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
                                    name="ano"
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
                                    name="meses"
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
                                    name="observacionfuma"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>




                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Fumaba"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="cigarrillosalldía"
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
                                    name="ano"
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
                                    name="meses"
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
                                    name="observacionfumaba"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>



                    </Grid>



                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Practica Deporte"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="frecuenciadeporte"
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
                                    name="cualdeporte"
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
                                    name="observaciondeporte"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>



                    </Grid>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Hobby/Pasatiempos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>

                        <Grid item xs={10} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="cualhobby"
                                    label="Cual"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>






                    </Grid>




                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Consume Bebidas Alcohólicas?"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="Frecuenciabebidas"
                                    label="Frecuencia de Bebidas"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={8} >

                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="cualbebida"
                                    label="Cual"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>


                        </Grid>







                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Fobias"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={5} >
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setSupplierArray(value)}
                                value={supplierArray}
                                label="Tipo de Fobia"
                                options={lsSupplier}
                            />
                        </Grid>


                        <Grid item xs={5} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="cualfobia"
                                    label="Cual"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>


                        </Grid>







                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Heredofamiliar"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={5} >
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setSupplierArray(value)}
                                value={supplierArray}
                                label="Parentesco"
                                options={lsSupplier}
                            />
                        </Grid>


                        <Grid item xs={5} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="cualheredofamiliar"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>


                        </Grid>







                    </Grid>






                </SubCard >



            </Grid>




            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">GINECO OBSTÉTRICOS</Typography>}>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >



                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="menarquia"
                                    label="Menarquía (EDAD)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ciclos"
                                    label="Ciclos"
                                    defaultValue=""
                                    options={catalog}
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
                                    name="duracion"
                                    label="Duración (DIAS)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>



                        <Grid item xs={2} >
                            <InputCheck
                                label="Amenorrea"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />

                        </Grid>


                        <Grid item xs={2} >
                            <InputCheck
                                label="Dismenorrea"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />

                        </Grid>

                        <Grid item xs={2} >
                            <InputCheck
                                label="Leucorrea"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />

                        </Grid>



                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >




                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="vidamaritalaños"
                                    label="Vida Marital (EDAD EN AÑOS)"
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
                                    name="vidaobstetrica"
                                    label="Vida Obstétrica (EDAD EN AÑOS)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>

                        <Grid item xs={1} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="g"
                                    label="G"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>

                        <Grid item xs={1} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="p"
                                    label="P"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>
                        <Grid item xs={1} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="a"
                                    label="A"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>
                        <Grid item xs={1} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="c"
                                    label="C"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>
                        <Grid item xs={1} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="V"
                                    label="V"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>




                    </Grid>



                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fup"
                                    label="FUP"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fur"
                                    label="FUR"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <InputCheck
                                label="ETS"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>



                        <Grid item xs={6} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="cual"
                                    label="Cúal?"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>



                    </Grid>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2} >
                            <InputCheck
                                label="Quiste de Ovarios-Miomas"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>

                        <Grid item xs={2} >
                            <InputCheck
                                label="Endometriosis"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={1} >
                            <InputCheck
                                label="EPI"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={1} >
                            <InputCheck
                                label="Planifica"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />



                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="metodo"
                                    label="Método"
                                    defaultValue=""
                                    options={catalog}
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
                                    name="ultimoañocitologia"
                                    label="Ultimo Año Citologia."
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultado"
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



            </Grid>




            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">REVISIÓN POR SISTEMAS</Typography>}>

                    <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={4} >
                            <InputCheck
                                label="1. Cabeza-Cefalea"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="2. Ojos(A. Visual, dolor, congestion, etc)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputCheck
                                label="3. Oidos(A. Auditiva, dolor, secreción)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="4. Nariz (Congestión, epistaxis, rinorrea)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={4}>
                            <InputCheck
                                label="5. Boca (eraciones, sangrado de encias)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="6. Garganta (Dolor, ardor, disfagia, disfonía)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>


                    <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={4} >
                            <InputCheck
                                label="7. Cuello (Dolor, torticolis, opatías)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="8. Cardio-Respiratorio"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <InputCheck
                                label="9. Gastrointestinal"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="10. GenitoUrinario"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={4}>
                            <InputCheck
                                label="11. Osteo-Articular"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="12.Neuro-Muscular"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>



                    <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={4} >
                            <InputCheck
                                label="13. Piel y Anexos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={4}>
                            <InputCheck
                                label="14. Psiquiátrico"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                    </Grid>


                    <Grid item xs={12}>
                        <InputArea
                            rows={4}
                            label="Observaciones"
                            placeholder="Esperando dictado..."
                            name="inputArea"
                            size={matchesXS ? 'small' : 'medium'}
                            value={note}
                            onChange={(e) => setNote(e?.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={4} container xs={12} sx={{ pt: 2 }}>
                            <Grid item xs={2}>
                                <Tooltip title="Plantilla de texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <ListAltSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>

                                <AnimateButton>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => setNote('')}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
                                </AnimateButton>

                            </Grid>

                            <Grid item xs={2}>
                                <Tooltip title="Audio">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setIsListening(prevState => !prevState)}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <SettingsVoiceIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="Ver Historico ">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log("Funcion")}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <AddBoxIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>

                </SubCard >


            </Grid>



            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">EXAMEN FÍSICO</Typography>}>


                    <Grid item lg={12} sx={{ pt: 2 }} spacing={2}>
                        <SubCard
                            title="Signos Vitales"
                            secondary={
                                <Button>
                                    <IconEdit stroke={1.5} size="1.3rem" />
                                </Button>
                            }
                        >


                            <Grid container spacing={12} alignItems="center">






                                <Grid item xs zeroMinWidth>


                                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >




                                        <Grid item xs={4} >
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    type="number"
                                                    name="tasentado"
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
                                                    name="taacostado"
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
                                                    name="pulso"
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
                                                    name="fc"
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
                                                    name="fr"
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
                                                    name="temperatura"
                                                    label="Temperatura"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>

                                        </Grid>




                                    </Grid>

                                </Grid>


                            </Grid>






                        </SubCard>
                    </Grid>



                    <Grid item lg={12} sx={{ pt: 2 }} spacing={2}>
                        <Grid container direction="column" spacing={gridSpacing}>
                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <SubCard
                                    title="Antropometria"
                                    secondary={
                                        <Button>
                                            <IconEdit stroke={1.5} size="1.3rem" />
                                        </Button>
                                    }
                                >
                                    <Grid container direction="column" spacing={2}>

                                        <Grid item xs zeroMinWidth>


                                            <Grid container xs={12} spacing={2} sx={{ pb: 1, pt: 2 }}  >




                                                <Grid item xs={2} >
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue=""
                                                            fullWidth
                                                            type="number"
                                                            name="pesokilo"
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
                                                            name="tallametros"
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
                                                            name="imc"
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
                                                            name="clasificacion"
                                                            label="Clasificación"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>

                                                </Grid>

                                                <Grid item xs={3} >
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="biotipo"
                                                            label="Biotipo"
                                                            defaultValue=""
                                                            options={catalog}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>

                                                </Grid>


                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </SubCard>
                            </Grid>

                        </Grid>
                    </Grid>








                    <Grid item lg={12} sx={{ pt: 2 }} spacing={2}>
                        <SubCard
                            title="Exploración Morfologica"
                            secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>

                            <Grid container xs={12} spacing={2} sx={{ pb: 0.5, pt: 0.5 }}   >

                                <Grid item xs={3} >
                                    <InputCheck
                                        label="1. Estado Nutricional"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="2. Piel-Faneras"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="3. Craneo"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="4. Parpados"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>








                            </Grid>


                            <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="5. Conjuntivas"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="6. Corneas"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3} >
                                    <InputCheck
                                        label="7. Pupilas"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="8. Reflejo Fotomotors"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="9. Reflejo Corneal"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="10. Fondo Ojos"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>




                                <Grid item xs={3}>
                                    <InputCheck
                                        label="11. Inspección Externa Oidos"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="12. Otoscopia"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>



                            </Grid>

                            <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                                <Grid item xs={3} >
                                    <InputCheck
                                        label="13. Inpección Externa de Nariz"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="14. Rinoscopia"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="15. Labios"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="16. Mucosa Oral"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>







                            </Grid>


                            <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="17. Encias"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="18. Paladar"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3} >
                                    <InputCheck
                                        label="19. Dientes"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="20. Lengua"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="21. Faringe"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="22. Amigdalas"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>




                                <Grid item xs={3}>
                                    <InputCheck
                                        label="23. Cuello Tiroides"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="24. Inspección de Torax-Mamas"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                                <Grid item xs={3} >
                                    <InputCheck
                                        label="25. Auscultación Cardiaca"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="26. Auscultación Respiratoria"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="27. Inspección Abdomen"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="28. Palpación Abdomen"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>




                                <Grid item xs={3}>
                                    <InputCheck
                                        label="29. Exploración Higado"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <InputCheck
                                        label="30. Exploración de Bazo"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="31. Exploración Riñones"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="32. Anillos Inguinales"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="33. Anillo Umbilical"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="34. Genitales Externos"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="35. Región Anal"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="36. Tacto Rectal"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="37. Tacto Vaginal"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="38. Extremidades Superiores"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="39. Extremidades Inferiores"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="40. Pulsos"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="41. Columna Vertebral"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputCheck
                                        label="42. Articulaciones"
                                        size={30}
                                        checked={congenitos}
                                        onChange={(event) => setCongenitos(event.target.checked)}
                                    />
                                </Grid>




                            </Grid>

                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <InputArea
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
                                <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <AnimateButton>
                                            <Tooltip title="Borrar texto">
                                                <Fab
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setNote('')}
                                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                >
                                                    <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                </Fab>
                                            </Tooltip>
                                        </AnimateButton>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Historico ">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </SubCard>
                    </Grid>




                </SubCard >
            </Grid>




            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">EXPLORACIÓN FUNCIONAL</Typography>}>

                    <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={3} >
                            <InputCheck
                                label="1. Movilidad Ocular"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="2. Equilibrio"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="3. Marcha Coordinación"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="4. Movilidad Hombro"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>








                    </Grid>


                    <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={3}>
                            <InputCheck
                                label="5. Movilidad Codo"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="6. Movilidad Muñeca"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3} >
                            <InputCheck
                                label="7. Signo de Tinel"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="8. Signo de Phalen"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="9. Movilidad Manos"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="10. Movilidad Cadera"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={3}>
                            <InputCheck
                                label="11. Movilidad Rodilla"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="12. Movilidad Tobillo"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>



                    </Grid>



                    <Grid container xs={12} spacing={1} sx={{ pb: 0.5, pt: 0.5 }}  >

                        <Grid item xs={3} >
                            <InputCheck
                                label="13. Movilidad Cuello (C1-C4)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="14. ROT Bicipital (C5)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="15. ROT Rotuliano (L4)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="16. Extencion Primer Artejo (L5)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="17. Sensibilidad cara anterior pie (L5)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="18. Eversión Pie(S1)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputCheck
                                label="19. Sensibilidad cara lateral pie (L5)"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>




                        <Grid item xs={3}>
                            <InputCheck
                                label="20. ROT Aquiliano"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="21. Signo de la Laségue"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>


                        <Grid item xs={3}>
                            <InputCheck
                                label="22. Indice Wells"
                                size={30}
                                checked={congenitos}
                                onChange={(event) => setCongenitos(event.target.checked)}
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>

                            <Grid item xs={12} spacing={4}>
                                <InputArea
                                    rows={4}
                                    label="Observaciones"
                                    placeholder="Esperando dictado..."
                                    name="inputArea"
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={note}
                                    onChange={(e) => setNote(e?.target.value)}
                                />
                            </Grid>




                            <Grid item xs={12}>
                                <Grid spacing={4} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <AnimateButton>
                                            <Tooltip title="Borrar texto">
                                                <Fab
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setNote('')}
                                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                >
                                                    <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                </Fab>
                                            </Tooltip>
                                        </AnimateButton>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Historico ">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </SubCard >


            </Grid>





            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">EXÁMENES PARACLÍNICOS</Typography>}>




                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharx"
                                    label="Rx de Torax(Criterios OIT)"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorx"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharE"
                                    label="Espirometria"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorE"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharA"
                                    label="Audiometria"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorA"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharV"
                                    label="Visiometria"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorV"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>


                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharc"
                                    label="Laboratorio Clinico"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorc"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>



                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharcs"
                                    label="Cuestionario de Sintomas Respiratorios"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorcs"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>



                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharcekg"
                                    label="EKG"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorcekg"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>



                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharcrnm"
                                    label="RNM-Columna Lumbosacra"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorcrnm"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>



                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 2 }}  >

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputDatePick
                                    defaultValue=""
                                    name="fecharcrnmCC"
                                    label="RNM-Columna Cervical"
                                    value={valueFechaNaci}
                                    onChange={(newValue) => {
                                        setFechaNaci(newValue);
                                    }}
                                />
                            </FormProvider>
                        </Grid>


                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="resultadorcrnmCC"
                                    label="Resultado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>


                        <Grid item xs={4} >
                            <InputArea
                                label="Observaciones"
                                placeholder="Esperando dictado..."
                                name="inputArea"
                                size={matchesXS ? 'small' : 'medium'}
                                value={note}
                                onChange={(e) => setNote(e?.target.value)}
                            />
                        </Grid>




                        <Grid item xs={1}>
                            <Tooltip title="Plantilla de texto">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <ListAltSharpIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>

                            <AnimateButton>
                                <Tooltip title="Borrar texto">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => setNote('')}
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <RemoveCircleOutlineSharpIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </AnimateButton>

                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="Audio">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsListening(prevState => !prevState)}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <SettingsVoiceIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Ver Historico ">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => console.log("Funcion")}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddBoxIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                        </Grid>






                    </Grid>

                    <Grid item xs={12} spacing={4}>
                                <InputArea
                                    rows={4}
                                    label="Observaciones"
                                    placeholder="Esperando dictado..."
                                    name="inputArea"
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={note}
                                    onChange={(e) => setNote(e?.target.value)}
                                />
                            </Grid>




                            <Grid item xs={12}>
                                <Grid spacing={4} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <AnimateButton>
                                            <Tooltip title="Borrar texto">
                                                <Fab
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setNote('')}
                                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                >
                                                    <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                </Fab>
                                            </Tooltip>
                                        </AnimateButton>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Historico ">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>


                </SubCard >



            </Grid>



            <Grid item xs={12} sx={{ pt: 2 }}>


                <SubCard darkTitle title={<Typography variant="h4">IMPRESIÓN DIAGNÓSTICA Y CONCEPTO FINAL</Typography>}>

                    <Grid container xs={12} spacing={3} sx={{ pb: 1, pt: 1 }}  >

                        <Grid item xs={12} >
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setSupplierArray(value)}
                                value={supplierArray}
                                label="DX"
                                options={lsSupplier}
                            />
                        </Grid>




                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>

                            <Grid item xs={12} spacing={4}>
                                <InputArea
                                    rows={4}
                                    label="Observaciones"
                                    placeholder="Esperando dictado..."
                                    name="inputArea"
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={note}
                                    onChange={(e) => setNote(e?.target.value)}
                                />
                            </Grid>




                            <Grid item xs={12}>
                                <Grid spacing={4} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <AnimateButton>
                                            <Tooltip title="Borrar texto">
                                                <Fab
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setNote('')}
                                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                >
                                                    <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                </Fab>
                                            </Tooltip>
                                        </AnimateButton>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Historico ">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>

                            <Grid item xs={12} spacing={4}>
                                <InputArea
                                    rows={4}
                                    label="Recomendaciones"
                                    placeholder="Esperando dictado..."
                                    name="inputArea"
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={note}
                                    onChange={(e) => setNote(e?.target.value)}
                                />
                            </Grid>




                            <Grid item xs={12}>
                                <Grid spacing={4} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <AnimateButton>
                                            <Tooltip title="Borrar texto">
                                                <Fab
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setNote('')}
                                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                >
                                                    <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                </Fab>
                                            </Tooltip>
                                        </AnimateButton>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Historico ">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>

                   


                            <Grid item xs={12} spacing={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="conceptoaptitudpsicoFisica"
                                    label="Concepto de Aptitud PsicoFisica"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>

                        </Grid>



                            <Grid item xs={12}>
                                <Grid spacing={4} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
                                        <Tooltip title="Plantilla de texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <ListAltSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>

                                        <AnimateButton>
                                            <Tooltip title="Borrar texto">
                                                <Fab
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => setNote('')}
                                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                >
                                                    <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                </Fab>
                                            </Tooltip>
                                        </AnimateButton>

                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Audio">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Historico ">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <AddBoxIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </SubCard >



            </Grid>


        </Grid>

    );
};

export default Emo;