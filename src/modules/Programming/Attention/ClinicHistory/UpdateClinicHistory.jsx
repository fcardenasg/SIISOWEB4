import AssignmentIcon from '@mui/icons-material/Assignment';
import BiotechIcon from '@mui/icons-material/Biotech';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';
import {
    Alert,
    AlertTitle,
    Button,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByIdAttention, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';
import { ParamCloseCase } from 'components/alert/AlertAll';
import ControlModal from 'components/controllers/ControlModal';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import HoverSocialCard from '../OccupationalExamination/Framingham/HoverSocialCard';

import { ColorDrummondltd } from 'themes/colors';
import ListMedicalFormula from '../OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from '../OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from '../OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import DialogFormula from '../OccupationalExamination/Modal/DialogFormula';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HistoryIcon from '@mui/icons-material/History';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import {
    GetAntecedente,
    GetByIdMedicalHistory,
    GetIdRegistroAtencionMedicalHistory,
    InsertMedicalHistory
} from 'api/clients/MedicalHistoryClient';
import { GetLastRecordOccupationalExamination } from 'api/clients/OccupationalExaminationClient';
import { GetByMail } from 'api/clients/UserClient';
import ViewPDF from 'components/components/ViewPDF';
import ControllerListen from 'components/controllers/ControllerListen';
import DetailedIcon from 'components/controllers/DetailedIcon';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { CodCatalogo, DefaultValue, Message, TitleButton } from 'components/helpers/Enums';
import InputCheck from 'components/input/InputCheck';
import InputDatePicker from 'components/input/InputDatePicker';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import ListExamenesFisico from 'components/template/ListExamenesFisico';
import ListExamenesPara from 'components/template/ListExamenesPara';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useBoolean } from 'hooks/use-boolean';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { generateReportClinicHistory } from '../Report/ClinicHistory';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Apuntes Personales', icons: <NoteAltIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },
    { title: 'Histórico de Antecedente', icons: <HistoryIcon fontSize="small" /> },
    { title: 'Ver Antecedentes HCO', icons: <AddBoxIcon fontSize="small" /> },
]

const dataMedicalOrders = [
    {
        title: 'Formula',
        subtitle: 'Formula',
        iconPrimary: AssignmentIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        title: 'Laboratorio',
        subtitle: 'Laboratorio',
        iconPrimary: BiotechIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        title: 'Imagenes',
        subtitle: 'Imagenes',
        iconPrimary: ImageIcon,
        color: ColorDrummondltd.RedDrummond,
    },
    {
        title: 'Examenes',
        subtitle: 'Examenes',
        iconPrimary: FolderOpenIcon,
        color: ColorDrummondltd.RedDrummond,
    },
]

