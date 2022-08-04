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
import { FormatDate } from 'components/helpers/Format';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { PutNoteInfirmary } from 'formatdata/NoteInfirmaryForm';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdNoteInfirmary, UpdateNoteInfirmarys } from 'api/clients/NoteInfirmaryClient';
import Cargando from 'components/loading/Cargando';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateNoteInfirmary = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [lsNoteInfirmary, setLsNoteInfirmary] = useState([]);

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

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [documento, setDocumento] = useState('');
    const [openTemplate, setOpenTemplate] = useState(false);
    const [buttonReport, setButtonReport] = useState(false);
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsCie11, setLsCie11] = useState([]);
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsDiaTurno, setLsDiaTurno] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);

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
            const serverData = await GetByIdNoteInfirmary(id);
            if (serverData.status === 200) {
                setDiagnosticoArray(JSON.parse(serverData.data.procedimientos));
                setLsNoteInfirmary(serverData.data);
                setDocumento(serverData.data.documento);
                handleLoadingDocument(serverData.data.documento);
            }

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

            const lsServerAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AHC_ATENCION_NOTA_ENFERMERIA);
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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const UpdateToInsert = PutNoteInfirmary(id, documento, FormatDate(datos.fecha), datos.idAtencion, datos.idContingencia, datos.idTurno, datos.idDiaTurno,
                JSON.stringify(diagnosticoArray), datos.notaEnfermedad, lsNoteInfirmary.usuarioRegistro, lsNoteInfirmary.fechaRegistro,
                user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateNoteInfirmarys(UpdateToInsert);
                if (result.status === 200) {
                    setOpenUpdate(true);
                    setButtonReport(true);
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

            {lsNoteInfirmary.length != 0 ?
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
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsNoteInfirmary.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idAtencion"
                                            label="Atención"
                                            defaultValue={lsNoteInfirmary.idAtencion}
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
                                            defaultValue={lsNoteInfirmary.idContingencia}
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
                                            defaultValue={lsNoteInfirmary.idTurno}
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
                                            defaultValue={lsNoteInfirmary.idDiaTurno}
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
                        <SubCard darkTitle title={<Typography variant="h4">PROCEDIMIENTO</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputMultiSelects
                                        fullWidth
                                        onChange={(event, value) => setDiagnosticoArray(value)}
                                        value={diagnosticoArray}
                                        label="Procedimientos"
                                        options={lsCie11}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsNoteInfirmary.notaEnfermedad}
                                            fullWidth
                                            name="notaEnfermedad"
                                            label="Nota"
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/note-infirmary/list")}>
                                            {TitleButton.Cancelar}
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

export default UpdateNoteInfirmary;