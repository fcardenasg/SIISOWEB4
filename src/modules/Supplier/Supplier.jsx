import { useState, useEffect } from 'react';
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
import { InsertSupplier } from 'api/clients/SupplierClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import { FormatDate } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostSupplier } from 'formatdata/SupplierForm';

/* Validamos campos, los que sean necesarios */
const validationSchema = yup.object().shape({
    codiProv: yup.string().required(`${ValidationMessage.Requerido}`),
    nombProv: yup.string().required(`${ValidationMessage.Requerido}`),
   
});

const Supplier = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* Se agregan algunos de esto estados */
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const [lsSupplier, setLsSupplier] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    /* Modificamos aquí para validar los campos también */
    const { handleSubmit, errors, reset } = methods;

    /* Modificamos la toma de datos de los combos */
    async function GetAll() {
        try {
            const lsServerSupplier = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_PROVEEDOR);
            var resultProveedor = lsServerSupplier.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSupplier(resultProveedor);

            const lsServerCiudad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CIUDADES);
            var resultCiudad = lsServerCiudad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCiudad(resultCiudad);
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])


    const handleClick = async (datos) => {
        try {
           /* Recordar aquí modificar el correo por el nombre de usuario */
           const DataToInsert = PostSupplier(datos.codiProv, datos.nombProv, datos.teleProv, datos.emaiProv,
            datos.contaProv, datos.ciudProv, datos.idTipoProveedor, datos.direProv,
            user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertSupplier(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo guardar correctamente el registro');
        }
    };




    return (
        <MainCard title="Registrar Proveedor">
            {/* Agregamos el resultado del mensaje */}
            <MessageSuccess message={resultMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="codiProv"
                            label="Código"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.codiProv}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="nombProv"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.nombProv}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="teleProv"
                            label="Teléfono"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="emaiProv"
                            label="Email"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="contaProv"
                            label="Contacto"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="ciudProv"
                            label="Ciudad"
                            defaultValue=""
                            options={lsCiudad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idTipoProveedor"
                            label="Tipo Proveedor"
                            defaultValue=""
                            options={lsSupplier}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            name="direProv"
                            label="Dirrección"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
            </Grid>

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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/supplier/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Supplier;