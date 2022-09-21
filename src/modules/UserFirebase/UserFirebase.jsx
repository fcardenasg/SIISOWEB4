import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import firebase from 'firebase/app';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';

const validationSchema = yup.object().shape({
    correo: yup.string().email('Debe ser un correo electrónico válido').max(255).required('El correo es requerido'),
    password: yup.string().max(255).required('La contraseña es Requerida'),
    idRol: yup.string().required('Debe elegir un Rol')
});

const lsRol = [
    {
        value: 'admin',
        label: 'ADMINISTRADOR'
    },
    {
        value: 'visitante',
        label: 'VISITANTE'
    },
    {
        value: 'medico',
        label: 'MÉDICO'
    },
    {
        value: 'doctor',
        label: 'DOCTOR'
    },
]

const UserFirebase = () => {
    const { firebaseRegister, user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleClick = async (datos) => {
        try {
            await firebaseRegister(datos.correo, datos.password).then(
                (userFireBase) => {
                    firebase.firestore().doc(`Usuarios/${userFireBase.user.uid}`).set({
                        correo: datos.correo,
                        rol: datos.idRol
                    });

                    setOpenSuccess(true);
                    reset();
                }
            );
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo guardar el registro');
        }
    };

    return (
        <MainCard title="Registrar Usuarios">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            autoComplete="off"
                            defaultValue=""
                            name="correo"
                            label="Correo"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.correo}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            autoComplete="off"
                            defaultValue=""
                            name="password"
                            label="Contraseña"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.password}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idRol"
                            label="Rol"
                            defaultValue=""
                            options={lsRol}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idRol}
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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/userfire/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserFirebase;