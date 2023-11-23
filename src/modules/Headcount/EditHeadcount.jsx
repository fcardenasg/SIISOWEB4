import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/loading/Cargando';

import * as yup from 'yup';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import { ArrayMeses } from 'components/Arrays';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'components/input/InputSelect';
import { GetByIdHeadcount, UpdateHeadcounts } from 'api/clients/HeadcountClient';

const validationSchema = yup.object().shape({
    mes: yup.string().required(ValidationMessage.Requerido),
    cantidad: yup.string().required(ValidationMessage.Requerido),
    anio: yup.string().length(4, 'El año debe tener 4 dígitos').required(ValidationMessage.Requerido),
});

const EditHeadcount = ({ idHeadcount, getAllHeadcount }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset } = methods;

    const [lsData, setLsData] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [estadoPermiso, setEstadoPermiso] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetByIdHeadcount(idHeadcount);
                if (lsServer.status === 200) {
                    setLsData(lsServer.data);
                    setLoading(true);
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id: idHeadcount,
                anio: datos.anio,
                mes: datos.mes,
                cantidad: datos.cantidad,
                usuarioModifico: user.nameuser,
            };

            const result = await UpdateHeadcounts(DataToInsert);
            if (result.status === 200) {
                if (idHeadcount === result.data) {
                    setOpenSuccess(true);
                    getAllHeadcount();
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {loading ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsData.anio}
                                type="number"
                                name="anio"
                                label="Año"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.anio}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="mes"
                                label="Mes"
                                defaultValue={lsData.mes}
                                options={ArrayMeses}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.mes}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsData.cantidad}
                                type="number"
                                name="cantidad"
                                label="Cantidad"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.cantidad}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Actualizar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default EditHeadcount;