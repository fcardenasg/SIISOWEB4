import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import ControlModal from 'components/controllers/ControlModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { ViewFormat } from 'components/helpers/Format';
import { GetAllByDocumento } from 'api/clients/OccupationalExaminationClient';
import { ColorDrummondltd } from 'themes/colors';

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

const headCells = [
    {
        id: 'fecha',
        numeric: false,
        label: 'Fecha',
        align: 'left'
    },
    {
        id: 'nameAtencion',
        numeric: false,
        label: 'Motivo',
        align: 'left'
    },
    {
        id: 'taSentadoEF',
        numeric: false,
        label: 'TA Sentado',
        align: 'left'
    },
    {
        id: 'taAcostadoEF',
        numeric: false,
        label: 'TA Acostado',
        align: 'left'
    },
    {
        id: 'pesoEF',
        numeric: false,
        label: 'Peso',
        align: 'left'
    },
    {
        id: 'tallaEF',
        numeric: false,
        label: 'Talla',
        align: 'left'
    },
    {
        id: 'imcef',
        numeric: false,
        label: 'IMC',
        align: 'left'
    },
    {
        id: 'clasificacionEF',
        numeric: false,
        label: 'Clasificación',
        align: 'left'
    }
];

function EnhancedTableHead({ order, orderBy, numSelected, onRequestSort, theme }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const ListHistoryAntecedente = ({ documento = '' }) => {
    const [lsExamemesPara, setLsExamenesPara] = useState([]);
    const [openViewPdf, setOpenViewPdf] = useState(false);
    const [dataPdf, setDataPdf] = useState('');

    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('fecha');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetAllByDocumento(0, 0, documento);

                if (lsServer.status === 200) {
                    setLsExamenesPara(lsServer.data.entities);
                    setRows(lsServer.data.entities);
                }
            } catch (error) { }
        }

        getAll();
    }, [documento])

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['fecha', 'nameAtencion', 'taSentadoEF', 'taAcostadoEF', 'pesoEF',
                    'tallaEF', 'imcef', 'clasificacionEF'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setLsExamenesPara(newRows);
        } else {
            setLsExamenesPara(rows);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsExamemesPara.length) : 0;

    return (
        <Fragment>
            <ControlModal
                title="VISTA DE EXAMEN"
                open={openViewPdf}
                onClose={() => setOpenViewPdf(false)}
                maxWidth="xl"
            >
                <Typography align='center'>
                    {dataPdf && (
                        <object type="application/pdf"
                            data={dataPdf}
                            width="1400"
                            height="510"
                        />
                    )}
                </Typography>
            </ControlModal>

            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                </Grid>
            </CardContent>

            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={lsExamemesPara.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(lsExamemesPara, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                if (typeof row === 'string') return null;

                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {ViewFormat(row.fecha)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.nameAtencion}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.taSentadoEF}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.taAcostadoEF}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.pesoEF}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.tallaEF}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.imcef}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{
                                                cursor: 'pointer', bgcolor: row.clasificacionEF === 'BAJO DE PESO' ? ColorDrummondltd.BlueDrummond :
                                                    row.clasificacionEF === 'NORMAL' ? ColorDrummondltd.GreenDrummond :
                                                        row.clasificacionEF === 'SOBREPESO' ? ColorDrummondltd.YellowDrummond :
                                                            row.clasificacionEF === 'OBESIDAD GRADO I' ? ColorDrummondltd.RedDrummond :
                                                                row.clasificacionEF === 'OBESIDAD GRADO II' ? ColorDrummondltd.RedDrummond :
                                                                    row.clasificacionEF === 'OBESIDAD GRADO III' ? ColorDrummondltd.RedDrummond :
                                                                        ColorDrummondltd.GrayDrummond
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.clasificacionEF}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={lsExamemesPara.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Fragment>
    );
};

export default ListHistoryAntecedente;