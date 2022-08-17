import { useEffect, useState } from 'react';
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

function createData(riesgo, sugRiesgo, exp, anios, meses, sinEpp, conEpp, medidasControl) {
    return { riesgo, sugRiesgo, exp, anios, meses, sinEpp, conEpp, medidasControl };
}

const rows = [
    createData('FÍSICO', 'Ruido', 'O', 15, 0, "MEDIO", "BAJO", "PROTECCIÓN AUDITIVA"),
    createData('PSICOSOCIAL', 'Jornada Laboral Prolongada', 'F', 10, 6, "N/A", "N/A", "PAUSAS ACTIVAS AUTOADMINISTRADAS"),
    createData('QUÍMICO', 'MPI', 'F', 10, 6, "MEDIO", "BAJO", "PROTECCIÓN RESPIRATORIA")
];

const ReportWHDrummondLtd = () => {
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
                            <Typography align="center" variant="h5"><b>HISTORIA LABORAL EN DRUMMOND LTD.</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>SUCURSAL</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>POSICIÓN</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6"><b>AREA</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6"><b>DEPARTAMENTO</b></Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6"><b>AÑOS</b></Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6"><b>MESES</b></Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6">PUERTO</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">DECKHAND</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">MARINE SERVICES</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">MARINE SERVICES</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">11</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">7</Typography>
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
                            <Typography align="center" variant="h5"><b>EXPOSICIÓN OCUPACIONAL PARA EL CARGO EN DLTD</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Typography align="left" variant="h6">RIESGO</Typography></TableCell>
                                            <TableCell align="right"><Typography align="left" variant="h6">EXP.</Typography></TableCell>
                                            <TableCell align="right"><Typography align="left" variant="h6">AÑOS</Typography></TableCell>
                                            <TableCell align="right"><Typography align="left" variant="h6">MESES</Typography></TableCell>
                                            <TableCell align="right"><Typography align="left" variant="h6">GR SIN EPP</Typography></TableCell>
                                            <TableCell align="right"><Typography align="left" variant="h6">GR CON EPP</Typography></TableCell>
                                            <TableCell align="right"><Typography align="left" variant="h6">MEDIDAS DE CONTROL</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Typography align="left" variant="h6">
                                                        {row.riesgo}
                                                    </Typography>
                                                    <Typography align="left" variant="caption">
                                                        {row.sugRiesgo}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Typography align="left" variant="h6">{row.exp}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography align="left" variant="h6">{row.anios}</Typography>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Typography align="left" variant="h6">{row.meses}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography align="left" variant="h6">{row.sinEpp}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography align="left" variant="h6">{row.conEpp}</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography align="left" variant="h6">{row.medidasControl}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>EXPOSICIÓN ACUMULADA DE FACTORES DE RIESGO</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h6"><b>EN DLTD</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>MPI:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">10 AÑOS</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">6 MESES</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>RUDIO:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">15 AÑOS</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">0 MESES</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Divider orientation="vertical" flexItem sx={{ background: "black", border: 1, color: "black" }} />

                                <Grid item xs>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h6"><b>EN OTRAS EMPRESAS</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>MPI:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">0 AÑOS</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">0 MESES</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>RUDIO:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">0 AÑOS</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">0 MESES</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Divider orientation="vertical" flexItem sx={{ background: "black", border: 1, color: "black" }} />

                                <Grid item xs>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h6"><b>TOTALES</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>MPI:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">10 AÑOS</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">6 MESES</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6"><b>RUDIO:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">15 AÑOS</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">0 MESES</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 7 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportWHDrummondLtd;