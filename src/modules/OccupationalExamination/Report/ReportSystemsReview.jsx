import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate } from 'components/helpers/Format';

const SystemsReview = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={5}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant='h6'>{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const Morphological = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={3}>
                <Typography fontSize={11}><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography fontSize={10}>{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportSystemsReview = ({ datos = [] }) => {
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
                            <Typography variant="h5" align="center"><b>C{datos.nameAtencion}</b></Typography>
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
                            <Typography align="center" variant="h5"><b>REVISIÓN POR SISTEMAS - PATOLOGÍAS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <SystemsReview key={1} title="1. CABEZA - CEFALEA" text={datos.cabezaRS} />
                                <SystemsReview key={2} title="2. OJOS (A. VISUAL, DOLOR, CONGESTIÓN, ETC.)" text={datos.ojosRS} />
                                <SystemsReview key={3} title="3. OÍDOS (A. AUDITIVA, DOLOR, SECRECIÓN, ETC.)" text={datos.oidosRS} />
                                <SystemsReview key={3} title="4. NARIZ (CONGESTIÓN, EPISTAXIS, RINORREA)" text={datos.narizRS} />
                                <SystemsReview key={4} title="5. BOCA (ULCERACIONES, SANGRADO DE ENCÍAS)" text={datos.bocaRS} />
                                <SystemsReview key={5} title="6. GARGANTA (DOLOR, ARDOR, DISFAGIA, DISFONÍA)" text={datos.gargantaRS} />
                                <SystemsReview key={7} title="7. CUELLO (DOLOR, TORTICOLIS, ADENOPATÍAS)" text={datos.cuellosRS} />
                                <SystemsReview key={8} title="8. CARDIO RESPIRATORIO" text={datos.cardioRS} />
                                <SystemsReview key={9} title="9. GASTROINTESTINAL" text={datos.gastrointestinalRS} />
                                <SystemsReview key={10} title="10. GENITOURINARIO" text={datos.genitoUrinarioRS} />
                                <SystemsReview key={12} title="11. OSTEO - ARTICULAR" text={datos.osteoRS} />
                                <SystemsReview key={13} title="12. NEURO - MUSCULAR" text={datos.neuroRS} />
                                <SystemsReview key={14} title="13. PIEL Y ANEXOS" text={datos.pielRS} />
                                <SystemsReview key={15} title="14. PSIQUIÁTRICO" text={datos.psiquiatricoRS} />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.observacionRS}
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
                            <Typography align="center" variant="h5"><b>EXAMEN FÍSICO</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography align="center" variant="h5"><b>SIGNOS VITALES</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align="center" variant="h5"><b>ANTROPOMETRÍA</b></Typography>
                        </Grid>

                        <Grid item xs>
                            <Grid container spacing={0.5}>
                                <Grid item xs={3}>
                                    <Typography variant="h6"><b>SENTADO</b></Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6"><b>ACOSTADO</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>PULSO</b></Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6"><b>FC</b></Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6"><b>FR</b></Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6"><b>T. °C</b></Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="h6">{datos.taSentadoEF}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">{datos.taAcostadoEF}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">{datos.pulsoEF}</Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6">{datos.fcef}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">{datos.fref}</Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6">{datos.temperaturaEF} °C</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Divider orientation="vertical" flexItem sx={{ background: "black", border: 0.5, color: "black" }} />

                        <Grid item xs>
                            <Grid container spacing={0.5}>
                                <Grid item xs={2.1}>
                                    <Typography variant="h6"><b>PESO (K)</b></Typography>
                                </Grid>
                                <Grid item xs={2.1}>
                                    <Typography variant="h6"><b>TALLA (M)</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center' variant="h6"><b>IMC</b></Typography>
                                </Grid>
                                <Grid item xs={3.8}>
                                    <Typography variant="h6"><b>CLASIFICACIÓN</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6"><b>BIOTIPO</b></Typography>
                                </Grid>

                                <Grid item xs={2.1}>
                                    <Typography align='center' variant="h6">{datos.pesoEF}</Typography>
                                </Grid>
                                <Grid item xs={2.1}>
                                    <Typography align='center' variant="h6">{datos.tallaEF}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center' variant="h6">{datos.imcef}</Typography>
                                </Grid>
                                <Grid item xs={3.8}>
                                    <Typography variant="h6">{datos.clasificacionEF}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">{datos.nameBiotipoEF}</Typography>
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
                            <Typography align="center" variant="h5"><b>EXPLORACIÓN MORFOLÓGICA - ASPECTOS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Morphological key={1} title="1. ESTADO NUTRICIONAL" text={datos.estadoNitricionalEF} />
                                <Morphological key={2} title="2. PIEL FANERAS" text={datos.pielFaneraEF} />
                                <Morphological key={3} title="3. CRÁNEO" text={datos.craneoEF} />
                                <Morphological key={4} title="4. PARPADOS" text={datos.parpadoEF} />
                                <Morphological key={5} title="5. CONJUNTIVAS" text={datos.conjuntivasEF} />
                                <Morphological key={6} title="6. CORNEAS" text={datos.corniasEF} />
                                <Morphological key={7} title="7. PUPILAS" text={datos.pupilasEF} />
                                <Morphological key={8} title="8. REFLEJO FOTOMOTOR" text={datos.reflejoFotomotorEF} />
                                <Morphological key={9} title="9. REFLEJO CORNEAL" text={datos.reflejoCornialEF} />
                                <Morphological key={10} title="10. FONDO OJOS" text={datos.fondoOjosEF} />
                                <Morphological key={11} title="11. INS. EXTERNA OÍDOS" text={datos.inspeccionEF} />
                                <Morphological key={12} title="12. OTOSCOPIA" text={datos.otoscopiaEF} />
                                <Morphological key={13} title="13. INS. EXTERNA NARIZ N" text={datos.inspeccionNarizEF} />
                                <Morphological key={14} title="14. RINOSCOPIA" text={datos.rinoscopioEF} />
                                <Morphological key={15} title="15. LABIOS" text={datos.labiosEF} />
                                <Morphological key={16} title="16. MUCOSA ORAL" text={datos.mucosaEF} />
                                <Morphological key={17} title="17. ENCÍAS" text={datos.enciasEF} />
                                <Morphological key={18} title="18. PALADAR" text={datos.paladarEF} />
                                <Morphological key={19} title="19. DIENTES" text={datos.dientesEF} />
                                <Morphological key={20} title="20. LENGUA" text={datos.lenguaEF} />
                                <Morphological key={21} title="21. FARINGE" text={datos.faringeEF} />
                                <Morphological key={22} title="22. AMÍGDALAS" text={datos.amigdalasEF} />
                                <Morphological key={23} title="23. CUELLO - TIROIDES" text={datos.cuellosEF} />
                                <Morphological key={24} title="24. INS. DE TORAXMAMAS" text={datos.inspeccionToraxEF} />
                                <Morphological key={25} title="25. AUSCULTACIÓN CARDIACA" text={datos.auscultacionCardiacaEF} />
                                <Morphological key={26} title="26. AUSCULTACIÓN RESPIRATORIA" text={datos.auscultacionRespiratoriaEF} />
                                <Morphological key={27} title="27. INSPECCIÓN ABDOMEN" text={datos.inspeccionAbdomenEF} />
                                <Morphological key={28} title="28. PALPACIÓN ABDOMEN" text={datos.palpacionAbdomenEF} />
                                <Morphological key={29} title="29. EXPLORACIÓN DE HÍGADO" text={datos.exploracionHigadoEF} />
                                <Morphological key={30} title="30. EXPLORACIÓN DE BAZO" text={datos.exploracionVasoEF} />
                                <Morphological key={31} title="31. EXPLORACIÓN DE RIÑONES" text={datos.exploracionRinionesEF} />
                                <Morphological key={32} title="32. ANILLOS INGUINALES" text={datos.anillosInguinalesEF} />
                                <Morphological key={33} title="33. ANILLO UMBILICAL" text={datos.anilloUmbilicalEF} />
                                <Morphological key={34} title="34. GENITALES EXTERNOS" text={datos.genitalesExternosEF} />
                                <Morphological key={35} title="35. REGIÓN ANAL" text={datos.regionAnalEF} />
                                <Morphological key={36} title="36. TACTO RECTAL" text={datos.tactoRectalEF} />
                                <Morphological key={37} title="37. TACTO VAGINAL" text={datos.tactoVaginalEF} />
                                <Morphological key={38} title="38. EXTRE SUPERIORES" text={datos.extremidadesSuperioresEF} />
                                <Morphological key={39} title="39. EXTRE INFERIORES" text={datos.extremidadesInferioresEF} />
                                <Morphological key={40} title="40. PULSOS" text={datos.pulsosEF} />
                                <Morphological key={41} title="41. COLUMNA VERTEBRAL" text={datos.columnaVertebralEF} />
                                <Morphological key={42} title="42. ARTICULACIONES" text={datos.articulacionesEF} />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        {datos.especifiqueEMEFU}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>

            <Grid sx={{ pt: 13 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportSystemsReview;