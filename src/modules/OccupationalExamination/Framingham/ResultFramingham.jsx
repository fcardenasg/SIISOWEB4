import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, useMediaQuery } from '@mui/material';

// =============================|| SIDE ICON CARD ||============================= //

const ResultFramingham = ({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary /> : null;

    return (
        <Card sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ background: theme.palette.grey[50] }}>
                <Grid item xs={4} sx={{ background: color, py: 1.5, px: 0 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            color: '#fff',
                            '& > svg': {
                                width: 32,
                                height: 32
                            }
                        }}
                        align="center"
                    >
                        {primaryIcon}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        spacing={1}
                        alignItems={matchDownXs ? 'center' : 'flex-start'}

                    >
                        <Grid item sm={12}>
                            <Typography variant="h4" sx={{ color: bgcolor ? '#000' : '', ml: 2 }}>
                                {primary}
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant="h5" align="left" sx={{ color: bgcolor ? '#000' : '', ml: 2 }}>
                                {secondary}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

ResultFramingham.propTypes = {
    iconPrimary: PropTypes.object,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    secondarySub: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string
};

export default ResultFramingham;
