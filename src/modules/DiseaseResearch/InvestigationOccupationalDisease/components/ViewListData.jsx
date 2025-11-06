import {
  Business as BusinessIcon,
  LocalHospital as LocalHospitalIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { OptionsMenuList } from './OptionsMenu';
import { getStatusConfig } from './methods';

const variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  }),
};

const ViewListData = ({ dataInfo = {}, index }) => {
  const { percent, color, label } = getStatusConfig(dataInfo.estadoInvestigacion);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={index}
      variants={variants}
    >
      <ListItem
        sx={{
          borderRadius: '16px',
          border: '1px solid #f0f0f0',
          mb: 2,
          backgroundColor: '#fff',
          boxShadow: '0 3px 10px rgba(0,0,0,0.03)',
          '&:hover': {
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            transform: 'translateX(6px)',
            transition: 'all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          },
        }}
        secondaryAction={<OptionsMenuList idAsignacion={dataInfo.id} />}
      >
        <ListItemAvatar>
          <Avatar
            src={dataInfo.foto}
            alt="Foto del empleado"
            sx={{
              width: 120,
              height: 120,
              mr: 2,
              borderRadius: '12px',
              border: '2px solid #f8f8f8',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            {dataInfo.nombreEmpleado.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight="bold" fontSize="1.15rem" color="#1a1a1a">
              {dataInfo.nombreEmpleado}
            </Typography>
          }
          secondary={
            <Box sx={{ mt: 1.2, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                <strong>C.C.</strong> {dataInfo.documento} • <strong>Edad:</strong> {dataInfo.edad} años • <strong>Sexo:</strong> {dataInfo.nombreSexo}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', fontSize: '0.92rem', color: '#555' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <WorkIcon sx={{ fontSize: '16px', color: '#388e3c' }} /> <strong>Roster position:</strong> {dataInfo.nombreRoster}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <LocalHospitalIcon sx={{ fontSize: '16px', color: '#1976d2' }} /> <strong>EPS:</strong> {dataInfo.nombreEPS}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <BusinessIcon sx={{ fontSize: '16px', color: '#7b1fa2' }} /> <strong>Sede:</strong> {dataInfo.nombreSede}
                </Box>
              </Box>

              {/* Barra de progreso de estado */}
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" fontWeight="medium" color="text.secondary">
                    Estado de investigación
                  </Typography>
                  <Chip
                    label={label}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.78rem',
                      height: 24,
                      backgroundColor: color + '20',
                      color: color,
                      borderRadius: '12px',
                    }}
                  />
                </Box>

                <Box sx={{ height: 8, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${percent}%`,
                      backgroundColor: color,
                      transition: 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          }
        />
      </ListItem>
    </motion.div>
  );
};

export default ViewListData;