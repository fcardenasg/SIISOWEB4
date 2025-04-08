import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import User from 'assets/img/user.png';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdAdvice, SaveAdvice } from 'api/clients/AdviceClient';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByMail } from 'api/clients/UserClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import DetailedIcon from 'components/controllers/DetailedIcon';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { AccionMenu, CodCatalogo, DefaultData, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheck from 'components/input/InputCheck';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ListPersonalNotesAll from 'components/template/ListPersonalNotesAll';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { generateReportPsycho } from '../Programming/Attention/Report/Psychological';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { GetAnioMeses, GetEdad, ViewFormat } from 'components/helpers/Format';
import Chip from 'ui-component/extended/Chip';
import { ArrayMeses } from 'components/Arrays';
import SearchEmployee from 'assets/img/searchemployee.json';
import Lottie from 'lottie-react';
import AnimateComponent from 'components/loading/AnimateComponent';
import ListDetailMassive from './ListDetailMassive';
import { InputSelectAutocompleteControl } from 'components/input/InputSelectAutocomplete';
import InputDatePick from 'components/input/InputDatePick';

const validationSchema = yup.object().shape({
    idTipoAsesoria: yup.string().required(ValidationMessage.Requerido),
    idCausa: yup.string().required(ValidationMessage.Requerido),
    idMotivo: yup.string().required(ValidationMessage.Requerido),
    idEstadoCaso: yup.string().required(ValidationMessage.Requerido),
});

const BoxTypography = ({ title, data }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ color: 'black', marginRight: 1 }} variant="body1">{title}</Typography>
        <Typography variant="body1">{data}</Typography>
    </Box>
);

const MessageScheduling = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [lsEmployee, setLsEmployee] = useState(null);
    const [lsGes, setLsGes] = useState([]);
    const [valueGes, setValueGes] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    async function getAll() {
        try {
            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.Ges);
            setLsGes(lsServerMotivo.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee(null);
        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {

        } catch (error) {

        }
    };

    return (
        <FormProvider {...methods}>
            <MainCard title="Programar ordenes masivas">
                <Grid container justifyContent="left" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <InputSelectAutocompleteControl
                            label="GES"
                            onChange={(event, newValue) => setValueGes(newValue)}
                            value={valueGes}
                            options={lsGes}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputDatePick
                            label="Fecha de inicio"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputDatePick
                            label="Fecha fin"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </Grid>

                    <Grid sx={{ my: 1.5 }} item xs={12}><Divider /></Grid>

                    <Grid item xs={12}>
                        <MainCard title="Listado de empleados">
                            <ListDetailMassive />
                        </MainCard>
                    </Grid>
                </Grid>
            </MainCard>
        </FormProvider>
    );
};

export default MessageScheduling;