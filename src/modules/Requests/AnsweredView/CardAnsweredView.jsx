import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';

import { MessageDelete } from 'components/alert/AlertAll';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { MessageSuccess } from 'components/alert/AlertAll';
import { ColorDrummondltd } from 'themes/colors';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Chip from 'ui-component/extended/Chip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ModalAnsweredView from './ModalAnsweredView';

const CardAnsweredView = ({ lsRequests }) => {
    const theme = useTheme();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openRequests, setOpenRequests] = useState(false);

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
                    title="Detalle De Solicitudes"
                    open={openRequests}
                    onClose={() => setOpenRequests(false)}
                    maxWidth="xl"
                >
                    <ModalAnsweredView lsCardRequests={lsRequests} />
                </ControlModal>

                <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />

                <CardMedia component="div" title="Area De Respuesta" sx={{
                    height: '70px', bgcolor: lsRequests.solicitudesRespondidas === 0 ? ColorDrummondltd.RedDrummond :
                        lsRequests.solicitudesRespondidas === (lsRequests.solicitudesRespondidas + lsRequests.solicitudesSinResponder)
                            ? ColorDrummondltd.GreenDrummond : ColorDrummondltd.YellowSeDrummond
                }}>
                    <Typography variant="h6" sx={{ pt: 2.5, color: 'white' }}>{lsRequests.nameEmpleado}</Typography>
                </CardMedia>

                <CardContent sx={{ p: 2, pb: '16px !important' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Chip
                                size="small"
                                label={
                                    `${lsRequests.solicitudesRespondidas} RESPUESTAS DE ${lsRequests.solicitudesRespondidas + lsRequests.solicitudesSinResponder}`
                                }
                                chipcolor={
                                    lsRequests.solicitudesRespondidas === 0 ? 'error' : lsRequests.solicitudesRespondidas === (lsRequests.solicitudesRespondidas + lsRequests.solicitudesSinResponder)
                                        ? 'success' : 'warning'
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5"><b>Documento:</b> </Typography>
                                    <Typography variant="h6">{lsRequests.documento}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h5"><b>Sede:</b> </Typography>
                                    <Typography variant="h6">{lsRequests.nameSede}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button onClick={() => setOpenRequests(true)} variant="outlined" fullWidth startIcon={<QuestionAnswerIcon />}>
                                    Ver Solicitud
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    );
};

CardAnsweredView.propTypes = {
    lsRequests: PropTypes.object,
    onClickDelete: PropTypes.object
};

export default CardAnsweredView;