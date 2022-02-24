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
import { PutCompany } from 'formatdata/CompanyForm';
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateCompanys } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({

    Codigo: yup.string().required(`${ValidationMessage.Requerido}`),

    DescripcionSpa: yup.string().required(`${ValidationMessage.Requerido}`),

    Email: yup.string().required(`${ValidationMessage.Requerido}`),

    Celular: yup.string().required(`${ValidationMessage.Requerido}`),

    Gerente: yup.string().required(`${ValidationMessage.Requerido}`),


});

const UpdateCompany = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;
    const { id } = useParams();

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        const DataToUpdate = PutCompany(datos.Codigo,datos.DescripcionSpa, datos.Email, datos.Celular, datos.Gerente);

        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCompanys(DataToUpdate);
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
            <UpdateData>
                {(Company) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {console.log("Llegada de datos = ", Company)}
                        <Grid container spacing={6}>
                            <Grid item xs={8}>
                                <Grid item xs zeroMinWidth sx={{ pb: 6 }}>
                                    <FormProvider {...methods}>
                                 
                                        <InputText
                                            defaultValue={Company.nombre}
                                            fullWidth
                                            name="DescripcionSpa"
                                            label="Nombre"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                        <InputText
                                            defaultValue={Company.nombre}
                                            fullWidth
                                            name="Email"
                                            label="Correo Electronico"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                        <InputText
                                            defaultValue={Company.nombre}
                                            fullWidth
                                            name="Celular"
                                            label="Celular"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                        <InputText
                                            defaultValue={Company.nombre}
                                            fullWidth
                                            name="Gerente"
                                            label="Gerente"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />




                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="contained" fullWidth type="submit">
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
                        </Grid>
                    </form>
                )}
            </UpdateData>

        </MainCard>
    );
};

export default UpdateCompany;