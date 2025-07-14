import { Fragment, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, useMediaQuery, Grid } from "@mui/material";
import Cargando from "components/loading/Cargando";
import { useBoolean } from "hooks/use-boolean";

const ViewPDF = ({ dataPDF, width = 850, height = 490 }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [pdfUrl, setPdfUrl] = useState(null);
    const loading = useBoolean(true);

    useEffect(() => {
        if (dataPDF) {
            loading.onTrue();

            if (validarURL(dataPDF)) {
                // Si es una URL válida, convierte el dataURL a un archivo
                const file = dataURLtoFile(dataPDF, `modulopdf${formatDate()}.pdf`);
                const url = URL.createObjectURL(file);
                setPdfUrl(url);

                // Libera el objeto URL cuando el componente se desmonta
                return () => {
                    URL.revokeObjectURL(url);
                };
            } else {
                // Si no es una URL válida, asume que es una URL directa
                setPdfUrl(dataPDF);
            }
        } else {
            setPdfUrl(null); // No hay archivo disponible
        }

        loading.onFalse();
    }, [dataPDF]);

    const renderComponent = () => {
        if (loading.value) {
            // Muestra el spinner mientras carga
            return (
                <Grid item xs={12}>
                    <Cargando />
                    <Typography variant="h3" align="center">
                        Cargando archivo... Si no carga, no hay archivo para visualizar
                    </Typography>
                </Grid>
            );
        }

        if (!pdfUrl) {
            // Si no hay archivo disponible
            return (
                <Typography variant="h3" align="center">
                    No hay archivo disponible para visualizar
                </Typography>
            );
        }

        // Previsualización del archivo PDF
        return (
            <iframe
                title="PDF Viewer"
                src={pdfUrl}
                width={matchesXS ? '380' : width}
                height={matchesXS ? '480' : height}
                style={{ border: "none" }}
            />
        );
    };

    return (
        <Fragment>
            <Typography align="center">
                {renderComponent()}
            </Typography>
        </Fragment>
    );
};

export default ViewPDF;

// Función para convertir un dataURL a un archivo
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

// Función para formatear la fecha
function formatDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0").slice(0, 3);
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

// Función para validar una URL
function validarURL(url) {
    const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}([\/\w .-]*)*\/?$/i;
    return regex.test(url);
}