import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import { ViewFormat } from 'components/helpers/Format';
import { formatFirstWord } from 'modules/Programming/NewEMO/components/methods';
import SocialSecurityInfo from 'modules/Programming/NewEMO/components/SocialSecurityInfo';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';

const ViewEmployee = ({ dataEmployee, title }) => {
    return (
        <SubCard darkTitle title={title}>
            <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
                <Grid item xs={12} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Avatar
                        src={dataEmployee?.imgEmpleado || ""}
                        sx={{
                            width: 170,
                            height: 170,
                            borderRadius: "8px",
                            border: "0.5px solid #e0e0e0"
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={9} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1.5 }}>
                        <Typography variant="h4" sx={{ alignSelf: "center" }}>
                            C.C. {dataEmployee?.documento} • {dataEmployee?.nombre}
                        </Typography>

                        <Chip
                            size="small"
                            label={formatFirstWord(dataEmployee?.payStatus)}
                            chipcolor={dataEmployee?.payStatus?.includes("ACTIVO (A)") ? "success" : "error"}
                        />
                    </Box>

                    <Typography variant="body1" color="text.secondary">
                        {dataEmployee?.rosterPosition || "Sin cargo asignado"} / {dataEmployee?.oficio || "Sin profesión asignada"}
                    </Typography>

                    <SocialSecurityInfo dataEmployee={dataEmployee} />

                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={1} sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Sexo:</Typography>
                            <Typography variant="body1">{dataEmployee?.sexo}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Estado civil:</Typography>
                            <Typography variant="body1">{dataEmployee?.estadoCivil}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Fecha de nacimiento:</Typography>
                            <Typography variant="body1">{ViewFormat(dataEmployee?.fechaNacimiento)}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Lugar de nacimiento:</Typography>
                            <Typography variant="body1">{dataEmployee?.muniNacimiento}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Departamento:</Typography>
                            <Typography variant="body1">{dataEmployee?.deparNacimiento}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Escolaridad:</Typography>
                            <Typography variant="body1">{dataEmployee?.escolaridad}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Lugar de residencia:</Typography>
                            <Typography variant="body1">{dataEmployee?.muniResidencia}</Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>Departamento:</Typography>
                            <Typography variant="body1">{dataEmployee?.deparResidencia}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    )
}

export default ViewEmployee;