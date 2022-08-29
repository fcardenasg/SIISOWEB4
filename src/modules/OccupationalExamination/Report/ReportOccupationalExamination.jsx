import { useRef, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import ReactToPrint from 'react-to-print';
import useAuth from 'hooks/useAuth';

import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { GetByMail } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';

/* REPORTE DE FRAMINGHAM */
import ReportFramingham from './Framingham/ReportFramingham';

import ReportWorkHeight from './WorkHeight/ReportWorkHeight';
import ReportEmployeeNotification from './WorkHeight/ReportEmployeeNotification';

/* REPORTE DE CUESTIONARIO DE SISTOMAS RESPIRATORIOS */
import ReportPage1 from './RespiratorySymptomQuestionnaire/ReportPage1';
import ReportPage2 from './RespiratorySymptomQuestionnaire/ReportPage2';
import ReportPage3 from './RespiratorySymptomQuestionnaire/ReportPage3';

/* REPORTE DE EMO */
import ReportConceptAptitude from './ReportConceptAptitude';
import ReportDiagnostics from './ReportDiagnostics';
import ReportWHOtherCompanies from './ReportWHOtherCompanies';
import ReportWHDrummondLtd from './ReportWHDrummondLtd';
import ReportPersonalHistory from './ReportPersonalHistory';
import ReportHabits from './ReportHabits';
import ReportSystemsReview from './ReportSystemsReview';
import ReportFunctionalExploration from './ReportFunctionalExploration';
import ReportDefinitiveDiagnosis from './ReportDefinitiveDiagnosis';
import { GetByIdDataReport } from 'api/clients/OccupationalExaminationClient';
import { GetAllByDocumentWorkHistoryOtherCompany } from 'api/clients/WorkHistoryOtherCompany';
import { GetAllByDocumentWorkHistory } from 'api/clients/WorkHistoryClient';

const ReportOccupationalExamination = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const componentRef = useRef(null);

    const [timeWait, setTimeWait] = useState(false);
    const [lsDataReport, setLsDataReport] = useState([]);
    const [lsWorkHistoryOther, setLsWorkHistoryOther] = useState([]);
    const [lsWorkHistoryDLTD, setLsWorkHistoryDLTD] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllByDocumentWorkHistory(0, 0, 94367343);
                if (lsServer.status === 200) setLsWorkHistoryDLTD(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [id]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllByDocumentWorkHistoryOtherCompany(0, 0, 94367343);
                if (lsServer.status === 200) setLsWorkHistoryOther(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [id]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdDataReport(15);
                if (lsServer.status === 200) setLsDataReport(lsServer.data);
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
        if (lsDataReport.length != 0 && lsDataUser.length != 0)
            setTimeWait(true);
    }, 500);

    return (
        <MainCard>
            {timeWait ?
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <ReportFramingham key={13} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            {/* <Grid item xs={12}>
                                <ReportPage1 key={12} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportPage2 key={13} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportPage3 key={14} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportWorkHeight key={10} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportEmployeeNotification key={11} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportConceptAptitude key={1} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportDiagnostics key={2} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportWHOtherCompanies
                                    key={3}
                                    datos={lsDataReport}
                                    lsDataUser={lsDataUser}
                                    lsWorkHistoryOther={lsWorkHistoryOther}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportWHDrummondLtd
                                    key={4}
                                    datos={lsDataReport}
                                    lsDataUser={lsDataUser}
                                    lsWorkHistoryDLTD={lsWorkHistoryDLTD}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportPersonalHistory key={5} datos={lsDataReport} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportHabits key={6} datos={lsDataReport} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportSystemsReview key={7} datos={lsDataReport} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportFunctionalExploration key={8} datos={lsDataReport} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportDefinitiveDiagnosis key={9} datos={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid> */}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <ReactToPrint trigger={() => <Button fullWidth variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button fullWidth variant="outlined" onClick={() => navigate('/medicaladvice/list')}>
                                        Cerrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                : <Cargando />
            }
        </MainCard>
    );
};

export default ReportOccupationalExamination;