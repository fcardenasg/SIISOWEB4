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
import Cargando from 'components/Cargando';
import { PutSupplier } from 'formatdata/SupplierForm';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdateSuppliers, GetByIdSupplier } from 'api/clients/SupplierClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputMultiSelects from 'components/input/InputMultiSelects';

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
    const { id } = useParams();

    /* NUESTROS USESTATE */
    const [lsSupplier, setLsSupplier] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [lsPais, setPais] = useState([]);
    const [supplierArray, setSupplierArray] = useState([]);

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerSupplierId = await GetByIdSupplier(id);
            if (lsServerSupplierId.status === 200) {
                setSupplier(lsServerSupplierId.data);
                setSupplierArray(JSON.parse(lsServerSupplierId.data.tipoProv));
            }

            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Proveedor);
            var resultSupplier = lsServerSupplier.data.entities.map((item) => ({
                nombre: item.nombre
            }));
            setLsSupplier(resultSupplier);

            const lsServerPais = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Pais);
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

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        try {
            const DataToUpdate = PutSupplier(datos.codiProv, datos.nombProv, datos.teleProv, datos.emaiProv,
                datos.contaProv, datos.ciudProv, JSON.stringify(supplierArray), datos.direProv);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateSuppliers(DataToUpdate);
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
                message: 'Este Proveedor ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
            console.log(error);
        }
    };

    return (
        <MainCard title="Actualizar Proveedor">
            {supplier.length != 0 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} spacing={2} sx={{ pt: 3 }}>
                        <Grid container spacing={2} sx={{ pb: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={supplier.codiProv}
                                        fullWidth
                                        disabled
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
                                        defaultValue={supplier.nombProv}
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
                                        defaultValue={supplier.teleProv}
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
                                        defaultValue={supplier.emaiProv}
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
                                        defaultValue={supplier.contaProv}
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
                                        defaultValue={supplier.ciudProv}
                                        options={lsPais}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setSupplierArray(value)}
                                    value={supplierArray}
                                    label="Tipo Proveedor"
                                    options={lsSupplier}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={supplier.direProv}
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
            ) : <Cargando />}
        </MainCard>
    );
};

export default UpdateSupplier;