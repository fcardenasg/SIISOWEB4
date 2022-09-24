import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, Container, Grid, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import PaperHomePageTwo from './Paper/PaperHomePageTwo';
import { useState } from 'react';

import {
    IconBrandTwitter,
    IconBrandInstagram,
    IconBrandFacebook,
    IconBrandYoutube,
    IconBrandLinkedin
} from '@tabler/icons';
import { ColorDrummondltd } from 'themes/colors';

const HeaderPage = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <Container>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={gridSpacing}
                sx={{ mt: { xs: 10, sm: 8 }, mb: { xs: 2.5, md: 10 } }}
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
                                        fontSize: { xs: '3rem', sm: '3rem', md: '4rem' },
                                        fontWeight: 900,
                                        lineHeight: 1.4
                                    }}
                                >
                                    <Box component="span" sx={{ ml: 2, color: theme.palette.primary.main }}>
                                        SIAE
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
                                    variant="h6"
                                    component="div"
                                    color="inherit"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '0.8rem' },
                                        fontWeight: 400,
                                        lineHeight: 1.4
                                    }}
                                >
                                    SISTEMA DE INFORMACIÓN Y ATENCIÓN AL EMPLEADO (SIAE)
                                    SERVICIOS INTEGRALES DE SALUD
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
                                </Grid>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" flexItem />


                <Grid item xs={12} md={6.8}>
                    <Grid container spacing={gridSpacing} sx={{ [theme.breakpoints.down('lg')]: { pr: 0 } }}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '1.2rem' },
                                    fontWeight: 900,
                                    lineHeight: 1.4
                                }}
                            >
                                <Box component="span" sx={{ color: theme.palette.primary.main }}>
                                    OPERACIONES MINERAS
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <ul>
                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Dr. Jorge Rivera Morón, celular 315 329 0495; <a href="mailto:jrivera@drummondltd.com">jrivera@drummondltd.com</a>.  Mina Pribbenow.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Dr. Osvaldo Díaz López, celular 317 661 3014; <a href="mailto:odiaz@drummondltd.com">odiaz@drummondltd.com</a>. Mina El Descanso
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Licenciada Yesica López Núñez, celular 315 699 1948; <a href="mailto:jlopez3@drummondltd.com">jlopez3@drummondltd.com</a>.  Ambas minas
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '1.2rem' },
                                    fontWeight: 900,
                                    lineHeight: 1.4
                                }}
                            >
                                <Box component="span" sx={{ color: theme.palette.primary.main }}>
                                    DEPARTAMENTO DE TRANSPORTE
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <ul>
                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Doctor Guillermo Yánez Celular 315721 0577; <a href="mailto:gyanez@drummondltd.com">gyanez@drummondltd.com</a>.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                component="div"
                                color="inherit"
                                sx={{
                                    fontSize: { xs: '1rem', md: '0.8rem' },
                                    fontWeight: 400,
                                    lineHeight: 1.4
                                }}
                            >
                                Dr. José Guerra Añez, Gerente del Departamento de Salud Ocupacional de Drummond Ltd., celular 316 343 6733; <a href="mailto:jguerra@drummondltd.com">jguerra@drummondltd.com</a>. <a target="_blank" href="https://www.drummondltd.com/">www.drummondltd.com</a>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ my: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <a className='text-decoration: none' target="_blank" href="https://twitter.com/DrummondLtdCo">
                                        <IconBrandTwitter color={ColorDrummondltd.RedDrummond} />
                                    </a>
                                </Grid>

                                <Grid item xs={1}>
                                    <a className='text-decoration: none' target="_blank" href="https://www.instagram.com/drummondltdco/">
                                        <IconBrandInstagram color={ColorDrummondltd.RedDrummond} />
                                    </a>
                                </Grid>

                                <Grid item xs={1}>
                                    <a className='text-decoration: none' target="_blank" href="https://www.facebook.com/DrummondLtdCo/">
                                        <IconBrandFacebook color={ColorDrummondltd.RedDrummond} />
                                    </a>
                                </Grid>

                                <Grid item xs={1}>
                                    <a className='text-decoration: none' target="_blank" href="https://www.youtube.com/c/DrummondLtdCo">
                                        <IconBrandYoutube color={ColorDrummondltd.RedDrummond} />
                                    </a>
                                </Grid>

                                <Grid item xs={1}>
                                    <a className='text-decoration: none' target="_blank" href="https://www.linkedin.com/company/drummond-ltd?originalSubdomain=co">
                                        <IconBrandLinkedin color={ColorDrummondltd.RedDrummond} />
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: '1.2rem', sm: '1rem' },
                                    fontWeight: 900,
                                    lineHeight: 1.4
                                }}
                            >
                                <Box component="span" sx={{ color: theme.palette.primary.main }}>
                                    <em>Consejos para prevenir infecciones respiratorias:</em>
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <ul>
                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Lávate las manos de manera adecuada y frecuentemente.
                                    </Typography>
                                </li>

                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        El uso de la mascarilla es obligatorio y permanente cuando tengas síntomas respiratorios.
                                    </Typography>
                                </li>

                                <li>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        color="inherit"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '0.8rem' },
                                            fontWeight: 400,
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Mantén los ambientes ventilados y con buena higiene.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeaderPage;
