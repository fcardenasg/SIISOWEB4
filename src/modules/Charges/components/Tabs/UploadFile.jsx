import { Grid } from '@mui/material';
import ic_excel from 'assets/icons/files/ic_excel.svg';
import MultiFilePreview from 'components/UploadDocument/MultiFilePreview';
import Upload from 'components/UploadDocument/Upload';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SubCard from 'ui-component/cards/SubCard';

const UploadFile = ({ setFilesData, filesData }) => {
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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
        </Grid>
    );
}

export default UploadFile;