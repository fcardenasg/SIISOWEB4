import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Fade, keyframes, Typography } from '@mui/material';
import 'assets/scss/otherstyles.scss';
import { useEffect } from 'react';

const scanAnimation = keyframes`
  0% { top: 0%; opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const pulseGlow = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const barProgress = keyframes`
  0% { left: -40%; }
  100% { left: 110%; }
`;

const FullScreenModal = ({ onClose, children, loading }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fullscreen-overlay" onClick={onClose}>
            <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                <div className="tooltip-container">
                    <button className="close-button-bottom" onClick={onClose}>
                        ×
                    </button>
                    <span className="tooltip-text">Cerrar</span>
                </div>

                <div className="pdf-container" style={{ position: 'relative', minHeight: '400px' }}>
                    {loading ? (
                        <Fade in={loading} timeout={600}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    width: '100%',
                                    gap: 4,
                                }}
                            >
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                    <Box sx={{
                                        position: 'absolute',
                                        width: '140px',
                                        height: '140px',
                                        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
                                        animation: `${pulseGlow} 3s infinite ease-in-out`,
                                        zIndex: 0
                                    }} />

                                    <InsertDriveFileIcon sx={{ fontSize: 110, color: '#3b82f6', zIndex: 1, filter: 'drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.5))' }} />

                                    <Box sx={{
                                        position: 'absolute',
                                        width: '120px',
                                        height: '3px',
                                        background: 'linear-gradient(90deg, transparent, #60a5fa, #fff, #60a5fa, transparent)',
                                        boxShadow: '0 0 15px #3b82f6',
                                        borderRadius: '50%',
                                        zIndex: 2,
                                        animation: `${scanAnimation} 2.5s infinite ease-in-out`,
                                    }} />
                                </Box>

                                <Box sx={{ textAlign: 'center', zIndex: 1 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 800,
                                            letterSpacing: '1px',
                                            mb: 1.5,
                                            textShadow: '0px 0px 20px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        PROCESANDO REPORTE
                                    </Typography>

                                    <Box sx={{
                                        width: '220px',
                                        height: '3px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        margin: '0 auto 12px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '10px'
                                    }}>
                                        <Box sx={{
                                            position: 'absolute',
                                            width: '35%',
                                            height: '100%',
                                            backgroundColor: '#3b82f6',
                                            boxShadow: '0 0 10px #3b82f6',
                                            animation: `${barProgress} 2s infinite ease-in-out`
                                        }} />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#9ca3af',
                                            fontWeight: 500,
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        Preparando visualización de alta calidad...
                                    </Typography>
                                </Box>
                            </Box>
                        </Fade>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullScreenModal;