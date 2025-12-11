import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const SectionTitle = ({ children }) => (
  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
    {children}
  </Typography>
);

const Field = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2">{value ?? '-'}</Typography>
  </Box>
);

export default function InvestigationView({ data }) {
  console.log("data recibe",data);
  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          INVESTIGACIÓN DE ENFERMEDAD LABORAL
        </Typography>
      </Box>

      {/* 1. Datos de la empresa */}
      <Box mb={3}>
        <SectionTitle>1. DATOS DE LA EMPRESA</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="Fecha de la investigación" value={data?.FechaInvestigacion} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="Razón social" value={data?.RazonSocial} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="NIT" value={data?.Nit} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Actividad económica" value={data?.ActividadEconomica} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="Sede de trabajo" value={data?.Sede} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Field
              label="Departamento"
              value={`${data?.Departamento || ''}`}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* 2. Datos personales */}
      <Box my={3}>
        <SectionTitle>2. DATOS PERSONALES</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Primer apellido" value={data?.PrimerApellido} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Segundo apellido" value={data?.SegundoApellido} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Primer nombre" value={data?.PrimerNombre} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Segundo nombre" value={data?.SegundoNombre} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Field label="Identificación" value={data?.Identificacion} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Sexo" value={data?.Sexo} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Estado civil" value={data?.EstadoCivil} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Fecha de nacimiento" value={data?.FechaNacimiento} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Field label="Lugar de nacimiento" value={data.LugarNacimiento} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field label="Departamento (nacimiento)" value={data?.DepartamentoNacimiento} />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Field label="Escolaridad" value={data?.Escolaridad} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field label="Profesión / oficio" value={data?.Profesion} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field
              label="Residencia"
              value={`${data.Residencia || ''} ${
                data?.DepartamentoResidencia ? `/ ${data.DepartamentoResidencia}` : ''
              }`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Field label="EPS" value={data.EPS} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field label="AFP" value={data.AFP} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field label="ARL" value={data.ARL} />
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* 3. Datos del diagnóstico */}
      <Box my={3}>
        <SectionTitle>3. DATOS DEL DIAGNÓSTICO</SectionTitle>

        {data.diagnosticos && data.diagnosticos.length > 0 && (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Código CIE10</TableCell>
                  <TableCell>Descripción</TableCell>
                  {/* <TableCell>Fecha de inicio de síntomas</TableCell> */}
                  <TableCell>Fecha del diagnostico</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.diagnosticos.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell>{d?.Codigocie10}</TableCell>
                    <TableCell>{d?.Descripcion}</TableCell>
                    {/* <TableCell>{d?.fecha_inicio_sintomas}</TableCell> */}
                    <TableCell>{d?.FechaDiagnostico}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Field label="Genero incapacidad" value={data.GeneroIncapacidad} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field label="Días de incapacidad" value={data.DiasIncapacidad} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field label="Observaciones" value={data.ObservacionesIncapacidad} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Field label="FUREL #" value={data.FurelNumero} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field label="Fecha FUREL" value={data.FechaFurel} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field label="Fecha estructuración origen" value={data.FechaEstructuracionOrigen} />
            </Grid>
          </Grid>
        </Box>

        {/* Calificaciones */}
        {data?.Calificaciones && data.Calificaciones.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Calificaciones
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Entidad</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Origen</TableCell>
                    <TableCell>Dictamen #</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.Calificaciones?.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell>{c.Tipo}</TableCell>
                      <TableCell>{c.Entidad}</TableCell>
                      <TableCell>{c.Fecha}</TableCell>
                      <TableCell>{c.Origen}</TableCell>
                      <TableCell>{c.DictamenNumero || ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      <Divider />

      {/* 5. Datos laborales */}
      <Box my={3}>
        <SectionTitle>4. DATOS LABORALES DE INTERÉS EN DLTD</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Field label="Fecha de ingreso" value={data.FechaIngreso} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field label="Cargo inicial" value={data.CargoInicial} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field label="Turno / jornada" value={data.TurnoJornada} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Field label="Tiempo en el cargo" value={data.TiempoCargo} />
          </Grid>
          {data?.EdadIngreso&&(

          <Grid item xs={12} sm={4}>
            <Field label="Edad al momento del ingreso" value={data?.EdadIngreso} />
          </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1 }}>
              Otros cargos
            </Typography>

            {data.OtrosCargos && data.OtrosCargos.length > 0 ? (
              <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha inicio</TableCell>
                      <TableCell>Cargo</TableCell>
                      <TableCell>Turno / jornada</TableCell>
                      <TableCell>Tiempo en el cargo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.OtrosCargos.map((oc, i) => (
                      <TableRow key={i}>
                        <TableCell>{oc.FechaInicio}</TableCell>
                        <TableCell>{oc.argo}</TableCell>
                        <TableCell>{oc.TurnoJornada}</TableCell>
                        <TableCell>{oc.TiempoCargo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay otros cargos registrados.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* <Divider /> */}

      <Box my={3}>
        {/* Usamos un título más general ya que no son los datos laborales básicos de la persona */}
        {/* <SectionTitle>4. EXPOSICIONES LABORALES DE INTERÉS</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {data?.exposiciones && data?.exposiciones.length > 0 ? (
              <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Cargo</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '45%' }}>
                        Resultado del Análisis del Puesto
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>
                        Circunstancias de Exposición
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>
                        Tiempo Acumulado
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.exposiciones.map((exposicion, i) => (
                      <TableRow key={i} hover>
                        <TableCell sx={{ verticalAlign: 'top' }}>{exposicion.cargo}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', verticalAlign: 'top' }}>
                          {exposicion.resultado_analisis_puesto}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', verticalAlign: 'top' }}>
                          {exposicion.circunstancias_exposicion}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          {exposicion.tiempo_acumulado_exposicion || 'No especificado'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay exposiciones laborales registradas.
              </Typography>
            )}
          </Grid>
        </Grid> */}
      </Box>

      {/* Otros campos libres */}
      {/* <Box my={3}>
        <SectionTitle>Observaciones y análisis</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <Field label="Resultado análisis de puesto" value={data.resultado_analisis_puesto} />
          </Grid>
        
          <Grid item xs={12} sm={5}>
            <Field label="Circunstancias de exposición" value={data.circunstancias_exposicion} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Field
              label="Tiempo acumulado de exposición"
              value={data.tiempo_acumulado_exposicion}
            />
          </Grid>
        </Grid>
      </Box> */}
    </Paper>
  );
}
