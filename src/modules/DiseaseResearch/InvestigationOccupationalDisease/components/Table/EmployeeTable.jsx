import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E0E0E0',
    color: theme.palette.common.black,
    fontWeight: 'bold',
    padding: '8px 12px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px 12px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(fechaIngreso, cargoInicial, turno, rotacion, jornada, tiempoCargo) {
  return { fechaIngreso, cargoInicial, turno, rotacion, jornada, tiempoCargo };
}

const rows = [
  createData('2021-03-15', 'Asistente Administrativo', 'Mañana', 'No', 'Completa', '4 años / 7 meses'),
  createData('2023-08-01', 'Técnico de Soporte', 'Tarde', 'Sí', 'Parcial', '2 años / 2 meses'),
];

export default function EmployeeTable() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fecha de ingreso</StyledTableCell>
            <StyledTableCell>Cargo inicial</StyledTableCell>
            <StyledTableCell>Turno</StyledTableCell>
            <StyledTableCell>Rotación</StyledTableCell>
            <StyledTableCell>Jornada</StyledTableCell>
            <StyledTableCell>Tiempo en el cargo (años / meses)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.fechaIngreso}
              </StyledTableCell>
              <StyledTableCell>{row.cargoInicial}</StyledTableCell>
              <StyledTableCell>{row.turno}</StyledTableCell>
              <StyledTableCell>{row.rotacion}</StyledTableCell>
              <StyledTableCell>{row.jornada}</StyledTableCell>
              <StyledTableCell>{row.tiempoCargo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}