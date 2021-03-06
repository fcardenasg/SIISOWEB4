import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllByHistorico } from 'api/clients/WorkHistoryRiskClient';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'fecha', headerName: 'Fecha', width: 100 },
    { field: 'nameRiesgo', headerName: 'Riesgo', width: 300 },
    { field: 'nameClase', headerName: 'Clase', width: 300 },
    { field: 'nameCargo', headerName: 'Cargo', width: 150 },
    { field: 'nameGradoConEPP', headerName: 'Grado Con EPP', width: 130 },
    { field: 'nameGradoSinEPP', headerName: 'Grado Sin EPP', width: 130 },
    {
        field: 'anio',
        headerName: 'Año',
        type: 'number',
        width: 60,
    },
    {
        field: 'mes',
        headerName: 'Mes',
        type: 'number',
        width: 60,
    },
    { field: 'nameAtencion', headerName: 'Atención', width: 170 },
];

const SubRowHistoricalDLTD = ({ documento }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllByHistorico(0, 0, documento);
                if (lsServer.status === 200)
                    setRows(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [documento]);


    return (
        <div style={{ height: 620, width: '100%' }}>
            <DataGrid
                rows={rows.length != 0 ? rows : []}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
}

export default SubRowHistoricalDLTD;

SubRowHistoricalDLTD.propTypes = {
    documento: PropTypes.string,
};