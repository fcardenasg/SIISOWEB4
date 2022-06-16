// Terceros
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
    Tooltip,
    Fab
} from '@mui/material';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

// Import del Proyecto
import { PutMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import { GetByIdAdvice, UpdateAdvices } from 'api/clients/AdviceClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputOnChange from 'components/input/InputOnChange';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputDatePick from 'components/input/InputDatePick';
import InputArea from 'components/input/InputArea';
import Accordion from 'components/accordion/Accordion';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultData } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import Cargando from 'components/loading/Cargando';

// Audio
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const UpdateOtherAdvice = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS ESTADOS PARA LOS COMBOS */
    const [catalog, setCatalog] = useState([]);
    const [document, setDocument] = useState('');
    const [company, setCompany] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [contingencia, setContingencia] = useState([]);
    const [lsMotivo, setLsAsesoriaMotivo] = useState([]);
    const [diaTurno, setDiaTurno] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState([]);
    const [estadoCaso, setEstadoCaso] = useState([]);
    const [otherAdvice, setOtherAdvice] = useState([]);

    const [imgSrc, setImgSrc] = useState(null);
    const [clickAttend, setClickAttend] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [open, setOpen] = useState(false);

    /* MIL Y UN ESTADOS */
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
    const [fechaContrato, setFechaContrato] = useState('');
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

    const { handleSubmit, errors } = methods;

    /* MANEJO DE WEBCAM */
    const WebCamRef = useRef(null);

    const CapturePhoto = useCallback(() => {
        const imageSrc = WebCamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [WebCamRef, setImgSrc]);

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerMedicalAdvice = await GetByIdAdvice(id);
            if (lsServerMedicalAdvice.status === 200) {
                setClickAttend(true);
                setOtherAdvice(lsServerMedicalAdvice.data);
                setFecha(lsServerMedicalAdvice.data.fecha);
                setNote(lsServerMedicalAdvice.data.motivo);
                handleLoadingDocument(lsServerMedicalAdvice.data.documento);
            }

            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setContingencia(resultContingencia);

            const lsServerTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Turno);
            var resultTurno = lsServerTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTurno(resultTurno);

            const lsServerDiaTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DiaTurno);
            var resultDiaTurno = lsServerDiaTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDiaTurno(resultDiaTurno);

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAsesoria);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoCaso);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEstadoCaso(resultEstadoCaso);

            const lsServerAsesoriaMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AsesoriaMotivo);
            var resultAsesoriaMotivo = lsServerAsesoriaMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAsesoriaMotivo(resultAsesoriaMotivo);

            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAtencion);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAtencion(resultTipoAtencion);

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
    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsQuestionnaire = await GetByIdEmployee(idEmployee);
            if (lsQuestionnaire.status === 200) {
                setImgSrc(lsQuestionnaire.data.imagenUrl);
                setDocument(lsQuestionnaire.data.documento);
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
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error al cargar datos del empleado',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
        handleListen();
    }, [isListening])

    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        try {
            const fechaData = FormatDate(fecha);
            const resto = "Sin Registro";
            const usuario = "Manuel Vásquez";
            const dateNow = FormatDate(new Date());
            const DataToUpdate = PutMedicalAdvice(id, document, fechaData, datos.idTipoAtencion, sede, datos.idContingencia,
                datos.idEstadoCaso, datos.idTurno, datos.idDiaTurno, datos.idTipoAsesoria, datos.idMotivo, DefaultData.SinRegistro,
                note, resto, resto, DefaultData.SinRegistro, usuario, dateNow, usuario, dateNow);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateAdvices(DataToUpdate);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Actualizar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
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
            {otherAdvice.length !== 0 ? (
                <Grid container xs={12} sx={{ pt: 0.5 }}>
                    <form onSubmit={handleSubmit(handleClick)}>
                        <SubCard darkTitle title={<><Typography variant="h4">DATOS DEL PACIENTE</Typography></>}>
                            <ModalChildren
                                open={open}
                                onClose={() => setOpen(false)}
                                title="Fotografía"
                            >
                                <WebCamCapture
                                    CaptureImg={CapturePhoto}
                                    RemoverImg={() => setImgSrc(null)}
                                    ImgSrc={imgSrc}
                                    WebCamRef={WebCamRef}
                                />
                            </ModalChildren>

                            <Grid container xs={12} spacing={2} sx={{ pb: 3, pt: 3 }}>
                                <Grid item xs={3}>
                                    <PhotoModel
                                        disabledCapture
                                        disabledDelete
                                        OpenModal={() => setOpen(true)}
                                        EstadoImg={imgSrc}
                                        RemoverImg={() => setImgSrc(null)}
                                    />
                                </Grid>
                                <Grid container spacing={2} item xs={9}>
                                    <Grid item xs={4}>
                                        <InputOnChange
                                            label="N° Documento"
                                            disabled
                                            onChange={(e) => setDocument(e?.target.value)}
                                            value={document}
                                            size={matchesXS ? 'small' : 'medium'}
                                            required={true}
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
                            <Grid item xs={12} sx={{ pb: 3 }}>
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
                        <Grid sx={{ pt: 2 }}>
                            <SubCard darkTitle title={<><Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography></>}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ pb: 3 }}>
                                    <Grid item xs={3}>
                                        <InputDatePick
                                            label="Fecha"
                                            value={fecha}
                                            onChange={(e) => setFecha(e)}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTipoAtencion"
                                                label="Atención"
                                                defaultValue={otherAdvice.idTipoAtencion}
                                                options={tipoAtencion}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idContingencia"
                                                label="Contingencia"
                                                defaultValue={otherAdvice.idContingencia}
                                                options={contingencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={otherAdvice.idMotivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idEstadoCaso"
                                                label="Estado del Caso"
                                                defaultValue={otherAdvice.idEstadoCaso}
                                                options={estadoCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTurno"
                                                label="Turno"
                                                defaultValue={otherAdvice.idTurno}
                                                options={lsTurno}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idDiaTurno"
                                                label="Día del Turno"
                                                defaultValue={otherAdvice.idDiaTurno}
                                                options={diaTurno}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTipoAsesoria"
                                                label="Tipo de Asesoría"
                                                defaultValue={otherAdvice.idTipoAsesoria}
                                                options={tipoAsesoria}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        {clickAttend ? (<>
                            <Grid sx={{ pt: 2 }}>
                                <SubCard darkTitle title={<><Typography variant="h4">NOTA</Typography></>}>
                                    <Grid container spacing={2} /* sx={{ pb: 3 }} */>
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
                                        {/* Iconos de opciones */}
                                        <Grid item xs={12} sx={{ pt: 2 }}>
                                            <Grid spacing={2} container xs={12}>
                                                <Grid item xs={2}>
                                                    <Tooltip title="Plantilla de texto">
                                                        <Fab
                                                            color="primary"
                                                            size="small"
                                                            onClick={() => console.log("Funcionan")}
                                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                        >
                                                            <ListAltSharpIcon fontSize="small" />
                                                        </Fab>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Tooltip title="Borrar texto">
                                                        <Fab
                                                            color="primary"
                                                            size="small"
                                                            onClick={() => console.log("Funcionan")}
                                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                                        >
                                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                                        </Fab>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Grid justifyContent="center" alignItems="center" container>
                                                        <AnimateButton>
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
                                                        </AnimateButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            <Grid item xs={12} sx={{ pb: 3, pt: 3 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="contained" type="submit" fullWidth>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/otheradvice/list")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>) : (<></>)}
                    </form>
                </Grid>
            ) : <Cargando />}

        </MainCard>
    );

};

export default UpdateOtherAdvice;