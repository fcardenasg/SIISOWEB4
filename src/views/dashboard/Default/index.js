import { Fragment, useState } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuItems from 'components/components/MenuItems/MenuItems';
import { itemsMenu } from 'components/components/MenuItems/items';
import HoverSocialCard from 'components/components/HoverSocialCard';

const Dashboard = () => {
    const navigate = useNavigate();

    const [itemsMenuButton, setItemsMenuButton] = useState([
        ...itemsMenu,
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
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                {itemsMenuButton.filter((item) => item.selected).map((item) => (
                    <Grid item xs={3}>
                        <HoverSocialCard
                            secondary={item.title}
                            onClick={() => navigate(`${item.url}`)}
                            primary={item.subtitle}
                            iconPrimary={item.icon}
                            color={item.color}
                        />
                    </Grid>
                ))}

                <MenuItems items={itemsMenuButton} selectedItem={selectedItem} />
            </Grid>
        </Fragment>
    );
};

export default Dashboard;