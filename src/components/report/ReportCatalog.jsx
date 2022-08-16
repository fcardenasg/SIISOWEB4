import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import ReactToPrint from 'react-to-print';

import { GetAllCatalog } from 'api/clients/CatalogClient';
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

const ReportCatolog = () => {
    const navigate = useNavigate();
    const componentRef = useRef(null);

    const [catalog, setCatalog] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllCatalog(0, 0);
                if (lsServer.status === 200) setCatalog(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [catalog])

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={6} lg={12} ref={componentRef}>
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
                                            <StyledTableCell align="left">ID</StyledTableCell>
                                            <StyledTableCell align="left">NOMBRE</StyledTableCell>
                                            <StyledTableCell align="left">CÓDIGO</StyledTableCell>
                                            <StyledTableCell align="left">TIPO CÁTALOGO</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {catalog.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{row.idCatalogo}</TableCell>
                                                <TableCell align="left">{row.nombre}</TableCell>
                                                <TableCell align="left">{row.codigo}</TableCell>
                                                <TableCell align="left">{row.nameTypeCatalog}</TableCell>
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
                <Grid container sx={{ pt: 0.5, pb: 0.5 }} spacing={4} alignItems="center" justifyContent="center">
                    <Grid xs={6} item>
                        <AnimateButton>
                            <ReactToPrint trigger={() => <Button variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                        </AnimateButton>
                    </Grid>
                    <Grid xs={6} item>
                        <AnimateButton>
                            <Button variant="contained" onClick={() => navigate('/typecatalog/list')}>
                                Cerrar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportCatolog;