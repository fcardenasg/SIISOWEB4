import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdMedicines, UpdateMediciness } from 'api/clients/MedicinesClient';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllSupplier } from 'api/clients/SupplierClient';

const ValidationMessageStop = {
    Requerido: 'Este campo es requerido',
    MinimoMayorMaximo: 'El stop mínimo no puede ser mayor que el stop máximo',
    MaximoMenorMinimo: 'El stop máximo no puede ser menor que el stop mínimo',
};

const validationSchema = yup.object().shape({
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido),
    formaFarmaceutica: yup.string().required(ValidationMessage.Requerido),
    presentacionComercial: yup.string().required(ValidationMessage.Requerido),
    idProveedor: yup.string().required(ValidationMessage.Requerido),
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
    fechaLote: yup.string().nullable()
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
        }),
});

const UpdateMedicines = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();

    const [dataMedicines, setDataMedicines] = useState(null);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsUnidad, setLsUnidad] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerData = await GetByIdMedicines(id);
            if (lsServerData.status === 200)
                setDataMedicines(lsServerData.data);

            const lsServerTipo = await GetByTipoCatalogoCombo(CodCatalogo.UNIDAD);
            setLsUnidad(lsServerTipo.data);

            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.id = id;
            datos.usuarioModifico = user.nameuser;
            datos.stopMaximo = parseInt(datos.stopMaximo);
            datos.stopMinimo = parseInt(datos.stopMinimo);
            datos.idUnidad = parseInt(datos.idUnidad);

            datos.idUnidad = datos.idUnidad || null;
            datos.concentracion = datos.concentracion || null;
            datos.lote = datos.lote || null;
            datos.fechaLote = datos.fechaLote || null;
            datos.registroSanitario = datos.registroSanitario || null;

            const result = await UpdateMediciness(datos);
            if (result.data.exito) {
                setOpenUpdate(true);
            } else {
                setOpenError(true);
                setErrorMessage(`${result.data.datos}`);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Registrar medicamento">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {dataMedicines !== null ?
                <Fragment>
                    <FormProvider {...methods}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.codigo}
                                    name="codigo"
                                    label="Código"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.codigo}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.descripcion}
                                    name="descripcion"
                                    label="Descripción"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.descripcion}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    name="idProveedor"
                                    label="Proveedor"
                                    defaultValue={dataMedicines.idProveedor}
                                    options={lsProveedor}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idProveedor}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    name="idUnidad"
                                    label="Unidad"
                                    defaultValue={dataMedicines.idUnidad}
                                    options={lsUnidad}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idUnidad}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.formaFarmaceutica}
                                    name="formaFarmaceutica"
                                    label="Forma farmacéutica"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.formaFarmaceutica}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.concentracion}
                                    name="concentracion"
                                    label="Concentración"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.concentracion}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.lote}
                                    name="lote"
                                    label="Lote"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.lote}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputDatePicker
                                    label="Fecha de lote"
                                    name="fechaLote"
                                    defaultValue={dataMedicines.fechaLote}
                                    bug={errors.fechaLote}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputDatePicker
                                    label="Fecha de vencimiento"
                                    name="fechaVencimiento"
                                    defaultValue={dataMedicines.fechaVencimiento}
                                    bug={errors.fechaVencimiento}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.presentacionComercial}
                                    name="presentacionComercial"
                                    label="Presentación comercial"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.presentacionComercial}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputText
                                    defaultValue={dataMedicines.registroSanitario}
                                    name="registroSanitario"
                                    label="Registro sanitario"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.registroSanitario}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={2}>
                                <InputText
                                    defaultValue={dataMedicines.stopMinimo}
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
                                    defaultValue={dataMedicines.stopMaximo}
                                    type="number"
                                    fullWidth
                                    name="stopMaximo"
                                    label="Stop máximo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.stopMaximo}
                                />
                            </Grid>

                            <Grid item alignItems="center" xs={12} md={6} lg={4}>
                                <InputCheckBox
                                    label="Estado"
                                    name="estado"
                                    size={30}
                                    defaultValue={dataMedicines.estado}
                                />
                            </Grid>
                        </Grid>
                    </FormProvider>

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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/medicines/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </MainCard>
    );
};

export default UpdateMedicines;