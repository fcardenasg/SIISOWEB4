import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Iconify from 'components/iconify/iconify';
import { useState } from 'react';
import EmployeeInformation from '../EmployeeInformation/EmployeeInformation';
import OccupationalMedicalHistory from '../OccupationalMedicalHistory';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabsEMO(props) {
    const { dataEmployee } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex'
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="employee info tabs"
                    centered
                    sx={{
                        minHeight: 40,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            minHeight: 40,
                            gap: 1,
                            px: 2.5,
                            py: 0.5,
                        },
                        '& .Mui-selected': {
                            fontWeight: 600,
                            color: 'primary.main'
                        },
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '2px'
                        },
                    }}
                >
                    <Tab
                        icon={<Iconify icon="mdi:account-badge" />}
                        iconPosition="start"
                        label="Datos del empleado"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<Iconify icon="mdi:briefcase-outline" />}
                        iconPosition="start"
                        label="Historia laboral"
                        {...a11yProps(1)}
                    />
                    <Tab
                        icon={<Iconify icon="mdi:stethoscope" />}
                        iconPosition="start"
                        label="Historia clínica ocupacional"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <EmployeeInformation dataEmployee={dataEmployee} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Historia laboral
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <OccupationalMedicalHistory />
            </CustomTabPanel>
        </Box>
    );
}