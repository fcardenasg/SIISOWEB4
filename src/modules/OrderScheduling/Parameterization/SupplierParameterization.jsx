import { Button, Grid } from '@mui/material';
import { CodCatalogo, DefaultValue, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
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
import { InsertMedicamentosPedido } from 'api/clients/MedicamentosPedidoClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import InputDatePicker from 'components/input/InputDatePicker';
import InputText from 'components/input/InputText';
import useAuth from 'hooks/useAuth';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';
import { GetAllByTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';

const validationSchema = yup.object().shape({
    numPedido: yup.string().required(ValidationMessage.Requerido),
    fechaPedido: yup.string().required(ValidationMessage.Requerido),
});

export default function MedicinesOrders() {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsTipoRNM, setLsTipoRNM] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);
    const [lsEstudioParaclinico, setLsEstudioParaclinico] = useState([]);

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, watch, setValue, formState: { errors } } = methods;
    const values = watch();

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerProveedor = await GetAllSupplier(0, 0);
                var resultProveedor = lsServerProveedor.data.entities
                    .filter(fil => fil.tipoProv != DefaultValue.PROVEEDOR_MEDICAMENTO && fil.estadoCampania == true)
                    .map((item) => ({
                        value: item.codiProv,
                        label: item?.nombProv?.toUpperCase(),
                        tipoProv: item?.tipoProv,
                        ciudProv: item?.ciudProv
                    }));
                setLsProveedor(resultProveedor);

                const lsServerCiudad = await GetByTipoCatalogoCombo(CodCatalogo.CIUDADES);
                setLsCiudad(lsServerCiudad.data);

                const lsServerTipoRNM = await GetByTipoCatalogoCombo(CodCatalogo.TIPORNM_ORDENES_PARACLINICOS);
                setLsTipoRNM(lsServerTipoRNM.data);

                const lsServerLaboratorio = await GetByTipoCatalogoCombo(CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS);
                setLsLaboratorio(lsServerLaboratorio.data);

                const lsServerEstudioParaclinico = await GetByTipoCatalogoCombo(CodCatalogo.ESTUDIO_EXAMEN_PARACLINICOS);
                setLsEstudioParaclinico(lsServerEstudioParaclinico.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    useEffect(() => {
        if (values?.idProveedor) {
            const lsData = lsProveedor.find(fil => fil.value == values?.idProveedor?.value);
            console.log(lsData);
            setValue('idCiudad', lsData?.ciudProv);
            setValue('idParaclinico', lsData?.tipoProv);
        } else {
            setValue('idCiudad', '');
            setValue('idParaclinico', '');
            setValue('idTipoExamen', '');
        }
    }, [values?.idProveedor]);

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
        <MainCard title="Registrar parametrización de proveedor">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelectAutocomplete
                            name="idProveedor"
                            label="Proveedor"
                            options={lsProveedor}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    {values?.idParaclinico === DefaultValue.ORDENES_FECHA_EXAM_FISICO ?
                        <>
                            <Grid item xs={12} md={6} lg={4}>
                                <InputDatePicker
                                    label="Fecha De Examen Físico"
                                    name="fechaExamenFisico"
                                    defaultValue={new Date()}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputCheckBox
                                    label="Asistio"
                                    name="asistio"
                                    size={30}
                                    defaultValue={false}
                                />
                            </Grid>
                        </> :
                        <>
                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    disabled
                                    name="idParaclinico"
                                    label="Paraclínico"
                                    defaultValue=""
                                    options={lsEstudioParaclinico}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idParaclinico}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    disabled
                                    name="idCiudad"
                                    label="Ciudad"
                                    defaultValue=""
                                    options={lsCiudad}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idCiudad}
                                />
                            </Grid>
                        </>
                    }

                    {values?.idParaclinico === DefaultValue.ORDENES_LABORATORIO &&
                        <Grid item xs={12} md={6} lg={8}>
                            <InputSelect
                                name="idTipoExamen"
                                label="Tipo de examen"
                                defaultValue=""
                                options={lsLaboratorio}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idTipoExamen}
                            />
                        </Grid>
                    }

                    {values?.idParaclinico === DefaultValue.ORDENES_RNM &&
                        <Grid item xs={12} md={6} lg={4}>
                            <InputSelect
                                name="idTipoExamenRNM"
                                label="Tipo de examen RNM"
                                options={lsTipoRNM}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idTipoExamenRNM}
                            />
                        </Grid>
                    }

                    <Grid item xs={12} md={6} lg={4}>
                        <InputDatePicker
                            label="Fecha"
                            name="fecha"
                            defaultValue={new Date()}
                            bug={errors.fecha}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputCheckBox
                            label="Estado"
                            name="estado"
                            size={30}
                            defaultValue={true}
                        />
                    </Grid>
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
                        <Button variant="outlined" fullWidth onClick={() => navigate("/supplier-parameterization/list")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </MainCard>
    );
}