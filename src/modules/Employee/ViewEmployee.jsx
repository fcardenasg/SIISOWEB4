import { forwardRef } from 'react';
import { CardContent, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DetailsEmployee from 'components/views/DetailsEmployee';
import CloseIcon from '@mui/icons-material/Close';

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