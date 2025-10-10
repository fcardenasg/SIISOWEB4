import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { ExtractInformationFromExcel, InsertPanoramaMasivo } from 'api/clients/PanoramaClient';
import ic_excel from 'assets/icons/files/ic_excel.svg';
import { AccionMenu, Modulo, TitleButton } from 'components/helpers/Enums';
import AnimateComponent from 'components/loading/AnimateComponent';
import MultiFilePreview from 'components/UploadDocument/MultiFilePreview';
import Upload from 'components/UploadDocument/Upload';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import DetailsCharges from './DetailsCharges';
import StepperExtractInformation from '../components/StepperExtractInformation';

const BulkLoadingCharges = () => {
    const navigate = useNavigate();
    const [filesData, setFilesData] = useState([]);

    const [rows, setRows] = useState([]);
    const [lsData, setLsData] = useState([]);
    const [search, setSearch] = useState('');

    const allowedFiles = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleDrop = useCallback((acceptedFiles) => {
        try {
            acceptedFiles.forEach((archivoExtraido) => {
                if (archivoExtraido && allowedFiles.includes(archivoExtraido.type)) {
                    let reader = new FileReader();
                    reader.readAsDataURL(archivoExtraido);

                    reader.onloadend = async (e) => {
                        const base64Content = e.target.result;
                        setFilesData((prevFilesData) => [
                            ...prevFilesData,
                            {
                                id: prevFilesData.length > 0 ? prevFilesData[prevFilesData.length - 1].id + 1 : 1,
                                base64: base64Content,
                                tamanio: archivoExtraido.size.toString(),
                                nombre: archivoExtraido.name
                            }
                        ]);
                    };
                } else {
                    toast.error(`El archivo "${archivoExtraido.name}" no es válido o no está permitido.`);
                }
            });
        } catch (error) {
            toast.error('No se pudo cargar el archivo');
        }
    }, []);

    const handleClickDelete = (id) => {
        setFilesData((prevFilesData) => {
            return prevFilesData.filter((archivo) => archivo.id !== id);
        });
    };

    const numArchivos = filesData.length ? `${filesData.length} ` : "";

    const handleClickExtraer = async () => {
        try {
            const bases64Excel = filesData.map(excel => excel.base64);
            const result = await ExtractInformationFromExcel(bases64Excel);
            if (result.data.response) {
                const { datos } = result.data;
                setLsData(datos);
                setRows(datos);
                toast.success("Información extraída correctamente");
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al extraer información del archivo");
        }
    }

    const handleSearch = (event) => {
        const newString = event?.target.value.trim();
        setSearch(newString || '');

        const lowerCaseQuery = newString.toLowerCase();

        const newRows = newString
            ? rows.filter((row) =>
                ['nameGrupo', 'clase'].some((property) =>
                    row[property]?.toString().toLowerCase().includes(lowerCaseQuery)
                )
            ) : rows;

        setLsData(newRows);
    };

    const handleClick = async () => {
        try {
            const bases64Excel = filesData.map(excel => excel.base64);

            const result = await InsertPanoramaMasivo(bases64Excel);
            if (result.data.response) {
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {

        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Panoramadecargo}>
            <AnimateComponent>
                <SubCard darkTitle title="Cargue masivo de cargos">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <StepperExtractInformation />
                        </Grid>
                    </Grid>
                </SubCard>
            </AnimateComponent>
        </ValidateActionSkeleton>
    );
};

export default BulkLoadingCharges;