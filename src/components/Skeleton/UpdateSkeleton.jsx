import { Grid, Skeleton, Divider } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';

const UpdateSkeleton = () => {
    return (
        <Grid container spacing={2}>
            {/* ViewEmployee Skeleton */}
            <Grid item xs={12}>
                <SubCard
                    title={<Skeleton variant="text" width={200} height={30} />}
                    secondary={
                        <Grid container spacing={2} alignItems="center" sx={{ width: 400 }}>
                            <Grid item xs={4}>
                                <Skeleton variant="rectangular" height={30} width="100%" sx={{ borderRadius: 1 }} />
                            </Grid>
                            <Grid item xs={8}>
                                <Skeleton variant="rectangular" height={30} width="100%" sx={{ borderRadius: 1 }} />
                            </Grid>
                        </Grid>
                    }
                >
                    <Grid container spacing={2}>
                        {/* Avatar Column */}
                        <Grid item xs={12} md={3.2} display="flex" justifyContent="center" alignItems="center">
                            <Skeleton variant="circular" width={170} height={170} />
                        </Grid>

                        {/* Details Column */}
                        <Grid item xs={12} md={8.8}>
                            <Grid container spacing={1}>
                                {/* Top Row: Document, Name, Chip, Profession, Edit */}
                                <Grid item xs={12} sx={{ pb: 4 }}>
                                    <Grid container alignItems="center" spacing={3}>
                                        <Grid item xs={12} md={2}>
                                            <Skeleton variant="text" height={50} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={9}>
                                                    <Skeleton variant="text" height={40} />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Skeleton variant="rectangular" height={24} width={80} sx={{ borderRadius: 1 }} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Skeleton variant="text" height={30} width="80%" />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Middle Row: Roster, Sede, Contract Date */}
                                <Grid item xs={12} sx={{ pb: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Skeleton variant="text" height={25} width="60%" />
                                            <Skeleton variant="text" height={30} width="80%" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Skeleton variant="text" height={25} width="60%" />
                                            <Skeleton variant="text" height={30} width="80%" />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Skeleton variant="text" height={25} width="60%" />
                                            <Skeleton variant="text" height={30} width="80%" />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ pb: 1 }}>
                                    <Divider />
                                </Grid>

                                {/* Detailed Info Grid (3x3 approx) */}
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        {[...Array(9)].map((_, index) => (
                                            <Grid item xs={12} md={4} key={`detail-${index}`}>
                                                <Grid container alignItems="center">
                                                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                                                    <Skeleton variant="text" width="80%" />
                                                </Grid>
                                                <Skeleton variant="text" width="60%" sx={{ ml: 4 }} />
                                                <Divider sx={{ mt: 1 }} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>

                                {/* Accordion Placeholder */}
                                <Grid item xs={12} sx={{ pt: 1.5 }}>
                                    <Skeleton variant="rectangular" height={40} width="100%" sx={{ borderRadius: 1 }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            {/* Generic Form Fields Skeleton (Existing) */}
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={2}>
                        {/* Row 1 */}
                        {[...Array(4)].map((_, index) => (
                            <Grid item xs={12} md={6} lg={3} key={`row1-${index}`}>
                                <Skeleton variant="rectangular" height={53} width="100%" sx={{ borderRadius: 1 }} />
                            </Grid>
                        ))}

                        {/* Row 2 */}
                        {[...Array(4)].map((_, index) => (
                            <Grid item xs={12} md={6} key={`row2-${index}`}>
                                <Skeleton variant="rectangular" height={53} width="100%" sx={{ borderRadius: 1 }} />
                            </Grid>
                        ))}

                        {/* Row 3 - Multiselects/Larger fields */}
                        {[...Array(2)].map((_, index) => (
                            <Grid item xs={12} md={6} key={`row3-${index}`}>
                                <Skeleton variant="rectangular" height={53} width="100%" sx={{ borderRadius: 1 }} />
                            </Grid>
                        ))}

                        {/* Large Section */}
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <SubCard title={<Skeleton variant="text" width={300} />}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} lg={2}>
                                        <Skeleton variant="rectangular" height={53} width="100%" sx={{ borderRadius: 1 }} />
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={9}>
                                        <Skeleton variant="rectangular" height={53} width="100%" sx={{ borderRadius: 1 }} />
                                    </Grid>
                                    <Grid item xs={12} md={1.5} lg={1}>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Skeleton variant="rectangular" height={100} width="100%" sx={{ borderRadius: 1 }} />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Skeleton variant="rectangular" height={40} width="100%" sx={{ borderRadius: 1 }} />
                                </Grid>
                                <Grid item xs={2}>
                                    <Skeleton variant="rectangular" height={40} width="100%" sx={{ borderRadius: 1 }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default UpdateSkeleton;
