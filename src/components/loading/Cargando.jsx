import { Grid, Typography } from "@mui/material";
import Iconify from "components/iconify/iconify";
import { motion } from "framer-motion";

export default function Cargando({ title = "Cargando información…", size = 140, myy = 4, mxx = 4 }) {
    return (
        <Grid item sx={{ my: myy, mx: mxx }}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ textAlign: "center" }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <Iconify icon="svg-spinners:gooey-balls-2" width={size} sx={{ color: "secondary.main" }} />
                </motion.div>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontWeight: 500,
                        letterSpacing: 0.3,
                    }}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{ mt: 0.5, color: "text.disabled" }}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    Por favor espera un momento
                </Typography>
            </Grid>
        </Grid>
    );
}