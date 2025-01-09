import { Fragment, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery, Grid } from "@mui/material";
import Cargando from "components/loading/Cargando";

const ViewPDF = ({ dataPDF, width = 850, height = 490 }) => {
    console.log(dataPDF);

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [timeWait, setTimeWait] = useState(false);
    const [pdfUrl, setPdfUrl] = useState();

    useEffect(() => {
        if (dataPDF) {
            if (validarURL(dataPDF)) {
                const file = dataURLtoFile(dataPDF, `modulopdf${formatDate()}.pdf`);
                const url = URL.createObjectURL(file);
                setPdfUrl(url);

                return () => {
                    URL.revokeObjectURL(url);
                };
            } else {
                setPdfUrl(dataPDF);
            }
        }
    }, [dataPDF]);

    useEffect(() => {
        setTimeout(() => {
            if (dataPDF !== null) {
                setTimeWait(true);
            } else {
                setTimeWait(false);
            }
        }, 100);
    }, [dataPDF]);

    let renderComponent = <></>;

    if (timeWait) {
        renderComponent = (
            <object type='application/pdf'
                data={pdfUrl}
                width={matchesXS ? '380' : width}
                height={matchesXS ? '480' : height}
            />
        );
    } else {
        renderComponent = (
            <Grid item xs={12}>
                <Cargando />
                <Typography variant="h3">Cargando archivo... Si no carga, no hay archivo para visualizar</Typography>
            </Grid>
        );
    }

    return (
        <Fragment>
            <Typography align="center">
                {renderComponent}
            </Typography>
        </Fragment>
    )
}

export default ViewPDF;

function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function formatDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque los meses son 0-indexados
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0').slice(0, 3); // solo los primeros 3 dígitos

    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

function validarURL(url) {
    const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}([\/\w .-]*)*\/?$/i;
    return regex.test(url);
}