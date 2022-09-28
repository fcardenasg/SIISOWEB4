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

                                        <Grid item xs={12}>
                                            <Grid container sx={{ pt: 2 }} spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5"><b>CONCEPTO DE DIAGNÓSTICOS</b></Typography>
                                                </Grid>

                                                {JSON.parse(datos.dxID).map((dx, index) => (
                                                    <Fragment>
                                                        <Grid item xs={4}>
                                                            <Typography variant="h5"><b>DX {index = index + 1}:</b></Typography>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography variant="h5">{dx.label}</Typography>
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
                                            <Typography variant="h6">
                                                NO REALIZAR TAREAS EN ALTURAS
                                                CONTINUAR CON LAS RECOMENDACIONES YA CONOCIDAS.
                                                1.Se considera que podrá hacer uso de escaleras trasversales en ascenso y descenso y siempre usando los tres puntos de apoyo;
                                                esto incluye hacerlo de manera segura y pausada.
                                                2.Evitar trabajos que ameriten la elevación de los hombros por encima de los 110°.
                                                3.Podrá levantar cargas de manera bimanual por debajo del hombro y está limitado para no exceder los 11 kg, para cargas que
                                                excedan este peso requerirá de otras personas o en dado caso de equipos que suplan la demanda física (solicite el apoyo que
                                                requiera). Tenga en cuenta que estas cargas deberán estar posicionadas cerca del plano sagital (cerca de su cuerpo).
                                                {/* 4.Actividades como el empujar, traccionar y/o halar quedarán a disposición suya, entendiendo que la frecuencia debe este tipo de
                                        tareas deben ser bajas y administradas por usted; tenga en cuenta que si al realizarlas presenta sintomatología alguna, deberá
                                        evitarlas y/o suspenderlas.
                                        5.Para el uso de maletín o morral se sugiere no tenerlo muy cargado (menos de 5 kg), usarlo adecuadamente con ambos tirantes
                                        sobre los hombros.
                                        6.Evitar realizar actividades que impliquen someterse a vibración del segmento mano-brazo-hombro.
                                        7.Realizar pausas activas de manera auto administradas.
                                        8.Acudir formalmente a sus citas ordenadas y retroalimentar a Salud Ocupacional Drummond LTD., acerca de su condición de
                                        salud. */}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h5"><b>RECOMENDACIONES PARA APTITUD DE CONTROL PERIÓDICO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item textAlign="justify" xs={12}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">
                                                USAR LOS EPP CORRESPONDIENTES SEGÚN LO ESTABLECIDO EN LA MATRIZ DE RIESGOS.
                                                REALIZAR PAUSAS ACTIVAS DE MANERA AUTOADMINISTRADA E INTERCALAR POSTURAS LIBREMENTE.
                                                USO DE TÉCNICAS ADECUADAS PARA EL LEVANTAMIENTO Y DESPLAZAMIENTO DE CARGAS.
                                                PROPENDER POR MANTENER UN ADECUADO PESO CORPORAL.
                                                REALIZAR ACTIVIDAD FÍSICA AEROBICA DIRIGIDA Y PROGRESIVA DE SER NECESARIO.
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
                            <img src={lsDataUser.firma} height={50} />

                            <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                            <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                            <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                            <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                            <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <img src={ImgWhite} height={50} />

                            <Divider sx={{ border: 1, mt: 1, background: 'black', color: 'black' }} />
                            <Typography variant="h6"><b>{datos.nameEmpleado}</b></Typography>
                            <Typography variant="h6"><b>FIRMA EMPLEADO</b></Typography>
                        </Grid>
                    </Grid>

                    <Grid sx={{ pt: 10 }} textAlign="center" justifyContent="center" container spacing={1}>
                        <Grid item xs={12}>
                            <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h6">Fecha Sistema: {FormatDate(new Date())}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h6">{datos.nameEmpleado}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                        </Grid>
                    </Grid>
                </Fragment> : ''
            }
        </div>
    );
};

export default ReportDiagnostics;