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
import InputMultiSelects from 'components/input/InputMultiSelects';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import { InsertAccidentRate } from 'api/clients/AccidentRateClient';
import { PostAccidentRate } from 'formatdata/AccidentRateForm';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },
]

const AccidentRate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');
    const [subsegmento, setSubsegmento] = useState([]);

    const [openReport, setOpenReport] = useState(false);
    const [urlFile, setUrlFile] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openExamenParaclinico, setOpenExamenParaclinico] = useState(false);
    const [openExamenFisico, setOpenExamenFisico] = useState(false);
    const [diagnosticoInicial, setDiagnosticoInicial] = useState([]);
    const [diagnosticoFinal, setDiagnosticoFinal] = useState([]);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsClase, setLsClase] = useState([]);
    const [lsCausa, setLsCausa] = useState([]);
    const [lsEstado, setLsEstado] = useState([]);
    const [lsSubTipo, setLsSubTipo] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const handleChangeSegAgrupado = async (event) => {
        try {
            setSubsegmento([]);
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSegmentoAfectado(resultSegAfectado);

        } catch (error) {
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setSubsegmento(resultSubsegmento);

        } catch (error) {
            setSubsegmento([]);
        }
    }

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

    async function GetAll() {
        try {
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

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
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostAccidentRate(FormatDate(datos.fecha), documento, datos.idClaseAT, datos.idCausaAT, segmentoAgrupado,
                segmentoAfectado, datos.idSubsegmento, datos.idSubTipoConsecuencia, JSON.stringify(diagnosticoInicial),
                JSON.stringify(diagnosticoFinal), datos.idParaclinicos, datos.idConceptoActitudSFI, datos.idConceptoActitudSFF,
                datos.diasTw, datos.diasIncapacidad, datos.idStatus, urlFile, datos.seguimiento, datos.idRemitido,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAccidentRate(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    setDiagnosticoFinal([]);
                    setDiagnosticoInicial([]);

                    setLsSegmentoAfectado([]);
                    setSegmentoAgrupado('');
                    setSegmentoAfectado('');
                    setSubsegmento([]);

                    reset();
                }
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

            <FullScreenDialog
                open={openExamenFisico}
                title="VISTA DE EXAMEN FÍSICO"
                handleClose={() => setOpenExamenFisico(false)}
            >

            </FullScreenDialog>

            <FullScreenDialog
                open={openExamenParaclinico}
                title="VISTA DE EXAMEN PARACLÍNICO"
                handleClose={() => setOpenExamenParaclinico(false)}
            >

            </FullScreenDialog>

            <ControlModal
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                
            </ControlModal>

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
                                        defaultValue=""
                                        options={lsClase}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idCausaAT"
                                        label="Causa AT"
                                        defaultValue=""
                                        options={lsCausa}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                    onChange={handleChangeSegAgrupado}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="segmentoAfectado"
                                    label="Segmento Afectado"
                                    options={lsSegmentoAfectado}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={segmentoAfectado}
                                    onChange={handleChangeSegAfectado}
                                    disabled={lsSegmentoAfectado.length != 0 ? false : true}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idSubsegmento"
                                        label="Subsegmento"
                                        defaultValue=""
                                        options={subsegmento}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                        disabled={subsegmento.length != 0 ? false : true}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idSubTipoConsecuencia"
                                        label="SubTipo Consecuencia"
                                        defaultValue=""
                                        options={lsSubTipo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnosticoInicial(value)}
                                    value={diagnosticoInicial}
                                    label="Diagnóstico Inicial"
                                    options={lsCie11}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnosticoFinal(value)}
                                    value={diagnosticoFinal}
                                    label="Diagnóstico Final"
                                    options={lsCie11}
                                />
                            </Grid>

                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">DATOS COMPLEMENTARIOS</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idParaclinicos"
                                        label="Paraclinicos"
                                        defaultValue=""
                                        options={lsRemitido}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoActitudSFI"
                                        label="Concepto De Aptitud Psicofisica Inicial"
                                        defaultValue=""
                                        options={lsConceptoAptitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoActitudSFF"
                                        label="Concepto De Aptitud Psicofisica Final"
                                        defaultValue=""
                                        options={lsConceptoAptitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="diasTw"
                                        label="Días Trabajo Transicional"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2.4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        type="number"
                                        defaultValue=""
                                        fullWidth
                                        name="diasIncapacidad"
                                        label="Días de Incapacidad"
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
                                        name="seguimiento"
                                        label="Seguimiento"
                                        size={matchesXS ? 'small' : 'medium'}
                                        multiline
                                        rows={6}
                                        bug={errors}
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
                                        defaultValue=""
                                        options={lsEstado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idRemitido"
                                        label="Remitido"
                                        defaultValue=""
                                        options={lsRemitido}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                    <Button variant="outlined" fullWidth onClick={() => setOpenReport(true)}>
                                        {TitleButton.Imprimir}
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