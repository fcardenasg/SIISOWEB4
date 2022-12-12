import { useEffect, useState } from 'react';
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

import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import { PutCatalog } from 'formatdata/CatalogForm';
import { GetByIdCatalog, UpdateCatalogs } from 'api/clients/CatalogClient';
import { GetAllTypeCatalog, GetAllTypeCatalogCombo } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/loading/Cargando';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoCatalogo: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateCatalog = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [typecatalogo, setTypeCatalog] = useState([]);
    const [lsCatalog, setLsCatalog] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        async function GetAll() {
            try {
                await GetByIdCatalog(id).then(result => {
                    if (result.data.message === Message.NoExiste) {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    } else {
                        setLsCatalog(result.data);
                    }
                });

                const lsServer = await GetAllTypeCatalogCombo();
                setTypeCatalog(lsServer.data);
            } catch (error) {
                setOpenError(true);
                setErrorMessage(`${error}`);
            }
        }

        GetAll();
    }, [id])

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (datos) => {
        const DataToUpdate = PutCatalog(id, datos.nombre, datos.codigo, datos.idTipoCatalogo,
            lsCatalog.usuarioRegistro, lsCatalog.fechaRegistro, user.nameuser, FormatDate(new Date()));
        try {
            if (Object.keys(datos.length !== 0)) {
                await UpdateCatalogs(DataToUpdate).then(result => {
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
        <MainCard title="Actualizar Catálogo">
            <MessageUpdate message={resultMessage} open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsCatalog.length != 0 ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoCatalogo"
                                    label="Tipo Catalogo"
                                    defaultValue={lsCatalog.idTipoCatalogo}
                                    options={typecatalogo}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idTipoCatalogo}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsCatalog.codigo}
                                    fullWidth
                                    name="codigo"
                                    label="Código"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.codigo}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsCatalog.nombre}
                                    fullWidth
                                    name="nombre"
                                    label="Nombre"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.nombre}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth type="submit">
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/catalog/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                : <Cargando />}
        </MainCard>
    );
};

export default UpdateCatalog;