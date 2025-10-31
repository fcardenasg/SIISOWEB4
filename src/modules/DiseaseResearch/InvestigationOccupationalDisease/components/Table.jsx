import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

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

export function TableDLTD() {
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

const rowsOtherCompanies = [
  {
    empresa: 'Constructora Andina S.A.',
    actividadEconomica: 'Construcción de edificios residenciales',
    cargoUOficio: 'Ingeniero Civil',
    tiempoEnCargo: '3 años / 5 meses'
  },
  {
    empresa: 'Servicios Logísticos del Sur Ltda.',
    actividadEconomica: 'Transporte terrestre de carga',
    cargoUOficio: 'Coordinador de Operaciones',
    tiempoEnCargo: '1 año / 10 meses'
  }
];

export function TableOtherCompanies() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Empresa</StyledTableCell>
            <StyledTableCell>Actividad económica</StyledTableCell>
            <StyledTableCell>Cargo u oficio</StyledTableCell>
            <StyledTableCell>Tiempo en el cargo (años / meses)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsOtherCompanies.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.empresa}
              </StyledTableCell>
              <StyledTableCell>{row.actividadEconomica}</StyledTableCell>
              <StyledTableCell>{row.cargoUOficio}</StyledTableCell>
              <StyledTableCell>{row.tiempoEnCargo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rowsDiagnosis = [
  {
    diagnostico: 'Enfermedad laboral',
    codigoCie: 'A123',
    fechaInicioSintomas: '2021-03-15',
    fechaDiagnostico: '2021-03-15'
  },
  {
    diagnostico: 'Enfermedad laboral',
    codigoCie: 'A123',
    fechaInicioSintomas: '2021-03-15',
    fechaDiagnostico: '2021-03-15'
  }
];

export function TableDiagnosis() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Diagnóstico</StyledTableCell>
            <StyledTableCell>Código CIE</StyledTableCell>
            <StyledTableCell>Fecha de inicio de síntomas</StyledTableCell>
            <StyledTableCell>Fecha del diagnóstico</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsDiagnosis.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{row.diagnostico}</StyledTableCell>
              <StyledTableCell>{row.codigoCie}</StyledTableCell>
              <StyledTableCell>{row.fechaInicioSintomas}</StyledTableCell>
              <StyledTableCell>{row.fechaDiagnostico}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const FIRST_COLUMN_LABELS = [
  'Primera oportunidad',
  'Segunda oportunidad',
  'Primera instancia',
  'Segunda instancia',
];

const inputSx = {
  fontSize: '14px',
  '& .MuiInputBase-input': {
    padding: '4px 0',
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid rgba(0,0,0,0.12)',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: '1px solid rgba(0,0,0,0.87)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '2px solid primary.main',
  },
};

export function TableDiagnosisRating() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="editable diagnosis table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Calificación</StyledTableCell>
            <StyledTableCell>Entidad</StyledTableCell>
            <StyledTableCell>Fecha de calificación</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Dictamen #</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {FIRST_COLUMN_LABELS[index]}
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`diagnosisRows.${index}.entidad`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      InputProps={{ disableUnderline: false }}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`diagnosisRows.${index}.fechaCalificacion`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      variant="standard"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ disableUnderline: false }}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`diagnosisRows.${index}.origen`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      InputProps={{ disableUnderline: false }}
                      sx={inputSx}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`diagnosisRows.${index}.dictamen`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      InputProps={{ disableUnderline: false }}
                      sx={inputSx}
                    />
                  )}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}