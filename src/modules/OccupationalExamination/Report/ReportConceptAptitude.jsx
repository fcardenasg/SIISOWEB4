import { useRef, useEffect, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import ReactToPrint from 'react-to-print';
import useAuth from 'hooks/useAuth';

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { GetByIdAdvice } from 'api/clients/AdviceClient';
import { FormatDate } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';

const ReportConceptAptitude = () => {
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
                        <Grid item xs={6}>
                            <Typography align="center" variant="h5">CONCEPTO EXAMEN OCUPACIONAL</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography align="center" variant="h5">FECHA DE CONCEPTO: 31/01/2019</Typography>
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
                                    <Typography variant="h5">12629179</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">NOMBRES:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">Ibarra Lopez,Melquis Leonardo</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">CARGO:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">Deckhand</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">AREA:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">Marine Services</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">DEPARTAMENTO:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">Marine Services</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h5">CONCEPTO DE APTITUD:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5"><b>APTO CON RECOMENDACIONES OCUPACIONALES ESPECIFICAS</b></Typography>
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
                                    <Typography variant="h6">
                                        USAR LOS EPP CORRESPONDIENTES SEGÚN LO ESTABLECIDO EN LA MATRIZ DE RIESGOS.
                                        REALIZAR PAUSAS ACTIVAS DE MANERA AUTOADMINISTRADA E INTERCALAR POSTURAS LIBREMENTE.
                                        USO DE TÉCNICAS ADECUADAS PARA EL LEVANTAMIENTO Y DESPLAZAMIENTO DE CARGAS.
                                        PROPENDER POR MANTENER UN ADECUADO PESO CORPORAL.
                                        REALIZAR ACTIVIDAD FÍSICA AEROBICA DIRIGIDA Y PROGRESIVA DE SER NECESARIO.

                                        USAR LOS EPP CORRESPONDIENTES SEGÚN LO ESTABLECIDO EN LA MATRIZ DE RIESGOS.
                                        REALIZAR PAUSAS ACTIVAS DE MANERA AUTOADMINISTRADA E INTERCALAR POSTURAS LIBREMENTE.
                                        USO DE TÉCNICAS ADECUADAS PARA EL LEVANTAMIENTO Y DESPLAZAMIENTO DE CARGAS.
                                        PROPENDER POR MANTENER UN ADECUADO PESO CORPORAL.
                                        REALIZAR ACTIVIDAD FÍSICA AEROBICA DIRIGIDA Y PROGRESIVA DE SER NECESARIO.
                                        REALIZAR ACTIVIDAD FÍSICA AEROBICA DIRIGIDA Y PROGRESIVA DE SER NECESARIO.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} /><Grid item xs={12} />

                <Grid item xs={4}>
                    <img src={lsDataUser.firma} height={50} />

                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                </Grid>
            </Grid>

            <Grid sx={{ mt: 35 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportConceptAptitude;