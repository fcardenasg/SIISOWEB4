import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import { Url } from 'api/instances/AuthRoute';
import { PutCompany } from 'formatdata/CompanyForm';
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateCompanys } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
/* const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
}); */

const UpdateCompany = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

   

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors } = methods;

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCompanys(datos);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Actualizar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainCard title="Actualizar Empresas">
            <UpdateData url={Url.EmpresaId}>
                {(Company) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} spacing={2} sx={{ pt: 3 }}>
                            <Grid container spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                            
                            </Grid>

                            <Grid item xs={12} sx={{ pb: 3 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="contained" fullWidth type="submit">
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
                    </form>
                )}
            </UpdateData>

        </MainCard>
    );
};

export default UpdateCompany;