import { Fragment } from 'react';
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

const SubRowChargeHistory = ({ title, row }) => {
    const theme = useTheme();

    const FormatArray = (medidasControl = '') => {
        if (medidasControl != '') {
            var array = JSON.parse(medidasControl);

            var resultMap = array.map((medida) => ({
                label: medida.label
            }));

            for (let index = 0; index < resultMap.length; index++) {
                const element = resultMap[index];
                const result = element.label + ' - ';
                if (index < resultMap.length) {
                    return result;
                }
            }
        }
    }

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
                                <TableRow hover key={historyRow.id}>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.id}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.nameClase}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.nameExpocision}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}> {historyRow.nameGradoSinEPP} </TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>{historyRow.nameGradoConEPP}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>
                                        {FormatArray(historyRow.medidasControl)}
                                    </TableCell>
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

export default SubRowChargeHistory;

SubRowChargeHistory.propTypes = {
    title: PropTypes.string,
    row: PropTypes.array,
};