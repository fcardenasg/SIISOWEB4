import {
    Button,
    CircularProgress,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByIdInvestigation, InsertInvestigation } from 'api/clients/InvestigationClient';
import Accordion from 'components/accordion/Accordion';
import {
    AccionMenu,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import Iconify from 'components/iconify/iconify';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import InvestigationSkeleton from './components/InvestigationSkeleton';
import ViewEmployee from './components/View/ViewEmployee';
import {
    CompanyDetails,
    DataDiagnosisQualificationProcess,
    DataExposureCompany,
    AvailableControlMethods,
    ClinicalData,
    Background,
    OtherClinicalData,
    CharacterizationAbsenteeism,
    BiographyReview,
    CauseAnalysis,
    UnderlyingCauseDetected,
    Conclusion,
    PreventiveActions,
    Signatures,
    WorkHistoryDLTD,
    WorkHistoryOtherCompanies
} from './OtherComponents';
import SaveLoader from './components/SaveLoader';
import { ChangeStatusAssignment } from 'api/clients/ResearchAssignmentClient';
import Swal from 'sweetalert2';
import { ColorDrummondltd } from 'themes/colors';

const FadeShell = ({ children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "linear" }}
        style={{ width: '100%' }}
    >
        {children}
    </motion.div>
);

const InvestigationOccupationalDisease = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const timeWait = useBoolean(false);
    const loading = useBoolean(false);
    const disabledButtonSave = useBoolean(false);
    const disabledButton = useBoolean(false);
    const [dataModel, setDataModel] = useState(null);

    const methods = useForm();
    const { handleSubmit, setValue, watch } = methods;
    const idInvestigation = watch('id');
    const documento = watch('documento');
    const estadoInvestigacion = watch('estadoInvestigacion');

    useEffect(() => {
        async function getData() {
            try {
                const lsServer = await GetByIdInvestigation(id);
                if (lsServer.data.datos) {
                    const datos = lsServer.data.datos;
                    if (datos.isUpdate) {
                        setValue('id', datos.id);
                        disabledButton.onTrue();
                    }

                    setValue('idAsignacion', id);
                    setValue('documento', datos.documento);
                    setValue('estadoInvestigacion', datos.estadoInvestigacion);
                    setDataModel(datos);
                    setTimeout(timeWait.onTrue, 200);
                }
            } catch (error) {
                toast.error(error.message || "Error al cargar los datos");
            }
        }

        getData();
    }, []);

    const [canRenderContent, setCanRenderContent] = useState(false);

    useEffect(() => {
        if (timeWait.value) {
            // Esperamos a que la animación de entrada termine para renderizar los hijos pesados
            const timer = setTimeout(() => setCanRenderContent(true), 100);
            return () => clearTimeout(timer);
        }
    }, [timeWait.value]);

    const handleClick = async (datos) => {
        try {
            disabledButtonSave.onTrue();
            const result = await InsertInvestigation(datos);

            if (result.data.exito) {
                disabledButton.onTrue();
                setValue('id', result.data.datos);
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al procesar la investigación");
        } finally {
            disabledButtonSave.onFalse();
        }
    };

    const ArrayAccordion = useMemo(() => [
        {
            title: { icon: "clarity:employee-line", text: "Datos de la empresa" },
            content: <CompanyDetails dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "material-symbols-light:work-history-outline", text: "Historia laboral en DLTD" },
            content: <WorkHistoryDLTD methods={methods} documento={documento} />
        },
        {
            title: { icon: "icon-park-twotone:history-query", text: "Historia laboral en otras empresas" },
            content: <WorkHistoryOtherCompanies methods={methods} documento={documento} />
        },
        {
            title: { icon: "material-symbols-light:diagnosis-outline-rounded", text: "Datos del diagnóstico y del proceso de calificación" },
            content: <DataDiagnosisQualificationProcess dataModel={dataModel} matchesXS={matchesXS} methods={methods} />
        },
        {
            title: { icon: "hugeicons:permanent-job", text: "Datos sobre la exposición en la empresa" },
            content: <DataExposureCompany
                resumenResultadosAnalisisPuesto={dataModel?.resumenResultadosAnalisisPuesto}
                resumenValoracionRiesgo={dataModel?.resumenValoracionRiesgo} />
        },
        {
            title: { icon: "carbon:ibm-webmethods-hybrid-integration", text: "Métodos de control disponibles" },
            content: <AvailableControlMethods methodsMain={methods} />
        },
        {
            title: { icon: "streamline-ultimate:data-file-search", text: "Datos clínicos y paraclínicos" },
            content: <ClinicalData datosClinicos={dataModel?.datosClinicos} matchesXS={matchesXS} />
        },
        {
            title: { icon: "streamline:copy-paste", text: "Antecedentes personales, familiares y laborales" },
            content: <Background dataModel={dataModel} />
        },
        {
            title: { icon: "material-symbols-light:other-admission-outline-rounded", text: "Otros datos clínicos" },
            content: <OtherClinicalData otrosDatosClinicos={dataModel?.otrosDatosClinicos} />
        },
        {
            title: { icon: "fluent:task-list-square-person-20-regular", text: "Caracterización del ausentismo laboral por todas las causas" },
            content: <CharacterizationAbsenteeism />
        },
        {
            title: { icon: "lets-icons:file-dock-search-light", text: "Revisión de la bibliografía aplicable" },
            content: <BiographyReview revisionBibliografia={dataModel?.revisionBibliografia} matchesXS={matchesXS} />
        },
        {
            title: { icon: "lets-icons:file-dock-search-light", text: "Análisis de causas" },
            content: <CauseAnalysis analisisCausas={dataModel?.analisisCausas} matchesXS={matchesXS} />
        },
        {
            title: { icon: "tabler:report", text: "Causa básica detectada" },
            content: <UnderlyingCauseDetected causaBasicaDetectada={dataModel?.causaBasicaDetectada} />
        },
        {
            title: { icon: "pepicons-print:file", text: "Conclusión" },
            content: <Conclusion conclusion={dataModel?.conclusion} methods={methods} idInvestigation={idInvestigation} />
        },
        {
            title: { icon: "covid:social-distancing-correct-3", text: "Acciones preventivas o correctivas" },
            content: <PreventiveActions methods={methods} />
        }
    ], [dataModel, matchesXS, documento, methods]);

    async function handleClose(estado) {
        try {
            if (estadoInvestigacion === 3) {
                navigate("/investigation-occupational-disease/view");
                return;
            }

            if (estado === 3) {
                const { isConfirmed } = await Swal.fire({
                    title: 'Cerrar Caso',
                    text: "¿Está seguro que desea cerrar el caso de investigación?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: ColorDrummondltd.RedDrummond,
                    cancelButtonColor: ColorDrummondltd.GrayDrummond,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Sí',
                });

                if (!isConfirmed) return;
            }

            const response = await ChangeStatusAssignment(estado, id);
            if (response.data.exito) {
                navigate("/investigation-occupational-disease/view");
            } else {
                toast.error(response.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al procesar la solicitud");
        }
    }

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.InvestigacionEnfermedadLaboral}>
            <AnimatePresence mode="wait">
                {timeWait.value ? (
                    <FormProvider {...methods}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ViewEmployee
                                    title="Investigación de origen de enfermedad laboral"
                                    dataEmployee={dataModel}
                                    loading={loading}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <StickyActionBar
                                    onClickSave={handleSubmit(handleClick)}
                                    onClickUpdate={handleSubmit(handleClick)}
                                    disabledUpdate={!disabledButton.value || disabledButtonSave.value || estadoInvestigacion === 3}
                                    disabledSave={disabledButton.value || disabledButtonSave.value}
                                    showButton={false}
                                    threshold={325}
                                >
                                    <SaveLoader isSaving={disabledButtonSave.value} />

                                    <Grid container spacing={2}>
                                        {ArrayAccordion.map((item, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Accordion
                                                    slotProps={{ transition: { unmountOnExit: true } }}
                                                    disabled={disabledButtonSave.value}
                                                    title={
                                                        <>
                                                            <Iconify width={25} icon={item.title.icon} />
                                                            <Typography sx={{ ml: 2 }} align="right" variant="h5">
                                                                {index + 1}. {item.title.text}
                                                            </Typography>
                                                        </>
                                                    }
                                                >
                                                    {canRenderContent ? item.content : <CircularProgress size={20} sx={{ m: 2 }} />}
                                                </Accordion>
                                            </Grid>
                                        ))}

                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} md={2}>
                                                    <AnimateButton>
                                                        <Button
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled={disabledButtonSave.value}
                                                            onClick={() => handleClose(1)}
                                                        >
                                                            {TitleButton.Cancelar}
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>

                                                <Grid item>
                                                    <AnimateButton>
                                                        <Button
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled={disabledButtonSave.value || !idInvestigation || estadoInvestigacion === 3}
                                                            onClick={() => handleClose(3)}
                                                        >
                                                            {TitleButton.Cancelar} Investigación
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </StickyActionBar>
                            </Grid>
                        </Grid>
                    </FormProvider>
                ) : (
                    <FadeShell key="loading-shell">
                        <InvestigationSkeleton small />
                    </FadeShell>
                )}
            </AnimatePresence>
        </ValidateActionSkeleton>
    );
};

export default InvestigationOccupationalDisease;