import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import SideIconCard from 'ui-component/cards/SideIconCard';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { SNACKBAR_OPEN } from 'store/actions';

import MainCard from 'ui-component/cards/MainCard';
import { GetByIdQuestionnaire } from 'api/clients/QuestionnaireClient';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Typography,
    Divider
} from '@mui/material';

const videoConstraints = {
    width: 360,
    height: 360,
    margin: 0
};

const ViewfinderQR = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [scanResultWebCam, setScanResultWebCam] = useState({});
    
    const [result, setResult] = useState(false);
    const [lsQuestionnaire, setLsQuestionnaire] = useState([]);

    const handleDocument = async (documento) => {
        try {
            if (documento != "") {
                var lsQuestionnaire = await GetByIdQuestionnaire(documento);

                if (lsQuestionnaire.status === 200) {
                    setLsQuestionnaire(lsQuestionnaire.data);
                    setResult(lsQuestionnaire.data.autorizarTurno);
                }

            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Por favor, vuelva a intentarlo',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            
        }
    }


    return (
        <MainCard title="Visor De Código QR">
            <Grid container xs={12}>
                <Grid item xs={6}>
                    <QrReader
                        containerStyle={videoConstraints}
                        style={{ width: '100%' }}
                        onResult={(result, error) => {
                            if (!!result) {
                                handleDocument(result?.text);
                                setScanResultWebCam(result?.text);
                            }

                            if (!!error) {
                                
                            }
                        }}
                        scanDelay={1000}
                    />
                </Grid>
                <Grid item xs={6} sx={{ pt: 4 }}>
                    {scanResultWebCam.length != "" && lsQuestionnaire.length != 0 ? (
                        <>
                            {result ? (
                                <>
                                    <Grid container xs={12} sx={{ pb: 2 }}>
                                        <Grid item xs={12} sx={{ pb: 1 }}>
                                            <Typography variant='caption' sx={{ fontSize: 20 }}>
                                                Se autoriza el ingreso al turno
                                            </Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={7}>
                                            <SideIconCard
                                                iconPrimary={ThumbUpOffAltIcon}
                                                primary="APTO"
                                                color={theme.palette.success.dark}
                                                bgcolor={theme.palette.grey[200]}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container xs={12}>
                                        <Grid item xs={12} sx={{ pb: 1 }}>
                                            <Typography variant='caption' sx={{ fontSize: 20 }}>
                                                Se ordena iniciar aislamiento y consultar a la EPS
                                            </Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={7}>
                                            <SideIconCard
                                                iconPrimary={LocalHospitalIcon}
                                                primary="NO"
                                                color={theme.palette.error.dark}
                                                bgcolor={theme.palette.grey[200]}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid container xs={12} sx={{ pb: 2 }}>
                                        <Grid item xs={12} sx={{ pb: 1 }}>
                                            <Typography variant='caption' sx={{ fontSize: 20 }}>
                                                No se autoriza el ingreso al turno
                                            </Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={7}>
                                            <SideIconCard
                                                iconPrimary={ThumbUpOffAltIcon}
                                                primary="NO APTO"
                                                color={theme.palette.error.dark}
                                                bgcolor={theme.palette.grey[200]}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container xs={12}>
                                        <Grid item xs={12} sx={{ pb: 1 }}>
                                            <Typography variant='caption' sx={{ fontSize: 20 }}>
                                                Se ordena iniciar aislamiento y consultar a la EPS
                                            </Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={7}>
                                            <SideIconCard
                                                iconPrimary={LocalHospitalIcon}
                                                primary="SI"
                                                color={theme.palette.success.dark}
                                                bgcolor={theme.palette.grey[200]}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            )}

                        </>) : (<></>)
                    }
                </Grid>
            </Grid>
        </MainCard >
    );

}

export default ViewfinderQR;