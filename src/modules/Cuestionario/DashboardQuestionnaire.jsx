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
import InputCheckBox from 'components/input/InputCheckBox';
import SubCard from 'ui-component/cards/SubCard';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import { GetByIdQuestionnaire } from 'api/clients/QuestionnaireClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SideIconCard from 'ui-component/cards/SideIconCard';
import InputCheck from 'components/input/InputCheck';
import InputOnChange from 'components/input/InputOnChange';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    telefono: yup.string().required(`${ValidationMessage.Requerido}`),
    email: yup.string().required(`${ValidationMessage.Requerido}`),
    empresa: yup.string().required(`${ValidationMessage.Requerido}`),
});

const defaultValues = {
    nombre: '',
    telefono: '',
    email: '',
    empresa: '',
    checkBox: false,
};

const DashboardQuestionnaire = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [company, setCompany] = useState([]);
    const [questionnaire, setQuestionnaire] = useState([]);
    const [document, setDocument] = useState('');
    const [btnReport, setBtnReport] = useState(false);
    const [noSymptoms, setNoSymptoms] = useState(false);
    const [closeContact, setCloseContact] = useState(false);
    const [livePerson, setLivePerson] = useState(false);

    /* Set de los check para guardar */
    /* const [sintomasSiNo, setSintomasSiNo] = useState(false);
    const [Fiebre, setSintomasSiNo] = useState(false);
    const [CongestionNasal, setSintomasSiNo] = useState(false);
    const [DolorGarganta, setSintomasSiNo] = useState(false);
    const [DificultadRespiratoria, setSintomasSiNo] = useState(false);
    const [MalestarGeneral, setSintomasSiNo] = useState(false);
    const [Escalofrios, setSintomasSiNo] = useState(false);
    const [sintomasSiNo, setSintomasSiNo] = useState(false);
    const [sintomasSiNo, setSintomasSiNo] = useState(false);

    SintomasSiNo	bit	Checked
Fiebre	bit	Checked
CongestionNasal	bit	Checked
DolorGarganta	bit	Checked
DificultadRespiratoria	bit	Checked
MalestarGeneral	bit	Checked
Escalofrios	bit	Checked
Vomito	bit	Checked
Tos	bit	Checked
OtrosSintomas	bit	Checked
ContactoEstrecho	bit	Checked
ContactoSinTapabocas	bit	Checked
ContactoPocaDistancia	bit	Checked
ContactoTiempo	bit	Checked
ContactoMano	bit	Checked
ConsultaEps	bit	Checked
CumplirTiempoAislamiento	bit	Checked
Vacunado	bit	Checked */



    const methods = useForm(
        { resolver: yupResolver(validationSchema), defaultValues }
    );

    const { handleSubmit, control, errors, reset } = methods;

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetAllCompany(0, 0);
            var result = lsServer.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(result);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const handleLivePerson = (event) => {
        setLivePerson(event.target.checked);
    }

    const handleDocument = async (event) => {
        setDocument(event?.target.value);
        if (event.key === 'Enter') {
            if (event?.target.value != "") {
                const documento = event?.target.value;
                console.log(event?.target.value);

                var lsQuestionnaire = await GetByIdQuestionnaire(documento);

                setQuestionnaire(lsQuestionnaire.data);
                console.log("Datos = ", questionnaire);
            } else {
                alert("Campo Vacio");
            }
        }
    }

    const handleClick = (datos) => {
        if (document != "") {
            setBtnReport(true);
        } else alert("El campo de documento es requerido");
        console.log(document, datos);
    }

    const navigate = useNavigate();

    return (
        <MainCard title="Cuestionario De Salud">
            <Grid xs={12} sx={{ pt: 3 }}>
                <form onSubmit={handleSubmit(handleClick)}>
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

                        {questionnaire.length !== 0 ? (
                            <>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={questionnaire.nombre}
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
                                            defaultValue={questionnaire.telefono}
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
                                            defaultValue={questionnaire.email}
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
                                            defaultValue={questionnaire.essmpresa}
                                            options={company}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </>
                        ) : (
                            <>
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
                                <Grid item xs={2.4}>
                                    <InputCheckBox
                                        control={control}
                                        name="checkBox"
                                        label="Prueba de Check"
                                        defaultValue=""
                                        bug={errors}
                                    />
                                </Grid>
                            </>
                        )}

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
                                    <Button variant="contained" type="submit" fullWidth>
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
                                    <InputCheck
                                        label="No presenta ningún síntoma"
                                        size={40}
                                        onChange={(event) => setNoSymptoms(event.target.checked)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <InputCheck
                                            label="Contacto estrecho"
                                            size={40}
                                            onChange={(event) => setCloseContact(event.target.checked)}
                                        />
                                        <Typography align="letf" variant="caption">
                                            En los últimos 14 días ha tenido contacto con alguna
                                            persona con síntomas o que haya sido declarada enferma o
                                            sospechosa para COVID-19, en las siguientes condiciones:
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <InputCheck
                                        label="Vacunado"
                                        size={40}
                                    />
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
                                                                <InputCheck
                                                                    label="Alguno de los dos estaba sin protección respiratoria (tapabocas)"
                                                                    size={25}
                                                                />
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Estaban a una distancia menor de 2 metros"
                                                                    size={25}
                                                                />
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Por más de 15 minutos"
                                                                    size={25}
                                                                />
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Sin haberse lavado las manos minuciosamente después"
                                                                    size={25}
                                                                />
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
                                                            <Button variant="outlined" fullWidth onClick={() => navigate("/catalog/list")}>
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
                                                            <InputCheck
                                                                label="¿Vive con personas que presten servicios de salud?"
                                                                size={25}
                                                                onChange={(event) => setLivePerson(event.target.checked)}
                                                            />
                                                        </Grid>

                                                        {livePerson ? (
                                                            <>
                                                                <Grid item xs={4}>
                                                                    <FormProvider {...methods}>
                                                                        <InputSelect
                                                                            name="profesion"
                                                                            label="Profesión"
                                                                            defaultValue=""
                                                                            options={company}
                                                                            size={matchesXS ? 'small' : 'medium'}
                                                                            bug={errors}
                                                                        />
                                                                    </FormProvider>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <FormProvider {...methods}>
                                                                        <InputSelect
                                                                            name="contactoCon"
                                                                            label="Contacto Con"
                                                                            defaultValue=""
                                                                            options={company}
                                                                            size={matchesXS ? 'small' : 'medium'}
                                                                            bug={errors}
                                                                        />
                                                                    </FormProvider>
                                                                </Grid>
                                                            </>
                                                        ) : (<><Grid item xs={8}></Grid></>)}

                                                        <Grid item xs={6}>
                                                            <InputCheck
                                                                label="¿Vive con adultos mayores de 65 años, o personas con enfermedades preexistentes?"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormProvider {...methods}>
                                                                <InputText
                                                                    defaultValue=""
                                                                    fullWidth
                                                                    name="observacion"
                                                                    label="Observacion"
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
                                                            {/* <InputCheck
                                                                onChange={handleCloseContact}
                                                                label="En los últimos 14 días ha tenido contacto con alguna 
                                                    persona con síntomas o que haya sido declarada enferma o 
                                                    sospechosa para COVID-19, en las siguientes condiciones:"
                                                                size={30}
                                                            />
                                                            <Grid sx={{ pt: 3, pb: 2 }}>
                                                                <Divider />
                                                            </Grid> */}
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Alguno de los dos estaba sin protección respiratoria (tapabocas)"
                                                                    size={25}
                                                                />
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Estaban a una distancia menor de 2 metros"
                                                                    size={25}
                                                                />
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Por más de 15 minutos"
                                                                    size={25}
                                                                />
                                                            </Grid>
                                                            <Grid container justifyContent="left" alignItems="center">
                                                                <InputCheck
                                                                    label="Sin haberse lavado las manos minuciosamente después"
                                                                    size={25}
                                                                />
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
                                                                            <Button variant="outlined" fullWidth onClick={() => navigate("/catalog/list")}>
                                                                                {TitleButton.Cancelar}
                                                                            </Button>
                                                                        </AnimateButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </SubCard>

                                                    </Grid>
                                                </>
                                            ) : (<></>)}

                                            <Grid item xs={12}>
                                                <SubCard title="1. SINTOMAS ACTUALES">
                                                    <Grid container>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Fiebre"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Dificultad respiratoria"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Vomito"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Congestion Nasal"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Malestar general"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Tos"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Dolor de garganta"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Escalofríos"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputCheck
                                                                label="Otros síntomas:"
                                                                size={25}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SubCard title="2. PREGUNTAS SOLO PARA CASOS CON RESPUESTAS POSITIVAS">
                                                    <Grid container justifyContent="left" alignItems="center">
                                                        <InputCheck
                                                            label="Ha consultado a su EPS por los síntomas o por los contactos positivos"
                                                            size={25}
                                                        />
                                                    </Grid>
                                                    <Grid container justifyContent="left" alignItems="center">
                                                        <InputCheck
                                                            label="Ha cumplido el tiempo de aislamiento requerido para contactos o síntomas"
                                                            size={25}
                                                        />
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
                                                            <Button variant="outlined" fullWidth onClick={() => navigate("/catalog/list")}>
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