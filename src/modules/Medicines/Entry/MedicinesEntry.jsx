import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import ControlModal from 'components/controllers/ControlModal';
import { TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { useBoolean } from 'hooks/use-boolean';
import { useState } from 'react';

import * as yup from 'yup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AddMedicinesEntry from './AddMedicinesEntry';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object().shape({
    codigo: yup.string().required(ValidationMessage.Requerido),
    descripcion: yup.string().required(ValidationMessage.Requerido),
    idUnidad: yup.string().required(ValidationMessage.Requerido)
});

const columns = [
    {
        id: 'population',
        label: 'Producto',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'size',
        label: 'Proveedor',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'density',
        label: 'Cantidad',
        minWidth: 170,
        align: 'right'
    }
];

export default function MedicinesEntry() {
    const openModalProduct = useBoolean();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    return (
        <MainCard
            content={false}
            title="Registrar medicamentos de entrantes"
            secondary={
                <AnimateButton>
                    <Button variant="contained" fullWidth onClick={openModalProduct.onTrue}>
                        Agregar producto
                    </Button>
                </AnimateButton>
            }
        >
            <ControlModal
                title="Agregar productos"
                open={openModalProduct.value}
                onClose={openModalProduct.onFalse}
                maxWidth="md"
            >
                <FormProvider {...methods}>
                    <AddMedicinesEntry />
                </FormProvider>
            </ControlModal>

            <TableContainer>
                <PerfectScrollbar style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 380 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PerfectScrollbar>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid item xs={4} md={2}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth /* onClick={handleSubmit(handleClick)} */>
                            {TitleButton.Actualizar}
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={4} md={2}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => navigate("/medicines-entry/list")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </MainCard>
    );
}
