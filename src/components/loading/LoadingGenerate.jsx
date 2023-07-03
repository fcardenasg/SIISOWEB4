import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import Cargando from "./Cargando";

const LoadingGenerate = ({ title }) => {
    return (
        <Fragment>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={4}>
                    <Cargando size={35} mxx={0} myy={1} />
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="body2">{title}</Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default LoadingGenerate;