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
import { FormatDate, ViewFormat } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';
import { Fragment } from 'react';
import { GetByIdAttention } from 'api/clients/AttentionClient';

const DataAttention = ({ title, text }) => {
    return (
        <Fragment>
            <Grid item xs={2}>
                <Typography variant="h5"><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h5" align="left">{text}</Typography>
            </Grid>
        </Fragment>

    );
}

const ReportAttention = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const componentRef = useRef(null);
    const navigate = useNavigate();

    const [lsDataReport, setLsDataReport] = useState([])

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdAttention(id);
                if (lsServer.status === 200) setLsDataReport(lsServer.data);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [id]);

    return (
        <MainCard>
            {lsDataReport.length != 0 ?
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <SubCard>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    <img src={LogoReport} height={50} />
                                                </Grid>

                                                <Grid item xs={8}>
                                                    <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                                                    <Typography variant="h5" align="center"><b>REGISTRO ATENCIÓN</b></Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography align="center" variant="h5"><b>DATOS DEL REGISTRO</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Grid container spacing={0.5}>
                                                        <DataAttention title="N° REGISTRO:" text={lsDataReport.id} />
                                                        <DataAttention title="FECHA:" text={FormatDate(lsDataReport.fecha)} />
                                                        <DataAttention title="TIPO ATENCIÓN:" text={lsDataReport.nameTipoAtencion} />
                                                        <DataAttention title="ATENCIÓN:" text={lsDataReport.nameAtencion} />
                                                        <DataAttention title="DOCUMENTO:" text={lsDataReport.documento} />
                                                        <DataAttention title="NOMBRES:" text={lsDataReport.nameEmpleado} />
                                                        <DataAttention title="ESTADO CASO:" text={lsDataReport.nameEstadoCaso} />
                                                        <DataAttention title="SEDE:" text={lsDataReport.nameSedeAtencion} />
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography align="center" variant="h5"><b>OBSERVACIÓN</b></Typography>
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
                                    </Grid>

                                    <Grid sx={{ mt: 35 }} textAlign="center" justifyContent="center" container spacing={1}>
                                        <Grid item xs={12}>
                                            <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="h6">Fecha Sistema: {ViewFormat(new Date())}</Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
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
                                    <Button fullWidth variant="outlined" onClick={() => navigate('/attention/list')}>
                                        Cerrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> : <Cargando />
            }
        </MainCard>
    );
};

export default ReportAttention;