import { Box, Grid, Typography, Divider } from "@mui/material";
import Iconify from "components/iconify/iconify";

export default function EmployeeInformation({ dataEmployee }) {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4, mt: 2 }}>

            {/* === SECCIÓN: DATOS PERSONALES === */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Iconify icon="mdi:account-outline" width={22} color="primary.main" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Datos personales
                    </Typography>
                </Box>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Documento</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.documento}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Fecha de nacimiento</Typography>
                        <Typography variant="subtitle2">
                            {new Date(dataEmployee?.fechaNaci).toLocaleDateString("es-CO")}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Género</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameGenero}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Estado civil</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameEstadoCivil}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            {/* === SECCIÓN: INFORMACIÓN DEMOGRÁFICA === */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Iconify icon="mdi:earth" width={22} color="success.main" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Información demográfica
                    </Typography>
                </Box>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Ciudad de nacimiento</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameMunicipioNacido}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Departamento nacimiento</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameDptoNacido || "No registrado"}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Ciudad residencia</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameMunicipioResidencia}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Departamento residencia</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameDptoResidencia}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">Dirección</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.direccionResidencia}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            {/* === SECCIÓN: CONTACTO === */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Iconify icon="mdi:phone-outline" width={22} color="warning.main" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Contacto
                    </Typography>
                </Box>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Celular</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.celular}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Teléfono</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.telefonoContacto}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Correo electrónico</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.email}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Contacto de emergencia</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.contacto || "No registrado"}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            {/* === SECCIÓN: INFORMACIÓN LABORAL === */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Iconify icon="mdi:briefcase-outline" width={22} color="info.main" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Información laboral
                    </Typography>
                </Box>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Cargo</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameRosterPosition}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Área</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameArea}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Tipo de contrato</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameTipoContrato}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Fecha de ingreso</Typography>
                        <Typography variant="subtitle2">
                            {new Date(dataEmployee?.fechaIngreso).toLocaleDateString("es-CO")}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Sede</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameSede}</Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary">Turno</Typography>
                        <Typography variant="subtitle2">{dataEmployee?.nameTurno}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}