import { useState, useEffect, Fragment } from 'react';
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

const validationSchema = yup.object().shape({
    idContingencia: yup.string().required(`${ValidationMessage.Requerido}`),
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

    const [result, setResult] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
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

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostRequests(documento, FormatDate(datos.fechaReciboDLTD), datos.usuarioReciboDLTD, FormatDate(datos.fechaRecibido),
                FormatDate(datos.fechaLimiteRespuesta), datos.direccion, datos.correo, datos.telefono, datos.observacion, FormatDate(datos.fechaEntrega),
                datos.metodoUtilizado, datos.numeroGuia, datos.entidadSolicitante, user.nameuser, undefined, "", undefined, datos.archivoSolicitado);

            if (Object.keys(datos.length !== 0)) {
                if (documento !== '' && lsEmployee.length !== 0) {
                    const result = await InsertRequests(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setResult(result.data.id)
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
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                {/* <ViewPDF dataPDF={dataPDF} /> */}
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
                                        defaultValue={new Date()}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        label="Recibido por"
                                        name="usuarioReciboDLTD"
                                        defaultValue=""
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <SubCard darkTitle title={<Typography variant="h4">Departamento De Salud E Higiene</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha de Recibido"
                                        name="fechaRecibido"
                                        defaultValue={new Date()}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha Limite de Respuesta"
                                        name="fechaLimiteRespuesta"
                                        defaultValue={new Date()}
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
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        label="Dirección"
                                        name="direccion"
                                        size={matchesXS ? 'small' : 'medium'}

                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        label="Correo Electrónico"
                                        name="correo"
                                        size={matchesXS ? 'small' : 'medium'}

                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
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
                                        defaultValue={new Date()}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="metodoUtilizado"
                                        label="Metodo Utilizado"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.motivoTraslado}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="numeroGuia"
                                        label="Número Guia"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.motivoTraslado}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="entidadSolicitante"
                                        label="Entidad Solicitante"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.motivoTraslado}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        multiline
                                        rows={5}
                                        name="observacion"
                                        label="Observación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.motivoTraslado}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} sx={{ pt: 6 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
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
                </Grid >
            </Grid >
        </Fragment >
    );
};

export default Requests;