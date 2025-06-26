import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import SelectOnChange from 'components/input/SelectOnChange';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const ArrayNotificacion = [
    { id: 1, name: 'Correo' },
    { id: 2, name: 'Mensaje de texto' },
    { id: 3, name: 'Whatsapp' }
]

const MonitoringDetailParaclinicos = ({ dataParaclinico }) => {
    const [valueNotificarPor, setValueNotificarPor] = useState(null);

    const hanledChangeNotificarPor = (e) => {
        setValueNotificarPor(e.target.value);
    }

    return (
        <MainCard
            title="Proveedores asignados"
            secondary={
                <IconButton size="large">
                    <NotificationsIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
            }
        >
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Paraclínicos</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Ciudad</TableCell>
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