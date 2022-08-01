import { Typography, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Fragment } from 'react';
import SubCard from 'ui-component/cards/SubCard';


const SkeletonMedical = () => (
    <Fragment>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                    <Grid container justifyContent="left" alignItems="center" spacing={2}>

                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item xs={2}>
                                    <Skeleton variant="circular" width={80} height={80} />
                                </Grid>

                                <Grid item xs={2}>
                                    <Skeleton variant="rectangular" height={44} />
                                </Grid>

                                <Grid item xs={5}>
                                    <Skeleton variant="text" height={40} />
                                    <Grid container spacing={1} direction="row" justifyContent="left" alignItems="center">
                                        <Grid item xs={4}>
                                            <Skeleton variant="text" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Skeleton variant="text" />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={3}>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Skeleton variant="rectangular" height={44} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Skeleton variant="rectangular" height={120} />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Skeleton variant="text" height={70} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Skeleton variant="text" height={70} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    </Fragment>
);

export default SkeletonMedical;
