import { Grid, Box, Typography, Button, CardMedia } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { ColorDrummondltd } from 'themes/colors';
import LogoDrummondLTD from 'assets/img/LogoDrummondLTD.png';
import LogoDrummondEnergy from 'assets/img/LogoDrummondEnergy.png';
import config from "config";

const SelectionView = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            width: 1535,
                            height: 70,
                            backgroundColor: ColorDrummondltd.RedDrummond
                        }}
                    >
                        <Typography sx={{ pt: 2, pl: 10, color: 'white' }} align="left" variant="h1">© SIISO</Typography>
                    </Box>
                </Grid>

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

                <Grid container sx={{ pt: 8, textAlign: 'center' }}>
                    <Grid item xs={6}>
                        <Button onClick={() => navigate("/dashboard/default", { replace: true })} variant="outlined" color="error" sx={{ color: ColorDrummondltd.RedDrummond }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={LogoDrummondLTD}
                                alt="Logo DrummondLTD"
                            />
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="outlined" color="error" sx={{ color: ColorDrummondltd.RedDrummond }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={LogoDrummondEnergy}
                                alt="Logo DrummondLTD"
                            />
                        </Button>
                    </Grid>
                </Grid>

                <Grid container sx={{ pt: 17 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ color: ColorDrummondltd.GrayDrummond }} align="center" variant="h3">
                            © Copyright 2022 Drummond Ltd. Colombia - V 4.0.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ pt: 16 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ pr: 2, color: ColorDrummondltd.GrayDrummond }} align="right" variant="h5">
                            © Copyright 2022 Drummond Ltd. Colombia - V 4.0.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default SelectionView;