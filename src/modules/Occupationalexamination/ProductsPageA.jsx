import PropTypes from 'prop-types';

// material-ui
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// ==============================|| PRODUCTS-DATA PAGE ||============================== //

function ProductsPageA({ productsData, deleteProductHandler }) {
    return (
        <>
            {productsData.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Nro. Consecutivo</TableCell>
                                    <TableCell sx={{ pl: 3 }}>Nombres</TableCell>
                                    <TableCell align="left">Motivo</TableCell>
                                    <TableCell align="left">Fecha Sistema</TableCell>
                                    <TableCell align="left" sx={{ pr: 3 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsData.map((row, index) => (
                                    <TableRow key={index}>
                                    
                                    <TableCell align="left">{row.Consecutivo}</TableCell>

                                 
                               
                                        <TableCell align="left">{row.nombres}</TableCell>

                                        <TableCell align="left">{row.motivo}</TableCell>
                                        <TableCell align="left">{row.fecha}</TableCell>

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

ProductsPageA.propTypes = {
    productsData: PropTypes.array,
    deleteProductHandler: PropTypes.func
};

export default ProductsPageA;
