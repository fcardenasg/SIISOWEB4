import { Grid, Typography } from '@mui/material';
import InputTextEditor from 'components/input/InputTextEditor';

const DataExposureCompany = ({ dataModel }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Resumen de los resultados del análisis del puesto de trabajo
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor name="resumenResultadosAnalisisPuesto" defaultValue={dataModel?.resumenResultadosAnalisisPuesto} />
            </Grid>

            {/* <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Resumen de la valoración del riesgo
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor name="resumenValoracionRiesgo" defaultValue={dataModel?.resumenValoracionRiesgo} />
            </Grid> */}
        </Grid>
    )
}

export default DataExposureCompany;