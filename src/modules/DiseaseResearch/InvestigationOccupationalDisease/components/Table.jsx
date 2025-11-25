import { Checkbox, Divider, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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

const controles = [
  {
    control: "Ayudas mecánicas",
    tipoControl: "Ingeniería",
    observacionesUso: "El área cuenta con ayudas mecánicas para la manipulación y traslado de peso (escaleras de tres pasos, diferenciales y camión grúa).",
    observacionesProteccion: "Estas contribuyen a la disminución de esfuerzo físico, durante la manipulación de pesos superiores a 10.6 kg."
  },
  {
    control: "Prácticas de trabajo",
    tipoControl: "Administrativo",
    observacionesUso: "Procedimientos de trabajo seguro. Rotación de actividades las cuales se realizan en grupos de dos personas, disminuyendo el tiempo de exposición a diferentes posturas y/o riesgos inherentes al cargo.",
    observacionesProteccion: "Se establecen formas seguras para realizar las labores."
  },
  {
    control: "Prácticas de trabajo",
    tipoControl: "Administrativo",
    observacionesUso: "Rotación del personal durante el uso de herramientas neumáticas y eléctricas.",
    observacionesProteccion: "Disminución del tiempo de exposición, se utiliza el 4% de forma individual, durante la jornada laboral."
  },
  {
    control: "Pausas activas y descanso autoadministrado",
    tipoControl: "Administrativo",
    observacionesUso: "Durante la realización de las actividades el trabajador tiene la facultad de auto administrar las tareas, realizar sus pausas activas, hidratarse y tomar periodos de reposición cuando lo requiera.",
    observacionesProteccion: "En general las pausas suman 150 minutos al día, pero además hay tiempos de espera durante la operación. Disminuye la fatiga y el estrés durante la jornada laboral, previniendo lesiones osteomusculares en el trabajador."
  },
  {
    control: "Entrenamiento regular sobre prevención de desórdenes osteomusculares",
    tipoControl: "Administrativo",
    observacionesUso: "Los ciclos de entrenamiento se dictan de manera regular y son de carácter obligatorio.",
    observacionesProteccion: "De acuerdo con lo definido por el departamento de Salud Ocupacional de la empresa DLTD."
  }
];

export function TableControlMethods() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Control</StyledTableCell>
            <StyledTableCell>Tipo de control</StyledTableCell>
            <StyledTableCell>Observaciones sobre uso brindado</StyledTableCell>
            <StyledTableCell>Observaciones sobre nivel de protección</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {controles.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{row.control}</StyledTableCell>
              <StyledTableCell>{row.tipoControl}</StyledTableCell>
              <StyledTableCell>{row.observacionesUso}</StyledTableCell>
              <StyledTableCell>{row.observacionesProteccion}</StyledTableCell>
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
};


const EstiloTitulo = {
  fontWeight: 700,
  fontSize: "0.95rem",
  color: "#333",
};

const CeldaSeccion = ({ title }) => (
  <TableCell
    sx={{
      background: "#f7f7f7",
      width: "90px",
      borderRight: "1px solid #e0e0e0",
    }}
  >
    <Typography sx={EstiloTitulo}>{title}</Typography>
  </TableCell>
);

export function TableHealth() {
  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <CeldaSeccion title="Cigarrillo" />
            <TableCell colSpan={4}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={6} lg={4.2}>
                  <Stack direction="row" spacing={.5} alignItems="center">
                    <Typography>Fuma:</Typography>
                    <FormControlLabel control={<Checkbox size="small" />} label="Si" />
                    <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="No" />
                    <FormControlLabel control={<Checkbox size="small" />} label="Exfumador" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Tiempo acumulado (años)" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Años de tabaquismo" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Cantidad (cigarrillos por día)" fullWidth size="small" />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>

          <Divider />

          <TableRow>
            <CeldaSeccion title="Alcohol" />
            <TableCell colSpan={4}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} lg={4.2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>Consumo:</Typography>
                    <FormControlLabel control={<Checkbox size="small" />} label="Si" />
                    <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="No" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Frecuencia" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Cantidad" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Tipo de bebida" fullWidth size="small" />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>

          <TableRow>
            <CeldaSeccion title="Deporte" />
            <TableCell colSpan={4}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} lg={4.2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>Práctica:</Typography>
                    <FormControlLabel control={<Checkbox size="small" />} label="Si" />
                    <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="No" />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Frecuencia" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Tiempo" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} md={6} lg={2.6}>
                  <TextField variant="standard" label="Tipo de actividad" fullWidth size="small" />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>

          <TableRow>
            <CeldaSeccion title="Otros" />
            <TableCell colSpan={4}>
              <TextField variant="standard" fullWidth label="Descripción" size="small" />
            </TableCell>
          </TableRow>

        </TableBody>
      </Table >
    </TableContainer >
  );
}

export function TableCharacterizationAbsenteeism() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Diagnósticos</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Fuente de la información</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Incapacidad (días)</StyledTableCell>
            <StyledTableCell>Observaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[].map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{row.diagnostico}</StyledTableCell>
              <StyledTableCell>{row.fecha}</StyledTableCell>
              <StyledTableCell>{row.fuenteInformacion}</StyledTableCell>
              <StyledTableCell>{row.origen}</StyledTableCell>
              <StyledTableCell>{row.incapacidad}</StyledTableCell>
              <StyledTableCell>{row.observaciones}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const columnaAspectoConsiderar = [
  "Exámenes o estudios adicionales",
  "Remisión (especificar)",
  "Necesidades de formación",
  "Revisión de EPP",
  "Normas de trabajo",
  "Evaluación o medición del riesgo",
  "Controles administrativos",
  "Controles adicionales",
  "Modificación de actividades",
  "Reubicación",
  "Otras"
]

export function TablePreventiveActions() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="editable diagnosis table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '30%' }}>Aspectos para considerar</StyledTableCell>
            <StyledTableCell sx={{ width: '10%' }}>Si / No</StyledTableCell>
            <StyledTableCell sx={{ width: '60%' }}>Observaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: columnaAspectoConsiderar.length }).map((_, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {columnaAspectoConsiderar[index]}
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`aspectosConsiderar.${index}.siNo`}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label={field.value ? 'Si' : 'No'}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`aspectosConsiderar.${index}.observaciones`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      multiline
                      minRows={1}
                      maxRows={6}
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
};