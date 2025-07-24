import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Grid,
    InputAdornment,
    TextField
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SubCard
                            daskTitle
                            title="Cargar archivo"
                            secondary={
                                <AnimateButton>
                                    <Button
                                        disabled={filesData.length === 0}
                                        variant="outlined"
                                        fullWidth
                                        onClick={handleClickExtraer}
                                    >
                                        Extraer información
                                    </Button>
                                </AnimateButton>
                            }
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Upload files={null} onDrop={handleDrop} multiple={true} />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <SubCard content title={`${numArchivos} Archivos cargados`}>
                                        <PerfectScrollbar style={{ height: 180, padding: '0px 15px 0px 0px' }}>
                                            {filesData && (
                                                <MultiFilePreview
                                                    files={filesData}
                                                    isPdf={false}
                                                    iconFile={ic_excel}
                                                    onRemove={handleClickDelete}
                                                />
                                            )}
                                        </PerfectScrollbar>
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    {lsData.length > 0 &&
                        <Grid item xs={12}>
                            <AnimateComponent>
                                <SubCard daskTitle title="Información de la exposición ocupacional">
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <TextField
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon fontSize="small" />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={handleSearch}
                                                placeholder="Buscar"
                                                value={search}
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <DetailsCharges lsData={lsData} />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </AnimateComponent>
                        </Grid>
                    }

                    <Grid item xs={6} md={4} lg={2} sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button disabled={lsData.length === 0} variant="contained" onClick={handleClick} fullWidth>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={6} md={4} lg={2} sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </AnimateComponent>
        </ValidateActionSkeleton>
    );
};

export default BulkLoadingCharges;