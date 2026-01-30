import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { StyledTableCell, StyledTableRow } from "modules/DiseaseResearch/InvestigationOccupationalDisease/components/methods";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function TableHygiene() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "hygiene" });

    const defaultHygiene = {
        subactividad: '',
        tiempoPorcentaje: '',
        tiempoCargaFisica: '',
        factoresBiomecanicos: '',
        observaciones: '',
    };

    const handleAddAfter = (index) => {
        append(defaultHygiene, { shouldFocus: false, at: index + 1 });
    };

    if (fields.length === 0) {
        append(defaultHygiene);
    }

    return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }} aria-label="editable diagnosis table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: '20px' }}>Subactividad</StyledTableCell>
                        <StyledTableCell>Tiempo y porcentaje</StyledTableCell>
                        <StyledTableCell>Tiempo con carga física</StyledTableCell>
                        <StyledTableCell>Factores biomecánicos</StyledTableCell>
                        <StyledTableCell>Observaciones</StyledTableCell>
                        <StyledTableCell sx={{ textAlign: 'center' }}>Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map((field, index) => (
                        <StyledTableRow key={field.id}>
                            <StyledTableCell>
                                <Controller
                                    name={`hygiene.${index}.subactividad`}
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
                                    name={`hygiene.${index}.tiempoPorcentaje`}
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
                                    name={`hygiene.${index}.tiempoPorcentaje`}
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
                                    name={`hygiene.${index}.tiempoPorcentaje`}
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
                                    name={`hygiene.${index}.tiempoPorcentaje`}
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