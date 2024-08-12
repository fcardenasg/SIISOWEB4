import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'components/image';
import TextMaxLine from 'components/text-max-line';
import Chip from 'ui-component/extended/Chip';
import { Grid, IconButton, Tooltip } from '@mui/material';
import NoPhone from 'assets/img/nophoto.svg';
import Iconify from 'components/iconify/iconify';
import { useNavigate } from 'react-router-dom';

export default function HelpCard({ lsData }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card sx={{ textAlign: 'center', background: theme.palette.grey[100], }}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ top: 12, right: 12, zIndex: 9, position: 'absolute' }}>
          <Chip
            size="small"
            label={lsData.nameEstado}
            chipcolor={lsData.idEstado == 11133 ? "error" : lsData.idEstado == 11134 ? "warning" : "success"}
            sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
          />
        </Box>

        <Box sx={{ bottom: 6, right: 12, zIndex: 20, position: 'absolute' }}>
          <Typography variant="h6" align="left" sx={{ color: 'white' }}>Usuario: {lsData?.usuarioRegistro}</Typography>
          <Typography variant="h6" align="left" sx={{ color: 'white' }}>{new Date(lsData?.fechaRegistro).toLocaleString()}</Typography>
        </Box>

        <Image
          src={lsData?.imgCaso || NoPhone}
          alt={lsData?.nameTipoCaso}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ my: 2 }}
        primary={`Tipo de caso: ${lsData?.nameTipoCaso}`}
        secondary={
          <Grid container>
            <Grid item xs={12}>Tipo de incidente: {lsData?.nameTipoIncidente}</Grid>
            <Grid item xs={12}>Sede: {lsData?.nameSede} - Prioridad: {lsData?.namePrioridad}</Grid>
          </Grid>
        }
        primaryTypographyProps={{ typography: 'h5', mx: 2 }}
        secondaryTypographyProps={{ typography: 'body1', mt: 0.5, mx: 2 }}
      />

      <Divider sx={{ borderStyle: 'dashed', borderColor: theme.palette.grey[400] }} />

      <Box sx={{ my: 1, mx: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" align="left">Descripción del caso</Typography>
          </Grid>

          <Grid item>
            <Tooltip title="Ver más...">
              <IconButton onClick={() => navigate(`/help/support-management/view/${lsData?.id}`)}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <TextMaxLine line={3} variant="caption" align="left" sx={{ textAlign: 'justify', color: 'text.secondary' }}>{lsData?.descripcionCaso}</TextMaxLine>
      </Box>
    </Card>
  );
}