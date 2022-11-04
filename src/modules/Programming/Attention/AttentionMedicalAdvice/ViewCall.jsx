import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    Typography,
    useScrollTrigger
} from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';
import SubCard from 'ui-component/cards/SubCard';
import VideoCall from './VideoCall';

function ElevationScroll({ children, window }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 130,
        target: window || undefined
    });

    return React.cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'relative',
            top: trigger ? 83 : 0,
            width: trigger ? 318 : '100%'
        }
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};

const ViewCall = ({ onCancel, ...others }) => {
    const theme = useTheme();
    const [inCall, setInCall] = useState(false);

    return (
        <ElevationScroll {...others}>
            <SubCard
                title="VIDEO LLAMADA"
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: 342
                }}
                container={false}
            >
                <PerfectScrollbar style={{ height: 'calc(80vh - 80px)', overflowX: 'hidden' }}>
                    <Grid container spacing={2}>
                        {inCall ? (
                            <VideoCall setInCall={setInCall} />
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setInCall(true)}
                            >
                                Join Call
                            </Button>
                        )}




                        <Grid item xs={12}>
                            <Typography>
                                DOCTOR
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            CAMARA 1
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>
                                PACIENTE
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            CAMARA 2
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button variant="contained" fullWidth>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" fullWidth onClick={onCancel}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </SubCard>
        </ElevationScroll>
    );
};

ViewCall.propTypes = {
    onCancel: PropTypes.func,
};

export default ViewCall;