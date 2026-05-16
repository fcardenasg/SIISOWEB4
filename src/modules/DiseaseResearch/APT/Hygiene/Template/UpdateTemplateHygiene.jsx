import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Typography, Skeleton } from "@mui/material";
import { GetAPTHPById, SaveAPTHP } from "api/clients/APTHigienePlantillaClient";
import Accordion from 'components/accordion/Accordion';
import { AccionMenu, Modulo } from "components/helpers/Enums";
import Iconify from "components/iconify/iconify";
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as yup from 'yup';

import {
    ApplicableEnvironmentalMeasurements,
    AssessmentPhysicalLoad,
    AvailableControlMethods,
    CompanyInformation,
    ConclusionAndSource,
    EnvironmentalAspects,
    OrganizationalAspects,
    WorkActivity,
    WorkActivityTwo
} from "../components/Main";

const validationSchema = yup.object().shape({
    sede: yup.string().nullable().required('La sede es requerida'),
    departamentoAuto: yup.object().nullable().required('El departamento es requerido'),
    areaAuto: yup.object().nullable().required('El área es requerida'),
    cargoAuto: yup.object().nullable().required('El cargo es requerido'),
});

const UpdateTemplateHygiene = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(true);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { isSubmitting }, setValue, reset } = methods;

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;

                const response = await GetAPTHPById(id, 1);
                if (response.data && response.data.exito) {
                    const data = response.data.datos;

                    if (data) {
                        data.idAPTHigienePlantilla = data.idAPTHigienePlantilla || data.id || id;
                        reset(data);
                    }
                } else {
                    toast.error(response?.data?.mensaje || "Error al cargar la información");
                    navigate("/apt-hygiene/template/list");
                }
            } catch (error) {
                toast.error("Error al cargar la plantilla");
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = async (datos) => {
        try {
            datos.id = datos.idAPTHigienePlantilla || id;
            datos.departamento = datos.departamentoAuto?.value || null;
            datos.area = datos.areaAuto?.value || null;
            datos.cargo = datos.cargoAuto?.value || null;

            const [result] = await Promise.all([
                SaveAPTHP(datos, 1),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);

            if (result.data.exito) {
                toast.success("Plantilla actualizada con éxito");
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al actualizar la plantilla de APT");
        }
    };

    if (loadingData) {
        return (
            <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.AsignacionInvestigacion}>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 2, mb: 2 }} />
                    <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 2, mb: 2 }} />
                    <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 2, mb: 2 }} />
                </Box>
            </ValidateActionSkeleton>
        );
    }

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <StickyActionBar
                    mainTitle="Actualizar plantilla de análisis de puesto de trabajo (APT)"
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
                                        {isSubmitting ? "Actualizando..." : "Actualizar"}
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
                    </Grid>
                </StickyActionBar>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default UpdateTemplateHygiene;