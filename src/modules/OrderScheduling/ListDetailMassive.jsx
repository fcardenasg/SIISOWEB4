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
import { ViewFormat } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import { useBoolean } from 'hooks/use-boolean';
import MainCard from 'ui-component/cards/MainCard';
import { GetEmpleadoProgramacionOrdenes, QueryProgramming } from 'api/clients/ProgramacionOrdenesClient';
import EmployeeDetail from './components/EmployeeDetail';

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

const ListDetailMassive = ({ valueGes, fechaInicio, fechaFin }) => {
    const openViewDetail = useBoolean(false);

    const [employeeData, setEmployeeData] = useState(null);
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
                if (valueGes || fechaInicio || fechaFin) {
                    const params = {
                        idGes: valueGes.value,
                        fechaInicio: fechaInicio,
                        fechaFin: fechaFin
                    }

                    const response = await QueryProgramming(params);
                    if (response.data.exito) {
                        setLsOrdenesParaclinicos(response.data.datos);
                    } else {
                        setLsOrdenesParaclinicos([]);
                    }
                }
            } catch (error) { }
        }

        getAllListParaclinicos();
    }, [valueGes, fechaInicio, fechaFin]);

    const handleClickPhone = (documento) => {
        alert(`${documento} - Envio por celular al paciente`);
    };

    const handleClickWhatsApp = (documento) => {
        alert(`${documento} - Envio por WhatsApp al paciente`);
    };

    const handleClickMessage = (documento) => {
        alert(`${documento} - Envio por mensaje al paciente`);
    };

    const handleClickMail = (documento) => {
        alert(`${documento} - Envio por correo al paciente`);
    };

    const handleClickPrint = (documento) => {
        alert(`${documento} - Imprimir al paciente`);
    };

    const handleDocumento = async (event) => {

    }

    const handleClickViewDetail = async (documento) => {
        try {
            if (documento) {
                var lsServerEmployee = await GetEmpleadoProgramacionOrdenes(documento);

                if (lsServerEmployee?.data.status === 200) {
                    const dataemployee = lsServerEmployee.data.data;
                    setEmployeeData(dataemployee);
                    openViewDetail.onTrue();
                } else {
                    if (lsServerEmployee?.data.data) {
                        const dataemployee = lsServerEmployee.data.data;
                        setEmployeeData(dataemployee);
                        openViewDetail.onTrue();
                    } else {
                        setEmployeeData(null);
                    }
                }
            } else {
                setEmployeeData(null);
            }
        } catch (error) { }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs zeroMinWidth sx={{ display: openViewDetail.value ? { xs: 'none', md: 'block' } : 'block' }}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Nombre</TableCell>
                                <TableCell>Fecha del último examen</TableCell>
                                <TableCell>Último tipo de examen</TableCell>
                                {/* <TableCell align="center">
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
                                </TableCell> */}
                                {/* <TableCell align="center">Estado</TableCell> */}
                                <TableCell>Ciudad de residencia</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {stableSort(lsOrdenesParaclinicos, getComparator('asc', 'nameEmpleado'))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow hover role="checkbox">
                                        <TableCell>{row.examenesProgramados ? "SI" : "NO"}</TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>
                                            {row.nombre}
                                        </TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>
                                            {ViewFormat(row.fechaUltimoEMO)} - {`HACE ${row.fechaProximoEMO} MESES`}
                                        </TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>
                                            {row.tipoExamen}
                                        </TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleClickViewDetail(row.documento)}>
                                            {row.ciudadResidencia}
                                        </TableCell>

                                        {/* <TableCell align="center"><Checkbox /></TableCell>
                                        <TableCell align="center"><Checkbox /></TableCell>
                                        <TableCell align="center"><Checkbox /></TableCell> */}

                                        {/* <TableCell>OK</TableCell>
                                        <TableCell align="center">
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
                                        </TableCell> */}
                                    </TableRow>
                                ))
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

            {(openViewDetail.value && employeeData) &&
                <Grid item sx={{ width: 370, margin: { xs: '0 auto', md: 'initial' } }}>
                    <EmployeeDetail employeeData={employeeData} openViewDetail={openViewDetail} />
                </Grid>
            }
        </Grid>
    );
};

export default ListDetailMassive;