// Import de Material-ui
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
    Box, Tab, Tabs
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format';
import Accordion from 'components/accordion/Accordion';
import ModalChildren from 'components/form/ModalChildren';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultData } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import SubCard from 'ui-component/cards/SubCard';
import InputOnChange from 'components/input/InputOnChange';

import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import UserCountCard from 'ui-component/cards/UserCountCard';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';

// Audio
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const MedicalAdvice = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS ESTADOS PARA LOS DIFERENTES USOS */
    const [document, setDocument] = useState('');
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);

    const [lsDeparta, setLsDeparta] = useState([]);
    const [departa, setDeparta] = useState('');
    const [lsMunicipio, setMunicipioE] = useState([]);

    const [departaMedico, setDepartaMedico] = useState('');
    const [lsMunicipioMedico, setMunicipioMedico] = useState([]);

    const [lsCodigoFilterDpto, setCodigoFilterDpto] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [atencion, setAtencion] = useState([]);
    const [medicalAdvice, setMedicalAdvice] = useState([]);

    const [imgSrc, setImgSrc] = useState(null);
    const [clickAttend, setClickAttend] = useState(false);
    const [open, setOpen] = useState(false);

    /* MIL Y UN ESTADOS */
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

    /* ESTADOS PARA EL CONTROL DE VOZ */
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

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDeparta(resultDepartamento);
            setCodigoFilterDpto(lsServerDepartamento.data.entities);

            const lsServerAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SaludOcupacional_Atencion);
            var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setAtencion(resultAtencion);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SaludOcupacional_Motivo);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

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

    /* METODO PADRE DE TRAER DATOS */
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

    /* METODO PARA FILTRAR DEPARTAMENTO Datos de Incapacidad o Licencia */
    const handleChangeDepartamentoIncapa = async (event) => {
        try {
            setDeparta(event.target.value);

            var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var lsServerDepartamento = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 2);

            var resultMunicipio = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setMunicipioE(resultMunicipio);
        } catch (error) {
            console.log(error);
        }
    };

    /* METODO PARA FILTRAR DEPARTAMENTO Datos del Medico o IPS Prestadora del Servicio */
    const handleChangeDepartamentoMedico = async (event) => {
        try {
            setDepartaMedico(event.target.value);

            var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var lsServerDepartamento = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 2);

            var resultMunicipio = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setMunicipioMedico(resultMunicipio);
        } catch (error) {
            console.log(error);
        }
    };

    /* EL useEffect QUE LLENA LA LISTA */
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

    const handleAtender = () => {
        if (document === '') {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorDocumento}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        } else if (medicalAdvice.length === 0) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorNoHayDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        } else
            setClickAttend(true);
    }

    /* METODO DE INSERT  */
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

    const dias = 200;

    return (
        <MainCard title="">
            <Grid container xs={12} sx={{ pt: 0.5 }}>
                <form>
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

                    <Typography sx={{ pb: 2, pt: 3 }} variant="h4">DATOS DE LA EMPRESA QUE EXPIDE</Typography>

                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="incapacidad"
                                    label="Incapacidad"
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
                                    name="nroIncapacidad"
                                    label="Nro. de Incapacidad"
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
                                    name="fechaExpedición"
                                    label="Fecha de Expedición"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <SelectOnChange
                                name="departamento"
                                label="Departamento"
                                options={lsDeparta}
                                size={matchesXS ? 'small' : 'medium'}
                                value={departa}
                                onChange={handleChangeDepartamentoIncapa}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ciudadExpedicion"
                                    label="Ciudad de Expedición"
                                    defaultValue=""
                                    options={lsMunicipio}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2, pt: 3 }} variant="h4">DATOS DE INCAPACIDAD O LICENCIA</Typography>

                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="tipoIncapacidad"
                                    label="Tipo de Incapacidad"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
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
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="fechaInicio"
                                    label="Fecha de Inicio"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="fechaFin"
                                    label="Fecha Fin"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="diasIncapacidad"
                                    label="Días de Incapacidad"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="codigoDx"
                                    label="Código Dx"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={9.6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="diagnostico"
                                    label="Diagnóstico"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="estadoCaso"
                                    label="Estado de Caso"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="segmentoAgrupado"
                                    label="Segmento Agrupado"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="segmento"
                                    label="Segmento"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="tipoSoporte"
                                    label="Tipo de Soporte"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="Categoria"
                                    label="categoria"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2, pt: 3 }} variant="h4">DATOS DEL MÉDICO O IPS PRESTADORA DEL SERVICIO</Typography>

                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={4.8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="proveedor"
                                    label="Proveedor"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <SelectOnChange
                                name="departamento"
                                label="Departamento"
                                options={lsDeparta}
                                size={matchesXS ? 'small' : 'medium'}
                                value={departaMedico}
                                onChange={handleChangeDepartamentoMedico}
                            />
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ciudad"
                                    label="Ciudad"
                                    defaultValue=""
                                    options={lsMunicipioMedico}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="nombreProfesional"
                                    label="Nombre de Profesional"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="profesionEspecialidad"
                                    label="Profesión/Especialidad"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="regProfesional"
                                    label="Reg. Profesional"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="tipoAtencion"
                                    label="Tipo de Atención"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="cumplimientoRequisito"
                                    label="Cumplimiento Requisito"
                                    defaultValue=""
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="redExpide"
                                    label="Red que expide"
                                    defaultValue=""
                                    options={catalog}
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
                                    name="observacionCumplimiento"
                                    label="Observacion Cumplimiento"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                    multiline
                                    rows={4}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2, pt: 3 }} variant="h4">OBSERVACIÓN/DESCRIPCIÓN DE LA NOVEDAD</Typography>

                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="observacionDescripcion"
                                    label="Observación/Descripción"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                    multiline
                                    rows={4}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="usuarioModifica"
                                    label="Usuario Modifica"
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
                                    name="fechaModifica"
                                    label="Fecha Modifica"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Typography sx={{ pb: 2, pt: 3 }} variant="h4">MONITOR DE EVENTOS</Typography>

                    <Grid container spacing={2} sx={{ pb: 2, pl: 4 }}>
                        <Grid item xs={2}>
                            <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.main }} />
                            <Typography variant="h6">De 75 a 90 Días</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.dark }} />
                            <Typography variant="h6">De 90 a 180 Días</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <RadioButtonCheckedTwoToneIcon color='error' />
                            <Typography variant="h6">{'> 180 Días'}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ pb: 2, pt: 3, pl: 4 }}>
                        <Grid item xs={6}>
                            <UserCountCard
                                primary="TOTAL DÍAS ACUMULADO EN INCAPACIDAD"
                                secondary="0"
                                iconPrimary={AccountCircleTwoTone}
                                color={dias <= 90 ? theme.palette.warning.main : dias <= 180 ? theme.palette.warning.dark : theme.palette.error.main}
                            />
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
                </form>
            </Grid>
        </MainCard >
    );
};

export default MedicalAdvice;