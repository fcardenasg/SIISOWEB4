import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Button, Card, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import Avatar from 'ui-component/extended/Avatar';
import { TitleButton } from 'components/helpers/Enums';
import { Fragment, useEffect, useState } from 'react';
import { GetByIdRequestsDetaills } from 'api/clients/RequestsClient';
import Cargando from 'components/loading/Cargando';

const RequestAnswered = ({ idSolicitudDetalle }) => {
    const theme = useTheme();

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


    setTimeout(() => {
        if (lsRequests.length !== 0)
            setTimeWait(true);
    }, 1000);

    return (
        <Fragment>
            {timeWait ? <Card sx={{ p: 2, border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}` }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={3}>
                                <Avatar alt={lsRequests.nameEmpleado} size="md" src={lsRequests.fotoEmpleado} />
                            </Grid>

                            <Grid item xs={9}>
                                <Typography variant="h4" component="div">{lsRequests.nameEmpleado}</Typography>
                                <Typography variant="h4" component="div">{lsRequests.documento}</Typography>
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
                            <Grid item xs={6}>
                                <Button variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                                    {TitleButton.SubirArchivo}
                                </Button>
                            </Grid>

                            <Grid item xs={6}>
                                <Button variant="outlined" fullWidth startIcon={<NotInterestedTwoToneIcon />}>
                                    {TitleButton.TitleButton}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card> : <Cargando />}
        </Fragment>
    );
};

RequestAnswered.propTypes = {
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default RequestAnswered;
