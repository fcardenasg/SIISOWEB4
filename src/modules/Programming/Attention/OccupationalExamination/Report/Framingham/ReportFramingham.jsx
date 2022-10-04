import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';

const DataInfo = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={2}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6'>{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportFramingham = ({ datos = [], lsDataUser = [] }) => {
    const { user } = useAuth();

    const ColorClasificacion = datos.clasificacionEF === "BAJO DE PESO" ? "info.main" :
        datos.clasificacionEF === "NORMAL" ? "success.main" :
            datos.clasificacionEF === "SOBREPESO" ? "warning.main" :
                datos.clasificacionEF === "OBESIDAD GRADO I" ? "error.main" :
                    datos.clasificacionEF === "OBESIDAD GRADO II" ? "error.main" : "error.main";

    console.log(ColorClasificacion);

    return (
        <div>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <img src={LogoReport} height={50} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                            <Typography variant="h5" align="center"><b>CUESTIONARIO DE SÍNTOMAS RESPIRATORIOS</b></Typography>
                            <Typography variant="h5" align="center"><b>{datos.nameAtencion}</b></Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h5" align="center"><b>SIG-0409</b></Typography>
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
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h5"><b>DATOS DEL EMPLEADO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <DataInfo key={1} title="DOCUMENTO NRO:" text={datos.documento} />
                                        <DataInfo key={2} title="NOMBRES:" text={datos.nameEmpleado} />
                                        <DataInfo key={3} title="FECHA NACIMIENTO:" text={ViewFormat(datos.fechaNacimiento)} />
                                        <DataInfo key={4} title="EDAD:" text={GetEdad(datos.fechaNacimiento)} />
                                        <DataInfo key={5} title="FECHA INGRESO:" text={ViewFormat(datos.fecha)} />
                                        <DataInfo key={6} title="GÉNERO:" text={datos.nameGenero} />
                                        <DataInfo key={7} title="TIPO CONTRATO:" text={datos.nameTipoContrato} />
                                        <DataInfo key={8} title="DEPARTAMENTO:" text={datos.nameDepartamentoTrabajo} />
                                        <DataInfo key={9} title="ÁREA:" text={datos.nameArea} />
                                        <DataInfo key={10} title="SUBÁREA:" text={datos.nameSubarea} />
                                        <DataInfo key={11} title="ROSTER POSITION:" text={datos.nameCargo} />
                                        <DataInfo key={12} title="GRUPO:" text={datos.nameGrupo} />
                                        <DataInfo key={13} title="EPS:" text={datos.nameEps} />
                                        <DataInfo key={14} title="AFP:" text={datos.nameAfp} />
                                        <DataInfo key={15} title="ARL:" text={datos.nameArl} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align='center' variant='h5'><b>DATOS CARDIOVASCULAR</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>NRO ID:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.id}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FECHA:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{ViewFormat(datos.fechaFRA)}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FUMA:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.nameFumaFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>TENSIÓN ARTERIAL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.idTencionArterialFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FECHA LABORATORIO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{ViewFormat(datos.fechaLaboratorioFRA)}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>COLESTEROL TOTAL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.colesterolTotalFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>HDL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.hdlfra}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>TRIGLICERIDOS:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.triglicericosFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>GLICEMIA:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.glisemiaFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>PESO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.pesoEF}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>TALLA:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.tallaEF}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>IMC:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.imcef}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>DX PESO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography sx={{ bgcolor: ColorClasificacion }} variant="h6">{(datos.clasificacionEF).toUpperCase()}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>LDL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.ldlfra}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>RELACIÓN:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.relacionFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FR EDAD:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.frlEdadFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FR COLESTEROL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.frlColesterolFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FR HDL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.frhdlfra}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FR GLICEMIA:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.frGlisemiaFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FR TENSIÓN ARTERIAL:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.frTencionFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>FR TABAQUISMO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.frTabaquismoFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>PUNTAJE:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.puntajeFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>RIESGO ABSOLUTO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.riesgoAbsolutoFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>RIESGO RELATIVO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h6">{datos.riesgoRelativoFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>INTERPRETACIÓN:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h6">{datos.interpretacionFRA}</Typography>
                                        </Grid>

                                        <Grid item xs={12} sx={{ mt: 3 }}>
                                            <Typography variant="h5">
                                                <b>EVALUACIÓN DEL RIESGO DE SUFRIR ACCIDENTE CARDIOVASCULAR EN LOS PRÓXIMOS DIEZ AÑOS</b>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography align='center' variant="h6">
                                                {datos.riesgoRelativoFRA}% {datos.interpretacionFRA}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <footer>
                <Grid container sx={{ pt: 32 }} spacing={1}>
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

export default ReportFramingham;