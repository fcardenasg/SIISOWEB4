// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
    Typography
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconReportMedical } from '@tabler/icons';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

// Import del Proyecto
import { FormatDate } from 'components/helpers/Format';
import InputCheckBox from 'components/input/InputCheckBox';
import SubCard from 'ui-component/cards/SubCard';
import { SNACKBAR_OPEN } from 'store/actions';
import { SaveQuestionnaire } from 'api/clients/QuestionnaireClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllQuestionnaire } from 'api/clients/QuestionnaireClient';
import { PostQuestionnaire } from 'formatdata/QuestionnaireForm';
import { GetByIdQuestionnaire } from 'api/clients/QuestionnaireClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SideIconCard from 'ui-component/cards/SideIconCard';
import InputCheck from 'components/input/InputCheck';
import InputOnChange from 'components/input/InputOnChange';
import Cargando from 'components/Cargando';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    telefono: yup.string().required(`${ValidationMessage.Requerido}`),
    email: yup.string().required(`${ValidationMessage.Requerido}`),
    empresa: yup.string().required(`${ValidationMessage.Requerido}`),
}); */

const defaultValues = {
    fiebre: false,
    congestionNasal: false,
    dolorGarganta: false,
    dificultadRespiratoria: false,
    malestarGeneral: false,
    escalofrios: false,
    vomito: false,
    tos: false,
    otrosSintomas: false,
    contactoEstrecho: false,
    contactoSinTapabocas: false,
    contactoTiempo: false,
    contactoMano: false,
    consultaEps: false,
    cumplirTiempoAislamiento: false,
    vacunado: false,
    autorizarTurno: false,
    ordenAislamiento: false,
    censoViveServicioSalud: false,
    censoViveAdultoM: false,
    contactoPocaDistancia: false,

    censoProfesion: 73,
    censoContactoCon: 73,
    censoObservacion: "Sin Registro",
};

