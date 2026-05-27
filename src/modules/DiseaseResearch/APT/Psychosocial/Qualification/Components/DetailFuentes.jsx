import PropTypes from 'prop-types';

import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Stack
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useState } from 'react';

import SubCard from 'ui-component/cards/SubCard';

const DetailFuentes = ({
    lsFuentes = [],
    lsParentesco = [],
    data = [],
    setData
}) => {

    const [detalle, setDetalle] = useState({

        idFuentes: '',

        idParentesco: '',

        descripcion: '',

        lugar: '',

        fecha: ''
    });

    const [indexEdit, setIndexEdit] =
        useState(-1);

    // =========================
    // CHANGE
    // =========================

    const handleChange = (
        e
    ) => {

        setDetalle({

            ...detalle,

            [e.target.name]:
                e.target.value
        });
    };

    // =========================
    // ADD
    // =========================

    const handleAdd = () => {

        if (
            detalle.idFuentes === '' ||
            detalle.idParentesco === ''
        ) {

            return;
        }

        const fuente =
            lsFuentes.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.idFuentes)
            );

        const parentesco =
            lsParentesco.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.idParentesco)
            );

        const item = {

            ...detalle,

            nombreFuente:
                fuente?.label || '',

            nombreParentesco:
                parentesco?.label || ''
        };

        if (indexEdit >= 0) {

            const update = [...data];

            update[indexEdit] = item;

            setData(update);

            setIndexEdit(-1);

        } else {

            setData([
                ...data,
                item
            ]);
        }

        setDetalle({

            idFuentes: '',

            idParentesco: '',

            descripcion: '',

            lugar: '',

            fecha: ''
        });
    };

    // =========================
    // DELETE
    // =========================

    const handleDelete = (
        index
    ) => {

        const update = [...data];

        update.splice(index, 1);

        setData(update);
    };

    // =========================
    // EDIT
    // =========================

    const handleEdit = (
        item,
        index
    ) => {

        setDetalle({

            idFuentes:
                item.idFuentes,

            idParentesco:
                item.idParentesco,

            descripcion:
                item.descripcion,

            lugar:
                item.lugar,

            fecha:
                item.fecha
        });

        setIndexEdit(index);
    };

    return (
        <Box>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography 
                        variant="h6" 
                        sx={{ mb: 3, fontWeight: 600 }}
                    >
                        📍 Detalle de Fuentes
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                    >
                        {/* FUENTE */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Fuente"
                                name="idFuentes"
                                value={
                                    detalle.idFuentes
                                }
                                onChange={
                                    handleChange
                                }
                                variant="outlined"
                                size="small"
                            >
                                {lsFuentes.map(
                                    (
                                        option
                                    ) => (
                                        <MenuItem
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.value
                                            }
                                        >
                                            {
                                                option.label
                                            }
                                        </MenuItem>
                                    )
                                )}
                            </TextField>
                        </Grid>

                        {/* PARENTESCO */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                fullWidth
                                label="Parentesco"
                                name="idParentesco"
                                value={
                                    detalle.idParentesco
                                }
                                onChange={
                                    handleChange
                                }
                                variant="outlined"
                                size="small"
                            >
                                {lsParentesco.map(
                                    (
                                        option
                                    ) => (
                                        <MenuItem
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.value
                                            }
                                        >
                                            {
                                                option.label
                                            }
                                        </MenuItem>
                                    )
                                )}
                            </TextField>
                        </Grid>

                        {/* DESCRIPCION */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Descripción"
                                name="descripcion"
                                value={
                                    detalle.descripcion
                                }
                                onChange={
                                    handleChange
                                }
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        {/* LUGAR */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Lugar"
                                name="lugar"
                                value={
                                    detalle.lugar
                                }
                                onChange={
                                    handleChange
                                }
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        {/* FECHA */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="date"
                                name="fecha"
                                value={
                                    detalle.fecha
                                }
                                onChange={
                                    handleChange
                                }
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        {/* BOTON AGREGAR */}
                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={
                                    handleAdd
                                }
                                startIcon={<AddCircleIcon />}
                                sx={{
                                    height: '40px',
                                    fontWeight: 600
                                }}
                            >
                                {indexEdit >= 0 ? 'Actualizar' : 'Agregar'}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* TABLA */}
            {data.length > 0 && (
                <Card>
                    <CardContent>
                        <Typography 
                            variant="subtitle2" 
                            sx={{ mb: 2, fontWeight: 600 }}
                        >
                            Registros ({data.length})
                        </Typography>
                        <TableContainer>
                            <Table 
                                size="small"
                                sx={{
                                    '& thead': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    },
                                    '& tbody tr:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                    }
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Fuente
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Parentesco
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Descripción
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Lugar
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Fecha
                                        </TableCell>
                                        <TableCell 
                                            align="center"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {data.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    transition: 'all 0.3s'
                                                }}
                                            >
                                                <TableCell>
                                                    {
                                                        item.nombreFuente
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.nombreParentesco
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.descripcion
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.lugar
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.fecha
                                                    }
                                                </TableCell>

                                                <TableCell 
                                                    align="center"
                                                >
                                                    <Stack 
                                                        direction="row" 
                                                        spacing={0}
                                                        justifyContent="center"
                                                    >
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                color="primary"
                                                                size="small"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        item,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip title="Eliminar">
                                                            <IconButton
                                                                color="error"
                                                                size="small"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    )}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default DetailFuentes;