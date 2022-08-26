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

const ReportPage2 = ({ datos = [], lsDataUser = [] }) => {
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
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant='h6'><b>6. OTRAS ENFERMEDADES INHABILITANTES</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. ¿PRESENTA INHABILIDAD POR UNA CONDICIÓN DIFERENTE A ENFERMEDAD DE PULMÓN O CORAZÓN?" text={datos.otrasEnfInhaASintR} />
                                        <QuestionnaireTos key={2} title="B. ¿USTED SUELE TOSER ASÍ CASI TODOS LOS DÍAS POR 3 MESES CONSECUTIVOS O POR MÁS DE UN AÑO?" text={datos.otrasEnfInhaBSintR} />
                                        <Grid item xs={4}>
                                            <Typography fontSize={10}><b>DESCRIBA LA NATURALEZA DE ESTA CONDICIÓN:</b></Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography fontSize={10}>{datos.otrasEnfInhaDescriSintR}</Typography>
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
                                    <Typography variant='h6'><b>7. DISNEA (DIFICULTAD PARA RESPIRAR)</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. ¿SE AHOGA AL SUBIR DE UN NIVEL A OTRO AL CAMINAR POR UNA CUESTA SUAVE?" text={datos.disneaASintR} />
                                        <QuestionnaireTos key={2} title="B. ¿POR CAUSA DEL AHOGO TIENE QUE CAMINAR MÁS DESPACIO QUE LA GENTE DE SU EDAD, EN UNA CUESTA SUAVE?" text={datos.disneaBSintR} />
                                        <QuestionnaireTos key={3} title="C. ¿TIENE QUE DETENERSE A RESPIRAR CUANDO CAMINA A SU PASO POR UNA CUESTA SUAVE?" text={datos.disneaCSintR} />
                                        <QuestionnaireTos key={4} title="D. ¿TIENE QUE PARAR A RESPIRAR LUEGO DE CAMINAR 100 YARDAS (O LUEGO DE ALGUNOS MINUTOS) POR UNA CUESTA SUAVE?" text={datos.disneaDSintR} />
                                        <QuestionnaireTos key={5} title="E. ¿EL AHOGO LE DIFICULTA DEJAR SU CASA, VESTIRSE O DESVESTIRTE?" text={datos.disneaESintR} />
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
                                    <Typography variant='h6'><b>8. GRIPAS Y ENFERMEDADES DEL TÓRAX</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. ¿SI SE RESFRÍA SE LE AFECTA EL PECHO?" text={datos.enferToraxASintR} />
                                        <QuestionnaireTos key={2} title="B. ¿EN LOS ÚLTIMOS 3 AÑOS HA PRESENTADO ENFERMEDAD QUE LO ALEJE DE SU TRABAJO, LO MANTENGA EN CASA O EN CAMA?" text={datos.enferToraxBSintR} />
                                        <QuestionnaireTos key={3} title="C. ¿EXPECTORÓ CON ALGUNA DE ESTAS ENFERMEDADES?" text={datos.enferToraxCSintR} />
                                        <QuestionnaireTos key={4} title="D. EN LOS ÚLTIMOS AÑOS ¿CUÁNTAS DE ESTAS ENFERMEDADES CON ESPUTO LE HAN DURADO UNA SEMANA O MÁS?, ¿NÚMERO DE ENFERMEDADES?" text={datos.enferToraxD} />
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
                                    <Typography variant='h6'><b>9. ANTECEDENTES</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0.2}>
                                        <QuestionnaireTos key={1} title="A. TUVO ALGUNA ENFERMEDAD PULMONAR ANTES DE LOS 16 AÑOS?" text={datos.antecedentesASintR} />
                                        <QuestionnaireTos key={2} title="B. ¿HA TENIDO ALGUNA DE LAS SIGUIENTES ENFERMEDADES (CONFIRMADAS POR EL MEDICO)?" />
                                        <QuestionnaireTos key={3} title="1. ¿ATAQUES DE BRONQUITIS?" text={datos.antecedentesB1SintR} />
                                        <QuestionnaireTos key={4} title="- ¿A QUÉ EDAD PRESENTÓ EL PRIMER ATAQUE?" text={datos.antecedentesB1ASintR} />
                                        <QuestionnaireTos key={5} title="2. ¿NEUMONÍA O BRONCONEUMONÍA?" text={datos.antecedentesB2Sintr} />
                                        <QuestionnaireTos key={5} title="- ¿A QUÉ EDAD PRESENTÓ EL PRIMER ATAQUE?" text={datos.antecedentesB2ASintR} />
                                        <QuestionnaireTos key={5} title="3. ¿BRONQUITIS CRÓNICA?" text={datos.antecedentesB3SintR} />
                                        <QuestionnaireTos key={5} title="- ¿A QUÉ EDAD PRESENTÓ EL PRIMER ATAQUE?" text={datos.antecedentesB3ASintR} />
                                        <QuestionnaireTos key={5} title="- ¿AUN PRESENTA ESTA ENFERMEDAD?" text={datos.antecedentesB3BSintR} />
                                        <QuestionnaireTos key={5} title="- EDAD DE INICIO" text={datos.antecedentesB3CSintR} />
                                        <QuestionnaireTos key={5} title="4. ¿ENFISEMA PULMONAR?" text={datos.antecdentesB4SintR} />
                                        <QuestionnaireTos key={5} title="- ¿A QUÉ EDAD PRESENTÓ EL PRIMER ATAQUE?" text={datos.antecedenteB4ASintR} />
                                        <QuestionnaireTos key={5} title="- ¿AUN PRESENTA ESTA ENFERMEDAD?" text={datos.antecedentesB4BSintR} />
                                        <QuestionnaireTos key={5} title="- EDAD DE INICIO" text={datos.antecedentesB4CSintR} />

                                        <QuestionnaireTos key={5} title="5. ¿ASMA?" text={datos.antecedentesB5SintR} />
                                        <QuestionnaireTos key={5} title="- ¿A QUÉ EDAD PRESENTÓ EL PRIMER ATAQUE?" text={datos.antecedentesB5ASintR} />
                                        <QuestionnaireTos key={5} title="- ¿AUN PRESENTA ESTA ENFERMEDAD?" text={datos.antecedentesB5BSintR} />
                                        <QuestionnaireTos key={5} title="- EDAD DE INICIO" text={datos.antecedentesB5CSintR} />

                                        <QuestionnaireTos key={5} title="6. OTRAS ENFERMEDADES DEL TÓRAX" text={datos.otrasEnfToraxA} />
                                        <Grid item xs={3}>
                                            <Typography fontSize={10}><b>- ESPECIFIQUE:</b></Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography align='right' fontSize={10}>{datos.otrasEnfToraxB}</Typography>
                                        </Grid>
                                        <QuestionnaireTos key={5} title="7. ¿ALGUNA CIRUGÍA DEL TÓRAX?" text={datos.ciruToraxASintR} />
                                        <Grid item xs={3}>
                                            <Typography fontSize={10}><b>- ESPECIFIQUE:</b></Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography align='right' fontSize={10}>{datos.ciruToraxBSintR}</Typography>
                                        </Grid>
                                        <QuestionnaireTos key={5} title="8. TRAUMA (ALGÚN ACCIDENTE) DEL TÓRAX" text={datos.traumaToraxASintR} />
                                        <Grid item xs={3}>
                                            <Typography fontSize={10}><b>- ESPECIFIQUE:</b></Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography align='right' fontSize={10}>{datos.traumaToraxBSintR}</Typography>
                                        </Grid>
                                    </Grid>
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

export default ReportPage2;