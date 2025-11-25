import React from 'react'
import { Grid } from '@mui/material';
import InputText from 'components/input/InputText';

const OtherClinicalData = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="otrosDatosClinicos"
                    label="Otros datos clínicos de interés relacionados con la patología"
                    multiline
                    rows={4}
                    defaultValue={dataModel?.otrosDatosClinicos}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default OtherClinicalData;