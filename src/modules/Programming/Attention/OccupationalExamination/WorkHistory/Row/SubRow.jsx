import { useState, Fragment } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Grid,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModalRisk from '../ModalRisk';

export const SubRow = ({ title, getAll, diferen, getSumaRiesgo, onClickDelete, row }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [idRisk, setIdRisk] = useState(0);

    const handleClick = (id) => {
        setIdRisk(id);
        setOpen(true);
    };

    return (
        <Fragment>
            <ModalRisk
                diferen={diferen}
                idRisk={idRisk}
                getSumaRiesgo={getSumaRiesgo}
                open={open}
                title={'Editar ' + title}
                onClose={() => setOpen(false)}
                getAll={getAll}
            />

            <TableContainer sx={{ pb: 2, pt: 4 }}>
                <SubCard
                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                    title={title}
                    content={false}
                >
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>Clase</TableCell>
                                {diferen === 'COMPANY' ? null : <TableCell>Grado sin EPP</TableCell>}
                                {diferen === 'COMPANY' ? null : <TableCell>Grado con EPP</TableCell>}
                                {diferen === 'COMPANY' ? null : <TableCell>Medidas de Control</TableCell>}
                                <TableCell>Año</TableCell>
                                <TableCell>Mes</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {row.map((historyRow) => (
                                <TableRow hover>
                                    <TableCell>{historyRow.nameClase}</TableCell>
                                    {diferen === 'COMPANY' ? null :
                                        <TableCell>{historyRow.nameGradoSinEPP}</TableCell>
                                    }

                                    {diferen === 'COMPANY' ? null :
                                        <TableCell>{historyRow.nameGradoConEPP}</TableCell>
                                    }

                                    {diferen === 'COMPANY' ? null :
                                        <TableCell>{historyRow.medidasControl}</TableCell>
                                    }
                                    <TableCell>{historyRow.anio}</TableCell>
                                    <TableCell>{historyRow.mes}</TableCell>

                                    <TableCell sx={{ cursor: 'pointer' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Tooltip title="Agregar" onClick={() => handleClick(historyRow.id)}>
                                                    <IconButton color="info" size="small">
                                                        <AddCircleOutlineIcon sx={{ fontSize: '2rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Tooltip title="Eliminar" onClick={() => onClickDelete(historyRow.id)}>
                                                    <IconButton color="error" size="small">
                                                        <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </SubCard>
            </TableContainer>
        </Fragment>
    );
}

SubRow.propTypes = {
    title: PropTypes.string,
    diferen: PropTypes.string,
    onClickDelete: PropTypes.func,
    getSumaRiesgo: PropTypes.func,
    getAll: PropTypes.func,
    row: PropTypes.array,
};