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

const ReportPersonalHistory = ({ datos = [], lsDataUser = [] }) => {
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
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5"><b>ANTECEDENTES PERSONALES</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <Typography variant="h5"><b>PATOLÓGICOS</b></Typography>
                                </Grid>

                                <Pathological key={1} title="1. CONGÉNITOS:" text={datos.congenitosAP} />
                                <Pathological key={2} title="11. GENITOURINARIO:" text={datos.gimitoUrinarioAP} />
                                <Pathological key={3} title="21. ETS:" text={datos.etsAP} />

                                <Pathological key={4} title="2. INMUNOPREVENIBLES:" text={datos.inmunoPrevenibleAP} />
                                <Pathological key={5} title="12. NEUROLÓGICO:" text={datos.neurologicoAP} />
                                <Pathological key={6} title="22. DEFORMIDADES:" text={datos.deformidadesAP} />

                                <Pathological key={7} title="3. INFECCIOSOS:" text={datos.infecciososAP} />
                                <Pathological key={8} title="13. PROBLEMAS DE PIEL:" text={datos.transtornoPielAP} />
                                <Pathological key={9} title="23. PSIQUIÁTRICO:" text={datos.psiquiatricosAP} />

                                <Pathological key={10} title="4. OJOS:" text={datos.ojoAP} />
                                <Pathological key={11} title="14. OSTEOMUSCULARES:" text={datos.osteoMuscularAP} />
                                <Pathological key={12} title="24. FARMACODEPENCIA:" text={datos.farmacoDependenciaAP} />

                                <Pathological key={13} title="5. AGUDEZA VISUAL:" text={datos.agudezaVisualAP} />
                                <Pathological key={14} title="15. ALÉRGICOS:" text={datos.alergicosAP} />
                                <Pathological key={15} title="25. E.M.:" text={datos.emAP} />

                                <Pathological key={16} title="6. OIDOS:" text={datos.oidosAP} />
                                <Pathological key={17} title="16. TÓXICOS:" text={datos.toxicoAP} />
                                <Pathological key={18} title="26. RENAL:" text={datos.renalAP} />

                                <Pathological key={19} title="7. NASOFARINGE:" text={datos.nasoFaringeAP} />
                                <Pathological key={20} title="17. FARMACÓLOGICOS:" text={datos.faRmacologicosAP} />
                                <Pathological key={21} title="27. ASMA:" text={datos.asmaAP} />

                                <Pathological key={22} title="8. CARDIOVASCULAR:" text={datos.cardiovascularAP} />
                                <Pathological key={23} title="18. QUIRÚRGICOS:" text={datos.quirurgicosAP} />
                                <Pathological key={24} title="28. O.R.L.: " text={datos.orlAP} />

                                <Pathological key={25} title="9. PULMONAR:" text={datos.pulmonarAP} />
                                <Pathological key={26} title="19. TRAUMÁTICOS:" text={datos.traumaticosAP} />
                                <Pathological key={27} title="29. CANCER:" text={datos.cancerAP} />

                                <Pathological key={28} title="10. GASTROINTESTINAL:" text={datos.gastrointestinalAP} />
                                <Pathological key={29} title="20. TRANSFUSIONES:" text={datos.tranfuccionesAP} />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>ESPECIFICACIONES</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.especifiqueAP}
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
                            <Typography variant="h6">{datos.anioAT}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6">{datos.especifiqueAT}</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h6">{datos.anio1AT}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6">{datos.especifique1AT}</Typography>
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