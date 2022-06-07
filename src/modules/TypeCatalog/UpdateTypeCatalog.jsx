import { useState, useEffect } from 'react';
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

import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { PutTypeCatalog } from 'formatdata/TypeCatalogForm';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdateTypeCatalogs } from 'api/clients/TypeCatalogClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetByIdTypeCatalog } from 'api/clients/TypeCatalogClient';
import Cargando from 'components/Cargando';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdateTypeCatalog = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [lsTipoCatalogo, setLsTipoCatalogo] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdTypeCatalog(id);
                if (lsServer.status === 200) {
                    setLsTipoCatalogo(lsServer.data);
                }
            } catch (error) {

            }
        }

        GetAll();
    }, [])

    const onSubmit = async (datos) => {
        try {

            const DataToUpdate = PutTypeCatalog(id, datos.nombre, lsTipoCatalogo.usuarioRegistro,
                lsTipoCatalogo.fechaRegistro, user.id, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateTypeCatalogs(DataToUpdate);
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
                message: 'Este tipo de cátalogo ya existe',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Actualizar Tipo de Catálogo">
            <form onSubmit={handleSubmit(onSubmit)}>
                {lsTipoCatalogo.length != 0 ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ pb: 2 }}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsTipoCatalogo.nombre}
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/typecatalog/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> : <Cargando />}
            </form>
        </MainCard>
    );
};

export default UpdateTypeCatalog;