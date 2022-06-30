import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
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
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { InsertAlcoholAndDrugTesting } from 'api/clients/AlcoholAndDrugTestingClient';
import { PostAlcoholAndDrugTesting } from 'formatdata/AlcoholAndDrugTestingForm';
import { FormatDate } from 'components/helpers/Format';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const AlcoholAndDrugTesting = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewPdf, setOpenViewPdf] = useState(false);

    const [documento, setDocumento] = useState('');
    const [nombresEmpleado, setNombreEmpleado] = useState('');
    const [documentSolicitante, setDocumentoSolicitante] = useState('');
    const [realizada, setRealizada] = useState(DefaultValue.Opcion_NO);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsOpciones, setLsOpciones] = useState([]);
    const [lsTipoMotivo, setLsTipoMotivo] = useState([]);
    const [lsMotivoNoAsistencia, setLsMotivoNoAsistencia] = useState([]);
    const [lsMuestraAD, setLsMuestraAD] = useState([]);
    const [lsMuestraA, setLsMuestraA] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);
    const [lsConceptoA, setLsConceptoA] = useState([]);

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

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;
    /* { resolver: yupResolver(validationSchema) } */

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
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

    const handleClick = async (datos) => {
        try {
            var MotivoAsistencia = realizada == DefaultValue.Opcion_SI ? 1 : datos.idMotivoAsis;
            var Observacion = realizada == DefaultValue.Opcion_SI ? datos.observacionesSi : datos.observacionesNoAsistio;

            const DataToInsert = PostAlcoholAndDrugTesting(documento, FormatDate(datos.fecha), datos.idMotivoPrueba, datos.sustancia1,
                datos.idMuestra1, datos.idResultado1, datos.sustancia2, datos.idMuestra2, datos.idResultado2, datos.sustancia3, datos.idMuestra3,
                datos.idResultado3, datos.sustancia4, datos.idMuestra4, datos.idResultado4, datos.sustancia5, datos.idMuestra5, datos.idResultado5,
                datos.sustancia6, datos.idMuestra6, datos.idResultado6, datos.idRemitido, documentSolicitante, 0, datos.idConcepto,
                realizada, MotivoAsistencia, Observacion, user.email, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (documento !== '') {
                if (lsEmployee.length !== 0) {
                    if (Object.keys(datos.length !== 0)) {
                        const result = await InsertAlcoholAndDrugTesting(DataToInsert);
                        if (result.status === 200) {
                            setOpenSuccess(true);
                            setLsEmployee([]);
                            setDocumentoSolicitante('');
                            setNombreEmpleado('');
                            setDocumento('');
                            setRealizada(DefaultValue.Opcion_NO);
                            reset();
                        }
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorNoHayDatos}`);
                }
            } else {
                setOpenError(true);
                setErrorMessage(`${Message.ErrorDocumento}`);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
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
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idMotivoPrueba"
                                        label="Motivo"
                                        defaultValue=""
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
                                                defaultValue={1}
                                                options={lsMotivoNoAsistencia}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue=""
                                                fullWidth
                                                name="observacionesNoAsistio"
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
                                                            defaultValue={false}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra1"
                                                            label="Muestra"
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue={false}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra2"
                                                            label="Muestra"
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue={false}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra3"
                                                            label="Muestra"
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue={false}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra4"
                                                            label="Muestra"
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue={false}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra5"
                                                            label="Muestra"
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue={false}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra6"
                                                            label="Muestra"
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue={1}
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
                                                            defaultValue=""
                                                            fullWidth
                                                            name="observacionesSi"
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
        </Fragment >
    );
};

export default AlcoholAndDrugTesting;