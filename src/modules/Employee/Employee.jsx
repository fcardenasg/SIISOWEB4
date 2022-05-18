// Import de Material-ui
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import InputDatePick from 'components/input/InputDatePick';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertEmployee } from 'api/clients/EmployeeClient';
import { GetAllCatalog, GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import SelectOnChange from 'components/input/SelectOnChange';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { PostEmployee } from 'formatdata/EmployeeForm';

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    documento: yup.string().required(`${ValidationMessage.Requerido}`),
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    type: yup.string().required(`${ValidationMessage.Requerido}`),
    departamento: yup.string().required(`${ValidationMessage.Requerido}`),
    area: yup.string().required(`${ValidationMessage.Requerido}`),
    subArea: yup.string().required(`${ValidationMessage.Requerido}`),
    grupo: yup.string().required(`${ValidationMessage.Requerido}`),
    municipioNacido: yup.string().required(`${ValidationMessage.Requerido}`),

    rosterPosition: yup.string().required(`${ValidationMessage.Requerido}`),
    tipoContrato: yup.string().required(`${ValidationMessage.Requerido}`),
    generalPosition: yup.string().required(`${ValidationMessage.Requerido}`),
    genero: yup.string().required(`${ValidationMessage.Requerido}`),
    sede: yup.string().required(`${ValidationMessage.Requerido}`),
    direccionResidencia: yup.string().required(`${ValidationMessage.Requerido}`),
    municipioResidencia: yup.string().required(`${ValidationMessage.Requerido}`),

    celular: yup.string().required(`${ValidationMessage.Requerido}`),
    eps: yup.string().required(`${ValidationMessage.Requerido}`),
    afp: yup.string().required(`${ValidationMessage.Requerido}`),
    turno: yup.string().required(`${ValidationMessage.Requerido}`),
    email: yup.string().required(`${ValidationMessage.Requerido}`),
    telefonoContacto: yup.string().required(`${ValidationMessage.Requerido}`),
    estadoCivil: yup.string().required(`${ValidationMessage.Requerido}`),
    empresa: yup.string().required(`${ValidationMessage.Requerido}`),
    arl: yup.string().required(`${ValidationMessage.Requerido}`),
    contacto: yup.string().required(`${ValidationMessage.Requerido}`),
    escolaridad: yup.string().required(`${ValidationMessage.Requerido}`),
    cesantias: yup.string().required(`${ValidationMessage.Requerido}`),
    rotation: yup.string().required(`${ValidationMessage.Requerido}`),
    payStatus: yup.string().required(`${ValidationMessage.Requerido}`),
    bandera: yup.string().required(`${ValidationMessage.Requerido}`),
    ges: yup.string().required(`${ValidationMessage.Requerido}`),
    usuarioModifica: yup.string().required(`${ValidationMessage.Requerido}`),
    usuarioCreacion: yup.string().required(`${ValidationMessage.Requerido}`)
}); */

