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
    background: '#fafafa',
    color: '#fff',
    textAlign: 'center'
}));

const FooterPage = () => {

    return (
        <Fragment>
            <FooterWrapper>
                <Container>
                    <Typography variant="h6" component="div" sx={{ color: ColorDrummondltd.GrayDrummond, }}>
                        <b>&#169;</b>Copyright 2022 Drummond Ltd. Colombia - V 4.0.
                        Departamento de salud ocupacional
                    </Typography>
                </Container>
            </FooterWrapper>
        </Fragment>
    );
};

export default FooterPage;
