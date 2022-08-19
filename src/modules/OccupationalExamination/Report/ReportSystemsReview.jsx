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

const ReportSystemsReview = () => {
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
                            <Typography align="center" variant="h5"><b>REVISIÓN POR SISTEMAS - PATOLOGÍAS</b></Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <SystemsReview key={1} title="1. CABEZA - CEFALEA" text="NORMAL" />
                                <SystemsReview key={2} title="2. OJOS (A. VISUAL, DOLOR, CONGESTIÓN, ETC.)" text="NORMAL" />
                                <SystemsReview key={3} title="3. OÍDOS (A. AUDITIVA, DOLOR, SECRECIÓN, ETC.)" text="NORMAL" />
                                <SystemsReview key={3} title="4. NARIZ (CONGESTIÓN, EPISTAXIS, RINORREA)" text="ANORMAL" />
                                <SystemsReview key={4} title="5. BOCA (ULCERACIONES, SANGRADO DE ENCÍAS)" text="NORMAL" />
                                <SystemsReview key={5} title="6. GARGANTA (DOLOR, ARDOR, DISFAGIA, DISFONÍA)" text="NORMAL" />
                                <SystemsReview key={7} title="7. CUELLO (DOLOR, TORTICOLIS, ADENOPATÍAS)" text="NORMAL" />
                                <SystemsReview key={8} title="8. CARDIO RESPIRATORIO" text="NORMAL" />
                                <SystemsReview key={9} title="9. GASTROINTESTINAL" text="NORMAL" />
                                <SystemsReview key={10} title="10. GENITOURINARIO" text="NORMAL" />
                                <SystemsReview key={12} title="11. OSTEO - ARTICULAR" text="NORMAL" />
                                <SystemsReview key={13} title="12. NEURO - MUSCULAR" text="NORMAL" />
                                <SystemsReview key={14} title="13. PIEL Y ANEXOS" text="NORMAL" />
                                <SystemsReview key={15} title="14. PSIQUIÁTRICO" text="NORMAL" />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        MANIFIESTA ESTAR CURSANDO CON CUADRO RESPIRATORIO AGUDO, REFERENTE AL HOMBRO ESTÁ CON EL MANEJO DEL DOLOR DE MANERA
                                        SATISFACTORIA, SUS LABORES LAS ESSTÁ CUMPLIENDO SIN REPERCUSIÓN ALGUNA SOBRE SU SALUD.
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
                                    <Typography variant="h6">150/100</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="h6">150/100</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">74</Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6">74</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h6">16</Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Typography variant="h6">36</Typography>
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
                                    <Typography align='center' variant="h6">79.00</Typography>
                                </Grid>
                                <Grid item xs={2.1}>
                                    <Typography align='center' variant="h6">1.69</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography align='center' variant="h6">27.66</Typography>
                                </Grid>
                                <Grid item xs={3.8}>
                                    <Typography variant="h6">SobrePeso Grado II</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h6">PICNICO</Typography>
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
                                <Morphological key={1} title="1. ESTADO NUTRICIONAL" text="ANORMAL" />
                                <Morphological key={2} title="2. PIEL FANERAS" text="ANORMAL" />
                                <Morphological key={3} title="3. CRÁNEO" text="ANORMAL" />
                                <Morphological key={4} title="4. PARPADOS" text="ANORMAL" />
                                <Morphological key={5} title="5. CONJUNTIVAS" text="ANORMAL" />
                                <Morphological key={6} title="6. CORNEAS" text="ANORMAL" />
                                <Morphological key={7} title="7. PUPILAS" text="ANORMAL" />
                                <Morphological key={8} title="8. REFLEJO FOTOMOTOR" text="ANORMAL" />
                                <Morphological key={9} title="9. REFLEJO CORNEAL" text="ANORMAL" />
                                <Morphological key={10} title="10. FONDO OJOS" text="ANORMAL" />
                                <Morphological key={11} title="11. INS. EXTERNA OÍDOS" text="ANORMAL" />
                                <Morphological key={12} title="12. OTOSCOPIA" text="ANORMAL" />
                                <Morphological key={13} title="13. INS. EXTERNA NARIZ N" text="ANORMAL" />
                                <Morphological key={14} title="14. RINOSCOPIA" text="ANORMAL" />
                                <Morphological key={15} title="15. LABIOS" text="ANORMAL" />
                                <Morphological key={16} title="16. MUCOSA ORAL" text="ANORMAL" />
                                <Morphological key={17} title="17. ENCÍAS" text="ANORMAL" />
                                <Morphological key={18} title="18. PALADAR" text="ANORMAL" />
                                <Morphological key={19} title="19. DIENTES" text="ANORMAL" />
                                <Morphological key={20} title="20. LENGUA" text="ANORMAL" />
                                <Morphological key={21} title="21. FARINGE" text="ANORMAL" />
                                <Morphological key={22} title="22. AMÍGDALAS" text="ANORMAL" />
                                <Morphological key={23} title="23. CUELLO - TIROIDES" text="ANORMAL" />
                                <Morphological key={24} title="24. INS. DE TORAXMAMAS" text="ANORMAL" />
                                <Morphological key={25} title="25. AUSCULTACIÓN CARDIACA" text="ANORMAL" />
                                <Morphological key={26} title="26. AUSCULTACIÓN RESPIRATORIA" text="ANORMAL" />
                                <Morphological key={27} title="27. INSPECCIÓN ABDOMEN" text="ANORMAL" />
                                <Morphological key={28} title="28. PALPACIÓN ABDOMEN" text="ANORMAL" />
                                <Morphological key={29} title="29. EXPLORACIÓN DE HÍGADO" text="ANORMAL" />
                                <Morphological key={30} title="30. EXPLORACIÓN DE BAZO" text="ANORMAL" />
                                <Morphological key={31} title="31. EXPLORACIÓN DE RIÑONES" text="ANORMAL" />
                                <Morphological key={32} title="32. ANILLOS INGUINALES" text="ANORMAL" />
                                <Morphological key={33} title="33. ANILLO UMBILICAL" text="ANORMAL" />
                                <Morphological key={34} title="34. GENITALES EXTERNOS" text="ANORMAL" />
                                <Morphological key={35} title="35. REGIÓN ANAL" text="ANORMAL" />
                                <Morphological key={36} title="36. TACTO RECTAL" text="ANORMAL" />
                                <Morphological key={37} title="37. TACTO VAGINAL" text="ANORMAL" />
                                <Morphological key={38} title="38. EXTRE SUPERIORES" text="ANORMAL" />
                                <Morphological key={39} title="39. EXTRE INFERIORES" text="ANORMAL" />
                                <Morphological key={40} title="40. PULSOS" text="ANORMAL" />
                                <Morphological key={41} title="41. COLUMNA VERTEBRAL" text="ANORMAL" />
                                <Morphological key={42} title="42. ARTICULACIONES" text="ANORMAL" />

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant="h5"><b>OBSERVACIONES:</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant="h6">
                                        CIFRAS TENSIONALES ELVADAS,PACIENTE OBESO, RINORREA HIALINA, DIFICULTAD AL PASO DEL AIRE POR LAS NARINAS, ABUNDANTE
                                        PANICULO ADIPOSO, DEBILIDAD DE MUSCULATURA ABDOMINAL, DOLOR A LA ELVACIÓN DE MSI POR ENCIAM DE LOS 110° DE LA ARTICULACIÓN
                                        DEL HOMBRO, RETRACCIONES ISQUIOTIBIALES BILATERALES MODERADAS, RESTO DE EXAMEN FISICO NORMAL.
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