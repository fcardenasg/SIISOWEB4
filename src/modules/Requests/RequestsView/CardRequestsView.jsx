import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

import { MessageDelete } from 'components/alert/AlertAll';
import { NumeroDiaSolicitudes, ViewFormat } from 'components/helpers/Format';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { MessageSuccess } from 'components/alert/AlertAll';
import { ColorDrummondltd } from 'themes/colors';
import ReplyIcon from '@mui/icons-material/Reply';
import Chip from 'ui-component/extended/Chip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ModalRequestAnswered from './ModalRequestAnswered';

const CardRequestsView = ({ lsRequests, getAll }) => {
    const theme = useTheme();

    const [colorCard, setColorCard] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openRequests, setOpenRequests] = useState(false);

    useEffect(() => {
        const obtenerColores = () => {
            try {
                var numeroDia = NumeroDiaSolicitudes(lsRequests.fechaSolicitud, lsRequests.fechaRespuesta);

                if (numeroDia <= 5) {
                    setColorCard(ColorDrummondltd.RedDrummond);
                } else if (numeroDia <= 10) {
                    setColorCard(ColorDrummondltd.YellowSeDrummond);
                } else {
                    setColorCard(ColorDrummondltd.GreenDrummond);
                }
            } catch (error) { }
        };

        obtenerColores();
    }, []);

    return (
        <Fragment>
            <Card
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
                    border: theme.palette.mode === 'dark' ? 'none' : '2px solid',
                    borderColor: theme.palette.grey[500], textAlign: 'center'
                }}
            >
                <ControlModal
                    title={`RESPONDER SOLICITUD DE ${lsRequests.nameTipoSolicitud}`}
                    open={openRequests}
                    onClose={() => setOpenRequests(false)}
                    maxWidth="xs"
                >
                    <ModalRequestAnswered idSolicitudDetalle={lsRequests.id} getAllRefresh={getAll} />
                </ControlModal>

                <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />

                <CardMedia component="div" title="Area De Respuesta" sx={{ height: '70px', bgcolor: colorCard }}>
                    <Typography variant="h5" sx={{ pt: 3, color: 'white' }}>{lsRequests.nameAreaRespuesta}</Typography>
                </CardMedia>

                <CardContent sx={{ p: 2, pb: '16px !important' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Chip
                                label={lsRequests.nameTipoSolicitud}
                                size="small"
                                chipcolor="error"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5"><b>Fecha y Días Limites:</b> </Typography>
                                    <Typography variant="h6">{ViewFormat(lsRequests.fechaRespuesta)} - {NumeroDiaSolicitudes(lsRequests.fechaSolicitud, lsRequests.fechaRespuesta)} Días</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h5"><b>Sede:</b> </Typography>
                                    <Typography variant="h6">{lsRequests.nameSede}</Typography>
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

CardRequestsView.propTypes = {
    lsRequests: PropTypes.object,
    onClickDelete: PropTypes.object
};

export default CardRequestsView;