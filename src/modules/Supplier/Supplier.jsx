import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertSupplier } from 'api/clients/SupplierClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import { FormatDate } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { PostSupplier } from 'formatdata/SupplierForm';

const validationSchema = yup.object().shape({
    codiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    nombProv: yup.string().required(`${ValidationMessage.Requerido}`),
    teleProv: yup.string().required(`${ValidationMessage.Requerido}`),
    emaiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    contaProv: yup.string().required(`${ValidationMessage.Requerido}`),
    ciudProv: yup.string().required(`${ValidationMessage.Requerido}`),
    direProv: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Supplier = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSupplier, setLsSupplier] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [supplierArray, setSupplierArray] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_PROVEEDOR);
            var resultSupplier = lsServerSupplier.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSupplier(resultSupplier);

            const lsServerPais = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CIUDADES);
            var resultPais = lsServerPais.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCiudad(resultPais);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostSupplier(datos.codiProv, datos.nombProv, datos.teleProv, datos.emaiProv,
                datos.contaProv, datos.ciudProv, JSON.stringify(supplierArray), datos.direProv,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (supplierArray.length != 0) {
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
                        setSupplierArray([]);
                    }
                }
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Por favor, seleccione por lo menos un proveedor',
                    variant: 'alert',
                    alertSeverity: 'warning',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Esta Proveedor ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Registrar Proveedor">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="codiProv"
                            label="Código"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="nombProv"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="teleProv"
                            label="Teléfono"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="ciudProv"
                            label="Ciudad"
                            defaultValue=""
                            options={lsCiudad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputMultiSelects
                        onChange={(event, value) => setSupplierArray(value)}
                        value={supplierArray}
                        label="Tipo Proveedor"
                        options={lsSupplier}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="direProv"
                            label="Dirrección"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ pt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
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
        </MainCard>
    );
};

export default Supplier;