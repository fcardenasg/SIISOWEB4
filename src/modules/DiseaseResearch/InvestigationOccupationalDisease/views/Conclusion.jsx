import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';

const Conclusion = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="conclusion"
                    label="Conclusion"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.conclusion}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default Conclusion;