// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    CardContent
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertCatalog } from 'api/clients/CatalogClient';
import { GetAllTypeCatalog } from 'api/clients/TypeCatalogClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import SelectInput from 'components/input/SelectInput';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoCatalogo: yup.number().required(`${ValidationMessage.Requerido}`),
});

const Catalog = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [selectValueTypeCatalog, setSelectTypeCatalog] = useState('');
    const [typecatalogo, setTypeCatalog] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onSubmit'
    });

    const { handleSubmit, errors, reset, control } = methods;

    /* EVENTOS ONCHANGE DE LOS COMBOX */
    const handleChangeTypeCatalog = (event) => {
        setSelectTypeCatalog(event.target.value);
    };

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

    /* ESTE EVENTO LIMPIA LA SELECCIÓN DEL COMBO */
    const CleanCombox = () => {
        setSelectTypeCatalog('');
    }

    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        const DataToInsert = PostCatalog(datos.nombre, datos.codigo, datos.idTipoCatalogo);

        if (Object.keys(datos.length !== 0)) {
            const result = await InsertCatalog(DataToInsert);
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
                reset();
                CleanCombox();
            }
        }
    };

    const navigate = useNavigate();

    return (
        <MainCard title="Registrar Catalogo">

            <Grid item xs={12} spacing={2} sx={{ pt: 3 }}>
                <form onSubmit={handleSubmit(handleClick)}>
                    <Grid container spacing={2} sx={{ pb: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoCatalogo"
                                    label="Tipo Catalogo"
                                    defaultValue=""
                                    options={typecatalogo}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
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
                                    defaultValue=""
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
                </form>
            </Grid>
        </MainCard>
    );
};

export default Catalog;