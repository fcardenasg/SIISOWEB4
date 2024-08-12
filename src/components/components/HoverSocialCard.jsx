import PropTypes from 'prop-types';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import Iconify from 'components/iconify/iconify';

const HoverSocialCard = ({ primary, onClick, secondary, iconPrimary, color }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                background: color,
                position: 'relative',
                color: '#fff',
                '&:hover svg': {
                    opacity: '1',
                    transform: 'scale(1.1)',
                },
                cursor: 'pointer',
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
                    <Iconify width={25} icon={iconPrimary} />
                </Typography>
                <Grid container spacing={1.5}>
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

HoverSocialCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    iconPrimary: PropTypes.string,
    onClick: PropTypes.object,
    color: PropTypes.string,
    variant: PropTypes.string,
};

export default HoverSocialCard;