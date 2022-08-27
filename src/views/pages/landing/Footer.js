// material-ui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

// styles
const FooterWrapper = styled('div')(({ theme }) => ({
    padding: '35px 0',
    color: '#fff',
    background: theme.palette.secondary.main,
    [theme.breakpoints.down('md')]: {
        textAlign: 'center'
    }
}));

const FooterSubWrapper = styled('div')(({ theme }) => ({
    padding: '20px 0',
    color: '#fff',
    background: theme.palette.secondary.dark,
    [theme.breakpoints.down('md')]: {
        textAlign: 'center'
    }
}));

// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterPage = () => {

    return (
        <>
            <FooterWrapper>
                <></>
            </FooterWrapper>
            <FooterSubWrapper>
                <Container>
                    <Typography variant="subtitle2" component="div" color="inherit">
                        &#169; SIISO
                    </Typography>
                </Container>
            </FooterSubWrapper>
        </>
    );
};

export default FooterPage;
