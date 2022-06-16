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
} from '@mui/material';
import ModalRisk from './ModalRisk';

export const SubRow = ({ title, getAll, row }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [idRisk, setIdRisk] = useState(0);

    const handleClick = (event, id) => {
        setOpen(true);
        setIdRisk(id);
    };

    return (
        <Fragment>
            <ModalRisk
                idRisk={idRisk}
                key={row.id}
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
                                <TableCell>Consecutivo</TableCell>
                                <TableCell>Clase</TableCell>
                                <TableCell>Exposición</TableCell>
                                <TableCell >Grado sin EPP</TableCell>
                                <TableCell >Grado con EPP</TableCell>
                                <TableCell >Medidas de Control</TableCell>
                                <TableCell >Año</TableCell>
                                <TableCell >Mes</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {row.map((historyRow) => (
                                <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} onClick={(event) => handleClick(event, historyRow.id)} key={historyRow.id}>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.id}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.nameClase}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.nameExpocision}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}> {historyRow.nameGradoSinEPP} </TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.nameGradoConEPP}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.medidasControl}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.anio}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.mes}</TableCell>

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
    getAll: PropTypes.func,
    row: PropTypes.array,
};