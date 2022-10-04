import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, ViewFormat } from 'components/helpers/Format';
import { DefaultValue } from 'components/helpers/Enums';

const Pathological = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={4}>
                <Typography variant="h6"><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const Relationship = ({ numero = 0, parentesco = '', descripcion = '' }) => {
    return (
        <Fragment>
            <Grid item xs={2}>
                <Typography variant="h6"><b>PARENTESCO {numero}:</b></Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6">{parentesco}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6">{descripcion}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportHabits = ({ datos = [], lsDataUser = [] }) => {
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
                                <Grid item xs={12}>
                                    <Typography variant="h5"><b>4.6 HABITOS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.5}>
                                        <Pathological key={1} title="FUMA:" text={datos.fumaHB} />
                                        <Pathological key={2} title="CIGARRILLOS DÍA:" text={datos.cigarrillosDiasFumaHB} />
                                        <Pathological key={3} title="AÑOS:" text={datos.aniosCigaFumaHB} />
                                        <Pathological key={3} title="MESES:" text={datos.mesesCigaFumaHB} />
                                        <Pathological key={4} title="FUMABA:" text={datos.fumabaHB} />
                                        <Pathological key={5} title="CIGARRILLOS DÍA:" text={datos.cigarrillosDiasFumabaHB} />
                                        <Pathological key={7} title="AÑOS:" text={datos.aniosCigaFumabaHB} />
                                        <Pathological key={8} title="MESES:" text={datos.mesesCigaFumabaHB} />
                                        <Pathological key={9} title="PRACTICA DEPORTE:" text={datos.practicaDeporteHB} />
                                        <Pathological key={10} title="CUAL DEPORTE:" text={datos.nameFrecuenciaDeporteHB} />
                                        <Pathological key={12} title="FRECUENCIA:" text={datos.nameCualDeporteHB} />
                                        <Pathological key={13} title="CONSUME BEBIDAS ALCOHOLICAS:" text={datos.consumeBebidasAlcoholicasHB} />
                                        <Pathological key={14} title="CUAL BEBIDA:" text={datos.cualBebidasAlHB} />
                                        <Pathological key={15} title="FRECUENCIA:" text={datos.nameFrecuenciaBebidaAlHB} />

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>HOBBY/PASATIEMPO:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h6">{datos.cualHobbiesHB}</Typography>
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
                                    <Typography variant="h5"><b>4.7 FOBIAS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>FOBIAS:</b></Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6">{datos.fobiasHB}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>TIPO DE FOBIA:</b></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={0.2}>
                                        {JSON.parse(datos.tipoFobiaHB).map((fobia, index) => (
                                            <Grid item xs={3}>
                                                <Typography variant="h6">{fobia.label},</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>DESCRIPCIÓN:</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6">{datos.cualFobiaHB}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5"><b>4.8 GINECO OBSTÉTRICOS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} sx={{ height: "410px", width: "100%" }}>
                                    {datos.idGenero === DefaultValue.GeneroWomen ?
                                        <Grid container spacing={0.5}>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>1. MENARQUÍA:</b></Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="h6">{datos.menarquiaGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>2. CICLOS:</b> {datos.nameCiclosGO}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>DURACIÓN:</b> {datos.duracionGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>3. DATOS:</b></Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>AMENORREA:</b> {datos.amenoreaGO}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>DISMENORREA:</b> {datos.disminureaGO}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>LEUCORREA:</b> {datos.leucoreaGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>4. VIDA MARITAL:</b> {datos.vidaMaritalGO}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>VIDA OBSTÉTRICA:</b> {datos.vidaObstetricaGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>4. G:</b> {datos.ggo}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>P:</b> {datos.pgo}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>A:</b> {datos.ago}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>C:</b> {datos.csgo}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>6. FUP:</b> {ViewFormat(datos.fupgo)}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>FUR:</b> {ViewFormat(datos.furgo)}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>7. ETS:</b> {datos.etsgo}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>8. QUISTE DE OVARIOS - MIOMAS:</b> {datos.quisteOvariosBiomasGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>9. ENDOMETRIOSIS:</b> {datos.endometriosisGO}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>10. PLANIFICA</b> {datos.planificaGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>METODO:</b> {datos.nameMetodoGO}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>11. ÚLTIMA CITOLOFIA - AÑO:</b> {datos.ultimoAnioCitologiaGO}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="h6"><b>RESULTADO:</b></Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Typography variant="h6">{datos.nameResultadoGO}</Typography>
                                            </Grid>
                                        </Grid> : <Typography variant="h5"><b>NO REFIERE</b></Typography>
                                    }
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
                </Fragment> : ''
            }
        </div>
    );
};

export default ReportHabits;