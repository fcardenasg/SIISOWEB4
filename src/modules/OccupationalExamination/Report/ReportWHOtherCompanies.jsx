import { Fragment } from 'react';
import { Divider, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';

function createData(riesgo, sugRiesgo, exp, anios, meses, sinEpp, conEpp, medidasControl) {
    return { riesgo, sugRiesgo, exp, anios, meses, sinEpp, conEpp, medidasControl };
}

const rows = [
    createData('ERGONÓMICO', 'Posición Estática Prolongada de Pie', 'O', 1, 6, "N/A", "N/A", "PAUSAS ACTIVAS AUTOADMINISTRADAS",),
    createData('PSICOSOCIAL', 'Monotonia', 'O', 1, 6, "N/A", "N/A", "PAUSAS ACTIVAS AUTOADMINISTRADAS")
];

const ReportWHOtherCompanies = ({ datos = [], lsDataUser = [], lsWorkHistoryOther = [] }) => {
    const { user } = useAuth();

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
                        <Grid item xs={6}>
                            <Typography align="center" variant="h5">FECHA DE CONCEPTO: {ViewFormat(datos.fecha)}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography align="center" variant="h5">Valoración Médica Nro: {datos.id}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
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
                                <Grid item xs={2.5}>
                                    <Typography variant="h5">DOCUMENTO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.documento}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">NOMBRES:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameEmpleado}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">GENERO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameGenero}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">F. NACIMIENTO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{ViewFormat(datos.fechaNacimiento)}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">EDAD:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{GetEdad(new Date(datos.fechaNacimiento))}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">DPTO. NACIMIENTO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameDptoNacimiento}</Typography>
                                </Grid>


                                <Grid item xs={2.5}>
                                    <Typography variant="h5">CIUDAD NACIMIENTO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameCiudadNacimiento}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">ESTADO CIVIL:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameEstadoCivil}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">CELULAR PERSONAL:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.celularEmpleado}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">TURNO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameTurno}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">GRUPO:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.nameGrupo}</Typography>
                                </Grid>

                                <Grid item xs={2.5}>
                                    <Typography variant="h5">EMAIL:</Typography>
                                </Grid>
                                <Grid item xs={3.5}>
                                    <Typography variant="h5">{datos.correoEmpleado}</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container sx={{ pt: 2 }} spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5"><b>INFORMACIÓN DE LA EMPRESA Y CARGO</b></Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">SEDE DE TRABAJO:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{datos.nameSede}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">DPTO. DE TRABAJO:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{datos.nameDepartamentoTrabajo}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">AREA:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{datos.nameArea}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">GRUPO:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{datos.nameGrupo}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">POSICIÓN:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{datos.namePosicion}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">TIPO CONTRATO:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{datos.nameTipoContrato}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">FECHA CONTRATO:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{ViewFormat(datos.fechaContratoEmpleado)}</Typography>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant="h5">ANTIGUEDAD:</Typography>
                                        </Grid>
                                        <Grid item xs={3.5}>
                                            <Typography variant="h5">{GetEdad(new Date(datos.fechaContratoEmpleado))} AÑOS</Typography>
                                        </Grid>
                                    </Grid>
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
                            <Typography align="center" variant="h5"><b>ANTECEDENTES LABORALES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5"><b>HISTORIA LABORAL EN OTRAS EMPRESAS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>NOMBRE DE LA EMPRESA</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>CARGO</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center' variant="h6"><b>AÑOS</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center' variant="h6"><b>MESES</b></Typography>
                                </Grid>

                                {lsWorkHistoryOther && lsWorkHistoryOther.map((work, index) => (
                                    <Fragment>
                                        <Grid item xs={4}>
                                            <Typography variant="h6">{work.empresa}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h6">{work.cargo}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align='center' variant="h6">{work.anio}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align='center' variant="h6">{work.meses}</Typography>
                                        </Grid>
                                    </Fragment>
                                ))}


                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>RECOMENDACIONES PARA APTITUD DE CONTROL PERIÓDICO</b></Typography>
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

export default ReportWHOtherCompanies;