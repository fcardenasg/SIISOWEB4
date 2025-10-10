import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    ListItemText,
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
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { GetAllHistoryDrunkenness, GetCreateReportHistoryDrunkenness } from 'api/clients/HistoryDrunkenness';
import FullScreenModal from 'components/controllers/FullScreenModal';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import { TitleButton } from 'components/helpers/Enums';
import { UpperFirstChar } from 'components/helpers/Format';
import Cargando from 'components/loading/Cargando';
import config from 'config';
import { useBoolean } from 'hooks/use-boolean';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';

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
        id: 'nombreEmpleado',
        numeric: false,
        label: 'Nombre',
        align: 'left'
    },
    {
        id: 'fechaRegistro',
        numeric: false,
        label: 'Bitácora',
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

const TableHistoryDrunkenness = () => {
    const navigate = useNavigate();
    const confirmPrint = useBoolean(false);

    const [lsNoteInfirmary, setLsHistoryDrunkenness] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    const theme = useTheme();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('fechaRegistro');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetAllHistoryDrunkenness();
                if (lsServer.data.exito) {
                    setLsHistoryDrunkenness(lsServer.data.datos);
                    setRows(lsServer.data.datos);
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClickReport = async (idHistoriaEmbriaguez, documento, printOrDownload = true) => {
        try {
            const result = await GetCreateReportHistoryDrunkenness(idHistoriaEmbriaguez);
            if (!result.data.exito) {
                toast.error(result.data.mensaje);
                return;
            }

            const urlFile = result.data.datos;

            if (printOrDownload) {
                confirmPrint.onTrue();
                setDataPDF(urlFile);
            } else {
                const base64Data = urlFile.split(',')[1];
                DownloadFile(`${idHistoriaEmbriaguez}${documento}. Historia de embriaguez.pdf`, base64Data);
                toast.success("Archivo descargado correctamente");
            }
        } catch (error) {
            toast.error(error.message || "Error al generar el reporte");
        }
    }

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'documento', 'nombreEmpleado', 'usuarioRegistro', 'fechaRegistro'];
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
            setLsHistoryDrunkenness(newRows);
        } else {
            setLsHistoryDrunkenness(rows);
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
            {confirmPrint.value &&
                <FullScreenModal onClose={confirmPrint.onFalse}>
                    <object type="application/pdf" data={dataPDF} width="100%" height="100%" />
                </FullScreenModal>
            }

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
                                                    {row.nombreEmpleado}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <ListItemText
                                                    primary={UpperFirstChar(row?.usuarioRegistro)}
                                                    secondary={new Date(row?.fechaRegistro).toLocaleString()}
                                                    primaryTypographyProps={{ typography: 'caption' }}
                                                    secondaryTypographyProps={{
                                                        mt: 0.5,
                                                        component: 'span',
                                                        typography: 'caption',
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell align="center" sx={{ pr: 3 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6} lg={3}>
                                                        <Tooltip title="Imprimir" onClick={() => handleClickReport(row.id, row.documento)}>
                                                            <IconButton size="large">
                                                                <PrintIcon color="primary" sx={{ fontSize: '1.3rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>

                                                    <Grid item xs={12} md={6} lg={3}>
                                                        <Tooltip title="Descargar" onClick={() => handleClickReport(row.id, row.documento, false)}>
                                                            <IconButton size="large">
                                                                <DownloadIcon color="primary" sx={{ fontSize: '1.3rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
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

export default TableHistoryDrunkenness;