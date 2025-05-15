import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import SearchForData from 'assets/img/searchfordata.json';
import EmptyContent from "components/loading/EmptyContent";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React from "react";

const AnimatedEmptyContent = React.memo(({ title }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: 'opacity, transform' }}
    >
        <EmptyContent title={title} />
    </motion.div>
));

const LoadingMassive = ({ loadingModulo, notFound, children }) => {
    return (
        <>
            {loadingModulo && (
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Box sx={{ width: '450px', height: '300px' }}>
                            <Lottie animationData={SearchForData} />
                        </Box>
                    </Grid>
                </Grid>
            )}

            {
                notFound ? (
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            {!loadingModulo && <AnimatedEmptyContent title="No hay registros" />}
                        </Grid>
                    </Grid>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        style={{ willChange: 'opacity, transform' }}
                    >
                        {children}
                    </motion.div>
                )
            }
        </>
    );
}

export default LoadingMassive;