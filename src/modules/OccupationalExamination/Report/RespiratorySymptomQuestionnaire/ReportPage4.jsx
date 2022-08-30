import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate } from 'components/helpers/Format';
import ImgWhite from 'assets/img/ImgWhite.png';

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
                                <QuestionnaireTos key={4} title="D. SI YA DEJO DE FUMAR TOTALMENTE, ¿A QUÉ EDAD LO DEJÓ?" text={datos.tabaquismoDSintR} />
                                <QuestionnaireTos key={5} title="E. ¿CUANTOS CIGARRILLOS FUMA AL DÍA O FUMABA?" text={datos.tabaquismoESintR} />
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
                                    <Grid container spacing={1}>
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

                        <Grid sx={{ mt: 5 }} item xs={12}>
                            <Grid container spacing={1}>
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