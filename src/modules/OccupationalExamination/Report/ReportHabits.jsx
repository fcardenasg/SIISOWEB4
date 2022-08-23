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
            <Grid item xs={4}>
                <Typography variant="h6"><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportHabits = () => {
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
                            <Typography align="center" variant="h5"><b>HABITOS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Pathological key={1} title="FUMA:" text="NO REFIERE" />
                                <Pathological key={2} title="CIGARRILLOS DÍA:" text="0" />
                                <Pathological key={3} title="AÑOS:" text="0" />
                                <Pathological key={3} title="MESES:" text="0" />
                                <Pathological key={4} title="FUMABA:" text="NO REFIERE" />
                                <Pathological key={5} title="CIGARRILLOS DÍA:" text="0" />
                                <Pathological key={7} title="AÑOS:" text="0" />
                                <Pathological key={8} title="MESES:" text="0" />
                                <Pathological key={9} title="PRACTICA DEPORTE:" text="NO REFIERE" />
                                <Pathological key={10} title="CUAL DEPORTE:" text="FUTBOL" />
                                <Pathological key={12} title="FRECUENCIA:" text="OCASIONAL" />
                                <Pathological key={13} title="CONSUME BEBIDAS ALCOHOLICAS:" text="SI" />
                                <Pathological key={14} title="CUAL BEBIDA:" text="CERVEZA" />
                                <Pathological key={15} title="FRECUENCIA:" text="OCASIONAL" />

                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>HOBBY/PASATIEMPO:</b></Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h6">ESTAR EN FAMILIA</Typography>
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
                            <Typography align="center" variant="h5"><b>FOBIAS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6"><b>FOBIAS:</b></Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6">NO REFIERE</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6"><b>TIPO DE FOBIA:</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">NO REFIERE</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6"><b>DESCRIPCIÓN:</b></Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6"></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>HEREDO FAMILIARES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6"><b>PARENTESCO 1:</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6">PADRE</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6">IAM FALLECIDO</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6"><b>PARENTESCO 2:</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6">MADRE</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6">DIABETES</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>GINECO OBSTÉTRICOS</b></Typography>
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

            <Grid sx={{ pt: 40 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportHabits;