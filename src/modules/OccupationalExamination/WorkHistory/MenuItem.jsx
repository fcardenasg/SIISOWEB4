import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { Grid } from '@mui/material';
import MenuItems from 'components/components/MenuItems/MenuItems';
import { itemsMenu } from './items';
import HoverSocialCard from 'components/components/HoverSocialCard';

export const MenuItem = ({ onClick }) => {

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
            <Grid container sx={{ pb: 2 }} direction="column" justifyContent="flex-start" alignItems="flex-end">
                <MenuItems items={itemsMenuButton} selectedItem={selectedItem} title="Exposición Ocupacional" />
            </Grid>

            <Grid container spacing={2}>
                {itemsMenuButton.filter((item) => item.selected).map((item) => (
                    <Grid item xs={3}>
                        <AnimateButton>
                            <HoverSocialCard
                                secondary={item.title}
                                onClick={() => onClick(`${item.func}`)}
                                iconPrimary={item.icon}
                                color={item.color}
                            />
                        </AnimateButton>
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

MenuItem.propTypes = {
    onClick: PropTypes.any,
};