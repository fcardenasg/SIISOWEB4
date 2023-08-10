import { useState, useEffect } from 'react';
import { Button, Grid, InputAdornment, OutlinedInput, TablePagination, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import { IconSearch } from '@tabler/icons';
import { Message, TitleButton } from 'components/helpers/Enums';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { GetAllBySedeRequests } from 'api/clients/RequestsClient';
import CardAnsweredView from './CardAnsweredView';
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
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => - descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const ListAnsweredView = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [timeWait, setTimeWait] = useState(false);
    const [lsRequests, setLsRequests] = useState([]);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');
    const [messageAtencion, setMessageAtencion] = useState('');

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

                const properties = ['id', 'nameEmpleado', 'documento', 'nameSede'];
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
            setLsRequests(newRows);
        } else {
            setLsRequests(rows);
        }
    };

    const getAll = async () => {
        try {
            setMessageAtencion('');
            setLsRequests([]);

            await GetAllBySedeRequests(user.idsede).then(response => {
                if (response.data.length === 0) {
                    setMessageAtencion(Message.NoRegistro);
                } else if (response.data.length !== 0) {
                    setTimeout(() => {
                        setTimeWait(true);
                        setLsRequests(response.data);
                        setRows(response.data);
                    }, 1500);
                }
            });
        } catch (error) { }
    };

    useEffect(() => {
        getAll();
    }, []);

    let usersResult = <></>;

    if (timeWait) {
        usersResult = stableSort(lsRequests, getComparator('asc', 'documento')).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((lsRequests, index) => (
                <Grid key={index} item xs={12} sm={6} lg={3} xl={2}>
                    <CardAnsweredView key={index} lsRequests={lsRequests} />
                </Grid>
            ));
    } else if (messageAtencion !== '') {
        usersResult = (
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="h3">{messageAtencion}</Typography>
            </Grid>
        );
    } else {
        usersResult = <Grid item xs={12}><Cargando /></Grid>
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={7.5}>
                        <Typography variant="h3">Solicitudes Respondidas</Typography>
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
                            onClick={() => navigate('/requests/menu')}>
                            {TitleButton.Cancelar}
                        </Button>
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
                                count={lsRequests.length}
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

export default ListAnsweredView;