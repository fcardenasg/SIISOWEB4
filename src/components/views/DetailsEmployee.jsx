import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Grid, Typography, Avatar } from '@mui/material';
import Cargando from 'components/loading/Cargando';
import { gridSpacing } from 'store/constant';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';

const DetailsEmployee = ({ id }) => {
    const [employee, setEmployee] = useState([]);

    async function GetById() {
        try {
            const lsServer = await GetByIdEmployee(id);
            if (lsServer?.data.status === 200) {
                setEmployee(lsServer.data.data);
            } else {
                setEmployee(lsServer.data.data);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        GetById();
    }, [])

    return (
        <>
            {
                employee.length !== 0 ? (
                    <Grid container alignContent="center" alignItems="center" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs zeroMinWidth>
                                    <Avatar sx={{ width: 150, height: 150 }} src={employee.imagenUrl} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h3" component="div">
                                {employee.nombres}
                            </Typography>
                            <Typography variant="caption" sx={{ pr: 2 }}>Cargo: {employee.nameRosterPosition}</Typography>
                            <Typography variant="caption">Estado: {employee.namePayStatus}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Email</Typography>
                                    <Typography variant="h6">{employee.email}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Celular</Typography>
                                    <Typography variant="h6">{employee.celular}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Telefono Contacto </Typography>
                                    <Typography variant="h6">{employee.telefonoContacto}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption">Sede</Typography>
                                    <Typography variant="h6">{employee.nameSede}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : <Cargando />
            }
        </>
    );
};

DetailsEmployee.propTypes = {
    id: PropTypes.string
};

export default DetailsEmployee;