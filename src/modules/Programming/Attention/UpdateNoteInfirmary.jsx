import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { ParamCloseCase } from 'components/alert/AlertAll';

import HoverSocialCard from './OccupationalExamination/Framingham/HoverSocialCard';
import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';
import { GetByIdAttention, UpdateEstadoRegistroAtencion, ValidateIdRegistroAtencion } from 'api/clients/AttentionClient';

import ListMedicalFormula from './OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from './OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from './OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import DialogFormula from './OccupationalExamination/Modal/DialogFormula';
import { ColorDrummondltd } from 'themes/colors';

import ViewEmployee from 'components/views/ViewEmployee';
import InputDatePicker from 'components/input/InputDatePicker';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { PutNoteInfirmary } from 'formatdata/NoteInfirmaryForm';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue, CodRegistroAtencion } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdNoteInfirmary, InsertNoteInfirmary, UpdateNoteInfirmarys } from 'api/clients/NoteInfirmaryClient';
import Cargando from 'components/loading/Cargando';
import InputOnChange from 'components/input/InputOnChange';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { generateReportNursing } from './Report/Nursing';
import { GetByMail } from 'api/clients/UserClient';
import ViewPDF from 'components/components/ViewPDF';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';

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

const UpdateNoteInfirmary = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsAtencionn, setLsAtencionn] = useState([]);
    const [dataNotaEnfermeria, setDataNotaEnfermeria] = useState([]);
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

    const [textDx1, setTextDx1] = useState('');
    const [textDx2, setTextDx2] = useState('');
    const [textDx3, setTextDx3] = useState('');

    const [lsDx1, setLsDx1] = useState([]);
    const [lsDx2, setLsDx2] = useState([]);
    const [lsDx3, setLsDx3] = useState([]);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [documento, setDocumento] = useState('');
    const [openTemplate, setOpenTemplate] = useState(false);
    const [procedimiento, setProcedimiento] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsProcedimiento, setLsProcedimiento] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);

    const [resultData, setResultData] = useState(0);
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm();

    const { handleSubmit } = methods;

    //Metodo Imprimir
    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdNoteInfirmary(resultData);
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReportNursing(lsDataReport.data, lsDataUser.data, user.namesede);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx1(lsServerCie11.data);
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
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx2(lsServerCie11.data);
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
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx3(lsServerCie11.data);
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

    const handleAtencion = async (sede, tipoAtencion) => {
        if (sede === DefaultValue.SEDE_PUERTO && tipoAtencion === DefaultValue.TIPO_ATENCION_ENFERMERIA) {

            var resultMapsTipoAM = [];
            var resultMapsTipoAE = [];
            /* AQUÍ SE CARGAN LAS ATENCIONES MÉDICAS */
            var lsGetTipoAtencionMedica = await GetAllBySubTipoCatalogo(0, 0, 'SER01', 5);
            if (lsGetTipoAtencionMedica.status === 200) {
                resultMapsTipoAM = lsGetTipoAtencionMedica.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
            }

            /* AQUÍ SE CARGAN LAS ATENCIONES DE ENFERMERIA */
            const lsServerAtencionn = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA);
            if (lsServerAtencionn.status === 200) {
                resultMapsTipoAE = lsServerAtencionn.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
            }

            const arrayAtencion = resultMapsTipoAE.concat(resultMapsTipoAM);
            setLsAtencionn(arrayAtencion);

        } else {

            const lsServerAtencionn = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA);
            if (lsServerAtencionn.status === 200) {
                var resultAtencionn = lsServerAtencionn.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsAtencionn(resultAtencionn);
            }
        }
    }

    async function getAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setLsAtencion(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);
                handleAtencion(lsServerAtencion.data.sede, lsServerAtencion.data.tipo);

                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);
            }

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerProcedimiento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PROCEDIMIENTO_ENFERMERIA);
            var resultProcedimiento = lsServerProcedimiento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsProcedimiento(resultProcedimiento);

            const lsServerData = await ValidateIdRegistroAtencion(id, CodRegistroAtencion.NotaEnfermeria);
            if (lsServerData.status === 200) {
                setDataNotaEnfermeria(lsServerData.data.entities);
                setResultIdRegistroAtencion(lsServerData.data.estado);
                setResultData(lsServerData.data.entities.id);
                setProcedimiento(JSON.parse(lsServerData.data.entities.procedimientos));

                setTextDx1(lsServerData.data.entities.dx1);
                setTextDx2(lsServerData.data.entities.dx2);
                setTextDx3(lsServerData.data.entities.dx3);

                if (lsServerData.data.entities.dx1 !== "") {
                    const lsServerCie11Dx1 = await GetAllByCodeOrName(lsServerData.data.entities.dx1);
                    setLsDx1(lsServerCie11Dx1.data);
                }

                if (lsServerData.data.entities.dx2 !== "") {
                    const lsServerCie11Dx2 = await GetAllByCodeOrName(lsServerData.data.entities.dx2);
                    setLsDx2(lsServerCie11Dx2.data);
                }

                if (lsServerData.data.entities.dx3 !== "") {
                    const lsServerCie11Dx3 = await GetAllByCodeOrName(lsServerData.data.entities.dx3);
                    setLsDx3(lsServerCie11Dx3.data);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const UpdateToInsert = PutNoteInfirmary(resultData, id, documento, datos.fecha, datos.idAtencion, datos.idContingencia, datos.dx1,
                datos.dx2, datos.dx3, JSON.stringify(procedimiento), datos.notaEnfermedad, user.nameuser, undefined, user.nameuser, undefined, procedimiento);

            if (resultIdRegistroAtencion) {
                const result1 = await UpdateNoteInfirmarys(UpdateToInsert);
                if (result1.status === 200) {
                    setOpenUpdate(true);
                    const lsServerValidate = await ValidateIdRegistroAtencion(id, CodRegistroAtencion.NotaEnfermeria)
                    if (lsServerValidate.status === 200) {
                        setResultIdRegistroAtencion(lsServerValidate.data.estado);
                    }
                }
            } else {
                const result2 = await InsertNoteInfirmary(UpdateToInsert);
                if (result2.status === 200) {
                    setResultData(result2.data);
                    setOpenUpdate(true);

                    const lsServerValidate = await ValidateIdRegistroAtencion(id, CodRegistroAtencion.NotaEnfermeria)
                    if (lsServerValidate.status === 200) {
                        setResultIdRegistroAtencion(lsServerValidate.data.estado);
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
            <MessageSuccess open={openUpdate} onClose={() => setOpenUpdate(false)} />
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
                            title="Nota De Enfermería"
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
                                    <SubCard darkTitle title={<Typography variant="h4">Registrar La Atención</Typography>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <FormProvider {...methods}>
                                                    <InputDatePicker
                                                        label="Fecha"
                                                        name="fecha"
                                                        defaultValue={lsAtencion?.fecha}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idAtencion"
                                                        label="Atención"
                                                        defaultValue={lsAtencion?.atencion}
                                                        options={lsAtencionn}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idContingencia"
                                                        label="Contingencia"
                                                        defaultValue={dataNotaEnfermeria?.idContingencia}
                                                        options={lsContingencia}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title={<Typography variant="h4">Procedimiento</Typography>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <InputMultiSelects
                                                    fullWidth
                                                    onChange={(event, value) => setProcedimiento(value)}
                                                    value={procedimiento}
                                                    label="Procedimientos"
                                                    options={lsProcedimiento}
                                                />
                                            </Grid>

                                            {lsAtencion.sede === DefaultValue.SEDE_PUERTO &&
                                                lsAtencion.tipo === DefaultValue.TIPO_ATENCION_ENFERMERIA ?
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
                                                                defaultValue={dataNotaEnfermeria?.dx1}
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
                                                                defaultValue={dataNotaEnfermeria?.dx2}
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
                                                                defaultValue={dataNotaEnfermeria?.dx3}
                                                                options={lsDx3}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </FormProvider>
                                                    </Grid>
                                                </Fragment> : null
                                            }

                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={dataNotaEnfermeria?.notaEnfermedad}
                                                        fullWidth
                                                        name="notaEnfermedad"
                                                        label="Nota"
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

                                        <Grid container spacing={2} sx={{ pt: 4 }}>
                                            <Grid item xs={2}>
                                                <AnimateButton>
                                                    <Button variant="outlined" fullWidth onClick={handleClickReport}>
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
                            </Grid>
                        </StickyActionBar>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default UpdateNoteInfirmary;