const Employee = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsEscolaridad, setEscolaridad] = useState([]);
    const [lsMunicipioN, setMunicipioN] = useState([]);
    const [lsMunicipioR, setMunicipioR] = useState([]);
    const [lsDepartamento, setDepartamento] = useState([]);
    const [lsSede, setSede] = useState([]);
    const [lsGenero, setGenero] = useState([]);
    const [lsCodigoFilterDpto, setCodigoFilterDpto] = useState([]);
    const [lsCodigoFilterArea, setCodigoFilterArea] = useState([]);
    const [lsEstadoCivil, setEstadoCivil] = useState([]);
    const [lsTipoContrato, setTipoContrato] = useState([]);
    const [lsRol, setRol] = useState([]);
    const [lsRosterPosition, setRosterPosition] = useState([]);
    const [lsGeneralPosition, setGeneralPosition] = useState([]);
    const [lsDepartEmpresa, setDepartEmpresa] = useState([]);
    const [lsArea, setArea] = useState([]);
    const [lsGrupo, setGrupo] = useState([]);
    const [lsTurno, setTurno] = useState([]);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsEps, setEps] = useState([]);
    const [lsAfp, setAfp] = useState([]);
    const [lsArl, setArl] = useState([]);
    const [lsCesantias, setCesantias] = useState([]);
    const [dptoNacido, setDptoNacido] = useState('');
    const [dptoResidencia, setDptoResidencia] = useState('');
    const [eventArea, setEventArea] = useState('');
    const [lsSubArea, setSubArea] = useState([]);
    const [imgSrc, setImgSrc] = useState(null);
    const [open, setOpen] = useState(false);

    const [valueFechaNaci, setFechaNaci] = useState(null);
    const [valueFechaContrato, setFechaContrato] = useState(null);
    const [valueTermDate, setTermDate] = useState(null);
    const [valueFechaModificacion, setFechaModificacion] = useState(null);
    const [valueFechaCreacion, setFechaCreacion] = useState(null);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    const WebCamRef = useRef(null);

    const CapturePhoto = useCallback(() => {
        const imageSrc = WebCamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [WebCamRef, setImgSrc]);

    async function GetSubString(codigo) {
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo, 3);
            if (lsServerCatalog.status === 200) {
                var resultMunicipio = lsServerCatalog.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                return resultMunicipio;
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Problemas al traer los datos de combo',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const handleChangeDptoResidencia = async (event) => {
        setDptoResidencia(event.target.value);

        var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultMunicipioNacimiento = await GetSubString(lsResulCode);
        setMunicipioR(resultMunicipioNacimiento);
    };

    const handleChangeDptoNacido = async (event) => {
        setDptoNacido(event.target.value);

        var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultMunicipioNacimiento = await GetSubString(lsResulCode);
        setMunicipioN(resultMunicipioNacimiento);
    };

    const handleChangeArea = async (event) => {
        setEventArea(event.target.value);

        var lsResulCode = String(lsCodigoFilterArea.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultSubArea = await GetSubString(lsResulCode);
        setSubArea(resultSubArea);
    };

    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartamento(resultDepartamento);
            setCodigoFilterDpto(lsServerDepartamento.data.entities);

            const lsServerEscolaridad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Escolaridad);
            var resultEscolaridad = lsServerEscolaridad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEscolaridad(resultEscolaridad);

            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setSede(resultSede);

            const lsServerGenero = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Genero);
            var resultGenero = lsServerGenero.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setGenero(resultGenero);

            const lsServerEstadoCivil = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoCivil);
            var resultEstadoCivil = lsServerEstadoCivil.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEstadoCivil(resultEstadoCivil);

            const lsServerTipoContrato = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoContrato);
            var resultTipoContrato = lsServerTipoContrato.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoContrato(resultTipoContrato);

            const lsServerRol = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Rol);
            var resultRol = lsServerRol.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setRol(resultRol);

            const lsServerRosterPosition = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultRosterPosition = lsServerRosterPosition.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setRosterPosition(resultRosterPosition);

            const lsServerGeneralPosition = await GetAllByTipoCatalogo(0, 0, CodCatalogo.GeneralPosition);
            var resultGeneralPosition = lsServerGeneralPosition.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setGeneralPosition(resultGeneralPosition);

            const lsServerDepartEmpresa = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DepartEmpresa);
            var resultDepartEmpresa = lsServerDepartEmpresa.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartEmpresa(resultDepartEmpresa);

            const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Area);
            var resultArea = lsServerArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setArea(resultArea);
            setCodigoFilterArea(lsServerArea.data.entities);

            const lsServerGrupo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Grupo);
            var resultGrupo = lsServerGrupo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setGrupo(resultGrupo);

            const lsServerTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Turno);
            var resultTurno = lsServerTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTurno(resultTurno);

            const lsServerEstado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Estado);
            var resultEstado = lsServerEstado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstado(resultEstado);

            const lsServerEps = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Eps);
            var resultEps = lsServerEps.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEps(resultEps);

            const lsServerAfp = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Afp);
            var resultAfp = lsServerAfp.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setAfp(resultAfp);

            const lsServerArl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Arl);
            var resultArl = lsServerArl.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setArl(resultArl);

            const lsServerCesantias = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Cesantias);
            var resultCesantias = lsServerCesantias.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCesantias(resultCesantias);

            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const CleanCombo = () => {
        setFechaNaci(null);
        setFechaContrato(null);
        setTermDate(null);
        setFechaModificacion(null);
        setFechaCreacion(null);
        setImgSrc(null);
        setDptoResidencia('');
        setDptoNacido('');
    }

    const handleClick = async (datos) => {
        try {
            const FechaNaci = FormatDate(valueFechaNaci);
            const FechaContrato = FormatDate(valueFechaContrato);
            const TermDate = FormatDate(valueTermDate);

            const DataToInsert = PostEmployee(datos.documento, datos.nombres, FechaNaci, datos.type, datos.departamento,
                eventArea, datos.subArea, datos.grupo, datos.municipioNacido, dptoNacido, FechaContrato,
                datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
                datos.direccionResidencia, datos.municipioResidencia, dptoResidencia, datos.celular, datos.eps,
                datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
                datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, TermDate,
                datos.bandera, datos.ges, 'Usuario Modifica', FormatDate(new Date()), user.id,
                FormatDate(new Date()), imgSrc);

            if (FechaNaci != null && FechaContrato != null && TermDate != null && imgSrc != null) {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertEmployee(DataToInsert);
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
                        CleanCombo();
                    } else {
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: 'Hubo un problemas al guardo los datos',
                            variant: 'alert',
                            alertSeverity: 'error',
                            close: false,
                            transition: 'SlideUp'
                        })
                    }
                }
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Exiten campos vacios aún',
                    variant: 'alert',
                    alertSeverity: 'warning',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error al consumir el servicio de POST',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    const navigate = useNavigate();

    return (
        <MainCard>
            <SubCard darkTitle title={<Typography variant="h4">DATOS PERSONALES</Typography>}>
                <ModalChildren
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Tomar Fotografía"
                >
                    <WebCamCapture
                        CaptureImg={CapturePhoto}
                        RemoverImg={() => setImgSrc(null)}
                        ImgSrc={imgSrc}
                        WebCamRef={WebCamRef}
                    />
                </ModalChildren>

                <Grid container xs={12} spacing={2}>
                    <Grid item xs={3}>
                        <PhotoModel
                            OpenModal={() => setOpen(true)}
                            EstadoImg={imgSrc}
                            RemoverImg={() => setImgSrc(null)}
                        />
                    </Grid>

                    <Grid container spacing={2} item xs={9}>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="documento"
                                    label="Documento"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={!!errors?.documento}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="nombres"
                                    label="Nombres"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={!!errors?.nombres}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="celular"
                                    label="Celular"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="escolaridad"
                                    label="Escolaridad"
                                    defaultValue=""
                                    options={lsEscolaridad}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="sede"
                                    label="Sede"
                                    defaultValue=""
                                    options={lsSede}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <InputDatePick
                                label="Fecha de Nacimiento"
                                value={valueFechaNaci}
                                onChange={(e) => setFechaNaci(e)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="genero"
                                    label="Genero"
                                    defaultValue=""
                                    options={lsGenero}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="estadoCivil"
                                    label="Estado civil"
                                    defaultValue=""
                                    options={lsEstadoCivil}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="contacto"
                                    label="Contacto"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="telefonoContacto"
                                    label="Teléfono Contacto"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">INFORMACIÓN CONTRACTUAL</Typography>}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <InputDatePick
                            label="Fecha de Contrato"
                            value={valueFechaContrato}
                            onChange={(e) => setFechaContrato(e)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="tipoContrato"
                                label="Tipo de Contrato"
                                defaultValue=""
                                options={lsTipoContrato}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="type"
                                label="Rol"
                                defaultValue=""
                                options={lsRol}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="rosterPosition"
                                label="Roster Position"
                                defaultValue=""
                                options={lsRosterPosition}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="generalPosition"
                                label="General Position"
                                defaultValue=""
                                options={lsGeneralPosition}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="departamento"
                                label="Departamento"
                                defaultValue=""
                                options={lsDepartEmpresa}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <SelectOnChange
                            name="area"
                            label="Area"
                            value={eventArea}
                            options={lsArea}
                            onChange={handleChangeArea}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="subArea"
                                label="Subarea"
                                defaultValue=""
                                options={lsSubArea}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="grupo"
                                label="Grupo"
                                defaultValue=""
                                options={lsGrupo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="turno"
                                label="Turno"
                                defaultValue=""
                                options={lsTurno}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="rotation"
                                label="Rotación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="payStatus"
                                label="Estado"
                                defaultValue=""
                                options={lsEstado}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">INFORMACIÓN DEMOGRÁFICA</Typography>}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <SelectOnChange
                            name="dptoNacido"
                            label="Departamento de Nacimiento"
                            value={dptoNacido}
                            options={lsDepartamento}
                            onChange={handleChangeDptoNacido}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="municipioNacido"
                                label="Municipio de Nacimiento"
                                defaultValue=""
                                options={lsMunicipioN}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <SelectOnChange
                            name="dptoResidencia"
                            label="Departamento de Residencia"
                            options={lsDepartamento}
                            size={matchesXS ? 'small' : 'medium'}
                            value={dptoResidencia}
                            onChange={handleChangeDptoResidencia}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="municipioResidencia"
                                label="Municipio de Residencia"
                                defaultValue=""
                                options={lsMunicipioR}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="direccionResidencia"
                                label="Dirección de Residencia"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="direccionResidenciaTrabaja"
                                label="Dirección de Residencia Laboral"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">SEGURIDAD SOCIAL</Typography>}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="eps"
                                label="EPS"
                                defaultValue=""
                                options={lsEps}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="afp"
                                label="AFP"
                                defaultValue=""
                                options={lsAfp}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="arl"
                                label="ARL"
                                defaultValue=""
                                options={lsArl}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="cesantias"
                                label="Cesantias"
                                defaultValue=""
                                options={lsCesantias}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <SubCard darkTitle title={<Typography variant="h4">DATOS ADICIONALES</Typography>}>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <InputDatePick
                            label="Fecha de Terminación"
                            value={valueTermDate}
                            onChange={(e) => setTermDate(e)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="bandera"
                                label="Bandera"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="ges"
                                label="Ges"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="usuarioModifica"
                                label="Usuario Modifica"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <InputDatePick
                            label="Fecha de Modificación"
                            value={valueFechaModificacion}
                            onChange={(e) => setFechaModificacion(e)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="usuarioCreacion"
                                label="Usuario de Creación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={3}>
                        <InputDatePick
                            label="Fecha de Creación"
                            value={valueFechaCreacion}
                            onChange={(e) => setFechaCreacion(e)}
                        />
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

            <Grid item xs={12} sx={{ pb: 2 }}>
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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/employee/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Employee;