import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import useAuth from 'hooks/useAuth';

import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { ViewFormat } from 'components/helpers/Format';

import "./report.module.css"

const ReportConceptAptitude = ({ datos = [], lsDataUser = [] }) => {

    return (
        <div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <img src={LogoReport} height={50} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h5" align="center"><b>DIVISION MÉDICA</b></Typography>
                            <Typography variant="h5" align="center"><b>HISTORIA CLINICA OCUPACIONAL</b></Typography>
                            <Typography variant="h5" align="center"><b>{datos.nameAtencion}</b></Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h5" align="center"><b>SIG-0410</b></Typography>
                            <Typography variant="h6" align="center"><b>Versión 06</b></Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h5">CONCEPTO EXAMEN OCUPACIONAL</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography align="right" variant="h5">FECHA DE CONCEPTO: {ViewFormat(datos.fecha)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>DATOS PERSONALES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={3}>
                                    <Typography variant="h5"><b>DOCUMENTO:</b></Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">{datos.documento}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5"><b>NOMBRES:</b></Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">{datos.nameEmpleado}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5"><b>CARGO:</b></Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">{datos.nameCargo}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5"><b>AREA:</b></Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">{datos.nameArea}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5"><b>DEPARTAMENTO:</b></Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">{datos.nameDepartamentoTrabajo}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h5"><b>CONCEPTO DE APTITUD:</b></Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5"><b>{datos.nameConceptoActitudID}</b></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>RECOMENDACIONES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item textAlign="justify" xs={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ height: "300px", width: "100%" }}>
                                        {datos.recomendacionesID}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <img src={lsDataUser.firma} height={120} />

                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                </Grid>
            </Grid>

            <footer>
                <Grid container sx={{ pt: 3 }} spacing={1}>
                    <Grid item xs={12}>
                        <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h6">Fecha Sistema: {ViewFormat(new Date())}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography align="center" variant="h6">{datos.nameEmpleado}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography align="right" variant="h6">Usuario Activo: {lsDataUser.nombre}</Typography>
                    </Grid>
                </Grid>
            </footer>
        </div>
    );
};

export default ReportConceptAptitude;