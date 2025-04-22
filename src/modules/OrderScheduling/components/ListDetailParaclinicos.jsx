import {
    Alert,
    AlertTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { GetComboProgramacionOrdenes, GetSupplierByCityIndividual } from 'api/clients/ProgramacionOrdenesClient';
import SelectOnChange from 'components/input/SelectOnChange';
import { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

const ListDetailParaclinicos = ({ validateParaclinico, textError, setLsDataParaclinico, dataParaclinico }) => {
    const [lsCiudad, setLsCiudad] = useState([]);
    const [ciudad, setCiudad] = useState({});

    useEffect(() => {
        async function getAll() {
            try {
                const lsCiudad = await GetComboProgramacionOrdenes();
                setLsCiudad(lsCiudad.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleCiudadChange = async (id, value) => {
        try {
            const dataCity = await GetSupplierByCityIndividual(value, id);

            if (dataCity.data) {
                setLsDataParaclinico((prevState) =>
                    prevState.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                id: dataCity.data.id,
                                nameTipoExamen: dataCity.data.nameTipoExamen,
                                nameProveedor: dataCity.data.nameProveedor,
                                idTipoExamen: dataCity.data.idTipoExamen,
                                idCiudad: value, // Actualiza el valor de la ciudad
                            }
                            : item
                    )
                );

                setCiudad((prevState) => ({
                    ...prevState,
                    [id]: value, // Asegúrate de que el estado refleje el nuevo valor
                }));
            }
        } catch (error) {
            console.error("Error al actualizar la ciudad:", error);
        }
    };

    return (
        <>
            {validateParaclinico.value ?
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
                                {dataParaclinico.map((row) => (
                                    <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
                                        <TableCell>{row.nameTipoExamen}</TableCell>
                                        <TableCell>{row.nameProveedor}</TableCell>
                                        <TableCell>
                                            <SelectOnChange
                                                sx={{ width: 200 }}
                                                name={`ciudad-${row.id}`}
                                                label="Ciudad"
                                                value={ciudad[row.id] || row.idCiudad}
                                                options={lsCiudad.filter((fil) => fil.intcodigo === row.idTipoExamen)}
                                                onChange={(e) => handleCiudadChange(row.id, e.target.value)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard> :
                <Alert severity="error" color="error">
                    <AlertTitle>NO SE PUDO PROGRAMAR LOS EXÁMENES PARACLÍNICOS</AlertTitle>
                    {textError}
                </Alert>
            }
        </>
    );
};

export default ListDetailParaclinicos;