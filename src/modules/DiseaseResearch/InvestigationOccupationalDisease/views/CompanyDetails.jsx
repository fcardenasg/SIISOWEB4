import { Grid } from '@mui/material';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';

const CompanyDetails = ({ dataModel, matchesXS }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <InputDatePicker
                    label="Fecha de la investigación"
                    name="fechaInvestigacion"
                    defaultValue={dataModel?.fechaInvestigacion}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    defaultValue={dataModel?.razonSocial}
                    fullWidth
                    name="razonSocial"
                    label="Razón social"
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    defaultValue={dataModel?.nit}
                    fullWidth
                    name="nit"
                    label="NIT"
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
                <InputText
                    defaultValue={dataModel?.actividadEconomica}
                    fullWidth
                    name="actividadEconomica"
                    label="Actividad económica de la empresa"
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="idSedeTrabajo"
                    label="Sede de trabajo"
                    defaultValue={dataModel?.idSedeTrabajo}
                    options={[]}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="idDepartamento"
                    label="Departamento"
                    defaultValue={dataModel?.idDepartamento}
                    options={[]}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="idArea"
                    label="Área"
                    defaultValue={dataModel?.idArea}
                    options={[]}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>
        </Grid>
    )
}

export default CompanyDetails;