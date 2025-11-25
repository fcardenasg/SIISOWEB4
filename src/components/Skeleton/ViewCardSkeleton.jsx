import { Card, CardHeader, CardContent, Skeleton, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 120,
            damping: 15,
        },
    }),
};

const ViewCardSkeleton = ({ index = 0 }) => {
    return (
        <motion.div initial="hidden" animate="visible" custom={index} variants={variants}>
            <Card
                sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0',
                    position: 'relative',
                }}
            >
                <CardHeader
                    title={<Skeleton width={80} height={28} variant="rounded" />}
                    action={<Skeleton variant="circular" width={32} height={32} />}
                    sx={{
                        background: 'rgba(0,0,0,0.05)',
                        py: 2.5,
                        px: 2,
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                        top: '-45px',
                        zIndex: 1,
                    }}
                >
                    <Box sx={{ width: 90, height: 90 }}>
                        <Skeleton variant="rounded" width="100%" height="100%" sx={{ borderRadius: '16px' }} />
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            right: 16,
                            bottom: 0,
                        }}
                    >
                        <Skeleton variant="circular" width={35} height={35} />
                    </Box>
                </Box>

                <CardContent sx={{ p: 2.5, pt: 0, position: 'relative', top: '-28px', mb: -4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <Skeleton variant="rounded" width={140} height={32} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <Skeleton width={100} height={20} />
                    </Box>
                    <Skeleton width="70%" height={28} sx={{ mx: 'auto' }} />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        <Skeleton width={80} height={20} />
                        <Skeleton width={50} height={20} />
                    </Box>

                    <Skeleton variant="rounded" width="100%" height={12} />

                    <Grid container spacing={1} sx={{ mt: 2 }}>
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <Grid item xs={i === 4 ? 12 : 6} key={i}>
                                <Skeleton width={90} height={18} />
                                <Skeleton width="80%" height={22} />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ViewCardSkeleton;