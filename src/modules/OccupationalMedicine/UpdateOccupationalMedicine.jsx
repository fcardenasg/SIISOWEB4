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

import { GetAllBySegmentoAfectado, GetAllBySubsegment, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import { FormatDate } from 'components/helpers/Format';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import UploadIcon from '@mui/icons-material/Upload';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdOccupationalMedicine, UpdateOccupationalMedicines } from 'api/clients/OccupationalMedicineClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutOccupationalMedicine } from 'formatdata/OccupationalMedicineForm';

const OccupationalMedicine = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const [timeWait, setTimeWait] = useState(false);
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
    const [lsOccupationalMedicine, setLsOccupationalMedicine] = useState([]);

    const methods = useForm();
    const { handleSubmit } = methods;

    useEffect(() => {
        async function getData() {
            try {
                const lsServerAtencion = await GetByIdOccupationalMedicine(id);
                if (lsServerAtencion.status === 200) {
                    setDocumento(lsServerAtencion.data.cedula);
                    handleLoadingDocument(lsServerAtencion.data.cedula);
                    setLsOccupationalMedicine(lsServerAtencion.data);
                    setFilePdf(lsServerAtencion.data.urlDocumento);
                    setSegmentoAgrupado(lsServerAtencion.data.segmentoAgrupado);
                    setSegmentoAfectado(lsServerAtencion.data.segmentoAfectado);
                    setLsSubsegmento(lsServerAtencion.data.subsegmento);

                    // const lsServerSegAfectado = await GetAllSegmentoAgrupado(lsServerAtencion.data.segmentoAgrupado, 0, 0);
                    // var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                    //     value: item.id,
                    //     label: item.nombre
                    // }));
                    // setLsSegmentoAfectado(resultSegAfectado);
                    // setSegmentoAfectado(lsServerAtencion.data.segmentoAfectado);

                    // const lsServerSubsegmento = await GetAllBySegmentoAfectado(lsServerAtencion.data.segmentoAfectado, 0, 0);
                    // var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                    //     value: item.id,
                    //     label: item.nombre
                    // }));
                    // setLsSubsegmento(resultSubsegmento);

                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsServerAtencion.data.codDx);
                    var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                        value: item.id,
                        label: item.dx
                    }));
                    setLsDiagnistico(resultCie11);
                    setTextDiagnostico(lsServerAtencion.data.codDx);
                }
            } catch (error) { }
        }

        getData();
    }, [id]);

    async function getAll() {
        try {
         
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerSegAfectado = await GetAllBySegmentoAfectado(0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAfectado(resultSegAfectado);

            const lsServerSubsegmento = await GetAllBySubsegment(0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSubsegmento(resultSubsegmento);

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

    // const handleChangeSegAgrupado = async (event) => {
    //     try {
    //         setLsSegmentoAfectado([]); setLsSubsegmento([]); setSegmentoAfectado(''); setSegmentoAgrupado('');

    //         setSegmentoAgrupado(event.target.value);

    //         const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
    //         var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
    //             value: item.id,
    //             label: item.nombre
    //         }));
    //         setLsSegmentoAfectado(resultSegAfectado);
    //     } catch (error) {
    //         setLsSegmentoAfectado([]);
    //     }
    // }

    // const handleChangeSegAfectado = async (event) => {
    //     try {
    //         setLsSubsegmento([]);
    //         setSegmentoAfectado(event.target.value);

    //         const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
    //         var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
    //             value: item.id,
    //             label: item.nombre
    //         }));
    //         setLsSubsegmento(resultSubsegmento);
    //     } catch (error) {
    //         setLsSubsegmento([]);
    //     }
    // }

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
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutOccupationalMedicine(id, documento, datos.resumenCaso, FormatDate(datos.fechaRetiro), datos.segmentoAgrupado, datos.segmentoAfectado, datos.subsegmento,
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

                const result = await UpdateOccupationalMedicines(DataToUpdate);

                if (result.status === 200) {
                    setOpenSuccess(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsOccupationalMedicine.length !== 0)
            setTimeWait(true);
    }, 2000);

    return (
        <Fragment>
            {timeWait ?
                <Fragment>
                    <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                title="REGISTRAR MEDICINA LABORAL"
                                disabled={true}
                                key={lsEmployee.documento}
                                documento={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">INFORMACIÓN LABORAL</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.resumenCaso}
                                                name="resumenCaso"
                                                label="Resumen Caso"
                                                options={lsResumenCaso}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Retiro"
                                                name="fechaRetiro"
                                                defaultValue={lsOccupationalMedicine.fechaRetiro}
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

                                    <Grid item xs={9}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.codDx}
                                                name="codDx"
                                                label="Diagnóstico"
                                                options={lsDiagnistico}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}> 
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.nroFurel}
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
                                                defaultValue={lsOccupationalMedicine.segmentoAgrupado}
                                                name="segmentoAgrupado"
                                                label="Segmento Agrupado"
                                                options={lsSegmentoAgrupado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.segmentoAfectado}
                                                name="segmentoAfectado"
                                                label="Segmento Afectado"
                                                options={lsSegmentoAfectado}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.subsegmento}
                                                name="subsegmento"
                                                label="Subsegmento"
                                                options={lsSubsegmento}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>


                              
                              


                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.regionInfoLaboral}
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
                                                defaultValue={lsOccupationalMedicine.lateralidad}
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
                                                defaultValue={lsOccupationalMedicine.entidadQueMotivaEnvio}
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
                                                defaultValue={lsOccupationalMedicine.entidadDondeEnvia}
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
                                                defaultValue={lsOccupationalMedicine.fechaEntrega}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha de Envío"
                                                name="fechaEnvio"
                                                defaultValue={lsOccupationalMedicine.fechaEnvio}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.investigado}
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
                                                defaultValue={lsOccupationalMedicine.observaciones}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificacionEps}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.origenEps}
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
                                                defaultValue={lsOccupationalMedicine.noSolicitudARL}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalifiOrigenARL}
                                                label="Fecha Calificación Origen"
                                                name="fechaCalifiOrigenARL"
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.origenARL}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificacionPclARL}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.pclARL}
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
                                                defaultValue={lsOccupationalMedicine.fechaEstructuraARL}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha ReCalificación PCL"
                                                name="fechaRecalificacionPclARL"
                                                defaultValue={lsOccupationalMedicine.fechaRecalificacionPclARL}
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
                                                defaultValue={lsOccupationalMedicine.pclRecalificadaARL}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructura"
                                                name="fechaEstructuraRecalificadaARL"
                                                defaultValue={lsOccupationalMedicine.fechaEstructuraRecalificadaARL}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificaOrigenJRC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.juntaCalifica}
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
                                                defaultValue={lsOccupationalMedicine.noDictamenJRC}
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
                                                defaultValue={lsOccupationalMedicine.origenJRC}
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
                                                defaultValue={lsOccupationalMedicine.controversia}
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
                                                defaultValue={lsOccupationalMedicine.conclusion}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificacionPclJRC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.noDictamenPclJRC}
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
                                                defaultValue={lsOccupationalMedicine.pclJRC}
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
                                                defaultValue={lsOccupationalMedicine.fechaEstructuraPclJRC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.noActaRecursoJRC}
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
                                                defaultValue={lsOccupationalMedicine.fechaRecalificacionPclJRC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.noDictamenRecalificacionJRC}
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
                                                defaultValue={lsOccupationalMedicine.juntaReCalificacionJRC}
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
                                                defaultValue={lsOccupationalMedicine.pclRecalificadaJRC}
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
                                                defaultValue={lsOccupationalMedicine.fechaRecalificacionEstJRC}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificaOrigenJNC}
                                            />
                                        </FormProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.noDictamenJNC}
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
                                                defaultValue={lsOccupationalMedicine.origenJNC}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificacionPclJNC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.noDictamenPclJNC}
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
                                                defaultValue={lsOccupationalMedicine.pclJNC}
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
                                                defaultValue={lsOccupationalMedicine.fechaEstructuraJNC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Calificación Origen"
                                                name="fechaRecalificacionPclJNC"
                                                defaultValue={lsOccupationalMedicine.fechaRecalificacionPclJNC}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsOccupationalMedicine.noDictamenRecalificacionJNC}
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
                                                defaultValue={lsOccupationalMedicine.pclRecalificacionJNC}
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
                                                defaultValue={lsOccupationalMedicine.origenInstaFinal}
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
                                                defaultValue={lsOccupationalMedicine.fechaEstructuracionOrigenInstaFinal}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.instanciaOrigenInstaFinal}
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
                                                defaultValue={lsOccupationalMedicine.pclFinalInstaFinal}
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
                                                defaultValue={lsOccupationalMedicine.instanciaFinal}
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
                                                defaultValue={lsOccupationalMedicine.fechaCalificacionPclInstFinal}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha Estructuracion PCL"
                                                name="fechaEstructuracionPclInstFinal"
                                                defaultValue={lsOccupationalMedicine.fechaEstructuracionPclInstFinal}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.indemnizado}
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
                                                defaultValue={lsOccupationalMedicine.fechaPagoInstaFinal}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsOccupationalMedicine.entregadoMin}
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
                                                defaultValue={lsOccupationalMedicine.indemnizadoRecalificado}
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
                                                defaultValue={lsOccupationalMedicine.fechaPagoRecalificadoInstaFinal}
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
                                                defaultValue={lsOccupationalMedicine.estadoRHT}
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
                                                defaultValue={lsOccupationalMedicine.reintegro}
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
                                                defaultValue={lsOccupationalMedicine.reubicado}
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
                                                defaultValue={lsOccupationalMedicine.restringido}
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
                                                defaultValue={lsOccupationalMedicine.jornadaLaboral}
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
                                                defaultValue={lsOccupationalMedicine.indemnizacion}
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
                                        <object
                                            type="application/pdf"
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
                                                    {TitleButton.Actualizar}
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
                </Fragment> : <Cargando />
            }
        </Fragment>
    );
};

export default OccupationalMedicine;