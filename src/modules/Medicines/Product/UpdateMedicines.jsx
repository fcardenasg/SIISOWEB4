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
import ListDetails from './ListDetails';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';
import { GetComboMedicamentosProductos } from 'api/clients/MedicamentosProductosClient';

const ValidationMessageStop = {
    Requerido: 'Este campo es requerido',
    MinimoMayorMaximo: 'El stop mínimo no puede ser mayor que el stop máximo',
    MaximoMenorMinimo: 'El stop máximo no puede ser menor que el stop mínimo',
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

const UpdateMedicines = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataMedicines, setDataMedicines] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsMedicamento, setLsMedicamento] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerData = await GetByIdMedicines(id);
            if (lsServerData.status === 200)
                setDataMedicines(lsServerData.data);

            const lsServerMedicamento = await GetComboMedicamentosProductos();
            setLsMedicamento(lsServerMedicamento.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.id = id;
            datos.usuarioModifico = user?.nameuser;
            datos.stopMaximo = parseInt(datos.stopMaximo);
            datos.stopMinimo = parseInt(datos.stopMinimo);

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
        <MainCard title="Actualizar medicamento">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {dataMedicines !== null ?
                <Fragment>
                    <FormProvider {...methods}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={6}>
                                <InputSelectAutocomplete
                                    disabled
                                    name="idProducto"
                                    label="Producto"
                                    options={lsMedicamento}
                                    defaultValue={dataMedicines.idProducto}
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

                            <Grid item xs={12} md={6} lg={2}>
                                <InputCheckBox
                                    label="Estado"
                                    name="estado"
                                    size={30}
                                    defaultValue={dataMedicines.estado}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <ListDetails idMedicamento={id} />
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