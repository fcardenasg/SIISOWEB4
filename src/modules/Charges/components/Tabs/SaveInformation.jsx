import watchsaving from "assets/img/watchsaving.json";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSave from "../LoadingSave";
import TableSummary from "../TableSummary";

const items = [
    { text: "Registrando riesgos", icon: "mdi:alert-circle-outline" },
    { text: "Registrando clases y dominios", icon: "mdi:domain" },
    { text: "Registrando tipo de exposición", icon: "mdi:briefcase-outline" },
    { text: "Registrando EPP", icon: "mdi:shield-check-outline" },
    { text: "Registrando medidas de control", icon: "mdi:check-decagram-outline" },
];

const datosPrueba = [
    {
        cargo: "Shovel Operator",
        ges: "M-CCPL",
        claseRiesgo: 5,
        descripcion: "Mina - Carbón Cabina Pala",
        estadoError: false,
        mensajeError: ""
    },
    {
        cargo: "Shovel Operator",
        ges: "M-CCPL",
        claseRiesgo: 5,
        descripcion: "Mina - Carbón Cabina Pala",
        estadoError: false,
        mensajeError: ""
    },
    {
        cargo: "Shovel Operator",
        ges: "M-CCPL",
        claseRiesgo: 5,
        descripcion: "Mina - Carbón Cabina Pala",
        estadoError: false,
        mensajeError: ""
    },
    {
        cargo: "Loader Operator",
        ges: "M-CCL",
        claseRiesgo: 5,
        descripcion: "Mina - Carbón Cabina Cargador",
        estadoError: false,
        mensajeError: ""
    },
    {
        cargo: "Truck Operator",
        ges: "M-CCTR",
        claseRiesgo: 5,
        descripcion: "Mina - Carbón Cabina camión",
        estadoError: true,
        mensajeError: "El GES no coincide con el cargo registrado."
    },
    {
        cargo: "Dozer Operator",
        ges: "M-CCD",
        claseRiesgo: 5,
        descripcion: "Mina - Carbón - Cabina - Dozer",
        estadoError: true,
        mensajeError: "Clase de riesgo inconsistente con la tabla de referencia."
    }
];

const SaveInformation = ({ listData = [] }) => {
    return (
        <AnimatePresence mode="wait">
            {listData.length ? (
                <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ width: "100%" }}
                >
                    <TableSummary listData={listData} />
                </motion.div>
            ) : (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ width: "100%" }}
                >
                    <LoadingSave loadingSteps={items} jsonAnimation={watchsaving} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SaveInformation;