import { useState, useEffect } from 'react';

// Import de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

// Terceros
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutItems } from 'formatdata/ItemsForm';
import { GetByIdItems, UpdateItem } from 'api/clients/ItemsClient';
import Cargando from 'components/Cargando';
import { GetAllByTipoAtencion, GetAllTipoAtencion } from 'api/clients/OthersClients';


/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
    idAtencion: yup.string().required(`${ValidationMessage.Requerido}`),
}).required();

const Items = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [timeWait, setTimeWait] = useState(false);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [lsCodigoFilterTipoAtencion, setCodigoFiltrado] = useState([]);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsItems, setLsItems] = useState([]);

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

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* METODO DE INSERT  */
    const onSubmit = async (datos) => {
        try {
            const DataToUpdate = PutItems(id, datos.descripcion, tipoAtencion, datos.idAtencion);

            if (tipoAtencion != '') {
                if (Object.keys(datos.length !== 0)) {
                    const result = await UpdateItem(DataToUpdate);
                    if (result.status === 200) {
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${Message.Guardar}`,
                            variant: 'alert',
                            alertSeverity: 'success',
                            close: false,
                            transition: 'SlideUp'
                        })
                    }
                }
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Por favor, seleccione un tipo de atención',
                    variant: 'alert',
                    alertSeverity: 'success',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Registrar Items">
            <form onSubmit={handleSubmit(onSubmit)}>
                {lsItems.length != 0 ? <>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <SelectOnChange
                                name="idTipoAtencion"
                                label="Tipo de Atención"
                                options={lsTipoAtencion}
                                size={matchesXS ? 'small' : 'medium'}
                                value={tipoAtencion}
                                onChange={handleChangeTipoAtencion}
                            />
                        </Grid>

                        <Grid item xs={6}>
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

                    <Grid sx={{ pb: 2, pt: 3 }} item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth type="submit">
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
                </> : <Cargando />}
            </form>
        </MainCard>
    );
};

export default Items;