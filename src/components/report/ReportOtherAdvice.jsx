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
import { GetAllAdvice } from 'api/clients/AdviceClient';
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

const ReportMedicalAdvice = () => {
    const componentRef = useRef(null);

    const [medicalAdvice, setMedicalAdvice] = useState([]);

    async function GetAll() {
        try {
            const lsServer = await GetAllAdvice(0, 0);
            if (lsServer.status === 200) setMedicalAdvice(lsServer.data.entities);
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
            <Grid item xs={12} md={6} lg={12} ref={componentRef}>
                <SubCard darkTitle title={
                    <>
                        <Typography variant="subtitle1">DRUMMOND LTD</Typography>
                        <Typography variant="subtitle1">DEPARTAMENTO DE SALUD E HIGIENE OCUPACIONAL</Typography>
                        <Typography variant="subtitle1">LISTADO DE OTRAS ASESORÍAS</Typography>
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
                                            pr: { xs: 1, md: 5 }
                                        }
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">DOCUMENTO</StyledTableCell>
                                            <StyledTableCell align="left">FECHA</StyledTableCell>
                                            <StyledTableCell align="left">MOTIVO</StyledTableCell>
                                            <StyledTableCell align="left">USUARIO</StyledTableCell>
                                            <StyledTableCell align="left">ESTADO DEL CASO</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {medicalAdvice.map((row, index) => (
                                            <TableRow key={index}>

                                                <TableCell align="left">{row.documento}</TableCell>
                                                <TableCell align="left">{row.fecha}</TableCell>
                                                <TableCell align="left">{row.motivo}</TableCell>
                                                <TableCell align="left">{row.usuario}</TableCell>
                                                <TableCell align="left">{row.idEstadoCaso}</TableCell>
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
                            <Button variant="contained" onClick={() => navigate('/medicalAdvice/list')}>
                                Cerrar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportMedicalAdvice;