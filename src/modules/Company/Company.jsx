import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { InsertCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostCompany } from 'formatdata/CompanyForm';
import { FormatDate } from 'components/helpers/Format';

const validationSchema = yup.object().shape({
    Codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    DescripcionSpa: yup.string().required(`${ValidationMessage.Requerido}`),
    Email: yup.string().required(`${ValidationMessage.Requerido}`),
    Celular: yup.string().required(`${ValidationMessage.Requerido}`),
    Gerente: yup.string().required(`${ValidationMessage.Requerido}`)
});

const Company = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, errors, reset } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCompany(datos.codigo, datos.descripcionSpa, datos.email, datos.celular,
                datos.gerente, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                await InsertCompany(DataToInsert).then(result => {
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
            setResultMessage(Message.ErrorServicio);
            setOpenError(true);
        }
    };

    return (
        <MainCard title="Registrar Empresas">
            <MessageSuccess message={resultMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="codigo"
                            label="Código"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="descripcionSpa"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="email"
                            label="Email"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="celular"
                            label="Celular"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ pb: 2 }}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="gerente"
                            label="Gerente"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12}>
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
                                <Button variant="outlined" fullWidth onClick={() => navigate("/company/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Company;