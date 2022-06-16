import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutTemplate } from 'formatdata/TemplateForm';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetByIdTemplate } from 'api/clients/TemplateClient';
import {
    GetAllBySegAgrupado,
    GetAllBySegAfectado,
    GetAllSegmentoAgrupado,
    GetAllBySubsegmento,
    GetAllByTipoAtencion,
    GetAllTipoAtencion
} from 'api/clients/OthersClients';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdateTemplates } from 'api/clients/TemplateClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllByAtencion } from 'api/clients/ItemsClient';
import { FormatDate } from 'components/helpers/Format';

const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
    idCIE11: yup.string().required(`${ValidationMessage.Requerido}`),
    idItems: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateTemplate = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsTemplate, setLsTemplate] = useState([]);
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');
    const [lsSubsegmento, setLsSubsegmento] = useState([]);
    const [subsegmento, setSubsegmento] = useState('');
    const [lsCie11, setLsCie11] = useState([]);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [tipoAtencion, setTipoAtencion] = useState('');
    const [lsAtencion, setLsAtencion] = useState([]);
    const [atencion, setAtencion] = useState('');
    const [lsItems, setLsItems] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;

    const handleChangeSegAgrupado = async (event) => {
        try {
            setLsSegmentoAfectado([]); setLsSubsegmento([]); setLsCie11([]); setSegmentoAfectado('');
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
            setLsSubsegmento([]); setLsCie11([]); setSubsegmento('');
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
            setLsCie11(resultCie11);

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
            setLsCie11([]);
        }
    }

    const handleChangeTipoAtencion = async (event) => {
        try {
            setLsAtencion([]); setLsItems([]); setAtencion('');
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

    const handleChangeAtencion = async (event) => {
        try {
            setAtencion(event.target.value);

            const lsServerAtencion = await GetAllByAtencion(0, 0, event.target.value);
            var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsItems(resultAtencion);
        } catch (error) {
            console.log(error);
            setLsItems([]);
        }
    }

    async function GetAll() {
        try {
            const serverData = await GetByIdTemplate(id);
            if (serverData.status === 200) {
                setSegmentoAgrupado(serverData.data.idSegmentoAgrupado);
                setSegmentoAfectado(serverData.data.idSegmentoAfectado);
                setSubsegmento(serverData.data.idSubsegmento);
                setTipoAtencion(serverData.data.idTipoAtencion);
                setAtencion(serverData.data.idAtencion);
                setLsTemplate(serverData.data);

                const lsServerSegAfectado = await GetAllBySegAgrupado(serverData.data.idSegmentoAgrupado, 0, 0);
                var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsSegmentoAfectado(resultSegAfectado);

                const lsServerSubsegmento = await GetAllBySegAfectado(serverData.data.idSegmentoAfectado, 0, 0);
                var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsSubsegmento(resultSubsegmento);

                const lsServerCie11 = await GetAllBySubsegmento(serverData.data.idSubsegmento, 0, 0);
                var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                    value: item.id,
                    label: item.dx
                }));
                setLsCie11(resultCie11);

                const lsServerTipoAtencion = await GetAllByTipoAtencion(0, 0, serverData.data.idTipoAtencion);
                var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
                setLsAtencion(resultTipoAtencion);

                const lsServerAtencion = await GetAllByAtencion(0, 0, serverData.data.idAtencion);
                var resultAtencion = lsServerAtencion.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsItems(resultAtencion);
            }

            const lsServerTipoAtencion = await GetAllTipoAtencion(0, 0);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);

            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutTemplate(id, segmentoAgrupado, segmentoAfectado, subsegmento,
                datos.idCIE11, "Usuario", tipoAtencion, atencion, datos.idItems, datos.descripcion,
                lsTemplate.usuarioRegistro, lsTemplate.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateTemplates(DataToUpdate);
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
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Actualizar Plantilla">
            {lsTemplate.length != 0 ? <>
                <Grid container spacing={2}>
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
                                defaultValue={lsTemplate.idCIE11}
                                options={lsCie11}
                                disabled={lsCie11.length != 0 ? false : true}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <SelectOnChange
                            name="idTipoAtencion"
                            label="Tipo de Atención"
                            options={lsTipoAtencion}
                            size={matchesXS ? 'small' : 'medium'}
                            value={tipoAtencion}
                            onChange={handleChangeTipoAtencion}
                            disabled={lsTipoAtencion.length != 0 ? false : true}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectOnChange
                            name="idAtencion"
                            label="Atención"
                            options={lsAtencion}
                            size={matchesXS ? 'small' : 'medium'}
                            value={atencion}
                            onChange={handleChangeAtencion}
                            disabled={lsAtencion.length != 0 ? false : true}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idItems"
                                label="Items"
                                defaultValue={lsTemplate.idItems}
                                options={lsItems}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                                disabled={lsItems.length != 0 ? false : true}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsTemplate.descripcion}
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

                    <Grid item xs={12}>
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/template/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </> : <Cargando />}
        </MainCard >
    );
};

export default UpdateTemplate;