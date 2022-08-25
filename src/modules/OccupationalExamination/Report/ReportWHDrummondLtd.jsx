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
import { DefaultValue } from 'components/helpers/Enums';
import { GetAllByHistorico, GetAllByHistoricoCompany } from 'api/clients/WorkHistoryRiskClient';

function createData(riesgo, sugRiesgo, exp, anios, meses, sinEpp, conEpp, medidasControl) {
    return { riesgo, sugRiesgo, exp, anios, meses, sinEpp, conEpp, medidasControl };
}

const rows = [
    createData('FÍSICO', 'Ruido', 'O', 15, 0, "MEDIO", "BAJO", "PROTECCIÓN AUDITIVA"),
    createData('PSICOSOCIAL', 'Jornada Laboral Prolongada', 'F', 10, 6, "N/A", "N/A", "PAUSAS ACTIVAS AUTOADMINISTRADAS"),
    createData('QUÍMICO', 'MPI', 'F', 10, 6, "MEDIO", "BAJO", "PROTECCIÓN RESPIRATORIA")
];

const WorkHistoryAM = ({ mpiAnio = 0, mpiMes = 0, anioRuido = 0, mesRuido = 0 }) => {
    return (
        <Fragment>
            <Grid item xs={4}>
                <Typography variant="h6"><b>MPI:</b></Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6">{mpiAnio} AÑOS</Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6">{mpiMes} MESES</Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6"><b>RUDIO:</b></Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6">{anioRuido} AÑOS</Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6">{mesRuido} MESES</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportWHDrummondLtd = ({ datos = [], lsWorkHistoryDLTD = [], lsDataUser = [] }) => {
    const { user } = useAuth();

    const [mpiAnioDTLD, setMpiAnioDTLD] = useState(0);
    const [mpiMesDTLD, setMpiMesDTLD] = useState(0);
    const [anioRuidoDTLD, setAnioRuidoDTLD] = useState(0);
    const [mesRuidoDTLD, setMesRuidoDTLD] = useState(0);

    const [mpiAnioOtrasEmpresas, setMpiAnioOtrasEmpresas] = useState(0);
    const [mpiMesOtrasEmpresas, setMpiMesOtrasEmpresas] = useState(0);
    const [anioRuidoOtrasEmpresas, setAnioRuidoOtrasEmpresas] = useState(0);
    const [mesRuidoOtrasEmpresas, setMesRuidoOtrasEmpresas] = useState(0);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerDTLD = await GetAllByHistorico(0, 0, 94367343);
                if (lsServerDTLD.status === 200) {
                    var arrayMPI = lsServerDTLD.data.entities;
                    var arrayRUIDO = lsServerDTLD.data.entities;

                    if (arrayMPI.length != 0 || arrayRUIDO.length != 0) {
                        var arrayReadyMPI = arrayMPI.filter(code => code.idRiesgo == DefaultValue.RiesgoQuimico && code.idClase == DefaultValue.RiesgoQuimico_MPI_DLTD)
                            .map((riesgo) => ({
                                anio: riesgo.anio,
                                mes: riesgo.mes
                            }));

                        var arrayReadyRUIDO = arrayRUIDO.filter(code => code.idRiesgo == DefaultValue.RiesgoFisico && code.idClase == DefaultValue.RiesgoQuimico_RUIDO_DLTD)
                            .map((riesgo) => ({
                                anio: riesgo.anio,
                                mes: riesgo.mes
                            }));

                        var aniosMpi = 0;
                        var mesMpi = 0;
                        var aniosRuido = 0;
                        var mesRuido = 0;

                        for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                            const datos = arrayReadyRUIDO[index];
                            aniosRuido = aniosRuido + datos.anio;
                            setAnioRuidoDTLD(aniosRuido);
                        }

                        for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                            const datos = arrayReadyRUIDO[index];
                            mesRuido = mesRuido + datos.mes;
                            setMesRuidoDTLD(mesRuido);
                        }

                        for (let index = 0; index < arrayReadyMPI.length; index++) {
                            const datos = arrayReadyMPI[index];
                            aniosMpi = aniosMpi + datos.anio;
                            setMpiAnioDTLD(aniosMpi);
                        }

                        for (let index = 0; index < arrayReadyMPI.length; index++) {
                            const datos = arrayReadyMPI[index];
                            mesMpi = mesMpi + datos.mes;
                            setMpiMesDTLD(mesMpi);
                        }
                    }
                }

                const lsServerOtrasEmpresas = await GetAllByHistoricoCompany(0, 0, 94367343);
                if (lsServerOtrasEmpresas.status === 200) {
                    var arrayMPI = lsServerOtrasEmpresas.data.entities;
                    var arrayRUIDO = lsServerOtrasEmpresas.data.entities;

                    if (arrayMPI.length != 0 || arrayRUIDO.length != 0) {
                        var arrayReadyMPI = arrayMPI.filter(code => code.idRiesgo == DefaultValue.RiesgoQuimico && code.idClase == DefaultValue.RiesgoQuimico_MPI_DLTD)
                            .map((riesgo) => ({
                                anio: riesgo.anio,
                                mes: riesgo.mes
                            }));

                        var arrayReadyRUIDO = arrayRUIDO.filter(code => code.idRiesgo == DefaultValue.RiesgoFisico && code.idClase == DefaultValue.RiesgoQuimico_RUIDO_DLTD)
                            .map((riesgo) => ({
                                anio: riesgo.anio,
                                mes: riesgo.mes
                            }));

                        var aniosMpi = 0;
                        var mesMpi = 0;
                        var aniosRuido = 0;
                        var mesRuido = 0;

                        for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                            const datos = arrayReadyRUIDO[index];
                            aniosRuido = aniosRuido + datos.anio;
                            setAnioRuidoOtrasEmpresas(aniosRuido);
                        }

                        for (let index = 0; index < arrayReadyRUIDO.length; index++) {
                            const datos = arrayReadyRUIDO[index];
                            mesRuido = mesRuido + datos.mes;
                            setMesRuidoOtrasEmpresas(mesRuido);
                        }

                        for (let index = 0; index < arrayReadyMPI.length; index++) {
                            const datos = arrayReadyMPI[index];
                            aniosMpi = aniosMpi + datos.anio;
                            setMpiAnioOtrasEmpresas(aniosMpi);
                        }

                        for (let index = 0; index < arrayReadyMPI.length; index++) {
                            const datos = arrayReadyMPI[index];
                            mesMpi = mesMpi + datos.mes;
                            setMpiMesOtrasEmpresas(mesMpi);
                        }
                    }
                }



            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, []);

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
                            <Typography variant="h5" align="center"><b>{datos.nameAtencion}</b></Typography>
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
                                <Grid item xs={6}>
                                    <Typography variant="h6"><b>CARGO</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align='center' variant="h6"><b>AÑOS</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography align='center' variant="h6"><b>MESES</b></Typography>
                                </Grid>

                                {lsWorkHistoryDLTD && lsWorkHistoryDLTD.map((work, index) => (
                                    <Fragment>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">{work.nameCargo}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography align='center' variant="h6">{work.anio}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography align='center' variant="h6">{work.meses}</Typography>
                                        </Grid>
                                    </Fragment>
                                ))}
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
                                    <Grid container spacing={0.5}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h6"><b>EN DLTD</b></Typography>
                                        </Grid>

                                        <WorkHistoryAM
                                            key={1}
                                            anioRuido={mpiAnioDTLD}
                                            mesRuido={mpiMesDTLD}
                                            mpiAnio={anioRuidoDTLD}
                                            mpiMes={mesRuidoDTLD}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider orientation="vertical" flexItem sx={{ background: "black", border: 1, color: "black" }} />

                                <Grid item xs>
                                    <Grid container spacing={0.5}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h6"><b>EN OTRAS EMPRESAS</b></Typography>
                                        </Grid>

                                        <WorkHistoryAM
                                            key={1}
                                            anioRuido={mpiAnioOtrasEmpresas}
                                            mesRuido={mpiMesOtrasEmpresas}
                                            mpiAnio={anioRuidoOtrasEmpresas}
                                            mpiMes={mesRuidoOtrasEmpresas}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider orientation="vertical" flexItem sx={{ background: "black", border: 1, color: "black" }} />

                                <Grid item xs>
                                    <Grid container spacing={0.5}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h6"><b>TOTALES</b></Typography>
                                        </Grid>

                                        <WorkHistoryAM
                                            key={1}
                                            anioRuido={mpiAnioDTLD + mpiAnioOtrasEmpresas}
                                            mesRuido={mpiMesDTLD + mpiMesOtrasEmpresas}
                                            mpiAnio={anioRuidoDTLD + anioRuidoOtrasEmpresas}
                                            mpiMes={mesRuidoDTLD + mesRuidoOtrasEmpresas}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 41 }} textAlign="center" justifyContent="center" container spacing={1}>
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