import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

const HeaderPage = () => {
    const theme = useTheme();

    return (
        <Container>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={gridSpacing}
                sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
            >
                <Grid item xs={12} md={5}>
                    <Grid container spacing={gridSpacing} sx={{ pr: 10, [theme.breakpoints.down('lg')]: { pr: 0, textAlign: 'center' } }}>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.25rem', sm: '3rem', md: '4rem' },
                                        fontWeight: 900,
                                        lineHeight: 1.4
                                    }}
                                >
                                    <Box component="span" sx={{ ml: 2, color: theme.palette.primary.main }}>
                                        <b>&#169;</b> SIISO
                                    </Box>
                                </Typography>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.2
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="div"
                                    color="inherit"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        fontWeight: 400,
                                        lineHeight: 1.4
                                    }}
                                >
                                    Sistema integral de información de salud ocupacional.
                                </Typography>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} sx={{ my: 3.25 }}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.4
                                }}
                            >
                                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Grid item xs={5}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                component={RouterLink}
                                                to="/dashboard/select"
                                                target="_blank"
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Iniciar sesión
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="outlined"
                                                color="primary"
                                            >
                                                SIAE
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    );
};

export default HeaderPage;
