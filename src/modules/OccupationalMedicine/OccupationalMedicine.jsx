// Import de Material-ui
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
    Box, Tab, Tabs
} from '@mui/material';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';


// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import { GetAllBySegAfectado, GetAllBySegAgrupado, GetAllBySubsegmento, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format'
import Accordion from 'components/accordion/Accordion';
import ModalChildren from 'components/form/ModalChildren';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultData } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import SubCard from 'ui-component/cards/SubCard';
import InputOnChange from 'components/input/InputOnChange';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import Supplier from 'modules/Supplier/Supplier';

// Import del subcomponentes
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

// TAB DE LOS PANELES
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

// OPCIONES DEL TABS
const tabsOption = [
    {
        label: 'Información Laboral',
        icon: <PermIdentityIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Calificación EPS',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Calificación ARL',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'JRC',
        icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'JNC',
        icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Instancia Final',
        icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Estado ARL',
        icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Resultado Investigación Laboral',
        icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

const MedicalAdvice = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsResumenCaso, setLsResumenCaso] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsEntidadMotiEnvio, setLsEntidadMotiEnvio] = useState([]);
    const [lsEntidadDondeEnvia, setLsEntidadDondeEnvia] = useState([]);
    const [lsInvestigado, setLsInvestigado] = useState([]);
    const [medicalAdvice, setMedicalAdvice] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [subsegmento, setSubsegmento] = useState('');
    const [lsCie11, setLsCie11] = useState([]);

    const [imgSrc, setImgSrc] = useState(null);
    const [value, setValue] = useState(0);
    const [clickAttend, setClickAttend] = useState(false);
    const [open, setOpen] = useState(false);

    const [document, setDocument] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [escolaridad, setEscolaridad] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [sede, setSede] = useState('');
    const [fechaNaci, setFechaNaci] = useState(null);
    const [genero, setGenero] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [contacto, setContacto] = useState('');
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [fechaContrato, setFechaContrato] = useState(null);
    const [tipoContrato, setTipoContrato] = useState('');
    const [payStatus, setPayStatus] = useState('');
    const [type, setType] = useState('');
    const [rosterPosition, setRosterPosition] = useState('');
    const [generalPosition, setGeneralPosition] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [area, setArea] = useState('');
    const [subArea, setSubArea] = useState('');
    const [grupo, setGrupo] = useState('');
    const [turno, setTurno] = useState('');
    const [direccionResidencia, setDireccionResidencia] = useState('');
    const [dptoResidencia, setDptoResidencia] = useState('');
    const [municipioResidencia, setMunicipioResidencia] = useState('');
    const [municipioNacido, setMunicipioNacido] = useState('');
    const [dptoNacido, setDptoNacido] = useState('');
    const [eps, setEps] = useState('');
    const [afp, setAfp] = useState('');

    const [fechaRetiro, setFechaRetiro] = useState(new Date());
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [fechaEnvio, setFechaEnvio] = useState(new Date());

    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);

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

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */
    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerRegion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_REGION);
            var resultRegion = lsServerRegion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRegion(resultRegion);

            const lsServerInvestigado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultInvestigado = lsServerInvestigado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInvestigado(resultInvestigado);

            const lsServerEntidadDondeEnvia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ENDON_EN);
            var resultEntidadDondeEnvia = lsServerEntidadDondeEnvia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEntidadDondeEnvia(resultEntidadDondeEnvia);

            const lsServerResumenCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_RECASO);
            var resultResumenCaso = lsServerResumenCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResumenCaso(resultResumenCaso);

            const lsServerLateralidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_LATERA);
            var resultLateralidad = lsServerLateralidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsLateralidad(resultLateralidad);

            const lsServerEntidadMotiEnvio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ENMO_EN);
            var resultEntidadMotiEnvio = lsServerEntidadMotiEnvio.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEntidadMotiEnvio(resultEntidadMotiEnvio);

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

    const handleDocument = async (event) => {
        try {
            setDocument(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsQuestionnaire = await GetByIdEmployee(event?.target.value);

                    if (lsQuestionnaire.status === 200) {
                        setMedicalAdvice(lsQuestionnaire.data);
                        setImgSrc(lsQuestionnaire.data.imagenUrl);
                        setNombres(lsQuestionnaire.data.nombres);
                        setEmail(lsQuestionnaire.data.email);
                        setCelular(lsQuestionnaire.data.celular);
                        setEscolaridad(lsQuestionnaire.data.escolaridad);
                        setEmpresa(lsQuestionnaire.data.empresa);
                        setSede(lsQuestionnaire.data.sede);
                        setFechaNaci(lsQuestionnaire.data.fechaNaci);
                        setGenero(lsQuestionnaire.data.genero);
                        setEstadoCivil(lsQuestionnaire.data.estadoCivil);
                        setContacto(lsQuestionnaire.data.contacto);
                        setTelefonoContacto(lsQuestionnaire.data.telefonoContacto);
                        setFechaContrato(lsQuestionnaire.data.fechaContrato);
                        setTipoContrato(lsQuestionnaire.data.tipoContrato);
                        setPayStatus(lsQuestionnaire.data.payStatus);
                        setType(lsQuestionnaire.data.type);
                        setRosterPosition(lsQuestionnaire.data.rosterPosition);
                        setGeneralPosition(lsQuestionnaire.data.generalPosition);
                        setDepartamento(lsQuestionnaire.data.departamento);
                        setArea(lsQuestionnaire.data.area);
                        setSubArea(lsQuestionnaire.data.subArea);
                        setGrupo(lsQuestionnaire.data.grupo);
                        setTurno(lsQuestionnaire.data.turno);
                        setDireccionResidencia(lsQuestionnaire.data.direccionResidencia);
                        setDptoResidencia(lsQuestionnaire.data.dptoResidencia);
                        setMunicipioResidencia(lsQuestionnaire.data.municipioResidencia);
                        setMunicipioNacido(lsQuestionnaire.data.municipioNacido);
                        setDptoNacido(lsQuestionnaire.data.dptoNacido);
                        setEps(lsQuestionnaire.data.eps);
                        setAfp(lsQuestionnaire.data.afp);
                    } else {
                        CleanCombo();
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${Message.ErrorDeDatos}`,
                            variant: 'alert',
                            alertSeverity: 'error',
                            close: false,
                            transition: 'SlideUp'
                        })
                    }
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.ErrorDocumento}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            CleanCombo();
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorDeDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const handleChangeSegAgrupado = async (event) => {
        try {
            setLsSegmentoAfectado([]); setLsSubsegmento([]); setLsCie11([]); setSegmentoAfectado('');
            setSubsegmento(''); setSegmentoAfectado(''); setSegmentoAgrupado('');
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSegmentoAfectado(resultSegAfectado);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setLsSubsegmento([]); setLsCie11([]); setSubsegmento('');
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSubsegmento(resultSubsegmento);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setLsSubsegmento([]);
        }
    }

    const handleChangeSubsegmento = async (event) => {
        try {
            setSubsegmento(event.target.value);

            const lsServerCie11 = await GetAllBySubsegmento(event.target.value, 0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setLsCie11([]);
        }
    }

    useEffect(() => {
        GetAll();
        handleListen();
    }, [isListening])

    const CleanCombo = () => {
        setClickAttend(false);
        setImgSrc(null);
        setNote(null);
        setFecha(new Date());
        setDocument('');
        setNombres('');
        setEmail('');
        setCelular('');
        setEscolaridad('');
        setEmpresa('');
        setSede('');
        setFechaNaci(null);
        setGenero('');
        setEstadoCivil('');
        setContacto('');
        setTelefonoContacto('');
        setFechaContrato(null);
        setTipoContrato('');
        setPayStatus('');
        setType('');
        setRosterPosition('');
        setGeneralPosition('');
        setDepartamento('');
        setArea('');
        setSubArea('');
        setGrupo('');
        setTurno('');
        setDireccionResidencia('');
        setDptoResidencia('');
        setMunicipioResidencia('');
        setMunicipioNacido('');
        setDptoNacido('');
        setEps('');
        setAfp('');
    }

    const handleClick = async (datos) => {
        try {
            const fechaData = FormatDate(fecha);
            const resto = "Sin Registro";
            const usuario = "Manuel Vásquez";
            const dateNow = FormatDate(new Date());
            const DataToInsert = PostMedicalAdvice(document, fechaData, DefaultData.AsesoriaMedica, sede, datos.idContingencia,
                DefaultData.SinRegistro, DefaultData.SinRegistro, DefaultData.SinRegistro, datos.idTipoAsesoria, datos.idMotivo,
                DefaultData.SinRegistro, note, resto, resto, DefaultData.SinRegistro, usuario, dateNow, usuario, dateNow);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToInsert);
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
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="">
            <Grid container xs={12} sx={{ pt: 0.5 }}>
                <SubCard darkTitle title={<><Typography variant="h4">DATOS DEL PACIENTE</Typography></>}>
                    <Grid container xs={12} spacing={2} sx={{ pb: 3, pt: 3 }}>
                        <Grid item xs={3}>
                            <PhotoModel
                                disabledCapture
                                disabledDelete
                                EstadoImg={imgSrc}
                            />
                        </Grid>
                        <Grid container spacing={2} item xs={9}>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="N° Documento"
                                    onKeyDown={handleDocument}
                                    onChange={(e) => setDocument(e?.target.value)}
                                    value={document}
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Nombres"
                                    value={nombres}
                                    onChange={(e) => setNombres(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Celular"
                                    value={celular}
                                    onChange={(e) => setCelular(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="escolaridad"
                                    label="Escolaridad"
                                    disabled
                                    options={catalog}
                                    value={escolaridad}
                                    onChange={(e) => setEscolaridad(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="empresa"
                                    label="Empresa"
                                    disabled
                                    options={company}
                                    value={empresa}
                                    onChange={(e) => setEmpresa(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="sede"
                                    label="Sede"
                                    disabled
                                    options={catalog}
                                    value={sede}
                                    onChange={(e) => setSede(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputDatePick
                                    label="Fecha de Nacimiento"
                                    value={fechaNaci}
                                    disabled
                                    onChange={(e) => setFechaNaci(e)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="genero"
                                    label="Genero"
                                    disabled
                                    options={catalog}
                                    value={genero}
                                    onChange={(e) => setGenero(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="estadoCivil"
                                    label="Estado Civil"
                                    disabled
                                    options={catalog}
                                    value={estadoCivil}
                                    onChange={(e) => setEstadoCivil(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Contacto"
                                    value={contacto}
                                    onChange={(e) => setContacto(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Teléfono de Contacto"
                                    value={telefonoContacto}
                                    onChange={(e) => setTelefonoContacto(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>

                <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="subtitle1" color="inherit">Ver mas...</Typography></>}>
                    <Grid item xs={12} sx={{ pt: 2, pb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <InputDatePick
                                        label="Fecha de Contrato"
                                        value={fechaContrato}
                                        disabled
                                        onChange={(e) => setFechaContrato(e)}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="tipoContrato"
                                        label="Tipo de Contrato"
                                        disabled
                                        options={catalog}
                                        value={tipoContrato}
                                        onChange={(e) => setTipoContrato(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="estado"
                                        label="Estado"
                                        disabled
                                        options={catalog}
                                        value={payStatus}
                                        onChange={(e) => setPayStatus(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Rol"
                                        label="Rol"
                                        disabled
                                        options={catalog}
                                        value={type}
                                        onChange={(e) => setType(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="rosterPosition"
                                        label="Roster Position"
                                        disabled
                                        options={catalog}
                                        value={rosterPosition}
                                        onChange={(e) => setRosterPosition(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="generalPosition"
                                        label="General Position"
                                        disabled
                                        options={catalog}
                                        value={generalPosition}
                                        onChange={(e) => setGeneralPosition(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Departamento"
                                        label="Departamento"
                                        disabled
                                        options={catalog}
                                        value={departamento}
                                        onChange={(e) => setDepartamento(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Area"
                                        label="Area"
                                        disabled
                                        options={catalog}
                                        value={area}
                                        onChange={(e) => setArea(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Subarea"
                                        label="Subarea"
                                        disabled
                                        options={catalog}
                                        value={subArea}
                                        onChange={(e) => setSubArea(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Grupo"
                                        label="Grupo"
                                        disabled
                                        options={catalog}
                                        value={grupo}
                                        onChange={(e) => setGrupo(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Turno"
                                        label="Turno"
                                        disabled
                                        options={catalog}
                                        value={turno}
                                        onChange={(e) => setTurno(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <InputOnChange
                                        label="Dirección de Residencia"
                                        value={direccionResidencia}
                                        onChange={(e) => setDireccionResidencia(e?.target.value)}
                                        disabled
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="dptoResidencia"
                                        label="Departamento de Residencia"
                                        disabled
                                        options={catalog}
                                        value={dptoResidencia}
                                        onChange={(e) => setDptoResidencia(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="municipioResidencia"
                                        label="Municipio de Residencia"
                                        disabled
                                        options={catalog}
                                        value={municipioResidencia}
                                        onChange={(e) => setMunicipioResidencia(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="municipioNacido"
                                        label="Municipio de Nacimiento"
                                        disabled
                                        options={catalog}
                                        value={municipioNacido}
                                        onChange={(e) => setMunicipioNacido(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="dptoNacido"
                                        label="Departamento de Nacimiento"
                                        disabled
                                        options={catalog}
                                        value={dptoNacido}
                                        onChange={(e) => setDptoNacido(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="EPS"
                                        label="EPS"
                                        disabled
                                        options={catalog}
                                        value={eps}
                                        onChange={(e) => setEps(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="AFP"
                                        label="AFP"
                                        disabled
                                        options={catalog}
                                        value={afp}
                                        onChange={(e) => setAfp(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Accordion>
                <Divider />

                <Grid items xs={12} sx={{ pt: 2, pb: 2 }}>
                    <Grid xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <Tabs
                                centered
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
                                        mr: 1,
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
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="resumenCaso"
                                                label="Resumen Caso"
                                                defaultValue=""
                                                options={lsResumenCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputDatePick
                                            label="Fecha Retiro"
                                            value={fechaRetiro}
                                            onChange={(e) => setFechaRetiro(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SelectOnChange
                                            name="segmentoAgrupado"
                                            label="Segmento Agrupado"
                                            onChange={handleChangeSegAgrupado}
                                            value={segmentoAgrupado}
                                            options={lsSegmentoAgrupado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SelectOnChange
                                            name="segmentoAfectado"
                                            label="Segmento Afectado"
                                            onChange={handleChangeSegAfectado}
                                            value={segmentoAfectado}
                                            options={lsSegmentoAfectado}
                                            disabled={lsSegmentoAfectado.length != 0 ? false : true}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SelectOnChange
                                            name="subsegmento"
                                            label="Subsegmento"
                                            onChange={handleChangeSubsegmento}
                                            value={subsegmento}
                                            options={lsSubsegmento}
                                            disabled={lsSubsegmento.length != 0 ? false : true}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="diagnostico"
                                                label="Diagnóstico"
                                                defaultValue=""
                                                options={lsCie11}
                                                disabled={lsCie11.length != 0 ? false : true}
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
                                                name="nroFurel"
                                                label="No. FUREL"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="region"
                                                label="Región"
                                                defaultValue=""
                                                options={lsRegion}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="lateralidad"
                                                label="Lateralidad"
                                                defaultValue=""
                                                options={lsLateralidad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="entidadaADondeEnvia"
                                                label="Entidad que motiva el envio"
                                                defaultValue=""
                                                options={lsEntidadMotiEnvio}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="EntidadDondeEnvia"
                                                label="Entidad Donde Envía"
                                                defaultValue=""
                                                options={lsEntidadDondeEnvia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputDatePick
                                            label="Fecha de Entrega"
                                            value={fechaEntrega}
                                            onChange={(e) => setFechaEntrega(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputDatePick
                                            label="Fecha de Envio"
                                            value={fechaEnvio}
                                            onChange={(e) => setFechaEnvio(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="investigado"
                                                label="Investigado"
                                                defaultValue=""
                                                options={lsInvestigado}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                multiline
                                                rows={4}
                                                name="observaciones"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <Grid xs={12} sx={{ pb: 30 }} container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="fechaCalificacion"
                                                label="Fecha Calificación"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="origenes"
                                                label="Orígenes"
                                                defaultValue=""
                                                options={catalog}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={2}>
                                <Grid xs={12} container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="nroSolicitud"
                                                label="Nro. Solicitud"
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
                                                name="fechaCalificacionOrigen"
                                                label="Fecha Calificación Origen"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="origen"
                                                label="Origen"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="fechaCalificacionPCL"
                                                label="Fecha Calificación PCL"
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
                                                name="pCL"
                                                label="% PCL"
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
                                                name="fechaEstructura"
                                                label="Fecha Estructura"
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
                                                name="fechaReCalificaciónPCL"
                                                label="Fecha ReCalificación PCL"
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
                                                name="pCLRecalificada"
                                                label="% PCL Recalificada"
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
                                                name="fechaEstructura"
                                                label="Fecha Estructura"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={3}>
                                <Grid xs={12} container spacing={2}>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="fechaCalificacionOrigen"
                                                label="Fecha Calificación Origen"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="juntaCalifica"
                                                label="Junta Califica"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="nroDictamen"
                                                label="Nro. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="origen"
                                                label="Origen"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="controversia"
                                                label="Controversia"
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
                                                name="conclusion"
                                                label="Conclusión"
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
                                                name="fechaCalificacionPCL"
                                                label="Fecha Calificación PCL"
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
                                                name="nroDictamenPCL"
                                                label="Nro. Dictamen PCL"
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
                                                name="pCL"
                                                label="PCL"
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
                                                name="fechaEstructura"
                                                label="Fecha Estructura"
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
                                                name="nroActaRecurso"
                                                label="Nro. Acta Recurso"
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
                                                name="fechaReCalificacionPCL"
                                                label="Fecha ReCalificación PCL"
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
                                                name="noDictamenRecalificacion"
                                                label="No Dictamen Recalificación"
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
                                                name="juntaRecalificacion"
                                                label="Junta Recalificación"
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
                                                name="pCLRecalificada"
                                                label="% PCL Recalificada"
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
                                                name="fechaRecalificaciónEst"
                                                label="Fecha Recalificación Est."
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={4}>
                                <Grid xs={12} container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="fechaCalificacionOrigen"
                                                label="Fecha Calificación Origen"
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
                                                name="nroDictamen"
                                                label="Nro. Dictamen"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="origen"
                                                label="Origen"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="fechaCalificacionPCL"
                                                label="Fecha Calificacion PCL"
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
                                                name="noDictamen"
                                                label="No. Dictamen"
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
                                                name="pCL"
                                                label="% PCL"
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
                                                name="fechaEstructura"
                                                label="Fecha Estructura"
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
                                                name="fechaRecalificacionPCL"
                                                label="Fecha Recalificación PCL"
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
                                                name="noDictamen"
                                                label="No. Dictamen"
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
                                                name="pCL"
                                                label="% PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={5}>
                                <Grid xs={12} container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="origen"
                                                label="Origen"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="fechaEstructuracionOrigen"
                                                label="Fecha Estructuración Origen"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="instanciaOrigen"
                                                label="Instancia Origen"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="pCLFinal"
                                                label="% PCL Final"
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
                                                name="instanciaFinal"
                                                label="Instancia Final"
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
                                                name="fechaCalificacionPCL"
                                                label="Fecha Calificación PCL"
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
                                                name="fechaEstructuracionPCL"
                                                label="Fecha Estructuracion PCL"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="indemnizado"
                                                label="Indemnizado"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="fechaPago"
                                                label="Fecha Pago"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="entregadoMIN"
                                                label="Entregado al MIN"
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
                                                name="indemnizadoRecalificado"
                                                label="Indemnizado Recalificado"
                                                defaultValue=""
                                                options={catalog}
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
                                                name="fechaPago"
                                                label="Fecha Pago"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={value} index={6}>
                                <Grid xs={12} container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="estadoRHT"
                                                label="Estado RHT"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                                rows={4}
                                                multiline
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="reintegro"
                                                label="Reintegro"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                                rows={4}
                                                multiline
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="reubicado"
                                                label="Reubicado"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                                rows={4}
                                                multiline
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="restringido"
                                                label="Restringido"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                                rows={4}
                                                multiline
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="jornadaLaboral"
                                                label="Jornada Laboral"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                                rows={4}
                                                multiline
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="indemnizacion"
                                                label="Indemnización"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                                rows={4}
                                                multiline
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pb: 3, pt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/medicaladvice/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
                <ModalChildren
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Información"
                >
                    <Supplier />
                </ModalChildren>
            </Grid>
        </MainCard >
    );
};

export default MedicalAdvice;