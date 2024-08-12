import { Fragment, useState } from 'react';
import { Grid } from '@mui/material';
import HoverSocialCard from 'components/components/HoverSocialCard';
import ViewExport from 'modules/Export/ViewExport';

const MenuExcel = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tipoExcel, setTipoExcel] = useState({ codigo: '', titulo: '' });

    const systemMenu = window.localStorage.getItem('systemMenu');
    const navigation = JSON.parse(systemMenu);
    const navigationMap = navigation.find(x => x.id === 4).children.find(x => x.id === 19).children;

    return (
        <Fragment>
            <Grid container spacing={2} sx={{ mt: 2.5 }}>
                {navigationMap.map((item) => (
                    <Grid item xs={12} md={6} lg={3}>
                        <HoverSocialCard
                            secondary={item.title}
                            onClick={() => { setOpenModal(true); setTipoExcel({ codigo: item.url, titulo: item.title }) }}
                            primary={item.subtitle}
                            iconPrimary={item.icono}
                            color={item.color}
                        />
                    </Grid>
                ))}
            </Grid>

            <ViewExport setOpenModal={setOpenModal} openModal={openModal} exportBy={tipoExcel} />
        </Fragment>
    );
};

export default MenuExcel;