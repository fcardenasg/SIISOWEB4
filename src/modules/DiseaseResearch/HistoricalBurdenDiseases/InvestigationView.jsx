import React from "react";
import { Container, Typography, Paper, Box, List, ListItem, ListItemText } from "@mui/material";

const InvestigationView = ({ data }) => {
  if (!data) return <Typography>No hay datos disponibles</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Informe Médico-Laboral
      </Typography>

      {/* Datos de la Empresa */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Datos de la Empresa</Typography>
        {data.FechaInvestigacion && <Typography><strong>Fecha de Investigación:</strong> {data.FechaInvestigacion}</Typography>}
        {data.RazonSocial && <Typography><strong>Razón Social:</strong> {data.RazonSocial}</Typography>}
        {data.Nit && <Typography><strong>NIT:</strong> {data.Nit}</Typography>}
        {data.ActividadEconomica && <Typography><strong>Actividad Económica:</strong> {data.ActividadEconomica}</Typography>}
        {data.Sede && <Typography><strong>Sede:</strong> {data.Sede}</Typography>}
        {data.Departamento && <Typography><strong>Departamento:</strong> {data.Departamento}</Typography>}
        {data.Area && <Typography><strong>Área:</strong> {data.Area}</Typography>}
      </Paper>

      {/* Datos Personales */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Datos Personales</Typography>
        <Typography><strong>Nombre Completo:</strong> {`${data.PrimerNombre || ''} ${data.SegundoNombre || ''} ${data.PrimerApellido || ''} ${data.SegundoApellido || ''}`}</Typography>
        {data.Identificacion && <Typography><strong>Identificación:</strong> {data.Identificacion}</Typography>}
        {data.Sexo && <Typography><strong>Sexo:</strong> {data.Sexo}</Typography>}
        {data.EstadoCivil && <Typography><strong>Estado Civil:</strong> {data.EstadoCivil}</Typography>}
        {data.FechaNacimiento && <Typography><strong>Fecha de Nacimiento:</strong> {data.FechaNacimiento}</Typography>}
        {data.LugarNacimiento && <Typography><strong>Lugar de Nacimiento:</strong> {data.LugarNacimiento}</Typography>}
        {data.DepartamentoNacimiento && <Typography><strong>Departamento de Nacimiento:</strong> {data.DepartamentoNacimiento}</Typography>}
        {data.Escolaridad && <Typography><strong>Escolaridad:</strong> {data.Escolaridad}</Typography>}
        {data.Profesion && <Typography><strong>Profesión:</strong> {data.Profesion}</Typography>}
        {data.Residencia && <Typography><strong>Residencia:</strong> {data.Residencia}</Typography>}
        {data.DepartamentoResidencia && <Typography><strong>Departamento de Residencia:</strong> {data.DepartamentoResidencia}</Typography>}
      </Paper>

      {/* Seguridad Social */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Seguridad Social</Typography>
        {data.EPS && <Typography><strong>EPS:</strong> {data.EPS}</Typography>}
        {data.AFP && <Typography><strong>AFP:</strong> {data.AFP}</Typography>}
        {data.ARL && <Typography><strong>ARL:</strong> {data.ARL}</Typography>}
      </Paper>

      {/* Diagnósticos */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Diagnósticos</Typography>
        {Array.isArray(data.Diagnosticos) && data.Diagnosticos.length > 0 ? (
          <List>
            {data.Diagnosticos.map((d, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemText
                  primary={<strong>{d.Descripcion}</strong>}
                  secondary={`CIE10: ${d.Codigocie10} | Fecha: ${d.FechaDiagnostico}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">No hay diagnósticos registrados.</Typography>
        )}
      </Paper>

      {/* Calificaciones */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Calificaciones</Typography>
        {Array.isArray(data.Calificaciones) && data.Calificaciones.length > 0 ? (
          <List>
            {data.Calificaciones.map((c, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemText
                  primary={`${c.Tipo} - ${c.Entidad}`}
                  secondary={`Fecha: ${c.Fecha} | Origen: ${c.Origen} | Dictamen Número: ${c.DictamenNumero}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">No hay calificaciones registradas.</Typography>
        )}
      </Paper>

      {/* Experiencia Laboral */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Experiencia Laboral</Typography>
        {data.FechaIngreso && <Typography><strong>Fecha de Ingreso:</strong> {data.FechaIngreso}</Typography>}
        {data.CargoInicial && <Typography><strong>Cargo Inicial:</strong> {data.CargoInicial}</Typography>}
        {data.TurnoJornada && <Typography><strong>Turno/Jornada:</strong> {data.TurnoJornada}</Typography>}
        {data.TiempoCargo && <Typography><strong>Tiempo en el Cargo:</strong> {data.TiempoCargo}</Typography>}
        {data.EdadIngreso && <Typography><strong>Edad de Ingreso:</strong> {data.EdadIngreso}</Typography>}

        <Typography variant="h6" gutterBottom>Otros Cargos</Typography>
        {Array.isArray(data.OtrosCargos) && data.OtrosCargos.length > 0 ? (
          <List>
            {data.OtrosCargos.map((cargo, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Cargo: ${cargo.Cargo}`}
                  secondary={`Fecha Inicio: ${cargo.FechaInicio} | Turno: ${cargo.TurnoJornada} | Tiempo: ${cargo.TiempoCargo}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">No hay otros cargos registrados.</Typography>
        )}

        <Typography variant="h6" gutterBottom>Experiencias Anteriores</Typography>
        {Array.isArray(data.ExperienciaAnteriores) && data.ExperienciaAnteriores.length > 0 ? (
          <List>
            {data.ExperienciaAnteriores.map((exp, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Empresa: ${exp.Empresa} - Cargo: ${exp.CargoOficio}`}
                  secondary={`Actividad: ${exp.ActividadEconomica} | Tiempo: ${exp.TiempoCargo}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">No hay experiencias anteriores registradas.</Typography>
        )}
      </Paper>

      {/* Exposiciones */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Exposiciones</Typography>
        {Array.isArray(data.exposiciones) && data.exposiciones.length > 0 ? (
          data.exposiciones.map((exp, i) => (
            <Box key={i} mb={2}>
              <Typography variant="h6">{exp.cargo}</Typography>
              {exp.resultado_analisis_puesto && <Typography><strong>Resultado Análisis del Puesto:</strong> {exp.resultado_analisis_puesto}</Typography>}
              {exp.circunstancias_exposicion && <Typography><strong>Circunstancias de Exposición:</strong> {exp.circunstancias_exposicion}</Typography>}
              {exp.tiempo_acumulado_exposicion && <Typography><strong>Tiempo Acumulado de Exposición:</strong> {exp.tiempo_acumulado_exposicion}</Typography>}
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay exposiciones registradas.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default InvestigationView;
