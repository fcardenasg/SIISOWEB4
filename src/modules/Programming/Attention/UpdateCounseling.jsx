import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import useAuth from 'hooks/useAuth';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputDatePicker from 'components/input/InputDatePicker';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { FormatDate } from 'components/helpers/Format';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdAttention } from 'api/clients/AttentionClient';
import Cargando from 'components/loading/Cargando';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateCounseling = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [estadoAsesoria, setEstadoAsesoria] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [causaAsesoria, setCausaAsesoria] = useState([]);

    useEffect(() => {
        GetAll();
    }, [])

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    async function GetAll() {
        try {
            const lsServerAtencion = await GetByIdAttention(id);
            if (lsServerAtencion.status === 200) {
                setLsAtencion(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);
                handleLoadingDocument(lsServerAtencion.data.documento);
            }

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoPsicologia);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoCaso);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoCaso(resultEstadoCaso);

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoAsesoria);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerEstadoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.EstadoAsesoria);
            var resultEstadoAsesoria = lsServerEstadoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setEstadoAsesoria(resultEstadoAsesoria);

            const lsServerCausaAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CausaAsesoria);
            var resultCausaAsesoria = lsServerCausaAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCausaAsesoria(resultCausaAsesoria);
        } catch (error) {
            console.log(error);
        }
    }

    console.log("lsAtencion = ", lsAtencion);

    const handleClick = async (datos) => {
        try {

            const DataToInsert = PostMedicalAdvice(documento, FormatDate(datos.fecha), DefaultData.AsesoriaPsicologica, lsEmployee.sede,
                DefaultValue.SINREGISTRO_GLOBAL, datos.idEstadoCaso, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.idTipoAsesoria, datos.idMotivo, datos.idCausa, datos.motivoConsulta, datos.concepto, datos.pautasSeguir,
                datos.idEstadoAsesoria, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToInsert);
                if (result.status === 200) {
                    setOpenUpdate(true);
                    reset();
                    setLsEmployee([]);
                    setDocumento('');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <ControllerListen />
            </ControlModal>

            {lsAtencion.length != 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                {/* <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idContingencia"
                                            label="Contingencia"
                                            defaultValue=""
                                            options={contingencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid> */}

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idEstadoCaso"
                                            label="Estado del Caso"
                                            defaultValue={lsAtencion.estadoCaso}
                                            options={lsEstadoCaso}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                {/* <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTurno"
                                            label="Turno"
                                            defaultValue=""
                                            options={lsTurno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid> */}

                                {/* <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idDiaTurno"
                                            label="Día Turno"
                                            defaultValue=""
                                            options={diaTurno}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid> */}

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
                                            defaultValue={lsAtencion.motivo}
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCausa"
                                            label="Causa de Asesoría"
                                            defaultValue=""
                                            options={causaAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idTipoAsesoria"
                                            label="Tipo Asesoría"
                                            defaultValue=""
                                            options={tipoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">NOTA</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsAtencion.observaciones}
                                            name="motivoConsulta"
                                            label="Motivo de consulta"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[1].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue=""
                                            name="concepto"
                                            label="Concepto"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[1].icons}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue=""
                                            name="pautasSeguir"
                                            label="Pautas a Seguir"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                    <DetailedIcon
                                        title={DetailIcons[0].title}
                                        onClick={() => setOpenTemplate(true)}
                                        icons={DetailIcons[0].icons}
                                    />

                                    <DetailedIcon
                                        title={DetailIcons[1].title}
                                        onClick={() => setOpen(true)}
                                        icons={DetailIcons[1].icons}
                                    />
                                </Grid>

                                <Grid item xs={5}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idEstadoAsesoria"
                                            label="Estado"
                                            defaultValue=""
                                            options={estadoAsesoria}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ pt: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/programming/list")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid> : <Cargando />}
        </Fragment>
    );
};

export default UpdateCounseling;