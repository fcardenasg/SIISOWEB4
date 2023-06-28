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

import { MessageUpdate, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdAttention, UpdateAttentions } from 'api/clients/AttentionClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutAttention } from 'formatdata/AttentionForm';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import Chip from '@mui/material/Chip';
import Cargando from 'components/loading/Cargando';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReport } from './ReportAtten';
import ViewPDF from 'components/components/ViewPDF';

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
    const [motivo, setMotivo] = useState(undefined);
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
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsMotivoMedica, setLsMotivoMedica] = useState([]);
    const [lsMotivoPsico, setLsMotivoPsico] = useState([]);
    const [lsMedicos, setLsMedicos] = useState([]);

    const [lsDataAtencion, setLsDataAtencion] = useState([]);
    const [lsPsicologia, setLsPsicologia] = useState([]);
    const [sede, setSede] = useState(undefined);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm();

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerMedicos = await GetAllUser(0, 0);
            var resultPsicologia = lsServerMedicos.data.entities.filter(user => user.idRol === DefaultValue.ROL_PSICOLOGIA)
                .map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
            setLsPsicologia(resultPsicologia);

            var resultMedico = lsServerMedicos.data.entities.filter(user => user.idRol === DefaultValue.ROL_MEDICO)
                .map((item) => ({
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

        } catch (error) { }
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
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleChangeTipo = async (event) => {
        try {
            setAtencion('');
            setTipoAtencion(event.target.value);

            if (sede === DefaultValue.SEDE_PUERTO && event.target.value === DefaultValue.TIPO_ATENCION_ENFERMERIA) {

                var resultMapsTipoAM = [];
                var resultMapsTipoAE = [];
                /* AQUÍ SE CARGAN LAS ATENCIONES MÉDICAS */
                var lsGetTipoAtencionMedica = await GetAllBySubTipoCatalogo(0, 0, 'SER01', 5);

                if (lsGetTipoAtencionMedica.status === 200) {
                    resultMapsTipoAM = lsGetTipoAtencionMedica.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                }

                /* AQUÍ SE CARGAN LAS ATENCIONES DE ENFERMERIA */
                var lsResulCode = String(lsCodigoTipo.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));

                var lsGetTipoAtencionEnfermeria = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipoAtencionEnfermeria.status === 200) {
                    resultMapsTipoAE = lsGetTipoAtencionEnfermeria.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                }

                const arrayAtencion = resultMapsTipoAE.concat(resultMapsTipoAM);
                setLsAtencion(arrayAtencion);

            } else {
                var lsResulCode = String(lsCodigoTipo.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));

                var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipo.status === 200) {
                    var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));

                    setLsAtencion(resultMapsTipo);
                }
            }
        } catch (error) { }
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
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200)
                setLsEmployee(lsServerEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    async function getArrayAttention(sede, tipo, lsCodigoTipo = []) {
        try {
            if (sede === DefaultValue.SEDE_PUERTO && tipo === DefaultValue.TIPO_ATENCION_ENFERMERIA) {

                var resultMapsTipoAM = [];
                var resultMapsTipoAE = [];
                /* AQUÍ SE CARGAN LAS ATENCIONES MÉDICAS */
                var lsGetTipoAtencionMedica = await GetAllBySubTipoCatalogo(0, 0, 'SER01', 5);

                if (lsGetTipoAtencionMedica.status === 200) {
                    resultMapsTipoAM = lsGetTipoAtencionMedica.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                }

                /* AQUÍ SE CARGAN LAS ATENCIONES DE ENFERMERIA */
                var lsResulCode = String(lsCodigoTipo.filter(code => code.idCatalogo === tipo).map(code => code.codigo));

                var lsGetTipoAtencionEnfermeria = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipoAtencionEnfermeria.status === 200) {
                    resultMapsTipoAE = lsGetTipoAtencionEnfermeria.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                }

                const arrayAtencion = resultMapsTipoAE.concat(resultMapsTipoAM);
                setLsAtencion(arrayAtencion);

            } else {
                var lsResulCode = String(lsCodigoTipo.filter(code => code.idCatalogo === tipo).map(code => code.codigo));

                var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);
                if (lsGetTipo.status === 200) {
                    var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));

                    setLsAtencion(resultMapsTipo);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        async function getData() {
            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAtencion);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);
            setLsCodigoTipo(lsServerTipoAtencion.data.entities);

            const lsServerUpdate = await GetByIdAttention(id);
            if (lsServerUpdate.status === 200) {
                const event = {
                    target: { value: lsServerUpdate.data.documento }
                }
                handleLoadingDocument(event);

                setDocumento(lsServerUpdate.data.documento);
                setLsDataAtencion(lsServerUpdate.data);
                setTipoAtencion(lsServerUpdate.data.tipo);
                setAtencion(lsServerUpdate.data.atencion);
                setMotivo(lsServerUpdate.data.motivo);
                setSede(lsServerUpdate.data.sede);

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

                getArrayAttention(lsServerUpdate.data.sede, lsServerUpdate.data.tipo, lsServerTipoAtencion.data.entities);
            }
        }

        getData();
    }, []);

    const handleChangeSede = async (event) => {
        try {
            setSede(event.target.value);

            if (sede === DefaultValue.SEDE_PUERTO) {
                setTipoAtencion('');
                setAtencion('');
                setLsAtencion([]);
            } else {
                setAtencion('');
                setTipoAtencion('');
                setLsAtencion([]);
            }

        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {
            const motivoFinal = motivo === undefined ? datos.motivo : motivo;

            const DataToInsert = PutAttention(id, documento, FormatDate(datos.fecha), sede, tipoAtencion, atencion, datos.estadoCaso, undefined,
                lsDataAtencion.numeroHistoria, "PENDIENTE POR ATENCIÓN", undefined, undefined, undefined, motivoFinal, datos.medico, documentoSolicita,
                talla, peso, imc, lsDataAtencion.usuarioCierreAtencion, lsDataAtencion.fechaDigitacion, lsDataAtencion.fechaCierreAtencion,
                lsDataAtencion.duracion, lsDataAtencion.usuarioRegistro, undefined, user.nameuser, undefined);

            const result = await UpdateAttentions(DataToInsert);
            if (result.status === 200) {
                setOpenUpdate(true);
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
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
                title={Message.VistaReporte}
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
                            title="Actualizar Registro De Atención"
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
                                            defaultValue={FormatDate(lsDataAtencion.fecha)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <SelectOnChange
                                        name="sede"
                                        label="Sede de Atención"
                                        value={sede}
                                        options={lsSede}
                                        onChange={handleChangeSede}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
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
                                            setMotivo(undefined);
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
                                                    defaultValue={lsDataAtencion.estadoCaso === DefaultValue.SINREGISTRO_GLOBAL ?
                                                        DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO : lsDataAtencion.estadoCaso}
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
                                                        defaultValue={lsDataAtencion.estadoCaso === DefaultValue.SINREGISTRO_GLOBAL ?
                                                            DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO : lsDataAtencion.estadoCaso}
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
                                                    </Fragment> : null}

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
                                                                    label="Psicología"
                                                                    defaultValue={lsDataAtencion.medico}
                                                                    options={lsPsicologia}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors.medico}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && atencion == DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA ?
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
                                                        </Fragment> : tipoAtencion == DefaultValue.TIP_AT_ASESORIA && (atencion != DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA || atencion != DefaultValue.AT_PSICO) ?
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
                                                            </Fragment> : null
                                }
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