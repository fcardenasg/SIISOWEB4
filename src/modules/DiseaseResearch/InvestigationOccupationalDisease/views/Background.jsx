import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';
import { TableHealth } from '../components/Table';

const Background = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="personales"
                    label="Personales (enfermedades, cirugías, traumas, farmacológicos)"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.personales}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="otrasEnfermedadesLaborales"
                    label="Otras enfermedades laborales calificadas o en proceso de calificación"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.otrasEnfermedadesLaborales}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12}>
                <TableHealth />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="familiares"
                    label="Familiares"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.familiares}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default Background;