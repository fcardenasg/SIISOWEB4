import { useState } from "react";
import { Box, Typography, Paper, Stack, Pagination } from "@mui/material";
import Iconify from "components/iconify/iconify";
import SubCard from "ui-component/cards/SubCard";

const TableSummary = ({ listData }) => {
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(listData.length / itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const paginatedData = listData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <SubCard darkTitle title="Resumen de la información extraída y registrada">
            <Stack spacing={1.5}>
                {paginatedData.map((item, index) => {
                    const isError = item.estadoError;

                    return (
                        <Paper
                            key={`${page}-${index}`}
                            elevation={0}
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: isError ? "error.light" : "grey.200",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: ".95rem",
                                        fontWeight: 600,
                                        color: "primary.main"
                                    }}
                                >
                                    {item.cargo}
                                </Typography>

                                <Box sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1.5,
                                    mt: 0.5,
                                    alignItems: "center"
                                }}>
                                    <Typography sx={{ fontSize: ".8rem", color: "#555", display: "flex", alignItems: "center", gap: .5 }}>
                                        <strong>GES:</strong> {item.ges}
                                    </Typography>

                                    <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "grey.500" }} />

                                    <Typography sx={{ fontSize: ".8rem", color: "#555", display: "flex", alignItems: "center", gap: .5 }}>
                                        <strong>Riesgo:</strong> {item.claseRiesgo}
                                    </Typography>

                                    <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "grey.500" }} />

                                    <Typography sx={{ fontSize: ".8rem", color: "#555", display: "flex", alignItems: "center", gap: .5 }}>
                                        <strong>Descripción GES:</strong> {item.descripcion}
                                    </Typography>
                                </Box>


                                {isError && (
                                    <Typography
                                        sx={{
                                            fontSize: ".8rem",
                                            mt: 1,
                                            color: "error.main",
                                            fontWeight: 500,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <Iconify
                                            icon="mdi:alert-circle-outline"
                                            sx={{ color: "error.main" }}
                                        />
                                        {item.mensajeError}
                                    </Typography>
                                )}
                            </Box>

                            <Iconify
                                icon={
                                    isError
                                        ? "mdi:alert-circle-outline"
                                        : "mdi:check-circle-outline"
                                }
                                width={26}
                                sx={{
                                    color: isError ? "error.main" : "success.main",
                                    flexShrink: 0
                                }}
                            />
                        </Paper>
                    );
                })}

                {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            shape="rounded"
                            color="primary"
                        />
                    </Box>
                )}
            </Stack>
        </SubCard>
    );
};

export default TableSummary;