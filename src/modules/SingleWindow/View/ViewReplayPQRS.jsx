import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import SelectOnChange from "components/input/SelectOnChange";
import { useTheme } from '@mui/material/styles';
import { MessageError, MessageSuccess, ParamDelete } from "components/alert/AlertAll";
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';

import swal from "sweetalert";
import AnimateButton from "ui-component/extended/AnimateButton";
import { TitleButton } from "components/helpers/Enums";
import ControlModal from "components/controllers/ControlModal";

import {
    DeleteArchivoVentanillaUD, GetAllByIdArchivoVentanillaUD, GetByIdArchivoVentanillaUD,
    GetByIdVentanillaUnicaDetalle, InsertArchivoVentanillaUD, UpdateVentanillaUnicaDetalle
} from "api/clients/VentanillaUnicaClient";
import { FormProvider, useForm } from "react-hook-form";
import { GetAllComboArea } from "api/clients/UserClient";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import Cargando from "components/loading/Cargando";
import Upload from "components/UploadDocument/Upload";
import Accordion from "components/accordion/Accordion";
import useAuth from "hooks/useAuth";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import MultiFilePreview from "components/UploadDocument/MultiFilePreview";

const lsRespuesta = [
    { value: 0, label: "ATENDIDO" },
    { value: 1, label: "TRASLADO" }
]

