import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import BulkLoadingCharges from './Massive/BulkLoadingCharges';
import IndividualCharges from './Individual/IndividualCharges';

export default function PositionOverview() {
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="programacion">
                    <Tab label="Panorama de cargo masiva" value={1} />
                    <Tab label="Panorama de cargo individual" value={2} />
                </TabList>

                <TabPanel value={1}>
                    <BulkLoadingCharges />
                </TabPanel>

                <TabPanel value={2}>
                    <IndividualCharges />
                </TabPanel>
            </TabContext>
        </MainCard>
    );
}