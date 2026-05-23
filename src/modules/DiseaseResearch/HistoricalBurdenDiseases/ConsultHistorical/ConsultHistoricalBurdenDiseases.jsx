import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Avatar,
  Divider,
  Grid,
  TextField,
  InputAdornment,
  Drawer,
  IconButton,
  Button,
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { GetAllGroupedByEmpleado } from '../../../../api/clients/HistoricalBurdenDiseases';
import { TitleButton } from '../../../../components/helpers/Enums';
import toast from 'react-hot-toast';
import { useBoolean } from 'hooks/use-boolean';
import InvestigacionIaModal from './Components/InvestigacionIaModal';

// --- Styled Components ---

const GlassCard = styled(Paper)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.92) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 20,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0,0,0,0.3)'
      : '0 8px 32px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
  overflow: 'hidden',
  position: 'relative',
}));

const GlowingOrb = styled(Box)(() => ({
  position: 'absolute',
  width: 300,
  height: 300,
  filter: 'blur(80px)',
  borderRadius: '50%',
  zIndex: 0,
  pointerEvents: 'none',
}));

const FolderCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '0 16px 16px 16px',
  padding: theme.spacing(2),
  cursor: 'pointer',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  borderTop: 'none',
  marginTop: '20px', 
  height: '100%',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '-1px', // align with border
    width: '50%',
    height: '20px',
    background: theme.palette.mode === 'dark' ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,0.95)',
    borderRadius: '16px 16px 0 0',  
    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    borderBottom: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // '&::after': {
  //   content: '""',
  //   position: 'absolute',
  //   top: '0',
  //   left: '50%', // start where tab ends
  //   right: '-1px',
  //   height: '1px',
  //   background: alpha(theme.palette.divider, 0.08),
  //   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  // },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 48px rgba(227,25,55,0.15)',
    borderColor: 'rgba(227,25,55,0.4)',
    
  
    '&::before': {
      borderColor: 'rgba(227,25,55,0.4)',
    },
    '&::after': {
      background: 'rgba(227,25,55,0.4)',
    }
  },
}));

const RecordCard = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.6),
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  borderRadius: 12,
  padding: theme.spacing(2),
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  marginBottom: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
}));

// --- Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 14,
  padding: '10px 28px',
  fontWeight: 600,
  fontSize: '0.875rem',
  textTransform: 'none',
  letterSpacing: '0.01em',
  transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(227,25,55,0.25)',
    transform: 'translateY(-1px)',
  },
}));

