import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button, useMediaQuery,
    Grid, Typography,
} from '@mui/material';

import {
    IconLungs,
    IconFall,
    IconAffiliate,
    IconWoman,
    IconFriends,
    IconVaccine,
    IconEmpathize,
    IconDeviceDesktopAnalytics,
    IconUserSearch,
    IconHeartRateMonitor,
    IconYoga,
    IconReportMedical,
    IconWheelchair,
    IconCarCrash
} from '@tabler/icons';

import Chip from '@mui/material/Chip';
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
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import TableAntecedentes from './TableEmo/TableAntecedentes';
import RespiratorySymptoms from './RespiratorySymptoms';
import TableExamenesPara from './TableEmo/TableExamenesPara';
import { MessageError } from 'components/alert/AlertAll';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import StickyActionBar from './StickyActionBar/StickyActionBar';

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
        if (data === undefined)
            return undefined;
        else return data;
    } else if (tipoCampo === "date") {
        if (data === undefined)
            return new Date();
        else return data;
    } else if (tipoCampo === "number") {
        if (data === undefined)
            return undefined;
        else return data;
    }
}

const Emo = ({
    atencion,
    setPeso, peso,
    setTalla, talla,
    setIMC, imc,
    setClasificacion, clasificacion,
    setClasificacionColor, clasificacionColor,
    lsLastRecord,

    setIndiceWellsEFU,
    indiceWellsEFU,

    errors,
    documento,
    setEstadoVacuna,
    estadoVacuna,
    lsEmployee,
    setTipoFobia,
    tipoFobia,
    ...methods
}) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [cadenaHistory, setCadenaHistory] = useState('');

    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);
    const [lsDeporte, setLsDeporte] = useState([]);
    const [lsTipoFobia, setLsTipoFobia] = useState([]);
    const [lsFrecuencia, setLsFrecuencia] = useState([]);
    const [lsRefuerzo, setLsRefuerzo] = useState([]);
    const [lsEspacioConfinado, setLsEspacioConfinado] = useState([]);
    const [lsPariente, setLsPariente] = useState([]);
    const [lsGineMetodo, setLsGineMetodo] = useState([]);
    const [lsBiotipo, setLsBiotipo] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);
    const [lsCiclos, setLsCiclos] = useState([]);

    const [lsNeConceptoActi, setLsNeConceptoActi] = useState([]);
    const [lsOpcion, setLsOpcion] = useState([]);
    const [lsNeADonde, setLsNeADonde] = useState([]);
    const [lsRiesClasifi, setLsRiesClasifi] = useState([]);

    const [lsIngreso, setLsIngreso] = useState([]);
    const [lsControlPeriodico, setLsControlPeriodico] = useState([]);
    const [lsPromo, setLsPromo] = useState([]);

    const [textParaclinico, setTextParaclinico] = useState('');
    const [openParaclinico, setOpenParaclinico] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textDx1, setTextDx1] = useState('');
    const [textDx2, setTextDx2] = useState('');
    const [textDx3, setTextDx3] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [lsDx2, setLsDx2] = useState([]);
    const [lsDx3, setLsDx3] = useState([]);

    const [lsLateralidad, setLsLateralidad] = useState([]);

    async function getAll() {
        try {
            const lsServerRiesClasifi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RIESGO_CLASIFICACION);
            var resultRiesClasifi = lsServerRiesClasifi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesClasifi(resultRiesClasifi);

            const lsServerLateralidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.LATERALIDAD);
            var resultLateralidad = lsServerLateralidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsLateralidad(resultLateralidad);

            const lsServerNeConceptoActi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEPTO_APTI_MEDICA);
            var resultNeConceptoActi = lsServerNeConceptoActi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsNeConceptoActi(resultNeConceptoActi);

            const lsServerEspacioConfinado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CONCEPTO_ESPACIOCONFINADO);
            var resultEspacioConfinado = lsServerEspacioConfinado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEspacioConfinado(resultEspacioConfinado);

            const lsServerOpcion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
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

            const lsServerResultado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RESULTADO);
            var resultResultado = lsServerResultado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResultado(resultResultado);

            const lsServerDeporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HC_DEPORTE);
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

            const lsServerRefuerzo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_REFUERZO);
            var resultRefuerzo = lsServerRefuerzo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRefuerzo(resultRefuerzo);

            const lsServerTipoFobia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HC_TIFOBIA);
            var resultTipoFobia = lsServerTipoFobia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoFobia(resultTipoFobia);
        } catch (error) { }
    }

    /* useEffect */
    useEffect(() => {
        getAll();
    }, [documento]);

    async function getAllConceptos() {
        try {
            const lsServerConceptoActitudIngreso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEP_APTI_PSICO_INGRESO);
            var resultConceptoActitudIngreso = lsServerConceptoActitudIngreso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsIngreso(resultConceptoActitudIngreso);

            const lsServerConceptoActitudControl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEP_APTI_PSICO_CONTROL);
            var resultConceptoActitudControl = lsServerConceptoActitudControl.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsControlPeriodico(resultConceptoActitudControl);

            const lsServerPromo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_CONCEP_APTI_PSICO_PROMO);
            var resultPromo = lsServerPromo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsPromo(resultPromo);
        } catch (error) { }
    }

    useEffect(() => {
        getAllConceptos();
    }, [atencion]);

    useEffect(() => {
        async function getAllDxs() {
            if (lsLastRecord) {
                if (lsLastRecord.dx1 !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsLastRecord.dx1);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx1(resultCie11);
                    }

                    setTextDx1(lsLastRecord.dx1);
                }

                if (lsLastRecord.dx2 !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsLastRecord.dx2);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx2(resultCie11);
                    }

                    setTextDx2(lsLastRecord.dx2);
                }

                if (lsLastRecord.dx3 !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsLastRecord.dx3);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx3(resultCie11);
                    }

                    setTextDx3(lsLastRecord.dx3);
                }
            }
        }

        getAllDxs();
    }, [lsLastRecord]);

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx1(resultCie11);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Hubo un problema al buscar el Diagnóstico');
        }
    }

    const handleDx2 = async (event) => {
        try {
            setTextDx2(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx2(resultCie11);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Hubo un problema al buscar el Diagnóstico');
        }
    }

    const handleDx3 = async (event) => {
        try {
            setTextDx3(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx3(resultCie11);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Hubo un problema al buscar el Diagnóstico');
        }
    }

    return (
        <Fragment>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

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
                open={openApuntesPersonales}
                title="APUNTES PERSONALES"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openHistory}
                title="VISTA DE HISTÓRICO"
                handleClose={() => setOpenHistory(false)}
            >
                <TableAntecedentes documento={documento} param={cadenaHistory} />
            </FullScreenDialog>

            <FullScreenDialog
                open={openParaclinico}
                title={textParaclinico === DefaultValue.PARACLINICO_AUDIOMETRIA ? 'AUDIOMETRÍA' :
                    textParaclinico === DefaultValue.PARACLINICO_CITOLOGIA ? 'CITOLIGÍA' :
                        textParaclinico === DefaultValue.PARACLINICO_ELECTRO ? 'EKG' :
                            textParaclinico === DefaultValue.PARACLINICO_ESPIROMETRIA ? 'ESPIROMETRÍA' :
                                textParaclinico === DefaultValue.PARACLINICO_LABORATORIO ? 'LABORATORIO CLÍNICO' :
                                    textParaclinico === DefaultValue.PARACLINICO_RNM ? 'RNM' :
                                        textParaclinico === DefaultValue.PARACLINICO_RXTORAX ? 'RX DE TORAX (CRITERIOS OIT)' :
                                            textParaclinico === DefaultValue.PARACLINICO_VISIOMETRIA ? 'VISIOMETRÍA' : ''}
                handleClose={() => setOpenParaclinico(false)}
            >
                <TableExamenesPara idTipoParaclinico={textParaclinico} documento={documento} />
            </FullScreenDialog>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Accordion title={<><IconAffiliate />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ANTECEDENTES PATOLÓGICOS</Typography></>}>
                        <SubCard>
                            <Grid container spacing={0.5}>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="1. Congenitos"
                                            name="congenitosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.congenitosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="2. Inmunoprevenible"
                                            name="inmunoPrevenibleAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.inmunoPrevenibleAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="3. Infecciosos"
                                            name="infecciososAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.infecciososAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="4. Ojos"
                                            name="ojoAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.ojoAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="5. Agudeza Visual"
                                            name="agudezaVisualAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.agudezaVisualAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="6. Oidos"
                                            name="oidosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.oidosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4} >
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="7. Nasofaringe"
                                            name="nasoFaringeAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.nasoFaringeAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="8. Cardiovascular"
                                            name="cardiovascularAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.cardiovascularAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="9. Pulmonar"
                                            name="pulmonarAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.pulmonarAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="10. Gastrointestinal"
                                            name="gastrointestinalAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.gastrointestinalAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="11. Genitourinario"
                                            name="gimitoUrinarioAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.gimitoUrinarioAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="12. Neurológico"
                                            name="neurologicoAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.neurologicoAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="13. Trastornos de piel"
                                            name="transtornoPielAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.transtornoPielAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="14. Osteomusculares"
                                            name="osteoMuscularAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.osteoMuscularAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="15. Alérgicos"
                                            name="alergicosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.alergicosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="16. Tóxicos"
                                            name="toxicoAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.toxicoAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="17. Farmacólogicos"
                                            name="faRmacologicosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.faRmacologicosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="18. Quirúrgicos"
                                            name="quirurgicosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.quirurgicosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4} >
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="19. Traumático"
                                            name="traumaticosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.traumaticosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="20. Transfusiones"
                                            name="tranfuccionesAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.tranfuccionesAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="21. ETS"
                                            name="etsAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.etsAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="22. Deformidades"
                                            name="deformidadesAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.deformidadesAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="23. Psiquiatrico"
                                            name="psiquiatricosAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.psiquiatricosAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="24. Farmacodependencia"
                                            name="farmacoDependenciaAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.farmacoDependenciaAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="25. E.M."
                                            name="emAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.emAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="26. Renal"
                                            name="renalAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.renalAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="27. Asma"
                                            name="asmaAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.asmaAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="28. O.R.L."
                                            name="orlAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.orlAP)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="29. Cancer"
                                            name="cancerAP"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.cancerAP)}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ pt: 4 }}>
                                <FormProvider {...methods}>
                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue={() => validateLastData(lsLastRecord.especifiqueAP, "string")}
                                        fullWidth
                                        name="especifiqueAP"
                                        label="Especifique"
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
                                    onClick={() => { setOpenHistory(true); setCadenaHistory('ANTECEDENTES_PATALOGICOS') }}
                                    icons={DetailIcons[3].icons}
                                />
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconFriends />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ANTECEDENTES FAMILIAR</Typography></>}>
                        <SubCard>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="parentesco1ANFA"
                                            label="Parentesco"
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco1ANFA, "number")}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={9}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco1ObserANFA, "string")}
                                            fullWidth
                                            name="parentesco1ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="parentesco2ANFA"
                                            label="Parentesco"
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco2ANFA, "number")}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={9}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco2ObserANFA, "string")}
                                            fullWidth
                                            name="parentesco2ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="parentesco3ANFA"
                                            label="Parentesco"
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco3ANFA, "number")}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={9}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco3ObserANFA, "string")}
                                            fullWidth
                                            name="parentesco3ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="parentesco4ANFA"
                                            label="Parentesco"
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco4ANFA, "number")}
                                            options={lsPariente}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={9}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.parentesco4ObserANFA, "string")}
                                            fullWidth
                                            name="parentesco4ObserANFA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconCarCrash />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ACCIDENTES DE TRABAJO</Typography></>}>

                        <SubCard>
                            <Grid container spacing={2}>
                                <Grid item xs={3} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            type="number"
                                            defaultValue={() => validateLastData(lsLastRecord.anioAT, "string")}
                                            fullWidth
                                            name="anioAT"
                                            label="Año"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.especifiqueAT, "string")}
                                            fullWidth
                                            name="especifiqueAT"
                                            label="Especifique"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                    onClick={() => { setOpenHistory(true); setCadenaHistory('ACCIDENTES_TRABAJO') }}
                                    icons={DetailIcons[3].icons}
                                />
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconWheelchair />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">ENFERMEDAD LABORAL</Typography></>}>

                        <SubCard>
                            <Grid container spacing={2} sx={{ pt: 2 }}>
                                <Grid item xs={3} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            type="number"
                                            defaultValue={() => validateLastData(lsLastRecord.anio1AT, "string")}
                                            fullWidth
                                            name="anio1AT"
                                            label="Año"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.especifique1AT, "string")}
                                            fullWidth
                                            name="especifique1AT"
                                            label="Especifique"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                    onClick={() => { setOpenHistory(true); setCadenaHistory('ACCIDENTES_TRABAJO') }}
                                    icons={DetailIcons[3].icons}
                                />
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconVaccine />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">INMUNIZACIONES</Typography></>}>
                        <SubCard>
                            <Grid container spacing={3}>
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
                                                defaultValue={() => validateLastData(lsLastRecord.anioVacuna1IM, "number")}
                                                fullWidth
                                                name="anioVacuna1IM"
                                                label="Año Tetano"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid> : null}
                                {estadoVacuna.influenzaIM ?
                                    <Grid item xs={2} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                type="number"
                                                defaultValue={() => validateLastData(lsLastRecord.anioVacuna2IM, "number")}
                                                fullWidth
                                                name="anioVacuna2IM"
                                                label="Año Influenza"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid> : null}
                                {estadoVacuna.fiebreAmarillaIM ?
                                    <Grid item xs={2} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                type="number"
                                                defaultValue={() => validateLastData(lsLastRecord.anioVacuna3IM, "number")}
                                                fullWidth
                                                name="anioVacuna3IM"
                                                label="Año Fiebre Amarilla"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid> : null}
                                {estadoVacuna.rubeolaSarampionIM ?
                                    <Grid item xs={2} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                type="number"
                                                defaultValue={() => validateLastData(lsLastRecord.anioVacuna4IM, "number")}
                                                fullWidth
                                                name="anioVacuna4IM"
                                                label="Año Rubéola - Sarampion"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid> : null}
                                {estadoVacuna.covid19IM ?
                                    <Fragment>
                                        <Grid item xs={2} >
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    defaultValue={() => validateLastData(lsLastRecord.anioVacuna5IM, "number")}
                                                    fullWidth
                                                    name="anioVacuna5IM"
                                                    label="Año Esquema Completo"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={2} >
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idRefuerzoIM"
                                                    label="Refuerzo"
                                                    defaultValue={() => validateLastData(lsLastRecord.idRefuerzoIM, "number")}
                                                    options={lsRefuerzo}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Fragment> : null}
                                {estadoVacuna.otrasIM ?
                                    <Grid item xs={12} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.anioVacuna6IM, "string")}
                                                fullWidth
                                                name="anioVacuna6IM"
                                                label="Observación"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid> : null}
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconEmpathize />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">HÁBITOS</Typography></>}>
                        <SubCard>
                            <Grid container spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Fuma"
                                            name="fumaHB"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.fumaHB)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.cigarrillosDiasFumaHB, "string")}
                                            fullWidth
                                            type="number"
                                            name="cigarrillosDiasFumaHB"
                                            label="Cigarrillos Al Día"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.aniosCigaFumaHB, "string")}
                                            fullWidth
                                            type="number"
                                            name="aniosCigaFumaHB"
                                            label="Años"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>

                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.mesesCigaFumaHB, "string")}
                                            fullWidth
                                            type="number"
                                            name="mesesCigaFumaHB"
                                            label="Meses"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.observacionFumaHB, "string")}
                                            fullWidth
                                            name="observacionFumaHB"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            defaultValue={() => validateLastData(lsLastRecord.fumabaHB)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.cigarrillosDiasFumabaHB, "string")}
                                            fullWidth
                                            type="number"
                                            name="cigarrillosDiasFumabaHB"
                                            label="Cigarrillos Al Día"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.aniosCigaFumabaHB, "string")}
                                            fullWidth
                                            type="number"
                                            name="aniosCigaFumabaHB"
                                            label="Años"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.mesesCigaFumabaHB, "string")}
                                            fullWidth
                                            type="number"
                                            name="mesesCigaFumabaHB"
                                            label="Meses"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.observacionFumabaHB, "string")}
                                            fullWidth
                                            name="observacionFumabaHB"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            defaultValue={() => validateLastData(lsLastRecord.practicaDeporteHB)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idFrecuenciaDeporteHB"
                                            label="Frecuencia Deporte"
                                            defaultValue={() => validateLastData(lsLastRecord.idFrecuenciaDeporteHB, "number")}
                                            options={lsFrecuencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2} >
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCualDeporteHB"
                                            label="Cual Deporte"
                                            defaultValue={() => validateLastData(lsLastRecord.idCualDeporteHB, "number")}
                                            options={lsDeporte}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.observacionPracticaDeporHB, "string")}
                                            fullWidth
                                            name="observacionPracticaDeporHB"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            defaultValue={() => validateLastData(lsLastRecord.hobbiesPasatiempoHB)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={10} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.cualHobbiesHB, "string")}
                                            fullWidth
                                            name="cualHobbiesHB"
                                            label="Cual"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            defaultValue={() => validateLastData(lsLastRecord.consumeBebidasAlcoholicasHB)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3} >
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idFrecuenciaBebidaAlHB"
                                            label="Frecuencia de Bebidas"
                                            defaultValue={() => validateLastData(lsLastRecord.idFrecuenciaBebidaAlHB, "number")}
                                            options={lsFrecuencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={7}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.cualBebidasAlHB, "string")}
                                            fullWidth
                                            name="cualBebidasAlHB"
                                            label="Cual"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            defaultValue={() => validateLastData(lsLastRecord.fobiasHB)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={5} >
                                    <InputMultiSelects
                                        fullWidth
                                        onChange={(event, value) => setTipoFobia(value)}
                                        value={tipoFobia}
                                        label="Tipo de Fobia"
                                        options={lsTipoFobia}
                                    />
                                </Grid>

                                <Grid item xs={5} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={() => validateLastData(lsLastRecord.cualFobiaHB, "string")}
                                            fullWidth
                                            name="cualFobiaHB"
                                            label="Cual"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                {lsEmployee.genero === DefaultValue.GeneroWomen ?
                    <Grid item xs={12}>
                        <Accordion title={<><IconWoman />
                            <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">GINECO OBSTÉTRICOS</Typography></>}>
                            <SubCard>
                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2.5}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.menarquiaGO, "number")}
                                                fullWidth
                                                type="number"
                                                name="menarquiaGO"
                                                label="Menarquía (EDAD)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.5} >
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idCiclosGO"
                                                label="Ciclos"
                                                defaultValue={() => validateLastData(lsLastRecord.idCiclosGO, "number")}
                                                options={lsCiclos}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.5} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.duracionGO, "number")}
                                                fullWidth
                                                type="number"
                                                name="duracionGO"
                                                label="Duración (DIAS)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.5}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Amenorrea"
                                                name="amenoreaGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.amenoreaGO)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.5}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Dismenorrea"
                                                name="disminureaGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.disminureaGO)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.5} >
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Leucorrea"
                                                name="leucoreaGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.leucoreaGO)}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}>
                                    <Grid item xs={2.5}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.vidaMaritalGO, "number")}
                                                fullWidth
                                                type="number"
                                                name="vidaMaritalGO"
                                                label="Vida Marital (EDAD EN AÑOS)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.5}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.vidaObstetricaGO, "number")}
                                                fullWidth
                                                type="number"
                                                name="vidaObstetricaGO"
                                                label="Vida Obstétrica (EDAD EN AÑOS)"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.ggo, "number")}
                                                fullWidth
                                                type="number"
                                                name="gGO"
                                                label="G"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.4} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.pgo, "number")}
                                                fullWidth
                                                type="number"
                                                name="pGO"
                                                label="P"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.4} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.ago, "number")}
                                                fullWidth
                                                type="number"
                                                name="aGO"
                                                label="A"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.4} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.csgo, "number")}
                                                fullWidth
                                                type="number"
                                                name="cSGO"
                                                label="C"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.4} >
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.vgo, "number")}
                                                fullWidth
                                                type="number"
                                                name="vGO"
                                                label="V"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ pb: 2 }}  >
                                    <Grid item xs={2.5}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha FUP"
                                                name="fUPGO"
                                                defaultValue={() => validateLastData(lsLastRecord.fupgo, "date")}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.5}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha FUR"
                                                name="fURGO"
                                                defaultValue={() => validateLastData(lsLastRecord.furgo, "date")}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="ETS"
                                                name="eTSGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.etsgo)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.cualgo, "string")}
                                                fullWidth
                                                name="cUALGO"
                                                label="Cúal?"
                                                size={matchesXS ? 'small' : 'medium'}
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
                                                defaultValue={() => validateLastData(lsLastRecord.quisteOvariosBiomasGO)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.5}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Endometriosis"
                                                name="endometriosisGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.endometriosisGO)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="EPI"
                                                name="ePIGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.epigo)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={1.5} >
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Planifica"
                                                name="planificaGO"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.planificaGO)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMetodoGO"
                                                label="Método"
                                                defaultValue={() => validateLastData(lsLastRecord.idMetodoGO, "number")}
                                                options={lsGineMetodo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={() => validateLastData(lsLastRecord.ultimoAnioCitologiaGO, "number")}
                                                fullWidth
                                                type="number"
                                                name="ultimoAnioCitologiaGO"
                                                label="Ultimo Año Citologia."
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idResultadoGO"
                                                label="Resultado"
                                                defaultValue={() => validateLastData(lsLastRecord.idResultadoGO, "number")}
                                                options={lsResultado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Accordion>
                    </Grid> : null
                }

                <Grid item xs={12}>
                    <Accordion title={<><IconDeviceDesktopAnalytics />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">REVISIÓN POR SISTEMAS</Typography></>}>
                        <SubCard>
                            <Grid container spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="1. Cabeza - Cefalea"
                                            name="cabezaRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.cabezaRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="2. Ojos(A. Visual, dolor, congestion, etc)"
                                            name="ojosRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.ojosRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="3. Oidos(A. Auditiva, dolor, secreción)"
                                            name="oidosRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.oidosRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="4. Nariz (Congestión, epistaxis, rinorrea)"
                                            name="narizRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.narizRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="5. Boca (eraciones, sangrado de encias)"
                                            name="bocaRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.bocaRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="6. Garganta (Dolor, ardor, disfagia, disfonía)"
                                            name="gargantaRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.gargantaRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4} >
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="7. Cuello (Dolor, torticolis, opatías)"
                                            name="cuellosRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.cuellosRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="8. Cardio-Respiratorio"
                                            name="cardioRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.cardioRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="9. Gastrointestinal"
                                            name="gastrointestinalRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.gastrointestinalRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="10. GenitoUrinario"
                                            name="genitoUrinarioRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.genitoUrinarioRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="11. Osteo-Articular"
                                            name="osteoRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.osteoRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="12.Neuro-Muscular"
                                            name="neuroRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.neuroRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4} >
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="13. Piel y Anexos"
                                            name="pielRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.pielRS)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="14. Psiquiátrico"
                                            name="psiquiatricoRS"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.psiquiatricoRS)}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue={() => validateLastData(lsLastRecord.observacionRS, "string")}
                                        fullWidth
                                        name="observacionRS"
                                        label="Observaciones"
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
                                    onClick={() => { setOpenHistory(true); setCadenaHistory('REVISION_SISTEMAS') }}
                                    icons={DetailIcons[3].icons}
                                />
                            </Grid>

                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconUserSearch />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">EXAMEN FÍSICO</Typography></>}>
                        <SubCard>

                            <SubCard title="Lateralidad">
                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="lateralidadExamenesFisico"
                                            label="Lateralidad"
                                            defaultValue={() => validateLastData(lsLastRecord.lateralidadExamenesFisico, "number")}
                                            options={lsLateralidad}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </SubCard>
                            <Grid sx={{ pb: 2 }} />

                            <SubCard
                                title="Signos Vitales/Tensión Arterial"
                                secondary={
                                    <Button onClick={() => { setOpenHistory(true); setCadenaHistory('SIGNOS_VITALES') }}>
                                        <IconEdit stroke={1.5} size="1.3rem" />
                                    </Button>
                                }
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                defaultValue=""
                                                name="tASentadoEF"
                                                label="TA Sentado"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                defaultValue=""
                                                name="tAAcostadoEF"
                                                label="TA Acostado"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                defaultValue=""
                                                type="number"
                                                name="pulsoEF"
                                                label="Pulso"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                defaultValue=""
                                                type="number"
                                                name="fCEF"
                                                label="FC"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                defaultValue=""
                                                type="number"
                                                name="fREF"
                                                label="FR"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                defaultValue=""
                                                type="number"
                                                name="temperaturaEF"
                                                label="Temperatura"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                            <Grid sx={{ pb: 2 }} />

                            <SubCard
                                title="Antropometria"
                                secondary={<Button onClick={() => { setOpenHistory(true); setCadenaHistory('ANTROPOMETRIA') }}>
                                    <IconEdit stroke={1.5} size="1.3rem" />
                                </Button>}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <InputOnChange
                                            disabled
                                            type="number"
                                            label="Peso(Kilos)"
                                            onChange={(e) => setPeso(e.target.value)}
                                            value={peso}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputOnChange
                                            disabled
                                            type="number"
                                            label="Talla(Metros)"
                                            onChange={(e) => setTalla(e.target.value)}
                                            value={talla}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputOnChange
                                            type="number"
                                            label="IMC"
                                            disabled
                                            onChange={(e) => setIMC(e?.target.value)}
                                            value={imc}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Chip
                                            size="medium"
                                            label={clasificacion}
                                            color={clasificacionColor}
                                            sx={{ fontSize: '20px', width: '300px', height: '50px' }}
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idBiotipoEF"
                                                label="Biotipo"
                                                defaultValue={() => validateLastData(lsLastRecord.idBiotipoEF, "number")}
                                                options={lsBiotipo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                            <Grid sx={{ pb: 2 }} />

                            <SubCard title="Exploración Morfológica">
                                <Grid container spacing={1} sx={{ pb: 2 }}>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="1. Estado Nutricional"
                                                name="estadoNitricionalEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.estadoNitricionalEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="2. Piel-Faneras"
                                                name="pielFaneraEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.pielFaneraEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="3. Craneo"
                                                name="craneoEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.craneoEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="4. Parpados"
                                                name="parpadoEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.parpadoEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="5. Conjuntivas"
                                                name="conjuntivasEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.conjuntivasEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="6. Corneas"
                                                name="corniasEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.corniasEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3} >
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="7. Pupilas"
                                                name="pupilasEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.pupilasEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="8. Reflejo Fotomotors"
                                                name="reflejoFotomotorEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.reflejoFotomotorEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="9. Reflejo Corneal"
                                                name="reflejoCornialEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.reflejoCornialEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="10. Fondo Ojos"
                                                name="fondoOjosEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.fondoOjosEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="11. Inspección Externa Oidos"
                                                name="inspeccionEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.inspeccionEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="12. Otoscopia"
                                                name="otoscopiaEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.otoscopiaEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="13. Inpección Externa de Nariz"
                                                name="inspeccionNarizEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.inspeccionNarizEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="14. Rinoscopia"
                                                name="rinoscopioEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.rinoscopioEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="15. Labios"
                                                name="labiosEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.labiosEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="16. Mucosa Oral"
                                                name="mucosaEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.mucosaEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="17. Encias"
                                                name="enciasEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.enciasEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="18. Paladar"
                                                name="paladarEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.paladarEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="19. Dientes"
                                                name="dientesEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.dientesEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="20. Lengua"
                                                name="lenguaEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.lenguaEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="21. Faringe"
                                                name="faringeEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.faringeEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="22. Amigdalas"
                                                name="amigdalasEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.amigdalasEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="23. Cuello Tiroides"
                                                name="cuellosEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.cuellosEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="24. Inspección de Torax-Mamas"
                                                name="inspeccionToraxEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.inspeccionToraxEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="25. Auscultación Cardiaca"
                                                name="auscultacionCardiacaEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.auscultacionCardiacaEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="26. Auscultación Respiratoria"
                                                name="auscultacionRespiratoriaEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.auscultacionRespiratoriaEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="27. Inspección Abdomen"
                                                name="inspeccionAbdomenEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.inspeccionAbdomenEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="28. Palpación Abdomen"
                                                name="palpacionAbdomenEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.palpacionAbdomenEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="29. Exploración Higado"
                                                name="exploracionHigadoEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.exploracionHigadoEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="30. Exploración de Bazo"
                                                name="exploracionVasoEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.exploracionVasoEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="31. Exploración Riñones"
                                                name="exploracionRinionesEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.exploracionRinionesEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="32. Anillos Inguinale"
                                                name="anillosInguinalesEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.anillosInguinalesEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="33. Anillo Umbilical"
                                                name="anilloUmbilicalEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.anilloUmbilicalEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="34. Genitales Externos"
                                                name="genitalesExternosEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.genitalesExternosEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="35. Región Anal"
                                                name="regionAnalEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.regionAnalEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="36. Tacto Rectal"
                                                name="tactoRectalEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.tactoRectalEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="37. Tacto Vaginal"
                                                name="tactoVaginalEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.tactoVaginalEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="38. Extremidades Superiores"
                                                name="extremidadesSuperioresEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.extremidadesSuperioresEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="39. Extremidades Inferiores"
                                                name="extremidadesInferioresEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.extremidadesInferioresEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="40. Pulsos"
                                                name="pulsosEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.pulsosEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="41. Columna Vertebral"
                                                name="columnaVertebralEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.columnaVertebralEF)}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="42. Articulaciones"
                                                name="articulacionesEF"
                                                size={30}
                                                defaultValue={() => validateLastData(lsLastRecord.articulacionesEF)}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>

                                <FormProvider {...methods}>
                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue={() => validateLastData(lsLastRecord.especifiqueEMEFU, "string")}
                                        fullWidth
                                        name="especifiqueEMEFU"
                                        label="Especifique"
                                        size={matchesXS ? 'small' : 'medium'}
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('EXPLORACION_MORFOLOGICA') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>
                            </SubCard>
                            <Grid sx={{ pb: 2 }} />
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconYoga />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">EXPLORACIÓN FUNCIONAL</Typography></>}>
                        <SubCard>
                            <Grid container spacing={1} sx={{ pb: 2 }}>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="1. Movilidad Ocular"
                                            name="movilidadEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="2. Equilibrio"
                                            name="equilibrioEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.equilibrioEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="3. Marcha Coordinación"
                                            name="marchaEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.marchaEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="4. Movilidad Hombro"
                                            name="movilidadHombroEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadHombroEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="5. Movilidad Codo"
                                            name="movilidadCodoEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadCodoEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="6. Movilidad Muñeca"
                                            name="movilidadMuniecaEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadMuniecaEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="7. Signo de Tinel"
                                            name="signoTinelEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.signoTinelEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="8. Signo de Phalen"
                                            name="signoPhalenEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.signoPhalenEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="9. Movilidad Manos"
                                            name="movilidadManosEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadManosEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="10. Movilidad Cadera"
                                            name="movilidadCaderaEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadCaderaEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="11. Movilidad Rodilla"
                                            name="movilidadRodillaEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadRodillaEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="12. Movilidad Tobillo"
                                            name="movilidadTobilloEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadTobilloEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="13. Movilidad Cuello (C1-C4)"
                                            name="movilidadCuelloEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.movilidadCuelloEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="14. ROT Bicipital (C5)"
                                            name="rOTVisipitalEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.rotVisipitalEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="15. ROT Rotuliano (L4)"
                                            name="rOTRotuleanoEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.rotRotuleanoEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="16. Extencion Primer Artejo (L5)"
                                            name="extencionEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.extencionEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="17. Sensibilidad cara anterior pie (L5)"
                                            name="sensibilidadCaraAnteriorEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.sensibilidadCaraAnteriorEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="18. Eversión Pie(S1)"
                                            name="eversionPiesEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.eversionPiesEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="19. Sensibilidad cara lateral pie (L5)"
                                            name="sensibilidadCaraLateralEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.sensibilidadCaraLateralEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="20. ROT Aquiliano"
                                            name="rOTAquileanoEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.rotAquileanoEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="21. Signo de la Laségue"
                                            name="signoLasegueEFU"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.signoLasegueEFU)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputCheck
                                            label="22. Indice Wells"
                                            size={30}
                                            onChange={(e) => setIndiceWellsEFU(e.target.checked)}
                                            checked={indiceWellsEFU}
                                        />
                                    </FormProvider>
                                </Grid>

                                {indiceWellsEFU ?
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                type="number"
                                                fullWidth
                                                name="valorIndiceWellsEFU"
                                                label="Valor De IndiceWells"
                                                size={matchesXS ? 'small' : 'medium'}
                                                defaultValue={() => validateLastData(lsLastRecord.valorIndiceWellsEFU, "string")}
                                            />
                                        </FormProvider>
                                    </Grid> : null
                                }
                            </Grid>

                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={4}
                                    defaultValue={() => validateLastData(lsLastRecord.observacionEFU, "string")}
                                    fullWidth
                                    name="observacionEFU"
                                    label="Observaciones"
                                    size={matchesXS ? 'small' : 'medium'}
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
                                    onClick={() => { setOpenHistory(true); setCadenaHistory('EXPLORACION_FUNCIONAL') }}
                                    icons={DetailIcons[3].icons}
                                />
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconHeartRateMonitor />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">EXÁMENES PARACLÍNICOS</Typography></>}>
                        <SubCard>
                            <Grid container spacing={2}>
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
                                            defaultValue={4017}
                                            name="resultadoRxToraxEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesRxToraxEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_RXTORAX) }}
                                            icons={DetailIcons[3].icons}
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

                                <Grid item xs={2}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={4017}
                                            name="resultadoEspirometriaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesEspirometriaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_ESPIROMETRIA) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoAudiometriaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesAudiometriaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_AUDIOMETRIA) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoVisiometriaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6} >
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesVisiometriaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_VISIOMETRIA) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoLaboratorioClinicoEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesLaboratorioClinicoEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_LABORATORIO) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoCuestionarioSintomaEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesCuestionarioSintomaEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_ELECTRO) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoEkgEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesEkgEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_ELECTRO) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoRnmLumbosacraEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesRnmLumbosacraEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_RNM) }}
                                            icons={DetailIcons[3].icons}
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
                                            defaultValue={4017}
                                            name="resultadoRnmCervicalEPA"
                                            label="Resultado"
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionesRnmCervicalEPA"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                            title={DetailIcons[2].title}
                                            onClick={() => setOpen(true)}
                                            icons={DetailIcons[2].icons}
                                        />

                                        <DetailedIcon
                                            xs={4}
                                            title={DetailIcons[3].title}
                                            onClick={() => { setOpenParaclinico(true); setTextParaclinico(DefaultValue.PARACLINICO_RNM) }}
                                            icons={DetailIcons[3].icons}
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
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('EXAMENES_PARACLINICOS') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconReportMedical />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">IMPRESIÓN DIAGNÓSTICA Y CONCEPTO FINAL</Typography></>}>
                        <SubCard>
                            <Grid container spacing={2}>
                                <Fragment>
                                    <Grid item xs={2}>
                                        <InputOnChange
                                            label="Dx 1"
                                            onKeyDown={handleDx1}
                                            onChange={(e) => setTextDx1(e?.target.value)}
                                            value={textDx1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="dx1"
                                                label="Dx1"
                                                defaultValue={() => validateLastData(lsLastRecord.dx1, "string")}
                                                options={lsDx1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputOnChange
                                            label="Dx 2"
                                            onKeyDown={handleDx2}
                                            onChange={(e) => setTextDx2(e.target.value)}
                                            value={textDx2}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="dx2"
                                                label="Dx2"
                                                defaultValue={() => validateLastData(lsLastRecord.dx2, "string")}
                                                options={lsDx2}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <InputOnChange
                                            label="Dx 3"
                                            onKeyDown={handleDx3}
                                            onChange={(e) => setTextDx3(e.target.value)}
                                            value={textDx3}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="dx3"
                                                label="Dx3"
                                                defaultValue={() => validateLastData(lsLastRecord.dx3, "string")}
                                                options={lsDx3}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Fragment>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.observacionID, "string")}
                                            fullWidth
                                            name="observacionID"
                                            label="Observaciones"
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('IMPRESION_DIAGNOSTICA') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.recomendacionesID, "string")}
                                            fullWidth
                                            name="recomendacionesID"
                                            label="Recomendaciones"
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('IMPRESION_DIAGNOSTICA') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={() => validateLastData(lsLastRecord.idConceptoActitudID, "number")}
                                            name="idConceptoActitudID"
                                            label="Concepto de Aptitud PsicoFisica"
                                            options={
                                                atencion === DefaultValue.EMO_ATENCION_INGRESO ? lsIngreso :
                                                    atencion === DefaultValue.EMO_ATENCION_CONTRO ? lsControlPeriodico :
                                                        atencion === DefaultValue.EMO_ATENCION_PROMO ? lsPromo : []
                                            }
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconLungs />
                        <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">SINTOMAS RESPIRATORIOS</Typography></>}>
                        <RespiratorySymptoms
                            lsLastRecord={lsLastRecord}
                            setOpenApuntesPersonales={setOpenApuntesPersonales}
                            setCadenaHistory={setCadenaHistory}
                            setOpen={setOpen}
                            setOpenHistory={setOpenHistory}
                            setOpenTemplate={setOpenTemplate}
                            {...methods}
                        />
                    </Accordion>
                </Grid>

                <Grid item xs={12}>
                    <Accordion title={<><IconFall />
                        <Typography sx={{ pl: 2 }} variant="h5" color="inherit">TRABAJO EN ALTURA / ESPACIO CONFINADO</Typography></>}>
                        <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPRESA</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha Del Concepto"
                                            name="fechaConceptoNETA"
                                            defaultValue={new Date()}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={() => validateLastData(lsLastRecord.conceptoActitudNETA, "number")}
                                            name="conceptoActitudNETA"
                                            label="Concepto De Aptitud"
                                            options={lsNeConceptoActi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                {/* ESPACIO CONFINADO */}
                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={() => validateLastData(lsLastRecord.idConceptoEspacioConfinado, "number")}
                                            name="idConceptoEspacioConfinado"
                                            label="Concepto De Espacio Confinado"
                                            options={lsEspacioConfinado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="conceptoAplazadoNETA"
                                            label="El Concepto de aptitud debe ser aplazado"
                                            defaultValue={() => validateLastData(lsLastRecord.conceptoAplazadoNETA, "number")}
                                            options={lsOpcion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.motivoAplazoNETA, "string")}
                                            fullWidth
                                            name="motivoAplazoNETA"
                                            label="Motivo de Aplazo"
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPRESA') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.descripcionResultadoNETA, "string")}
                                            fullWidth
                                            name="descripcionResultadoNETA"
                                            label="Descripción de resultados(Resumen de limitaciones o restricciones)"
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPRESA') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={() => validateLastData(lsLastRecord.recomendacionesNETA, "string")}
                                            fullWidth
                                            name="recomendacionesNETA"
                                            label="Recomendaciones (En términos sencillos de cuidados y controles requeridos)"
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
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[2].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPRESA') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                                <Grid item xs={6} >
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="remitidoNETA"
                                            label="Remitido"
                                            defaultValue={() => validateLastData(lsLastRecord.remitidoNETA, "number")}
                                            options={lsOpcion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6} >
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="remididoDondeNETA"
                                            label="A Donde:"
                                            defaultValue={() => validateLastData(lsLastRecord.remididoDondeNETA, "number")}
                                            options={lsNeADonde}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                        <Grid sx={{ pb: 2 }} />

                        <SubCard darkTitle title={<Typography variant="h4">NOTIFICACIÓN EMPLEADO</Typography>}>
                            <Grid container spacing={2} sx={{ pb: 2 }}>
                                <Grid item xs={3}>
                                    <InputOnChange
                                        disabled
                                        type="number"
                                        label="Peso(Kilos)"
                                        onChange={(e) => setPeso(e.target.value)}
                                        value={peso}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputOnChange
                                        disabled
                                        type="number"
                                        label="Talla(Metros)"
                                        onChange={(e) => setTalla(e.target.value)}
                                        value={talla}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <InputOnChange
                                        type="number"
                                        label="IMC"
                                        disabled
                                        onChange={(e) => setIMC(e?.target.value)}
                                        value={imc}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <Chip
                                        size="medium"
                                        label={clasificacion}
                                        color={clasificacionColor}
                                        sx={{ fontSize: '20px', width: '300px', height: '50px' }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={() => validateLastData(lsLastRecord.idRiesgoCardiovascularNEMTA, "number")}
                                            name="idRiesgoCardiovascularNEMTA"
                                            label="Riesgo Cardiovascular"
                                            options={lsRiesClasifi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={() => validateLastData(lsLastRecord.idClasificacionNEMTA, "number")}
                                            name="idClasificacionNEMTA"
                                            label="Clasificación"
                                            options={lsRiesClasifi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="1. Menor de Edad."
                                            name="idMenorEdadNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idMenorEdadNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="2. Mujer embarazada con cualquier edad de Gestacíón."
                                            name="idMujerEmbarazadaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idMujerEmbarazadaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="3. Arritmias Cardiacas."
                                            name="idArimiaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idArimiaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="4. Enfermedades o malformaciones cardiacas asintomáticas."
                                            name="idEnfermedadNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idEnfermedadNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="5. Historia de Hipotensión ortostática (no basta presentar episodios aislados)."
                                            name="idHistoriaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idHistoriaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="6. Hipertensión arterial no controlada o resistente al tratamiento."
                                            name="idHipertensionNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idHipertensionNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="7. Hipertrigliceridemia aislada severa, con cifras mayores a 500 mg/dl."
                                            name="idHipertrigliceridemiaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idHipertrigliceridemiaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="8. Cifras LDL mayores a 190 mg/dl."
                                            name="idCifrasNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idCifrasNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="9. Diabetes controladas"
                                            name="idDiabetesNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idDiabetesNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="10. Dislipemia de moderada a severa asociada a diabetes, HTA, obesidad, hipotiroidismo."
                                            name="idDislipidemiaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idDislipidemiaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="11. Diagnóstico o sospecha de dislipemia de origen familiar (genético)."
                                            name="idDiagnosticoNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idDiagnosticoNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="12. Riesgo Cardivascular a 10 años ≥ 20% según Método de Framingham."
                                            name="idRiesgoCardiovascular1NEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idRiesgoCardiovascular1NEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="13. Riesgo Cardiovascular entre 10 y 20% si existen dos o mas factores mayores de riesgo."
                                            name="idRiesgoCardiovascular2NEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idRiesgoCardiovascular2NEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="14. Hipertiroidismo no controlado o sintomático."
                                            name="idHipertiroidismoNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idHipertiroidismoNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="15. Alteración auditiva severa y bilateral que comprometa bandas conversacionales (500 a 2000 Hz)."
                                            name="idAlteracionAuditivaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idAlteracionAuditivaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="16. Vertigo y otras alteraciones del equilibrio."
                                            name="idVertigoAlteracionesNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idVertigoAlteracionesNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="17. Epilepsia u otra enfermedad neurológica, que pueda generar alteraciones de la conciencia o el equilibrio."
                                            name="idEpilegsiaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idEpilegsiaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="18. Ceguera Temporal o permanente o alteraciones visuales significativas y severas."
                                            name="idCegueraTemporalNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idCegueraTemporalNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="19. Historia de fobias o episodios de pánico relacionados con altura."
                                            name="idHistoriaFobiasNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idHistoriaFobiasNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="20. Transtornos psiquiátricos, incluyendo adicciones a sustancias psicoactivas."
                                            name="idTranstornoPsiquiatricoNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idTranstornoPsiquiatricoNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="21. Limitacionesn permanentes para deambular por sus propios medios o lesiones con compromiso funcional del cuello, espalda o extremidades, que afecten el agarre requerido en estas labores."
                                            name="idLimitacionesNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idLimitacionesNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="22. Obesidad Morbida (IMC mayor a 35) o peso mayor de 120 kg, por limitaciones de sistemas de arneses."
                                            name="idObesidadMorbidaNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idObesidadMorbidaNEMTA)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="23. De forma temporal, el uso de medicamentos que produzcan sueño o deprivación de sueño mas de un turno."
                                            name="idDeformaTemporalNEMTA"
                                            size={30}
                                            defaultValue={() => validateLastData(lsLastRecord.idDeformaTemporalNEMTA)}
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
                                            defaultValue={() => validateLastData(lsLastRecord.idOtrasAlteracionesNEMTA)}
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('NOTIFICACION_EMPLEADO') }}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            disabled
                                            defaultValue=""
                                            name="conceptoActitudNETA"
                                            label="Concepto Aptitud Médica"
                                            options={lsNeConceptoActi}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            disabled
                                            defaultValue=""
                                            name="idConceptoEspacioConfinado"
                                            label="Concepto De Espacio Confinado"
                                            options={lsEspacioConfinado}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard >
                    </Accordion>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Emo;

Emo.propTypes = {
    lsEmployee: PropTypes.any,
    documento: PropTypes.any,
    errors: PropTypes.any,
    setTipoFobia: PropTypes.func,
    tipoFobia: PropTypes.any,
    setEstadoVacuna: PropTypes.func,
    estadoVacuna: PropTypes.any,
    lsLastRecord: PropTypes.any,

    setIndiceWellsEFU: PropTypes.any,
    indiceWellsEFU: PropTypes.any,

    peso: PropTypes.string,
    setPeso: PropTypes.func,
    talla: PropTypes.string,
    setTalla: PropTypes.func,
    imc: PropTypes.string,
    setIMC: PropTypes.func,
    clasificacion: PropTypes.string,
    setClasificacion: PropTypes.func,
    clasificacionColor: PropTypes.string,
    setClasificacionColor: PropTypes.func,
    atencion: PropTypes.string,
};