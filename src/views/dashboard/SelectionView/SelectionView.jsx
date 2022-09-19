import { Grid, Box, Typography, Button, CardMedia, Divider } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { ColorDrummondltd } from 'themes/colors';
import { styled } from '@mui/material/styles';

import LogoDrummondLTD from 'assets/img/LogoDrummondLTD.png';
import LogoDrummondEnergy from 'assets/img/LogoDrummondEnergy.png';

const FooterWrapper = styled('div')(({ theme }) => ({
    top: 0,
    width: '100%',
    padding: '15px 0',
    background: ColorDrummondltd.RedDrummond,
}));

const SelectionView = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <FooterWrapper>
                        <Box>
                            <Typography sx={{ pl: 10, color: 'white' }} align="left" variant="h1">© SIISO</Typography>
                        </Box>
                    </FooterWrapper>
                </Grid>

                <Grid container sx={{ pt: 10 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ color: ColorDrummondltd.RedDrummond }} align="center" variant="h2">
                            Sistema integral de información de salud ocupacional.
                        </Typography>

                        <Typography sx={{ color: ColorDrummondltd.GrayDrummond }} align="center" variant="h3">
                            Departamento de Salud Ocupacional Drummond LTD.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ pt: 10, textAlign: 'center' }}>
                    <Grid item xs={12} md={12}>
                        <Button onClick={() => navigate("/dashboard/ltd", { replace: true })} variant="outlined" color="error" sx={{ color: ColorDrummondltd.RedDrummond }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={LogoDrummondLTD}
                                alt="Logo DrummondLTD"
                            />
                        </Button>
                    </Grid>

                </Grid>

                <Divider />
                <Grid container sx={{ pt: 2, textAlign: 'center' }}>
                    <Grid item xs={12} md={12}>
                        <Button onClick={() => navigate("/dashboard/energy", { replace: true })} variant="outlined" color="error" sx={{ color: ColorDrummondltd.RedDrummond }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={LogoDrummondEnergy}
                                alt="Logo DrummondLTD"
                            />
                        </Button>
                    </Grid>
                </Grid>

                <Grid container sx={{ pt: 8 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ color: ColorDrummondltd.GrayDrummond }} align="center" variant="h6">
                            © Copyright 2022 Drummond Ltd. Colombia - V 4.0.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ pt: 8 }}>
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