import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Container,
    Grid,
    List,
    Typography,
    TextField,
    InputAdornment,
    ToggleButtonGroup,
    ToggleButton,
    IconButton,
    useTheme,
    useMediaQuery,
    Pagination,
} from '@mui/material';
import {
    Search as SearchIcon,
    ChevronLeft as ChevronLeftIcon,
    ViewList as ViewListIcon,
    ViewModule as ViewModuleIcon,
    SearchOff as SearchOffIcon,
} from '@mui/icons-material';
import ViewCardData from './components/ViewCardData';
import ViewListData from './components/ViewListData';
import { GetAllByDataResearcher } from 'api/clients/ResearchAssignmentClient';
import useAuth from 'hooks/useAuth';
import toast from 'react-hot-toast';
import NoRecord from './components/NoRecord';
import NavigationBar from './components/NavigationBar';

const DataView = () => {
    const { user } = useAuth();
    const [dataModel, setDataModel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const itemsPerPage = viewMode === 'list' ? 4 : 6;

    useEffect(() => {
        async function getData() {
            try {
                const result = await GetAllByDataResearcher(0);
                if (result.data.datos) {
                    setDataModel(result.data.datos);
                } else {
                    toast.error(result.data.mensaje);
                }
            } catch (error) {
                console.error(error);
                toast.error('Error al cargar los datos');
            }
        }

        getData();
    }, []);

    const filteredData = useMemo(() => {
        if (!searchTerm) return dataModel;
        const term = searchTerm.toLowerCase();
        return dataModel.filter((patient) =>
            Object.values(patient).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(term)
            )
        );
    }, [dataModel, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const handleViewChange = (event, newViewMode) => {
        if (newViewMode) {
            setViewMode(newViewMode);
            setCurrentPage(1); // Resetear página al cambiar vista
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        // Opcional: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ pb: 2 }}>
                <NavigationBar title="Investigaciones asignadas" urlBack="/disease-research/view" />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 1.5,
                        flexWrap: 'wrap',
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                            sx: {
                                width: { xs: '100%', sm: 300 },
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                            },
                        }}
                    />

                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        size="small"
                        sx={{
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            '& .MuiToggleButton-root': {
                                border: 'none',
                                borderRadius: '6px !important',
                                px: 1.2,
                                py: 0.7,
                                '&:not(.Mui-selected):hover': {
                                    bgcolor: '#E3193799',
                                    color: 'white',
                                },
                                '&.Mui-selected': {
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'secondary.main',
                                        color: 'white',
                                    },
                                },
                            },
                        }}
                    >
                        <ToggleButton value="list" aria-label="ver como lista">
                            <ViewListIcon fontSize="small" />
                        </ToggleButton>
                        <ToggleButton value="card" aria-label="ver como tarjetas">
                            <ViewModuleIcon fontSize="small" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {filteredData.length === 0 ? (
                <NoRecord />
            ) : (
                <>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${viewMode}-${currentPage}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: 0.45,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            style={{ width: '100%' }}
                        >
                            {viewMode === 'list' ? (
                                <List sx={{ p: 0 }}>
                                    {paginatedData.map((patient, index) => (
                                        <motion.div
                                            key={patient.id || index}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: index * 0.03,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            <ViewListData dataInfo={patient} index={index} />
                                        </motion.div>
                                    ))}
                                </List>
                            ) : (
                                <Grid container spacing={2.5}>
                                    {paginatedData.map((patient, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={patient.id || index}>
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.97 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: index * 0.04,
                                                    ease: 'easeOut',
                                                }}
                                            >
                                                <ViewCardData dataInfo={patient} index={index} />
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="secondary"
                                size={isMobile ? 'small' : 'medium'}
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '8px',
                                        fontWeight: 500,
                                    },
                                    '& .Mui-selected': {
                                        bgcolor: 'secondary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'secondary.main',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default DataView;