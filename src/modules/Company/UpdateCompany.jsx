import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { GetByIdCompany, UpdateCompanys } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/loading/Cargando';
import { PutCompany } from 'formatdata/CompanyForm';
import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';

const validationSchema = yup.object().shape({
    descripcionSpa: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateCompany = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsCompany, setLsCompany] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const methods = useForm(
        { resolver: yupResolver(validationSchema) }
    );
    const { handleSubmit, errors } = methods;

    async function getAll() {
        try {
            const lsServer = await GetByIdCompany(id);
            if (lsServer.status === 200) {
                setLsCompany(lsServer.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAll();
    }, [id])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutCompany(datos.codigo, datos.descripcionSpa, datos.email, datos.celular, datos.gerente,
                lsCompany.usuarioRegistro, lsCompany.fechaRegistro, user.email, FormatDate(new Date()));

            console.log("Datos = ", datos);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCompanys(DataToInsert);

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
        <MainCard title="Actualizar Empresas">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />
            {lsCompany.length !== 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsCompany.codigo}
                                fullWidth
                                disabled
                                name="codigo"
                                label="Código"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsCompany.descripcionSpa}
                                fullWidth
                                name="descripcionSpa"
                                label="Nombre"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsCompany.email}
                                fullWidth
                                name="email"
                                label="Correo electronico"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsCompany.celular}
                                fullWidth
                                name="celular"
                                label="Celular"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} sx={{ pb: 2 }}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsCompany.gerente}
                                fullWidth
                                name="gerente"
                                label="Contacto"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/company/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> : <Cargando />
            }
        </MainCard >
    );
};

export default UpdateCompany;