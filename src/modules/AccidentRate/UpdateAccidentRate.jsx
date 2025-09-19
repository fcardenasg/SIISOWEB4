import {
    Button,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import ControlModal from 'components/controllers/ControlModal';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { FormProvider, useForm } from 'react-hook-form';

import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GetByIdAccidentRate, UpdateAccidentRates } from 'api/clients/AccidentRateClient';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetByMail } from 'api/clients/UserClient';
import RightDrawer from 'components/components/RightDrawer';
import ViewPDF from 'components/components/ViewPDF';
import ControllerListen from 'components/controllers/ControllerListen';
import DetailedIcon from 'components/controllers/DetailedIcon';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import { AccionMenu, CodCatalogo, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { useBoolean } from 'hooks/use-boolean';
import useAuth from 'hooks/useAuth';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ChipControl from 'ui-component/extended/Chip';
import { generateReport } from '../AccidentRate/ReporteAccidentRate';

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
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const openModal = useBoolean();

    const [dataPDF, setDataPDF] = useState(null);
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);

    const [openReport, setOpenReport] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [lsRegion, setLsRegion] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsClase, setLsClase] = useState([]);
    const [lsCausa, setLsCausa] = useState([]);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsSubTipo, setLsSubTipo] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);
    const [modeloAccidentRate, setModeloAccidentRate] = useState([]);

    /* Dx Iniciales */
    const [lsDxInicio1, setLsDxInicio1] = useState([]);
    const [textDxInicio1, setTextDxInicio1] = useState('');
    const [lsDxInicio2, setLsDxInicio2] = useState([]);
    const [textDxInicio2, setTextDxInicio2] = useState('');
    const [lsDxInicio3, setLsDxInicio3] = useState([]);
    const [textDxInicio3, setTextDxInicio3] = useState('');

    /* Dx Finales */
    const [lsDxFinal1, setLsDxFinal1] = useState([]);
    const [textDxFinal1, setTextDxFinal1] = useState('');
    const [lsDxFinal2, setLsDxFinal2] = useState([]);
    const [textDxFinal2, setTextDxFinal2] = useState('');
    const [lsDxFinal3, setLsDxFinal3] = useState([]);
    const [textDxFinal3, setTextDxFinal3] = useState('');

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, setValue, watch, formState: { errors } } = methods;
    const values = watch();

    async function downloadFileReplay() { DownloadFile(`${values.documento}accidentetrabajo${new Date().getTime()}.pdf`, values.url.replace("data:application/pdf;base64,", "")); }

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
                var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsSegmentoAgrupado(resultSegAgrupado);

                const lsServerRegion = await GetByTipoCatalogoCombo(CodCatalogo.MEDLAB_REGION);
                setLsRegion(lsServerRegion.data);

                const lsServerClase = await GetByTipoCatalogoCombo(CodCatalogo.CLASE_AT);
                setLsClase(lsServerClase.data);

                const lsServerCausa = await GetByTipoCatalogoCombo(CodCatalogo.CAUSA_AT);
                setLsCausa(lsServerCausa.data);

                const lsServerSubTipo = await GetByTipoCatalogoCombo(CodCatalogo.SUBTIPO_AT);
                setLsSubTipo(lsServerSubTipo.data);

                const lsServerEstado = await GetByTipoCatalogoCombo(CodCatalogo.ESTADO_AT);
                setLsEstado(lsServerEstado.data);

                const lsServerRemitido = await GetByTipoCatalogoCombo(CodCatalogo.Opciones_SINO);
                setLsRemitido(lsServerRemitido.data);

                const lsServerConceptoAptitud = await GetByTipoCatalogoCombo(CodCatalogo.AHC_CONCEP_ACTITUD);
                setLsConceptoAptitud(lsServerConceptoAptitud.data);
            } catch (error) { }
        }

        getCombo();
    }, [])

    useEffect(() => {
        async function getData() {
            try {
                const lsServerAtencion = await GetByIdAccidentRate(id);
                if (lsServerAtencion.status === 200) {
                    setValue('id', id);
                    setValue('documento', lsServerAtencion.data.documento);
                    setValue('url', lsServerAtencion.data.url);
                    setModeloAccidentRate(lsServerAtencion.data);

                    const event = {
                        target: { value: lsServerAtencion.data.documento }
                    }
                    handleLoadingDocument(event);

                    /* Dx Iniciales */
                    setLsDxInicio1(lsServerAtencion.data.listDxInicio);
                    setTextDxInicio1(lsServerAtencion.data.diagnosticoInicial);
                    setLsDxInicio2(lsServerAtencion.data.listDxInicio2);
                    setTextDxInicio2(lsServerAtencion.data.diagnosticoInicial2);
                    setLsDxInicio3(lsServerAtencion.data.listDxInicio3);
                    setTextDxInicio3(lsServerAtencion.data.diagnosticoInicial3);

                    /* Dx Finales */
                    setLsDxFinal1(lsServerAtencion.data.listDxFinal);
                    setTextDxFinal1(lsServerAtencion.data.diagnosticoFinal);
                    setLsDxFinal2(lsServerAtencion.data.listDxFinal2);
                    setTextDxFinal2(lsServerAtencion.data.diagnosticoFinal2);
                    setLsDxFinal3(lsServerAtencion.data.listDxFinal3);
                    setTextDxFinal3(lsServerAtencion.data.diagnosticoFinal3);
                }
            } catch (error) { }
        }

        getData();
    }, [id]);

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setValue('url', e.target.result);
                }
            }
            else {
                toast.error('Este formato no es .PDF');
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
                toast.error(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            toast.error(Message.ErrorDeDatos);
        }
    }

    const handleDxInicio = async (event, dxType) => {
        const value = event.target.value;

        if (dxType === 1) setTextDxInicio1(value);
        else if (dxType === 2) setTextDxInicio2(value);
        else if (dxType === 3) setTextDxInicio3(value);

        if (event.key === 'Enter' && value.trim()) {
            try {
                const { data } = await GetAllByCodeOrName(value.trim());
                switch (dxType) {
                    case 1: setLsDxInicio1(data); break;
                    case 2: setLsDxInicio2(data); break;
                    case 3: setLsDxInicio3(data); break;
                    default: break;
                }
            } catch {
                toast.error('Error al buscar el diagnóstico');
            }
        } else if (event.key === 'Enter') {
            toast.error('Ingrese un código o nombre de diagnóstico');
        }
    };

    const handleDxFinal = async (event, dxType) => {
        const value = event.target.value;

        if (dxType === 1) setTextDxFinal1(value);
        else if (dxType === 2) setTextDxFinal2(value);
        else if (dxType === 3) setTextDxFinal3(value);

        if (event.key === 'Enter' && value.trim()) {
            try {
                const { data } = await GetAllByCodeOrName(value.trim());
                switch (dxType) {
                    case 1: setLsDxFinal1(data); break;
                    case 2: setLsDxFinal2(data); break;
                    case 3: setLsDxFinal3(data); break;
                    default: break;
                }
            } catch {
                toast.error('Error al buscar el diagnóstico');
            }
        } else if (event.key === 'Enter') {
            toast.error('Ingrese un código o nombre de diagnóstico');
        }
    };

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
        if (modeloAccidentRate.length !== 0)
            setTimeWait(true);
    }, 700);

    const handleClick = async (datos) => {
        try {
            const result = await UpdateAccidentRates(datos);
            if (result.data.exito)
                toast.success(result.data.mensaje);
            else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    const isCumple = values.url ? false : true;

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.Accidentedetrabajo}>
            <FormProvider {...methods}>
                {timeWait ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                title="Actualizar accidente de trabajo"
                                disabled={true}
                                key={lsEmployee?.documento}
                                documento={values.documento}
                                onChange={(e) => setValue('documento', e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={modeloAccidentRate.fecha}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputSelect
                                            name="idClaseAT"
                                            label="Clase AT"
                                            options={lsClase}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idClaseAT}
                                            defaultValue={modeloAccidentRate.idClaseAT}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputSelect
                                            name="idCausaAT"
                                            label="Causa AT"
                                            options={lsCausa}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idCausaAT}
                                            defaultValue={modeloAccidentRate.idCausaAT}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputSelect
                                            name="idSegmentoAgrupado"
                                            label="Segmento Agrupado"
                                            options={lsSegmentoAgrupado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idSegmentoAgrupado}
                                            defaultValue={modeloAccidentRate.idSegmentoAgrupado}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputSelect
                                            defaultValue={modeloAccidentRate.idSubsegmento}
                                            name="idSubsegmento"
                                            label="Región"
                                            options={lsRegion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputSelect
                                            name="idSubTipoConsecuencia"
                                            label="SubTipo Consecuencia"
                                            options={lsSubTipo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idSubTipoConsecuencia}
                                            defaultValue={modeloAccidentRate.idSubTipoConsecuencia}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title="Diagnóstico inicial">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} lg={2}>
                                        <InputOnChange
                                            label="Dx 1"
                                            onKeyDown={(e) => handleDxInicio(e, 1)}
                                            onChange={(e) => setTextDxInicio1(e?.target.value)}
                                            value={textDxInicio1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8} lg={10}>
                                        <InputSelect
                                            defaultValue={modeloAccidentRate.diagnosticoInicial}
                                            name="diagnosticoInicial"
                                            label="Diagnostico 1"
                                            options={lsDxInicio1}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoInicial}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} lg={2}>
                                        <InputOnChange
                                            label="Dx 2"
                                            onKeyDown={(e) => handleDxInicio(e, 2)}
                                            onChange={(e) => setTextDxInicio2(e?.target.value)}
                                            value={textDxInicio2}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8} lg={10}>
                                        <InputSelect
                                            defaultValue={modeloAccidentRate.diagnosticoInicial2}
                                            name="diagnosticoInicial2"
                                            label="Diagnostico 2"
                                            options={lsDxInicio2}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoInicial2}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} lg={2}>
                                        <InputOnChange
                                            label="Dx 3"
                                            onKeyDown={(e) => handleDxInicio(e, 3)}
                                            onChange={(e) => setTextDxInicio3(e?.target.value)}
                                            value={textDxInicio3}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8} lg={10}>
                                        <InputSelect
                                            defaultValue={modeloAccidentRate.diagnosticoInicial3}
                                            name="diagnosticoInicial3"
                                            label="Diagnostico 3"
                                            options={lsDxInicio3}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoInicial3}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title="Diagnóstico final">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} lg={2}>
                                        <InputOnChange
                                            label="Dx 1"
                                            onKeyDown={(e) => handleDxFinal(e, 1)}
                                            onChange={(e) => setTextDxFinal1(e?.target.value)}
                                            value={textDxFinal1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8} lg={10}>
                                        <InputSelect
                                            defaultValue={modeloAccidentRate.diagnosticoFinal}
                                            name="diagnosticoFinal"
                                            label="Diagnostico 1"
                                            options={lsDxFinal1}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoFinal}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} lg={2}>
                                        <InputOnChange
                                            label="Dx 2"
                                            onKeyDown={(e) => handleDxFinal(e, 2)}
                                            onChange={(e) => setTextDxFinal2(e?.target.value)}
                                            value={textDxFinal2}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8} lg={10}>
                                        <InputSelect
                                            name="diagnosticoFinal2"
                                            defaultValue={modeloAccidentRate.diagnosticoFinal2}
                                            label="Diagnostico 2"
                                            options={lsDxFinal2}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoFinal2}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4} lg={2}>
                                        <InputOnChange
                                            label="Dx 3"
                                            onKeyDown={(e) => handleDxFinal(e, 3)}
                                            onChange={(e) => setTextDxFinal3(e?.target.value)}
                                            value={textDxFinal3}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={8} lg={10}>
                                        <InputSelect
                                            name="diagnosticoFinal3"
                                            defaultValue={modeloAccidentRate.diagnosticoFinal3}
                                            label="Diagnostico 3"
                                            options={lsDxFinal3}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diagnosticoFinal3}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">Datos complementarios</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            name="idParaclinicos"
                                            label="Paraclinicos"
                                            options={lsRemitido}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idParaclinicos}
                                            defaultValue={modeloAccidentRate.idParaclinicos}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            name="idConceptoActitudSFI"
                                            label="Concepto De Aptitud Psicofisica Inicial"
                                            options={lsConceptoAptitud}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idConceptoActitudSFI}
                                            defaultValue={modeloAccidentRate.idConceptoActitudSFI}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            name="idConceptoActitudSFF"
                                            label="Concepto De Aptitud Psicofisica Final"
                                            options={lsConceptoAptitud}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idConceptoActitudSFF}
                                            defaultValue={modeloAccidentRate.idConceptoActitudSFF}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            type="number"
                                            fullWidth
                                            name="diasTw"
                                            label="Días Trabajo Transicional"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diasTw}
                                            defaultValue={modeloAccidentRate.diasTw}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            type="number"
                                            fullWidth
                                            name="diasIncapacidad"
                                            label="Días de Incapacidad"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.diasIncapacidad}
                                            defaultValue={modeloAccidentRate.diasIncapacidad}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <InputText
                                            fullWidth
                                            name="seguimiento"
                                            label="Seguimiento"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.seguimiento}
                                            defaultValue={modeloAccidentRate.seguimiento}
                                            multiline
                                            rows={6}
                                        />
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
                                        <InputSelect
                                            name="idStatus"
                                            label="Estado"
                                            options={lsEstado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idStatus}
                                            defaultValue={modeloAccidentRate.idStatus}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <InputSelect
                                            name="idRemitido"
                                            label="Remitido"
                                            options={lsRemitido}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idRemitido}
                                            defaultValue={modeloAccidentRate.idRemitido}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ pt: 2 }}>
                                    <MainCard title="Registro Fotográfico" secondary={
                                        <ChipControl
                                            size="small"
                                            label={values.url == null ? "No se ha subido ningún archivo aún.".toUpperCase() : "Archivo subido con éxito.".toUpperCase()}
                                            chipcolor={values.url == null ? "error" : "success"}
                                            sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                        />
                                    }>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={4} lg={3}>
                                                <AnimateButton>
                                                    <Button fullWidth variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                                        {TitleButton.SubirArchivo}
                                                        <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={3}>
                                                <AnimateButton>
                                                    <Button variant="outlined" onClick={downloadFileReplay} disabled={isCumple} startIcon={<DownloadIcon fontSize="large" />} fullWidth>
                                                        Descargar
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={6} lg={3}>
                                                <AnimateButton>
                                                    <Button variant="outlined" onClick={openModal.onTrue} disabled={isCumple} startIcon={<VisibilityIcon fontSize="large" />} fullWidth>
                                                        Previsualizar archivo
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={6} md={4} lg={3}>
                                                <AnimateButton>
                                                    <Button variant="outlined" color="error" onClick={() => setValue('url', null)} disabled={isCumple} startIcon={<ClearIcon fontSize="large" />} fullWidth>
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
            </FormProvider>

            <>
                <RightDrawer
                    title="Previsualizar archivo"
                    open={openModal.value}
                    onClose={openModal.onFalse}
                    width={600}
                >
                    <ViewPDF dataPDF={values.url} height={570} width={550} />
                </RightDrawer>

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
            </>
        </ValidateActionSkeleton>
    );
};

export default UpdateAccidentRate;