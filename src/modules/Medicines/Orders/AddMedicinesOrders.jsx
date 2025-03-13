import { Button, Divider, Grid, IconButton, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import { DefaultValue, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import * as yup from 'yup';
import SearchProduct from '../SearchProduct';

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Iconify from 'components/iconify/iconify';
import { ViewFormat } from 'components/helpers/Format';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import Transitions from 'ui-component/extended/Transitions';
import SubCard from 'ui-component/cards/SubCard';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const validationSchema = yup.object().shape({
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido)
});

export default function AddMedicinesOrders() {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [dataProducto, setDataProducto] = useState(null);
    const [lsProveedor, setLsProveedor] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });

    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        async function getAll() {
            try {
                cleanDate();

                const lsServerProveedor = await GetAllSupplier(0, 0);
                var resultProveedor = lsServerProveedor.data.entities.filter(fil => fil.tipoProv == DefaultValue.PROVEEDOR_MEDICAMENTO).map((item) => ({
                    value: item.codiProv,
                    label: item?.nombProv?.toUpperCase()
                }));
                setLsProveedor(resultProveedor);
            } catch (error) { }
        }

        getAll();
    }, []);

    function cleanDate() {
        setValue("fechaVencimiento", "");
        setValue("fechaCompra", "");
        setValue("fechaLote", "");
    }

    return (
        <SubCard title="Agregar medicamentos">
            <Grid container sx={{ pb: 3 }} spacing={2}>
                <FormProvider {...methods}>
                    <Grid item xs={12}>
                        <SearchProduct captureData={setDataProducto} dataProducto={dataProducto} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputSelect
                            name="idProveedor"
                            label="Proveedor"
                            defaultValue=""
                            options={lsProveedor}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idProveedor}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            name="lote"
                            label="Lote"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.lote}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputDatePicker
                            label="Fecha de lote"
                            name="fechaLote"
                            defaultValue=""
                            bug={errors.fechaLote}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputDatePicker
                            label="Fecha de compra"
                            name="fechaCompra"
                            defaultValue=""
                            bug={errors.fechaCompra}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputDatePicker
                            label="Fecha de vencimiento"
                            name="fechaVencimiento"
                            defaultValue=""
                            bug={errors.fechaVencimiento}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <InputText
                            defaultValue=""
                            type="number"
                            name="cantidad"
                            label="Cantidad"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.cantidad}
                        />
                    </Grid>
                </FormProvider>
            </Grid>

            <SubCard title="Lista de pedidos">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Proveedor</TableCell>
                                        <TableCell>Fecha de compra</TableCell>
                                        <TableCell>Fecha de vencimiento</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Bitácora</TableCell>
                                        <TableCell>Acción</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {stableSort([], getComparator('asc', 'fechaVencimiento'))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <TableCell>
                                                    <Iconify width={20} icon="hugeicons:medicine-02" />
                                                </TableCell>

                                                <TableCell>{row?.nameProveedor}</TableCell>
                                                <TableCell>{ViewFormat(row?.fechaCompra)}</TableCell>
                                                <TableCell>{ViewFormat(row?.fechaVencimiento)}</TableCell>
                                                <TableCell>{row?.cantidad}</TableCell>
                                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                    <ListItemText
                                                        primary={row?.usuarioRegistro}
                                                        secondary={new Date(row?.fechaRegistro).toLocaleString()}
                                                        primaryTypographyProps={{ typography: 'body2' }}
                                                        secondaryTypographyProps={{
                                                            mt: 0.5,
                                                            component: 'span',
                                                            typography: 'caption',
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <Tooltip title="Eliminar" /* onClick={() => handleDelete(row?.id)} */>
                                                                <IconButton color="error" size="small">
                                                                    <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <TablePagination
                            rowsPerPageOptions={[4, 12, 24]}
                            component="div"
                            count={[].length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </SubCard>
        </SubCard>
    );
}