import { useRef, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import PaperHome from 'assets/img/PaperHome.jpg';
import Slide from '@mui/material/Slide';
import { TitleButton } from 'components/helpers/Enums';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaperHomePageTwo({ open, setOpen }) {

    const descriptionElementRef = useRef(null);

    useEffect(() => {
        setTimeout(
            function getTime() {
                if (open) {
                    const { current: descriptionElement } = descriptionElementRef;
                    if (descriptionElement !== null) {
                        descriptionElement.focus();
                    }
                }
            },
            1500);
    }, [open]);

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
                    <Button onClick={() => setOpen(false)}>{TitleButton.Cancelar}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
