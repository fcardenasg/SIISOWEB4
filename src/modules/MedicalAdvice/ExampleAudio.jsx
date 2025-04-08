import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box, TextareaAutosize } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { keyframes } from "@emotion/react";
import ReactMarkdown from 'react-markdown';
import { Url } from "api/instances/AuthRoute";

const blurAnimation = keyframes`
  0% {
    filter: blur(0);
  }
  100% {
    filter: blur(5px);
  }
`;

const ExampleAudio = () => {
    const [text, setText] = useState("");
    const [interimText, setInterimText] = useState("");
    const [correctedText, setCorrectedText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (
            !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
        ) {
            alert("Tu navegador no soporta reconocimiento de voz");
            return;
        }

        const speechRecognition = new (window.SpeechRecognition ||
            window.webkitSpeechRecognition)();
        speechRecognition.lang = "es-ES";
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;

        speechRecognition.onresult = (event) => {
            let finalText = "";
            let interim = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalText += event.results[i][0].transcript + " ";
                } else {
                    interim += event.results[i][0].transcript + " ";
                }
            }

            setText((prev) => {
                const newText = prev + finalText;
                checkAndSendForCorrection(newText);
                return newText;
            });

            setInterimText(interim);

            if (interim.length > 0) {
                checkAndSendForCorrection(interim);
            }
        };

        speechRecognition.onerror = (event) => {
            console.error("Error en SpeechRecognition:", event.error);
        };

        setRecognition(speechRecognition);

        return () => {
            speechRecognition.abort();
        };
    }, []);

    const startListening = () => {
        if (recognition) {
            setIsListening(true);
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition) {
            setIsListening(false);
            recognition.stop();
        }
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
        checkAndSendForCorrection(event.target.value);
    };

    const checkAndSendForCorrection = async (currentText) => {
        if (currentText.length >= 5) {
            setIsLoading(true);
            const corrected = await sendToAPI(currentText);

            setCorrectedText(corrected);
            setIsLoading(false);
        }
    };

    const sendToAPI = async (textToCorrect) => {
        const texto = `Reescribe este texto sin cambiar las palabras: ${textToCorrect}`;
        try {
            const response = await axios.post(
                `${Url.Base}${Url.AudioTexto}`,
                texto,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return response.data?.data;
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            throw error;
        }
    };

    useEffect(() => {
        console.log(correctedText)
    }, [correctedText])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(correctedText || text);
        setText(correctedText || text)
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                height: "auto", 
           
            }}
        >
            <Box sx={{ marginBottom: 3, width: "100%", height: "35vh",}}>
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 1,
                        color: "gray",
                        transition: "color 0.5s ease",
                        minHeight: "100px",
                        height: "35vh",             
                    }}
                >
                    <TextareaAutosize
                        minRows={4}
                        value={text + interimText}
                        onChange={handleTextChange}
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            resize: "none",
                        }}
                    />
                    <Button
                        onClick={isListening ? stopListening : startListening}
                        variant="contained"
                        color={isListening ? "error" : "primary"}
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            padding: "10px",
                            borderRadius: "100%",
                            width: "30px",
                            minWidth: "30px",
                            height: "30px",
                        }}
                    >
                        <MicNoneIcon style={{ fontSize: "15px" }} />
                    </Button>
                    {isListening && (
                        <Typography
                            sx={{
                                position: "absolute",
                                bottom: 10,
                                right: 55,
                                fontSize: "14px",
                                color: "gray",
                                marginLeft: "10px",
                            }}
                        >
                            Grabando...
                        </Typography>
                    )}
                </Box>
            </Box>

            {correctedText && (
                <Box
                    sx={{
                        position: "relative",
                        padding: 2,
                        borderRadius: 1,
                        border: "1px solid #ddd",
                        width: "100%",
                        height: "35vh",
                        backgroundColor: "#f9f9f9",
                        marginTop: 1,
                        opacity: isLoading ? 0.5 : 1,
                        transition: "opacity 0.8s ease",
                    }}
                >
                    <Typography
                        variant="body2"
                        color="initial"
                        sx={{
                            color: "gray",
                            marginBottom: 0,
                            animation: isLoading
                                ? `${blurAnimation} 3s ease-in-out infinite`
                                : "none",
                            transition: "opacity 0.8s ease",
                        }}
                    >
                        <ReactMarkdown>{correctedText}</ReactMarkdown>

                    </Typography>
                    <Button
                        onClick={copyToClipboard}
                        variant="outlined"
                        color="primary"
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            marginTop: 1,
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            borderRadius: "100%",
                            width: "30px",
                            minWidth: "30px",
                            height: "30px",
                        }}
                    >
                        <FileCopyIcon style={{ fontSize: "15px" }} />

                    </Button>
                </Box>
            )}
          
        </Box>
    );
};

export default ExampleAudio;