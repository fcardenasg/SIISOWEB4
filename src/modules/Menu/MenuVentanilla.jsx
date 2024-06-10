import { Fragment, useState } from 'react';

import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuItems from 'components/components/MenuItems/MenuItems';
import { IconMessages } from '@tabler/icons';
import HoverSocialCard from 'components/components/HoverSocialCard';

const MenuVentanilla = () => {
    const navigate = useNavigate();
    const systemMenu = window.localStorage.getItem('systemMenu');
    const navigation = JSON.parse(systemMenu);
    const navigationMap = navigation[0]?.children.find(x => x.id === 21).children;

    const [itemsMenuButton, setItemsMenuButton] = useState([...navigationMap]);

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
                            iconPrimary={IconMessages}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default MenuVentanilla;