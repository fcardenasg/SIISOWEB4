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
import { Fragment } from 'react';
import { AgoraVideoPlayer } from "agora-rtc-react";

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import { channelName, config, useClient, useMicrophoneAndCameraTracks } from './settings';

import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import CloseIcon from '@mui/icons-material/Close';


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
    const [start, setStart] = useState(false);
    const [users, setUsers] = useState([]);
    const [trackState, setTrackState] = useState({ video: true, audio: true });

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

    const mute = async (type) => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    };

    return (
        <ElevationScroll {...others}>

            <SubCard
                title="VIDEO LLAMADA"
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: 600
                }}
                container={false}
            >
                <PerfectScrollbar style={{ height: 'calc(80vh - 80px)', overflowX: 'hidden' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="outlined" color='error' fullWidth onClick={leaveChannel} startIcon={<PhoneCallbackIcon />}>
                                Colgar
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="outlined" color='error' fullWidth onClick={onCancel} startIcon={<CloseIcon />}>
                                Cerrar
                            </Button>
                        </Grid>

                        {inCall ? (
                            <Fragment>

                                <Grid item xs={12} sx={{ mb: 18 }}>
                                    <Typography>
                                        DOCTOR
                                    </Typography>

                                    <AgoraVideoPlayer
                                        videoTrack={tracks[1]}
                                        style={{ height: "800%", width: "100%" }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Button
                                                variant="contained"
                                                color={trackState.audio ? "primary" : "error"}
                                                onClick={() => mute("audio")}
                                            >
                                                {trackState.audio ? <MicIcon /> : <MicOffIcon />}
                                            </Button>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Button
                                                variant="contained"
                                                color={trackState.video ? "primary" : "error"}
                                                onClick={() => mute("video")}
                                            >
                                                {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>



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