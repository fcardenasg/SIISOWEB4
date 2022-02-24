import PropTypes from 'prop-types'
import Webcam from 'react-webcam';
import {
    Button,
    Grid
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import user from 'assets/img/user.png';

const WebCamCapture = ({ CaptureImg, OpenModal, EstadoImg, RemoverImg, ImgSrc, WebCamRef }) => {

    return (
        <Grid item xs={6} sx={{ pb: 3 }}>
            {EstadoImg ? (
                <Grid sx={{ pt: 2 }}>
                    <img alt='Imagen de Usuario' src={user} width={200} />
                    <Grid container spacing={1} sx={{ pt: 2 }}>
                        <Grid item xs={5.8}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth onClick={OpenModal}>
                                    Capturar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <>
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
                        <Grid item xs={5.8}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={RemoverImg}>
                                    Eliminar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </>
            )
            }
        </Grid>
    );
};

export default WebCamCapture;

WebCamCapture.propTypes = {
    EstadoImg: PropTypes.bool,
    CaptureImg: PropTypes.func,
    OpenModal: PropTypes.func,
    RemoverImg: PropTypes.func,
    ImgSrc: PropTypes.any,
    WebCamRef: PropTypes.any
};