import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputDatePicker from "components/input/InputDatePicker";
import InputText from "components/input/InputText";
import SubCard from "ui-component/cards/SubCard";

const SummaryAvailableInformation = ({ modelData }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <SubCard darkTitle title="Resumen de la información disponible">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <InputDatePicker
                        defaultValue={modelData?.resInfoDispoFechaInvestigado}
                        label="Fecha del hecho investigado"
                        name="resInfoDispoFechaInvestigado"
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputText
                        defaultValue={modelData?.resInfoDispoHoraExamen}
                        fullWidth
                        name="resInfoDispoHoraExamen"
                        label="Hora del examen"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <Typography variant="caption" align="justify" fontSize={12}>Nota: (Hechos que generaron la solicitud del examen, actividades desarrolladas durante las horas inmediatamente anteriores a tales hechos, traumas físicos sufridos durante el evento, síntomas referidos, atención médica recibida, entre otros).</Typography>
                </Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.resInfoDispoRelatoHechos}
                        fullWidth
                        rows={4}
                        multiline
                        name="resInfoDispoRelatoHechos"
                        label="Relato de los hechos y circunstancias relacionadas"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <Typography variant="caption" align="justify" fontSize={12}>Nota: (Haga una breve referencia de los documentos aportados con el caso y extraiga de los mismos lo pertinente, como la historia clínica, resultados de exámenes paraclínicos, documentos remitidos por la autoridad u otros).</Typography>
                </Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.resInfoDispoInformacionAdicional}
                        fullWidth
                        rows={4}
                        multiline
                        name="resInfoDispoInformacionAdicional"
                        label="Información adicional al comenzar el examen"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.resInfoDispoRevisionSistemas}
                        fullWidth
                        rows={4}
                        multiline
                        name="resInfoDispoRevisionSistemas"
                        label="Revisión por sistemas"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <Typography variant="caption" align="justify" fontSize={12}>Nota: (Registre aquí los antecedentes toxicológicos y farmacológicos, médico legales –valoraciones previas–, patológicos, psiquiátricos o psicológicos, quirúrgicos, traumáticos, hospitalarios, alérgicos, gineco-obstétricos, sociales y familiares).</Typography>
                </Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.resInfoDispoAntecedentes}
                        fullWidth
                        rows={4}
                        multiline
                        name="resInfoDispoAntecedentes"
                        label="Antecedentes"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default SummaryAvailableInformation;