import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Divider,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllDetailResearchAssignment, GetByIdResearchAssignment, UpdateResearchAssignments } from 'api/clients/ResearchAssignmentClient';
import { GetAllComboAsesorInvestigacion } from 'api/clients/UserClient';
import {
    AccionMenu,
    Message,
    Modulo,
    TitleButton
} from 'components/helpers/Enums';
import Cargando from 'components/loading/Cargando';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { useBoolean } from 'hooks/use-boolean';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { IconGenderBigender } from '@tabler/icons';
import Accordion from 'components/accordion/Accordion';
import Iconify from 'components/iconify/iconify';
import InputText from 'components/input/InputText';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import { TableDiagnosis, TableDiagnosisRating, TableDLTD, TableOtherCompanies } from './components/Table';
import InputTextEditor from 'components/input/InputTextEditor';

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

    const [textDx, setTextDx] = useState("");
    const [modelEmployee, setModelEmployee] = useState([]);
    const [lsInvestigacion, setLsInvestigacion] = useState([]);
    const [lsDx, setLsDx] = useState([]);
    const [dataModel, setDataModel] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset, getValues, setError, setValue } = methods;
    const documento = getValues("documento");
    const resumenResultadosAnalisisPuesto = getValues("resumenResultadosAnalisisPuesto");

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setModelEmployee(lsServerEmployee.data.data);
            } else {
                setModelEmployee(lsServerEmployee?.data.data);
                toast.error(lsServerEmployee?.data.message);
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
                    handleLoadingDocument({ target: { value: datos.documento } });
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

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            {timeWait.value ?
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                disabled
                                errors={errors}
                                title="Investigación de enfermedad laboral"
                                key={modelEmployee?.documento}
                                documento={documento}
                                onChange={(e) => setValue("documento", e.target.value)}
                                lsEmployee={modelEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="clarity:employee-line" /><Typography sx={{ ml: 2 }} align='right' variant="h5">1. Datos de la empresa</Typography></>}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} lg={4}>
                                                    <InputDatePicker
                                                        label="Fecha de la investigación"
                                                        name="fechaInvestigacion"
                                                        defaultValue={dataModel?.fechaInvestigacion}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <InputText
                                                        defaultValue={dataModel?.razonSocial}
                                                        fullWidth
                                                        name="razonSocial"
                                                        label="Razón social"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <InputText
                                                        defaultValue={dataModel?.nit}
                                                        fullWidth
                                                        name="nit"
                                                        label="NIT"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={8}>
                                                    <InputText
                                                        defaultValue={dataModel?.actividadEconomica}
                                                        fullWidth
                                                        name="actividadEconomica"
                                                        label="Actividad económica de la empresa"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <InputSelect
                                                        name="idSedeTrabajo"
                                                        label="Sede de trabajo"
                                                        defaultValue={dataModel?.idSedeTrabajo}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <InputSelect
                                                        name="idDepartamento"
                                                        label="Departamento"
                                                        defaultValue={dataModel?.idDepartamento}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={4}>
                                                    <InputSelect
                                                        name="idArea"
                                                        label="Área"
                                                        defaultValue={dataModel?.idArea}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="fluent:person-note-24-regular" /><Typography sx={{ ml: 2 }} align='right' variant="h5">2. Datos personales</Typography></>}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <InputText
                                                        defaultValue={dataModel?.nombreCompleto}
                                                        fullWidth
                                                        name="nombreCompleto"
                                                        label="Nombre completo"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputText
                                                        disabled
                                                        defaultValue={dataModel?.documento}
                                                        fullWidth
                                                        name="documento"
                                                        label="Documento"
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idSexo"
                                                        label="Sexo"
                                                        defaultValue={dataModel?.idSexo}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idEstadoCivil"
                                                        label="Estado civil"
                                                        defaultValue={dataModel?.idEstadoCivil}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputDatePicker
                                                        label="Fecha de nacimiento"
                                                        name="fechaNacimiento"
                                                        defaultValue={dataModel?.fechaNacimiento}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idDepartamentoNacimiento"
                                                        label="Departamento de nacimiento"
                                                        defaultValue={dataModel?.idDepartamentoNacimiento}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idMunicipioNacimiento"
                                                        label="Municipio de nacimiento"
                                                        defaultValue={dataModel?.idMunicipioNacimiento}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idEscolaridad"
                                                        label="Escolaridad"
                                                        defaultValue={dataModel?.idEscolaridad}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idProfesion"
                                                        label="Profesión"
                                                        defaultValue={dataModel?.idProfesion}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idDepartamentoRecidencia"
                                                        label="Departamento de recidencia"
                                                        defaultValue={dataModel?.idDepartamentoRecidencia}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idMunicipioRecidencia"
                                                        label="Municipio de recidencia"
                                                        defaultValue={dataModel?.idMunicipioRecidencia}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <SubCard title="Seguridad social">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={6} lg={4}>
                                                                <InputSelect
                                                                    name="idEps"
                                                                    label="EPS"
                                                                    defaultValue={dataModel?.idEps}
                                                                    options={[]}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12} md={6} lg={4}>
                                                                <InputSelect
                                                                    name="idAfp"
                                                                    label="AFP"
                                                                    defaultValue={dataModel?.idAfp}
                                                                    options={[]}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                />
                                                            </Grid>

                                                            <Grid item xs={12} md={6} lg={4}>
                                                                <InputSelect
                                                                    name="idArl"
                                                                    label="ARL"
                                                                    defaultValue={dataModel?.idArl}
                                                                    options={[]}
                                                                    size={matchesXS ? 'small' : 'medium'}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </SubCard>
                                                </Grid>
                                            </Grid>
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="material-symbols-light:work-history-outline" /><Typography sx={{ ml: 2 }} align='right' variant="h5">3. Historia laboral en DLTD</Typography></>}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TableDLTD />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography variant="h4">Otros cargos</Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TableDLTD />
                                                </Grid>
                                            </Grid>
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="icon-park-twotone:history-query" /><Typography sx={{ ml: 2 }} align='right' variant="h5">4. Historia laboral en otras empresas</Typography></>}>
                                            <TableOtherCompanies />
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="material-symbols-light:diagnosis-outline-rounded" /><Typography sx={{ ml: 2 }} align='right' variant="h5">5. Datos del diagnóstico y del proceso de calificación</Typography></>}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TableDiagnosis />
                                                </Grid>

                                                <Grid item xs={12}><Divider /></Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idGeneroIncapacidad"
                                                        label="Generó incapacidad"
                                                        defaultValue={dataModel?.idGeneroIncapacidad}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputText
                                                        name="diasIncapacidad"
                                                        label="Días de incapacidad"
                                                        defaultValue={dataModel?.diasIncapacidad}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <InputText
                                                        name="observacionesIncapacidad"
                                                        label="Observaciones a la incapacidad"
                                                        multiline
                                                        rows={2}
                                                        defaultValue={dataModel?.observacionesIncapacidad}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputText
                                                        name="numeroFurel"
                                                        label="FUREL #"
                                                        defaultValue={dataModel?.numeroFurel}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputDatePicker
                                                        name="fechaFurel"
                                                        label="Fecha del FUREL"
                                                        defaultValue={dataModel?.fechaFurel}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputDatePicker
                                                        name="fechaEstructuracionOrigen"
                                                        label="Fecha de estructuración de origen"
                                                        defaultValue={dataModel?.fechaEstructuracionOrigen}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}><Divider /></Grid>

                                                <Grid item xs={12}>
                                                    <TableDiagnosisRating methods={methods} />
                                                </Grid>

                                                <Grid item xs={12}><Divider /></Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idCalificacionPCL"
                                                        label="Calificación PCL"
                                                        defaultValue={dataModel?.idCalificacionPCL}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputText
                                                        name="porcentajePCL"
                                                        label="% PCL"
                                                        defaultValue={dataModel?.porcentajePCL}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputText
                                                        name="instancia"
                                                        label="Instancia"
                                                        defaultValue={dataModel?.instancia}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputText
                                                        name="dictamen"
                                                        label="Dictamen #"
                                                        defaultValue={dataModel?.dictamen}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={3}>
                                                    <InputSelect
                                                        name="idCalificacionIntegral"
                                                        label="Calificación integral"
                                                        defaultValue={dataModel?.idCalificacionIntegral}
                                                        options={[]}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6} lg={9}>
                                                    <InputText
                                                        name="otrasPatologias"
                                                        label="Otras patologías que hacen parte de la calificación de PCL"
                                                        defaultValue={dataModel?.otrasPatologias}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="hugeicons:permanent-job" /><Typography sx={{ ml: 2 }} align='right' variant="h5">6. Datos sobre la exposición en la empresa</Typography></>}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                        Resumen de los resultados del análisis del puesto de trabajo
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <InputTextEditor />
                                                </Grid>

                                                {/* <Grid item xs={12}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                        Resumen de la valoración del riesgo
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <InputTextEditor name="resumenValoracionRiesgo" defaultValue={dataModel?.resumenValoracionRiesgo} />
                                                </Grid> */}
                                            </Grid>
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="carbon:ibm-webmethods-hybrid-integration" /><Typography sx={{ ml: 2 }} align='right' variant="h5">7. Métodos de control disponibles</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="streamline-ultimate:data-file-search" /><Typography sx={{ ml: 2 }} align='right' variant="h5">8. Datos clínicos y paraclínicos</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="streamline:copy-paste" /><Typography sx={{ ml: 2 }} align='right' variant="h5">9. Antecedentes</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="material-symbols-light:other-admission-outline-rounded" /><Typography sx={{ ml: 2 }} align='right' variant="h5">10. Otros datos clínicos</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="fluent:task-list-square-person-20-regular" /><Typography sx={{ ml: 2 }} align='right' variant="h5">11. Caracterización del ausentismo laboral por todas las causas</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="icon-park-outline:file-search" /><Typography sx={{ ml: 2 }} align='right' variant="h5">12. Revisión de la bibliografía aplicable</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="lets-icons:file-dock-search-light" /><Typography sx={{ ml: 2 }} align='right' variant="h5">13. Análisis de causas</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="tabler:report" /><Typography sx={{ ml: 2 }} align='right' variant="h5">14. Causa básica detectada</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="pepicons-print:file" /><Typography sx={{ ml: 2 }} align='right' variant="h5">15. Conclusión</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="covid:social-distancing-correct-3" /><Typography sx={{ ml: 2 }} align='right' variant="h5">16. Acciones preventivas o correctivas</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Accordion title={<><Iconify width={25} icon="material-symbols-light:signature-rounded" /><Typography sx={{ ml: 2 }} align='right' variant="h5">17. Firmas</Typography></>}>

                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}>
                                                <AnimateButton>
                                                    <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                        {TitleButton.Actualizar}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                            <Grid item xs={2}>
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
                </FormProvider> : <Cargando />
            }
        </ValidateActionSkeleton>
    );
};

export default InvestigationOccupationalDisease;