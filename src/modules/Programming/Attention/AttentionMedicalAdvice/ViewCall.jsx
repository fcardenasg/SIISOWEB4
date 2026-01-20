import React, { useEffect, useRef, useState } from "react";

import { useTheme } from "@mui/material/styles";
import { Button, Grid, Typography, useScrollTrigger, Box } from "@mui/material";

import SubCard from "ui-component/cards/SubCard";
import { Fragment } from "react";

import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";

import { useSearchParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MessageError } from "components/alert/AlertAll";
import { height } from "@mui/system";

function ElevationScroll({ children, window }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 130,
    target: window || undefined,
  });

  return React.cloneElement(children, {
    style: {
      position: trigger ? "fixed" : "relative",
      top: trigger ? 83 : 0,
      width: trigger ? 318 : "100%",
    },
  });
}

const ViewCall = ({ onCancel, channelCurrent }) => {
  const theme = useTheme();
  const [inCall, setInCall] = useState(false);
  const [start, setStart] = useState(false);
  const [users, setUsers] = useState([]);
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  dayjs.extend(utc);

  const [searchParams] = useSearchParams();
  let appId = searchParams.get("appId");
  let channel = searchParams.get("channel");
  let tokenend = searchParams.get("tokenend");


  let fechaactual;

  if (channelCurrent?.channel) {

    appId = "24620e849c55400aad51c1da9141ac46";
    channel = channelCurrent.channel;
    fechaactual = channelCurrent.fecha;
  }

  let token = null;
  let uid = 0;

  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);

  const [client, setClient] = useState(null);

  const videoContainerRef = useRef(null);
  const videoContainerRemoteRef = useRef(null);

  const SECRET_kEY = "rubikapp";

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(agoraClient);
  }, []);

  useEffect(() => {
    if (client) {
      setupEventListeners();
    }
  }, [client]);

  async function joinChannel() {
    let bytes;
    let decryptedDate;
    let expirationDate;
    let today = dayjs().startOf("day").startOf('day');

    if (channelCurrent && channelCurrent.fecha) {
      expirationDate = dayjs.utc(channelCurrent.fecha).startOf('day');
    } else {
      bytes = CryptoJS.AES.decrypt(decodeURIComponent(tokenend), SECRET_kEY);
      decryptedDate = bytes.toString(CryptoJS.enc.Utf8);
      expirationDate = dayjs.utc(decryptedDate).startOf('day');
    }


    if (today.isBefore(expirationDate)) {
      setOpenError(true);
      setErrorMessage(
        `Reunión programada para el ${expirationDate.format("DD/MM/YYYY")}`
      );
      return;
    } else if (today.format("YYYY-MM-DD") > expirationDate.format("YYYY-MM-DD")) {
      setOpenError(true);
      setErrorMessage("Esta reunión ha caducado");
      return;
    } else {

      try {
        await client.join(appId, channel, token, uid);
        await createLocalTracks();
        await publishLocalTracks();
        displayLocalVideo();
        setInCall(true);
      } catch (error) {
        setOpenError(true);
        setErrorMessage("Error al unirse, verifique que su camara este funcionando e intente nuevamente.");
      }
    }
  }

  async function createLocalTracks() {
    localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
  }

  async function publishLocalTracks() {
    await client.publish([
      localAudioTrackRef.current,
      localVideoTrackRef.current,
    ]);
  }

  function displayLocalVideo() {
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = uid;
    localPlayerContainer.style.width = "100%";
    localPlayerContainer.style.height = "98%";
    localPlayerContainer.style.borderRadius = "10px";

    if (videoContainerRef.current) {
      videoContainerRef.current.appendChild(localPlayerContainer);
    }

    localVideoTrackRef.current.play(localPlayerContainer);
  }

  function displayRemoteVideo(user) {
    const remoteVideoTrack = user.videoTrack;
    const remotePlayerContainer = document.createElement("div");
    remotePlayerContainer.id = user.uid.toString() + "1";
    remotePlayerContainer.style.width = "100%";
    remotePlayerContainer.style.height = "98%";
    remotePlayerContainer.style.borderRadius = "10px";

    if (videoContainerRemoteRef.current) {
      videoContainerRemoteRef.current.appendChild(remotePlayerContainer);
    }

    remoteVideoTrack.play(remotePlayerContainer);
  }

  async function leaveChannel() {
    onCancel();

    if (localAudioTrackRef.current) {
      await localAudioTrackRef.current.stop();
      await localAudioTrackRef.current.close();
      localAudioTrackRef.current = null;
    }
    if (localVideoTrackRef.current) {
      await localVideoTrackRef.current.stop();
      await localVideoTrackRef.current.close();
      localVideoTrackRef.current = null;
    }

    const localPlayerContainer = document.getElementById(uid);
    localPlayerContainer && localPlayerContainer.remove();

    client.remoteUsers.forEach((user) => {
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    await client.leave();
  }

  function setupEventListeners() {
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === "video") {
        displayRemoteVideo(user);
      }

      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.on("user-unpublished", (user) => {
      const remotePlayerContainer = document.getElementById(user.uid);
      remotePlayerContainer && remotePlayerContainer.remove();
    });
  }

  return (
    <>
      <MessageError
        error={errorMessage}
        open={openError}
        onClose={() => setOpenError(false)}
      />

      <ElevationScroll>
        <SubCard
          title="VIDEO LLAMADA"
          sx={{
            background:
              theme.palette.mode === "dark"
                ? theme.palette.dark.main
                : theme.palette.grey[50],
            width: "100%",
            height: "auto",
            maxWidth: 600,
          }}
          container={false}
        >
          <Grid container spacing={2}>
            <Fragment>
              <Grid item xs={12} sx={{ mt: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    border: "1px solid rgb(219, 219, 219)",
                  }}
                >
                  <Box
                    id="video-container"
                    ref={videoContainerRef}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "160px",
                      borderRadius: 1,
                      paddingX: 2,
                      paddingY: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        background: "success",
                        gap: 1,
                        width: "auto",
                        marginX: 1,
                        marginTop: 1,
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        textAlign="start"
                        variant="h5"
                        color="GrayText"
                      >
                        Medico
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      paddingX: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Button
                      disabled={inCall}
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        setInCall(true);
                        joinChannel();
                      }}
                      startIcon={<PhoneCallbackIcon />}
                    >
                      {inCall ? "Conectado" : "Conectar"}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={leaveChannel}
                      startIcon={<PhoneCallbackIcon />}
                    >
                      Colgar
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    border: "1px solid rgb(219, 219, 219)",
                  }}
                >
                  <Box
                    id="video-container-paciente"
                    ref={videoContainerRemoteRef}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "170px",
                      borderRadius: 1,
                      paddingX: 2,
                      paddingY: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        background: "success",
                        gap: 1,
                        width: "auto",
                        marginX: 1,
                        marginTop: 1,
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        textAlign="start"
                        variant="h5"
                        color="GrayText"
                      >
                        Paciente
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Fragment>
          </Grid>
        </SubCard>
      </ElevationScroll>
    </>
  );
};

export default ViewCall;
