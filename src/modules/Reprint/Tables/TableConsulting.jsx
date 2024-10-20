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
    TableCell,
    Button,
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
import { DefaultValue, TitleButton, Message } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { ViewFormat } from 'components/helpers/Format';
import { GetAllAdvice, GetByIdAdvice } from 'api/clients/AdviceClient';

import { generateReport } from 'modules/Programming/Attention/Report/MedicalAdvice';
import { generateReportPsycho } from 'modules/Programming/Attention/Report/Psychological';
import { generateReportOtherAdvice } from 'modules/Programming/Attention/Report/OtherAdvice';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import config from 'config';
import Cargando from 'components/loading/Cargando';
import InputCheck from 'components/input/InputCheck';

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
        id: 'nameTipoAtencion',
        numeric: false,
        label: 'Tipo de asesoría',
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

const TableConsulting = () => {
    const navigate = useNavigate();
    const [lsConsulting, setLsConsulting] = useState([]);

    const theme = useTheme();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('fecha');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [idReporte, setIdReporte] = useState(0);
    const [extenderReport, setExtenderReport] = useState(false);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetAllAdvice();
                setLsConsulting(lsServer.data);
                setRows(lsServer.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClickReport = async (id, lsConfigurations) => {
        try {
            setIdReporte(id);
            setOpenReport(true);
            var lsDataUser = [];
            const lsDataReport = await GetByIdAdvice(id);

            if (lsDataReport.status === 200) {
                lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

                if (lsDataUser.status === 200) {
                    if (lsDataReport.data.idTipoAtencion === DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA) {
                        const asesoriaMedica = generateReport(lsDataReport.data, lsDataUser.data, lsConfigurations);
                        setDataPDF(asesoriaMedica);
                    }
                    if (lsDataReport.data.idTipoAtencion === DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO) {
                        const asesoriaPsicologica = generateReportPsycho(lsDataReport.data, lsDataUser.data, lsConfigurations);
                        setDataPDF(asesoriaPsicologica);
                    }
                    if (lsDataReport.data.idTipoAtencion !== DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA &&
                        lsDataReport.data.idTipoAtencion !== DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO) {
                        const asesoriaOtras = generateReportOtherAdvice(lsDataReport.data, lsDataUser.data, lsConfigurations);
                        setDataPDF(asesoriaOtras);
                    }
                }
            }
        } catch (err) { }
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'documento', 'nameEmpleado', 'nameTipoAtencion', 'fecha'];
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
            setLsConsulting(newRows);
        } else {
            setLsConsulting(rows);
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

    const handleChangeExtender = (event) => {
        setExtenderReport(event.target.checked);
        handleClickReport(idReporte, event.target.checked);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsConsulting.length) : 0;

    return (
        <Fragment>
            <ControlModal
                title={
                    <Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {Message.VistaReporte}
                            </Grid>

                            <Grid item xs={6}>
                                <InputCheck
                                    onChange={handleChangeExtender}
                                    checked={extenderReport}
                                    label="Extender Reporte"
                                    name="extenderDescripcion"
                                    size={30}
                                    defaultValue={false}
                                />
                            </Grid>
                        </Grid>
                    </Fragment>
                }
                open={openReport}
                onClose={() => { setOpenReport(false); setDataPDF(null) }}
                maxWidth="md"
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
                {lsConsulting.length === 0 ? <Cargando size={220} myy={6} /> :
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={lsConsulting.length}
                            theme={theme}
                            selected={selected}
                        />
                        <TableBody>
                            {stableSort(lsConsulting, getComparator(order, orderBy))
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
                                                    {row.nameTipoAtencion}
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
                                                    {row.usuarioRegistra}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="center" sx={{ pr: 3 }}>
                                                <Tooltip title="Imprimir" onClick={() => handleClickReport(row.id, extenderReport)}>
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
                count={lsConsulting.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Fragment>
    );
};

export default TableConsulting;