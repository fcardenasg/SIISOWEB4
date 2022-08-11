import { useTheme } from '@mui/material/styles';
import { Grid, LinearProgress, Typography } from '@mui/material';

import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

const DataExposition = ({ title, title1, anio1, title2, mes1, title3, anio2, title4, mes2 }) => {
    const theme = useTheme();
    return (
        <SubCard title={<Typography variant="h4">{title}</Typography>}>
            <Grid container alignItems="center" spacing={gridSpacing}>
                <Grid item xs={12} lg={3} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" align="left">
                                {title1}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="left">
                                {anio1}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={3} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" align="left">
                                {title2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="left">
                                {mes1}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={3} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" align="left">
                                {title3}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="left">
                                {anio2}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={3} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" align="left">
                                {title4}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="left">
                                {mes2}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard >
    );
};

export default DataExposition;
