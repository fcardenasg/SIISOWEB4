import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError, ParamDelete, MessageDelete } from 'components/alert/AlertAll';
import InputDatePicker from 'components/input/InputDatePicker';
import MultiFilePreviewTwo from 'components/UploadDocument/MultiFilePreviewTwo';
import Upload from 'components/UploadDocument/Upload';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { InsertSoporte } from 'api/clients/HelpClient';

const validationSchema = yup.object().shape({
    idTipoCaso: yup.string().required(ValidationMessage.Requerido),
    idTipoIncidente: yup.string().required(ValidationMessage.Requerido),
    idPrioridad: yup.string().required(ValidationMessage.Requerido),
    descripcionCaso: yup.string().required(ValidationMessage.Requerido)
});

const Support = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [files, setFiles] = useState(null);
    const [filesData, setFilesData] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openDelete, setOpenDelete] = useState(false);

    const [lsTipoCaso, setLsTipoCaso] = useState([]);
    const [lsTipoIncidente, setLsTipoIncidente] = useState([]);
    const [lsPrioridad, setLsPrioridad] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema), });
    const { handleSubmit, reset, formState: { errors } } = methods;

    const handleDrop = useCallback((acceptedFiles) => {
        try {
            var archivoExtraido = acceptedFiles[0];
            setFiles(archivoExtraido);

            let reader = new FileReader();
            reader.readAsDataURL(archivoExtraido);
            reader.onloadend = async (e) => {
                const modelData = {
                    archivo: e.target.result,
                    nombre: archivoExtraido.name,
                    size: archivoExtraido.size.toString(),
                    usuarioRegistro: user?.nameuser
                }

                setFilesData([...filesData, modelData]);
                setFiles(null);
            }
        } catch (error) {
            setFiles(null);
            setOpenError(true);
            setErrorMessage('No se pudo guardar el archivo');
        }
    }, [files]);

    const handleRemoveFile = (index) => {
        if (index !== null) {
            swal(ParamDelete).then((willDelete) => {
                if (willDelete) {
                    filesData.splice(index, 1);
                    setOpenDelete(true);
                }
            });
        }
    };

    useEffect(() => {
        async function getAll() {
            try {
                const serverTipoCaso = await GetByTipoCatalogoCombo(CodCatalogo.SoporteTipoCaso);
                setLsTipoCaso(serverTipoCaso.data);

                const serverTipoIncidente = await GetByTipoCatalogoCombo(CodCatalogo.SoporteTipoIncidente);
                setLsTipoIncidente(serverTipoIncidente.data);

                const serverPrioridad = await GetByTipoCatalogoCombo(CodCatalogo.SoportePrioridad);
                setLsPrioridad(serverPrioridad.data);
            } catch (error) { }
        }

        getAll();
    }, []);


    const handleClick = async (datos) => {
        try {
            datos.idSede = user?.idsede;
            datos.listArchivo = filesData;
            datos.usuarioRegistro = user?.nameuser;

            const result = await InsertSoporte(datos);
            if (result.status === 200) {
                reset();
                setOpenSuccess(true);
                setFilesData([]);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo registrar el soporte");
        }
    };

    const handleClickDownload = async (id) => {
        try {
            alert(id);
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo registrar el soporte");
        }
    };

    return (
        <MainCard title="Registrar caso">
            <FormProvider {...methods}>
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <InputSelect
                            name="idTipoCaso"
                            label="Tipo de caso"
                            defaultValue=""
                            options={lsTipoCaso}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idTipoCaso}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputSelect
                            name="idTipoIncidente"
                            label="Tipo de incidente"
                            defaultValue=""
                            options={lsTipoIncidente}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idTipoIncidente}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputSelect
                            name="idPrioridad"
                            label="Prioridad"
                            defaultValue=""
                            options={lsPrioridad}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.idPrioridad}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputDatePicker
                            disabled
                            label="Fecha de solicitud"
                            name="fechaHoraSolicitud"
                            defaultValue={new Date()}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <InputText
                            defaultValue=""
                            multiline
                            rows={5}
                            name="descripcionCaso"
                            label="Descripción del caso"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.descripcionCaso}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard title="Agregar archivos del caso (PDF, Imagenes, Excel, Word, PowerPoint)">
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <Upload files={files} onDrop={handleDrop} />
                                </Grid>

                                <Grid item xs={7}>
                                    {filesData.map((item, index) => (
                                        <MultiFilePreviewTwo
                                            file={item}
                                            onRemove={() => handleRemoveFile(index, item?.nombre)}
                                            onClickDownload={() => handleClickDownload(item?.id)}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/help/support/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </FormProvider>
        </MainCard>
    );
};

export default Support;