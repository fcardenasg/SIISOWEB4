import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
} from '@mui/material';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import swal from 'sweetalert';
import { ParamCloseCase } from 'components/alert/AlertAll';

import HoverSocialCard from './OccupationalExamination/Framingham/HoverSocialCard';
import ControlModal from 'components/controllers/ControlModal';
import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';
import { GetByIdAttention, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';

import ListMedicalFormula from './OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from './OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from './OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import DialogFormula from './OccupationalExamination/Modal/DialogFormula';
import { ColorDrummondltd } from 'themes/colors';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from 'hooks/useAuth';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import Cargando from 'components/loading/Cargando';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostEvolutionNote, PutEvolutionNote } from 'formatdata/EvolutionNoteForm';
import { GetByIdEvolutionNote, GetIdRegistroAtencionEvolutionNote, InsertEvolutionNote, UpdateEvolutionNotes, ValidateIdRegistroAtencionEvolutionNote } from 'api/clients/EvolutionNoteClient';
import { FormatDate } from 'components/helpers/Format';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import { generateReportEvolutionNote } from './Report/EvolutionNote';
import { GetByMail } from 'api/clients/UserClient';
import ViewPDF from 'components/components/ViewPDF';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import ListExamenesPara from 'components/template/ListExamenesPara';
import ListExamenesFisico from 'components/template/ListExamenesFisico';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPlantillaClinicHistory from 'components/template/ListPlantillaClinicHistory'
import ListPlantillaEvolutionNote from 'components/template/ListPlantillaEvolutionNote';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import InputCheck from 'components/input/InputCheck';

const validateLastData = (data, tipoCampo = "bool") => {
    if (tipoCampo === "bool") {
        if (data === undefined)
            return false;
        else return data;

    } else if (tipoCampo === "string") {
        if (data === undefined)
            return undefined;
        else return data;

    } else if (tipoCampo === "date") {
        if (data === null)
            return null;
        else return FormatDate(data);

    } else if (tipoCampo === "number") {
        if (data === undefined) {
            return undefined;
        }
        else if (data === DefaultValue.SINREGISTRO_GLOBAL) {
            return undefined;
        }
        else {
            return data;
        }
    }
}

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },

    { title: 'Historial De Historia Clínica', icons: <MedicalInformationIcon fontSize="small" /> },
    { title: 'Historial De Nota De Evolución', icons: <MedicalServicesIcon fontSize="small" /> },
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

