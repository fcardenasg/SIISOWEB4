import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid, Switch, Typography } from '@mui/material';

// ================================|| UI LIST - RADIO ||================================ //

export default function RadioList() {
    const theme = useTheme();
    const [sdm, setSdm] = useState(true);
    const [notification, setNotification] = useState(false);

    return (
        <></>
    );
}
