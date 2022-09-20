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

import ReportAlcoholAndDrug from './ReportAlcoholAndDrug';
import ReportConceptAlcoholAndDrug from './ReportConceptAlcoholAndDrug';
import { GetByIdAlcoholAndDrugTesting } from 'api/clients/AlcoholAndDrugTestingClient';

const ReportAlcoholAndDrugTesting = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const componentRef = useRef(null);
    const navigate = useNavigate();

    const [lsDataReport, setLsDataReport] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdAlcoholAndDrugTesting(id);
                if (lsServer.status === 200) setLsDataReport(lsServer.data);
            } catch (error) { }
        }

        GetAll();
    }, [id]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByMail(user.email);
                if (lsServer.status === 200) setLsDataUser(lsServer.data);
            } catch (error) { }
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
                                <ReportConceptAlcoholAndDrug lsDataReport={lsDataReport} lsDataUser={lsDataUser} />
                            </Grid>

                            <Grid item xs={12}>
                                <ReportAlcoholAndDrug lsDataReport={lsDataReport} lsDataUser={lsDataUser} />
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
                                    <Button fullWidth variant="outlined" onClick={() => navigate('/alcoholanddrugtesting/list')}>
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

export default ReportAlcoholAndDrugTesting;