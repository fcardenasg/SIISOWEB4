import { useRef, useEffect, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import ReactToPrint from 'react-to-print';
import useAuth from 'hooks/useAuth';

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import LogoReport from 'assets/img/LogoReport.png';
import { gridSpacing } from 'store/constant';
import { ColorDrummondltd } from 'themes/colors';
import { GetByIdAdvice } from 'api/clients/AdviceClient';
import { ViewFormat, GetEdad, FormatDate } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';

import ReportConceptAptitude from './ReportConceptAptitude';
import ReportDiagnostics from './ReportDiagnostics';
import ReportWHOtherCompanies from './ReportWHOtherCompanies';
import ReportWHDrummondLtd from './ReportWHDrummondLtd';

const ReportOccupationalExamination = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const componentRef = useRef(null);

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
        <MainCard>
            <Grid container justifyContent="center" spacing={gridSpacing}>
                <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <ReportConceptAptitude />
                        </Grid>

                        <Grid item xs={12}>
                            <ReportDiagnostics />
                        </Grid>

                        <Grid item xs={12}>
                            <ReportWHOtherCompanies />
                        </Grid>

                        <Grid item xs={12}>
                            <ReportWHDrummondLtd />
                        </Grid>
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
        </MainCard>
    );
};

export default ReportOccupationalExamination;