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

export default function InfoCardMui({ data }) {
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
            <Field label="Fecha de la investigación" value={data?.fechaInvestigacion} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="Razón social" value={data?.razonSocial} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="NIT" value={data?.nit} />
          </Grid>
          <Grid item xs={12}>
            <Field label="Actividad económica" value={data?.actividadEconomica} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Field label="Sede de trabajo" value={data?.sede} />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Field
              label="Departamento"
              value={`${data?.departamento || ''}`}
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
            <Field label="Primer apellido" value={data?.primerApellido} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Segundo apellido" value={data?.segundoApellido} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Primer nombre" value={data?.primerNombre} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Segundo nombre" value={data?.segundoNombre} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Field label="Identificación" value={data?.identificacion} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Sexo" value={data?.sexo} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Estado civil" value={data?.estadoCivil} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Field label="Fecha de nacimiento" value={data?.fechaNacimiento} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Field label="Lugar de nacimiento" value={data.lugarNacimiento} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field label="Departamento (nacimiento)" value={data?.departamentoNacimiento} />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Field label="Escolaridad" value={data?.escolaridad} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field label="Profesión / oficio" value={data?.profesion} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field
              label="Residencia"
              value={`${data.residencia || ''} ${data?.departamentoResidencia ? `/ ${data.departamentoResidencia}` : ''
                }`}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Field label="EPS" value={data.eps} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field label="AFP" value={data.afp} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Field label="ARL" value={data.arl} />
          </Grid>
        </Grid>
      </Box>

      <Divider />



      {/* 5. Datos laborales */}
      <Box my={3}>
        <SectionTitle>4. DATOS LABORALES DE INTERÉS EN DLTD</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Field label="Fecha de ingreso" value={data.fechaIngreso} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field label="Cargo inicial" value={data.cargoInicial} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field label="Turno / jornada" value={data.turnoJornada} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Field label="Tiempo en el cargo" value={data.tiempoCargo} />
          </Grid>
          {data?.EdadIngreso && (

            <Grid item xs={12} sm={4}>
              <Field label="Edad al momento del ingreso" value={data?.edadIngreso} />
            </Grid>
          )}

        </Grid>
      </Box>


    </Paper>
  );
}
