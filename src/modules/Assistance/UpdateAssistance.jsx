import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import HoverSocialCard from 'modules/Programming/Attention/OccupationalExamination/Framingham/HoverSocialCard';
import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';

import ListMedicalFormula from 'modules/Programming/Attention/OccupationalExamination/MedicalOrder/ListMedicalFormula';
import MedicalFormula from 'modules/Programming/Attention/OccupationalExamination/MedicalOrder/MedicalFormula';
import UpdateMedicalFormula from 'modules/Programming/Attention/OccupationalExamination/MedicalOrder/UpdateMedicalFormula';
import ViewReport from 'modules/Programming/Attention/OccupationalExamination/Report/ViewReport';
import DialogFormula from 'modules/Programming/Attention/OccupationalExamination/Modal/DialogFormula';
import { ColorDrummondltd } from 'themes/colors';

import ViewEmployee from 'components/views/ViewEmployee';
import InputDatePicker from 'components/input/InputDatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import { FormatDate } from 'components/helpers/Format'
import InputMultiSelects from 'components/input/InputMultiSelects';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PutAssistance } from 'formatdata/AssistanceForm';
import { UpdateMedicalHistorys, GetByIdMedicalHistory } from 'api/clients/MedicalHistoryClient';
import Cargando from 'components/loading/Cargando';
import { MessageUpdate, MessageError } from 'components/alert/AlertAll';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Examenes Físicos', icons: <DirectionsRunIcon fontSize="small" /> },
    { title: 'Ver Examenes Paraclínico', icons: <AddBoxIcon fontSize="small" /> },
]

