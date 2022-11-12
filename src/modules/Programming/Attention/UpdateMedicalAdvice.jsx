import { useState, Fragment, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Tooltip,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { ParamCloseCase } from 'components/alert/AlertAll';
import { FormProvider, useForm } from 'react-hook-form';

import HoverSocialCard from './OccupationalExamination/Framingham/HoverSocialCard';
import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';
import { GetByIdAttention, UpdateAttentions } from 'api/clients/AttentionClient';
import { PutAttention } from 'formatdata/AttentionForm';

import ListMedicalFormula from './OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from './OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from './OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import DialogFormula from './OccupationalExamination/Modal/DialogFormula';
import { ColorDrummondltd } from 'themes/colors';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import ViewEmployee from 'components/views/ViewEmployee';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdAdvice, InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { useParams } from 'react-router-dom';
import Cargando from 'components/loading/Cargando';
import ViewPDF from 'components/components/ViewPDF';
import { generateReport } from './Report/MedicalAdvice';
import { GetByMail } from 'api/clients/UserClient';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SelectOnChange from 'components/input/SelectOnChange';
import UpdateAttMedicalAdvice from './AttentionMedicalAdvice/UpdateAttMedicalAdvice';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const dataMedicalOrders = [
    {
        open: true,
        title: 'Formula',
        subtitle: 'Formula',
        iconPrimary: AssignmentIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        open: true,
        title: 'Laboratorio',
        subtitle: 'Laboratorio',
        iconPrimary: BiotechIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        open: true,
        title: 'Imagenes',
        subtitle: 'Imagenes',
        iconPrimary: ImageIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        open: true,
        title: 'Examenes',
        subtitle: 'Examenes',
        iconPrimary: FolderOpenIcon,
        color: ColorDrummondltd.RedDrummond,
    },
]

const UpdateMedicalAdvice = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [timeWait, setTimeWait] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openFormula, setOpenFormula] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [listMedicalFormula, setListMedicalFormula] = useState(true);
    const [newMedicalFormula, setNewMedicalFormula] = useState(false);
    const [updateMedicalFormula, setUpdateMedicalFormula] = useState(false);
    const [numberId, setNumberId] = useState('');

    const [textTipoAsesoria, setTextTipoAsesoria] = useState('');
    const [textMotivo, setTextMotivo] = useState('');
    const [lsSubmotivo, setLsSubmotivo] = useState([]);
    const [lsCodigoMotivo, setLsCodigoMotivo] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [resultData, setResultData] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const [userEdit, setUserEdit] = useState(false);

    const methods = useForm();
    const { handleSubmit } = methods;

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setLsAtencion(lsServerAtencion.data);
                handleLoadingDocument(lsServerAtencion.data.documento);
                setDocumento(lsServerAtencion.data.documento);
            }

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ASME_TIPOASESORIA);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoMedica);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);
            setLsCodigoMotivo(lsServerMotivo.data.entities);
        } catch (error) { }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
    }

    const handleUpdateAttentionClose = async (estadoPac = '', lsDataUpdate = []) => {
        try {
            const usuarioCierre = estadoPac === "PENDIENTE POR ATENCIÓN" ? '' : lsDataUpdate.usuarioCierreAtencion;

            const DataToUpdate = PutAttention(id, lsDataUpdate.documento, lsDataUpdate.fecha, lsDataUpdate.sede, lsDataUpdate.tipo,
                lsDataUpdate.atencion, lsDataUpdate.estadoCaso, lsDataUpdate.observaciones, lsDataUpdate.numeroHistoria, estadoPac,
                lsDataUpdate.contingencia, lsDataUpdate.turno, lsDataUpdate.diaTurno, lsDataUpdate.motivo, lsDataUpdate.medico,
                lsDataUpdate.docSolicitante, lsDataUpdate.talla, lsDataUpdate.peso, lsDataUpdate.iMC, usuarioCierre,
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

    useEffect(() => {
        getAll();
    }, [])

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAdvice(resultData.id);
            const lsDataUser = await GetByMail(user.email);

            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleCallClick = () => {
        setUserEdit(true);
    }

    const handleMotivo = async (event) => {
        try {
            setTextMotivo(event.target.value);

            var lsResulCode = String(lsCodigoMotivo.filter(code => code.idCatalogo === event.target.value).map(code => code.codigo));
            var lsSubmotivo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 5);

            if (lsSubmotivo.status === 200) {
                var submotivo = lsSubmotivo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsSubmotivo(submotivo);
            }
        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PostMedicalAdvice(documento, FormatDate(datos.fecha), id, DefaultData.ASESORIA_MEDICA,
                lsAtencion.sede, DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL,
                DefaultData.SINREGISTRO_GLOBAL, textTipoAsesoria, textMotivo, datos.idSubmotivo, DefaultData.SINREGISTRO_GLOBAL,
                datos.observaciones, datos.recomendaciones, '', DefaultData.SINREGISTRO_GLOBAL, user.email, FormatDate(new Date()),
                '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToUpdate);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setResultData(result.data);
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
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <ControlModal
                title={"Orden de " + titleModal}
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setListMedicalFormula(true);
                    setNewMedicalFormula(false);
                    setUpdateMedicalFormula(false);
                    setNewMedicalFormula(false)
                }}
                maxWidth="md"
            >
                {newMedicalFormula ?
                    <MedicalFormula
                        contingencia={DefaultValue.SINREGISTRO_GLOBAL}
                        setUpdateMedicalFormula={setUpdateMedicalFormula}
                        setListMedicalFormula={setListMedicalFormula}
                        setNewMedicalFormula={setNewMedicalFormula}
                        tipoOrden={titleModal}
                        lsEmployee={lsEmployee}
                        setDocumento={setDocumento}
                        documento={documento}
                        lsAtencion={lsAtencion}
                    />
                    : listMedicalFormula ?
                        <ListMedicalFormula
                            documento={documento}
                            tipoOrden={titleModal}
                            setListMedicalFormula={setListMedicalFormula}
                            setNewMedicalFormula={setNewMedicalFormula}
                            setUpdateMedicalFormula={setUpdateMedicalFormula}
                            setNumberId={setNumberId}
                        />
                        : updateMedicalFormula ?
                            <UpdateMedicalFormula
                                contingencia={DefaultValue.SINREGISTRO_GLOBAL}
                                setListMedicalFormula={setListMedicalFormula}
                                setNewMedicalFormula={setNewMedicalFormula}
                                setUpdateMedicalFormula={setUpdateMedicalFormula}
                                numberId={numberId}
                                lsEmployee={lsEmployee}
                                lsAtencion={lsAtencion}
                                tipoOrden={titleModal}
                            /> : ''
                }
            </ControlModal>

            <DialogFormula
                title="TIPO DE ORDEN"
                open={openFormula}
                handleCloseDialog={() => setOpenFormula(false)}
            >
                {dataMedicalOrders.map(data =>
                    <Grid item xs={12}>
                        <HoverSocialCard
                            onClick={() => { setOpenForm(data.open); setTitleModal(data.title) }}
                            secondary={data.subtitle}
                            iconPrimary={data.iconPrimary}
                            color={data.color}
                        />
                    </Grid>
                )}
            </DialogFormula>

            <Fragment>

                <UpdateAttMedicalAdvice setUserEdit={setUserEdit} userEdit={userEdit}>
                    <Grid item xs={12}>
                        {timeWait ?
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ViewEmployee
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
                                            <Grid item xs={6}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha"
                                                        name="fecha"
                                                        defaultValue={lsAtencion.fecha}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <SelectOnChange
                                                    name="idMotivo"
                                                    label="Motivo"
                                                    onChange={handleMotivo}
                                                    value={textMotivo}
                                                    options={lsMotivo}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idSubmotivo"
                                                        label="Submotivo"
                                                        options={lsSubmotivo}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={textTipoAsesoria === DefaultValue.VIDEO_LLAMADA ? 5 : 6}>
                                                <SelectOnChange
                                                    name="idTipoAsesoria"
                                                    label="Tipo de Asesoría"
                                                    onChange={(e) => setTextTipoAsesoria(e?.target.value)}
                                                    value={textTipoAsesoria}
                                                    options={tipoAsesoria}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            {textTipoAsesoria === DefaultValue.VIDEO_LLAMADA ?
                                                <Grid item xs={1}>
                                                    <Tooltip title="Video llamada">
                                                        <Button color="error" sx={{ color: ColorDrummondltd.RedDrummond }}
                                                            variant="outlined" onClick={handleCallClick}
                                                        >
                                                            <VideoCallIcon fontSize="large" />
                                                        </Button>
                                                    </Tooltip>
                                                </Grid> : null
                                            }

                                            <Grid item xs={12}>
                                                <SubCard darkTitle title={<Typography variant="h4">DESCRIPCIÓN DE LA CONSULTA</Typography>}>
                                                    <Grid item xs={12}>
                                                        <FormProvider {...methods}>
                                                            <InputText
                                                                multiline
                                                                rows={4}
                                                                defaultValue=""
                                                                fullWidth
                                                                name="observaciones"
                                                                label="Descripción"
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

                                                    <Grid item xs={12} sx={{ pt: 2 }}>
                                                        <FormProvider {...methods}>
                                                            <InputText
                                                                multiline
                                                                rows={4}
                                                                defaultValue=""
                                                                fullWidth
                                                                name="recomendaciones"
                                                                label="Recomendaciones"
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
                                                </SubCard>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ pt: 4 }}>
                                            <Grid item xs={2.4}>
                                                <AnimateButton>
                                                    <Button disabled={resultData.length !== 0 ? true : false} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                                        {TitleButton.Guardar}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={2.4}>
                                                <AnimateButton>
                                                    <Button disabled={resultData.length === 0 ? true : false} variant="outlined" fullWidth onClick={handleClickReport}>
                                                        {TitleButton.Imprimir}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={2.4}>
                                                <AnimateButton>
                                                    <Button variant="outlined" fullWidth onClick={() => setOpenFormula(true)}>
                                                        {TitleButton.OrdenesMedicas}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={2.4}>
                                                <AnimateButton>
                                                    <Button disabled={resultData.length !== 0 ? true : false} variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose("PENDIENTE POR ATENCIÓN", lsAtencion)}>
                                                        {TitleButton.Cancelar}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={2.4}>
                                                <AnimateButton>
                                                    <Button disabled={resultData.length === 0 ? true : false} variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose("ATENDIDO", lsAtencion)}>
                                                        {TitleButton.CerrarCaso}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid> : <Cargando />
                        }
                    </Grid>
                </UpdateAttMedicalAdvice>

            </Fragment>
        </Fragment>
    );
};

export default UpdateMedicalAdvice;