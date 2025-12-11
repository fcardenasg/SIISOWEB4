import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    CardContent,
    Checkbox,
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
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { IconFileExport } from '@tabler/icons';
import { DeleteMedicines } from 'api/clients/MedicinesClient';

import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import { AccionMenu, Modulo, TitleButton } from 'components/helpers/Enums';
import swal from 'sweetalert';
import MainCard from 'ui-component/cards/MainCard';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { GetAllMedicamentosPedido } from 'api/clients/MedicamentosPedidoClient';
import Cargando from 'components/loading/Cargando';
import useAuth from 'hooks/useAuth';
import ValidateAction from 'components/ValidateAction/ValidateAction';

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
        id: 'numPedido',
        numeric: false,
        label: 'N° pedido',
        align: 'left'
    },
    {
        id: 'nameProveedor',
        numeric: false,
        label: 'Proveedor',
        align: 'left'
    },
    {
        id: 'usuarioRegistro',
        numeric: false,
        label: 'Bitácora',
        align: 'left'
    }
];

function EnhancedTableHead({ onClick, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>

                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={8}>
                        <EnhancedTableToolbar numSelected={selected.length} onClick={onClick} />
                    </TableCell>
                )}

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
    selected: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = ({ numSelected, onClick }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} {TitleButton.Seleccionadas}
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">

            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <ValidateAction idAccion={AccionMenu.eliminar} idModulo={Modulo.Pedidos}>
                <Tooltip title={TitleButton.Eliminar} onClick={onClick}>
                    <IconButton size="large">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </ValidateAction>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

const ListMedicinesOrders = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [lsMedicamentos, setLsMedicamentos] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [idCheck, setIdCheck] = useState('');

    const theme = useTheme();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('fechaRegistro');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    async function getAll() {
        try {
            const lsServer = await GetAllMedicamentosPedido(user?.idsede);
            if (lsServer.status === 200) {
                setLsMedicamentos(lsServer.data);
                setRows(lsServer.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['codigo', 'descripcion', 'cantidad'];
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
            setLsMedicamentos(newRows);
        } else {
            setLsMedicamentos(rows);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {

        if (event.target.checked) {
            const newSelectedId = lsMedicamentos.map((n) => n.id);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        setIdCheck(id);

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const handleDelete = async () => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteMedicines(idCheck);
                    if (result.status === 200) {
                        setOpenDelete(true);
                    }
                    setSearch('');
                    setSelected([]);
                    getAll();
                } else
                    setSelected([]);
            });
        } catch (error) {

        }
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsMedicamentos.length) : 0;

    return (
        <MainCard title={`Lista de pedidos - Sede: ${user?.namesede}`} content={false}>
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4} md={6} lg={8.5}>
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

                    <Grid item xs={12} sm={8} md={6} lg={3.5} sx={{ textAlign: 'right' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Tooltip title="Exportar" /* onClick={() => setOpenModal(true)} */>
                                    <IconButton size="large">
                                        <IconFileExport />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item xs={5}>
                                <ValidateAction idAccion={AccionMenu.agregar} idModulo={Modulo.Pedidos}>
                                    <Button variant="contained" size="large" startIcon={<AddCircleOutlineOutlinedIcon />}
                                        onClick={() => navigate("/medicines-orders/add")}>
                                        {TitleButton.Agregar}
                                    </Button>
                                </ValidateAction>
                            </Grid>

                            <Grid item xs={5}>
                                <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate("/medicines/menu")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer>
                {lsMedicamentos.length === 0 ? <Cargando size={140} /> :
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={lsMedicamentos.length}
                            theme={theme}
                            selected={selected}
                            onClick={handleDelete}
                        />

                        <TableBody>
                            {stableSort(lsMedicamentos, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {

                                    if (typeof row === 'string') return null;

                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                onClick={(event) => handleClick(event, row.id)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                >
                                                    {row.numPedido}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                onClick={(event) => handleClick(event, row.id)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                >
                                                    {row.nameProveedor}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                onClick={(event) => handleClick(event, row.id)}
                                                sx={{ cursor: 'pointer' }}
                                            >
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

                                            <TableCell align="center" sx={{ pr: 3 }}>
                                                <ValidateAction idAccion={AccionMenu.actualizar} idModulo={Modulo.Pedidos}>
                                                    <Tooltip title="Actualizar" onClick={() => navigate(`/medicines-orders/update/${row.id}`)}>
                                                        <IconButton size="large">
                                                            <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ValidateAction>
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
                count={lsMedicamentos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ListMedicinesOrders;