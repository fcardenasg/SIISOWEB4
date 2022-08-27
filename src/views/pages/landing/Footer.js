// material-ui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { Fragment } from 'react';

// styles
const FooterWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    width: '100%',

    padding: '20px 0',
    color: '#fff',
    background: theme.palette.secondary.main,
    [theme.breakpoints.down('md')]: {
        textAlign: 'center'
    }
}));


// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterPage = () => {

    return (
        <Fragment>
            <FooterWrapper>
                <Container>
                    <Typography variant="h3" component="div" color="inherit">
                        &#169; SIISO
                    </Typography>
                </Container>
            </FooterWrapper>
        </Fragment>
    );
};

export default FooterPage;