const ViewReplayPQRS = ({ idVentanillaDetalle, getAllReplay, getAllList }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsData, setLsData] = useState([]);
    const [lsUsuario, setLsUsuario] = useState([]);
    const [idRespuesta, setIdRespuesta] = useState(0);

    const [files, setFiles] = useState([]);
    const [filesData, setFilesData] = useState([]);
    const [disabledControl, setDisabledControl] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    async function getAllFile() {
        try {
            await GetAllByIdArchivoVentanillaUD(idVentanillaDetalle).then(response => {
                if (response.data.length !== 0) {
                    setFilesData(response.data);
                } else {
                    setFilesData([]);
                }
            });
        } catch (error) { }
    }

    useEffect(() => {
        getAllFile();
    }, [idVentanillaDetalle]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetByIdVentanillaUnicaDetalle(idVentanillaDetalle);
                if (lsServer.status === 200) {
                    const lsServerUsuario = await GetAllComboArea(lsServer.data.idArea);
                    setLsUsuario(lsServerUsuario.data);
                    setLsData(lsServer.data);

                    if (lsServer.data.idOpcion === 0)
                        setDisabledControl(true);
                }
            } catch (error) { }
        }

        getAll();
    }, [idVentanillaDetalle]);

    const allowedFiles = ['application/pdf'];
    const handleDrop = useCallback((acceptedFiles) => {
        try {
            var archivoExtraido = acceptedFiles[0];

            if (archivoExtraido && allowedFiles.includes(archivoExtraido.type)) {
                setFiles(acceptedFiles);

                let reader = new FileReader();
                reader.readAsDataURL(archivoExtraido);
                reader.onloadend = async (e) => {
                    const modelData = {
                        idVentanillaUnicaDetalle: idVentanillaDetalle,
                        archivo: e.target.result,
                        nombre: archivoExtraido.name,
                        size: archivoExtraido.size.toString(),
                        usuarioRegistro: user?.nameuser
                    }

                    InsertArchivoVentanillaUD(modelData).then(response => {
                        if (!isNaN(response.data)) {
                            setOpenSuccess(true);
                            setErrorMessage("Archivo cargado con éxito");
                            getAllFile();
                            setFiles([]);
                        }
                    });
                }
            }
            else {
                setOpenError(true);
                setErrorMessage('El archivo que intenta cargar no es formato PDF');
            }
        } catch (error) {
            setFiles([]);
            setOpenError(true);
            setErrorMessage('No se pudo guardar el archivo');
        }
    }, [files]);

    const handleRemoveFile = (idArchivo) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteArchivoVentanillaUD(idArchivo);
                    if (result.status === 200) {
                        setOpenError(true);
                        setErrorMessage('Archivo eliminado con éxito');
                    }
                    getAllFile();
                }
            });
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo eliminar el archivo');
        }
    };

    async function onClickDownload(idArchivo) {
        try {
            var archivoFormat = await GetByIdArchivoVentanillaUD(idArchivo);
            if (archivoFormat.status === 200) {
                DownloadFile(archivoFormat.data.nombre, archivoFormat.data.archivo);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('No se pudo cargar el archivo');
        }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id: Number(idVentanillaDetalle),
                idOpcion: idRespuesta,
                idUsuario: datos.idUsuario,
                observacionTraslado: datos.observaciones,
                usuarioModifico: user?.nameuser
            };

            const result = await UpdateVentanillaUnicaDetalle(DataToInsert);
            if (result.status === 200) {
                setTimeout(() => {
                    setOpenSuccess(true);
                    getAllReplay();
                    getAllList();
                }, 500);

                setOpenSuccess(true);
                setErrorMessage("Archivos subidos y guardado con éxito");
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo guardar el archivo");
        }
    };

    return (
        <Fragment>
            <ControlModal
                maxWidth="sm"
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Vista del archivo"
            >
                {/* <ViewPDF dataPDF={archivoAdjunto} height={490} width={550} /> */}
            </ControlModal>

            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsData.length !== 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="h4">N° Radicado:</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="h5">{lsData?.nRadicado}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="h4">Tipo de PQRSD:</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="h5">{lsData?.nameTipo}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="h4">Tipo de documento:</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="h5">{lsData?.nameTipoDocumento}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {lsData?.fechaModifico !== null ?
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="h4">Fecha de respuesta:</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h5">{new Date(lsData?.fechaModifico).toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </Grid> : null
                    }

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Accordion title={<><PersonIcon /><Typography sx={{ pl: 2 }} align='right' variant="h4" color="inherit">Información del empleado</Typography></>}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h4">Empleado</Typography>
                                    <Typography variant="h5">{lsData?.nameNombre}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h4">Documento</Typography>
                                    <Typography variant="h5">{lsData?.nameDocumento}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h4">Teléfono</Typography>
                                    <Typography variant="h5">{lsData?.nameTelefono}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h4">Municipio</Typography>
                                    <Typography variant="h5">{lsData?.nameMunicipio}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h4">Solicitado por</Typography>
                                    <Typography variant="h5">{lsData?.nameSolicitadoPor}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="h4">Correo</Typography>
                                    <Typography variant="h5">{lsData?.nameCorreoSolicitado}</Typography>
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={idRespuesta === 1 ? 6 : 12}>
                        <SelectOnChange
                            name="idRespuesta"
                            label="Respuesta"
                            value={idRespuesta}
                            options={lsRespuesta}
                            onChange={(e) => setIdRespuesta(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    {idRespuesta === 0 ?
                        <Grid item xs={12}>
                            <Accordion title={<><UploadIcon /><Typography sx={{ pl: 2 }} align='right' variant="h4" color="inherit">Subir archivo de respuesta</Typography></>}>
                                <Upload disabled={disabledControl} files={files} onDrop={handleDrop} />

                                {filesData?.length !== 0 ? <MultiFilePreview disabledControl={disabledControl} files={filesData} onRemove={handleRemoveFile} onClickDownload={onClickDownload} /> : null}
                            </Accordion>
                        </Grid>
                        :
                        <Fragment>
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idUsuario"
                                        label="Usuario Responsable"
                                        options={lsUsuario}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idUsuario}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={11.9}>
                                <FormProvider {...methods}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        fullWidth
                                        name="observaciones"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.observaciones}
                                    />
                                </FormProvider>
                            </Grid>
                        </Fragment>
                    }

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item>
                        <AnimateButton>
                            <Button variant="contained" size="medium" onClick={handleSubmit(handleClick)}>
                                {TitleButton.Guardar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default ViewReplayPQRS;