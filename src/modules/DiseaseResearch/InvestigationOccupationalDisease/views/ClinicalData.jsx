import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';

const ClinicalData = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    defaultValue={dataModel?.datosClinicos}
                    fullWidth
                    multiline
                    rows={4}
                    name="datosClinicos"
                    label="Datos clínicos y paraclínicos"
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default ClinicalData;