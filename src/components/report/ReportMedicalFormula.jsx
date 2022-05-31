import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import ReactToPrint from 'react-to-print';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';
import { ViewFormat } from 'components/helpers/Format';
import { GetAllMedicalFormula } from 'api/clients/MedicalFormulaClient';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));

const ReportMedicalFormula = () => {
    const navigate = useNavigate();
    const componentRef = useRef(null);
    const [lsMedicalFormula, setLsMedicaFormula] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllMedicalFormula(0, 0);
                if (lsServer.status === 200) setLsMedicaFormula(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [])


    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={18} md={6} lg={12} ref={componentRef}>
                <SubCard darkTitle title={
                    <>
                        <Typography variant="subtitle1">DRUMMOND LTD</Typography>
                        <Typography variant="subtitle1">DEPARTAMENTO DE SALUD E HIGIENE OCUPACIONAL</Typography>
                        <Typography variant="subtitle1">LISTADO DE RECETARIO</Typography>
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
                                            <StyledTableCell align="left">DOCUMENTO</StyledTableCell>
                                            <StyledTableCell align="left">NOMBRE</StyledTableCell>
                                            <StyledTableCell align="left">MÉDICO</StyledTableCell>
                                            <StyledTableCell align="left">FECHA</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {lsMedicalFormula.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{row.idRecetario}</TableCell>
                                                <TableCell align="left">{row.documento}</TableCell>
                                                <TableCell align="left">{row.nameEmpleado}</TableCell>
                                                <TableCell align="left">{row.medico}</TableCell>
                                                <TableCell align="left">{ViewFormat(row.fecha)}</TableCell>
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
                            <Button variant="contained" onClick={() => navigate('/medicalformula/list')}>
                                Cerrar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportMedicalFormula;