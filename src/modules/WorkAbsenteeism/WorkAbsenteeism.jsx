import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import ViewEmployee from 'components/views/ViewEmployee';
import { PostWorkAbsenteeism } from 'formatdata/WorkAbsenteeismForm';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import { GetAllWorkAbsenteeismNumeroDia, InsertWorkAbsenteeism } from 'api/clients/WorkAbsenteeismClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import InputOnChange from 'components/input/InputOnChange';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import UserCountCard from 'ui-component/cards/UserCountCard';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import { GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Accordion from 'components/accordion/Accordion';
import HistoryWorkAbsenteeism from './HistoryWorkAbsenteeism';

const ColorCard = (numeroDias) => {
    const theme = useTheme();

    if (numeroDias >= 75 && numeroDias <= 90)
        return theme.palette.warning.main;

    if (numeroDias >= 90 && numeroDias <= 180)
        return theme.palette.warning.dark;

    if (numeroDias > 180)
        return theme.palette.error.main;

    return theme.palette.grey[400];
}

const WorkAbsenteeism = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);

    const [textoDx, setTextoDx] = useState('');
    const [lsCIE11, setLsCIE11] = useState([]);

    const [tipoSoporte, setTipoSoporte] = useState(undefined);
    const [disabledButtons, setDisabledButtons] = useState(false);
    const [diasSinLaborar, setDiasSinLaborar] = useState(0);
    const [numeroDias, setNumeroDias] = useState(0);
    const [departa, setDeparta] = useState(undefined);
    const [lsDeparta, setLsDeparta] = useState([]);
    const [departamentoIPS, setDepartaMedico] = useState(undefined);
    const [lsMunicipio, setMunicipioE] = useState([]);
    const [lsMunicipioMedico, setMunicipioMedico] = useState([]);
    const [lsCodigoFilterDpto, setCodigoFilterDpto] = useState([]);
    const [lsCodigoFilterTipoSoporte, setLsCodigoFilterTipoSoporte] = useState([]);

    const [lsTipoInca, setLsTipoInca] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsIncapacidad, setLsIncapacidad] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsTipoSoporte, setLsTipoSoporte] = useState([]);
    const [lsCategoria, setLsCategoria] = useState([]);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [lsRedExpide, setLsRedExpide] = useState([]);
    const [lsCumplimientoRequisito, setLsCumplimientoRequisito] = useState([]);

    const [fechaExpedicion, setFechaExpedicion] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechaModifica, setFechaModifica] = useState(new Date().toLocaleString());

    const methods = useForm();
    const { handleSubmit, errors } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
                    }

                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee([]);
        } catch (error) { }
    }

    async function getAll() {
        try {
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerSubsegmento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_REGION);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSubsegmento(resultSubsegmento);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDeparta(resultDepartamento);
            setCodigoFilterDpto(lsServerDepartamento.data.entities);

            const lsServerIncapacidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_INC);
            var resultIncapacidad = lsServerIncapacidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsIncapacidad(resultIncapacidad);

            const lsServerTipoSoporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_TISOPOR);
            var resultTipoSoporte = lsServerTipoSoporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoSoporte(resultTipoSoporte);
            setLsCodigoFilterTipoSoporte(lsServerTipoSoporte.data.entities);

            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_TIPOATEN);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);

            const lsServerRedExpide = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_REDEXP);
            var resultRedExpide = lsServerRedExpide.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRedExpide(resultRedExpide);

            const lsServerCumplimientoRequisito = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultCumplimientoRequisito = lsServerCumplimientoRequisito.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCumplimientoRequisito(resultCumplimientoRequisito);

            const lsServerTipoInca = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_TIPOINCA);
            var resultTipoInca = lsServerTipoInca.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoInca(resultTipoInca);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_CONT);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_ESTCAS);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoCaso(resultEstadoCaso);
        } catch (error) { }
    }

    const handleChangeDepartamentoIncapa = async (event) => {
        try {
            setDeparta(event.target.value);

            var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));
            var lsServerDepartamento = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);

            var resultMunicipio = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setMunicipioE(resultMunicipio);
        } catch (error) {

        }
    };

    const handleChangeTipoSoporte = async (event) => {
        try {
            setTipoSoporte(event.target.value);

            var lsResulCode = String(lsCodigoFilterTipoSoporte.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));
            var lsServerTipoSoporte = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 4);

            var resultCategoria = lsServerTipoSoporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCategoria(resultCategoria);
        } catch (error) {

        }
    };

    const handleChangeDepartamentoMedico = async (event) => {
        try {
            setDepartaMedico(event.target.value);

            var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));
            var lsServerDepartamento = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);

            var resultMunicipio = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setMunicipioMedico(resultMunicipio);
        } catch (error) {

        }
    };

    const handleChangeDx = async (event) => {
        try {
            setTextoDx(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsCIE11(resultCie11);
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

    const handleFechaInicio = async (event) => {
        try {
            setFechaInicio(event.target.value);
            var result = NumeroDias(event.target.value, fechaFin);
            setDiasSinLaborar(result);
        } catch (error) {
            setDiasSinLaborar(0);
            setOpenError(true);
            setErrorMessage(error.message);
        }
    }

    const handleFechaFin = async (event) => {
        try {
            setFechaFin(event.target.value);
            var result = NumeroDias(fechaInicio, event.target.value);
            setDiasSinLaborar(result);
        } catch (error) {
            setDiasSinLaborar(0);
            setOpenError(true);
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostWorkAbsenteeism(documento, datos.incapacidad, datos.nroIncapacidad, FormatDate(fechaExpedicion), departa,
                datos.ciudadExpedicion, datos.tipoIncapacidad, datos.contingencia, FormatDate(fechaInicio), FormatDate(fechaFin), diasSinLaborar,
                datos.dxFinal, datos.dxFinal, datos.estadoCaso, datos.segmentoAgrupado, undefined, datos.segmento, tipoSoporte, datos.idCategoria,

                datos.proveedor, departamentoIPS, datos.ciudadIPS, datos.nombreProfesional, datos.especialidad, datos.registroProfesional, datos.tipoAtencion,
                datos.cumplimientoRequisito, datos.expideInCapacidad, datos.observacionCumplimiento,

                datos.observacion, undefined, undefined, user.nameuser, undefined, lsEmployee.tipoContrato, lsEmployee.type,
                undefined, undefined);

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertWorkAbsenteeism(DataToInsert);
                    if (result.status === 200) {
                        if (result.data.message === 'Este ausentismo ya esta registrado') {
                            setOpenError(true);
                            setErrorMessage(result.data.message);
                        } else {
                            setOpenSuccess(true);
                            setDisabledButtons(true);

                            const numeroDias1 = await GetAllWorkAbsenteeismNumeroDia(documento);
                            setNumeroDias(numeroDias1.data);
                        }
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorNoHayDatos);
                }
            }
        } catch (error) {
            setErrorMessage(Message.RegistroNoGuardado);
            setOpenError(true);
        }
    };

    return (
        <Fragment>
            <MessageSuccess onClose={() => setOpenSuccess(false)} open={openSuccess} />
            <MessageError onClose={() => setOpenError(false)} open={openError} error={errorMessage} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Ausentismo Labora"
                        key={lsEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Datos De La Empresa Que Expide</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        defaultValue={DefaultValue.INCAPACIDAD_MEDICA}
                                        name="incapacidad"
                                        label="Incapacidad"
                                        options={lsIncapacidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="nroIncapacidad"
                                        label="Nro. de Incapacidad"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <InputDatePick
                                    label="Fecha de Expedición"
                                    value={fechaExpedicion}
                                    onChange={(e) => setFechaExpedicion(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="departamento"
                                    label="Departamento"
                                    options={lsDeparta}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={departa}
                                    onChange={handleChangeDepartamentoIncapa}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="ciudadExpedicion"
                                        label="Ciudad de Expedición"
                                        options={lsMunicipio}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Datos De Incapacidad O Licencia</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="tipoIncapacidad"
                                        label="Tipo de Incapacidad"
                                        options={lsTipoInca}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="contingencia"
                                        label="Contingencia"
                                        options={lsContingencia}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Fecha de Inicio"
                                    value={fechaInicio}
                                    onChange={handleFechaInicio}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Fecha Fin"
                                    value={fechaFin}
                                    onChange={handleFechaFin}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputOnChange
                                    fullWidth
                                    disabled
                                    name="diasSinLaborar"
                                    label="Días de Incapacidad"
                                    onChange={(e) => setDiasSinLaborar(e.target.value)}
                                    value={diasSinLaborar}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputOnChange
                                    label="Código Dx"
                                    onKeyDown={handleChangeDx}
                                    onChange={(e) => setTextoDx(e?.target.value)}
                                    value={textoDx}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={9.6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="dxFinal"
                                        label="Diagnóstico"
                                        options={lsCIE11}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="estadoCaso"
                                        label="Estado de Caso"
                                        options={lsEstadoCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                        defaultValue={DefaultValue.INCAPACIDAD_ANTIGUO}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="segmentoAgrupado"
                                        label="Segmento Agrupado"
                                        options={lsSegmentoAgrupado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="segmento"
                                        label="Segmento"
                                        options={lsSubsegmento}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="idTipoSoporte"
                                    label="Tipo de Soporte"
                                    options={lsTipoSoporte}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={tipoSoporte}
                                    onChange={handleChangeTipoSoporte}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idCategoria"
                                        label="Categoria"
                                        options={lsCategoria}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Datos Del Médico O IPS Prestadora Del Servicio</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4.8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="proveedor"
                                        label="Proveedor"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <SelectOnChange
                                    name="departamentoIPS"
                                    label="Departamento"
                                    options={lsDeparta}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={departamentoIPS}
                                    onChange={handleChangeDepartamentoMedico}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="ciudadIPS"
                                        label="Ciudad"
                                        options={lsMunicipioMedico}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="nombreProfesional"
                                        label="Nombre de Profesional"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="especialidad"
                                        label="Profesión/Especialidad"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="registroProfesional"
                                        label="Reg. Profesional"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        defaultValue={DefaultValue.INCAPACIDAD_HOSPITALIZACION}
                                        name="tipoAtencion"
                                        label="Tipo de Atención"
                                        options={lsTipoAtencion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        defaultValue={DefaultValue.Opcion_SI}
                                        name="cumplimientoRequisito"
                                        label="Cumplimiento Requisito"
                                        options={lsCumplimientoRequisito}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        defaultValue={DefaultValue.INCAPACIDAD_EPS}
                                        name="expideInCapacidad"
                                        label="Red que expide"
                                        options={lsRedExpide}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionCumplimiento"
                                        label="Observacion Cumplimiento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                        multiline
                                        rows={4}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Observación/Descripción De La Novedad</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacion"
                                        label="Observación/Descripción"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                        multiline
                                        rows={4}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        disabled
                                        name="usuarioModificacion"
                                        label="Usuario Modifica"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <InputDatePick
                                    label="Fecha de Modificicación"
                                    value={fechaModifica}
                                    disabled
                                    onChange={(e) => setFechaModifica(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Monitor De Eventos</Typography>}>
                        <Grid container spacing={2} sx={{ pb: 2, pl: 4 }}>
                            <Grid item xs={2}>
                                <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.main }} />
                                <Typography variant="h6">De 75 a 90 Días</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.dark }} />
                                <Typography variant="h6">De 90 a 180 Días</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <RadioButtonCheckedTwoToneIcon color='error' />
                                <Typography variant="h6">{'> 180 Días'}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ pb: 2, pt: 3, pl: 4, textAlign: 'center' }}>
                            <Grid item xs={6}>
                                <UserCountCard
                                    primary="Total días acumulado en incapacidad"
                                    secondary={numeroDias}
                                    iconPrimary={AccountCircleTwoTone}
                                    color={() => ColorCard(numeroDias)}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Accordion title={<><HistoryIcon color='info' />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Historial de días acumulado en incapacidad</Typography></>}>
                                <HistoryWorkAbsenteeism documento={documento} refresh={openSuccess} />
                            </Accordion>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={disabledButtons} variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/work-absenteeism/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default WorkAbsenteeism;