import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box, Tab, Tabs, Button,
    Grid,
    TextField,
    useMediaQuery,
    Typography,
    Divider,
    Tooltip,
    Fab,
    Avatar
} from '@mui/material';

// project imports
import Personaldata from './Personaldata';
import Workhistory from './Workhistory';
import Antecedents from './Antecedents';
import Physicalexamination from './Physicalexamination';
import Paraclinicalfinal from './Paraclinicalfinal';
import Workatheight from './Workatheight';
import Framingham from './Framingham';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import { gridSpacing } from 'store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

// Import de Material-ui

import AddIcon from '@mui/icons-material/AddTwoTone';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyectot
import { FormatDate } from 'components/helpers/Format';
import User from 'assets/img/user.png'
import Accordion from 'components/accordion/Accordion';
import InputMultiselect from 'components/input/InputMultiselect';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertEmployee } from 'api/clients/EmployeeClient';
import { GetAllCatalog, GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDate from 'components/input/InputDate';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostEmployee } from 'formatdata/EmployeeForm';
import SelectOnChange from 'components/input/SelectOnChange';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';

// Audio
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';


// tabs panel
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

// tabs option
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
        label: 'Antecedentes',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Revisión y Examen Físico',
        icon: <MedicalInformationIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Paraclínicos y Dx Final',
        icon: <VaccinesIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Trabajo en Altura',
        icon: <TransferWithinAStationIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Framingham',
        icon: <MonitorHeartIcon sx={{ fontSize: '1.3rem' }} />
    }


];


// ==============================|| PROFILE 1 ||============================== //

