import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';

const BiographyReview = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="revisionBibliografia"
                    label="Revisión de la bibliografía"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.revisionBibliografia}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default BiographyReview;