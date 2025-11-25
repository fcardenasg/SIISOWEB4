import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Box,
    Chip,
    Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';

const ViewListSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <ListItem
                sx={{
                    borderRadius: '16px',
                    border: '1px solid #f0f0f0',
                    mb: 2,
                    backgroundColor: '#fff',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.03)',
                }}
                secondaryAction={
                    <Skeleton variant="circular" width={32} height={32} />
                }
            >
                <ListItemAvatar>
                    <Skeleton
                        variant="rounded"
                        width={120}
                        height={120}
                        sx={{
                            borderRadius: '12px',
                            mr: 2,
                        }}
                    />
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                <Skeleton width={180} height={40} />

                                <Skeleton variant="rounded" width={100} height={25} sx={{ borderRadius: '16px' }} />
                                <Skeleton variant="rounded" width={100} height={25} sx={{ borderRadius: '16px' }} />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                <Skeleton variant="circular" width={35} height={35} />
                                <Skeleton width={80} height={40} />
                            </Box>
                        </Box>
                    }
                    secondary={
                        <Box sx={{ mt: 1.2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Skeleton width="95%" height={30} />

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Skeleton width={150} height={20} />
                                <Skeleton width={150} height={20} />
                                <Skeleton width={150} height={20} />
                                <Skeleton width={150} height={20} />
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Skeleton width={110} height={20} />
                                    <Skeleton variant="rounded" width={80} height={24} />
                                </Box>

                                <Skeleton variant="rounded" width="100%" height={14} />
                            </Box>
                        </Box>
                    }
                />
            </ListItem>
        </motion.div>
    );
};

export default ViewListSkeleton;