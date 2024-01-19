import { Fragment } from 'react';
import ListHistoryAttention from './ListHistoryAttention';
import { Divider, Grid, Typography } from '@mui/material';
import GraphInfo from './GraphInfo';
import SubCard from 'ui-component/cards/SubCard';
import ViewInfoMore from './ViewInfoMore';

const ViewMore = () => {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Resumen</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ViewInfoMore />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <GraphInfo />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Últimos Tres Registros De ---</Typography>}>
                        <ListHistoryAttention />
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ViewMore;