import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function TableResult({ methods, lsParametro }) {
    const { control } = methods;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#e8e1e1b0" }}>
                    <TableRow>
                        <TableCell sx={{ width: 150 }}>Parámetro</TableCell>
                        <TableCell>Mejor</TableCell>
                        <TableCell>LLN</TableCell>
                        <TableCell>%Pred</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lsParametro.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ width: 150 }}>{data.label}</TableCell>
                            <TableCell>
                                <Controller
                                    defaultValue=""
                                    name={`detalle[${index}].mejor`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            size="small"
                                            type="number"
                                            fullWidth
                                        />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Controller
                                    defaultValue=""
                                    name={`detalle[${index}].lln`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            size="small"
                                            type="number"
                                            fullWidth
                                        />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Controller
                                    defaultValue=""
                                    name={`detalle[${index}].porcentajePred`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            size="small"
                                            type="number"
                                            fullWidth
                                        />
                                    )}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}