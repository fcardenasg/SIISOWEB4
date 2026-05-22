import * as React from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { fetchIA, fetchIAChat, IAChatMessage } from "./serviceSisso";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown.css";

export default function ChatIA({ informe }) {
  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      content: "Bienvenido 👋 Escribe un pregunta para comenzar a chatear.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const bottomRef = React.useRef(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;


    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    const propmt = `${informe}\nPregunta: ${text}`;

    try {

      const menssage = await fetchIAChat(propmt);
      const menssagenuevo = await IAChatMessage(text);
      console.log("menssagenuevo", menssagenuevo);

 
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: menssage,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error al conectar con el servicio de IA.",
        },
      ]);
    }
  };


  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "90%",
                      width: "fit-content",
                      display: "inline-block",
                      paddingX: 1.5,
                      paddingY: 0.5,
                      borderRadius: 2,
                      border:
                        msg.role === "user" ? "1px solid #d84315" : "none",
                      bgcolor: msg.role === "user" ? "#fafafa" : "#e3f2fd",
                      color: "text.primary",
                      ml: msg.role === "user" ? "auto" : 0,
                    }}
                  >
                    <ReactMarkdown
                      className="informe-medico"
                      children={msg.content}
                    />
                    {/* <Typography variant="body2">{msg.content}</Typography> */}
                  </Box>
                </Box>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </AnimatePresence>
        </Stack>
      </Box>


      <Box
        sx={{
          p: 1,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Escribe una pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <Button variant="contained" onClick={() => sendMessage(input)}>
          Enviar
        </Button>
      </Box>
    </Container>
  );
}
