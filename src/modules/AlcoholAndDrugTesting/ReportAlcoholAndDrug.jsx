import { Divider, Grid, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';

import ImgWhite from 'assets/img/ImgWhite.png';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';
import { Fragment } from 'react';
import { DefaultValue } from 'components/helpers/Enums';

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

const TableResult = ({ text }) => {
    return (
        <Grid item xs={4}>
            <Typography variant="h6">{text}</Typography>
        </Grid>
    )
}

const ReportAlcoholAndDrug = ({ lsDataReport = [], lsDataUser = [] }) => {
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
                            <Typography variant="h5" align="center"><b>CONCEPTO DE APTITUD PRUEBAS DE ALCOHOL Y DROGA</b></Typography>
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
                    <Grid container spacing={1}>
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
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>RESULTADO PRUEBA DE ALCOHOL Y DROGA SIG - 400</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item textAlign="justify" xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>FECHA:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">{ViewFormat(lsDataReport.fecha)}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>CONSECUTIVO:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">{lsDataReport.idPruebasAlcoholDroga}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>MOTIVO:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">{lsDataReport.nameMotivo}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>RESULTADOS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>DROGA / ALCOHOL</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>MUESTRA</b></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>RESULTADO</b></Typography>
                                </Grid>

                                <TableResult text="COCAÍNA" />
                                <TableResult text={lsDataReport.nameMuestra1} />
                                <TableResult text={lsDataReport.nameResultado1} />

                                <TableResult text="MARIHUANA" />
                                <TableResult text={lsDataReport.nameMuestra2} />
                                <TableResult text={lsDataReport.nameResultado2} />

                                <TableResult text="MORFINA" />
                                <TableResult text={lsDataReport.nameMuestra3} />
                                <TableResult text={lsDataReport.nameResultado3} />

                                <TableResult text="BENZODIAZEPINA" />
                                <TableResult text={lsDataReport.nameMuestra4} />
                                <TableResult text={lsDataReport.nameResultado4} />

                                <TableResult text="ANFETAMINAS" />
                                <TableResult text={lsDataReport.nameMuestra5} />
                                <TableResult text={lsDataReport.nameResultado5} />

                                <TableResult text="ALCOHOL" />
                                <TableResult text={lsDataReport.nameMuestra6} />
                                <TableResult text={lsDataReport.nameResultado6} />
                            </Grid>
                        </Grid>

                        <Grid item textAlign="justify" xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><b>CONCEPTO DE APTITUD:</b></Typography>
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

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>OBSERVACIONES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item textAlign="justify" xs={12}>
                            <Typography variant="h6">
                                {lsDataReport.observaciones}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {lsDataReport.idMotivoPrueba === DefaultValue.PAD_MOTIVO_SOSPECHA ? (
                    <Grid item textAlign="justify" xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography align='center' variant="h5"><b>DATOS DEL SOLICITANTE (SOLO EN CASO DE SOSPECHAS Y ACCIDENTES)</b></Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="h6"><b>DOCUMENTO:</b> {lsDataReport.documento}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="h6"><b>NOMBRE:</b> {lsDataReport.nameEmpleado}</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 3 }} />
                                <Typography variant="h6"><b>FIRMA SOLICITANTE</b></Typography>
                            </Grid>
                        </Grid>
                    </Grid>) : null
                }

                <Grid item xs={6}>
                    <img src={lsDataUser.firma} height={50} />

                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                </Grid>

                <Grid item xs={6}>
                    <img src={ImgWhite} height={50} />

                    <Divider sx={{ border: 1, mt: 1, background: 'black', color: 'black' }} />
                    <Typography variant="h6"><b>{lsDataReport.nameEmpleado}</b></Typography>
                    <Typography variant="h6"><b>FIRMA EMPLEADO</b></Typography>
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

export default ReportAlcoholAndDrug;