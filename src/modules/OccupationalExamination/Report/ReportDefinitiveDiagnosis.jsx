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

const ReportDefinitiveDiagnosis = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [timeWait, setTimeWait] = useState(false);
    const [lsAdvice, setLsAdvice] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdAdvice(id);
                if (lsServer.status === 200) setLsAdvice(lsServer.data);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [id]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByMail(user.email);
                if (lsServer.status === 200) setLsDataUser(lsServer.data);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [user.email]);

    setTimeout(() => {
        if (lsAdvice.length != 0 && lsDataUser.length != 0)
            setTimeWait(true);
    }, 1000);

    return (
        <SubCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <img src={LogoReport} height={50} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="h5" align="center"><b>DIVISION MÉDICA</b></Typography>
                            <Typography variant="h5" align="center"><b>HISTORIA CLINICA OCUPACIONAL</b></Typography>
                            <Typography variant="h5" align="center"><b>CONTROL PERIODICO</b></Typography>
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
                            <Typography align="center" variant="h5"><b>DIAGNÓSTICO DEFINITIVO</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>DX 1:</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6">HIPERTENSIÓN ARTERIAL</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>DX 2:</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6">RINOFARINGITIS AGUDA (RESFRIADO COMÚN)</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>DX 3:</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6">LESIÓN HOMBRO DERECHO RUPTURA DE MANGUITO ROTADOR</Typography>
                                </Grid>


                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        NO REALIZAR TAREAS EN ALTURAS
                                        CONTINUAR CON LAS RECOMENDACIONES YA CONOCIDAS. <br /><br />


                                        1.Se considera que podrá hacer uso de escaleras trasversales en ascenso y descenso y siempre usando los tres puntos de apoyo; esto incluye hacerlo de manera
                                        segura y pausada.
                                        2.Evitar trabajos que ameriten la elevación de los hombros por encima de los 110°.
                                        3.Podrá levantar cargas de manera bimanual por debajo del hombro y está limitado para no exceder los 11 kg, para cargas que excedan este peso requerirá de
                                        otras personas o en dado caso de equipos que suplan la demanda física (solicite el apoyo que requiera). Tenga en cuenta que estas cargas deberán estar
                                        posicionadas cerca del plano sagital (cerca de su cuerpo).
                                        4.Actividades como el empujar, traccionar y/o halar quedarán a disposición suya, entendiendo que la frecuencia debe este tipo de tareas deben ser bajas y
                                        administradas por usted; tenga en cuenta que si al realizarlas presenta sintomatología alguna, deberá evitarlas y/o suspenderlas.
                                        5.Para el uso de maletín o morral se sugiere no tenerlo muy cargado (menos de 5 kg), usarlo adecuadamente con ambos tirantes sobre los hombros.
                                        6.Evitar realizar actividades que impliquen someterse a vibración del segmento mano-brazo-hombro.
                                        7.Realizar pausas activas de manera auto administradas.
                                        8.Acudir formalmente a sus citas ordenadas y retroalimentar a Salud Ocupacional Drummond LTD., acerca de su condición de salud.                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>CONCEPTO DE APTITUD:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        APTO CON RECOMENDACIONES OCUPACIONALES ESPECIFICAS
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>RECOMENDACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        USAR LOS EPP CORRESPONDIENTES SEGÚN LO ESTABLECIDO EN LA MATRIZ DE RIESGOS.
                                        REALIZAR PAUSAS ACTIVAS DE MANERA AUTOADMINISTRADA E INTERCALAR POSTURAS LIBREMENTE.
                                        USO DE TÉCNICAS ADECUADAS PARA EL LEVANTAMIENTO Y DESPLAZAMIENTO DE CARGAS.
                                        PROPENDER POR MANTENER UN ADECUADO PESO CORPORAL.
                                        REALIZAR ACTIVIDAD FÍSICA AEROBICA DIRIGIDA Y PROGRESIVA DE SER NECESARIO.
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
                    <Typography variant="h6"><b>Ibarra Lopez,Melquis Leonardo</b></Typography>
                    <Typography variant="h6"><b>FIRMA EMPLEADO</b></Typography>
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

export default ReportDefinitiveDiagnosis;