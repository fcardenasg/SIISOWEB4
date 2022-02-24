import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';



import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import {GetAllCompany} from 'api/clients/CompanyClient';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';


// table data
function createData(product, description, quantity, amount, total) {
    return { product, description, quantity, amount, total };
}

const rows = [
    createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
    createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
    createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 1,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 1,
    },
  }));


const ReportCompany = () => {
    const theme = useTheme();
    const componentRef = useRef(null);

    const [company, setCompany] = useState([]);

    async function GetAll() {
        const lsServer = await GetAllCompany(0, 0);
        setCompany(lsServer.data.entities);
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={18} md={6} lg={12} ref={componentRef}>
                <SubCard darkTitle title={
                    <>
                     <Typography variant="subtitle1">DRUMMOND LTD</Typography>
                     <Typography variant="subtitle1">DEPARTAMENTO DE SALUD E HIGIENE OCUPACIONAL</Typography>
                     <Typography variant="subtitle1">LISTADO DE EMPRESAS</Typography>
                    </>
                } secondary={<Logo />}>
                    <Grid container spacing={gridSpacing}>
                
                  
                        <Grid item xs={20}>
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
                                            pr: { xs: 1, md: 5}
                                        }
                                    }}
                                >

                                    
                                    <TableHead>
                                        <TableRow>
                                   
                                            <StyledTableCell align="left">ID</StyledTableCell>
                                            <StyledTableCell align="left">EMPRESA</StyledTableCell>
                                            <StyledTableCell align="left">CONTACTO</StyledTableCell>
                                            <StyledTableCell align="left">CORREO ELECTRÓNICO</StyledTableCell>
                                            <StyledTableCell align="left">CELULAR</StyledTableCell>


                                        </TableRow>
                                    </TableHead>




                                    <TableBody>
                                        {company.map((row, index) => (
                                            <TableRow key={index}>
                                        
                                                <TableCell align="left">{row.codigo}</TableCell>
                                                <TableCell align="left">{row.descripcionSpa}</TableCell>
                                                <TableCell align="left">{row.gerente}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.celular}</TableCell>
                                                <TableCell align="left" sx={{ pr: 3 }}>
                                                    {row.legt}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                       
            
                     
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={10} lg={8}>
                <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    sx={{
                        maxWidth: 950,
                        mx: 'auto',
                        mt: 0,
                        mb: 1.5,
                        '& > .MuiCardContent-root': {
                            py: { xs: 1.75, md: 1 },
                            px: { xs: 1.5, md: 1 }
                        }
                    }}
                >
                    <Grid item>
                        <AnimateButton>
                            <ReactToPrint trigger={() => <Button variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportCompany;