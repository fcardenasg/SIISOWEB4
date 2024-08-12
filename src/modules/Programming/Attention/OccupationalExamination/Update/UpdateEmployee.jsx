import { useState, useEffect, useCallback, useRef } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import PhotoModel from 'components/form/PhotoModel';
import ModalChildren from 'components/form/ModalChildren';
import WebCamCapture from 'components/form/WebCam';
import { GetByIdEmployee, UpdateEmployees } from 'api/clients/EmployeeClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import SelectOnChange from 'components/input/SelectOnChange';
import { TitleButton, CodCatalogo, ValidationMessage, Message, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputDatePicker from 'components/input/InputDatePicker';
import Cargando from 'components/loading/Cargando';

const validationSchema = yup.object().shape({
    documento: yup.string().required(ValidationMessage.Requerido),
    nombres: yup.string().required(ValidationMessage.Requerido),
    celular: yup.string().required(ValidationMessage.Requerido),
    empresa: yup.string().required(ValidationMessage.Requerido),
    sede: yup.string().required(ValidationMessage.Requerido),
    genero: yup.string().required(ValidationMessage.Requerido),
    estadoCivil: yup.string().required(ValidationMessage.Requerido)
});

const UpdateEmployee = ({ idEmpleado = "", setOpenUpdateTwo, getDataAttention }) => {
    const { user } = useAuth();
    const WebCamRef = useRef(null);
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openError, setOpenError] = useState(false);

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
    const [dptoResidenciaTrabaja, setDptoResidenciaTrabaja] = useState("");
    const [dptoNacido, setDptoNacido] = useState("");
    const [idTipoContrato, setIdTipoContrato] = useState(null);
    const [dptoResidencia, setDptoResidencia] = useState("");
    const [imgSrc, setImgSrc] = useState(null);
    const [open, setOpen] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [lsOficio, setOficio] = useState([]);

    async function getAll() {
        try {
            const lsServerEmployeeId = await GetByIdEmployee(idEmpleado);
            if (lsServerEmployeeId.data.status === 200) {
                setEmployee(lsServerEmployeeId?.data.data);
                setImgSrc(lsServerEmployeeId?.data.data.imagenUrl);
                setDptoNacido(lsServerEmployeeId?.data.data.dptoNacido);
                setIdTipoContrato(lsServerEmployeeId?.data.data.tipoContrato);
                setDptoResidenciaTrabaja(lsServerEmployeeId?.data.data.dptoResidenciaTrabaja);
                setDptoResidencia(lsServerEmployeeId?.data.data.dptoResidencia);

                setLsMunicipioTrabaja(lsServerEmployeeId?.data.data.lsDptoResidenciaTrabaja);
                setMunicipioN(lsServerEmployeeId?.data.data.lsDptoNacido);
                setMunicipioR(lsServerEmployeeId?.data.data.lsDptoResidencia);
            } else {
                setEmployee(lsServerEmployeeId?.data.data);

                setImgSrc(lsServerEmployeeId?.data.data.imagenUrl);
                setDptoNacido(lsServerEmployeeId?.data.data.dptoNacido);
                setIdTipoContrato(lsServerEmployeeId?.data.data.tipoContrato);
                setDptoResidenciaTrabaja(lsServerEmployeeId?.data.data.dptoResidenciaTrabaja);
                setDptoResidencia(lsServerEmployeeId?.data.data.dptoResidencia);

                setLsMunicipioTrabaja(lsServerEmployeeId?.data.data.lsDptoResidenciaTrabaja);
                setMunicipioN(lsServerEmployeeId?.data.data.lsDptoNacido);
                setMunicipioR(lsServerEmployeeId?.data.data.lsDptoResidencia);
            }

            const lsServerOficio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Oficio);
            var resultOficio = lsServerOficio.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setOficio(resultOficio);

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
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const methods = useForm(
        { resolver: yupResolver(validationSchema) }
    );

    const { handleSubmit, setValue, formState: { errors } } = methods;

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
            const DataToUpdate = {
                documento: datos.documento,
                nombres: datos.nombres,
                fechaNaci: datos.fechaNaci || null,
                type: datos.type || null,
                departamento: datos.departamento || null,
                area: datos.area || null,
                subArea: datos.subArea || null,
                grupo: datos.grupo || null,
                municipioNacido: datos.municipioNacido || null,
                dptoNacido: dptoNacido || null,
                fechaContrato: datos.fechaContrato || null,
                rosterPosition: datos.rosterPosition || null,
                tipoContrato: idTipoContrato,
                generalPosition: datos.generalPosition || null,
                genero: datos.genero || null,
                sede: datos.sede || null,
                direccionResidencia: datos.direccionResidencia || null,
                direccionResidenciaTrabaja: datos.direccionResidenciaTrabaja || null,
                dptoResidenciaTrabaja: dptoResidenciaTrabaja || null,
                municipioResidenciaTrabaja: datos.municipioResidenciaTrabaja || null,
                municipioResidencia: datos.municipioResidencia || null,
                dptoResidencia: dptoResidencia,
                celular: datos.celular || null,
                eps: datos.eps || null,
                afp: datos.afp || null,
                turno: datos.turno || null,
                email: datos.email || null,
                telefonoContacto: datos.telefonoContacto || null,
                estadoCivil: datos.estadoCivil || null,
                empresa: datos.empresa || null,
                arl: datos.arl || null,
                contacto: datos.contacto || null,
                escolaridad: datos.escolaridad || null,
                cesantias: datos.cesantias || null,
                rotation: datos.rotation || null,
                payStatus: datos.payStatus || null,
                termDate: null,
                imagenUrl: imgSrc,
                bandera: DefaultValue.BANDERA_DRUMMOND,
                ges: datos.ges || null,
                usuarioRegistro: user.nameuser,
                oficio: datos.oficio || null,
                fechaIngreso: datos.fechaIngreso || null,
                fechaUltimoControl: datos.fechaUltimoControl || null,
                fechaEgreso: datos.fechaEgreso || null
            };

            const result = await UpdateEmployees(DataToUpdate);
            if (result.status === 200) {
                const event = { target: { value: datos.documento } }
                getDataAttention(event);

                setOpenUpdate(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (employee.length != 0) {
            setTimeWait(true);
        }
    }, 1500);

    return (
        <Grid container spacing={3}>
            {timeWait ? (
                <FormProvider {...methods}>
                    <Grid item xs={12}>
                        <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
                        <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                        <SubCard sx={{ mb: 2 }} darkTitle title={<Typography variant="h4">Datos personales</Typography>}>
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
                                            <InputText
                                                defaultValue={employee.documento}
                                                fullWidth
                                                type="number"
                                                name="documento"
                                                label="Documento"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.documento}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                defaultValue={employee.nombres}
                                                fullWidth
                                                name="nombres"
                                                label="Nombres"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.nombres}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                defaultValue={employee.email}
                                                fullWidth
                                                name="email"
                                                label="Email"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                defaultValue={employee.celular}
                                                fullWidth
                                                name="celular"
                                                label="Celular"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.celular}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="escolaridad"
                                                label="Escolaridad"
                                                defaultValue={employee.escolaridad}
                                                options={lsEscolaridad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.escolaridad}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="empresa"
                                                label="Empresa"
                                                defaultValue={employee.empresa}
                                                options={company}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.empresa}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="sede"
                                                label="Sede"
                                                defaultValue={employee.sede}
                                                options={lsSede}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.sede}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputDatePicker
                                                label="Fecha de Nacimiento"
                                                name="fechaNaci"
                                                defaultValue={employee.fechaNaci}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="genero"
                                                label="Genero"
                                                defaultValue={employee.genero}
                                                options={lsGenero}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.genero}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="estadoCivil"
                                                label="Estado civil"
                                                defaultValue={employee.estadoCivil}
                                                options={lsEstadoCivil}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.estadoCivil}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                defaultValue={employee.contacto}
                                                fullWidth
                                                name="contacto"
                                                label="Contacto"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.contacto}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                defaultValue={employee.telefonoContacto}
                                                fullWidth
                                                name="telefonoContacto"
                                                label="Telefono Contacto"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.telefonoContacto}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>

                        <SubCard sx={{ mb: 2 }} darkTitle title={<Typography variant="h4">Información contractual</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <SelectOnChange
                                        name="tipoContrato"
                                        label="Tipo de Contrato"
                                        value={idTipoContrato}
                                        options={lsTipoContrato}
                                        onChange={(e) => {
                                            setIdTipoContrato(e.target.value);

                                            if (e.target.value === 9717) {
                                                setValue("fechaContrato", "");
                                                setValue("turno", "");
                                                setValue("grupo", "");
                                                setValue("rotation", "");
                                                setValue("generalPosition", "");
                                                setValue("arl", "");
                                            }
                                        }}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputDatePicker
                                        disabled={idTipoContrato === 9717 ? true : false}
                                        label="Fecha de Contrato"
                                        name="fechaContrato"
                                        defaultValue={employee.fechaContrato}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="type"
                                        label="Rol"
                                        defaultValue={employee.type}
                                        options={lsRol}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.type}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="rosterPosition"
                                        label="Roster Position"
                                        defaultValue={employee.rosterPosition}
                                        options={lsRosterPosition}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.rosterPosition}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="generalPosition"
                                        label="General Position"
                                        disabled={idTipoContrato === 9717 ? true : false}
                                        defaultValue={employee.generalPosition}
                                        options={lsGeneralPosition}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.generalPosition}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="departamento"
                                        label="Departamentos"
                                        defaultValue={employee.departamento}
                                        options={lsDepartEmpresa}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.departamento}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="area"
                                        label="Area"
                                        defaultValue={employee.area}
                                        options={lsArea}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.area}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="subArea"
                                        label="Subarea"
                                        defaultValue={employee.subArea}
                                        options={lsSubArea}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.subArea}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="grupo"
                                        disabled={idTipoContrato === 9717 ? true : false}
                                        label="Grupo"
                                        defaultValue={employee.grupo}
                                        options={lsGrupo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.grupo}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="turno"
                                        disabled={idTipoContrato === 9717 ? true : false}
                                        label="Turno"
                                        defaultValue={employee.turno}
                                        options={lsTurno}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.turno}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={employee.rotation}
                                        disabled={idTipoContrato === 9717 ? true : false}
                                        fullWidth
                                        name="rotation"
                                        label="Rotación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.rotation}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="oficio"
                                        label="Profesión"
                                        defaultValue={employee.oficio}
                                        options={lsOficio}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.oficio}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="ges"
                                        label="Ges"
                                        defaultValue={employee.ges}
                                        options={lsGes}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.ges}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="payStatus"
                                        label="Estado"
                                        defaultValue={employee.payStatus}
                                        options={lsEstado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.payStatus}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>

                        <SubCard sx={{ mb: 2 }} darkTitle title={<Typography variant="h4">Información demográfica</Typography>}>
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
                                    <InputSelect
                                        name="municipioNacido"
                                        label="Municipio de Nacimiento"
                                        defaultValue={employee.municipioNacido}
                                        options={lsMunicipioN}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.municipioNacido}
                                    />
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
                                    <InputSelect
                                        name="municipioResidencia"
                                        label="Municipio de Residencia"
                                        defaultValue={employee.municipioResidencia}
                                        options={lsMunicipioR}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.municipioResidencia}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={employee.direccionResidencia}
                                        fullWidth
                                        name="direccionResidencia"
                                        label="Dirección de Residencia"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.direccionResidencia}
                                    />
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
                                    <InputSelect
                                        name="municipioResidenciaTrabaja"
                                        label="Municipio de Residencia Laboral"
                                        defaultValue={employee.municipioResidenciaTrabaja}
                                        options={lsMunicipioTrabaja}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.municipioResidenciaTrabaja}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={employee.direccionResidenciaTrabaja}
                                        fullWidth
                                        name="direccionResidenciaTrabaja"
                                        label="Dirección de Residencia Laboral"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.direccionResidenciaTrabaja}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>

                        <SubCard sx={{ mb: 2 }} darkTitle title={<Typography variant="h4">Seguridad social</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="eps"
                                        label="EPS"
                                        defaultValue={employee.eps}
                                        options={lsEps}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.eps}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="afp"
                                        label="AFP"
                                        defaultValue={employee.afp}
                                        options={lsAfp}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.afp}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="arl"
                                        disabled={idTipoContrato === 9717 ? true : false}
                                        label="ARL"
                                        defaultValue={employee.arl}
                                        options={lsArl}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.arl}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="cesantias"
                                        label="Cesantias"
                                        defaultValue={employee.cesantias}
                                        options={lsCesantias}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.cesantias}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>

                        <SubCard sx={{ mb: 2 }} darkTitle title={<Typography variant="h4">Otros datos del empleado</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputDatePicker
                                        defaultValue={employee?.fechaIngreso}
                                        label="Fecha de ingreso"
                                        name="fechaIngreso"
                                        bug={errors.fechaIngreso}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputDatePicker
                                        defaultValue={employee?.fechaUltimoControl}
                                        label="Fecha de último control"
                                        name="fechaUltimoControl"
                                        bug={errors.fechaUltimoControl}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputDatePicker
                                        defaultValue={employee?.fechaEgreso}
                                        label="Fecha de egreso"
                                        name="fechaEgreso"
                                        bug={errors.fechaEgreso}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4} lg={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={6} md={4} lg={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" onClick={() => setOpenUpdateTwo(false)} fullWidth>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider>
            ) :
                <Grid container spacing={3} sx={{ m: 5 }}>
                    <Grid item xs={12}>
                        <Cargando />
                    </Grid>
                </Grid>
            }
        </Grid>
    );
};

export default UpdateEmployee;