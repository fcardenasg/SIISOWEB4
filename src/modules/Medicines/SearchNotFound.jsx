import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function SearchNotFound({ query, sx, ...other }) {
  return query ? (
    <Paper
      sx={{
        bgcolor: 'unset',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h3" gutterBottom>
        Producto no encontrado
      </Typography>

      <Typography variant="body2">
        No se han encontrado resultados para &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> Intente comprobar si hay errores tipográficos o utilizar palabras completas.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      Introduzca las palabras clave
    </Typography>
  );
}