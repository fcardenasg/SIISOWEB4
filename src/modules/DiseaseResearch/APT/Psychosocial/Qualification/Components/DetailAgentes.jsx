import PropTypes from 'prop-types';

import {
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Card,
    CardContent,
    Box,
    Typography,
    Stack
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useState } from 'react';

import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';

import SubCard from 'ui-component/cards/SubCard';

const DetailAgentes = ({
    lsGrupoCondicion,
    lsCondicion,
    lsExposicion,
    lsFrecuencia,
    lsIntensidad,
    lsTipo,
    data,
    setData
}) => {

    const initialState = {

        idGrupoCondicion: null,
        nombreGrupoCondicion: '',

        idCondicion: null,
        nombreCondicion: '',

        exposicion: null,
        nombreExposicion: '',

        frecuencia: null,
        nombreFrecuencia: '',

        inten: null,
        nombreIntensidad: '',

        descripcion: '',

        valoracion: null,

        tipo: null,
        nombreTipo: ''
    };

    const [detalle, setDetalle] =
        useState(initialState);

    const [indexEdit, setIndexEdit] =
        useState(-1);

    const handleAdd = () => {

        if (
            !detalle.idGrupoCondicion ||
            !detalle.idCondicion
        ) {
            return;
        }

        const grupo =
            lsGrupoCondicion.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.idGrupoCondicion)
            );

        const condicion =
            lsCondicion.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.idCondicion)
            );

        const exposicion =
            lsExposicion.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.exposicion)
            );

        const frecuencia =
            lsFrecuencia.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.frecuencia)
            );

        const intensidad =
            lsIntensidad.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.inten)
            );

        const tipo =
            lsTipo.find(
                x =>
                    Number(x.value) ===
                    Number(detalle.tipo)
            );

        const item = {

            idGrupoCondicion:
                detalle.idGrupoCondicion
                    ? Number(detalle.idGrupoCondicion)
                    : null,

            nombreGrupoCondicion:
                grupo?.label || '',

            idCondicion:
                detalle.idCondicion
                    ? Number(detalle.idCondicion)
                    : null,

            nombreCondicion:
                condicion?.label || '',

            exposicion:
                detalle.exposicion
                    ? Number(detalle.exposicion)
                    : null,

            nombreExposicion:
                exposicion?.label || '',

            frecuencia:
                detalle.frecuencia
                    ? Number(detalle.frecuencia)
                    : null,

            nombreFrecuencia:
                frecuencia?.label || '',

            inten:
                detalle.inten
                    ? Number(detalle.inten)
                    : null,

            nombreIntensidad:
                intensidad?.label || '',

            descripcion:
                detalle.descripcion || '',

            valoracion:
                detalle.valoracion
                    ? Number(detalle.valoracion)
                    : null,

            tipo:
                detalle.tipo
                    ? Number(detalle.tipo)
                    : null,

            nombreTipo:
                tipo?.label || ''
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

        setDetalle(initialState);
    };

    const handleDelete = (index) => {

        const update = [...data];

        update.splice(index, 1);

        setData(update);
    };

    const handleEdit = (item, index) => {

        setDetalle({
            ...item
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
                        ⚠️ Detalle de Agentes
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={4}>
                            <InputSelect
                                name="idGrupoCondicionTemp"
                                label="Grupo Condición"
                                options={lsGrupoCondicion}
                                value={detalle.idGrupoCondicion || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        idGrupoCondicion:
                                            e.target.value || null
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <InputSelect
                                name="idCondicionTemp"
                                label="Condición"
                                options={lsCondicion}
                                value={detalle.idCondicion || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        idCondicion:
                                            e.target.value || null
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={1.3}>
                            <InputSelect
                                name="exposicionTemp"
                                label="Exposición"
                                options={lsExposicion}
                                value={detalle.exposicion || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        exposicion:
                                            e.target.value || null
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={1.3}>
                            <InputSelect
                                name="frecuenciaTemp"
                                label="Frecuencia"
                                options={lsFrecuencia}
                                value={detalle.frecuencia || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        frecuencia:
                                            e.target.value || null
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={1.3}>
                            <InputSelect
                                name="intenTemp"
                                label="Intensidad"
                                options={lsIntensidad}
                                value={detalle.inten || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        inten:
                                            e.target.value || null
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <InputText
                                name="descripcionTemp"
                                label="Descripción"
                                value={detalle.descripcion}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        descripcion:
                                            e.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <InputText
                                name="valoracionTemp"
                                label="Valoración"
                                type="number"
                                value={detalle.valoracion || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        valoracion:
                                            e.target.value === ''
                                                ? null
                                                : Number(e.target.value)
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InputSelect
                                name="tipoTemp"
                                label="Tipo"
                                options={lsTipo}
                                value={detalle.tipo || ''}
                                onChange={(e) =>
                                    setDetalle({
                                        ...detalle,
                                        tipo:
                                            e.target.value || null
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleAdd}
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
                                            Grupo
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Condición
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Exposición
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Frecuencia
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Intensidad
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Descripción
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Valoración
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>
                                            Tipo
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
                                    {data.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <TableCell>
                                                {item.nombreGrupoCondicion}
                                            </TableCell>
                                            <TableCell>
                                                {item.nombreCondicion}
                                            </TableCell>
                                            <TableCell>
                                                {item.nombreExposicion}
                                            </TableCell>
                                            <TableCell>
                                                {item.nombreFrecuencia}
                                            </TableCell>
                                            <TableCell>
                                                {item.nombreIntensidad}
                                            </TableCell>
                                            <TableCell>
                                                {item.descripcion}
                                            </TableCell>
                                            <TableCell>
                                                {item.valoracion}
                                            </TableCell>
                                            <TableCell>
                                                {item.nombreTipo}
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
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default DetailAgentes;