import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import {
    Grid,
    IconButton,
    TableCell,
    TableRow,
    Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { MessageSuccess, MessageDelete } from 'components/alert/AlertAll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModalEditarRiesgo from '../ModalEditarRiesgo';

export default function RowDLTD({ row = [], handleDelete, getAllWorkHistory }) {
    const diferen = "DLTD";

    const [openDelete, setOpenDelete] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [numIdRiesgo, setNumIdRiesgo] = useState('');
    const [openEditarRiesgo, setOpenEditarRiesgo] = useState(false);

    const handleUpdate = async (idRiesgo) => {
        setNumIdRiesgo(idRiesgo);
        setOpenEditarRiesgo(true);
    }

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <ModalEditarRiesgo
                title="ACTUALIZAR HISTORIA LABORAL"
                idRisk={numIdRiesgo}
                open={openEditarRiesgo}
                onClose={() => setOpenEditarRiesgo(false)}
                diferen={diferen}
                getAllWorkHistory={getAllWorkHistory}
            />

            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{row.nameCargo}</TableCell>
                <TableCell>{row.anio}</TableCell>
                <TableCell>{row.meses}</TableCell>
                <TableCell>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Tooltip title="Editar" onClick={() => handleUpdate(row.id)}>
                                <IconButton color="primary" size="small">
                                    <EditIcon sx={{ fontSize: '2rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={6}>
                            <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
                                <IconButton color="error" size="small">
                                    <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

RowDLTD.propTypes = {
    row: PropTypes.object,
    handleDelete: PropTypes.func,
    documento: PropTypes.string,
};