import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useState } from 'react';

// Terceros
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { Url } from 'api/instances/AuthRoute';
import UpdateData from 'components/form/UpdateData';
import { UpdateCompanys } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateCompany = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const methods = useForm(
        { resolver: yupResolver(validationSchema) }
    );
    const { handleSubmit, errors } = methods;

    const handleClick = async (datos) => {
        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCompanys(datos);
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
        <MainCard title="Actualizar Empresas">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <UpdateData url={Url.EmpresaId}>
                {(Company) => (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={Company.codigo}
                                    fullWidth
                                    disabled
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
                                    defaultValue={Company.descripcionSpa}
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
                                    defaultValue={Company.email}
                                    fullWidth
                                    name="email"
                                    label="Correo electronico"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={Company.celular}
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
                                    defaultValue={Company.gerente}
                                    fullWidth
                                    name="gerente"
                                    label="Contacto"
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
                                            {TitleButton.Actualizar}
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
                )}
            </UpdateData>
        </MainCard>
    );
};

export default UpdateCompany;