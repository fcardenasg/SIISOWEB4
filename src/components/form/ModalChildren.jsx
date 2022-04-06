import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    CardContent,
    IconButton,
    Fade,
    Backdrop
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        margin: 'auto'
    };
}

const ModalChildren = ({ open, onClose, title, children }) => {
    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title={title}
                    content={false}
                    secondary={
                        <IconButton onClick={onClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        {children}
                    </CardContent>
                </MainCard>
            </Fade>
        </Modal>
    );
}

export default ModalChildren;

ModalChildren.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node,
};