import { useState, useEffect } from 'react';
import { Grid, InputAdornment, OutlinedInput, TablePagination, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import ViewProgramming from './ViewProgramming';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import { IconSearch } from '@tabler/icons';
import { GetAllAttention, DeleteAttention } from 'api/clients/AttentionClient';
import Cargando from 'components/loading/Cargando';

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
    const dispatch = useDispatch();
    const [lsProgramming, setLsProgramming] = useState([]);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');
    const [openDelete, setOpenDelete] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const GetAll = async () => {
        try {
            const response = await GetAllAttention(0, 0);
            if (response.status === 200) { setLsProgramming(response.data.entities); setRows(response.data.entities) }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetAll();
    }, []);

    const onClickDelete = async (id) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteAttention(id);
                    if (result.status === 200) {
                        setOpenDelete(true);
                    }
                    GetAll();
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    let usersResult = <></>;

    if (lsProgramming.length !== 0) {
        usersResult = stableSort(lsProgramming, getComparator('asc', 'fecha')).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((programming, index) => (

                <Grid key={index} item xs={12} sm={6} lg={3} xl={2}>
                    <ViewProgramming key={index} onClickDelete={onClickDelete} programming={programming} />
                </Grid>
            ));
    } else usersResult = <Cargando />

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['documento', 'nameEmpleado', 'nameAtencion', 'estadoPac', 'nameSede', 'fecha', 'nameTipoAtencion'];
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

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h3">Lista de Programación</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <OutlinedInput
                            id="input-search-card-style3"
                            placeholder="Search"
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
                </Grid>
            }
        >
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
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
                                onPageChange={handleChangePage}
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