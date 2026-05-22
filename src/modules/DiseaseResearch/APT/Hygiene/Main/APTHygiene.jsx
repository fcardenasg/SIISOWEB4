import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertTitle, Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { InsertAPTHPBulk, SaveAPTHP as SaveAPTHygiene } from "api/clients/APTHigienePlantillaClient";
import { GetByIdEmployee } from "api/clients/EmployeeClient";
import Accordion from 'components/accordion/Accordion';
import { AccionMenu, Modulo } from "components/helpers/Enums";
import Iconify from "components/iconify/iconify";
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import ViewEmployee from "components/views/ViewEmployee";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from "ui-component/extended/AnimateButton";
import * as yup from 'yup';
import { ApplicableEnvironmentalMeasurements, AssessmentPhysicalLoad, AvailableControlMethods, CompanyInformation, ConclusionAndSource, EnvironmentalAspects, OrganizationalAspects, WorkActivity, WorkActivityTwo } from "../components/Main";

const validationSchema = yup.object().shape({
    documento: yup.string().required("El documento es requerido"),
    sede: yup.string().nullable().required('La sede es requerida'),
    departamentoAuto: yup.object().nullable().required('El departamento es requerido'),
    areaAuto: yup.object().nullable().required('El área es requerida'),
    cargoAuto: yup.object().nullable().required('El cargo es requerido'),
});

