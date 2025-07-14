import { Box, Divider, Grid, Typography } from "@mui/material";
import Lottie from "lottie-react";
import ChemicalRisks from 'assets/img/ChemicalRisks.json';

export default function LoadingClass() {
    return (
        <Grid item xs={12} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item>
                    <Box
                        sx={{
                            width: '260px',
                            height: '260px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Lottie animationData={ChemicalRisks} />
                    </Box>
                </Grid>

                <Grid item xs>
                    <Typography variant="h3">Guía para Registrar el Panorama de Riesgos Asociados a un Cargo</Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body1">
                        Para poder registrar las clases del riesgo seleccionado, siga los siguientes pasos:
                        <ol>
                            <li>
                                <strong>Selección del Cargo:</strong> Elija primero el cargo correspondiente. Esto habilitará la opción para seleccionar el riesgo asociado.
                            </li>
                            <li>
                                <strong>Selección del Riesgo:</strong> Una vez seleccionado el cargo, podrá elegir el riesgo deseado. Al hacerlo, se cargarán automáticamente las clases asociadas a ese riesgo.
                            </li>
                            <li>
                                <strong>Diligenciar las Clases:</strong> Aparecerán las clases correspondientes al riesgo seleccionado. Complete la información requerida para cada clase según sea necesario.
                            </li>
                        </ol>
                        Este proceso garantiza que los datos se registren de manera ordenada y precisa, asegurando que todas las clases del riesgo seleccionado sean correctamente diligenciadas.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}