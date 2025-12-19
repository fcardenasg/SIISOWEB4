import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function EmptyState({ seeSubtitle = true, title = "No se encontraron registros", subtitle = "Actualmente no hay información disponible para mostrar.\nPuedes intentar realizar una nueva búsqueda o agregar un registro si es necesario." }) {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 7,
                textAlign: "center",
                overflow: "hidden"
            }}
        >
            {/* Icono animado */}
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ display: "flex" }}
            >
                <Icon
                    icon="solar:folder-broken"
                    width={85}
                    height={85}
                    style={{ opacity: 0.55, color: "#9e9e9e" }}
                />
            </motion.div>

            <Typography
                variant="h4"
                component={motion.div}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                sx={{ mt: 2, color: "text.secondary" }}
            >
                {title}
            </Typography>

            {seeSubtitle &&
                <Typography
                    variant="body1"
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.3, duration: 0.45 }}
                    sx={{
                        mt: 1,
                        maxWidth: 420,
                        color: "text.disabled",
                        lineHeight: 1.5
                    }}
                >
                    {subtitle}
                </Typography>
            }
        </Box>
    );
}