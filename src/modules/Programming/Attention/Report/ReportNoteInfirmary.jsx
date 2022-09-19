import { useRef, useEffect, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';

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
import { GetByIdNoteInfirmary } from 'api/clients/NoteInfirmaryClient';

const DataAssistance = ({ title, text, xsTitle = 2, xsText = 4 }) => {
    return (
        <Fragment>
            <Grid item xs={xsTitle}>
                <Typography variant='h6'><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={xsText}>
                <Typography variant='h6' align="right">{text}</Typography>
            </Grid>
        </Fragment>
    );
}

const ReportNoteInfirmary = ({ id }) => {
    const { user } = useAuth();
    const componentRef = useRef(null);

    const [lsDataReport, setLsDataReport] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdNoteInfirmary(id);
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

                                                <Grid item xs={4}>
                                                    <Typography variant="h5" align="center"><b>DIVISIÓN MÉDICA</b></Typography>
                                                    <Typography variant="h5" align="center"><b>NOTAS DE ENFERMERÍA</b></Typography>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography variant="h5" align="center"><b>SIG-1240</b></Typography>
                                                    <Typography variant="h6" align="center"><b>Versión 1</b></Typography>
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
                                                        <DataAssistance title="CONSECUTIVO:" text={lsDataReport.id} />
                                                        <DataAssistance title="FECHA EXAMEN:" text={ViewFormat(lsDataReport.fecha)} />
                                                        <DataAssistance title="DOCUMENTO:" text={lsDataReport.documento} />
                                                        <DataAssistance title="NOMBRE:" text={lsDataReport.nameEmpleado} />
                                                        <DataAssistance title="FECHA NACIMIENTO:" text={ViewFormat(lsDataReport.fechaNacimi)} xsTitle={3} xsText={3} />
                                                        <DataAssistance title="EDAD:" text={GetEdad(lsDataReport.fechaNacimi)} />
                                                        <DataAssistance title="GENERO:" text={lsDataReport.nameGenero} />
                                                        <DataAssistance title="CARGO:" text={lsDataReport.nameCargo} xsTitle={3} xsText={3} />
                                                        <DataAssistance title="AREA:" text={lsDataReport.nameArea} />
                                                        <DataAssistance title="ANTIGUEDAD EMPRESA:" text={GetEdad(lsDataReport.fechaContrato)} xsTitle={3} xsText={3} />
                                                        <DataAssistance title="EMPRESA:" text={lsDataReport.nameEmpresa} />
                                                        <DataAssistance title="DEPARTAMENTO:" text={lsDataReport.nameDepartamento} />
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
                                                    <Typography align="center" variant="h5"><b>RESUMEN DE LA ATENCIÓN</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography variant="h6"><b>PROCEDIMIENTOS</b></Typography>
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>
                                                    <Grid container spacing={1}>
                                                        {JSON.parse(lsDataReport.procedimientos).map((dx, index) => (
                                                            <Fragment>
                                                                <Grid item xs={0.5}>
                                                                    <Typography variant="h6"><b>{index = index + 1}:</b></Typography>
                                                                </Grid>
                                                                <Grid item xs={2.5}>
                                                                    <Typography variant="h6">{(dx.label).toUpperCase()}</Typography>
                                                                </Grid>
                                                            </Fragment>
                                                        ))}
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <Typography variant="h6"><b>CONTINGENCIA:</b></Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography variant="h6">{lsDataReport.nameContingencia}</Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography align="center" variant="h5"><b>DESCRIPCIÓN</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>

                                                    <Typography variant="h6">
                                                        {lsDataReport.notaEnfermedad}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4} sx={{ mt: 6 }}>
                                            <img src={lsDataUser.firma} height={50} />

                                            <Divider sx={{ border: 1, background: 'black', color: 'black', mt: 1 }} />
                                            <Typography variant="h6"><b>{lsDataUser.nombre}.</b></Typography>
                                            <Typography variant="h6"><b>{lsDataUser.tarjetaProfesional}</b></Typography>
                                            <Typography variant="h6"><b>{lsDataUser.licencia}</b></Typography>
                                            <Typography variant="h6"><b>{lsDataUser.registroMedico}</b></Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid sx={{ pt: 15 }} textAlign="center" justifyContent="center" container spacing={1}>
                                        <Grid item xs={12}>
                                            <Divider sx={{ border: 2, borderRadius: 1, background: ColorDrummondltd.RedDrummond, color: ColorDrummondltd.RedDrummond }} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">Fecha Sistema: {FormatDate(new Date())}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">Sede: {lsDataReport.nameSede}</Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="h6">Usuario Activo: {user.email}</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <ReactToPrint trigger={() => <Button fullWidth variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid > : <Cargando />
            }
        </MainCard >
    );
};

export default ReportNoteInfirmary;