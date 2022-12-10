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
import { PostTypeCatalog } from 'formatdata/TypeCatalogForm';
import useAuth from 'hooks/useAuth';
import { InsertTypeCatalog } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
});

const TypeCatalog = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, formState: { errors } } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostTypeCatalog(datos.nombre, user.email, FormatDate(new Date()),
                '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                await InsertTypeCatalog(DataToInsert).then(result => {
                    if (result.data.message === Message.Guardar) {
                        setResultMessage(result.data.message);
                        setOpenSuccess(true);
                        reset();
                    } else {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    }

                });
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${Message.ErrorServicio}`);
        }
    };

    return (
        <MainCard title="Registrar Tipo de Catálogo">
            <MessageSuccess message={resultMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <form onSubmit={handleSubmit(handleClick)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                name="nombre"
                                label="Nombre"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.nombre}
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
                                <Button variant="outlined" fullWidth onClick={() => navigate("/typecatalog/list")}>
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

export default TypeCatalog;