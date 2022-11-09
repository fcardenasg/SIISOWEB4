import { Fragment } from "react";
import SubCard from "ui-component/cards/SubCard";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import { Tabs, Tab, Box } from '@mui/material';
import { useState } from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import { ColorDrummondltd } from "themes/colors";
import ChartDataAdvace from "./Data/DataAdvace";
import { TabList } from "@mui/lab";


const Indicators = () => {
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <SubCard>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList variant="fullWidth" onChange={handleChange} aria-label="lab API tabs example">
                                <Tab value={1} icon={<BarChartIcon />} sx={{ color: ColorDrummondltd.RedDrummond }}
                                    iconPosition="start" label="Asesorías" />

                                <Tab value={2} icon={<BarChartIcon />} sx={{ color: ColorDrummondltd.OrangeDrummond }}
                                    iconPosition="start" label="Atención Médica" />

                                <Tab value={3} icon={<BarChartIcon />} sx={{ color: ColorDrummondltd.GreenDrummond }}
                                    iconPosition="start" label="EMO" />

                                <Tab value={4} icon={<BarChartIcon />} sx={{ color: ColorDrummondltd.BlueDrummond }}
                                    iconPosition="start" label="Enfermería" />
                            </TabList>
                        </Box>

                        <TabPanel value={1}>
                            <ChartDataAdvace />
                        </TabPanel>

                        <TabPanel value={2}>
                            <ChartDataAdvace />
                        </TabPanel>

                        <TabPanel value={3}>
                            <ChartDataAdvace />
                        </TabPanel>

                        <TabPanel value={4}>
                            <ChartDataAdvace />
                        </TabPanel>
                    </TabContext>
                </Box>
            </SubCard>
        </Fragment>
    )
}

export default Indicators;