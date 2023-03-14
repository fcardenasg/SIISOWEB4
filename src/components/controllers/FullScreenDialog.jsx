import * as React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Grid, Typography, IconButton, Toolbar, AppBar, Dialog } from '@mui/material';
import { ColorDrummondltd } from 'themes/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, handleClose, title, children }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'fixed' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h5" component="div">
                        {title}
                    </Typography>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Grid sx={{ pt: 8 }}>
                {children}
            </Grid>
        </Dialog>
    );
}

export default FullScreenDialog;

FullScreenDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    handleClose: PropTypes.func,
    children: PropTypes.node,
};