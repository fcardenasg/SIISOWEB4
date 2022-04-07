// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

// Terceros
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import Cargando from 'components/Cargando';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdateTemplates, GetByIdTemplate } from 'api/clients/TemplateClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PutTemplate } from 'formatdata/TemplateForm';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    tipoAtencion: yup.string().required(`${ValidationMessage.Requerido}`),
    atencion: yup.string().required(`${ValidationMessage.Requerido}`),
    items: yup.string().required(`${ValidationMessage.Requerido}`),
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateTemplate = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [items, setItems] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState([]);
    const [atencion, setAtencion] = useState([]);
    const [cie11, setCie11] = useState([]);
    const [lsTemplate, setLsTemplate] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors, reset } = methods;

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetByIdTemplate(id);
            if (lsServer.status === 200)
                setLsTemplate(lsServer.data);

            const lsServerCIE11 = await GetAllCIE11(0, 0);
            var resultCIE11 = lsServerCIE11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setCie11(resultCIE11);

            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PLAN_TipoAtencion);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAtencion(resultTipoAtencion);

            const lsServerAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PLAN_Atencion);
            var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setAtencion(resultAtencion);

            const lsServerItems = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PLAN_Items);
            var resultItems = lsServerItems.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setItems(resultItems);

        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutTemplate(id, datos.dx, datos.tipoAtencion, datos.atencion,
                datos.items, datos.descripcion);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateTemplates(DataToInsert);
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
                    reset();
                }
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
        <MainCard title="Registrar Plantilla">
            <form onSubmit={handleSubmit(handleClick)}>
                {lsTemplate.length != 0 ? (<>
                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="dx"
                                    label="Nombre"
                                    defaultValue={lsTemplate.dx}
                                    options={cie11}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="tipoAtencion"
                                    label="Tipo Atención"
                                    defaultValue={lsTemplate.tipoAtencion}
                                    options={tipoAtencion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="atencion"
                                    label="Atención"
                                    defaultValue={lsTemplate.atencion}
                                    options={atencion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="items"
                                    label="Items"
                                    defaultValue={lsTemplate.items}
                                    options={items}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsTemplate.descripcion}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="descripcion"
                                    label="Descripción"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 2, pb: 2 }}>
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/template/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </>) : (<Cargando />)}
            </form>
        </MainCard>
    );
};

export default UpdateTemplate;