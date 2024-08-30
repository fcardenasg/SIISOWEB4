import { useState, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import InputSelect from 'components/input/InputSelect';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { UpdateCieSystem } from 'api/clients/CIE11Client';

const validationSchema = yup.object().shape({
    cie: yup.string().required(ValidationMessage.Requerido)
});

const lsCie = [{ value: 1, label: 'CIE10' }, { value: 2, label: 'CIE11' }, { value: 3, label: 'AMBOS' }]

const ChangeCIE = ({ setOpenModalCie }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit } = methods;

    const handleClick = async (datos) => {
        try {
            var result = await UpdateCieSystem(datos);
            if (result.status === 200) {
                setOpenSuccess(true);
                setErrorMessage("CIE cambiado correctamente");

                setTimeout(() => {
                    setOpenModalCie(false);
                }, 500);
            } else {
                setOpenError(true);
                setErrorMessage(Message.RegistroNoGuardado);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="cie"
                            label="El sistema usará"
                            defaultValue=""
                            options={lsCie}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </FormProvider>
                </Grid>

                <Typography sx={{ pt: 1.5 }} align="center" variant="body2">
                    Recuerde que al cambiar el CIE y presionar el botón grabar, automáticamente todo el sistema usara el CIE seleccionado
                </Typography>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                            {TitleButton.Guardar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ChangeCIE;