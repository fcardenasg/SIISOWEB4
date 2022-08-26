import { Fragment, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import ImgWhite from 'assets/img/ImgWhite.png';
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { GetByIdAdvice } from 'api/clients/AdviceClient';
import { FormatDate, GetEdad } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';

const QuestionnaireTos = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={9}>
                <Typography align="justify" fontSize={10}>{title}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography align="right" variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const DataInfo = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={2}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={3.8}>
                <Typography align="right" variant='h6'>{text}</Typography>
            </Grid>
            <Grid item xs={0.2} />
        </Fragment>
    )
}

const ReportPage3 = ({ datos = [], lsDataUser = [] }) => {
    const { user } = useAuth();

    return (
        <SubCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <img src={LogoReport} height={50} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                            <Typography variant="h5" align="center"><b>CUESTIONARIO DE SÍNTOMAS RESPIRATORIOS</b></Typography>
                            <Typography variant="h5" align="center"><b>{datos.datos}</b></Typography>
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
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>

                                        <QuestionnaireTos key={1} title="9. ¿PROBLEMAS DEL CORAZÓN?" text={datos.problemCoraASintR} />

                                        <Grid item xs={2}>
                                            <Typography fontSize={10}><b>- ESPECIFIQUE</b></Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography align='right' variant="h6">{datos.problemCoraBSintR}</Typography>
                                        </Grid>

                                        <QuestionnaireTos key={3} title="- ¿HA RECIBIDO TRATAMIENTO POR ESTA CAUSA EN LOS ÚLTIMOS DIEZ AÑOS?" text={datos.problemaCoraCSintR} />
                                        <QuestionnaireTos key={4} title="10. PRESIÓN ALTA (RECUERDE QUE DEBE SER CONFIRMADA POR EL MÉDICO)" text={datos.presionAltaASintR} />
                                        <QuestionnaireTos key={5} title="- HA RECIBIDO TRATAMIENTO POR ESTA CAUSA EN LOS ÚLTIMOS DIEZ AÑOS?" text={datos.presionAltaBSintR} />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant='h6'><b>10. HISTORIA OCUPACIONAL</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. HA TRABAJADO TIEMPO COMPLETO (8 HORAS A LA SEMANA O MÁS) POR 6 MESES O MÁS?" text={datos.historiaOcupASintR} />
                                        <QuestionnaireTos key={2} title="B. HA TRABAJADO AL MENOS DURANTE 6 MESES EN UN EMPLEO DONDE TUVO EXPOSICIÓN A POLVOS?" text={datos.historiaOcupBSintR} />
                                        <Grid item xs={3}>
                                            <Typography fontSize={10}><b>- ESPECIFIQUE EMPLEO O INDUSTRIA</b></Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography align='right' variant="h6">{datos.historiaOcupB1SintR}</Typography>
                                        </Grid>

                                        <QuestionnaireTos key={4} title="- TOTAL AÑOS TRABAJADOS:" text={datos.historiaOcupB2SintR} />
                                        <QuestionnaireTos key={5} title="- LA EXPOSICIÓN FUE:" text={datos.nameHistoriaOcupB3SintR} />

                                        <QuestionnaireTos key={6} title="C. ¿CUÁL HA SIDO SU OCUPACIÓN O TRABAJO USUAL EN EL QUE HA LABORADO POR MÁS TIEMPO?" text={datos.historiaOcupD2SintR} />
                                        <Grid item xs={4}>
                                            <Typography fontSize={10}>- EMPLEO Y OCUPACIÓN</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography align='right' variant='h6'>{datos.historiaOcupD1SintR}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography fontSize={10}>- NEGOCIO, CAMPO O INDUSTRIA</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography align='right' variant='h6'>{datos.historiaOcupD3}</Typography>
                                        </Grid>
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
                                    <Typography variant='h6'><b>11. TABAQUISMO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. ¿HA FUMADO CIGARRILLOS, PIPA O TABACO (AL MENOS UNO(A) AL DÍA POR UN AÑO O 12 ONZAS DE TABACO DURANTE LA VIDA)?" text={datos.tabaquismoASintR} />
                                        <QuestionnaireTos key={2} title="B. ¿FUMA AHORA (INCLUYE UN MES ATRÁS)?" text={datos.tabaquismoBSintR} />
                                        <QuestionnaireTos key={3} title="C. ¿A QUÉ EDAD COMENZÓ A FUMAR EN FORMA REGULAR?" text={datos.tabaquismoCSintR} />
                                        <QuestionnaireTos key={4} title="D. SI YA DEJO DE FUMAR TOTALMENTE, ¿A QUÉ EDAD LO DEJÓ?" text={datos.tabaquismoDSintR} />
                                        <QuestionnaireTos key={5} title="E. ¿CUANTOS CIGARRILLOS FUMA AL DÍA O FUMABA?" text={datos.tabaquismoESintR} />
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
                                    <Typography variant='h6'><b>12. ACTIVIDAD DEPORTIVA</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. ¿REALIZA ALGÚN DEPORTE?" text={datos.actDeportASintR} />
                                        <QuestionnaireTos key={2} title="- ¿CUAL DEPORTE O ACTIVIDAD?" text={datos.actDeporA1SintR} />
                                        <QuestionnaireTos key={3} title="- DÍAS A LA SEMANA QUE LO PRACTICA" text={datos.actDeporA2SintR} />
                                        <QuestionnaireTos key={4} title="- HORAS AL DÍA QUE LE DEDICA" text={datos.actDeporA3SintR} />
                                        <QuestionnaireTos key={4} title="- PROMEDIO DE HORAS A LA SEMANA" text={datos.actDeporA4SintR} />
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
                                    <Typography variant='h6'><b>13. RECOMENDACIONES</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant='h6'>{datos.recoSintR}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 2 }} textAlign="center" justifyContent="center" container spacing={1}>
                <Grid item xs={12}>
                    <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6">Fecha Sistema: {FormatDate(new Date())}</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6">Ibarra Lopez,Melquis Leonardo</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default ReportPage3;