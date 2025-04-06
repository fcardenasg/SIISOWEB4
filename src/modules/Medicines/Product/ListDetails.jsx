import { Fragment, useEffect, useState } from 'react';

import {
    Grid,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

import { GetByIdMedicinesDetalle } from 'api/clients/MedicinesClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { ViewFormat } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
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

const ListDetails = ({ idMedicamento }) => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [lsDataMedical, setLsDataMedical] = useState([]);

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        async function getAllListParaclinicos() {
            try {
                const lsServer = await GetByIdMedicinesDetalle(idMedicamento);
                if (lsServer.data.exito) {
                    setLsDataMedical(lsServer.data.datos);
                } else {
                    setOpenError(true);
                    setErrorMessage(lsServer.data.mensaje);
                }
            } catch (error) { }
        }

        getAllListParaclinicos();
    }, [idMedicamento]);

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <SubCard title={<Typography variant='h4'>Entrada de medicamento</Typography>}>
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
                                    {stableSort(lsDataMedical, getComparator('asc', 'fechaVencimiento'))
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
                            count={lsDataMedical.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </SubCard>
        </Fragment>
    );
};

export default ListDetails;