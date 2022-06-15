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
import { Fragment } from 'react';

export const SubRow = ({ title, row }) => {
    const theme = useTheme();

    const handleClick = (event, id) => {
        alert(id);
    };

    return (
        <Fragment>

            <TableContainer sx={{ pb: 2, pt: 4 }}>
                <SubCard
                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                    title={title}
                    content={false}
                >
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
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
                                <TableRow hover onClick={(event) => handleClick(event, historyRow.id)} key={historyRow.id}>

                                    <TableCell>{historyRow.id}</TableCell>
                                    <TableCell>{historyRow.nameClase}</TableCell>
                                    <TableCell >{historyRow.nameExpocision}</TableCell>
                                    <TableCell > {historyRow.nameGradoSinEPP} </TableCell>
                                    <TableCell>{historyRow.nameGradoConEPP}</TableCell>
                                    <TableCell >{historyRow.medidasControl}</TableCell>
                                    <TableCell >{historyRow.anio}</TableCell>
                                    <TableCell >{historyRow.mes}</TableCell>

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
    row: PropTypes.array,
};