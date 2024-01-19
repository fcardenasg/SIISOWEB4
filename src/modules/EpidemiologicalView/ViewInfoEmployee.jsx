import { Grid, Typography } from "@mui/material";
import { ViewFormat } from "components/helpers/Format";
import { Fragment, useState } from "react";
import Avatar from 'ui-component/extended/Avatar';

const lsAtencion = [
    {
        nameTipoAtencion: 'EMO',
        nameAtencion: 'CONTROL PERIODICO',
        fechaDia: 'Aquí va la fecha y el día',
        contingencia: 'La contingencia',
        dx1: 'Primer diagnostico'
    }
]


const ViewInfoEmployee = ({ dataEpidemi }) => {
    const [openView, setOpenView] = useState(false);

    return (
        <Fragment>
            <Grid
                spacing={2}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item xs={12} md={2}>
                    <Avatar size="xl" alt="Img Empleado" src={dataEpidemi?.photo} />
                </Grid>

                <Grid item xs={12} md={10}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography align="left" variant="h4">
                                {dataEpidemi?.documento} - {dataEpidemi?.nameEmpleado}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography align="left" variant="subtitle2">
                                        <b>Cargo:</b> {dataEpidemi?.nameCargo}
                                    </Typography>
                                    <Typography align="left" variant="subtitle2">
                                        <b>Fecha Contrato:</b> {ViewFormat(dataEpidemi?.fechaContrato)}
                                    </Typography>
                                    <Typography align="left" variant="subtitle2">
                                        <b>Antiguedad:</b> {dataEpidemi?.antiguedad}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography align="left" variant="subtitle2">
                                        <b>Edad:</b> {dataEpidemi?.edad} Años
                                    </Typography>
                                    <Typography align="left" variant="subtitle2">
                                        <b>Tipo Contrato:</b> {dataEpidemi?.nameTipoContrato}
                                    </Typography>
                                    <Typography align="left" variant="subtitle2">
                                        <b>Turno / Grupo:</b> {dataEpidemi?.nameTurno} - {dataEpidemi?.nameGrupo}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment >
    );
}

export default ViewInfoEmployee;