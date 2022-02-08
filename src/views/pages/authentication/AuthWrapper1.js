// material-ui
import { styled, createTheme } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const theme = createTheme({
    palette: {
        primary: {
            main: '#E31937',
        },
    },
});

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[300],
    minHeight: '100vh'
}));

export default AuthWrapper1;