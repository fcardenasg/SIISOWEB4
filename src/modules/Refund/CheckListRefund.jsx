import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import { FormatDate, ViewFormat } from 'components/helpers/Format';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { visuallyHidden } from '@mui/utils';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { PostListRefund } from 'formatdata/ListRefundForm';
import { CodCatalogo } from 'components/helpers/Enums';
import { InsertListRefund, GetAllReintegro } from 'api/clients/ListRefundClient';

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
    const { user } = useAuth();
    const [listRefund, setListRefund] = useState([]);

    const theme = useTheme();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerCatalogo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.LISTA_CHEKEO_REINTEGRO);
                if (lsServerCatalogo.status === 200) {
                    var arrayInsert = lsServerCatalogo.data.entities;

                    for (let index = 0; index < arrayInsert.length; index++) {
                        const refund = arrayInsert[index];

                        const DataToInsert = PostListRefund(idReintegro, refund.nombre, refund.idCatalogo, '', false,
                            user.email, FormatDate(new Date()), '', FormatDate(new Date()));

                        console.log(DataToInsert);

                        if (DataToInsert) {
                            const result = await InsertListRefund(DataToInsert);
                            if (result.status === 200) {
                                if (index < arrayInsert.length) {

                                }
                            }
                        }

                        const lsServer = await GetAllReintegro(0, 0, idReintegro);
                        if (lsServer.status === 200) {
                            setListRefund(lsServer.data.entities);
                        }
                    }
                }
            } catch (error) { }
        }

        GetAll();
    }, [idReintegro])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Fragment>
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
                                                {row.estado}
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
                                                {row.usuarioModifico}
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


                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Tooltip title="Subir Archico">
                                                <IconButton size="large">
                                                    <FileDownloadIcon sx={{ fontSize: '1.3rem' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Descargar Archivo">
                                                <IconButton size="large">
                                                    <FileUploadIcon sx={{ fontSize: '1.3rem' }} />
                                                </IconButton>
                                            </Tooltip>
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