import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';

import { IconUser, IconFileUpload, IconFiles, IconMail } from '@tabler/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import PerfectScrollbar from 'react-perfect-scrollbar';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format';
import Accordion from 'components/accordion/Accordion';
import { GetAllDocumentoVentanilla, InsertVentanillaUnica, UpdateVentanillaUnicas } from 'api/clients/VentanillaUnicaClient';
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

const validationSchema = yup.object().shape({
    idMedioIngreso: yup.string().required(ValidationMessage.Requerido),
    idImportancia: yup.string().required(ValidationMessage.Requerido),
    folios: yup.string().required(ValidationMessage.Requerido),
});

function ElevationScroll({ children }) {
    return React.cloneElement(children, {
        style: {
            position: 'relative',
            top: 0,
            width: '100%'
        }
    });
}

const AddSingleWindow = ({ onCancel, ...others }) => {
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [documento, setDocumento] = useState("");
    const [dataPerson, setDataPerson] = useState({
        nombre: '',
        telefono: '',
        idMunicipio: '',
        direccion: '',
        correo: ''
    });
    const [tipoPeticion, setTipoPeticion] = useState("");
    const [tiempoRespuesta, setTiempoRespuesta] = useState("");
    const [numRadicado, setNumRadicado] = useState("");

    const [idResult, setIdResult] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [archivoAdjunto, setArchivoAdjunto] = useState(null);
    const [infoArchivoAdjunto, setInfoArchivoAdjunto] = useState(null);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);

    const [lsTipo, setLsTipo] = useState([]);
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

    const { handleSubmit, formState: { errors } } = methods;

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
                }
            }
        },
        [infoArchivoAdjunto]
    );

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id: idResult,
                idTipo: Number(tipoPeticion),
                tiempoRespuesta: Number(tiempoRespuesta),
                numRadicado: datos.numRadicado,
                idMedioIngreso: datos.idMedioIngreso,
                idCondicion: datos.idCondicion,
                idImportancia: datos.idImportancia,
                folios: datos.folios,
                fechaRecibido: fechaInicio,
                fechaLimiteRespuesta: fechaFin,

                recibidoPor: datos.recibidoPor,
                nombreRecibe: datos.nombreRecibe,
                correoRecibe: datos.correoRecibe,

                documento: documento,
                nombre: dataPerson.nombre,
                telefono: dataPerson.telefono,
                idMunicipio: dataPerson.idMunicipio,
                direccion: dataPerson.direccion,
                correo: dataPerson.correo,
                solicitadoPor: datos.solicitadoPor,
                correoSolicitante: datos.correoSolicitante,

                archivoRecibido: archivoAdjunto,
                usuarioRegistro: user?.nameuser,
            };

            if (idResult === 0) {
                const result = await InsertVentanillaUnica(DataToInsert);
                if (result.status === 200) {
                    setIdResult(result.data);
                    setOpenSuccess(true);
                }
            } else {
                const result = await UpdateVentanillaUnicas(DataToInsert);
                if (result.status === 200) {
                    setIdResult(result.data);
                    setOpenSuccess(true);
                }
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    }

    const handleTipo = (event) => {
        try {
            setTipoPeticion(event.target.value);

            var lsTipoMemory = lsTipo;
            var codigoTiempo = lsTipoMemory.filter(code => code.value === event.target.value)[0].codigo;

            var numerotiempo = codigoTiempo.substring(4);
            setTiempoRespuesta(numerotiempo);

            if (fechaInicio != null) {
                var nuevaFecha = new Date(fechaInicio);
                nuevaFecha.setDate(nuevaFecha.getDate() + Number(numerotiempo));

                setFechaFin(FormatDate(nuevaFecha));
            }

            var codigoRadicado = codigoTiempo.substring(0, 3);
            var dateNow = new Date();
            var numeroRadicado = `${codigoRadicado}${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDay()}${dateNow.getHours()}${dateNow.getMinutes()}${dateNow.getSeconds()}`;
            setNumRadicado(numeroRadicado);
        } catch (error) {

        }
    }

    return (
        <Fragment>
            {idResult === 0 ?
                <MessageSuccess message={Message.Guardar} open={openSuccess} onClose={() => setOpenSuccess(false)} /> :
                <MessageSuccess message={Message.Actualizar} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            }

            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
            >
                <ViewPDF dataPDF={archivoAdjunto} />
            </ControlModal>

            <ElevationScroll {...others}>
                <SubCard
                    title={<Typography variant='h4'>Indexación De Documentos Recibidos</Typography>}
                    sx={{
                        width: '100%',
                        maxWidth: 550
                    }}
                    content={false}
                >
                    <PerfectScrollbar style={{ height: 'calc(70vh - 0px)', overflowX: 'hidden' }}>
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            <Grid item xs={12}>
                                <Accordion title={<><IconUser /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información De La Solicitud</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                            <SelectOnChange
                                                name="idTipo"
                                                label="Tipo"
                                                value={tipoPeticion}
                                                options={lsTipo}
                                                onChange={handleTipo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={3.5}>
                                            <FormProvider {...methods}>
                                                <InputOnChange
                                                    disabled
                                                    type="number"
                                                    fullWidth
                                                    name="tiempoRespuesta"
                                                    onChange={(e) => setTiempoRespuesta(e.target.value)}
                                                    value={tiempoRespuesta}
                                                    label="Días de Respuesta (Días)"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3.5}>
                                            <InputOnChange
                                                disabled
                                                fullWidth
                                                name="numRadicado"
                                                onChange={(e) => setNumRadicado(e.target.value)}
                                                value={numRadicado}
                                                label="N° Radicado"
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idMedioIngreso"
                                                    label="Medio de Ingreso"
                                                    options={lsMedioIngreso}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idMedioIngreso}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idCondicion"
                                                    label="Condición"
                                                    options={lsCondiciones}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idCondicion}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={8}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idImportancia"
                                                    label="Importancia"
                                                    options={lsImportancia}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idImportancia}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <FormProvider {...methods}>
                                                <InputText
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

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputDatePick
                                                    onChange={(e) => {
                                                        setFechaInicio(e.target.value);

                                                        var nuevaFecha = new Date(e.target.value);
                                                        nuevaFecha.setDate(nuevaFecha.getDate() + Number(tiempoRespuesta));
                                                        setFechaFin(FormatDate(nuevaFecha));
                                                    }}
                                                    value={fechaInicio}
                                                    label="Fecha Recibido"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputDatePick
                                                    disabled
                                                    onChange={(e) => setFechaFin(e.target.value)}
                                                    value={fechaFin}
                                                    label="Fecha Limite de Respuesta"
                                                    name="fechaLimiteRespuesta"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="recibidoPor"
                                                    label="Recibido Por"
                                                    options={lsRecibidoPor}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.recibidoPor}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    fullWidth
                                                    name="nombreRecibe"
                                                    label="Nombre De Que Recibe"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.nombreRecibe}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    fullWidth
                                                    name="correoRecibe"
                                                    label="Correo Del Que Recibe"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.correoRecibe}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconMail /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información Del Empleado Solicitante</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Información Del Solicitante</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    fullWidth
                                                    name="solicitadoPor"
                                                    label="Solicitado Por"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.correoRecibe}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    fullWidth
                                                    name="correoSolicitante"
                                                    label="Correo Del Solicitante"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.correoRecibe}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    fullWidth
                                                    name="direccionSolicitante"
                                                    label="Dirección Del Solicitante"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.correoRecibe}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="body1">Por favor ingrese el número de documento, luego dar la tecla Enter para buscar la información del empleado solicitante</Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <InputOnChange
                                                label="Documento / Nit"
                                                onKeyDown={handleDocumento}
                                                onChange={(e) => setDocumento(e.target.value)}
                                                value={documento}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <InputOnChange
                                                label="Teléfono"
                                                onChange={(e) => setDataPerson({ ...dataPerson, telefono: e.target.value })}
                                                value={dataPerson.telefono}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputOnChange
                                                label="Nombre"
                                                onChange={(e) => setDataPerson({ ...dataPerson, nombre: e.target.value })}
                                                value={dataPerson.nombre}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <SelectOnChange
                                                name="idMunicipio"
                                                label="Municipio"
                                                value={dataPerson.idMunicipio}
                                                onChange={(e) => setDataPerson({ ...dataPerson, idMunicipio: e.target.value })}
                                                options={lsMunicipio}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <InputOnChange
                                                label="Dirección"
                                                onChange={(e) => setDataPerson({ ...dataPerson, direccion: e.target.value })}
                                                value={dataPerson.direccion}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputOnChange
                                                label="Correo Electrónico Del Empleado"
                                                onChange={(e) => setDataPerson({ ...dataPerson, correo: e.target.value })}
                                                value={dataPerson.correo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconFileUpload /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Cargar Archivo</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Upload files={infoArchivoAdjunto} onDrop={handleDrop} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button disabled={archivoAdjunto === null ? true : false} fullWidth variant="outlined" component="label"
                                                    startIcon={<VisibilityIcon fontSize="small" />} onClick={() => setOpenViewArchivo(true)}>
                                                    {TitleButton.VerArchivo}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button fullWidth color="error" variant="outlined" component="label"
                                                    startIcon={<ClearIcon fontSize="small" />} onClick={() => { setInfoArchivoAdjunto(null); setArchivoAdjunto(null); }}>
                                                    Remover
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body1"><b>Nota:</b> Al guardar el registro se habilitará la opción para agregar los tipos de solicitudes que el empleado solicito</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion disabled={idResult !== 0 ? false : true} title={<><IconFiles /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Distribución Del Tipo De Solicitud</Typography></>}>
                                    <Grid container spacing={2}>
                                        <ListAddSingleWindow documento={documento} idResult={idResult} />
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {idResult === 0 ? "Registrar" : TitleButton.Actualizar}
                                        </Button>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Button variant="outlined" fullWidth onClick={onCancel}>
                                            Cerrar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>
                </SubCard>
            </ElevationScroll>
        </Fragment>
    );
};

export default AddSingleWindow;