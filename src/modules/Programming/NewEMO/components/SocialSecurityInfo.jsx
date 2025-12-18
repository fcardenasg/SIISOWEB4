import { Box, Typography } from "@mui/material";
import Iconify from "components/iconify/iconify";

const infoItems = [
    { key: "nameEps", label: "EPS", icon: "mdi:stethoscope", color: "#1E88E5" },
    { key: "nameAfp", label: "AFP", icon: "mdi:currency-usd", color: "#8E24AA" },
    { key: "nameArl", label: "ARL", icon: "mdi:shield-check", color: "#43A047" },
    { key: "nameCesantias", label: "Cesantías", icon: "mdi:bank", color: "#FB8C00" },
];

const SocialSecurityInfo = ({ dataEmployee }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", mt: 1 }}>
            {infoItems.map((item) => (
                <Box key={item.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Iconify icon={item.icon} color={item.color} />
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                        {`${item.label}: ${(dataEmployee?.[item.key]?.toLowerCase().includes("sin registro") || dataEmployee?.[item.key] === "")
                            ? "Sin registro" : (dataEmployee?.[item.key] || `Sin ${item.label}`)}`}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default SocialSecurityInfo;