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

import { GetAllBySegAfectado, GetAllBySegAgrupado, GetAllBySubsegmento, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format'
import ViewEmployee from 'components/views/ViewEmployee';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOccupationalMedicine, ConvertToMedicinaLaboralToFormData } from 'formatdata/OccupationalMedicineForm';
import SubCard from 'ui-component/cards/SubCard';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { InsertOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import InputDatePicker from 'components/input/InputDatePicker';

const OccupationalMedicine = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [fileUpload, setFileUpload] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState('');
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
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
    const [subsegmento, setSubsegmento] = useState('');
    const [lsCie11, setLsCie11] = useState([]);

    const [documento, setDocumento] = useState('');

    const [fechaRetiro, setFechaRetiro] = useState(new Date());
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [fechaEnvio, setFechaEnvio] = useState(new Date());
    const [fechaCalificacionEps, setFechaCalificacionEps] = useState(new Date());
    const [fechaCalifiOrigenARL, setFechaCalifiOrigenARL] = useState(new Date());
    const [fechaCalificacionPclARL, setFechaCalificacionPclARL] = useState(new Date());
    const [fechaEstructuraARL, setFechaEstructuraARL] = useState(new Date());
    const [fechaRecalificacionPclARL, setFechaRecalificacionPclARL] = useState(new Date());
    const [fechaEstructuraRecalificadaARL, setFechaEstructuraRecalificadaARL] = useState(new Date());
    const [fechaCalificaOrigenJRC, setFechaCalificaOrigenJRC] = useState(new Date());
    const [fechaCalificacionPclJRC, setFechaCalificacionPclJRC] = useState(new Date());
    const [fechaEstructuraPclJRC, setFechaEstructuraPclJRC] = useState(new Date());
    const [fechaRecalificacionPclJRC, setFechaRecalificacionPclJRC] = useState(new Date());
    const [fechaRecalificacionEstJRC, setFechaRecalificacionEstJRC] = useState(new Date());
    const [fechaCalificaOrigenJNC, setFechaCalificaOrigenJNC] = useState(new Date());
    const [fechaCalificacionPclJNC, setFechaCalificacionPclJNC] = useState(new Date());
    const [fechaEstructuraJNC, setFechaEstructuraJNC] = useState(new Date());
    const [fechaRecalificacionPclJNC, setFechaRecalificacionPclJNC] = useState(new Date());
    const [fechaEstructuracionOrigenInstaFinal, setFechaEstructuracionOrigenInstaFinal] = useState(new Date());
    const [fechaCalificacionPclInstFinal, setFechaCalificacionPclInstFinal] = useState(new Date());
    const [fechaEstructuracionPclInstFinal, setFechaEstructuracionPclInstFinal] = useState(new Date());
    const [fechaPagoInstaFinal, setFechaPagoInstaFinal] = useState(new Date());
    const [fechaPagoRecalificadoInstaFinal, setFechaPagoRecalificadoInstaFinal] = useState(new Date());

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

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

            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);
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
            setLsSegmentoAfectado([]); setLsSubsegmento([]); setLsCie11([]); setSegmentoAfectado('');
            setSubsegmento(''); setSegmentoAfectado(''); setSegmentoAgrupado('');
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSegmentoAfectado(resultSegAfectado);
        } catch (error) {
            console.log(error);
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setLsSubsegmento([]); setLsCie11([]); setSubsegmento('');
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSubsegmento(resultSubsegmento);
        } catch (error) {
            console.log(error);
            setLsSubsegmento([]);
        }
    }

    const handleChangeSubsegmento = async (event) => {
        try {
            setSubsegmento(event.target.value);

            const lsServerCie11 = await GetAllBySubsegmento(event.target.value, 0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);
        } catch (error) {
            console.log(error);
            setLsCie11([]);
        }
    }

    const allowedFiles = ['application/pdf'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        setFileUpload(selectedFile);
        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfError('');
                    setPdfFile(e.target.result);
                }
            }
            else {
                setPdfError('No es un pdf válido: Por favor, seleccione sólo PDF');
                setPdfFile('');
            }
        }
        else {
            console.log('Seleccione un PDF');
        }
    }

    useEffect(() => {
        GetAll();
    }, [])



    const handleClick = async (datos) => {
        try {
            const usuario = "Manuel Vásquez";
            const fechaAhora = FormatDate(new Date());

            const DataToForm = PostOccupationalMedicine(0, document, datos.resumenCaso, FormatDate(fechaRetiro), segmentoAgrupado, segmentoAfectado, subsegmento,
                datos.codDx, datos.nroFurel, datos.regionInfoLaboral, datos.lateralidad, datos.entidadQueMotivaEnvio, datos.entidadDondeEnvia,
                FormatDate(fechaEntrega), FormatDate(fechaEnvio), datos.investigado, datos.observaciones,
                FormatDate(fechaCalificacionEps), datos.origenEps,
                datos.noSolicitudARL, FormatDate(fechaCalifiOrigenARL), datos.origenARL, FormatDate(fechaCalificacionPclARL), datos.pclARL,
                FormatDate(fechaEstructuraARL), FormatDate(fechaRecalificacionPclARL),
                datos.pclRecalificadaARL, FormatDate(fechaEstructuraRecalificadaARL),
                FormatDate(fechaCalificaOrigenJRC), datos.juntaCalifica, datos.noDictamenJRC, datos.origenJRC, datos.controversia, datos.conclusion,
                FormatDate(fechaCalificacionPclJRC),
                datos.noDictamenPclJRC, datos.pclJRC, FormatDate(fechaEstructuraPclJRC),
                datos.noActaRecursoJRC, FormatDate(fechaRecalificacionPclJRC), datos.noDictamenRecalificacionJRC, datos.juntaReCalificacionJRC, datos.pclRecalificadaJRC,
                FormatDate(fechaCalificaOrigenJNC), datos.noDictamenJNC, datos.origenJNC, FormatDate(fechaCalificacionPclJNC), datos.noDictamenPclJNC,
                datos.pclJNC, FormatDate(fechaEstructuraJNC),
                FormatDate(fechaRecalificacionPclJNC),
                datos.noDictamenRecalificacionJNC, datos.pclRecalificacionJNC,
                datos.origenInstaFinal, FormatDate(fechaEstructuracionOrigenInstaFinal), datos.instanciaOrigenInstaFinal, datos.pclFinalInstaFinal, datos.instanciaFinal,
                FormatDate(fechaCalificacionPclInstFinal),
                FormatDate(fechaEstructuracionPclInstFinal), datos.indemnizado, datos.entregadoMin, FormatDate(fechaPagoInstaFinal), datos.indemnizadoRecalificado,
                FormatDate(fechaPagoRecalificadoInstaFinal),
                datos.estadoRHT, datos.reintegro, datos.reubicado, datos.restringido, datos.jornadaLaboral, datos.indemnizacion,
                lsEmployee.idSede, usuario, usuario, fechaAhora, fechaAhora, fechaAhora, fechaAhora, "edadCalificado", "antiguedadCalificado", fileUpload);

            const DataEnd = ConvertToMedicinaLaboralToFormData(DataToForm);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertOccupationalMedicine(DataEnd);
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
                    <SubCard title={<Typography variant="h4">INFORMACIÓN LABORAL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="resumenCaso"
                                        label="Resumen Caso"
                                        defaultValue=""
                                        options={lsResumenCaso}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                    bug={errors}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="segmentoAfectado"
                                    label="Segmento Afectado"
                                    onChange={handleChangeSegAfectado}
                                    value={segmentoAfectado}
                                    options={lsSegmentoAfectado}
                                    disabled={lsSegmentoAfectado.length != 0 ? false : true}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="subsegmento"
                                    label="Subsegmento"
                                    onChange={handleChangeSubsegmento}
                                    value={subsegmento}
                                    options={lsSubsegmento}
                                    disabled={lsSubsegmento.length != 0 ? false : true}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="codDx"
                                        label="Diagnóstico"
                                        defaultValue=""
                                        options={lsCie11}
                                        disabled={lsCie11.length != 0 ? false : true}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="regionInfoLaboral"
                                        label="Región"
                                        defaultValue=""
                                        options={lsRegion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="lateralidad"
                                        label="Lateralidad"
                                        defaultValue=""
                                        options={lsLateralidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entidadQueMotivaEnvio"
                                        label="Entidad que motiva el envio"
                                        defaultValue=""
                                        options={lsEntidadMotiEnvio}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="entidadDondeEnvia"
                                        label="Entidad Donde Envía"
                                        defaultValue=""
                                        options={lsEntidadDondeEnvia}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsInvestigado}
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
                                        multiline
                                        rows={4}
                                        name="observaciones"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsOrigenEPS}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        fullWidth
                                        name="pclARL"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        fullWidth
                                        name="pclRecalificadaARL"
                                        label="% PCL Recalificada"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsJuntaCalificadaJRC}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenJRC"
                                        label="Origen"
                                        defaultValue=""
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="pclJRC"
                                        label="PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
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
                                        defaultValue=""
                                        fullWidth
                                        name="noDictamenRecalificacionJRC"
                                        label="No Dictamen Recalificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="juntaReCalificacionJRC"
                                        label="Junta Recalificación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="pclRecalificadaJRC"
                                        label="% PCL Recalificada"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="origenJNC"
                                        label="Origen"
                                        defaultValue=""
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="pclJNC"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="pclRecalificacionJNC"
                                        label="% PCL"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsOrigenARL}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsInstanciaOrigen}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="pclFinalInstaFinal"
                                        label="% PCL Final"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="instanciaFinal"
                                        label="Instancia Final"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="indemnizadoRecalificado"
                                        label="Indemnizado Recalificado"
                                        defaultValue=""
                                        options={lsInvestigado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
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
                                        bug={errors}
                                        rows={4}
                                        multiline
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">RESULTADO INVESTIGACIÓN LABORAL</Typography>}>
                        <Grid xs={12} sx={{ pl: 4, pt: 4 }} container spacing={2}>
                            <input type="file" onChange={handleFile} />
                        </Grid>

                        <object type="application/pdf"
                            data={pdfFile}
                            width="1020"
                            height="500">
                        </object>

                        <Grid item sx={{ pt: 4 }} xs={12}>
                            <Grid container spacing={1}>
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