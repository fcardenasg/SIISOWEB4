import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
    Grid, Typography,
} from '@mui/material';

import { IconLungs } from '@tabler/icons';
import Accordion from 'components/accordion/Accordion';
import InputCheckBox from 'components/input/InputCheckBox';
import { FormProvider } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DetailedIcon from 'components/controllers/DetailedIcon';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const validateLastData = (data, tipoCampo = "bool") => {
    if (tipoCampo === "bool") {
        if (data === undefined)
            return false;
        else return data;

    } else if (tipoCampo === "string") {
        if (data === undefined) {
            return undefined;
        }
        else {
            return data;
        }

    } else if (tipoCampo === "date") {
        if (data === undefined)
            return new Date();
        else return data;

    } else if (tipoCampo === "number") {
        if (data === undefined) {
            return undefined;
        }
        else if (data === DefaultValue.SINREGISTRO_GLOBAL) {
            return undefined;
        }
        else {
            return data;
        }
    }
}

const RespiratorySymptoms = ({ setOpenApuntesPersonales, setOpenTemplate, setOpen, setOpenHistory, setCadenaHistory, lsLastRecord, ...methods }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsExposicion, setLsExpocision] = useState([]);

    async function GetAll() {
        try {
            const lsServerFramDeporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_SINTOMAS_RESPIRATORIO);
            var resultFramDeporte = lsServerFramDeporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsExpocision(resultFramDeporte);
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, []);

    return (
        <Fragment>
            <Accordion title={<><IconLungs />
                <Typography sx={{ pl: 1 }} align='right' variant="h5" color="inherit">TOS</Typography></>}>
                <SubCard darkTitle title="Tos">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    defaultValue={() => validateLastData(lsLastRecord.tosAUsualSin)}
                                    label="A. ¿Tiene tos usualmente (Incluye con el primer cigarrillo o la primera salida a la calle, excluye carraspeo)?"
                                    name="tosAUsualSin"
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    defaultValue={() => validateLastData(lsLastRecord.tosEnLaSemanaSintR)}
                                    label="B. ¿Tose 4 a 6 veces al día, durante cuatro o más días de la semana?"
                                    name="tosEnLaSemanaSintR"
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    defaultValue={() => validateLastData(lsLastRecord.tosMananaSintR)}
                                    label="C. ¿Suele toser levantándose por la mañana a primera hora, durante el resto del día o la noche?"
                                    name="tosMananaSintR"
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">Si contesto "SI" a algunas de las preguntas anteriores, tenga en cuenta estas 2 siguientes, en caso contrario no aplica.</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    defaultValue={() => validateLastData(lsLastRecord.tosConsecutivaSintR)}
                                    label="D. ¿Usted suele toser así casi todos los días por 3 meses consecutivos o por más de un año?"
                                    name="tosConsecutivaSintR"
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>E. ¿Ha presentado TOS por cuantos años?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.anosConTosSintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="anosConTosSintR"
                                    label="Años"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Esputo">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. Suele expectorar desde el pecho (Incluye flema con el 1er cigarrillo, 1era salida a la calle y la que se traga, excluye moco o flema de la nariz)"
                                    name="esputoASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.esputoASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Expectora así dos veces al día, al menos cuatro días a la semana?"
                                    name="esputoBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.esputoBSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Suele expectorar al levantarse o a primera hora de la mañana, durante el resto del día o de la noche?"
                                    name="esputoCSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.esputoCSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Expectora así la mayoría de los días por 3 meses consecutivos o más o durante un año?"
                                    name="esputoDSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.esputoDSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>E. ¿Relacione número de años que ha expectorado?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.esputoESintR, "string")}
                                    fullWidth
                                    name="esputoESintR"
                                    label="Años"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Episodios de Tos y Esputo">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Ha tenido episodios de tos y flema (o aumento, si usualmente los presenta) que duren 3 o más de un año?"
                                    name="episoTosEspuASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.episoTosEspuASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ¿Cuantos años ha tenido al menos un episodio al año?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.episoTosEsputoBSintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="episoTosEsputoBSintR"
                                    label="Años"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Sibilancias">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. Su pecho pita, silba o suena"
                                    name="sibilanciasASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.sibilanciasASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. Cuando tiene gripa"
                                    name="sibilanciasA1SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.sibilanciasA1SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. Ocasionalmente aparte de las gripas"
                                    name="sibilanciasA2SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.sibilanciasA2SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. La mayoría de días y noches"
                                    name="sibilanciasA3SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.sibilanciasA3SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ¿Por cuantos años ha presentado esta situación?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.sibilanciasBSintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="sibilanciasBSintR"
                                    label="Años"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><IconLungs />
                <Typography sx={{ pl: 1 }} align='right' variant="h5" color="inherit">ATAQUES</Typography></>}>
                <SubCard darkTitle title="Ataques De Silbidos">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Alguna vez ha tenido un ataque de silbidos que le haya hecho sentir ahogo?"
                                    name="ataquesSilbiASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.ataquesSilbiASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ¿Qué edad tenía cuando le dio el primer ataque?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.ataquesSilbiBSintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="ataquesSilbiBSintR"
                                    label="Años"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. Ha tenido dos o más episodios"
                                    name="ataquesSilbiCSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.ataquesSilbiCSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Ha necesitado drogas o tratamientos para estos ataques?"
                                    name="ataquesSilbiDSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.ataquesSilbiDSintR)}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Otras Enfermedades Inhabilitantes">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Presenta inhabilidad por una condición diferente a enfermedad de pulmón o corazón?"
                                    name="otrasEnfInhaASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.otrasEnfInhaASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Usted suele toser así casi todos los días por 3 meses consecutivos o por más de un año?"
                                    name="otrasEnfInhaBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.otrasEnfInhaBSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={6}
                                    defaultValue={() => validateLastData(lsLastRecord.otrasEnfInhaDescriSintR, "string")}
                                    fullWidth
                                    name="otrasEnfInhaDescriSintR"
                                    label="Describa la naturaleza de esta condición:"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="DISNEA (Dificultad Para Respirar)">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Se ahoga al subir de un nivel a otro al caminar por una cuesta suave?"
                                    name="disneaASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.disneaASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">En caso afirmativo a lo anterior, continúe con las siguientes preguntas, sino diríjase al siguiente punto</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Por causa del ahogo tiene que caminar más despacio que la gente de su edad, en una cuesta suave?"
                                    name="disneaBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.disneaBSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Tiene que detenerse a respirar cuando camina a su paso npor una cuesta suave?"
                                    name="disneaCSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.disneaCSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Tiene que parar a respirar luego de caminar 100 yardas (o luego de algunos minutos) por una cuesta suave?"
                                    name="disneaDSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.disneaDSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="E. ¿El ahogo le dificulta dejar su casa, vestirse o desvestirte?"
                                    name="disneaESintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.disneaESintR)}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><IconLungs />
                <Typography sx={{ pl: 1 }} align='right' variant="h5" color="inherit">GRIPAS</Typography></>}>

                <SubCard darkTitle title="Gripas y Enfermedades del Torax">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Si se resfría se le afecta el pecho?"
                                    name="enferToraxASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.enferToraxASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿En los últimos 3 años ha presentado enfermedad que lo aleje de su trabajo, lo mantenga en casa o en cama?"
                                    name="enferToraxBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.enferToraxBSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. Expectoró con alguna de estas enfermedades"
                                    name="enferToraxCSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.enferToraxCSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={10}>
                            <Typography>D. ¿En los últimos años cuantas de estas enfermedades con esputo le han durado una semana o más?, ¿Número de Enfermedades?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.enferToraxD, "string")}
                                    type="number"
                                    fullWidth
                                    name="enferToraxD"
                                    label="Años"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Antecedentes">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Tuvo alguna enfermedad pulmonar antes de los 16 años?"
                                    name="antecedentesASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">B. ¿Ha tenido alguna de las siguientes enfermedades (confirmadas por el medico)?</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. ¿Ataques de bronquitis?"
                                    name="antecedentesB1SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB1SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB1ASintR, "string")}
                                    fullWidth
                                    name="antecedentesB1ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB2Sintr)}
                                    label="2. ¿Neumonía o bronconeumonía?"
                                    name="antecedentesB2Sintr"
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB2ASintR, "string")}
                                    fullWidth
                                    name="antecedentesB2ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. ¿Bronquitis Crónica?"
                                    name="antecedentesB3SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB3SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB3ASintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="antecedentesB3ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3.1 ¿Aún presenta esta enfermedad?"
                                    name="antecedentesB3BSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB3BSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    fullWidth
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB3CSintR, "string")}
                                    name="antecedentesB3CSintR"
                                    label="Edad de Inicio"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4. ¿Enfisema Pulmonar?"
                                    name="antecdentesB4SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecdentesB4SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.antecedenteB4ASintR, "string")}
                                    fullWidth
                                    name="antecedenteB4ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4.1 ¿Aún presenta esta enfermedad?"
                                    name="antecedentesB4BSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB4BSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB4CSintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="antecedentesB4CSintR"
                                    label="Edad de Inicio"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5. ¿Asma?"
                                    name="antecedentesB5SintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB5SintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB5ASintR, "string")}
                                    fullWidth
                                    name="antecedentesB5ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5.1 ¿Aun Presenta esta enfermedad?"
                                    name="antecedentesB5BSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB5BSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.antecedentesB5CSintR, "string")}
                                    fullWidth
                                    name="antecedentesB5CSintR"
                                    label="¿Edad de Inicio?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Otras enfermedades del tórax"
                                    name="otrasEnfToraxA"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.otrasEnfToraxA)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.otrasEnfToraxB, "string")}
                                    fullWidth
                                    name="otrasEnfToraxB"
                                    label="Especifique"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="7. ¿Alguna Cirugía del tórax?"
                                    name="ciruToraxASintR"
                                    defaultValue={() => validateLastData(lsLastRecord.ciruToraxASintR)}
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.ciruToraxBSintR, "string")}
                                    fullWidth
                                    name="ciruToraxBSintR"
                                    label="Especifique"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    defaultValue={() => validateLastData(lsLastRecord.traumaToraxASintR)}
                                    label="8. HISTORIA (algún accidente) del tórax"
                                    name="traumaToraxASintR"
                                    size={25}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.traumaToraxBSintR, "string")}
                                    fullWidth
                                    name="traumaToraxBSintR"
                                    label="Especifique"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="9. ¿Problemas del corazón?"
                                    name="problemCoraASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.problemCoraASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.problemCoraBSintR, "string")}
                                    fullWidth
                                    name="problemCoraBSintR"
                                    label="Especifique"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="¿Ha recibido tratamiento por esta causa los últimos 10 años?"
                                    name="problemaCoraCSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.problemaCoraCSintR)}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Presión Alta(Recuerde que debe ser confirmada por el médico)"
                                    name="presionAltaASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.presionAltaASintR)}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10.1 ¿Ha recibido tratamiento por esta causa en los últimos diez años?"
                                    name="presionAltaBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.presionAltaBSintR)}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><IconLungs />
                <Typography sx={{ pl: 1 }} align='right' variant="h5" color="inherit">HISTORIA</Typography></>}>

                <SubCard darkTitle title="Historia Ocupacional">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Ha trabajado tiempo completo (8 horas a la semana o más) por 6 meses o más?"
                                    name="historiaOcupASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Ha trabajado al menos durante 6 meses en un empleo donde tuvo exposición a polvos?"
                                    name="historiaOcupBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupBSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupB1SintR, "string")}
                                    fullWidth
                                    name="historiaOcupB1SintR"
                                    label="Especifique empleo o Industria"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupB2SintR, "string")}
                                    fullWidth
                                    name="historiaOcupB2SintR"
                                    label="¿Total años trabajados?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupB3SintR, "number")}
                                    name="historiaOcupB3SintR"
                                    label="La exposición fue:"
                                    options={lsExposicion}
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Ha trabajado en un empleo donde haya exposición a humos y gases químicos?"
                                    name="historiaOcupCSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupCSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupC1SintR, "string")}
                                    fullWidth
                                    name="historiaOcupC1SintR"
                                    label="Especifique empleo y ocupación o industria"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupC2SintR, "string")}
                                    fullWidth
                                    name="historiaOcupC2SintR"
                                    label="Total años trabajados"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupC3SintR, "number")}
                                    name="historiaOcupC3SintR"
                                    label="La exposición fue:"
                                    options={lsExposicion}
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5">D. ¿Cual ha sido su ocupación o trabajo usual en el que ha laborado por más tiempo?</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupD1SintR, "string")}
                                    fullWidth
                                    name="historiaOcupD1SintR"
                                    label="Empleo y Ocupación"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupD2SintR, "string")}
                                    type="number"
                                    fullWidth
                                    name="historiaOcupD2SintR"
                                    label="Total años trabajados"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.historiaOcupD3, "string")}
                                    fullWidth
                                    name="historiaOcupD3"
                                    label="Negocio, campo o Industria"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Tabaquismo">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Ha fumado cigarrillos, pipa o tabaco (al menos uno(a) al día por un año o 12 onzas de tabaco durante la vida)?"
                                    name="tabaquismoASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.tabaquismoASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Fuma ahora (incluye un mes atrás)?"
                                    name="tabaquismoBSintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.tabaquismoBSintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    fullWidth
                                    defaultValue={() => validateLastData(lsLastRecord.tabaquismoCSintR, "string")}
                                    name="tabaquismoCSintR"
                                    label="C. ¿A qué edad comenzó a fumar en forma regular"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.tabaquismoDSintR, "string")}
                                    fullWidth
                                    name="tabaquismoDSintR"
                                    label="D. ¿Si ya dejo de fumar totalmente, ¿A que edad lo dejó?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.tabaquismoESintR, "string")}
                                    fullWidth
                                    name="tabaquismoESintR"
                                    label="E. ¿Cuantos cigarrillos fuma al día o fumaba?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title="Actividad Deportiva">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Realiza algún deporte?"
                                    name="actDeportASintR"
                                    size={25}
                                    defaultValue={() => validateLastData(lsLastRecord.actDeportASintR)}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={() => validateLastData(lsLastRecord.actDeporA1SintR, "string")}
                                    fullWidth
                                    name="actDeporA1SintR"
                                    label="¿Cual deporte o actividad?"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.actDeporA2SintR, "string")}
                                    fullWidth
                                    name="actDeporA2SintR"
                                    label="Días a la semana que lo practica"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.actDeporA3SintR, "string")}
                                    fullWidth
                                    name="actDeporA3SintR"
                                    label="Horas al día que le dedica"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={() => validateLastData(lsLastRecord.actDeporA4SintR, "string")}
                                    fullWidth
                                    name="actDeporA4SintR"
                                    label="Promedio de horas a la semana"
                                    size="small"
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><IconLungs />
                <Typography sx={{ pl: 1 }} align='right' variant="h5" color="inherit">RECOMENDACIONES</Typography></>}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={10}
                                defaultValue={() => validateLastData(lsLastRecord.recoSintR, "string")}
                                fullWidth
                                name="recoSintR"
                                label="Recomendaciones/Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                        <DetailedIcon
                            title={DetailIcons[0].title}
                            onClick={() => setOpenTemplate(true)}
                            icons={DetailIcons[0].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[1].title}
                            onClick={() => setOpenApuntesPersonales(true)}
                            icons={DetailIcons[1].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[2].title}
                            onClick={() => setOpen(true)}
                            icons={DetailIcons[2].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[3].title}
                            onClick={() => { setOpenHistory(true); setCadenaHistory('SINTOMAS_RESPIRATORIOS') }}
                            icons={DetailIcons[3].icons}
                        />
                    </Grid>
                </Grid>
            </Accordion>
        </Fragment>
    );
};

export default RespiratorySymptoms;