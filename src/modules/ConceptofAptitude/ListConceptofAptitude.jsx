import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ControlModal from 'components/controllers/ControlModal';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
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
    Toolbar,
    Tooltip,
    Typography,
    Button
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from 'sweetalert';
import { visuallyHidden } from '@mui/utils';
import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import { ViewFormat } from 'components/helpers/Format';
import { TitleButton, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import { GetAllConceptofAptitude, DeleteConceptofAptitude } from 'api/clients/ConceptofAptitudeClient';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ReactExport from "react-export-excel";
import { IconFileExport } from '@tabler/icons';

import config from 'config';
import useAuth from 'hooks/useAuth';
import ViewPDF from 'components/components/ViewPDF';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
        id: 'documento',
        numeric: false,
        label: 'Documento',
        align: 'left'
    },
    {
        id: 'nameEmpleado',
        numeric: false,
        label: 'Nombres',
        align: 'left'
    },
    {
        id: 'nameConcepto',
        numeric: false,
        label: 'Tipo Concepto',
        align: 'left'
    },
    {
        id: 'nameConceptoActitud',
        numeric: false,
        label: 'Concepto Aptitud / Altura',
        align: 'left'
    },
    {
        id: 'fecha',
        numeric: false,
        label: 'Fecha',
        align: 'left'
    },
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
                Nutrición
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title={TitleButton.Eliminar} onClick={onClick}>
                <IconButton size="large">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

const ListConceptofAptitude = () => {
    const navigate = useNavigate();
    const [idCheck, setIdCheck] = useState(0);
    const [lsOrderEPP, setLsOrderEPP] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    const theme = useTheme();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('fecha');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

    async function getAll() {
        try {
            const lsServer = await GetAllConceptofAptitude(0, 0);
            setLsOrderEPP(lsServer.data.entities);
            setRows(lsServer.data.entities);
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

                const properties = ['documento', 'nameEmpleado', 'nameConcepto', 'nameConceptoActitud', 'fecha'];
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
            setLsOrderEPP(newRows);
        } else {
            setLsOrderEPP(rows);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = lsOrderEPP.map((n) => n.idTrabajoenAltura);
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
                    const result = await DeleteConceptofAptitude(idCheck);

                    if (result.status === 200) {
                        setOpenDelete(true);
                        setSelected([]);
                        setIdCheck(0);
                        getAll();
                    }
                } else
                    setSelected([]);
            });
        } catch (error) { }
    }

    const handleClose = () => {
        setOpenReport(false);
        setSelected([]);
        setIdCheck('');
        setDataPDF(null);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsOrderEPP.length) : 0;

    return (
        <MainCard title="Lista De Concepto De Aptitud" content={false}>
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={handleClose}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
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
                    <Grid item xs={12} sm={6} lg={3.5} sx={{ textAlign: 'right' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <ExcelFile element={
                                    <Tooltip title="Exportar">
                                        <IconButton size="large">
                                            <IconFileExport />
                                        </IconButton>
                                    </Tooltip>
                                } filename="LISTA DE CONCEPTOS">
                                    <ExcelSheet data={lsOrderEPP} name="ConceptofAptitude">
                                        <ExcelColumn label="Id" value="idTrabajoenAltura" />
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nameEmpleado" />
                                        <ExcelColumn label="Tipo Concepto" value="nameConcepto" />
                                        <ExcelColumn label="Concepto Aptitud" value="nameConceptoActitud" />
                                        <ExcelColumn label="Usuario que registra" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha de registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                        <ExcelColumn label="Usuario que modifica" value="usuarioModifico" />
                                        <ExcelColumn label="Fecha que modifica" value={(fe) => ViewFormat(fe.fechaModifico)} />
                                    </ExcelSheet>
                                </ExcelFile>
                            </Grid>

                            <Grid item xs={5}>
                                <Button variant="contained" size="large" startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => navigate("/conceptofaptitude/add")}>
                                    {TitleButton.Agregar}
                                </Button>
                            </Grid>

                            <Grid item xs={5}>
                                <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate(config.defaultPath)}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={lsOrderEPP.length}
                        theme={theme}
                        selected={selected}
                        onClick={handleDelete}
                    />
                    <TableBody>
                        {stableSort(lsOrderEPP, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {

                                if (typeof row === 'string') return null;

                                const isItemSelected = isSelected(row.idTrabajoenAltura);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="radio" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.idTrabajoenAltura)}>
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
                                            onClick={(event) => handleClick(event, row.idTrabajoenAltura)}
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
                                            onClick={(event) => handleClick(event, row.idTrabajoenAltura)}
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
                                            onClick={(event) => handleClick(event, row.idTrabajoenAltura)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.nameConcepto}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.idTrabajoenAltura)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.nameConceptoActitud}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.idTrabajoenAltura)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {ViewFormat(row.fecha)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Tooltip title="Actualizar" onClick={() => navigate(`/conceptofaptitude/update/${row.idTrabajoenAltura}`)}>
                                                <IconButton size="large">
                                                    <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
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
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={lsOrderEPP.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ListConceptofAptitude;