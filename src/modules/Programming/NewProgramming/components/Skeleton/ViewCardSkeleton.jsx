import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
    Skeleton,
} from '@mui/material';

const ViewCardSkeleton = ({ index }) => {
    const headerSkeleton = <Skeleton variant="rectangular" height={100} />;
    const avatarSkeleton = <Skeleton variant="circular" width={90} height={90} />;
    const textSkeleton = <Skeleton variant="text" width="100%" height={24} />;
    const textSkeletonSmall = <Skeleton variant="text" width="100%" height={16} />;
    const progressSkeleton = <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: '4px', mb: 2 }} />;
    const gridItemSkeleton = <Skeleton variant="rectangular" width="100%" height={30} sx={{ borderRadius: '4px' }} />;

    return (
        <Card
            sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
            }}
        >
            {/* Skeleton for CardHeader */}
            <CardHeader
                action={<Skeleton variant="rectangular" width={30} height={30} />}
                sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    textAlign: 'center',
                    py: 3,
                }}
            />

            {/* Skeleton for Avatar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    top: '-45px',
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        width: 90,
                        height: 90,
                        flexShrink: 0,
                    }}
                >
                    {avatarSkeleton}
                </Box>
            </Box>

            {/* Skeleton for CardContent */}
            <CardContent sx={{ p: 2.5, pt: 0, position: 'relative', top: '-28px', mb: -4 }}>
                {/* Document Info Skeleton */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    {textSkeletonSmall}
                    {textSkeletonSmall}
                </Box>

                {/* Name Skeleton */}
                {textSkeleton}

                {/* Sex & Age Skeleton */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    {textSkeletonSmall}
                    {textSkeletonSmall}
                </Box>

                {/* Progress Bar Skeleton */}
                {progressSkeleton}

                {/* Divider Skeleton */}
                <Divider sx={{ my: 2 }} />

                {/* Grid Items Skeleton */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {gridItemSkeleton}
                        {gridItemSkeleton}
                    </Grid>
                    <Grid item xs={6}>
                        {gridItemSkeleton}
                        {gridItemSkeleton}
                    </Grid>
                    <Grid item xs={12}>
                        {gridItemSkeleton}
                        {gridItemSkeleton}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ViewCardSkeleton;