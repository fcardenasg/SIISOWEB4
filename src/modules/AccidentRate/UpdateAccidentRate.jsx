import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate, useParams } from 'react-router-dom';
import ControlModal from 'components/controllers/ControlModal';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';

import { FormProvider, useForm } from 'react-hook-form';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import InputDatePicker from 'components/input/InputDatePicker';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetByIdAccidentRate, UpdateAccidentRates } from 'api/clients/AccidentRateClient';
import { PutAccidentRate } from 'formatdata/AccidentRateForm';
import InputOnChange from 'components/input/InputOnChange';
import Cargando from 'components/loading/Cargando';
import MainCard from 'ui-component/cards/MainCard';
import UploadIcon from '@mui/icons-material/Upload';
import { GetByMail } from 'api/clients/UserClient';
import { generateReport } from '../AccidentRate/ReporteAccidentRate';
import ViewPDF from 'components/components/ViewPDF';
import { DownloadFile } from 'components/helpers/ConvertToBytes';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },
]

const validationSchema = yup.object().shape({
    diagnosticoInicial: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateAccidentRate = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [dataPDF, setDataPDF] = useState(null);
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState(undefined);

    const [openReport, setOpenReport] = useState(false);
    const [urlFile, setUrlFile] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsClase, setLsClase] = useState([]);
    const [lsCausa, setLsCausa] = useState([]);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsSubTipo, setLsSubTipo] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);
    const [lsAccidentRate, setLsAccidentRate] = useState([]);

    const [lsDx1, setLsDx1] = useState([]);
    const [textDx1, setTextDx1] = useState('');

    const [lsDx2, setLsDx2] = useState([]);
    const [textDx2, setTextDx2] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, formState: { errors } } = methods;

    async function downloadFileReplay() { DownloadFile(`${documento}accidentetrabajo${new Date().getTime()}.pdf`, urlFile.replace("data:application/pdf;base64,", "")); }

    useEffect(() => {
        async function getData() {
            try {
                const lsServerAtencion = await GetByIdAccidentRate(id);
                if (lsServerAtencion.status === 200) {
                    setLsAccidentRate(lsServerAtencion.data);
                    setDocumento(lsServerAtencion.data.documento);
                    setSegmentoAgrupado(lsServerAtencion.data.idSegmentoAgrupado);
                    setUrlFile(lsServerAtencion.data.url);

                    const event = {
                        target: { value: lsServerAtencion.data.documento }
                    }
                    handleLoadingDocument(event);

                    if (lsServerAtencion.data.diagnosticoInicial !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsServerAtencion.data.diagnosticoInicial);
                        setLsDx1(lsServerCie11.data);
                        setTextDx1(lsServerAtencion.data.diagnosticoInicial);
                    }

                    if (lsServerAtencion.data.diagnosticoFinal !== "") {
                        var lsServerCie11 = await GetAllByCodeOrName(lsServerAtencion.data.diagnosticoFinal);
                        setLsDx2(lsServerCie11.data);
                        setTextDx2(lsServerAtencion.data.diagnosticoFinal);
                    }
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

            const lsServerRegion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MEDLAB_REGION);
            var resultRegion = lsServerRegion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRegion(resultRegion);

            const lsServerClase = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CLASE_AT);
            var resultClase = lsServerClase.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsClase(resultClase);

            const lsServerCausa = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CAUSA_AT);
            var resultCausa = lsServerCausa.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCausa(resultCausa);

            const lsServerSubTipo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SUBTIPO_AT);
            var resultSubTipo = lsServerSubTipo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSubTipo(resultSubTipo);

            const lsServerEstado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTADO_AT);
            var resultEstado = lsServerEstado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstado(resultEstado);

            const lsServerRemitido = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultRemitido = lsServerRemitido.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRemitido(resultRemitido);

            const lsServerConceptoAptitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_CONCEP_ACTITUD);
            var resultConceptoAptitud = lsServerConceptoAptitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoAptitud(resultConceptoAptitud);
        } catch (error) { }
    }

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setUrlFile(e.target.result);
                }
            }
            else {
                setUrlFile('');
                setOpenError(true);
                setErrorMessage('Este formato no es .PDF');
            }
        }
    }

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

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx1(lsServerCie11.data);
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

    const handleDx2 = async (event) => {
        try {
            setTextDx2(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx2(lsServerCie11.data);
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
    }, []);

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAccidentRate(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    setTimeout(() => {
        if (lsAccidentRate.length !== 0)
            setTimeWait(true);
    }, 2000);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutAccidentRate(id, datos.fecha, documento, datos.idClaseAT, datos.idCausaAT, segmentoAgrupado,
                1, datos.idSubsegmento, datos.idSubTipoConsecuencia, datos.diagnosticoInicial,
                datos.diagnosticoFinal, datos.idParaclinicos, datos.idConceptoActitudSFI, datos.idConceptoActitudSFF,
                datos.diasTw, datos.diasIncapacidad, datos.idStatus, urlFile, datos.seguimiento, datos.idRemitido,
                lsAccidentRate.usuarioRegistro, undefined, user.nameuser, undefined);

            if (Object.keys(datos.length !== 0)) {
                if (lsEmployee.length !== 0) {
                    const result = await UpdateAccidentRates(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorNoHayDatos);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>


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
                            title="Actualizar accidente de trabajo"
                            disabled={true}
                            key={lsEmployee?.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsAccidentRate.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idClaseAT"
                                            label="Clase AT"
                                            options={lsClase}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idClaseAT}
                                            defaultValue={lsAccidentRate.idClaseAT}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCausaAT"
                                            label="Causa AT"
                                            options={lsCausa}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idCausaAT}
                                            defaultValue={lsAccidentRate.idCausaAT}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <SelectOnChange
                                        name="segmentoAgrupado"
                                        label="Segmento Agrupado"
                                        options={lsSegmentoAgrupado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        value={segmentoAgrupado}
                                        onChange={(e) => setSegmentoAgrupado(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue={lsAccidentRate.idSubsegmento}
                                            name="idSubsegmento"
                                            label="Región"
                                            options={lsRegion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idSubTipoConsecuencia"
                                            label="SubTipo Consecuencia"
                                            options={lsSubTipo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idSubTipoConsecuencia}
                                            defaultValue={lsAccidentRate.idSubTipoConsecuencia}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Diagnóstico Inicial</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <InputOnChange
                                        label="Dx 1"
                                        onKeyDown={handleDx1}
                                        onChange={(e) => setTextDx1(e?.target.value)}
                                        value={textDx1}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="diagnosticoInicial"
                                            label="Diagnostico 1"
                                            options={lsDx1}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoInicial}
                                            defaultValue={lsAccidentRate.diagnosticoInicial}
                                        />
                                    </FormProvider>
                                </Grid>

                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Diagnóstico Final</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <InputOnChange
                                        label="Dx 2"
                                        onKeyDown={handleDx2}
                                        onChange={(e) => setTextDx2(e?.target.value)}
                                        value={textDx2}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="diagnosticoFinal"
                                            label="Diagnostico 2"
                                            options={lsDx2}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoFinal}
                                            defaultValue={lsAccidentRate.diagnosticoFinal}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Datos Complementarios</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idParaclinicos"
                                            label="Paraclinicos"
                                            options={lsRemitido}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idParaclinicos}
                                            defaultValue={lsAccidentRate.idParaclinicos}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idConceptoActitudSFI"
                                            label="Concepto De Aptitud Psicofisica Inicial"
                                            options={lsConceptoAptitud}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idConceptoActitudSFI}
                                            defaultValue={lsAccidentRate.idConceptoActitudSFI}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idConceptoActitudSFF"
                                            label="Concepto De Aptitud Psicofisica Final"
                                            options={lsConceptoAptitud}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idConceptoActitudSFF}
                                            defaultValue={lsAccidentRate.idConceptoActitudSFF}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={1.5}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            type="number"
                                            fullWidth
                                            name="diasTw"
                                            label="Días Trabajo Transicional"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diasTw}
                                            defaultValue={lsAccidentRate.diasTw}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={1.5}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            type="number"
                                            fullWidth
                                            name="diasIncapacidad"
                                            label="Días de Incapacidad"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diasIncapacidad}
                                            defaultValue={lsAccidentRate.diasIncapacidad}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="seguimiento"
                                            label="Seguimiento"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.seguimiento}
                                            defaultValue={lsAccidentRate.seguimiento}
                                            multiline
                                            rows={6}
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

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idStatus"
                                            label="Estado"
                                            options={lsEstado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idStatus}
                                            defaultValue={lsAccidentRate.idStatus}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idRemitido"
                                            label="Remitido"
                                            options={lsRemitido}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idRemitido}
                                            defaultValue={lsAccidentRate.idRemitido}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <MainCard title="Registro Fotográfico">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button fullWidth variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                                    {TitleButton.SubirArchivo}
                                                    <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" onClick={downloadFileReplay} disabled={urlFile === null ? true : false} startIcon={<DownloadIcon fontSize="large" />} fullWidth>
                                                    Descargar
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" color="error" onClick={() => setUrlFile(null)} disabled={urlFile === null ? true : false} startIcon={<ClearIcon fontSize="large" />} fullWidth>
                                                    Eliminar
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>

                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={handleClickReport}>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/accident-rate/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default UpdateAccidentRate;