const UpdateClinicHistory = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const timeWait = useBoolean(false);

    const disabledButton = useBoolean(false);
    const openReport = useBoolean(false);
    const openFormula = useBoolean(false);
    const openApuntesPersonales = useBoolean(false);
    const openAntecedente = useBoolean(false);

    const open = useBoolean(false);
    const openTemplate = useBoolean(false);
    const openExamenParaclinico = useBoolean(false);
    const openExamenFisico = useBoolean(false);
    const openHistoryAntecedente = useBoolean(false);
    const openForm = useBoolean(false);

    const [extenderDescripcion, setExtenderDescripcion] = useState(false);
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

    const [textAntecedente, setTextAntecedente] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsAssistance, setLsAssistance] = useState([]);

    const [documento, setDocumento] = useState('');
    const [dataTriage, setDataTriage] = useState(null);
    const [lsAtencion, setLsAtencion] = useState(null);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm();
    const { handleSubmit, watch, setValue } = methods;
    const values = watch();

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                toast.error(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            toast.error(Message.ErrorDeDatos);
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

    const handleDx = async (event, dxType) => {
        const value = event.target.value;

        if (dxType === 1) setTextDx1(value);
        else if (dxType === 2) setTextDx2(value);
        else if (dxType === 3) setTextDx3(value);

        if (event.key === 'Enter' && value.trim()) {
            try {
                const { data } = await GetAllByCodeOrName(value.trim());
                switch (dxType) {
                    case 1: setLsDx1(data); break;
                    case 2: setLsDx2(data); break;
                    case 3: setLsDx3(data); break;
                    default: break;
                }
            } catch {
                toast.error('Error al buscar el diagnóstico');
            }
        } else if (event.key === 'Enter') {
            toast.error('Ingrese un código o nombre de diagnóstico');
        }
    };

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerAtencionn = await GetByTipoCatalogoCombo(CodCatalogo.AHC_ATENCION);
                setLsAssistance(lsServerAtencionn.data);

                const lsServerContingencia = await GetByTipoCatalogoCombo(CodCatalogo.Contingencia);
                setLsContingencia(lsServerContingencia.data);

                const lsServerConceptoAptitud = await GetByTipoCatalogoCombo(CodCatalogo.AHC_CONCEP_ACTITUD);
                setLsConceptoAptitud(lsServerConceptoAptitud.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const atencionRes = await GetByIdAttention(id);
                if (atencionRes.status === 200) {
                    const atencionData = atencionRes.data;
                    setDataTriage(atencionData);
                    setDocumento(atencionData.documento);
                    setValue('idRegistroAtencion', Number(id));
                    setValue('documento', atencionData.documento);

                    handleLoadingDocument({ target: { value: atencionData.documento } });

                    const [antecedenteRes, registroRes, ultimoRegistroRes] = await Promise.all([
                        GetAntecedente(atencionData.documento),
                        GetIdRegistroAtencionMedicalHistory(id),
                        GetLastRecordOccupationalExamination(atencionData.documento)
                    ]);

                    if (antecedenteRes.status === 200) {
                        setValue("antecedentes", antecedenteRes.data);
                    }

                    if (registroRes.data.exito && registroRes.data.datos) {
                        disabledButton.onTrue();

                        const datos = registroRes.data.datos;
                        setLsAtencion(datos);
                        setValue('id', datos.id);

                        setLsDx1(datos.listDx1);
                        setTextDx1(datos.dx1);

                        setLsDx2(datos.listDx2);
                        setTextDx2(datos.dx2);

                        setLsDx3(datos.listDx3);
                        setTextDx3(datos.dx3);
                    } else {
                        setLsAtencion(atencionData);
                    }

                    setTimeout(timeWait.onTrue, 500);

                    if (ultimoRegistroRes.status === 200) {
                        setTextAntecedente(ultimoRegistroRes.data.especifiqueAP);
                    }
                }
            } catch (error) {

            }
        };

        fetchData();
    }, [id]);

    const handleClickReport = async () => {
        try {
            openReport.onTrue();
            const lsDataReport = await GetByIdMedicalHistory(values.id);
            const lsDataUser = await GetByMail(user?.nameuser);

            const dataPDFTwo = generateReportClinicHistory(lsDataReport.data, lsDataUser.data, extenderDescripcion);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            const result = await InsertMedicalHistory(datos);
            if (result.data.exito) {
                disabledButton.onTrue();
                setValue('id', result.data.datos);
                toast.success(result.data.mensaje);
            } else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);

        }
    };

    return (
        <FormProvider {...methods}>
            {timeWait.value ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            disabled
                            title="Historia clínica"
                            key={lsEmployee.documento}
                            documento={values.documento}
                            onChange={(e) => setValue('documento', e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StickyActionBar
                            onClickSave={handleSubmit(handleClick)}
                            onClickUpdate={handleSubmit(handleClick)}
                            disabledUpdate={!disabledButton.value}
                            disabledSave={disabledButton.value}
                            showButton={false}
                            threshold={510}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ my: 2 }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 30 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.1, 0.25, 1]
                                        }}
                                    >
                                        <Alert
                                            variant="filled"
                                            severity={dataTriage?.colorTriage?.codigo}
                                            sx={{ backgroundColor: dataTriage?.colorTriage?.value, color: dataTriage?.colorTriage?.label }}
                                        >
                                            <AlertTitle>{`ATENCIÓN: ${dataTriage.nameAtencion}`}</AlertTitle>
                                            <Typography variant="body1" sx={{ color: dataTriage?.colorTriage?.label }}>
                                                {dataTriage.descripcionAtencion}
                                            </Typography>
                                        </Alert>
                                    </motion.div>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <InputDatePicker
                                                    label="Fecha"
                                                    name="fecha"
                                                    defaultValue={lsAtencion?.fecha}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <InputSelect
                                                    disabled
                                                    name="atencion"
                                                    label="Atención"
                                                    defaultValue={lsAtencion?.atencion}
                                                    options={lsAssistance}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <InputSelect
                                                    name="idContingencia"
                                                    label="Contingencia"
                                                    defaultValue={lsAtencion?.idContingencia}
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
                                                <InputText
                                                    defaultValue={lsAtencion?.motivoConsulta}
                                                    fullWidth
                                                    name="motivoConsulta"
                                                    label="Motivo de Consulta"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={2}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
                                                    icons={DetailIcons[2].icons}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={lsAtencion?.enfermedadActual}
                                                    fullWidth
                                                    name="enfermedadActual"
                                                    label="Enfermedad Actual"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={10}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
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

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue=""
                                                    fullWidth
                                                    name="antecedentes"
                                                    label="Antecedentes"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={10}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
                                                    icons={DetailIcons[2].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[5].title}
                                                    onClick={open.onTrue}
                                                    icons={DetailIcons[5].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[6].title}
                                                    onClick={openAntecedente.onTrue}
                                                    icons={DetailIcons[6].icons}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={lsAtencion?.revisionSistema}
                                                    fullWidth
                                                    name="revisionSistema"
                                                    label="Revisión Por Sistemas"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={2}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
                                                    icons={DetailIcons[2].icons}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={lsAtencion?.examenFisico}
                                                    fullWidth
                                                    name="examenFisico"
                                                    label="Examen Fisico"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={10}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
                                                    icons={DetailIcons[2].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[3].title}
                                                    onClick={openExamenFisico.onTrue}
                                                    icons={DetailIcons[3].icons}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={lsAtencion?.examenParaclinico}
                                                    fullWidth
                                                    name="examenParaclinico"
                                                    label="Examenes Paraclínicos"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={6}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
                                                    icons={DetailIcons[2].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[4].title}
                                                    onClick={openExamenParaclinico.onTrue}
                                                    icons={DetailIcons[4].icons}
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
                                                        onKeyDown={(e) => handleDx(e, 1)}
                                                        onChange={(e) => setTextDx1(e?.target.value)}
                                                        value={textDx1}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={10}>
                                                    <InputSelect
                                                        clearable
                                                        name="dx1"
                                                        label="Dx1"
                                                        defaultValue={lsAtencion?.dx1}
                                                        options={lsDx1}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <InputOnChange
                                                        label="Dx 2"
                                                        onKeyDown={(e) => handleDx(e, 2)}
                                                        onChange={(e) => setTextDx2(e.target.value)}
                                                        value={textDx2}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={10}>
                                                    <InputSelect
                                                        clearable
                                                        name="dx2"
                                                        label="Dx2"
                                                        defaultValue={lsAtencion?.dx2}
                                                        options={lsDx2}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <InputOnChange
                                                        label="Dx 3"
                                                        onKeyDown={(e) => handleDx(e, 3)}
                                                        onChange={(e) => setTextDx3(e.target.value)}
                                                        value={textDx3}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={10}>
                                                    <InputSelect
                                                        clearable
                                                        name="dx3"
                                                        label="Dx3"
                                                        defaultValue={lsAtencion?.dx3}
                                                        options={lsDx3}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                            </Fragment>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={lsAtencion?.planManejo}
                                                    fullWidth
                                                    name="planManejo"
                                                    label="Plan de Manejo"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    multiline
                                                    rows={10}
                                                />
                                            </Grid>
                                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                <DetailedIcon
                                                    title={DetailIcons[0].title}
                                                    onClick={openTemplate.onTrue}
                                                    icons={DetailIcons[0].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[1].title}
                                                    onClick={openApuntesPersonales.onTrue}
                                                    icons={DetailIcons[1].icons}
                                                />

                                                <DetailedIcon
                                                    title={DetailIcons[2].title}
                                                    onClick={open.onTrue}
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
                                                <InputSelect
                                                    name="idConceptoActitud"
                                                    label="Concepto De Aptitud Psicofísica"
                                                    defaultValue={lsAtencion?.idConceptoActitud}
                                                    options={lsConceptoAptitud}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} sx={{ pt: 6 }}>
                                            <Grid item xs={2}>
                                                <AnimateButton>
                                                    <Button disabled={!disabledButton.value} variant="outlined" fullWidth onClick={handleClickReport}>
                                                        {TitleButton.Imprimir}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={2}>
                                                <AnimateButton>
                                                    <Button variant="outlined" fullWidth onClick={openFormula.onTrue}>
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
                                                    <Button disabled={!disabledButton.value} variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_ATENDIDO)}>
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

            <>
                <ControlModal
                    maxWidth="md"
                    open={open.value}
                    onClose={open.onFalse}
                    title="DICTADO POR VOZ"
                >
                    <ControllerListen />
                </ControlModal>

                <ControlModal
                    maxWidth="lg"
                    open={openAntecedente.value}
                    onClose={openAntecedente.onFalse}
                    title="ANTECEDENTES DE HISTORIA CLÍNICA"
                >
                    <InputOnChange
                        onChange={(e) => setTextAntecedente(e.target.value)}
                        value={textAntecedente}
                        multiline
                        rows={20}
                    />
                </ControlModal>

                <FullScreenDialog
                    open={openTemplate.value}
                    title="LISTADO DE PLANTILLA"
                    handleClose={openTemplate.onFalse}
                >
                    <ListPlantillaAll />
                </FullScreenDialog>

                <FullScreenDialog
                    open={openApuntesPersonales.value}
                    title="APUNTES PERSONALES"
                    handleClose={openApuntesPersonales.onFalse}
                >
                    <ListPersonalNotesAll />
                </FullScreenDialog>

                <FullScreenDialog
                    open={openExamenFisico.value}
                    title="VISTA DE EXAMEN FÍSICO"
                    handleClose={openExamenFisico.onFalse}
                >
                    <ListExamenesFisico documento={documento} />
                </FullScreenDialog>

                <FullScreenDialog
                    open={openHistoryAntecedente.value}
                    title="VISTA DE HISTÓRICO DE ANTECEDENTE"
                    handleClose={openHistoryAntecedente.onFalse}
                >
                    <ListExamenesFisico documento={documento} />
                </FullScreenDialog>

                <FullScreenDialog
                    open={openExamenParaclinico.value}
                    title="VISTA DE EXAMEN PARACLÍNICO"
                    handleClose={openExamenParaclinico.onFalse}
                >
                    <ListExamenesPara documento={documento} />
                </FullScreenDialog>

                <ControlModal
                    title={Message.VistaReporte}
                    open={openReport.value}
                    onClose={openReport.onFalse}
                    maxWidth="xl"
                >
                    <ViewPDF dataPDF={dataPDF} />
                </ControlModal>

                <ControlModal
                    title={"Orden de " + titleModal}
                    open={openForm.value}
                    onClose={() => {
                        openForm.onFalse();
                        setListMedicalFormula(true);
                        setNewMedicalFormula(false);
                        setUpdateMedicalFormula(false);
                        setNewMedicalFormula(false)
                    }}
                    maxWidth="md"
                >
                    {newMedicalFormula ?
                        <MedicalFormula
                            contingencia={values.idContingencia}
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
                                    contingencia={values.idContingencia}
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
                    open={openFormula.value}
                    handleCloseDialog={openFormula.onFalse}
                >
                    {dataMedicalOrders.map(data =>
                        <Grid item xs={12}>
                            <HoverSocialCard
                                onClick={() => { openForm.onTrue(); setTitleModal(data.title) }}
                                secondary={data.subtitle}
                                iconPrimary={data.iconPrimary}
                                color={data.color}
                            />
                        </Grid>
                    )}
                </DialogFormula>
            </>
        </FormProvider>
    );
};

export default UpdateClinicHistory;