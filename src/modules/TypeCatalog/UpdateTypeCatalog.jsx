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
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { Url } from 'api/instances/AuthRoute';
import { PutTypeCatalog } from 'formatdata/TypeCatalogForm';
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateTypeCatalogs } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`)
});


const UpdateTypeCatalog = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [values, setValues] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;
    const { id } = useParams();

/*     useEffect(() => {
        async function GetAll() {
            setValues({ fecha1: '2002-04-10T00:00:00', fecha2: '2022-05-19T00:00:00' })
        }

        GetAll();
    }, []) */

    const onSubmit = async (datos) => {
        try {
            if (Object.keys(datos.length !== 0)) {
                const DataToUpdate = PutTypeCatalog(id, datos.nombre, user.id, FormatDate(new Date()),
                    'Usuario 1', FormatDate(new Date()));
                const result = await UpdateTypeCatalogs(DataToUpdate);
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
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Este tipo de cátalogo ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Actualizar Tipo de Catálogo">
            <UpdateData url={Url.TipoCatalogoId}>
                {(TypeCatalog) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
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

                                    {/* <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha de prueba 1"
                                            name="fecha1"
                                            defaultValue={values.fecha1}
                                        />
                                    </FormProvider>

                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha de prueba 2"
                                            name="fecha2"
                                            defaultValue={values.fecha2}
                                        />
                                    </FormProvider> */}
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