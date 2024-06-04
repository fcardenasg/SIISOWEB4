import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SubCard from 'ui-component/cards/SubCard';
import InputSelect from 'components/input/InputSelect';
import SendIcon from '@mui/icons-material/Send';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import { FormatDate } from 'components/helpers/Format';
import DownloadIcon from '@mui/icons-material/Download';
import { GetAllDocumentoVentanilla, GetByIdVentanillaUnica, NotificarUsuarios, UpdateVentanillaUnicas } from 'api/clients/VentanillaUnicaClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import ListAddSingleWindow from './ListAddSingleWindow';

import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import Upload from 'components/UploadDocument/Upload';
import swal from 'sweetalert';
import { LoadingButton } from '@mui/lab';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import { useNavigate, useParams } from 'react-router-dom';
import Cargando from 'components/loading/Cargando';
import InputDatePicker from 'components/input/InputDatePicker';

const validationSchema = yup.object().shape({
    idCondicion: yup.string().required(ValidationMessage.Requerido),
    idTipo: yup.string().required(ValidationMessage.Requerido),
    fechaRecibido: yup.string().required(ValidationMessage.Requerido),
});

const UpdateSingleWindow = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const [documento, setDocumento] = useState("");

    const [loading, setLoading] = useState(false);
    const [archivoAdjunto, setArchivoAdjunto] = useState(null);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);

    const [lsTipo, setLsTipo] = useState([]);
    const [dataSingle, setDataSingle] = useState([]);
    const [lsMedioIngreso, setLsMedioIngreso] = useState([]);
    const [lsCondiciones, setLsCondiciones] = useState([]);
    const [lsImportancia, setLsImportancia] = useState([]);
    const [lsMunicipio, setLsMunicipio] = useState([]);
    const [lsRecibidoPor, setLsRecibidoPor] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, setValue, watch, formState: { errors } } = methods;
    const values = watch();

    async function downloadFile() { DownloadFile(`ventanillaunica${new Date().getTime()}.pdf`, archivoAdjunto.replace("data:application/pdf;base64,", "")); }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipo = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaTipoPeticion);
                setLsTipo(lsServerTipo.data);

                const lsServerMedioIngreso = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaMedioIngreso);
                setLsMedioIngreso(lsServerMedioIngreso.data);

                const lsServerCondiciones = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaCondiciones);
                setLsCondiciones(lsServerCondiciones.data);

                const lsServerImportancia = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaNivelImportancia);
                setLsImportancia(lsServerImportancia.data);

                const lsServerMunicipio = await GetByTipoCatalogoCombo(CodCatalogo.Municipio);
                setLsMunicipio(lsServerMunicipio.data);

                const lsServerRecibidoPor = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaRecibidoPor);
                setLsRecibidoPor(lsServerRecibidoPor.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    useEffect(() => {
        if (values.idTipo) {
            var lsTipoMemory = lsTipo;
            var codigoTiempo = lsTipoMemory.filter(code => code.value === values.idTipo)[0].codigo;

            var numerotiempo = codigoTiempo.substring(4);
            setValue("tiempoRespuesta", numerotiempo);

            if (values.fechaRecibido) {
                var nuevaFecha = new Date(values.fechaRecibido);
                nuevaFecha.setDate(nuevaFecha.getDate() + Number(numerotiempo));
                setValue("fechaLimiteRespuesta", FormatDate(nuevaFecha));
            }

            var codigoRadicado = codigoTiempo.substring(0, 3);
            var dateNow = new Date();
            var numeroRadicado = `${codigoRadicado}${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDay()}${dateNow.getHours()}${dateNow.getMinutes()}${dateNow.getSeconds()}`;
            setValue("numRadicado", numeroRadicado);
        }
    }, [values.idTipo]);

    useEffect(() => {
        if (values.fechaRecibido) {
            var nuevaFecha = new Date(values.fechaRecibido);
            nuevaFecha.setDate(nuevaFecha.getDate() + Number(values.tiempoRespuesta));
            setValue("fechaLimiteRespuesta", FormatDate(nuevaFecha));
        }
    }, [values.fechaRecibido]);

    useEffect(() => {
        async function getById() {
            try {
                const lsServer = await GetByIdVentanillaUnica(id);
                if (lsServer.status === 200) {
                    setDocumento(lsServer.data.documento);
                    setArchivoAdjunto(lsServer.data.archivoRecibido);

                    setTimeout(() => {
                        setDataSingle(lsServer.data);
                    }, 500);
                }
            } catch (error) { }
        }

        getById();
    }, [id]);

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetAllDocumentoVentanilla(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        if (lsServerEmployee.data.nombre === null) {
                            setOpenError(true);
                            setErrorMessage("No hay registro de este numero de documento o nit");
                        } else {
                            setValue("nombre", lsServerEmployee?.data.nombre);
                            setValue("telefono", lsServerEmployee?.data.telefono);
                            setValue("idMunicipio", lsServerEmployee?.data.idMunicipio);
                            setValue("direccion", lsServerEmployee?.data.direccion);
                            setValue("correo", lsServerEmployee?.data.correo);
                        }
                    }
                }
            }
        } catch (error) { }
    }

    const allowedFiles = ['application/pdf'];
    const handleDrop = useCallback((event) => {
        let selectedFile = event[0];

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
                setArchivoAdjunto(null);
            }
        }
    }, [archivoAdjunto]);

    const handleNotifi = async () => {
        try {
            setLoading(true);

            swal({
                title: "Enviar correo de notificación a usuarios",
                text: "Está a punto de enviar la notificación a cada de uno de los usuarios asignados para responder, ¿Está seguro de realizar esta acción?",
                icon: "warning",
                buttons: ["Cancelar", "Si"],
                dangerMode: true,
                confirm: {
                    text: "Si",
                },
                cancel: {
                    text: "Cancelar",
                },
            }).then(async (willDelete) => {
                if (willDelete) {
                    var result = await NotificarUsuarios(id);
                    if (result.data === "Ok") {
                        setTimeout(() => {
                            setErrorMessage("Se notifico correctamente a cada usuario");
                            setOpenSuccess(true);
                            setLoading(false);
                        }, 500);
                    } else {
                        setLoading(false);
                        setOpenError(true);
                        setErrorMessage(result.data);
                    }
                } else
                    setLoading(false);
            });
        } catch (error) {
            setLoading(false);
            setOpenError(true);
            setErrorMessage("Error: No se pudo enviar la notificación");
        }
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id,
                idTipo: datos.idTipo,
                tiempoRespuesta: datos.tiempoRespuesta,
                numRadicado: datos.numRadicado,
                idCondicion: datos.idCondicion,

                idMedioIngreso: datos.idMedioIngreso !== "" ? datos.idMedioIngreso : null,
                idImportancia: datos.idImportancia !== "" ? datos.idImportancia : null,
                folios: datos.folios !== "" ? datos.folios : null,
                fechaRecibido: datos.fechaRecibido,
                fechaLimiteRespuesta: datos.fechaLimiteRespuesta,
                direccionSolicitante: datos.direccionSolicitante !== "" ? datos.direccionSolicitante : null,

                recibidoPor: datos.recibidoPor !== "" ? datos.recibidoPor : null,
                nombreRecibe: datos.nombreRecibe !== "" ? datos.nombreRecibe : null,
                correoRecibe: datos.correoRecibe !== "" ? datos.correoRecibe : null,
                telefonoNotificion: datos.telefonoNotificion !== "" ? datos.telefonoNotificion : null,
                ciudadEnvio: datos.ciudadEnvio !== "" ? datos.ciudadEnvio : null,

                documento: documento,
                nombre: datos.nombre !== "" ? datos.nombre : null,
                telefono: datos.telefono !== "" ? datos.telefono : null,
                idMunicipio: datos.idMunicipio !== "" ? datos.idMunicipio : null,
                direccion: datos.direccion !== "" ? datos.direccion : null,
                correo: datos.correo !== "" ? datos.correo : null,
                solicitadoPor: datos.solicitadoPor !== "" ? datos.solicitadoPor : null,
                correoSolicitante: datos.correoSolicitante !== "" ? datos.correoSolicitante : null,

                archivoRecibido: archivoAdjunto,
                usuarioModifico: user?.nameuser,
            };

            const result = await UpdateVentanillaUnicas(DataToInsert);
            if (result.status === 200) {
                setErrorMessage(Message.Actualizar);
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    }

    return (
        <Fragment>
            <MessageSuccess message={errorMessage} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
            >
                <ViewPDF dataPDF={archivoAdjunto} />
            </ControlModal>

            <SubCard title={<Typography variant='h4'>Indexación de documentos recibidos</Typography>}>
                {dataSingle.length !== 0 ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">Información de la solicitud</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={dataSingle.idCondicion}
                                                name="idCondicion"
                                                label="Correspondecia"
                                                options={lsCondiciones}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idCondicion}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={dataSingle.idTipo}
                                                name="idTipo"
                                                label="Tipo"
                                                options={lsTipo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idTipo}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                disabled
                                                defaultValue={dataSingle.tiempoRespuesta}
                                                type="number"
                                                fullWidth
                                                name="tiempoRespuesta"
                                                label="Días de respuesta (Días)"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.tiempoRespuesta}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                disabled
                                                defaultValue={dataSingle.numRadicado}
                                                fullWidth
                                                name="numRadicado"
                                                label="N° radicado"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.numRadicado}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={dataSingle.idMedioIngreso}
                                                name="idMedioIngreso"
                                                label="Medio de ingreso"
                                                options={lsMedioIngreso}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idMedioIngreso}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={dataSingle.idImportancia}
                                                name="idImportancia"
                                                label="Importancia"
                                                options={lsImportancia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idImportancia}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.folios}
                                                type="number"
                                                fullWidth
                                                name="folios"
                                                label="Folios"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.folios}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                defaultValue={dataSingle.fechaRecibido}
                                                name="fechaRecibido"
                                                label="Fecha recibido"
                                                bug={errors.fechaRecibido}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                disabled
                                                defaultValue={dataSingle.fechaLimiteRespuesta}
                                                label="Fecha límite de respuesta"
                                                name="fechaLimiteRespuesta"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={dataSingle.recibidoPor}
                                                name="recibidoPor"
                                                label="Recibido por"
                                                options={lsRecibidoPor}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.recibidoPor}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.nombreRecibe}
                                                fullWidth
                                                name="nombreRecibe"
                                                label="Nombre del que recibe"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.nombreRecibe}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.correoRecibe}
                                                fullWidth
                                                name="correoRecibe"
                                                label="Correo del que recibe"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.correoRecibe}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">Información del solicitante</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Entidad que solicita</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.solicitadoPor}
                                                fullWidth
                                                name="solicitadoPor"
                                                label="Solicitado por"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.solicitadoPor}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.correoSolicitante}
                                                fullWidth
                                                name="correoSolicitante"
                                                label="Correo del solicitante"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.correoSolicitante}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.direccionSolicitante}
                                                fullWidth
                                                name="direccionSolicitante"
                                                label="Dirección del solicitante"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.direccionSolicitante}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.telefonoNotificion}
                                                fullWidth
                                                name="telefonoNotificion"
                                                label="Teléfono notificación"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.telefonoNotificion}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.ciudadEnvio}
                                                fullWidth
                                                name="ciudadEnvio"
                                                label="Ciudad notificación"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.ciudadEnvio}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body1">Por favor ingrese el número de documento, luego dar la tecla Enter para buscar la información del empleado solicitante</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <InputOnChange
                                            label="Documento / Nit"
                                            onKeyDown={handleDocumento}
                                            onChange={(e) => setDocumento(e.target.value)}
                                            value={documento}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.nombre}
                                                fullWidth
                                                name="nombre"
                                                label="Nombre"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.nombre}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.telefono}
                                                fullWidth
                                                name="telefono"
                                                label="Teléfono"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.telefono}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={dataSingle.idMunicipio}
                                                name="idMunicipio"
                                                label="Municipio"
                                                options={lsMunicipio}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idMunicipio}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.direccion}
                                                fullWidth
                                                name="direccion"
                                                label="Dirección"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.direccion}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={dataSingle.correo}
                                                fullWidth
                                                name="correo"
                                                label="Correo electrónico del empleado"
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.correo}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">Cargar archivo</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Upload files={archivoAdjunto} onDrop={handleDrop} />
                                    </Grid>

                                    <Grid item xs={6} md={4} lg={2}>
                                        <AnimateButton>
                                            <Button variant="outlined" onClick={downloadFile} disabled={archivoAdjunto === null ? true : false} startIcon={<DownloadIcon fontSize="large" />} fullWidth>
                                                Descargar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={6} md={4} lg={2}>
                                        <AnimateButton>
                                            <Button variant="outlined" color="error" onClick={() => setArchivoAdjunto(null)} disabled={archivoAdjunto === null ? true : false} startIcon={<ClearIcon fontSize="large" />} fullWidth>
                                                Eliminar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">Distribución del tipo de solicitud</Typography>}>
                                <Grid container spacing={2}>
                                    <ListAddSingleWindow documento={documento} idResult={id} />
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={1.8}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={6} md={1.8}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/single-window/index")}>
                                            Cerrar
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <AnimateButton>
                                        <LoadingButton
                                            fullWidth
                                            onClick={handleNotifi}
                                            loading={loading}
                                            loadingPosition="end"
                                            endIcon={<SendIcon />}
                                            variant="outlined"
                                        >
                                            Enviar Notificación
                                        </LoadingButton>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> : <Cargando />
                }
            </SubCard>
        </Fragment >
    );
};

export default UpdateSingleWindow;