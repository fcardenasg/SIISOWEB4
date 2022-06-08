import { useState, useEffect, Fragment } from 'react';
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

import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertAdvice } from 'api/clients/AdviceClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo, DefaultData } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostMedicalAdvice } from 'formatdata/MedicalAdviceForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ViewEmployee from 'components/views/ViewEmployee';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const Attention = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [documento, setDocumento] = useState('');
    const [tipo, setTipo] = useState('');
    const [atencion, setAtencion] = useState('');
    const [motivo, setMotivo] = useState('');
    const [documentoSolicita, setDocumentoSolicita] = useState('');
    const [nombreSolicitante, setNombreSolicitante] = useState('');

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [lsAtencion, setLsAtencion] = useState([]);
    const [lsTipo, setLsTipo] = useState([]);
    const [lsCodigoTipo, setLsCodigoTipo] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [tipoAsesoria, setTipoAsesoria] = useState([]);
    const [contingencia, setContingencia] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerTipo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_ATENCION);
            var resultTipo = lsServerTipo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipo(resultTipo);
            setLsCodigoTipo(lsServerTipo.data.entities);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setContingencia(resultContingencia);

            const lsServerTipoAsesoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ASME_TIPOASESORIA);
            var resultTipoAsesoria = lsServerTipoAsesoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setTipoAsesoria(resultTipoAsesoria);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MOTIVO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.ErrorDocumento}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
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

    const handleDocumentoSolicita = async (event) => {
        try {
            setDocumentoSolicita(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setNombreSolicitante(lsServerEmployee.data.nombres);
                    }
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.ErrorDocumento}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
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

    const handleChangeTipo = async (event) => {
        try {
            setTipo(event.target.value);

            var lsResulCode = String(lsCodigoTipo.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));

            var lsGetTipo = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 7);
            if (lsGetTipo.status === 200) {
                var resultMapsTipo = lsGetTipo.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));

                setLsAtencion(resultMapsTipo);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DatosVacios = "Sin Registro";

            const DataToInsert = PostMedicalAdvice(documento, FormatDate(datos.fecha), DefaultData.ASESORIA_MEDICA, lsEmployee.sede, datos.idContingencia,
                DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL, DefaultData.SINREGISTRO_GLOBAL, datos.idTipoAsesoria, datos.idMotivo,
                DefaultData.SINREGISTRO_GLOBAL, datos.observaciones, DatosVacios, DatosVacios, DefaultData.SINREGISTRO_GLOBAL,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            console.log("Datos = ", DataToInsert);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertAdvice(DataToInsert);
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
                    setDocumento('');
                    setLsEmployee([]);
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
        <Fragment>
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
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">REGISTRAR LA  ATENCIÓN</Typography>}>
                        <Grid container spacing={2}>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={null}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idSede"
                                        label="Sede"
                                        defaultValue=""
                                        options={contingencia}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="tipo"
                                    label="Tipo de Atención"
                                    value={tipo}
                                    options={lsTipo}
                                    onChange={handleChangeTipo}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <SelectOnChange
                                    name="idAtencion"
                                    label="Atención"
                                    value={atencion}
                                    options={lsAtencion}
                                    onChange={(e) => {
                                        setAtencion(e.target.value);
                                        setMotivo('');
                                    }}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            {tipo == DefaultValue.TIP_AT_TRIAGE ?
                                <Fragment>
                                    <Grid item xs={3}>
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
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idEstadoCaso"
                                                label="Estado Caso"
                                                defaultValue=""
                                                options={contingencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTurno"
                                                label="Turno"
                                                defaultValue=""
                                                options={contingencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idDiaTurno"
                                                label="Día Turno"
                                                defaultValue=""
                                                options={contingencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Fragment> : tipo == DefaultValue.TIP_AT_ENFERME && atencion == DefaultValue.AT_ENFERMERIA ?
                                    <Fragment>
                                        <Grid item xs={3}>
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
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idEstadoCaso"
                                                    label="Estado Caso"
                                                    defaultValue=""
                                                    options={contingencia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idTurno"
                                                    label="Turno"
                                                    defaultValue=""
                                                    options={contingencia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idDiaTurno"
                                                    label="Día Turno"
                                                    defaultValue=""
                                                    options={contingencia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Fragment> : tipo == DefaultValue.TIP_AT_ENFERME && atencion == DefaultValue.AT_PAD ?
                                        <Fragment>
                                            <Grid item xs={3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTurno"
                                                        label="Turno"
                                                        defaultValue=""
                                                        options={contingencia}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <SelectOnChange
                                                    name="idMotivo"
                                                    label="Motivo"
                                                    value={motivo}
                                                    options={lsMotivo}
                                                    onChange={(e) => {
                                                        setMotivo(e.target.value);
                                                        setDocumentoSolicita('');
                                                        setNombreSolicitante('');
                                                    }}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            {motivo == DefaultValue.AT_PAD_MOTIVO ?
                                                <Fragment>
                                                    <Grid item xs={3}>
                                                        <InputOnChange
                                                            label="Documento Quien Solicita"
                                                            onKeyDown={handleDocumentoSolicita}
                                                            onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                            value={documentoSolicita}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <InputOnChange
                                                            label="Nombre Solicitante"
                                                            onChange={(e) => setNombreSolicitante(e?.target.value)}
                                                            value={nombreSolicitante}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            disabled
                                                        />
                                                    </Grid>
                                                </Fragment> : <></>}

                                        </Fragment> : tipo == DefaultValue.TIP_AT_EMO ?
                                            <Fragment>
                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        label="Peso(Kilos)"
                                                        onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                        value={documentoSolicita}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        label="Talla(Metros)"
                                                        onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                        value={documentoSolicita}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        label="IMC"
                                                        onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                        value={documentoSolicita}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <InputOnChange
                                                        label="Clasificación"
                                                        onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                        value={documentoSolicita}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                            </Fragment> : <></>
                            }

                            <Grid item xs={12}>
                                <SubCard darkTitle title={<><Typography variant="h4">NOTA</Typography></>}>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                multiline
                                                rows={4}
                                                defaultValue=""
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
                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={() => navigate("/programming/list")} fullWidth>
                                            {TitleButton.Programacion}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={4}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/attention/list")}>
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
    );
};

export default Attention;