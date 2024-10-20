import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    TableContainer
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cargando from 'components/loading/Cargando';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { PostTemplate } from 'formatdata/TemplateForm';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { InsertTemplate } from 'api/clients/TemplateClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';
import ViewPDF from 'components/components/ViewPDF';

const validationSchema = yup.object().shape({
    dx1: yup.string().required(`${ValidationMessage.Requerido}`),
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
});

const DetailIcons = [
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> }
]

const Template = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [archivoPdf, setArchivoPdf] = useState(null);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [open, setOpen] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

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

            const DataToInsert = PostTemplate(datos.dx1, user.nameuser, datos.descripcion,
                user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()), savePdf);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertTemplate(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setTextDx1('');
                    setLsDx1([]);
                    setArchivoPdf(null);
                    reset();
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

    return (
        <MainCard title="Registrar Plantilla">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                            defaultValue=""
                            options={lsDx1}
                            bug={errors.dx1}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
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
                                {TitleButton.Guardar}
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
        </MainCard>
    );
};

export default Template;