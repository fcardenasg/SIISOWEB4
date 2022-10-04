import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, ViewFormat } from 'components/helpers/Format';

const FunctionalExploration = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={4}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant='h6'>{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ParaclinicalExaminations = ({ fecha = new Date(), estudio = "", resultado = "", observacion = "" }) => {
    return (
        <Fragment>
            {resultado !== "SIN REGISTRO" ?
                <Fragment>
                    <Grid item xs={1.5}>
                        <Typography variant="h6">{FormatDate(fecha)}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6">{estudio}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">{resultado}</Typography>
                    </Grid>
                    <Grid item xs={5.5}>
                        <Typography variant="h6">{observacion}</Typography>
                    </Grid>
                </Fragment> : null}
        </Fragment >
    )
}

const ReportFunctionalExploration = ({ datos = [], lsDataUser = [] }) => {

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
                            <Typography variant="h5"><b>7. EXPLORACIÓN FUNCIONAL</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <FunctionalExploration key={1} title="1. MOVILIDAD OCULAR" text={datos.movilidadEFU} />
                                <FunctionalExploration key={2} title="2. EQUILIBRIO" text={datos.equilibrioEFU} />
                                <FunctionalExploration key={3} title="3. MARCHA - COORDINACIÓN" text={datos.marchaEFU} />
                                <FunctionalExploration key={4} title="4. MOVILIDAD HOMBRO" text={datos.movilidadHombroEFU} />
                                <FunctionalExploration key={5} title="5. MOVILIDAD - CODO" text={datos.movilidadCodoEFU} />
                                <FunctionalExploration key={6} title="6. MOVILIDAD-MUÑECA" text={datos.movilidadMuniecaEFU} />
                                <FunctionalExploration key={7} title="7. SIGNO TÚNEL" text={datos.signoTinelEFU} />
                                <FunctionalExploration key={8} title="8. SIGNOPHALEN" text={datos.signoPhalenEFU} />
                                <FunctionalExploration key={9} title="9. MOVILIDAD MANOS" text={datos.movilidadManosEFU} />
                                <FunctionalExploration key={10} title="10. MOVILIDAD CADERA" text={datos.movilidadCaderaEFU} />
                                <FunctionalExploration key={11} title="11. MOVILIDAD RODILLA" text={datos.movilidadRodillaEFU} />
                                <FunctionalExploration key={12} title="12. MOVILIDAD TOBILLO" text={datos.movilidadTobilloEFU} />
                                <FunctionalExploration key={13} title="13. MOVILIDAD CUELLO (C1-C4)" text={datos.movilidadCuelloEFU} />
                                <FunctionalExploration key={14} title="14. ROT BICIPITAL(C5)" text={datos.rotVisipitalEFU} />
                                <FunctionalExploration key={15} title="15. ROT ROTULIANO(L4)" text={datos.rotRotuleanoEFU} />
                                <FunctionalExploration key={16} title="16. EXTENSIÓN PRIMER ARTEJO (L)" text={datos.extencionEFU} />
                                <FunctionalExploration key={17} title="17. SENSIBILIDAD CARA ANTERIOR" text={datos.sensibilidadCaraAnteriorEFU} />
                                <FunctionalExploration key={18} title="18. EVERSIÓN PIE(S1)" text={datos.eversionPiesEFU} />
                                <FunctionalExploration key={19} title="19. SENSIBILIDAD CARA LATERAL PIE (S1)" text={datos.sensibilidadCaraLateralEFU} />
                                <FunctionalExploration key={20} title="20. ROT AQUILIANO" text={datos.rotAquileanoEFU} />
                                <FunctionalExploration key={21} title="21. SIGNO DE LASÉGUE" text={datos.signoLasegueEFU} />
                                <FunctionalExploration key={22} title="22. ÍNDICE DE WELLS" text={datos.indiceWellsEFU} />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.observacionEFU}
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
                            <Typography variant="h5"><b>8. EXÁMENES PARACLÍNICOS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6"><b>FECHA:</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6"><b>ESTUDIO:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>RESULTADO:</b></Typography>
                                </Grid>
                                <Grid item xs={5.5}>
                                    <Typography variant="h6"><b>OBSERVACIÓN:</b></Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ height: "250px", width: "100%" }}>
                                    <Grid container spacing={0.5}>
                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaRxToraxEPA)}
                                            estudio="RX TORAX"
                                            resultado={datos.nameResultadoRxToraxEPA}
                                            observacion={datos.observacionesRxToraxEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaEspirometriaEPA)}
                                            estudio="ESPIROMETRIA"
                                            resultado={datos.nameResultadoEspirometriaEPA}
                                            observacion={datos.observacionesEspirometriaEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaAudiometriaEPA)}
                                            estudio="AUDIOMETRIA"
                                            resultado={datos.nameResultadoAudiometriaEPA}
                                            observacion={datos.observacionesAudiometriaEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaVisiometriaEPA)}
                                            estudio="VISIOMETRIA"
                                            resultado={datos.nameResultadoVisiometriaEPA}
                                            observacion={datos.observacionesVisiometriaEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaLaboratorioClinicoEPA)}
                                            estudio="LABORATORIO CLINICO"
                                            resultado={datos.nameResultadoLaboratorioClinicoEPA}
                                            observacion={datos.observacionesLaboratorioClinicoEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaCuestionarioSintomaEPA)}
                                            estudio="CUESTIONARIO DE SINTOMAS"
                                            resultado={datos.nameResultadoCuestionarioSintomaEPA}
                                            observacion={datos.observacionesCuestionarioSintomaEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaEkgEPA)}
                                            estudio="EKG"
                                            resultado={datos.nameResultadoEkgEPA}
                                            observacion={datos.observacionesEkgEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaRnmLumbosacraEPA)}
                                            estudio="RNM LUMBOSACRA"
                                            resultado={datos.nameResultadoRnmLumbosacraEPA}
                                            observacion={datos.observacionesRnmLumbosacraEPA}
                                        />

                                        <ParaclinicalExaminations
                                            fecha={ViewFormat(datos.fechaRnmCervicalEPA)}
                                            estudio="RNM CERVICAL"
                                            resultado={datos.nameResultadoRnmCervicalEPA}
                                            observacion={datos.observacionesRnmCervicalEPA}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6" sx={{ height: "80px", width: "100%" }}>
                                        {datos.observacionEPA}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
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

export default ReportFunctionalExploration;