import { motion } from 'framer-motion'
import { Avatar, Box, Divider, Grid, Skeleton, Typography } from '@mui/material';
import SocialSecurityInfo from 'modules/Programming/NewEMO/components/SocialSecurityInfo';
import SubCard from 'ui-component/cards/SubCard';
import { formatFirstWord } from 'modules/Programming/NewEMO/components/methods';
import Chip from 'ui-component/extended/Chip';
import { ViewFormat } from 'components/helpers/Format';

const ViewEmployee = ({ dataEmployee, loading, title }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <SubCard darkTitle title={title}>
                <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
                    <Grid item xs={12} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {loading.value ? (
                            <Skeleton variant="circular" width={170} height={170} />
                        ) : (
                            <Avatar
                                src={dataEmployee?.imgEmpleado || ""}
                                sx={{
                                    width: 170,
                                    height: 170,
                                    borderRadius: "8px",
                                    border: "0.5px solid #e0e0e0"
                                }}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12} md={8} lg={9} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {loading.value ? (
                            <>
                                <Skeleton width={250} height={30} />
                                <Skeleton width={150} height={24} />
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1.5 }}>
                                    <Typography variant="h4" sx={{ alignSelf: "center" }}>
                                        C.C. {dataEmployee?.documento} • {dataEmployee?.nombres}
                                    </Typography>

                                    {!loading.value && (
                                        <Chip
                                            size="small"
                                            label={formatFirstWord(dataEmployee?.namePayStatus)}
                                            chipcolor={dataEmployee?.namePayStatus?.includes("ACTIVO (A)") ? "success" : "error"}
                                        />
                                    )}
                                </Box>

                                <Typography variant="body1" color="text.secondary">
                                    {dataEmployee?.nameRosterPosition || "Sin cargo asignado"} / {dataEmployee?.nameOficio || "Sin profesión asignada"}
                                </Typography>

                                <SocialSecurityInfo dataEmployee={dataEmployee} />

                                <Divider sx={{ my: 1 }} />

                                <Grid container spacing={1} sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Sexo:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameGenero}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Estado civil:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameEstadoCivil}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Fecha de nacimiento:</Typography>
                                        <Typography variant="body1">{ViewFormat(dataEmployee?.fechaNaci)}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Lugar de nacimiento:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameMunicipioNacido}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Departamento:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameDptoNacido}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Escolaridad:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameEscolaridad}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Lugar de residencia:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameMunicipioResidencia}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Departamento:</Typography>
                                        <Typography variant="body1">{dataEmployee?.nameDptoResidencia}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </SubCard>
        </motion.div>
    )
}

export default ViewEmployee;