import {
    Close as CloseIcon,
    InfoOutlined
} from '@mui/icons-material';
import {
    Box,
    Divider,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    styled,
    tooltipClasses,
} from '@mui/material';
import { UpperFirstChar } from 'components/helpers/Format';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { EmptyState, MotionTableRow } from '../../methods';
import Iconify from 'components/iconify/iconify';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const buttonVariants = {
    hover: {
        rotate: 90,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.9,
        transition: { duration: 0.2 },
    },
};

export default function DetailRA({ lsData = [], onDelete, onEdit }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const hasRecords = lsData && lsData.length > 0;

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value)
            setRowsPerPage(parseInt(event?.target.value, 10));

        setPage(0);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ py: 1.5, width: "10px", alignItems: "center" }} />
                            {['Dx', 'Diagnóstico', 'Otros', ''].map((head) => (
                                <TableCell key={head} sx={{ py: 1.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem' }}>
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {!hasRecords ?
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ borderBottom: 0 }}>
                                        <EmptyState
                                            title="No hay registros"
                                            description="Aún no hay registros cargados o agregados a la lista de diagnósticos de investigación."
                                        />
                                    </TableCell>
                                </TableRow>
                                : <>
                                    {stableSort(lsData, getComparator('asc', 'dx', 'nombreSegmentoAgrupado', 'nombreDx'))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                            <TableRow key={index} hover onDoubleClick={() => onEdit(row)} style={{ cursor: 'pointer' }}>
                                                <TableCell sx={{ userSelect: 'none' }}>
                                                    {row?.idMedicinaLaboral &&
                                                        <Tooltip
                                                            title="Registro vinculado a Medicina Laboral"
                                                            disableInteractive
                                                            placement="top"
                                                            slotProps={{ tooltip: { sx: { width: 120, }, }, }}
                                                        >
                                                            <Box component="span" sx={{ display: 'inline-flex' }}>
                                                                <Iconify icon="mdi:drugs" width={24} sx={{ color: "secondary.main" }} />
                                                            </Box>
                                                        </Tooltip>
                                                    }
                                                </TableCell>

                                                <TableCell sx={{ userSelect: 'none' }}>{row?.dx}</TableCell>
                                                <TableCell sx={{ userSelect: 'none' }}>{row?.nombreDx}</TableCell>
                                                <TableCell sx={{ userSelect: 'none' }}>
                                                    <DiagnosticoDetalleTooltip extraData={row} />
                                                </TableCell>
                                                <TableCell sx={{ userSelect: 'none' }}>
                                                    <motion.div
                                                        variants={buttonVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        style={{ display: 'inline-block' }}
                                                    >
                                                        <Tooltip disableInteractive title="Eliminar" placement="top">
                                                            <IconButton
                                                                onClick={() => onDelete(row)}
                                                                size="small"
                                                                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                                                            >
                                                                <CloseIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </motion.div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </>
                            }
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) => (
                    `${from} - ${to} de ${count !== -1 ? count : `más de ${lsData.length}`}`
                )}
                rowsPerPageOptions={[4, 8, 12]}
                component="div"
                count={lsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#ffffff',
        color: theme.palette.text.primary,
        minWidth: 350,
        maxWidth: 400,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
        padding: '14px 18px',
        borderRadius: '10px',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
        "&::before": {
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.common.white,
        },
    },
}));

export const DiagnosticoDetalleTooltip = ({ extraData = {} }) => {
    const displayData = [
        { label: 'Segmento Agrupado', value: UpperFirstChar(extraData?.nombreSegmentoAgrupado) },
        { label: 'Segmento Afectado', value: UpperFirstChar(extraData?.nombreSegmentoAfectado) },
        { label: 'Subsegmento', value: UpperFirstChar(extraData?.nombreSubsegmento) },
        { label: 'Lateralidad', value: UpperFirstChar(extraData?.nombreLateralidad) },
        { label: 'Región', value: UpperFirstChar(extraData?.nombreRegion) }
    ];

    return (
        <StyledTooltip
            arrow
            placement="top"
            title={
                <Box>
                    <Typography variant="h5" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
                        <InfoOutlined sx={{ fontSize: 18 }} />
                        Otros datos del diagnóstico
                    </Typography>
                    <Divider sx={{ mb: 1.5, opacity: 0.6 }} />

                    <Stack spacing={1.5} sx={{ my: 1 }}>
                        {displayData.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5
                                }}
                            >
                                <Box sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    flexShrink: 0
                                }} />

                                <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.4, color: 'text.secondary' }}>
                                    <Box component="span" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                        {item.label}:
                                    </Box>
                                    {' '}{item.value}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            }
        >
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'primary.light',
                    boxShadow: '0px 2px 4px rgba(25, 118, 210, 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        bgcolor: 'primary.100',
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 4px 8px rgba(25, 118, 210, 0.2)',
                    }
                }}
            >
                <Typography
                    variant="subtitle2"
                    color="primary.main"
                    sx={{
                        userSelect: 'none',
                        pointerEvents: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                    }}
                >
                    Ver más...
                </Typography>
            </Box>
        </StyledTooltip>
    );
};