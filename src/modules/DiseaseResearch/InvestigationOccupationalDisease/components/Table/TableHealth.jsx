import React, { useEffect, useState } from 'react';
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

export default function TableHealth({ dataModel, disabledControl }) {
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
                                            name="habiCigarrillo"
                                            control={control}
                                            defaultValue={dataModel?.habiCigarrillo}
                                            render={({ field }) => (
                                                <RadioGroup {...field} row onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={disabledControl}>
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
                                        name="habiCigarrilloTiempo"
                                        control={control}
                                        defaultValue={dataModel?.habiCigarrilloTiempo}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Tiempo acumulado (años)"
                                                fullWidth
                                                size="small"
                                                disabled={disabledControl}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || null)}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="habiCigarrilloTabaquismo"
                                        control={control}
                                        defaultValue={dataModel?.habiCigarrilloTabaquismo}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Años de tabaquismo"
                                                fullWidth
                                                size="small"
                                                disabled={disabledControl}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || null)}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="habiCigarrilloCantidad"
                                        control={control}
                                        defaultValue={dataModel?.habiCigarrilloCantidad}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Cantidad (cigarrillos por día)"
                                                fullWidth
                                                size="small"
                                                disabled={disabledControl}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || null)}
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
                                            name="habiAlcoholConsume"
                                            control={control}
                                            defaultValue={dataModel?.habiAlcoholConsume}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                    disabled={disabledControl}
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
                                        defaultValue={dataModel?.habiAlcoholFrecuencia}
                                        name="habiAlcoholFrecuencia"
                                        label="Frecuencia"
                                        options={lsFrecuencia}
                                        disabled={disabledControl}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="habiAlcoholCantidad"
                                        control={control}
                                        defaultValue={dataModel?.habiAlcoholCantidad}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Cantidad"
                                                fullWidth
                                                size="small"
                                                disabled={disabledControl}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || null)}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="habiAlcoholTipoBebida"
                                        control={control}
                                        defaultValue={dataModel?.habiAlcoholTipoBebida}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="standard"
                                                label="Tipo de bebida"
                                                fullWidth
                                                size="small"
                                                disabled={disabledControl}
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
                                            name="habiDeportePractica"
                                            control={control}
                                            defaultValue={dataModel?.habiDeportePractica}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                    disabled={disabledControl}
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
                                        name="habiDeporteFrecuencia"
                                        label="Frecuencia"
                                        options={lsFrecuencia}
                                        defaultValue={dataModel?.habiDeporteFrecuencia}
                                        disabled={disabledControl}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <Controller
                                        name="habiDeporteTiempo"
                                        control={control}
                                        defaultValue={dataModel?.habiDeporteTiempo}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                type="number"
                                                variant="standard"
                                                label="Tiempo (minutos/horas)"
                                                fullWidth
                                                size="small"
                                                disabled={disabledControl}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || null)}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={2.6}>
                                    <InputSelect
                                        name="habiDeporteTipoActividad"
                                        label="Tipo de actividad"
                                        options={lsDeporte}
                                        defaultValue={dataModel?.habiDeporteTipoActividad}
                                        disabled={disabledControl}
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
                                name="habiOtros"
                                control={control}
                                defaultValue={dataModel?.habiOtros}
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
                                        disabled={disabledControl}
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