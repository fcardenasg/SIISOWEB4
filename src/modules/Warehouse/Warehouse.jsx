import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { InsertMedicamentosProductos } from 'api/clients/MedicamentosProductosClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(ValidationMessage.Requerido),
    idLaboratorio: yup.string().required(ValidationMessage.Requerido),
    formaFarmaceutica: yup.string().required(ValidationMessage.Requerido)
});

const Warehouse = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsUnidad, setLsUnidad] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const lsServerUni = await GetByTipoCatalogoCombo(CodCatalogo.UNIDAD);
            setLsUnidad(lsServerUni.data);

            const lsServerLab = await GetByTipoCatalogoCombo(CodCatalogo.LABORATORIO);
            setLsLaboratorio(lsServerLab.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.usuarioRegistro = user?.nameuser;
            datos.concentracion = datos.concentracion || null;
            datos.presentacionComercial = datos.presentacionComercial || null;

            const result = await InsertMedicamentosProductos(datos);
            if (result.data.exito) {
                setOpenSuccess(true);
                reset();
            } else {
                setOpenError(true);
                setErrorMessage(result.data.mensaje);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Registrar producto de medicamento">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="nombre"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.nombre}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="idLaboratorio"
                            label="Laboratorio"
                            defaultValue=""
                            options={lsLaboratorio}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idLaboratorio}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="formaFarmaceutica"
                            label="Forma farmacéutica"
                            defaultValue=""
                            options={lsUnidad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.formaFarmaceutica}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="codInvima"
                            label="Código invima"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.codInvima}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="concentracion"
                            label="Concentración"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.concentracion}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="presentacionComercial"
                            label="Presentación comercial"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.presentacionComercial}
                        />
                    </Grid>

                    <Grid item alignItems="center" xs={12} md={6} lg={4}>
                        <InputCheckBox
                            label="Estado"
                            name="estado"
                            size={30}
                            defaultValue={true}
                        />
                    </Grid>
                </Grid>
            </FormProvider>

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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/warehouse/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Warehouse;