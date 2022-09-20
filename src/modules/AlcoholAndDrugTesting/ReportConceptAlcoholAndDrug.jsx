import { Divider, Grid, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';

import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';
import { Fragment } from 'react';

const DataAssistance = ({ title, text, xsTitle = 1.5, xsText = 2.5 }) => {
    return (
        <Fragment>
            <Grid item xs={xsTitle}>
                <Typography fontSize={10}><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={xsText}>
                <Typography fontSize={11} align="right">{text}</Typography>
            </Grid>
        </Fragment>

    );
}

const ReportConceptAlcoholAndDrug = ({ lsDataReport = [], lsDataUser = [] }) => {
    const { user } = useAuth();

    return (
        <SubCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <img src={LogoReport} height={50} />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                            <Typography variant="h5" align="center"><b>PRUEBAS DE ALCOHOL Y DROGA</b></Typography>
                        </Grid>

                        <Grid item xs={3}>
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
                            <Typography align="center" variant="h5"><b>DATOS DEL PACIENTE</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <DataAssistance title="DOCUMENTO:" text={lsDataReport.documento} />
                                <DataAssistance title="NOMBRES:" text={lsDataReport.nameEmpleado} />
                                <DataAssistance title="FECHA NACIMIENTO:" text={ViewFormat(lsDataReport.fechaNacimi)} xsTitle={2.5} xsText={1.5} />
                                <DataAssistance title="EDAD:" text={GetEdad(lsDataReport.fechaNacimi)} />
                                <DataAssistance title="FECHA DE CONTRATO:" text={ViewFormat(lsDataReport.fechaContrato)} xsTitle={2.5} xsText={1.5} />
                                <DataAssistance title="TYPE:" text={lsDataReport.nameType} />
                                <DataAssistance title="TIPO DE CONTRATO:" text={lsDataReport.nameTipoContrato} xsTitle={2} xsText={2} />
                                <DataAssistance title="DEPARTAMENTO:" text={lsDataReport.nameDepartamento} />
                                <DataAssistance title="AREA:" text={lsDataReport.nameArea} />
                                <DataAssistance title="SUBAREA:" text={lsDataReport.nameSubarea} />
                                <DataAssistance title="GRUPO:" text={lsDataReport.nameGrupo} />
                                <DataAssistance title="ROSTER POSITION:" text={lsDataReport.nameCargo} xsTitle={2.5} xsText={1.5} />
                                <DataAssistance title="SEDE:" text={lsDataReport.nameSede} />
                                <DataAssistance title="EPS:" text={lsDataReport.nameEps} />
                                <DataAssistance title="AFP:" text={lsDataReport.nameAfp} />
                                <DataAssistance title="TURNO:" text={lsDataReport.nameTurnoEmpleado} />
                                <DataAssistance title="DPTO DE NACIMIENTO:" text={lsDataReport.nameDptoNacido} xsTitle={2} xsText={2} />
                                <DataAssistance title="CIUDAD DE NAC:" text={lsDataReport.nameCiudadNacido} xsTitle={2.5} xsText={1.5} />
                                <DataAssistance title="DPTO DE RESIDENCIA:" text={lsDataReport.nameDptoResidencia} xsTitle={2.5} xsText={1.5} />
                                <DataAssistance title="CIUDAD DE RESIDENCIA:" text={lsDataReport.nameCiudadResidencia} xsTitle={2.5} xsText={1.5} />
                                <DataAssistance title="DIRECCIÓN:" text={lsDataReport.nameDireccion} xsTitle={1} xsText={3} />
                                <DataAssistance title="ESTADO CIVIL:" text={lsDataReport.nameEstadoCivil} />
                                <DataAssistance title="CELULAR:" text={lsDataReport.nameTelefono} />
                                <DataAssistance title="EMAIL:" text={lsDataReport.nameCorreo} />
                                <DataAssistance title="EMPRESA:" text={lsDataReport.nameEmpresa} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>NOTAS DE EVOLUCIÓN</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item textAlign="justify" xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>DE:</b></Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6">DEPARTAMENTO DE SALUD OCUPACIONAL</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>PARA:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>DEPARTAMENTO:</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">{lsDataReport.nameDepartamento}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>AREA:</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">{lsDataReport.nameArea}</Typography>
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
                            <Typography align="center" variant="h5"><b>RESULTADO PRUEBA DE ALCOHOL Y DROGA SIG - 400</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item textAlign="justify" xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>CONSECUTIVO:</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='right' variant="h6">{lsDataReport.idPruebasAlcoholDroga}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>FECHA PRUEBA:</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='right' variant="h6">{ViewFormat(lsDataReport.fecha)}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>MOTIVO PRUEBA:</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='right' variant="h6">{lsDataReport.nameMotivo}</Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>CONCEPTO APTITUD:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='right' variant="h6">{lsDataReport.nameConcepto}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>REALIZADA POR:</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align='right' variant="h6">{lsDataReport.usuarioRegistro}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4} sx={{ mt: 27 }}>
                    <img src={lsDataUser.firma} height={50} />

                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                </Grid>
            </Grid>

            <Grid sx={{ pt: 2 }} textAlign="center" justifyContent="center" container spacing={1}>
                <Grid item xs={12}>
                    <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h6">Fecha Sistema: {FormatDate(new Date())}</Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default ReportConceptAlcoholAndDrug;