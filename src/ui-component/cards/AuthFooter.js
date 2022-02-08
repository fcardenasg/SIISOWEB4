// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://www.drummondltd.com/" target="_blank" underline="hover">
            www.drummondltd.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://www.drummondltd.com/" target="_blank" underline="hover">
            ©️ Copyright 2022 Drummond Ltd. Colombia - V 4.0 ©️ 2024
        </Typography>
    </Stack>
);

export default AuthFooter;
