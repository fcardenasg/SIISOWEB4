import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography } from '@mui/material';

import Chart from 'react-apexcharts';

import MainCard from 'ui-component/cards/MainCard';

import { IconScaleOutline, IconCreativeCommonsBy, IconHeartbeat } from '@tabler/icons';

const ChartAnthropometry = ({ datos, lastRecord }) => {
    const theme = useTheme();

    return (
        <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
            <Box sx={{ p: 3 }}>
                <Grid container direction="column" spacing={3}>
                    <Grid item container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="h3">Concepto De Aptitud Psicofísico</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ mt: -2.5, fontWeight: 400 }} color="inherit" variant="h5">
                            {lastRecord.nameIdConceptoActitudID}
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent="space-around" alignItems="center" spacing={3}>
                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: theme.palette.secondary.main,
                                            borderRadius: '12px',
                                            padding: 1,
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.secondary.light
                                        }}
                                    >
                                        <IconScaleOutline stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">PESO: {lastRecord.pesoEF}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: theme.palette.primary.main,
                                            borderRadius: '12px',
                                            padding: 1,
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.default
                                                    : theme.palette.primary.light
                                        }}
                                    >
                                        <IconCreativeCommonsBy stroke={1.5} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">IMC: {lastRecord.imcef}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            color: theme.palette.error.main,
                                            borderRadius: '12px',
                                            padding: 1,
                                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffe9e9'
                                        }}
                                    >
                                        <IconHeartbeat stroke={2} />
                                    </Typography>
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h4">{lastRecord.interpretacionFRA}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs zeroMinWidth />
                    </Grid>
                </Grid>
            </Box>
            <Chart {...datos} />
        </MainCard >
    );
};

ChartAnthropometry.propTypes = {
    datos: PropTypes.any,
    lastRecord: PropTypes.any,
};

export default ChartAnthropometry;
