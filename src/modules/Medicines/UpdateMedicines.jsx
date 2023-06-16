import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutMedicamentos } from 'formatdata/MedicinesForm';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdMedicines, UpdateMediciness } from 'api/clients/MedicinesClient';
import InputCheckBox from 'components/input/InputCheckBox';

const validationSchema = yup.object().shape({
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido),
    stopMinimo: yup.string().required(ValidationMessage.Requerido),
});

const UpdateMedicines = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();
    const navigate = useNavigate();

    const [lsMedicines, setLsMedicines] = useState([]);
    const [lsUnidad, setLsUnidad] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    async function GetAll() {
        try {
            const lsServerSupplierId = await GetByIdMedicines(id);
            if (lsServerSupplierId.status === 200)
                setLsMedicines(lsServerSupplierId.data);

            const lsServerUnidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.UNIDAD);
            var resultUnidad = lsServerUnidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsUnidad(resultUnidad);
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const methods = useForm(
        { resolver: yupResolver(validationSchema) }
    );
    const { handleSubmit, formState: { errors } } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutMedicamentos(id, datos.codigo, datos.descripcion, datos.idUnidad, datos.stopMinimo, datos.estado, user.nameuser);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateMediciness(DataToUpdate);
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
        <MainCard title="Actualizar Medicamento">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsMedicines.length != 0 ? (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsMedicines.codigo}
                                    fullWidth
                                    disabled
                                    name="codigo"
                                    label="Código"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.codigo}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsMedicines.descripcion}
                                    fullWidth
                                    name="descripcion"
                                    label="Descripción"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.descripcion}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    defaultValue={lsMedicines.idUnidad}
                                    name="idUnidad"
                                    label="Unidad"
                                    options={lsUnidad}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idUnidad}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsMedicines.stopMinimo}
                                    fullWidth
                                    name="stopMinimo"
                                    label="Stop Minimo"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.stopMinimo}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item alignItems="center" xs={12} md={4}>
                            <FormProvider {...methods}>
                                <InputCheckBox
                                    label="Estado"
                                    name="estado"
                                    size={30}
                                    defaultValue={lsMedicines.estado}
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/medicines/list")}>
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

export default UpdateMedicines;