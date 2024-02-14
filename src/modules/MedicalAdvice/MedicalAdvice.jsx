import { useState, Fragment, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Tooltip,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

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
import { GetByIdAdvice, SaveAdvice } from 'api/clients/AdviceClient';
import { GetAllBySubTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData, DefaultValue, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ViewPDF from 'components/components/ViewPDF';
import { generateReport } from '../Programming/Attention/Report/MedicalAdvice';
import { GetByMail } from 'api/clients/UserClient';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SelectOnChange from 'components/input/SelectOnChange';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import UpdateAttMedicalAdvice from 'modules/Programming/Attention/AttentionMedicalAdvice/UpdateAttMedicalAdvice';
import HoverSocialCard from 'modules/Programming/Attention/OccupationalExamination/Framingham/HoverSocialCard';
import InputCheck from 'components/input/InputCheck';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';

const validationSchema = yup.object().shape({
    idSubmotivo: yup.string().required(ValidationMessage.Requerido),
});

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

const MedicalAdvice = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [extenderDescripcion, setExtenderDescripcion] = useState(false);
    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);
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

    const [resultData, setResultData] = useState(0);
    const [dataPDF, setDataPDF] = useState(null);

    const [userEdit, setUserEdit] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServerTipoAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.ASME_TIPOASESORIA);
            setTipoAsesoria(lsServerTipoAsesoria.data);

            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.MotivoMedica);
            setLsMotivo(lsServerMotivo.data);
            setLsCodigoMotivo(lsServerMotivo.data);

            setLsAtencion([{ id: 0 }]);
        } catch (error) { }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
                    }

                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee([]);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAdvice(resultData);
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data, extenderDescripcion);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleCallClick = () => {
        setUserEdit(true);
    }

    const handleMotivo = async (event) => {
        try {
            setTextMotivo(event.target.value);

            var lsResulCode = String(lsCodigoMotivo.filter(code => code.value === event.target.value).map(code => code.codigo));
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

    const handleClickClear = async () => {
        reset();
        setResultData(0);
        setLsEmployee([]);
        setDocumento('');
        setExtenderDescripcion(false);
        setTextMotivo('');
        setTextTipoAsesoria('');
        setLsSubmotivo([]);
    }

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutMedicalAdvice(resultData, documento, datos.fecha, 0, DefaultData.ASESORIA_MEDICA, lsEmployee.sede, undefined, undefined,
                undefined, undefined, textTipoAsesoria, textMotivo, datos.idSubmotivo, undefined, datos.observaciones, datos.recomendaciones, '', undefined,
                user.nameuser, undefined, undefined, undefined);

            const result = await SaveAdvice(DataToUpdate);
            if (result.status === 200) {
                if (result.data === Message.ErrorDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                } else if (result.data === Message.NoExisteDocumento) {
                    setOpenError(true);
                    setErrorMessage(Message.NoExisteDocumento);
                } else if (!isNaN(result.data)) {
                    setOpenSuccess(true);
                    setResultData(result.data);
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} message={resultData === 0 ? Message.Guardar : Message.Actualizar} onClose={() => setOpenSuccess(false)} />
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
                            /> : null
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ViewEmployee
                                    key={lsEmployee?.documento}
                                    documento={documento}
                                    onChange={(e) => setDocumento(e.target.value)}
                                    lsEmployee={lsEmployee}
                                    handleDocumento={handleDocumento}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <StickyActionBar
                                    onClickSave={handleSubmit(handleClick)}
                                    onClickUpdate={handleSubmit(handleClick)}
                                    disabledUpdate={resultData === 0 ? true : false}
                                    disabledSave={resultData !== 0 ? true : false}
                                    showButton={false}
                                    threshold={568}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputDatePicker
                                                    label="Fecha"
                                                    name="fecha"
                                                    defaultValue={new Date()}
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
                                                    bug={errors.idSubmotivo}
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
                                            <SubCard darkTitle title={<Typography variant="h4">Descripción De La Consulta</Typography>}>
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

                                                    <Grid item xs={2}>
                                                        <InputCheck
                                                            onChange={(e) => setExtenderDescripcion(e.target.checked)}
                                                            checked={extenderDescripcion}
                                                            label="Extender Reporte"
                                                            name="extenderDescripcion"
                                                            size={30}
                                                            defaultValue={false}
                                                        />
                                                    </Grid>
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
                                </StickyActionBar>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button disabled={resultData === 0 ? true : false} variant="outlined" fullWidth onClick={handleClickReport}>
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
                                    <Button variant="outlined" fullWidth onClick={handleClickClear}>
                                        {TitleButton.Limpiar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/medicaladvice/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </UpdateAttMedicalAdvice>

            </Fragment>
        </Fragment>
    );
};

export default MedicalAdvice;