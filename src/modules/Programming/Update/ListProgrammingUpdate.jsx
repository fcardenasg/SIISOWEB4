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
    Button,
    useMediaQuery
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as yup from "yup";
import { visuallyHidden } from '@mui/utils';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { ViewFormat } from 'components/helpers/Format';
import { TitleButton, DefaultValue, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import { GetAllAtendidos, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';

import SearchIcon from '@mui/icons-material/Search';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Cargando from 'components/loading/Cargando';
import useAuth from 'hooks/useAuth';
import config from 'config';
import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { yupResolver } from '@hookform/resolvers/yup';

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
        id: 'nameTipoAtencion',
        numeric: false,
        label: 'Tipo Atención',
        align: 'left'
    },
    {
        id: 'nameAtencion',
        numeric: false,
        label: 'Atención',
        align: 'left'
    },
    {
        id: 'nameSedeAtencion',
        numeric: false,
        label: 'Sede',
        align: 'left'
    },
    {
        id: 'fecha',
        numeric: false,
        label: 'Fecha Cierre',
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
                Nutrición
            </Typography>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onClick: PropTypes.func
};


const lsEstadoPaciente = [
    { value: DefaultValue.ATENCION_PENDIENTE_ATENDIDO, label: "PENDIENTE POR ATENCIÓN" },
    { value: DefaultValue.ATENCION_ESTASIENDOATENDIDO, label: "ESTÁ SIENDO ATENDIDO" }
]

const validationSchema = yup.object().shape({
    idEstado: yup.string().required(ValidationMessage.Requerido),
});

const ListProgrammingUpdate = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsAttention, setLsAttention] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [idAtencion, setIdAtencion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('fecha');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServer = await GetAllAtendidos(user?.nameuser);
            setLsAttention(lsServer.data);
            setRows(lsServer.data);
        } catch (error) { }
    }

    const handleUpdateAttentionOpen = async (datos) => {
        try {
            const DataToUpdate = {
                id: idAtencion,
                estadoPac: datos.idEstado,
                usuario: user?.nameuser
            }

            const lsServer = await UpdateEstadoRegistroAtencion(DataToUpdate);

            if (lsServer.status === 200) {
                getAll();
                setOpenUpdate(true);
                setOpenModal(false);
            }
        } catch (err) {
            setOpenError(true);
            setErrorMessage("Error: No se pudo actualizar el estado");
        }
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

                const properties = ['documento', 'nameEmpleado', 'nameTipoAtencion', 'nameAtencion'];
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
            setLsAttention(newRows);
        } else {
            setLsAttention(rows);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = lsAttention.map((n) => n.id);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
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

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsAttention.length) : 0;

    return (
        <MainCard title="Lista de Programaciones Atendidas" content={false}>
            <MessageSuccess message="Estado cambiado con éxito" open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="Cambiar Estado De Atención"
                open={openModal}
                onClose={() => setOpenModal(false)}
                maxWidth="xs"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idEstado"
                                label="Seleccione el nuevo estado"
                                defaultValue=""
                                options={lsEstadoPaciente}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idEstado}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleUpdateAttentionOpen)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </ControlModal>

            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={8}>
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

                    <Grid item xs={12} sm={6} lg={2} sx={{ textAlign: 'right' }}>
                        <AnimateButton>
                            <Button fullWidth variant="outlined" size="large" startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(config.defaultPath)}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={2} sx={{ textAlign: 'right' }}>
                        <AnimateButton>
                            <Button fullWidth variant="contained" size="large" startIcon={<ArrowBackIcon />}
                                onClick={() => navigate("/programming/list")}>
                                {TitleButton.Programacion}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer>
                {/* AQUÍ SE HACE PRELOAD */}
                {lsAttention.length === 0 ? <Cargando size={220} myy={6} /> :
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={lsAttention.length}
                            theme={theme}
                            selected={selected}
                        />
                        <TableBody>
                            {stableSort(lsAttention, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {

                                    if (typeof row === 'string') return null;

                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="radio" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
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
                                                    {row.documento}
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
                                                    {row.nameEmpleado}
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
                                                    {row.nameTipoAtencion}
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
                                                    {row.nameAtencion}
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
                                                    {row.nameSedeAtencion}
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
                                                    {ViewFormat(row.fecha)}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="center" sx={{ pr: 3 }}>
                                                <Tooltip title="Editar" onClick={() => { setOpenModal(true); setIdAtencion(row.id); }}>
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
                }
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={lsAttention.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ListProgrammingUpdate;