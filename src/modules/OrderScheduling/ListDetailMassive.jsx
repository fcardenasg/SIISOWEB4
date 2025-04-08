import { useEffect, useState } from 'react';

import {
    Checkbox,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip
} from '@mui/material';

import { QueryProgramming } from 'api/clients/UserClient';
import { ViewFormat } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import { useBoolean } from 'hooks/use-boolean';
import MainCard from 'ui-component/cards/MainCard';
import OptionsMenu from './components/OptionsMenu';

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

const ListDetailMassive = () => {
    const openViewDetail = useBoolean(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [documentoForDetalle, setDocumentoForDetalle] = useState(null);
    const [lsOrdenesParaclinicos, setLsOrdenesParaclinicos] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        async function getAllListParaclinicos() {
            try {
                const lsServer = await QueryProgramming();
                if (lsServer.data.success) {
                    setLsOrdenesParaclinicos(lsServer.data.data);
                }
            } catch (error) { }
        }

        getAllListParaclinicos();
    }, []);

    const handleClickPhone = (documento) => {
        alert(`${documento} - Envio por celular al paciente`);

        setAnchorEl(null);
    };

    const handleClickWhatsApp = (documento) => {
        alert(`${documento} - Envio por WhatsApp al paciente`);

        setAnchorEl(null);
    };

    const handleClickMessage = (documento) => {
        alert(`${documento} - Envio por mensaje al paciente`);

        setAnchorEl(null);
    };

    const handleClickMail = (documento) => {
        alert(`${documento} - Envio por correo al paciente`);

        setAnchorEl(null);
    };

    const handleClickPrint = (documento) => {
        alert(`${documento} - Imprimir al paciente`);

        setAnchorEl(null);
    };

    const handleClickViewDetail = (documento) => {
        //Petición para obtener el detalle del paciente
        setDocumentoForDetalle(documento);

        //Procede a abrir el detalle del paciente
        openViewDetail.onTrue();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs zeroMinWidth sx={{ display: openViewDetail.value ? { xs: 'none', md: 'block' } : 'block' }}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>F. último examen</TableCell>
                                <TableCell>Último tipo de examen</TableCell>
                                <TableCell align="center">
                                    <Tooltip placement="top" title="VISIOMETRÍA">
                                        <IconButton>
                                            <Iconify icon="pepicons-pencil:monitor-eye" width={25} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip placement="top" title="LABORATORIO CLÍNICO">
                                        <IconButton>
                                            <Iconify icon="medical-icon:i-laboratory" width={25} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip placement="top" title="RADIOGRAFÍA DE TÓRAX">
                                        <IconButton>
                                            <Iconify icon="medical-icon:radiology" width={25} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Acción</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {stableSort(lsOrdenesParaclinicos, getComparator('asc', 'nameEmpleado'))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow hover role="checkbox">
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>{row.nombre}</TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>{ViewFormat(row.fechaUltimoEMO)}</TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>{row.tipoExamen}</TableCell>
                                        <TableCell align="center"><Checkbox /></TableCell>
                                        <TableCell align="center"><Checkbox /></TableCell>
                                        <TableCell align="center"><Checkbox /></TableCell>
                                        <TableCell>OK</TableCell>
                                        <TableCell align="center">
                                            {/* <OptionsMenu
                                                setAnchorEl={setAnchorEl}
                                                anchorEl={anchorEl}
                                                onClickMail={() => handleClickMail(row.documento)}
                                                onClickPhone={() => handleClickPhone(row.documento)}
                                                onClickMessage={() => handleClickWhatsApp(row.documento)}
                                                onClickWhatsApp={() => handleClickMessage(row.documento)}
                                                onClickPrint={() => handleClickPrint(row.documento)}
                                            /> */}

                                            <IconButton onClick={() => handleClickMail(row.documento)}>
                                                <Iconify icon="fluent:mail-24-filled" />
                                            </IconButton>

                                            <IconButton onClick={() => handleClickPhone(row.documento)}>
                                                <Iconify icon="solar:phone-bold" />
                                            </IconButton>

                                            <IconButton onClick={() => handleClickWhatsApp(row.documento)}>
                                                <Iconify icon="ic:baseline-whatsapp" />
                                            </IconButton>

                                            <IconButton onClick={() => handleClickMessage(row.documento)}>
                                                <Iconify icon="hugeicons:message-02" />
                                            </IconButton>

                                            <IconButton onClick={() => handleClickPrint(row.documento)}>
                                                <Iconify icon="solar:printer-outline" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    labelRowsPerPage="Filas por página:"
                    labelDisplayedRows={({ from, to, count }) => (
                        `${from} - ${to} de ${count !== -1 ? count : `más de ${lsOrdenesParaclinicos.length}`}`
                    )}
                    rowsPerPageOptions={[6, 12, 24]}
                    component="div"
                    count={lsOrdenesParaclinicos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>

            {(openViewDetail.value && documentoForDetalle) &&
                <Grid item sx={{ width: 342, margin: { xs: '0 auto', md: 'initial' } }}>
                    <MainCard>
                        {documentoForDetalle}
                    </MainCard>
                </Grid>
            }
        </Grid>
    );
};

export default ListDetailMassive;