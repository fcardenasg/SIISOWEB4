import PropTypes from 'prop-types';

// material-ui
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// ==============================|| PRODUCTS-DATA PAGE ||============================== //

function ProductsPage({ productsData, deleteProductHandler }) {
    return (
        <>
            {productsData.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Empresa</TableCell>
                                    <TableCell sx={{ pl: 3 }}>Cargo</TableCell>
                                    <TableCell align="left">Años</TableCell>
                                    <TableCell align="left">Meses</TableCell>
                                    <TableCell align="left" sx={{ pr: 3 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ pl: 3 }}>
                                            <Typography align="left" variant="subtitle1">
                                                {row.product}
                                            </Typography>
                                            <Typography align="left" variant="body2">
                                                {row.description}
                                            </Typography>
                                        </TableCell>
                                 

                                 
                               
                                        <TableCell align="left">{row.cargo}</TableCell>

                                        <TableCell align="left">{row.quantity}</TableCell>
                                        <TableCell align="left">{row.amount}</TableCell>

                                        <TableCell sx={{ pr: 1 }} align="left">
                                            <IconButton color="success" size="small" onClick={() => deleteProductHandler(row.id)}>
                                                <AddCircleOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>

                                        <TableCell sx={{ pr: 1 }} align="left">
                                            <IconButton color="error" size="small" onClick={() => deleteProductHandler(row.id)}>
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ) : null}
        </>
    );
}

ProductsPage.propTypes = {
    productsData: PropTypes.array,
    deleteProductHandler: PropTypes.func
};

export default ProductsPage;
