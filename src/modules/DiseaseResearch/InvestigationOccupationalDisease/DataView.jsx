import {
    Search as SearchIcon,
    ViewList as ViewListIcon,
    ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import {
    Box,
    Grid,
    InputAdornment,
    List,
    Pagination,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { GetAllByDataResearcher } from 'api/clients/ResearchAssignmentClient';
import { DefaultValue } from 'components/helpers/Enums';
import { AnimatePresence, motion } from 'framer-motion';
import useAuth from 'hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ViewCardSkeleton from '../../../components/Skeleton/ViewCardSkeleton';
import ViewListSkeleton from '../../../components/Skeleton/ViewListSkeleton';
import NavigationBar from './components/NavigationBar';
import NoRecord from './components/NoRecord';
import ViewCard from './components/View/ViewCard';
import ViewList from './components/View/ViewList';
import ChatIA from 'modules/Programming/NewProgramming/components/Chat/ChatIA';

const DataView = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isOpen, setIsOpen] = useState(false);
    const [dataModel, setDataModel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [infoEmployee, setInfoEmployee] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = viewMode === 'list' ? 4 : 6;

    useEffect(() => {
        async function getData() {
            try {
                const result = await GetAllByDataResearcher(0);
                if (result.data.datos) {
                    setDataModel(result.data.datos);
                }
                else
                    toast.error(result.data.mensaje);
            } catch (error) {
                toast.error('Error al cargar los datos');
            } finally {
                setTimeout(() => setLoading(false), 700);
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
            setCurrentPage(1);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderSkeletons = (count) => {
        if (viewMode === 'list') {
            return Array.from({ length: count }).map((_, index) => (
                <ViewListSkeleton key={`skeleton-list-${index}`} index={index} />
            ));
        } else {
            return (
                <Grid container spacing={2}>
                    {Array.from({ length: count }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ViewCardSkeleton key={`skeleton-card-${index}`} index={index} />
                        </Grid>
                    ))}
                </Grid>
            );
        }
    };

    const handleOpenChat = (isOpen, infoEmployee) => {
        setIsOpen(isOpen);
        setInfoEmployee(infoEmployee);
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ width: "100%" }}
            >
                <Box sx={{ p: 1 }}>
                    <ChatIA setIsOpen={setIsOpen} isOpen={isOpen} setInfoEmployee={setInfoEmployee} infoEmployee={infoEmployee} />

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

                    {loading ? (
                        <>{renderSkeletons(viewMode === 'list' ? 4 : 6)}</>
                    ) : filteredData.length === 0 ? (
                        <NoRecord />
                    ) : (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${currentPage}`}
                                    initial={{ opacity: 0, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{ width: "100%" }}
                                >
                                    {viewMode === 'list' ? (
                                        <List sx={{ p: 0 }}>
                                            {paginatedData.map((patient, index) => (
                                                <ViewList
                                                    key={patient.id}
                                                    index={index}
                                                    dataInfo={patient}
                                                    onClickOpenChat={handleOpenChat}
                                                    onClickGoAttention={() => navigate(`/investigation-occupational-disease/investigate/${patient.id}`)}
                                                />
                                            ))}
                                        </List>
                                    ) : (
                                        <Grid container spacing={2.5}>
                                            {paginatedData.map((patient, index) => (
                                                <Grid item xs={12} sm={6} md={4} key={patient.id || index}>
                                                    <ViewCard
                                                        key={patient.id}
                                                        dataInfo={patient}
                                                        index={index}
                                                        onClickGoAttention={() => navigate(`/investigation-occupational-disease/investigate/${patient.id}`)}
                                                        onClickOpenChat={handleOpenChat}
                                                    />
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
            </motion.div>
        </AnimatePresence>
    );
};

export default DataView;