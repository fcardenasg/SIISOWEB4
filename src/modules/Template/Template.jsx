// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import { PostTemplate } from 'formatdata/TemplateForm';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado, GetAllBySubsegmento } from 'api/clients/OthersClients';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertTemplate } from 'api/clients/TemplateClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
    idCIE11: yup.string().required(`${ValidationMessage.Requerido}`),
    idTipoAtencion: yup.string().required(`${ValidationMessage.Requerido}`),
    idAtencion: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Template = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    /* NUESTROS USESTATE */
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');

    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');

    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [subsegmento, setSubsegmento] = useState('');

    const [lsCie11, setCie11] = useState([]);

    const [tipoAtencion, setTipoAtencion] = useState([]);
    const [atencion, setAtencion] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors, reset } = methods;

    const handleChangeSegAgrupado = async (event) => {
        try {
            setSubsegmento([]); setCie11([]);
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSegmentoAfectado(resultSegAfectado);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSubsegmento(resultSubsegmento);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setLsSubsegmento([]);
        }
    }

    const handleChangeSubsegmento = async (event) => {
        try {
            setSubsegmento(event.target.value);

            const lsServerCie11 = await GetAllBySubsegmento(event.target.value, 0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setCie11(resultCie11);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setCie11([]);
        }
    }

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

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
            const DataToInsert = PostTemplate(segmentoAgrupado, segmentoAfectado, subsegmento,
                datos.idCIE11, "Usuario", datos.idTipoAtencion, datos.idAtencion, datos.descripcion);
            if (Object.keys(datos.length !== 0)) {
                const result = await InsertTemplate(DataToInsert);
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
                    setSubsegmento([]);
                    setSegmentoAfectado([]);
                    setSegmentoAgrupado([]);
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
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={6}>
                        <SelectOnChange
                            name="segmentoAgrupado"
                            label="Segmento Agrupado"
                            options={lsSegmentoAgrupado}
                            size={matchesXS ? 'small' : 'medium'}
                            value={segmentoAgrupado}
                            onChange={handleChangeSegAgrupado}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectOnChange
                            name="segmentoAfectado"
                            label="Segmento Afectado"
                            options={lsSegmentoAfectado}
                            size={matchesXS ? 'small' : 'medium'}
                            value={segmentoAfectado}
                            onChange={handleChangeSegAfectado}
                            disabled={lsSegmentoAfectado.length != 0 ? false : true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectOnChange
                            name="idSubsegmento"
                            label="Subsegmento"
                            options={lsSubsegmento}
                            size={matchesXS ? 'small' : 'medium'}
                            value={subsegmento}
                            onChange={handleChangeSubsegmento}
                            disabled={lsSubsegmento.length != 0 ? false : true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idCIE11"
                                label="CIE11"
                                defaultValue=""
                                options={lsCie11}
                                disabled={lsCie11.length != 0 ? false : true}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idTipoAtencion"
                                label="Tipo de Atención"
                                defaultValue=""
                                options={tipoAtencion}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idAtencion"
                                label="Atención"
                                defaultValue=""
                                options={atencion}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                multiline
                                rows={4}
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
            </form>
        </MainCard>
    );
};

export default Template;