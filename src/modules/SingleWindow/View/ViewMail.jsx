import { useState, forwardRef, Fragment, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogContent, Divider, Grid, IconButton, Slide, Typography, useMediaQuery } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import 'react-quill/dist/quill.snow.css';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';

import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ValidationMessage } from 'components/helpers/Enums';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { DescargarDocumentoVentanillaUnica, NotificarSolicitante, UpdateVentanillaUnicaCorreo } from 'api/clients/VentanillaUnicaClient';
import { LoadingButton } from '@mui/lab';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import CardButton from 'components/buttons/CardButton';
import ViewPDF from 'components/components/ViewPDF';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListIndexNotes from 'components/template/ListIndexNotes';
import InputSelect from 'components/input/InputSelect';
import { generateReportActaCorreo } from './Reportes';
import { GetAllComboVentanilla, GetByMail } from 'api/clients/UserClient';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import ReactQuill from 'react-quill';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const validationSchema = yup.object().shape({
    para: yup.string().nullable().required(ValidationMessage.Requerido).email("Debe ser un formato de correo valido"),
    asunto: yup.string().nullable().required(ValidationMessage.Requerido),
    idMedicoFirmante: yup.string().nullable().required(ValidationMessage.Requerido),
});

const ViewMail = ({ lsData }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [stateMensaje, setStateMensaje] = useState(lsData?.redaccionCorreo);
    const [archivoRecibido, setArchivoRecibido] = useState(null);
    const [lsUsuario, setLsUsuario] = useState([]);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalPDF, setOpenModalPDF] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openSuccessOut, setOpenSuccessOut] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, setValue, watch, formState: { errors } } = methods;
    const values = watch();

    useEffect(() => {
        setValue('idMedicoFirmante', lsData?.idMedicoFirmante);
        setValue('redaccionActa', lsData?.redaccionActa);
        setValue('redaccionCorreo', lsData?.redaccionCorreo);

        async function getAll() {
            try {
                const lsServerVenta = await GetAllComboVentanilla();
                setLsUsuario(lsServerVenta.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClickDescargar = async () => {
        try {
            const result = await DescargarDocumentoVentanillaUnica(lsData.id);
            if (result.status === 200) {
                DownloadFile(`ventanillaunicadocumentos${new Date().getTime()}.zip`, result.data);
            } else {
                setOpenError(true);
                setErrorMessage(result.data);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo descargar los archivos");
        }
    };

    const handleClickReport = async (openMod = true) => {
        try {
            if (!values.idMedicoFirmante)
                throw Error('Debe seleccionar los siguientes campos: "Quien Autoriza"');

            var dataUser = lsUsuario.find(x => x.value === values.idMedicoFirmante);
            const lsDataUser = await GetByMail(dataUser.codigo);
            const dataPDFTwo = generateReportActaCorreo(values.redaccionActa, lsDataUser.data);
            setArchivoRecibido(dataPDFTwo.dataPDF);

            if (openMod)
                setOpenModalPDF(true);

            return dataPDFTwo.file64;
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    const handleClickUpdate = async (datos) => {
        try {
            const DataToUpdate = {
                id: lsData.id,
                idUsuarioEnvia: user?.nameuser,
                idMedicoFirmante: datos.idMedicoFirmante,
                redaccionActa: datos.redaccionActa,
                redaccionCorreo: stateMensaje,
                asuntoCorreo: datos.asunto,
                usuarioModifico: user?.nameuser
            }

            const result = await UpdateVentanillaUnicaCorreo(DataToUpdate);
            if (result.status === 200) {
                setErrorMessage('Información del correo guardada con éxito');
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }

    const handleClick = async (datos) => {
        try {
            if (!stateMensaje)
                throw Error("Debe redactar un mensaje para enviar el correo de notificación");

            if (!values.redaccionActa)
                throw Error("Debe generar el acta del documento");

            setLoading(true);
            var base64File = await handleClickReport(false);

            const objCorreo = {
                id: lsData.id,
                correo: datos.para,
                asunto: datos.asunto,
                mensaje: stateMensaje,
                archivo: base64File
            }

            const DataToUpdate = {
                id: lsData.id,
                idUsuarioEnvia: user.nameuser,
                idMedicoFirmante: datos.idMedicoFirmante,
                redaccionActa: datos.redaccionActa,
                redaccionCorreo: stateMensaje,
                asuntoCorreo: datos.asunto,
                usuarioModifico: user.nameuser
            }

            const result = await NotificarSolicitante(objCorreo);
            if (result.data === "Ok") {
                setTimeout(() => {
                    setErrorMessage(`Se envió correctamente el correo a ${datos.para}`);
                    setOpenSuccessOut(true);
                    setOpen(false);
                    setLoading(false);
                }, 500);

                const result2 = await UpdateVentanillaUnicaCorreo(DataToUpdate);
                if (result2.status === 200) {
                    setTimeout(() => {
                        setErrorMessage('Información del correo guardada con éxito');
                        setOpenSuccessOut(true);
                    }, 4500);
                }
            } else {
                setLoading(false);
                setOpenError(true);
                setErrorMessage(result.data);
            }
        } catch (error) {
            setLoading(false);
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccessOut} onClose={() => setOpenSuccessOut(false)} />

            <FullScreenDialog
                open={openModal}
                title="Apuntes de indexación"
                handleClose={() => setOpenModal(false)}
            >
                <ListIndexNotes />
            </FullScreenDialog>

            <ControlModal
                title="Generar acta de respuesta"
                open={openModalPDF}
                onClose={() => setOpenModalPDF(false)}
                maxWidth="lg"
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        multiline
                                        rows={19}
                                        defaultValue={lsData?.redaccionActa}
                                        bug={errors.redaccionActa}
                                        fullWidth
                                        name="redaccionActa"
                                        label="Redacción de la acta"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item>
                                <AnimateButton>
                                    <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleClickReport}>
                                        Previsualizar
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item>
                                <AnimateButton>
                                    <Button variant="contained" onClick={() => setOpenModal(true)}>
                                        Apuntes de indexación
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <ViewPDF dataPDF={archivoRecibido} width={550} height={460} />
                    </Grid>
                </Grid>
            </ControlModal>

            <AnimateButton>
                <Button variant="contained" onClick={() => setOpen(true)} fullWidth startIcon={<AddCircleOutlineTwoToneIcon />}>
                    Envíar documentación
                </Button>
            </AnimateButton>

            <Dialog maxWidth="xl" open={open} TransitionComponent={Transition} keepMounted>
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />
                <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />

                {open && (
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" spacing={0}>
                                    <Grid item sm zeroMinWidth>
                                        <Grid container spacing={2} justifyContent="left" alignItems="center">
                                            <Grid item>
                                                <Typography component="div" align="left" variant="h4">
                                                    Nuevo mensaje
                                                </Typography>
                                            </Grid>

                                            <Grid item>
                                                <AnimateButton>
                                                    <Button startIcon={<SaveIcon />} variant="text" onClick={handleSubmit(handleClickUpdate)}>
                                                        Guardar Correo
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item>
                                        <IconButton onClick={() => setOpen(false)} size="large">
                                            <HighlightOffTwoToneIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={lsData?.archivoRecibido ? 7 : 9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsData?.correoSolicitante}
                                                bug={errors.para}
                                                fullWidth
                                                name="para"
                                                label="Para"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsData?.idMedicoFirmante}
                                                name="idMedicoFirmante"
                                                label="Quien autoriza"
                                                options={lsUsuario}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idMedicoFirmante}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsData?.asuntoCorreo}
                                                bug={errors.asunto}
                                                fullWidth
                                                name="asunto"
                                                label="Asunto"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} sx={{
                                        '& .quill': {
                                            bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                                            borderRadius: '12px',
                                            '& .ql-toolbar': {
                                                bgcolor: theme.palette.mode === 'dark' ? 'dark.light' : 'grey.100',
                                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : 'grey.400',
                                                borderTopLeftRadius: '12px',
                                                borderTopRightRadius: '12px'
                                            },
                                            '& .ql-container': {
                                                borderColor:
                                                    theme.palette.mode === 'dark'
                                                        ? `${theme.palette.dark.light + 20} !important`
                                                        : `${theme.palette.grey[400]} !important`,
                                                borderBottomLeftRadius: '12px',
                                                borderBottomRightRadius: '12px',
                                                '& .ql-editor': {
                                                    minHeight: 250
                                                }
                                            }
                                        }
                                    }}>
                                        <ReactQuill theme="snow" value={stateMensaje} onChange={setStateMensaje} />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                            <Grid item>
                                                <AnimateButton>
                                                    <CardButton
                                                        bgcolor={theme.palette.grey[500]}
                                                        onClick={handleClickDescargar}
                                                        iconPrimary={DownloadForOfflineIcon}
                                                        secondary={`${lsData?.numDocumento} archivos cargados con éxito`}
                                                        color={theme.palette.info.main}
                                                    />
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item>
                                                <AnimateButton>
                                                    <Button variant="contained" onClick={handleClickReport}>
                                                        Generar Acta
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item>
                                                <AnimateButton>
                                                    <Button variant="contained" onClick={() => setOpenModal(true)}>
                                                        Apuntes de indexación
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item>
                                                <AnimateButton>
                                                    <LoadingButton
                                                        fullWidth
                                                        onClick={handleSubmit(handleClick)}
                                                        loading={loading}
                                                        loadingPosition="end"
                                                        endIcon={<SendIcon />}
                                                        variant="outlined"
                                                    >
                                                        Enviar Notificación
                                                    </LoadingButton>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={lsData?.archivoRecibido ? 5 : 3}>
                                <Grid container spacing={2} sx={{ py: 2, px: 2 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ pb: 1 }} variant='h4'>Visualización del archivo de solicitud</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    {lsData?.archivoRecibido ?
                                        <ViewPDF dataPDF={lsData?.archivoRecibido} height={440} width={570} /> :

                                        <Grid item xs={12}>
                                            <Typography sx={{ pt: 20 }} variant="h4">No existe una solicitud registrada para visualizar</Typography>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                )}
            </Dialog>
        </Fragment>
    );
};

export default ViewMail;