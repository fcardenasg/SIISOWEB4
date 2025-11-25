import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetDataEmployyeNewGetById } from 'api/clients/EmployeeClient';
import { GetAllDetailResearchAssignment, GetByIdResearchAssignment, UpdateResearchAssignments } from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import Accordion from 'components/accordion/Accordion';
import {
    AccionMenu,
    Message,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import Iconify from 'components/iconify/iconify';
import Cargando from 'components/loading/Cargando';
import StickyActionBar from 'components/StickyActionBar/StickyActionBar';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import ViewEmployee from './components/View/ViewEmployee';
import AvailableControlMethods from './views/AvailableControlMethods';
import CompanyDetails from './views/CompanyDetails';
import DataDiagnosisQualificationProcess from './views/DataDiagnosisQualificationProcess';
import DataExposureCompany from './views/DataExposureCompany';
import WorkHistoryDLTD from './views/WorkHistoryDLTD';
import WorkHistoryOtherCompanies from './views/WorkHistoryOtherCompanies';
import ClinicalData from './views/ClinicalData';
import Background from './views/Background';
import OtherClinicalData from './views/OtherClinicalData';
import CharacterizationAbsenteeism from './views/CharacterizationAbsenteeism';
import BiographyReview from './views/BiographyReview';
import CauseAnalysis from './views/CauseAnalysis';
import UnderlyingCauseDetected from './views/UnderlyingCauseDetected';
import Conclusion from './views/Conclusion';
import PreventiveActions from './views/PreventiveActions';
import Signatures from './views/Signatures';

const validationSchema = yup.object().shape({
    fecha: yup.date().required("La fecha es requerida"),
    documento: yup.string().required("El documento es requerido"),
    investigador: yup.array().min(1, "Debe seleccionar al menos un investigador"),
    listaDetalle: yup.array().required("Se requiere al menos un diagnóstico"),
});

const InvestigationOccupationalDisease = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const loadingModulo = useBoolean(false);
    const timeWait = useBoolean(false);
    const loading = useBoolean(false);

    const [textDx, setTextDx] = useState("");
    const [modelEmployee, setModelEmployee] = useState([]);
    const [lsInvestigacion, setLsInvestigacion] = useState([]);
    const [lsDx, setLsDx] = useState([]);
    const [dataModel, setDataModel] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset, getValues, setError, setValue } = methods;
    const documento = getValues("documento");
    const resumenResultadosAnalisisPuesto = getValues("resumenResultadosAnalisisPuesto");

    const getDataEmployee = async (documento) => {
        try {
            loading.onTrue();

            try {
                const resultData = await GetDataEmployyeNewGetById(documento);
                if (resultData?.data.status === 200) {
                    setModelEmployee(resultData.data.data);
                } else {
                    toast.error(resultData?.data.message || "Error al obtener la información");
                }
            } catch {
                toast.error("Ocurrió un error al consultar el empleado");
            } finally {
                loading.onFalse();
            }
        } catch (error) {
            setModelEmployee([]);
            toast.error(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const lsServer = await GetByIdResearchAssignment(id);
                if (lsServer.data.datos) {
                    const datos = lsServer.data.datos;
                    setValue('id', datos.id);
                    setDataModel(datos);
                    setValue('documento', datos.documento);
                    getDataEmployee(datos.documento);
                    setValue("investigador", datos.investigador);
                    setTimeout(timeWait.onTrue, 700);
                }
            } catch (error) {
                toast.error(error.message || "Error al cargar los datos");
            }
        }

        getData();
    }, []);

    async function getDxEmployee() {
        try {
            const service = await GetAllDetailResearchAssignment(id);
            if (service.data.exito)
                setValue('listaDetalle', service.data.datos);
        } catch (error) {
            toast.error(error.message || "Error al cargar los datos");
        }
    }

    useEffect(() => {
        getDxEmployee();
    }, []);

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerCombo = await GetAllComboAsesorInvestigacion();
                if (lsServerCombo.status === 200)
                    setLsInvestigacion(lsServerCombo.data);
            } catch (error) { }
        }

        getCombo();
    }, []);

    const handleClick = async (datos) => {
        try {
            const result = await UpdateResearchAssignments(datos);
            if (result.data.exito)
                toast.success(result.data.mensaje);
            else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(error.message || "Error al actualizar la asignación de investigación");
        }
    };

    const ArrayAccordion = [
        {
            title: { icon: "clarity:employee-line", text: "Datos de la empresa" },
            content: <CompanyDetails dataModel={modelEmployee} matchesXS={matchesXS} />
        },
        {
            title: { icon: "material-symbols-light:work-history-outline", text: "Historia laboral en DLTD" },
            content: <WorkHistoryDLTD />
        },
        {
            title: { icon: "icon-park-twotone:history-query", text: "Historia laboral en otras empresas" },
            content: <WorkHistoryOtherCompanies />
        },
        {
            title: { icon: "material-symbols-light:diagnosis-outline-rounded", text: "Datos del diagnóstico y del proceso de calificación" },
            content: <DataDiagnosisQualificationProcess dataModel={dataModel} matchesXS={matchesXS} methods={methods} />
        },
        {
            title: { icon: "hugeicons:permanent-job", text: "Datos sobre la exposición en la empresa" },
            content: <DataExposureCompany dataModel={dataModel} />
        },
        {
            title: { icon: "carbon:ibm-webmethods-hybrid-integration", text: "Métodos de control disponibles" },
            content: <AvailableControlMethods />
        },
        {
            title: { icon: "streamline-ultimate:data-file-search", text: "Datos clínicos y paraclínicos" },
            content: <ClinicalData dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "streamline:copy-paste", text: "Antecedentes" },
            content: <Background dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "material-symbols-light:other-admission-outline-rounded", text: "Otros datos clínicos" },
            content: <OtherClinicalData dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "fluent:task-list-square-person-20-regular", text: "Caracterización del ausentismo laboral por todas las causas" },
            content: <CharacterizationAbsenteeism />
        },
        {
            title: { icon: "icon-park-outline:file-search", text: "Revisión de la bibliografía aplicable" },
            content: <BiographyReview dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "lets-icons:file-dock-search-light", text: "Análisis de causas" },
            content: <CauseAnalysis dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "tabler:report", text: "Causa básica detectada" },
            content: <UnderlyingCauseDetected dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "pepicons-print:file", text: "Conclusión" },
            content: <Conclusion dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "covid:social-distancing-correct-3", text: "Acciones preventivas o correctivas" },
            content: <PreventiveActions dataModel={dataModel} matchesXS={matchesXS} />
        },
        {
            title: { icon: "material-symbols-light:signature-rounded", text: "Firmas" },
            content: <Signatures dataModel={dataModel} matchesXS={matchesXS} />
        }
    ];

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            {timeWait.value ?
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                title="Investigación de origen de enfermedad laboral"
                                dataEmployee={modelEmployee}
                                loading={loading}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <StickyActionBar
                                /* onClickSave={handleSubmit(handleClick)}
                                onClickUpdate={handleSubmit(handleClick)}
                                disabledUpdate={!disabledButton.value}
                                disabledSave={disabledButton.value} */
                                showButton={false}
                                threshold={325}
                            >
                                <Grid container spacing={2}>
                                    {ArrayAccordion.map((item, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Accordion title={
                                                <>
                                                    <Iconify width={25} icon={item.title.icon} />
                                                    <Typography sx={{ ml: 2 }} align='right' variant="h5">
                                                        {index + 1}. {item.title.text}
                                                    </Typography>
                                                </>
                                            }>
                                                {item.content}
                                            </Accordion>
                                        </Grid>
                                    ))}

                                    <Grid item xs={6} md={4} lg={2} sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/investigation-occupational-disease/view")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </StickyActionBar>
                        </Grid>
                    </Grid>
                </FormProvider> : <Cargando />
            }
        </ValidateActionSkeleton>
    );
};

export default InvestigationOccupationalDisease;