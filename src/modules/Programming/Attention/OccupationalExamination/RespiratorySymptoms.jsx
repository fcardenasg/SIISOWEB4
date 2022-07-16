import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
    Grid, Typography,
} from '@mui/material';

import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import Accordion from 'components/accordion/Accordion';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputCheckBox from 'components/input/InputCheckBox';
import { FormProvider } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import FullScreenDialog from 'components/controllers/FullScreenDialog'
import ListPlantillaAll from 'components/template/ListPlantillaAll';

const RespiratorySymptoms = ({ errors, documento, lsEmployee, ...methods }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
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
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, []);

    return (
        <Fragment>
            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">TOS</Typography></>}>
                <SubCard darkTitle title="Tos">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Tiene tos usualmente (Incluye con el primer cigarrillo o la primera salida a la calle, excluye carraspeo)?"
                                    name="tosAUsualSin"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Tose 4 a 6 veces al día, durante cuatro o más días de la semana?"
                                    name="tosEnLaSemanaSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Suele toser levantándose por la mañana a primera hora, durante el resto del día o la noche?"
                                    name="tosMananaSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">Si contesto "SI" a algunas de las preguntas anteriores, tenga en cuenta estas 2 siguientes, en caso contrario no aplica.</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Usted suele toser así casi todos los días por 3 meses consecutivos o por más de un año?"
                                    name="tosConsecutivaSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>E. ¿Ha presentado TOS por cuantos años?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="anosConTosSintR"
                                    label="Años"
                                    size="small"
                                    bug={errors}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Expectora así dos veces al día, al menos cuatro días a la semana?"
                                    name="esputoBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Suele expectorar al levantarse o a primera hora de la mañana, durante el resto del día o de la noche?"
                                    name="esputoCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Expectora así la mayoría de los días por 3 meses consecutivos o más o durante un año?"
                                    name="esputoDSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>E. ¿Relacione número de años que ha expectorado?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="esputoESintR"
                                    label="Años"
                                    size="small"
                                    bug={errors}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ¿Cuantos años ha tenido al menos un episodio al año?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="episoTosEsputoBSintR"
                                    label="Años"
                                    size="small"
                                    bug={errors}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. Cuando tiene gripa"
                                    name="sibilanciasA1SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. Ocasionalmente aparte de las gripas"
                                    name="sibilanciasA2SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. La mayoría de días y noches"
                                    name="sibilanciasA3SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ¿Por cuantos años ha presentado esta situación?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="sibilanciasBSintR"
                                    label="Años"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">ATAQUES</Typography></>}>
                <SubCard darkTitle title="Ataques De Silbidos">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Alguna vez ha tenido un ataque de silbidos que le haya hecho sentir ahogo?"
                                    name="ataquesSilbiASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ¿Qué edad tenía cuando le dio el primer ataque?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="ataquesSilbiBSintR"
                                    label="Años"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. Ha tenido dos o más episodios"
                                    name="ataquesSilbiCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Ha necesitado drogas o tratamientos para estos ataques?"
                                    name="ataquesSilbiDSintR"
                                    size={25}
                                    defaultValue={false}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Usted suele toser así casi todos los días por 3 meses consecutivos o por más de un año?"
                                    name="otrasEnfInhaBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={6}
                                    defaultValue=""
                                    fullWidth
                                    name="otrasEnfInhaDescriSintR"
                                    label="Describa la naturaleza de esta condición:"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                    defaultValue={false}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Tiene que detenerse a respirar cuando camina a su paso npor una cuesta suave?"
                                    name="disneaCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ¿Tiene que parar a respirar luego de caminar 100 yardas (o luego de algunos minutos) por una cuesta suave?"
                                    name="disneaDSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="E. ¿El ahogo le dificulta dejar su casa, vestirse o desvestirte?"
                                    name="disneaESintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">GRIPAS</Typography></>}>

                <SubCard darkTitle title="Gripas y Enfermedades del Torax">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Si se resfría se le afecta el pecho?"
                                    name="enferToraxASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿En los últimos 3 años ha presentado enfermedad que lo aleje de su trabajo, lo mantenga en casa o en cama?"
                                    name="enferToraxBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. Expectoró con alguna de estas enfermedades"
                                    name="enferToraxCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={10}>
                            <Typography>D. ¿En los últimos años cuantas de estas enfermedades con esputo le han durado una semana o más?, ¿Número de Enfermedades?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="enferToraxD"
                                    label="Años"
                                    size="small"
                                    bug={errors}
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
                                    defaultValue={false}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB1ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. ¿Neumonía o bronconeumonía?"
                                    name="antecedentesB2Sintr"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB2ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. ¿Bronquitis Crónica?"
                                    name="antecedentesB3SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB3ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3.1 ¿Aún presenta esta enfermedad?"
                                    name="antecedentesB3BSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB3CSintR"
                                    label="Edad de Inicio"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4. ¿Enfisema Pulmonar?"
                                    name="antecdentesB4SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedenteB4ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4.1 ¿Aún presenta esta enfermedad?"
                                    name="antecedentesB4BSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB4CSintR"
                                    label="Edad de Inicio"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5. ¿Asma?"
                                    name="antecedentesB5SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB5ASintR"
                                    label="¿A qué edad presentó el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5.1 ¿Aun Presenta esta enfermedad?"
                                    name="antecedentesB5BSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="antecedentesB5CSintR"
                                    label="¿Edad de Inicio?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Otras enfermedades del tórax"
                                    name="otrasEnfToraxA"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="otrasEnfToraxB"
                                    label="Especifique"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="7. ¿Alguna Cirugía del tórax?"
                                    name="ciruToraxASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="ciruToraxBSintR"
                                    label="Especifique"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="8. HISTORIA (algún accidente) del tórax"
                                    name="traumaToraxASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="traumaToraxBSintR"
                                    label="Especifique"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="9. ¿Problemas del corazón?"
                                    name="problemCoraASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="problemCoraBSintR"
                                    label="Especifique"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="¿Ha recibido tratamiento por esta causa los últimos 10 años?"
                                    name="problemaCoraCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Presión Alta(Recuerde que debe ser confirmada por el médico)"
                                    name="presionAltaASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10.1 ¿Ha recibido tratamiento por esta causa en los últimos diez años?"
                                    name="presionAltaBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">HISTORIA</Typography></>}>

                <SubCard darkTitle title="Historia Ocupacional">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ¿Ha trabajado tiempo completo (8 horas a la semana o más) por 6 meses o más?"
                                    name="historiaOcupASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Ha trabajado al menos durante 6 meses en un empleo donde tuvo exposición a polvos?"
                                    name="historiaOcupBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupB1SintR"
                                    label="Especifique empleo o Industria"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupB2SintR"
                                    label="¿Total años trabajados?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="historiaOcupB3SintR"
                                    label="La exposición fue:"
                                    defaultValue=""
                                    options={lsExposicion}
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ¿Ha trabajado en un empleo donde haya exposición a humos y gases químicos?"
                                    name="historiaOcupCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupC1SintR"
                                    label="Especifique empleo y ocupación o industria"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupC2SintR"
                                    label="Total años trabajados"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="historiaOcupC3SintR"
                                    label="La exposición fue:"
                                    defaultValue=""
                                    options={lsExposicion}
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5">D. ¿Cual ha sido su ocupación o trabajo usual en el que ha laborado por más tiempo?</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupD1SintR"
                                    label="Empleo y Ocupación"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupD2SintR"
                                    label="Total años trabajados"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupD3"
                                    label="Negocio, campo o Industria"
                                    size="small"
                                    bug={errors}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ¿Fuma ahora (incluye un mes atrás)?"
                                    name="tabaquismoBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="tabaquismoCSintR"
                                    label="C. ¿A qué edad comenzó a fumar en forma regular"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="tabaquismoDSintR"
                                    label="D. ¿Si ya dejo de fumar totalmente, ¿A que edad lo dejó?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="tabaquismoESintR"
                                    label="E. ¿Cuantos cigarrillos fuma al día o fumaba?"
                                    size="small"
                                    bug={errors}
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
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="actDeporA1SintR"
                                    label="¿Cual deporte o actividad?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="actDeporA2SintR"
                                    label="¿Cual deporte o actividad?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="actDeporA3SintR"
                                    label="¿Cual deporte o actividad?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="actDeporA4SintR"
                                    label="¿Cual deporte o actividad?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">RECOMENDACIONES</Typography></>}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={10}
                                defaultValue=""
                                fullWidth
                                name="recoSintR"
                                label="Recomendaciones/Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </Accordion>
        </Fragment>
    );
};

export default RespiratorySymptoms;

RespiratorySymptoms.propTypes = {
    lsEmployee: PropTypes.any,
    documento: PropTypes.any,
    errors: PropTypes.any,
};