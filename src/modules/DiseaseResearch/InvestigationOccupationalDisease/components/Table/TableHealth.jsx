import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
    Table,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Paper,
    Typography,
    Grid,
    Stack,
    TextField,
    FormControlLabel,
    RadioGroup,
    Radio,
    Divider,
} from '@mui/material';
import InputSelect from 'components/input/InputSelect';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { UpperFirstChar } from 'components/helpers/Format';

const EstiloTitulo = {
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "#333",
};

const CeldaSeccion = ({ title }) => (
    <TableCell
        sx={{
            background: "#f7f7f7",
            width: "90px",
            borderRight: "1px solid #e0e0e0",
            verticalAlign: 'top',
            padding: '16px 8px',
        }}
    >
        <Typography sx={EstiloTitulo}>{title}</Typography>
    </TableCell>
);

export default function TableHealth() {
    const idExfumador = 15137;
    const { control } = useFormContext();
    const [lsOpcionHabito, setLsOpcionHabito] = useState([]);
    const [lsFrecuencia, setLsFrecuencia] = useState([]);
    const [lsDeporte, setLsDeporte] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerHabito = await GetByTipoCatalogoCombo(CodCatalogo.OPCION_HABITO_INVESTIGACION);
            setLsOpcionHabito(lsServerHabito.data);

            const lsServerFrecuencia = await GetByTipoCatalogoCombo(CodCatalogo.HCO_FRECUENCIAS);
            setLsFrecuencia(lsServerFrecuencia.data);

            const lsServerDeporte = await GetByTipoCatalogoCombo(CodCatalogo.HC_DEPORTE);
            setLsDeporte(lsServerDeporte.data);
        }

        getData();
    }, []);

    return (
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <CeldaSeccion title="Cigarrillo" />
                        <TableCell colSpan={4}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} md={6} lg={4.2}>
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Typography>Fuma:</Typography>
                                        <Controller
                                            name="HabiCigarrillo"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <RadioGroup {...field} row onChange={(e) => field.onChange(parseInt(e.target.value))}>
                                                    {lsOpcionHabito.map(option => (
                                                        <FormControlLabel
                                                            key={option.value}
                                                            value={option.value}
                                                            control={<Radio size="small" />}
                                                            label={UpperFirstChar(option.label)}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            )}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="HabiCigarrilloTiempo"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Tiempo acumulado (años)"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="HabiCigarrilloTabaquismo"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Años de tabaquismo"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="HabiCigarrilloCantidad"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Cantidad (cigarrillos por día)"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>

                    <Divider />

                    <TableRow>
                        <CeldaSeccion title="Alcohol" />
                        <TableCell colSpan={4}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6} lg={4.2}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Typography>Consumo:</Typography>
                                        <Controller
                                            name="HabiAlcoholConsume"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                >
                                                    {lsOpcionHabito.filter(option => option.value !== idExfumador).map(option => (
                                                        <FormControlLabel
                                                            key={option.value}
                                                            value={option.value}
                                                            control={<Radio size="small" />}
                                                            label={UpperFirstChar(option.label)}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            )}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <InputSelect
                                        name="HabiAlcoholFrecuencia"
                                        label="Frecuencia"
                                        options={lsFrecuencia}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="HabiAlcoholCantidad"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Cantidad"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="HabiAlcoholTipoBebida"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="standard"
                                                label="Tipo de bebida"
                                                fullWidth
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>

                    <Divider />

                    <TableRow>
                        <CeldaSeccion title="Deporte" />
                        <TableCell colSpan={4}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6} lg={4.2}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Typography>Práctica:</Typography>
                                        <Controller
                                            name="HabiDeportePractica"
                                            control={control}
                                            defaultValue={0}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                >
                                                    {lsOpcionHabito.filter(option => option.value !== idExfumador).map(option => (
                                                        <FormControlLabel
                                                            key={option.value}
                                                            value={option.value}
                                                            control={<Radio size="small" />}
                                                            label={UpperFirstChar(option.label)}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            )}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <InputSelect
                                        name="HabiDeporteFrecuencia"
                                        label="Frecuencia"
                                        options={lsFrecuencia}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="HabiDeporteTiempo"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Tiempo (minutos/horas)"
                                                fullWidth
                                                size="small"
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <InputSelect
                                        name="HabiDeporteTipoActividad"
                                        label="Tipo de actividad"
                                        options={lsDeporte}
                                    />
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>

                    <Divider />

                    <TableRow>
                        <CeldaSeccion title="Otros" />
                        <TableCell colSpan={4}>
                            <Controller
                                name="HabiOtros"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant="standard"
                                        fullWidth
                                        label="Descripción"
                                        size="small"
                                        multiline
                                        minRows={1}
                                        maxRows={3}
                                    />
                                )}
                            />
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table >
        </TableContainer >
    );
}