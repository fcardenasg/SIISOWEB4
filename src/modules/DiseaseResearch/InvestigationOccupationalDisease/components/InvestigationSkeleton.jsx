import { Card, CardContent, Divider, Grid, Skeleton } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

const InvestigationSkeleton = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title={<Skeleton width={300} height={24} />}>
                    <Grid container spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
                        <Grid item xs={12} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Skeleton variant="rectangular" width={170} height={170} sx={{ borderRadius: "8px" }} />
                        </Grid>

                        <Grid item xs={12} md={8} lg={9} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Skeleton width={300} height={40} />
                                </Grid>
                                <Grid item>
                                    <Skeleton width={80} height={32} sx={{ borderRadius: "16px" }} />
                                </Grid>
                            </Grid>

                            <Skeleton width={200} height={24} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}><Skeleton width="100%" height={60} /></Grid>
                                <Grid item xs={12} md={6} lg={4}><Skeleton width="100%" height={60} /></Grid>
                                <Grid item xs={12} md={6} lg={4}><Skeleton width="100%" height={60} /></Grid>
                            </Grid>

                            <Divider sx={{ my: 1 }} />

                            <Grid container spacing={1}>
                                {[...Array(9)].map((_, index) => (
                                    <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: "flex", gap: 0.5 }}>
                                        <Skeleton width={100} height={24} />
                                        <Skeleton width={150} height={24} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                {[1, 2, 3, 4, 5].map((item) => (
                    <Card key={item} sx={{ mb: 2 }}>
                        <CardContent>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </Grid>
                                <Grid item xs>
                                    <Skeleton variant="text" height={30} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
    );
};

export default InvestigationSkeleton;
