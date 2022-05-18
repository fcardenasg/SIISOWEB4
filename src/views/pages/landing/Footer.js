// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Container, Link, Typography } from '@mui/material';

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
                <Container>
                    {/* <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs={12} sm={4}>
                            <img src={logoDark} alt="Berry" width="100" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Grid
                                container
                                alignItems="center"
                                spacing={2}
                                sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('md')]: { justifyContent: 'center' } }}
                            >
                                <Grid item>
                                    <FooterLink href="https://blog.berrydashboard.io/" target="_blank" underline="hover">
                                        <InstagramIcon />
                                        Blog
                                    </FooterLink>
                                </Grid>
                                <Grid item>
                                    <FooterLink href="https://www.facebook.com/codedthemes" target="_blank" underline="hover">
                                        <FacebookIcon />
                                        Facebook
                                    </FooterLink>
                                </Grid>
                                <Grid item>
                                    <FooterLink href="https://twitter.com/codedthemes" target="_blank" underline="hover">
                                        <TwitterIcon />
                                        Twitter
                                    </FooterLink>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Container>
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
