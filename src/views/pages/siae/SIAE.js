import { Fragment } from "react";
import { styled } from '@mui/material/styles';

import Header from './Header';
import Footer from './Footer';
import AppBar from 'ui-component/extended/AppBar';
import PaperHomePage from './Paper/PaperHomePage';

const HeaderWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    minHeight: '100%',

    paddingTop: 30,
    overflowX: 'hidden',
    overflowY: 'clip',
    [theme.breakpoints.down('md')]: {
        paddingTop: 42
    }
}));

const SIAE = () => (
    <Fragment>

        <HeaderWrapper id="home">
            <AppBar />
            <Header />
        </HeaderWrapper>

        <Footer />
    </Fragment>
)

export default SIAE;