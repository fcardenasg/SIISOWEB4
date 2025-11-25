import { Grid, Typography } from '@mui/material';
import { TableDLTD } from '../components/Table';

const WorkHistoryDLTD = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TableDLTD />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4">Otros cargos</Typography>
            </Grid>

            <Grid item xs={12}>
                <TableDLTD />
            </Grid>
        </Grid>
    )
}

export default WorkHistoryDLTD;