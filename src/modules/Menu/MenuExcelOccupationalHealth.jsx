import { Fragment, useState } from 'react';
import { Grid } from '@mui/material';

import MenuItems from 'components/components/MenuItems/MenuItems';
import { IconFileExport } from '@tabler/icons';
import HoverSocialCard from 'components/components/HoverSocialCard';
import ExportOccupationalHealth from 'modules/ExportOccupationalHealth/ExportOccupationalHealth';

const arrayMenu = [
    {
        title: 'Medicinal Laboral',
        url: 'MEDIC',
        subtitle: '',
        selected: true,
        color: '#E31937',
    },
    {
        title: 'Reintegro',
        url: 'REINT',
        subtitle: '',
        selected: true,
        color: '#E31937',
    },
    {
        title: 'AT',
        url: 'AT',
        subtitle: '',
        selected: true,
        color: '#E31937',
    },
    {
        title: 'Ausentismo Laboral',
        url: 'AUSENTI',
        subtitle: '',
        selected: true,
        color: '#E31937',
    },
]

const MenuExcelOccupationalHealth = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tipoExcel, setTipoExcel] = useState({
        codigo: '',
        titulo: ''
    });

    const [itemsMenuButton, setItemsMenuButton] = useState([
        ...arrayMenu,
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
                <Grid item xs={6}>

                </Grid>

                <Grid item xs={6}>
                    <MenuItems items={itemsMenuButton} selectedItem={selectedItem} title="Agregar Opción" />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {itemsMenuButton.filter((item) => item.selected).map((item) => (
                    <Grid item xs={12} md={6} lg={3}>
                        <HoverSocialCard
                            secondary={item.title}
                            onClick={() => { setOpenModal(true); setTipoExcel({ codigo: item.url, titulo: item.title }) }}
                            primary={item.subtitle}
                            iconPrimary={IconFileExport}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>

            <ExportOccupationalHealth setOpenModal={setOpenModal} openModal={openModal} exportBy={tipoExcel} />

        </Fragment>
    );
};

export default MenuExcelOccupationalHealth;