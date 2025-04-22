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
    const [openApuntesPersonales, setOpenApuntesPersonales] = useState(false);
    const [extenderDescripcion, setExtenderDescripcion] = useState(false);

    const [openReport, setOpenReport] = useState(false);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsEmployee, setLsEmployee] = useState(null);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [estadoAsesoria, setEstadoAsesoria] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [causaAsesoria, setCausaAsesoria] = useState([]);

    const [resultData, setResultData] = useState(0);
    const [dataPDF, setDataPDF] = useState(null);

    async function getAll() {
        try {
            const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.MotivoPsicologia);
            setLsMotivo(lsServerMotivo.data);

            const lsServerEstadoCaso = await GetByTipoCatalogoCombo(CodCatalogo.EstadoCaso);
            setLsEstadoCaso(lsServerEstadoCaso.data);

            const lsServerTipoAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.ASME_TIPOASESORIA);
            setTipoAsesoria(lsServerTipoAsesoria.data);

            const lsServerEstadoAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.ESTADO_CASO);
            setEstadoAsesoria(lsServerEstadoAsesoria.data);

            const lsServerCausaAsesoria = await GetByTipoCatalogoCombo(CodCatalogo.CausaAsesoria);
            setCausaAsesoria(lsServerCausaAsesoria.data);
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MainCard title="Datos del empleado">
                    <Grid container justifyContent="left" alignItems="center" spacing={2}>
                        <Grid item xs={12} md={2} lg={2}>
                            <TextField
                                fullWidth
                                type="number"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                onKeyDown={handleDocumento}
                                id="standard-basic"
                                label="Documento"
                                variant="outlined"
                            />
                        </Grid>

                        {lsEmployee === null ?
                            <>
                                <Grid item>
                                    <Box sx={{ width: '150px', height: '150px', ml: matchesXS ? 0 : 7 }}>
                                        <Lottie animationData={SearchEmployee} />
                                    </Box>
                                </Grid>

                                <Grid item xs md={5}>
                                    <Typography variant="h3">Registro de Documento</Typography>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="body1">
                                        Por favor, ingrese el número de documento correspondiente para realizar la búsqueda de la información básica del empleado.
                                    </Typography>
                                </Grid>

                            </>
                            :
                            <>
                                <Divider sx={{ px: 2 }} orientation="vertical" variant="middle" flexItem />

                                <Grid item xs={12} md={9} lg={9}>
                                    <AnimateComponent>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} md={4} lg={2.5} container justifyContent="center" alignItems="center">
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        width: 140,
                                                        height: 140,
                                                        borderRadius: '25px',
                                                    }}
                                                    src={lsEmployee.imagenUrl !== null ? lsEmployee.imagenUrl : User}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={8} lg={9.5}>
                                                <Typography variant="h2" sx={{ mb: 1 }}>
                                                    {lsEmployee.nombres}
                                                    <Chip
                                                        size="small"
                                                        label={lsEmployee.namePayStatus}
                                                        chipcolor={lsEmployee.namePayStatus === 'ACTIVO (A)' ? 'success' : 'error'}
                                                        sx={{ borderRadius: '4px', textTransform: 'capitalize', ml: 2 }}
                                                    />
                                                </Typography>

                                                <BoxTypography title="ROSTER POSITION:" data={lsEmployee.nameRosterPosition} />

                                                <Box
                                                    sx={{ mt: 0.5 }}
                                                    gap={0.5}
                                                    display="grid"
                                                    gridTemplateColumns={{
                                                        xs: 'repeat(1, 1fr)',
                                                        md: 'repeat(1, 0.5fr)',
                                                        lg: 'repeat(2, 0.5fr)',
                                                    }}
                                                >
                                                    <BoxTypography title="GENERO:" data={lsEmployee.nameGenero} />
                                                    <BoxTypography title="EDAD:" data={GetEdad(lsEmployee.fechaNaci)} />
                                                    <BoxTypography title="FECHA DE CONTRATO:" data={ViewFormat(lsEmployee.fechaContrato)} />
                                                    <BoxTypography title="ANTIGÜEDAD:" data={GetAnioMeses(lsEmployee.fechaContrato)} />
                                                    <BoxTypography title="GES:" data={lsEmployee.nameGes} />
                                                    <BoxTypography title="CIUDAD DE RESIDENCIA:" data={lsEmployee.nameMunicipioResidencia} />
                                                    <BoxTypography title="CORREO:" data={lsEmployee.email} />
                                                    <BoxTypography title="TELÉFONO:" data={lsEmployee.celular} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </AnimateComponent>
                                </Grid>
                            </>
                        }
                    </Grid>
                </MainCard>
            </Grid>

            <Grid item xs={12}>
                <MainCard title="Programar exámenes">
                    <FormProvider {...methods}>
                        <Grid container spacing={2}>
                            {lsEmployee !== null ?
                                <Grid item xs={12}>
                                    <AnimateComponent>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <BoxTypography title="ÚLTIMO TIPO DE ATENCIÓN:" data={lsEmployee?.ultimaAtencionEMO} />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <BoxTypography title="ÚLTIMA FECHA DE EMO:" data={ViewFormat(lsEmployee?.fechaUltimoEMO)} />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <BoxTypography title="MESES TRANSCURRIDOS:" data={lsEmployee?.mesesUltimoEMO} />
                                            </Grid>

                                            <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>
                                        </Grid>
                                    </AnimateComponent>
                                </Grid> : null
                            }

                            <Grid item xs={12} md={6} lg={3}>
                                <InputSelect
                                    name="mes"
                                    label="Mes"
                                    options={ArrayMeses}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.mes}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    type="number"
                                    defaultValue=""
                                    name="anio"
                                    label="Año"
                                    bug={errors.anio}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={6} md={4} lg={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={6} md={4} lg={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/psychologicalcounseling/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default MessageScheduling;