const DashboardQuestionnaire = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [company, setCompany] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [lsQuestionnaire, setLsQuestionnaire] = useState([]);

    /* Estados de controles al llegar datos */
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');

    const [document, setDocument] = useState('');
    const [btnReport, setBtnReport] = useState(false);
    const [noSymptoms, setNoSymptoms] = useState(false);
    const [closeContact, setCloseContact] = useState(false);
    const [vacuna, setVacuna] = useState(false);
    const [livePerson, setLivePerson] = useState(false);

    const methods = useForm(
        { defaultValues }
        /* resolver: yupResolver(validationSchema), */
    );

    const { handleSubmit, errors, reset } = methods;

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);

            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalog = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalog);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const handleDocument = async (event) => {
        try {
            setDocument(event?.target.value);

            console.log(event?.target.value, document);

            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    const documento = event?.target.value;
                    console.log(event?.target.value);

                    var lsQuestionnaire = await GetByIdQuestionnaire(documento);
                    setLsQuestionnaire(lsQuestionnaire.data);
                    setNombre(lsQuestionnaire.data.nombre);
                } else {
                    alert("Campo Vacio");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = () => {
        try {
            setBtnReport(true);
        } catch (error) {
            console.log(error);
        }
    }

    const ordenAislamiento = noSymptoms ? false : true;

    const handleClickSubmit = async (datos) => {
        try {
            /* const date = FormatDate(new Date());
            const documento = datos.documento != "" ? datos.documento : document;
            const InsertToData = PostQuestionnaire(documento, datos.nombre, datos.telefono, datos.email, datos.empresa, noSymptoms,
                datos.fiebre, datos.congestionNasal, datos.dolorGarganta, datos.dificultadRespiratoria, datos.malestarGeneral,
                datos.escalofrios, datos.vomito, datos.tos, datos.otrosSintomas, closeContact, datos.contactoSinTapabocas,
                datos.contactoPocaDistancia, datos.contactoTiempo, datos.contactoMano, datos.consultaEps, datos.cumplirTiempoAislamiento,
                vacuna, 73, 73, date, 73, 73, date, 73, 73, date, noSymptoms, date, ordenAislamiento, livePerson,
                datos.censoProfesion, datos.censoContactoCon,
                datos.censoViveAdultoM, datos.censoObservacion); */
            console.log("Insert = ", datos);

            /* if (Object.keys(datos.length !== 0)) {
                const result = await SaveQuestionnaire(InsertToData);
                if (result.status === 200) {
                    setBtnReport(false);
                    setDocument('');
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
                }
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Hubo un error al guardar los Datos',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            } */

        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'No se pudo guardar el registro',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const navigate = useNavigate();

    return (
        <MainCard title="Cuestionario De Salud">
            <Grid xs={12} sx={{ pt: 3 }}>
                <form onSubmit={handleClickSubmit}>
                    {/* Controles del Form */}
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        <Grid item xs={2.4}>
                            <InputOnChange
                                label="N° Documento"
                                onKeyDown={handleDocument}
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                            />
                        </Grid>

                        {lsQuestionnaire.length != 0 ? (
                            <>
                                <Grid item xs={2.4}>
                                    {/* <InputText
                                        value={lsQuestionnaire.nombre}
                                        fullWidth
                                        name="nombre"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    /> */}
                                    <InputOnChange
                                        label="Apellidos y Nombres"
                                        onChange={(e) => setNombre(e?.target.value)}
                                        value={nombre}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            value={lsQuestionnaire.telefono}
                                            fullWidth
                                            name="telefono"
                                            label="Teléfono"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            value={lsQuestionnaire.email}
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                        {/* <SelectOnChange
                                        options
                                        value
                                        onChange
                                        size
                                        label
                                        name /> */}
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="empresa"
                                            label="Empresa"
                                            defaultValue={lsQuestionnaire.empresa}
                                            options={company}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </>
                        ) : <>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="nombre"
                                        label="Apellidos y Nombres"
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
                                        name="telefono"
                                        label="Teléfono"
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
                                        name="email"
                                        label="Email"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="empresa"
                                        label="Empresa"
                                        defaultValue=""
                                        options={company}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </>}
                    </Grid>

                    <Divider />

                    <Grid sx={{ pt: 2 }} container justifyContent="left" alignItems="center">
                        <IconReportMedical size={20} />
                        <Typography sx={{ pt: 1.5, pb: 1 }} align="left" variant="body2">
                            Estamos comprometidos con la salud de todos los trabajadores y colaboradores de <b>Drummond LTD</b>
                        </Typography>
                    </Grid>

                    <Typography sx={{ pt: 3 }} align="letf" variant="caption">
                        Nos interesa saber cómo te sientes, por favor recuerda reportar tu estado de salud todos los días
                    </Typography>

                    <Grid item xs={12} sx={{ pb: 3, pt: 3 }}>
                        <Grid container justifyContent="center" alignItems="center" spacing={1}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleClick} fullWidth>
                                        Reportar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    {btnReport ?
                        (
                            <Grid container justifyContent="left" alignItems="flex-start" spacing={2}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheck
                                            name="sintomasNoSi"
                                            defaultValue=""
                                            label="No presenta ningún síntoma"
                                            size={40}
                                            onChange={(event) => setNoSymptoms(event.target.checked)}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <FormProvider {...methods}>
                                            <InputCheck
                                                name="contactoEstrecho"
                                                defaultValue=""
                                                label="Contacto estrecho"
                                                size={40}
                                                onChange={(event) => setCloseContact(event.target.checked)}
                                            />
                                        </FormProvider>
                                        <Typography align="letf" variant="caption">
                                            En los últimos 14 días ha tenido contacto con alguna
                                            persona con síntomas o que haya sido declarada enferma o
                                            sospechosa para COVID-19, en las siguientes condiciones:
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheck
                                            name="vacunado"
                                            defaultValue=""
                                            label="Vacunado"
                                            onChange={(event) => setVacuna(event.target.checked)}
                                            size={40}
                                        />
                                    </FormProvider>
                                </Grid>
                                {
                                    noSymptoms ? (
                                        <>
                                            <Grid sx={{ pt: 3 }} container direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center" xs={12}>
                                                <Grid item xs={4}>
                                                    <SideIconCard
                                                        iconPrimary={ThumbUpOffAltIcon}
                                                        primary="APTO"
                                                        color={theme.palette.success.dark}
                                                        bgcolor={theme.palette.grey[200]}
                                                    />
                                                </Grid>
                                            </Grid>

                                            {closeContact ? (
                                                <>
                                                    <Grid item xs={12}>
                                                        <SubCard title="CONTACTO ESTRECHO">

                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoSinTapabocas"
                                                                        defaultValue=""
                                                                        label="Alguno de los dos estaba sin protección respiratoria (tapabocas)"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoPocaDistancia"
                                                                        defaultValue=""
                                                                        label="Estaban a una distancia menor de 2 metros"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoTiempo"
                                                                        defaultValue=""
                                                                        label="Por más de 15 minutos"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoMano"
                                                                        defaultValue=""
                                                                        label="Sin haberse lavado las manos minuciosamente después"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                        </SubCard>

                                                    </Grid>
                                                </>
                                            ) : (<></>)}

                                            <Grid item xs={12} sx={{ pb: 2, pt: 4 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <AnimateButton>
                                                            <Button variant="contained" fullWidth type="submit">
                                                                {TitleButton.Guardar}
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <AnimateButton>
                                                            <Button variant="outlined" fullWidth onClick={() => { setBtnReport(false); setDocument('') }}>
                                                                {TitleButton.Cancelar}
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12}>
                                                <SubCard title="CENSO">
                                                    <Grid spacing={2} container>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheck
                                                                    name="censoViveServicioSalud"
                                                                    defaultValue=""
                                                                    label="¿Vive con personas que presten servicios de salud?"
                                                                    size={25}
                                                                    onChange={(event) => setLivePerson(event.target.checked)}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        {livePerson ? (
                                                            <>
                                                                <Grid item xs={4}>
                                                                    <FormProvider {...methods}>
                                                                        <InputSelect
                                                                            name="censoProfesion"
                                                                            label="Profesión"
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
                                                                            name="censoContactoCon"
                                                                            label="Contacto Con"
                                                                            defaultValue=""
                                                                            options={catalog}
                                                                            size={matchesXS ? 'small' : 'medium'}
                                                                            bug={errors}
                                                                        />
                                                                    </FormProvider>
                                                                </Grid>
                                                            </>
                                                        ) : (<><Grid item xs={8}></Grid></>)}

                                                        <Grid item xs={6}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="censoViveAdultoM"
                                                                    defaultValue=""
                                                                    label="¿Vive con adultos mayores de 65 años, o personas con enfermedades preexistentes?"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormProvider {...methods}>
                                                                <InputText
                                                                    defaultValue=""
                                                                    fullWidth
                                                                    name="censoObservacion"
                                                                    label="Observación"
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            {closeContact ? (
                                                <>
                                                    <Grid item xs={12}>
                                                        <SubCard title="CONTACTO ESTRECHO">
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoSinTapabocas"
                                                                        defaultValue=""
                                                                        label="Alguno de los dos estaba sin protección respiratoria (tapabocas)"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoPocaDistancia"
                                                                        defaultValue=""
                                                                        label="Estaban a una distancia menor de 2 metros"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoTiempo"
                                                                        defaultValue=""
                                                                        label="Por más de 15 minutos"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <FormProvider {...methods}>
                                                                    <InputCheckBox
                                                                        name="contactoMano"
                                                                        defaultValue=""
                                                                        label="Sin haberse lavado las manos minuciosamente después"
                                                                        size={25}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                        </SubCard>

                                                    </Grid>
                                                </>
                                            ) : (<></>)}

                                            <Grid item xs={12}>
                                                <SubCard title="1. SINTOMAS ACTUALES">
                                                    <Grid container>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="fiebre"
                                                                    defaultValue=""
                                                                    label="Fiebre"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="dificultadRespiratoria"
                                                                    defaultValue=""
                                                                    label="Dificultad respiratoria"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="vomito"
                                                                    defaultValue=""
                                                                    label="Vomito"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="congestionNasal"
                                                                    defaultValue=""
                                                                    label="Congestion Nasal"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="malestarGeneral"
                                                                    defaultValue=""
                                                                    label="Malestar general"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="tos"
                                                                    defaultValue=""
                                                                    label="Tos"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="dolorGarganta"
                                                                    defaultValue=""
                                                                    label="Dolor de garganta"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="escalofrios"
                                                                    defaultValue=""
                                                                    label="Escalofríos"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    name="otrosSintomas"
                                                                    defaultValue=""
                                                                    label="Otros síntomas:"
                                                                    size={25}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SubCard title="2. PREGUNTAS SOLO PARA CASOS CON RESPUESTAS POSITIVAS">
                                                    <Grid container justifyContent="left" alignItems="center">
                                                        <FormProvider {...methods}>
                                                            <InputCheckBox
                                                                name="consultaEps"
                                                                defaultValue=""
                                                                label="Ha consultado a su EPS por los síntomas o por los contactos positivos"
                                                                size={25}
                                                            />
                                                        </FormProvider>
                                                    </Grid>
                                                    <Grid container justifyContent="left" alignItems="center">
                                                        <FormProvider {...methods}>
                                                            <InputCheckBox
                                                                name="cumplirTiempoAislamiento"
                                                                defaultValue=""
                                                                label="Ha cumplido el tiempo de aislamiento requerido para contactos o síntomas"
                                                                size={25}
                                                            />
                                                        </FormProvider>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>

                                            <Grid item xs={12} sx={{ pb: 3, pt: 4 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <AnimateButton>
                                                            <Button variant="contained" fullWidth type="submit">
                                                                {TitleButton.Guardar}
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <AnimateButton>
                                                            <Button variant="outlined" fullWidth onClick={() => { setBtnReport(false); setDocument('') }}>
                                                                {TitleButton.Cancelar}
                                                            </Button>
                                                        </AnimateButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                }
                            </Grid>
                        ) : (<></>)
                    }
                </form>
            </Grid>
        </MainCard>
    );
};

export default DashboardQuestionnaire;