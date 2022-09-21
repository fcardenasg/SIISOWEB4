import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

const UpdateTemplate = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [lsTemplate, setLsTemplate] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerTemplate = await GetByIdTemplate(id);
            if (lsServerTemplate.status === 200) {
                setLsTemplate(lsServerTemplate.data);
            }



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
            const DataToUpdate = PutTemplate(id, 0, 0, 0,
                datos.idCIE11, lsTemplate.usuario, 0, 0, 0, datos.descripcion,
                lsTemplate.usuarioRegistro, lsTemplate.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateTemplates(DataToUpdate);
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
        <MainCard title="Actualizar Plantilla">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsTemplate.length != 0 ?
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idCIE11"
                                    label="CIE11"
                                    defaultValue={lsTemplate.idCIE11}
                                    options={lsCie11}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idCIE11}
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
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
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
                </Fragment> : <Cargando />}
        </MainCard>
    );
};

export default UpdateTemplate;