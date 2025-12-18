import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { GetDxMLInvestigation } from "api/clients/InvestigationClient";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyledTableCell, StyledTableRow } from "../methods";

export default function TableDiagnosis({ documento }) {
    const { control } = useFormContext();
    const { fields, append, remove, replace } = useFieldArray({ control, name: "diagnostico" });

    const defaultDiagnosis = {
        dx: '',
        codigo: '',
        fechaInicioSintomas: '',
        fechaDiagnostico: '',
    };

    useEffect(() => {
        async function getData() {
            if (documento) {
                const result = await GetDxMLInvestigation(documento);
                if (result.data.exito) {
                    const fetchedDiagnosis = result.data.datos;
                    if (fetchedDiagnosis && fetchedDiagnosis.length > 0) {
                        replace(fetchedDiagnosis);
                    } else if (fields.length === 0) {
                        append(defaultDiagnosis);
                    }
                } else if (fields.length === 0) {
                    append(defaultDiagnosis);
                }
            } else if (fields.length === 0) {
                append(defaultDiagnosis);
            }
        }

        getData();
    }, [documento, replace, append, fields.length]);

    const handleAddAfter = (index) => {
        append(defaultDiagnosis, { shouldFocus: false, at: index + 1 });
    };

    return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }} aria-label="editable diagnosis table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: '20px' }}>Diagnóstico</StyledTableCell>
                        <StyledTableCell>Código CIE</StyledTableCell>
                        <StyledTableCell>Fecha de inicio de síntomas</StyledTableCell>
                        <StyledTableCell>Fecha del diagnóstico</StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center' }}>Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map((field, index) => (
                        <StyledTableRow key={field.id}>
                            <StyledTableCell>
                                <Controller
                                    name={`diagnostico.${index}.dx`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            fullWidth
                                            InputProps={{ disableUnderline: false }}
                                        />
                                    )}
                                />
                            </StyledTableCell>

                            <StyledTableCell>
                                <Controller
                                    name={`diagnostico.${index}.codigo`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            minRows={1}
                                            maxRows={3}
                                            InputProps={{ disableUnderline: false }}
                                        />
                                    )}
                                />
                            </StyledTableCell>

                            <StyledTableCell>
                                <Controller
                                    name={`diagnostico.${index}.fechaInicioSintomas`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="date"
                                            variant="standard"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{ disableUnderline: false }}
                                        />
                                    )}
                                />
                            </StyledTableCell>

                            <StyledTableCell>
                                <Controller
                                    name={`diagnostico.${index}.fechaDiagnostico`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            type="date"
                                            variant="standard"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{ disableUnderline: false }}
                                        />
                                    )}
                                />
                            </StyledTableCell>

                            <StyledTableCell sx={{ textAlign: 'center' }}>
                                <Tooltip title="Agregar una nueva fila">
                                    <IconButton
                                        onClick={() => handleAddAfter(index)}
                                        color="primary"
                                        aria-label={`Agregar nueva fila después de ${index + 1}`}
                                        size="small"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>

                                {fields.length > 1 && (
                                    <Tooltip title="Eliminar esta fila">
                                        <IconButton
                                            onClick={() => remove(index)}
                                            color="error"
                                            aria-label={`Eliminar diagnóstico ${index + 1}`}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};