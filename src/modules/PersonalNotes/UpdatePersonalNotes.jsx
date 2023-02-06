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
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/loading/Cargando';
import { PutPersonalNotes } from 'formatdata/PersonalNotesForm';
import { GetByIdPersonalNotes, UpdatePersonalNotess } from 'api/clients/PersonalNotesClient';

const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`)
});

const UpdatePersonalNotes = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [lsPersonalNotes, setLsPersonalNotes] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdPersonalNotes(id);
                if (lsServer.status === 200) {
                    setLsPersonalNotes(lsServer.data);
                }
            } catch (error) {
                setOpenError(true);
                setErrorMessage(`${error}`);
            }
        }

        GetAll();
    }, [])

    const onSubmit = async (datos) => {
        try {
            const DataToUpdate = PutPersonalNotes(id, datos.descripcion, lsPersonalNotes.usuarioCreacion,
                lsPersonalNotes.fechaCreacion, user.nameuser, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdatePersonalNotess(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo actualizar correctamente");
        }
    };

    return (
        <MainCard title="Actualizar Apunte Personal">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <form onSubmit={handleSubmit(onSubmit)}>
                {lsPersonalNotes.length != 0 ?
                    <Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        rows={5}
                                        multiline
                                        defaultValue={lsPersonalNotes.descripcion}
                                        name="descripcion"
                                        label="Descripción"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.descripcion}
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/personal-notes/list")}>
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

export default UpdatePersonalNotes;