import { Fragment, useState } from 'react';
import { Grid } from '@mui/material';

import HoverSocialCard from 'components/components/HoverSocialCard';
import ExportOccupationalHealth from 'modules/ExportOccupationalHealth/ExportOccupationalHealth';

const arrayMenu = [
    {
        title: 'Medicinal Laboral',
        url: 'MEDIC',
        subtitle: '',
        color: '#E31937',
    },
    {
        title: 'Reintegro',
        url: 'REINT',
        subtitle: '',
        color: '#E31937',
    },
    {
        title: 'AT',
        url: 'AT',
        subtitle: '',
        color: '#E31937',
    },
    {
        title: 'Ausentismo Laboral',
        url: 'AUSENTI',
        subtitle: '',
        color: '#E31937',
    },
]

const MenuExcelOccupationalHealth = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tipoExcel, setTipoExcel] = useState({ codigo: '', titulo: '' });

    return (
        <Fragment>
            <Grid container spacing={2} sx={{ mt: 2.5 }}>
                {arrayMenu.map((item) => (
                    <Grid item xs={12} md={6} lg={3}>
                        <HoverSocialCard
                        diferent={true}
                            secondary={item.title}
                            onClick={() => { setOpenModal(true); setTipoExcel({ codigo: item.url, titulo: item.title }) }}
                            primary={item.subtitle}
                            iconPrimary="ph:export-thin"
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