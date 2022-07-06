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
import { TitleButton, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';

const UpdateSupplier = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();
    const navigate = useNavigate();

    const [supplier, setSupplier] = useState([]);
    const [lsSupplier, setLsSupplier] = useState([]);
    const [lsPais, setLsPais] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    async function GetAll() {
        try {
            const lsServerSupplierId = await GetByIdSupplier(id);
            if (lsServerSupplierId.status === 200)
                setSupplier(lsServerSupplierId.data);

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
            setLsPais(resultPais);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */
    const { handleSubmit, errors } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutSupplier(datos.codiProv, datos.nombProv, datos.teleProv, datos.emaiProv,
                datos.contaProv, datos.ciudProv, datos.idTipoProveedor, datos.direProv,
                supplier.usuarioRegistro, supplier.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateSuppliers(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <MainCard title="Actualizar Proveedor">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
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
                                    bug={errors}
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
                                    bug={errors}
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
                                    bug={errors}
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
                                    bug={errors}
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
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoProveedor"
                                    label="Tipo Proveedor"
                                    defaultValue={supplier.tipoProv}
                                    options={lsSupplier}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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
                                        {TitleButton.Actualizar}
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
                </Fragment>
            ) : <Cargando />}
        </MainCard>
    );
};

export default UpdateSupplier;