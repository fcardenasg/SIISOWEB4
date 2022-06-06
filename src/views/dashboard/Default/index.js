import { Fragment, useEffect, useState } from 'react';
import Logo from 'ui-component/Logo';

import { Grid, IconButton, Tooltip, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuItems from 'components/components/buttons/MenuItems';
import { itemsMenu } from 'components/components/buttons/items';
import MainCard from 'ui-component/cards/MainCard';
import ViewEmployee from 'components/views/ViewEmployee'
import HoverSocialCard from 'components/components/HoverSocialCard';
import {
    IconZoomIn,
    IconActivity,
    IconReportMedical,
    IconStethoscope,
    IconBuildingHospital
} from '@tabler/icons';

import { useTheme, createTheme } from '@mui/material/styles';

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

                <MenuItems items={itemsMenu} selectedItem={selectedItem} />
            </Grid>
        </Fragment>
    );
};

export default Dashboard;