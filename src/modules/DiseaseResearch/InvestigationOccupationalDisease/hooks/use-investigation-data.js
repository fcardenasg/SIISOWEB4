import {
    ChangeStatusAssignment,
    DeleteResearchAssignment,
    GetAllByDataResearcher
} from 'api/clients/ResearchAssignmentClient';
import { Url } from 'api/instances/AuthRoute';
import axios from 'axios';
import { ParamDelete } from 'components/alert/AlertAll';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const useInvestigationData = (viewMode) => {
    const navigate = useNavigate();

    const [idAssignment, setIdAssignment] = useState(null);
    const [filter, setFilter] = useState(2);
    const [isOpen, setIsOpen] = useState(false);
    const [dataModel, setDataModel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [infoEmployee, setInfoEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [textError, setTextError] = useState('');
    const [reportUrl, setReportUrl] = useState('');
    const openReport = useBoolean(false);
    const loadingReport = useBoolean(false);

    const itemsPerPage = viewMode === 'list' ? 4 : 6;

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

    const filteredData = useMemo(() => {
        if (!searchTerm) return dataModel;
        const term = searchTerm.toLowerCase();
        return dataModel.filter((patient) =>
            Object.values(patient).some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(term)
            )
        );
    }, [dataModel, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

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
            const estadoInvestigacion = dataModel.find((item) => item.id === idAsignacion)?.estadoInvestigacion;
            if (estadoInvestigacion === 3) {
                navigate(`/investigation-occupational-disease/investigate/${idAsignacion}`);
                return;
            }

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

    async function handleReport(idInvestigation) {
        if (!idInvestigation) return;
        loadingReport.onTrue();
        openReport.onTrue();

        try {
            const response = await axios.get(`${Url.Base}${Url.Investigacion}/report/${idInvestigation}`, {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/pdf'
                }
            });

            if (response.data.type !== 'application/pdf') {
                throw new Error('El archivo recibido no es un PDF válido.');
            }

            const url = URL.createObjectURL(response.data);
            setReportUrl(url);
        } catch (err) {
            if (err.response?.data instanceof Blob && err.response.data.type === 'application/json') {
                const reader = new FileReader();
                reader.onload = () => {
                    const errorData = JSON.parse(reader.result);
                    toast.error(errorData.message || 'Error al generar el reporte');
                    openReport.onFalse();
                };

                reader.readAsText(err.response.data);
            } else {
                toast.error(err.message || 'No se pudo cargar el reporte.');
                openReport.onFalse();
            }
        } finally {
            setTimeout(() => {
                loadingReport.onFalse();
            }, 500);
        }
    }

    useEffect(() => {
        return () => {
            if (reportUrl) URL.revokeObjectURL(reportUrl);
        };
    }, [reportUrl]);

    return {
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
        loadingReport,
        openReport,
        reportUrl,

        getData,
        handleFilter,
        handlePageChange,
        handleOpenChat,
        handleDelete,
        handleGoAttention,
        handleReport
    };
};