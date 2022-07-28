// Import de Material-ui
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
    Typography
} from '@mui/material';

// Terceros
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { IconReportMedical } from '@tabler/icons';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

// Import del Proyecto
import SelectOnChange from 'components/input/SelectOnChange';
import { FormatDate } from 'components/helpers/Format';
import SubCard from 'ui-component/cards/SubCard';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertQuestionnaire, UpdateQuestionnaires } from 'api/clients/QuestionnaireClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { PostQuestionnaire } from 'formatdata/QuestionnaireForm';
import { GetByIdQuestionnaire } from 'api/clients/QuestionnaireClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, CodCatalogo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputCheck from 'components/input/InputCheck';
import InputOnChange from 'components/input/InputOnChange';
import InputDatePick from 'components/input/InputDatePick';

const DashboardQuestionnaire = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [company, setCompany] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [lsQuestionnaire, setLsQuestionnaire] = useState([]);
    const [lsRefuerzo, setLsRefuerzo] = useState([]);

    /* Estados de controles al llegar datos */
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState(73);
    const [document, setDocument] = useState('');
    const [btnReport, setBtnReport] = useState(false);

    /* Estados para llenar datos de los check */
    const [noSymptoms, setNoSymptoms] = useState(false);
    const [contactoEstrecho, setContactoEstrecho] = useState(false);
    const [vacuna, setVacuna] = useState(false);
    const [livePerson, setLivePerson] = useState(false);
    const [contactoSinTapabocas, setContactoSinTapabocas] = useState(false);
    const [contactoPocaDistancia, setContactoPocaDistancia] = useState(false);
    const [contactoTiempo, setContactoTiempo] = useState(false);
    const [contactoMano, setContactoMano] = useState(false);
    const [consultaEps, setConsultaEps] = useState(false);
    const [cumplirTiempoAislamiento, setCumplirTiempoAislamiento] = useState(false);
    const [censoViveAdultoM, setCensoViveAdultoM] = useState(false);
    const [fiebre, setFiebre] = useState(false);
    const [dificultadRespiratoria, setDificultadRespiratoria] = useState(false);
    const [vomito, setVomito] = useState(false);
    const [congestionNasal, setCongestionNasal] = useState(false);
    const [malestarGeneral, setMalestarGeneral] = useState(false);
    const [tos, setTos] = useState(false);
    const [dolorGarganta, setDolorGarganta] = useState(false);
    const [escalofrios, setEscalofrios] = useState(false);
    const [otrosSintomas, setOtrosSintomas] = useState(false);
    const [censoObservacion, setObservacion] = useState('');
    const [censoProfesion, setCensoProfesion] = useState(73);
    const [censoContactoCon, setCensoContactoCon] = useState(73);

    const [laboratorioPrimera, setLaboratorioPrimera] = useState('');
    const [dosisPrimera, setDosisPrimera] = useState('');
    const [laboratorioSegunda, setLaboratorioSegunda] = useState(73);
    const [dosisSegunda, setDosisSegunda] = useState(73);
    const [laboratorioTercera, setLaboratorioTercera] = useState(73);
    const [dosisTercera, setDosisTercera] = useState(73);

    const [fechaPrimera, setFechaPrimera] = useState(new Date());
    const [fechaSegunda, setFechaSegunda] = useState(new Date());
    const [fechaTercera, setFechaTercera] = useState(new Date());

    const handleDocument = async (event) => {
        try {
            setDocument(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    const documento = event?.target.value;
                    console.log(event?.target.value);

                    var lsQuestionnaire = await GetByIdQuestionnaire(documento);

                    if (lsQuestionnaire.status === 200) {
                        setLsQuestionnaire(lsQuestionnaire.data);
                        setDocument(lsQuestionnaire.data.documento)
                        setNombre(lsQuestionnaire.data.nombre);
                        setTelefono(lsQuestionnaire.data.telefono);
                        setEmail(lsQuestionnaire.data.email);
                        setEmpresa(lsQuestionnaire.data.empresa);
                        setNoSymptoms(lsQuestionnaire.data.sintomasNoSi);
                        setFiebre(lsQuestionnaire.data.fiebre);
                        setCongestionNasal(lsQuestionnaire.data.congestionNasal);
                        setDolorGarganta(lsQuestionnaire.data.dolorGarganta);
                        setDificultadRespiratoria(lsQuestionnaire.data.dificultadRespiratoria);
                        setMalestarGeneral(lsQuestionnaire.data.malestarGeneral);
                        setEscalofrios(lsQuestionnaire.data.escalofrios);
                        setVomito(lsQuestionnaire.data.vomito);
                        setTos(lsQuestionnaire.data.tos);
                        setOtrosSintomas(lsQuestionnaire.data.otrosSintomas);
                        setContactoEstrecho(lsQuestionnaire.data.contactoEstrecho);
                        setContactoSinTapabocas(lsQuestionnaire.data.contactoSinTapabocas);
                        setContactoPocaDistancia(lsQuestionnaire.data.contactoPocaDistancia);
                        setContactoTiempo(lsQuestionnaire.data.contactoTiempo);
                        setContactoMano(lsQuestionnaire.data.contactoMano);
                        setConsultaEps(lsQuestionnaire.data.consultaEps);
                        setCumplirTiempoAislamiento(lsQuestionnaire.data.cumplirTiempoAislamiento);
                        setVacuna(lsQuestionnaire.data.vacunado);
                        setLivePerson(lsQuestionnaire.data.censoViveServicioSalud);
                        setCensoViveAdultoM(lsQuestionnaire.data.censoViveAdultoM);
                        setObservacion(lsQuestionnaire.data.censoObservacion);
                        setLaboratorioPrimera(lsQuestionnaire.data.laboratorioPrimera);
                        setDosisPrimera(lsQuestionnaire.data.dosisPrimera);
                        setLaboratorioSegunda(lsQuestionnaire.data.laboratorioSegunda);
                        setDosisSegunda(lsQuestionnaire.data.dosisSegunda);
                        setLaboratorioTercera(lsQuestionnaire.data.laboratorioTercera);
                        setDosisTercera(lsQuestionnaire.data.dosisTercera);
                        setCensoContactoCon(lsQuestionnaire.data.censoContactoCon);
                        setCensoProfesion(lsQuestionnaire.data.censoProfesion);
                        setFechaPrimera(new Date(lsQuestionnaire.data.fechaPrimera));
                        setFechaSegunda(new Date(lsQuestionnaire.data.fechaSegunda));
                        setFechaTercera(new Date(lsQuestionnaire.data.fechaTercera));
                    }
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: 'Por favor, ingrese su número de documento',
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClearController = () => {
        setNombre('');
        setTelefono('');
        setEmail('');
        setDocument('');
        setEmpresa(73);
        setBtnReport(false);
        setNoSymptoms(false);
        setContactoEstrecho(false);
        setVacuna(false);
        setLivePerson(false);
        setContactoSinTapabocas(false);
        setContactoPocaDistancia(false);
        setContactoTiempo(false);
        setContactoMano(false);
        setConsultaEps(false);
        setCumplirTiempoAislamiento(false);
        setCensoViveAdultoM(false);
        setFiebre(false);
        setDificultadRespiratoria(false);
        setVomito(false);
        setCongestionNasal(false);
        setMalestarGeneral(false);
        setTos(false);
        setDolorGarganta(false);
        setEscalofrios(false);
        setOtrosSintomas(false);
        setObservacion('');
        setLaboratorioPrimera(73);
        setDosisPrimera(73);
        setLaboratorioSegunda(73);
        setDosisSegunda(73);
        setLaboratorioTercera(73);
        setDosisTercera(73);
        setCensoProfesion(73);
        setCensoContactoCon(73);
        setFechaPrimera(new Date());
        setFechaSegunda(new Date());
        setFechaTercera(new Date());
        setLsQuestionnaire([]);
    }

    const handleNoSymptoms = (event) => {
        setNoSymptoms(event.target.checked)
        if (event.target.checked) {
            setLivePerson(false);
            setCensoProfesion(73);
            setCensoContactoCon(73);
            setCensoViveAdultoM(false);
            setObservacion('');
            setFiebre(false);
            setCongestionNasal(false);
            setDolorGarganta(false);
            setDificultadRespiratoria(false);
            setMalestarGeneral(false);
            setEscalofrios(false);
            setVomito(false);
            setTos(false);
            setOtrosSintomas(false);
        }
    }

    const methods = useForm();
    /* resolver: yupResolver(validationSchema), */

    const { handleSubmit, errors, reset } = methods;

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

            const lsServerRefuerzo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_REFUERZO);
            var resultRefuerzo = lsServerRefuerzo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRefuerzo(resultRefuerzo);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = () => {
        if (document == "") {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Por favor, ingrese su número de documento',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        } else { setBtnReport(true); }
    }

    const ocultarBoton = btnReport ? true : false;
    const ordenAislamiento = noSymptoms ? false : true;
    const marcarSintoma = noSymptoms || fiebre || congestionNasal || dolorGarganta || dificultadRespiratoria ||
        malestarGeneral || escalofrios || vomito || tos || otrosSintomas ? true : false;

    const handleClickSubmit = async (datos) => {
        try {
            const date = FormatDate(new Date());
            const name = datos.nombre != "" ? datos.nombre : nombre;
            const phone = datos.telefono != "" ? datos.telefono : telefono;
            const mail = datos.email != "" ? datos.nombre : email;
            const company = datos.empresa != "" ? datos.empresa : empresa;

            const InsertToData = PostQuestionnaire(document, name, phone, mail, company, noSymptoms,
                fiebre, congestionNasal, dolorGarganta, dificultadRespiratoria, malestarGeneral,
                escalofrios, vomito, tos, otrosSintomas, contactoEstrecho, contactoSinTapabocas,
                contactoPocaDistancia, contactoTiempo, contactoMano, consultaEps, cumplirTiempoAislamiento, vacuna,
                laboratorioPrimera, dosisPrimera, FormatDate(fechaPrimera),
                laboratorioSegunda, dosisSegunda, FormatDate(fechaSegunda),
                laboratorioTercera, dosisTercera, FormatDate(fechaTercera),
                noSymptoms, date, ordenAislamiento, livePerson, censoProfesion,
                censoContactoCon, censoViveAdultoM, censoObservacion);

            if (lsQuestionnaire.length !== 0) {
                if (Object.keys(datos.length !== 0)) {
                    const result = await UpdateQuestionnaires(InsertToData);
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
                        handleClearController();
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
                }
            } else {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertQuestionnaire(InsertToData);
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
                        handleClearController();
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
                }

            }
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

    return (
        <MainCard title="Cuestionario De Salud">
            <Grid xs={12} sx={{ pt: 3 }}>
                <form onSubmit={handleSubmit(handleClickSubmit)}>

                    <Grid container spacing={2} sx={{ pb: 4 }}>

                        <Grid item xs={2.4}>
                            <InputOnChange
                                label="N° Documento"
                                onKeyDown={handleDocument}
                                onChange={(e) => setDocument(e?.target.value)}
                                value={document}
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                                helperText="Por favor, dar Enter"
                                autoFocus
                            />
                        </Grid>

                        {lsQuestionnaire.length === 0 ? (
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
                            </>
                        ) : (
                            <>
                                <Grid item xs={2.4}>
                                    <InputOnChange
                                        label="Apellidos y Nombres"
                                        onChange={(e) => setNombre(e?.target.value)}
                                        value={nombre}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <InputOnChange
                                        label="Teléfono"
                                        onChange={(e) => setTelefono(e?.target.value)}
                                        value={telefono}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <InputOnChange
                                        label="Email"
                                        onChange={(e) => setEmail(e?.target.value)}
                                        value={email}
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <SelectOnChange
                                        name="empresa"
                                        label="Empresa"
                                        value={empresa}
                                        options={company}
                                        onChange={(e) => setEmpresa(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                        disabled
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

                    {ocultarBoton ? (<></>) : (
                        <Grid item xs={12} sx={{ pb: 3, pt: 5 }}>
                            <Grid container justifyContent="center" alignItems="center" spacing={1}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleClick} fullWidth>
                                            Reportar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>)}

                    {btnReport ?
                        (
                            <Grid container sx={{ pt: 5 }} justifyContent="left" alignItems="flex-start" spacing={2}>
                                <Grid item xs={6}>
                                    <InputCheck
                                        label="No presenta ningún síntoma"
                                        size={40}
                                        checked={noSymptoms}
                                        onChange={handleNoSymptoms}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <InputCheck
                                        label="Vacunado"
                                        size={40}
                                        checked={vacuna}
                                        onChange={(event) => setVacuna(event.target.checked)}
                                    />
                                </Grid>

                                {vacuna ? (
                                    <Fragment>
                                        <Grid sx={{ pb: 5 }} item xs={12}>
                                            <SubCard title="SECCIÓN DE VACUNACIÓN">
                                                <Grid container>
                                                    <Grid container xs={12} spacing={2} sx={{ pb: 2 }}>
                                                        <Grid item xs={6}>
                                                            <SelectOnChange
                                                                name="dosisPrimera"
                                                                label="Refuerzo"
                                                                value={dosisPrimera}
                                                                options={lsRefuerzo}
                                                                onChange={(e) => setDosisPrimera(e?.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <SelectOnChange
                                                                name="laboratorioPrimera"
                                                                label="Laboratorio"
                                                                value={laboratorioPrimera}
                                                                options={catalog}
                                                                onChange={(e) => setLaboratorioPrimera(e?.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                        {/* <Grid item xs={6}>
                                                            <InputDatePick
                                                                label="Fecha"
                                                                value={fechaPrimera}
                                                                onChange={(e) => setFechaPrimera(e)}
                                                            />
                                                        </Grid> */}
                                                    </Grid>

                                                    {/*  <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                                        <Grid item xs={4}>
                                                            <SelectOnChange
                                                                name="laboratorioSegunda"
                                                                label="Laboratorio"
                                                                value={laboratorioSegunda}
                                                                options={catalog}
                                                                onChange={(e) => setLaboratorioSegunda(e?.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <SelectOnChange
                                                                name="dosisSegunda"
                                                                label="Dosis"
                                                                value={dosisSegunda}
                                                                options={catalog}
                                                                onChange={(e) => setDosisSegunda(e?.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputDatePick
                                                                label="Fecha 2era dosis"
                                                                value={fechaSegunda}
                                                                onChange={(e) => setFechaSegunda(e)}
                                                            />
                                                        </Grid>
                                                    </Grid> */}

                                                    {/* <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                                        <Grid item xs={4}>
                                                            <SelectOnChange
                                                                name="laboratorioTercera"
                                                                label="Laboratorio"
                                                                value={laboratorioTercera}
                                                                options={catalog}
                                                                onChange={(e) => setLaboratorioTercera(e?.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <SelectOnChange
                                                                name="dosisTercera"
                                                                label="Dosis"
                                                                value={dosisTercera}
                                                                options={catalog}
                                                                onChange={(e) => setDosisTercera(e?.target.value)}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <InputDatePick
                                                                label="Fecha 3era dosis"
                                                                value={fechaTercera}
                                                                onChange={(e) => setFechaTercera(e)}
                                                            />
                                                        </Grid>
                                                    </Grid> */}
                                                </Grid>
                                            </SubCard>
                                        </Grid>
                                    </Fragment>
                                ) : (<></>)}

                                <Grid item xs={12} sx={{ pt: 4 }}>
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
                            </Grid>
                        ) : (<></>)
                    }
                </form>
            </Grid>
        </MainCard>
    );
};

export default DashboardQuestionnaire;