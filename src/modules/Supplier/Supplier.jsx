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
import { InsertSupplier } from 'api/clients/SupplierClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCatalog } from 'api/clients/CatalogClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputMultiSelectCheck from 'components/input/InputMultiSelectCheck';
import { PostSupplier } from 'formatdata/SupplierForm';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    codiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    nombProv: yup.string().required(`${ValidationMessage.Requerido}`),
    teleProv: yup.string().required(`${ValidationMessage.Requerido}`),
    emaiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    contaProv: yup.string().required(`${ValidationMessage.Requerido}`),
    ciudProv: yup.string().required(`${ValidationMessage.Requerido}`),
    /* tipoProv: yup.string().required(`${ValidationMessage.Requerido}`), */
    direProv: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Supplier = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [catalog, setCatalog] = useState([]);
    const [lsPais, setPais] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, errors, reset } = methods;

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetAllCatalog(0, 0);
            var result = lsServer.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(result);

            const lsServerPais = await GetAllByTipoCatalogo(0, 0, 1153);
            var resultPais = lsServerPais.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setPais(resultPais);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const [personName, setPersonName] = useState([]);
    const [personNameString, setPersonNameString] = useState('');

    const handleEvent = (dato) => {
        for (var i = 0; i < dato.length; i++) {
            var finalresult = `${dato}`;
            console.log("finalresult ", finalresult);
            setPersonNameString(finalresult);
        }
    }

    console.log("personName", personName);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        handleEvent(personName);
    };

    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        /* try { */
        const DataToInsert = PostSupplier(datos.codiProv, datos.nombProv, datos.teleProv, datos.emaiProv,
            datos.contaProv, datos.ciudProv, personNameString, datos.direProv);
        if (Object.keys(datos.length !== 0)) {
            const result = await InsertSupplier(DataToInsert);
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
            }
        }
        /* } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Esta Proveedor ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        } */
    };

    const navigate = useNavigate();

    return (
        <MainCard title="Registrar Proveedor">
            <Grid item xs={12} spacing={2} sx={{ pt: 3 }}>
                <form onSubmit={handleSubmit(handleClick)}>
                    <Grid container spacing={2} sx={{ pb: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
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
                                    defaultValue=""
                                    options={lsPais}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputMultiSelectCheck
                                fullWidth
                                onChange={handleChange}
                                value={personName}
                                label="Tipo Proveedor"
                                options={catalog}
                            />
                            {/* <FormProvider {...methods}></FormProvider> */}
                            {/* <InputSelect
                                name="tipoProv"
                                label="Tipo Proveedor"
                                defaultValue=""
                                options={catalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            /> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue=""
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
                </form>
            </Grid>
        </MainCard>
    );
};

export default Supplier;