import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Grid, Typography, IconButton, Toolbar, AppBar, Dialog, Button } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogs(props) {

    return (
        <div>
            <Dialog
                fullScreen
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'fixed' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h5" component="div">
                            {props.title}
                        </Typography>

                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid sx={{ pt: 8 }}>
                    {props.children}
                </Grid>
            </Dialog>
        </div>
    );
}