import { useState, useEffect } from 'react';
import { Button, Grid, InputAdornment, OutlinedInput, TablePagination, Typography } from '@mui/material';


import ViewProgramming from './ViewProgramming';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import { IconSearch } from '@tabler/icons';
import { GetAllAtencion, DeleteAttention } from 'api/clients/AttentionClient';
import Cargando from 'components/loading/Cargando';
import { DefaultValue, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

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

const ListProgramming = () => {
    const navigate = useNavigate();
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

                const properties = ['id', 'documento', 'nameEmpleado', 'nameTipoAtencion', 'nameAtencion', 'fecha', 'usuarioRegistro'];
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
            const response = await GetAllAtencion(0, 0, DefaultValue.ATENCION_ATENDIDO);
            if (response.status === 200) { setLsProgramming(response.data.entities); setRows(response.data.entities) }
        } catch (error) { }
    };

    useEffect(() => {
        getAll();
    }, []);


    let usersResult = <></>;

    if (lsProgramming.length !== 0) {
        usersResult = stableSort(lsProgramming, getComparator('asc', 'fecha')).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((programming, index) => (
                <Grid key={index} item xs={12} sm={6} lg={3} xl={2}>
                    <ViewProgramming key={index} programming={programming} getAll={getAll} />
                </Grid>
            ));
    } else usersResult = <Cargando />

    return (
        <MainCard
            title={
                <Grid container alignItems="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h3">Lista de Programación</Typography>
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

                    <Grid item xs={4} md={2}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={() => navigate("/dashboard/ltd")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>

                </Grid>
            }
        >
            <Grid container spacing={gridSpacing}>
                {usersResult}

                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TablePagination
                                rowsPerPageOptions={[12, 24, 36]}
                                component="div"
                                count={lsProgramming.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ListProgramming;