import PropTypes from 'prop-types'
import Webcam from 'react-webcam';
import {
    Button,
    Grid
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

const WebCamCapture = ({ CaptureImg, RemoverImg, ImgSrc, WebCamRef }) => {

    return (
        <Grid item xs={6} sx={{ pb: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Webcam
                        audio={false}
                        ref={WebCamRef}
                        screenshotFormat="image/jpeg"
                        height={230}
                        width={230}
                    />
                </Grid>
            </Grid>

            {ImgSrc && <img width={230} src={ImgSrc} />}

            <Grid container spacing={1}>
                <Grid item xs={2.9}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth onClick={CaptureImg}>
                            Capturar
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={2.9}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={RemoverImg}>
                            Eliminar
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default WebCamCapture;

WebCamCapture.propTypes = {
    CaptureImg: PropTypes.func,
    RemoverImg: PropTypes.func,
    ImgSrc: PropTypes.any,
    WebCamRef: PropTypes.any
};