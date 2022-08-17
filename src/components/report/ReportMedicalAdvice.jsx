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

const ReportMedicalAdvice = () => {
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
            {timeWait ?
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                        <SubCard>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={1}>
                                        <Grid item xs={4}>
                                            <img src={LogoReport} height={50} />
                                        </Grid>

                                        <Grid item xs={8}>
                                            <Typography variant="h4" align="center"><b>DIVISION MÉDICA</b></Typography>
                                            <Typography variant="h6" align="center"><b>ASESORIAS MEDICAS ESPECIALIZADAS</b></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h4">DATOS GENERALES DEL PACIENTE</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={0.5}>
                                                <Grid item xs={2}>
                                                    <Typography variant="h5">DOCUMENTO:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.documento}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">NOMBRES:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameEmpleado}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">F. NACIMIENTO:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{ViewFormat(lsAdvice.nameFechaNacimi)}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">EDAD:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{GetEdad(new Date(lsAdvice.nameFechaNacimi))}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">TELÉFONO:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameTelefono}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">EMPRESA:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameEmpresa}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">SEDE:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameSede}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">CORREO:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameCorreo}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">CARGO:</Typography>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameCargo}</Typography>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="h5">EPS:</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">{lsAdvice.nameEps}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h4">INFORMACIÓN DE ASESORÍA</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item textAlign="center" xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={4}>
                                                    <Typography variant="h5">CONSECUTIVO NRO: {lsAdvice.id}</Typography>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography variant="h5">FECHA: {ViewFormat(lsAdvice.fecha)}</Typography>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography variant="h5">MOTIVO: {lsAdvice.nameMotivo}</Typography>
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
                                            <Typography align="center" variant="h5"><b>DESCRIPCIÓN DE LA ASESORÍA:</b></Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item textAlign="justify" xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">
                                                        {lsAdvice.motivo}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="h5"><b>RECOMENDACIONES:</b></Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item textAlign="justify" xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">
                                                        {lsAdvice.recomendaciones}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} /><Grid item xs={12} />

                                <Grid item xs={4}>
                                    <img src={lsDataUser.firma} height={50} />

                                    <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                                    <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                                    <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                                    <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                                    <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                                </Grid>
                            </Grid>

                            <Grid sx={{ pt: 10 }} textAlign="center" justifyContent="center" container spacing={1}>
                                <Grid item xs={12}>
                                    <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h5"><b>Fecha Sistema: {FormatDate(new Date())}</b></Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h5"><b>Usuario Activo: {user.email}</b></Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
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
                </Grid> : <Cargando />
            }
        </MainCard>
    );
};

export default ReportMedicalAdvice;