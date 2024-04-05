import React, { Fragment, useEffect, useState } from 'react';

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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UploadIcon from '@mui/icons-material/Upload';

import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format';
import Accordion from 'components/accordion/Accordion';
import { InsertVentanillaUnica } from 'api/clients/VentanillaUnicaClient';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import { CodCatalogo, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputOnChange from 'components/input/InputOnChange';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import ViewEmployee from 'components/views/ViewEmployee';
import ListAddSingleWindow from 'modules/SingleWindow/Form/ListAddSingleWindow';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';

const validationSchema = yup.object().shape({
    idTipo: yup.string().required(ValidationMessage.Requerido),
    tiempoRespuesta: yup.string().required(ValidationMessage.Requerido),
    numRadicado: yup.string().required(ValidationMessage.Requerido),

    idMedioIngreso: yup.string().required(ValidationMessage.Requerido),
    idImportancia: yup.string().required(ValidationMessage.Requerido),
    folios: yup.string().required(ValidationMessage.Requerido),

    nombre: yup.string().required(ValidationMessage.Requerido),
    telefono: yup.string().required(ValidationMessage.Requerido),
    gmail: yup.string().required(ValidationMessage.Requerido),
    direccion: yup.string().required(ValidationMessage.Requerido),
});

const NewAddRequests = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [documento, setDocumento] = useState("");
    const [idResult, setIdResult] = useState(0);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [archivoAdjunto, setArchivoAdjunto] = useState(null);
    const [infoArchivoAdjunto, setInfoArchivoAdjunto] = useState([]);
    const [openViewArchivo, setOpenViewArchivo] = useState(false);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [lsTipo, setLsTipo] = useState([]);
    const [lsMedioIngreso, setLsMedioIngreso] = useState([]);
    const [lsCondiciones, setLsCondiciones] = useState([]);
    const [lsImportancia, setLsImportancia] = useState([]);
    const [lsMunicipio, setLsMunicipio] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
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
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee([]);
        } catch (error) { }
    }

    const allowedFiles = ['application/pdf'];
    const handleFile = async (event) => {
        let selectedFile = event.target.files[0];
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
    }

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                id: idResult,
                idTipo: datos.idTipo,
                tiempoRespuesta: datos.tiempoRespuesta,
                numRadicado: datos.numRadicado,
                idMedioIngreso: datos.idMedioIngreso,
                idCondicion: datos.idCondicion,
                idImportancia: datos.idImportancia,
                folios: datos.folios,
                fechaRecibido: fechaInicio,
                fechaLimiteRespuesta: fechaFin,

                documento: documento,
                nombre: datos.nombre,
                telefono: datos.telefono,
                idMunicipio: datos.idMunicipio,
                direccion: datos.direccion,
                gmail: datos.gmail,
                archivoRecibido: archivoAdjunto,
                usuarioRegistro: user?.nameuser,
            }

            const result = await InsertVentanillaUnica(DataToInsert);
            if (result.status === 200) {
                setIdResult(result.data);
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess message={Message.Guardar} open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaArchivo}
                open={openViewArchivo}
                onClose={() => setOpenViewArchivo(false)}
                maxWidth="md"
            >
                <ViewPDF dataPDF={archivoAdjunto} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Peticiones"
                        key={lsEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title={<Typography variant="h4">Registrar Petición</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Accordion title={<><IconUser /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información De La Solicitud</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputSelect
                                                    name="idTipo"
                                                    label="Tipo"
                                                    options={lsTipo}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.idTipo}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    fullWidth
                                                    name="tiempoRespuesta"
                                                    label="Tiempo de Respuesta (Días)"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.tiempoRespuesta}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    type="number"
                                                    fullWidth
                                                    name="numRadicado"
                                                    label="N° Radicado"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors.numRadicado}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
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

                                        <Grid item xs={3}>
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

                                        <Grid item xs={3}>
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

                                        <Grid item xs={3}>
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

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputDatePick
                                                    onChange={(e) => {
                                                        setFechaInicio(e.target.value);

                                                        var nuevaFecha = new Date(e.target.value);
                                                        nuevaFecha.setDate(nuevaFecha.getDate() + 15);
                                                        setFechaFin(FormatDate(nuevaFecha));
                                                    }}
                                                    value={fechaInicio}
                                                    label="Fecha Recibido"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <FormProvider {...methods}>
                                                <InputDatePick
                                                    onChange={(e) => setFechaFin(e.target.value)}
                                                    value={fechaFin}
                                                    label="Fecha Limite de Respuesta"
                                                    name="fechaLimiteRespuesta"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconMail /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Información Del Solicitante</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <InputOnChange
                                                label="Documento / Nit"
                                                onKeyDown={handleDocumento}
                                                onChange={(e) => setDocumento(e?.target.value)}
                                                value={documento}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        {lsEmployee.length !== 0 ?
                                            <Fragment>
                                                <Grid item xs={4}>
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue={lsEmployee?.nombres}
                                                            fullWidth
                                                            name="nombre"
                                                            label="Nombre"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors.nombre}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue={lsEmployee?.celular}
                                                            fullWidth
                                                            name="telefono"
                                                            label="Teléfono"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors.telefono}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            defaultValue={lsEmployee?.municipioResidenciaTrabaja}
                                                            name="idMunicipio"
                                                            label="Municipio"
                                                            options={lsMunicipio}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors.idMunicipio}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue={lsEmployee?.direccionResidencia}
                                                            fullWidth
                                                            name="direccion"
                                                            label="Dirección"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors.direccion}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <FormProvider {...methods}>
                                                        <InputText
                                                            defaultValue={lsEmployee?.email}
                                                            fullWidth
                                                            name="gmail"
                                                            label="Correo Electrónico"
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors.gmail}
                                                        />
                                                    </FormProvider>
                                                </Grid>
                                            </Fragment> : null
                                        }
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Accordion title={<><IconFileUpload /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Archivo Adjunto</Typography></>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2.5}>
                                            <AnimateButton>
                                                <Button fullWidth variant="contained" component="label" endIcon={<UploadIcon fontSize="small" />}>
                                                    <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                                    {TitleButton.SubirArchivo}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={2.5}>
                                            <AnimateButton>
                                                <Button disabled={archivoAdjunto === null ? true : false} fullWidth variant="outlined" component="label"
                                                    endIcon={<VisibilityIcon fontSize="small" />} onClick={() => setOpenViewArchivo(true)}>
                                                    {TitleButton.VerArchivo}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <Typography variant="h5">Nombre: {infoArchivoAdjunto.name}</Typography>
                                            <Typography variant="h5">Size: {infoArchivoAdjunto.size}</Typography>
                                        </Grid>
                                    </Grid>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Al guardar el registro se habilitará la opción para agregar los tipos de solicitudes que el empleado solicito</Typography>
                            </Grid>

                            {idResult !== 0 ?
                                <Grid item xs={12}>
                                    <Accordion title={<><IconFiles /><Typography sx={{ pl: 2 }} align='right' variant="h5" color="inherit">Distribución Del Tipo De Solicitud</Typography></>}>
                                        <Grid container spacing={2}>
                                            <ListAddSingleWindow documento={documento} idResult={idResult} />
                                        </Grid>
                                    </Accordion>
                                </Grid> : null
                            }

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Button disabled={idResult === 0 ? false : true} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Agregar}
                                        </Button>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/requests/new-list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
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

export default NewAddRequests;