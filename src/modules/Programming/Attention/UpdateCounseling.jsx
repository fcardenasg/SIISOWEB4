import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import swal from 'sweetalert';
import { ParamCloseCase } from 'components/alert/AlertAll';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { GetByIdAttention, UpdateAttentions } from 'api/clients/AttentionClient';
import { PutAttention } from 'formatdata/AttentionForm';
import ViewReport from './OccupationalExamination/Report/ViewReport';

import useAuth from 'hooks/useAuth';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import Cargando from 'components/loading/Cargando';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateCounseling = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [timeWait, setTimeWait] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [estadoAsesoria, setEstadoAsesoria] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [causaAsesoria, setCausaAsesoria] = useState([]);

    const handleUpdateAttentionClose = async (estadoPac = '', lsDataUpdate = []) => {
        try {
            const DataToUpdate = PutAttention(id, lsDataUpdate.documento, lsDataUpdate.fecha, lsDataUpdate.sede, lsDataUpdate.tipo,
                lsDataUpdate.atencion, lsDataUpdate.estadoCaso, lsDataUpdate.observaciones, lsDataUpdate.numeroHistoria, estadoPac,
                lsDataUpdate.contingencia, lsDataUpdate.turno, lsDataUpdate.diaTurno, lsDataUpdate.motivo, lsDataUpdate.medico,
                lsDataUpdate.docSolicitante, lsDataUpdate.talla, lsDataUpdate.peso, lsDataUpdate.iMC, lsDataUpdate.usuarioCierreAtencion,
                lsDataUpdate.fechaDigitacion, lsDataUpdate.fechaCierreAtencion, lsDataUpdate.duracion,
                lsDataUpdate.usuarioRegistro, lsDataUpdate.fechaRegistro, lsDataUpdate.usuarioModifico, lsDataUpdate.fechaModifico);

            await UpdateAttentions(DataToUpdate);

            if (estadoPac === "ATENDIDO") {
                swal(ParamCloseCase).then(async (willDelete) => {
                    if (willDelete)
                        navigate("/programming/list");
                });
            } else if (estadoPac === "PENDIENTE POR ATENCIÓN")
                navigate("/programming/list");

        } catch (error) { }
    }

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                await handleUpdateAttentionClose("ESTÁ SIENDO ATENDIDO", lsServerAtencion.data);

                setLsAtencion(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);
                handleLoadingDocument(lsServerAtencion.data.documento);
            }

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoPsicologia);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoCaso);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoCaso(resultEstadoCaso);

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAsesoria);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerEstadoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoAsesoria);
            var resultEstadoAsesoria = lsServerEstadoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEstadoAsesoria(resultEstadoAsesoria);

            const lsServerCausaAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CausaAsesoria);
            var resultCausaAsesoria = lsServerCausaAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCausaAsesoria(resultCausaAsesoria);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const methods = useForm();
    const { handleSubmit } = methods;

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostMedicalAdvice(documento, FormatDate(datos.fecha), id, DefaultData.AsesoriaPsicologica, lsEmployee.sede,
                DefaultValue.SINREGISTRO_GLOBAL, datos.idEstadoCaso, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.idTipoAsesoria, datos.idMotivo, datos.idCausa, datos.motivoConsulta, datos.concepto, datos.pautasSeguir,
                datos.idEstadoAsesoria, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToInsert);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    setTimeout(() => {
        if (lsAtencion.length !== 0)
            setTimeWait(true);
    }, 1500);

    return (
        <Fragment>
            <MessageSuccess open={openUpdate} onClose={() => setOpenUpdate(false)} />
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
                <ViewReport />
            </ControlModal>

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="ASESORÍA PSICOLÓGICA"
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
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idEstadoCaso"
                                            label="Estado del Caso"
                                            defaultValue={lsAtencion.estadoCaso}
                                            options={lsEstadoCaso}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
                                            defaultValue={lsAtencion.motivo}
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCausa"
                                            label="Causa de Asesoría"
                                            defaultValue=""
                                            options={causaAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTipoAsesoria"
                                            label="Tipo Asesoría"
                                            defaultValue=""
                                            options={tipoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">NOTA</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue=""
                                            name="motivoConsulta"
                                            label="Motivo de consulta"
                                            size={matchesXS ? 'small' : 'medium'}
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

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue=""
                                            name="concepto"
                                            label="Concepto"
                                            size={matchesXS ? 'small' : 'medium'}
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

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue=""
                                            name="pautasSeguir"
                                            label="Pautas a Seguir"
                                            size={matchesXS ? 'small' : 'medium'}
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

                                <Grid item xs={5}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idEstadoAsesoria"
                                            label="Estado"
                                            defaultValue=""
                                            options={estadoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
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
                                        <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose("PENDIENTE POR ATENCIÓN", lsAtencion)}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose("ATENDIDO", lsAtencion)}>
                                            {TitleButton.CerrarCaso}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid> : <Cargando />}
        </Fragment>
    );
};

export default UpdateCounseling;