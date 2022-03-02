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
import SubCard from 'ui-component/cards/SubCard';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertCatalog } from 'api/clients/CatalogClient';
import { GetAllTypeCatalog } from 'api/clients/TypeCatalogClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SideIconCard from 'ui-component/cards/SideIconCard';
import InputCheck from 'components/input/InputCheck';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoCatalogo: yup.number().required(`${ValidationMessage.Requerido}`),
}); */

const DashboardQuestionnaire = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [typeCatalog, setTypeCatalog] = useState([]);
    const [btnReport, setBtnReport] = useState(false);
    const [noSymptoms, setNoSymptoms] = useState(false);
    const [closeContact, setCloseContact] = useState(false);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetAllTypeCatalog(0, 0);
            var result = lsServer.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setTypeCatalog(result);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* METODO DE INSERT  */
    const handleClick = () => {
        setBtnReport(true);
    };

    const handleNoSymptoms = (event) => {
        setNoSymptoms(event.target.checked);
    }

    const handleCloseContact = (event) => {
        setCloseContact(event.target.checked);
    }

    const navigate = useNavigate();

    return (
        <MainCard title="Cuestionario De Salud">
            <Grid xs={12} sx={{ pt: 3 }}>
                <form>

                    {/* Controles del Form */}
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="codigo"
                                    label="N° Documento"
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
                                    name="codigo"
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
                                    name="codigo"
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
                                    name="codigo"
                                    label="Email"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={2.4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoCatalogo"
                                    label="Empresa"
                                    defaultValue=""
                                    options={typeCatalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
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
                        (<Grid container justifyContent="left" alignItems="center" spacing={2}>
                            <Grid item xs={8}>
                                <InputCheck
                                    label="No presenta ningún síntoma"
                                    size={40}
                                    onChange={handleNoSymptoms}
                                />
                            </Grid>
                            {
                                noSymptoms ? (
                                    <Grid item xs={4}>
                                        <SideIconCard
                                            iconPrimary={ThumbUpOffAltIcon}
                                            primary="APTO"
                                            color={theme.palette.success.dark}
                                            bgcolor={theme.palette.grey[200]}
                                        />
                                    </Grid>
                                ) : (
                                    <>
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
                                            <SubCard title="2. CONTACTO ESTRECHO">
                                                <InputCheck
                                                    onChange={handleCloseContact}
                                                    label="En los últimos 14 días ha tenido contacto con alguna 
                                                    persona con síntomas o que haya sido declarada enferma o 
                                                    sospechosa para COVID-19, en las siguientes condiciones:"
                                                    size={30}
                                                />

                                                {closeContact ? (
                                                    <>
                                                        <Grid sx={{ pt: 3, pb: 2 }}>
                                                            <Divider />
                                                        </Grid>
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
                                                    </>
                                                ) : (<></>)}
                                            </SubCard>

                                        </Grid>
                                        <Grid item xs={12}>
                                            <SubCard title="3. PREGUNTAS SOLO PARA CASOS CON RESPUESTAS POSITIVAS">
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
                                    </>
                                )
                            }
                        </Grid>) : (<></>)
                    }

                </form>
            </Grid>
        </MainCard>
    );
};

export default DashboardQuestionnaire;