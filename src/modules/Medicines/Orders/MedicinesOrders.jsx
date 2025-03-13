import { Button, Divider, Grid } from '@mui/material';
import { DefaultValue, TitleButton, ValidationMessage } from 'components/helpers/Enums';
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

const validationSchema = yup.object().shape({
    numPedido: yup.string().required(ValidationMessage.Requerido),
    fechaPedido: yup.string().required(ValidationMessage.Requerido),
    idProveedor: yup.string().required(ValidationMessage.Requerido)
});

export default function MedicinesOrders() {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsProveedor, setLsProveedor] = useState([]);
    const [idMedicamento, setIdMedicamento] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerProveedor = await GetAllSupplier(0, 0);
                var resultProveedor = lsServerProveedor.data.entities.filter(fil => fil.tipoProv == DefaultValue.PROVEEDOR_MEDICAMENTO).map((item) => ({
                    value: item.codiProv,
                    label: item?.nombProv?.toUpperCase()
                }));
                setLsProveedor(resultProveedor);
            } catch (error) { }
        }

        getAll();
    }, []);

    return (
        <MainCard title="Registrar pedido">
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
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

                    <Grid item xs={12} sx={{ my: 2 }}><Divider /></Grid>

                    <Grid item xs={12}>
                        <AddMedicinesOrders />
                    </Grid>
                </Grid>
            </FormProvider>

            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={4} md={2}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth /* onClick={handleSubmit(handleClick)} */>
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
    );
}