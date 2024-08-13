import { Fragment } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import HoverSocialCard from 'components/components/HoverSocialCard';
import { itemsMenuOrders } from './items';

const ViewOrders = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Grid container spacing={2}>
                {itemsMenuOrders.map((item) => (
                    <Grid item xs={12} md={6} lg={3}>
                        <HoverSocialCard
                            secondary={item.title}
                            onClick={() => navigate(`${item.url}`)}
                            primary={item.subtitle}
                            iconPrimary={item.icon}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}

export default ViewOrders;