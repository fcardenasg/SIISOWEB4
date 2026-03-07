import {
    Box, Checkbox, Chip, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Tooltip, Stack, Paper, IconButton,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import { EmptyState } from '../../methods';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        padding: '12px',
        border: `1px solid ${theme.palette.divider}`,
    },
    [`& .MuiTooltip-arrow`]: {
        color: theme.palette.background.paper,
        "&::before": { border: `1px solid ${theme.palette.divider}` }
    },
}));

const ListMedicine = ({ records = [], selectedValues = [], handleToggleSelection, handleOpenEdit }) => {
    const hasRecords = records && records.length > 0;

    const renderExpertsTooltip = (expertos) => (
        <Stack spacing={1} sx={{ minWidth: 160 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                Detalle de Asesores
            </Typography>
            <Divider />
            {expertos.map((exp, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
                    <Typography sx={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{exp.label?.toLowerCase()}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, bgcolor: 'grey.100', px: 0.8, borderRadius: 0.5 }}>
                        {exp.value}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '12px' }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                        <TableRow>
                            <TableCell padding="checkbox" />
                            {['Código', 'Diagnóstico', 'Inv.', 'JRC', 'JNC', 'AFP', 'Asesor ARL', ''].map((head) => (
                                <TableCell key={head} sx={{ py: 1.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem' }}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ position: 'relative' }}>
                        <AnimatePresence mode="popLayout" initial={false}>
                            {!hasRecords ? (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <EmptyState
                                            title="Lista de diagnósticos vacía"
                                            description="Aún no hay registros cargados. Los verás aquí detallados una vez realices la búsqueda."
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                records.map((record, index) => {
                                    const isSelected = selectedValues.includes(record.idMedicinaLaboral);

                                    return (
                                        <TableRow sx={{ cursor: "pointer" }}>
                                            <TableCell padding="checkbox" onClick={() => handleToggleSelection(record.idMedicinaLaboral)}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    size="small"
                                                    sx={{ '&.Mui-checked': { color: 'secondary.main' } }}
                                                />
                                            </TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)}>
                                                <Chip
                                                    label={record.dx}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 800,
                                                        fontSize: '0.65rem',
                                                        borderRadius: '6px',
                                                        bgcolor: isSelected ? 'secondary.main' : 'grey.100',
                                                        color: isSelected ? 'white' : 'text.primary',
                                                        transition: 'all 0.2s'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ fontSize: '0.8rem', fontWeight: isSelected ? 600 : 400, color: isSelected ? 'secondary.main' : 'inherit' }}>
                                                {record.nombreDx}
                                            </TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ fontSize: '0.8rem', fontWeight: isSelected ? 600 : 400, color: isSelected ? 'secondary.main' : 'inherit' }}>
                                                {record.investigado || "NO"}
                                            </TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ fontSize: '0.8rem' }}>{record.noDictamenJRC || '-'}</TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ fontSize: '0.8rem' }}>{record.noDictamenJNC || '-'}</TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ fontSize: '0.8rem' }}>{record.noDictamenAFP || '-'}</TableCell>
                                            <TableCell onClick={() => handleToggleSelection(record.idMedicinaLaboral)} sx={{ textTransform: 'capitalize' }}>
                                                {record?.asesorARL?.toLowerCase()}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip
                                                    disableInteractive
                                                    placement="top"
                                                    title="Ir a Medicina Laboral"
                                                >
                                                    <IconButton size="large" onClick={() => handleOpenEdit(record)}>
                                                        <EditTwoToneIcon sx={{ fontSize: '1.3rem', color: 'primary.main' }} />
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