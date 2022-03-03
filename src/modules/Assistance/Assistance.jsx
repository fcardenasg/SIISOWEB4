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
import { FormatDate } from 'components/helpers/Format';
import { PostEmployee } from 'formatdata/EmployeeForm';
import SelectOnChange from 'components/input/SelectOnChange';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
//  ACORDEON 

import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

// assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// Audio
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-ES'



const Assistance = () => {
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

    const handleChange = (event) => {

        setValues(event.target?.value);
        console.log("event.target.value = ", Number(event.target?.value));

        /* const eventCode = event.target.value;
        var lsResulCode = String(lsCodigoFilter.filter(code => code.idCatalogo == eventCode).map(code => code.codigo));
        console.log("lsResulCode = ", lsResulCode);
        GetSubString(lsResulCode); */
    };

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
        console.log("Eventos");
    }

    const navigate = useNavigate();


    return (
        <MainCard title="">
            <Grid container xs={12} sx={{ pt: 0.5 }}>
                <form onSubmit={handleSubmit(handleClick)}>



                    <SubCard darkTitle title={
                        <><Typography variant="h4">DATOS DEL PACIENTE</Typography></>

                    } >

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


                    <Accordion

                        title={
                            <>
                                <DomainTwoToneIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                                <Typography variant="subtitle1" color="inherit" >
                                    Ver mas...
                                </Typography>
                            </>
                        }


                    >

                        <SubCard darkTitle title={
                            <>
                                <Typography variant="h4"></Typography>

                            </>

                        } >

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



                    <SubCard darkTitle title={
                        <>
                            <Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>

                        </>

                    } >




                        <Grid container spacing={2} sx={{ pb: 3 }}>

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



                    <SubCard darkTitle title={
                        <>
                            <Typography variant="h4">HISTORIA</Typography>

                        </>

                    } >





                        <Grid container spacing={2} sx={{ pb: 3 }}>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="motivodeconsulta"
                                        label="Motivo de Consulta"
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="enfermedadactual"
                                        label="Enfermedad Actual"
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="antecedentes"
                                        label="Antecedentes"
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="revisiónporsistemas"
                                        label="Revisión Por Sistemas"
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>



                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="examenfisico"
                                        label="Examen Fisico"
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <SettingsVoiceIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Tooltip title="Ver Examen Fisico">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={handleClickFab}
                                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                            >
                                                <DirectionsRunIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={note}
                                        defaultValue2={note}
                                        value={note}
                                        fullWidth
                                        name="examenesparaclinicos"
                                        label="Examenes Paraclinicos"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
                                    />
                                </FormProvider>
                                <p>{note}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>
                                    <Grid item xs={2}>
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
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="Borrar texto">
                                            <Fab
                                                color="primary"
                                                size="small"
                                                onClick={handleClickFab}
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
                                                onClick={handleClickFab}
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


                    <SubCard darkTitle title={
                        <>
                            <Typography variant="h4">DIAGNOSTICOS</Typography>

                        </>

                    } >



                        <Grid container spacing={2} sx={{ pb: 3 }}>

                            <Grid item xs={12}>

                                {catalog.length != 0 ? (<>
                                    <FormProvider {...methods}>
                                        <InputMultiselect
                                            options={catalog}
                                        />
                                    </FormProvider></>) : (<></>)}
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={note}
                                    defaultValue2={note}
                                    value={note}
                                    fullWidth
                                    name="plandemanejo"
                                    label="Plan de Manejo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    multiline
                                    rows={6}
                                    bug={errors}
                                />
                            </FormProvider>
                            <p>{note}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid spacing={2} container xs={12} sx={{ pt: 2 }}>
                                <Grid item xs={2}>
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
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip title="Borrar texto">
                                        <Fab
                                            color="primary"
                                            size="small"
                                            onClick={handleClickFab}
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



                    <SubCard darkTitle title={
                        <>
                            <Typography variant="h4">CONCEPTO DE APTITUD PSICOFÍSICA</Typography>

                        </>

                    } >




                        <Grid container spacing={2} sx={{ pb: 3 }}>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="conceptodeaptitudpsicofísica"
                                        label="Concepto De Aptitud Psicofísica"
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
                                        name="remitido"
                                        label="Remitido"
                                        defaultValue=""
                                        options={catalog}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>





                        </Grid>
                    </SubCard>







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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/employee/list")}>
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




export default Assistance;

