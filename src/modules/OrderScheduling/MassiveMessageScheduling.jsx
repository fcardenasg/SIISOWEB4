import {
    Box,
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { CodCatalogo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputDatePick from 'components/input/InputDatePick';
import { InputSelectAutocompleteControl } from 'components/input/InputSelectAutocomplete';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import ListDetailMassive from './ListDetailMassive';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object().shape({
    idTipoAsesoria: yup.string().required(ValidationMessage.Requerido),
    idCausa: yup.string().required(ValidationMessage.Requerido),
    idMotivo: yup.string().required(ValidationMessage.Requerido),
    idEstadoCaso: yup.string().required(ValidationMessage.Requerido),
});

const BoxTypography = ({ title, data }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ color: 'black', marginRight: 1 }} variant="body1">{title}</Typography>
        <Typography variant="body1">{data}</Typography>
    </Box>
);

const MassiveMessageScheduling = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [valueGes, setValueGes] = useState({ value: 7200, label: 'M-AS', codigo: 'GES4', intcodigo: 0 });
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const [documento, setDocumento] = useState('');

    const [lsEmployee, setLsEmployee] = useState(null);
    const [lsGes, setLsGes] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    async function getAll() {
        try {
            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.Ges);
            setLsGes(lsServerMotivo.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee(null);
        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {

        } catch (error) {

        }
    };

    return (
        <FormProvider {...methods}>
            <Grid container justifyContent="left" alignItems="center" spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <InputSelectAutocompleteControl
                        label="GES"
                        onChange={(event, newValue) => setValueGes(newValue)}
                        value={valueGes}
                        options={lsGes}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <InputDatePick
                        label="Fecha de inicio"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <InputDatePick
                        label="Fecha fin"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </Grid>

                <Grid sx={{ my: 1.5 }} item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <MainCard title="Listado de empleados">
                        <ListDetailMassive valueGes={valueGes} fechaInicio={fechaInicio} fechaFin={fechaFin} />
                    </MainCard>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ pt: 4 }}>
                <Grid item xs={6} md={4} lg={2}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth>
                            Programar órdenes
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={6} md={4} lg={2}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => navigate("/programming/view")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default MassiveMessageScheduling;