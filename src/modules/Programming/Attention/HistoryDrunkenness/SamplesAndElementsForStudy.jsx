import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputRadioGroup from "components/input/InputRadioGroup";
import InputText from "components/input/InputText";
import SubCard from "ui-component/cards/SubCard";

const SamplesAndElementsForStudy = ({ modelData, lsDeterminacion, lsOpcion }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <SubCard darkTitle title="Muestras y elementos para estudio">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="caption" align="justify" fontSize={12}>Nota: Mencione aquí si recolecta muestras para estudio toxicológico. Asegúrese de diligenciar adecuadamente los formatos de cadena de custodia de las muestras recolectadas.</Typography>
                </Grid>

                <Grid item xs={12}>
                    <InputRadioGroup
                        defaultValue={modelData?.muestraEstudioDeterminacion}
                        name="muestraEstudioDeterminacion"
                        label="Determinación de alcoholemia indirecta mediante alcohosensor:"
                        options={lsDeterminacion}
                        row={true}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioResultado}
                        fullWidth
                        name="muestraEstudioResultado"
                        label="Resultados"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioRegistrosAdjuntos}
                        fullWidth
                        name="muestraEstudioRegistrosAdjuntos"
                        label="Registros adjuntos"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioObservaciones}
                        fullWidth
                        rows={2}
                        multiline
                        name="muestraEstudioObservaciones"
                        label="Observaciones"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputRadioGroup
                        defaultValue={modelData?.muestraEstudioSangre}
                        name="muestraEstudioSangre"
                        label="Muestra de sangre:"
                        options={lsOpcion}
                        row={true}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioSangreAnalisisSolicitado}
                        fullWidth
                        name="muestraEstudioSangreAnalisisSolicitado"
                        label="Análisis solicitado"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioSangreDestino}
                        fullWidth
                        name="muestraEstudioSangreDestino"
                        label="Destino"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputRadioGroup
                        defaultValue={modelData?.muestraEstudioOrina}
                        name="muestraEstudioOrina"
                        label="Muestra de orina:"
                        options={lsOpcion}
                        row={true}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioOrinaAnalisisSolicitado}
                        fullWidth
                        name="muestraEstudioOrinaAnalisisSolicitado"
                        label="Análisis solicitado"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioOrinaDestino}
                        fullWidth
                        name="muestraEstudioOrinaDestino"
                        label="Destino"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputRadioGroup
                        defaultValue={modelData?.muestraEstudioSaliva}
                        name="muestraEstudioSaliva"
                        label="Muestra de saliva:"
                        options={lsOpcion}
                        row={true}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioSalivaAnalisisSolicitado}
                        fullWidth
                        name="muestraEstudioSalivaAnalisisSolicitado"
                        label="Análisis solicitado"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                    <InputText
                        defaultValue={modelData?.muestraEstudioSalivaDestino}
                        fullWidth
                        name="muestraEstudioSalivaDestino"
                        label="Destino"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SamplesAndElementsForStudy;