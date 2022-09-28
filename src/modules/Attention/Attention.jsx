import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { InsertAttention } from 'api/clients/AttentionClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostAttention } from 'formatdata/AttentionForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import Chip from '@mui/material/Chip';
import { GetAllUser } from 'api/clients/UserClient';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const validationSchema = yup.object().shape({
    sede: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Attention = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [documento, setDocumento] = useState('');
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [atencion, setAtencion] = useState('');
    const [motivo, setMotivo] = useState('');
    const [documentoSolicita, setDocumentoSolicita] = useState('');
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [imc, setIMC] = useState('');
    const [clasificacion, setClasificacion] = useState('CLASIFICACIÓN');
    const [clasificacionColor, setClasificacionColor] = useState('info');

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsCodigoTipo, setLsCodigoTipo] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsSede, setLsSede] = useState([]);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [lsMotivoPAD, setLsMotivoPAD] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsMotivoMedica, setLsMotivoMedica] = useState([]);
    const [lsMotivoPsico, setLsMotivoPsico] = useState([]);
    const [lsMedicos, setLsMedicos] = useState([]);
    const [result, setResult] = useState([]);

    const methods = useForm(
        { resolver: yupResolver(validationSchema) }
    );

    const { handleSubmit, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
                var resultSede = lsServerSede.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsSede(resultSede);

                const lsServerMedicos = await GetAllUser(0, 0);
                var resultMedico = lsServerMedicos.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsMedicos(resultMedico);

                const lsServerTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Turno);
                var resultTurno = lsServerTurno.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTurno(resultTurno);

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

                const lsServerMotivoPAD = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MOTIVO);
                var resultMotivoPAD = lsServerMotivoPAD.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsMotivoPAD(resultMotivoPAD);

            } catch (error) {
                setOpenError(true);
                setErrorMessage(`${error}`);
            }
        }

        GetAll();
    }, []);

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

    const handleDocumentoSolicita = async (event) => {
        try {
            setDocumentoSolicita(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setNombreSolicitante(lsServerEmployee.data.nombres);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
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
                setClasificacion("BAJO DE PESO")
                setClasificacionColor("info");
            } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                setClasificacion("NORMAL")
                setClasificacionColor("success");
            } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                setClasificacion("SOBREPESO")
                setClasificacionColor("warning");
            } else if (imcFinal >= 30 && imcFinal <= 34.9) {
                setClasificacion("OBESIDAD GRADO I")
                setClasificacionColor("error");
            } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                setClasificacion("OBESIDAD GRADO II")
                setClasificacionColor("error");
            } else if (imcFinal > 40) {
                setClasificacion("OBESIDAD GRADO III")
                setClasificacionColor("error");
            }
        } catch (error) { }
    }

    const handleChangePeso = (event) => {
        try {
            setPeso(event.target.value);

            var imcFinal = event.target.value / Math.pow(talla, 2);
            setIMC(imcFinal.toFixed(1));

            if (imcFinal < 18.4) {
                setClasificacion("BAJO DE PESO")
                setClasificacionColor("info");
            } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                setClasificacion("NORMAL")
                setClasificacionColor("success");
            } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                setClasificacion("SOBREPESO")
                setClasificacionColor("warning");
            } else if (imcFinal >= 30 && imcFinal <= 34.9) {
                setClasificacion("OBESIDAD GRADO I")
                setClasificacionColor("error");
            } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                setClasificacion("OBESIDAD GRADO II")
                setClasificacionColor("error");
            } else if (imcFinal > 40) {
                setClasificacion("OBESIDAD GRADO III")
                setClasificacionColor("error");
            }
        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {
            const motivoFinal = motivo == '' ? datos.motivo : motivo;

            const DataToInsert = PostAttention(documento, FormatDate(datos.fecha), datos.sede, tipoAtencion, atencion, datos.estadoCaso, datos.observaciones, 0,
                "PENDIENTE POR ATENCIÓN", DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                motivoFinal, datos.medico, documentoSolicita, talla, peso, imc, '', FormatDate(new Date()), FormatDate(new Date()), 0,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (documento !== '' && lsEmployee.length !== 0) {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertAttention(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setDocumento('');
                        setTipoAtencion('');
                        setAtencion('');
                        setLsEmployee([]);
                        reset();
                        setResult(result.data)
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage(`${Message.ErrorDocumento}`);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

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
                        title="REGISTRAR ATENCIÓN"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
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
                                        bug={errors.sede}
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

                            {tipoAtencion === DefaultValue.TIP_AT_TRIAGE ?
                                <Fragment>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="estadoCaso"
                                                label="Estado Caso"
                                                options={lsEstadoCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Fragment> : tipoAtencion === DefaultValue.TIP_AT_ENFERME && atencion === DefaultValue.AT_ENFERMERIA ?
                                    <Fragment>
                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="estadoCaso"
                                                    label="Estado Caso"
                                                    options={lsEstadoCaso}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Fragment> : tipoAtencion === DefaultValue.TIP_AT_ENFERME && atencion === DefaultValue.AT_PAD ?
                                        <Fragment>
                                            <Grid item xs={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="turno"
                                                        label="Turno"
                                                        defaultValue=""
                                                        options={lsTurno}
                                                        size={matchesXS ? 'small' : 'medium'}
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

                                            {motivo === DefaultValue.PAD_MOTIVO_SOSPECHA ?
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

                                        </Fragment> : tipoAtencion === DefaultValue.TIP_AT_EMO ?
                                            <Fragment>
                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        type="number"
                                                        label="Peso(Kilos)"
                                                        onChange={handleChangePeso}
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
                                                        disabled
                                                        type="number"
                                                        label="IMC"
                                                        onChange={(e) => setIMC(e.target.value)}
                                                        value={imc}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <Chip
                                                        size="medium"
                                                        label={clasificacion}
                                                        color={clasificacionColor}
                                                        sx={{ fontSize: '20px', width: '300px', height: '50px' }}
                                                    />
                                                </Grid>
                                            </Fragment> : tipoAtencion === DefaultValue.TIP_AT_ASESORIA && atencion === DefaultValue.AT_PSICO ?
                                                <Fragment>
                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="estadoCaso"
                                                                label="Estado Caso"
                                                                options={lsEstadoCaso}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </FormProvider>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="motivo"
                                                                label="Motivo"
                                                                defaultValue=""
                                                                options={lsMotivoPsico}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </FormProvider>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="medico"
                                                                label="Médico"
                                                                defaultValue=""
                                                                options={lsMedicos}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </FormProvider>
                                                    </Grid>
                                                </Fragment> : tipoAtencion === DefaultValue.TIP_AT_ASESORIA && atencion === DefaultValue.AT_ASESORIA_MEDICA ?
                                                    <Fragment>
                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="motivo"
                                                                    label="Motivo"
                                                                    defaultValue=""
                                                                    options={lsMotivoMedica}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="medico"
                                                                    label="Médico"
                                                                    defaultValue=""
                                                                    options={lsMedicos}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Fragment> : tipoAtencion === DefaultValue.TIP_AT_ASESORIA && (atencion !== DefaultValue.AT_ASESORIA_MEDICA || atencion !== DefaultValue.AT_PSICO) ?
                                                        <Fragment>
                                                            <Grid item xs={3}>
                                                                <FormProvider {...methods}>
                                                                    <InputSelect
                                                                        name="estadoCaso"
                                                                        label="Estado Caso"
                                                                        options={lsEstadoCaso}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                        </Fragment> : <></>
                            }

                            <Grid item xs={12}>
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
                            </Grid>
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
                                        <Button variant="contained" onClick={() => navigate("/programming/list")} fullWidth>
                                            {TitleButton.Programacion}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                {result.length !== 0 ?
                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={() => navigate(`/attention/report/${result.id}`)} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid> : null}

                                <Grid item xs={2}>
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