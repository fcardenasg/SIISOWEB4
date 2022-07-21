import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
} from '@mui/material';

import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);


const DialogFormula = ({ open, handleCloseDialog, children, title }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-child(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 300,
                        maxHeight: '100%'
                    }
                }
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                    {children}
                </Grid>
            </DialogContent>

            <DialogActions>
                <AnimateButton>
                    <Button variant="text" color="error" onClick={handleCloseDialog}>
                        Close
                    </Button>
                </AnimateButton>
            </DialogActions>
        </Dialog>
    );
};

DialogFormula.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    children: PropTypes.any,
    title: PropTypes.string,
};

export default DialogFormula;