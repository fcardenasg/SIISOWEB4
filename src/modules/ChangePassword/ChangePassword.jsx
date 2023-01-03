import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery,
} from '@mui/material';

import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PostChangePassword } from 'formatdata/ChangePassword';
import { PostChangePasswords } from 'api/clients/ChangePasswordClient';
import config from 'config';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import AuthCardWrapper from 'views/pages/authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import { createTheme } from '@mui/material/styles';
import AuthWrapper1 from 'views/pages/authentication/AuthWrapper1';

const RedDrummond = createTheme({
    palette: {
        primary: {
            main: '#E31937',
        },
    },
});

const ChangePassword = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [txtAnteriorPass, setTxtAnteriorPass] = useState('');
    const [txtNuevaPass, setTxtNuevaPass] = useState('');
    const [txtConfirmarPass, setTxtConfirmarPass] = useState('');

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const handleClick = async () => {
        try {

            const DataToInsert = PostChangePassword(user.id, txtAnteriorPass, txtNuevaPass);

            if (txtAnteriorPass === '') {
                setOpenError(true);
                setErrorMessage('Digite la contraseña anterior');
            } else if (txtNuevaPass === '') {
                setOpenError(true);
                setErrorMessage('Digite la contraseña nueva');
            } else if (txtConfirmarPass === '') {
                setOpenError(true);
                setErrorMessage('Digite la confirmación de la contraseña');
            } else if (txtNuevaPass !== txtConfirmarPass) {
                setOpenError(true);
                setErrorMessage('La contraseña nueva no es la misma que la confirmación');
            } else if (txtAnteriorPass === txtNuevaPass) {
                setOpenError(true);
                setErrorMessage('Digite una contraseña distinta a la anterior');
            } else {
                const result = await PostChangePasswords(DataToInsert);
                console.log("result => ", result);

                if (result.data.message === 'La contraseña actual no es correcta') {
                    setOpenError(true);
                    setErrorMessage(result.data.message);

                } else if (result.data.message === 'Error al actualizar la contraseña') {
                    setOpenError(true);
                    setErrorMessage(result.data.message);

                } else if (result.data.message === 'Contraseña actualizada con exito') {
                    setOpenSuccess(true);
                    navigate(config.defaultPath, { replace: true });
                } else {
                    setOpenError(true);
                    setErrorMessage('No sé pudo cambiar la contraseña');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No sé pudo cambiar la contraseña');
        }
    };

    return (
        <AuthWrapper1>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 0.5 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    color={RedDrummond.palette.primary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    CAMBIAR CONTRASEÑA
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <InputLabel htmlFor="outlined-adornment-password">Contraseña Anterior</InputLabel>
                                                        <OutlinedInput
                                                            onChange={(e) => setTxtAnteriorPass(e?.target.value)}
                                                            value={txtAnteriorPass}
                                                            id="outlined-adornment-password"
                                                            type={showPassword1 ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => setShowPassword1((show) => !show)}
                                                                        edge="end"
                                                                    >
                                                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Contraseña Anterio"
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <InputLabel htmlFor="outlined-adornment-password">Nueva Contraseña</InputLabel>
                                                        <OutlinedInput
                                                            onChange={(e) => setTxtNuevaPass(e?.target.value)}
                                                            value={txtNuevaPass}
                                                            id="outlined-adornment-password"
                                                            type={showPassword2 ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => setShowPassword2((show) => !show)}
                                                                        edge="end"
                                                                    >
                                                                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Nueva Contraseña"
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" fullWidth>
                                                        <InputLabel htmlFor="outlined-adornment-password">Confirmar Nueva Contraseña</InputLabel>
                                                        <OutlinedInput
                                                            onChange={(e) => setTxtConfirmarPass(e?.target.value)}
                                                            value={txtConfirmarPass}
                                                            id="outlined-adornment-password"
                                                            type={showPassword3 ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={() => setShowPassword3((show) => !show)}
                                                                        edge="end"
                                                                    >
                                                                        {showPassword3 ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Confirmar Nueva Contraseña"
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sx={{ mt: 2 }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <AnimateButton>
                                                                <Button variant="contained" color="error" fullWidth onClick={handleClick}>
                                                                    {TitleButton.CambiarContrasenia}
                                                                </Button>
                                                            </AnimateButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ChangePassword;