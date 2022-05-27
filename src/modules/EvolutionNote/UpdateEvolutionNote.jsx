// Import de Material-ui
import { useState, useEffect, useCallback, useRef } from 'react';
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
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

// Terceros
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import Cargando from 'components/Cargando';
import Accordion from 'components/accordion/Accordion';
import InputOnChange from 'components/input/InputOnChange';
import InputMultiSelects from 'components/input/InputMultiSelects';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { CodCatalogo } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDatePick from 'components/input/InputDatePick';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SelectOnChange from 'components/input/SelectOnChange';
import { PutEvolutionNote } from 'formatdata/EvolutionNoteForm';
import { GetByIdEvolutionNote, UpdateEvolutionNotes } from 'api/clients/EvolutionNoteClient';
import FullScreenDialogs from 'components/controllers/FullScreenDialog';
import ListEvolutionnotes from './ListEvolutionNote';
import { FormatDate } from 'components/helpers/Format';

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'

const UpdateEvolutionNote = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsEvolutionNote, setLsEvolutionNote] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [open, setOpen] = useState(false);
    const [buttonReport, setButtonReport] = useState(false);
    const [note, setNote] = useState(null);
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);

    const [catalog, setCatalog] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsDiaTurno, setLsDiaTurno] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);

    const [document, setDocument] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [fecha, setFecha] = useState(null);
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
                message: `${Message.ErrorDeDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const serverData = await GetByIdEvolutionNote(id);
            if (serverData.status === 200) {
                setDiagnosticoArray(JSON.parse(serverData.data.diagnostico));
                setFecha(serverData.data.fecha);
                setLsEvolutionNote(serverData.data);
                handleLoadingDocument(serverData.data.documento);
            }

            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                nombre: item.dx
            }));
            setLsCie11(resultCie11);

            const lsServerAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Atencion_HistoriaClinica);
            var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAtencion(resultAtencion);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

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
            setLsDiaTurno(resultDiaTurno);

            const lsServerRemitido = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultRemitido = lsServerRemitido.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRemitido(resultRemitido);

            const lsServerConceptoAptitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ConceptoAptitud_HistoriaClinica);
            var resultConceptoAptitud = lsServerConceptoAptitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoAptitud(resultConceptoAptitud);

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

    useEffect(() => {
        GetAll();
        handleListen();
    }, [isListening])

    const handleClick = async (datos) => {
        try {
            const fechaFormat = FormatDate(fecha);
            const fechaSistemas = FormatDate(new Date());

            const DataToUpdate = PutEvolutionNote(id, document, fechaFormat, datos.idAtencion, datos.idContingencia, datos.idTurno, datos.idDiaTurno,
                datos.nota, JSON.stringify(diagnosticoArray), datos.planManejo, datos.idConceptoActitud, datos.idRemitido, "Usuario Creacion",
                fechaSistemas, "Usuario Modifica", fechaSistemas);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateEvolutionNotes(DataToUpdate);
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
                    setButtonReport(true);
                }
            }
        } catch (error) {
            console.log(error);
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
        <MainCard>
            {lsEvolutionNote.length != 0 ? <>
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
                                    onChange={(e) => setDocument(e?.target.value)}
                                    value={document}
                                    disabled
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

                <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                    <Typography variant="subtitle1" color="inherit">Ver mas...</Typography></>}>
                    <Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
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
                    <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Fecha"
                                    value={fecha}
                                    onChange={(e) => setFecha(e)}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idAtencion"
                                        label="Atención"
                                        defaultValue={lsEvolutionNote.idAtencion}
                                        options={lsAtencion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idContingencia"
                                        label="Contingencia"
                                        defaultValue={lsEvolutionNote.idContingencia}
                                        options={lsContingencia}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTurno"
                                        label="Turno"
                                        defaultValue={lsEvolutionNote.idTurno}
                                        options={lsTurno}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idDiaTurno"
                                        label="Día del Turno"
                                        defaultValue={lsEvolutionNote.idDiaTurno}
                                        options={lsDiaTurno}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid sx={{ pt: 2 }}>
                    <SubCard darkTitle title={<Typography variant="h4">NOTA</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsEvolutionNote.nota}
                                        fullWidth
                                        name="nota"
                                        label="Nota"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
                                    />
                                </FormProvider>
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
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={() => console.log("Funcion")}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <RemoveCircleOutlineSharpIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
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
                                        <Tooltip title="Ver Examen Paraclinico">
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
                    </SubCard>
                </Grid>

                <Grid sx={{ pt: 2 }}>
                    <SubCard darkTitle title={<Typography variant="h4">IMPRESIÓN DIAGNÓSTICA</Typography>}>
                        <Grid container spacing={2} sx={{ pb: 2 }}>
                            <Grid item xs={12}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnosticoArray(value)}
                                    value={diagnosticoArray}
                                    label="Diagnósticos"
                                    options={lsCie11}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsEvolutionNote.planManejo}
                                    fullWidth
                                    name="planManejo"
                                    label="Plan de Manejo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    multiline
                                    rows={6}
                                    bug={errors}
                                />
                            </FormProvider>
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
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={() => console.log("Funcion")}
                                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                        >
                                            <RemoveCircleOutlineSharpIcon fontSize="small" />
                                        </Fab>
                                    </Tooltip>
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
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid sx={{ pt: 2 }}>
                    <SubCard darkTitle title={<Typography variant="h4">CONCEPTO DE APTITUD PSICOFÍSICA</Typography>}>
                        <Grid container spacing={2} sx={{ pb: 3 }}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoActitud"
                                        label="Concepto De Aptitud Psicofísica"
                                        defaultValue={lsEvolutionNote.idConceptoActitud}
                                        options={lsConceptoAptitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idRemitido"
                                        label="Remitido"
                                        defaultValue={lsEvolutionNote.idRemitido}
                                        options={lsRemitido}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} sx={{ pb: 3, pt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={buttonReport ? 4 : 6}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        {buttonReport ?
                            <Grid item xs={buttonReport ? 4 : 6}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
                                        Imprimir
                                    </Button>
                                </AnimateButton>
                            </Grid> : <></>}
                        <Grid item xs={buttonReport ? 4 : 6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/evolution-note/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>

                <FullScreenDialogs
                    open={open}
                    title="LISTADO DE NOTAS DE EVOLUCIÓN"
                    handleClose={() => setOpen(false)}
                >
                    <ListEvolutionnotes />
                </FullScreenDialogs>
            </> : <Cargando />}
        </MainCard >
    );
};

export default UpdateEvolutionNote;