import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
    Box,
    Card,
    Typography,
    Avatar,
    Grid,
    Skeleton,
    Divider,
    capitalize,
} from "@mui/material";
import Iconify from "components/iconify/iconify";
import { useBoolean } from "hooks/use-boolean";
import { GetDataEmployyeNewGetById } from "api/clients/EmployeeClient";
import Chip from "ui-component/extended/Chip";
import SocialSecurityInfo from "./components/SocialSecurityInfo";
import { formatFirstWord } from "./components/methods";
import SubCard from "ui-component/cards/SubCard";
import TabsEMO from "./components/TabsEMO";

const ViewEMO = () => {
    const { documento } = useParams();
    const [dataEmployee, setDataEmployee] = useState(null);
    const loading = useBoolean(true);

    useEffect(() => {
        async function getData() {
            loading.onTrue();

            try {
                const resultData = await GetDataEmployyeNewGetById(documento);
                if (resultData?.data.status === 200) {
                    setDataEmployee(resultData.data.data);
                } else {
                    toast.error(resultData?.data.message || "Error al obtener la información");
                }
            } catch {
                toast.error("Ocurrió un error al consultar el empleado");
            } finally {
                loading.onFalse();
            }
        }

        getData();
    }, [documento]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <SubCard darkTitle title="Historia clínica ocupacional">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 3,
                        mx: 5
                    }}
                >
                    {loading.value ? (
                        <Skeleton variant="circular" width={90} height={90} />
                    ) : (
                        <Avatar
                            src={dataEmployee?.imgEmpleado || ""}
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: "8px",
                                border: "0.5px solid #e0e0e0"
                            }}
                        />
                    )}

                    <Box sx={{ flexGrow: 1, minWidth: 260, gap: 1 }}>
                        {loading.value ? (
                            <>
                                <Skeleton width={250} height={30} />
                                <Skeleton width={150} height={24} />
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
                                    <Typography variant="h4" sx={{ alignSelf: "center" }}>
                                        {dataEmployee?.nombres}
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

                                <Divider sx={{ my: 1.5 }} />

                                <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                                    <Grid item xs={12} md={6} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Fecha:</Typography>
                                        <Typography variant="body1">15/11/2025</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} sx={{ display: "flex", gap: 0.5 }}>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>Atención:</Typography>
                                        <Typography variant="body1">Control Periodico</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Box>
                </Box>
            </SubCard>

            <SubCard sx={{ mt: 2 }}>
                <TabsEMO dataEmployee={dataEmployee} />
            </SubCard>
        </motion.div>
    );
};

export default ViewEMO;