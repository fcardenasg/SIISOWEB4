import React from 'react';
// Importaciones de Material-UI
import { Box, Typography, Stack, Divider } from '@mui/material';
// Importación de Iconify o un icono de MUI (ej: SettingsIcon, ConstructionIcon)

// Usaré un icono de MUI común como sustituto si no tienes Iconify, o mantengo la referencia a Iconify.
// const IconComponent = (props) => (
//     <Icon icon="mdi:tools" {...props} /> 
// );
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'; // Icono de engranaje/herramientas de MUI
import SubCard from 'ui-component/cards/SubCard';

// Definición de la animación keyframes
const pulseAnimation = {
    '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
        '50%': { transform: 'scale(1.05)', opacity: 1 },
    },
    animation: 'pulse 3s infinite ease-in-out',
};

const ListRehabilitationPlan = () => {
    return (
        <SubCard sx={{ padding: '20px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            {/* 1. Icono con animación y estilos */}
            <SettingsSuggestIcon
                sx={{
                    justifyContent: 'center',
                    width: '100%',
                    fontSize: '100px', // Tamaño del icono
                    marginBottom: '20px',
                    color: '#dc3545', // Rojo corporativo
                    ...pulseAnimation, // Aplicación de la animación
                }}
            />
            {/* Si usaras Iconify, reemplaza lo anterior por:
            <IconComponent 
                sx={{
                    fontSize: '80px', 
                    marginBottom: '20px',
                    color: '#dc3545', 
                    ...pulseAnimation, 
                }}
            />
            */}


            {/* 2. Título Principal (Typography con variante H1) */}
            <Typography
                variant="h4" // Variante que se ajusta mejor al tamaño
                component="h1" // Renderizado como h1
                fontWeight={600}
                color="#212529"
                gutterBottom // Agrega un margen inferior
                sx={{
                    marginBottom: '10px',
                    fontSize: { xs: '2em', md: '2.2em' }
                }}
            >
                Módulo de Plan de Rehabilitación
            </Typography>

            {/* 3. Subtítulo o Estado (Typography con variante H2) */}
            <Typography
                variant="subtitle1"
                component="h2"
                color="#6c757d"
                fontWeight={500}
                sx={{
                    fontSize: '1em',
                    marginBottom: '25px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}
            >
                🔨 EN DESARROLLO ACTIVO
            </Typography>

            {/* 4. Mensaje Detallado (Typography body1) */}
            <Typography
                variant="body1"
                color="#495057"
                lineHeight={1.7}
                sx={{
                    marginBottom: '30px',
                    maxWidth: '500px',
                    fontSize: '1em',
                }}
            >
                Estamos optimizando este módulo para ofrecerte una funcionalidad completa y una experiencia de usuario superior.
                <br />
                Te invitamos a volver pronto. ¡Tu paciencia es apreciada!
            </Typography>

            {/* 5. Separador (Divider) y Texto de Contacto */}
            <Divider sx={{ width: '100%', borderColor: '#e9ecef' }} />

            <Box sx={{ paddingTop: '15px' }}>
                <Typography
                    variant="caption" // Tamaño de texto muy pequeño
                    color="#adb5bd"
                    display="block"
                >
                    Para consultas o feedback, por favor contacta al equipo de soporte.
                </Typography>
            </Box>
        </SubCard>
    );
};

export default ListRehabilitationPlan;