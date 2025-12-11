import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ title, urlBack }) => {
    const navigate = useNavigate();

    return (
        <Grid container alignItems="center" spacing={2} sx={{ mb: 2.5 }}>
            <Grid item>
                <IconButton
                    onClick={() => navigate(urlBack)}
                    size="small"
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                            transform: 'scale(1.05)',
                            transition: 'all 0.2s ease-out',
                        },
                        transition: 'transform 0.2s ease',
                    }}
                >
                    <ChevronLeftIcon fontSize="small" />
                </IconButton>
            </Grid>

            <Grid item xs>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                        lineHeight: 1.2,
                        letterSpacing: '-0.5px'
                    }}
                >
                    {title}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NavigationBar