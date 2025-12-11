import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';

const UnderlyingCauseDetected = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="causaBasicaDetectada"
                    label="Causa básica detectada"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.causaBasicaDetectada}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default UnderlyingCauseDetected;