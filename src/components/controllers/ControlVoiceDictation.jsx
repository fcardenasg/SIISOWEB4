import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import AnimateButton from "ui-component/extended/AnimateButton";
import Iconify from "components/iconify/iconify";

const ControlVoiceDictation = ({ onTranscript, lang = 'es-ES', disabled = false }) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const isActivelyListening = useRef(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = lang;

            recognition.onresult = (event) => {
                if (!isActivelyListening.current) return;

                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        onTranscript(event.results[i][0].transcript, true);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                        onTranscript(interimTranscript, false);
                    }
                }
            };

            recognition.onerror = (event) => {
                if (event.error !== 'no-speech') {
                    console.error("Error de voz:", event.error);
                    stopListening();
                }
            };

            recognition.onend = () => {
                if (isActivelyListening.current) {
                    recognition.start();
                }
            };

            recognitionRef.current = recognition;
        }
    }, [lang, onTranscript]);

    const stopListening = () => {
        isActivelyListening.current = false;
        setIsListening(false);
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
    };

    const startListening = () => {
        isActivelyListening.current = true;
        setIsListening(true);
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };

    const handleToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <AnimateButton>
            <Tooltip title={isListening ? "Detener ahora" : "Dictar con voz"} placement="top">
                <IconButton
                    onClick={handleToggle}
                    color={disabled ? "default" : (isListening ? "primary" : "error")}
                    disabled={disabled}
                    sx={{
                        boxShadow: 3,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper', boxShadow: 8 },
                        border: isListening ? '2px solid' : 'none',
                        borderColor: 'primary.main',
                        transition: 'all 0.1s ease-in-out'
                    }}
                >
                    <Iconify
                        icon={isListening ? 'solar:microphone-3-bold' : 'solar:microphone-bold'}
                        width={24}
                    />
                </IconButton>
            </Tooltip>
        </AnimateButton>
    );
};

export default ControlVoiceDictation;