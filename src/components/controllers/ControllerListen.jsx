import { useRef, useState } from 'react';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Lottie from 'lottie-react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControllerCopy from './ControllerCopy';
import axios from "axios";
import record from 'assets/img/record.json';
import { Url } from 'api/instances/AuthRoute';
import { motion, AnimatePresence } from "framer-motion";

const ControllerListen = () => {
    const theme = useTheme();
    const [transcription, setTranscription] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: "audio/wav",
                });
                uploadAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            const tracks = mediaRecorderRef.current.stream.getAudioTracks();
            tracks.forEach(track => track.stop());
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const uploadAudio = async (audioBlob) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");

        try {
            const response = await axios.post(`${Url.Base}api/Login/AudiotoText`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setTranscription((prevTranscription) => {
                return prevTranscription ? prevTranscription + " " + response.data.text : response.data.text;
            });
        } catch (error) {
            setTranscription((prevTranscription) => prevTranscription ? prevTranscription + " Error al transcribir el audio" : "Error al transcribir el audio");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={11}>
                {isRecording ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                        <Lottie animationData={record} />
                    </Box>
                ) : isUploading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}> {/* Center loading message */}
                        <Typography variant="body1" color="success">
                            Subiendo y transcribiendo audio...
                        </Typography>
                    </Box>
                ) : (
                    <TextField
                        value={transcription}
                        sx={{ display: "flex", width: "100%", mt: 2 }} // Reduced top margin
                        id="outlined-multiline-static"
                        label="Texto dictado"
                        multiline
                        rows={6}
                        onChange={(e) => setTranscription(e.target.value)}
                        InputProps={{
                            sx: { color: "InactiveCaptionText" },
                        }}
                        InputLabelProps={{
                            sx: { color: "gray" } // Make label more visible
                        }}
                    />
                )}
            </Grid>

            <Grid item xs={1}>
                <Grid container>
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <ControllerCopy
                            text={transcription}
                            size={2}
                            color={theme.palette.primary.main}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 2 }}>
                        <AnimateButton>
                            <Tooltip title={!isRecording ? "Iniciar grabación" : "Pausar grabación"} onClick={isRecording ? stopRecording : startRecording}>
                                <IconButton>
                                    {!isRecording ?
                                        <MicIcon sx={{ fontSize: '2rem', color: theme.palette.success.main }} /> :
                                        <MicOffIcon sx={{ fontSize: '2rem', color: theme.palette.error.main }} />
                                    }
                                </IconButton>
                            </Tooltip>
                        </AnimateButton>
                    </Grid>
                </Grid>
                <Grid sx={{ pt: 2.5 }} />
            </Grid>

        </Grid>
    );
}

export default ControllerListen;