const UpdateAssistance = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [disabledButton, setDisabledButton] = useState({
        buttonSave: false,
        buttonReport: false
    });

    const [openReport, setOpenReport] = useState(false);
    const [openFormula, setOpenFormula] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [listMedicalFormula, setListMedicalFormula] = useState(true);
    const [newMedicalFormula, setNewMedicalFormula] = useState(false);
    const [updateMedicalFormula, setUpdateMedicalFormula] = useState(false);
    const [numberId, setNumberId] = useState('');

    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openExamenParaclinico, setOpenExamenParaclinico] = useState(false);
    const [openExamenFisico, setOpenExamenFisico] = useState(false);
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);
    const [lsAssistance, setLsAssistance] = useState([]);

    const [documento, setDocumento] = useState('');
    const [lsCie11, setLsCie11] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsDiaTurno, setLsDiaTurno] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsRemitido, setLsRemitido] = useState([]);
    const [lsConceptoAptitud, setLsConceptoAptitud] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors } = methods;

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

    async function GetAll() {
        try {
          
            const serverData = await GetByIdMedicalHistory(id);
            if (serverData.status === 200) {
                setDocumento(serverData.data.documento);
                setDiagnosticoArray(JSON.parse(serverData.data.diagnostico));
                setLsAssistance(serverData.data);
                handleLoadingDocument(serverData.data.documento);
            }

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

            const lsServerAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION);
            var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAtencion(resultAtencion);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Turno);
            var resultTurno = lsServerTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTurno(resultTurno);

            const lsServerDiaTurno = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DiaTurno);
            var resultDiaTurno = lsServerDiaTurno.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDiaTurno(resultDiaTurno);

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
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutAssistance(id, documento, FormatDate(datos.fecha), datos.idAtencion, datos.idContingencia, datos.idTurno, datos.idDiaTurno,
                datos.motivoConsulta, datos.enfermedadActual, datos.antecedentes, datos.revisionSistema, datos.examenFisico, datos.examenParaclinico,
                JSON.stringify(diagnosticoArray), datos.planManejo, datos.idConceptoActitud, DefaultValue.SINREGISTRO_GLOBAL, user.email, FormatDate(new Date()), '',
                FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateMedicalHistorys(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

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
                <ViewReport />
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
                <Grid item xs={12}>
                    <HoverSocialCard
                        onClick={() => { setOpenForm(true); setTitleModal('Formula') }}
                        secondary="Formula"
                        iconPrimary={AssignmentIcon}
                        color={ColorDrummondltd.RedDrummond}
                    />
                </Grid>

                <Grid item xs={12}>
                    <HoverSocialCard
                        onClick={() => { setOpenForm(true); setTitleModal('Laboratorio') }}
                        secondary="Laboratorio"
                        iconPrimary={BiotechIcon}
                        color={ColorDrummondltd.RedDrummond}
                    />
                </Grid>

                <Grid item xs={12}>
                    <HoverSocialCard
                        onClick={() => { setOpenForm(true); setTitleModal('Imagenes') }}
                        secondary="Imagenes"
                        iconPrimary={ImageIcon}
                        color={ColorDrummondltd.RedDrummond}
                    />
                </Grid>

                <Grid item xs={12}>
                    <HoverSocialCard
                        onClick={() => { setOpenForm(true); setTitleModal('Examenes') }}
                        secondary="Examenes"
                        iconPrimary={FolderOpenIcon}
                        color={ColorDrummondltd.RedDrummond}
                    />
                </Grid>
            </DialogFormula>

            {lsAssistance.length != 0 ?
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
                        <SubCard darkTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsAssistance.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idAtencion"
                                            label="Atención"
                                            defaultValue={lsAssistance.idAtencion}
                                            options={lsAtencion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idContingencia"
                                            label="Contingencia"
                                            defaultValue={lsAssistance.idContingencia}
                                            options={lsContingencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTurno"
                                            label="Turno"
                                            defaultValue={lsAssistance.idTurno}
                                            options={lsTurno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idDiaTurno"
                                            label="Día del Turno"
                                            defaultValue={lsAssistance.idDiaTurno}
                                            options={lsDiaTurno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.motivoConsulta}
                                            fullWidth
                                            name="motivoConsulta"
                                            label="Motivo de Consulta"
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

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.enfermedadActual}
                                            fullWidth
                                            name="enfermedadActual"
                                            label="Enfermedad Actual"
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

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.antecedentes}
                                            fullWidth
                                            name="antecedentes"
                                            label="Antecedentes"
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

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.revisionSistema}
                                            fullWidth
                                            name="revisionSistema"
                                            label="Revisión Por Sistemas"
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

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.examenFisico}
                                            fullWidth
                                            name="examenFisico"
                                            label="Examen Fisico"
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

                                    <DetailedIcon
                                        title={DetailIcons[2].title}
                                        onClick={() => setOpenExamenFisico(true)}
                                        icons={DetailIcons[2].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.examenParaclinico}
                                            fullWidth
                                            name="examenParaclinico"
                                            label="Examenes Paraclínicos"
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

                                    <DetailedIcon
                                        title={DetailIcons[3].title}
                                        onClick={() => setOpenExamenParaclinico(true)}
                                        icons={DetailIcons[3].icons}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">DIAGNOSTICOS</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputMultiSelects
                                        fullWidth
                                        onChange={(event, value) => setDiagnosticoArray(value)}
                                        value={diagnosticoArray}
                                        label="Diagnósticos"
                                        options={lsCie11}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsAssistance.planManejo}
                                            fullWidth
                                            name="planManejo"
                                            label="Plan de Manejo"
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
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">CONCEPTO DE APTITUD PSICOFÍSICA</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idConceptoActitud"
                                            label="Concepto De Aptitud Psicofísica"
                                            defaultValue={lsAssistance.idConceptoActitud}
                                            options={lsConceptoAptitud}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ pt: 4 }}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={disabledButton.buttonSave} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
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
                                        <Button variant="outlined" fullWidth onClick={() => setOpenFormula(true)}>
                                            {TitleButton.OrdenesMedicas}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/assistance/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid > : <Cargando />
            }

        </Fragment >
    );
};

export default UpdateAssistance;