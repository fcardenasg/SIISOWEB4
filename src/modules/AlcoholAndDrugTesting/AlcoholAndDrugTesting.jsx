import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UserCountCard from 'components/components/UserCountCard';
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
import { GetByIdAlcoholAndDrugTesting, InsertAlcoholAndDrugTesting } from 'api/clients/AlcoholAndDrugTestingClient';
import { PostAlcoholAndDrugTesting } from 'formatdata/AlcoholAndDrugTestingForm';
import { FormatDate } from 'components/helpers/Format';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import { generateReportAlcoholtesting } from '../Programming/Attention/Report/Alcoholtesting';

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

    const [openReport, setOpenReport] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);

    const [motivo, setMotivo] = useState('');
    const [documentoSolicita, setDocumentoSolicita] = useState('');
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [documento, setDocumento] = useState('');
    const [realizada, setRealizada] = useState(DefaultValue.Opcion_SI);

    const [cocaina, setCocaina] = useState('4095');
    const [marihuana, setMarihuana] = useState('4095');
    const [alcohol, setAlcohol] = useState('4095');
    const [conceptoAptitud, setConceptoAptitud] = useState('');

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsOpciones, setLsOpciones] = useState([]);
    const [lsTipoMotivo, setLsTipoMotivo] = useState([]);
    const [lsMotivoNoAsistencia, setLsMotivoNoAsistencia] = useState([]);
    const [lsMuestraAD, setLsMuestraAD] = useState([]);
    const [lsMuestraA, setLsMuestraA] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);

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
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
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

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdAlcoholAndDrugTesting(resultData.idPruebasAlcoholDroga);
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReportAlcoholtesting(lsDataReport.data, lsDataUser.data);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleDocumentoSolicita = async (event) => {
        try {
            setDocumentoSolicita(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setNombreSolicitante(lsServerEmployee.data.data.nombres);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(Message.ErrorDocumento);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    async function getAll() {
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

            const lsServerMuestraAD = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MUESTRA_AD);
            var resultMuestraAD = lsServerMuestraAD.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMuestraAD(resultMuestraAD);

            const lsServerMuestraA = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PAD_MUESTRA_AL);
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
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const MotivoAsistencia = realizada === DefaultValue.Opcion_SI ? 1 : datos.idMotivoAsis;
            const Observacion = realizada === DefaultValue.Opcion_SI ? datos.observacionesSi : datos.observacionesNoAsistio;
            const concepto = realizada === DefaultValue.Opcion_NO ? 1 : conceptoAptitud;

            const DataToInsert = PostAlcoholAndDrugTesting(documento, FormatDate(datos.fecha), 0, motivo, datos.sustancia1,
                datos.idMuestra1, cocaina, datos.sustancia2, datos.idMuestra2, marihuana, datos.sustancia3, datos.idMuestra3,
                datos.idResultado3, datos.sustancia4, datos.idMuestra4, datos.idResultado4, datos.sustancia5, datos.idMuestra5,
                datos.idResultado5, datos.sustancia6, datos.idMuestra6, alcohol, datos.idRemitido, documentoSolicita, "", concepto,
                realizada, MotivoAsistencia, Observacion, user.nameuser, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (realizada === DefaultValue.Opcion_SI && conceptoAptitud === '') {
                setOpenError(true);
                setErrorMessage('Por favor, registrar los resultado');
            } else {
                if (documento !== '') {
                    if (lsEmployee.length !== 0) {
                        if (Object.keys(datos.length !== 0)) {
                            const result = await InsertAlcoholAndDrugTesting(DataToInsert);
                            if (result.status === 200) {
                                setOpenSuccess(true);
                                setResultData(result.data);
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
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
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

            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar Prueba De Alcohol Y Drogas"
                        key={lsEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <SelectOnChange
                                    name="idMotivoPrueba"
                                    label="Motivo"
                                    value={motivo}
                                    options={lsTipoMotivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <SelectOnChange
                                    name="idRealizada"
                                    label="Realizada"
                                    value={realizada}
                                    onChange={(e) => setRealizada(e.target.value)}
                                    options={lsOpciones}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            {realizada == DefaultValue.Opcion_NO ?
                                <Fragment>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivoAsis"
                                                label="Motivo de No Asistencia"
                                                defaultValue=""
                                                options={lsMotivoNoAsistencia}
                                                size={matchesXS ? 'small' : 'medium'}
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
                                                            defaultValue={true}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra1"
                                                            label="Muestra"
                                                            defaultValue="4098"
                                                            options={lsMuestraAD}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <SelectOnChange
                                                        name="idResultado1"
                                                        label="Resultados"
                                                        value={cocaina}
                                                        onChange={(e) => {
                                                            setCocaina(e.target.value);
                                                            if (e.target.value === DefaultValue.RESULTADO_PAD_POSITIVO ||
                                                                marihuana === DefaultValue.RESULTADO_PAD_POSITIVO ||
                                                                alcohol === DefaultValue.RESULTADO_PAD_POSITIVO)
                                                                setConceptoAptitud(DefaultValue.CONCEPTO_PAD_NOAPTO);
                                                            else
                                                                setConceptoAptitud(DefaultValue.CONCEPTO_PAD_APTO);
                                                        }}
                                                        options={lsResultado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputCheckBox
                                                            label="Marihuana"
                                                            name="sustancia2"
                                                            size={30}
                                                            defaultValue={true}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra2"
                                                            label="Muestra"
                                                            defaultValue="4098"
                                                            options={lsMuestraAD}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <SelectOnChange
                                                        name="idResultado2"
                                                        label="Resultados"
                                                        value={marihuana}
                                                        onChange={(e) => {
                                                            setMarihuana(e.target.value);

                                                            if (cocaina === DefaultValue.RESULTADO_PAD_POSITIVO ||
                                                                e.target.value === DefaultValue.RESULTADO_PAD_POSITIVO ||
                                                                alcohol === DefaultValue.RESULTADO_PAD_POSITIVO)
                                                                setConceptoAptitud(DefaultValue.CONCEPTO_PAD_NOAPTO);
                                                            else
                                                                setConceptoAptitud(DefaultValue.CONCEPTO_PAD_APTO);
                                                        }}
                                                        options={lsResultado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputCheckBox
                                                            label="Morfina"
                                                            name="sustancia3"
                                                            size={30}
                                                            defaultValue={true}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra3"
                                                            label="Muestra"
                                                            defaultValue="4098"
                                                            options={lsMuestraAD}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idResultado3"
                                                            label="Resultados"
                                                            defaultValue="4095"
                                                            options={lsResultado}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputCheckBox
                                                            label="Benzodiazepina"
                                                            name="sustancia4"
                                                            size={30}
                                                            defaultValue={true}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra4"
                                                            label="Muestra"
                                                            defaultValue="4098"
                                                            options={lsMuestraAD}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idResultado4"
                                                            label="Resultados"
                                                            defaultValue="4095"
                                                            options={lsResultado}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputCheckBox
                                                            label="Anfetaminas"
                                                            name="sustancia5"
                                                            size={30}
                                                            defaultValue={true}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra5"
                                                            label="Muestra"
                                                            defaultValue="4098"
                                                            options={lsMuestraAD}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idResultado5"
                                                            label="Resultados"
                                                            defaultValue="4095"
                                                            options={lsResultado}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputCheckBox
                                                            label="Alcohol"
                                                            name="sustancia6"
                                                            size={30}
                                                            defaultValue={true}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idMuestra6"
                                                            label="Muestra"
                                                            defaultValue="4101"
                                                            options={lsMuestraA}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                        />
                                                    </FormProvider>
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <SelectOnChange
                                                        name="idResultado6"
                                                        label="Resultados"
                                                        value={alcohol}
                                                        onChange={(e) => {
                                                            setAlcohol(e.target.value);
                                                            if (cocaina === DefaultValue.RESULTADO_PAD_POSITIVO ||
                                                                marihuana === DefaultValue.RESULTADO_PAD_POSITIVO ||
                                                                e.target.value === DefaultValue.RESULTADO_PAD_POSITIVO)
                                                                setConceptoAptitud(DefaultValue.CONCEPTO_PAD_NOAPTO);
                                                            else
                                                                setConceptoAptitud(DefaultValue.CONCEPTO_PAD_APTO);
                                                        }}
                                                        options={lsResultado}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                {motivo === DefaultValue.PAD_MOTIVO_SOSPECHA ?
                                                    <Fragment>
                                                        <Grid item xs={12} md={6} lg={4}>
                                                            <InputOnChange
                                                                label="N° Documento"
                                                                onKeyDown={handleDocumentoSolicita}
                                                                onChange={(e) => setDocumentoSolicita(e?.target.value)}
                                                                value={documentoSolicita}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={12} lg={8}>
                                                            <InputOnChange
                                                                label="Nombres"
                                                                value={nombreSolicitante}
                                                                onChange={(e) => setNombreSolicitante(e?.target.value)}
                                                                disabled
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Fragment> : <Grid />
                                                }

                                                <Grid item xs={12}>
                                                    <UserCountCard
                                                        primary="CONCEPTO APTITUD"
                                                        secondary={
                                                            conceptoAptitud === DefaultValue.CONCEPTO_PAD_NOAPTO ? "NO APTO" :
                                                                conceptoAptitud === DefaultValue.CONCEPTO_PAD_APTO ? 'APTO' : ''
                                                        }
                                                        iconPrimary={AssignmentIndIcon}
                                                        color={conceptoAptitud === DefaultValue.CONCEPTO_PAD_APTO ? theme.palette.success.dark :
                                                            conceptoAptitud === DefaultValue.CONCEPTO_PAD_NOAPTO ? theme.palette.error.dark :
                                                                theme.palette.grey[500]
                                                        }
                                                    />
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
                                                </Grid>
                                            </Grid>
                                        </SubCard>
                                    </Grid>
                                </Fragment>
                            }
                        </Grid>

                        <Grid container spacing={2} sx={{ pt: 4 }}>
                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button disabled={resultData.length !== 0 ? true : false} variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                        {TitleButton.Guardar}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button disabled={resultData.length === 0 ? true : false} variant="outlined" fullWidth onClick={handleClickReport}>
                                        {TitleButton.Imprimir}
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={2}>
                                <AnimateButton>
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/alcoholanddrugtesting/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment >
    );
};

export default AlcoholAndDrugTesting;