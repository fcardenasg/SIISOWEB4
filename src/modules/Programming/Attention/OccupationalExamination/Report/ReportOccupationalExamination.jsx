import { useRef, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import ReactToPrint from 'react-to-print';
import useAuth from 'hooks/useAuth';

import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { GetByMail } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';

/* REPORTE DE FRAMINGHAM */
import ReportFramingham from './Framingham/ReportFramingham';

//REPORTE DE TRABAJO EN ALTURA
import ReportWorkHeight from './WorkHeight/ReportWorkHeight';
import ReportEmployeeNotification from './WorkHeight/ReportEmployeeNotification';

/* REPORTE DE CUESTIONARIO DE SISTOMAS RESPIRATORIOS */
import ReportPage1 from './RespiratorySymptomQuestionnaire/ReportPage1';
import ReportPage2 from './RespiratorySymptomQuestionnaire/ReportPage2';
import ReportPage3 from './RespiratorySymptomQuestionnaire/ReportPage3';
import ReportPage4 from './RespiratorySymptomQuestionnaire/ReportPage4';

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

/* REPORTE DE ESPACIO CONFINADO */
import ReportConfinedSpaceCompany from './ConfinedSpace/ReportConfinedSpaceCompany';
import ReportConfinedSpaceWorker from './ConfinedSpace/ReportConfinedSpaceWorker';

import { GetByIdDataReport } from 'api/clients/OccupationalExaminationClient';

import "./report.module.css"

const ReportOccupationalExamination = ({ id = 3, setOpenReport }) => {
    const { user } = useAuth();
    const componentRef = useRef(null);

    const [timeWait, setTimeWait] = useState(false);
    const [lsDataReport, setLsDataReport] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);

    const listOfContent = [
        {
            component: <ReportConceptAptitude datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportFramingham datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportDiagnostics datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportWHOtherCompanies datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportWHDrummondLtd datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportPersonalHistory datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportHabits datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportSystemsReview datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportFunctionalExploration datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportDefinitiveDiagnosis datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportPage1 datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportPage2 datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportPage3 datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportPage4 datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportWorkHeight datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportEmployeeNotification datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportConfinedSpaceWorker datos={lsDataReport} lsDataUser={lsDataUser} />,
        },
        {
            component: <ReportConfinedSpaceCompany datos={lsDataReport} lsDataUser={lsDataUser} />,
        }
    ]

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdDataReport(id);
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
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <ReactToPrint trigger={() => <Button fullWidth variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button fullWidth variant="outlined" onClick={() => setOpenReport(false)}>
                                        Cerrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <div className="print-container" style={{ margin: "0", padding: "0" }}>
                                    {listOfContent.map(report => (
                                        <>
                                            <div className="page-break" />
                                            <div>
                                                {report.component}
                                            </div>
                                        </>
                                    ))}
                                </div>
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