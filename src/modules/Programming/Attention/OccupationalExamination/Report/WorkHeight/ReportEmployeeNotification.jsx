import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

import ImgWhite from 'assets/img/ImgWhite.png';
import useAuth from 'hooks/useAuth';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { FormatDate } from 'components/helpers/Format';

const EmployeeNotification = ({ title = '', text = '' }) => {
    return (
        <Fragment>
            <Grid item xs={11}>
                <Typography align="justify" fontSize={10}>{title}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography align="right" variant="h6">{text}</Typography>
            </Grid>
        </Fragment>
    )
}

const ReportEmployeeNotification = ({ datos = [], lsDataUser = [] }) => {
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
                            <Typography variant="h5" align="center"><b>ANEXO DE APTITUD PARA TRABAJO EN ALTURAS</b></Typography>
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
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography align="center" variant="h5"><b>NOTIFICACIÓN AL TRABAJADOR</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography fontSize={9}>LA SIGUIENTE LISTA SE HA DESARROLLADO CON BASE EN LOS RESULTADOS DEL EXAMEN MÉDICO OCUPACIONAL, LOS EXÁMENES DE LABORATORIO Y LAS PRUEBAS COMPLEMENTARIAS REALIZADAS.</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant='h6'><b>SEDE:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='h6'>{datos.nameSede}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant='h6'><b>FECHA DIGITACIÓN:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='h6'>2022-08-19</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant='h6'><b>RIESGO CARDIOVASCULAR:</b></Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant='h6'>MEDIO</Typography>
                                </Grid>

                                {/* SEGUNDA LINEA */}
                                <Grid item xs={2}>
                                    <Typography variant='h6'><b>CLASIFICACIÓN:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='h6'>SOBREPESO GRADO III</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant='h6'><b>PESO (K):</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='h6'>85</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography variant='h6'><b>IMC:</b></Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='h6'>26.7</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0.5}>
                                <Grid item xs={11}>
                                    <Typography variant='h6'><b>CONDICIONES REVISADAS</b></Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography align="right" variant='h6'><b>SI/NO</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={0}>
                                        <EmployeeNotification key={1} title="1. MENOR DE EDAD." text={datos.idMenorEdadNEMTA} />
                                        <EmployeeNotification key={2} title="2. MUJER EMBARAZADA CON CUALQUIER EDAD DE GESTACIÓN." text={datos.idMujerEmbarazadaNEMTA} />
                                        <EmployeeNotification key={3} title="3. ARRITMIAS CARDIACAS." text={datos.idArimiaNEMTA} />
                                        <EmployeeNotification key={4} title="4. ENFERMEDADES O MALFORMACIONES CARDIACAS ASINTOMÁTICAS." text={datos.idEnfermedadNEMTA} />
                                        <EmployeeNotification key={5} title="5. HISTORIA DE HIPOTENSIÓN ORTOSTÁTICA (NO BASTA PRESENTAR EPISODIOS AISLADOS)." text={datos.idHistoriaNEMTA} />
                                        <EmployeeNotification key={6} title="6. HIPERTENSIÓN ARTERIAL NO CONTROLADA O RESISTENTE AL TRATAMIENTO." text={datos.idHipertensionNEMTA} />
                                        <EmployeeNotification key={7} title="7. HIPERTRIGLICERIDEMIA AISLADA SEVERA, CON CIFRAS MAYORES A 500 MG/DL." text={datos.idHipertrigliceridemiaNEMTA} />
                                        <EmployeeNotification key={8} title="8. CIFRAS LDL MAYORES A 190 MG/DL." text={datos.idCifrasNEMTA} />
                                        <EmployeeNotification key={9} title="9. DIABETES CONTROLADAS." text={datos.idDiabetesNEMTA} />
                                        <EmployeeNotification key={10} title="10. DISLIPEMIA DE MODERADA A SEVERA ASOCIADA A DIABETES, HTA, OBESIDAD, HIPOTIROIDISMO." text={datos.idDislipidemiaNEMTA} />
                                        <EmployeeNotification key={11} title="11. DIAGNÓSTICO O SOSPECHA DE DISLIPEMIA DE ORIGEN FAMILIAR (GENÉTICO)." text={datos.idDiagnosticoNEMTA} />
                                        <EmployeeNotification key={12} title="12. RIESGO CARDIOVASCULAR A 10 AÑOS 20% SEGÚN MÉTODO DE FRAMINGHAM." text={datos.idRiesgoCardiovascular1NEMTA} />
                                        <EmployeeNotification key={13} title="13. RIESGO CARDIOVASCULAR ENTRE 10 Y 20% SI EXISTEN DOS O MÁS FACTORES MAYORES DE RIESGO." text={datos.idRiesgoCardiovascular2NEMTA} />
                                        <EmployeeNotification key={14} title="14. HIPERTIROIDISMO NO CONTROLADO O SINTOMÁTICO." text={datos.idHipertiroidismoNEMTA} />
                                        <EmployeeNotification key={15} title="15. ALTERACIÓN AUDITIVA SEVERA Y BILATERAL QUE COMPROMETA BANDAS CONVERSACIONALES (500 A 2000 HZ)." text={datos.idAlteracionAuditivaNEMTA} />
                                        <EmployeeNotification key={16} title="16. VÉRTIGO Y OTRAS ALTERACIONES DEL EQUILIBRIO." text={datos.idVertigoAlteracionesNEMTA} />
                                        <EmployeeNotification key={17} title="17. EPILEPSIA U OTRA ENFERMEDAD NEUROLÓGICA, QUE PUEDA GENERAR ALTERACIONES DE LA CONCIENCIA O EL EQUILIBRIO." text={datos.idEpilegsiaNEMTA} />
                                        <EmployeeNotification key={18} title="18. CEGUERA TEMPORAL O PERMANENTE O ALTERACIONES VISUALES SIGNIFICATIVAS Y SEVERAS." text={datos.idCegueraTemporalNEMTA} />
                                        <EmployeeNotification key={19} title="19. HISTORIA DE FOBIAS O EPISODIOS DE PÁNICO RELACIONADOS CON ALTURA." text={datos.idHistoriaFobiasNEMTA} />
                                        <EmployeeNotification key={20} title="20. TRASTORNOS PSIQUIÁTRICOS, INCLUYENDO ADICCIONES A SUSTANCIAS PSICOACTIVAS." text={datos.idTranstornoPsiquiatricoNEMTA} />
                                        <EmployeeNotification key={21} title="21. LIMITACIONES PERMANENTES PARA DEAMBULAR POR SUS PROPIOS MEDIOS O LESIONES CON COMPROMISO FUNCIONAL DEL CUELLO, 
                                ESPALDA O EXTREMIDADES, QUE AFECTEN EL AGARRE REQUERIDO EN ESTAS LABORES." text={datos.idLimitacionesNEMTA} />
                                        <EmployeeNotification key={22} title="22. OBESIDAD MÓRBIDA (IMC MAYOR A 35) O PESO MAYOR DE 120 KG, POR LIMITACIONES DE SISTEMAS DE ARNESES." text={datos.idObesidadMorbidaNEMTA} />
                                        <EmployeeNotification key={23} title="23. DE FORMA TEMPORAL, EL USO DE MEDICAMENTOS QUE PRODUZCAN SUEÑO O DEPRIVACIÓN DE SUEÑO MÁS DE UN TURNO." text={datos.idDeformaTemporalNEMTA} />
                                        <EmployeeNotification key={24} title="24. OTRAS ALTERACIONES CARDIOVASCULARES, PULMONARES, MUSCULARES, HEPÁTICAS, SANGUÍNEAS O RENALES, QUE POR SU SEVERIDAD O
                                 PROGRESO PUEDAN GENERAR ALTERACIONES DEL EQUILIBRIO O DE LA CONCIENCIA EN CONCEPTO DEL MÉDICO TRATANTE." text={datos.idOtrasAlteracionesNEMTA} />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    <Typography variant='h6'><b>OBSERVACIONES</b></Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography align="justify" variant='h6'>
                                        {datos.observacionesNEMTA}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <Typography variant='h6'><b>CONCEPTO DE APTITUD:</b></Typography>
                                        </Grid>

                                        <Grid item xs={5.5}>
                                            <Typography align="right" variant='h6'>{datos.nameConceptoActitudMedicoNEMTA}</Typography>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Typography variant='h6'><b>VIGENCIA DEL CONCEPTO:</b></Typography>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <Typography align="right" variant='h6'>1 AÑO</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid sx={{ mt: 2 }} item xs={12}>
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

            <Grid sx={{ pt: 1 }} textAlign="center" justifyContent="center" container spacing={1}>
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

export default ReportEmployeeNotification;