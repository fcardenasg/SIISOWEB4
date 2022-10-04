import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import ImgWhite from 'assets/img/ImgWhite.png';
import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, ViewFormat } from 'components/helpers/Format';

const ReportDefinitiveDiagnosis = ({ datos = [], lsDataUser = [] }) => {
    const { user } = useAuth();

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
                        <Grid item xs={12}>
                            <Typography variant="h5"><b>9. DIAGNÓSTICO DEFINITIVO</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                {datos.length != 0 ?
                                    <Fragment>
                                        <Grid item xs={12} sx={{ height: "60px", width: "100%" }}>
                                            <Grid container spacing={0.5}>
                                                {JSON.parse(datos.dxID).map((dx, index) => (
                                                    <Fragment>
                                                        <Grid item xs={2}>
                                                            <Typography variant="h5"><b>DX {index = index + 1}:</b></Typography>
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Typography variant="h5">{dx.label}</Typography>
                                                        </Grid>
                                                    </Fragment>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Fragment> : ''
                                }

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6" sx={{ height: "95px", width: "100%" }}>
                                        {datos.observacionID}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>CONCEPTO DE APTITUD:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.nameConceptoActitudID}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>RECOMENDACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6" sx={{ height: "95px", width: "100%" }}>
                                        {datos.recomendacionesID}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>CONSENTIMIENTO INFORMADO DEL TRABAJADOR</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        Autorizo al médico ocupacional, quien firma abajo, a realizar los exámenes médicos y pruebas complementarias sugeridas por la
                                        empresa. Certifico que he sido informado(a) acerca de la naturaleza y propósito de estos exámenes. Entendiendo que la
                                        realización de estos exámenes es voluntaria y que tuve la oportunidad de retirar miconsentimiento en cualquier momento. Certifico
                                        además, que las respuestas que doy son completas y verídicas. Se me informó también que este documento es
                                        estrictamenteconfidencial y de reserva profesional. No puede comunicarse o darse a conocer, salvo a las personas o entidades
                                        previstas por la ley en la legislación vigente.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }} />

                <Grid item xs={6}>
                    <img src={lsDataUser.firma} height={100} />

                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                </Grid>

                <Grid item xs={6}>
                    <img src={ImgWhite} height={100} />

                    <Divider sx={{ border: 1, mt: 1, background: 'black', color: 'black' }} />
                    <Typography variant="h6"><b>Ibarra Lopez,Melquis Leonardo</b></Typography>
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
        </div>
    );
};

export default ReportDefinitiveDiagnosis;