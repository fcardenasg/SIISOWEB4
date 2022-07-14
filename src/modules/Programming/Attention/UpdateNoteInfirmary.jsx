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

import ViewEmployee from 'components/views/ViewEmployee';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { PostNoteInfirmary } from 'formatdata/NoteInfirmaryForm';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { InsertNoteInfirmary } from 'api/clients/NoteInfirmaryClient';
import Cargando from 'components/loading/Cargando';
import { GetByIdAttention } from 'api/clients/AttentionClient';

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
            const serverData = await GetByIdAttention(id);
            if (serverData.status === 200) {
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
            const UpdateToInsert = PostNoteInfirmary(documento, FormatDate(datos.fecha), datos.idAtencion, datos.idContingencia, datos.idTurno, datos.idDiaTurno,
                JSON.stringify(diagnosticoArray), datos.notaEnfermedad, lsNoteInfirmary.usuarioRegistro, lsNoteInfirmary.fechaRegistro,
                user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertNoteInfirmary(UpdateToInsert);
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
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsNoteInfirmary.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idAtencion"
                                            label="Atención"
                                            defaultValue={lsNoteInfirmary.atencion}
                                            options={lsAtencion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idContingencia"
                                            label="Contingencia"
                                            defaultValue=""
                                            options={lsContingencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                {/* <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTurno"
                                            label="Turno"
                                            defaultValue=""
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
                                            defaultValue=""
                                            options={lsDiaTurno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid> */}
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
                                            defaultValue=""
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

                            <Grid item xs={12} sx={{ pt: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={buttonReport ? 4 : 6}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    {buttonReport ?
                                        <Grid item xs={buttonReport ? 4 : 6}>
                                            <AnimateButton>
                                                <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
                                                    Imprimir
                                                </Button>
                                            </AnimateButton>
                                        </Grid> : <></>}
                                    <Grid item xs={buttonReport ? 4 : 6}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/programming/list")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
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