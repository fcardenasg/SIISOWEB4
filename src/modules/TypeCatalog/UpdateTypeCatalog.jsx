import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { PutTypeCatalog } from 'formatdata/TypeCatalogForm';
import { UpdateTypeCatalogs } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetByIdTypeCatalog } from 'api/clients/TypeCatalogClient';
import Cargando from 'components/loading/Cargando';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateTypeCatalog = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [lsTipoCatalogo, setLsTipoCatalogo] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                await GetByIdTypeCatalog(id).then(result => {
                    if (result.data.message === Message.NoExiste) {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    } else {
                        setLsTipoCatalogo(result.data);
                    }
                });
            } catch (error) { }
        }

        GetAll();
    }, [id]);

    const onSubmit = async (datos) => {
        try {
            const DataToUpdate = PutTypeCatalog(id, datos.nombre, lsTipoCatalogo.usuarioRegistro,
                lsTipoCatalogo.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                await UpdateTypeCatalogs(DataToUpdate).then(result => {
                    if (result.data.message === Message.Actualizar) {
                        setOpenUpdate(true);
                        setResultMessage(result.data.message);
                    } else {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    }
                });
            }
        } catch (error) { }
    };

    return (
        <MainCard title="Actualizar Tipo de Catálogo">
            <MessageUpdate message={resultMessage} open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <form onSubmit={handleSubmit(onSubmit)}>
                {lsTipoCatalogo.length !== 0 ?
                    <Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsTipoCatalogo.nombre}
                                        name="nombre"
                                        label="Nombre"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.nombre}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth type="submit">
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/typecatalog/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment> : <Cargando />}
            </form>
        </MainCard>
    );
};

export default UpdateTypeCatalog;