import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Componentes de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Grid,
    Fab,
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
    Modal
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// Import de proyectos
import BodyMedicalAdvice from './ViewMedicalAdvice';
import { FormatDate } from 'components/helpers/Format';
import { Message, TitleButton } from 'components/helpers/Enums';
import { SNACKBAR_OPEN } from 'store/actions';
import MainCard from 'ui-component/cards/MainCard';

import { GetAllAdvice, DeleteAdvice } from 'api/clients/AdviceClient';

// Iconos y masss
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ReactExport from "react-export-excel";
import { IconFileExport } from '@tabler/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        margin: 'auto'
    };
}

// Mesa de Destino
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

/* Llenado de tabla y comparaciones */
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

/* Construcción de la cabecera de la Tabla */
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'ID',
        align: 'center'
    },
    {
        id: 'documento',
        numeric: false,
        label: 'Documento',
        align: 'left'
    },
    {
        id: 'fecha',
        numeric: false,
        label: 'Fecha',
        align: 'left'
    },
    {
        id: 'usuario',
        numeric: false,
        label: 'Usuario',
        align: 'left'
    },
    {
        id: 'motivo',
        numeric: false,
        label: 'Motivo',
        align: 'left'
    },
    {
        id: 'idTipoAtencion',
        numeric: false,
        label: 'Tipo Atencion',
        align: 'left'
    },
    {
        id: 'idEstadoCaso',
        numeric: false,
        label: 'Estado Caso',
        align: 'left'
    }
];

// ==============================|| TABLE HEADER ||============================== //

/* RENDERIZADO DE LA CABECERA */

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

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

/* AQUÍ SE SELECCIONA POR MEDIO DEL CHECK BOX Y HACE EL CONTEO DE SELECIONES...
A FUTURO SE DEBE TOMAR EL ID */

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

// ==============================|| RENDER DE LA LISTA ||============================== //

const ListMedicalAdvice = () => {
    const dispatch = useDispatch();
    const [medicalAdvice, setMedicalAdvice] = useState([]);

    /* ESTADOS PARA LA TABLA, SON PREDETERMINADOS */
    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    /* METODO DONDE SE LLENA LA LISTA Y TOMA DE DATOS */
    async function GetAll() {
        try {
            const lsServer = await GetAllAdvice(0, 0);
            setMedicalAdvice(lsServer.data.entities);
            setRows(lsServer.data.entities);
        } catch (error) {
            console.log(error);
        }
    }

    const [modalStyle] = useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* EVENTO DE BUSCAR */
    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'documento', 'fecha', 'usuario', 'motivo', 'idTipoAtencion', 'idEstadoCaso'];
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
            setMedicalAdvice(newRows);
        } else {
            setMedicalAdvice(rows);
        }
    };

    /* EVENTOS DE ORDENES SOLICITADAS */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /* EVENTO DE SELECT CHECKBOX ALL POR TODOS */
    const handleSelectAllClick = (event) => {

        if (event.target.checked) {
            const newSelectedId = medicalAdvice.map((n) => n.id);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    /* EVENTO DE SELECIONAR EL CHECK BOX */
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

    const [idCheck, setIdCheck] = useState('');

    /* FUNCION PARA ELIMINAR */
    const handleDelete = async () => {
        try {
            const result = await DeleteAdvice(idCheck);
            if (result.status === 200) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${Message.Eliminar}`,
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
            setSelected([]);
            GetAll();
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - medicalAdvice.length) : 0;

    return (
        <MainCard title="Lista de Pacientes" content={false}>
            {/* Aquí colocamos los iconos del grid... Copiar, Imprimir, Filtrar, Añadir */}
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
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <ExcelFile element={
                            <Tooltip title="Exportar">
                                <IconButton size="large">
                                    <IconFileExport />
                                </IconButton>
                            </Tooltip>
                        } filename="Asesoría Médica">
                            <ExcelSheet data={medicalAdvice} name="Asesoría Médica">
                                <ExcelColumn label="Id" value="id" />
                                <ExcelColumn label="Documento" value="documento" />
                                <ExcelColumn label="Fecha" value="fecha" />
                                <ExcelColumn label="Tipo Atención" value="idTipoAtencion" />
                                <ExcelColumn label="Sede" value="idSede" />
                                <ExcelColumn label="Contingencia" value="idContingencia" />
                                <ExcelColumn label="Estado del Caso" value="idEstadoCaso" />
                                <ExcelColumn label="Turno" value="idTurno" />
                                <ExcelColumn label="Día del Turno" value="idDiaTurno" />
                                <ExcelColumn label="Tipo Asesoría" value="idTipoAsesoria" />
                                <ExcelColumn label="Motivo" value="idMotivo" />
                                <ExcelColumn label="Causa" value="idCausa" />
                                <ExcelColumn label="Descripción" value="motivo" />
                                <ExcelColumn label="Recomendaciones" value="recomdaciones" />
                                <ExcelColumn label="Pautas" value="pautas" />
                                <ExcelColumn label="Estado Asesoría" value="idEstadoAsesoria" />
                                <ExcelColumn label="Usuario" value="usuario" />
                                <ExcelColumn label="Fecha Registro" value="fechaRegistro" />
                                <ExcelColumn label="Usuario Modifica" value="usuarioModifica" />
                                <ExcelColumn label="Fecha de Actualización" value="fechaActualizacion" />
                            </ExcelSheet>
                        </ExcelFile>

                        <Tooltip title="Impresión" onClick={() => navigate('/medicaladvice/report/')}>
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>

                        {/* product add & dialog */}
                        <Button variant="contained" size="large" startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => navigate("/medicaladvice/add")}>
                            {TitleButton.Agregar}
                        </Button>

                    </Grid>
                </Grid>
            </CardContent>

            {/* Cabeceras y columnas de la tabla */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={medicalAdvice.length}
                        theme={theme}
                        selected={selected}
                        onClick={handleDelete}
                    />
                    <TableBody>
                        {stableSort(medicalAdvice, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
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
                                        {/* Desde aquí colocamos la llegada de los datos
                                        en cada columna, recordar solo cambiar el nombre y ya */}

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
                                            align="center"
                                        >
                                            {' '}
                                            {row.id}{' '}
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
                                                {' '}
                                                {row.documento}{' '}
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
                                                {' '}
                                                {FormatDate(row.fecha)}{' '}
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
                                                {' '}
                                                {row.usuario}{' '}
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
                                                {' '}
                                                {row.motivo}{' '}
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
                                                {' '}
                                                {row.idTipoAtencion}{' '}
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
                                                {' '}
                                                {row.idEstadoCaso}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Tooltip title="Detalles" onClick={handleOpen}>
                                                <IconButton color="primary" size="large">
                                                    <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Actualizar" onClick={() => navigate(`/medicaladvice/update/${row.id}`)}>
                                                <IconButton size="large">
                                                    <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        {/* AQUI ESTA EL MODAL RENDERIZANDOSE */}
                                        <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            <BodyMedicalAdvice IdEmployee={row.id} modalStyle={modalStyle} handleClose={handleClose} />
                                        </Modal>
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

            {/* Paginación de la Tabla */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={medicalAdvice.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ListMedicalAdvice;