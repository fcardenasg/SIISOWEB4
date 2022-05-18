import React, { useState } from 'react';
// material-ui
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Box,
    Typography,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import SubCard from 'ui-component/cards/SubCard';

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '1', customerId: 'MPI', amount: 3 },
            { date: '2', customerId: 'MPO', amount: 1 }
        ]
    };
}

function Row({ row }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell >{row.fat}</TableCell>
                <TableCell >{row.carbs}</TableCell>
                <TableCell >{row.protein}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 1
                            }}
                        >
                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Quimico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Físico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (


                                                <TableRow hover key={historyRow.date}>

                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>



                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Psicosocial"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Biológico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>


                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Ergonómico carga física"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
];


const WorkHistory = () => {
    const theme = useTheme();

    return (
        <>
            <MainCard content={false} title={<Typography variant="h4">HISTORIA LABORAL OTRAS EMPRESAS</Typography>}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }} />
                                <TableCell>Empresa</TableCell>
                                <TableCell>Cargo</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Años</TableCell>
                                <TableCell sx={{ pr: 3 }}>
                                    Meses
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>

            <Grid sx={{ pb: 2 }} />

            <MainCard content={false} title={<Typography variant="h4">HISTORIA LABORAL DLTD</Typography>}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }} />
                                <TableCell>Área</TableCell>
                                <TableCell >Cargo</TableCell>
                                <TableCell >Fecha</TableCell>
                                <TableCell >Año</TableCell>
                                <TableCell >Meses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </>
    );
};

export default WorkHistory;
