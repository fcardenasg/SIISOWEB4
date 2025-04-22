import { Button, Divider, Grid } from '@mui/material';
import { AccionMenu, DefaultValue, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import InputDatePicker from 'components/input/InputDatePicker';
import InputText from 'components/input/InputText';
import AddMedicinesOrders from './AddMedicinesOrders';
import useAuth from 'hooks/useAuth';
import { InsertMedicamentosPedido } from 'api/clients/MedicamentosPedidoClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const validationSchema = yup.object().shape({
    numPedido: yup.string().required(ValidationMessage.Requerido),
    fechaPedido: yup.string().required(ValidationMessage.Requerido),
    idProveedor: yup.string().required(ValidationMessage.Requerido)
});

export default function MedicinesOrders() {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsProveedor, setLsProveedor] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

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
            } catch (error) { }
        }

        getAll();
    }, []);

    useEffect(() => {
        function generateCod() {
            const ahora = new Date();
            const anio = ahora.getFullYear();
            const mes = String(ahora.getMonth() + 1).padStart(2, '0');
            const dia = String(ahora.getDate()).padStart(2, '0');
            const horas = String(ahora.getHours()).padStart(2, '0');
            const minutos = String(ahora.getMinutes()).padStart(2, '0');

            setValue('numPedido', `PED${anio}${mes}${dia}${horas}${minutos}`);
        }

        generateCod();
    }, []);

    const handleClick = async (datos) => {
        try {
            datos.usuarioRegistro = user?.nameuser;
            datos.idSede = parseInt(user?.idsede);

            const result = await InsertMedicamentosPedido(datos);
            if (result.status === 200) {
                setOpenSuccess(true);
                setValue('id', result.data);
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
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Pedidos}>
            <MainCard title={`Registrar pedido - Sede: ${user?.namesede}`}>
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                            <InputText
                                disabled
                                defaultValue=""
                                name="numPedido"
                                label="Número de pedido"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.numPedido}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputDatePicker
                                label="Fecha de pedido"
                                name="fechaPedido"
                                defaultValue={new Date()}
                                bug={errors.fechaPedido}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <InputSelect
                                name="idProveedor"
                                label="Proveedor"
                                defaultValue=""
                                options={lsProveedor}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idProveedor}
                            />
                        </Grid>

                        {values?.id &&
                            <>
                                <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>

                                <Grid item xs={12}>
                                    <AddMedicinesOrders idPedido={values?.id} />
                                </Grid>
                            </>
                        }
                    </Grid>
                </FormProvider>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={4} md={2}>
                        <AnimateButton>
                            <Button disabled={values?.id} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
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
            </MainCard>
        </ValidateActionSkeleton>
    );
}