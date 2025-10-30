import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, InputAdornment, TablePagination, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Iconify from 'components/iconify/iconify';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ColorDrummondltd } from 'themes/colors';
import SubCard from 'ui-component/cards/SubCard';
import ExtractingInformation from '../Skeleton/ExtractingInformation';

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

export default function ViewExportedSetail({ lsData = [], onDelete, rows, setLsData }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [search, setSearch] = useState('');

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value)
            setRowsPerPage(parseInt(event?.target.value, 10));

        setPage(0);
    };

    const handleSearch = (event) => {
        const newString = event?.target.value.trim();
        setSearch(newString || '');

        const lowerCaseQuery = newString.toLowerCase();

        const newRows = newString
            ? rows.filter((row) =>
                ['cargo', 'ges', 'descripcionges'].some((property) =>
                    row[property]?.toString().toLowerCase().includes(lowerCaseQuery)
                )
            ) : rows;

        setLsData(newRows);
    };

    return (
        <>
            {lsData.length > 0 ? (
                <SubCard>
                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        <Grid item xs={12}>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleSearch}
                                placeholder="Buscar"
                                value={search}
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700, mb: lsData.length == 0 && 7 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Cargo</TableCell>
                                            <TableCell>GES</TableCell>
                                            <TableCell>Clase de riesgo</TableCell>
                                            <TableCell>Descripción GES</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {stableSort(lsData, getComparator('asc', 'cargo'))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ cursor: 'pointer' }}>
                                                        {!row.existecargo &&
                                                            <Tooltip placement="top" title="El cargo en el Excel no coincide con los registrados. Corrígelo manualmente, asegúrate de usar el nombre en inglés y vuelve a cargar el archivo.">
                                                                <Iconify sx={{ color: ColorDrummondltd.RedDrummond }} width={25} icon="clarity:employee-group-line" />
                                                            </Tooltip>
                                                        }
                                                    </TableCell>
                                                    <TableCell>{row.cargo} - {row.idcargo}</TableCell>
                                                    <TableCell>{row.ges} - {row.idges}</TableCell>
                                                    <TableCell>{row.claseriesgo}</TableCell>
                                                    <TableCell>{row.descripcionges}</TableCell>

                                                    {onDelete &&
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
                                                                <Tooltip title="Eliminar" placement="top" onClick={() => onDelete(row.id)}>
                                                                    <IconButton>
                                                                        <CloseIcon color="error" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </motion.button>
                                                        </TableCell>
                                                    }
                                                </TableRow>
                                            ))
                                        }
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
                        </Grid>
                    </Grid>
                </SubCard>
            ) : <ExtractingInformation />}
        </>
    );
}