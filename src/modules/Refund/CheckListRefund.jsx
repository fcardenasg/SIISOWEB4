import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
    Grid,
    Tooltip,
    IconButton,
} from '@mui/material';
import { ViewFormat } from 'components/helpers/Format';

import UploadIcon from '@mui/icons-material/Upload';
import { visuallyHidden } from '@mui/utils';
import { GetAllByIdListaReintegroArchivo, GetAllReintegro } from 'api/clients/ListRefundClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import AnimateButton from 'ui-component/extended/AnimateButton';
import UploadPdf from './UploadPdf';
import Chip from 'ui-component/extended/Chip';

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
        if (order != 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'ID',
        align: 'left'
    },
    {
        id: 'documento',
        numeric: false,
        label: 'Documento',
        align: 'left'
    },
    {
        id: 'estado',
        numeric: false,
        label: 'Estado',
        align: 'left'
    },
    {
        id: 'usuarioModifico',
        numeric: false,
        label: 'Usuario',
        align: 'left'
    },
    {
        id: 'fechaModifico',
        numeric: false,
        label: 'Fecha',
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

const CheckListRefund = ({ idReintegro }) => {
    const [listRefund, setListRefund] = useState([]);
    const [openListPDF, setOpenListPDF] = useState(false);
    const [idListPDF, setIdListPDF] = useState(false);
    const [nameListPDF, setNameListPDF] = useState(false);

    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('documento');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                var lsCheckedReintegro = await GetAllReintegro(0, 0, idReintegro);
                setListRefund(lsCheckedReintegro.data.entities);


            } catch (error) { }
        }

        GetAll();
    }, [idReintegro]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleModalPDFS = (id, nombre) => {
        setOpenListPDF(true);
        setIdListPDF(id);
        setNameListPDF(nombre);
    };

    return (
        <Fragment>
            <FullScreenDialog
                open={openListPDF}
                title={"ARCHIVOS DE " + nameListPDF}
                handleClose={() => setOpenListPDF(false)}
            >
                <Grid sx={{ m: 2 }}>
                    <UploadPdf idListaReintegro={idListPDF} />
                </Grid>
            </FullScreenDialog>

            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={listRefund.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(listRefund, getComparator(order, orderBy))
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
                                                variant="subtitle2"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                #{row.id}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle2"
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
                                                variant="subtitle2"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.countArchivos === 0 ?
                                                    <Chip label={row.countArchivos + " Archivos"} size="small" chipcolor="error" /> :
                                                    <Chip label={row.countArchivos + " Archivos"} size="small" chipcolor="success" />
                                                }
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {row.usuarioRegistro}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {ViewFormat(row.fechaModifico)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <AnimateButton>
                                                <Tooltip title="Subir Archivo" onClick={() => handleModalPDFS(row.id, row.documento)}>
                                                    <IconButton size="large">
                                                        <UploadIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </AnimateButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
};

export default CheckListRefund;

CheckListRefund.propTypes = {
    idReintegro: PropTypes.string,
};