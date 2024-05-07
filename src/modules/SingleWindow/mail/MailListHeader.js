import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Grid, InputAdornment, Menu, MenuItem, Stack, TablePagination, TextField, useMediaQuery } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const MailListHeader = ({
    search,
    handleSearch,
    length,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
}) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1.5}>
                    <TextField
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                        fullWidth={matchDownSM}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        label="Buscar correo"
                        onChange={handleSearch}
                        placeholder="Buscar correo"
                        value={search}
                        size="small"
                    />
                </Stack>
            </Grid>

            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1.5}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                        placeholder="Search Mail"
                        value={search}
                        size="small"
                    />
                    {/* table pagination */}
                    <TablePagination
                        sx={{ '& .MuiToolbar-root': { pl: 1 } }}
                        rowsPerPageOptions={[]}
                        component="div"
                        count={length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

MailListHeader.propTypes = {
    search: PropTypes.string,
    length: PropTypes.number,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    handleSearch: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
    handleChangePage: PropTypes.func,
    handleDrawerOpen: PropTypes.func,
    handleDenseTable: PropTypes.func
};

export default MailListHeader;