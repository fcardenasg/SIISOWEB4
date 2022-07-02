import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PostTemplate } from 'formatdata/TemplateForm';
import SelectOnChange from 'components/input/SelectOnChange';
import {
    GetAllBySegAgrupado,
    GetAllBySegAfectado,
    GetAllSegmentoAgrupado,
    GetAllBySubsegmento,
    GetAllTipoAtencion,
    GetAllByTipoAtencion
} from 'api/clients/OthersClients';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { InsertTemplate } from 'api/clients/TemplateClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllByAtencion } from 'api/clients/ItemsClient';
import { FormatDate } from 'components/helpers/Format';

const validationSchema = yup.object().shape({
    descripcion: yup.string().required(`${ValidationMessage.Requerido}`),
    idCIE11: yup.string().required(`${ValidationMessage.Requerido}`),
    idItems: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Template = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    const { handleSubmit, errors, reset } = methods;

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
            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

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
    }, [])

    const CleanData = () => {
        setSegmentoAgrupado(''); setLsSegmentoAfectado([]); setSegmentoAfectado(''); setLsSubsegmento([]);
        setSubsegmento(''); setLsCie11([]);
        setTipoAtencion(''); setLsAtencion([]); setAtencion(''); setLsItems([]); reset();
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostTemplate(segmentoAgrupado, segmentoAfectado, subsegmento,
                datos.idCIE11, "Usuario", tipoAtencion, atencion, datos.idItems, datos.descripcion,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertTemplate(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    CleanData();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <MainCard title="Registrar Plantilla">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <SelectOnChange
                        name="segmentoAgrupado"
                        label="Segmento Agrupado"
                        options={lsSegmentoAgrupado}
                        size={matchesXS ? 'small' : 'medium'}
                        value={segmentoAgrupado}
                        onChange={handleChangeSegAgrupado}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
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
                <Grid item xs={12} md={6} lg={4}>
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
                <Grid item xs={12} md={6} lg={4}>
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
                <Grid item xs={12} md={6} lg={4}>
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
                <Grid item xs={12} md={6} lg={4}>
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
                            defaultValue=""
                            options={lsItems}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                            disabled={lsItems.length != 0 ? false : true}
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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/template/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Template;