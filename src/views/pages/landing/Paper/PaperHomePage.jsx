import { useState, useRef, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import PaperHome from 'assets/img/PaperHome.jpg';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaperHomePage() {
    const [open, setOpen] = useState(false);

    const descriptionElementRef = useRef(null);
    useEffect(() => {

        setTimeout(
            function getTime() {
                setOpen(true);

                if (open) {
                    const { current: descriptionElement } = descriptionElementRef;
                    if (descriptionElement !== null) {
                        descriptionElement.focus();
                    }
                }
            },
            1500);
    }, []);

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                transitionDuration={1500}
                keepMounted
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <img src={PaperHome} height='500' />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
