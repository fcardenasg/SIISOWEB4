import { Grid } from "@mui/material";
import { Fragment } from "react";
import Cargando from "./Cargando";

const LoadingGenerate = ({ title }) => {
    return (
        <Fragment>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Cargando title={title} size={35} />
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default LoadingGenerate;