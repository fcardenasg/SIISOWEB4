import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import useAuth from 'hooks/useAuth';

import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { ViewFormat } from 'components/helpers/Format';

import "./report.module.css"

const PiePagina = styled('div')(({ theme }) => ({
    /* position: 'fixed',
    bottom: 0,
    width: '100%', */

    /* padding: '20px 0',
    background: '#fafafa',
    color: '#fff',
    textAlign: 'center' */
}));

const ReportConceptAptitude = ({ datos = [], lsDataUser = [] }) => {
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
                        <Grid item xs={6}>
                            <Typography align="center" variant="h5">CONCEPTO EXAMEN OCUPACIONAL</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography align="center" variant="h5">FECHA DE CONCEPTO: {ViewFormat(datos.fecha)}</Typography>
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
                                    <Typography variant="h5">DOCUMENTO:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">{datos.documento}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">NOMBRES:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">{datos.nameEmpleado}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">CARGO:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">{datos.nameCargo}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">AREA:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">{datos.nameArea}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">DEPARTAMENTO:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">{datos.nameDepartamentoTrabajo}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">CONCEPTO DE APTITUD:</Typography>
                                </Grid>
                                <Grid item xs={8}>
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
                                    <Typography variant="h6" sx={{ height: "350px", width: "100%" }}>
                                        {/* {datos.recomendacionesID} */}
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <img src={lsDataUser.firma} height={50} />

                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                </Grid>
            </Grid>

            <footer>
                <Grid container sx={{ pt: 3 }} textAlign="center" justifyContent="center" spacing={1}>
                    <Grid item xs={12}>
                        <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">Fecha Sistema: {ViewFormat(new Date())}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                    </Grid>
                </Grid>
            </footer>
        </div>
    );
};

export default ReportConceptAptitude;