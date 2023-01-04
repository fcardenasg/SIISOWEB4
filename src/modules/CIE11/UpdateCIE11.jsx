import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import Cargando from 'components/loading/Cargando';
import { PutCIE11 } from 'formatdata/CIE11';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import InputSelect from 'components/input/InputSelect';
import { UpdateCIE11s, GetByIdCIE11 } from 'api/clients/CIE11Client';
import InputText from 'components/input/InputText';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    idSubsegmento: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateCIE11 = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [cie11, setCie11] = useState([]);
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');
    const [subsegmento, setSubsegmento] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors } = methods;

    const handleChangeSegAgrupado = async (event) => {
        try {
            setSubsegmento([]); setLsSegmentoAfectado([]); setSegmentoAfectado('');
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSegmentoAfectado(resultSegAfectado);
        } catch (error) {
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
            setSubsegmento(resultSubsegmento);

        } catch (error) {
        }
    }

    async function GetAll() {
        try {
            const serverCie11 = await GetByIdCIE11(id);
            if (serverCie11.status === 200) {
                setCie11(serverCie11.data);
                setSegmentoAgrupado(serverCie11.data.idSegmentoAgrupado);
                setSegmentoAfectado(serverCie11.data.idSegmentoAfectado);

                const lsServerSegAfectado = await GetAllBySegAgrupado(serverCie11.data.idSegmentoAgrupado, 0, 0);
                var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsSegmentoAfectado(resultSegAfectado);

                const lsServerSubsegmento = await GetAllBySegAfectado(serverCie11.data.idSegmentoAfectado, 0, 0);
                var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setSubsegmento(resultSubsegmento);
            }

            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = PutCIE11(datos.id, datos.dx, segmentoAgrupado, segmentoAfectado, datos.idSubsegmento,
                cie11.usuarioRegistro, cie11.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCIE11s(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <MainCard title="Actualizar CIE11">
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {cie11.length != 0 ? (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SelectOnChange
                                name="segmentoAgrupado"
                                label="Segmento Agrupado"
                                options={lsSegmentoAgrupado}
                                size={matchesXS ? 'small' : 'medium'}
                                value={segmentoAgrupado}
                                onChange={handleChangeSegAgrupado}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SelectOnChange
                                name="segmentoAfectado"
                                label="Segmento Afectado"
                                options={lsSegmentoAfectado}
                                size={matchesXS ? 'small' : 'medium'}
                                value={segmentoAfectado}
                                onChange={handleChangeSegAfectado}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idSubsegmento"
                                    label="Subsegmento"
                                    defaultValue={cie11.idSubsegmento}
                                    options={subsegmento}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={cie11.id}
                                    fullWidth
                                    disabled
                                    name="id"
                                    label="ID"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={cie11.dx}
                                    fullWidth
                                    name="dx"
                                    label="Nombre"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/cie11/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment>
            ) : <Cargando />}
        </MainCard>
    );
};

export default UpdateCIE11;