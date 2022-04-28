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
import { UpdateCatalogs } from 'api/clients/CatalogClient';
import { GetAllTypeCatalog } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateCatalog = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    /* NUESTROS USESTATE */
    const [typecatalogo, setTypeCatalog] = useState([]);

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        const lsServer = await GetAllTypeCatalog(0, 0);
        var result = lsServer.data.entities.map((item) => ({
            value: item.id,
            label: item.nombre
        }));
        setTypeCatalog(result);
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, errors } = methods;
    const { id } = useParams();

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        const DataToUpdate = PutCatalog(id, datos.nombre, datos.codigo, datos.idTipoCatalogo);
        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCatalogs(DataToUpdate);
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
                message: 'Este código ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Actualizar Catálogo">
            <UpdateData url={Url.CatalogoId}>
                {(Catalog) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} spacing={2} sx={{ pt: 3 }}>
                            <Grid container spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTipoCatalogo"
                                            label="Tipo Catalogo"
                                            defaultValue={Catalog.idTipoCatalogo}
                                            options={typecatalogo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Catalog.codigo}
                                            fullWidth
                                            name="codigo"
                                            label="Código"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={Catalog.nombre}
                                            fullWidth
                                            name="nombre"
                                            label="Nombre"
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
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/catalog/list")}>
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

export default UpdateCatalog;