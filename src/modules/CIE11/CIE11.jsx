import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { InsertCIE11 } from 'api/clients/CIE11Client';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { PostCIE11 } from 'formatdata/CIE11';

const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    idSubsegmento: yup.string().required(`${ValidationMessage.Requerido}`),
}).required();

const CIE11 = () => {
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
    const [subsegmento, setSubsegmento] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors, reset } = methods;

    const handleChangeSegAgrupado = async (event) => {
        try {
            setSubsegmento([]);
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAfectado(resultSegAfectado);
        } catch (error) {
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setSubsegmento(resultSubsegmento);
        } catch (error) {
            setSubsegmento([]);
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
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCIE11(datos.id, datos.dx, segmentoAgrupado, segmentoAfectado, datos.idSubsegmento,
                user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertCIE11(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setLsSegmentoAfectado([]);
                    setSegmentoAgrupado('');
                    setSegmentoAfectado('');
                    setSubsegmento([]);
                    reset();
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Registrar CIE10">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SelectOnChange
                        name="segmentoAgrupado"
                        label="Capitulo CIE10"
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
                            defaultValue=""
                            options={subsegmento}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="id"
                            label="ID"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={10}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            fullWidth
                            name="dx"
                            label="Nombre"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>
            </Grid>

            <Grid item sx={{ pt: 4 }} xs={12}>
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
        </MainCard>
    );
};

export default CIE11;