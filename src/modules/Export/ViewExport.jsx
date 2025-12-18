import { useState, Fragment } from "react";
import ControlModal from "components/controllers/ControlModal";
import ExcelRegistroAtencion from "./ExcelRegistroAtencion";
import ExcelAsesoria from "./ExcelAsesoria";
import ExcelParaclinico from "./ExcelParaclinico";
import ExcelAtencionMedica from "./ExcelAtencionMedica";
import ExcelEmo from "./ExcelEmo";
import ExcelEnfermeria from "./ExcelEnfermeria";
import ExcelOrdenes from "./ExcelOrdenes";
import ExcelPruebaAlcoholDroga from "./ExcelPruebaAlcoholDroga";
import ExcelFramingham from "./ExcelFramingham";
import ExcelIndicadores from "./ExcelIndicadores";
import ExcelIndicador from "./ExcelIndicador";

import MedicionaLaboralExport from "modules/ExportOccupationalHealth/Export/MedicionaLaboralExport";
import ReintegroExport from "modules/ExportOccupationalHealth/Export/ReintegroExport";
import AccidenteTrabajo from "modules/ExportOccupationalHealth/Export/AccidenteTrabajo";
import AusentismoExport from "modules/ExportOccupationalHealth/Export/AusentismoExport";
import ExcelVentanilla from "./ExcelVentanilla";
import ExcelHistoriaEmbriaguez from "./ExcelHistoriaEmbriaguez";

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

const ViewExport = ({ setOpenModal, openModal, exportBy }) => {
    const [sede, setSede] = useState(0);
    const [payStatus, setPayStatus] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [opcionFecha, setOpcionFecha] = useState(3);

    const [allMes, setAllMes] = useState(false);
    const [lsMeses, setLsMeses] = useState([]);
    const [lsAnios, setLsAnios] = useState([]);

    const [tipoExcelAusentismo, setTipoExcelAusentismo] = useState(0);
    const [documento, setDocumento] = useState('');
    const [opcionBusqueda, setOpcionBusqueda] = useState(0);
    const [atencion, setAtencion] = useState(0);
    const [tipoParaclinico, setTipoParaclinico] = useState("ALL");
    const [fechaExportacion, setFechaExportacion] = useState(0);

    const handleClose = () => {
        setAtencion(0);
        setSede(0);
        setFechaExportacion(0);
        setTipoExcelAusentismo(0);
        setOpcionBusqueda(0);
        setTipoParaclinico("ALL");
        setDocumento('');
        setOpenModal(false);
        setFechaInicio(null);
        setFechaFin(null);
        setLsMeses([]);
        setLsAnios([]);
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

                {exportBy.codigo === 'REGIS_ATEN' &&
                    <ExcelRegistroAtencion
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'VENTANILLA' &&
                    <ExcelVentanilla
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                        setAtencion={setAtencion} atencion={atencion}
                    />
                }

                {exportBy.codigo === 'ASESO' &&
                    <ExcelAsesoria
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'PARACLINI' &&
                    <ExcelParaclinico
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                        setDocumento={setDocumento} documento={documento}
                        setOpcionBusqueda={setOpcionBusqueda} opcionBusqueda={opcionBusqueda}
                        setTipoParaclinico={setTipoParaclinico} tipoParaclinico={tipoParaclinico}
                        setFechaExportacion={setFechaExportacion} fechaExportacion={fechaExportacion}
                    />
                }

                {exportBy.codigo === 'ATEN_MEDI' &&
                    <ExcelAtencionMedica
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'EMO' &&
                    <ExcelEmo
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'ENFER' &&
                    <ExcelEnfermeria
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'ORDEN_EXAM' &&
                    <ExcelOrdenes
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'ALC_DRO' &&
                    <ExcelPruebaAlcoholDroga
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'FRAMI' &&
                    <ExcelFramingham
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    />
                }

                {exportBy.codigo === 'INDIC' &&
                    <ExcelIndicadores
                        setLsMeses={setLsMeses}
                        lsMeses={lsMeses}
                        setLsAnios={setLsAnios}
                        lsAnios={lsAnios}
                        setAllMes={setAllMes}
                        allMes={allMes}
                    />
                }

                {exportBy.codigo === 'INDICADOR' &&
                    <ExcelIndicador
                        setSede={setSede}
                        sede={sede}
                    />
                }

                {exportBy.codigo === 'HISEMBRIAGUEZ' &&
                    <ExcelHistoriaEmbriaguez
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                        setDocumento={setDocumento} documento={documento}
                        setOpcionBusqueda={setOpcionBusqueda} opcionBusqueda={opcionBusqueda}
                    />
                }
            </ControlModal>
        </Fragment>
    );
}

export default ViewExport;