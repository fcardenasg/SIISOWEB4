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
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateTypeCatalogs } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    nombre: yup.string().required('Comment Field is Required')
});

const UpdateTypeCatalog = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));



    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { id } = useParams();

    const { handleSubmit, errors } = methods;

    /* METODO DE INSERT  */
    const onSubmit = async (datos) => {

        const nombre = datos.nombre;

        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateTypeCatalogs({ id, nombre });
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Guardar}`,
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

    const navigate = useNavigate();

    return (
        <MainCard title="Registrar Tipo de Catalogo">
            <UpdateData>
                {(TypeCatalog) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {console.log("Llegada de datos = ", TypeCatalog)}
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Grid item xs zeroMinWidth sx={{ pb: 2 }}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={TypeCatalog.nombre}
                                            fullWidth
                                            name="nombre"
                                            label="Nombre"
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
                                                    {TitleButton.Guardar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/typecatalog/list")}>
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

export default UpdateTypeCatalog;