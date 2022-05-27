import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, useMediaQuery,
    Grid, Typography, Divider
} from '@mui/material';

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

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const Emo = ({ errors, setEstadoVacuna, estadoVacuna, lsEmployee, setArrays, arrays, ...methods }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewPdf, setOpenViewPdf] = useState(false);

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
                open={openViewPdf}
                title="VISTA DE PDF"
                handleClose={() => setOpenViewPdf(false)}
            >

            </FullScreenDialog>

            <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES PATALÓGICOS</Typography>}>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="1. Congenitos"
                                name="congenitosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="2. Inmunoprevenible"
                                name="inmunoPrevenibleAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="3. Infecciosos"
                                name="infecciososAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="4. Ojos"
                                name="ojoAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="5. Agudeza Visual"
                                name="agudezaVisualAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="6. Oidos"
                                name="oidosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="7. Nasofaringe"
                                name="nasoFaringeAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="8. Cardiovascular"
                                name="cardiovascularAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="9. Pulmonar"
                                name="pulmonarAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="10. Gastrointestinal"
                                name="gastrointestinalAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="11. Genitourinario"
                                name="gimitoUrinarioAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="12. Neurológico"
                                name="neurologicoAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="13. Trastornos de piel"
                                name="transtornoPielAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="14. Osteomusculares"
                                name="osteoMuscularAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="15. Alérgicos"
                                name="alergicosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="16. Tóxicos"
                                name="toxicoAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="17. Farmacólogicos"
                                name="faRmacologicosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="18. Quirúrgicos"
                                name="quirurgicosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="19. Traumático"
                                name="traumaticosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="20. Transfusiones"
                                name="tranfuccionesAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="21. ETS"
                                name="etsAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="22. Deformidades"
                                name="deformidadesAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="23. Psiquiatrico"
                                name="psiquiatricosAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="24. Farmacodependencia"
                                name="farmacoDependenciaAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="25. E.M."
                                name="emAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="26. Renal"
                                name="renalAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="27. Asma"
                                name="asmaAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="28. O.R.L."
                                name="orlAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="29. Cancer"
                                name="cancerAP"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pt: 2 }}>
                    <FormProvider {...methods}>
                        <InputText
                            multiline
                            rows={4}
                            defaultValue=""
                            fullWidth
                            name="especifiqueAP"
                            label="Especifique"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
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
                        onClick={() => setOpen(true)}
                        icons={DetailIcons[1].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[2].title}
                        onClick={() => setOpenViewPdf(true)}
                        icons={DetailIcons[2].icons}
                    />
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">ACCIDENTES DE TRABAJO / ENFERMEDAD LABORAL</Typography>}>
                <Grid container spacing={2}>
                    <Grid item xs={3} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioAT"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={4}
                                defaultValue=""
                                fullWidth
                                name="especifiqueAT"
                                label="Especifique"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                    <DetailedIcon
                        title={DetailIcons[0].title}
                        onClick={() => setOpenTemplate(true)}
                        icons={DetailIcons[0].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[1].title}
                        onClick={() => setOpen(true)}
                        icons={DetailIcons[1].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[2].title}
                        onClick={() => setOpenViewPdf(true)}
                        icons={DetailIcons[2].icons}
                    />
                </Grid>

                <Grid container spacing={2} sx={{ pt: 2 }}>
                    <Grid item xs={3} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anio1AT"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={4}
                                defaultValue=""
                                fullWidth
                                name="especifique1AT"
                                label="Especifique"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                    <DetailedIcon
                        title={DetailIcons[0].title}
                        onClick={() => setOpenTemplate(true)}
                        icons={DetailIcons[0].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[1].title}
                        onClick={() => setOpen(true)}
                        icons={DetailIcons[1].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[2].title}
                        onClick={() => setOpenViewPdf(true)}
                        icons={DetailIcons[2].icons}
                    />
                </Grid>

            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">INMUNIZACIONES</Typography>}>
                <Grid container spacing={3} sx={{ pb: 1, pt: 1 }}>

                    <Grid item xs={2} >
                        <InputCheck
                            label="Tetano"
                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, tetanoIM: e.target.checked })}
                            size={30}
                            checked={estadoVacuna.tetanoIM}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="Influenza"
                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, influenzaIM: e.target.checked })}
                            size={30}
                            checked={estadoVacuna.influenzaIM}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="Fiebre Amarilla"
                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, fiebreAmarillaIM: e.target.checked })}
                            size={30}
                            checked={estadoVacuna.fiebreAmarillaIM}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="Rubéola - Sarampión"
                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, rubeolaSarampionIM: e.target.checked })}
                            size={30}
                            checked={estadoVacuna.rubeolaSarampionIM}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="COVID-19"
                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, covid19IM: e.target.checked })}
                            size={30}
                            checked={estadoVacuna.covid19IM}
                        />
                    </Grid>

                    <Grid item xs={2} >
                        <InputCheck
                            label="Otras"
                            onChange={(e) => setEstadoVacuna({ ...estadoVacuna, otrasIM: e.target.checked })}
                            size={30}
                            checked={estadoVacuna.otrasIM}
                        />
                    </Grid>

                    {estadoVacuna.tetanoIM ?
                        <Grid item xs={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue={""}
                                    fullWidth
                                    name="anioVacuna1IM"
                                    label="Año Tetano"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid> : <></>}
                    {estadoVacuna.influenzaIM ?
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="anioVacuna2IM"
                                    label="Año Influenza"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid> : <></>}
                    {estadoVacuna.fiebreAmarillaIM ?
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="anioVacuna3IM"
                                    label="Año Fiebre Amarilla"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid> : <></>}
                    {estadoVacuna.rubeolaSarampionIM ?
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="anioVacuna4IM"
                                    label="Año Rubéola - Sarampion"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid> : <></>}
                    {estadoVacuna.covid19IM ?
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    fullWidth
                                    name="anioVacuna5IM"
                                    label="Año COVID-19"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid> : <></>}
                    {estadoVacuna.otrasIM ? <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                type="number"
                                defaultValue=""
                                fullWidth
                                name="anioVacuna6IM"
                                label="Año Otras"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid> : <></>}
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">HÁBITOS</Typography>}>
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Fuma"
                                name="fumaHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="cigarrillosDiasFumaHB"
                                label="Cigarrillos Al Día"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="aniosCigaFumaHB"
                                label="Años"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>

                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="mesesCigaFumaHB"
                                label="Meses"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionFumaHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Fumaba"
                                name="fumabaHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="cigarrillosDiasFumabaHB"
                                label="Cigarrillos Al Día"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="aniosCigaFumabaHB"
                                label="Años"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                type="number"
                                name="mesesCigaFumabaHB"
                                label="Meses"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionFumabaHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Practica Deporte"
                                name="practicaDeporteHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idFrecuenciaDeporteHB"
                                label="Frecuencia Deporte"
                                defaultValue=""
                                options={lsFrecuencia}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idCualDeporteHB"
                                label="Cual Deporte"
                                defaultValue=""
                                options={lsDeporte}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionPracticaDeporHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Hobby/Pasatiempos"
                                name="hobbiesPasatiempoHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={10} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="cualHobbiesHB"
                                label="Cual"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="¿Consume Bebidas Alcohólicas?"
                                name="consumeBebidasAlcoholicasHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idFrecuenciaBebidaAlHB"
                                label="Frecuencia de Bebidas"
                                defaultValue=""
                                options={lsFrecuencia}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={7}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="cualBebidasAlHB"
                                label="Cual"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Fobias"
                                name="fobiasHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={5} >
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setArrays({ ...arrays, tipoFobia: value })}
                            value={arrays.tipoFobia}
                            label="Tipo de Fobia"
                            options={lsTipoFobia}
                        />
                    </Grid>

                    <Grid item xs={5} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="cualFobiaHB"
                                label="Cual"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="Heredo familiar"
                                name="heredoFamiliarHB"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={5} >
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setArrays({ ...arrays, parentesco: value })}
                            value={arrays.parentesco}
                            label="Parentesco"
                            options={lsPariente}
                        />
                    </Grid>

                    <Grid item xs={5}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionHeredoFamiHB"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

            </SubCard>
            <Grid sx={{ pb: 2 }} />

            {lsEmployee.genero == DefaultValue.GeneroWomen ?
                <Fragment>
                    <SubCard darkTitle title={<Typography variant="h4">GINECO OBSTÉTRICOS</Typography>}>
                        <Grid container spacing={2} sx={{ pb: 2 }}>
                            <Grid item xs={2.5}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="menarquiaGO"
                                        label="Menarquía (EDAD)"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.5} >
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idCiclosGO"
                                        label="Ciclos"
                                        defaultValue=""
                                        options={lsCiclos}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.5} >
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="duracionGO"
                                        label="Duración (DIAS)"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.5}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Amenorrea"
                                        name="amenoreaGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.5}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Dismenorrea"
                                        name="disminureaGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.5} >
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Leucorrea"
                                        name="leucoreaGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ pb: 2 }}>
                            <Grid item xs={2.5}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="vidaMaritalGO"
                                        label="Vida Marital (EDAD EN AÑOS)"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.5}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="vidaObstetricaGO"
                                        label="Vida Obstétrica (EDAD EN AÑOS)"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="gGO"
                                        label="G"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.4} >
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="pGO"
                                        label="P"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.4} >
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="aGO"
                                        label="A"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.4} >
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="cSGO"
                                        label="C"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.4} >
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="vGO"
                                        label="V"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ pb: 2 }}  >
                            <Grid item xs={2.5}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fUPGO"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.5}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fURGO"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="ETS"
                                        name="eTSGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="cUALGO"
                                        label="Cúal?"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Quiste de Ovarios - Miomas"
                                        name="quisteOvariosBiomasGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.5}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Endometriosis"
                                        name="endometriosisGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1}>
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="EPI"
                                        name="ePIGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={1.5} >
                                <FormProvider {...methods}>
                                    <InputCheckBox
                                        label="Planifica"
                                        name="planificaGO"
                                        size={30}
                                        defaultValue={false}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idMetodoGO"
                                        label="Método"
                                        defaultValue=""
                                        options={lsGineMetodo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        type="number"
                                        name="ultimoAnioCitologiaGO"
                                        label="Ultimo Año Citologia."
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idResultadoGO"
                                        label="Resultado"
                                        defaultValue=""
                                        options={lsResultado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                    <Grid sx={{ pb: 2 }} />
                </Fragment>
                : <></>}

            <SubCard darkTitle title={<Typography variant="h4">REVISIÓN POR SISTEMAS</Typography>}>
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="1. Cabeza - Cefalea"
                                name="cabezaRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="2. Ojos(A. Visual, dolor, congestion, etc)"
                                name="ojosRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="3. Oidos(A. Auditiva, dolor, secreción)"
                                name="oidosRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="4. Nariz (Congestión, epistaxis, rinorrea)"
                                name="narizRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="5. Boca (eraciones, sangrado de encias)"
                                name="bocaRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="6. Garganta (Dolor, ardor, disfagia, disfonía)"
                                name="gargantaRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="7. Cuello (Dolor, torticolis, opatías)"
                                name="cuellosRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="8. Cardio-Respiratorio"
                                name="cardioRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="9. Gastrointestinal"
                                name="gastrointestinalRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="10. GenitoUrinario"
                                name="genitoUrinarioRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="11. Osteo-Articular"
                                name="osteoRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="12.Neuro-Muscular"
                                name="neuroRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4} >
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="13. Piel y Anexos"
                                name="pielRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="14. Psiquiátrico"
                                name="psiquiatricoRS"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <FormProvider {...methods}>
                        <InputText
                            multiline
                            rows={4}
                            defaultValue=""
                            fullWidth
                            name="observacionRS"
                            label="Observaciones"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
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
                        onClick={() => setOpen(true)}
                        icons={DetailIcons[1].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[2].title}
                        onClick={() => setOpenViewPdf(true)}
                        icons={DetailIcons[2].icons}
                    />
                </Grid>

            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXAMEN FÍSICO</Typography>}>
                <SubCard title="Signos Vitales" secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tASentadoEF"
                                    label="TA Sentado"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tAAcostadoEF"
                                    label="TA Acostado"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="pulsoEF"
                                    label="Pulso"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fCEF"
                                    label="FC"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fREF"
                                    label="FR"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="temperaturaEF"
                                    label="Temperatura"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>

                <Grid sx={{ pb: 2 }} />

                <SubCard title="Antropometria" secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="pesoEF"
                                    label="Peso(Kilos)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tallaEF"
                                    label="Talla(Metros)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="iMCEF"
                                    label="IMC"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Clasificación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idBiotipoEF"
                                    label="Biotipo"
                                    defaultValue=""
                                    options={lsBiotipo}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>

                <Grid sx={{ pb: 2 }} />

                <SubCard title="Exploración Morfologica" secondary={<Button><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container spacing={1} sx={{ pb: 2 }}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. Estado Nutricional"
                                    name="estadoNitricionalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. Piel-Faneras"
                                    name="pielFaneraEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. Craneo"
                                    name="craneoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4. Parpados"
                                    name="parpadoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5. Conjuntivas"
                                    name="conjuntivasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Corneas"
                                    name="corniasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="7. Pupilas"
                                    name="pupilasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="8. Reflejo Fotomotors"
                                    name="reflejoFotomotorEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="9. Reflejo Corneal"
                                    name="reflejoCornialEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Fondo Ojos"
                                    name="fondoOjosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="11. Inspección Externa Oidos"
                                    name="inspeccionEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="12. Otoscopia"
                                    name="otoscopiaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="13. Inpección Externa de Nariz"
                                    name="inspeccionNarizEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="14. Rinoscopia"
                                    name="rinoscopioEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="15. Labios"
                                    name="labiosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="16. Mucosa Oral"
                                    name="mucosaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="17. Encias"
                                    name="enciasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="18. Paladar"
                                    name="paladarEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="19. Dientes"
                                    name="dientesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="20. Lengua"
                                    name="lenguaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="21. Faringe"
                                    name="faringeEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="22. Amigdalas"
                                    name="amigdalasEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="23. Cuello Tiroides"
                                    name="cuellosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="24. Inspección de Torax-Mamas"
                                    name="inspeccionToraxEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="25. Auscultación Cardiaca"
                                    name="auscultacionCardiacaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="26. Auscultación Respiratoria"
                                    name="auscultacionRespiratoriaEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="27. Inspección Abdomen"
                                    name="inspeccionAbdomenEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="28. Palpación Abdomen"
                                    name="palpacionAbdomenEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="29. Exploración Higado"
                                    name="exploracionHigadoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="30. Exploración de Bazo"
                                    name="exploracionVasoEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="31. Exploración Riñones"
                                    name="exploracionRinionesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="32. Anillos Inguinale"
                                    name="anillosInguinalesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="33. Anillo Umbilical"
                                    name="anilloUmbilicalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="34. Genitales Externos"
                                    name="genitalesExternosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="35. Región Anal"
                                    name="regionAnalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="36. Tacto Rectal"
                                    name="tactoRectalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="37. Tacto Vaginal"
                                    name="tactoVaginalEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="38. Extremidades Superiores"
                                    name="extremidadesSuperioresEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="39. Extremidades Inferiores"
                                    name="extremidadesInferioresEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="40. Pulsos"
                                    name="pulsosEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="41. Columna Vertebral"
                                    name="columnaVertebralEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="42. Articulaciones"
                                    name="articulacionesEF"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <FormProvider {...methods}>
                        <InputText
                            multiline
                            rows={4}
                            defaultValue=""
                            fullWidth
                            name="especifiqueEMEFU"
                            label="Especifique"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>

                    <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                        <DetailedIcon
                            title={DetailIcons[0].title}
                            onClick={() => setOpenTemplate(true)}
                            icons={DetailIcons[0].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[1].title}
                            onClick={() => setOpen(true)}
                            icons={DetailIcons[1].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[2].title}
                            onClick={() => setOpenViewPdf(true)}
                            icons={DetailIcons[2].icons}
                        />
                    </Grid>
                </SubCard>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXPLORACIÓN FUNCIONAL</Typography>}>
                <Grid container spacing={1} sx={{ pb: 2 }}>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="1. Movilidad Ocular"
                                name="movilidadEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="2. Equilibrio"
                                name="equilibrioEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="3. Marcha Coordinación"
                                name="marchaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="4. Movilidad Hombro"
                                name="movilidadHombroEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="5. Movilidad Codo"
                                name="movilidadCodoEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="6. Movilidad Muñeca"
                                name="movilidadMuniecaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="7. Signo de Tinel"
                                name="signoTinelEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="8. Signo de Phalen"
                                name="signoPhalenEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="9. Movilidad Manos"
                                name="movilidadManosEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="10. Movilidad Cadera"
                                name="movilidadCaderaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="11. Movilidad Rodilla"
                                name="movilidadRodillaEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="12. Movilidad Tobillo"
                                name="movilidadTobilloEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="13. Movilidad Cuello (C1-C4)"
                                name="movilidadCuelloEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="14. ROT Bicipital (C5)"
                                name="rOTVisipitalEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="15. ROT Rotuliano (L4)"
                                name="rOTRotuleanoEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="16. Extencion Primer Artejo (L5)"
                                name="extencionEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="17. Sensibilidad cara anterior pie (L5)"
                                name="sensibilidadCaraAnteriorEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="18. Eversión Pie(S1)"
                                name="eversionPiesEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="19. Sensibilidad cara lateral pie (L5)"
                                name="sensibilidadCaraLateralEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="20. ROT Aquiliano"
                                name="rOTAquileanoEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="21. Signo de la Laségue"
                                name="signoLasegueEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputCheckBox
                                label="22. Indice Wells"
                                name="indiceWellsEFU"
                                size={30}
                                defaultValue={false}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <FormProvider {...methods}>
                    <InputText
                        multiline
                        rows={4}
                        defaultValue=""
                        fullWidth
                        name="observacionEFU"
                        label="Observaciones"
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors}
                    />
                </FormProvider>

                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                    <DetailedIcon
                        title={DetailIcons[0].title}
                        onClick={() => setOpenTemplate(true)}
                        icons={DetailIcons[0].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[1].title}
                        onClick={() => setOpen(true)}
                        icons={DetailIcons[1].icons}
                    />

                    <DetailedIcon
                        title={DetailIcons[2].title}
                        onClick={() => setOpenViewPdf(true)}
                        icons={DetailIcons[2].icons}
                    />
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">EXÁMENES PARACLÍNICOS</Typography>}>
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Rx de Torax(Criterios OIT)"
                                name="fechaRxToraxEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoRxToraxEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesRxToraxEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Espirometria"
                                name="fechaEspirometriaEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoEspirometriaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesEspirometriaEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Audiometria"
                                name="fechaAudiometriaEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoAudiometriaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesAudiometriaEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Visiometria"
                                name="fechaVisiometriaEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoVisiometriaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6} >
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesVisiometriaEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Laboratorio Clinico"
                                name="fechaLaboratorioClinicoEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoLaboratorioClinicoEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesLaboratorioClinicoEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Cuestionario de Sintomas Respiratorios"
                                name="fechaCuestionarioSintomaEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoCuestionarioSintomaEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesCuestionarioSintomaEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="EKG"
                                name="fechaEkgEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoEkgEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesEkgEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="RNM-Columna Lumbosacra"
                                name="fechaRnmLumbosacraEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoRnmLumbosacraEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesRnmLumbosacraEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="RNM-Columna Cervical"
                                name="fechaRnmCervicalEPA"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2} >
                        <FormProvider {...methods}>
                            <InputSelect
                                name="resultadoRnmCervicalEPA"
                                label="Resultado"
                                defaultValue=""
                                options={lsResultado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="observacionesRnmCervicalEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={2}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[0].title}
                                onClick={() => setOpenTemplate(true)}
                                icons={DetailIcons[0].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[1].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                xs={4}
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={4}
                                defaultValue=""
                                fullWidth
                                name="observacionEPA"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
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
                            onClick={() => setOpen(true)}
                            icons={DetailIcons[1].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[2].title}
                            onClick={() => setOpenViewPdf(true)}
                            icons={DetailIcons[2].icons}
                        />
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">IMPRESIÓN DIAGNÓSTICA Y CONCEPTO FINAL</Typography>}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputMultiSelects
                            fullWidth
                            onChange={(event, value) => setArrays({ ...arrays, dx: value })}
                            value={arrays.dx}
                            label="DX"
                            options={lsCie11}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={4}
                                defaultValue=""
                                fullWidth
                                name="observacionID"
                                label="Observaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
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
                            onClick={() => setOpen(true)}
                            icons={DetailIcons[1].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[2].title}
                            onClick={() => setOpenViewPdf(true)}
                            icons={DetailIcons[2].icons}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={4}
                                defaultValue=""
                                fullWidth
                                name="recomendacionesID"
                                label="Recomendaciones"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
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
                            onClick={() => setOpen(true)}
                            icons={DetailIcons[1].icons}
                        />

                        <DetailedIcon
                            title={DetailIcons[2].title}
                            onClick={() => setOpenViewPdf(true)}
                            icons={DetailIcons[2].icons}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idConceptoActitudID"
                                label="Concepto de Aptitud PsicoFisica"
                                defaultValue=""
                                options={lsConceptoActitud}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography variant="h4" color="inherit">TRABAJO EN ALTURA</Typography></>}>

                <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPRESA</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha Del Concepto"
                                    name="fechaRnmCervicalEPA"
                                    defaultValue={new Date()}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="conceptoActitudNETA"
                                    label="Concepto Aptitud"
                                    defaultValue=""
                                    options={lsNeConceptoActi}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="conceptoAplazadoNETA"
                                    label="El Concepto de aptitud debe ser aplazado"
                                    defaultValue=""
                                    options={lsOpcion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    name="motivoAplazoNETA"
                                    label="Motivo de Aplazo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    name="descripcionResultadoNETA"
                                    label="Descripción de resultados(Resumen de limitaciones o restricciones)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    name="recomendacionesNETA"
                                    label="Recomendaciones (En términos sencillos de cuidados y controles requeridos)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>

                        <Grid item xs={6} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="remitidoNETA"
                                    label="Remitido"
                                    defaultValue=""
                                    options={lsOpcion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="remididoDondeNETA"
                                    label="A Donde:"
                                    defaultValue=""
                                    options={lsNeADonde}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPLEADO</Typography>}>
                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="pesoEF"
                                    label="Peso(Kilos)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tallaEF"
                                    label="Talla(Metros)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="iMCEF"
                                    label="IMC"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3} >
                            <FormProvider {...methods}>
                                <InputText
                                    disabled
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="clasificacionEF"
                                    label="Clasificación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idRiesgoCardiovascularNEMTA"
                                    label="Riesgo Cardiovascular"
                                    defaultValue=""
                                    options={lsRiesClasifi}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idClasificacionNEMTA"
                                    label="Clasificación"
                                    defaultValue=""
                                    options={lsRiesClasifi}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="1. Menor de Edad."
                                    name="idMenorEdadNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="2. Mujer embarazada con cualquier edad de Gestacíón."
                                    name="idMujerEmbarazadaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="3. Arritmias Cardiacas."
                                    name="idArimiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="4. Enfermedades o malformaciones cardiacas asintomáticas."
                                    name="idEnfermedadNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="5. Historia de Hipotensión ortostática (no basta presentar episodios aislados)."
                                    name="idHistoriaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="6. Hipertensión arterial no controlada o resistente al tratamiento."
                                    name="idHipertensionNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="7. Hipertrigliceridemia aislada severa, con cifras mayores a 500 mg/dl."
                                    name="idHipertrigliceridemiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="8. Cifras LDL mayores a 190 mg/dl."
                                    name="idCifrasNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="9. Diabetes controladas"
                                    name="idDiabetesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="10. Dislipemia de moderada a severa asociada a diabetes, HTA, obesidad, hipotiroidismo."
                                    name="idDislipidemiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="11. Diagnóstico o sospecha de dislipemia de origen familiar (genético)."
                                    name="idDiagnosticoNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="12. Riesgo Cardivascular a 10 años ≥ 20% según Método de Framingham."
                                    name="idRiesgoCardiovascular1NEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="13. Riesgo Cardiovascular entre 10 y 20% si existen dos o mas factores mayores de riesgo."
                                    name="idRiesgoCardiovascular2NEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="14. Hipertiroidismo no controlado o sintomático."
                                    name="idHipertiroidismoNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="15. Alteración auditiva severa y bilateral que comprometa bandas conversacionales (500 a 2000 Hz)."
                                    name="idAlteracionAuditivaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="16. Vertigo y otras alteraciones del equilibrio."
                                    name="idVertigoAlteracionesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="17. Epilepsia u otra enfermedad neurológica, que pueda generar alteraciones de la conciencia o el equilibrio."
                                    name="idEpilegsiaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="18. Ceguera Temporal o permanente o alteraciones visuales significativas y severas."
                                    name="idCegueraTemporalNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="19. Historia de fobias o episodios de pánico relacionados con altura."
                                    name="idHistoriaFobiasNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="20. Transtornos psiquiátricos, incluyendo adicciones a sustancias psicoactivas."
                                    name="idTranstornoPsiquiatricoNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="21. Limitacionesn permanentes para deambular por sus propios medios o lesiones con compromiso funcional del cuello, espalda o extremidades, que afecten el agarre requerido en estas labores."
                                    name="idLimitacionesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="22. Obesidad Morbida (IMC mayor a 35) o peso mayor de 120 kg, por limitaciones de sistemas de arneses."
                                    name="idObesidadMorbidaNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="23. De forma temporal, el uso de medicamentos que produzcan sueño o deprivación de sueño mas de un turno."
                                    name="idDeformaTemporalNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="24. Otras alteraciones Cardiovasculares, pulmonares, musculares, hepáticas, sanguíneas o renales, que por su severidad
                                o progreso puedan general alteraciones del equilibrio o de la conciencia en concepto  del médico tratante."
                                    name="idOtrasAlteracionesNEMTA"
                                    size={30}
                                    defaultValue={false}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    name="observacionesNEMTA"
                                    label="Observaciones"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="conceptoActitudMedicoNEMTA"
                                    label="Concepto de Aptitud Medica"
                                    defaultValue=""
                                    options={lsNeConceptoActi}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard >
            </Accordion>
            <Divider />
            <Grid sx={{ pb: 2 }} />

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography align='right' variant="h4" color="inherit">FRAMINGHAM</Typography></>}>

                <SubCard darkTitle title={<Typography variant="h4">INFORMACIÓN CARDIOVASCULAR</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha"
                                    name="fechaFRA"
                                    defaultValue={new Date()}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="tencionFRA"
                                    label="Tensión Arterial"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTencionArterialFRA"
                                    label="Dx Tensión Arterial"
                                    defaultValue=""
                                    options={lsFramDxTension}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setArrays({ ...arrays, antecedentesCardio: value })}
                                value={arrays.antecedentesCardio}
                                label="Antecedentes Cardiovascular"
                                options={lsFramAntecedentesCardiovascular}
                            />
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idDeporteFRA"
                                    label="Deporte"
                                    defaultValue=""
                                    options={lsFramDeporte}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idBebidaFRA"
                                    label="Bebidas "
                                    defaultValue=""
                                    options={lsFramBebida}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha Laboratorio"
                                    name="fechaLaboratorioFRA"
                                    defaultValue={new Date()}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="colesterolTotalFRA"
                                    label="Colesterol Total"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="hDLFRA"
                                    label="HDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="triglicericosFRA"
                                    label="Trigliceridos"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <InputMultiSelects
                                fullWidth
                                onChange={(event, value) => setArrays({ ...arrays, metabolico: value })}
                                value={arrays.metabolico}
                                label="Dx Metabólico"
                                options={lsFramDxMetabolismo}
                            />
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="glisemiaFRA"
                                    label="Glicemia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="fumaFRA"
                                    label="Fuma"
                                    defaultValue=""
                                    options={lsOpcion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    fullWidth
                                    name="observacionFRA"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[1].icons}
                            />

                            <DetailedIcon
                                title={DetailIcons[2].title}
                                onClick={() => setOpenViewPdf(true)}
                                icons={DetailIcons[2].icons}
                            />
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="lDLFRA"
                                    label="LDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="relacionFRA"
                                    label="Relación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fRLEdadFRA"
                                    label="FR Edad"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fRLColesterolFRA"
                                    label="Fr Colesterol"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fRHDLFRA"
                                    label="Fr HDL"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fRGlisemiaFRA"
                                    label="FR Glicemia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fRTencionFRA"
                                    label="Fr Tensión Arterial"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="fRTabaquismoFRA"
                                    label="FR Tabaquismo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="puntajeFRA"
                                    label="Puntaje"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"
                                    name="riesgoAbsolutoFRA"
                                    label="Riesgo Absoluto  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    type="number"

                                    name="riesgoRelativoFRA"
                                    label="Riesgo Relativo  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={2} >
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="interpretacionFRA"
                                    label="Interpretación  "
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
            </Accordion>
            <Divider />
        </Fragment>
    );
};

export default Emo;

Emo.propTypes = {
    lsEmployee: PropTypes.any,
    errors: PropTypes.any,
    setArrays: PropTypes.func,
    arrays: PropTypes.any,
    setEstadoVacuna: PropTypes.func,
    estadoVacuna: PropTypes.any,
};
