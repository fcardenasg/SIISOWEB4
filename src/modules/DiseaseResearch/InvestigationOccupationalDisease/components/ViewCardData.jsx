// File: ViewCardData.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Box, Button, Divider, Chip, Grid, Menu, MenuItem, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import {
    PersonOutline as PersonOutlineIcon,
    CalendarToday as CalendarTodayIcon,
    Business as BusinessIcon,
    AccessTime as AccessTimeIcon,
    Visibility as VisibilityIcon,
    Cancel as CancelIcon,
    MoreVert as MoreVertIcon,
    Download as DownloadIcon,
    Print as PrintIcon,
    Delete as DeleteIcon,
    ContentPasteSearch as ContentPasteSearchIcon,
    CheckCircle as CheckCircleIcon,
    HourglassEmpty as HourglassEmptyIcon,
    PendingActions as PendingActionsIcon,
} from '@mui/icons-material';
import InvestigationProgress from './InvestigationProgress';
import { OptionsMenuCard } from './OptionsMenu';
import { getStatusConfig } from './methods';

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 100,
        },
    }),
};

const ViewCardData = ({ dataInfo = {}, index }) => {
    const statusConfig = getStatusConfig(dataInfo.estadoInvestigacion);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            custom={index}
            variants={variants}
        >
            <Card
                sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        transform: 'translateY(-2px) scale(1.01)',
                        transition: 'all 0.3s ease',
                    },
                }}
            >
                <CardHeader
                    action={<OptionsMenuCard idAsignacion={dataInfo.id} />}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textAlign: 'center',
                        py: 3,
                        position: 'relative',
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
                    <Box
                        sx={{
                            width: 90,
                            height: 90,
                            flexShrink: 0,
                        }}
                    >
                        <Avatar
                            src={dataInfo.foto}
                            alt={dataInfo.nombreEmpleado}
                            sx={{
                                width: '100%',
                                height: '100%',
                                fontSize: '2rem',
                                border: '2px solid white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                borderRadius: '16px',
                            }}
                        >
                            {dataInfo.nombreEmpleado?.charAt(0)}
                        </Avatar>
                    </Box>
                </Box>

                <CardContent sx={{ p: 2.5, pt: 0, position: 'relative', top: '-28px', mb: -4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>C.C.</Typography>
                        <Typography variant="body2" color="text.secondary">{dataInfo.documento}</Typography>
                    </Box>

                    <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                        {dataInfo.nombreEmpleado}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">{dataInfo.nombreSexo}</Typography>
                        <Typography variant="body2" color="text.secondary">{dataInfo.edad} años</Typography>
                    </Box>

                    <InvestigationProgress config={statusConfig} />

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarTodayIcon sx={{ color: '#757575', fontSize: '14px' }} />
                                <Typography variant="caption" color="text.secondary">Sede:</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="medium">{dataInfo.nombreSede}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <BusinessIcon sx={{ color: '#757575', fontSize: '14px' }} />
                                <Typography variant="caption" color="text.secondary">EPS:</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="medium">{dataInfo.nombreEPS}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTimeIcon sx={{ color: '#757575', fontSize: '14px' }} />
                                <Typography variant="caption" color="text.secondary">Roster position:</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="medium">{dataInfo?.nombreRoster}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ViewCardData;