import PropTypes from 'prop-types';
import {
    Button,
    Grid
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import user from 'assets/img/user.png';
import { Fragment } from 'react';

const PhotoModel = ({ OpenModal, disabledCapture, disabledDelete, EstadoImg, RemoverImg }) => {

    return (
        <>
            {EstadoImg !== null ? (
                <Fragment>
                    <Grid container justifyContent="center" alignItems="center" sx={{ pb: 2 }}>
                        <img alt='Imagen de Usuario' src={EstadoImg} width={200} height={200} />
                    </Grid>
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <AnimateButton>
                            <Button disabled={disabledDelete} variant="outlined" fullWidth onClick={RemoverImg}>
                                Eliminar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Fragment>

            ) : (
                <Fragment>
                    <Grid container justifyContent="center" alignItems="center" sx={{ pb: 2 }}>
                        <img alt='Imagen de Usuario' src={user} width={200} />
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={10} sx={{ pb: 2 }}>
                            <AnimateButton>
                                <Button disabled={disabledCapture} variant="contained" fullWidth onClick={OpenModal}>
                                    Capturar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Fragment>
            )
            }
        </>
    );
};

export default PhotoModel;

PhotoModel.propTypes = {
    EstadoImg: PropTypes.any,
    disabledCapture: PropTypes.bool,
    disabledDelete: PropTypes.bool,
    OpenModal: PropTypes.func,
    RemoverImg: PropTypes.func
};