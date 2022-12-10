import { useState, useEffect } from 'react';
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

import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { InsertCatalog } from 'api/clients/CatalogClient';
import { GetAllTypeCatalog, GetAllTypeCatalogCombo } from 'api/clients/TypeCatalogClient';
import { PostCatalog } from 'formatdata/CatalogForm';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoCatalogo: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Catalog = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [typeCatalog, setTypeCatalog] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllTypeCatalogCombo();
                setTypeCatalog(lsServer.data);
            } catch (error) { }
        }

        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCatalog(datos.nombre, datos.codigo, datos.idTipoCatalogo, user.email,
                FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                await InsertCatalog(DataToInsert).then(result => {
                    if (result.data.message === Message.Guardar) {
                        setResultMessage(result.data.message);
                        setOpenSuccess(true);
                        reset();
                    } else {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    }

                });
            }
        } catch (error) { }
    };

    return (
        <MainCard title="Registrar Catálogo">
            <MessageSuccess message={resultMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <form onSubmit={handleSubmit(handleClick)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idTipoCatalogo"
                                label="Tipo Catalogo"
                                defaultValue=""
                                options={typeCatalog}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idTipoCatalogo}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
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
                                defaultValue=""
                                fullWidth
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
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth type="submit">
                                    {TitleButton.Guardar}
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
            </form>
        </MainCard>
    );
};

export default Catalog;