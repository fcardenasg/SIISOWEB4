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
import { GetByIdEvolutionNote } from 'api/clients/EvolutionNoteClient';

const DataAssistance = ({ title, text, xsTitle = 1.5, xsText = 2.5 }) => {
    return (
        <Fragment>
            <Grid item xs={xsTitle}>
                <Typography fontSize={10}><b>{title}</b></Typography>
            </Grid>
            <Grid item xs={xsText}>
                <Typography fontSize={11} align="right">{text}</Typography>
            </Grid>
        </Fragment>

    );
}

const ReportEvolutionNote = ({ id }) => {
    const { user } = useAuth();
    const componentRef = useRef(null);
    const navigate = useNavigate();

    const [lsDataReport, setLsDataReport] = useState([]);
    const [lsDataUser, setLsDataUser] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdEvolutionNote(id);
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
                                                    <Typography variant="h5" align="center"><b>NOTAS DE EVOLUCIÓN</b></Typography>
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
                                                <Grid item xs={4}>
                                                    <Typography variant="h6"><b>CONSECUTIVO:</b> {lsDataReport.id}</Typography>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography align='center' variant="h6"><b>FECHA:</b> {ViewFormat(lsDataReport.fecha)}</Typography>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography variant="h6"><b>CONTINGENCIA:</b> {lsDataReport.nameContingencia}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
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
                                                        <DataAssistance title="DOCUMENTO:" text={lsDataReport.documento} />
                                                        <DataAssistance title="NOMBRES:" text={lsDataReport.nameEmpleado} />
                                                        <DataAssistance title="FECHA NACIMIENTO:" text={ViewFormat(lsDataReport.fechaNacimi)} xsTitle={2.5} xsText={1.5} />
                                                        <DataAssistance title="EDAD:" text={GetEdad(lsDataReport.fechaNacimi)} />
                                                        <DataAssistance title="FECHA DE CONTRATO:" text={ViewFormat(lsDataReport.fechaContrato)} xsTitle={2.5} xsText={1.5} />
                                                        <DataAssistance title="TYPE:" text={lsDataReport.nameType} />
                                                        <DataAssistance title="TIPO DE CONTRATO:" text={lsDataReport.nameTipoContrato} xsTitle={2} xsText={2} />
                                                        <DataAssistance title="DEPARTAMENTO:" text={lsDataReport.nameDepartamento} />
                                                        <DataAssistance title="AREA:" text={lsDataReport.nameArea} />
                                                        <DataAssistance title="SUBAREA:" text={lsDataReport.nameSubarea} />
                                                        <DataAssistance title="GRUPO:" text={lsDataReport.nameGrupo} />
                                                        <DataAssistance title="ROSTER POSITION:" text={lsDataReport.nameCargo} xsTitle={2.5} xsText={1.5} />
                                                        <DataAssistance title="SEDE:" text={lsDataReport.nameSede} />
                                                        <DataAssistance title="EPS:" text={lsDataReport.nameEps} />
                                                        <DataAssistance title="AFP:" text={lsDataReport.nameAfp} />
                                                        <DataAssistance title="TURNO:" text={lsDataReport.nameTurnoEmpleado} />
                                                        <DataAssistance title="DPTO DE NACIMIENTO:" text={lsDataReport.nameDptoNacido} xsTitle={2} xsText={2} />
                                                        <DataAssistance title="CIUDAD DE NAC:" text={lsDataReport.nameCiudadNacido} xsTitle={2.5} xsText={1.5} />
                                                        <DataAssistance title="DPTO DE RESIDENCIA:" text={lsDataReport.nameDptoResidencia} xsTitle={2.5} xsText={1.5} />
                                                        <DataAssistance title="CIUDAD DE RESIDENCIA:" text={lsDataReport.nameCiudadResidencia} xsTitle={2.5} xsText={1.5} />
                                                        <DataAssistance title="DIRECCIÓN:" text={lsDataReport.nameDireccion} xsTitle={1} xsText={3} />
                                                        <DataAssistance title="ESTADO CIVIL:" text={lsDataReport.nameEstadoCivil} />
                                                        <DataAssistance title="CELULAR:" text={lsDataReport.nameTelefono} />
                                                        <DataAssistance title="EMAIL:" text={lsDataReport.nameCorreo} />
                                                        <DataAssistance title="EMPRESA:" text={lsDataReport.nameEmpresa} />
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
                                                    <Typography align="center" variant="h5"><b>NOTAS DE EVOLUCIÓN</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>
                                                    <Typography variant="h6">
                                                        {lsDataReport.nota}
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
                                                    <Typography align="center" variant="h5"><b>IMPRESIÓN DIAGNOSTICA</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>
                                                    <Grid container spacing={1}>
                                                        {JSON.parse(lsDataReport.diagnostico).map((dx, index) => (
                                                            <Fragment>
                                                                <Grid item xs={4}>
                                                                    <Typography variant="h6"><b>DX {index = index + 1}:</b></Typography>
                                                                </Grid>
                                                                <Grid item xs={8}>
                                                                    <Typography variant="h6">{(dx.label).toUpperCase()}</Typography>
                                                                </Grid>
                                                            </Fragment>
                                                        ))}
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
                                                    <Typography align="center" variant="h5"><b>PLAN DE MANEJO</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>

                                                    <Typography variant="h6">
                                                        {lsDataReport.planManejo}
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
                                                    <Typography align="center" variant="h5"><b>CONCEPTO DE APTITUD</b></Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item textAlign="justify" xs={12}>
                                                    <Typography variant="h6">
                                                        {lsDataReport.nameConceptoActitud}
                                                    </Typography>
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

export default ReportEvolutionNote;