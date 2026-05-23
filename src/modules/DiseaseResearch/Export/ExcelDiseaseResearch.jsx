import ControlModal from "components/controllers/ControlModal";
import { useState } from "react";
import ExportAssignment from "./ExportAssignment";
import ExportResearch from "./ExportResearch";
import ExportRehabilitationPlan from "./ExportRehabilitationPlan";
import ExportAPT from "./ExportAPT";

const lsTipoBusqueda = [
    { value: 0, label: 'DOCUMENTO' },
    { value: 1, label: 'SEDE' },
    { value: 2, label: 'SEDE Y RANGO DE FECHA' },
]

const ExcelDiseaseResearch = ({ setOpenModal, openModal, exportBy }) => {
    const [sede, setSede] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [opcionBusqueda, setOpcionBusqueda] = useState(0);
    const [documento, setDocumento] = useState('');

    const handleClose = () => {
        setSede(0);
        setOpcionBusqueda(0);
        setDocumento('');
        setOpenModal(false);
        setFechaInicio(null);
        setFechaFin(null);
    }

    return (
        <ControlModal
            title={exportBy.title}
            open={openModal}
            onClose={handleClose}
            maxWidth="xs"
        >
            {exportBy.url === "EXPORT_ASIG" &&
                <ExportAssignment
                    setOpcionBusqueda={setOpcionBusqueda}
                    opcionBusqueda={opcionBusqueda}
                    setSede={setSede}
                    sede={sede}
                    setDocumento={setDocumento}
                    documento={documento}
                    setFechaInicio={setFechaInicio}
                    fechaInicio={fechaInicio}
                    setFechaFin={setFechaFin}
                    fechaFin={fechaFin}
                    lsBusqueda={lsTipoBusqueda}
                />
            }

            {exportBy.url === "EXPORT_IEL" &&
                <ExportResearch
                    setOpcionBusqueda={setOpcionBusqueda}
                    opcionBusqueda={opcionBusqueda}
                    setSede={setSede}
                    sede={sede}
                    setDocumento={setDocumento}
                    documento={documento}
                    setFechaInicio={setFechaInicio}
                    fechaInicio={fechaInicio}
                    setFechaFin={setFechaFin}
                    fechaFin={fechaFin}
                    lsBusqueda={lsTipoBusqueda}
                />
            }

            {exportBy.url === "EXPORT_PR" &&
                <ExportRehabilitationPlan
                    setOpcionBusqueda={setOpcionBusqueda}
                    opcionBusqueda={opcionBusqueda}
                    setSede={setSede}
                    sede={sede}
                    setDocumento={setDocumento}
                    documento={documento}
                    setFechaInicio={setFechaInicio}
                    fechaInicio={fechaInicio}
                    setFechaFin={setFechaFin}
                    fechaFin={fechaFin}
                    lsBusqueda={lsTipoBusqueda}
                />
            }

            {exportBy.url === "EXPORT_APT" &&
                <ExportAPT
                    setOpcionBusqueda={setOpcionBusqueda}
                    opcionBusqueda={opcionBusqueda}
                    setSede={setSede}
                    sede={sede}
                    setDocumento={setDocumento}
                    documento={documento}
                    setFechaInicio={setFechaInicio}
                    fechaInicio={fechaInicio}
                    setFechaFin={setFechaFin}
                    fechaFin={fechaFin}
                    lsBusqueda={lsTipoBusqueda}
                />
            }
        </ControlModal>
    );
}

export default ExcelDiseaseResearch;