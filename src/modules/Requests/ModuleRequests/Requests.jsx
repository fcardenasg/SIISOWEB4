import { useState, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { ValidationMessage } from 'components/helpers/Enums';
import { yupResolver } from '@hookform/resolvers/yup';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { InsertRequests } from 'api/clients/RequestsClient';
import { Message, TitleButton } from 'components/helpers/Enums';
import InputText from 'components/input/InputText';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostRequests } from 'formatdata/RequestsForm';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ViewEmployee from 'components/views/ViewEmployee';
import InputOnChange from 'components/input/InputOnChange';

import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ViewPDF from 'components/components/ViewPDF';
import InputDatePick from 'components/input/InputDatePick';
import ListRequestsDetaills from './ListRequestsDetaills';

const validationSchema = yup.object().shape({
    fechaReciboDLTD: yup.string().required(`${ValidationMessage.Requerido}`),
    usuarioReciboDLTD: yup.string().required(`${ValidationMessage.Requerido}`),
    correoRecibioDLTD: yup.string().required(`${ValidationMessage.Requerido}`),
});

const Requests = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [datosEmpleado, setDatosEmpleado] = useState({
        direccion: '',
        correo: '',
        telefono: ''
    });

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const [result, setResult] = useState('');
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, formState: { errors } } = methods;

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = async (e) => {
                    setDataPDF(e.target.result);
                }
            }
            else {
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);

                        setDatosEmpleado({
                            direccion: lsServerEmployee.data.direccionResidencia,
                            correo: lsServerEmployee.data.email,
                            telefono: lsServerEmployee.data.celular
                        })
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleFechaInicio = (event) => {
        try {
            setFechaInicio(event.target.value);

            var dias = 15;
            var fecha = new Date(event.target.value);
            fecha.setDate(fecha.getDate() + dias);
            setFechaFin(fecha);
        } catch (error) { }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostRequests(documento, FormatDate(datos.fechaReciboDLTD), datos.usuarioReciboDLTD, datos.correoRecibioDLTD, FormatDate(fechaInicio),
                FormatDate(fechaFin), datosEmpleado.direccion, datosEmpleado.correo, datosEmpleado.telefono, datos.observacion, FormatDate(datos.fechaEntrega),
                datos.metodoUtilizado, datos.numeroGuia, datos.entidadSolicitante, user.nameuser, null, null, null, dataPDF);

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertRequests(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setResult(result.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorNoHayDatos);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Solicitudes"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SubCard darkTitle title={<Typography variant="h4">Recibio en DLTD</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Recibido"
                                        name="fechaReciboDLTD"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.fechaReciboDLTD}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        label="Recibido por"
                                        name="usuarioReciboDLTD"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.usuarioReciboDLTD}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        label="Correo DLTD"
                                        name="correoRecibioDLTD"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.correoRecibioDLTD}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <SubCard darkTitle title={<Typography variant="h4">Área De Salud Ocupacional E Higiene</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputDatePick
                                        onChange={handleFechaInicio}
                                        value={fechaInicio}
                                        label="Fecha de Recibido"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputDatePick
                                        onChange={(e) => setFechaFin(e.target.value)}
                                        value={fechaFin}
                                        label="Fecha Limite de Respuesta"
                                        name="fechaLimiteRespuesta"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Datos Del Solicitante</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputOnChange
                                        onChange={(e) => setDatosEmpleado({ ...datosEmpleado, direccion: e.target.value })}
                                        value={datosEmpleado.direccion}
                                        fullWidth
                                        label="Dirección"
                                        name="direccion"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputOnChange
                                        onChange={(e) => setDatosEmpleado({ ...datosEmpleado, correo: e.target.value })}
                                        value={datosEmpleado.correo}
                                        fullWidth
                                        label="Correo Electrónico"
                                        name="correo"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputOnChange
                                        onChange={(e) => setDatosEmpleado({ ...datosEmpleado, telefono: e.target.value })}
                                        value={datosEmpleado.telefono}
                                        fullWidth
                                        label="Teléfono"
                                        name="telefono"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">Detalle de Solicitud</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Entrega"
                                        name="fechaEntrega"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="metodoUtilizado"
                                        label="Metodo Utilizado"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="numeroGuia"
                                        label="Número Guia"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="entidadSolicitante"
                                        label="Entidad Solicitante"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={10}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        multiline
                                        rows={3}
                                        name="observacion"
                                        label="Observación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button size="large" variant="contained" component="label" fullWidth startIcon={<UploadFileIcon />}>
                                                {TitleButton.SubirArchivo}
                                                <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth disabled={dataPDF === null ? true : false} onClick={() => setOpenReport(true)} startIcon={<VisibilityIcon />}>
                                                {TitleButton.VerArchivo}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {result !== '' ?
                                <Grid item xs={12}>
                                    <ListRequestsDetaills lsEmployee={lsEmployee} idSolicitud={result} />
                                </Grid> : null}
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 6 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={result === '' ? false : true} variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/requests/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Requests;