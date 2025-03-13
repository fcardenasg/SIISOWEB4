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

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { InsertMedicines } from 'api/clients/MedicinesClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelect from 'components/input/InputSelect';
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
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido),
    idLaboratorio: yup.string().required(ValidationMessage.Requerido),
    formaFarmaceutica: yup.string().required(ValidationMessage.Requerido),
    presentacionComercial: yup.string().required(ValidationMessage.Requerido),
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
    /* fechaLote: yup.string().nullable()
        .test('formato-fecha-lote', 'Formato de fecha inválido (YYYY-MM-DD)', (value) => {
            if (!value) return true;
            return /^\d{4}-\d{2}-\d{2}$/.test(value);
        })
        .test('is-after-1950', 'El año debe ser mayor al que intenta registrar', (value) => {
            if (!value) return true;
            const year = new Date(value).getFullYear();
            return year >= 1950;
        })
        .test('is-not-past-date', 'La fecha de vencimiento no puede ser anterior o actual', (value) => {
            if (!value) return true;
            const inputDate = new Date(value);
            const currentDate = new Date();

            inputDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate;
        })
        .test('valid-year', 'Año de lote inválido', (value) => {
            if (!value) return true;
            const year = new Date(value).getFullYear();
            return year <= new Date().getFullYear() + 10;
        }),
    fechaVencimiento: yup.string().required('La fecha de vencimiento es obligatoria')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
        .test('is-not-past-date', 'La fecha de vencimiento no puede ser anterior o actual', (value) => {
            if (!value) return true;
            const inputDate = new Date(value);
            const currentDate = new Date();

            inputDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate;
        })
        .test('valid-year', 'Año de vencimiento inválido', (value) => {
            const year = new Date(value).getFullYear();
            return year <= new Date().getFullYear() + 20;
        }), */
});

const Warehouse = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsUnidad, setLsUnidad] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            setValue("fechaLote", "");
            setValue("fechaVencimiento", "");

            const lsServerUni = await GetByTipoCatalogoCombo(CodCatalogo.UNIDAD);
            setLsUnidad(lsServerUni.data);

            const lsServerLab = await GetByTipoCatalogoCombo(CodCatalogo.LABORATORIO);
            setLsLaboratorio(lsServerLab.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.usuarioRegistro = user?.nameuser;
            datos.stopMaximo = parseInt(datos.stopMaximo);
            datos.stopMinimo = parseInt(datos.stopMinimo);
            datos.idUnidad = parseInt(datos.idUnidad);
            datos.idLaboratorio = parseInt(datos.idLaboratorio);

            datos.concentracion = datos.concentracion || null;
            datos.registroSanitario = datos.registroSanitario || null;

            const result = await InsertMedicines(datos);
            if (result.data.exito) {
                setOpenSuccess(true);
                reset();

                setValue("fechaLote", "");
                setValue("fechaVencimiento", "");
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
        <MainCard title="Registrar medicamento">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="nombre"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.descripcion}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="idLaboratorio"
                            label="Laboratorio"
                            defaultValue=""
                            options={lsLaboratorio}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idLaboratorio}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="formaFarmaceutica"
                            label="Forma farmacéutica"
                            defaultValue=""
                            options={lsUnidad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.formaFarmaceutica}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="concentracion"
                            label="Concentración"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.concentracion}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="presentacionComercial"
                            label="Presentación comercial"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.presentacionComercial}
                        />
                    </Grid>

                    <Grid item alignItems="center" xs={12} md={6} lg={4}>
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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/warehouse/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Warehouse;