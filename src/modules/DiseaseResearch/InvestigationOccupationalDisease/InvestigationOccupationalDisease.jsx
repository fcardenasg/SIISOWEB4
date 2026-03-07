import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByIdInvestigation, InsertInvestigation } from 'api/clients/InvestigationClient';
import { ChangeStatusAssignment } from 'api/clients/ResearchAssignmentClient';
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
import Swal from 'sweetalert2';
import { ColorDrummondltd } from 'themes/colors';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AccordionStatus from './components/AccordionStatus';
import FinalizarBoton, { ReadOnlyChip } from './components/FinalizarBoton';
import InvestigationSkeleton from './components/InvestigationSkeleton';
import SaveLoader from './components/SaveLoader';
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
    UnderlyingCauseDetected,
    WorkHistoryDLTD,
    WorkHistoryOtherCompanies
} from './OtherComponents';

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
    const [allowedItems, setAllowedItems] = useState([]);

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

                    // Guardamos los IDs permitidos (ej: [1, 2, 5...])
                    if (datos.itemInvestigacion) {
                        setAllowedItems(datos.itemInvestigacion);
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
    }, [id]);

    const [canRenderContent, setCanRenderContent] = useState(false);

    useEffect(() => {
        if (timeWait.value) {
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

    const ArrayAccordion = useMemo(() => {
        return [
            {
                id: 1,
                title: { icon: "clarity:employee-line", text: "Datos de la empresa" },
                content: (disabled) => <CompanyDetails dataModel={dataModel} matchesXS={matchesXS} disabledControl={disabled} />
            },
            {
                id: 2,
                title: { icon: "material-symbols-light:work-history-outline", text: "Historia laboral en DLTD" },
                content: (disabled) => <WorkHistoryDLTD methods={methods} documento={documento} disabledControl={disabled} />
            },
            {
                id: 3,
                title: { icon: "icon-park-twotone:history-query", text: "Historia laboral en otras empresas" },
                content: (disabled) => <WorkHistoryOtherCompanies methods={methods} documento={documento} disabledControl={disabled} />
            },
            {
                id: 4,
                title: { icon: "material-symbols-light:diagnosis-outline-rounded", text: "Datos del diagnóstico y del proceso de calificación" },
                content: (disabled) => <DataDiagnosisQualificationProcess dataModel={dataModel} matchesXS={matchesXS} methods={methods} disabledControl={disabled} />
            },
            {
                id: 5,
                title: { icon: "hugeicons:permanent-job", text: "Datos sobre la exposición en la empresa" },
                content: (disabled) => <DataExposureCompany
                    resumenResultadosAnalisisPuesto={dataModel?.resumenResultadosAnalisisPuesto}
                    resumenValoracionRiesgo={dataModel?.resumenValoracionRiesgo}
                    disabledControl={disabled} />
            },
            {
                id: 6,
                title: { icon: "carbon:ibm-webmethods-hybrid-integration", text: "Métodos de control disponibles" },
                content: (disabled) => <AvailableControlMethods methodsMain={methods} disabledControl={disabled} />
            },
            {
                id: 7,
                title: { icon: "streamline-ultimate:data-file-search", text: "Datos clínicos y paraclínicos" },
                content: (disabled) => <ClinicalData datosClinicos={dataModel?.datosClinicos} matchesXS={matchesXS} disabledControl={disabled} />
            },
            {
                id: 8,
                title: { icon: "streamline:copy-paste", text: "Antecedentes personales, familiares y laborales" },
                content: (disabled) => <Background dataModel={dataModel} disabledControl={disabled} />
            },
            {
                id: 9,
                title: { icon: "material-symbols-light:other-admission-outline-rounded", text: "Otros datos clínicos" },
                content: (disabled) => <OtherClinicalData otrosDatosClinicos={dataModel?.otrosDatosClinicos} disabledControl={disabled} />
            },
            {
                id: 10,
                title: { icon: "fluent:task-list-square-person-20-regular", text: "Caracterización del ausentismo laboral" },
                content: (disabled) => <CharacterizationAbsenteeism disabledControl={disabled} />
            },
            {
                id: 11,
                title: { icon: "lets-icons:file-dock-search-light", text: "Revisión de la bibliografía aplicable" },
                content: (disabled) => <BiographyReview revisionBibliografia={dataModel?.revisionBibliografia} matchesXS={matchesXS} disabledControl={disabled} />
            },
            {
                id: 12,
                title: { icon: "lets-icons:file-dock-search-light", text: "Análisis de causas" },
                content: (disabled) => <CauseAnalysis analisisCausas={dataModel?.analisisCausas} matchesXS={matchesXS} disabledControl={disabled} />
            },
            {
                id: 13,
                title: { icon: "tabler:report", text: "Causa básica detectada" },
                content: (disabled) => <UnderlyingCauseDetected causaBasicaDetectada={dataModel?.causaBasicaDetectada} disabledControl={disabled} />
            },
            {
                id: 14,
                title: { icon: "pepicons-print:file", text: "Conclusión" },
                content: (disabled) => <Conclusion conclusion={dataModel?.conclusion} methods={methods} idInvestigation={idInvestigation} disabledControl={disabled} />
            },
            {
                id: 15,
                title: { icon: "covid:social-distancing-correct-3", text: "Acciones preventivas o correctivas" },
                content: (disabled) => <PreventiveActions methods={methods} disabledControl={disabled} />
            }
        ];
    }, [dataModel, matchesXS, documento, methods, idInvestigation, allowedItems]);

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

                                    <Grid container>
                                        <Grid item xs={12} sx={{ mb: 2 }}>
                                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                                <Typography variant="h4" sx={{ mb: 2 }}>
                                                    Convención de Estados - Secciones de IEL
                                                </Typography>

                                                <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{ width: 16, height: 16, bgcolor: ColorDrummondltd.RedDrummond, borderRadius: '50%' }} />
                                                        <Typography variant="body2">Rojo: Asignada</Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{ width: 16, height: 16, bgcolor: ColorDrummondltd.YellowDrummond, borderRadius: '50%' }} />
                                                        <Typography variant="body2">Amarillo: En proceso</Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{ width: 16, height: 16, bgcolor: ColorDrummondltd.GreenDrummond, borderRadius: '50%' }} />
                                                        <Typography variant="body2">Verde: Terminada por el asesor ARL</Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{ width: 16, height: 16, bgcolor: ColorDrummondltd.BlueDrummond, borderRadius: '50%' }} />
                                                        <Typography variant="body2">Azul: Aprobada</Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Grid>

                                        {ArrayAccordion.map((item) => {
                                            const isRestricted = !allowedItems.includes(item.id);

                                            return (
                                                <Grid item xs={12} key={item.id}>
                                                    <AccordionStatus
                                                        statusColor={1}
                                                        slotProps={{ transition: { unmountOnExit: true } }}
                                                        disabled={disabledButtonSave.value}
                                                        title={
                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                                alignItems="center"
                                                                sx={{ flexGrow: 1 }}
                                                            >
                                                                <Iconify
                                                                    width={25}
                                                                    icon={item.title.icon}
                                                                    style={{
                                                                        color: isRestricted ? theme.palette.text.disabled : 'black',
                                                                        display: 'block'
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    sx={{
                                                                        color: isRestricted ? 'text.disabled' : 'black',
                                                                        lineHeight: 1,
                                                                        fontSize: '0.9rem',
                                                                    }}
                                                                >
                                                                    {item.id}. {item.title.text}
                                                                </Typography>
                                                            </Stack>
                                                        }
                                                        secondaryAction={!isRestricted ? <FinalizarBoton /> : <ReadOnlyChip />}
                                                    >
                                                        {canRenderContent ? (item.content(isRestricted)) : (<CircularProgress size={20} sx={{ m: 2 }} />)}
                                                    </AccordionStatus>
                                                </Grid>
                                            );
                                        })}

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