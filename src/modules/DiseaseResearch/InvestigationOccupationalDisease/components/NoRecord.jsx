import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const NoRecord = ({ title = "No se encontraron resultados" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 2,
                    textAlign: 'center',
                    maxWidth: 600,
                    mx: 'auto',
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'action.hover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: 'text.secondary',
                    }}
                >
                    <SearchOffIcon sx={{ fontSize: 40 }} />
                </Box>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    sx={{ lineHeight: 1.5 }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ maxWidth: 480, lineHeight: 1.6 }}
                >
                    Intenta ajustar los términos de búsqueda o verifica la ortografía.
                    Es posible que aún no existan registros con los criterios seleccionados.
                </Typography>
            </Box>
        </motion.div>
    )
}

export default NoRecord;