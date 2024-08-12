import { Fragment } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HoverSocialCard from 'components/components/HoverSocialCard';

const MenuMedicines = () => {
    const navigate = useNavigate();
    const systemMenu = window.localStorage.getItem('systemMenu');
    const navigation = JSON.parse(systemMenu);
    const navigationMap = navigation.find(x => x.id === 2).children.find(x => x.id === 14).children;

    return (
        <Fragment>
            <Grid container spacing={2} sx={{ mt: 2.5 }}>
                {navigationMap.map((item) => (
                    <Grid item xs={12} md={6} lg={3}>
                        <HoverSocialCard
                            secondary={item.title}
                            onClick={() => navigate(`${item.url}`)}
                            primary={item.subtitle}
                            iconPrimary={item.icono}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default MenuMedicines;