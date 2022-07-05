import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAttention } from 'api/clients/AttentionClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostAttention } from 'formatdata/AttentionForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const Attention = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [atencion, setAtencion] = useState('');
    const [motivo, setMotivo] = useState('');
    const [documentoSolicita, setDocumentoSolicita] = useState('');
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [imc, setIMC] = useState('');
    const [clasificacion, setClasificacion] = useState('');
    const [clasificacionColor, setClasificacionColor] = useState('');

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsCodigoTipo, setLsCodigoTipo] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsSede, setLsSede] = useState([]);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [lsMotivoPAD, setLsMotivoPAD] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsDiaTurno, setLsDiaTurno] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsMotivoMedica, setLsMotivoMedica] = useState([]);
    const [lsMotivoPsico, setLsMotivoPsico] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSede(resultSede);

            const lsServerTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Turno);
            var resultTurno = lsServerTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTurno(resultTurno);

            const lsServerDiaTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DiaTurno);
            var resultDiaTurno = lsServerDiaTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDiaTurno(resultDiaTurno);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoCaso);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoCaso(resultEstadoCaso);

            const lsServerMotivoPsico = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoPsicologia);
            var resultMotivoPsico = lsServerMotivoPsico.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivoPsico(resultMotivoPsico);

            const lsServerMotivoMedica = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoMedica);
            var resultMotivoMedica = lsServerMotivoMedica.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivoMedica(resultMotivoMedica);

            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAtencion);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);
            setLsCodigoTipo(lsServerTipoAtencion.data.entities);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerMotivoPAD = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MOTIVO);
            var resultMotivoPAD = lsServerMotivoPAD.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivoPAD(resultMotivoPAD);

        } catch (error) {
            console.log(error);
        }
    }

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
            setLsEmployee([]);
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

    const handleDocumentoSolicita = async (event) => {
        try {
            setDocumentoSolicita(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setNombreSolicitante(lsServerEmployee.data.nombres);
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

    const handleChangeTipo = async (event) => {
        try {
            setAtencion('');
            setTipoAtencion(event.target.value);

            var lsResulCode = String(lsCodigoTipo.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));

            var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
            if (lsGetTipo.status === 200) {
                var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsAtencion(resultMapsTipo);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeTalla = (event) => {
        try {
            setTalla(event.target.value);
            var talla = event.target.value;
            var imcFinal = peso / Math.pow(talla, 2);
            setIMC(imcFinal.toFixed(1));

            if (imcFinal < 18.4) {
                setClasificacion("Bajo de Peso")
                setClasificacionColor("info");
            } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                setClasificacion("Normal")
                setClasificacionColor("success");
            } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                setClasificacion("Sobrepeso")
                setClasificacionColor("warning");
            } else if (imcFinal >= 30 && imcFinal <= 34.9) {
                setClasificacion("Obesidad Grado I")
                setClasificacionColor("error");
            } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                setClasificacion("Obesidad Grado II")
                setClasificacionColor("error");
            } else if (imcFinal > 40) {
                setClasificacion("Obesidad Grado III")
                setClasificacionColor("error");
            }
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostAttention(documento, FormatDate(datos.fecha), datos.sede, tipoAtencion, atencion, datos.estadoCaso, datos.observaciones, 0,
                "PENDIENTE POR ATENCIÓN", DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.motivo, datos.medico, documentoSolicita, talla, peso, imc, '', FormatDate(new Date()), FormatDate(new Date()), 0,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAttention(DataToInsert);
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
                    setDocumento('');
                    setTipoAtencion('');
                    setAtencion('');
                    setLsEmployee([]);
                    reset();
                }
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
        <Fragment>
            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
                        <Grid container spacing={2}>
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
                                        name="sede"
                                        label="Sede de Atención"
                                        defaultValue=""
                                        options={lsSede}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="tipo"
                                    label="Tipo de Atención"
                                    value={tipoAtencion}
                                    options={lsTipoAtencion}
                                    onChange={handleChangeTipo}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="atencion"
                                    label="Atención"
                                    value={atencion}
                                    options={lsAtencion}
                                    onChange={(e) => {
                                        setAtencion(e.target.value);
                                        setMotivo('');
                                    }}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            {tipoAtencion == DefaultValue.TIP_AT_TRIAGE ?
                                <Fragment>
                                    {/* <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="contingencia"
                                                label="Contingencia"
                                                defaultValue={1}
                                                options={lsContingencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid> */}

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="estadoCaso"
                                                label="Estado Caso"
                                                defaultValue={1}
                                                options={lsEstadoCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    {/* <Grid item xs={3}>
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
                                            <InputSelect
                                                name="diaTurno"
                                                label="Día Turno"
                                                defaultValue={1}
                                                options={lsDiaTurno}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid> */}
                                </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ENFERME && atencion == DefaultValue.AT_ENFERMERIA ?
                                    <Fragment>
                                        <Grid item xs={3}>
                                            {/* <FormProvider {...methods}>
                                                <InputSelect
                                                    name="contingencia"
                                                    label="Contingencia"
                                                    defaultValue={1}
                                                    options={lsContingencia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider> */}
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="estadoCaso"
                                                    label="Estado Caso"
                                                    defaultValue={1}
                                                    options={lsEstadoCaso}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        {/* <Grid item xs={3}>
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
                                                <InputSelect
                                                    name="diaTurno"
                                                    label="Día Turno"
                                                    defaultValue={1}
                                                    options={lsDiaTurno}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid> */}
                                    </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ENFERME && atencion == DefaultValue.AT_PAD ?
                                        <Fragment>
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
                                                <SelectOnChange
                                                    name="motivo"
                                                    label="Motivo"
                                                    value={motivo}
                                                    options={lsMotivoPAD}
                                                    onChange={(e) => {
                                                        setMotivo(e.target.value);
                                                        setDocumentoSolicita('');
                                                        setNombreSolicitante('');
                                                    }}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            {motivo == DefaultValue.AT_PAD_MOTIVO ?
                                                <Fragment>
                                                    <Grid item xs={3}>
                                                        <InputOnChange
                                                            label="Documento Quien Solicita"
                                                            onKeyDown={handleDocumentoSolicita}
                                                            onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                            value={documentoSolicita}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <InputOnChange
                                                            label="Nombre Solicitante"
                                                            onChange={(e) => setNombreSolicitante(e?.target.value)}
                                                            value={nombreSolicitante}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            disabled
                                                        />
                                                    </Grid>
                                                </Fragment> : <></>}

                                        </Fragment> : tipoAtencion == DefaultValue.TIP_AT_EMO ?
                                            <Fragment>
                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        type="number"
                                                        label="Peso(Kilos)"
                                                        onChange={(e) => setPeso(e?.target.value)}
                                                        value={peso}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        type="number"
                                                        label="Talla(Metros)"
                                                        onChange={handleChangeTalla}
                                                        value={talla}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        type="number"
                                                        label="IMC"
                                                        onChange={(e) => setIMC(e?.target.value)}
                                                        value={imc}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        disabled
                                                        color={clasificacionColor}
                                                        label="Clasificación"
                                                        onChange={(e) => setClasificacion(e.target.value)}
                                                        value={clasificacion}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                            </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && atencion == DefaultValue.AT_PSICO ?
                                                <Fragment>
                                                    {/* <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="contingencia"
                                                                label="Contingencia"
                                                                defaultValue={1}
                                                                options={lsContingencia}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> */}

                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="estadoCaso"
                                                                label="Estado Caso"
                                                                defaultValue={1}
                                                                options={lsEstadoCaso}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid>

                                                    {/* <Grid item xs={3}>
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
                                                            <InputSelect
                                                                name="diaTurno"
                                                                label="Día Turno"
                                                                defaultValue={1}
                                                                options={lsDiaTurno}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> */}

                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="motivo"
                                                                label="Motivo"
                                                                defaultValue=""
                                                                options={lsMotivoPsico}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="medico"
                                                                label="Médico"
                                                                defaultValue=""
                                                                options={lsContingencia}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid>
                                                </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && atencion == DefaultValue.AT_ASESORIA_MEDICA ?
                                                    <Fragment>
                                                        {/* <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="contingencia"
                                                                    label="Contingencia"
                                                                    defaultValue={1}
                                                                    options={lsContingencia}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid> */}

                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="motivo"
                                                                    label="Motivo"
                                                                    defaultValue=""
                                                                    options={lsMotivoMedica}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="medico"
                                                                    label="Médico"
                                                                    defaultValue=""
                                                                    options={lsContingencia}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && (atencion != DefaultValue.AT_ASESORIA_MEDICA || atencion != DefaultValue.AT_PSICO) ?
                                                        <Fragment>
                                                            {/* <Grid item xs={3}>
                                                                <FormProvider {...methods}>
                                                                    <InputSelect
                                                                        name="contingencia"
                                                                        label="Contingencia"
                                                                        defaultValue={1}
                                                                        options={lsContingencia}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                        bug={errors}
                                                                    />
                                                                </FormProvider>
                                                            </Grid> */}

                                                            <Grid item xs={3}>
                                                                <FormProvider {...methods}>
                                                                    <InputSelect
                                                                        name="estadoCaso"
                                                                        label="Estado Caso"
                                                                        defaultValue={1}
                                                                        options={lsEstadoCaso}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                        bug={errors}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>

                                                            {/* <Grid item xs={3}>
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
                                                                    <InputSelect
                                                                        name="diaTurno"
                                                                        label="Día Turno"
                                                                        defaultValue={1}
                                                                        options={lsDiaTurno}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                        bug={errors}
                                                                    />
                                                                </FormProvider>
                                                            </Grid> */}
                                                        </Fragment> : <></>
                            }

                            <Grid item xs={12}>
                                <SubCard darkTitle title={<><Typography variant="h4">NOTA</Typography></>}>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                multiline
                                                rows={4}
                                                defaultValue=""
                                                fullWidth
                                                name="observaciones"
                                                label="Nota"
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
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={() => navigate("/programming/list")} fullWidth>
                                            {TitleButton.Programacion}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/attention/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default Attention;