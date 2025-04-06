import { Button, Grid, InputAdornment, OutlinedInput, TablePagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import ViewListMedicationOutlet from './ViewListMedicationOutlet';

import { IconSearch } from '@tabler/icons';
import { GetAllMedicamentosEntrega } from 'api/clients/MedicamentosEntregaClient';
import { TitleButton } from 'components/helpers/Enums';
import LoadingList from 'components/loading/LoadingList';
import config from 'config';
import { useBoolean } from 'hooks/use-boolean';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ControlModal from 'components/controllers/ControlModal';

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

const ListMedicationOutlet = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const loadingModulo = useBoolean(true);
    const openModal = useBoolean();

    const [lsProgramming, setLsProgramming] = useState([]);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'documento', 'nameEmpleado', 'nameTipoAtencion', 'nameAtencion', 'fecha', 'nameSedeAtencion'];
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
            setLsProgramming(newRows);
        } else {
            setLsProgramming(rows);
        }
    };

    const getAll = async () => {
        try {
            const lsServer = await GetAllMedicamentosEntrega(user?.idsede);
            if (lsServer.status === 200) {
                setTimeout(() => {
                    const lsData = lsServer.data;
                    setLsProgramming(lsData);
                    setRows(lsData);
                    loadingModulo.onFalse();
                }, 1500);
            }
        } catch (error) {
            loadingModulo.onFalse();
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    const notFound = !lsProgramming.length;

    return (
        <MainCard
            title={
                <Grid container alignItems="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={7.5}>
                        <Typography variant="h4">Listado de medicamentos para entregar</Typography>
                    </Grid>

                    <Grid item xs={8} md={3}>
                        <OutlinedInput
                            fullWidth
                            id="input-search-card-style3"
                            placeholder="Buscar"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={4} md={1.5}>
                        <Button fullWidth variant="contained" size="large" startIcon={<ArrowBackIcon />}
                            onClick={openModal.onTrue}> {/* () => navigate("/medicines/menu") */}
                            {TitleButton.Cancelar}
                        </Button>
                    </Grid>
                </Grid>
            }
        >
            <ControlModal
                maxWidth="md"
                open={openModal.value}
                onClose={openModal.onFalse}
                title="Registrar salida de medicamentos"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </ControlModal>

            <Grid container spacing={gridSpacing}>
                <LoadingList loadingModulo={loadingModulo.value} notFound={notFound}>
                    {stableSort(lsProgramming, getComparator('desc', 'id'))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((programming, index) => (
                            <Grid key={index} item xs={12} sm={6} lg={3}>
                                <ViewListMedicationOutlet key={index} programming={programming} getAll={getAll} />
                            </Grid>
                        ))
                    }

                    <Grid item xs={12}>
                        <TablePagination
                            labelRowsPerPage="Filas por página:"
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from} - ${to} de ${count !== -1 ? count : `más de ${lsProgramming.length}`}`}
                            rowsPerPageOptions={[12, 24, 36]}
                            component="div"
                            count={lsProgramming.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </LoadingList>
            </Grid>
        </MainCard>
    );
};

export default ListMedicationOutlet;