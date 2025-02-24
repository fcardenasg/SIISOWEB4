import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import HistoryIcon from '@mui/icons-material/History';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import ViewEmployee from 'components/views/ViewEmployee';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate, NumeroDias } from 'components/helpers/Format';
import { GetAllWorkAbsenteeismNumeroDia, GetByIdWorkAbsenteeismHistory, UpdateWorkAbsenteeismHistory } from 'api/clients/WorkAbsenteeismClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import InputOnChange from 'components/input/InputOnChange';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import UserCountCard from 'ui-component/cards/UserCountCard';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import { GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';

import Accordion from 'components/accordion/Accordion';
import HistoryWorkAbsenteeism from '../HistoryWorkAbsenteeism';
import Cargando from 'components/loading/Cargando';
import useAuth from 'hooks/useAuth';
import ViewTrafficLight from 'components/components/ViewTrafficLight';

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

const ViewHistoryWA = () => {
    const theme = useTheme();
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsWorkAbsenteeism, setLsWorkAbsenteeism] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [timeWait, setTimeWait] = useState(false);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [lsSubsegmento, setLsSubsegmento] = useState([]);

    const [textoDx, setTextoDx] = useState('');
    const [lsCIE11, setLsCIE11] = useState([]);

    const [tipoSoporte, setTipoSoporte] = useState(undefined);
    const [diasSinLaborar, setDiasSinLaborar] = useState(0);
    const [numeroDias, setNumeroDias] = useState(0);
    const [departa, setDeparta] = useState(undefined);
    const [lsDeparta, setLsDeparta] = useState([]);
    const [departamentoIPS, setDepartaMedico] = useState(undefined);
    const [catalogoIncapacidad, setCatalogoIncapacidad] = useState('');
    const [municipioControl, setMunicipioControl] = useState('');
    const [municipioDatosMedico, setMunicipioDatosMedico] = useState('');
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
    const [lsMunicipioArreglo, setLsMunicipioArreglo] = useState([]);
    const [lsCatalogoDatosInca, setLsCatalogoDatosInca] = useState([]);
    const [lsCumplimientoRequisito, setLsCumplimientoRequisito] = useState([]);

    const [fechaExpedicion, setFechaExpedicion] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const methods = useForm();
    const { handleSubmit, errors } = methods;

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                setOpenError(true);
                setErrorMessage(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleChangeDepartamentoIncapa = async (event) => {
        try {
            setMunicipioControl('');
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
            setMunicipioDatosMedico('');
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
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsCIE11(lsServerCie11.data);
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
        async function getAll() {
            try {
                const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
                var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsDeparta(resultDepartamento);
                setCodigoFilterDpto(lsServerDepartamento.data.entities);

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

                const lsServerMunicipio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Municipio);
                var resultMunicipio = lsServerMunicipio.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsMunicipioArreglo(resultMunicipio);

                const lsServerCatalogoDatos = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CatalogoAusentismo);
                var resultCatalogoDatos = lsServerCatalogoDatos.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsCatalogoDatosInca(resultCatalogoDatos);

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
            } catch (error) {
                setOpenError(true);
                setErrorMessage(error.message);
            }
        }

        getAll();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                /* BUSQUEDA DE DATOS */
                const lsServerData = await GetByIdWorkAbsenteeismHistory(id);
                if (lsServerData.status === 200) {
                    setLsWorkAbsenteeism(lsServerData.data);

                    const numeroDias1 = await GetAllWorkAbsenteeismNumeroDia(lsServerData.data.cedula);
                    setNumeroDias(numeroDias1.data);

                    setDocumento(lsServerData.data.cedula);
                    const event = { target: { value: lsServerData.data.cedula } }
                    handleLoadingDocument(event);

                    setFechaInicio(FormatDate(lsServerData.data.fechaInicio));
                    setFechaFin(FormatDate(lsServerData.data.fechaFin));
                    setFechaExpedicion(FormatDate(lsServerData.data.fechaExpedicion));

                    setDiasSinLaborar(lsServerData.data.diasSinLaborar);
                    setDepartaMedico(lsServerData.data.departamentoIPS);
                    setDeparta(lsServerData.data.departamento);
                    setTipoSoporte(lsServerData.data.idTipoSoporte);

                    if (lsServerData.data.dx !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsServerData.data.dx);
                        setLsCIE11(lsServerCie11.data);
                        setTextoDx(lsServerData.data.dx);
                    }
                }
            } catch (error) {
                setOpenError(true);
                setErrorMessage(error.message);
            }
        }

        getData();
    }, []);

    setTimeout(() => {
        if (lsWorkAbsenteeism !== null)
            setTimeWait(true);
    }, 500);

    const handleClick = async (datos) => {
        try {
            const ciudadExpedicion = municipioControl == '' ? datos.ciudadExpedicion : municipioControl;
            const catalogoFormat = catalogoIncapacidad == '' ? datos.idCategoria : catalogoIncapacidad;
            const ciudadIPS = municipioDatosMedico == '' ? datos.ciudadIPS : municipioDatosMedico;

            const ausentismo = {
                id_Inc: id,
                cedula: documento,
                incapacidad: datos.incapacidad,
                nroIncapacidad: datos.nroIncapacidad,
                fechaExpedicion: fechaExpedicion,
                departamento: departa,
                ciudadExpedicion: ciudadExpedicion,
                tipoIncapacidad: datos.tipoIncapacidad,
                contingencia: datos.contingencia,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                diasSinLaborar: diasSinLaborar,
                dx: datos.dxFinal,
                dxFinal: datos.dxFinal,
                estado_Empleado: datos.estado_Empleado,
                segmentoAgrupado: datos.segmentoAgrupado,
                subsegmento: datos.subsegmento,
                idTipoSoporte: tipoSoporte,
                idCategoria: catalogoFormat,
                expideInCapacidad: datos.proveedor,
                departamentoIPS: departamentoIPS,
                ciudadIPS: ciudadIPS,
                nombreProfesional: datos.nombreProfesional,
                especialidad: datos.especialidad,
                registroProfesional: datos.registroProfesional,
                tipoAtencion: datos.tipoAtencion,
                cumplimientoRequisito: datos.cumplimientoRequisito,
                regimen: datos.regimen,
                observacionCumplimiento: datos.observacionCumplimiento,
                comentarios: datos.observacion,
                usuarioModificacion: user?.nameuser
            };

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateWorkAbsenteeismHistory(ausentismo);
                if (result.status === 200) {
                    setOpenSuccess(true);
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.RegistroNoGuardado);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageUpdate onClose={() => setOpenSuccess(false)} open={openSuccess} />
            <MessageError onClose={() => setOpenError(false)} open={openError} error={errorMessage} />

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Actualizar Ausentimo Laboral"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">{"Datos De La Empresa Que Expide"}</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="incapacidad"
                                            label="Incapacidad"
                                            defaultValue={lsWorkAbsenteeism.incapacidad}
                                            options={lsIncapacidad}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsWorkAbsenteeism.nroIncapacidad}
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

                                <Grid item xs={12} md={6} lg={4}>
                                    {lsMunicipio.length !== 0 ? (
                                        <SelectOnChange
                                            name="ciudadExpedicion"
                                            label="Ciudad de Expedición"
                                            value={municipioControl}
                                            options={lsMunicipio}
                                            onChange={(e) => setMunicipioControl(e.target.value)}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    ) : (
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="ciudadExpedicion"
                                                label="Ciudad de Expedición"
                                                defaultValue={lsWorkAbsenteeism.ciudadExpedicion}
                                                disabled
                                                options={lsMunicipioArreglo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    )}
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">{"Datos De Incapacidad O Licencia"}</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="tipoIncapacidad"
                                            label="Tipo de Incapacidad"
                                            defaultValue={lsWorkAbsenteeism.tipoIncapacidad}
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
                                            defaultValue={lsWorkAbsenteeism.contingencia}
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
                                        defaultValue={lsWorkAbsenteeism}
                                        fullWidth
                                        disabled
                                        name="diasSinLaborar"
                                        label="Días de Incapacidad"
                                        onChange={(e) => setDiasSinLaborar(e.target.event)}
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
                                            defaultValue={lsWorkAbsenteeism.dx}
                                            options={lsCIE11}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="estado_Empleado"
                                            label="Estado de Caso"
                                            defaultValue={lsWorkAbsenteeism.estado_Empleado}
                                            options={lsEstadoCaso}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={8}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="segmentoAgrupado"
                                            label="Segmento Agrupado"
                                            defaultValue={lsWorkAbsenteeism.segmentoAgrupado}
                                            options={lsSegmentoAgrupado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="subsegmento"
                                            label="Segmento"
                                            defaultValue={lsWorkAbsenteeism.subsegmento}
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

                                <Grid item xs={12} md={6} lg={4}>
                                    {lsCategoria.length !== 0 ? (
                                        <SelectOnChange
                                            name="idCategoria"
                                            label="Categoria"
                                            value={catalogoIncapacidad}
                                            options={lsCategoria}
                                            onChange={(e) => setCatalogoIncapacidad(e.target.value)}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    ) : (
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idCategoria"
                                                label="Categoria"
                                                defaultValue={lsWorkAbsenteeism.idCategoria}
                                                disabled
                                                options={lsCatalogoDatosInca}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    )}
                                </Grid>
                            </Grid >
                        </SubCard >
                    </Grid >

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">{"Datos Del Médico O IPS Prestadora Del Servicio"}</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={4.8}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsWorkAbsenteeism.expideInCapacidad}
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

                                <Grid item xs={12} md={6} lg={2.4}>
                                    {lsMunicipioMedico.length !== 0 ? (
                                        <SelectOnChange
                                            name="ciudadIPS"
                                            label="Ciudad"
                                            value={municipioDatosMedico}
                                            options={lsMunicipioMedico}
                                            onChange={(e) => setMunicipioDatosMedico(e.target.value)}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    ) : (
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="ciudadIPS"
                                                label="Ciudad"
                                                defaultValue={lsWorkAbsenteeism.ciudadIPS}
                                                disabled
                                                options={lsMunicipioArreglo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    )}
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsWorkAbsenteeism.nombreProfesional}
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
                                            defaultValue={lsWorkAbsenteeism.especialidad}
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
                                            defaultValue={lsWorkAbsenteeism.registroProfesional}
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
                                            name="tipoAtencion"
                                            label="Tipo de Atención"
                                            defaultValue={lsWorkAbsenteeism.tipoAtencion}
                                            options={lsTipoAtencion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="cumplimientoRequisito"
                                            label="Cumplimiento Requisito"
                                            defaultValue={lsWorkAbsenteeism.cumplimientoRequisito}
                                            options={lsCumplimientoRequisito}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="regimen"
                                            label="Red que expide"
                                            defaultValue={lsWorkAbsenteeism.regimen}
                                            options={lsRedExpide}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsWorkAbsenteeism.observacionCumplimiento}
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
                        <SubCard darkTitle title={<Typography variant="h4">{"Observación/Descripción De La Novedad"}</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsWorkAbsenteeism.comentarios}
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
                            </Grid >
                        </SubCard >
                    </Grid >

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">{"Monitor de eventos"}</Typography>}>
                            <ViewTrafficLight
                                title1="De 75 a 90 Días"
                                title2="De 90 a 180 Días"
                                title3="> 180 Días"
                            />

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
                                    {lsWorkAbsenteeism.idAusentismoLaboral === null &&
                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                    {TitleButton.Actualizar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    }

                                    <Grid item xs={6} md={4} lg={2}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/work-absenteeism/history")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid > : <Cargando />
            }
        </Fragment>
    );
};

export default ViewHistoryWA;