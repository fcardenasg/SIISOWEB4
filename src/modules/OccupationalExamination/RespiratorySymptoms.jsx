import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, useMediaQuery,
    Grid, Typography, Divider
} from '@mui/material';

import InputOnChange from 'components/input/InputOnChange';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import DetailedIcon from 'components/controllers/DetailedIcon';
import InputCheckBox from 'components/input/InputCheckBox';
import InputCheck from 'components/input/InputCheck';
import Accordion from 'components/accordion/Accordion';
import { FormProvider } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputDatePicker from 'components/input/InputDatePicker';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { IconEdit } from '@tabler/icons';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import FullScreenDialog from 'components/controllers/FullScreenDialog'
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import TableAntecedentes from './TableEmo/TableAntecedentes';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const RespiratorySymptoms = ({ errors, documento, setAntropometria, antropometria, setEstadoVacuna, estadoVacuna, lsEmployee, setArrays, arrays, ...methods }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [imc, setIMC] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [clasificacionColor, setClasificacionColor] = useState('');

    const handleChangeTalla = (event) => {
        try {
            setTalla(event.target.value);
            var tallaPaci = event.target.value;
            var imcFinal = peso / Math.pow(tallaPaci, 2);
            setIMC(imcFinal.toFixed(1));

            if (imcFinal < 18.4) {
                setClasificacion("Bajo de Peso")
                setClasificacionColor("info");
            } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                setClasificacion("Normal")
                setClasificacionColor("success");
            } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                setClasificacion("Sobrepeso")
                setClasificacionColor("warning");
            } else if (imcFinal >= 25 && imcFinal <= 34.9) {
                setClasificacion("Obesidad Grado I")
                setClasificacionColor("error");
            } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                setClasificacion("Obesidad Grado II")
                setClasificacionColor("error");
            } else if (imcFinal > 40) {
                setClasificacion("Obesidad Grado III")
                setClasificacionColor("error");
            } else {
                setClasificacion('')
            }
        } catch (error) { }
    }

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [cadenaHistory, setCadenaHistory] = useState('');

    const [lsDeporte, setLsDeporte] = useState([]);
    const [lsTipoFobia, setLsTipoFobia] = useState([]);
    const [lsFrecuencia, setLsFrecuencia] = useState([]);

    const [lsPariente, setLsPariente] = useState([]);
    const [lsGineMetodo, setLsGineMetodo] = useState([]);
    const [lsBiotipo, setLsBiotipo] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);
    const [lsConceptoActitud, setLsConceptoActitud] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);
    const [lsCiclos, setLsCiclos] = useState([]);

    const [lsNeConceptoActi, setLsNeConceptoActi] = useState([]);
    const [lsOpcion, setLsOpcion] = useState([]);
    const [lsNeADonde, setLsNeADonde] = useState([]);
    const [lsRiesClasifi, setLsRiesClasifi] = useState([]);

    const [lsFramDeporte, setLsFramDeporte] = useState([]);
    const [lsFramBebida, setLsFramBebida] = useState([]);
    const [lsFramDxMetabolismo, setLsFramDxMetabolismo] = useState([]);
    const [lsFramDxTension, setLsFramDxTension] = useState([]);
    const [lsFramAntecedentesCardiovascular, setLsFramAntecedentesCardiovascular] = useState([]);

    async function GetAll() {
        try {
            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

            const lsServerRiesClasifi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RIES_CLASI);
            var resultRiesClasifi = lsServerRiesClasifi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesClasifi(resultRiesClasifi);

            const lsServerFramDeporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_FRAM_DEPOR);
            var resultFramDeporte = lsServerFramDeporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsFramDeporte(resultFramDeporte);

            const lsServerFramBebida = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_FRAM_BEBIDAS);
            var resultFramBebida = lsServerFramBebida.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsFramBebida(resultFramBebida);

            const lsServerFramDxMetabolismo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_DXMETA);
            var resultFramDxMetabolismo = lsServerFramDxMetabolismo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsFramDxMetabolismo(resultFramDxMetabolismo);

            const lsServerFramDxTension = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_DXTENSI);
            var resultFramDxTension = lsServerFramDxTension.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));

            setLsFramDxTension(resultFramDxTension);

            const lsServerFramAntecedentesCardiovascular = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_ANTE_CARDIOVAS);
            var resultFramAntecedentesCardiovascular = lsServerFramAntecedentesCardiovascular.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsFramAntecedentesCardiovascular(resultFramAntecedentesCardiovascular);

            const lsServerNeConceptoActi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_NECONCEPTOAC);
            var resultNeConceptoActi = lsServerNeConceptoActi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsNeConceptoActi(resultNeConceptoActi);

            const lsServerOpcion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.OPT_SINO);
            var resultOpcion = lsServerOpcion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOpcion(resultOpcion);

            const lsServerNeADonde = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_NEADONDE);
            var resultNeADonde = lsServerNeADonde.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsNeADonde(resultNeADonde);

            const lsServerCiclos = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_GINECOCICLO);
            var resultCiclos = lsServerCiclos.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCiclos(resultCiclos);

            const lsServerPariente = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_PARENTES);
            var resultPariente = lsServerPariente.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsPariente(resultPariente);

            const lsServerGineMetodo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_GINECOMETO);
            var resultGineMetodo = lsServerGineMetodo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGineMetodo(resultGineMetodo);

            const lsServerBiotipo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_BIOTIPO);
            var resultBiotipo = lsServerBiotipo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsBiotipo(resultBiotipo);

            const lsServerResultado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RESULT);
            var resultResultado = lsServerResultado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResultado(resultResultado);

            const lsServerConceptoActitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEP_ACTIPSI);
            var resultConceptoActitud = lsServerConceptoActitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoActitud(resultConceptoActitud);

            const lsServerDeporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HC_DEPOR);
            var resultDeporte = lsServerDeporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDeporte(resultDeporte);

            const lsServerFrecuencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_FRECUENCIAS);
            var resultFrecuencia = lsServerFrecuencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsFrecuencia(resultFrecuencia);

            const lsServerTipoFobia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HC_TIFOBIA);
            var resultTipoFobia = lsServerTipoFobia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoFobia(resultTipoFobia);

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

            <FullScreenDialog
                open={openHistory}
                title="VISTA DE HISTÓRICO"
                handleClose={() => setOpenHistory(false)}
            >
                <TableAntecedentes documento={documento} param={cadenaHistory} />
            </FullScreenDialog>

            <SubCard darkTitle title={<Typography variant="h4">TOS</Typography>}>
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
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">ATAQUES</Typography>}>
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
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">GRIPAS</Typography>}>
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
                                    name="otrasEnfInhaASintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={10}>
                            <Typography variant="h4">B. ¿Ha tenido alguna de las siguientes enfermedades (confirmadas por el medico)?</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. ¿Ataques de bronquitis?"
                                    name="otrasEnfInhaBSintR"
                                    size={25}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="otrasEnfInhaDescriSintR"
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
                                    name="otrasEnfInhaBSintR"
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
                                    name="otrasEnfInhaDescriSintR"
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
                                    name="otrasEnfInhaBSintR"
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
                                    name="otrasEnfInhaDescriSintR"
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
                                    name="otrasEnfInhaBSintR"
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
                                    name="otrasEnfInhaDescriSintR"
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
                                    name="otrasEnfInhaBSintR"
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
                                    name="otrasEnfInhaDescriSintR"
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
                                    name="otrasEnfInhaBSintR"
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
                                    name="otrasEnfInhaDescriSintR"
                                    label="Edad de Inicio"
                                    size="small"
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />
            </SubCard>

        </Fragment>
    );
};

export default RespiratorySymptoms;

RespiratorySymptoms.propTypes = {
    lsEmployee: PropTypes.any,
    documento: PropTypes.any,
    errors: PropTypes.any,
    setArrays: PropTypes.func,
    arrays: PropTypes.any,
    setAntropometria: PropTypes.func,
    antropometria: PropTypes.object,
    setEstadoVacuna: PropTypes.func,
    estadoVacuna: PropTypes.any,
};