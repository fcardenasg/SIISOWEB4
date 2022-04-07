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
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateCIE11s } from 'api/clients/CIE11Client';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateCIE11 = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCIE11s(datos);
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
        <MainCard title="Actualizar CIE11">
            <UpdateData url={Url.CIE11Id}>
                {(cie11) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Grid item xs zeroMinWidth sx={{ pb: 2 }}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={cie11.id}
                                            fullWidth
                                            disabled
                                            name="id"
                                            label="ID"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs zeroMinWidth sx={{ pb: 2 }}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={cie11.dx}
                                            fullWidth
                                            name="dx"
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
                                                    {TitleButton.Actualizar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/cie11/list")}>
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

export default UpdateCIE11;