import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Grid, InputAdornment, OutlinedInput, TablePagination, Typography } from '@mui/material';

import ViewProgramming from './ViewProgramming';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';

import { IconSearch } from '@tabler/icons';
import { GetAllAttention } from 'api/clients/AttentionClient';

const ListProgramming = () => {
    const theme = useTheme();
    const [lsProgramming, setLsProgramming] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const GetAll = async () => {
        const response = await GetAllAttention(0, 0);
        if (response.status === 200)
            setLsProgramming(response.data.entities)
    };

    useEffect(() => {
        GetAll();
    }, []);

    let usersResult = <></>;

    if (lsProgramming) {
        usersResult = lsProgramming.map((programming, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <ViewProgramming key={index} programming={programming} />
            </Grid>
        ));
    }

    const [search, setSearch] = useState('');

    const handleSearch = async (event) => {
        const newString = event?.target.value;
        setSearch(newString);

        if (newString) {
            await axios
                .post('/api/profile-card/filter', {
                    key: newString
                })
                .then((response) => {
                    setLsProgramming(response.data.results);
                });
        } else {
            GetAll();
        }
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Lista de Pacientes</Typography>
                    </Grid>
                    <Grid item>
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
            <Grid container direction="row" spacing={gridSpacing}>

                {usersResult}

                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>

                        <Grid item>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
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