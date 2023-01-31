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
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate } from 'react-router-dom';
import ControlModal from 'components/controllers/ControlModal';

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
import { FormatDate } from 'components/helpers/Format'
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado, GetAllBySegmentoAfectado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import { InsertAccidentRate } from 'api/clients/AccidentRateClient';
import { PostAccidentRate } from 'formatdata/AccidentRateForm';
import InputOnChange from 'components/input/InputOnChange';
import ViewPDF from 'components/components/ViewPDF';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },
]

const validationSchema = yup.object().shape({
    diagnosticoInicial: yup.string().required(`${ValidationMessage.Requerido}`),
});

const AccidentRate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState(undefined);
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState(undefined);
    /* const [subsegmento, setSubsegmento] = useState([]); */

    const [openReport, setOpenReport] = useState(false);
    const [urlFile, setUrlFile] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsClase, setLsClase] = useState([]);
    const [lsCausa, setLsCausa] = useState([]);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsSubTipo, setLsSubTipo] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);

    const [lsDx1, setLsDx1] = useState([]);
    const [textDx1, setTextDx1] = useState('');

    const [lsDx2, setLsDx2] = useState([]);
    const [textDx2, setTextDx2] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, reset, formState: { errors } } = methods;

    /* const handleChangeSegAgrupado = async (event) => {
        try {
            setSubsegmento([]);
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
    } */

    /* const handleChangeSegAfectado = async (event) => {
        try {
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setSubsegmento(resultSubsegmento);

        } catch (error) {
            setSubsegmento([]);
        }
    } */

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = async (e) => {
                    setUrlFile(e.target.result);
                }
            }
            else {
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
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

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx1(resultCie11);
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

    const handleDx2 = async (event) => {
        try {
            setTextDx2(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx2(resultCie11);
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

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostAccidentRate(FormatDate(datos.fecha), documento, datos.idClaseAT, datos.idCausaAT, segmentoAgrupado,
                segmentoAfectado, 1, datos.idSubTipoConsecuencia, datos.diagnosticoInicial,
                datos.diagnosticoFinal, datos.idParaclinicos, datos.idConceptoActitudSFI, datos.idConceptoActitudSFF,
                datos.diasTw, datos.diasIncapacidad, datos.idStatus, urlFile, datos.seguimiento, datos.idRemitido,
                user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                if (lsEmployee.length !== 0) {
                    const result = await InsertAccidentRate(DataToInsert);
                    if (result.status === 200) {
                        reset();
                        setOpenSuccess(true);
                        setDocumento('');
                        setLsEmployee([]);

                        setLsSegmentoAfectado([]);
                        setSegmentoAfectado('');
                        setSegmentoAgrupado('');

                        setTextDx1(''); setLsDx1([]);
                        setTextDx2(''); setLsDx2([]);
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
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >

            </ControlModal>

            <ControlModal
                title="VISUALIZAR ARCHIVO"
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={urlFile} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="REGISTRAR ACCIDENTE DE TRABAJO"
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
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
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
                                <SelectOnChange
                                    name="segmentoAfectado"
                                    label="Segmento Afectado"
                                    options={lsSegmentoAfectado}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={segmentoAfectado}
                                    onChange={(e) => setSegmentoAfectado(e.target.value)}
                                />
                            </Grid>

                            {/* <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idSubsegmento"
                                        label="Subsegmento"
                                        options={subsegmento}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idSubsegmento}
                                    />
                                </FormProvider>
                            </Grid> */}

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idSubTipoConsecuencia"
                                        label="SubTipo Consecuencia"
                                        options={lsSubTipo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idSubTipoConsecuencia}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
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
                                        label="Dx1"
                                        options={lsDx1}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.diagnosticoInicial}
                                    />
                                </FormProvider>
                            </Grid>

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
                                        label="Dx2"
                                        options={lsDx2}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.diagnosticoFinal}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">DATOS COMPLEMENTARIOS</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idParaclinicos"
                                        label="Paraclinicos"
                                        options={lsRemitido}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idParaclinicos}
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
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="seguimiento"
                                        defaultValue=""
                                        label="Seguimiento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.seguimiento}
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
                                    />
                                </FormProvider>
                            </Grid>

                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button fullWidth variant="outlined" component="label">
                                        <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                        {TitleButton.SubirArchivo}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button disabled={urlFile === null ? true : false} variant="outlined" fullWidth onClick={() => setOpenViewArchivo(true)}>
                                        {TitleButton.VerArchivo}
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
            </Grid>
        </Fragment>
    );
};

export default AccidentRate;