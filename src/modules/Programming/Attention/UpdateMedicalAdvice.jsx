import { useState, Fragment, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageSuccess, MessageDelete } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import ViewEmployee from 'components/views/ViewEmployee';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { FormatDate } from 'components/helpers/Format'
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAdvice, UpdateAdvices } from 'api/clients/AdviceClient';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultData } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice, PutMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { useParams } from 'react-router-dom';
import Cargando from 'components/loading/Cargando';
import { GetByIdAttention } from 'api/clients/AttentionClient';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateMedicalAdvice = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [medicalAdvice, setMedicalAdvice] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerMedicalAdvice = await GetByIdAttention(id);
            if (lsServerMedicalAdvice.status === 200) {
                setMedicalAdvice(lsServerMedicalAdvice.data);
                handleLoadingDocument(lsServerMedicalAdvice.data.documento);
                setDocumento(lsServerMedicalAdvice.data.documento);
            }

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ASME_TIPOASESORIA);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.MotivoMedica);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorDeDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DatosVacios = "Sin Registro";

            const DataToUpdate = PostMedicalAdvice(documento, FormatDate(datos.fecha), DefaultData.ASESORIA_MEDICA, lsEmployee.sede, DefaultData.SINREGISTRO_GLOBAL,
                DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL, datos.idTipoAsesoria, datos.idMotivo,
                DefaultData.SINREGISTRO_GLOBAL, datos.observaciones, DatosVacios, DatosVacios, DefaultData.SINREGISTRO_GLOBAL,
                medicalAdvice.usuarioRegistro, medicalAdvice.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToUpdate);
                if (result.status === 200) {
                    setOpenSuccess(true);
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
        <Fragment>
            {medicalAdvice.length != 0 ? (
                <Fragment>
                    <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />

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
                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={medicalAdvice.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    {/* <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idContingencia"
                                                label="Contingencia"
                                                defaultValue={medicalAdvice.idContingencia}
                                                options={contingencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid> */}

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={medicalAdvice.motivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTipoAsesoria"
                                                label="Tipo de Asesoría"
                                                defaultValue={medicalAdvice.idTipoAsesoria}
                                                options={tipoAsesoria}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <SubCard darkTitle title={<><Typography variant="h4">NOTA</Typography></>}>
                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        multiline
                                                        rows={4}
                                                        defaultValue={medicalAdvice.observaciones}
                                                        fullWidth
                                                        name="observaciones"
                                                        label="Observaciones"
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
                                        </SubCard>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ pt: 4 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                    {TitleButton.Actualizar}
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
                    </Grid >
                </Fragment >
            ) : <Cargando />}
        </Fragment >
    );
};

export default UpdateMedicalAdvice;