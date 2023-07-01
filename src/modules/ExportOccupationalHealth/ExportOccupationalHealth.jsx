import { Tab } from "@mui/material";

import { useState, Fragment } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import AccidenteTrabajo from './Export/AccidenteTrabajo';
import MedicionaLaboralExport from './Export/MedicionaLaboralExport';
import ReintegroExport from './Export/ReintegroExport';
import AusentismoExport from './Export/AusentismoExport';

import { ColorDrummondltd } from 'themes/colors';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const Title = {
    medicinaLaboral: 'Medicinal Laboral', reintegro: 'Reintegro',
    accidentalidadTrabajo: 'AT', ausentismoLaboral: 'Ausentismo Laboral',
}

const ExportOccupationalHealth = () => {
    const [value, setValue] = useState(1);

    return (
        <Fragment>
            <SubCard title="Generar Excel" secondary="Cerrar">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList variant="fullWidth" onChange={(event, newValue) => setValue(newValue)} aria-label="lab API tabs example">
                                <Tab value={1} sx={{ color: ColorDrummondltd.BlueDrummond }} label={Title.medicinaLaboral} />

                                <Tab value={2} sx={{ color: ColorDrummondltd.BlueDrummond }} label={Title.reintegro} />

                                <Tab value={3} sx={{ color: ColorDrummondltd.BlueDrummond }} label={Title.accidentalidadTrabajo} />

                                <Tab value={4} sx={{ color: ColorDrummondltd.BlueDrummond }} label={Title.ausentismoLaboral} />
                            </TabList>
                        </Box>

                        <TabPanel value={1}>
                            <MedicionaLaboralExport />
                        </TabPanel>

                        <TabPanel value={2}>
                            <ReintegroExport />
                        </TabPanel>

                        <TabPanel value={3}>
                            <AccidenteTrabajo />
                        </TabPanel>

                        <TabPanel value={4}>
                            <AusentismoExport />
                        </TabPanel>
                    </TabContext>
                </Box>
            </SubCard>
        </Fragment>
    );
};

export default ExportOccupationalHealth;