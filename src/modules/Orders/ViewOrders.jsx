import { Fragment, useState } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuItems from 'components/components/MenuItems/MenuItems';
import HoverSocialCard from 'components/components/HoverSocialCard';
import { itemsMenuOrders } from './items';

const ViewOrders = () => {
    const navigate = useNavigate();

    const [itemsMenuButton, setItemsMenuButton] = useState([
        ...itemsMenuOrders,
    ]);

    const selectedItem = (itemSelected = []) => {
        const aux = itemsMenuButton.map((item) => {
            if (item.title === itemSelected.title) {
                return { ...item, selected: !item.selected };
            } else {
                return item;
            }
        });
        setItemsMenuButton(aux);
    };

    return (
        <Fragment>
            <Grid container sx={{ pb: 2 }} direction="column" justifyContent="flex-start" alignItems="flex-end">
                <MenuItems items={itemsMenuButton} selectedItem={selectedItem} title="Agregar Opción" />
            </Grid>

            <Grid container spacing={2}>
                {itemsMenuButton.filter((item) => item.selected).map((item) => (
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