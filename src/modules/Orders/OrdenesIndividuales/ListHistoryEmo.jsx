import { Fragment, useEffect, useState } from 'react';

import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

import { GetLastRegister } from 'api/clients/OccupationalExaminationClient';
import { ViewFormat } from 'components/helpers/Format';

const ListHistoryEmo = ({ documento }) => {
    const [lsOrdenesParaclinicos, setLsOrdenesParaclinicos] = useState([]);

    async function getAllListParaclinicos() {
        try {
            const lsServer = await GetLastRegister(documento);
            setLsOrdenesParaclinicos(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAllListParaclinicos();
    }, [documento]);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Documento</TableCell>
                                    <TableCell>Empleado</TableCell>
                                    <TableCell>Fecha Atención</TableCell>
                                    <TableCell>Tipo Atención</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {lsOrdenesParaclinicos.map((row) => (
                                    <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell component="th" scope="row">{row.documento}</TableCell>
                                        <TableCell>{row.nameEmpleado}</TableCell>
                                        <TableCell>{ViewFormat(row.fechaAtencion)}</TableCell>
                                        <TableCell>{row.tipoAtencion}</TableCell>
                                    </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ListHistoryEmo;