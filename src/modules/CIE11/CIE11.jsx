import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import InputSelect from 'components/input/InputSelect';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { InsertCIE11 } from 'api/clients/CIE11Client';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const lsTipoCie = [{ value: 'CIE10', label: 'CIE10' }, { value: 'CIE11', label: 'CIE11' }]

const validationSchema = yup.object().shape({
    id: yup.string().required(ValidationMessage.Requerido),
    dx: yup.string().required(ValidationMessage.Requerido),
    tipoCie: yup.string().nullable().required(ValidationMessage.Requerido)
});

const CIE11 = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors, reset } = methods;

    const handleClick = async (datos) => {
        try {
            datos.usuarioRegistro = user?.nameuser;

            const result = await InsertCIE11(datos);
            if (result.status === 200) {
                setOpenSuccess(true);
                reset();
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Registrar CIE10 / CIE11">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={2}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="id"
                            label="ID"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={4} lg={8}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="dx"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="tipoCie"
                            label="Tipo CIE"
                            defaultValue=""
                            options={lsTipoCie}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
            </Grid>

            <Grid item sx={{ pt: 4 }} xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={2}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={() => navigate("/cie11/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CIE11;