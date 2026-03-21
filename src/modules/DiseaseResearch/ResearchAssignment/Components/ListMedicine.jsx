import React from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
    Box, Checkbox, Chip, IconButton, Paper,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Tooltip, Typography
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyState } from '../../methods';

const cellStyle = (isSelected) => ({
    fontSize: '0.8rem',
    py: 1.5,
    color: isSelected ? 'secondary.main' : 'text.primary',
    fontWeight: isSelected ? 600 : 400,
    transition: 'all 0.2s ease'
});

const ListMedicine = ({ records = [], selectedValues = [], handleToggleSelection, handleOpenEdit }) => {
    const hasRecords = records && records.length > 0;

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}
            >
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" sx={{ bgcolor: '#F8FAFC' }} />
                            {['Dx', 'Diagnóstico', 'Inv.', 'JRC', 'JNC', 'AFP', 'Asesor ARL', ''].map((head) => (
                                <TableCell
                                    key={head}
                                    sx={{
                                        bgcolor: '#F8FAFC',
                                        py: 1.5,
                                        fontWeight: 800,
                                        color: 'text.secondary',
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.05rem'
                                    }}
                                >
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {!hasRecords ? (
                                <TableRow>
                                    <TableCell colSpan={9} sx={{ py: 10 }}>
                                        <EmptyState
                                            title="Lista de diagnósticos vacía"
                                            description="Realiza una búsqueda para visualizar los registros aquí detallados."
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                records.map((record) => {
                                    const isSelected = selectedValues.includes(record.idMedicinaLaboral);

                                    return (
                                        <TableRow
                                            key={record.idMedicinaLaboral}
                                            component={motion.tr}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            hover
                                            sx={{
                                                cursor: "pointer",
                                                bgcolor: isSelected ? 'rgba(156, 39, 176, 0.04)' : 'transparent',
                                                '&:hover': { bgcolor: isSelected ? 'rgba(156, 39, 176, 0.08) !important' : 'rgba(0,0,0,0.02)' }
                                            }}
                                        >
                                            <TableCell padding="checkbox" onClick={() => handleToggleSelection(record.idMedicinaLaboral)}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    size="small"
                                                    sx={{ color: 'divider', '&.Mui-checked': { color: 'secondary.main' } }}
                                                />
                                            </TableCell>

                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)}>
                                                <Chip
                                                    label={record.dx}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 900,
                                                        fontSize: '0.6rem',
                                                        borderRadius: '4px',
                                                        bgcolor: isSelected ? 'secondary.main' : 'grey.200',
                                                        color: isSelected ? 'white' : 'text.primary',
                                                        height: 20
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ maxWidth: 400 }}>
                                                <Typography sx={{ ...cellStyle(isSelected), noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {record.nombreDx}
                                                </Typography>
                                            </TableCell>

                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)}>
                                                <Typography sx={{
                                                    ...cellStyle(isSelected),
                                                    color: record.investigado === 'SI' ? 'success.main' : isSelected ? 'secondary.main' : 'text.secondary',
                                                    fontWeight: 700
                                                }}>
                                                    {record.investigado}
                                                </Typography>
                                            </TableCell>

                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={cellStyle(isSelected)}>{record.noDictamenJRC || '-'}</TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={cellStyle(isSelected)}>{record.noDictamenJNC || '-'}</TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={cellStyle(isSelected)}>{record.noDictamenAFP || '-'}</TableCell>

                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ ...cellStyle(isSelected), textTransform: 'capitalize' }}>
                                                {record?.asesorARL?.toLowerCase()}
                                            </TableCell>

                                            <TableCell align="center" sx={{ maxWidth: 50 }}>
                                                <Tooltip arrow title="Editar Medicina Laboral" placement="left">
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => { e.stopPropagation(); handleOpenEdit(record); }}
                                                        sx={{
                                                            bgcolor: 'primary.lighter',
                                                            color: 'primary.main',
                                                            '&:hover': { bgcolor: 'primary.main', color: 'white' }
                                                        }}
                                                    >
                                                        <EditTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListMedicine;