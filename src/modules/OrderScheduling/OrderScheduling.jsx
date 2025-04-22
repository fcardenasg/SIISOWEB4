import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import MassiveMessageScheduling from './MassiveMessageScheduling';
import MessageScheduling from './MessageScheduling';

export default function ProgrammingTabs() {
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="programacion">
                    <Tab label="Programar ordenes masivas" value={1} />
                    <Tab label="Programar ordenes individual" value={2} />
                </TabList>

                <TabPanel value={1}>
                    <MassiveMessageScheduling />
                </TabPanel>
                <TabPanel value={2}>
                    <MessageScheduling />
                </TabPanel>
            </TabContext>
        </MainCard>
    );
}