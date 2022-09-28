import { Fragment, useEffect, useState } from 'react';
import { Divider, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { DefaultValue } from 'components/helpers/Enums';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';
import { GetAllByChargeWHRAdvanceCompany } from 'api/clients/WorkHistoryRiskClient';
import { GetAllByDocumentWorkHistoryOtherCompany } from 'api/clients/WorkHistoryOtherCompany';

const WHOtherCompanies = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={2.5}>
                <Typography variant="h6"><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={3.5}>
                <Typography variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const TableDLTD = ({ idRiesgo = 0, title = '', idHistoriaLaboral = '', idCargo = '' }) => {
    const [lsRiesgo, setLsRiesgo] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllByChargeWHRAdvanceCompany(0, 0, idCargo, idRiesgo, idHistoriaLaboral);
                if (lsServer.status === 200) setLsRiesgo(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [idHistoriaLaboral, idRiesgo, idCargo]);

    return (
        <Fragment>
            {lsRiesgo.length !== 0 ?
                <Fragment>
                    <Grid item xs={12}>
                        <Typography variant="h6"><b>{title}</b></Typography>
                    </Grid><Grid item xs={12}><Divider /></Grid>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right"><Typography align="left" variant="h6"><b>EXP.</b></Typography></TableCell>
                                    <TableCell align="right"><Typography align="left" variant="h6"><b>AÑOS</b></Typography></TableCell>
                                    <TableCell align="right"><Typography align="left" variant="h6"><b>MESES</b></Typography></TableCell>
                                    <TableCell align="right"><Typography align="left" variant="h6"><b>GR SIN EPP</b></Typography></TableCell>
                                    <TableCell align="right"><Typography align="left" variant="h6"><b>GR CON EPP</b></Typography></TableCell>
                                    <TableCell align="right"><Typography align="left" variant="h6"><b>MEDIDAS DE CONTROL</b></Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lsRiesgo.map((row, index) => (
                                    <TableRow>

                                        <TableCell align="right">
                                            <Typography align="left" variant="h6">{row.nameExpocision}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography align="left" variant="h6">{row.anio}</Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            <Typography align="left" variant="h6">{row.mes}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography align="left" variant="h6">{row.nameGradoSinEPP}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography align="left" variant="h6">{row.nameGradoConEPP}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            {JSON.parse(row.medidasControl).map((medidas, index) => (
                                                <Grid item xs={6}>
                                                    <Typography fontSize={10}>{medidas.label},</Typography>
                                                </Grid>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fragment> : ''
            }
        </Fragment>

    )
}

const ReportWHOtherCompanies = ({ datos = [] }) => {
    const { user } = useAuth();
    const [lsWorkHistoryOther, setLsWorkHistoryOther] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllByDocumentWorkHistoryOtherCompany(0, 0, datos.documento);
                if (lsServer.status === 200) setLsWorkHistoryOther(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [datos.documento]);

    return (
        <div>
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
                                <WHOtherCompanies title='DOCUMENTO:' text={datos.documento} />
                                <WHOtherCompanies title='NOMBRES:' text={datos.nameEmpleado} />
                                <WHOtherCompanies title='GENERO:' text={datos.nameGenero} />
                                <WHOtherCompanies title='F. NACIMIENTO:' text={ViewFormat(datos.fechaNacimiento)} />
                                <WHOtherCompanies title='EDAD:' text={GetEdad(new Date(datos.fechaNacimiento))} />
                                <WHOtherCompanies title='DPTO. NACIMIENTO:' text={datos.nameDptoNacimiento} />
                                <WHOtherCompanies title='CIUDAD NACIMIENTO:' text={datos.nameCiudadNacimiento} />
                                <WHOtherCompanies title='ESTADO CIVIL:' text={datos.nameEstadoCivil} />
                                <WHOtherCompanies title='CELULAR PERSONAL:' text={datos.celularEmpleado} />
                                <WHOtherCompanies title='TURNO:' text={datos.nameTurno} />
                                <WHOtherCompanies title='GRUPO:' text={datos.nameGrupo} />
                                <WHOtherCompanies title='EMAIL:' text={datos.correoEmpleado} />

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6"><b>INFORMACIÓN DE LA EMPRESA Y CARGO</b></Typography>
                                        </Grid>
                                        <WHOtherCompanies title='SEDE DE TRABAJO:' text={datos.nameSede} />
                                        <WHOtherCompanies title='DPTO. DE TRABAJO:' text={datos.nameDepartamentoTrabajo} />
                                        <WHOtherCompanies title='AREA:' text={datos.nameArea} />
                                        <WHOtherCompanies title='GRUPO:' text={datos.nameGrupo} />
                                        <WHOtherCompanies title='POSICIÓN:' text={datos.namePosicion} />
                                        <WHOtherCompanies title='TIPO CONTRATO:' text={datos.nameTipoContrato} />
                                        <WHOtherCompanies title='FECHA CONTRATO:' text={ViewFormat(datos.fechaContratoEmpleado)} />
                                        <WHOtherCompanies title='ANTIGUEDAD:' text={GetEdad(new Date(datos.fechaContratoEmpleado))} />
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
                            <Typography align="center" variant="h5"><b>HISTORIA LABORAL EN OTRAS EMPRESAS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
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

                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <TableDLTD
                                                    title='RIESGO QUÍMICO'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoQuimico}
                                                />

                                                <TableDLTD
                                                    title='RIESGO FÍSICO'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoFisico}
                                                />

                                                <TableDLTD
                                                    title='RIESGO PSICOSOCIAL'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoPsicosocial}
                                                />

                                                <TableDLTD
                                                    title='RIESGO BIOLÓGICO'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoBiologico}
                                                />

                                                <TableDLTD
                                                    title='RIESGO ECF - POSTURA'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoErgonomicoCargaFisica_Postura}
                                                />

                                                <TableDLTD
                                                    title='RIESGO ECF - FUERZA'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza}
                                                />

                                                <TableDLTD
                                                    title='RIESGO ECF - MOVIMIENTO'
                                                    idHistoriaLaboral={work.id}
                                                    idCargo={work.cargo}
                                                    idRiesgo={DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Fragment>
                                ))}


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
        </div>
    );
};

export default ReportWHOtherCompanies;