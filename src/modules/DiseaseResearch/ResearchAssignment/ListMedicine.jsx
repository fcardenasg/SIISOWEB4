import {
    Box,
    Checkbox,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { EmptyState, MotionTableRow } from '../methods';

const ListMedicine = ({ records = [], selectedValues = [], handleToggleSelection, disabled = false }) => {
    const hasRecords = records && records.length > 0;
    const isInteractive = !disabled && typeof handleToggleSelection === 'function';

    return (
        <Box
            sx={{
                width: '100%',
                opacity: disabled ? 0.6 : 1,
                transition: 'opacity 0.2s ease-in-out'
            }}
        >
            <TableContainer
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    overflow: 'hidden'
                }}
            >
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow sx={{ height: 40 }}>
                            <TableCell padding="checkbox" sx={{ width: 48 }} />
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem' }}>
                                Código
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem' }}>
                                Diagnóstico
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {!hasRecords ? (
                                <MotionTableRow
                                    key="empty-row"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <TableCell colSpan={3} sx={{ borderBottom: 0 }}>
                                        <EmptyState
                                            title="Lista de diagnósticos vacía"
                                            description="Aún no hay registros cargados. Los verás aquí detallados una vez realices la búsqueda del empleado en el sistema."
                                        />
                                    </TableCell>
                                </MotionTableRow>
                            ) : (
                                records.map((record, index) => {
                                    const isSelected = selectedValues.includes(record.idMedicinaLaboral);

                                    return (
                                        <MotionTableRow
                                            key={record.idMedicinaLaboral}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.04)' : 'transparent'
                                            }}
                                            transition={{ duration: 0.2, delay: index * 0.03 }}
                                            onClick={() => isInteractive && handleToggleSelection(record.idMedicinaLaboral)}
                                            sx={{
                                                cursor: isInteractive ? 'pointer' : 'default',
                                                height: 56,
                                                '&:last-child td': { border: 0 },
                                                '&:hover': {
                                                    bgcolor: isInteractive ? 'rgba(0, 0, 0, 0.02)' : (isSelected ? 'rgba(25, 118, 210, 0.04)' : 'transparent')
                                                }
                                            }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    size="small"
                                                    disabled={!isInteractive}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={record.dx}
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '6px',
                                                        fontWeight: 600,
                                                        fontSize: '0.7rem',
                                                        bgcolor: isSelected ? 'primary.main' : 'grey.100',
                                                        color: isSelected ? 'white' : 'text.primary',
                                                        filter: !isInteractive && !isSelected ? 'grayscale(0.8)' : 'none',
                                                        transition: 'all 0.2s'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: isSelected ? 600 : 400,
                                                        color: isSelected ? 'primary.main' : 'text.primary',
                                                        transition: 'color 0.2s'
                                                    }}
                                                >
                                                    {record.nombreDx}
                                                </Typography>
                                            </TableCell>
                                        </MotionTableRow>
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