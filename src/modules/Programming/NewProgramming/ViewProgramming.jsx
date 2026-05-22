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
import { GetAllAtencion } from 'api/clients/AttentionClient';
import { AnimatePresence, motion } from 'framer-motion';
import NavigationBar from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/NavigationBar';
import NoRecord from 'modules/DiseaseResearch/InvestigationOccupationalDisease/components/NoRecord';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import ViewCard from './components/View/ViewCard';
import ViewCardSkeleton from '../../../components/Skeleton/ViewCardSkeleton';
import ViewList from './components/View/ViewList';
import ViewListSkeleton from '../../../components/Skeleton/ViewListSkeleton';
import useAuth from 'hooks/useAuth';
import { DefaultValue } from 'components/helpers/Enums';
import ChatIA from './components/Chat/ChatIA';
import { useNavigate } from 'react-router-dom';
import { ProgrammingActionsProvider } from './contexts/ProgrammingActionsContext';

const ViewProgramming = () => {
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
                const result = await GetAllAtencion(DefaultValue.ATENCION_ATENDIDO, user?.idsede);
                if (result.status === 200) {
                    setDataModel(result.data);
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

    const onClickGoAttention = (programming) => {
        try {
            const { tipo: tipoAtencion, atencion, estadoCaso, sede, id, documento } = programming || {};

            const triageList = [
                DefaultValue.TRIAGE_I,
                DefaultValue.TRIAGE_II,
                DefaultValue.TRIAGE_III,
                DefaultValue.TRIAGE_VI,
                DefaultValue.TRIAGE_V,
            ];
            const isTriage = triageList.includes(atencion);

            /* handleUpdateAttentionOpen(); */

            const routeMap = new Map([
                [DefaultValue.TIPO_ATENCION_EMO, `/programming/new-emo/${id}/${documento}`],
                [DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA, `/programming/medica/${id}`],
                [DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO, `/programming/psychological/${id}`],
                [DefaultValue.ATENCION_PRUEBA_ALCOHOL, `/programming/alcoholanddrugtesting/${id}`],
                [DefaultValue.ATENCION_HISTORIA_EMBRIAGUEZ, `/programming/history-drunkenness/${id}`],
            ]);

            if (routeMap.has(atencion)) return navigate(routeMap.get(atencion));
            if (routeMap.has(tipoAtencion)) return navigate(routeMap.get(tipoAtencion));

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ASESORIAS &&
                ![DefaultValue.TIPO_ATENCION_ASESORIAS_PSICO, DefaultValue.TIPO_ATENCION_ASESORIAS_MEDICA].includes(atencion)) {
                return navigate(`/programming/other/${id}`);
            }

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA) {
                if (estadoCaso === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_NUEVO)
                    return navigate(`/programming/attention-new/${id}`);

                if (estadoCaso === DefaultValue.TIPO_ATENCION_ATENCIONMEDICA_CONTROL)
                    return navigate(`/programming/attention-control/${id}`);
            }

            if (tipoAtencion === DefaultValue.TIPO_ATENCION_ENFERMERIA &&
                (atencion === DefaultValue.ATENCION_ENFERMERIA || (sede === DefaultValue.SEDE_PUERTO && isTriage))) {
                return navigate(`/programming/infirmary/${id}`);
            }
        } catch (error) {
            toast.error("Error al ir a la atención: ", error);
        }
    };

    return (
        <ProgrammingActionsProvider
            onOpenChat={handleOpenChat}
            onGoAttention={onClickGoAttention}
        >
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
                            <NavigationBar title="Lista de programación" urlBack="/dashboard/drummond" />

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
                                                    />
                                                ))}
                                            </List>
                                        ) : (
                                            <Grid container spacing={2.5}>
                                                {paginatedData.map((patient, index) => (
                                                    <Grid item xs={12} sm={6} md={4} key={patient.id || index}>
                                                        <ViewCard
                                                            key={patient.id}
                                                            index={index}
                                                            dataInfo={patient}
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
        </ProgrammingActionsProvider>
    );
};

export default ViewProgramming;