import PropTypes from 'prop-types';
import { Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { Message, TitleButton } from 'components/helpers/Enums';
import { Fragment, useEffect, useState } from 'react';
import { GetAllRequestsDetaillsByIdSolicitud, GetByIdRequests, GetFileRequests, UpdateRequestsDataSend } from 'api/clients/RequestsClient';
import Cargando from 'components/loading/Cargando';

import { IconMessages } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import Accordion from 'components/accordion/Accordion';
import { FormProvider, useForm } from 'react-hook-form';
import InputDatePicker from 'components/input/InputDatePicker';
import InputText from 'components/input/InputText';
import { PutRequests } from 'formatdata/RequestsForm';
import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';

const ModalAnsweredView = ({ lsCardRequests }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [documento, setDocumento] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsRequests, setLsRequests] = useState([]);
    const [lsRequestsById, setLsRequestsById] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleViewPdf = async (id) => {
        try {
            setDataPDF(null);
            var serverPdf = await GetFileRequests(id);

            if (serverPdf.status === 200) {
                setDataPDF(serverPdf.data);

                setTimeout(() => {
                    setOpenReport(true);
                }, 500);
            }
        } catch (error) { }
    }

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

    useEffect(() => {
        const getAll = async () => {
            try {
                const event = {
                    target: { value: lsCardRequests.documento }
                }
                setDocumento(lsCardRequests.documento);
                handleLoadingDocument(event);

                await GetAllRequestsDetaillsByIdSolicitud(lsCardRequests.id).then(response => {
                    setLsRequests(response.data);
                });

                await GetByIdRequests(lsCardRequests.id).then(response => {
                    setLsRequestsById(response.data);
                    setDataPDF(response.data.archivoSolicitado);
                });
            } catch (error) { }
        };

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutRequests(lsCardRequests.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                undefined, datos.observacion, FormatDate(datos.fechaEntrega), datos.metodoUtilizado, datos.numeroGuia, datos.entidadSolicitante, undefined, undefined,
                user.nameuser, undefined, dataPDF);

            const result = await UpdateRequestsDataSend(DataToInsert);
            if (result.status === 200) {
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsRequests.length !== 0)
            setTimeWait(true);
    }, 1000);

    return (
        <Fragment>
            <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaArchivo}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="md"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            {timeWait ?
                <ViewEmployee
                    title="Información del Empleado"
                    disabled={true}
                    key={lsEmployee.documento}
                    documento={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    lsEmployee={lsEmployee}
                    handleDocumento={handleLoadingDocument}
                >
                    <Accordion title={<><IconMessages stroke={2} color={theme.palette.primary.main} size="1.3rem" />
                        <Typography sx={{ pl: 1 }} variant="h5">Solicitudes</Typography></>}
                    >
                        <SubCard title={<Typography variant="h4">Lista De Solicitudes</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Solicitud</TableCell>
                                                    <TableCell>Responsable Respuesta</TableCell>
                                                    <TableCell>Estado Respuesta</TableCell>
                                                    <TableCell>Fecha Registro</TableCell>
                                                    <TableCell>Acción</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {lsRequests.map((row) => (
                                                    <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                        <TableCell component="th" scope="row">{row.nameTipoSolicitud}</TableCell>
                                                        <TableCell>{row.nameAreaRespuesta}</TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                size="small"
                                                                label={row.estadoRespuesta ? 'RESPONDIDA' : 'SIN RESPUESTA'}
                                                                chipcolor={row.estadoRespuesta ? 'success' : 'error'}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{new Date(row.fechaRegistro).toLocaleString()}</TableCell>

                                                        <TableCell>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <AnimateButton>
                                                                        <Tooltip disabled={!row.estadoRespuesta ? true : false} title="Ver Archivo" onClick={() => handleViewPdf(row.id)}>
                                                                            <IconButton color="primary">
                                                                                <VisibilityIcon sx={{ fontSize: '2rem' }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </AnimateButton>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Accordion>

                    <SubCard sx={{ mt: 2 }} title={<Typography variant="h4">Actualizar Datos De Envío De Solicitudes</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        defaultValue={lsRequestsById.fechaEntrega}
                                        label="Fecha de Entrega"
                                        name="fechaEntrega"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsRequestsById.metodoUtilizado}
                                        fullWidth
                                        name="metodoUtilizado"
                                        label="Medio De Envío"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsRequestsById.numeroGuia}
                                        fullWidth
                                        name="numeroGuia"
                                        label="Número Guía"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsRequestsById.entidadSolicitante}
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
                                        defaultValue={lsRequestsById.observacion}
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

                            <Grid item xs={2} sx={{ pt: 3 }}>
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </SubCard>
                </ViewEmployee> : <Cargando />
            }

        </Fragment>
    );
};

ModalAnsweredView.propTypes = {
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default ModalAnsweredView;