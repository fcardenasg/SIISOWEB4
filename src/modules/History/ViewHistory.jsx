import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

import { Button, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import PrintIcon from '@mui/icons-material/PrintTwoTone';

const TableConsulting = Loadable(lazy(() => import('./History/TableConsulting')));
const TableMedicalAttention = Loadable(lazy(() => import('./History/TableMedicalAttention')));
const TableEmo = Loadable(lazy(() => import('./History/TableEmo')));
const TableInfirmary = Loadable(lazy(() => import('./History/TableInfirmary')));

const Title = {
    asesoria: 'ASESORÍAS',
    atencion: 'ATENCIÓN MÉDICA',
    emo: 'EMO',
    enfermeria: 'ENFERMERÍA',
}

const ViewHistory = () => {
    const [statusReprint, setStatusReprint] = useState(1);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">HISTORIAL</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(1)} size="large" variant="outlined" color="success" fullWidth startIcon={<PrintIcon />}>
                                    {Title.asesoria}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(2)} size="large" variant="outlined" color="success" fullWidth startIcon={<PrintIcon />}>
                                    {Title.atencion}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(3)} size="large" variant="outlined" color="success" fullWidth startIcon={<PrintIcon />}>
                                    {Title.emo}
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <Button onClick={() => setStatusReprint(4)} size="large" variant="outlined" color="success" fullWidth startIcon={<PrintIcon />}>
                                    {Title.enfermeria}
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">HISTORIAL DE {statusReprint === 1 ? Title.asesoria :
                        statusReprint === 2 ? Title.atencion :
                            statusReprint === 3 ? Title.emo :
                                statusReprint === 4 ? Title.enfermeria : ''}</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {statusReprint === 1 ? <TableConsulting /> :
                                    statusReprint === 2 ? <TableMedicalAttention /> :
                                        statusReprint === 3 ? <TableEmo /> :
                                            statusReprint === 4 ? <TableInfirmary /> : <div />}
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ViewHistory;