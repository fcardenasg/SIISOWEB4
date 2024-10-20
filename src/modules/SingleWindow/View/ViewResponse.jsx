import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Cargando from 'components/loading/Cargando';
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
    Typography,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';

import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { Message, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import PreviewIcon from '@mui/icons-material/Preview';

import SearchIcon from '@mui/icons-material/Search';
import { GetAllVentanillaUnicaComboUsuario, GetAllVentanillaUnicaMonitoreo, NotificarUsuario } from 'api/clients/VentanillaUnicaClient';
import { ViewFormat } from 'components/helpers/Format';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ControlModal from 'components/controllers/ControlModal';
import ListReplay from './ListReplay';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Chip from 'ui-component/extended/Chip';
import useAuth from 'hooks/useAuth';
import ViewEnviarSolicitud from './ViewEnviarSolicitud';
import SelectOnChange from 'components/input/SelectOnChange';
import { LoadingButton } from '@mui/lab';

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
        id: 'nRadicado',
        numeric: false,
        label: 'Nº Radicado',
        align: 'left'
    },
    {
        id: 'solicitadoPor',
        numeric: false,
        label: 'Solicitado Por',
        align: 'left'
    },
    {
        id: 'documento',
        numeric: false,
        label: 'Documento',
        align: 'left'
    },
    {
        id: 'nombre',
        numeric: false,
        label: 'Nombres',
        align: 'left'
    },
    {
        id: 'nameSede',
        numeric: false,
        label: 'Sede',
        align: 'left'
    },
    {
        id: 'tipo',
        numeric: false,
        label: 'Tipo Solicitud',
        align: 'left'
    },
    {
        id: 'fechaRecibido',
        numeric: false,
        label: 'Fecha Recibido',
        align: 'left'
    },
    {
        id: 'fechaLimite',
        numeric: false,
        label: 'Fecha Limite Respuesta',
        align: 'left'
    },
    {
        id: 'diasRestantes',
        numeric: false,
        label: 'Días Restantes',
        align: 'left'
    },
    {
        id: 'estadoRespuesta',
        numeric: false,
        label: 'Documentos Atendidos / Documentos Solicitados',
        align: 'left'
    }
];

function EnhancedTableHead({ order, orderBy, numSelected, rowCount, onRequestSort, theme }) {
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
                                <Typography variant='h6'>{headCell.label}</Typography>
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

const ViewResponse = () => {
    const theme = useTheme();

    const { user } = useAuth();
    const navigate = useNavigate();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [idVentanilla, setIdVentanilla] = useState('');

    const [lsRespuesta, setLsRespuesta] = useState([]);
    const [messageError, setMessageError] = useState('');
    const [messageAtencion, setMessageAtencion] = useState('');
    const [timeWait, setTimeWait] = useState(false);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                setTimeWait(false);
                setMessageAtencion('');
                setLsRespuesta([]);

                if (user?.idarea === 0) {
                    await GetAllVentanillaUnicaMonitoreo(2).then(response => {
                        if (response.data.length === 0) {
                            setMessageAtencion(Message.NoRegistro);
                        } else if (response.data.length !== 0) {
                            setTimeout(() => {
                                setTimeWait(true);
                                setLsRespuesta(response.data);
                                setRows(response.data);
                            }, 500);
                        }
                    });
                } else {
                    setMessageAtencion("Usted no esta autorizado para enviar respuesta de las peticiones");
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['nRadicado', 'documento', 'nombre', 'tipo'];
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
            setLsRespuesta(newRows);
        } else {
            setLsRespuesta(rows);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsRespuesta.length) : 0;

    let usersResult = <></>;

    if (timeWait) {
        usersResult = stableSort(lsRespuesta, getComparator(order, orderBy))
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
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.nRadicado}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.solicitadoPor}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.documento}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.nombre}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.nameSede}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.tipo}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {ViewFormat(row?.fechaRecibido)}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {ViewFormat(row?.fechaLimite)}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.numTotal === row?.numeroRespondido ? "Atendido" : row?.diasRestantes}
                            </Typography>
                        </TableCell>

                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                                {row?.numTotal === row?.numeroRespondido ?
                                    <Chip label={`${row?.numeroRespondido} / ${row?.numTotal}`} size="small" chipcolor="success" />
                                    : <Chip label={`${row?.numeroRespondido} / ${row?.numTotal}`} size="small" chipcolor="error" />}
                            </Typography>
                        </TableCell>

                        <TableCell align="center">
                            <Tooltip title="Enviar Respuesta"
                                onClick={() => { setIdVentanilla(row?.id); setOpenModal(true); }}>
                                <IconButton size="large">
                                    <MailIcon color="error" sx={{ fontSize: '1.5rem' }} />
                                </IconButton>
                            </Tooltip>

                        </TableCell>
                    </TableRow>
                );
            });
    } else if (messageAtencion !== '') {
        usersResult = <Typography sx={{ m: 7 }} variant="h3">{messageAtencion}</Typography>;
    } else {
        usersResult = <Cargando myy={8} mxx={8} />;
    }

    return (
        <MainCard title="Solicitudes atendidas" content={false}>
            <MessageSuccess message={messageError} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={messageError} open={openDelete} onClose={() => setOpenDelete(false)} />

            <ControlModal
                maxWidth="md"
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Enviar solicitudes"
            >
                <ViewEnviarSolicitud idVentanilla={idVentanilla} />
            </ControlModal>

            <CardContent>
                <Grid container justifyContent="space-between" alignItems="flex-end" spacing={2}>
                    <Grid item xs={12} md={7}>
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

                    <Grid item xs={5} sx={{ textAlign: 'right' }}>
                        <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                            <Grid item xs={4}>
                                <AnimateButton>
                                    <Button variant="contained" size="large" startIcon={<ArrowBackIosIcon />}
                                        onClick={() => navigate("/single-window/view")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    {messageAtencion === '' && lsRespuesta.length !== 0 ?
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            theme={theme}
                        /> : null}

                    <TableBody>
                        {usersResult}

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


            {messageAtencion === '' && lsRespuesta.length !== 0 ?
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={lsRespuesta.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> : null}
        </MainCard>
    );
};

export default ViewResponse;