import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ViewEmployee from 'components/views/ViewEmployee';
import useAuth from 'hooks/useAuth';
import InputOnChange from 'components/input/InputOnChange';
import InputText from 'components/input/InputText';
import InputCheckBox from 'components/input/InputCheckBox';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputSelect from 'components/input/InputSelect';
import { CodCatalogo, Message, TitleButton, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton'
import SubCard from 'ui-component/cards/SubCard';
import { MessageSuccess, MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { UpdateAlcoholAndDrugTestings } from 'api/clients/AlcoholAndDrugTestingClient';
import { PutAlcoholAndDrugTesting } from 'formatdata/AlcoholAndDrugTestingForm';
import { FormatDate } from 'components/helpers/Format';

import { GetByIdAlcoholAndDrugTesting } from 'api/clients/AlcoholAndDrugTestingClient';
import Cargando from 'components/loading/Cargando';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const UpdateAlcoholAndDrugTesting = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewPdf, setOpenViewPdf] = useState(false);

    const [documento, setDocumento] = useState('');
    const [nombresEmpleado, setNombreEmpleado] = useState('');
    const [documentSolicitante, setDocumentoSolicitante] = useState('');
    const [realizada, setRealizada] = useState(DefaultValue.Opcion_NO);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsAlcoholAndDrugTesting, setLsAlcoholAndDrugTesting] = useState([]);
    const [lsOpciones, setLsOpciones] = useState([]);
    const [lsTipoMotivo, setLsTipoMotivo] = useState([]);
    const [lsMotivoNoAsistencia, setLsMotivoNoAsistencia] = useState([]);
    const [lsMuestraAD, setLsMuestraAD] = useState([]);
    const [lsMuestraA, setLsMuestraA] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);
    const [lsConceptoA, setLsConceptoA] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors } = methods;
    /* { resolver: yupResolver(validationSchema) } */

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleLoadingDocumentoSolicitante = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setNombreEmpleado(lsServerEmployee.data.nombres);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleDocumentoSolicitante = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setNombreEmpleado(lsServerEmployee.data.nombres);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
        }
    }

    async function GetAll() {
        try {
            const lsServerData = await GetByIdAlcoholAndDrugTesting(id);
            if (lsServerData.status === 200) {
                setDocumento(lsServerData.data.documento);
                handleLoadingDocument(lsServerData.data.documento);
                handleLoadingDocumentoSolicitante(lsServerData.data.idDocumentoSolicitante);
                setDocumentoSolicitante(lsServerData.data.idDocumentoSolicitante);
                setLsAlcoholAndDrugTesting(lsServerData.data);
                setRealizada(lsServerData.data.idRealizada)
            }

            const lsServerOpciones = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultOpciones = lsServerOpciones.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsOpciones(resultOpciones);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MOTIVO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoMotivo(resultMotivo);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MOTIVO_NO_ASIS);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivoNoAsistencia(resultContingencia);

            const lsServerMuestraAD = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MUESTRAAD);
            var resultMuestraAD = lsServerMuestraAD.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMuestraAD(resultMuestraAD);

            const lsServerMuestraA = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MUESTRAAL);
            var resultMuestraA = lsServerMuestraA.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMuestraA(resultMuestraA);

            const lsServerResultado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_RESULTADO);
            var resultResultado = lsServerResultado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResultado(resultResultado);

            const lsServerConceptoA = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_CONCEPTOA);
            var resultConceptoA = lsServerConceptoA.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConceptoA(resultConceptoA);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    setTimeout(() => {
        if (lsAlcoholAndDrugTesting.length != 0) {
            setTimeWait(true);
        }
    }, 1500);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutAlcoholAndDrugTesting(id, documento, FormatDate(datos.fecha), datos.idMotivoPrueba, datos.sustancia1,
                datos.idMuestra1, datos.idResultado1, datos.sustancia2, datos.idMuestra2, datos.idResultado2, datos.sustancia3, datos.idMuestra3,
                datos.idResultado3, datos.sustancia4, datos.idMuestra4, datos.idResultado4, datos.sustancia5, datos.idMuestra5, datos.idResultado5,
                datos.sustancia6, datos.idMuestra6, datos.idResultado6, datos.idRemitido, documentSolicitante, 0, datos.idConcepto,
                realizada, datos.idMotivoAsis, datos.observaciones, lsAlcoholAndDrugTesting.idMedico, lsAlcoholAndDrugTesting.usuarioRegistro,
                lsAlcoholAndDrugTesting.fechaRegistro, user.email, FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateAlcoholAndDrugTestings(DataToInsert);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            {timeWait ?
                <Fragment>
                    <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                    <ControlModal
                        maxWidth="md"
                        open={open}
                        onClose={() => setOpen(false)}
                        title="DICTADO POR VOZ"
                    >
                        <ControllerListen />
                    </ControlModal>

                    <FullScreenDialog
                        open={openTemplate}
                        title="LISTADO DE PLANTILLA"
                        handleClose={() => setOpenTemplate(false)}
                    >
                        <ListPlantillaAll />
                    </FullScreenDialog>

                    <FullScreenDialog
                        open={openViewPdf}
                        title="VISTA DE PDF"
                        handleClose={() => setOpenViewPdf(false)}
                    >

                    </FullScreenDialog>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                disabled={true}
                                key={lsEmployee.documento}
                                documento={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">PRUEBA DE ALCOHOL Y DROGAS</Typography>}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={lsAlcoholAndDrugTesting.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivoPrueba"
                                                label="Motivo"
                                                defaultValue={lsAlcoholAndDrugTesting.idMotivoPrueba}
                                                options={lsTipoMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <SelectOnChange
                                                name="idRealizada"
                                                label="Realizada"
                                                value={realizada}
                                                onChange={(e) => setRealizada(e.target.value)}
                                                options={lsOpciones}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    {realizada == DefaultValue.Opcion_NO ?
                                        <Fragment>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idMotivoAsis"
                                                        label="Motivo de No Asistencia"
                                                        defaultValue={lsAlcoholAndDrugTesting.idMotivoAsis}
                                                        options={lsMotivoNoAsistencia}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid>

                                            <Grid item xs={8}>
                                                <FormProvider {...methods}>
                                                    <InputText
                                                        defaultValue={lsAlcoholAndDrugTesting.observaciones}
                                                        fullWidth
                                                        name="observaciones"
                                                        label="Observaciones del  No Asistencia"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <Grid item xs={12}>
                                                <SubCard>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    label="Cocaína"
                                                                    name="sustancia1"
                                                                    size={30}
                                                                    defaultValue={lsAlcoholAndDrugTesting.sustancia1}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idMuestra1"
                                                                    label="Muestra"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idMuestra1}
                                                                    options={lsMuestraAD}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idResultado1"
                                                                    label="Resultados"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idResultado1}
                                                                    options={lsResultado}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    label="Marihuana"
                                                                    name="sustancia2"
                                                                    size={30}
                                                                    defaultValue={lsAlcoholAndDrugTesting.sustancia2}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idMuestra2"
                                                                    label="Muestra"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idMuestra2}
                                                                    options={lsMuestraAD}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idResultado2"
                                                                    label="Resultados"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idResultado2}
                                                                    options={lsResultado}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    label="Morfina"
                                                                    name="sustancia3"
                                                                    size={30}
                                                                    defaultValue={lsAlcoholAndDrugTesting.sustancia3}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idMuestra3"
                                                                    label="Muestra"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idMuestra3}
                                                                    options={lsMuestraAD}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idResultado3"
                                                                    label="Resultados"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idResultado3}
                                                                    options={lsResultado}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    label="Benzodiazepina"
                                                                    name="sustancia4"
                                                                    size={30}
                                                                    defaultValue={lsAlcoholAndDrugTesting.sustancia4}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idMuestra4"
                                                                    label="Muestra"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idMuestra4}
                                                                    options={lsMuestraAD}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idResultado4"
                                                                    label="Resultados"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idResultado4}
                                                                    options={lsResultado}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    label="Anfetaminas"
                                                                    name="sustancia5"
                                                                    size={30}
                                                                    defaultValue={lsAlcoholAndDrugTesting.sustancia5}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idMuestra5"
                                                                    label="Muestra"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idMuestra5}
                                                                    options={lsMuestraAD}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idResultado5"
                                                                    label="Resultados"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idResultado5}
                                                                    options={lsResultado}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputCheckBox
                                                                    label="Alcohol"
                                                                    name="sustancia6"
                                                                    size={30}
                                                                    defaultValue={lsAlcoholAndDrugTesting.sustancia6}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idMuestra6"
                                                                    label="Muestra"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idMuestra6}
                                                                    options={lsMuestraA}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idResultado6"
                                                                    label="Resultados"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idResultado6}
                                                                    options={lsResultado}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Divider />

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputOnChange
                                                                label="N° Documento"
                                                                onKeyDown={handleDocumentoSolicitante}
                                                                onChange={(e) => setDocumentoSolicitante(e?.target.value)}
                                                                value={documentSolicitante}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputOnChange
                                                                label="Nombres"
                                                                value={nombresEmpleado}
                                                                onChange={(e) => setNombreEmpleado(e?.target.value)}
                                                                disabled
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <FormProvider {...methods}>
                                                                <InputSelect
                                                                    name="idConcepto"
                                                                    label="Concepto Aptitud"
                                                                    defaultValue={lsAlcoholAndDrugTesting.idConcepto}
                                                                    options={lsConceptoA}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <FormProvider {...methods}>
                                                                <InputText
                                                                    multiline
                                                                    rows={4}
                                                                    defaultValue={lsAlcoholAndDrugTesting.observaciones}
                                                                    fullWidth
                                                                    name="observaciones"
                                                                    label="Observaciones y/o Medicamentos Actuales"
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                    bug={errors}
                                                                />
                                                            </FormProvider>
                                                        </Grid>

                                                        <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                                            <DetailedIcon
                                                                title={DetailIcons[0].title}
                                                                onClick={() => setOpenTemplate(true)}
                                                                icons={DetailIcons[0].icons}
                                                            />

                                                            <DetailedIcon
                                                                title={DetailIcons[1].title}
                                                                onClick={() => setOpen(true)}
                                                                icons={DetailIcons[1].icons}
                                                            />

                                                            <DetailedIcon
                                                                title={DetailIcons[2].title}
                                                                onClick={() => setOpenViewPdf(true)}
                                                                icons={DetailIcons[2].icons}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                        </Fragment>
                                    }
                                </Grid>

                                <Grid item xs={12} sx={{ pt: 4 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                    {TitleButton.Guardar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => navigate("/alcoholanddrugtesting/list")}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </Fragment>
    );
};

export default UpdateAlcoholAndDrugTesting;