import { Button, Divider, Grid } from '@mui/material';
import { AccionMenu, DefaultValue, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { GetByIdMedicamentosPedido, UpdateMedicamentosPedidos } from 'api/clients/MedicamentosPedidoClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import InputDatePicker from 'components/input/InputDatePicker';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import useAuth from 'hooks/useAuth';
import AddMedicinesOrders from './AddMedicinesOrders';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const validationSchema = yup.object().shape({
    numPedido: yup.string().required(ValidationMessage.Requerido),
    fechaPedido: yup.string().required(ValidationMessage.Requerido),
    idProveedor: yup.string().required(ValidationMessage.Requerido),
    numCompra: yup.string().required(ValidationMessage.Requerido)
});

export default function UpdateMedicinesOrders() {
    const theme = useTheme();
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsProveedor, setLsProveedor] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [dataModel, setDataModel] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, watch, setValue, formState: { errors }, reset } = methods;
    const values = watch();

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerProveedor = await GetAllSupplier();
                var resultProveedor = lsServerProveedor.data.filter(fil => fil.tipoProv == DefaultValue.PROVEEDOR_MEDICAMENTO).map((item) => ({
                    value: item.codiProv,
                    label: item?.nombProv?.toUpperCase()
                }));
                setLsProveedor(resultProveedor);

                const lsServerData = await GetByIdMedicamentosPedido(id);
                if (lsServerData.status === 200) {
                    setDataModel(lsServerData.data);
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            datos.usuarioRegistro = user?.nameuser;
            datos.idSede = parseInt(user?.idsede);

            const result = await UpdateMedicamentosPedidos(datos);
            if (result.status === 200) {
                setOpenSuccess(true);
            } else {
                setOpenError(true);
                setErrorMessage(result.data.datos);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.Pedidos}>
            <MainCard title={`Registrar pedido - Sede: ${user?.namesede}`}>
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                {dataModel !== null ?
                    <FormProvider {...methods}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    disabled
                                    defaultValue={dataModel.numPedido}
                                    name="numPedido"
                                    label="Número de pedido"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.numPedido}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputDatePicker
                                    label="Fecha de pedido"
                                    name="fechaPedido"
                                    defaultValue={dataModel.fechaPedido}
                                    bug={errors.fechaPedido}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputSelect
                                    name="idProveedor"
                                    label="Proveedor"
                                    defaultValue={dataModel.idProveedor}
                                    options={lsProveedor}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idProveedor}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={dataModel.numCompra}
                                    name="numCompra"
                                    label="Número de compra"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.numCompra}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>

                            <Grid item xs={12}>
                                <AddMedicinesOrders idPedido={id} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={4} md={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={4} md={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/medicines-orders/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </FormProvider> : <Cargando />
                }
            </MainCard>
        </ValidateActionSkeleton>
    );
}