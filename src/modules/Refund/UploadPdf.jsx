import { useState, Fragment, useEffect } from 'react';
import {
    Button,
    Grid,
    Typography
} from '@mui/material';
import useAuth from 'hooks/useAuth';

import UploadIcon from '@mui/icons-material/Upload';
import SubCard from 'ui-component/cards/SubCard';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ListaArchivosPDF from './ListaArchivosPDF';
import { GetAllByIdListaReintegroArchivo, InsertListaReintegroArchivo } from 'api/clients/ListRefundClient';
import { Message, TitleButton } from 'components/helpers/Enums';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import { PostListaArchivoRefund } from 'formatdata/RefundForm';
import { FormatDate } from 'components/helpers/Format';

const UploadPdf = ({ idListaReintegro }) => {
    const { user } = useAuth();

    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [filePdf, setFilePdf] = useState(null);

    const [lsArchivosReintegro, setLsArchivosReintegro] = useState([]);

    async function getAll() {
        try {
            var lsCheckedReintegro = await GetAllByIdListaReintegroArchivo(idListaReintegro);
            if (lsCheckedReintegro.status === 200) {
                setLsArchivosReintegro(lsCheckedReintegro.data);
            }

        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [idListaReintegro]);

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = async (e) => {
                    setFilePdf(e.target.result);
                }
            }
            else {
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleSave = async () => {
        try {
            const DataToInsert = PostListaArchivoRefund(idListaReintegro, filePdf, user.nameuser,
                FormatDate(new Date()), '', FormatDate(new Date()));

            if (filePdf !== null) {
                const result = await InsertListaReintegroArchivo(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setFilePdf(null);
                    getAll();
                }
            } else {
                setOpenError(true);
                setErrorMessage('Por favor, seleccione un archivo');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    }

    return (
        <Fragment>
            <ControlModal
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
            >
                <ViewPDF dataPDF={filePdf} />
            </ControlModal>

            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">{TitleButton.SubirArchivo} / {TitleButton.VerArchivo}</Typography>}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={9} lg={10.5}>
                                <SubCard darkTitle title={<Typography variant="h4">Lista de Archivo</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            {
                                                lsArchivosReintegro.length !== 0 ?
                                                    <ListaArchivosPDF lsArchivosCheckReintegro={lsArchivosReintegro} getAll={getAll} />
                                                    :
                                                    <Typography variant='h4' sx={{ pt: 2 }}>{Message.NoRegistro}</Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            <Grid item xs={12} md={3} lg={1.5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={12}>
                                        <AnimateButton>
                                            <Button fullWidth variant="contained" component="label" endIcon={<UploadIcon fontSize="small" />}>
                                                <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                                {TitleButton.SubirArchivo}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={12}>
                                        <AnimateButton>
                                            <Button disabled={filePdf === null ? true : false} fullWidth variant="outlined" component="label"
                                                endIcon={<VisibilityIcon fontSize="small" />} onClick={() => setOpenViewArchivo(true)}>
                                                {TitleButton.VerArchivo}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={12}>
                                        <AnimateButton>
                                            <Button disabled={filePdf === null ? true : false} fullWidth variant="outlined" component="label" endIcon={<SaveIcon fontSize="small" />} onClick={handleSave}>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default UploadPdf;