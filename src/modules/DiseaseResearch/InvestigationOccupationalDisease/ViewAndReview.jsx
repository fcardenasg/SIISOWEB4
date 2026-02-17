import {
    Button,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByIdInvestigation } from 'api/clients/InvestigationClient';
import Accordion from 'components/accordion/Accordion';
import {
    AccionMenu,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import Iconify from 'components/iconify/iconify';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Comment from './components/Comment/Comment';
import InvestigationSkeleton from './components/InvestigationSkeleton';
import ViewEmployee from './components/View/ViewEmployee';
import {
    AvailableControlMethods,
    Background,
    BiographyReview,
    CauseAnalysis,
    CharacterizationAbsenteeism,
    ClinicalData,
    CompanyDetails,
    Conclusion,
    DataDiagnosisQualificationProcess,
    DataExposureCompany,
    OtherClinicalData,
    PreventiveActions,
    Signatures,
    UnderlyingCauseDetected,
    WorkHistoryDLTD,
    WorkHistoryOtherCompanies
} from './OtherComponents';
import { ChangeStatusAssignment } from 'api/clients/ResearchAssignmentClient';

const FadeShell = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1]
        }}
        style={{
            willChange: "opacity, transform"
        }}
    >
        {children}
    </motion.div>
);

const ViewAndReview = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const timeWait = useBoolean(false);
    const loading = useBoolean(false);
    const disabledButton = useBoolean(false);
    const openComment = useBoolean(false);
    const [dataModel, setDataModel] = useState(null);

    const methods = useForm();
    const { setValue, watch } = methods;
    const idInvestigation = watch('id');
    const documento = watch('documento');
    const listFirma = watch('listFirma');

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
                    setDataModel(datos);
                    setTimeout(timeWait.onTrue, 200);
                }
            } catch (error) {
                toast.error(error.message || "Error al cargar los datos");
            }
        }

        getData();
    }, []);

    const handleClickReturn = async () => {
        try {
            Swal.fire({
                title: 'Devolución de la investigación',
                text: "¿La investigación será devuelta, desea agregar un comentario?",
                icon: 'question',
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                denyButtonText: 'No',
                confirmButtonText: 'Sí',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    openComment.onTrue();
                } else if (result.isDenied) {
                    const result = await ChangeStatusAssignment(4, id);
                    if (result.data.exito) {
                        toast.success("Se devolvió la investigación correctamente");
                        navigate(`/investigation-occupational-disease/view`);
                    } else {
                        toast.error("Error al devolver la investigación: " + result.data.mensaje);
                    }
                }
            });

        } catch (error) {
            toast.error(error.message || "Error al procesar la devolución de la investigación");
        } finally {

        }
    };

    const ArrayAccordion = [
        {
            title: { icon: "clarity:employee-line", text: "Datos de la empresa" },
            content: <CompanyDetails dataModel={dataModel} matchesXS={matchesXS} disabledControl={true} />
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
            content: <DataDiagnosisQualificationProcess dataModel={dataModel} matchesXS={matchesXS} methods={methods} disabledControl={true} />
        },
        {
            title: { icon: "hugeicons:permanent-job", text: "Datos sobre la exposición en la empresa" },
            content: <DataExposureCompany
                resumenResultadosAnalisisPuesto={dataModel?.resumenResultadosAnalisisPuesto}
                resumenValoracionRiesgo={dataModel?.resumenValoracionRiesgo}
                disabledControl={true} />
        },
        {
            title: { icon: "carbon:ibm-webmethods-hybrid-integration", text: "Métodos de control disponibles" },
            content: <AvailableControlMethods disabledControl={true} methodsMain={methods} />
        },
        {
            title: { icon: "streamline-ultimate:data-file-search", text: "Datos clínicos y paraclínicos" },
            content: <ClinicalData datosClinicos={dataModel?.datosClinicos} matchesXS={matchesXS} disabledControl={true} />
        },
        {
            title: { icon: "streamline:copy-paste", text: "Antecedentes personales, familiares y laborales" },
            content: <Background dataModel={dataModel} disabledControl={true} />
        },
        {
            title: { icon: "material-symbols-light:other-admission-outline-rounded", text: "Otros datos clínicos" },
            content: <OtherClinicalData otrosDatosClinicos={dataModel?.otrosDatosClinicos} disabledControl={true} />
        },
        {
            title: { icon: "fluent:task-list-square-person-20-regular", text: "Caracterización del ausentismo laboral por todas las causas" },
            content: <CharacterizationAbsenteeism />
        },
        {
            title: { icon: "lets-icons:file-dock-search-light", text: "Revisión de la bibliografía aplicable" },
            content: <BiographyReview revisionBibliografia={dataModel?.revisionBibliografia} matchesXS={matchesXS} disabledControl={true} />
        },
        {
            title: { icon: "lets-icons:file-dock-search-light", text: "Análisis de causas" },
            content: <CauseAnalysis analisisCausas={dataModel?.analisisCausas} matchesXS={matchesXS} disabledControl={true} />
        },
        {
            title: { icon: "tabler:report", text: "Causa básica detectada" },
            content: <UnderlyingCauseDetected causaBasicaDetectada={dataModel?.causaBasicaDetectada} disabledControl={true} />
        },
        {
            title: { icon: "pepicons-print:file", text: "Conclusión" },
            content: <Conclusion conclusion={dataModel?.conclusion} methods={methods} idInvestigation={idInvestigation} disabledControl={true} />
        },
        {
            title: { icon: "covid:social-distancing-correct-3", text: "Acciones preventivas o correctivas" },
            content: <PreventiveActions methods={methods} disabledControl={true} />
        }
    ];

    const handleApprove = async () => {
        try {
            const result = await ChangeStatusAssignment(5, id);
            if (result.data.exito) {
                navigate(`/investigation-occupational-disease/view`);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error("Error al cambiar el estado");
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <AnimatePresence mode="wait">
                {!timeWait.value && (
                    <FadeShell key="loading-shell">
                        <InvestigationSkeleton small />
                    </FadeShell>
                )}

                <Comment
                    idInvestigation={idInvestigation}
                    open={openComment.value}
                    handleClose={openComment.onFalse}
                    arrayCompartments={ArrayAccordion}
                />

                {timeWait.value && (
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
                                <SubCard>
                                    <Grid container spacing={2}>
                                        {ArrayAccordion.map((item, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Accordion
                                                    title={
                                                        <>
                                                            <Iconify width={25} icon={item.title.icon} />
                                                            <Typography sx={{ ml: 2 }} align="right" variant="h5">
                                                                {index + 1}. {item.title.text}
                                                            </Typography>
                                                        </>
                                                    }
                                                >
                                                    {item.content}
                                                </Accordion>
                                            </Grid>
                                        ))}

                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <SubCard darkTitle title="Firmas de la investigación">
                                                <Signatures dataModel={dataModel} matchesXS={matchesXS} />
                                            </SubCard>
                                        </Grid>

                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} md={4} lg={2}>
                                                    <AnimateButton>
                                                        <Button
                                                            disabled={listFirma?.some((item) => !item.firma || item.cambioRegistro) || dataModel.estadoInvestigacion === 5}
                                                            variant="contained"
                                                            fullWidth
                                                            onClick={handleApprove}
                                                        >
                                                            Aprobar
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>

                                                <Grid item xs={6} md={4} lg={2}>
                                                    <AnimateButton>
                                                        <Button disabled={!disabledButton.value || dataModel.estadoInvestigacion === 5} variant="contained" onClick={handleClickReturn} fullWidth>
                                                            Devolver
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>

                                                <Grid item xs={6} md={4} lg={2}>
                                                    <AnimateButton>
                                                        <Button variant="outlined" fullWidth onClick={() => navigate("/investigation-occupational-disease/view")}>
                                                            {TitleButton.Cancelar}
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </FormProvider>
                )}
            </AnimatePresence>
        </ValidateActionSkeleton>
    );
};

export default ViewAndReview;