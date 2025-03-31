import { CircularProgress, Grid, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import EmptyContent from "./EmptyContent";

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

const LoadingList = ({ loadingModulo, notFound, children }) => {
    return (
        <>
            {loadingModulo && (
                <TableBody
                    sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TableRow>
                        <TableCell
                            align="center"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '250px',
                            }}
                        >
                            <CircularProgress size={150} />
                            <Typography sx={{ mt: 2.5 }} variant="h4">
                                Cargando registro...
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            )}

            {notFound ? (
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
            )}
        </>
    );
}

export default LoadingList;