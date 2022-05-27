// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format'
import InputArea from 'components/input/InputArea';
import Accordion from 'components/accordion/Accordion';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetByIdAdvice, UpdateAdvices } from 'api/clients/AdviceClient';
import { GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import InputOnChange from 'components/input/InputOnChange';

import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { useParams } from 'react-router-dom';
import Cargando from 'components/Cargando';

// Audio
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateMedicalAdvice = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);

    const [document, setDocument] = useState('');
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [contingencia, setContingencia] = useState([]);
    const [medicalAdvice, setMedicalAdvice] = useState([]);

    const [imgSrc, setImgSrc] = useState(null);
    const [clickAttend, setClickAttend] = useState(false);
    const [fecha, setFecha] = useState(null);
    const [timeWait, setTimeWait] = useState(false);

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

    async function GetAll() {
        try {
            const lsServerMedicalAdvice = await GetByIdAdvice(id);
            if (lsServerMedicalAdvice.status === 200) {
                setClickAttend(true);
                setMedicalAdvice(lsServerMedicalAdvice.data);
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

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAsesoria);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setContingencia(resultContingencia);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AsesoriaMotivo);
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

    useEffect(() => {
        GetAll();
        handleListen();
    }, [isListening])

    const handleClick = async (datos) => {
        try {
            const fechaData = FormatDate(fecha);
            const resto = "Sin Registro";
            const usuario = "Manuel Vásquez";
            const dateNow = FormatDate(new Date());
            const DataToUpdate = PutMedicalAdvice(id, document, fechaData, DefaultData.AsesoriaMedica, sede, datos.idContingencia,
                DefaultData.SinRegistro, DefaultData.SinRegistro, DefaultData.SinRegistro, datos.idTipoAsesoria, datos.idMotivo,
                DefaultData.SinRegistro, note, resto, resto, DefaultData.SinRegistro, usuario, dateNow, usuario, dateNow);

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

    setTimeout(() => {
        if (medicalAdvice.length != 0) {
            setTimeWait(true);
        }
    }, 2500);

    return (
        <MainCard>
            {timeWait ? (
                <Grid container xs={12} sx={{ pt: 0.5 }}>
                    <FullScreenDialog
                        open={open}
                        title="LISTADO DE PLANTILLA"
                        handleClose={() => setOpen(false)}
                    >
                        <ListPlantillaAll />
                    </FullScreenDialog>

                    <form onSubmit={handleSubmit(handleClick)}>
                        <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
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
                            <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
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
                                                name="idContingencia"
                                                label="Contingencia"
                                                defaultValue={medicalAdvice.idContingencia}
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
                                                defaultValue={medicalAdvice.idMotivo}
                                                options={lsMotivo}
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
                                                defaultValue={medicalAdvice.idTipoAsesoria}
                                                options={tipoAsesoria}
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
                                <Grid item xs={12} sx={{ pt: 2 }}>
                                    <SubCard darkTitle title={<Typography variant="h4">NOTA</Typography>}>
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

                                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                            <DetailedIcon
                                                title={DetailIcons[0].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[0].icons}
                                            />

                                            <DetailedIcon
                                                title={DetailIcons[1].title}
                                                onClick={() => setIsListening(prevState => !prevState)}
                                                icons={DetailIcons[1].icons}
                                            />
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} sx={{ pb: 3, pt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" type="submit" fullWidth>
                                            {TitleButton.Actualizar}
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
                </Grid >
            ) : <Cargando />}
        </MainCard >
    );
};

export default UpdateMedicalAdvice;