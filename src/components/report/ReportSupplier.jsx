import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import { GetAllSupplier } from 'api/clients/SupplierClient';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const ReportSupplier = () => {
    const theme = useTheme();
    const componentRef = useRef(null);

    const [supplier, setSupplier] = useState([]);

    async function GetAll() {
        try {
            const lsServer = await GetAllSupplier(0, 0);
            if (lsServer.status === 200) setSupplier(lsServer.data.entities);
        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    const navigate = useNavigate();

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={18} md={6} lg={12} ref={componentRef}>
                <SubCard darkTitle title={
                    <>
                        <Typography variant="subtitle1">DRUMMOND LTD</Typography>
                        <Typography variant="subtitle1">DEPARTAMENTO DE SALUD E HIGIENE OCUPACIONAL</Typography>
                        <Typography variant="subtitle1">LISTADO DE EMPRESAS</Typography>
                    </>
                } secondary={<Logo />}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table
                                    sx={{
                                        '& tr:last-child td': {
                                            borderBottom: 'none'
                                        },
                                        '& thead tr th': {
                                            borderBottom: 'none'
                                        },
                                        '& th:first-child, & td:first-child': {
                                            pl: { xs: 1, md: 5 }
                                        },
                                        '& th:last-child, & td:last-child': {
                                            pr: { xs: 1, md: 5 }
                                        }
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">CÓDIGO</StyledTableCell>
                                            <StyledTableCell align="left">NOMBRE</StyledTableCell>
                                            <StyledTableCell align="left">TELÉFONO</StyledTableCell>
                                            <StyledTableCell align="left">CORREO ELECTRÓNICO</StyledTableCell>
                                            <StyledTableCell align="left">TIPO PROVEEDOR</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {supplier.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{row.codiProv}</TableCell>
                                                <TableCell align="left">{row.nombProv}</TableCell>
                                                <TableCell align="left">{row.teleProv}</TableCell>
                                                <TableCell align="left">{row.emaiProv}</TableCell>
                                                <TableCell align="left">{row.nameTypeSupplier}</TableCell>
                                                {/* <TableCell align="left" sx={{ pr: 3 }}>
                                                    {row.legt}
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item>
                <Grid sx={{ pt: 2 }} container xs={12} spacing={2} alignItems="center" justifyContent="center">
                    <Grid xs={6} item>
                        <AnimateButton>
                            <ReactToPrint trigger={() => <Button variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                        </AnimateButton>
                    </Grid>
                    <Grid xs={6} item>
                        <AnimateButton>
                            <Button variant="contained" onClick={() => navigate('/supplier/list')}>
                                Cerrar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportSupplier;