import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllOccupationalExamination } from 'api/clients/OccupationalExaminationClient';

const columnsAntecedentesPatologicos = [
    { field: 'congenitosAP', headerName: 'Congenitos', width: 100 },
    { field: 'inmunoPrevenibleAP', headerName: 'Inmunoprevenible', width: 100 },
    { field: 'infecciososAP', headerName: 'Infeccioso', width: 100 },
    { field: 'ojoAP', headerName: 'Ojo', width: 100 },
    { field: 'agudezaVisualAP', headerName: 'Agudeza Visual', width: 100 },
    { field: 'oidosAP', headerName: 'Oidos', width: 100 },
    { field: 'nasoFaringeAP', headerName: 'Naso Faringe', width: 100 },
    { field: 'cardiovascularAP', headerName: 'Cardio Vascular', width: 100 },
    { field: 'pulmonarAP', headerName: 'Pulmonar', width: 100 },
    { field: 'gastrointestinalAP', headerName: 'Gastrointestinal', width: 100 },
    { field: 'gimitoUrinarioAP', headerName: 'Genitourinario', width: 100 },
    { field: 'neurologicoAP', headerName: 'Neurológico', width: 100 },
    { field: 'transtornoPielAP', headerName: 'Transtorno de Piel', width: 100 },
    { field: 'osteoMuscularAP', headerName: 'Osteo Muscular', width: 100 },
    { field: 'alergicosAP', headerName: 'Alergicos', width: 100 },
];

/* congenitosAP, inmunoPrevenibleAP, infecciososAP,
    ojoAP, agudezaVisualAP, oidosAP, nasoFaringeAP, cardiovascularAP, pulmonarAP, gastrointestinalAP, gimitoUrinarioAP,
    neurologicoAP, transtornoPielAP, osteoMuscularAP, alergicosAP, toxicoAP, faRmacologicosAP, quirurgicosAP,
    traumaticosAP, tranfuccionesAP, etsAP, deformidadesAP, psiquiatricosAP, farmacoDependenciaAP, emAP, renalAP,
    asmaAP, orlAP, cancerAP */

const TableAntecedentes = ({ param = 0 }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllOccupationalExamination(0, 0);
                if (lsServer.status === 200)
                    setRows(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, []);


    return (
        <div style={{ height: 620, width: '100%' }}>
            <DataGrid
                rows={rows.length != 0 ? rows : []}
                columns={columnsAntecedentesPatologicos}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
}

export default TableAntecedentes;