import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Button, Card, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

import Avatar from 'ui-component/extended/Avatar';
import { Message, TitleButton } from 'components/helpers/Enums';
import { Fragment, useEffect, useState } from 'react';
import { GetByIdRequestsDetaills, UpdateRequestsDetaills } from 'api/clients/RequestsClient';
import Cargando from 'components/loading/Cargando';

import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { PutRequestsDetalle } from 'formatdata/RequestsForm';
import useAuth from 'hooks/useAuth';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';

const ModalRequestAnswered = ({ idSolicitudDetalle, getAllRefresh }) => {
    const { user } = useAuth();
    const theme = useTheme();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);

    const [lsRequests, setLsRequests] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    useEffect(() => {
        const getAll = async () => {
            try {
                await GetByIdRequestsDetaills(idSolicitudDetalle).then(response => {
                    setLsRequests(response.data);
                });
            } catch (error) { }
        };

        getAll();
    }, []);

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

    const handleClick = async () => {
        try {
            const UpdateToInsert = PutRequestsDetalle(idSolicitudDetalle, user.nameuser, user.nameuser, dataPDF);

            if (dataPDF !== null) {
                const result = await UpdateRequestsDetaills(UpdateToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setErrorMessage("Solicitud respondida con éxito");

                    setTimeout(() => {
                        getAllRefresh();
                    }, 1500);
                }
            } else {
                setOpenError(true);
                setErrorMessage('Por favor subir el archivo de respuesta');
            }


        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsRequests.length !== 0)
            setTimeWait(true);
    }, 500);

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaArchivo}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            {timeWait ?
                <Card sx={{ p: 2, border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}` }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item xs={3}>
                                    <Avatar alt={lsRequests.nameEmpleado} size="md" src={lsRequests.fotoEmpleado} />
                                </Grid>

                                <Grid item xs={9}>
                                    <Typography variant="h4" component="div">{lsRequests.nameEmpleado}</Typography>
                                    <Typography variant="h4" component="div">C.C. {lsRequests.documento}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h3" component="div">
                                {lsRequests.nameAreaRespuesta}
                            </Typography>
                            <Typography variant="caption">{lsRequests.nameTipoSolicitud}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="caption">
                                Observación de la Solicitud
                                <Typography variant="h6">
                                    {lsRequests.observacion === '' ? 'No se registro ninguna observación' : lsRequests.observacion}
                                </Typography>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="caption">Correo Empleado</Typography>
                            <Typography variant="h6">{lsRequests.empleadoEmail}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Celular</Typography>
                                    <Typography variant="h6">{lsRequests.empleadoCelular}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Municipio Residencia</Typography>
                                    <Typography variant="h6">{lsRequests.empleadoMunicipioResidencia}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4.5}>
                                    <AnimateButton>
                                        <Button variant="outlined" component="label" fullWidth>
                                            {TitleButton.SubirArchivo}
                                            <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <AnimateButton>
                                        <Button disabled={dataPDF === null ? true : false} variant="outlined" fullWidth onClick={() => setOpenReport(true)}>
                                            {TitleButton.VerArchivo}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={3}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={handleClick}>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card> : <Cargando />}
        </Fragment>
    );
};

ModalRequestAnswered.propTypes = {
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default ModalRequestAnswered;