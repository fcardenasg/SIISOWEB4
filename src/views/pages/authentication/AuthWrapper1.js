// material-ui
import { styled } from '@mui/material/styles';

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[300],
    minHeight: '100vh'
}));

export default AuthWrapper1;