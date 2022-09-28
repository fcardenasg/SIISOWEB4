import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import ImgWhite from 'assets/img/ImgWhite.png';
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';

const Pathological = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={3}>
                <Typography variant="h6"><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportConfinedSpaceCompany = ({ datos = [], lsDataUser = [] }) => {
    const { user } = useAuth();

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
                            <Typography variant="h5" align="center"><b>ANEXO DE ESPACIO CONFINADO</b></Typography>
                        </Grid>

                        <Grid item xs={4}>
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
                            <Typography align="center" variant="h5"><b>NOTIFICACIÓN A LA EMPRESA</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <Typography variant="h5"><b>DATOS BÁSICOS DE LA ATENCIÓN</b></Typography>
                                </Grid>

                                <Pathological key={1} title="CONSECUTIVO:" text={datos.id} />
                                <Pathological key={2} title="FECHA DEL CONCEPTO:" text={ViewFormat(datos.fechaConceptoNETA)} />
                                <Pathological key={3} title="DOCUMENTO NRO:" text={datos.documento} />
                                <Pathological key={4} title="NOMBRE:" text={datos.nameEmpleado} />
                                <Pathological key={6} title="GENERO:" text={datos.nameGenero} />
                                <Pathological key={7} title="AREA:" text={datos.nameArea} />
                                <Pathological key={8} title="EDAD:" text={GetEdad(datos.fechaNacimiento)} />
                                <Pathological key={9} title="ANTIGUEDAD:" text={GetEdad(datos.fechaContratoEmpleado)} />
                                <Pathological key={10} title="VIGENCIA DEL CONCEPTO:" text="1 AÑO" />
                                <Pathological key={11} title="TIPO DE EXAMEN:" text="APTO PARA TRABAJAR EN ALTURAS RIESGO ALTO" />
                                <Pathological key={12} title="CONCEPTO DE APTITUD:" text={datos.nameConceptoActitudNETA} />
                                <Pathological key={13} title="CONCEPTO APTITUD APLAZADO:" text={datos.nameConceptoAplazadoNETA} />
                                <Pathological key={14} title="MOTIVO DE APLAZO:" text={datos.motivoAplazoNETA} />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h6"><b>DESCRIPCIÓN DE RESULTADOS (RESUMEN DE LIMITACIONES O RESTRICCIONES)</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.descripcionResultadoNETA}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6"><b>RECOMENDACIONES (EN TÉRMINOS SENCILLOS RESUMEN DE CUIDADOS Y CONTROLES REQUERIDOS)</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.recomendacionesNETA}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{ mt: 2 }} xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>REMITIDO:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">{datos.nameRemitidoNETA}</Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Typography variant="h6"><b>A DONDE:</b></Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">{datos.nameRemididoDondeNETA}</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ mt: 7 }} xs={12}>
                            <Grid container spacing={2}>
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
                                    <Typography variant="h6"><b>Ibarra Lopez,Melquis Leonardo</b></Typography>
                                    <Typography variant="h6"><b>FIRMA EMPLEADO</b></Typography>
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
        </div>
    );
};

export default ReportConfinedSpaceCompany;