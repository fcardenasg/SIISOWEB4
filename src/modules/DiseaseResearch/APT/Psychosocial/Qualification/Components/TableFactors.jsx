import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GetFactoresAgentesAPT } from "api/clients/APTRatingClient";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
    Typography,
    styled
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useFormContext } from "react-hook-form";
import EmptyState from "components/loading/EmptyState";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#E0E0E0",
        color: theme.palette.common.black,
        fontWeight: "bold",
        padding: "8px 12px",
        userSelect: "none",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: "6px 12px",
        userSelect: "none",
        cursor: "default",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme, isselected }) => ({
    backgroundColor: isselected ? "#bbdefb !important" : "inherit",
    borderLeft: isselected && `5px solid ${theme.palette.primary.main}`,
    transition: "all 0.2s ease",

    "&:nth-of-type(odd)": {
        backgroundColor: isselected ? "#bbdefb !important" : theme.palette.action.hover,
    },
    "&:hover": {
        backgroundColor: isselected ? "#bbdefb !important" : "#f5f5f5",
        cursor: "pointer",
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const TableFactors = ({ idAPTCalificacion: idProp, tipo, tipoFactor, data = [] }) => {
    const formContext = useFormContext();
    const formContextRef = useRef(formContext);
    formContextRef.current = formContext;

    const idAPTCalificacion = idProp || (formContext ? formContext.getValues("idAPTCalificacion") : null);

    const [factors, setFactors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFactors = useCallback(async () => {
        if (!idAPTCalificacion) {
            setFactors([]);
            return;
        }
        try {
            setLoading(true);
            const response = await GetFactoresAgentesAPT(idAPTCalificacion, tipo);
            console.log(response.data);

            if (response.data.exito) {
                setFactors(response.data.datos || []);
            } else {
                setFactors([]);
            }
        } catch (error) {
            console.error("Error fetching factors:", error);
            setFactors([]);
        } finally {
            setLoading(false);
        }
    }, [idAPTCalificacion, tipo]);

    useEffect(() => {
        fetchFactors();
    }, [fetchFactors]);

    useEffect(() => {
        window.addEventListener('refresh-factors-apt', fetchFactors);
        return () => window.removeEventListener('refresh-factors-apt', fetchFactors);
    }, [fetchFactors]);

    const tableData = idAPTCalificacion ? factors : data;

    const { sumTotal, averageTotal } = useMemo(() => {
        const sum = tableData.reduce((acc, item) => acc + (Number(item.Total !== undefined ? item.Total : item.total) || 0), 0);
        const avg = tableData.length > 0 ? sum / tableData.length : 0;
        return { sumTotal: sum, averageTotal: avg };
    }, [tableData]);

    useEffect(() => {
        const ctx = formContextRef.current;
        if (!ctx) return;
        const fieldName = tipo === 1 ? "promedioIntralaboral" : "promedioExtralaboral";
        const newValue = (idAPTCalificacion && tableData.length > 0) ? Number(averageTotal.toFixed(2)) : null;
        const currentValue = ctx.getValues(fieldName);
        if (currentValue !== newValue) {
            ctx.setValue(fieldName, newValue, { shouldDirty: false, shouldValidate: false });
        }
    }, [averageTotal, tipo, idAPTCalificacion, tableData.length]);

    return (
        <TableContainer component={Paper} sx={{ elevation: 0, position: 'relative' }}>
            <Table sx={{ minWidth: 500 }} size="medium">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: '5%' }}>No.</StyledTableCell>
                        <StyledTableCell sx={{ width: '85%' }}>Descripción de Factores {tipoFactor}</StyledTableCell>
                        <StyledTableCell sx={{ width: '10%' }}>Valoración</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <StyledTableCell colSpan={3} align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
                                    <CircularProgress size={20} />
                                    <Typography variant="body2" color="textSecondary">Cargando factores...</Typography>
                                </Box>
                            </StyledTableCell>
                        </TableRow>
                    ) : tableData.length === 0 ? (
                        <TableRow>
                            <StyledTableCell colSpan={3} align="center">
                                <EmptyState seeSubtitle={false} title="Aún no hay factores registrados" />
                            </StyledTableCell>
                        </TableRow>
                    ) : (
                        <>
                            {tableData.map((item, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell>{item.NombreCondicion || item.nombreCondicion}</StyledTableCell>
                                    <StyledTableCell align="center">{item.Total !== undefined ? item.Total : item.total}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} sx={{ fontWeight: 'bold', textAlign: 'right', pr: 2 }}>
                                    Total
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    {sumTotal}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} sx={{ fontWeight: 'bold', textAlign: 'right', pr: 2 }}>
                                    Promedio
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    {Number(averageTotal.toFixed(2))}
                                </StyledTableCell>
                            </StyledTableRow>
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableFactors;

export const TableResultFactors = () => {
    const formContext = useFormContext();
    if (!formContext) return null;

    const promedioIntralaboral = formContext.watch("promedioIntralaboral");
    const promedioExtralaboral = formContext.watch("promedioExtralaboral");

    const rows = [];
    if (promedioIntralaboral !== undefined && promedioIntralaboral !== null) {
        rows.push({
            descripcion: "Promedio obtenido del riesgo psicosocial intralaboral",
            valoracion: promedioIntralaboral
        });
    }
    if (promedioExtralaboral !== undefined && promedioExtralaboral !== null) {
        rows.push({
            descripcion: "Promedio del riesgo psicosocial extralaboral",
            valoracion: promedioExtralaboral
        });
    }

    if (rows.length === 0) return null;

    return (
        <TableContainer component={Paper} sx={{ elevation: 0 }}>
            <Table sx={{ minWidth: 500 }} size="medium">
                <TableHead>
                    <TableRow>
                        <StyledTableCell colSpan={2}>Evaluación del Riesgo Psicosocial Intra y Extralaboral</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{item.descripcion}</StyledTableCell>
                            <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>{item.valoracion}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};