const APTHygiene = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, watch, formState: { isSubmitting, errors }, setValue, reset } = methods;
    const idAPTHigiene = watch("idAPTHigiene");
    const documento = watch("documento");

    const [modelEmployee, setModelEmployee] = useState([]);
    const [idAPTHPlantilla, setIdAPTHPlantilla] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isBulkSubmitting, setIsBulkSubmitting] = useState(false);

    useEffect(() => {
        if (location.state?.prevData) {
            const { documento: prevDoc, modelEmployee: prevEmp, idAPTHPlantilla: prevPlantilla, showForm: prevShow } = location.state.prevData;
            if (prevDoc) setValue("documento", prevDoc);
            if (prevEmp) setModelEmployee(prevEmp);
            if (prevPlantilla) setIdAPTHPlantilla(prevPlantilla);
            if (prevShow) setShowForm(prevShow);
        }
    }, [location.state, setValue]);

    const ArrayAccordion = [
        {
            title: { icon: "solar:buildings-2-linear", text: "Aspectos organizacionales" },
            content: <OrganizationalAspects />
        },
        {
            title: { icon: "solar:user-id-linear", text: "Actividad laboral" },
            content: <WorkActivity />
        },
        {
            title: { icon: "solar:leaf-linear", text: "Aspectos ambientales" },
            content: <EnvironmentalAspects />
        },
        {
            title: { icon: "hugeicons:permanent-job", text: "Actividad laboral" },
            content: <WorkActivityTwo />
        },
        {
            title: { icon: "hugeicons:weight-scale", text: "Valoración de la carga física" },
            content: <AssessmentPhysicalLoad />
        },
        {
            title: { icon: "arcticons:atmospherelogger", text: "Mediciones ambientales aplicables" },
            content: <ApplicableEnvironmentalMeasurements />
        },
        {
            title: { icon: "carbon:ibm-webmethods-hybrid-integration", text: "Métodos de control disponibles" },
            content: <AvailableControlMethods />
        },
        {
            title: { icon: "pepicons-print:file", text: "Conclusiones y fuentes de información" },
            content: <ConclusionAndSource />
        },
    ];

    const handleDocumento = async (event) => {
        try {
            const document = event?.target.value;
            setValue("documento", document, { shouldValidate: true });

            if (document !== '') {
                if (event.key === 'Enter' || event.type === 'blur') {
                    var lsServerEmployee = await GetByIdEmployee(document);
                    if (lsServerEmployee?.data.status === 200) {
                        const employeeData = lsServerEmployee.data.data;
                        setModelEmployee(employeeData);

                        if (employeeData.idAPTHPlantilla) {
                            setIdAPTHPlantilla(employeeData.idAPTHPlantilla);
                            setShowForm(false);
                            toast.success("Se ha encontrado una plantilla de higiene para el cargo.");
                        } else {
                            setIdAPTHPlantilla(null);
                            toast.info("No existe una plantilla de higiene para el cargo del empleado.");
                        }
                    } else {
                        setModelEmployee([]);
                        setIdAPTHPlantilla(null);
                        setShowForm(false);
                        toast.error(lsServerEmployee?.data.message || "Empleado no encontrado");
                    }
                }
            } else {
                setModelEmployee([]);
                setIdAPTHPlantilla(null);
                setShowForm(false);
            }
        } catch (error) { }
    };

    const handleClick = async (datos) => {
        try {
            if (idAPTHPlantilla) {
                setIsBulkSubmitting(true);
                const result = await InsertAPTHPBulk(idAPTHPlantilla, documento);
                if (result.data.exito) {
                    const { idHigiene } = result.data.datos;
                    toast.success(result.data.mensaje);
                    if (idHigiene) {
                        navigate(`/apt-hygiene/update/${idHigiene}`);
                    }
                } else {
                    toast.error(result.data.mensaje);
                }
                setIsBulkSubmitting(false);
            } else {
                datos.id = datos.idAPTHigiene || 0;
                datos.departamento = datos.departamentoAuto?.value || null;
                datos.area = datos.areaAuto?.value || null;
                datos.cargo = datos.cargoAuto?.value || null;

                const [result] = await Promise.all([
                    SaveAPTHygiene(datos, 2),
                    new Promise(resolve => setTimeout(resolve, 1000))
                ]);

                if (result.data.exito) {
                    setValue("idAPTHigiene", result.data.datos);
                    toast.success(result.data.mensaje);
                } else {
                    toast.error(result.data.mensaje);
                }
            }
        } catch (error) {
            setIsBulkSubmitting(false);
            toast.error(error.message || "Error al registrar el APT de Higiene");
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            errors={errors}
                            title="Registrar análisis de puesto de trabajo (APT) - Higiene"
                            key={modelEmployee?.documento}
                            documento={documento}
                            onChange={(e) => setValue("documento", e.target.value)}
                            lsEmployee={modelEmployee}
                            handleDocumento={handleDocumento}
                        />
                    </Grid>

                    <AnimatePresence>
                        {!modelEmployee?.documento && (
                            <Grid item xs={12} component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <SubCard sx={{ borderLeft: '6px solid', borderColor: 'primary.main', '&:hover': { boxShadow: 3 } }}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Box sx={{ bgcolor: 'primary.main', p: 1.5, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Iconify icon="solar:user-search-bold-duotone" width={45} color="white" />
                                        </Box>
                                        <Box>
                                            <Typography variant="h4" gutterBottom sx={{ color: 'primary.dark', fontWeight: 700 }}>
                                                Gestión de Análisis de Puesto de Trabajo
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                                                Para iniciar el registro, por favor <strong>busque un empleado</strong> ingresando su número de identificación.
                                                <br />
                                                El sistema validará automáticamente si el cargo cuenta con una <strong>Plantilla de Higiene</strong> preconfigurada para agilizar su proceso mediante la importación de datos.
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate("/apt-hygiene/list")}
                                                startIcon={<Iconify icon="solar:list-bold-duotone" />}
                                                sx={{ borderRadius: 2, px: 3 }}
                                            >
                                                Ver listado de APT
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </SubCard>
                            </Grid>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {modelEmployee?.documento && (
                            <Grid item xs={12} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>

                                <StickyActionBar
                                    mainTitle="Acciones"
                                    showButton={false}
                                    showButtonAction={false}
                                    threshold={455}
                                    othersButton={
                                        <>
                                            {!idAPTHPlantilla && modelEmployee?.documento && !showForm && (
                                                <Grid item xs={6} md={4} lg={3}>
                                                    <AnimateButton>
                                                        <Button
                                                            fullWidth
                                                            variant="contained"
                                                            onClick={() => setShowForm(true)}
                                                            startIcon={<Iconify icon="solar:pen-new-square-linear" />}
                                                        >
                                                            Registrar
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            )}

                                            {(idAPTHPlantilla || showForm) && (
                                                <Grid item xs={6} md={4} lg={3}>
                                                    <AnimateButton>
                                                        <Button
                                                            fullWidth
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={idAPTHPlantilla ? () => handleClick() : handleSubmit(handleClick)}
                                                            disabled={isSubmitting || isBulkSubmitting}
                                                            startIcon={(isSubmitting || isBulkSubmitting) ? <CircularProgress size={20} color="inherit" /> : null}
                                                        >
                                                            {(isSubmitting || isBulkSubmitting)
                                                                ? "Guardando..."
                                                                : (idAPTHigiene ? "Actualizar" : (idAPTHPlantilla ? "Guardar Plantilla" : "Guardar"))
                                                            }
                                                        </Button>
                                                    </AnimateButton>
                                                </Grid>
                                            )}

                                            <Grid item xs={6} md={4} lg={3}>
                                                <AnimateButton>
                                                    <Button fullWidth color="primary" variant="outlined" onClick={() => navigate("/apt-hygiene/list")}>
                                                        Cerrar
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </>
                                    }
                                >
                                    <Grid container spacing={2}>
                                        {idAPTHPlantilla && (
                                            <Grid item xs={12}>
                                                <Alert
                                                    severity="success"
                                                    variant="filled"
                                                    icon={<Iconify icon="solar:clipboard-check-bold-duotone" width={30} />}
                                                    sx={{ borderRadius: 2, boxShadow: 2 }}
                                                >
                                                    <AlertTitle sx={{ fontSize: '1.1rem', fontWeight: 700 }}>¡Plantilla de Higiene Localizada!</AlertTitle>
                                                    Hemos encontrado una configuración predefinida para el cargo de este empleado.
                                                    Al guardar, se importarán automáticamente todas las actividades y métodos de control asociados, agilizando la creación del registro.
                                                </Alert>
                                            </Grid>
                                        )}
                                        {!idAPTHPlantilla && !showForm && (
                                            <Grid item xs={12}>
                                                <Alert
                                                    severity="info"
                                                    variant="outlined"
                                                    icon={<Iconify icon="solar:notes-bold-duotone" width={30} />}
                                                    sx={{ borderRadius: 2, borderStyle: 'dashed', borderWidth: 2 }}
                                                >
                                                    <AlertTitle sx={{ fontWeight: 700 }}>Sin Plantilla Predefinida</AlertTitle>
                                                    No se encontró una plantilla de higiene vinculada a este cargo.
                                                    Puede proceder con el <strong>registro manual</strong> utilizando el botón de la barra de acciones para documentar detalladamente el puesto de trabajo.
                                                </Alert>
                                            </Grid>
                                        )}
                                        {(idAPTHigiene || showForm) && (
                                            <>
                                                <Grid item xs={12}>
                                                    <CompanyInformation />
                                                </Grid>

                                                {!idAPTHigiene &&
                                                    ArrayAccordion.map((item, index) => (
                                                        <Grid item xs={12} key={index}>
                                                            <Accordion
                                                                title={
                                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                        <Iconify width={25} icon={item.title.icon} />
                                                                        <Typography sx={{ ml: 2 }} variant="h5">
                                                                            {item.title.text}
                                                                        </Typography>
                                                                    </Box>
                                                                }
                                                            >
                                                                {item.content}
                                                            </Accordion>
                                                        </Grid>
                                                    ))
                                                }
                                            </>
                                        )}
                                    </Grid>
                                </StickyActionBar>
                            </Grid>
                        )}
                    </AnimatePresence>
                </Grid>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default APTHygiene;