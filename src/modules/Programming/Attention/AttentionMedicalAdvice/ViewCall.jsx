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
import { Fragment } from 'react';
import { AgoraVideoPlayer } from "agora-rtc-react";

import { channelName, config, useClient, useMicrophoneAndCameraTracks } from './settings';


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

/* const appId = "06be435a29fa4a8cad91cce7863cb560";
const token = "007eJxTYDh3K+JDSzQL684NATeYXzvF3NRj+Lb4b07az0Vc3as/NL5XYDAwS0o1MTZNNLJMSzRJtEhOTLE0TE5ONbcwM05OMjUzsLRKTW4IZGTYmMbKysgAgSA+K0NxZmZxPgMDAPv5IS4=";

const config = { mode: "rtc", codec: "h264", appId: appId, token: token };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const channelName = "siiso"; */

const ViewCall = ({ onCancel, ...others }) => {
    const theme = useTheme();
    const [inCall, setInCall] = useState(false);
    const [start, setStart] = useState(false);
    const [users, setUsers] = useState([]);

    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        function getControles() {
            let init = async (name) => {
                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "video") {
                        setUsers((prevUsers) => {
                            return [...prevUsers, user];
                        });
                    }
                    if (mediaType === "audio") {
                        user.audioTrack.play();
                    }
                });

                client.on("user-unpublished", (user, mediaType) => {
                    if (mediaType === "audio") {
                        if (user.audioTrack) user.audioTrack.stop();
                    }
                    if (mediaType === "video") {
                        setUsers((prevUsers) => {
                            return prevUsers.filter((User) => User.uid !== user.uid);
                        });
                    }
                });

                client.on("user-left", (user) => {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                });

                try {
                    await client.join(config.appId, name, config.token, null);
                } catch (error) {
                    console.log("error");
                }

                if (tracks) await client.publish([tracks[0], tracks[1]]);
                setStart(true);
            };

            if (ready && tracks) {
                try {
                    init(channelName);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getControles();
    }, [channelName, client, ready, tracks]);

    return (
        <ElevationScroll {...others}>
            {/* <ControlModal
                maxWidth="md"
                open={open}
                onClose={() => setOpen(false)}
                title="DICTADO POR VOZ"
            >
                <VideoCall setInCall={setInCall} />
            </ControlModal> */}

            <SubCard
                title="VIDEO LLAMADA"
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: 600 /* 342 */
                }}
                container={false}
            >
                <PerfectScrollbar style={{ height: 'calc(80vh - 80px)', overflowX: 'hidden' }}>
                    <Grid container spacing={2}>

                        {inCall ? (
                            <Fragment>
                                <Grid item xs={12}>
                                    <Typography>
                                        DOCTOR
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container style={{ height: "100%" }}>
                                        <Grid item xs={12}>
                                            {start && tracks &&
                                                <AgoraVideoPlayer
                                                    videoTrack={tracks[1]}
                                                    style={{ height: '100%', width: '40%' }}
                                                />
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* <Grid item xs={12}>
                                    <Typography>
                                        PACIENTE
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    CAMARA 2
                                </Grid> */}
                            </Fragment>
                        ) : (
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setInCall(true)}
                                        >
                                            Join Call
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" fullWidth onClick={onCancel}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
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