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
import { AccionMenu, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostCompany } from 'formatdata/CompanyForm';
import { FormatDate } from 'components/helpers/Format';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const validationSchema = yup.object().shape({
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    descripcionSpa: yup.string().required(`${ValidationMessage.Requerido}`),
    email: yup.string().email('Debe ser un email válido').nullable(true),
    celular: yup.string().nullable(true),
    gerente: yup.string().nullable(true),
});

const Company = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, reset, formState: { errors } } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCompany(datos.codigo, datos.descripcionSpa, datos.email, datos.celular, datos.gerente,
                user?.nameuser, FormatDate(new Date()), '', FormatDate(new Date()), datos.actividadEconomica);

            const result = await InsertCompany(DataToInsert);
            if (result.status === 200) {
                setOpenSuccess(true);
                reset();
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo guardar correctamente el registro');
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Empresa}>
            <MainCard title="Registrar Empresas">
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="codigo"
                                label="Código"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.codigo}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="descripcionSpa"
                                label="Nombre"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.descripcionSpa}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="email"
                                label="Email"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.email}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="celular"
                                label="Celular"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.celular}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="gerente"
                                label="Gerente"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.gerente}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="actividadEconomica"
                                label="Actividad económica de la empresa"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.actividadEconomica}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4} lg={2}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={6} md={4} lg={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/company/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormProvider>
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default Company;