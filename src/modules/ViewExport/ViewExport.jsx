import { useState, Fragment } from "react";
import ControlModal from "components/controllers/ControlModal";
import ExcelRegistroAtencion from "./ExcelRegistroAtencion";

const ViewExport = ({ setOpenModal, openModal, exportBy }) => {
    const [sede, setSede] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const handleClose = () => {
        setSede(0);
        setOpenModal(false);
        setFechaInicio(null);
        setFechaFin(null);
    }

    return (
        <Fragment>
            <ControlModal
                title="Generar Excel"
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                <ExcelRegistroAtencion
                    setSede={setSede}
                    sede={sede}
                    setFechaInicio={setFechaInicio}
                    fechaInicio={fechaInicio}
                    setFechaFin={setFechaFin}
                    fechaFin={fechaFin}
                />
            </ControlModal>
        </Fragment>
    );
}

export default ViewExport;