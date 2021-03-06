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
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModalRisk from '../ModalRisk';

export const SubRow = ({ title, getAll, diferen, onClickDelete, row }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [idRisk, setIdRisk] = useState(0);

    const handleClick = (event, id) => {
        setOpen(true);
        setIdRisk(id);
    };

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
            <ModalRisk
                diferen={diferen}
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
                                {/* <TableCell>Exposici??n</TableCell> */}
                                {diferen === 'COMPANY' ? <></> : <TableCell>Grado sin EPP</TableCell>}
                                {diferen === 'COMPANY' ? <></> : <TableCell>Grado con EPP</TableCell>}
                                <TableCell >Medidas de Control</TableCell>
                                <TableCell >A??o</TableCell>
                                <TableCell >Mes</TableCell>
                                <TableCell >Acciones</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {row.map((historyRow) => (
                                <TableRow hover key={historyRow.id}>
                                    <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>{historyRow.id}</TableCell>
                                    <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>{historyRow.nameClase}</TableCell>
                                    {/* <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>{historyRow.nameExpocision}</TableCell> */}
                                    {diferen === 'COMPANY' ? <></> :
                                        <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>
                                            {historyRow.nameGradoSinEPP}
                                        </TableCell>
                                    }
                                    {diferen === 'COMPANY' ? <></> :
                                        <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>
                                            {historyRow.nameGradoConEPP}
                                        </TableCell>
                                    }
                                    <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>
                                        {FormatArray(historyRow.medidasControl)}
                                    </TableCell>
                                    <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>{historyRow.anio}</TableCell>
                                    <TableCell onClick={(event) => handleClick(event, historyRow.id)} sx={{ cursor: 'pointer' }}>{historyRow.mes}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }}>
                                        <Tooltip title="Eliminar" onClick={() => onClickDelete(historyRow.id)}>
                                            <IconButton color="error" size="small">
                                                <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                            </IconButton>
                                        </Tooltip>
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
    getAll: PropTypes.func,
    row: PropTypes.array,
};