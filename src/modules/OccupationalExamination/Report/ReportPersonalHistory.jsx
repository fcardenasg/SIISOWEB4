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

const Pathological = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={2.5}>
                <Typography variant="h6"><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={1.5}>
                <Typography variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportPersonalHistory = () => {
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
                            <Typography align="center" variant="h5"><b>ANTECEDENTES PERSONALES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <Typography variant="h5"><b>PATOLÓGICOS</b></Typography>
                                </Grid>

                                <Pathological key={1} title="1. CONGÉNITOS:" text="NO REFIERE" />
                                <Pathological key={2} title="11. GENITOURINARIO:" text="NO REFIERE" />
                                <Pathological key={3} title="21. TRANSFUSIONES:" text="NO REFIERE" />
                                <Pathological key={4} title="2. INMUNOPREVENIBLES:" text="NO REFIERE" />
                                <Pathological key={5} title="12. NEUROLÓGICO:" text="NO REFIERE" />
                                <Pathological key={6} title="22. VENÉREAS:" text="NO REFIERE" />
                                <Pathological key={7} title="3. INFECCIOSOS:" text="NO REFIERE" />
                                <Pathological key={8} title="13. DIABETES:" text="NO REFIERE" />
                                <Pathological key={9} title="23. DEFORMIDADES:" text="NO REFIERE" />
                                <Pathological key={10} title="4. OJOS:" text="NO REFIERE" />
                                <Pathological key={11} title="14. PROBLEMAS DE PIEL:" text="NO REFIERE" />
                                <Pathological key={12} title="24. PSIQUIÁTRICO:" text="NO REFIERE" />
                                <Pathological key={13} title="5. AGUDEZA VISUAL:" text="NO REFIERE" />
                                <Pathological key={14} title="15. OSTEOMUSCULARES:" text="REFIERE" />
                                <Pathological key={15} title="25. FARMACODEPENCIA:" text="NO REFIERE" />
                                <Pathological key={16} title="6. OIDOS:" text="NO REFIERE" />
                                <Pathological key={17} title="16. ALÉRGICOS:" text="NO REFIERE" />
                                <Pathological key={18} title="26. RENAL:" text="NO REFIERE" />
                                <Pathological key={19} title="7. NASOFARINGE:" text="NO REFIERE" />
                                <Pathological key={20} title="17. TÓXICOS:" text="NO REFIERE" />
                                <Pathological key={21} title="27. ASMA:" text="NO REFIERE" />
                                <Pathological key={22} title="8. CARDIOVASCULAR:" text="REFIERE" />
                                <Pathological key={23} title="18. FARMACÓLOGICOS:" text="NO REFIERE" />
                                <Pathological key={24} title="28. O.R.L.: " text="NO REFIERE" />
                                <Pathological key={25} title="9. PULMONAR:" text="NO REFIERE" />
                                <Pathological key={26} title="19. QUIRÚRGICOS:" text="NO REFIERE" />
                                <Pathological key={27} title="29. ETS:" text="NO REFIERE" />
                                <Pathological key={28} title="10. GASTROINTESTINAL:" text="NO REFIERE" />
                                <Pathological key={29} title="20. TRAUMÁTICOS:" text="NO REFIERE" />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>ESPECIFICACIONES</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        SINDROME DE MANGUITO ROTADOR HOMBRO DERECHO, RECONOCIDO CON LABORAL, SUJETO A MANEJO.(RMN 30-07-2018 RUPTURA PARCIAL
                                        EN LA CARA ARTICULAR DEL TENDON DEL SUPRAESPINOSO, TENDINOSIS DEL SUPRAESPINOSO, OSTEOARTROSIS ACROMIOCLAVICULAR)
                                        HTA EN TTO CON LOSARTAN 2 VECES AL DÍA.
                                        NIEGA ALERGIAS
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
                            <Typography align="center" variant="h5"><b>ENFERMEDAD PROFESIONAL/ACCIDENTE DE TRABAJO</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6"><b>FECHA</b></Typography>
                        </Grid>

                        <Grid item xs={10}>
                            <Typography variant="h6"><b>OBSERVACIÓN</b></Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6">2017</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6">SINDROME DE MANGUITO ROTADOR DERECHO</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>INMUNIZACIONES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h3">NO REFIERE</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 27 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportPersonalHistory;