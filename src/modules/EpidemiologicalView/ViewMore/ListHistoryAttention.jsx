import { Fragment } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ViewFormat } from 'components/helpers/Format';
import Chip from 'ui-component/extended/Chip';

const ListHistoryAttention = ({ lsData }) => (
    <Fragment>
        <PerfectScrollbar style={{ height: 250, padding: 0 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Motivo</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Diagnóstico/Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lsData?.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell>{row?.id}</TableCell>
                                <TableCell>{row?.atencion === " / " || row?.atencion === null ? 'SIN REGISTRO DE MOTIVO' : row?.atencion}</TableCell>
                                <TableCell>{ViewFormat(row?.fecha)}</TableCell>
                                <TableCell>
                                    <Tooltip placement="bottom" title={row?.dx === null ? 'SIN REGISTRO' : row?.dx}>
                                        <Typography>
                                            <Chip
                                                size="small"
                                                label={row?.dx === null ? "N/A" : row?.codDx}
                                                chipcolor={row?.dx === null ? 'error' : 'success'}
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PerfectScrollbar>
    </Fragment>
);

export default ListHistoryAttention;