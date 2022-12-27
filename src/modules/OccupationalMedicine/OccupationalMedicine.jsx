import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { GetAllBySegAfectado, GetAllBySegAgrupado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import { FormatDate } from 'components/helpers/Format';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOccupationalMedicine } from 'formatdata/OccupationalMedicineForm';
import SubCard from 'ui-component/cards/SubCard';
import UploadIcon from '@mui/icons-material/Upload';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { InsertOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';

const OccupationalMedicine = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [filePdf, setFilePdf] = useState(null);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsResumenCaso, setLsResumenCaso] = useState([]);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsLateralidad, setLsLateralidad] = useState([]);
    const [lsEntidadMotiEnvio, setLsEntidadMotiEnvio] = useState([]);
    const [lsEntidadDondeEnvia, setLsEntidadDondeEnvia] = useState([]);
    const [lsInvestigado, setLsInvestigado] = useState([]);
    const [lsOrigenEPS, setLsOrigenEPS] = useState([]);
    const [lsOrigenARL, setLsOrigenARL] = useState([]);
    const [lsJuntaCalificadaJRC, setLsJuntaCalificadaJRC] = useState([]);
    const [lsInstanciaOrigen, setLsInstanciaOrigen] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [documento, setDocumento] = useState('');
    const [textDiagnistico, setTextDiagnostico] = useState('');
    const [lsDiagnistico, setLsDiagnistico] = useState([]);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    async function getAll() {
        try {
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerRegion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_REGION);
            var resultRegion = lsServerRegion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRegion(resultRegion);

            const lsServerJuntaCalificadaJRC = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultJuntaCalificadaJRC = lsServerJuntaCalificadaJRC.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsJuntaCalificadaJRC(resultJuntaCalificadaJRC);

            const lsServerInvestigado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultInvestigado = lsServerInvestigado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInvestigado(resultInvestigado);

            const lsServerEntidadDondeEnvia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ENDON_EN);
            var resultEntidadDondeEnvia = lsServerEntidadDondeEnvia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEntidadDondeEnvia(resultEntidadDondeEnvia);

            const lsServerResumenCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_RECASO);
            var resultResumenCaso = lsServerResumenCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResumenCaso(resultResumenCaso);

            const lsServerOrigenEPS = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ORIGEN_EPS);
            var resultOrigenEPS = lsServerOrigenEPS.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrigenEPS(resultOrigenEPS);

            const lsServerOrigenARL = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ORI_CA_ARL);
            var resultOrigenARL = lsServerOrigenARL.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOrigenARL(resultOrigenARL);

            const lsServerInstanciaOrigen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_INS_ORIGEN);
            var resultInstanciaOrigen = lsServerInstanciaOrigen.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInstanciaOrigen(resultInstanciaOrigen);

            const lsServerLateralidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_LATERA);
            var resultLateralidad = lsServerLateralidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsLateralidad(resultLateralidad);

            const lsServerEntidadMotiEnvio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_ENMO_EN);
            var resultEntidadMotiEnvio = lsServerEntidadMotiEnvio.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEntidadMotiEnvio(resultEntidadMotiEnvio);
        } catch (error) { }
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

    const handleChangeSegAgrupado = async (event) => {
        try {
            setLsSegmentoAfectado([]); setLsSubsegmento([]); setSegmentoAfectado(''); setSegmentoAgrupado('');

            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAfectado(resultSegAfectado);
        } catch (error) {
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setLsSubsegmento([]);
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSubsegmento(resultSubsegmento);
        } catch (error) {
            setLsSubsegmento([]);
        }
    }

    const handleDiagnostico = async (event) => {
        try {
            setTextDiagnostico(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDiagnistico(resultCie11);
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

    const allowedFiles = ['application/pdf'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFilePdf(e.target.result);
                }
            }
            else {
                setFilePdf('');
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostOccupationalMedicine(documento, datos.resumenCaso, FormatDate(datos.fechaRetiro), segmentoAgrupado, segmentoAfectado, datos.subsegmento,
                datos.codDx, datos.nroFurel, datos.regionInfoLaboral, datos.lateralidad, datos.entidadQueMotivaEnvio, datos.entidadDondeEnvia, FormatDate(datos.fechaEntrega),
                FormatDate(datos.fechaEnvio), datos.investigado, datos.observaciones, FormatDate(datos.fechaCalificacionEps), datos.origenEps, datos.noSolicitudARL,
                FormatDate(datos.fechaCalifiOrigenARL), datos.origenARL, FormatDate(datos.fechaCalificacionPclARL), datos.pclARL, FormatDate(datos.fechaEstructuraARL),
                FormatDate(datos.fechaRecalificacionPclARL), datos.pclRecalificadaARL, FormatDate(datos.fechaEstructuraRecalificadaARL), FormatDate(datos.fechaCalificaOrigenJRC),
                datos.juntaCalifica, datos.noDictamenJRC, datos.origenJRC, datos.controversia, datos.conclusion, FormatDate(datos.fechaCalificacionPclJRC), datos.noDictamenPclJRC,
                datos.pclJRC, FormatDate(datos.fechaEstructuraPclJRC), datos.noActaRecursoJRC, FormatDate(datos.fechaRecalificacionPclJRC), datos.noDictamenRecalificacionJRC,
                datos.juntaReCalificacionJRC, datos.pclRecalificadaJRC, FormatDate(datos.fechaRecalificacionEstJRC), FormatDate(datos.fechaCalificaOrigenJNC),
                datos.noDictamenJNC, datos.origenJNC, FormatDate(datos.fechaCalificacionPclJNC), datos.noDictamenPclJNC, datos.pclJNC, FormatDate(datos.fechaEstructuraJNC),
                FormatDate(datos.fechaRecalificacionPclJNC), datos.noDictamenRecalificacionJNC, datos.pclRecalificacionJNC, datos.origenInstaFinal,
                FormatDate(datos.fechaEstructuracionOrigenInstaFinal), datos.instanciaOrigenInstaFinal, datos.pclFinalInstaFinal, datos.instanciaFinal,
                FormatDate(datos.fechaCalificacionPclInstFinal), FormatDate(datos.fechaEstructuracionPclInstFinal), datos.indemnizado, FormatDate(datos.fechaPagoInstaFinal),
                datos.entregadoMin, datos.indemnizadoRecalificado, FormatDate(datos.fechaPagoRecalificadoInstaFinal), datos.estadoRHT, datos.reintegro, datos.reubicado,
                datos.restringido, datos.jornadaLaboral, datos.indemnizacion, lsEmployee.sede, user.nameuser, user.nameuser, FormatDate(new Date()), FormatDate(new Date()),
                FormatDate(new Date()), FormatDate(new Date()), "edadCalificado", "antiguedadCalificado", filePdf);

            if (Object.keys(datos.length !== 0)) {

                const result = await InsertOccupationalMedicine(DataToInsert);

                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                    setFilePdf(null);
                    setLsSegmentoAfectado([]);
                    setLsSubsegmento([]);
                    setSegmentoAgrupado('');
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

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="REGISTRAR MEDICINA LABORAL"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">INFORMACIÓN LABORAL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="resumenCaso"
                                        label="Resumen Caso"
                                        options={lsResumenCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Retiro"
                                        name="fechaRetiro"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="segmentoAgrupado"
                                    label="Segmento Agrupado"
                                    onChange={handleChangeSegAgrupado}
                                    value={segmentoAgrupado}
                                    options={lsSegmentoAgrupado}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="segmentoAfectado"
                                    label="Segmento Afectado"
                                    onChange={handleChangeSegAfectado}
                                    value={segmentoAfectado}
                                    options={lsSegmentoAfectado}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="subsegmento"
                                        label="Subsegmento"
                                        options={lsSubsegmento}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <InputOnChange
                                    label="Código de Diagnóstico"
                                    onKeyDown={handleDiagnostico}
                                    onChange={(e) => setTextDiagnostico(e?.target.value)}
                                    value={textDiagnistico}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="codDx"
                                        label="Diagnóstico"
                                        defaultValue=""
                                        options={lsDiagnistico}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="nroFurel"
                                        label="No. FUREL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="regionInfoLaboral"
                                        label="Región"
                                        options={lsRegion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="lateralidad"
                                        label="Lateralidad"
                                        options={lsLateralidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entidadQueMotivaEnvio"
                                        label="Entidad que motiva el envio"
                                        options={lsEntidadMotiEnvio}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entidadDondeEnvia"
                                        label="Entidad Donde Envía"
                                        options={lsEntidadDondeEnvia}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Entrega"
                                        name="fechaEntrega"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Envío"
                                        name="fechaEnvio"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="investigado"
                                        label="Investigado"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="observaciones"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">CALIFICACIÓN EPS</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Calificación"
                                        name="fechaCalificacionEps"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenEps"
                                        label="Orígenes"
                                        options={lsOrigenEPS}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">CALIFICACIÓN ARL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noSolicitudARL"
                                        label="Nro. Solicitud"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalifiOrigenARL"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenARL"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación PCL"
                                        name="fechaCalificacionPclARL"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclARL"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraARL"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha ReCalificación PCL"
                                        name="fechaRecalificacionPclARL"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclRecalificadaARL"
                                        label="% PCL Recalificada"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraRecalificadaARL"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">JRC</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalificaOrigenJRC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="juntaCalifica"
                                        label="Junta Califica"
                                        options={lsJuntaCalificadaJRC}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenJRC"
                                        label="Nro. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenJRC"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="controversia"
                                        label="Controversia"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="conclusion"
                                        label="Conclusión"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación PCL"
                                        name="fechaCalificacionPclJRC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenPclJRC"
                                        label="Nro. Dictamen PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclJRC"
                                        label="PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraPclJRC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noActaRecursoJRC"
                                        label="Nro. Acta Recurso"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha ReCalificación PCL"
                                        name="fechaRecalificacionPclJRC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="noDictamenRecalificacionJRC"
                                        label="No Dictamen Recalificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="juntaReCalificacionJRC"
                                        label="Junta Recalificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclRecalificadaJRC"
                                        label="% PCL Recalificada"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Recalificación Est."
                                        name="fechaRecalificacionEstJRC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">JNC</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalificaOrigenJNC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenJNC"
                                        label="Nro. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenJNC"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaCalificacionPclJNC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenPclJNC"
                                        label="No. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclJNC"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructura"
                                        name="fechaEstructuraJNC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación Origen"
                                        name="fechaRecalificacionPclJNC"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenRecalificacionJNC"
                                        label="No. Dictamen"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclRecalificacionJNC"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">INSTANCIA FINAL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenInstaFinal"
                                        label="Origen"
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructuración Origen"
                                        name="fechaEstructuracionOrigenInstaFinal"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="instanciaOrigenInstaFinal"
                                        label="Instancia Origen"
                                        options={lsInstanciaOrigen}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="pclFinalInstaFinal"
                                        label="% PCL Final"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        fullWidth
                                        name="instanciaFinal"
                                        label="Instancia Final"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Calificación PCL"
                                        name="fechaCalificacionPclInstFinal"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Estructuracion PCL"
                                        name="fechaEstructuracionPclInstFinal"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="indemnizado"
                                        label="Indemnizado"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Pago"
                                        name="fechaPagoInstaFinal"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entregadoMin"
                                        label="Entregado al MIN"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="indemnizadoRecalificado"
                                        label="Indemnizado Recalificado"
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Pago"
                                        name="fechaPagoRecalificadoInstaFinal"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">ESTADO ARL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="estadoRHT"
                                        label="Estado RHT"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="reintegro"
                                        label="Reintegro"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="reubicado"
                                        label="Reubicado"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="restringido"
                                        label="Restringido"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="jornadaLaboral"
                                        label="Jornada Laboral"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="indemnizacion"
                                        label="Indemnización"
                                        size={matchesXS ? 'small' : 'medium'}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">RESULTADO INVESTIGACIÓN LABORAL</Typography>}>
                        <Grid container spacing={12}>
                            <Grid textAlign="center" item xs={12}>
                                <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                    SUBIR RESULTADO EN PDF
                                    <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            {filePdf && (
                                <object type="application/pdf"
                                    data={filePdf}
                                    width="1180"
                                    height="500"
                                />
                            )}
                        </Grid>

                        <Grid item sx={{ pt: 4 }} xs={12}>
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/occupationalmedicine/list")}>
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

export default OccupationalMedicine;