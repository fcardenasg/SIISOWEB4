import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Configuration, OpenAIApi } from 'openai';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';
import ChartHistory from './ChartHistory';
import AvatarStatus from './AvatarStatus';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import { useDispatch } from 'store';
import { getUser, insertChat } from 'store/slices/chat';

import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import LogoChatGPT from "assets/img/LogoChatGPT.png";
import useAuth from 'hooks/useAuth';

const ChatGPT = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const configuracion = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openAI = new OpenAIApi(configuracion);

    useLayoutEffect(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollIntoView();
        }
    });

    useEffect(() => {
        dispatch(openDrawer(false));
        dispatch(getUser(1));
    }, []);

    const handleOnSend = async () => {
        const d = new Date();
        setMessage('');

        const newMessage = {
            from: 'ChatGPT',
            to: user?.nameuser,
            text: message,
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setData((prevState) => [...prevState, newMessage]);
        dispatch(insertChat(newMessage));

        setLoading(true);

        //////////Consulta a ChatGPT
        try {
            const response = openAI.createCompletion({
                model: "gpt-3.5-turbo-instruct",
                prompt: message,
                temperature: 0.5,
                max_tokens: 3500,
                stop: 'None'
            });

            var respuestaChatGPT = (await response).data.choices[0].text;
            
            setTimeout(() => {
                const newMessage = {
                    from: user?.nameuser,
                    to: 'ChatGPT',
                    text: respuestaChatGPT,
                    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                setData((prevState) => [...prevState, newMessage]);
                dispatch(insertChat(newMessage));
            }, 1000);


            setLoading(false);
        } catch (error) {
            setLoading(false)
        }
    };

    const handleEnter = (event) => {
        if (event?.key !== 'Enter') {
            return;
        }
        handleOnSend();
    };

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs zeroMinWidth>
                    <MainCard
                        sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
                        }}
                    >
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" spacing={0.5}>
                                    <Grid item>
                                        <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                            <Grid item>
                                                <Avatar alt="ChatGPT" src={LogoChatGPT} />
                                            </Grid>
                                            <Grid item sm zeroMinWidth>
                                                <Grid container spacing={0} alignItems="center">
                                                    <Grid item xs={12}>
                                                        <Typography variant="h4" component="div">
                                                            ChatGPT
                                                            <AvatarStatus status="available" />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle2">En linea</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ mt: theme.spacing(2) }} />
                            </Grid>

                            <PerfectScrollbar style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 380 }}>
                                <CardContent>
                                    <ChartHistory
                                        theme={theme}
                                        user={user}
                                        data={data}
                                    />
                                    <span ref={scrollRef} />
                                </CardContent>
                            </PerfectScrollbar>

                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs zeroMinWidth>
                                        <TextField
                                            fullWidth
                                            label="Escribe tu consulta"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={handleEnter}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <IconButton color="primary" onClick={handleOnSend} size="large">
                                            <SendTwoToneIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatGPT;
