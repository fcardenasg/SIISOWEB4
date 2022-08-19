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
            <Grid item xs={11}>
                <Typography align="justify" fontSize={10}>{title}</Typography>
            </Grid>
            <Grid item xs={1}>
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

const ReportPage1 = () => {
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
                        <Grid item xs={3}>
                            <img src={LogoReport} height={50} />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                            <Typography variant="h5" align="center"><b>CUESTIONARIO DE SÍNTOMAS RESPIRATORIOS</b></Typography>
                            <Typography variant="h5" align="center"><b>CONTROL PERIODICO</b></Typography>
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
                                    <Grid container spacing={0.5}>
                                        <DataInfo key={1} title="DOCUMENTO NRO:" text="12629179" />
                                        <DataInfo key={2} title="NOMBRES:" text="IBARRA LOPEZ, MELQUIS LEONARDO" />
                                        <DataInfo key={3} title="GÉNERO:" text="MASCULINO" />
                                        <DataInfo key={4} title="ÁREA:" text="MARINE SERVICES" />
                                        <DataInfo key={5} title="GRUPO:" text="6X1" />
                                        <DataInfo key={6} title="CARGO:" text="DECKHAND" />
                                        <DataInfo key={7} title="EDAD:" text="49" />
                                        <DataInfo key={8} title="ANTIGÜEDAD:" text="15" />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6"><b>RESULTADOS DEL CUESTIONARIO</b></Typography>
                                </Grid>

                                <DataInfo key={1} title="CONSECUTIVO:" text="5800" />
                                <DataInfo key={2} title="FECHA:" text="31/01/2019" />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant='h6'><b>1. TOS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.5}>
                                        <QuestionnaireTos key={1} title="A. ¿TIENE TOS USUALMENTE (INCLUYE CON EL PRIMER CIGARRILLO O LA PRIMERA SALIDA A LA CALLE, EXCLUYE CARRASPEO)?" text="NO" />
                                        <QuestionnaireTos key={2} title="B. TOSE 4 A 6 VECES AL DÍA, ¿DURANTE CUATRO O MÁS DÍAS DE LA SEMANA?" text="NO" />
                                        <QuestionnaireTos key={3} title="C. ¿SUELE TOSER LEVANTÁNDOSE POR LA MAÑANA A PRIMERA HORA, DURANTE EL RESTO DEL DÍA O LA NOCHE?" text="NO" />

                                        <Grid item xs={12}>
                                            <Typography fontSize={11}><b>SI CONTESTO SI A ALGUNAS DE LAS PREGUNTAS ANTERIORES, TENGA EN CUENTA ESTAS 2 SIGUIENTES, EN CASO CONTRARIO NO APLICA.</b></Typography>
                                        </Grid>

                                        <QuestionnaireTos key={4} title="D. ¿USTED SUELE TOSER ASÍ CASI TODOS LOS DÍAS POR 3 MESES CONSECUTIVOS O POR MÁS DE UN AÑO?" text="NO" />
                                        <QuestionnaireTos key={5} title="E. ¿HA PRESENTADO TOS POR CUANTOS AÑOS?" text="0" />
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
                                    <Typography variant='h6'><b>2. ESPUTO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.5}>
                                        <QuestionnaireTos key={1} title="A. SUELE EXPECTORAR DESDE EL PECHO (INCLUYE FLEMA CON EL 1ER CIGARRILLO, 1ERA SALIDA A LA CALLE Y LA QUE SE TRAGA, EXCLUYE MOCO O FLEMA DE LA NARIZ)" text="NO" />
                                        <QuestionnaireTos key={2} title="B. EXPECTORA ASÍ DOS VECES AL DÍA, AL MENOS CUATRO DÍAS A LA SEMANA?" text="NO" />
                                        <QuestionnaireTos key={3} title="C. SUELE EXPECTORAR AL LEVANTARSE O A PRIMERA HORA DE LA MAÑANA, DURANTE EL RESTO DEL DÍA O DE LA NOCHE?" text="NO" />
                                        <QuestionnaireTos key={4} title="D. EXPECTORA ASÍ LA MAYORÍA DE LOS DÍAS POR 3 MESES CONSECUTIVOS O MÁS O DURANTE UN AÑO?" text="NO" />
                                        <QuestionnaireTos key={5} title="E. RELACIONE NÚMERO DE AÑOS QUE HA EXPECTORADO?" text="0" />
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
                                    <Typography variant='h6'><b>4. EPISODIOS DE TOS Y ESPUTO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.5}>
                                        <QuestionnaireTos key={1} title="A. HA TENIDO EPISODIOS DE TOS Y FLEMA (O AUMENTO, SI USUALMENTE LOS PRESENTA) QUE DUREN 3 O MÁS DE UN AÑO?" text="NO" />
                                        <QuestionnaireTos key={2} title="¿CUANTOS AÑOS HA TENIDO AL MENOS UN EPISODIO AL AÑO?" text="0" />
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
                                    <Typography variant='h6'><b>5. ATAQUES DE SILBIDOS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.5}>
                                        <QuestionnaireTos key={1} title="A. HA TENIDO EPISODIOS DE TOS Y FLEMA (O AUMENTO, SI USUALMENTE LOS PRESENTA) QUE DUREN 3 O MÁS DE UN AÑO?" text="NO" />
                                        <QuestionnaireTos key={2} title="B. ¿QUÉ EDAD TENÍA CUANDO LE DIO EL PRIMER ATAQUE?" text="NO" />
                                        <QuestionnaireTos key={3} title="C. HA TENIDO DOS O MÁS EPISODIOS" text="NO" />
                                        <QuestionnaireTos key={4} title="D. ¿HA NECESITADO DROGAS O TRATAMIENTOS PARA ESTOS ATAQUES?" text="NO" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
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
                    <Typography variant="h6">Ibarra Lopez,Melquis Leonardo</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default ReportPage1;