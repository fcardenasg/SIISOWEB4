import { useState, Fragment, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';

import ListMedicalFormula from '../Programming/Attention/OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from '../Programming/Attention/OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from '../Programming/Attention/OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import DialogFormula from '../Programming/Attention/OccupationalExamination/Modal/DialogFormula';
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
import ViewPDF from 'components/components/ViewPDF';
import { generateReportOtherAdvice } from '../Programming/Attention/Report/OtherAdvice';
import { GetByMail } from 'api/clients/UserClient';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import HoverSocialCard from 'modules/Programming/Attention/OccupationalExamination/Framingham/HoverSocialCard';

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

const OtherAdvice = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');
    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);

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
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm();
    const { handleSubmit } = methods;

    async function getAll() {
        try {
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

            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TODAS_ASESORIAS);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);

            setLsAtencion([{ id: 0 }]);
        } catch (error) { }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
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

    useEffect(() => {
        getAll();
    }, [])

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAdvice(resultData.id);
            const lsDataUser = await GetByMail(user.email);

            const dataPDFTwo = generateReportOtherAdvice(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PostMedicalAdvice(documento, FormatDate(datos.fecha), 0, datos.idTipoAtencion, lsEmployee.sede,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, datos.idTipoAsesoria, datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, datos.observaciones, datos.recomendaciones, '', DefaultValue.SINREGISTRO_GLOBAL,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertAdvice(DataToUpdate);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setResultData(result.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
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
                title="VISTA DE REPORTE"
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

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="REGISTRAR OTRAS ASESORÍAS"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoAtencion"
                                        label="Tipo Atención"
                                        options={lsTipoAtencion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idMotivo"
                                        label="Motivo"
                                        options={lsMotivo}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoAsesoria"
                                        label="Tipo de Asesoría"
                                        options={tipoAsesoria}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

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
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/otheradvice/list")}>
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

export default OtherAdvice;