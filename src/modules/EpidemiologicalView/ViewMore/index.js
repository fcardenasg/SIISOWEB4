import { Fragment, useEffect, useState } from 'react';
import ListHistoryAttention from './ListHistoryAttention';
import { Divider, Grid, Typography } from '@mui/material';
import GraphInfo from './GraphInfo';
import SubCard from 'ui-component/cards/SubCard';
import ViewInfoMore from './ViewInfoMore';
import { GetDataResumenEpidemiologica } from 'api/clients/AttentionClient';
import Cargando from 'components/loading/Cargando';

const ViewMore = ({ dataAtencion, documento }) => {
    const [lsUltimos3Registros, setLsUltimos3Registros] = useState([]);
    /* const [OpenModal, setOpenModal] = useState([]);
    const [OpenModal, setOpenModal] = useState([]); */

    useEffect(() => {
        async function getDataResumenEpidemiologica() {
            try {
                /* setOpenView(true); */

                /* 
                Accidente
                Reintegro
                Medicina Laboral
                Ausentismo
                */

                var idRegistro = dataAtencion.idFilter === 0 ? dataAtencion.id : dataAtencion.idSaludOcupacional;
                const dataEpidemiologica = await GetDataResumenEpidemiologica(idRegistro, dataAtencion.idFilter, documento);
                if (dataEpidemiologica.status === 200) {
                    setLsUltimos3Registros(dataEpidemiologica.data.ultimaAtencionDTOs);
                }
            } catch (error) { }
        }

        getDataResumenEpidemiologica();
    }, [dataAtencion]);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Resumen {dataAtencion.id}</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ViewInfoMore />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <GraphInfo />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Últimos Tres Registros</Typography>}>
                        {lsUltimos3Registros.length !== 0 ? <ListHistoryAttention lsData={lsUltimos3Registros} /> : <Cargando />}
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ViewMore;