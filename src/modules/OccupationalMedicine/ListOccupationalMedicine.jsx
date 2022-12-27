import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { visuallyHidden } from '@mui/utils';
import { IconFileExport } from '@tabler/icons';

import swal from 'sweetalert';
import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import { DeleteOccupationalMedicine, GetAllOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import { TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ReactExport from "react-export-excel";

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
        id: 'id',
        numeric: false,
        label: 'ID',
        align: 'center'
    },
    {
        id: 'cedula',
        numeric: false,
        label: 'Cédula',
        align: 'left'
    },
    {
        id: 'resumenCaso',
        numeric: false,
        label: 'Resumen del Caso',
        align: 'left'
    },
    {
        id: 'codDx',
        numeric: false,
        label: 'Dx',
        align: 'left'
    },
    {
        id: 'usuario',
        numeric: false,
        label: 'Usuario',
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

const ListOccupationalMedicine = () => {
    const navigate = useNavigate();
    const [idCheck, setIdCheck] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const [occupationalMedicine, setOccupationalMedicine] = useState([]);

    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    async function GetAll() {
        try {
            const lsServer = await GetAllOccupationalMedicine(0, 0);
            setOccupationalMedicine(lsServer.data.entities);
            setRows(lsServer.data.entities);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'cedula', 'resumenCaso', 'codDx', 'usuario'];
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
            setOccupationalMedicine(newRows);
        } else {
            setOccupationalMedicine(rows);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {

        if (event.target.checked) {
            const newSelectedId = occupationalMedicine.map((n) => n.id);
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
                    const result = await DeleteOccupationalMedicine(idCheck);
                    if (result.status === 200) {
                        setOpenDelete(true);
                    }
                    setSelected([]);
                    GetAll();
                } else
                    setSelected([]);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - occupationalMedicine.length) : 0;

    return (
        <MainCard title="LISTA DE MEDICINA LABORAL" content={false}>
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
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
                    <Grid item xs={12} sm={6} lg={4} sx={{ textAlign: 'right' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <ExcelFile element={
                                    <Tooltip title="Exportar">
                                        <IconButton size="large">
                                            <IconFileExport />
                                        </IconButton>
                                    </Tooltip>
                                } filename="Medicina Laboral">
                                    <ExcelSheet data={occupationalMedicine} name="Medicina Laboral">
                                        <ExcelColumn label="Id" value="id" />
                                        <ExcelColumn label="Cedula" value="cedula" />
                                        <ExcelColumn label="ResumenCaso" value="resumenCaso" />
                                        <ExcelColumn label="FechaRetiro" value="fechaRetiro" />
                                        <ExcelColumn label="Segmento Agrupado" value="segmentoAgrupado" />
                                        <ExcelColumn label="Segmento Afectado" value="segmentoAfectado" />
                                        <ExcelColumn label="Subsegmento" value="subsegmento" />
                                        <ExcelColumn label="CodDx" value="codDx" />
                                        <ExcelColumn label="Nro. Furel" value="nroFurel" />
                                        <ExcelColumn label="Región" value="regionInfoLaboral" />
                                        <ExcelColumn label="Lateralidad" value="lateralidad" />
                                        <ExcelColumn label="Entidad Que Motiva El Envio" value="entidadQueMotivaEnvio" />
                                        <ExcelColumn label="Entidad a Donde Envia" value="entidadDondeEnvia" />
                                        <ExcelColumn label="Fecha Entrega" value="fechaEntrega" />
                                        <ExcelColumn label="Fecha Envio" value="fechaEnvio" />
                                        <ExcelColumn label="Investigado" value="investigado" />
                                        <ExcelColumn label="Observaciones" value="observaciones" />

                                        <ExcelColumn label="Fecha Calificación" value="fechaCalificacionEps" />
                                        <ExcelColumn label="Origen" value="origenEps" />

                                        <ExcelColumn label="No. Solicitud" value="noSolicitudARL" />
                                        <ExcelColumn label="Fecha de Calificación Origen" value="fechaCalifiOrigenARL" />
                                        <ExcelColumn label="origen" value="origenARL" />
                                        <ExcelColumn label="Fecha Calificación Pcl" value="fechaCalificacionPclARL" />
                                        <ExcelColumn label="Pcl" value="pclARL" />
                                        <ExcelColumn label="Fecha Estructura" value="fechaEstructuraARL" />
                                        <ExcelColumn label="Fecha Recalificación Pcl" value="fechaRecalificacionPclARL" />
                                        <ExcelColumn label="Pcl Recalificada" value="pclRecalificadaARL" />
                                        <ExcelColumn label="Fecha Estructura Recalificada" value="fechaEstructuraRecalificadaARL" />

                                        <ExcelColumn label="Fecha Calificación Origen" value="fechaCalificaOrigenJRC" />
                                        <ExcelColumn label="Junta Calificación" value="juntaCalifica" />
                                        <ExcelColumn label="No. Dictamen" value="noDictamenJRC" />
                                        <ExcelColumn label="Origen" value="origenJRC" />
                                        <ExcelColumn label="Controversia" value="controversia" />
                                        <ExcelColumn label="Conclusion" value="conclusion" />
                                        <ExcelColumn label="Fecha Calificación Pcl" value="fechaCalificacionPclJRC" />
                                        <ExcelColumn label="No. Dictamen Pcl" value="noDictamenPclJRC" />
                                        <ExcelColumn label="Pcl" value="pclJRC" />
                                        <ExcelColumn label="Fecha Estructura Pcl" value="fechaEstructuraPclJRC" />
                                        <ExcelColumn label="No. Acta Recurso" value="noActaRecursoJRC" />
                                        <ExcelColumn label="Fecha Recalificación Pcl" value="fechaRecalificacionPclJRC" />
                                        <ExcelColumn label="No. Dictamen Recalificación" value="noDictamenRecalificacionJRC" />
                                        <ExcelColumn label="Junta ReCalificación" value="juntaReCalificacionJRC" />
                                        <ExcelColumn label="Pcl Recalificada" value="pclRecalificadaJRC" />
                                        <ExcelColumn label="Fecha Recalificación Est" value="fechaRecalificacionEstJRC" />

                                        <ExcelColumn label="Fecha Calificación Origen" value="fechaCalificaOrigenJNC" />
                                        <ExcelColumn label="No. Dictamen" value="noDictamenJNC" />
                                        <ExcelColumn label="Origen" value="origenJNC" />
                                        <ExcelColumn label="Fecha Calificación Pcl" value="fechaCalificacionPclJNC" />
                                        <ExcelColumn label="No. Dictamen Pcl" value="noDictamenPclJNC" />
                                        <ExcelColumn label="Pcl" value="pclJNC" />
                                        <ExcelColumn label="Fecha Estructura" value="fechaEstructuraJNC" />
                                        <ExcelColumn label="Fecha Recalificación Pcl" value="fechaRecalificacionPclJNC" />
                                        <ExcelColumn label="No. Dictamen Recalificación" value="noDictamenRecalificacionJNC" />
                                        <ExcelColumn label="Pcl Recalificación" value="pclRecalificacionJNC" />

                                        <ExcelColumn label="Origen" value="origenInstaFinal" />
                                        <ExcelColumn label="Fecha Estructuracion Origen" value="fechaEstructuracionOrigenInstaFinal" />
                                        <ExcelColumn label="Instancia Origen" value="instanciaOrigenInstaFinal" />
                                        <ExcelColumn label="Pcl Final" value="pclFinalInstaFinal" />
                                        <ExcelColumn label="Instancia Final" value="instanciaFinal" />
                                        <ExcelColumn label="Fecha Calificación Pcl" value="fechaCalificacionPclInstFinal" />
                                        <ExcelColumn label="Fecha Estructuración Pcl" value="fechaEstructuracionPclInstFinal" />
                                        <ExcelColumn label="Indemnizado" value="indemnizado" />
                                        <ExcelColumn label="EntregadoMin" value="entregadoMin" />
                                        <ExcelColumn label="FechaPago" value="fechaPagoInstaFinal" />
                                        <ExcelColumn label="Indemnizado Recalificado" value="indemnizadoRecalificado" />
                                        <ExcelColumn label="Fecha Pago Recalificado" value="fechaPagoRecalificadoInstaFinal" />

                                        <ExcelColumn label="EstadoRHT" value="estadoRHT" />
                                        <ExcelColumn label="Reintegro" value="reintegro" />
                                        <ExcelColumn label="Reubicado" value="reubicado" />
                                        <ExcelColumn label="Restringido" value="restringido" />
                                        <ExcelColumn label="JornadaLaboral" value="jornadaLaboral" />
                                        <ExcelColumn label="Indemnizacion" value="indemnizacion" />

                                        <ExcelColumn label="Sede" value="sede" />
                                        <ExcelColumn label="Usuario" value="usuario" />
                                        <ExcelColumn label="UsuarioReporte" value="usuarioReporte" />
                                        <ExcelColumn label="FechaSistema" value="fechaSistema" />
                                        <ExcelColumn label="FechaInforme" value="fechaInforme" />
                                        <ExcelColumn label="FechaReporte" value="fechaReporte" />
                                        <ExcelColumn label="FechaSistemaReporte" value="fechaSistemaReporte" />
                                        <ExcelColumn label="EdadCalificado" value="edadCalificado" />
                                        <ExcelColumn label="AntiguedadCalificado" value="antiguedadCalificado" />
                                    </ExcelSheet>
                                </ExcelFile>
                            </Grid>

                            <Grid item xs={2}>
                                <Tooltip title="Impresión">
                                    <IconButton size="large">
                                        <PrintIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item xs={4}>
                                <Button variant="contained" size="large" startIcon={<AddCircleOutlineOutlinedIcon />}
                                    onClick={() => navigate("/occupationalmedicine/add")}>
                                    {TitleButton.Agregar}
                                </Button>
                            </Grid>

                            <Grid item xs={4}>
                                <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate("/occupational-health/menu")}>
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
                        rowCount={occupationalMedicine.length}
                        theme={theme}
                        selected={selected}
                        onClick={handleDelete}
                    />
                    <TableBody>
                        {stableSort(occupationalMedicine, getComparator(order, orderBy))
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
                                            align="center"
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                #{row.id}
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
                                                {row.cedula}
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
                                                {row.resumenCaso}
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
                                                {row.codDx}
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
                                                {row.usuario}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Tooltip title="Actualizar" onClick={() => navigate(`/occupationalmedicine/update/${row.id}`)}>
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
                count={occupationalMedicine.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ListOccupationalMedicine;