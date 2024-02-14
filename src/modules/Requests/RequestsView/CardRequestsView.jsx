import { Fragment, useState } from 'react';
import { ViewFormat } from 'components/helpers/Format';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';

import ReplyIcon from '@mui/icons-material/Reply';
import Chip from 'ui-component/extended/Chip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ModalRequestAnswered from './ModalRequestAnswered';
import Avatar from 'components/form/Avatar';

const CardRequestsView = ({ lsRequests, getAll }) => {
    const theme = useTheme();
    const [openRequests, setOpenRequests] = useState(false);

    return (
        <Fragment>
            <ControlModal
                title="Responder Solicitud"
                open={openRequests}
                onClose={() => setOpenRequests(false)}
                maxWidth="xs"
            >
                <ModalRequestAnswered idSolicitudDetalle={lsRequests.id} getAllRefresh={getAll} />
            </ControlModal>

            <Card
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                    border: theme.palette.mode === 'dark' ? 'none' : '2px solid',
                    borderColor: theme.palette.grey[500],
                    textAlign: 'center'
                }}
            >
                <CardMedia component="div" title="Correspondencia" sx={{ height: '90px', bgcolor: lsRequests?.color }}>
                    <Typography variant="h6" sx={{ pt: 3, color: 'white' }}>{lsRequests?.nameAreaRespuesta}</Typography>
                </CardMedia>

                <CardContent sx={{ p: 2, pb: '16px !important' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Avatar alt={lsRequests?.nameEmpleado} src={lsRequests?.empleadoFoto === undefined ? null :
                                        lsRequests?.empleadoFoto === '' ? null : lsRequests?.empleadoFoto} sx={{ width: 60, height: 60, m: '-50px auto 0' }} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} alignItems="center">
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h6"><b>{lsRequests?.documento} - {lsRequests?.nameEmpleado}</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Chip
                                        label={lsRequests?.nameTipoSolicitud}
                                        size="small"
                                        sx={{
                                            bgcolor: lsRequests?.color,
                                            color: 'white'
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6"><b>{lsRequests?.diasTranscurridos}</b></Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography variant="h6"><b>F. Recibido</b> </Typography>
                                    <Typography variant="h6">{ViewFormat(lsRequests?.fechaSolicitud)}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h6"><b>F. Límite</b> </Typography>
                                    <Typography variant="h6">{ViewFormat(lsRequests?.fechaRespuesta)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button onClick={() => setOpenRequests(true)} variant="outlined" fullWidth startIcon={<ReplyIcon />}>
                                    Responder
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    );
};

export default CardRequestsView;