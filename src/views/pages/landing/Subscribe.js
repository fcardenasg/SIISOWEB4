// material-ui
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';


// styles
const SubscribeWrapper = styled('div')(({ theme }) => {
    const darkColorRTL =
        theme.palette.mode === 'dark'
            ? `linear-gradient(270deg, ${theme.palette.dark.main} 65%, ${theme.palette.dark.dark} 65%)`
            : `linear-gradient(270deg, ${theme.palette.primary.light} 65%, #fff 65%)`;
    const darkColor =
        theme.palette.mode === 'dark'
            ? `linear-gradient(90deg, ${theme.palette.dark.main} 65%, ${theme.palette.dark.dark} 65%)`
            : `linear-gradient(90deg, ${theme.palette.primary.light} 65%, #fff 65%)`;

    const darkColorRTL0 =
        theme.palette.mode === 'dark'
            ? `linear-gradient(0deg, ${theme.palette.dark.main} 65%, ${theme.palette.dark.dark} 65%)`
            : `linear-gradient(0deg, ${theme.palette.primary.light} 65%, #fff 65%)`;
    const darkColor0 =
        theme.palette.mode === 'dark'
            ? `linear-gradient(0deg, ${theme.palette.dark.main} 65%, ${theme.palette.dark.dark} 65%)`
            : `linear-gradient(0deg, ${theme.palette.primary.light} 65%, #fff 65%)`;
    return {
        padding: '100px 0',
        background: theme.direction === 'rtl' ? darkColorRTL : darkColor,

        [theme.breakpoints.down('lg')]: {
            padding: '50px 0',
            background: theme.direction === 'rtl' ? darkColorRTL0 : darkColor0
        }
    };
});


// ============================|| LANDING - SUBSCRIBE PAGE ||============================ //

const Subscribe = () => {

    return (
        <SubscribeWrapper>
            <Container>
                <Grid container alignItems="center" spacing={gridSpacing}>

                </Grid>
            </Container>
        </SubscribeWrapper>
    );
};

export default Subscribe;
