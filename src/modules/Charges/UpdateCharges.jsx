import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import de Material-ui
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
import Cargando from 'components/Cargando';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdateChargess, GetByIdCharges } from 'api/clients/ChargesClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    idSubsegmento: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateCharges = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    /* NUESTROS USESTATE */
    const [charges, setCharges] = useState([]);

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

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
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

            console.log(event.target.value);
        } catch (error) {
            console.log(error);
        }
    }

    async function GetAll() {
        try {
            const serverCharges = await GetByIdCharges(id);
            if (serverCharges.status === 200) {
                setCharges(serverCharges.data);
                setSegmentoAgrupado(serverCharges.data.idSegmentoAgrupado);
                setSegmentoAfectado(serverCharges.data.idSegmentoAfectado);

                const lsServerSegAfectado = await GetAllBySegAgrupado(serverCharges.data.idSegmentoAgrupado, 0, 0);
                var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsSegmentoAfectado(resultSegAfectado);

                const lsServerSubsegmento = await GetAllBySegAfectado(serverCharges.data.idSegmentoAfectado, 0, 0);
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
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* METODO DE UPDATE  */
    const onSubmit = async (datos) => {
        try {
           
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
        <MainCard title="Actualizar CARGOS">
            <form onSubmit={handleSubmit(onSubmit)}>
                {charges.length != 0 ? (<>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SelectOnChange
                                name="idSedeCargo"
                                label="Sede"
                                options={lsSegmentoAgrupado}
                                size={matchesXS ? 'small' : 'medium'}
                                value={segmentoAgrupado}
                                onChange={handleChangeSegAgrupado}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SelectOnChange
                                name="idRosterCargo"
                                label="Roster"
                                options={lsSegmentoAfectado}
                                size={matchesXS ? 'small' : 'medium'}
                                value={segmentoAfectado}
                                onChange={handleChangeSegAfectado}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idAreaCargo"
                                    label="Área"
                                    defaultValue={charges.idSubsegmento}
                                    options={subsegmento}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={charges.id}
                                    fullWidth
                                    disabled
                                    name="id"
                                    label="ID"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={charges.dx}
                                    fullWidth
                                    name="dx"
                                    label="Nombre"
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </>) : <Cargando />}
            </form>
        </MainCard>
    );
};

export default UpdateCharges;