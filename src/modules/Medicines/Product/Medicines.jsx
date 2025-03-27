import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { GetComboMedicamentosProductos } from 'api/clients/MedicamentosProductosClient';
import { InsertMedicines } from 'api/clients/MedicinesClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';
import InputText from 'components/input/InputText';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ValidationMessageStop = {
    Requerido: 'Este campo es requerido',
    MinimoMayorMaximo: 'El valor mínimo no puede ser mayor que el valor máximo',
    MaximoMenorMinimo: 'El valor máximo no puede ser menor que el valor mínimo',
};

const validationSchema = yup.object().shape({
    idProducto: yup.object().required(ValidationMessage.Requerido),
    stopMinimo: yup.string().required(ValidationMessageStop.Requerido).test(
        'minimo-mayor-maximo',
        ValidationMessageStop.MinimoMayorMaximo,
        function (value) {
            const stopMaximo = this.resolve(yup.ref('stopMaximo'));
            return !stopMaximo || !value || Number(value) <= Number(stopMaximo);
        }
    ),
    stopMaximo: yup.string().required(ValidationMessageStop.Requerido).test(
        'maximo-menor-minimo',
        ValidationMessageStop.MaximoMenorMinimo,
        function (value) {
            const stopMinimo = this.resolve(yup.ref('stopMinimo'));
            return !stopMinimo || !value || Number(value) >= Number(stopMinimo);
        }
    ),
});

const Medicines = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsMedicamento, setLsMedicamento] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServerMedicamento = await GetComboMedicamentosProductos();
            setLsMedicamento(lsServerMedicamento.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.usuarioRegistro = user?.nameuser;
            datos.idSede = parseInt(user?.idsede);
            datos.stopMaximo = parseInt(datos.stopMaximo);
            datos.stopMinimo = parseInt(datos.stopMinimo);

            const result = await InsertMedicines(datos);
            if (result.data.exito) {
                setOpenSuccess(true);
                reset();
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
        <MainCard title={`Registrar medicamento - Sede: ${user?.namesede}`}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <InputSelectAutocomplete
                            name="idProducto"
                            label="Producto"
                            options={lsMedicamento}
                            defaultValue={null}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            defaultValue=""
                            type="number"
                            fullWidth
                            name="stopMinimo"
                            label="Stop minimo"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.stopMinimo}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputText
                            defaultValue=""
                            type="number"
                            fullWidth
                            name="stopMaximo"
                            label="Stop máximo"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.stopMaximo}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={2}>
                        <InputCheckBox
                            label="Estado"
                            name="estado"
                            size={30}
                            defaultValue={true}
                        />
                    </Grid>
                </Grid>
            </FormProvider>

            <Grid item xs={12} sx={{ pt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={2}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={() => navigate("/medicines/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Medicines;