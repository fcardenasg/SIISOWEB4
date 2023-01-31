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
import { InsertWorkAbsenteeism } from 'api/clients/WorkAbsenteeismClient';
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
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Accordion from 'components/accordion/Accordion';

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

    const [tipoSoporte, setTipoSoporte] = useState('');
    const [diasSinLaborar, setDiasSinLaborar] = useState('');
    const [departa, setDeparta] = useState('');
    const [lsDeparta, setLsDeparta] = useState([]);
    const [departamentoIPS, setDepartaMedico] = useState('');
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

    const [fechaExpedicion, setFechaExpedicion] = useState(new Date());
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechaModifica, setFechaModifica] = useState(new Date());

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;
    /* { resolver: yupResolver(validationSchema) } */

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
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
                value: item.id,
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
        } catch (error) {

        }
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

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostWorkAbsenteeism(documento, datos.incapacidad, datos.nroIncapacidad, FormatDate(fechaExpedicion), departa,
                datos.ciudadExpedicion, datos.tipoIncapacidad, datos.contingencia, FormatDate(fechaInicio), FormatDate(fechaFin), diasSinLaborar,
                textoDx, datos.dxFinal, datos.estadoCaso, datos.segmentoAgrupado, 1, datos.subsegmento, datos.idTipoSoporte, datos.idCategoria,

                datos.proveedor, departamentoIPS, datos.ciudadIPS, datos.nombreProfesional, datos.especialidad, datos.registroProfesional, datos.tipoAtencion,
                datos.cumplimientoRequisito, datos.expideInCapacidad, datos.observacionCumplimiento,

                datos.observacion, '', FormatDate(fechaModifica), user.nameuser, FormatDate(new Date()), lsEmployee.tipoContrato, lsEmployee.type,
                FormatDate(new Date()), user.nameuser);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertWorkAbsenteeism(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                } else {
                    setErrorMessage(Message.RegistroNoGuardado);
                    setOpenError(true);
                }
            }
        } catch (error) {
            setErrorMessage(Message.RegistroNoGuardado);
            setOpenError(true);
        }
    };

    const dias = 200;

    return (
        <Fragment>
            <MessageSuccess onClose={() => setOpenSuccess(false)} open={openSuccess} />
            <MessageError onClose={() => setOpenError(false)} open={openError} error={errorMessage} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="REGISTRAR AUSENTISMO LABORAL"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DE LA EMPRESA QUE EXPIDE</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="incapacidad"
                                        label="Incapacidad"
                                        defaultValue=""
                                        options={lsIncapacidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
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
                                    onChange={(e) => setFechaExpedicion(e)}
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
                                        defaultValue=""
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
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DE INCAPACIDAD O LICENCIA</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="tipoIncapacidad"
                                        label="Tipo de Incapacidad"
                                        defaultValue=""
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
                                        defaultValue=""
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
                                    onChange={(e) => {
                                        setFechaInicio(e);
                                        if (fechaFin) {
                                            var result = NumeroDias(e, fechaFin);
                                            setDiasSinLaborar(result);
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputDatePick
                                    label="Fecha Fin"
                                    value={fechaFin}
                                    onChange={(e) => {
                                        setFechaFin(e);
                                        if (fechaInicio) {
                                            var result = NumeroDias(fechaInicio, e);
                                            setDiasSinLaborar(result);
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <InputOnChange
                                    defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
                                        options={lsEstadoCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="segmentoAgrupado"
                                        label="Segmento Agrupado"
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DEL MÉDICO O IPS PRESTADORA DEL SERVICIO</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4.8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
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
                                        defaultValue=""
                                        options={lsMunicipioMedico}
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
                                        options={lsCumplimientoRequisito}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="expideInCapacidad"
                                        label="Red que expide"
                                        defaultValue=""
                                        options={lsRedExpide}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
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
                    <SubCard darkTitle title={<Typography variant="h4">OBSERVACIÓN/DESCRIPCIÓN DE LA NOVEDAD</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
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
                                        defaultValue=""
                                        fullWidth
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
                                    onChange={(e) => setFechaModifica(e)}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">MONITOR DE EVENTOS</Typography>}>
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
                                    primary="TOTAL DÍAS ACUMULADO EN INCAPACIDAD"
                                    secondary="0"
                                    iconPrimary={AccountCircleTwoTone}
                                    color={dias <= 90 ? theme.palette.warning.main : dias <= 180 ? theme.palette.warning.dark : theme.palette.error.main}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Accordion title={<><HistoryIcon />
                                <Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">HISTORI</Typography></>}>

                            </Accordion>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
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