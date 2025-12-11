import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Avatar, Box, Chip, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchChatGPTResponse } from '../methods';
import useAuth from 'hooks/useAuth';
import { QueryAllDataEmployeeSIISO } from 'api/clients/AuthClient';
import { buildPromptWithData } from './promptUtils';

export default function ChatIA({ setInfoEmployee, infoEmployee, setIsOpen, isOpen }) {
    const { user } = useAuth();
    const [started, setStarted] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);
    const dragControls = useDragControls();

    const [promptBase, setPromptBase] = useState(''); // 🧩 Contiene las instrucciones y datos del empleado

    const initialPosition = {
        x: -window.innerWidth / 2 + 30,
        y: -window.innerHeight / 2 + 10,
    };
    const [position, setPosition] = useState(initialPosition);

    const suggestions = [
        'Historia clínica ocupacional',
        'Notas de enfermería',
        'Exámenes preclínicos recientes',
        'Historia laboral en la empresa',
        'Diagnósticos del empleado'
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        return hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (infoEmployee) {
            async function getData() {
                const result = await QueryAllDataEmployeeSIISO(infoEmployee.documento);
                if (result.data.exito) {
                    const dataText = result.data.datos;
                    const prompt = buildPromptWithData(dataText);
                    setPromptBase(prompt);
                }
            }
            getData();
        }
    }, [infoEmployee]);

    const sendMessage = async () => {
        if (!query.trim()) return;

        if (!started) setStarted(true);

        const userQuery = query.trim();
        const userMsg = {
            id: Date.now(),
            from: 'user',
            text: userQuery,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, userMsg]);
        setQuery('');

        const tempMsgId = Date.now() + 1;
        setMessages((prev) => [
            ...prev,
            {
                id: tempMsgId,
                from: 'assistant',
                text: 'Procesando tu solicitud...',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]);

        let conversation = [];

        if (promptBase) {
            conversation.push({
                role: 'system',
                content: promptBase,
            });
        }

        conversation = [
            ...conversation,
            ...messages.filter(m => m.id < tempMsgId).map((m) => ({
                role: m.from === 'user' ? 'user' : 'assistant',
                content: m.text,
            })),
        ];

        conversation.push({
            role: 'user',
            content: userQuery,
        });

        const aiText = await fetchChatGPTResponse(conversation);
        setMessages((prev) =>
            prev.map((m) => (m.id === tempMsgId ? {
                ...m,
                text: aiText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            } : m))
        );
    };

    const onClickClose = () => {
        setIsOpen(false);
        setPosition(initialPosition);
        setInfoEmployee(null);
        setStarted(false);
        setMessages([]);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    drag
                    dragControls={dragControls}
                    dragMomentum={false}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        zIndex: 9999,
                        x: position.x,
                        y: position.y,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    dragListener={false}
                >
                    <Paper
                        elevation={12}
                        sx={{
                            width: 750,
                            height: 570,
                            borderRadius: 3,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: '#ffffff',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                p: 1.5,
                                bgcolor: '#f6f8fb',
                                borderBottom: '1px solid #e0e0e0',
                                cursor: 'grab',
                            }}
                            onPointerDown={(e) => dragControls.start(e)}
                        >
                            <Avatar sx={{ boxShadow: 2, bgcolor: 'grey.200' }}>
                                <SmartToyIcon />
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>SIISO IA</Typography>
                                <Typography variant="caption" color="text.secondary">Asistente Clínico Inteligente</Typography>
                            </Box>
                            <IconButton size="small" onClick={onClickClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {!started && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    style={{ textAlign: 'center', marginTop: '15%' }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                                        {`${getGreeting()} ${user?.nameuser}`}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                        ¿Qué información deseas conocer de {infoEmployee.nameEmpleado}?
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            bgcolor: 'white',
                                            borderRadius: 10,
                                            border: '1px solid #e0e0e0',
                                            px: 3,
                                            py: 1.5,
                                            width: '80%',
                                            maxWidth: 620,
                                            margin: '0 auto',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            placeholder="Pregunta lo que necesites..."
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            onChange={(e) => setQuery(e.target.value)}
                                            value={query}
                                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                        />
                                        <IconButton color="primary" onClick={sendMessage}><SendIcon /></IconButton>
                                    </Box>

                                    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                            {suggestions.slice(0, 3).map((s, i) => (
                                                <Chip key={i} label={s} clickable onClick={() => setQuery(s)} sx={{ fontSize: 13, px: 1.5 }} />
                                            ))}
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                            {suggestions.slice(3, 5).map((s, i) => (
                                                <Chip key={i + 3} label={s} clickable onClick={() => setQuery(s)} sx={{ fontSize: 13, px: 1.5 }} />
                                            ))}
                                        </Box>
                                    </Box>
                                </motion.div>
                            )}

                            {started && (
                                <AnimatePresence>
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, x: msg.from === 'user' ? 60 : -60 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                            style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}
                                        >
                                            {msg.from !== 'user' && (
                                                <Avatar sx={{ bgcolor: 'grey.200', width: 32, height: 32 }}><SmartToyIcon sx={{ fontSize: 18 }} /></Avatar>
                                            )}

                                            <Box
                                                sx={{
                                                    bgcolor: msg.from === 'user' ? 'primary.main' : '#e9eef6',
                                                    color: msg.from === 'user' ? 'white' : 'black',
                                                    px: 2,
                                                    py: 1.2,
                                                    borderRadius: 2,
                                                    maxWidth: '75%',
                                                    boxShadow: 1,
                                                    userSelect: 'text',
                                                    // Estilos para el contenido Markdown
                                                    '& b': { fontWeight: 700 },
                                                    '& ul': { pl: 2, mt: 0.5, mb: 0.5 },
                                                    '& li': { fontSize: 13, py: 0.2 },
                                                }}
                                            >
                                                {msg.from === 'assistant' ? (
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({ node, ...props }) => <Typography variant="body2" component="p" sx={{ '&:last-child': { mb: 0 } }} {...props} />,
                                                            li: ({ node, ...props }) => <li style={{ fontSize: 13 }} {...props} />,
                                                            strong: ({ node, ...props }) => <b {...props} />,
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                ) : (
                                                    <Typography color="#e0e0e0" variant="body2">{msg.text}</Typography>
                                                )}

                                                <Typography variant="caption" sx={{
                                                    opacity: 0.7,
                                                    display: 'block',
                                                    textAlign: msg.from === 'user' ? 'right' : 'left',
                                                    fontSize: '0.65rem',
                                                    mt: 0.5
                                                }}>
                                                    {msg.time}
                                                </Typography>
                                            </Box>

                                            {msg.from === 'user' && (
                                                <Avatar sx={{ bgcolor: 'grey.200', width: 32, height: 32 }}>{user?.nameuser[0]}</Avatar>
                                            )}
                                        </motion.div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </AnimatePresence>
                            )}
                        </Box>

                        {started && (
                            <Box sx={{ p: 1.5, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 1, alignItems: 'center', bgcolor: '#fafafa' }}>
                                <TextField
                                    fullWidth
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Escribe tu consulta..."
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        bgcolor: 'white',
                                        borderRadius: 5,
                                        '& fieldset': { border: 'none' },
                                        boxShadow: '0 0 6px rgba(0,0,0,0.08)',
                                        px: 1,
                                    }}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={sendMessage}
                                                    size="small"
                                                    color="primary"
                                                    disabled={!query.trim()}
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        )}
                    </Paper>
                </motion.div>
            )}
        </AnimatePresence>
    );
}