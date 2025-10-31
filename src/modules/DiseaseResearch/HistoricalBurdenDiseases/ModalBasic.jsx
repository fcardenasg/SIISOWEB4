import { Box, Modal, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/img/lottieAnimation/loading.json';
import { m } from 'framer-motion';

export default function ModalBasic({
  confirmModal,
  animation = loadingAnimation,
  message = 'Guardando información...',
  message2 = 'Por favor espere...',
}) {
  return (
    <Modal
      keepMounted
      open={confirmModal.value}
      // onClose={confirmModalSave.onFalse}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      width="xl"
      sx={{ zIndex: 9999 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Lottie style={{ width: 300, height: 300 }} loop={true} animationData={animation} />

       
          <m.div
            style={{
              backgroundImage: 'linear-gradient(90deg, #9ca3af 0%, #ffffff 50%, #9ca3af 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '3rem',
              fontWeight: 600,
            }}
            animate={{
              backgroundPosition: ['0% center', '200% center'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Typography variant="h6">{message}</Typography>
          </m.div>
    

        {message2 && (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            {message2}
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
