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
import Cargando from "components/loading/Cargando";

const EpidemiologicalView = ({ documento }) => {
    const [openView, setOpenView] = useState(false);
    const [dataEpidemi, setDataEpidemi] = useState([]);

    async function getDataEpidemiologica() {
        try {
            setOpenView(true);

            const dataEpidemiologica = await GetDataEpidemiologica(94367343);
            if (dataEpidemiologica.status === 200) {
                setDataEpidemi(dataEpidemiologica.data);
            }
        } catch (error) { }
    }

    return (
        <Fragment>
            <ControlModal
                title="Vista Historico De Atenciones"
                open={openView}
                onClose={() => setOpenView(false)}
                maxWidth="md"
            >
                {dataEpidemi.length !== 0 ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewInfoEmployee dataEpidemi={dataEpidemi} />
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconGraph /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Reporte De Registro Atención</Typography></>}>
                                <Grid container spacing={2}>
                                    {dataEpidemi.atenciones?.filter(fil => fil?.idFilter === 0).map(aten => (
                                        <Grid item xs={12} md={6} lg={3}>
                                            <CardAtencion atencion={aten} documento={dataEpidemi.documento} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Accordion>
                        </Grid>

                        <Grid item xs={12}>
                            <Accordion title={<><IconGraph /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Reporte De Salud Ocupacional</Typography></>}>
                                <Grid container spacing={2}>
                                    {dataEpidemi.atenciones?.filter(fil => fil?.idFilter === 1).map(aten => (
                                        <Grid item xs={12} md={6} lg={3}>
                                            <CardAtencion atencion={aten} documento={dataEpidemi.documento} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Accordion>
                        </Grid>
                    </Grid>
                    : <Cargando />}
            </ControlModal>

            <AnimateButton>
                <Tooltip title="Ver Vista Historico De Atenciones">
                    <Button /* disabled={documento === '' ? true : false} */ onClick={getDataEpidemiologica}>
                        <IconChartInfographic stroke={1.5} size="1.5rem" />
                    </Button>
                </Tooltip>
            </AnimateButton>
        </Fragment>
    );
}

export default EpidemiologicalView;