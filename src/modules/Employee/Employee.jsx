import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import InputDatePicker from 'components/input/InputDatePicker';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import PhotoModel from 'components/form/PhotoModel';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { InsertEmployee } from 'api/clients/EmployeeClient';
import { GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import SelectOnChange from 'components/input/SelectOnChange';
import { TitleButton, CodCatalogo, ValidationMessage, DefaultValue, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { PostEmployee } from 'formatdata/EmployeeForm';
import { Fragment } from 'react';

const validationSchema = yup.object().shape({
    documento: yup.string().required(`${ValidationMessage.Requerido}`),
    nombres: yup.string().required(`${ValidationMessage.Requerido}`),
    celular: yup.string().required(`${ValidationMessage.Requerido}`),
    empresa: yup.string().required(`${ValidationMessage.Requerido}`),
    tipoContrato: yup.string().required(`${ValidationMessage.Requerido}`),
    sede: yup.string().required(`${ValidationMessage.Requerido}`),
    genero: yup.string().required(`${ValidationMessage.Requerido}`),
    estadoCivil: yup.string().required(`${ValidationMessage.Requerido}`),
    grupo: yup.string().required(`${ValidationMessage.Requerido}`),
    type: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Employee = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const WebCamRef = useRef(null);
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [lsGes, setLsGes] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsEscolaridad, setEscolaridad] = useState([]);
    const [lsMunicipioN, setMunicipioN] = useState([]);
    const [lsMunicipioTrabaja, setLsMunicipioTrabaja] = useState([]);
    const [lsMunicipioR, setMunicipioR] = useState([]);
    const [lsDepartamento, setDepartamento] = useState([]);
    const [lsSede, setSede] = useState([]);
    const [lsGenero, setGenero] = useState([]);
    const [lsCodigoFilterDpto, setCodigoFilterDpto] = useState([]);
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
    const [dptoNacido, setDptoNacido] = useState(null);
    const [dptoResidencia, setDptoResidencia] = useState(null);
    const [dptoResidenciaTrabaja, setDptoResidenciaTrabaja] = useState(null);
    const [lsSubArea, setLsSubArea] = useState([]);
    const [imgSrc, setImgSrc] = useState(null);
    const [lsOficio, setOficio] = useState([]);
    const [open, setOpen] = useState(false);

    const methods = useForm(
        { resolver: yupResolver(validationSchema) }
    );

    const { handleSubmit, formState: { errors }, reset } = methods;

    const CapturePhoto = useCallback(() => {
        const imageSrc = WebCamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [WebCamRef, setImgSrc]);

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
                setOpenError(true);
                setErrorMessage('Problemas al traer los datos de combo');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
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

    const handleChangeDptoResidenciaTrabaja = async (event) => {
        setDptoResidenciaTrabaja(event.target.value);

        var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultMunicipioNacimiento = await GetSubString(lsResulCode);
        setLsMunicipioTrabaja(resultMunicipioNacimiento);
    };

    async function GetAll() {
        try {
            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);

            const lsServerGes = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Ges);
            var resultGes = lsServerGes.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGes(resultGes);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartamento(resultDepartamento);
            setCodigoFilterDpto(lsServerDepartamento.data.entities);

            const lsServerSubArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SubArea);
            var resultSubArea = lsServerSubArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSubArea(resultSubArea);

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

            const lsServerOficio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Oficio);
            var resultOficio = lsServerOficio.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setOficio(resultOficio);

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
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const CleanCombo = () => {
        setImgSrc(null);
        setDptoResidencia('');
        setDptoNacido('');
        setDptoResidenciaTrabaja('');
    }

    const handleClick = async (datos) => {
        try {
            const fotoEmpleado = imgSrc === null ? '' : imgSrc;

            const DataToInsert = PostEmployee(datos.documento, datos.nombres, FormatDate(datos.fechaNaci), datos.type, datos.departamento,
                datos.area, datos.subArea, datos.grupo, datos.municipioNacido, dptoNacido === null ? 1 : dptoNacido, FormatDate(datos.fechaContrato),
                datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
                datos.direccionResidencia, datos.direccionResidenciaTrabaja, datos.municipioResidencia, dptoResidenciaTrabaja === null ? 1 : dptoNacido,
                datos.municipioResidenciaTrabaja, dptoResidencia === null ? 1 : dptoNacido, datos.celular, datos.eps,
                datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
                datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, FormatDate(new Date()),
                DefaultValue.BANDERA_DRUMMOND, datos.ges, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()), fotoEmpleado, datos.oficio);


            if (Object.keys(datos.length !== 0)) {
                const result = await InsertEmployee(DataToInsert);
                if (result.status === 200) {
                    setOpenUpdate(true);
                    CleanCombo();
                    reset();
                }
            } else {
                setOpenError(true);
                setErrorMessage('Hubo un problemas al guardo los datos');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${Message.RegistroNoGuardado}`);
        }
    };

    return (
        <MainCard>
            <Fragment>
                <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <SubCard darkTitle title={<Typography variant="h4">Datos Personales</Typography>}>
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
                        <Grid item xs={12} md={6} lg={4}>
                            <PhotoModel
                                OpenModal={() => setOpen(true)}
                                EstadoImg={imgSrc}
                                RemoverImg={() => setImgSrc(null)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="documento"
                                            label="Documento"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.documento}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="nombres"
                                            label="Nombres"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.nombres}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.email}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="celular"
                                            label="Celular"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.celular}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="escolaridad"
                                            label="Escolaridad"
                                            options={lsEscolaridad}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.escolaridad}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="empresa"
                                            label="Empresa"
                                            options={company}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.empresa}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="sede"
                                            label="Sede"
                                            options={lsSede}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.sede}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha de Nacimiento"
                                            name="fechaNaci"
                                            bug={errors.fechaNaci}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="genero"
                                            label="Genero"
                                            options={lsGenero}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.genero}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="estadoCivil"
                                            label="Estado civil"
                                            options={lsEstadoCivil}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.estadoCivil}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="contacto"
                                            label="Contacto"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.contacto}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="telefonoContacto"
                                            label="Teléfono Contacto"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.telefonoContacto}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title={<Typography variant="h4">Información Contractual</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputDatePicker
                                    label="Fecha de Contrato"
                                    name="fechaContrato"
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="tipoContrato"
                                    label="Tipo de Contrato"
                                    options={lsTipoContrato}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.tipoContrato}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="type"
                                    label="Rol"
                                    options={lsRol}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.type}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="rosterPosition"
                                    label="Roster Position"
                                    options={lsRosterPosition}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.rosterPosition}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="generalPosition"
                                    label="General Position"
                                    options={lsGeneralPosition}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.generalPosition}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="departamento"
                                    label="Departamento"
                                    options={lsDepartEmpresa}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.departamento}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="area"
                                    label="Area"
                                    options={lsArea}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.area}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="subArea"
                                    label="Subarea"
                                    options={lsSubArea}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.subArea}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="grupo"
                                    label="Grupo"
                                    options={lsGrupo}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.grupo}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="turno"
                                    label="Turno"
                                    options={lsTurno}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.turno}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="rotation"
                                    label="Rotación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.rotation}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="oficio"
                                    label="Profesión"
                                    options={lsOficio}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.oficio}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ges"
                                    label="Ges"
                                    options={lsGes}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.ges}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="payStatus"
                                    label="Estado"
                                    options={lsEstado}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.payStatus}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title={<Typography variant="h4">Información Demográfica</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <SelectOnChange
                                name="dptoNacido"
                                label="Departamento de Nacimiento"
                                value={dptoNacido}
                                options={lsDepartamento}
                                onChange={handleChangeDptoNacido}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="municipioNacido"
                                    label="Municipio de Nacimiento"
                                    options={lsMunicipioN}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.municipioNacido}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <SelectOnChange
                                name="dptoResidencia"
                                label="Departamento de Residencia"
                                options={lsDepartamento}
                                size={matchesXS ? 'small' : 'medium'}
                                value={dptoResidencia}
                                onChange={handleChangeDptoResidencia}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="municipioResidencia"
                                    label="Municipio de Residencia"
                                    options={lsMunicipioR}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.municipioResidencia}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="direccionResidencia"
                                    label="Dirección de Residencia"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.direccionResidencia}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <SelectOnChange
                                name="dptoResidenciaTrabaja"
                                label="Departamento de Residencia Laboral"
                                options={lsDepartamento}
                                size={matchesXS ? 'small' : 'medium'}
                                value={dptoResidenciaTrabaja}
                                onChange={handleChangeDptoResidenciaTrabaja}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="municipioResidenciaTrabaja"
                                    label="Municipio de Residencia Laboral"
                                    options={lsMunicipioTrabaja}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.municipioResidenciaTrabaja}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
                                    fullWidth
                                    name="direccionResidenciaTrabaja"
                                    label="Dirección de Residencia Laboral"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.direccionResidenciaTrabaja}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title={<Typography variant="h4">Seguridad Social</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="eps"
                                    label="EPS"
                                    options={lsEps}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.eps}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="afp"
                                    label="AFP"
                                    options={lsAfp}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.afp}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="arl"
                                    label="ARL"
                                    options={lsArl}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.arl}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="cesantias"
                                    label="Cesantias"
                                    options={lsCesantias}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.cesantias}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <Grid item xs={12} sx={{ pb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/employee/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        </MainCard>
    );
};

export default Employee;