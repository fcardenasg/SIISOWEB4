import { Grid, Divider } from '@mui/material';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import { TableDiagnosis, TableDiagnosisRating } from '../components/Table';

const DataDiagnosisQualificationProcess = ({ dataModel, matchesXS, methods }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TableDiagnosis />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idGeneroIncapacidad"
                    label="Generó incapacidad"
                    defaultValue={dataModel?.idGeneroIncapacidad}
                    options={[]}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="diasIncapacidad"
                    label="Días de incapacidad"
                    defaultValue={dataModel?.diasIncapacidad}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="observacionesIncapacidad"
                    label="Observaciones a la incapacidad"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.observacionesIncapacidad}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="numeroFurel"
                    label="FUREL #"
                    defaultValue={dataModel?.numeroFurel}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaFurel"
                    label="Fecha del FUREL"
                    defaultValue={dataModel?.fechaFurel}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputDatePicker
                    name="fechaEstructuracionOrigen"
                    label="Fecha de estructuración de origen"
                    defaultValue={dataModel?.fechaEstructuracionOrigen}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12}>
                <TableDiagnosisRating methods={methods} />
            </Grid>

            <Grid item xs={12}><Divider /></Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idCalificacionPCL"
                    label="Calificación PCL"
                    defaultValue={dataModel?.idCalificacionPCL}
                    options={[]}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="porcentajePCL"
                    label="% PCL"
                    defaultValue={dataModel?.porcentajePCL}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="instancia"
                    label="Instancia"
                    defaultValue={dataModel?.instancia}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="dictamen"
                    label="Dictamen #"
                    defaultValue={dataModel?.dictamen}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="idCalificacionIntegral"
                    label="Calificación integral"
                    defaultValue={dataModel?.idCalificacionIntegral}
                    options={[]}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={9}>
                <InputText
                    name="otrasPatologias"
                    label="Otras patologías que hacen parte de la calificación de PCL"
                    defaultValue={dataModel?.otrasPatologias}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default DataDiagnosisQualificationProcess;