export default function ConsultHistoricalBurdenDiseases() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [informe,setInforme] = useState(null);

  const confirm = useBoolean();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetAllGroupedByEmpleado();
        let responseData = response?.datos || response?.data?.datos || response?.data || response?.result || response;
       
        console.log("responseData", responseData);
       
        if (Array.isArray(responseData)) {
          const normalized = responseData.map(emp => ({
            identificacion: emp.identificacion || emp.Identificacion,
            nombres: emp.nombres || emp.Nombres,
            investigaciones: emp.investigaciones || emp.Investigaciones || []
          }));
          setEmployees(normalized);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
        toast.error("Error al cargar los registros. " + (error?.message || ""));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    const lowerSearch = searchTerm.toLowerCase();
    return employees.filter(emp => 
      (emp.nombres && emp.nombres.toLowerCase().includes(lowerSearch)) ||
      (emp.identificacion && String(emp.identificacion).includes(lowerSearch))
    );
  }, [employees, searchTerm]);

  const handleOpenFolder = (employee) => {
    setSelectedEmployee(employee);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedEmployee(null), 300);
  };


  const handleOpenInvest = (record) => {
    console.log("record", record);
    setInforme(record)
  
  }

  const handleExport = () => {
    console.log("exportando");
    confirm.onFalse()
  }

  return (
    <>

    <InvestigacionIaModal
     confirm={confirm}     
      name={informe?.nombres}
      informe={informe}
      setInforme={setInforme}      
      handleExport={handleExport}
      navigate={navigate}
      theme={theme}
    />
    
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        p: { xs: 2, md: 3 },
        overflow: 'hidden',
        borderRadius: theme?.customization?.borderRadius ? `${theme.customization.borderRadius}px` : '12px',
        height: 'calc(100vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <GlowingOrb sx={{ top: '-10%', left: '-5%', background: 'rgba(227, 25, 55, 0.15)' }} />
      <GlowingOrb sx={{ bottom: '-10%', right: '-5%', background: 'rgba(184, 19, 43, 0.12)' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
          <Box>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  background: 'linear-gradient(135deg, #B8132B 0%, #E31937 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Historico Investigaciones
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600 }}>
                Explora el historico de investigaciones laborales. Utiliza el buscador para localizar a un empleado rápidamente.
              </Typography>
            </motion.div>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div variants={itemVariants}>
              <ActionButton
                variant="outlined"
                onClick={() => navigate("/disease-research/view")}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderColor: '#E31937',
                  color: '#E31937',
                  '&:hover': {
                    borderColor: alpha(theme.palette.text.primary, 0.3),
                    bgcolor: '#E31937',
                    color: 'white',
                    boxShadow: 'none',
                    transform: 'none',
                  },
                }}
              >
                {TitleButton.Cancelar}
              </ActionButton>
            </motion.div>

            <motion.div variants={itemVariants} style={{ width: '100%', maxWidth: '350px' }}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre o identificación..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  '& fieldset': {
                    borderColor: alpha(theme.palette.divider, 0.1),
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(227, 25, 55, 0.4) !important',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#E31937 !important',
                  }
                }
              }}
            />
            </motion.div>
          </Box>
        </Box>

        {/* Content Section */}
        <motion.div
          variants={itemVariants}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              minHeight: 0,
              pr: 1,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: alpha(theme.palette.divider, 0.15),
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: alpha(theme.palette.primary.main, 0.3),
              },
            }}
          >
            {loading ? (
              <GlassCard sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 2 }}>
                <CircularProgress sx={{ color: '#E31937' }} />
                <Typography variant="body2" color="text.secondary">
                  Cargando expedientes...
                </Typography>
              </GlassCard>
            ) : filteredEmployees?.length === 0 ? (
              <GlassCard sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 2 }}>
                <FolderIcon sx={{ fontSize: 64, color: alpha(theme.palette.text.secondary, 0.3) }} />
                <Typography variant="h6" color="text.secondary">
                  No se encontraron expedientes
                </Typography>
                {searchTerm && (
                  <Typography variant="body2" color="text.secondary">
                    Intenta con otros términos de búsqueda.
                  </Typography>
                )}
              </GlassCard>
            ) : (
              <Grid container columnSpacing={3} rowSpacing={5} sx={{ pt: 2 }}>
                <AnimatePresence>
                  {filteredEmployees.map((employee, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={employee.identificacion || index}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        style={{ height: '100%' }}
                      >
                        <FolderCard onClick={() => handleOpenFolder(employee)}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: 'rgba(227, 25, 55, 0.1)',
                                color: '#E31937',
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                              }}
                            >
                              <FolderSharedIcon />
                            </Avatar>
                            <Chip
                              label={`${employee.investigaciones?.length || 0}`}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                bgcolor: 'rgba(227, 25, 55, 0.08)',
                                color: '#E31937',
                                borderRadius: '8px',
                              }}
                            />
                          </Box>
                          
                          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2,  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {employee.nombres}
                          </Typography>
                          
                          <Box sx={{ mt: 'auto'}}>
                            <Divider sx={{ mb: 1.5, opacity: 0.5 }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                              <AssignmentTurnedInIcon sx={{ fontSize: 16 }} /> CC: {employee.identificacion}
                            </Typography>
                            {employee.investigaciones?.[0] && (
                              <>
                                
                                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  <WorkOutlineIcon sx={{ fontSize: 16 }} />  {employee.investigaciones[0].profesion || employee.investigaciones[0].Profesion || 'N/A'}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </FolderCard>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            )}
          </Box>
        </motion.div>
      </motion.div>

      {/* Drawer for Employee Details */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 450, md: 500 },
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 100%)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: '-8px 0 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        {selectedEmployee && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Drawer Header */}
            <Box sx={{ p: 3, background: 'linear-gradient(135deg, #E31937 0%, #B8132B 100%)', color: 'white' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <FolderSharedIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, color: 'white' }}>
                      Historico de Investigaciones
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, color: '#f5f5f5' }}>
                      {selectedEmployee.investigaciones?.length || 0} registros encontrados
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseDrawer} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Employee Info Bar */}
            <Box sx={{ p: 2, px: 3, bgcolor: alpha(theme.palette.background.default, 0.5), borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {selectedEmployee.nombres}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AssignmentTurnedInIcon sx={{ fontSize: 14 }} /> CC: {selectedEmployee.identificacion}
              </Typography>
            </Box>

            {/* Drawer Content (Records) */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
              {selectedEmployee.investigaciones?.length > 0 ? (
                selectedEmployee.investigaciones.map((record, idx) => (
                  <motion.div
                    key={record.id || record.Id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <RecordCard onClick={() => handleOpenInvest(record)}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'linear-gradient(135deg, #B8132B, #E31937)',
                              color: '#fff',
                            }}
                          >
                            <DescriptionOutlinedIcon fontSize="small" />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                              Reporte de Investigación
                            </Typography>
                            {/* <Typography variant="caption" color="text.secondary">
                              {record.fechaRegistro ? new Date(record.fechaRegistro || record.FechaRegistro).toLocaleDateString() : 'Nuevo'}
                            </Typography> */}
                          </Box>
                        </Box>
                        {/* <Chip
                          label={record.estado || record.Estado || 'Activo'}
                          size="small"
                          color={getStatusColor(record.estado || record.Estado)}
                          variant="outlined"
                          sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }}
                        /> */}
                      </Box>

                      <Divider sx={{ my: 1.5, opacity: 0.6 }} />

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 28, height: 28, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                            <CalendarMonthIcon sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">Fecha de Investigación</Typography>
                            <Typography variant="body2" fontWeight="500">
                              {record.fechaInvestigacion || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 28, height: 28, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                            <WorkOutlineIcon sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">Profesión</Typography>
                            <Typography variant="body2" fontWeight="500" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                              {record.profesion || record.Profesion || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </RecordCard>
                  </motion.div>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 5, opacity: 0.5 }}>
                  <DescriptionOutlinedIcon sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="body1">No hay registros detallados</Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
    </>
  );
}