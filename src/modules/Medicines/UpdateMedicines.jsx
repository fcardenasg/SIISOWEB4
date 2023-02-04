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

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutMedicamentos } from 'formatdata/MedicinesForm';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import InputSwitch from 'components/input/InputSwitch';
import { TitleButton, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdMedicines, UpdateMediciness } from 'api/clients/MedicinesClient';

const UpdateMedicines = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const { id } = useParams();
    const navigate = useNavigate();

    const [existencia, setExistencia] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [lsSupplier, setLsSupplier] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    async function GetAll() {
        try {
            const lsServerSupplierId = await GetByIdMedicines(id);
            if (lsServerSupplierId.status === 200) {
                setMedicines(lsServerSupplierId.data);
                setExistencia(lsServerSupplierId.data.existencia);
            }

            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.UNIDAD);
            var resultSupplier = lsServerSupplier.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSupplier(resultSupplier);
        } catch (error) {
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
            const DataToUpdate = PutMedicamentos(id, datos.codigo, datos.descripcion, datos.idUnidad, datos.cantidad,
                existencia, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

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

            {medicines.length != 0 ? (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={medicines.codigo}
                                    fullWidth
                                    disabled
                                    name="codigo"
                                    label="Código"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={medicines.descripcion}
                                    fullWidth
                                    name="descripcion"
                                    label="Descripción"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    defaultValue={medicines.idUnidad}
                                    name="idUnidad"
                                    label="Unidad"
                                    options={lsSupplier}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={medicines.cantidad}
                                    fullWidth
                                    name="cantidad"
                                    label="Cantidad"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item alignItems="center" xs={12} md={4}>
                            <InputSwitch
                                label="Existencia"
                                onChange={(e) => setExistencia(e.target.checked)}
                                checked={existencia}
                            />
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