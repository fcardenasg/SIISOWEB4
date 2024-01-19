import PropTypes from 'prop-types';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Fragment } from 'react';

const createData = (sales, product) => ({ sales, product });

const rows = [
    createData('Title', 'Content'),
    createData('Title', 'Content'),
    createData('Title', 'Content'),
    createData('Title', 'Content'),
    createData('Title', 'Content'),
];

const ViewInfoMore = () => (
    <Fragment>
        <Grid sx={{ p: 2.5 }} container direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
                <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography component="div" variant="subtitle2">
                            Procentaje estadistico 1
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="h3">
                            20,569$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography component="div" variant="subtitle2">
                            Procentaje estadistico 2
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="h3">
                            580$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column" spacing={1} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography component="div" variant="subtitle2">
                            Procentaje estadistico 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="div" variant="h3">
                            5,789$
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Divider />

        <PerfectScrollbar style={{ height: 220, padding: 0 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name Product</TableCell>
                            <TableCell align="right" sx={{ pr: 3 }}>
                                Price
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell>{row.sales}</TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    <span>{row.product}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PerfectScrollbar>
    </Fragment>
);

ViewInfoMore.propTypes = {
    title: PropTypes.string
};

export default ViewInfoMore;
