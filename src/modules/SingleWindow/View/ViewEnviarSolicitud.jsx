import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import SelectOnChange from "components/input/SelectOnChange";
import { useTheme } from '@mui/material/styles';
import { MessageError, MessageSuccess } from "components/alert/AlertAll";
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';

import AnimateButton from "ui-component/extended/AnimateButton";
import { TitleButton } from "components/helpers/Enums";
import ControlModal from "components/controllers/ControlModal";
import ViewPDF from "components/components/ViewPDF";

import { GetByIdVentanillaUnicaDetalle, UpdateVentanillaUnicaDetalle } from "api/clients/VentanillaUnicaClient";
import { FormProvider, useForm } from "react-hook-form";
import { GetAllComboArea } from "api/clients/UserClient";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import Cargando from "components/loading/Cargando";
import Upload from "components/UploadDocument/Upload";
import Accordion from "components/accordion/Accordion";
import useAuth from "hooks/useAuth";

const lsRespuesta = [
    { value: 0, label: "ATENDIDO" },
    { value: 1, label: "TRASLADO" }
]

const ViewEnviarSolicitud = ({ idVentanilla }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsData, setLsData] = useState([]);
    const [lsUsuario, setLsUsuario] = useState([]);

    const [idRespuesta, setIdRespuesta] = useState(0);
    const [infoArchivoAdjunto, setInfoArchivoAdjunto] = useState(null);

    const [archivoAdjunto, setArchivoAdjunto] = useState("");
    const [openError, setOpenError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const methods = useForm();
    const { handleSubmit, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetByIdVentanillaUnicaDetalle(idVentanilla);
                if (lsServer.status === 200) {
                    setLsData(lsServer.data);

                    const lsServerUsuario = await GetAllComboArea(lsServer.data.idArea);
                    setLsUsuario(lsServerUsuario.data);

                    if (lsServer.data.archivo !== null) {
                        setArchivoAdjunto(lsServer.data.archivo);
                    }
                }
            } catch (error) { }
        }

        getAll();
    }, [idVentanilla]);

    const allowedFiles = ['application/pdf'];
    const handleDrop = useCallback(
        (event) => {
            setInfoArchivoAdjunto(null);
            let selectedFile = event[0];
            setInfoArchivoAdjunto(selectedFile);

            if (selectedFile) {
                if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                    let reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onloadend = async (e) => {
                        setArchivoAdjunto(e.target.result);
                    }
                }
                else {
                    setOpenError(true);
                    setErrorMessage('Este forma no es un PDF');
                }
            }
        },
        [infoArchivoAdjunto]
    );

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id: Number(idVentanilla),
                archivoRespuesta: archivoAdjunto,
                idOpcion: idRespuesta,
                idUsuario: datos.idUsuario,
                observacionTraslado: datos.observaciones,
                usuarioModifico: user?.nameuser
            };

            if (idRespuesta === 0) {
                if (archivoAdjunto !== "") {
                    const result = await UpdateVentanillaUnicaDetalle(DataToInsert);
                    if (result.status === 200) {
                        setTimeout(() => {
                            setOpenSuccess(true);
                            setArchivoAdjunto("");
                            /* getAllReplay(); */
                            reset();
                        }, 500);

                        setOpenSuccess(true);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage("Debe seleccionar el archivo para subirlo");
                }
            } else {
                const result = await UpdateVentanillaUnicaDetalle(DataToInsert);
                if (result.status === 200) {
                    setTimeout(() => {
                        setOpenSuccess(true);
                        setArchivoAdjunto("");
                        /* getAllReplay(); */
                        reset();
                    }, 500);

                    setOpenSuccess(true);
                }
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
                title="Vista del Archivo"
            >
                <ViewPDF dataPDF={archivoAdjunto} height={490} width={550} />
            </ControlModal>

            <MessageSuccess message="Archivo subido y guardado con éxito" open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsData.length !== 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="h4">N° Radicado:</Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="h5">{lsData?.nRadicado}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idUsuario"
                                label="Medio Envío"
                                options={lsUsuario}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idUsuario}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idUsuario"
                                label="Empresa Mensajería"
                                options={lsUsuario}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idUsuario}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputText
                                fullWidth
                                name="observaciones"
                                label="Número Guía"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.observaciones}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputText
                                fullWidth
                                name="solicitadoPor"
                                defaultValue={lsData?.nameSolicitadoPor}
                                label="Solicitado Por"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.solicitadoPor}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputText
                                fullWidth
                                name="telefonoNotificion"
                                defaultValue={lsData?.telefonoNotificion}
                                label="Teléfono de Envío"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.telefonoNotificion}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputText
                                fullWidth
                                name="direccionSolicitante"
                                defaultValue={lsData?.nameDireccion}
                                label="Dirección de Envío"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.direccionSolicitante}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormProvider {...methods}>
                            <InputText
                                fullWidth
                                name="ciudadEnvio"
                                defaultValue={lsData?.nameCiudadNotificacion}
                                label="Ciudad de Envío"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.ciudadEnvio}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={11.5}>
                        <FormProvider {...methods}>
                            <InputText
                                multiline
                                rows={3}
                                fullWidth
                                name="observaciones"
                                label="Observación"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.observaciones}
                            />
                        </FormProvider>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default ViewEnviarSolicitud;