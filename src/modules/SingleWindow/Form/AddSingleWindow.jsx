import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SubCard from 'ui-component/cards/SubCard';
import InputSelect from 'components/input/InputSelect';
import SendIcon from '@mui/icons-material/Send';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format';
import DownloadIcon from '@mui/icons-material/Download';
import { GetAllDocumentoVentanilla, InsertVentanillaUnica, NotificarUsuarios, UpdateVentanillaUnicas } from 'api/clients/VentanillaUnicaClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import ListAddSingleWindow from './ListAddSingleWindow';

import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import Upload from 'components/UploadDocument/Upload';
import swal from 'sweetalert';
import { LoadingButton } from '@mui/lab';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
    idMedioIngreso: yup.string().required(ValidationMessage.Requerido),
    idImportancia: yup.string().required(ValidationMessage.Requerido),
    folios: yup.string().required(ValidationMessage.Requerido),
});

const AddSingleWindow = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const [idResult, setIdResult] = useState(0);
    const [documento, setDocumento] = useState("");
    const [dataPerson, setDataPerson] = useState({
        nombre: "",
        telefono: "",
        idMunicipio: "",
        direccion: "",
        correo: ""
    });
    const [tipoPeticion, setTipoPeticion] = useState("");
    const [tiempoRespuesta, setTiempoRespuesta] = useState("");
    const [numRadicado, setNumRadicado] = useState("");

    const [loading, setLoading] = useState(false);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [archivoAdjunto, setArchivoAdjunto] = useState(null);
    const [infoArchivoAdjunto, setInfoArchivoAdjunto] = useState(null);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);

    const [lsTipo, setLsTipo] = useState([]);
    const [dataVentanilla, setDataVentanilla] = useState([]);
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

    const { handleSubmit, reset, formState: { errors } } = methods;

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
                            setDataPerson({
                                nombre: lsServerEmployee?.data.nombre,
                                telefono: lsServerEmployee?.data.telefono,
                                idMunicipio: lsServerEmployee?.data.idMunicipio,
                                direccion: lsServerEmployee?.data.direccion,
                                correo: lsServerEmployee?.data.correo
                            });
                        }
                    }
                }
            }
        } catch (error) { }
    }

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
                    setInfoArchivoAdjunto(null);
                    setArchivoAdjunto("");
                }
            }
        },
        [infoArchivoAdjunto]
    );

    const handleTipo = (event) => {
        try {
            setTipoPeticion(event.target.value);

            var lsTipoMemory = lsTipo;
            var codigoTiempo = lsTipoMemory.filter(code => code.value === event.target.value)[0].codigo;

            var numerotiempo = codigoTiempo.substring(4);
            setTiempoRespuesta(numerotiempo);

            if (fechaInicio !== "") {
                var nuevaFecha = new Date(fechaInicio);
                nuevaFecha.setDate(nuevaFecha.getDate() + Number(numerotiempo));

                setFechaFin(FormatDate(nuevaFecha));
            }

            var codigoRadicado = codigoTiempo.substring(0, 3);
            var dateNow = new Date();
            var numeroRadicado = `${codigoRadicado}${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDay()}${dateNow.getHours()}${dateNow.getMinutes()}${dateNow.getSeconds()}`;
            setNumRadicado(numeroRadicado);
        } catch (error) { }
    }

    const handleClear = () => {
        reset();
        setDataPerson({
            nombre: "",
            telefono: "",
            idMunicipio: "",
            direccion: "",
            correo: ""
        });
        setIdResult(0);
        setNumRadicado("");
        setTiempoRespuesta("");
        setTipoPeticion("");
        setFechaInicio("");
        setFechaFin("");
        setDocumento("");
        setArchivoAdjunto(null);
        setInfoArchivoAdjunto(null);
    }

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
                    var result = await NotificarUsuarios(idResult);
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
                id: idResult,
                idTipo: tipoPeticion !== "" ? Number(tipoPeticion) : null,
                tiempoRespuesta: tiempoRespuesta !== "" ? Number(tiempoRespuesta) : null,
                numRadicado: numRadicado !== "" ? numRadicado : null,
                idMedioIngreso: datos.idMedioIngreso !== "" ? datos.idMedioIngreso : null,
                idCondicion: datos.idCondicion !== "" ? datos.idCondicion : null,
                idImportancia: datos.idImportancia !== "" ? datos.idImportancia : null,
                folios: datos.folios !== "" ? datos.folios : null,
                fechaRecibido: fechaInicio !== "" ? fechaInicio : null,
                fechaLimiteRespuesta: fechaFin !== "" ? fechaFin : null,
                direccionSolicitante: datos.direccionSolicitante !== "" ? datos.direccionSolicitante : null,

                recibidoPor: datos.recibidoPor !== "" ? datos.recibidoPor : null,
                nombreRecibe: datos.nombreRecibe !== "" ? datos.nombreRecibe : null,
                correoRecibe: datos.correoRecibe !== "" ? datos.correoRecibe : null,
                telefonoNotificion: datos.telefonoNotificion !== "" ? datos.telefonoNotificion : null,
                ciudadEnvio: datos.ciudadEnvio !== "" ? datos.ciudadEnvio : null,

                documento: documento,
                nombre: dataPerson.nombre !== "" ? dataPerson.nombre : null,
                telefono: dataPerson.telefono !== "" ? dataPerson.telefono : null,
                idMunicipio: dataPerson.idMunicipio !== "" ? dataPerson.idMunicipio : null,
                direccion: dataPerson.direccion !== "" ? dataPerson.direccion : null,
                correo: dataPerson.correo !== "" ? dataPerson.correo : null,
                solicitadoPor: datos.solicitadoPor !== "" ? datos.solicitadoPor : null,
                correoSolicitante: datos.correoSolicitante !== "" ? datos.correoSolicitante : null,

                archivoRecibido: archivoAdjunto,
                usuarioRegistro: user?.nameuser,
            };

            console.log("DataToInsert => ", DataToInsert);

            setDataVentanilla(DataToInsert);

            if (idResult === 0) {
                const result = await InsertVentanillaUnica(DataToInsert);
                if (result.status === 200) {
                    setErrorMessage(Message.Guardar);
                    setIdResult(result.data);
                    setOpenSuccess(true);
                }
            } else {
                const result = await UpdateVentanillaUnicas(DataToInsert);
                if (result.status === 200) {
                    setErrorMessage(Message.Actualizar);
                    setIdResult(result.data);
                    setOpenSuccess(true);
                }
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SubCard title={<Typography variant="h4">Información de la solicitud</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <SelectOnChange
                                        name="idTipo"
                                        label="Tipo"
                                        value={tipoPeticion}
                                        options={lsTipo}
                                        onChange={handleTipo}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputOnChange
                                        disabled
                                        type="number"
                                        fullWidth
                                        name="tiempoRespuesta"
                                        onChange={(e) => setTiempoRespuesta(e.target.value)}
                                        value={tiempoRespuesta}
                                        label="Días de respuesta (Días)"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputOnChange
                                        disabled
                                        fullWidth
                                        name="numRadicado"
                                        onChange={(e) => setNumRadicado(e.target.value)}
                                        value={numRadicado}
                                        label="N° radicado"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue=""
                                            name="idMedioIngreso"
                                            label="Medio de ingreso"
                                            options={lsMedioIngreso}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idMedioIngreso}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue=""
                                            name="idCondicion"
                                            label="Condición"
                                            options={lsCondiciones}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idCondicion}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue=""
                                            name="idImportancia"
                                            label="Importancia"
                                            options={lsImportancia}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idImportancia}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
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
                                        <InputDatePick
                                            onChange={(e) => {
                                                setFechaFin("");
                                                setFechaInicio(e.target.value);

                                                if (e.target.value !== "") {
                                                    var nuevaFecha = new Date(e.target.value);
                                                    nuevaFecha.setDate(nuevaFecha.getDate() + Number(tiempoRespuesta));
                                                    setFechaFin(FormatDate(nuevaFecha));
                                                } else
                                                    setFechaFin("");
                                            }}
                                            value={fechaInicio}
                                            label="Fecha recibido"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputDatePick
                                            disabled
                                            onChange={(e) => setFechaFin(e.target.value)}
                                            value={fechaFin}
                                            label="Fecha límite de respuesta"
                                            name="fechaLimiteRespuesta"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
                                            fullWidth
                                            name="solicitadoPor"
                                            label="Solicitado por"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.correoRecibe}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="correoSolicitante"
                                            label="Correo del solicitante"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.correoRecibe}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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
                                    <InputOnChange
                                        label="Nombre"
                                        onChange={(e) => setDataPerson({ ...dataPerson, nombre: e.target.value })}
                                        value={dataPerson.nombre}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputOnChange
                                        label="Teléfono"
                                        onChange={(e) => setDataPerson({ ...dataPerson, telefono: e.target.value })}
                                        value={dataPerson.telefono}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <SelectOnChange
                                        name="idMunicipio"
                                        label="Municipio"
                                        value={dataPerson.idMunicipio}
                                        onChange={(e) => setDataPerson({ ...dataPerson, idMunicipio: e.target.value })}
                                        options={lsMunicipio}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputOnChange
                                        label="Dirección"
                                        onChange={(e) => setDataPerson({ ...dataPerson, direccion: e.target.value })}
                                        value={dataPerson.direccion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputOnChange
                                        label="Correo electrónico del empleado"
                                        onChange={(e) => setDataPerson({ ...dataPerson, correo: e.target.value })}
                                        value={dataPerson.correo}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard title={<Typography variant="h4">Cargar archivo</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Upload files={infoArchivoAdjunto} onDrop={handleDrop} />
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
                                        <Button variant="outlined" color="error" onClick={() => { setArchivoAdjunto(null); setInfoArchivoAdjunto(null); }} disabled={archivoAdjunto === null ? true : false} startIcon={<ClearIcon fontSize="large" />} fullWidth>
                                            Eliminar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    {idResult !== 0 ?
                        <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4">Distribución del tipo de solicitud</Typography>}>
                                <Grid container spacing={2}>
                                    <ListAddSingleWindow documento={documento} idResult={idResult} dataVentanilla={dataVentanilla} />
                                </Grid>
                            </SubCard>
                        </Grid> :
                        <Grid item xs={12}>
                            <Typography variant="body1"><b>Nota:</b> Al guardar el registro se habilitará la opción para agregar los tipos de solicitudes que el empleado solicito</Typography>
                        </Grid>
                    }

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={1.8}>
                                <AnimateButton>
                                    <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {idResult === 0 ? "Registrar" : TitleButton.Actualizar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={6} md={1.8}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={handleClear}>
                                        Limpiar
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
                                        disabled={idResult === 0 ? true : false}
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
                </Grid>
            </SubCard>
        </Fragment >
    );
};

export default AddSingleWindow;