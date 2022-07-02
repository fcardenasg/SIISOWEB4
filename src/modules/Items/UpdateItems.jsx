import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutItems } from 'formatdata/ItemsForm';
import { GetByIdItems, UpdateItem } from 'api/clients/ItemsClient';
import Cargando from 'components/loading/Cargando';
import { GetAllByTipoAtencion, GetAllTipoAtencion } from 'api/clients/OthersClients';

const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
    idAtencion: yup.string().required(`${ValidationMessage.Requerido}`),
}).required();

const Items = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsItems, setLsItems] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;

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

            const serverData = await GetByIdItems(id);
            if (serverData.status === 200) {
                setLsItems(serverData.data);
                setTipoAtencion(serverData.data.idTipoAtencion);

                const lsServerTipoAtencion = await GetAllByTipoAtencion(0, 0, serverData.data.idTipoAtencion);
                var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsAtencion(resultTipoAtencion);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutItems(id, datos.descripcion, tipoAtencion, datos.idAtencion,
                lsItems.usuarioRegistro, lsItems.fechaRegistro, user.email, FormatDate(new Date()));

            if (tipoAtencion != '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await UpdateItem(DataToUpdate);
                    if (result.status === 200) {
                        setOpenUpdate(true);
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
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsItems.length != 0 ?
                <Fragment>
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
                                    defaultValue={lsItems.idAtencion}
                                    options={lsAtencion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsItems.descripcion}
                                    fullWidth
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
                                        {TitleButton.Actualizar}
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
                </Fragment> : <Cargando />
            }
        </MainCard>
    );
};

export default Items;