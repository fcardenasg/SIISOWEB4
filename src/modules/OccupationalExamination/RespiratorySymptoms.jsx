import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
    Grid, Typography,
} from '@mui/material';

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

            <SubCard darkTitle title={<Typography variant="h4">TOS</Typography>}>
                <SubCard darkTitle title="Tos">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ??Tiene tos usualmente (Incluye con el primer cigarrillo o la primera salida a la calle, excluye carraspeo)?"
                                    name="tosAUsualSin"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ??Tose 4 a 6 veces al d??a, durante cuatro o m??s d??as de la semana?"
                                    name="tosEnLaSemanaSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ??Suele toser levant??ndose por la ma??ana a primera hora, durante el resto del d??a o la noche?"
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
                                    label="D. ??Usted suele toser as?? casi todos los d??as por 3 meses consecutivos o por m??s de un a??o?"
                                    name="tosConsecutivaSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography>E. ??Ha presentado TOS por cuantos a??os?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="anosConTosSintR"
                                    label="A??os"
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
                                    label="B. ??Expectora as?? dos veces al d??a, al menos cuatro d??as a la semana?"
                                    name="esputoBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ??Suele expectorar al levantarse o a primera hora de la ma??ana, durante el resto del d??a o de la noche?"
                                    name="esputoCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ??Expectora as?? la mayor??a de los d??as por 3 meses consecutivos o m??s o durante un a??o?"
                                    name="esputoDSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>E. ??Relacione n??mero de a??os que ha expectorado?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="esputoESintR"
                                    label="A??os"
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
                                    label="A. ??Ha tenido episodios de tos y flema (o aumento, si usualmente los presenta) que duren 3 o m??s de un a??o?"
                                    name="episoTosEspuASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ??Cuantos a??os ha tenido al menos un episodio al a??o?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="episoTosEsputoBSintR"
                                    label="A??os"
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
                                    label="3. La mayor??a de d??as y noches"
                                    name="sibilanciasA3SintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ??Por cuantos a??os ha presentado esta situaci??n?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="sibilanciasBSintR"
                                    label="A??os"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">ATAQUES</Typography>}>
                <SubCard darkTitle title="Ataques De Silbidos">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ??Alguna vez ha tenido un ataque de silbidos que le haya hecho sentir ahogo?"
                                    name="ataquesSilbiASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>B. ??Qu?? edad ten??a cuando le dio el primer ataque?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="ataquesSilbiBSintR"
                                    label="A??os"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. Ha tenido dos o m??s episodios"
                                    name="ataquesSilbiCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ??Ha necesitado drogas o tratamientos para estos ataques?"
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
                                    label="A. ??Presenta inhabilidad por una condici??n diferente a enfermedad de pulm??n o coraz??n?"
                                    name="otrasEnfInhaASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ??Usted suele toser as?? casi todos los d??as por 3 meses consecutivos o por m??s de un a??o?"
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
                                    label="Describa la naturaleza de esta condici??n:"
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
                                    label="A. ??Se ahoga al subir de un nivel a otro al caminar por una cuesta suave?"
                                    name="disneaASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">En caso afirmativo a lo anterior, contin??e con las siguientes preguntas, sino dir??jase al siguiente punto</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ??Por causa del ahogo tiene que caminar m??s despacio que la gente de su edad, en una cuesta suave?"
                                    name="disneaBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. ??Tiene que detenerse a respirar cuando camina a su paso npor una cuesta suave?"
                                    name="disneaCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="D. ??Tiene que parar a respirar luego de caminar 100 yardas (o luego de algunos minutos) por una cuesta suave?"
                                    name="disneaDSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="E. ??El ahogo le dificulta dejar su casa, vestirse o desvestirte?"
                                    name="disneaESintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">GRIPAS</Typography>}>
                <SubCard darkTitle title="Gripas y Enfermedades del Torax">
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ??Si se resfr??a se le afecta el pecho?"
                                    name="enferToraxASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ??En los ??ltimos 3 a??os ha presentado enfermedad que lo aleje de su trabajo, lo mantenga en casa o en cama?"
                                    name="enferToraxBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="C. Expector?? con alguna de estas enfermedades"
                                    name="enferToraxCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={10}>
                            <Typography>D. ??En los ??ltimos a??os cuantas de estas enfermedades con esputo le han durado una semana o m??s?, ??N??mero de Enfermedades?</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="enferToraxD"
                                    label="A??os"
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
                                    label="A. ??Tuvo alguna enfermedad pulmonar antes de los 16 a??os?"
                                    name="antecedentesASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">B. ??Ha tenido alguna de las siguientes enfermedades (confirmadas por el medico)?</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. ??Ataques de bronquitis?"
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
                                    label="??A qu?? edad present?? el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. ??Neumon??a o bronconeumon??a?"
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
                                    label="??A qu?? edad present?? el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. ??Bronquitis Cr??nica?"
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
                                    label="??A qu?? edad present?? el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3.1 ??A??n presenta esta enfermedad?"
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
                                    label="4. ??Enfisema Pulmonar?"
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
                                    label="??A qu?? edad present?? el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4.1 ??A??n presenta esta enfermedad?"
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
                                    label="5. ??Asma?"
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
                                    label="??A qu?? edad present?? el primer ataque?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5.1 ??Aun Presenta esta enfermedad?"
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
                                    label="??Edad de Inicio?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Otras enfermedades del t??rax"
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
                                    label="7. ??Alguna Cirug??a del t??rax?"
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
                                    label="8. HISTORIA (alg??n accidente) del t??rax"
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
                                    label="9. ??Problemas del coraz??n?"
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
                                    label="??Ha recibido tratamiento por esta causa los ??ltimos 10 a??os?"
                                    name="problemaCoraCSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Presi??n Alta(Recuerde que debe ser confirmada por el m??dico)"
                                    name="presionAltaASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10.1 ??Ha recibido tratamiento por esta causa en los ??ltimos diez a??os?"
                                    name="presionAltaBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">HISTORIA</Typography>}>
                <SubCard darkTitle title="Historia Ocupacional">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="A. ??Ha trabajado tiempo completo (8 horas a la semana o m??s) por 6 meses o m??s?"
                                    name="historiaOcupASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ??Ha trabajado al menos durante 6 meses en un empleo donde tuvo exposici??n a polvos?"
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
                                    label="??Total a??os trabajados?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="historiaOcupB3SintR"
                                    label="La exposici??n fue:"
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
                                    label="C. ??Ha trabajado en un empleo donde haya exposici??n a humos y gases qu??micos?"
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
                                    label="Especifique empleo y ocupaci??n o industria"
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
                                    label="Total a??os trabajados"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="historiaOcupC3SintR"
                                    label="La exposici??n fue:"
                                    defaultValue=""
                                    options={lsExposicion}
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5">D. ??Cual ha sido su ocupaci??n o trabajo usual en el que ha laborado por m??s tiempo?</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="historiaOcupD1SintR"
                                    label="Empleo y Ocupaci??n"
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
                                    label="Total a??os trabajados"
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
                                    label="A. ??Ha fumado cigarrillos, pipa o tabaco (al menos uno(a) al d??a por un a??o o 12 onzas de tabaco durante la vida)?"
                                    name="tabaquismoASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="B. ??Fuma ahora (incluye un mes atr??s)?"
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
                                    label="C. ??A qu?? edad comenz?? a fumar en forma regular"
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
                                    label="D. ??Si ya dejo de fumar totalmente, ??A que edad lo dej???"
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
                                    label="E. ??Cuantos cigarrillos fuma al d??a o fumaba?"
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
                                    label="A. ??Realiza alg??n deporte?"
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
                                    label="??Cual deporte o actividad?"
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
                                    label="??Cual deporte o actividad?"
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
                                    label="??Cual deporte o actividad?"
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
                                    label="??Cual deporte o actividad?"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">RECOMENDACIONES</Typography>}>
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
            </SubCard>
        </Fragment>
    );
};

export default RespiratorySymptoms;

RespiratorySymptoms.propTypes = {
    lsEmployee: PropTypes.any,
    documento: PropTypes.any,
    errors: PropTypes.any,
};