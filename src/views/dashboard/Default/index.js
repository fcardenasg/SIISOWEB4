import { Fragment, useEffect, useState } from 'react';
import Logo from 'ui-component/Logo';

import { Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

import { useTheme, createTheme } from '@mui/material/styles';


const Dashboard = () => {
    const theme = useTheme();

    const themeColor = createTheme({
        palette: {
            error: {
                main: '#E31937',
            },
        },
    });
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Fragment>
            <Grid container justifyContent="left" alignItems="center"
                sx={{ pl: 30, pt: 15, [theme.breakpoints.down('lg')]: { textAlign: 'center' } }}>

                <Grid item xs={4.5}>
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
                                fontSize: { xs: '2.25rem', sm: '3rem', md: '6rem' },
                                fontWeight: 900,
                                lineHeight: 1.4
                            }}
                        >
                            <Box component="span" sx={{ color: themeColor.palette.error.main }}>
                                <b>&#169;</b> SIISO
                            </Box>
                        </Typography>
                    </motion.div>
                </Grid>

                <Grid item xs={4} sx={{ pt: 4 }}>
                    <Grid container justifyContent="left" alignItems="center">
                        <motion.div
                            initial={{ opacity: 0, translateY: 550 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 150,
                                damping: 30
                            }}
                        >
                            <Logo size={40} />
                        </motion.div>
                    </Grid>
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
                                fontSize: { xs: '2rem', md: '1.125rem' },
                                fontWeight: 400,
                                lineHeight: 1.4
                            }}
                        >
                            Sistema integral de información de salud ocupacional.
                        </Typography>
                    </motion.div>
                </Grid>
            </Grid>

            <Grid item sx={{ pt: 36 }} xs={12}>
                <motion.div
                    initial={{ opacity: 0, translateY: 550 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 30,
                        delay: 0.6
                    }}
                >
                    <Grid
                        container
                        alignItems="center"
                        spacing={2}
                        sx={{ [theme.breakpoints.down('lg')]: { display: 'inline-flex', width: 'auto' } }}
                    >
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h6" component="div" color="inherit" sx={{ fontWeight: 400, lineHeight: 1.4 }}>
                                <b>&#169;</b>Copyright 2022 Drummond Ltd. Colombia - V 4.0.
                            </Typography>
                        </Grid>
                    </Grid>
                </motion.div>
            </Grid>
        </Fragment >
    );
};

export default Dashboard;
