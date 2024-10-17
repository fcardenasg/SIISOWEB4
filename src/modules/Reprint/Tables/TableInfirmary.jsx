import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    Button,
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
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { TitleButton, Message } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllNoteInfirmary, GetByIdNoteInfirmary } from 'api/clients/NoteInfirmaryClient';
import { ViewFormat } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { generateReportNursing } from 'modules/Programming/Attention/Report/Nursing';
import config from 'config';
import Cargando from 'components/loading/Cargando';

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
        id: 'id',
        numeric: false,
        label: 'Id',
        align: 'left'
    },
    {
        id: 'documento',
        numeric: false,
        label: 'Documento',
        align: 'left'
    },
    {
        id: 'nameEmpleado',
        numeric: false,
        label: 'Nombre',
        align: 'left'
    },
    {
        id: 'nameAtencion',
        numeric: false,
        label: 'Atención',
        align: 'left'
    },
    {
        id: 'fecha',
        numeric: false,
        label: 'Fecha',
        align: 'left'
    },
    {
        id: 'usuarioRegistro',
        numeric: false,
        label: 'Usuario registro',
        align: 'left'
    },
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
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            Acción
                        </Typography>
                    </TableCell>
                )}
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

const TableInfirmary = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [lsNoteInfirmary, setLsNoteInfirmary] = useState([]);
    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const theme = useTheme();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('fecha');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetAllNoteInfirmary();
                setLsNoteInfirmary(lsServer.data);
                setRows(lsServer.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClickReport = async (id) => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdNoteInfirmary(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReportNursing(lsDataReport.data, lsDataUser.data, user.namesede);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'documento', 'nameEmpleado', 'nameAtencion', 'fecha'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property]?.toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setLsNoteInfirmary(newRows);
        } else {
            setLsNoteInfirmary(rows);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsNoteInfirmary.length) : 0;

    return (
        <Fragment>
            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => { setOpenReport(false); setDataPDF(null) }}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
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

                    <Grid item xs={1}>
                        <AnimateButton>
                            <Button onClick={() => navigate(config.defaultPath)} variant="contained">
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer>
                {lsNoteInfirmary.length === 0 ? <Cargando size={220} myy={6} /> :
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={lsNoteInfirmary.length}
                            theme={theme}
                            selected={selected}
                        />
                        <TableBody>
                            {stableSort(lsNoteInfirmary, getComparator(order, orderBy))
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
                                                align="left"
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                >
                                                    {row.id}
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
                                                    {row.documento}
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
                                                    {row.nameEmpleado}
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
                                                    {row.usuarioRegistro}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="center" sx={{ pr: 3 }}>
                                                <Tooltip title="Imprimir" onClick={() => handleClickReport(row.id)}>
                                                    <IconButton size="large">
                                                        <PrintIcon color="info" sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>
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
                }
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={lsNoteInfirmary.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Fragment>
    );
};

export default TableInfirmary;