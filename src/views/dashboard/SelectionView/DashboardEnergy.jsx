import { Grid, Typography, CardMedia } from "@mui/material";
import { Fragment } from "react";
import { ColorDrummondltd } from 'themes/colors';
import LogoDrummondLTD from 'assets/img/LogoDrummondLTD.png';
import LogoDrummondEnergy from 'assets/img/LogoDrummondEnergy.png';

const DashboardEnergy = () => {

    return (
        <Fragment>
            <LogoDrummondEnergy />

            <CardMedia
                component="img"
                height="100"
                image={LogoDrummondLTD}
                alt="Logo DrummondLTD"
            />

            <Grid container sx={{ pt: 12 }}>
                <Grid item xs={12}>
                    <Typography sx={{ color: ColorDrummondltd.RedDrummond }} align="center" variant="h2">
                        Sistema integral de información de salud ocupacional.
                    </Typography>

                    <Typography sx={{ color: ColorDrummondltd.GrayDrummond }} align="center" variant="h3">
                        Departamento de Salud Ocupacional Drummond LTD.
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default DashboardEnergy;