const UpdateEvolutionNote = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [extenderDescripcion, setExtenderDescripcion] = useState(false);
    const [resultIdRegistroAtencion, setResultIdRegistroAtencion] = useState(false);
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
    const [contingencia, setContingencia] = useState(undefined);

    const [textDx1, setTextDx1] = useState('');
    const [textDx2, setTextDx2] = useState('');
    const [textDx3, setTextDx3] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [lsDx2, setLsDx2] = useState([]);
    const [lsDx3, setLsDx3] = useState([]);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [documento, setDocumento] = useState('');
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openExamen, setOpenExamen] = useState(false);
    const [openExamenFisico, setOpenExamenFisico] = useState(false);
    const [openNotaEvolucion, setOpenNotaEvolucion] = useState(false);
    const [openHistoriaClinica, setOpenHistoriaClinica] = useState(false);

    const [lsAtencionn, setLsAtencionn] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);

    const [resultData, setResultData] = useState('');
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm();

    const { handleSubmit } = methods;

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

    const handleDx3 = async (event) => {
        try {
            setTextDx3(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx3(resultCie11);
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

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdEvolutionNote(resultData);
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReportEvolutionNote(lsDataReport.data, lsDataUser.data, extenderDescripcion);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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

    const handleUpdateAttentionClose = async (estadoPac) => {
        try {
            const DataToUpdate = {
                id: id,
                estadoPac: estadoPac,
                usuario: estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO ? '' : user?.nameuser
            }

            if (estadoPac === DefaultValue.ATENCION_ATENDIDO) {
                swal(ParamCloseCase).then(async (willDelete) => {
                    if (willDelete) {
                        await UpdateEstadoRegistroAtencion(DataToUpdate);
                        navigate('/programming/list');
                    }
                });
            } else if (estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO) {
                await UpdateEstadoRegistroAtencion(DataToUpdate);
                navigate('/programming/list');
            }
        } catch (error) { }
    }

    async function getAll() {
        try {
            const lsServerAtencionn = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION);
            var resultAtencion = lsServerAtencionn.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAtencionn(resultAtencion);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerConceptoAptitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_CONCEP_ACTITUD);
            var resultConceptoAptitud = lsServerConceptoAptitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoAptitud(resultConceptoAptitud);


            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);
                setDocumento(lsServerAtencion.data.documento);
                setLsAtencion(lsServerAtencion.data);

                const lsServerValidate = await ValidateIdRegistroAtencionEvolutionNote(id);
                if (lsServerValidate.status === 200) {
                    setResultIdRegistroAtencion(lsServerValidate.data);
                }

                if (lsServerValidate.data) {
                    const lsServerDataUpdate = await GetIdRegistroAtencionEvolutionNote(id);
                    setLsAtencion(lsServerDataUpdate.data);
                    setResultData(lsServerDataUpdate.data.id);

                    if (lsServerDataUpdate.data.idContingencia !== DefaultValue.SINREGISTRO_GLOBAL) {
                        setContingencia(lsServerDataUpdate.data.idContingencia);
                    }
                } else {
                    setLsAtencion(lsServerAtencion.data);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [id]);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostEvolutionNote(documento, FormatDate(datos.fecha), id, datos.atencion, contingencia,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.nota, datos.dx1, datos.dx2, datos.dx3,
                datos.planManejo, datos.idConceptoActitud, DefaultValue.SINREGISTRO_GLOBAL, user.nameuser,
                FormatDate(new Date()), '', FormatDate(new Date()));

            const DataToUpdate = PutEvolutionNote(resultData, documento, FormatDate(datos.fecha), id, datos.atencion, contingencia,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.nota, datos.dx1, datos.dx2, datos.dx3,
                datos.planManejo, datos.idConceptoActitud, DefaultValue.SINREGISTRO_GLOBAL, lsAtencion.usuarioRegistro,
                lsAtencion.fechaRegistro, user.nameuser, FormatDate(new Date()));

            if (resultIdRegistroAtencion) {
                const result1 = await UpdateEvolutionNotes(DataToUpdate);
                if (result1.status === 200) {
                    setResultData(result1.data.id);
                    setOpenUpdate(true);

                    const lsServerValidate = await ValidateIdRegistroAtencionEvolutionNote(id);
                    if (lsServerValidate.status === 200) {
                        setResultIdRegistroAtencion(lsServerValidate.data);
                    }
                }
            } else {
                const result2 = await InsertEvolutionNote(DataToInsert);
                if (result2.status === 200) {
                    setResultData(result2.data.id);
                    setOpenUpdate(true);

                    const lsServerValidate = await ValidateIdRegistroAtencionEvolutionNote(id);
                    if (lsServerValidate.status === 200) {
                        setResultIdRegistroAtencion(lsServerValidate.data);
                    }
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
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
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
                open={openApuntesPersonales}
                title="APUNTES PERSONALES"
                handleClose={() => setOpenApuntesPersonales(false)}
            >
                <ListPersonalNotesAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openExamen}
                title="VISTA DE EXAMENES PARACLÍNICOS"
                handleClose={() => setOpenExamen(false)}
            >
                <ListExamenesPara documento={documento} />
            </FullScreenDialog>

            <FullScreenDialog
                open={openExamenFisico}
                title="VISTA DE EXAMEN FÍSICO"
                handleClose={() => setOpenExamenFisico(false)}
            >
                <ListExamenesFisico documento={documento} />
            </FullScreenDialog>

            <FullScreenDialog
                open={openNotaEvolucion}
                title="VISTA HISTORICO NOTAS DE EVOLUCIÓN"
                handleClose={() => setOpenNotaEvolucion(false)}
            >
                <ListPlantillaEvolutionNote />
            </FullScreenDialog>

            <FullScreenDialog
                open={openHistoriaClinica}
                title="VISTA HISTORICO DE HISTORIAS CLINICAS"
                handleClose={() => setOpenHistoriaClinica(false)}
            >
                <ListPlantillaClinicHistory />
            </FullScreenDialog>

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
                        contingencia={contingencia}
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
                                contingencia={contingencia}
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

            {timeWait ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Nota De Evolución"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StickyActionBar
                            onClickSave={handleSubmit(handleClick)}
                            onClickUpdate={handleSubmit(handleClick)}
                            disabledUpdate={!resultIdRegistroAtencion}
                            disabledSave={resultIdRegistroAtencion}
                            showButton={false}
                            threshold={510}
                        >
                            <Grid container spacing={2}>
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
                                                        name="atencion"
                                                        label="Atención"
                                                        defaultValue={() => validateLastData(lsAtencion.atencion, "number")}
                                                        options={lsAtencionn}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <SelectOnChange
                                                    name="idContingencia"
                                                    label="Contingencia"
                                                    onChange={(e) => setContingencia(e?.target.value)}
                                                    value={contingencia}
                                                    options={lsContingencia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={() => validateLastData(lsAtencion.nota, "string")}
                                                        fullWidth
                                                        name="nota"
                                                        label="Nota"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        multiline
                                                        rows={6}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[0].title}
                                                    onClick={() => setOpenTemplate(true)}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[1].title}
                                                    onClick={() => setOpenApuntesPersonales(true)}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[2].title}
                                                    onClick={() => setOpen(true)}
                                                    icons={DetailIcons[2].icons}
                                                />

                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[3].title}
                                                    onClick={() => setOpenExamenFisico(true)}
                                                    icons={DetailIcons[3].icons}
                                                />

                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[4].title}
                                                    onClick={() => setOpenExamen(true)}
                                                    icons={DetailIcons[4].icons}
                                                />

                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[5].title}
                                                    onClick={() => setOpenHistoriaClinica(true)}
                                                    icons={DetailIcons[5].icons}
                                                />

                                                <DetailedIcon
                                                    xs={1}
                                                    title={DetailIcons[6].title}
                                                    onClick={() => setOpenNotaEvolucion(true)}
                                                    icons={DetailIcons[6].icons}
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
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard>
                                        <Grid container spacing={2}>
                                            <Fragment>
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
                                                            name="dx1"
                                                            label="Dx1"
                                                            defaultValue=""
                                                            options={lsDx1}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <InputOnChange
                                                        label="Dx 2"
                                                        onKeyDown={handleDx2}
                                                        onChange={(e) => setTextDx2(e.target.value)}
                                                        value={textDx2}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="dx2"
                                                            label="Dx2"
                                                            defaultValue=""
                                                            options={lsDx2}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <InputOnChange
                                                        label="Dx 3"
                                                        onKeyDown={handleDx3}
                                                        onChange={(e) => setTextDx3(e.target.value)}
                                                        value={textDx3}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="dx3"
                                                            label="Dx3"
                                                            defaultValue=""
                                                            options={lsDx3}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>
                                            </Fragment>

                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={() => validateLastData(lsAtencion.planManejo, "string")}
                                                        fullWidth
                                                        name="planManejo"
                                                        label="Plan de Manejo/Observaciones"
                                                        size={matchesXS ? 'small' : 'medium'}
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
                                                    onClick={() => setOpenApuntesPersonales(true)}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={() => setOpen(true)}
                                                    icons={DetailIcons[2].icons}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idConceptoActitud"
                                                        label="Concepto De Aptitud Psicofísica"
                                                        defaultValue={() => validateLastData(lsAtencion.idConceptoActitud, "number")}
                                                        options={lsConceptoAptitud}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ pt: 4 }}>
                                            <Grid item xs={2}>
                                                <AnimateButton>
                                                    <Button disabled={!resultIdRegistroAtencion} variant="outlined" fullWidth onClick={handleClickReport}>
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
                                                    <Button disabled={!resultIdRegistroAtencion} variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_ATENDIDO)}>
                                                        {TitleButton.CerrarCaso}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </StickyActionBar>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment >
    );
};

export default UpdateEvolutionNote;