import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { IconChartInfographic } from "@tabler/icons";
import ControlModal from "components/controllers/ControlModal";
import { Fragment, useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";
import CardAtencion from "./CardAtencion";
import ViewInfoEmployee from "./ViewInfoEmployee";
import Accordion from 'components/accordion/Accordion';
import { IconGraph } from '@tabler/icons';
import { GetDataEpidemiologica } from "api/clients/AttentionClient";

const lsAtencion = [
    {
        nameTipoAtencion: 'EMO',
        nameAtencion: 'CONTROL PERIODICO',
        fechaDia: 'Aquí va la fecha y el día',
        contingencia: 'La contingencia',
        dx1: 'Primer diagnostico'
    }
]

const EpidemiologicalView = ({ documento }) => {
    const [openView, setOpenView] = useState(false);
    const [dataEpidemi, setDataEpidemi] = useState([]);

    async function getDataEpidemiologica() {
        try {
            const dataEpidemiologica = await GetDataEpidemiologica(12568408);
            if (dataEpidemiologica.status === 200) {
                setDataEpidemi(dataEpidemiologica.data);

                setTimeout(() => {
                    setOpenView(true);
                }, 1000);
            }
        } catch (error) { }
    }

    return (
        <Fragment>
            <ControlModal
                title="Vista Epidemiológica"
                open={openView}
                onClose={() => setOpenView(false)}
                maxWidth="md"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewInfoEmployee dataEpidemi={dataEpidemi} />
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconGraph /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Reporte De Registro Atención</Typography></>}>
                            <Grid container spacing={2}>
                                {dataEpidemi.atenciones?.filter(fil => fil.idFilter === 0).map(aten => (
                                    <Grid item xs={12} md={6} lg={3}>
                                        <CardAtencion atencion={aten} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><IconGraph /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Reporte De Salud Ocupacional</Typography></>}>
                            <Grid container spacing={2}>
                                {dataEpidemi.atenciones?.filter(fil => fil.idFilter === 1).map(aten => ( 
                                    <Grid item xs={12} md={6} lg={3}>
                                        <CardAtencion atencion={aten} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Accordion>
                    </Grid>
                </Grid>
            </ControlModal>

            <AnimateButton>
                <Tooltip title="Ver Vista Epidemiológica">
                    <Button onClick={() => getDataEpidemiologica()}>
                        <IconChartInfographic stroke={1.5} size="1.5rem" />
                    </Button>
                </Tooltip>
            </AnimateButton>
        </Fragment>
    );
}

export default EpidemiologicalView;