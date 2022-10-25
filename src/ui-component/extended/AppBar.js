import { cloneElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Button,
    Container,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useScrollTrigger
} from '@mui/material';

import Logo from 'ui-component/Logo';
import { ColorDrummondltd } from 'themes/colors';

function ElevationScroll({ children, window }) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window
    });
    const darkBorder = theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200];

    return cloneElement(children, {
        elevation: trigger ? 2 : 0,
        style: {
            backgroundColor: theme.palette.background.default,
            borderBottom: trigger ? 'none' : '1px solid',
            borderColor: trigger ? '' : darkBorder,
            color: theme.palette.text.dark
        }
    });
}

const AppBar = ({ ...others }) => {
    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar>
                        <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <Logo size={120} />
                        </Typography>
                        
                        <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>
                            <Tooltip title="SISTEMA DE INFORMACIÓN Y ATENCIÓN AL EMPLEADO">
                                <Button variant="outlined" color="error" size="large"
                                    sx={{ color: ColorDrummondltd.RedDrummond }}
                                    component={RouterLink} to="siae" target="_blank">
                                    SIAE
                                </Button>
                            </Tooltip>
                        </Stack>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
