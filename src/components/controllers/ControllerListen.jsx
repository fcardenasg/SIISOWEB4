import { useState, useEffect } from 'react';

import { Grid, IconButton, InputAdornment, Tooltip, TextField } from '@mui/material';
import ControllerCopy from './ControllerCopy';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useTheme } from '@mui/material/styles';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const ControllerListen = () => {
    const theme = useTheme();

    const [isListening, setIsListening] = useState(false);
    const [textNote, setTextNote] = useState('');

    const handleListen = () => {
        try {
            if (isListening) {
                mic.start()
                mic.onend = () => {
                    console.log('continue..')
                    mic.start()
                }
            } else {
                mic.stop()
                mic.onend = () => {
                    console.log('Stopped Mic on Click')
                }
            }
            mic.onstart = () => {
                console.log('Mics on')
            }
            mic.onresult = event => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')
                setTextNote(transcript);
                mic.onerror = event => {
                    console.log(event.error)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleListen();
    }, [isListening])

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={11}>
                <TextField
                    multiline
                    rows={6}
                    fullWidth
                    label="Texto Dictado"
                    placeholder="Esperando dictado..."
                    onChange={(e) => setTextNote(e.target.value)}
                    value={textNote}
                    sx={{ mb: gridSpacing }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                />
            </Grid>

            <Grid item xs={1}>
                <Grid container>
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <ControllerCopy
                            text={textNote}
                            size={2}
                            color={theme.palette.primary.main}
                        />
                    </Grid>

                    {!isListening ?
                        <Grid item xs={12} sx={{ pt: 2 }}>
                            <AnimateButton>
                                <Tooltip title="Iniciar Grabación" onClick={() => setIsListening(prevState => !prevState)}>
                                    <IconButton>
                                        <MicIcon sx={{ fontSize: '2rem', color: theme.palette.success.main }} />
                                    </IconButton>
                                </Tooltip>
                            </AnimateButton></Grid>
                        : <Grid item xs={12} sx={{ pt: 2 }}>
                            <AnimateButton>
                                <Tooltip title="Pausar Grabación" onClick={() => setIsListening(prevState => !prevState)}>
                                    <IconButton>
                                        <MicOffIcon sx={{ fontSize: '2rem', color: theme.palette.error.main }} />
                                    </IconButton>
                                </Tooltip>
                            </AnimateButton>
                        </Grid>}
                </Grid>
                <Grid sx={{ pt: 2.5 }} />
            </Grid>

        </Grid>
    );
}

export default ControllerListen;