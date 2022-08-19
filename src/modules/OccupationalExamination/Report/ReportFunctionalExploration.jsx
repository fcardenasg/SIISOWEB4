import { Fragment, useEffect, useState } from 'react';
import { Divider, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';

import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { GetByIdAdvice } from 'api/clients/AdviceClient';
import { FormatDate, GetEdad } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';

const FunctionalExploration = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={5}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant='h6'>{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ParaclinicalExaminations = ({ fecha = new Date(), estudio = "", resultado = "", observacion = "" }) => {
    return (
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
        </Fragment>
    )
}

const ReportFunctionalExploration = () => {
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
                            <Typography align="center" variant="h5"><b>EXPLORACIÓN FUNCIONAL</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <FunctionalExploration key={1} title="1. MOVILIDAD OCULAR" text="NORMAL" />
                                <FunctionalExploration key={2} title="2. EQUILIBRIO" text="NORMAL" />
                                <FunctionalExploration key={3} title="3. MARCHA - COORDINACIÓN" text="NORMAL" />
                                <FunctionalExploration key={3} title="4. MOVILIDAD HOMBRO" text="ANORMAL" />
                                <FunctionalExploration key={4} title="5. MOVILIDAD - CODO" text="NORMAL" />
                                <FunctionalExploration key={5} title="6. MOVILIDAD-MUÑECA" text="NORMAL" />
                                <FunctionalExploration key={7} title="7. SIGNO TÚNEL" text="NORMAL" />
                                <FunctionalExploration key={8} title="8. SIGNOPHALEN" text="NORMAL" />
                                <FunctionalExploration key={9} title="9. MOVILIDAD MANOS" text="NORMAL" />
                                <FunctionalExploration key={10} title="10. MOVILIDAD CADERA" text="NORMAL" />
                                <FunctionalExploration key={12} title="11. MOVILIDAD RODILLA" text="NORMAL" />
                                <FunctionalExploration key={13} title="12. MOVILIDAD TOBILLO" text="NORMAL" />
                                <FunctionalExploration key={14} title="13. MOVILIDAD CUELLO (C1-C4)" text="NORMAL" />
                                <FunctionalExploration key={15} title="14. ROT BICIPITAL(C5)" text="NORMAL" />
                                <FunctionalExploration key={15} title="15. ROT ROTULIANO(L4)" text="NORMAL" />
                                <FunctionalExploration key={15} title="16. EXTENSIÓN PRIMER ARTEJO (L)" text="NORMAL" />
                                <FunctionalExploration key={15} title="17. SENSIBILIDAD CARA ANTERIOR" text="NORMAL" />
                                <FunctionalExploration key={15} title="18. EVERSIÓN PIE(S1)" text="NORMAL" />
                                <FunctionalExploration key={15} title="19. SENSIBILIDAD CARA LATERAL PIE (S1)" text="NORMAL" />
                                <FunctionalExploration key={15} title="20. ROT AQUILIANO" text="NORMAL" />
                                <FunctionalExploration key={15} title="21. SIGNO DE LASÉGUE" text="NORMAL" />
                                <FunctionalExploration key={15} title="22. ÍNDICE DE WELLS" text="NORMAL" />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        VER EXAMEN FÍSICO
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
                            <Typography align="center" variant="h5"><b>EXÁMENES PARACLÍNICOS</b></Typography>
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

                                <ParaclinicalExaminations fecha={new Date()} estudio="RX TORAX" resultado="NORMAL" observacion="" />
                                <ParaclinicalExaminations fecha={new Date()} estudio="ESPIROMETRIA" resultado="ANORMAL" observacion="FVC 79, FEV1 82, FVE1/FVC 102" />
                                <ParaclinicalExaminations fecha={new Date()} estudio="AUDIÓMETRIA" resultado="NORMAL" observacion="NORMALIDAD AUTIVIDA BILATERAL" />
                                <ParaclinicalExaminations fecha={new Date()} estudio="CUESTIONARIO DE SINTOMAS" resultado="NEGATIVO" observacion="APLICADO" />



                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        PENDIENTE DEMÁS AYUDAS DIAGNOSTICAS.
                                        ESPIROMETRÍA CON RESTRICCION LEVE CURSA CON CUADRO RESPIRATORIO.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>

            <Grid sx={{ pt: 31 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportFunctionalExploration;