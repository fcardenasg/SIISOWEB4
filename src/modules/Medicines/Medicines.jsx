import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from 'hooks/useAuth';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, ValidationMessage, CodCatalogo, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostMedicamentos } from 'formatdata/MedicinesForm';
import { InsertMedicines } from 'api/clients/MedicinesClient';
import InputCheckBox from 'components/input/InputCheckBox';

const validationSchema = yup.object().shape({
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido),
    stopMinimo: yup.string().required(ValidationMessage.Requerido),
});

const Medicines = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsUnidad, setLsUnidad] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function GetAll() {
        try {
            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.UNIDAD);
            var resultSupplier = lsServerSupplier.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsUnidad(resultSupplier);
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostMedicamentos(datos.codigo, datos.descripcion, datos.idUnidad, datos.stopMinimo, undefined, undefined, undefined,
                datos.estado, user.nameuser, undefined, undefined, undefined);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicines(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Registrar Medicamento">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
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
                            defaultValue=""
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
                            name="idUnidad"
                            label="Unidad"
                            defaultValue=""
                            options={lsUnidad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idUnidad}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            type="number"
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
                            defaultValue={true}
                        />
                    </FormProvider>
                </Grid>
            </Grid>

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