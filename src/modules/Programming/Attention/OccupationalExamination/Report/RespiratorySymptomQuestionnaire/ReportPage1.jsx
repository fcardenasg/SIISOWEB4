import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';

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
            <Grid item xs={1.7}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={4.3}>
                <Typography variant='h6'>{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportPage1 = ({ datos = [] }) => {
    const { user } = useAuth();

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
                                        <DataInfo key={3} title="GÉNERO:" text={datos.nameGenero} />
                                        <DataInfo key={4} title="ÁREA:" text={datos.nameArea} />
                                        <DataInfo key={5} title="GRUPO:" text={datos.nameGrupo} />
                                        <DataInfo key={6} title="CARGO:" text={datos.nameCargo} />
                                        <DataInfo key={7} title="EDAD:" text={GetEdad(datos.fechaNacimiento)} />
                                        <DataInfo key={8} title="ANTIGÜEDAD:" text={GetEdad(datos.fechaContratoEmpleado)} />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6"><b>RESULTADOS DEL CUESTIONARIO</b></Typography>
                                </Grid>

                                <DataInfo key={1} title="CONSECUTIVO:" text={datos.id} />
                                <DataInfo key={2} title="FECHA:" text={ViewFormat(datos.fecha)} />
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
                                    <Grid container spacing={1}>
                                        <QuestionnaireTos key={1} title="A. ¿TIENE TOS USUALMENTE (INCLUYE CON EL PRIMER CIGARRILLO O LA PRIMERA SALIDA A LA CALLE, EXCLUYE CARRASPEO)?" text={datos.tosAUsualSin} />
                                        <QuestionnaireTos key={2} title="B. TOSE 4 A 6 VECES AL DÍA, ¿DURANTE CUATRO O MÁS DÍAS DE LA SEMANA?" text={datos.tosEnLaSemanaSintR} />
                                        <QuestionnaireTos key={3} title="C. ¿SUELE TOSER LEVANTÁNDOSE POR LA MAÑANA A PRIMERA HORA, DURANTE EL RESTO DEL DÍA O LA NOCHE?" text={datos.tosMananaSintR} />

                                        <Grid item xs={12}>
                                            <Typography fontSize={11}><b>SI CONTESTO SI A ALGUNAS DE LAS PREGUNTAS ANTERIORES, TENGA EN CUENTA ESTAS 2 SIGUIENTES, EN CASO CONTRARIO NO APLICA.</b></Typography>
                                        </Grid>

                                        <QuestionnaireTos key={4} title="D. ¿USTED SUELE TOSER ASÍ CASI TODOS LOS DÍAS POR 3 MESES CONSECUTIVOS O POR MÁS DE UN AÑO?" text={datos.tosConsecutivaSintR} />
                                        <QuestionnaireTos key={5} title="E. ¿HA PRESENTADO TOS POR CUANTOS AÑOS?" text={datos.anosConTosSintR} />
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
                                    <Grid container spacing={1}>
                                        <QuestionnaireTos key={1} title="A. SUELE EXPECTORAR DESDE EL PECHO (INCLUYE FLEMA CON EL 1ER CIGARRILLO, 1ERA SALIDA A LA CALLE Y LA QUE SE TRAGA, EXCLUYE MOCO O FLEMA DE LA NARIZ)" text={datos.esputoASintR} />
                                        <QuestionnaireTos key={2} title="B. EXPECTORA ASÍ DOS VECES AL DÍA, AL MENOS CUATRO DÍAS A LA SEMANA?" text={datos.esputoBSintR} />
                                        <QuestionnaireTos key={3} title="C. SUELE EXPECTORAR AL LEVANTARSE O A PRIMERA HORA DE LA MAÑANA, DURANTE EL RESTO DEL DÍA O DE LA NOCHE?" text={datos.esputoCSintR} />
                                        <QuestionnaireTos key={4} title="D. EXPECTORA ASÍ LA MAYORÍA DE LOS DÍAS POR 3 MESES CONSECUTIVOS O MÁS O DURANTE UN AÑO?" text={datos.esputoDSintR} />
                                        <QuestionnaireTos key={5} title="E. RELACIONE NÚMERO DE AÑOS QUE HA EXPECTORADO?" text={datos.esputoESintR} />
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
                                    <Typography variant='h6'><b>3. EPISODIOS DE TOS Y ESPUTO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <QuestionnaireTos key={1} title="A. ¿HA TENIDO EPISODIOS DE TOS Y FLEMA (O AUMENTO, SI USUALMENTE LOS PRESENTA) QUE DUREN 3 O MÁS DE UN AÑO?" text={datos.episoTosEspuASintR} />
                                        <QuestionnaireTos key={2} title="B. ¿CUANTOS AÑOS HA TENIDO AL MENOS UN EPISODIO AL AÑO?" text={datos.episoTosEsputoBSintR} />
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
                                    <Typography variant='h6'><b>4. SIBILANCIAS</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <QuestionnaireTos key={1} title="A. SU PECHO PITA, SILBA O SUENA" text={datos.sibilanciasASintR} />
                                        <QuestionnaireTos key={2} title="1. CUANDO TIENE GRIPA" text={datos.sibilanciasA1SintR} />
                                        <QuestionnaireTos key={3} title="2. OCASIONALMENTE APARTE DE LAS GRIPAS" text={datos.sibilanciasA2SintR} />
                                        <QuestionnaireTos key={4} title="3. LA MAYORÍA DE DÍAS Y NOCHES" text={datos.sibilanciasA3SintR} />
                                        <QuestionnaireTos key={5} title="B. POR CUANTOS AÑOS HA PRESENTADO ESTA SITUACIÓN?" text={datos.sibilanciasBSintR} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 9 }} textAlign="center" justifyContent="center" container spacing={1}>
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
        </div>
    );
};

export default ReportPage1;