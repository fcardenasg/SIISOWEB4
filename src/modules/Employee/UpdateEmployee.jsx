import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { useParams } from 'react-router-dom';

// Import de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import PhotoModel from 'components/form/PhotoModel';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import { PutEmployee } from 'formatdata/EmployeeForm';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetByIdEmployee, UpdateEmployees } from 'api/clients/EmployeeClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import SelectOnChange from 'components/input/SelectOnChange';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import Cargando from 'components/Cargando';

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
}); */

const UpdateEmployee = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const WebCamRef = useRef(null);
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { id } = useParams();

    const [lsCatalogo, setLsCatalogo] = useState([]);
    const [lsGes, setLsGes] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsEscolaridad, setEscolaridad] = useState([]);
    const [lsMunicipioN, setMunicipioN] = useState([]);
    const [lsMunicipioR, setMunicipioR] = useState([]);
    const [lsDepartamento, setDepartamento] = useState([]);
    const [lsSede, setSede] = useState([]);
    const [lsGenero, setGenero] = useState([]);
    const [lsCodigoFilter, setCodigoFilter] = useState([]);
    const [lsEstadoCivil, setEstadoCivil] = useState([]);
    const [lsTipoContrato, setTipoContrato] = useState([]);
    const [lsRol, setRol] = useState([]);
    const [lsGeneralPosition, setGeneralPosition] = useState([]);
    const [lsRosterPosition, setRosterPosition] = useState([]);
    const [lsArea, setArea] = useState([]);
    const [lsSubArea, setLsSubArea] = useState([]);
    const [lsDepartEmpresa, setDepartEmpresa] = useState([]);
    const [lsGrupo, setGrupo] = useState([]);
    const [lsTurno, setTurno] = useState([]);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsEps, setEps] = useState([]);
    const [lsAfp, setAfp] = useState([]);
    const [lsArl, setArl] = useState([]);
    const [lsCesantias, setCesantias] = useState([]);
    const [lsMunicipioTrabaja, setLsMunicipioTrabaja] = useState([]);
    const [dptoResidenciaTrabaja, setDptoResidenciaTrabaja] = useState('');
    const [dptoNacido, setDptoNacido] = useState('');
    const [municipioResidenciaTrabaja, setMunicipioResidenciaTrabaja] = useState('');
    const [dptoResidencia, setDptoResidencia] = useState('');
    const [municipioNacido, setMunicipioNacido] = useState('');
    const [municipioResidencia, setMunicipioResidencia] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [open, setOpen] = useState(false);
    const [timeWait, setTimeWait] = useState(false);

    async function GetAll() {
        try {

            const lsServerEmployeeId = await GetByIdEmployee(id);
            if (lsServerEmployeeId.status === 200) {
                setEmployee(lsServerEmployeeId.data);
                setImgSrc(lsServerEmployeeId.data.imagenUrl);
                setDptoNacido(lsServerEmployeeId.data.dptoNacido);
                setDptoResidenciaTrabaja(lsServerEmployeeId.data.dptoResidenciaTrabaja);
                setDptoResidencia(lsServerEmployeeId.data.dptoResidencia);
            }

            const lsServerCatalogo = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalogo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCatalogo(resultCatalogo);

            const lsServerDepartEmpresa = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DepartEmpresa);
            var resultDepartEmpresa = lsServerDepartEmpresa.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartEmpresa(resultDepartEmpresa);

            const lsServerGeneralPosition = await GetAllByTipoCatalogo(0, 0, CodCatalogo.GeneralPosition);
            var resultGeneralPosition = lsServerGeneralPosition.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setGeneralPosition(resultGeneralPosition);

            const lsServerGes = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Ges);
            var resultGes = lsServerGes.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGes(resultGes);

            const lsServerSubArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SubArea);
            var resultSubArea = lsServerSubArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSubArea(resultSubArea);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartamento(resultDepartamento);
            setCodigoFilter(lsServerDepartamento.data.entities);

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

            const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Area);
            var resultArea = lsServerArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setArea(resultArea);

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
    }, []);

    setTimeout(() => {
        if (employee.length != 0) {
            setTimeWait(true);
        }
    }, 2000);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */
    const { handleSubmit, errors } = methods;

    async function GetSubString(codigo) {
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo, 5);
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

        var lsResulCode = String(lsCodigoFilter.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultMunicipioNacimiento = await GetSubString(lsResulCode);
        setMunicipioR(resultMunicipioNacimiento);
    };

    const handleChangeDptoNacido = async (event) => {
        setDptoNacido(event.target.value);

        var lsResulCode = String(lsCodigoFilter.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultMunicipioNacimiento = await GetSubString(lsResulCode);
        setMunicipioN(resultMunicipioNacimiento);
    };

    const handleChangeDptoResidenciaTrabaja = async (event) => {
        setDptoResidenciaTrabaja(event.target.value);

        var lsResulCode = String(lsCodigoFilter.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultMunicipioNacimiento = await GetSubString(lsResulCode);
        setLsMunicipioTrabaja(resultMunicipioNacimiento);
    };

    const CapturePhoto = useCallback(() => {
        const imageSrc = WebCamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [WebCamRef, setImgSrc]);

    const handleClick = async (datos) => {
        try {
            const municipioResidencia_DATA = municipioResidencia == '' ? datos.municipioResidencia : municipioResidencia;
            const municipioNacido_DATA = municipioNacido == '' ? datos.municipioNacido : municipioNacido;
            const municipioTrabaja_DATA = municipioResidenciaTrabaja == '' ? datos.municipioResidenciaTrabaja : municipioResidenciaTrabaja;

            const DataToUpdate = PutEmployee(datos.documento, datos.nombres, FormatDate(new Date(datos.fechaNaci)), datos.type, datos.departamento,
                datos.area, datos.subArea, datos.grupo, municipioNacido_DATA, dptoNacido, FormatDate(new Date(datos.fechaContrato)),
                datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
                datos.direccionResidencia, datos.direccionResidenciaTrabaja, municipioResidencia_DATA, dptoResidenciaTrabaja,
                municipioTrabaja_DATA, dptoResidencia, datos.celular, datos.eps,
                datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
                datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, FormatDate(new Date(datos.termDate)),
                1, datos.ges, employee.usuarioRegistro, employee.fechaRegistro, user.email, FormatDate(new Date()), imgSrc);

            if (imgSrc != null) {
                if (Object.keys(datos.length !== 0)) {
                    const result = await UpdateEmployees(DataToUpdate);
                    if (result.status === 200) {
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${Message.Actualizar}`,
                            variant: 'alert',
                            alertSeverity: 'success',
                            close: false,
                            transition: 'SlideUp'
                        })
                    }
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
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard>
            {timeWait ? (
                <Fragment>
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

                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <PhotoModel
                                    OpenModal={() => setOpen(true)}
                                    EstadoImg={imgSrc}
                                    RemoverImg={() => setImgSrc(null)}
                                />
                            </Grid>

                            <Grid item xs={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={employee.documento}
                                                fullWidth
                                                name="documento"
                                                label="Documento"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={employee.nombres}
                                                fullWidth
                                                name="nombres"
                                                label="Nombres"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={employee.email}
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
                                                defaultValue={employee.celular}
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
                                                defaultValue={employee.escolaridad}
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
                                                defaultValue={employee.empresa}
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
                                                defaultValue={employee.sede}
                                                options={lsSede}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha de Nacimiento"
                                                name="fechaNaci"
                                                defaultValue={employee.fechaNaci}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="genero"
                                                label="Genero"
                                                defaultValue={employee.genero}
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
                                                defaultValue={employee.estadoCivil}
                                                options={lsEstadoCivil}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={employee.contacto}
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
                                                defaultValue={employee.telefonoContacto}
                                                fullWidth
                                                name="telefonoContacto"
                                                label="Telefono Contacto"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                    <Grid sx={{ pb: 2 }} />

                    <SubCard darkTitle title={<Typography variant="h4">INFORMACIÓN CONTRACTUAL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Contrato"
                                        name="fechaContrato"
                                        defaultValue={employee.fechaContrato}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="tipoContrato"
                                        label="Tipo de Contrato"
                                        defaultValue={employee.tipoContrato}
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
                                        defaultValue={employee.type}
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
                                        defaultValue={employee.rosterPosition}
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
                                        defaultValue={employee.generalPosition}
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
                                        label="Departamentos"
                                        defaultValue={employee.departamento}
                                        options={lsDepartEmpresa}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="area"
                                        label="Area"
                                        defaultValue={employee.area}
                                        options={lsArea}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="subArea"
                                        label="Subarea"
                                        defaultValue={employee.subArea}
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
                                        defaultValue={employee.grupo}
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
                                        defaultValue={employee.turno}
                                        options={lsTurno}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={employee.rotation}
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
                                        defaultValue={employee.payStatus}
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
                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="dptoNacido"
                                    label="Departamento de Nacimiento"
                                    value={dptoNacido}
                                    options={lsDepartamento}
                                    onChange={handleChangeDptoNacido}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {lsMunicipioN.length != 0 ? (
                                    <SelectOnChange
                                        name="municipioNacido"
                                        label="Municipio de Nacimiento"
                                        value={municipioNacido}
                                        options={lsMunicipioN}
                                        onChange={(e) => setMunicipioNacido(e.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                ) : (
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="municipioNacido"
                                            label="Municipio de Nacimiento"
                                            defaultValue={employee.municipioNacido}
                                            disabled
                                            options={lsCatalogo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                )}
                            </Grid>
                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="dptoResidencia"
                                    label="Departamento de Residencia"
                                    options={lsDepartamento}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={dptoResidencia}
                                    onChange={handleChangeDptoResidencia}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {lsMunicipioR.length != 0 ? (
                                    <SelectOnChange
                                        name="municipioResidencia"
                                        label="Municipio de Residencia"
                                        value={municipioResidencia}
                                        options={lsMunicipioR}
                                        onChange={(e) => setMunicipioResidencia(e.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                ) : (
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="municipioResidencia"
                                            label="Municipio de Residencia"
                                            defaultValue={employee.municipioResidencia}
                                            disabled
                                            options={lsCatalogo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                )}
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={employee.direccionResidencia}
                                        fullWidth
                                        name="direccionResidencia"
                                        label="Dirección de Residencia"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="dptoResidenciaTrabaja"
                                    label="Departamento de Residencia Laboral"
                                    options={lsDepartamento}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={dptoResidenciaTrabaja}
                                    onChange={handleChangeDptoResidenciaTrabaja}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {lsMunicipioTrabaja.length != 0 ?
                                    <SelectOnChange
                                        name="municipioResidenciaTrabaja"
                                        label="Municipio de Residencia Laboral"
                                        value={municipioResidenciaTrabaja}
                                        options={lsMunicipioTrabaja}
                                        onChange={(e) => setMunicipioResidenciaTrabaja(e.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                    : <FormProvider {...methods}>
                                        <InputSelect
                                            name="municipioResidenciaTrabaja"
                                            label="Municipio de Residencia Laboral"
                                            defaultValue={employee.municipioResidenciaTrabaja}
                                            disabled
                                            options={lsCatalogo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>}
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={employee.direccionResidenciaTrabaja}
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
                                        defaultValue={employee.eps}
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
                                        defaultValue={employee.afp}
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
                                        defaultValue={employee.arl}
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
                                        defaultValue={employee.cesantias}
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
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Terminación"
                                        name="termDate"
                                        defaultValue={employee.termDate}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="ges"
                                        label="Ges"
                                        defaultValue={employee.ges}
                                        options={lsGes}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                    <Grid sx={{ pb: 2 }} />

                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                        {TitleButton.Actualizar}
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
                </Fragment>
            ) : <Cargando />}
        </MainCard>
    );
};

export default UpdateEmployee;