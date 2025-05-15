import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const MonitoringDetailParaclinicos = ({ dataParaclinico }) => {
    return (
        <MainCard title="Proveedores asignados">
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Paraclínicos</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell align="left">Ciudad</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {dataParaclinico?.map((row) => (
                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
                                <TableCell>{row.nameTipoExamen}</TableCell>
                                <TableCell>{row.nameProveedor}</TableCell>
                                <TableCell>{row.nameCiudad}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default MonitoringDetailParaclinicos;