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
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllCatalog, GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDate from 'components/input/InputDate';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
//  ACORDEON 
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

// Audio
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const PsychologicalCounseling = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
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
    const [isListeningMotivoConsulta, setIsListeningMotivoConsulta] = useState(false)
    const [noteMotivoConsulta, setNoteMotivoConsulta] = useState(null)

    const [isListeningConcepto, setIsListeningConcepto] = useState(false)
    const [noteConcepto, setNoteConcepto] = useState(null)

    const [isListeningPautasSeguir, setIsListeningPautasSeguir] = useState(false)
    const [notePautasSeguir, setNotePautasSeguir] = useState(null)


    const handleListenMotivoConsulta = () => {
        if (isListeningMotivoConsulta) {
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
            setNoteMotivoConsulta(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const handleListenConcepto = () => {
        if (isListeningConcepto) {
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
            setNoteConcepto(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const handleListenPautasSeguir = () => {
        if (isListeningPautasSeguir) {
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
            setNotePautasSeguir(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
        handleListenMotivoConsulta();
        handleListenConcepto();
        handleListenPautasSeguir();
    }, [isListeningMotivoConsulta, isListeningConcepto, isListeningPautasSeguir])

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

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
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
            const fecha = FormatDate(datos.fecha);
            const resto = "Sin Registro";
            const usuario = "Manuel Vásquez";
            const dateNow = FormatDate(new Date());
            const DataToInsert = PostMedicalAdvice(datos.documento, fecha, 73, 73, 73,
                datos.idEstadoCaso, 73, 73, datos.idTipoAsesoria, datos.idMotivo, datos.idCausa,
                resto, resto, isListeningPautasSeguir, 73, usuario, dateNow, usuario, dateNow);

            console.log(DataToInsert);

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

    const handleClickFab = () => {
        console.log("Eventos");
    }

    const navigate = useNavigate();

    return (
        <MainCard title="">
            <Grid container xs={12} sx={{ pt: 0.5 }}>
                <form onSubmit={handleSubmit(handleClick)}>
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
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputDate
                                            defaultValue=""
                                            name="fecha"
                                            label="Fecha"
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
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
                                            name="idCausa"
                                            label="Causa de Asesoría"
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
                                            name="idTipoAsesoria"
                                            label="Tipo Asesoría"
                                            defaultValue=""
                                            options={catalog}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <AnimateButton>
                                        <Button size="large" variant="contained" fullWidth>
                                            Atender
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid sx={{ pt: 2 }}>
                        <SubCard darkTitle title={<><Typography variant="h4">NOTA</Typography></>}>
                            <Grid container spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={12}>
                                    <InputArea
                                        rows={4}
                                        label="Motivo de consulta"
                                        placeholder="Esperando dictado..."
                                        name="inputArea"
                                        size={matchesXS ? 'small' : 'medium'}
                                        defaultValue={noteMotivoConsulta}
                                    />
                                </Grid>
                                {/* Iconos de opciones */}
                                <Grid item xs={12} sx={{ pt: 2 }}>
                                    <Grid justifyContent="left" alignItems="center" container xs={12}>
                                        <Grid item xs={2}>
                                            <Grid justifyContent="center" alignItems="center" container>
                                                <AnimateButton>
                                                    <Tooltip title="Plantilla de texto">
                                                        <Fab
                                                            color="primary"
                                                            size="small"
                                                            onClick={handleClickFab}
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
                                                            onClick={() => setNoteMotivoConsulta('')}
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
                                                            onClick={() => setIsListeningMotivoConsulta(prevState => !prevState)}
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

                            <Grid container spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={12}>
                                    <InputArea
                                        rows={4}
                                        label="Concepto"
                                        placeholder="Esperando dictado..."
                                        name="inputArea"
                                        size={matchesXS ? 'small' : 'medium'}
                                        defaultValue={noteConcepto}
                                    />
                                </Grid>
                                {/* Iconos de opciones */}
                                <Grid item xs={12} sx={{ pt: 2 }}>
                                    <Grid justifyContent="left" alignItems="center" container xs={12}>
                                        <Grid item xs={2}>
                                            <Grid justifyContent="center" alignItems="center" container>
                                                <AnimateButton>
                                                    <Tooltip title="Plantilla de texto">
                                                        <Fab
                                                            color="primary"
                                                            size="small"
                                                            onClick={handleClickFab}
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
                                                            onClick={() => setNoteConcepto('')}
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
                                                            onClick={() => setIsListeningConcepto(prevState => !prevState)}
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

                            <Grid container spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={12}>
                                    <InputArea
                                        rows={4}
                                        label="Pautas a Seguir"
                                        placeholder="Esperando dictado..."
                                        name="inputArea"
                                        size={matchesXS ? 'small' : 'medium'}
                                        defaultValue={notePautasSeguir}
                                    />
                                </Grid>
                                {/* Iconos de opciones */}
                                <Grid item xs={12} sx={{ pt: 2 }}>
                                    <Grid justifyContent="left" alignItems="center" container xs={12}>
                                        <Grid item xs={2}>
                                            <Grid justifyContent="center" alignItems="center" container>
                                                <AnimateButton>
                                                    <Tooltip title="Plantilla de texto">
                                                        <Fab
                                                            color="primary"
                                                            size="small"
                                                            onClick={handleClickFab}
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
                                                            onClick={() => setNotePautasSeguir('')}
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
                                                            onClick={() => setIsListeningPautasSeguir(prevState => !prevState)}
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

                            <Grid xs={12} container spacing={2}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idEstadoCaso"
                                            label="Estado"
                                            defaultValue=""
                                            options={catalog}
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
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" type="submit" fullWidth>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/psychologicalcounseling/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );

};

export default PsychologicalCounseling;