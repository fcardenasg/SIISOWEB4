import { Grid, Typography } from '@mui/material';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import { useTheme } from '@mui/material/styles';

const ViewTrafficLight = ({ title1, title2, title3, success = false }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2} sx={{ pb: 2, pl: 4, display: 'flex', alignItems: 'center' }}>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <RadioButtonCheckedTwoToneIcon sx={{ color: success ? theme.palette.success.main : theme.palette.warning.main, mr: 1 }} />
                <Typography variant="h5">{title1}</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.dark, mr: 1 }} />
                <Typography variant="h5">{title2}</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                <RadioButtonCheckedTwoToneIcon color='error' sx={{ mr: 1 }} />
                <Typography variant="h5">{title3}</Typography>
            </Grid>
        </Grid>
    );
};

export default ViewTrafficLight;