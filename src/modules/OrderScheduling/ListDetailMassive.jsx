import React, { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
    Card,
    Chip,
    Grid,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { GetComboProgramacionOrdenes, GetEmpleadoProgramacionOrdenes, QueryProgramming } from 'api/clients/ProgramacionOrdenesClient';
import ControlModal from 'components/controllers/ControlModal';
import { ViewFormat } from 'components/helpers/Format';
import Iconify from 'components/iconify/iconify';
import SelectOnChange from 'components/input/SelectOnChange';
import { useBoolean } from 'hooks/use-boolean';
import { ColorDrummondltd } from 'themes/colors';
import ChipControl from 'ui-component/extended/Chip';
import EmployeeDetail from './components/EmployeeDetail';
import { motion } from 'framer-motion';
import EmptyContent from 'components/loading/EmptyContent';
import LoadingMassive from './components/LoadingMassive';
import { HtmlTooltip } from 'components/label/HtmlTooltip';

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

const ListDetailMassive = ({ valueGes, fechaInicio, fechaFin, validateSave, setLsOrdenesParaclinicos, lsOrdenesParaclinicos }) => {
    const openViewDetail = useBoolean(false);
    const openEditOrders = useBoolean(false);
    const loadingData = useBoolean(true);

    const [search, setSearch] = useState('');
    const [lsCiudad, setLsCiudad] = useState([]);
    const [ciudad, setCiudad] = useState({});
    const [employeeData, setEmployeeData] = useState(null);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const porDefinirCiudad = lsOrdenesParaclinicos?.filter(fil => !fil.examenesProgramados).length;

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    function agruparCiudades(ciudades) {
        const ciudadesUnicas = Array.from(
            new Map(ciudades.map(ciudad => [`${ciudad.value}-${ciudad.label}`, ciudad])).values()
        );
        return ciudadesUnicas;
    }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerCiudad = await GetComboProgramacionOrdenes();
                const ciudadesUnicas = agruparCiudades(lsServerCiudad.data);
                setLsCiudad(ciudadesUnicas);
            } catch (error) {

            }
        }

        getAll();
    }, []);

    useEffect(() => {
        async function getAllListParaclinicos() {
            try {
                loadingData.onTrue();
                openViewDetail.onFalse();
                setLsOrdenesParaclinicos([]);
                setRows([]);

                if (valueGes || fechaInicio || fechaFin) {
                    const params = {
                        idGes: valueGes?.value,
                        fechaInicio: fechaInicio,
                        fechaFin: fechaFin
                    }

                    const response = await QueryProgramming(params);
                    if (response.data.exito) {
                        setTimeout(() => {
                            setLsOrdenesParaclinicos(response.data.datos);
                            setRows(response.data.datos);
                            loadingData.onFalse();
                        }, 500);
                    } else {
                        setLsOrdenesParaclinicos([]);
                        setRows([]);
                    }
                }
            } catch (error) {
                loadingData.onFalse();
            }
        }

        getAllListParaclinicos();
    }, [valueGes, fechaInicio, fechaFin]);

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                return ['documento', 'nombre']
                    .some(property => row[property]?.toString().toLowerCase().includes(newString.toLowerCase()));
            });
            setLsOrdenesParaclinicos(newRows);
        } else {
            setLsOrdenesParaclinicos(rows);
        }
    };

    const handleCiudadChange = (documento, value) => {
        setCiudad((prevState) => ({
            ...prevState,
            [documento]: value,
        }));

        setLsOrdenesParaclinicos((prevOrdenes) =>
            prevOrdenes.map((orden) =>
                orden.documento === documento
                    ? { ...orden, idCiudadResidencia: value, examenesProgramados: true }
                    : orden
            )
        );

        setRows((prevOrdenes) =>
            prevOrdenes.map((orden) =>
                orden.documento === documento
                    ? { ...orden, idCiudadResidencia: value, examenesProgramados: true }
                    : orden
            )
        );
    };

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

    useEffect(() => {
        const hasOrders = lsOrdenesParaclinicos.length > 0;
        if (!hasOrders || porDefinirCiudad !== 0)
            validateSave.onTrue();
        else
            validateSave.onFalse();
    }, [lsOrdenesParaclinicos, porDefinirCiudad]);


    const notFound = !lsOrdenesParaclinicos.length && !rows.length;

    return (
        <Grid container spacing={2}>
            <ControlModal
                maxWidth="md"
                open={openEditOrders.value}
                onClose={openEditOrders.onFalse}
                title="Ajustar examenes"
            >

            </ControlModal>

            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
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

            <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                {!notFound &&
                    <>
                        <Typography sx={{ mr: 1 }} variant="caption">Nota:</Typography>
                        <HtmlTooltip
                            sx={{ maxWidth: 350 }}
                            title={
                                <Card sx={{ p: 2 }}>
                                    <Typography sx={{ mb: 1 }} color="inherit">Asignación Automática de Ciudades</Typography>
                                    <em>Solicitamos que se realice la asignación automática de un lugar para aquellos registros que aún no cuentan con uno. Es fundamental elegir la ciudad más adecuada para llevar a cabo los exámenes de los empleados, con el fin de facilitar la programación de las órdenes de manera masiva.</em>
                                </Card>
                            }
                        >
                            <Chip
                                color={porDefinirCiudad == 0 ? "success" : "secondary"}
                                label={
                                    <Typography variant="subtitle2" sx={{ color: 'white' }}>
                                        {`${porDefinirCiudad} Registros por ajuste de ciudad`}
                                    </Typography>
                                }
                                sx={{ cursor: 'pointer' }}
                            />
                        </HtmlTooltip>
                    </>
                }
            </Grid>

            <Grid item xs zeroMinWidth sx={{ display: openViewDetail.value ? { xs: 'none', md: 'block' } : 'block' }}>
                <LoadingMassive loadingModulo={loadingData.value} notFound={notFound}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Fecha del último examen</TableCell>
                                    <TableCell>Último tipo de examen</TableCell>
                                    <TableCell>Residencia</TableCell>
                                    <TableCell>Lugar asignado</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {stableSort(lsOrdenesParaclinicos, getComparator('asc', 'examenesProgramados'))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow hover role="checkbox" key={row.documento}>
                                            <TableCell sx={{ cursor: 'pointer' }}>
                                                {!row.examenesProgramados &&
                                                    <Tooltip placement="top" title="El municipio de residencia del empleado no coincide con ninguno de los proveedores registrados. 
                                                Por favor, realiza el ajuste manual para este empleado utilizando el botón de lápiz al final de la fila.">
                                                        <Iconify sx={{ color: ColorDrummondltd.RedDrummond }} icon="tabler:report-off" />
                                                    </Tooltip>
                                                }
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
                                            <TableCell>
                                                <SelectOnChange
                                                    sx={{ width: 200 }}
                                                    name={`ciudad-${row.documento}`}
                                                    label="Ciudad"
                                                    value={ciudad[row.documento] || row?.idCiudadResidencia}
                                                    options={lsCiudad}
                                                    onChange={(e) => handleCiudadChange(row.documento, e.target.value)}
                                                />
                                            </TableCell>
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
                        rowsPerPageOptions={[4, 8, 12]}
                        component="div"
                        count={lsOrdenesParaclinicos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </LoadingMassive>
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