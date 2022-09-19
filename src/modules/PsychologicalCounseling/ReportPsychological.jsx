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
import { FormatDate, GetEdad, ViewFormat } from 'components/helpers/Format';
import { GetByMail } from 'api/clients/UserClient';
import Cargando from 'components/loading/Cargando';
import { Fragment } from 'react';
import { GetByIdAdvice } from 'api/clients/AdviceClient';

const DataAssistance = ({ title, text, xsTitle = 3, xsText = 3 }) => {
    return (
        <Fragment>
            <Grid item xs={xsTitle}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={xsText}>
                <Typography variant='h6' align="right" sx={{ mr: 2 }}>{text}</Typography>
            </Grid>
        </Fragment>
    );
}

const ReportPsychological = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const componentRef = useRef(null);
    const navigate = useNavigate();

    const [lsDataReport, setLsDataReport] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdAdvice(id);
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

                                                <Grid item xs={5}>
                                                    <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                                                    <Typography variant="h5" align="center"><b>ASESORÍA PSICOLÓGICA</b></Typography>
                                                </Grid>

                                                <Grid item xs={3}>
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
                                                    <Typography align="center" variant="h5"><b>DATOS DEL PACIENTE</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid textAlign="center" item xs={3}>
                                                            <img style={{ borderRadius: '2px' }} src={lsDataReport.urlImg} height={110} />
                                                        </Grid>

                                                        <Grid item xs={9}>
                                                            <Grid container spacing={1}>
                                                                <DataAssistance title="DOCUMENTO:" text={lsDataReport.documento} />
                                                                <DataAssistance title="NOMBRES:" text={lsDataReport.nameEmpleado} xsTitle={2} xsText={4} />
                                                                <DataAssistance title="EDAD:" text={GetEdad(lsDataReport.fechaNacimi)} />
                                                                <DataAssistance title="FECHA DE CONTRATO:" text={ViewFormat(lsDataReport.fechaContrato)} xsTitle={4} xsText={2} />
                                                                <DataAssistance title="ANTIGUEDAD:" text={GetEdad(lsDataReport.fechaContrato)} xsTitle={2} xsText={4} />
                                                                <DataAssistance title="SEDE:" text={lsDataReport.nameSede} />
                                                                <DataAssistance title="CARGO:" text={lsDataReport.nameCargo} />
                                                                <DataAssistance title="TELÉFONO:" text={lsDataReport.nameTelefono} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography align="center" variant="h5"><b>INFORMACIÓN DE LA ASESORÍA</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={4}>
                                                            <Typography variant="h6"><b>CONSECUTIVO NRO:</b> {lsDataReport.id}</Typography>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Typography variant="h6"><b>FECHA:</b> {ViewFormat(lsDataReport.fecha)}</Typography>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Typography variant="h6"><b>MOTIVO:</b> {lsDataReport.nameMotivo}</Typography>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Typography variant="h6"><b>CAUSA:</b> {lsDataReport.nameCausa}</Typography>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Typography variant="h6"><b>ESTADO:</b> {lsDataReport.nameMotivo}</Typography>
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
                                                    <Typography align="center" variant="h5"><b>MOTIVO DE CONSULTA</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>
                                                    <Typography variant="h6">
                                                        {lsDataReport.motivo}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography align="center" variant="h5"><b>CONCEPTO</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>

                                                    <Typography variant="h6">
                                                        {lsDataReport.recomendaciones}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography align="center" variant="h5"><b>PAUTAS A SEGUIR</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>

                                                    <Typography variant="h6">
                                                        {lsDataReport.pautas}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4} sx={{ mt: 2 }}>
                                            <img src={lsDataUser.firma} height={50} />

                                            <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                                            <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                                            <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                                            <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                                            <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid sx={{ pt: 2 }} textAlign="center" justifyContent="center" container spacing={1}>
                                        <Grid item xs={12}>
                                            <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="h6">Fecha Sistema: {FormatDate(new Date())}</Typography>
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
                                    <Button fullWidth variant="outlined" onClick={() => navigate('/psychologicalcounseling/list')}>
                                        Cerrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid > : <Cargando />
            }
        </MainCard >
    );
};

export default ReportPsychological;