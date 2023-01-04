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
import { GetByIdAttention, UpdateAttentions } from 'api/clients/AttentionClient';
import { PutAttention } from 'formatdata/AttentionForm';

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
import { CodCatalogo, DefaultValue, ValidationMessage } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostEvolutionNote } from 'formatdata/EvolutionNoteForm';
import { GetByIdEvolutionNote, InsertEvolutionNote } from 'api/clients/EvolutionNoteClient';
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
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPlantillaClinicHistory from 'components/template/ListPlantillaClinicHistory'
import ListPlantillaEvolutionNote from 'components/template/ListPlantillaEvolutionNote';

const validationSchema = yup.object().shape({
    dx1: yup.string().required(`${ValidationMessage.Requerido}`),
    idConceptoActitud: yup.string().required(`${ValidationMessage.Requerido}`),
});

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },

    { title: 'Historial De Historia Clínica', icons: <MedicalInformationIcon fontSize="small" /> },
    { title: 'Historial De Notas De Evolición', icons: <MedicalServicesIcon fontSize="small" /> },
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
    const [contingencia, setContingencia] = useState('');

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

    const [resultData, setResultData] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

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
            const lsDataReport = await GetByIdEvolutionNote(resultData.id);
            const lsDataUser = await GetByMail(user.email);

            const dataPDFTwo = generateReportEvolutionNote(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200)
                setLsEmployee(lsServerEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
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

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setDocumento(lsServerAtencion.data.documento);
                handleLoadingDocument(lsServerAtencion.data.documento);
                setLsAtencion(lsServerAtencion.data);
            }

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
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PostEvolutionNote(documento, FormatDate(datos.fecha), id, datos.idAtencion, contingencia,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.nota, datos.dx1, datos.dx2, datos.dx3,
                datos.planManejo, datos.idConceptoActitud, DefaultValue.SINREGISTRO_GLOBAL, user.email,
                FormatDate(new Date()), '', FormatDate(new Date()));

            if (textDx1 === '') {
                setOpenError(true);
                setErrorMessage('Por favor, registre por lo menos un Diagnóstico');
            } else {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertEvolutionNote(DataToUpdate);
                    if (result.status === 200) {
                        setOpenUpdate(true);
                        setResultData(result.data);
                    }
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
                            title="NOTA DE EVOLUCIÓN"
                            disabled={true}
                            key={lsEmployee.documento}
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
                                            defaultValue={lsAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idAtencion"
                                            label="Atención"
                                            defaultValue={lsAtencion.atencion}
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
                                            defaultValue=""
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
                                                bug={errors.dx1}
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
                                            defaultValue=""
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
                                            defaultValue=""
                                            options={lsConceptoAptitud}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idConceptoActitud}
                                        />
                                    </FormProvider>
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
                                        <Button disabled={resultData.length !== 0 ? true : false} variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose("PENDIENTE POR ATENCIÓN", lsAtencion)}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
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
        </Fragment>
    );
};

export default UpdateEvolutionNote;