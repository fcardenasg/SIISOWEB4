import { Fragment, useEffect, useState } from 'react';
import Logo from 'ui-component/Logo';

import { Grid, IconButton, Tooltip, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);

    const themeColor = createTheme({
        palette: {
            error: {
                main: '#E31937',
            },
        },
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <HoverSocialCard
                        secondary="ASESORÍA"
                        onClick={() => navigate("/catalog/list")}
                        primary="Tipo de Asesoría"
                        iconPrimary={IconReportMedical}
                        color="#d81b60"
                    />
                </Grid>

                <Grid item xs={3}>
                    <HoverSocialCard
                        secondary="PROGRAMACIÓN"
                        onClick={() => navigate("/catalog/list")}
                        primary="Tipo de Asesoría"
                        iconPrimary={IconActivity}
                        color="#388e3c"
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Dashboard;