import PropTypes from 'prop-types';
import { Grid, Divider, Typography } from '@mui/material';

// project imports
import { useTheme } from '@mui/material/styles';
import SubCard from 'ui-component/cards/SubCard';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { gridSpacing } from 'store/constant';
import ResultFramingham from './ResultFramingham';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Fragment } from 'react';

// ===========================|| WIDGET STATISTICS - CUSTOMER SATISFACTION ||=========================== //

const ViewFramingham = ({ ldl, relacion, frEdad, frColesterol, frHdl, frGlicemia, frTensionArterial,
    frTabaquismo, puntaje, riesgoAbsoluto, riesgoRelativo, interpretacion,
}) => {
    const theme = useTheme();

    return (
        <SubCard title="RESULTADOS">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">LDL</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{ldl}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Relación</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{relacion}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">FR Edad</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{frEdad}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Fr Colesterol</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{frColesterol}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Fr HDL</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{frHdl}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">FR Glicemia</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{frGlicemia}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Fr Tensión Arterial</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{frTensionArterial}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">FR Tabaquismo</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{frTabaquismo}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Puntaje</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{puntaje}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Riesgo Absoluto</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{riesgoAbsoluto}%</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Riesgo Relativo</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{riesgoRelativo}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid alignItems="center" alignContent="center" container spacing={2}>
                                <Grid item xs={4}>
                                    {interpretacion === 'POR DEBAJO DEL RIESGO PROMEDIO' ?
                                        <FavoriteIcon sx={{ color: theme.palette.success.dark, width: 50, height: 50 }} fontSize="large" /> :
                                        interpretacion === 'RIESGO PROMEDIO' ?
                                            <FavoriteIcon sx={{ color: theme.palette.secondary.dark, width: 50, height: 50 }} fontSize="large" /> :
                                            interpretacion === 'RIESGO MODERADO' ?
                                                <HeartBrokenIcon sx={{ color: theme.palette.warning.dark, width: 50, height: 50 }} fontSize="large" /> :
                                                interpretacion === 'RIESGO ALTO' ?
                                                    <HeartBrokenIcon sx={{ color: theme.palette.error.dark, width: 50, height: 50 }} fontSize="large" /> : ''
                                    }
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography paragraph variant="h5">{interpretacion}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    )
};

export default ViewFramingham;

ViewFramingham.propTypes = {
    ldl: PropTypes.any,
    relacion: PropTypes.any,
    frEdad: PropTypes.any,
    frColesterol: PropTypes.any,
    frHdl: PropTypes.any,
    frGlicemia: PropTypes.any,
    frTensionArterial: PropTypes.any,
    frTabaquismo: PropTypes.any,
    puntaje: PropTypes.any,
    riesgoAbsoluto: PropTypes.any,
    riesgoRelativo: PropTypes.any,
    interpretacion: PropTypes.any,
};