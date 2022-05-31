import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import InputOnChange from 'components/input/InputOnChange';
import InputText from 'components/input/InputText';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import Accordion from 'components/accordion/Accordion';
import InputMultiSelects from 'components/input/InputMultiSelects';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import InputSelect from 'components/input/InputSelect';
import InputDatePick from 'components/input/InputDatePick';
import { CodCatalogo, Message, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton'
import SubCard from 'ui-component/cards/SubCard';
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { InsertMedicalFormula } from 'api/clients/MedicalFormulaClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PostMedicalFormula } from 'formatdata/MedicalFormulaForm';
import { FormatDate } from 'components/helpers/Format';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const MedicalFormula = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [imgSrc, setImgSrc] = useState(null);
    const [clickAttend, setClickAttend] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewPdf, setOpenViewPdf] = useState(false);

    const [document, setDocument] = useState('');
    const [lsCatalogo, setLsCatalogo] = useState([]);
    const [lsEmpresas, setLsEmpresas] = useState([]);
    const [diagnostico, setDiagnostico] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);
    const [lsTipoOrden, setLsTipoOrden] = useState([]);

    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsMedicalFormula, setLsMedicalFormula] = useState([]);

    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [escolaridad, setEscolaridad] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [sede, setSede] = useState('');
    const [fechaNaci, setFechaNaci] = useState(null);
    const [genero, setGenero] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [contacto, setContacto] = useState('');
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [fechaContrato, setFechaContrato] = useState(null);
    const [tipoContrato, setTipoContrato] = useState('');
    const [payStatus, setPayStatus] = useState('');
    const [type, setType] = useState('');
    const [rosterPosition, setRosterPosition] = useState('');
    const [generalPosition, setGeneralPosition] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [area, setArea] = useState('');
    const [subArea, setSubArea] = useState('');
    const [grupo, setGrupo] = useState('');
    const [turno, setTurno] = useState('');
    const [direccionResidencia, setDireccionResidencia] = useState('');
    const [dptoResidencia, setDptoResidencia] = useState('');
    const [municipioResidencia, setMunicipioResidencia] = useState('');
    const [municipioNacido, setMunicipioNacido] = useState('');
    const [dptoNacido, setDptoNacido] = useState('');
    const [eps, setEps] = useState('');
    const [afp, setAfp] = useState('');

    const handleDocument = async (event) => {
        try {
            setDocument(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsQuestionnaire = await GetByIdEmployee(event?.target.value);

                    if (lsQuestionnaire.status === 200) {
                        setLsMedicalFormula(lsQuestionnaire.data);
                        setImgSrc(lsQuestionnaire.data.imagenUrl);
                        setNombres(lsQuestionnaire.data.nombres);
                        setEmail(lsQuestionnaire.data.email);
                        setCelular(lsQuestionnaire.data.celular);
                        setEscolaridad(lsQuestionnaire.data.escolaridad);
                        setEmpresa(lsQuestionnaire.data.empresa);
                        setSede(lsQuestionnaire.data.sede);
                        setFechaNaci(lsQuestionnaire.data.fechaNaci);
                        setGenero(lsQuestionnaire.data.genero);
                        setEstadoCivil(lsQuestionnaire.data.estadoCivil);
                        setContacto(lsQuestionnaire.data.contacto);
                        setTelefonoContacto(lsQuestionnaire.data.telefonoContacto);
                        setFechaContrato(lsQuestionnaire.data.fechaContrato);
                        setTipoContrato(lsQuestionnaire.data.tipoContrato);
                        setPayStatus(lsQuestionnaire.data.payStatus);
                        setType(lsQuestionnaire.data.type);
                        setRosterPosition(lsQuestionnaire.data.rosterPosition);
                        setGeneralPosition(lsQuestionnaire.data.generalPosition);
                        setDepartamento(lsQuestionnaire.data.departamento);
                        setArea(lsQuestionnaire.data.area);
                        setSubArea(lsQuestionnaire.data.subArea);
                        setGrupo(lsQuestionnaire.data.grupo);
                        setTurno(lsQuestionnaire.data.turno);
                        setDireccionResidencia(lsQuestionnaire.data.direccionResidencia);
                        setDptoResidencia(lsQuestionnaire.data.dptoResidencia);
                        setMunicipioResidencia(lsQuestionnaire.data.municipioResidencia);
                        setMunicipioNacido(lsQuestionnaire.data.municipioNacido);
                        setDptoNacido(lsQuestionnaire.data.dptoNacido);
                        setEps(lsQuestionnaire.data.eps);
                        setAfp(lsQuestionnaire.data.afp);
                    } else {
                        CleanCombo();
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${Message.ErrorDeDatos}`,
                            variant: 'alert',
                            alertSeverity: 'error',
                            close: false,
                            transition: 'SlideUp'
                        })
                    }
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.ErrorDocumento}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            CleanCombo();
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorDeDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {

            const lsServerCatalogo = await GetAllCatalog(0, 0);
            if (lsServerCatalogo.status === 200) {
                var resultCatalogo = lsServerCatalogo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsCatalogo(resultCatalogo);
            }

            const lsServerEmpresas = await GetAllCompany(0, 0);
            if (lsServerEmpresas.status === 200) {
                var resultEmpresas = lsServerEmpresas.data.entities.map((item) => ({
                    value: item.codigo,
                    label: item.descripcionSpa
                }));
                setLsEmpresas(resultEmpresas);
            }

            const lsServerTipoOrden = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RECE_TIPORDEN);
            var resultTipoOrden = lsServerTipoOrden.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoOrden(resultTipoOrden);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RECE_CONTINGENCIA);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleAtender = () => {
        if (document === '') {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorDocumento}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        } else if (lsMedicalFormula.length === 0) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorNoHayDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        } else
            setClickAttend(true);
    }

    const CleanCombo = () => {
        setClickAttend(false);
        setImgSrc(null);
        setDocument('');
        setNombres('');
        setEmail('');
        setCelular('');
        setEscolaridad('');
        setEmpresa('');
        setSede('');
        setFechaNaci(null);
        setGenero('');
        setEstadoCivil('');
        setContacto('');
        setTelefonoContacto('');
        setFechaContrato(null);
        setTipoContrato('');
        setPayStatus('');
        setType('');
        setRosterPosition('');
        setGeneralPosition('');
        setDepartamento('');
        setArea('');
        setSubArea('');
        setGrupo('');
        setTurno('');
        setDireccionResidencia('');
        setDptoResidencia('');
        setMunicipioResidencia('');
        setMunicipioNacido('');
        setDptoNacido('');
        setEps('');
        setAfp('');
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostMedicalFormula(FormatDate(datos.fecha), document, datos.idContingencia, datos.numeroHistoria,
                datos.idTipoRemision, JSON.stringify(diagnostico), datos.descripcion, user.id, user.id,
                FormatDate(new Date()));
            console.log("Datos = ", FormatDate(datos.fecha));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicalFormula(DataToInsert);
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
                    setDiagnostico([]);
                    CleanCombo();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainCard>
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

            <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                <Grid container spacing={2} sx={{ pb: 3, pt: 3 }}>
                    <Grid item xs={3}>
                        <PhotoModel
                            disabledCapture
                            disabledDelete
                            EstadoImg={imgSrc}
                        />
                    </Grid>
                    <Grid container spacing={2} item xs={9}>
                        <Grid item xs={4}>
                            <InputOnChange
                                label="N° Documento"
                                onKeyDown={handleDocument}
                                onChange={(e) => setDocument(e?.target.value)}
                                value={document}
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputOnChange
                                label="Nombres"
                                value={nombres}
                                onChange={(e) => setNombres(e?.target.value)}
                                disabled
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputOnChange
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e?.target.value)}
                                disabled
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputOnChange
                                label="Celular"
                                value={celular}
                                onChange={(e) => setCelular(e?.target.value)}
                                disabled
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectOnChange
                                name="escolaridad"
                                label="Escolaridad"
                                disabled
                                options={lsCatalogo}
                                value={escolaridad}
                                onChange={(e) => setEscolaridad(e?.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectOnChange
                                name="empresa"
                                label="Empresa"
                                disabled
                                options={lsEmpresas}
                                value={empresa}
                                onChange={(e) => setEmpresa(e?.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectOnChange
                                name="sede"
                                label="Sede"
                                disabled
                                options={lsCatalogo}
                                value={sede}
                                onChange={(e) => setSede(e?.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputDatePick
                                label="Fecha de Nacimiento"
                                value={fechaNaci}
                                disabled
                                onChange={(e) => setFechaNaci(e)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectOnChange
                                name="genero"
                                label="Genero"
                                disabled
                                options={lsCatalogo}
                                value={genero}
                                onChange={(e) => setGenero(e?.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectOnChange
                                name="estadoCivil"
                                label="Estado Civil"
                                disabled
                                options={lsCatalogo}
                                value={estadoCivil}
                                onChange={(e) => setEstadoCivil(e?.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputOnChange
                                label="Contacto"
                                value={contacto}
                                onChange={(e) => setContacto(e?.target.value)}
                                disabled
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputOnChange
                                label="Teléfono de Contacto"
                                value={telefonoContacto}
                                onChange={(e) => setTelefonoContacto(e?.target.value)}
                                disabled
                                size={matchesXS ? 'small' : 'medium'}
                                required={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard>

            <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" color="inherit">Ver mas...</Typography></>}>

                <Grid item xs={12} sx={{ pt: 1, pb: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <InputDatePick
                                    label="Fecha de Contrato"
                                    value={fechaContrato}
                                    disabled
                                    onChange={(e) => setFechaContrato(e)}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="tipoContrato"
                                    label="Tipo de Contrato"
                                    disabled
                                    options={lsCatalogo}
                                    value={tipoContrato}
                                    onChange={(e) => setTipoContrato(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="estado"
                                    label="Estado"
                                    disabled
                                    options={lsCatalogo}
                                    value={payStatus}
                                    onChange={(e) => setPayStatus(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="Rol"
                                    label="Rol"
                                    disabled
                                    options={lsCatalogo}
                                    value={type}
                                    onChange={(e) => setType(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="rosterPosition"
                                    label="Roster Position"
                                    disabled
                                    options={lsCatalogo}
                                    value={rosterPosition}
                                    onChange={(e) => setRosterPosition(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="generalPosition"
                                    label="General Position"
                                    disabled
                                    options={lsCatalogo}
                                    value={generalPosition}
                                    onChange={(e) => setGeneralPosition(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="Departamento"
                                    label="Departamento"
                                    disabled
                                    options={lsCatalogo}
                                    value={departamento}
                                    onChange={(e) => setDepartamento(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="Area"
                                    label="Area"
                                    disabled
                                    options={lsCatalogo}
                                    value={area}
                                    onChange={(e) => setArea(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="Subarea"
                                    label="Subarea"
                                    disabled
                                    options={lsCatalogo}
                                    value={subArea}
                                    onChange={(e) => setSubArea(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="Grupo"
                                    label="Grupo"
                                    disabled
                                    options={lsCatalogo}
                                    value={grupo}
                                    onChange={(e) => setGrupo(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="Turno"
                                    label="Turno"
                                    disabled
                                    options={lsCatalogo}
                                    value={turno}
                                    onChange={(e) => setTurno(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <InputOnChange
                                    label="Dirección de Residencia"
                                    value={direccionResidencia}
                                    onChange={(e) => setDireccionResidencia(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="dptoResidencia"
                                    label="Departamento de Residencia"
                                    disabled
                                    options={lsCatalogo}
                                    value={dptoResidencia}
                                    onChange={(e) => setDptoResidencia(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="municipioResidencia"
                                    label="Municipio de Residencia"
                                    disabled
                                    options={lsCatalogo}
                                    value={municipioResidencia}
                                    onChange={(e) => setMunicipioResidencia(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="municipioNacido"
                                    label="Municipio de Nacimiento"
                                    disabled
                                    options={lsCatalogo}
                                    value={municipioNacido}
                                    onChange={(e) => setMunicipioNacido(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="dptoNacido"
                                    label="Departamento de Nacimiento"
                                    disabled
                                    options={lsCatalogo}
                                    value={dptoNacido}
                                    onChange={(e) => setDptoNacido(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="EPS"
                                    label="EPS"
                                    disabled
                                    options={lsCatalogo}
                                    value={eps}
                                    onChange={(e) => setEps(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={3}>
                            <AnimateButton>
                                <SelectOnChange
                                    name="AFP"
                                    label="AFP"
                                    disabled
                                    options={lsCatalogo}
                                    value={afp}
                                    onChange={(e) => setAfp(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Accordion>

            <Divider />
            <Grid item sx={{ pt: 2, pb: 2 }}>
                <SubCard darkTitle title={<Typography variant="h4">GENERAR ORDEN</Typography>}>
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha"
                                    name="fecha"
                                    defaultValue={null}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoRemision"
                                    label="Tipo de Orden"
                                    defaultValue=""
                                    options={lsTipoOrden}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idContingencia"
                                    label="Contingencia"
                                    defaultValue=""
                                    options={lsContingencia}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <AnimateButton>
                                <Button size="large" variant="contained" onClick={handleAtender} fullWidth>
                                    Recetar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            {clickAttend ?
                <Fragment>
                    <SubCard darkTitle title={<Typography variant="h4">INDICACIÓN MÉDICA</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnostico(value)}
                                    value={diagnostico}
                                    label="Diagnostico"
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
                                        name="descripcion"
                                        label="Descripcion"
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

                    <Grid item xs={12} sx={{ pb: 2, pt: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/medicalformula/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Grid item xs={12} sx={{ pb: 2, pt: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/medicalformula/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>}
        </MainCard >
    );
};

export default MedicalFormula;