import { Fragment, useState } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuItems from 'components/components/MenuItems/MenuItems';
import HoverSocialCard from 'components/components/HoverSocialCard';
import { IconHome } from '@tabler/icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const systemMenu = window.localStorage.getItem('systemMenu');
    const navigation = JSON.parse(systemMenu);

    const [itemsMenuButton, setItemsMenuButton] = useState([
        ...navigation[0]?.children[0]?.children,
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
                            iconPrimary={IconHome}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default Dashboard;