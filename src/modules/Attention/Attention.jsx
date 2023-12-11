import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdAttention, InsertAttention } from 'api/clients/AttentionClient';
import { GetAllBySubTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostAttention } from 'formatdata/AttentionForm';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import Chip from '@mui/material/Chip';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReport } from './ReportAtten';
import ViewPDF from 'components/components/ViewPDF';

const Attention = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [peso, setPeso] = useState(undefined);
    const [talla, setTalla] = useState(undefined);
    const [imc, setIMC] = useState('');

    const [documento, setDocumento] = useState('');
    const [sede, setSede] = useState('');
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [atencion, setAtencion] = useState('');
    const [motivo, setMotivo] = useState(undefined);
    const [documentoSolicita, setDocumentoSolicita] = useState(undefined);
    const [nombreSolicitante, setNombreSolicitante] = useState(undefined);
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
    const [lsMotivoPsico, setLsMotivoPsico] = useState([]);
    const [lsMedicos, setLsMedicos] = useState([]);
    const [lsPsicologia, setLsPsicologia] = useState([]);
    const [result, setResult] = useState('');

    const methods = useForm();

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
                setLsSede(lsServerSede.data);
                setSede(user.idsede);

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

                const lsServerEstadoCaso = await GetByTipoCatalogoCombo(CodCatalogo.EstadoCaso);
                setLsEstadoCaso(lsServerEstadoCaso.data);

                const lsServerMotivoPsico = await GetByTipoCatalogoCombo(CodCatalogo.MotivoPsicologia);
                setLsMotivoPsico(lsServerMotivoPsico.data);

                const lsServerTipoAtencion = await GetByTipoCatalogoCombo(CodCatalogo.TipoAtencion);
                setLsTipoAtencion(lsServerTipoAtencion.data);
                setLsCodigoTipo(lsServerTipoAtencion.data);

                const lsServerMotivoPAD = await GetByTipoCatalogoCombo(CodCatalogo.PAD_MOTIVO);
                setLsMotivoPAD(lsServerMotivoPAD.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event.target.value !== '') {
                if (event.key === 'Enter') {
                    if (event?.target.value != "") {
                        var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                        if (lsServerEmployee.status === 200) {
                            setLsEmployee(lsServerEmployee.data);
                        }
                    } else {
                        setOpenError(true);
                        setErrorMessage(Message.ErrorDocumento);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                }
            }
        } catch (error) { setLsEmployee([]); }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAttention(result);
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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
                    setErrorMessage(Message.ErrorDocumento);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

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
                var lsResulCode = String(lsCodigoTipo.filter(code => code.value === event.target.value).map(code => code.codigo));

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
                var lsResulCode = String(lsCodigoTipo.filter(code => code.value === event.target.value).map(code => code.codigo));

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
            const motivoFinal = motivo !== null ? motivo : datos.motivoPsicologia !== undefined ? datos.motivoPsicologia : undefined;

            const DataToInsert = PostAttention(documento, FormatDate(datos.fecha), sede, tipoAtencion, atencion, datos.estadoCaso, undefined, undefined,
                "PENDIENTE POR ATENCIÓN", undefined, undefined, undefined, motivoFinal, datos.medico, documentoSolicita, talla, peso, imc, undefined,
                undefined, undefined, undefined, user.nameuser, undefined, undefined, undefined);

            if (sede === '') {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione una sede');
            } else if (tipoAtencion === '') {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione el tipo atención');
            } else if (atencion === '') {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione la atención');
            } else {
                const result = await InsertAttention(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setTipoAtencion('');
                    setAtencion('');
                    setSede('');
                    reset();
                    setResult(result.data)
                    setDocumento('');
                    setLsEmployee([]);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
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

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Atención"
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
                                        size={matchesXS ? 'small' : 'medium'}
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
                                        setMotivo(null);
                                    }}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            {tipoAtencion === DefaultValue.TIP_AT_TRIAGE ?
                                <Fragment>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO}
                                                name="estadoCaso"
                                                label="Estado Caso"
                                                options={lsEstadoCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Fragment>
                                : tipoAtencion === DefaultValue.TIP_AT_ENFERME && atencion === DefaultValue.AT_PAD ?
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

                                    </Fragment>
                                    : tipoAtencion === DefaultValue.TIP_AT_ENFERME ?
                                        <Fragment>
                                            <Grid item xs={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        defaultValue={DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO}
                                                        name="estadoCaso"
                                                        label="Estado Caso"
                                                        options={lsEstadoCaso}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Fragment>
                                        : tipoAtencion === DefaultValue.TIP_AT_EMO ?
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
                                            </Fragment>
                                            : tipoAtencion === DefaultValue.TIP_AT_ASESORIA && atencion === DefaultValue.AT_PSICO ?
                                                <Fragment>
                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                defaultValue={DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO}
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
                                                                name="motivoPsicologica"
                                                                label="Motivo"
                                                                options={lsMotivoPsico}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </FormProvider>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="medico"
                                                                label="Psicología"
                                                                options={lsPsicologia}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </FormProvider>
                                                    </Grid>
                                                </Fragment>
                                                : tipoAtencion === DefaultValue.TIP_AT_ASESORIA && atencion === DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA ?
                                                    <Fragment>
                                                        <Grid item xs={3}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="medico"
                                                                    label="Médico"
                                                                    options={lsMedicos}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                />
                                                            </FormProvider>
                                                        </Grid>
                                                    </Fragment>
                                                    : tipoAtencion === DefaultValue.TIP_AT_ASESORIA && (atencion !== DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA || atencion !== DefaultValue.AT_PSICO) ?
                                                        <Fragment>
                                                            <Grid item xs={3}>
                                                                <FormProvider {...methods}>
                                                                    <InputSelect
                                                                        defaultValue={DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO}
                                                                        name="estadoCaso"
                                                                        label="Estado Caso"
                                                                        options={lsEstadoCaso}
                                                                        size={matchesXS ? 'small' : 'medium'}
                                                                    />
                                                                </FormProvider>
                                                            </Grid>
                                                        </Fragment> : null
                            }
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 6 }}>
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

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={result === '' ? true : false} variant="contained" onClick={handleClickReport} fullWidth>
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
            </Grid >
        </Fragment >
    );
};

export default Attention;