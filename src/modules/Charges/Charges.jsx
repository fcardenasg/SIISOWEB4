import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { InsertCharges } from 'api/clients/ChargesClient';
import { ExtractInformationFromExcel } from 'api/clients/PanoramaClient';
import ic_excel from 'assets/icons/files/ic_excel.svg';
import { AccionMenu, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';
import MultiFilePreview from 'components/UploadDocument/MultiFilePreview';
import Upload from 'components/UploadDocument/Upload';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { PostCargo } from 'formatdata/CargoForm';
import useAuth from 'hooks/useAuth';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import DetailsCharges from './DetailsCharges';
import toast from 'react-hot-toast';
import AnimateComponent from 'components/loading/AnimateComponent';

const Charges = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [filesData, setFilesData] = useState([]);

    const [rows, setRows] = useState([]);
    const [lsData, setLsData] = useState([]);
    const [search, setSearch] = useState('');

    const methods = useForm();
    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCargo(datos.sede, datos.rosterPosition, datos.area, datos.subArea,
                datos.descripcionCargo, datos.idGES, user?.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos).length !== 0) {
                const result = await InsertCharges(DataToInsert);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Guardar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    });
                    reset();
                }
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error al consumir el servicio de POST ',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            });
        }
    };

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

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Panoramadecargo}>
            <FormProvider {...methods}>
                <MainCard title="Registrar panorama de cargos">
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
                            <Grid item xs={12} sx={{ mb: 2 }}>
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

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button disabled={lsData.length === 0} variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </MainCard>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default Charges;