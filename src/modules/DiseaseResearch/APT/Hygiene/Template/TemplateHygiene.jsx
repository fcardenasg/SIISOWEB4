import { Box, Button, Grid, Typography } from "@mui/material";
import Accordion from 'components/accordion/Accordion';
import { AccionMenu, Modulo } from "components/helpers/Enums";
import Iconify from "components/iconify/iconify";
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ApplicableEnvironmentalMeasurements, AssessmentPhysicalLoad, AvailableControlMethods, CompanyInformation, ConclusionAndSource, EnvironmentalAspects, JobDescription, OrganizationalAspects, WorkActivity, WorkActivityTwo } from "../components/Main";

const TemplateHygiene = () => {
    const navigate = useNavigate();
    const methods = useForm();
    const { handleSubmit, getValues, formState: { errors }, setValue } = methods;

    const handleClick = (datos) => {
    };

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
            title: { icon: "lucide:id-card", text: "Descripción del puesto de trabajo" },
            content: <JobDescription />
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

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <StickyActionBar
                    mainTitle="Registrar plantillas de higiene"
                    onClickSave={handleSubmit(handleClick)}
                    onClickUpdate={handleSubmit(handleClick)}
                    /* disabledUpdate={!disabledButton.value}
                    disabledSave={disabledButton.value} */
                    showButton={false}
                    threshold={27}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CompanyInformation />
                        </Grid>

                        {ArrayAccordion.map((item, index) => (
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
                        ))}

                        <Grid item xs={6} md={4} lg={2}>
                            <Button fullWidth color="primary" variant="outlined" onClick={() => navigate("/apt-hygiene/list")}>
                                Cerrar
                            </Button>
                        </Grid>
                    </Grid>
                </StickyActionBar>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default TemplateHygiene;