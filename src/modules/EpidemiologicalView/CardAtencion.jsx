import { useTheme } from '@mui/material/styles';
import { Button, Card, Fade, Grid, Tooltip, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Fragment, useState } from 'react';
import ControlModal from 'components/controllers/ControlModal';
import ViewMore from './ViewMore';
import { UpperFirstChar, ViewFormat } from 'components/helpers/Format';
import Chip from 'ui-component/extended/Chip';

const CardAtencion = ({ atencion, documento }) => {
    const theme = useTheme();
    const [OpenModal, setOpenModal] = useState(false);

    return (
        <Fragment>
            <ControlModal
                title={`Información De ${UpperFirstChar(atencion?.nameTipoAtencion)}`}
                open={OpenModal}
                onClose={() => setOpenModal(false)}
                maxWidth="lg"
            >
                <ViewMore documento={documento} dataAtencion={atencion} />
            </ControlModal>

            <Card
                sx={{
                    p: 2,
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
                    '&:hover': {
                        borderColor: theme.palette.primary.main
                    }
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="div">
                            {atencion?.nameTipoAtencion}
                        </Typography>
                        <Typography variant="caption" noWrap>{atencion?.nameAtencion}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography variant="caption">Última Atención/Tiempo</Typography>
                                <Typography variant="h6">{ViewFormat(atencion?.fechaUltimoRegistro)} / {atencion?.tiempo}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">{atencion?.nameTipoAtencion === 'ASESORIAS' ? 'Último Motivo' : 'Último Diagnóstico'}</Typography>

                        <Tooltip placement="bottom" title={atencion?.nameDx}>
                            <Typography>
                                <Chip
                                    size="small"
                                    label={atencion?.codDx}
                                    chipcolor={atencion?.codDx !== 'N/A' ? 'success' : 'error'}
                                    sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                />
                            </Typography>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button onClick={() => setOpenModal(true)} variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                                Ver más...
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Card>
        </Fragment>
    );
};

export default CardAtencion;