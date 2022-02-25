import PropTypes from 'prop-types';
import {
    Button,
    Grid
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import user from 'assets/img/user.png';

const PhotoModel = ({ OpenModal, EstadoImg, RemoverImg }) => {

    return (
        <>
            {EstadoImg !== null ? (
                <>
                    <Grid container justifyContent="center" alignItems="center" xs={12} sx={{ pb: 2 }}>
                        <img alt='Imagen de Usuario' src={EstadoImg} width={225} height={225} />
                    </Grid>
                    <Grid xs={12} sx={{ pb: 2 }}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={RemoverImg}>
                                Eliminar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </>

            ) : (
                <>
                    <Grid container justifyContent="center" alignItems="center" xs={12} sx={{ pb: 2 }}>
                        <img alt='Imagen de Usuario' src={user} width={225} />
                    </Grid>
                    <Grid xs={12} sx={{ pb: 2 }}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={OpenModal}>
                                Capturar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </>
            )
            }
        </>
    );
};

export default PhotoModel;

PhotoModel.propTypes = {
    EstadoImg: PropTypes.any,
    OpenModal: PropTypes.func,
    RemoverImg: PropTypes.func
};