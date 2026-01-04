import {
    Paper,
    Table, TableBody, TableContainer,
    TableHead, TableRow,
    TextField
} from "@mui/material";
import { useEffect, useCallback } from "react";
import { Controller, FormProvider, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { GetAllDetailResearchAssignment } from "api/clients/ResearchAssignmentClient";
import { StyledTableCell, StyledTableRow } from "../methods";

export default function TableDiagnosis({ methods }) {
    const { id } = useParams();
    const { control, getValues, setValue } = methods;
    const idIEL = getValues('id');

    const { fields, replace } = useFieldArray({
        control,
        name: "listDiagnostico"
    });

    const formatDateForInput = (dateString) => {
        if (!dateString) return null;
        return dateString.split('T')[0];
    };

    const handleFieldChange = (index, fieldName, value, originalField) => {
        originalField.onChange(value);
        setValue(`listDiagnostico.${index}.cambioRegistro`, true, {
            shouldDirty: true,
            shouldValidate: true
        });
    };

    const getDxEmployee = useCallback(async () => {
        try {
            const idEnviar = idIEL || id;
            const statusData = Boolean(idIEL);
            const { data } = await GetAllDetailResearchAssignment(idEnviar, statusData);

            if (data?.exito && Array.isArray(data.datos)) {
                const formattedData = data.datos.map((item) => ({
                    id: item.id,
                    diagnostico: item.dx || item.diagnostico,
                    nombreDx: item.nombreDx ?? "",
                    fechaInicioSintomas: formatDateForInput(item.fechaInicioSintomas),
                    fechaDiagnostico: formatDateForInput(item.fechaDiagnostico),
                    cambioRegistro: false
                }));

                replace(formattedData);
            }
        } catch (error) {
            toast.error(error.response?.data?.mensaje || "Error al cargar los datos");
        }
    }, [id, idIEL, replace]);

    useEffect(() => {
        if (id || idIEL) {
            getDxEmployee();
        }
    }, [getDxEmployee]);

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
                                <StyledTableCell>{item.diagnostico}</StyledTableCell>
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
                                                value={field.value || null}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) =>
                                                    handleFieldChange(index, 'fechaInicioSintomas', e.target.value, field)
                                                }
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
                                                value={field.value || null}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) =>
                                                    handleFieldChange(index, 'fechaDiagnostico', e.target.value, field)
                                                }
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