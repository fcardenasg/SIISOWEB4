import MainCard from 'ui-component/cards/MainCard';
import InputSwitch from 'components/input/InputSwitch'
import { Divider, Grid, useMediaQuery, Button } from '@mui/material';
import InputSelect from 'components/input/InputSelect';
import InputDate from 'components/input/InputDate';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomDateTime from 'views/forms/components/DateTime/CustomDateTime';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

const datosDosis = [
    {
        label: 'Primera dosis',
        value: 1
    },
    {
        label: 'Segunda dosis',
        value: 2
    },
    {
        label: 'Tercera dosis',
        value: 3
    }
]

const Vaccination = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [form, setForm] = useState(false);
    const [age, setAge] = useState('');


    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value);
        console.log(age);
    };

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    const handleSwitch = (event) => {
        setForm(event.target.checked);
    }

    const handleCombo = (event) => {
        console.log(event);
    }

    return (
        <MainCard title="Información de Vacunación">
            <InputSwitch
                label="Vacunado"
                onChange={handleSwitch}
            />

            <Divider sx={{ pt: 2 }} />

            {form ? (
                <>
                    <form>
                        <Grid container justifyContent="center" alignItems="center" xs={12} sx={{ pt: 3 }}>
                            <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="laboratorio"
                                            label="Laboratorio"
                                            defaultValue=""
                                            value={age}
                                            onChange={handleChange}
                                            options={datosDosis}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="dosis"
                                            label="Dosis"
                                            defaultValue=""
                                            options={datosDosis}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDate
                                            defaultValue=""
                                            name="fechaContrato"
                                            label="Fecha 1era dosis"
                                        /* value={valueFechaContrato}
                                        onChange={(newValue) => {
                                            setFechaContrato(newValue);
                                        }} */
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="laboratorio"
                                            label="Laboratorio"
                                            defaultValue=""
                                            options={datosDosis}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="dosis"
                                            label="Dosis"
                                            defaultValue=""
                                            options={datosDosis}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDate
                                            defaultValue=""
                                            name="fechaContrato"
                                            label="Fecha 1era dosis"
                                        /* value={valueFechaContrato}
                                        onChange={(newValue) => {
                                            setFechaContrato(newValue);
                                        }} */
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid container xs={12} spacing={2} sx={{ pb: 3 }}>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="laboratorio"
                                            label="Laboratorio"
                                            defaultValue=""
                                            options={datosDosis}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="dosis"
                                            label="Dosis"
                                            defaultValue=""
                                            options={datosDosis}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDate
                                            defaultValue=""
                                            name="fechaContrato"
                                            label="Fecha 1era dosis"
                                        /* value={valueFechaContrato}
                                        onChange={(newValue) => {
                                            setFechaContrato(newValue);
                                        }} */
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pb: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" type="submit" fullWidth>
                                            Guardar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth /* onClick={() => navigate("/employee/list")} */>
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </>
            ) : (<></>)}
        </MainCard>
    );
}

export default Vaccination;