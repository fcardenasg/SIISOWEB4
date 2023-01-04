import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutSupplier } from 'formatdata/SupplierForm';
import { UpdateSuppliers, GetByIdSupplier } from 'api/clients/SupplierClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, CodCatalogo, Message, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';

/* Validamos campos, los que sean necesarios */
const validationSchema = yup.object().shape({
    codiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    nombProv: yup.string().required(`${ValidationMessage.Requerido}`),
    teleProv: yup.string().required(`${ValidationMessage.Requerido}`),
    emaiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoProveedor: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateSupplier = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();
    const navigate = useNavigate();

    const [supplier, setSupplier] = useState([]);
    const [lsSupplier, setLsSupplier] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    /* Agregar algún estado que necesitemos para mensaje */
    const [resultMessage, setResultMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    async function GetAll() {
        try {
            /* Modificamos el metodo de Obtener los datos por ID */
            await GetByIdSupplier(id).then(result => {
                if (result.data.message === Message.NoExiste) {
                    setOpenError(true);
                    setErrorMessage(result.data.message);
                } else {
                    setSupplier(result.data);
                }
            });

            /* Ajustamos nuevamente los combos como en el agregar */
            const lsServerSupplier = await GetAllByTipoCatalogo(CodCatalogo.TIPO_PROVEEDOR);
            setLsSupplier(lsServerSupplier.data);

            const lsServerPais = await GetAllByTipoCatalogo(CodCatalogo.CIUDADES);
            setLsCiudad(lsServerPais.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    /* Ajustamos para la validacion de campos */
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { handleSubmit, formState: { errors } } = methods;

    const handleClick = async (datos) => {
        try {
            /* Modificamos el correo por el nombre del usuario */
            const DataToUpdate = PutSupplier(datos.codiProv, datos.nombProv, datos.teleProv, datos.emaiProv,
                datos.contaProv, datos.ciudProv, datos.idTipoProveedor, datos.direProv,
                supplier.usuarioRegistro, supplier.fechaRegistro, user.nameuser, FormatDate(new Date()));

            /* Modificamos el consumo del servicio de actualziar */
            if (Object.keys(datos.length !== 0)) {
                await UpdateSuppliers(DataToUpdate).then(result => {
                    if (result.data.message === Message.Actualizar) {
                        setOpenUpdate(true);
                        setResultMessage(result.data.message);
                    } else {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    }
                });
            }
        } catch (error) {
            /* Validamos errores de servicio */
            setOpenError(true);
            setErrorMessage(Message.ErrorServicio);
        }
    };

    return (
        <MainCard title="Actualizar Proveedor">
            {/* Indicamos el mensaje que nos da como resultado aquí */}
            <MessageUpdate message={resultMessage} open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {supplier.length != 0 ? (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={supplier.codiProv}
                                    fullWidth
                                    disabled
                                    name="codiProv"
                                    label="Código"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.codiProv}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={supplier.nombProv}
                                    fullWidth
                                    name="nombProv"
                                    label="Nombre"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.nombProv}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={supplier.teleProv}
                                    fullWidth
                                    name="teleProv"
                                    label="Teléfono"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.teleProv}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={supplier.emaiProv}
                                    fullWidth
                                    name="emaiProv"
                                    label="Email"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.emaiProv}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={supplier.contaProv}
                                    fullWidth
                                    name="contaProv"
                                    label="Contacto"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.contaProv}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ciudProv"
                                    label="Ciudad"
                                    defaultValue={supplier.ciudProv}
                                    options={lsCiudad}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.ciudProv}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoProveedor"
                                    label="Tipo Proveedor"
                                    defaultValue={supplier.tipoProv}
                                    options={lsSupplier}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idTipoProveedor}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={supplier.direProv}
                                    fullWidth
                                    name="direProv"
                                    label="Dirrección"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.direProv}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/supplier/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment>
            ) : <Cargando />}
        </MainCard>
    );
};

export default UpdateSupplier;