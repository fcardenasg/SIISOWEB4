// material-ui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ColorDrummondltd } from 'themes/colors';

// styles
const FooterWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    width: '100%',

    padding: '20px 0',
    color: '#fff',
    background: ColorDrummondltd.GrayDrummond,
    textAlign: 'center'
}));


// ==============================|| LANDING - FOOTER PAGE ||============================== //

const FooterPage = () => {

    return (
        <Fragment>
            <FooterWrapper>
                <Container>
                    <Typography variant="h5" component="div" color="inherit">
                        <b>&#169;</b>Copyright 2022 Drummond Ltd. Colombia - V 4.0.
                        Departamento de salud ocupacional
                    </Typography>
                </Container>
            </FooterWrapper>
        </Fragment>
    );
};

export default FooterPage;
