import React, { useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const ViewExcalidraw = () => {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Paper
                elevation={0}
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 0,
                }}
            >
                <Excalidraw
                    excalidrawAPI={(api) => setExcalidrawAPI(api)}
                    theme={theme.palette.mode}
                    langCode="es-ES"
                    UIOptions={{
                        canvasActions: {
                            loadScene: true,
                            saveAsImage: true,
                            export: { saveFileToDisk: true },
                        },
                    }}
                />
            </Paper>
        </Box>
    );
};

export default ViewExcalidraw;
