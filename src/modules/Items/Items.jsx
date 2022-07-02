import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import { useNavigate } from 'react-router-dom';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostItems } from 'formatdata/ItemsForm';
import { InsertItems } from 'api/clients/ItemsClient';
import { GetAllByTipoAtencion, GetAllTipoAtencion } from 'api/clients/OthersClients';

const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
    idAtencion: yup.string().required(`${ValidationMessage.Requerido}`),
}).required();

const Items = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [lsAtencion, setLsAtencion] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors, reset } = methods;

    const handleChangeTipoAtencion = async (event) => {
        try {
            setTipoAtencion(event.target.value);

            const lsServerTipoAtencion = await GetAllByTipoAtencion(0, 0, event.target.value);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsAtencion(resultTipoAtencion);
        } catch (error) {
            console.log(error);
            setLsAtencion([]);
        }
    }

    async function GetAll() {
        try {
            const lsServerTipoAtencion = await GetAllTipoAtencion(0, 0);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostItems(datos.descripcion, tipoAtencion, datos.idAtencion,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (tipoAtencion != '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await InsertItems(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setTipoAtencion('');
                        setLsAtencion([]);
                        reset();
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione un tipo de atención');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <MainCard title="Registrar Items">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <SelectOnChange
                        name="idTipoAtencion"
                        label="Tipo de Atención"
                        options={lsTipoAtencion}
                        size={matchesXS ? 'small' : 'medium'}
                        value={tipoAtencion}
                        onChange={handleChangeTipoAtencion}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="idAtencion"
                            label="Atención"
                            defaultValue=""
                            options={lsAtencion}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                            disabled={lsAtencion.length != 0 ? false : true}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            multiline
                            rows={2}
                            name="descripcion"
                            label="Descripción"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
            </Grid>

            <Grid item sx={{ pt: 4 }} xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={6}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={() => navigate("/item/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Items;