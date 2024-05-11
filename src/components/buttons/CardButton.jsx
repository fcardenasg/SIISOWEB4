import { useTheme } from '@mui/material/styles';
import { Card, CardActionArea, Grid, Typography, useMediaQuery } from '@mui/material';

const CardButton = ({ iconPrimary, onClick, secondary, secondarySub, color, bgcolor }) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary /> : null;

    return (
        <Card onClick={onClick} sx={{ bgcolor: bgcolor || '', position: 'relative' }}>
            <CardActionArea>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={4} sx={{ background: color, py: 1, px: 0 }}>
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
                                <Typography variant="body2" align="left" sx={{ color: bgcolor ? '#fff' : 'grey.700', ml: 2 }}>
                                    {secondary}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
};

export default CardButton;