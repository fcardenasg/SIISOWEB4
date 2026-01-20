import { Alert, AlertTitle, Typography } from '@mui/material';

const ReasonAlert = ({ reason, observation }) => {
    if (!reason && !observation) return null;

    return (
        <Alert severity="info" sx={{ width: '100%', my: 2 }}>
            <AlertTitle>
                <strong>Motivo:</strong> {reason}
            </AlertTitle>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                {observation}
            </Typography>
        </Alert>
    );
};

export default ReasonAlert;