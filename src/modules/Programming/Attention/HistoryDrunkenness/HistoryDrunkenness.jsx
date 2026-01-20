import {
    Button,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { GetByIdAttention, UpdateEstadoRegistroAtencion } from 'api/clients/AttentionClient';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdHistoryDrunkenness, GetCreateReportHistoryDrunkenness, SaveHistoryDrunkenness } from 'api/clients/HistoryDrunkenness';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import { ParamCloseCase } from 'components/alert/AlertAll';
import FullScreenModal from 'components/controllers/FullScreenModal';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import { CodCatalogo, DefaultValue, Message, TitleButton } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import ViewEmployee from 'components/views/ViewEmployee';
import { useBoolean } from 'hooks/use-boolean';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ForensicClinicalExamination from './ForensicClinicalExamination';
import SamplesAndElementsForStudy from './SamplesAndElementsForStudy';
import SummaryAvailableInformation from './SummaryAvailableInformation';

const HistoryDrunkenness = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const confirmPrint = useBoolean(false);
    const timeWait = useBoolean(false);
    const disabledButton = useBoolean(false);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [modelData, setModelData] = useState(null);
    const [reportPdf, setReportPdf] = useState(null);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsOpcion, setLsOpcion] = useState([]);
    const [lsDeterminacion, setLsDeterminacion] = useState([]);

    const methods = useForm();
    const { handleSubmit, watch, setValue } = methods;
    const idHistoriaEmbriaguez = watch("id");
    const documento = watch("documento");

    //Metodo Imprimir
    const handleClickReport = async (printOrDownload = true) => {
        try {
            const result = await GetCreateReportHistoryDrunkenness(idHistoriaEmbriaguez);
            if (!result.data.exito) {
                toast.error(result.data.mensaje);
                return;
            }

            const urlFile = result.data.datos;

            if (printOrDownload) {
                confirmPrint.onTrue();
                setReportPdf(urlFile);
            } else {
                const base64Data = urlFile.split(',')[1];
                DownloadFile(`${idHistoriaEmbriaguez}. ${documento} - Historia de embriaguez.pdf`, base64Data);
                toast.success("Archivo descargado correctamente");
            }
        } catch (error) {
            toast.error(error.message || "Error al generar el reporte");
        }
    }

    const handleUpdateAttentionClose = async (estadoPac) => {
        try {
            const DataToUpdate = {
                id: id,
                estadoPac: estadoPac,
                usuario: estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO ? '' : user?.nameuser
            }

            if (estadoPac === DefaultValue.ATENCION_ATENDIDO) {
                swal(ParamCloseCase).then(async (willDelete) => {
                    if (willDelete) {
                        await UpdateEstadoRegistroAtencion(DataToUpdate);
                        navigate('/programming/list');
                    }
                });
            } else if (estadoPac === DefaultValue.ATENCION_PENDIENTE_ATENDIDO) {
                await UpdateEstadoRegistroAtencion(DataToUpdate);
                navigate('/programming/list');
            }
        } catch (error) { }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                toast.error(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            toast.error(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const lsServerAtencion = await GetByIdAttention(id);
                if (lsServerAtencion.status === 200) {
                    setValue('idRegistroAtencion', id);
                    setValue('documento', lsServerAtencion.data.documento);
                    const event = { target: { value: lsServerAtencion.data.documento } };
                    handleLoadingDocument(event);

                    const lsServerHistoryDrunkenness = await GetByIdHistoryDrunkenness(id);
                    if (lsServerHistoryDrunkenness.data.exito && lsServerHistoryDrunkenness.data.datos) {
                        setValue('id', lsServerHistoryDrunkenness.data.datos.id);
                        setModelData(lsServerHistoryDrunkenness.data.datos);
                        disabledButton.onTrue();
                    }

                    setTimeout(() => {
                        timeWait.onTrue();
                    }, 500);
                }
            } catch (error) { }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function getCombo() {
            const lsServerOpcion = await GetByTipoCatalogoCombo(CodCatalogo.Opciones_SINO);
            setLsOpcion(lsServerOpcion.data);

            const lsServerDeterminacion = await GetByTipoCatalogoCombo(CodCatalogo.DETERMINACION);
            setLsDeterminacion(lsServerDeterminacion.data);

            const lsServerCiudad = await GetByTipoCatalogoCombo(CodCatalogo.CIUDADES);
            setLsCiudad(lsServerCiudad.data);
        }

        getCombo();
    }, []);

    const handleClick = async (datos) => {
        try {
            datos.infoGeneFechaExamen = datos.infoGeneFechaExamen || null;
            datos.infoGeneFechaOficioPetitorio = datos.infoGeneFechaOficioPetitorio || null;
            datos.resInfoDispoFechaInvestigado = datos.resInfoDispoFechaInvestigado || null;

            const result = await SaveHistoryDrunkenness(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                setValue('id', result.data.datos);
                disabledButton.onTrue();
            } else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    return (
        <FormProvider {...methods}>
            {confirmPrint.value &&
                <FullScreenModal onClose={confirmPrint.onFalse}>
                    <object type="application/pdf" data={reportPdf} width="100%" height="100%" />
                </FullScreenModal>
            }

            {timeWait.value ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Historia de embriaguez"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setValue('documento', e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StickyActionBar
                            onClickSave={handleSubmit(handleClick)}
                            onClickUpdate={handleSubmit(handleClick)}
                            disabledUpdate={!disabledButton.value}
                            disabledSave={disabledButton.value}
                            showButton={false}
                            threshold={566}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Información general">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    defaultValue={modelData?.infoGeneIntitutoRealizaExamen}
                                                    fullWidth
                                                    name="infoGeneIntitutoRealizaExamen"
                                                    label="Institución donde se realiza el examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputSelectAutocomplete
                                                    defaultValue={modelData?.infoGeneCiudadExamen}
                                                    name="infoGeneCiudadExamen"
                                                    label="Ciudad del examen"
                                                    options={lsCiudad}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    defaultValue={modelData?.infoGeneFechaExamen}
                                                    name="infoGeneFechaExamen"
                                                    label="Fecha del examen"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    defaultValue={modelData?.infoGeneHoraExamen}
                                                    fullWidth
                                                    name="infoGeneHoraExamen"
                                                    label="Hora del examen"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    defaultValue={modelData?.infoGeneNumRadicacion}
                                                    fullWidth
                                                    name="infoGeneNumRadicacion"
                                                    label="No. de radicación"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    defaultValue={modelData?.infoGenesolicitante}
                                                    fullWidth
                                                    name="infoGenesolicitante"
                                                    label="Solicitante"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputDatePicker
                                                    defaultValue={modelData?.infoGeneFechaOficioPetitorio}
                                                    label="Fecha oficio petitorio"
                                                    name="infoGeneFechaOficioPetitorio"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} lg={4}>
                                                <InputText
                                                    defaultValue={modelData?.infoGeneNoticiaCriminal}
                                                    fullWidth
                                                    name="infoGeneNoticiaCriminal"
                                                    label="NUNC (Noticia criminal)"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Consentimiento informado">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: Explicar brevemente en qué consiste la valoración forense incluyendo todos los procedimientos relacionados, así como su importancia dentro de la investigación. Registre en el espacio de <b>Observaciones</b> la constancia sobre el Consentimiento Informado; también cuando sea el caso, el nombre de cualquier persona diferente al personal forense o de salud presente durante el examen; entre otros.</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={modelData?.conseInforObservaciones}
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    name="conseInforObservaciones"
                                                    label="Observaciones"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <SubCard title="Datos del defensor(a) presente:">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="caption" align="justify" fontSize={12}>Nota: Solo si la persona por examinar es el imputado dentro de una investigación o proceso penal.</Typography>
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputText
                                                                defaultValue={modelData?.conseInforNombreDefensor}
                                                                fullWidth
                                                                name="conseInforNombreDefensor"
                                                                label="Nombre completo del defensor(a)"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12} md={6}>
                                                            <InputText
                                                                defaultValue={modelData?.conseInforTarjetaProfesional}
                                                                fullWidth
                                                                name="conseInforTarjetaProfesional"
                                                                label="Tarjeta profesional"
                                                                size={matchesXS ? 'small' : 'medium'}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12}>
                                    <SummaryAvailableInformation modelData={modelData} />
                                </Grid>

                                <Grid item xs={12}>
                                    <ForensicClinicalExamination modelData={modelData} methods={methods} />
                                </Grid>

                                <Grid item xs={12}>
                                    <SamplesAndElementsForStudy
                                        modelData={modelData}
                                        lsDeterminacion={lsDeterminacion}
                                        lsOpcion={lsOpcion}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <SubCard darkTitle title="Análisis, interpretación y conclusiones">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="caption" align="justify" fontSize={12}>Nota: Integre la información obtenida, incluyendo los hallazgos relevantes para el caso específico</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <InputText
                                                    defaultValue={modelData?.analisisInterpretacionConclusiones}
                                                    fullWidth
                                                    rows={4}
                                                    multiline
                                                    name="analisisInterpretacionConclusiones"
                                                    label="Información obtenida"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button disabled={!disabledButton.value} variant="outlined" fullWidth onClick={handleClickReport}>
                                                    {TitleButton.Imprimir}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_PENDIENTE_ATENDIDO)}>
                                                    {TitleButton.Cancelar}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6} md={4} lg={2}>
                                            <AnimateButton>
                                                <Button variant="outlined" fullWidth onClick={() => handleUpdateAttentionClose(DefaultValue.ATENCION_ATENDIDO)}>
                                                    {TitleButton.CerrarCaso}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </StickyActionBar>
                    </Grid>
                </Grid> : <Cargando />
            }
        </FormProvider>
    );
};

export default HistoryDrunkenness;