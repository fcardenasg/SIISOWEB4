import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import {
    GetAllByDataResearcher,
    DeleteResearchAssignment,
    ChangeStatusAssignment,
    ValidateResearchAssignment
} from 'api/clients/ResearchAssignmentClient';
import { ParamDelete } from 'components/alert/AlertAll';

export const useInvestigationData = (viewMode) => {
    const navigate = useNavigate();

    // Estados principales
    const [numStatus, setNumStatus] = useState(null);
    const [idAssignment, setIdAssignment] = useState(null);
    const [filter, setFilter] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [dataModel, setDataModel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [infoEmployee, setInfoEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [textError, setTextError] = useState('');

    const itemsPerPage = viewMode === 'list' ? 4 : 6;

    // Validación inicial de filtros
    useEffect(() => {
        async function validate() {
            try {
                const result = await ValidateResearchAssignment();
                if (result.data.exito) {
                    setNumStatus(result.data.datos);
                }
            } catch (error) {
                toast.error('Error al validar el filtro');
            }
        }
        validate();
    }, []);

    // Obtención de datos según el filtro
    const getData = async () => {
        try {
            setLoading(true);
            setDataModel([]);
            setTextError('');

            const result = await GetAllByDataResearcher(filter);
            if (result.data.exito) {
                setDataModel(result.data.datos);
            } else if (result.data.mensaje !== 'NOPERMITIDO') {
                setDataModel([]);
                toast.error(result.data.mensaje);
            } else {
                setTextError(result.data.mensaje);
            }
        } catch (error) {
            toast.error('Error al cargar los datos');
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        getData();
    }, [filter]);

    // Filtrado de datos por búsqueda
    const filteredData = useMemo(() => {
        if (!searchTerm) return dataModel;
        const term = searchTerm.toLowerCase();
        return dataModel.filter((patient) =>
            Object.values(patient).some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(term)
            )
        );
    }, [dataModel, searchTerm]);

    // Paginación
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    // Manejadores de acciones
    const handleFilter = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenChat = (isOpen, info) => {
        setIsOpen(isOpen);
        setInfoEmployee(info);
    };

    const handleDelete = async (idEliminar) => {
        try {
            const willDelete = await swal(ParamDelete);
            if (willDelete) {
                const result = await DeleteResearchAssignment(idEliminar);
                if (result.data.exito) {
                    toast.success(result.data.mensaje);
                    getData();
                }
            }
        } catch (error) {
            toast.error('Error al eliminar el registro');
        }
    };

    const handleGoAttention = async (idAsignacion) => {
        try {
            const result = await ChangeStatusAssignment(2, idAsignacion);
            if (result.data.exito) {
                navigate(`/investigation-occupational-disease/investigate/${idAsignacion}`);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al cambiar el estado");
        }
    };

    return {
        // Estados
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

        // Acciones
        getData,
        handleFilter,
        handlePageChange,
        handleOpenChat,
        handleDelete,
        handleGoAttention
    };
};
