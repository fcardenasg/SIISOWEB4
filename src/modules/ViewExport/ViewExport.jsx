import { useState, Fragment } from "react";
import ControlModal from "components/controllers/ControlModal";
import ExcelRegistroAtencion from "./ExcelRegistroAtencion";
import ExcelAsesoria from "./ExcelAsesoria";
import ExcelParaclinico from "./ExcelParaclinico";
import ExcelAtencionMedica from "./ExcelAtencionMedica";

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
                title={`Generar Excel De ${exportBy.titulo}`}
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                {exportBy.codigo === 'REGIS_ATEN' ?
                    <ExcelRegistroAtencion
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    /> : null
                }

                {exportBy.codigo === 'ASESO' ?
                    <ExcelAsesoria
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    /> : null
                }

                {exportBy.codigo === 'PARACLINI' ?
                    <ExcelParaclinico
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    /> : null
                }

                {exportBy.codigo === 'ATEN_MEDI' ?
                    <ExcelAtencionMedica
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    /> : null
                }

                {exportBy.codigo === 'EMO' ?
                    <ExcelRegistroAtencion
                        setSede={setSede} sede={sede}
                        setFechaInicio={setFechaInicio} fechaInicio={fechaInicio}
                        setFechaFin={setFechaFin} fechaFin={fechaFin}
                    /> : null
                }
            </ControlModal>
        </Fragment>
    );
}

export default ViewExport;