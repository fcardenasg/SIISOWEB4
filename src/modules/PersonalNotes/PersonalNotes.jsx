import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostPersonalNotes } from 'formatdata/PersonalNotesForm';
import { InsertPersonalNotes } from 'api/clients/PersonalNotesClient';

const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
});

const PersonalNotes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, formState: { errors } } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostPersonalNotes(datos.descripcion, user.nameuser, FormatDate(new Date()),
                '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertPersonalNotes(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo guardar correctamente el registro');
        }
    };

    return (
        <MainCard title="Registrar Apunte Personal">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <form onSubmit={handleSubmit(handleClick)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                rows={5}
                                multiline
                                defaultValue=""
                                name="descripcion"
                                label="Descripción"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.descripcion}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid item sx={{ pt: 4 }} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth type='submit'>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/personal-notes/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default PersonalNotes;