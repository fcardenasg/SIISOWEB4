import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import {
    Divider,
    Typography
} from '@mui/material';

import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo, Message, TitleButton } from 'components/helpers/Enums';
import { FormProvider, useForm } from 'react-hook-form';
import InputSelect from 'components/input/InputSelect';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button, Grid, useMediaQuery } from '@mui/material';
import { UpdateSedeUser } from 'api/clients/UserClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { IconReportMedical } from '@tabler/icons';

const ChangeSede = () => {
    const theme = useTheme();
    const { user, logout } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSedeUser, setLsSedeUser] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [getSede, setGetSede] = useState('');

    const methods = useForm();

    const { handleSubmit } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                setGetSede(user.idsede);

                const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
                var resultSede = lsServerSede.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsSedeUser(resultSede);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = {
                id: user.id,
                idSede: datos.idSede
            }

            var result = await UpdateSedeUser(DataToUpdate);
            if (result.status === 200) {
                setOpenSuccess(true);
                setErrorMessage("Sede cambiada con exito");

                setTimeout(async () => {
                    await logout();
                }, 1500);
            } else {
                setOpenError(true);
                setErrorMessage(Message.RegistroNoGuardado);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {getSede !== '' ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idSede"
                                label="Sede de Atención"
                                defaultValue={getSede}
                                options={lsSedeUser}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        </FormProvider>
                    </Grid>

                    <Typography sx={{ pt: 1.5 }} align="center" variant="body2">
                        Recuerde que al cambiar la sede y presionar el botón grabar, automáticamente le cerrara la sesión"
                    </Typography>

                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid> : null
            }
        </Fragment>
    );
};

export default ChangeSede;