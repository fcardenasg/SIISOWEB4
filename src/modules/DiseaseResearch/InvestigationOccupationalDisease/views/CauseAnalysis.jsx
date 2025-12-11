import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';

const CauseAnalysis = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="analisisCausas"
                    label="Análisis de causas"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.analisisCausas}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default CauseAnalysis;