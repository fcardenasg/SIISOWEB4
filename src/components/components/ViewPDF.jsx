import Cargando from "components/loading/Cargando";
import { Fragment } from "react";
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from "@mui/material";

const ViewPDF = ({ dataPDF }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Fragment>
            <Typography align="center">
                {dataPDF !== null ?
                    <object type='application/pdf'
                        data={dataPDF}
                        width={matchesXS ? '380' : '850'}
                        height={matchesXS ? '480' : '490'}
                    /> : <Cargando />
                }
            </Typography>
        </Fragment>
    )
}

export default ViewPDF;