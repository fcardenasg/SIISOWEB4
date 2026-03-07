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
import FullScreenModal from 'components/controllers/FullScreenModal';
import SelectOnChange from 'components/input/SelectOnChange';
import UnauthorizedAccess from 'components/loading/UnauthorizedAccess';
import { AnimatePresence, motion } from 'framer-motion';
import { useBoolean } from 'hooks/use-boolean';
import ChatIA from 'modules/Programming/NewProgramming/components/Chat/ChatIA';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewCardSkeleton from '../../../components/Skeleton/ViewCardSkeleton';
import ViewListSkeleton from '../../../components/Skeleton/ViewListSkeleton';
import NavigationBar from './components/NavigationBar';
import NoRecord from './components/NoRecord';
import ModalRestore from './components/View/ModalRestore';
import ViewCard from './components/View/ViewCard';
import ViewList from './components/View/ViewList';
import { InvestigationActionsProvider } from './contexts/InvestigationActionsContext';
import { useInvestigationData } from './hooks/use-investigation-data';

const DataView = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const openModalRestore = useBoolean(false);

    const [viewMode, setViewMode] = useState(() => {
        const savedViewMode = localStorage.getItem('dataViewMode');
        return savedViewMode || 'list';
    });

    const {
        numStatus,
        idAssignment,
        setIdAssignment,
        filter,
        isOpen,
        setIsOpen,
        searchTerm,
        setSearchTerm,
        infoEmployee,
        setInfoEmployee,
        currentPage,
        loading,
        textError,
        paginatedData,
        filteredData,
        totalPages,
        getData,
        handleFilter,
        handlePageChange,
        handleOpenChat,
        handleDelete,
        handleGoAttention,

        handleReport,
        loadingReport,
        openReport,
        reportUrl
    } = useInvestigationData(viewMode);

    const handleViewChange = (event, newViewMode) => {
        if (newViewMode) {
            setViewMode(newViewMode);
            localStorage.setItem('dataViewMode', newViewMode);
        }
    };

    const handleRestore = async (idRestaurar) => {
        setIdAssignment(idRestaurar);
        openModalRestore.onTrue();
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

    return (
        <InvestigationActionsProvider
            onOpenChat={handleOpenChat}
            onGoAttention={handleGoAttention}
            onDelete={handleDelete}
            onRestore={handleRestore}
            onReview={(id) => navigate(`/investigation-occupational-disease/view-and-review/${id}`)}
            numStatus={numStatus}
            onReport={handleReport}
        >
            {openReport.value &&
                <FullScreenModal onClose={openReport.onFalse} loading={loadingReport.value}>
                    <iframe
                        src={`${reportUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                        className="pdf-report-frame"
                        title="Visualizador de Reporte"
                        loading="lazy"
                    />
                </FullScreenModal>
            }

            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ width: "100%" }}
                >
                    <Box>
                        <ChatIA setIsOpen={setIsOpen} isOpen={isOpen} setInfoEmployee={setInfoEmployee} infoEmployee={infoEmployee} />
                        <ModalRestore open={openModalRestore.value} onClose={openModalRestore.onFalse} idAssignment={idAssignment} getData={getData} />

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

                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                    {(numStatus == 1 || numStatus == 3) &&
                                        <SelectOnChange
                                            size="small"
                                            sx={{ width: { xs: '100%', sm: 250 } }}
                                            label="Filtrar por"
                                            value={filter}
                                            onChange={handleFilter}
                                            options={[
                                                { value: 1, label: "Todas las investigaciones".toUpperCase() },
                                                { value: 2, label: "Investigaciones asignadas".toUpperCase() },
                                                { value: 3, label: "Asesorías ARL asignadas".toUpperCase() }
                                            ]}
                                        />
                                    }

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
                        </Box>

                        {loading ? (
                            <>{renderSkeletons(viewMode === 'list' ? 2 : 3)}</>
                        ) : textError === 'NOPERMITIDO' ? (
                            <UnauthorizedAccess />
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
        </InvestigationActionsProvider>
    );
};

export default DataView;