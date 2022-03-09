import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material';

// project imports
import Antecedentes from './Antecedentes';
import Laboral from './Laboral';
import RevisionEF from './RevisionEF';
import Paraclinicos from './Paraclinicos';
import TrabajoA from './TrabajoA';
import Framingham from './Framingham';

import Avatar from 'ui-component/extended/Avatar';
import Chip from 'ui-component/extended/Chip';
import MainCard from 'ui-component/cards/MainCard';
import ImagePlaceholder from 'ui-component/cards/Skeleton/ImagePlaceholder';
import { gridSpacing } from 'store/constant';

// assets
import { IconFriends, IconInbox, IconPhoto, IconUserPlus, IconUsers } from '@tabler/icons';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';

import User1 from 'assets/images/profile/img-user.png';
 import Cover from 'assets/images/profile/img-profile-bg.png';

// Import de Material-ui
import { useCallback, useRef } from 'react';

import {
    useMediaQuery,
    Divider,
    Tooltip,
    Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import InputArea from 'components/input/InputArea';
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
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { PostEmployee } from 'formatdata/EmployeeForm';
import SelectOnChange from 'components/input/SelectOnChange';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
//  ACORDEON 

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';


function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 0
                    }}
                >
                    {children}
                </Box>
            )}
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

const tabOptions = [
    
    {
        to: '/Occupationalexamination/Add',
        icon: <IconUsers stroke={4} size="1.1rem" />,
        label: 'Laboral'
    },
    {
        to: '/Occupationalexamination/addA',
        icon: <IconUsers stroke={4} size="1.1rem" />,
        label: 'Antecedentes'
    },
    {
        to: '/Occupationalexamination/addREF',
        icon: <IconFriends stroke={4} size="1.1rem" />,
        label: 'Revisión y Examen Físico'
        
        
    },
    {
        to: '/Occupationalexamination/addP',
        icon: <IconPhoto stroke={4} size="1.1rem" />,
        label: 'Paraclínicos y DX final'
    },
    {
        to: '/Occupationalexamination/addT',
        icon: <IconUserPlus stroke={4} size="1.1rem" />,
        label: 'Trabajo en Altura'
    },
    {
        to: '/Occupationalexamination/addF',
        icon: <IconUserPlus stroke={4} size="1.1rem" />,
        label: 'FRAMINGHAM'
    }
];

// ==============================|| SOCIAL PROFILE ||============================== //

