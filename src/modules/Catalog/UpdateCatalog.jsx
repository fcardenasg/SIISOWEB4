import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import { PutCatalog } from 'formatdata/CatalogForm';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetByIdCatalog, UpdateCatalogs } from 'api/clients/CatalogClient';
import { GetAllTypeCatalog } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/Cargando';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`),
    codigo: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateCatalog = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [typecatalogo, setTypeCatalog] = useState([]);
    const [lsCatalog, setLsCatalog] = useState([]);

    useEffect(() => {
        async function GetAll() {
            const lsServer = await GetAllTypeCatalog(0, 0);
            var result = lsServer.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setTypeCatalog(result);

            const lsServerCatalog = await GetByIdCatalog(id);
            if (lsServerCatalog.status === 200)
                setLsCatalog(lsServerCatalog.data);
        }

        GetAll();
    }, [])

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, errors } = methods;

    const onSubmit = async (datos) => {
        const DataToUpdate = PutCatalog(id, datos.nombre, datos.codigo, datos.idTipoCatalogo,
            lsCatalog.usuarioRegistro, lsCatalog.fechaRegistro, user.email, FormatDate(new Date()));
        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCatalogs(DataToUpdate);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Actualizar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Este código ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Actualizar Catálogo">
            {lsCatalog.length != 0 ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idTipoCatalogo"
                                    label="Tipo Catalogo"
                                    defaultValue={lsCatalog.idTipoCatalogo}
                                    options={typecatalogo}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsCatalog.codigo}
                                    fullWidth
                                    name="codigo"
                                    label="Código"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} sx={{ pb: 2 }}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsCatalog.nombre}
                                    fullWidth
                                    name="nombre"
                                    label="Nombre"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
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