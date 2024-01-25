import { useState, forwardRef, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme } from '@mui/material/styles';
import { Button, Collapse, Dialog, DialogContent, Grid, IconButton, Link, Slide, Typography, useMediaQuery } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { gridSpacing } from 'store/constant';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Message, ValidationMessage } from 'components/helpers/Enums';
import { SendMainRequests } from 'api/clients/RequestsClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';

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

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [stateMensaje, setStateMensaje] = useState('');
    const [ccBccValue, setCcBccValue] = useState(false);


    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleClick = async (datos) => {
        try {
            const objCorreo = {
                para: datos.para,
                asunto: datos.asunto,
                mensaje: stateMensaje,
                cc: datos.cc,
                listId: [`${lsData.id}`]
            }

            const result = await SendMainRequests(objCorreo);
            if (result.status === 200) {
                setOpen(false);
                reset();
                setStateMensaje('');
                setCcBccValue(false);

                setTimeout(() => {
                    setOpenSuccess(true);
                    setErrorMessage("Correo enviado con éxito");
                }, 1000);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("Hubo un problema al enviar el correo, verifique los datos de envío");
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Button variant="contained" onClick={() => setOpen(true)} fullWidth startIcon={<AddCircleOutlineTwoToneIcon />}>
                Envíar Documentación
            </Button>

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
                                <Grid container justifyContent="flex-end" spacing={0}>
                                    <Grid item>
                                        <Link
                                            component={RouterLink}
                                            to="#"
                                            color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
                                            onClick={() => setCcBccValue((prev) => !prev)}
                                            underline="hover"
                                        >
                                            CC
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsData?.correoRecibioDLTD}
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

                            <Grid item xs={12} sx={{ display: ccBccValue ? 'block' : 'none' }}>
                                <Collapse in={ccBccValue}>
                                    {ccBccValue && (
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item xs={12}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        fullWidth
                                                        name="cc"
                                                        label="CC"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Collapse>
                            </Grid>

                            {/* quill editor */}
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
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <IconButton size="large">
                                            <UploadFileIcon />
                                        </IconButton>
                                    </Grid>

                                    <Grid item>
                                        <IconButton size="large">
                                            <AttachmentTwoToneIcon />
                                        </IconButton>
                                    </Grid>

                                    <Grid item sx={{ flexGrow: 1 }} />

                                    <Grid item>
                                        <AnimateButton>
                                            <Button onClick={handleSubmit(handleClick)} variant="contained">Enviar</Button>
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