const Occupationalexamination = () => {
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS ESTADOS PARA LOS COMBOS */
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsEscolaridad, setEscolaridad] = useState([]);
    const [lsMunicipio, setMunicipio] = useState([]);
    const [lsDepartamento, setDepartamento] = useState([]);
    const [lsCodigoFilter, setCodigoFilter] = useState([]);
    const [valueSelect, setValues] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [estado, setEstado] = useState(true);

    /* ESTADOS PARA EL CONTROL DE VOZ */
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

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

    const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
    }

    const [employee, setEmployee] = useState([]);

    const idEmpleado = 34;
    async function GetById() {
        try {
            const lsServer = await GetByIdEmployee(idEmpleado);
            if (lsServer.status === 200) {
                setEmployee(lsServer.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    /* ESTADOS PARA LAS FECHAS */
    const [valueFechaNaci, setFechaNaci] = useState(null);
    const [valueFechaContrato, setFechaContrato] = useState(null);
    const [valueTermDate, setTermDate] = useState(null);
    const [valueFechaModificacion, setFechaModificacion] = useState(null);
    const [valueFechaCreacion, setFechaCreacion] = useState(null);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    /* MANEJO DE MODAL */

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setEstado(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* MANEJO DE WEBCAM */
    const WebCamRef = useRef(null);

    const CapturePhoto = useCallback(() => {
        const imageSrc = WebCamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [WebCamRef, setImgSrc]);

    const Remover = () => {
        setImgSrc(null);
    }

    /* EVENTO DE FILTRAR COMBO DEPARTAMENTO */
    async function GetSubString(codigo) {
        const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo);
        var resultMunicipio = lsServerCatalog.data.entities.map((item) => ({
            label: item.nombre,
            value: item.idCatalogo
        }));
        console.log("resultMunicipio = ", resultMunicipio);
        setMunicipio(resultMunicipio);
    }



    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            console.table(resultCatalogo);
            setCatalog(resultCatalogo);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, 1077);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartamento(resultDepartamento);
            setCodigoFilter(lsServerDepartamento.data.entities);

            const lsServerEscolaridad = await GetAllByTipoCatalogo(0, 0, 1146);
            var resultEscolaridad = lsServerEscolaridad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEscolaridad(resultEscolaridad);

            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
        handleListen();
        GetById();
    }, [isListening])

    const CleanCombo = () => {
        setFechaNaci(null);
        setFechaContrato(null);
        setTermDate(null);
        setFechaModificacion(null);
        setFechaCreacion(null);
    }

    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        try {
            console.log("dptoNacido = ", datos.dptoNacido);


            const FechaNaci = FormatDate(valueFechaNaci);
            const FechaContrato = FormatDate(valueFechaContrato);
            const TermDate = FormatDate(valueTermDate);
            const FechaModificacion = FormatDate(valueFechaModificacion);
            const FechaCreacion = FormatDate(valueFechaCreacion);

            const DataToInsert = PostEmployee(datos.documento, datos.nombres, FechaNaci, datos.type, datos.departamento,
                datos.area, datos.subArea, datos.grupo, datos.municipioNacido, datos.dptoNacido, FechaContrato,
                datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
                datos.direccionResidencia, datos.municipioResidencia, datos.dptoResidencia, datos.celular, datos.eps,
                datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
                datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, TermDate,
                datos.bandera, datos.ges, datos.usuarioModifica, FechaModificacion, datos.usuarioCreacion,
                FechaCreacion, imgSrc);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertEmployee(DataToInsert);
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
                    CleanCombo();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickFab = () => {
        console.log("Eventos");
    }

    const navigate = useNavigate();



    return (
        <MainCard>
            <Grid container xs={12} sx={{ pt: 0.5 }}>
                <form onSubmit={handleSubmit(handleClick)}>
                    {/* <Grid container spacing={gridSpacing}> */}

                    <SubCard darkTitle title={<><Typography variant="h4">DATOS DEL PACIENTE</Typography></>}>
                        <Grid container xs={12} spacing={2} sx={{ pb: 3, pt: 3 }}>

                            <Grid item xs={3}>
                                <Grid container xs={12}>
                                    <Grid item xs={6}>
                                        <Avatar sx={{ width: 80, height: 80 }} src={User} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField fullWidth id="standard-basic" label="Documento" variant="standard" />
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid item xs={5}>
                                <Typography variant="h2" component="div">
                                    {employee.nombres}
                                </Typography>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                    <Typography variant="h6">{employee.nameGenero} - </Typography>
                                    <Typography variant="h6"> {employee.fechaNaci}</Typography>
                                </Grid>

                            </Grid>


                            {/* <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="genero"
                                        label="Genero"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="edad"
                                        label="Edad"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid> */}












                        </Grid>


                    </SubCard>



                    <SubCard darkTitle title={
                        <>
                            <Typography variant="h3">REGISTRAR LA  ATENCIÓN</Typography>

                        </>

                    } >




                        <Grid container spacing={4} sx={{ pb: 6 }}>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputDate
                                        defaultValue=""
                                        name="fechaatencion"
                                        label="Fecha"
                                        value={valueFechaNaci}
                                        onChange={(newValue) => {
                                            setFechaNaci(newValue);
                                        }}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="atencion"
                                        label="Atención"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="contingencia"
                                        label="Contingencia"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="turno"
                                        label="Turno"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="diaturno"
                                        label="Día del Turno"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <AnimateButton>
                                        <Button size="large" variant="contained" type="submit" fullWidth>
                                            Historia clinica
                                        </Button>
                                    </AnimateButton>
                                </FormProvider>
                            </Grid>


                        </Grid>
                    </SubCard>

                    <Grid item xs={12}>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
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
                            <Personaldata />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Workhistory />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Antecedents />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Physicalexamination />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Paraclinicalfinal />
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <Workatheight />
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            <Workatheight />
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            <Workatheight />
                        </TabPanel>
                        <TabPanel value={value} index={8}>
                            <Framingham />
                        </TabPanel>
                    </Grid>
                    {/* </Grid> */}
                </form>
            </Grid>
        </MainCard>
    );
};

export default Occupationalexamination;
