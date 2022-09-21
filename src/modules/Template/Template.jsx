import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { PostTemplate } from 'formatdata/TemplateForm';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { InsertTemplate } from 'api/clients/TemplateClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { GetAllCIE11 } from 'api/clients/CIE11Client';

const validationSchema = yup.object().shape({
    idCIE11: yup.string().required(`${ValidationMessage.Requerido}`),
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

    const [open, setOpen] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsCie11, setLsCie11] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServerCIE11 = await GetAllCIE11(0, 0);
            var resultCIE11 = lsServerCIE11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCIE11);

        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostTemplate("A1", 1, 1,
                datos.idCIE11, user.email, 1, 1, 1, datos.descripcion,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            console.log("DataToInsert = ", DataToInsert);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertTemplate(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <MainCard title="Registrar Plantilla">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idCIE11"
                            label="CIE11"
                            defaultValue=""
                            options={lsCie11}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idCIE11}
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
                    <Grid item xs={6}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={6}>
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