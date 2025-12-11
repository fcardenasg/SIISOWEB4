import { useState, Fragment } from 'react';
import ControlModal from 'components/controllers/ControlModal';
import MedicionaLaboralExport from './Export/MedicionaLaboralExport';
import ReintegroExport from './Export/ReintegroExport';
import AccidenteTrabajo from './Export/AccidenteTrabajo';
import AusentismoExport from './Export/AusentismoExport';

const lsTipoExcelAusentismo = [
    { value: 0, label: 'DAILY' },
    { value: 1, label: 'AUDITORÍA' },
    { value: 2, label: 'HISTÓRICO' },
]

const lsTipoBusqueda = [
    { value: 0, label: 'DOCUMENTO' },
    { value: 1, label: 'SEDE' },
    { value: 2, label: 'SEDE Y RANGO DE FECHA' },
]

const ExportOccupationalHealth = ({ setOpenModal, openModal, exportBy }) => {
    const [sede, setSede] = useState(0);
    const [payStatus, setPayStatus] = useState(0);
    const [tipoExcelAusentismo, setTipoExcelAusentismo] = useState(0);
    const [documento, setDocumento] = useState('');
    const [opcionBusqueda, setOpcionBusqueda] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [opcionFecha, setOpcionFecha] = useState(3);

    const handleClose = () => {
        setOpenModal(false);
        setSede(0);
        setDocumento('');
        setTipoExcelAusentismo(0);
        setOpcionBusqueda(0);
        setFechaInicio(null);
        setFechaFin(null);
        setOpcionFecha(3);
    }

    return (
        <Fragment>
            <ControlModal
                title={`Generar Excel De ${exportBy.titulo}`}
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                {exportBy.codigo === 'MEDIC' &&
                    <MedicionaLaboralExport
                        lsTipoExcelAusentismo={lsTipoExcelAusentismo}
                        lsBusqueda={lsTipoBusqueda}
                        setTipoExcelAusentismo={setTipoExcelAusentismo} tipoExcelAusentismo={tipoExcelAusentismo}
                        setDocumento={setDocumento} documento={documento}
                        setOpcionBusqueda={setOpcionBusqueda} opcionBusqueda={opcionBusqueda}
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'REINT' &&
                    <ReintegroExport
                        lsTipoExcelAusentismo={lsTipoExcelAusentismo}
                        lsBusqueda={lsTipoBusqueda}
                        setTipoExcelAusentismo={setTipoExcelAusentismo} tipoExcelAusentismo={tipoExcelAusentismo}
                        setDocumento={setDocumento} documento={documento}
                        setOpcionBusqueda={setOpcionBusqueda} opcionBusqueda={opcionBusqueda}
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'AT' &&
                    <AccidenteTrabajo
                        lsTipoExcelAusentismo={lsTipoExcelAusentismo}
                        lsBusqueda={lsTipoBusqueda}
                        setTipoExcelAusentismo={setTipoExcelAusentismo} tipoExcelAusentismo={tipoExcelAusentismo}
                        setDocumento={setDocumento} documento={documento}
                        setOpcionBusqueda={setOpcionBusqueda} opcionBusqueda={opcionBusqueda}
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                        setPayStatus={setPayStatus} payStatus={payStatus}
                    />
                }

                {exportBy.codigo === 'AUSENTI' &&
                    <AusentismoExport
                        parametroConsulta={exportBy.codigo}
                        lsTipoExcelAusentismo={lsTipoExcelAusentismo}
                        lsBusqueda={lsTipoBusqueda}
                        setTipoExcelAusentismo={setTipoExcelAusentismo} tipoExcelAusentismo={tipoExcelAusentismo}
                        setDocumento={setDocumento} documento={documento}
                        setOpcionBusqueda={setOpcionBusqueda} opcionBusqueda={opcionBusqueda}
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                        setOpcionFecha={setOpcionFecha} opcionFecha={opcionFecha}
                    />
                }
            </ControlModal>
        </Fragment>
    );
};

export default ExportOccupationalHealth;