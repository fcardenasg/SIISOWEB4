import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
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

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultData } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const MedicalAdvice = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [lsResult, setLsResult] = useState([]);
    const [buttonReport, setButtonReport] = useState(false);
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

    const [lsMotivo, setLsMotivo] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const lsAtencion = [{ nameAtencion: 'ASESORÍA MÉDICA', id: 0 }];

    const methods = useForm();

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
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
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
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
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
            setLsEmployee([]);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostMedicalAdvice(documento, FormatDate(datos.fecha), DefaultData.ASESORIA_MEDICA, lsEmployee.sede,
                DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL,
                DefaultData.SINREGISTRO_GLOBAL, datos.idTipoAsesoria, datos.idMotivo, DefaultData.SINREGISTRO_GLOBAL,
                datos.observaciones, datos.recomendaciones, '', DefaultData.SINREGISTRO_GLOBAL, user.email, FormatDate(new Date()),
                '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToInsert);
                if (result.status === 200) {
                    setLsResult(result.data);
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    reset();
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

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
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
                                        name="idMotivo"
                                        label="Motivo"
                                        defaultValue=""
                                        options={lsMotivo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        bug={errors}
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

                            {buttonReport ?
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate(`/medicaladvice/report/${lsResult.id}`)}>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid> : <div />
                            }

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => setOpenFormula(true)}>
                                        {TitleButton.OrdenesMedicas}
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
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default MedicalAdvice;