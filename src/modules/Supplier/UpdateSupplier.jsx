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
import { PutCatalog } from 'formatdata/CatalogForm';
import { SNACKBAR_OPEN } from 'store/actions';
import UpdateData from 'components/form/UpdateData';
import { UpdateSuppliers } from 'api/clients/SupplierClient';
import { GetAllCatalog } from 'api/clients/CatalogClient';
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

const UpdateSupplier = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    /* NUESTROS USESTATE */
    const [catalog, setCatalog] = useState([]);

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetAllCatalog(0, 0);
            var result = lsServer.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(result);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors } = methods;

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateSuppliers(datos);
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
        <MainCard title="Actualizar Catalogo">
            <UpdateData url={Url.ProveedorId}>
                {(Supplier) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} spacing={2} sx={{ pt: 3 }}>
                            <Grid container spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Supplier.codiProv}
                                            fullWidth
                                            name="codiProv"
                                            label="Código"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Supplier.nombProv}
                                            fullWidth
                                            name="nombProv"
                                            label="Nombre"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Supplier.teleProv}
                                            fullWidth
                                            name="teleProv"
                                            label="Teléfono"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Supplier.emaiProv}
                                            fullWidth
                                            name="emaiProv"
                                            label="Email"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Supplier.contaProv}
                                            fullWidth
                                            name="contaProv"
                                            label="Contacto"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="ciudProv"
                                            label="Ciudad"
                                            defaultValue={Supplier.ciudProv}
                                            options={catalog}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="tipoProv"
                                            label="Tipo Proveedor"
                                            defaultValue={Supplier.tipoProv}
                                            options={catalog}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Supplier.direProv}
                                            fullWidth
                                            name="direProv"
                                            label="Dirrección"
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
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/supplier/list")}>
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

export default UpdateSupplier;