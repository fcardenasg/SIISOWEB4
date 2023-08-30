import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import UploadIcon from '@mui/icons-material/Upload';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { GetByIdSGSST, InsertSGSST, UpdateSGSSTS } from 'api/clients/SGSST';
import InputText from 'components/input/InputText';
import { Message, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostSGSST, PutSGSST } from 'formatdata/SGSST';
import { FormatDate } from 'components/helpers/Format';
import Cargando from 'components/loading/Cargando';

const UpdateSGSST = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [filePdf, setFilePdf] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsData, setLsData] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;


    useEffect(() => {
        async function GetAll() {
            try {
                await GetByIdSGSST(id).then(result => {
                    setFilePdf(result.data.archivoPdf);
                    setLsData(result.data);
                });
            } catch (error) {
            }
        }

        GetAll();
    }, [])

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
                setErrorMessage('Este formato no es un PDF');
            }
        }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutSGSST(id, datos.codigo, datos.nombre, filePdf, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (filePdf) {
                const result = await UpdateSGSSTS(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                }
            } else {
                setOpenError(true);
                setErrorMessage('Debe selecionar un PDF');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Actualizar SG-SST">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsData.length !== 0 ?
                <Fragment>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={6} lg={2}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsData.codigo}
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
                                    defaultValue={lsData.nombre}
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

                    <Grid item textAlign="center" xs={8} sx={{ pt: 4 }}>
                        {filePdf && (
                            <object type="application/pdf"
                                data={filePdf}
                                width="1000"
                                height="500"
                                onLoad={<Cargando />}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4} lg={2}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={6} md={4} lg={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/sg-sst/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </MainCard>
    );
};

export default UpdateSGSST;