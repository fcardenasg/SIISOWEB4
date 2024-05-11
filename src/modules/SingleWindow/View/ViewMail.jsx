import { useState, forwardRef, Fragment } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogContent, Grid, IconButton, Slide, Typography, useMediaQuery } from '@mui/material';
import ReactQuill from 'react-quill';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import 'react-quill/dist/quill.snow.css';
import SendIcon from '@mui/icons-material/Send';

import { gridSpacing } from 'store/constant';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ValidationMessage } from 'components/helpers/Enums';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { DescargarDocumentoVentanillaUnica, NotificarSolicitante } from 'api/clients/VentanillaUnicaClient';
import { LoadingButton } from '@mui/lab';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import CardButton from 'components/buttons/CardButton';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const validationSchema = yup.object().shape({
    para: yup.string().required(ValidationMessage.Requerido),
    asunto: yup.string().required(ValidationMessage.Requerido)
});

const ViewMail = ({ lsData }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [stateMensaje, setStateMensaje] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

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

    const handleClick = async (datos) => {
        try {
            if (stateMensaje !== '') {
                setLoading(true);

                const objCorreo = {
                    id: lsData.id,
                    correo: datos.para,
                    asunto: datos.asunto,
                    mensaje: stateMensaje
                }

                const result = await NotificarSolicitante(objCorreo);
                if (result.data === "Ok") {
                    setTimeout(() => {
                        setErrorMessage("Se notifico correctamente a cada usuario");
                        setOpenSuccess(true);
                        setOpen(false);
                        setLoading(false);
                    }, 1000);
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            } else {
                setOpenError(true);
                setErrorMessage("Debe redactar un mensaje para enviar el correo de notificación");
            }
        } catch (error) {
            setLoading(false);
            setOpenError(true);
            setErrorMessage("Hubo un problema al enviar el correo, verifique los datos de envío");
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <AnimateButton>
                <Button variant="contained" onClick={() => setOpen(true)} fullWidth startIcon={<AddCircleOutlineTwoToneIcon />}>
                    Envíar Documentación
                </Button>
            </AnimateButton>

            <Dialog open={open} TransitionComponent={Transition} keepMounted>
                {open && (
                    <DialogContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" spacing={0}>
                                    <Grid item sm zeroMinWidth>
                                        <Typography component="div" align="left" variant="h4">
                                            Mensaje Nuevo
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <IconButton onClick={() => setOpen(false)} size="large">
                                            <HighlightOffTwoToneIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
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

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        bug={errors.asunto}
                                        fullWidth
                                        name="asunto"
                                        label="Asunto"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
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
                                                minHeight: 125
                                            }
                                        }
                                    }
                                }}
                            >
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
                                                secondary={`${lsData?.numDocumento} Archivos cargados con éxito`}
                                                color={theme.palette.info.main}
                                            />
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
                    </DialogContent>
                )}
            </Dialog>
        </Fragment>
    );
};

export default ViewMail;