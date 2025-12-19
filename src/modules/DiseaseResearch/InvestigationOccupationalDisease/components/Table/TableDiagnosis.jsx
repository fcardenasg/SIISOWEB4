import {
    Paper,
    Table, TableBody, TableContainer,
    TableHead, TableRow,
    TextField
} from "@mui/material";
import { useEffect } from "react";
import { Controller, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// API y Estilos locales
import { GetAllDetailResearchAssignment } from "api/clients/ResearchAssignmentClient";
import { StyledTableCell, StyledTableRow } from "../methods";

export default function TableDiagnosis({ methods }) {
    const { id } = useParams();
    const { control } = methods;
    const idIEL = useFormContext().getValues('id');

    const { fields, replace } = useFieldArray({
        control,
        name: "listDiagnostico"
    });

    const getDxEmployee = async () => {
        try {
            const service = await GetAllDetailResearchAssignment(id);
            if (service.data.exito) {
                const formattedData = service.data.datos.map(item => ({
                    diagnostico: item.dx || null,
                    nombreDx: item.nombreDx || null,
                    fechaInicioSintomas: item.fechaInicioSintomas || null,
                    fechaDiagnostico: item.fechaDiagnostico || null
                }));

                replace(formattedData);
            }
        } catch (error) {
            toast.error(error.message || "Error al cargar los datos");
        }
    };

    useEffect(() => {
        if (id) getDxEmployee();
    }, [id, replace]);

    return (
        <FormProvider {...methods}>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="editable diagnosis table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Diagnóstico</StyledTableCell>
                            <StyledTableCell>Código CIE</StyledTableCell>
                            <StyledTableCell>Fecha de inicio de síntomas</StyledTableCell>
                            <StyledTableCell>Fecha del diagnóstico</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((item, index) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell>
                                    {item.diagnostico}
                                </StyledTableCell>

                                <StyledTableCell>{item.nombreDx}</StyledTableCell>

                                <StyledTableCell>
                                    <Controller
                                        name={`listDiagnostico.${index}.fechaInicioSintomas`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="date"
                                                variant="standard"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        )}
                                    />
                                </StyledTableCell>

                                <StyledTableCell>
                                    <Controller
                                        name={`listDiagnostico.${index}.fechaDiagnostico`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="date"
                                                variant="standard"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        )}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </FormProvider>
    );
}