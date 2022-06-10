import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

// material-ui
import { Button, CardContent, Grid, IconButton, Modal } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DetailsEmployee from 'components/views/DetailsEmployee';

// assets
import CloseIcon from '@mui/icons-material/Close';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        margin: 'auto'
    };
}

const BodyEmployee = forwardRef(({ modalStyle, IdEmployee, handleClose }, ref) => (

    <div ref={ref} tabIndex={-1}>

        <MainCard
            style={modalStyle}
            sx={{
                position: 'absolute',
                width: { xs: 300, lg: 350 },
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            title="Detalles de Empleados"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <DetailsEmployee id={IdEmployee} />
            </CardContent>
        </MainCard>
    </div>
));

export default BodyEmployee;

BodyEmployee.propTypes = {
    modalStyle: PropTypes.object,
    handleClose: PropTypes.func,
    IdEmployee: PropTypes.string
};