import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItemText, TablePagination, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { EmptyState } from '../../methods';

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

const buttonVariants = {
    hover: {
        rotate: 90,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.9,
        transition: { duration: 0.2 },
    },
};

export default function DetailAseInv({ lsData = [], onDelete }) {
    const hasRecords = lsData && lsData.length > 0;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value)
            setRowsPerPage(parseInt(event?.target.value, 10));

        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Asesor ARL</TableCell>
                            <TableCell>Ítem a investigar</TableCell>
                            <TableCell>Bitácora</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {!hasRecords ? (
                            <TableRow
                                key="empty-row"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <TableCell colSpan={4} sx={{ borderBottom: 0 }}>
                                    <EmptyState
                                        title="No hay registros"
                                        description="Aún no hay registros cargados o agregados a la lista de ítem a investigar."
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            stableSort(lsData, getComparator('asc', 'nameAsesorARL', 'nameItemInvestigacion', 'bitacora'))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ textTransform: 'capitalize' }}>{row?.nameAsesorARL?.toLowerCase()}</TableCell>
                                        <TableCell>
                                            {row?.listItemInvestigacion?.map((item, index) => (
                                                <Typography key={index} variant="caption" display="block">
                                                    {item.value}. {item.label}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <ListItemText
                                                primary={row?.usuarioRegistro?.toUpperCase()}
                                                secondary={new Date(row?.fechaRegistro).toLocaleString()}
                                                primaryTypographyProps={{ typography: 'caption' }}
                                                secondaryTypographyProps={{
                                                    mt: 0.5,
                                                    component: 'span',
                                                    typography: 'caption',
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <motion.button
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                style={{
                                                    border: 'none',
                                                    background: 'transparent',
                                                    cursor: 'pointer',
                                                    outline: 'none',
                                                }}
                                            >
                                                <Tooltip disableInteractive title="Eliminar" placement="top" onClick={() => onDelete(row)}>
                                                    <IconButton>
                                                        <CloseIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </motion.button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) => (
                    `${from} - ${to} de ${count !== -1 ? count : `más de ${lsData.length}`}`
                )}
                rowsPerPageOptions={[4, 8, 12]}
                component="div"
                count={lsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}