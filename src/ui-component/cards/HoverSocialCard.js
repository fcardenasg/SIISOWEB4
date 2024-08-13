import { Card, CardContent, Grid, Typography } from '@mui/material';

// ===========================|| HOVER SOCIAL CARD ||=========================== //

const HoverSocialCard = ({ primary, secondary, iconPrimary, color, diferent = false }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = diferent ? iconPrimary : <IconPrimary fontSize="large" />;

    return (
        <Card
            sx={{
                background: color,
                position: 'relative',
                color: '#fff',
                '&:hover svg': {
                    opacity: '1',
                    transform: 'scale(1.1)'
                }
            }}
        >
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        right: 15,
                        top: 25,
                        color: '#fff',
                        '&> svg': {
                            width: 40,
                            height: 40,
                            opacity: '0.4',
                            transition: 'all .3s ease-in-out'
                        }
                    }}
                >
                    {primaryIcon}
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default HoverSocialCard;
