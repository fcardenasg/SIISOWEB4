import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    CardContent,
    Fade,
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

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { visuallyHidden } from '@mui/utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { ViewFormat } from 'components/helpers/Format';
import { GetAllWorkAbsenteeismHistory } from 'api/clients/WorkAbsenteeismClient';
import Chip from 'ui-component/extended/Chip';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { TitleButton } from 'components/helpers/Enums';
import Cargando from 'components/loading/Cargando';

import { IconFileExport } from '@tabler/icons';
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
        id: 'documento',
        numeric: false,
        label: 'Documento',
        align: 'left'
    },
    {
        id: 'nombre',
        numeric: false,
        label: 'Nombre',
        align: 'left'
    },
    {
        id: 'cod_Dx',
        numeric: false,
        label: 'Dx Inicial',
        align: 'left'
    },
    {
        id: 'diasSinLaborar',
        numeric: false,
        label: 'Días de Incapacidad',
        align: 'left'
    },
    {
        id: 'fechaInicio',
        numeric: false,
        label: 'Fecha de Inicio',
        align: 'left'
    },
    {
        id: 'fechaFin',
        numeric: false,
        label: 'Fecha Fin',
        align: 'left'
    },
    {
        id: 'fechaRegistro',
        numeric: false,
        label: 'Fecha de Registro',
        align: 'left'
    },
    {
        id: 'usuarioRegistro',
        numeric: false,
        label: 'Usuario de Registro',
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
                    <TableCell sortDirection={false} align="center" sx={{ pr: 2 }}>
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

const HistoryWorkAbsenteeism = () => {
    const navigate = useNavigate();

    const [lsWorkAbsenteeismHistory, setLsWorkAbsenteeismHistory] = useState([]);

    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('fechaRegistro');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetAllWorkAbsenteeismHistory();
                setLsWorkAbsenteeismHistory(lsServer.data);
                setRows(lsServer.data);
            } catch (error) { }
        }

        getAll();
    }, [])

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'documento', 'nombres', 'fechaRegistro', 'usuarioRegistro'];
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
            setLsWorkAbsenteeismHistory(newRows);
        } else {
            setLsWorkAbsenteeismHistory(rows);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsWorkAbsenteeismHistory.length) : 0;


    return (
        <MainCard title={<Typography variant='h4'>Lista De Ausentismo Laboral Historico</Typography>} content={false}>

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

                    <Grid item xs={12} sm={6} lg={3} sx={{ textAlign: 'right' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <ExcelFile element={
                                    <Tooltip title="Exportar">
                                        <IconButton size="large">
                                            <IconFileExport />
                                        </IconButton>
                                    </Tooltip>
                                } filename={`LISTA_DE_AUSENTISMO_${new Date().toLocaleString()}`}>
                                    <ExcelSheet data={lsWorkAbsenteeismHistory} name="Registro De Ausentismo">
                                        <ExcelColumn label="Id" value="id" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombres" value="nombres" />
                                        <ExcelColumn label="Fecha De Nacimiento" value={(fe) => ViewFormat(fe.fechaNaci)} />
                                        <ExcelColumn label="Departamento" value="nameDepartamento" />
                                        <ExcelColumn label="Area" value="nameArea" />
                                        <ExcelColumn label="Grupo" value="nameGrupo" />
                                        <ExcelColumn label="Fecha De Contrato" value={(fe) => ViewFormat(fe.fechaContrato)} />
                                        <ExcelColumn label="Roster Position" value="nameRosterPosition" />
                                        <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                        <ExcelColumn label="Genero" value="nameGenero" />
                                        <ExcelColumn label="Sede" value="nameSede" />
                                        <ExcelColumn label="Celular" value="celular" />
                                        <ExcelColumn label="Email" value="email" />
                                        <ExcelColumn label="Empresa" value="empresa" />
                                        <ExcelColumn label="Oficio" value="nameOficio" />
                                        <ExcelColumn label="Municipio De Nacimiento" value="nameMunicipioNacido" />

                                        <ExcelColumn label="Incapacidad" value="nameIncapacidad" />
                                        <ExcelColumn label="Nro Incapacidad" value="nroIncapacidad" />
                                        <ExcelColumn label="Fecha De Expedición" value={(fe) => ViewFormat(fe.fechaExpedicion)} />
                                        <ExcelColumn label="Departamento De Expedición" value="nameDepartamentoExpedicion" />
                                        <ExcelColumn label="Ciudad De Expedición" value="nameCiudadExpedicion" />
                                        <ExcelColumn label="Tipo Incapacidad" value="nameTipoIncapacidad" />
                                        <ExcelColumn label="Contingencia" value="nameContingencia" />
                                        <ExcelColumn label="Fecha Inicio" value={(fe) => ViewFormat(fe.fechaInicio)} />
                                        <ExcelColumn label="Fecha Fin" value={(fe) => ViewFormat(fe.fechaFin)} />
                                        <ExcelColumn label="Días Sin Laborar" value="diasSinLaborar" />
                                        <ExcelColumn label="Código Dx" value="dx" />
                                        <ExcelColumn label="Dx" value="nameDx" />
                                        <ExcelColumn label="Estado Caso" value="nameEstadoCaso" />
                                        <ExcelColumn label="Segmento Agrupado" value="nameSegmentoAgrupado" />
                                        <ExcelColumn label="Subsegmento" value="nameSubsegmento" />
                                        <ExcelColumn label="Tipo De Soporte" value="nameIdTipoSoporte" />
                                        <ExcelColumn label="Categoria" value="nameIdCategoria" />

                                        <ExcelColumn label="Departamento IPS" value="nameDepartamentoIPS" />
                                        <ExcelColumn label="Ciudad IPS" value="nameCiudadIPS" />
                                        <ExcelColumn label="Nombre Profesional" value="nombreProfesional" />
                                        <ExcelColumn label="Especialidad" value="especialidad" />
                                        <ExcelColumn label="RegistroProfesional" value="registroProfesional" />
                                        <ExcelColumn label="Tipo De Atención" value="nameTipoAtencion" />
                                        <ExcelColumn label="Cumplimiento De Requisito" value="nameCumplimientoRequisito" />
                                        <ExcelColumn label="Expide InCapacidad" value="nameExpideInCapacidad" />
                                        <ExcelColumn label="Observación Cumplimiento" value="observacionCumplimiento" />

                                        <ExcelColumn label="Usuario De Modificación" value="usuarioModificacion" />
                                        <ExcelColumn label="Fecha De Modificación" value={(fe) => ViewFormat(fe.fechaModificacion)} />
                                        <ExcelColumn label="Tipo De Empleado" value="nameTipoEmpleado" />
                                        <ExcelColumn label="Tipo De Nomina" value="nameTipoNomina" />

                                        <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                        <ExcelColumn label="Hora Registro" value="horaRegistro" />
                                    </ExcelSheet>
                                </ExcelFile>
                            </Grid>

                            <Grid item xs={9}>
                                <Button variant="contained" size="large" startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate("/work-absenteeism/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer>
                {lsWorkAbsenteeismHistory.length == 0 ? <Cargando size={220} myy={6} /> :
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={lsWorkAbsenteeismHistory.length}
                            theme={theme}
                            selected={selected}
                        />

                        <TableBody>
                            {stableSort(lsWorkAbsenteeismHistory, getComparator(order, orderBy))
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
                                                    {row.documento}
                                                </Typography>
                                            </TableCell>

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
                                                    {row.nombres}
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{ cursor: 'pointer' }}
                                                align="left"
                                            >
                                                <Tooltip placement="top" TransitionComponent={Fade} title={row.nameDx === null ? 'SIN DX' : row.nameDx}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                    >
                                                        <Chip label={row.dx === null ? 'SIN DX' : row.dx} size="small" chipcolor="success" />
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>

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
                                                    {row.diasSinLaborar}
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
                                                    {ViewFormat(row.fechaInicio)}
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
                                                    {ViewFormat(row.fechaFin)}
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
                                                    {new Date(row.fechaRegistro).toLocaleString()}
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
                                                <Tooltip title="Ver mas..." onClick={() => navigate(`/work-absenteeism/history/${row.id}`)}>
                                                    <IconButton size="large">
                                                        <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
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
                count={lsWorkAbsenteeismHistory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default HistoryWorkAbsenteeism;