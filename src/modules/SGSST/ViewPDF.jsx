import { Grid, Typography } from '@mui/material';
import { GetByIdSGSST } from 'api/clients/SGSST';
import Cargando from 'components/loading/Cargando';
import { useState, useEffect, Fragment } from 'react';

const ViewPDF = ({ id }) => {
    const [lsData, setLsData] = useState([]);
    const [timeWait, setTimeWait] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetByIdSGSST(id);
                setLsData(lsServer.data);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [id]);

    setTimeout(() => {
        if (lsData.length != 0) {
            setTimeWait(true);
        }
    }, 1000);

    return (
        <Grid container spacing={3}>
            {timeWait ?
                <Fragment>
                    <Grid item xs={12}>
                        <Typography variant="h3">{lsData.nombre}</Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 2 }}>
                        <object type="application/pdf"
                            data={lsData.archivoPdf}
                            width="1150"
                            height="450"
                        />
                    </Grid>
                </Fragment>
                :
                <Cargando />
            }
        </Grid>
    );
};

export default ViewPDF;