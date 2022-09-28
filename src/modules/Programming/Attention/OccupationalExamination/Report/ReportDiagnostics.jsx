import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import ImgWhite from 'assets/img/ImgWhite.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, ViewFormat } from 'components/helpers/Format';

const ReportDiagnostics = ({ datos = [], lsDataUser = [] }) => {
    const { user } = useAuth();

    return (
        <div>
            {datos.length != 0 ?
                <Fragment>
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
                                        <Grid item xs={4}>
                                            <Typography variant="h5"><b>DOCUMENTO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h5">{datos.documento}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h5"><b>NOMBRES:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h5">{datos.nameEmpleado}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h5"><b>CARGO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h5">{datos.nameCargo}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h5"><b>AREA:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h5">{datos.nameArea}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h5"><b>DEPARTAMENTO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h5">{datos.nameDepartamentoTrabajo}</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container sx={{ pt: 2 }} spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5"><b>CONCEPTO DE DIAGNÓSTICOS</b></Typography>
                                                </Grid>

                                                {JSON.parse(datos.dxID).map((dx, index) => (
                                                    <Fragment>
                                                        <Grid item xs={4}>
                                                            <Typography variant="h6"><b>DX {index = index + 1}:</b></Typography>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography variant="h6">{dx.label}</Typography>
                                                        </Grid>
                                                    </Fragment>
                                                ))}
                                            </Grid>
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
                                    <Typography align="center" variant="h5"><b>RECOMENDACIONES DE DIAGNÓSTICOS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item textAlign="justify" xs={12}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" sx={{ height: "70px", width: "100%" }}>
                                                {datos.observacionID}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h5"><b>RECOMENDACIONES PARA APTITUD DE {datos.nameAtencion}</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item textAlign="justify" xs={12}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" sx={{ height: "80px", width: "100%" }}>
                                                {datos.recomendacionesID}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6"><b>CORDIALMENTE,</b></Typography>
                        </Grid>
                        {/* <Grid item xs={12} /> */}

                        <Grid item xs={6}>
                            <img src={lsDataUser.firma} height={80} />

                            <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                            <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                            <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                            <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                            <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <img src={ImgWhite} height={80} />

                            <Divider sx={{ border: 1, mt: 1, background: 'black', color: 'black' }} />
                            <Typography variant="h6"><b>{datos.nameEmpleado}</b></Typography>
                            <Typography variant="h6"><b>FIRMA EMPLEADO</b></Typography>
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
                </Fragment> : ''
            }
        </div>
    );
};

export default ReportDiagnostics;