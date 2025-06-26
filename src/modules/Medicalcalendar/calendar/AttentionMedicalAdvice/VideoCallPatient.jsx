import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SubCard from "ui-component/cards/SubCard";


import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";

import AgoraRTC from "agora-rtc-sdk-ng";
import { MessageError } from "components/alert/AlertAll";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSearchParams } from "react-router-dom";

const ViewCall = () => {
  const theme = useTheme();
  const [inCall, setInCall] = useState(false);

  const [searchParams] = useSearchParams();
  const appId = searchParams.get("appId");
  const channel = searchParams.get("channel");
  const tokenend = searchParams.get("tokenend");
  let token = null;
  let uid = 0;

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  dayjs.extend(utc);

  console.log("url paciente:", channel);

  let localAudioTrack = null;
  let localVideoTrack = null;

  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);

  const [client, setClient] = useState(null);

  const videoContainerRef = useRef(null);
  const videoContainerRemoteRef = useRef(null);

  const SECRET_kEY = "rubikapp";

  let bytes;
  let decryptedDate;
  let expirationDate;

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
    const bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(tokenend),
      SECRET_kEY
    );
    const decryptedDate = bytes.toString(CryptoJS.enc.Utf8);
    const extractedDate = dayjs.utc(decryptedDate).format("YYYY-MM-DD");

    const today = new Date().toISOString().split("T")[0];

    try {
      await client.join(appId, channel, token, uid);
      await createLocalTracks();
      await publishLocalTracks();
      displayLocalVideo();
      setInCall(true);
    } catch (error) {
      console.error("Error al unirse al canal:", error);
      setOpenError(true);
      setErrorMessage("Error al conectar con el canal.");
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
    remotePlayerContainer.style.height = "90%";

    if (videoContainerRemoteRef.current) {
      videoContainerRemoteRef.current.appendChild(remotePlayerContainer);
    }

    remoteVideoTrack.play(remotePlayerContainer);
  }

  async function leaveChannel() {
    if (localAudioTrack) localAudioTrack.close();
    if (localVideoTrack) localVideoTrack.close();

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
      console.log("subscribe success");

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
      <SubCard
        title={<Typography variant="h4">VIDEO LLAMADA</Typography>}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? theme.palette.dark.main
              : theme.palette.grey[100],
          width: "100%",
          padding: 2,
          height: "100vh",
          borderRadius: 2,
        }}
        container={false}
      >
        <Grid container spacing={2} alignItems="center">
          <>
            {/* Video del Médico */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: theme.palette.background.paper,
                  width: "100%",
                  height: { xs: "30vh", md: "100%" },
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  id="video-container"
                  ref={videoContainerRef}
                  sx={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.grey[900],
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  {/* Aquí se renderiza el video del médico */}
                </Box>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{
                    padding: 1,
                    backgroundColor: theme.palette.primary.light,
                    color: "GrayText",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  Paciente
                </Typography>
              </Box>
            </Grid>

            {/* Video del Paciente */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: theme.palette.background.paper,
                  width: "100%",
                  height: { xs: "30vh", md: "100%" },
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  id="video-container-paciente"
                  ref={videoContainerRemoteRef}
                  sx={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.grey[800],
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  {/* Aquí se renderiza el video del paciente */}
                </Box>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{
                    padding: 1,
                    backgroundColor: theme.palette.secondary.light,
                    color: "GrayText",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  Medico
                </Typography>
              </Box>
            </Grid>

            {/* Botones de control */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setInCall(true);
                    joinChannel();
                  }}
                  startIcon={<PhoneCallbackIcon />}
                  sx={{ minWidth: 150 }}
                >
                  Conectar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={leaveChannel}
                  startIcon={<PhoneCallbackIcon />}
                  sx={{ minWidth: 150 }}
                >
                  Colgar
                </Button>
              </Box>
            </Grid>
          </>
        </Grid>
      </SubCard>
    </>
  );
};

ViewCall.propTypes = {
  onCancel: PropTypes.func,
};

export default ViewCall;
