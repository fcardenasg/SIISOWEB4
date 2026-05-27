import { Box, Modal, Typography, Paper, Backdrop } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/img/loading.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const extractionMessages = [
  "Extrayendo datos de la empresa y personales...",
  "Analizando la historia laboral en DLTD y otras empresas...",
  "Procesando datos del diagnóstico y calificación...",
  "Evaluando los datos de exposición e ingeniería en la empresa...",
  "Sintetizando datos clínicos, paraclínicos y antecedentes...",
  "Verificando historial de ausentismo e información médica...",
  "Ejecutando el análisis de causas y relación de causalidad...",
  "Estructurando acciones preventivas y correctivas finales..."
];

const GlassModalCard = styled(Paper)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.92) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 24,
  border: `1px solid ${alpha('#E31937', 0.2)}`,
  boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(227,25,55,0.1)',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  maxWidth: 400,
  width: 400,
  margin: '0 16px',
}));

const GlowingOrb = styled(Box)(() => ({
  position: 'absolute',
  width: 220,
  height: 220,
  filter: 'blur(60px)',
  borderRadius: '50%',
  zIndex: 0,
  pointerEvents: 'none',
}));

export default function ModalBasic({
  confirmModal,
  animation = loadingAnimation,
  message = 'Guardando información...',
  message2 = 'Por favor espere...',
}) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (confirmModal.value) {
      setMsgIndex(0);
      interval = setInterval(() => {
        setMsgIndex((prev) => (prev + 1) % extractionMessages.length);
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [confirmModal.value]);

  const isExtraction = message.toLowerCase().includes("extracción");
  const currentMessage = isExtraction ? extractionMessages[msgIndex] : message;

  return (
    <Modal
      keepMounted
      open={confirmModal.value}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 400,
          sx: { backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.45)' },
        },
      }}
      sx={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ outline: 'none' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <GlassModalCard elevation={0}>
            <GlowingOrb sx={{ top: '-15%', right: '-15%', background: 'rgba(227, 25, 55, 0.12)' }} />
            <GlowingOrb sx={{ bottom: '-15%', left: '-15%', background: 'rgba(184, 19, 43, 0.1)' }} />

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Lottie style={{ width: 180, height: 180, marginBottom: 16 }} loop={true} animationData={animation} />

              <Box sx={{ position: 'relative', minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', px: 2 }}>
                <AnimatePresence>
                  <motion.div
                    key={currentMessage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ position: 'absolute', width: '100%', left: 0, textAlign: 'center', justifyContent: 'center' }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        textAlign: 'center',
                        fontSize: '1.05rem',
                        color: '#E31937',
                        lineHeight: 1.2,
                        pb: 4
                      }}
                    >
                      {currentMessage}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>

              {/* TEXTO SECUNDARIO NORMAL */}
              {message2 && (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, textAlign: 'center' }}>
                  {message2}
                </Typography>
              )}
            </Box>
          </GlassModalCard>
        </motion.div>
      </Box>
    </Modal>
  );
}
