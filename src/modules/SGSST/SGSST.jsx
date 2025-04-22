import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import { InsertSGSST } from 'api/clients/SGSST';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import { AccionMenu, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';
import InputText from 'components/input/InputText';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { PostSGSST } from 'formatdata/SGSST';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const SGSST = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [filePdf, setFilePdf] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const allowedFiles = ['application/pdf'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFilePdf(e.target.result);


                }
            }
            else {
                setFilePdf('');
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostSGSST(datos.codigo, datos.nombre, filePdf,
                user?.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                if (filePdf) {
                    const result = await InsertSGSST(DataToInsert);
                    if (result.status === 200) {
                        reset();
                        setFilePdf(null);
                        setOpenSuccess(true);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage('Debe selecionar un PDF');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.SGSST}>
            <MainCard title={<>Registrar SG-SST</>}>
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6} lg={2}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="codigo"
                                label="Código"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                fullWidth
                                name="nombre"
                                label="Nombre"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid textAlign="center" item xs={12} md={6} lg={2}>
                        <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                            SUBIR PDF
                            <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pt: 4 }}>
                    <ViewPDF dataPDF={filePdf} width="1150" height="500" />
                </Grid>

                <Grid item xs={12} sx={{ pt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/sg-sst/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default SGSST;