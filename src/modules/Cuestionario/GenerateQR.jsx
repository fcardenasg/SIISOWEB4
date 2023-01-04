import React, { useState } from 'react';
import QRCode from 'qrcode';
import { useDispatch } from 'react-redux';

import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery,
    Grid,
    Button,
    TextField
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from 'store/actions';


const GenerateQR = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleGenerateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);

            setImageUrl(response);
        } catch (error) {
            if (error == "Error: No input text") {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: "Error: No hay texto de entrada",
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${error}`,
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        }
    }

    const handleCleanQrCode = () => {
        setImageUrl('');
        setText('');
    }

    const handleClick = (datos) => {

    }

    return (
        <MainCard title="Generar Código QR">
            <Grid container justifyContent="center"
                alignItems="center" spacing={2} xs={12} sx={{ pb: 3, pt: 3 }}
            >
                <Grid item xs={6}>
                    <TextField
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        size={matchesXS ? 'small' : 'medium'}
                        fullWidth
                        label="Digite su número de documento"
                    />
                </Grid>
                <Grid item xs={3}>
                    <AnimateButton>
                        <Button size="large" variant="contained" onClick={handleGenerateQrCode} fullWidth>
                            Generar QR
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={3}>
                    <AnimateButton>
                        <Button size="large" variant="outlined" onClick={handleCleanQrCode} fullWidth>
                            Eliminar QR
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
            {imageUrl ? (
                <Grid container justifyContent="center"
                    alignItems="center" xs={12}
                >
                    <a href={imageUrl} download>
                        <img width={300} height={300} src={imageUrl} alt="img" />
                    </a>
                </Grid>
            ) : null}
        </MainCard >
    );

}

export default GenerateQR;