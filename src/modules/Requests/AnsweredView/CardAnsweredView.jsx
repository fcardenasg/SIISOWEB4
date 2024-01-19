import { Fragment, useEffect, useState } from 'react';
import { ViewFormat } from 'components/helpers/Format';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';

import ReplyIcon from '@mui/icons-material/Reply';
import Chip from 'ui-component/extended/Chip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import Avatar from 'components/form/Avatar';
import ModalAnsweredView from './ModalAnsweredView';
import { ColorDrummondltd } from 'themes/colors';



const CardRequestsView = ({ lsRequests }) => {
    const theme = useTheme();
    const [openRequests, setOpenRequests] = useState(false);
    const [etiquetaColor, setEtiquetaColor] = useState({
        colorChip: '',
        colorCard: ''
    });

    useEffect(() => {
        function getColorCard() {
            var totalSolicitud = (lsRequests.solicitudesRespondidas + lsRequests.solicitudesSinResponder);
            var mitadSolicitud = (totalSolicitud / 2);

            if (lsRequests.solicitudesSinResponder === 0) {
                setEtiquetaColor({ colorChip: "success", colorCard: ColorDrummondltd.GreenDrummond });
            } else if (lsRequests.solicitudesSinResponder > mitadSolicitud) {
                setEtiquetaColor({ colorChip: "warning", colorCard: ColorDrummondltd.YellowSeDrummond });
            } else if (lsRequests.solicitudesSinResponder > mitadSolicitud) {
                setEtiquetaColor({ colorChip: "error", colorCard: ColorDrummondltd.RedDrummond });
            }
        }

        getColorCard();
    }, [lsRequests]);

    return (
        <Fragment>
            <ControlModal
                title="Detalle De Solicitudes"
                open={openRequests}
                onClose={() => setOpenRequests(false)}
                maxWidth="xl"
            >
                <ModalAnsweredView lsCardRequests={lsRequests} />
            </ControlModal>

            <Card
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                    border: theme.palette.mode === 'dark' ? 'none' : '2px solid',
                    borderColor: theme.palette.grey[500],
                    textAlign: 'center'
                }}
            >
                <CardMedia component="div" title="Correspondencia" sx={{ height: '90px', bgcolor: etiquetaColor }}>
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
                                    <Typography fontSize={12}><b>{lsRequests?.documento} - {lsRequests?.nameEmpleado}</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Chip
                                        size="small"
                                        label={
                                            `${lsRequests.solicitudesRespondidas} RESPUESTAS DE ${lsRequests.solicitudesRespondidas + lsRequests.solicitudesSinResponder}`
                                        }
                                        chipcolor={etiquetaColor}
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
                                    <Typography variant="h6">{ViewFormat(lsRequests?.fechaRecibido)}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h6"><b>F. Límite</b> </Typography>
                                    <Typography variant="h6">{ViewFormat(lsRequests?.fechaLimiteRespuesta)}</Typography>
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