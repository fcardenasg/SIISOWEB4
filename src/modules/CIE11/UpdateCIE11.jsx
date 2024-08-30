import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import InputSelect from 'components/input/InputSelect';
import { UpdateCIE11s, GetByIdCIE11 } from 'api/clients/CIE11Client';
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const lsTipoCie = [{ value: 'CIE10', label: 'CIE10' }, { value: 'CIE11', label: 'CIE11' }];

const validationSchema = yup.object().shape({
    id: yup.string().required(ValidationMessage.Requerido),
    dx: yup.string().required(ValidationMessage.Requerido),
    tipoCie: yup.string().nullable().required(ValidationMessage.Requerido)
});

const UpdateCIE11 = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [datamodel, setCie11] = useState(null);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;

    async function GetAll() {
        try {
            const serverCie11 = await GetByIdCIE11(id);
            if (serverCie11.status === 200) {
                setCie11(serverCie11.data);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.usuarioModifico = user?.nameuser;

            const result = await UpdateCIE11s(datos);
            if (result.status === 200) {
                setOpenUpdate(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <MainCard title="Actualizar CIE10 / CIE11">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {datamodel !== null ?
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={2}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={datamodel?.id}
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
                                defaultValue={datamodel?.dx}
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
                                defaultValue={datamodel?.tipoCie}
                                options={lsTipoCie}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/cie11/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                : <Cargando />
            }
        </MainCard>
    );
};

export default UpdateCIE11;