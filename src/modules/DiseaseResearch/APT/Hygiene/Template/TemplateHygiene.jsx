import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { SaveAPTHP } from "api/clients/APTHigienePlantillaClient";
import Accordion from 'components/accordion/Accordion';
import { AccionMenu, Modulo } from "components/helpers/Enums";
import Iconify from "components/iconify/iconify";
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as yup from 'yup';
import InitialInfoAlert from '../components/InitialInfoAlert';
import { ApplicableEnvironmentalMeasurements, AssessmentPhysicalLoad, AvailableControlMethods, CompanyInformation, ConclusionAndSource, EnvironmentalAspects, OrganizationalAspects, WorkActivity, WorkActivityTwo } from "../components/Main";

const validationSchema = yup.object().shape({
    sede: yup.string().nullable().required('La sede es requerida'),
    departamentoAuto: yup.object().nullable().required('El departamento es requerido'),
    areaAuto: yup.object().nullable().required('El área es requerida'),
    cargoAuto: yup.object().nullable().required('El cargo es requerido'),
});

const TemplateHygiene = () => {
    const navigate = useNavigate();
    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, watch, formState: { isSubmitting }, setValue, reset } = methods;
    const idAPTHigienePlantilla = watch("idAPTHigienePlantilla");

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

    const handleClick = async (datos) => {
        try {
            datos.id = datos.idAPTHigienePlantilla || 0;
            datos.departamento = datos.departamentoAuto?.value || null;
            datos.area = datos.areaAuto?.value || null;
            datos.cargo = datos.cargoAuto?.value || null;

            const [result] = await Promise.all([
                SaveAPTHP(datos, 1),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);

            if (result.data.exito) {
                setValue("idAPTHigienePlantilla", result.data.datos);
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al registrar la plantilla de APT");
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <StickyActionBar
                    mainTitle="Registrar plantilla de análisis de puesto de trabajo (APT)"
                    showButton={false}
                    showButtonAction={false}
                    threshold={27}
                    othersButton={
                        <>
                            <Grid item xs={6} md={4} lg={3}>
                                <AnimateButton>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSubmit(handleClick)}
                                        disabled={isSubmitting}
                                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                                    >
                                        {isSubmitting
                                            ? "Guardando..."
                                            : (idAPTHigienePlantilla ? "Actualizar" : "Guardar")
                                        }
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={6} md={4} lg={3}>
                                <AnimateButton>
                                    <Button fullWidth color="primary" variant="outlined" onClick={() => navigate("/apt-hygiene/template/list")}>
                                        Cerrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </>
                    }
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CompanyInformation />
                        </Grid>

                        {!idAPTHigienePlantilla && (
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <InitialInfoAlert />
                            </Grid>
                        )}

                        {idAPTHigienePlantilla &&
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
                    </Grid>
                </StickyActionBar>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default TemplateHygiene;