const Occupationalexamination = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
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
    const [clickAttend, setClickAttend] = useState(false);

    /* ESTADOS PARA EL CONTROL DE VOZ */
    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);
    console.log(note);
    const [savedNotes, setSavedNotes] = useState([]);

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
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo);
            var resultMunicipio = lsServerCatalog.data.entities.map((item) => ({
                label: item.nombre,
                value: item.idCatalogo
            }));
            console.log("resultMunicipio = ", resultMunicipio);
            setMunicipio(resultMunicipio);
        } catch (error) {
            console.log(error);
        }
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
        console.log("Hola");
    }

    const handleOpenObservation = () => {
        console.log("Sirve");
    }

    const handleClickAttend = () => {
        setClickAttend(true);
    }

    const navigate = useNavigate();


    const { tab } = useParams();

    let selectedTab = 0;
    switch (tab) {
        case 'antecedentes':
            selectedTab = 1;
            break;
        case 'revisionEF':
            selectedTab = 2;
            break;
        case 'paraclinicos':
            selectedTab = 3;
            break;
        case 'trabajoA':
            selectedTab = 4;
            break;
            case 'Framingham':
                selectedTab = 5;
                break;
      case 'posts':
        default:
            selectedTab = 0;
    }
    const [value, setValue] = useState(selectedTab);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
         setLoading(false);
    }, []);

    return (
        <Grid container >
                 
                 <form onSubmit={handleSubmit(handleClick)}>
            <Grid item xs={12}>
                <MainCard
                    contentSX={{
                        p: 1.5,
                        paddingBottom: '0px !important',
                        [theme.breakpoints.down('lg')]: {
                            textAlign: 'center'
                        }
                    }}
                >
            

<SubCard darkTitle title={<><Typography variant="h4">DATOS DEL PACIENTE</Typography></>}>
                        <ModalChildren
                            open={open}
                            onClose={handleClose}
                            title="Fotografía"
                        >
                            <WebCamCapture
                                CaptureImg={CapturePhoto}
                                RemoverImg={Remover}
                                ImgSrc={imgSrc}
                                WebCamRef={WebCamRef}
                            />
                        </ModalChildren>

                        <Grid container xs={12} spacing={2} sx={{ pb: 3, pt: 3 }}>
                            <Grid item xs={3}>
                                <PhotoModel
                                    OpenModal={handleOpen}
                                    EstadoImg={imgSrc}
                                    RemoverImg={Remover}
                                />
                            </Grid>
                            <Grid container spacing={2} item xs={9}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="documento"
                                            label="Documento"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="nombres"
                                            label="Nombres"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="celular"
                                            label="Celular"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="escolaridad"
                                            label="Escolaridad"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="empresa"
                                            label="Empresa"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="sede"
                                            label="Sede"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDate
                                            defaultValue=""
                                            name="fechaNaci"
                                            label="Fecha de Nacimiento"
                                            value={valueFechaNaci}
                                            onChange={(newValue) => {
                                                setFechaNaci(newValue);
                                            }}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="estadoCivil"
                                            label="Estado civil"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="contacto"
                                            label="Contacto"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="telefonoContacto"
                                            label="Teléfono Contacto"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>

                    <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                        <Typography variant="subtitle1" color="inherit">Ver mas...</Typography></>}>
                        <SubCard darkTitle title={<><Typography variant="h4"></Typography></>}>
                            <Grid item xs={12} sx={{ pb: 3 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputDate
                                                    defaultValue=""
                                                    fullWidth
                                                    name="fechaContrato"
                                                    label="Fecha de Contrato"
                                                    value={valueFechaContrato}
                                                    onChange={(newValue) => {
                                                        setFechaContrato(newValue);
                                                    }}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="tipoContrato"
                                                    label="Tipo de Contrato"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="payStatus"
                                                    label="Estado"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="type"
                                                    label="Rol"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="rosterPosition"
                                                    label="Roster Position"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="generalPosition"
                                                    label="General Position"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="departamento"
                                                    label="Departamento"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="area"
                                                    label="Area"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="subArea"
                                                    label="Subarea"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="grupo"
                                                    label="Grupo"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="turno"
                                                    label="Turno"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="direccionResidencia"
                                                    label="Dirección de Residencia"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="dptoResidencia"
                                                    label="Departamento de Residencia"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="municipioResidencia"
                                                    label="Municipio de Residencia"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="municipioNacido"
                                                    label="Municipio de Nacimiento"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="dptoNacido"
                                                    label="Departamento de Nacimiento"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="eps"
                                                    label="EPS"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="afp"
                                                    label="AFP"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Accordion>

                    <Divider />
                    <Grid sx={{ pt: 2 }}>
                        <SubCard darkTitle title={<><Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography></>}>
                            <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
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

                                <Grid item xs={4}>
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

                                <Grid item xs={4}>
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

                                <Grid item xs={4}>
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

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="motivo"
                                            label="Motivo"
                                            defaultValue=""
                                            options={catalog}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="Peso"
                                                    label="Peso(Kilos)"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="Talla"
                                                    label="Talla(Metros)"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="IMC"
                                                    label="IMC"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="Clasificacion"
                                                    label="Clasificación"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </AnimateButton>
                                    </Grid>

                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button size="large" variant="contained" onClick={handleClickAttend} fullWidth>
                                            Atender
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    </MainCard>
            </Grid>


                    <Grid sx={{ pt: 1 }}>
                        <SubCard darkTitle title={<><Typography variant="h4">HISTORIA OCUPACIONAL</Typography></>}>
                       
                        </SubCard>
                    </Grid>


                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={3}>
                           
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={4}>
                                    {/* <Typography variant="h5">John Doe123</Typography>
                                    <Typography variant="subtitle2">Android Developer</Typography> */}
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{
                                            // justifyContent: 'flex-end',
                                            // [theme.breakpoints.down('lg')]: {
                                            //     justifyContent: 'center'
                                            // }
                                        }}
                                    >
                                        {/* <Grid item>
                                            <Button variant="outlined">Message</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" startIcon={<PersonAddTwoToneIcon />}>
                                                Send Request
                                            </Button>
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Tabs
                                    value={value}
                                    variant="scrollable"
                                    onChange={handleChange}
                                    sx={{
                                        marginTop: 2.5,
                                        '& .MuiTabs-flexContainer': {
                                            border: 'none'
                                        },
                                        '& a': {
                                            minHeight: 'auto',
                                            minWidth: 10,
                                            py: 1.5,
                                            px: 1,
                                            mr: 2.25,
                                            color: 'grey.700',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        '& a.Mui-selected': {
                                            color: 'primary.main'
                                        },
                                        '& a > svg': {
                                            marginBottom: '4px !important',
                                            mr: 1.25
                                        }
                                    }}
                                >
                                    {tabOptions.map((option, index) => (
                                        <Tab
                                            key={index}
                                            component={Link}
                                            to={option.to}
                                            icon={option.icon}
                                            label={option.label}
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </Grid>
                        </Grid>
                  
            </Grid>
            <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                    <Laboral/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Antecedentes />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RevisionEF />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Paraclinicos />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <TrabajoA />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Framingham />
                </TabPanel>
            </Grid>
            </form>
        </Grid>
    );
};

export default Occupationalexamination;
