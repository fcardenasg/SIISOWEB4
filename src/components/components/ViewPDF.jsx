import { Fragment, useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery, Grid } from "@mui/material";
import Cargando from "components/loading/Cargando";

const ViewPDF = ({ dataPDF, width = 850, height = 490 }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [timeWait, setTimeWait] = useState(false);

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
                data={dataPDF}
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