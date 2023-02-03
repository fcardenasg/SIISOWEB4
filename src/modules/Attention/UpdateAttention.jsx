import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MessageUpdate, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdAttention, UpdateAttentions } from 'api/clients/AttentionClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutAttention } from 'formatdata/AttentionForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import Chip from '@mui/material/Chip';
import Cargando from 'components/loading/Cargando';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReport } from './ReportAtten';
import ViewPDF from 'components/components/ViewPDF';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateAttention = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [openUpdate, setOpenUpdate] = useState(false);
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
    const [clasificacion, setClasificacion] = useState('Clasificación');
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

    const [lsDataAtencion, setLsDataAtencion] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm();

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAtencion);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);
            setLsCodigoTipo(lsServerTipoAtencion.data.entities);

            const lsServerUpdate = await GetByIdAttention(id);
            if (lsServerUpdate.status === 200) {
                setDocumento(lsServerUpdate.data.documento);
                handleLoadingDocument(lsServerUpdate.data.documento);
                setLsDataAtencion(lsServerUpdate.data);
                setTipoAtencion(lsServerUpdate.data.tipo);
                setAtencion(lsServerUpdate.data.atencion);
                setMotivo(lsServerUpdate.data.motivo);

                setTalla(lsServerUpdate.data.talla);
                setIMC(lsServerUpdate.data.imc);
                setPeso(lsServerUpdate.data.peso);

                setPeso(lsServerUpdate.data.peso);

                var imcFinal = lsServerUpdate.data.peso / Math.pow(lsServerUpdate.data.talla, 2);
                setIMC(imcFinal.toFixed(1));

                if (imcFinal < 18.4) {
                    setClasificacion("Bajo de Peso"); setClasificacionColor("info");
                } else if (imcFinal >= 18.5 && imcFinal <= 24.9) {
                    setClasificacion("Normal"); setClasificacionColor("success");
                } else if (imcFinal >= 25 && imcFinal <= 29.9) {
                    setClasificacion("Sobrepeso"); setClasificacionColor("warning");
                } else if (imcFinal >= 30 && imcFinal <= 34.9) {
                    setClasificacion("Obesidad Grado I"); setClasificacionColor("error");
                } else if (imcFinal >= 35 && imcFinal <= 39.9) {
                    setClasificacion("Obesidad Grado II"); setClasificacionColor("error");
                } else if (imcFinal > 40) {
                    setClasificacion("Obesidad Grado III"); setClasificacionColor("error");
                }

                var lsResulCode = String(lsServerTipoAtencion.data.entities
                    .filter(code => code.idCatalogo === lsServerUpdate.data.tipo).map(code => code.codigo));

                var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipo.status === 200) {
                    var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));

                    setLsAtencion(resultMapsTipo);
                }
            }

            const lsServerMedicos = await GetAllUser(0, 0);
            var resultMedico = lsServerMedicos.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsMedicos(resultMedico);

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
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAttention(id);
            const lsDataUser = await GetByMail(user.email);
            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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

    const handleChangePeso = (event) => {
        try {
            setPeso(event.target.value);

            var imcFinal = event.target.value / Math.pow(talla, 2);
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

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200)
                setLsEmployee(lsServerEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const motivoFinal = motivo === '' ? datos.motivo : motivo;

            const DataToInsert = PutAttention(id, documento, FormatDate(datos.fecha), datos.sede, tipoAtencion, atencion, datos.estadoCaso, datos.observaciones, 0,
                "PENDIENTE POR ATENCIÓN", DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                motivoFinal, datos.medico, documentoSolicita, talla, peso, imc, '', FormatDate(new Date()), FormatDate(new Date()), 0,
                lsDataAtencion.usuarioRegistro, FormatDate(new Date()), user.nameuser, FormatDate(new Date()));

            if (documento !== '' && lsEmployee.length !== 0) {
                if (Object.keys(datos.length !== 0)) {
                    const result = await UpdateAttentions(DataToInsert);
                    if (result.status === 200) {
                        setOpenUpdate(true);
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

    setTimeout(() => {
        if (lsDataAtencion.length !== 0) {
            setTimeWait(true);
        }
    }, 2000);

    return (
        <Fragment>
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
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

            <ControlModal
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
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
                                            defaultValue={lsDataAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="sede"
                                            label="Sede de Atención"
                                            defaultValue={lsDataAtencion.sede}
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

                                {tipoAtencion == DefaultValue.TIP_AT_TRIAGE ?
                                    <Fragment>
                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="estadoCaso"
                                                    label="Estado Caso"
                                                    defaultValue={lsDataAtencion.estadoCaso}
                                                    options={lsEstadoCaso}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.estadoCaso}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ENFERME && atencion == DefaultValue.AT_ENFERMERIA ?
                                        <Fragment>
                                            <Grid item xs={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="estadoCaso"
                                                        label="Estado Caso"
                                                        defaultValue={1}
                                                        options={lsEstadoCaso}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors.estadoCaso}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ENFERME && atencion == DefaultValue.AT_PAD ?
                                            <Fragment>
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

                                            </Fragment> : tipoAtencion == DefaultValue.TIP_AT_EMO ?
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
                                                            onChange={(e) => setIMC(e?.target.value)}
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
                                                </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && atencion == DefaultValue.AT_PSICO ?
                                                    <Fragment>
                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="estadoCaso"
                                                                    label="Estado Caso"
                                                                    defaultValue={lsDataAtencion.estadoCaso}
                                                                    options={lsEstadoCaso}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors.estadoCaso}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="motivo"
                                                                    label="Motivo"
                                                                    defaultValue={lsDataAtencion.motivo}
                                                                    options={lsMotivoPsico}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors.motivo}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="medico"
                                                                    label="Médico"
                                                                    defaultValue={lsDataAtencion.medico}
                                                                    options={lsMedicos}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors.medico}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && atencion == DefaultValue.AT_ASESORIA_MEDICA ?
                                                        <Fragment>
                                                            <Grid item xs={3}>
                                                                <FormProvider {...methods}>
                                                                    <InputSelect
                                                                        name="motivo"
                                                                        label="Motivo"
                                                                        defaultValue={lsDataAtencion.motivo}
                                                                        options={lsMotivoMedica}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                        bug={errors.motivo}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>

                                                            <Grid item xs={3}>
                                                                <FormProvider {...methods}>
                                                                    <InputSelect
                                                                        name="medico"
                                                                        label="Médico"
                                                                        defaultValue={lsDataAtencion.medico}
                                                                        options={lsMedicos}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                        bug={errors.medico}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                        </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && (atencion != DefaultValue.AT_ASESORIA_MEDICA || atencion != DefaultValue.AT_PSICO) ?
                                                            <Fragment>
                                                                <Grid item xs={3}>
                                                                    <FormProvider {...methods}>
                                                                        <InputSelect
                                                                            name="estadoCaso"
                                                                            label="Estado Caso"
                                                                            defaultValue={lsDataAtencion.estadoCaso}
                                                                            options={lsEstadoCaso}
                                                                            size={matchesXS ? 'small' : 'medium'}
                                                                            bug={errors.estadoCaso}
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
                                                defaultValue={lsDataAtencion.observaciones}
                                                fullWidth
                                                name="observaciones"
                                                label="Nota"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.observaciones}
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
                                                {TitleButton.Actualizar}
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

                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleClickReport} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

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
                </Grid > : <Cargando />
            }
        </Fragment >
    );
};

export default UpdateAttention;