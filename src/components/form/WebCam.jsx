import PropTypes from 'prop-types'
import Webcam from 'react-webcam';
import {
    Button,
    Grid
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/Cargando';

const videoConstraints = {
    width: 360,
    height: 360,
    facingMode: "user"
};

const WebCamCapture = ({ CaptureImg, RemoverImg, ImgSrc, WebCamRef }) => {

    return (
        <Grid item xs={12}>
            {ImgSrc === null ? (
                <>
                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={3}>
                            <Webcam
                                audio={false}
                                ref={WebCamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth onClick={CaptureImg}>
                                    Capturar
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={RemoverImg}>
                                    Eliminar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid container spacing={2} sx={{ pb: 2 }}>
                        <Grid item xs={3}>
                            {ImgSrc && <img width={360} src={ImgSrc} />}
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={RemoverImg}>
                                    Eliminar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </>)
            }
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