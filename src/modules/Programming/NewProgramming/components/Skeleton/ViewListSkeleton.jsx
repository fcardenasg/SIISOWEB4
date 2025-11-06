import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Box,
    Chip,
    LinearProgress,
    Skeleton,
    Typography,
    useTheme,
} from '@mui/material';

const ViewListSkeleton = ({ index }) => {
    const theme = useTheme();
    const avatarSkeleton = (
        <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{
                mr: 2,
                borderRadius: '12px',
                border: '2px solid #f8f8f8',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
        />
    );

    const nameSkeleton = (
        <Skeleton
            variant="text"
            width="70%"
            height={24}
            sx={{
                fontWeight: 'bold',
                fontSize: '1.15rem',
                color: '#1a1a1a',
            }}
        />
    );

    const infoLineSkeleton = (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Skeleton variant="text" width="30%" height={16} />
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Skeleton variant="text" width="20%" height={16} />
            <Typography variant="body2" color="text.secondary">•</Typography>
            <Skeleton variant="text" width="15%" height={16} />
        </Box>
    );

    const iconRowSkeleton = (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', fontSize: '0.92rem', color: '#555' }}>
            {[1, 2, 3].map((i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                    <Skeleton variant="circular" width={16} height={16} />
                    <Skeleton variant="text" width="60px" height={16} />
                </Box>
            ))}
        </Box>
    );

    const statusLabelSkeleton = (
        <Skeleton
            variant="rectangular"
            width={80}
            height={24}
            sx={{
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '0.78rem',
            }}
        />
    );

    const progressBarSkeleton = (
        <Box sx={{ height: 8, borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
            <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
            />
        </Box>
    );

    return (
        <ListItem
            sx={{
                borderRadius: '16px',
                border: '1px solid #f0f0f0',
                mb: 2,
                backgroundColor: '#fff',
                boxShadow: '0 3px 10px rgba(0,0,0,0.03)',
                '&:hover': {
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                    transform: 'translateX(6px)',
                    transition: 'all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                },
            }}
        >
            <ListItemAvatar>
                {avatarSkeleton}
            </ListItemAvatar>

            <ListItemText
                primary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                        {nameSkeleton}

                        <Box sx={{ mt: 1.2, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                            {infoLineSkeleton}
                            {iconRowSkeleton}
                            <Box sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Skeleton variant="text" width="100px" height={16} />
                                    {statusLabelSkeleton}
                                </Box>
                                {progressBarSkeleton}
                            </Box>
                        </Box>
                    </Box>
                }
            />
        </ListItem>
    );
};

export default ViewListSkeleton;