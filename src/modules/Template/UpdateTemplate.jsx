import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import DetailedIcon from 'components/controllers/DetailedIcon';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutTemplate } from 'formatdata/TemplateForm';

import { GetByIdTemplate, UpdateTemplates } from 'api/clients/TemplateClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import InputOnChange from 'components/input/InputOnChange';
import ControllerListen from 'components/controllers/ControllerListen';

const validationSchema = yup.object().shape({
    dx1: yup.string().required(`${ValidationMessage.Requerido}`),
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
});

const DetailIcons = [
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> }
]

const UpdateTemplate = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [archivoPdf, setArchivoPdf] = useState(null);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [open, setOpen] = useState(false);

    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [lsTemplate, setLsTemplate] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerTemplate = await GetByIdTemplate(id);
            if (lsServerTemplate.status === 200) {
                setLsTemplate(lsServerTemplate.data);
                setTextDx1(lsServerTemplate.data.idCIE11);

                if (lsServerTemplate.data.archivo !== "") {
                    setArchivoPdf(lsServerTemplate.data.archivo);
                }

                if (lsServerTemplate.data.idCIE11 !== '') {
                    var lsServerCie11 = await GetAllByCodeOrName(lsServerTemplate.data.idCIE11);
                    setLsDx1(lsServerCie11.data);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

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

    const handleClick = async (datos) => {
        try {
            var savePdf = archivoPdf === null ? "" : archivoPdf;

            const DataToUpdate = PutTemplate(id, datos.dx1, user.nameuser, datos.descripcion,
                lsTemplate.usuarioRegistro, lsTemplate.fechaRegistro, user.nameuser, FormatDate(new Date()), savePdf);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateTemplates(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {


        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = async (e) => {
                    setArchivoPdf(e.target.result);
                }
            }
            else {
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    setTimeout(() => {
        if (lsTemplate.length !== 0)
            setTimeWait(true);
    }, 2000);

    return (
        <MainCard title="Actualizar Plantilla">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="VISUALIZAR ARCHIVO"
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={archivoPdf} />
            </ControlModal>

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            {timeWait ?
                <Fragment>
                    <Grid container spacing={2}>
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
                                    defaultValue={lsTemplate.idCIE11}
                                    options={lsDx1}
                                    bug={errors.dx1}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsTemplate.descripcion}
                                    multiline
                                    rows={5}
                                    name="descripcion"
                                    label="Descripción"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.descripcion}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                            <DetailedIcon
                                title={DetailIcons[0].title}
                                onClick={() => setOpen(true)}
                                icons={DetailIcons[0].icons}
                            />
                        </Grid>
                    </Grid>

                    <Grid item sx={{ pt: 4 }} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button fullWidth variant="contained" component="label">
                                        <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                        {TitleButton.SubirArchivo}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button disabled={archivoPdf === null ? true : false} fullWidth variant="contained" component="label" onClick={() => setOpenViewArchivo(true)}>
                                        {TitleButton.VerArchivo}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/template/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />}
        </MainCard>
    );
};

export default UpdateTemplate;