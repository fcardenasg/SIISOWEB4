import { useState, Fragment, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
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
import { GetByIdAttention, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';
import { PutEstadoAtencion } from 'formatdata/AttentionForm';

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
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { useParams } from 'react-router-dom';
import Cargando from 'components/loading/Cargando';
import ViewPDF from 'components/components/ViewPDF';
import { generateReportOtherAdvice } from './Report/OtherAdvice';
import { GetByMail } from 'api/clients/UserClient';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
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

const UpdateOtherAdvice = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');
    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);

    const [timeWait, setTimeWait] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openFormula, setOpenFormula] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [listMedicalFormula, setListMedicalFormula] = useState(true);
    const [newMedicalFormula, setNewMedicalFormula] = useState(false);
    const [updateMedicalFormula, setUpdateMedicalFormula] = useState(false);
    const [numberId, setNumberId] = useState('');

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

    const methods = useForm();
    const { handleSubmit } = methods;

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setLsAtencion(lsServerAtencion.data);
                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);
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
        } catch (error) { }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
    }

    const handleUpdateAttentionClose = async (estadoPac = '') => {
        try {
            const usuarioCierre = estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO ? '' : lsAtencion.usuarioCierreAtencion;

            const DataToUpdate = PutEstadoAtencion(id, estadoPac, usuarioCierre);
            await UpdateEstadoRegistroAtencion(DataToUpdate);

            if (estadoPac === DefaultValue.ATENCION_ATENDIDO) {
                swal(ParamCloseCase).then(async (willDelete) => {
                    if (willDelete)
                        navigate("/programming/list");
                });
            } else if (estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO)
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
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReportOtherAdvice(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PostMedicalAdvice(documento, FormatDate(datos.fecha), id, lsAtencion.atencion, lsAtencion.sede,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, datos.idTipoAsesoria, datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, datos.observaciones, datos.recomendaciones, '', DefaultValue.SINREGISTRO_GLOBAL,
                user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToUpdate);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setResultData(result.data);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
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

            <FullScreenDialog
                open={openApuntesPersonales}
                title="APUNTES PERSONALES"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
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

            <ControlModal
                title={"Ordenes Medicas - " + titleModal}
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
                title="Ordenes Medicas"
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

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Otras Asesorías"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Registrar La  atención</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={FormatDate(lsAtencion.fecha)}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTipoAsesoria"
                                            label="Tipo de Asesoría"
                                            defaultValue=""
                                            options={tipoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title={<Typography variant="h4">Descripción De La consulta</Typography>}>
                                        <Grid item xs={12}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    multiline
                                                    rows={20}
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
                                                onClick={() => setOpenApuntesPersonales(true)}
                                                icons={DetailIcons[1].icons}
                                            />

                                            <DetailedIcon
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
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
                                                onClick={() => setOpenApuntesPersonales(true)}
                                                icons={DetailIcons[1].icons}
                                            />

                                            <DetailedIcon
                                                title={DetailIcons[2].title}
                                                onClick={() => setOpen(true)}
                                                icons={DetailIcons[2].icons}
                                            />
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={resultData.length !== 0 ? true : false} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={resultData.length === 0 ? true : false} variant="outlined" fullWidth onClick={handleClickReport}>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => setOpenFormula(true)}>
                                            {TitleButton.OrdenesMedicas}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_PENDIENTE_ATENDIDO)}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_ATENDIDO)}>
                                            {TitleButton.CerrarCaso}
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

export default UpdateOtherAdvice;