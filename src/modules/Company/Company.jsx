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
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostCompany } from 'formatdata/CompanyForm';
import { FormatDate } from 'components/helpers/Format';

const validationSchema = yup.object().shape({
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    descripcionSpa: yup.string().required(`${ValidationMessage.Requerido}`),

});

const Company = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });


    const { handleSubmit, reset, formState: { errors } } = methods;


    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCompany(datos.codigo, datos.descripcionSpa, datos.email, datos.celular, datos.gerente,
                user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertCompany(DataToInsert);
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
        <MainCard title="Registrar Empresas">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                            bug={errors.codigo}
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
                            bug={errors.descripcionSpa}
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
                            bug={errors.email}
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
                            bug={errors.celular}
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
                            bug={errors.gerente}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12}>
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