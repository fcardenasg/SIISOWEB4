import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from 'views/pages/authentication/AuthWrapper1';
import AuthCardWrapper from 'views/pages/authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthForgotPassword from './AuthForgotPassword'; /* ../auth-forms/AuthForgotPassword */
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';

import { createTheme } from '@mui/material/styles';

const RedDrummond = createTheme({
    palette: {
        primary: {
            main: '#E31937',
        },
    },
});

const ForgotPassword = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
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
                                ¿Olvidaste tu Contraseña?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontSize="16px" textAlign="center">
                                Ingrese su dirección de correo electrónico a continuación y le enviaremos OTP de restablecimiento de contraseña.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <AuthForgotPassword />
                </Grid>
            </Grid>
        </AuthCardWrapper>
    );
};

export default ForgotPassword;