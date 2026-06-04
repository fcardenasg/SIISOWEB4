import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { GetAPTHPById as GetAPTHygieneById, SaveAPTHP as SaveAPTHygiene, ApproveAPTHygiene, GetApproveAPTHygiene } from "api/clients/APTHigienePlantillaClient";
import { GetByIdEmployee } from "api/clients/EmployeeClient";
import Accordion from 'components/accordion/Accordion';
import { AccionMenu, Modulo } from "components/helpers/Enums";
import Iconify from "components/iconify/iconify";
import Cargando from 'components/loading/Cargando';
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import ViewEmployee from "components/views/ViewEmployee";
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as yup from 'yup';

import APTHSignature from '../components/APTHSignature';
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
import ApproveAPTHButton from '../components/ApproveAPTHButton';

const validationSchema = yup.object().shape({
    documento: yup.string().nullable().required('El documento es requerido'),
    sede: yup.string().nullable().required('La sede es requerida'),
    departamentoAuto: yup.object().nullable().required('El departamento es requerido'),
    areaAuto: yup.object().nullable().required('El área es requerida'),
    cargoAuto: yup.object().nullable().required('El cargo es requerido'),
});

const UpdateAPTHygiene = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(true);
    const [modelEmployee, setModelEmployee] = useState([]);
    const [approving, setApproving] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            documento: "",
        }
    });

    const { handleSubmit, formState: { isSubmitting, errors }, setValue, reset, watch } = methods;
    const documento = watch("documento");
    const apthAprobado = watch("apthAprobado");
    const apthAprobadoFecha = watch("apthAprobadoFecha");
    const nameAPTHAprobadoUsuario = watch("nameAPTHAprobadoUsuario");

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

    const handleLoadingDocument = async (documentValue) => {
        try {
            const lsServerEmployee = await GetByIdEmployee(documentValue);
            if (lsServerEmployee?.data.status === 200) {
                setModelEmployee(lsServerEmployee.data.data);
            } else {
                setModelEmployee([]);
                toast.error(lsServerEmployee?.data.message || "Empleado no encontrado");
            }
        } catch (error) {
            setModelEmployee([]);
            toast.error("Error al cargar la información del empleado");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id || id === 'new') return;
                setLoadingData(true);

                const response = await GetAPTHygieneById(id, 2);
                if (response.data.exito) {
                    const data = response.data.datos;
                    console.log(data);

                    if (data) {
                        data.idAPTHigiene = data.idAPTHigiene || data.id || id;
                        reset(data);

                        if (data.documento) {
                            await handleLoadingDocument(data.documento);
                        }

                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                } else {
                    toast.error(response?.data?.mensaje || "Error al cargar la información");
                    navigate("/apt-hygiene/list");
                }
            } catch (error) {
                toast.error("Error al cargar el APT");
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = async (datos) => {
        try {
            datos.id = datos.idAPTHigiene || id;
            datos.departamento = datos.departamentoAuto?.value || null;
            datos.area = datos.areaAuto?.value || null;
            datos.cargo = datos.cargoAuto?.value || null;

            const [result] = await Promise.all([
                SaveAPTHygiene(datos, 2),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);

            if (result.data.exito) {
                toast.success("APT actualizado con éxito");
                const approveResult = await GetApproveAPTHygiene(id);
                if (approveResult.data.exito && approveResult.data?.datos) {
                    const approveData = approveResult.data.datos;
                    if (approveData) {
                        setValue("apthAprobado", approveData.apthAprobado);
                        setValue("apthAprobadoFecha", approveData.apthAprobadoFecha);
                        setValue("nameAPTHAprobadoUsuario", approveData.nameAPTHAprobadoUsuario);
                    }
                }
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(error.message || "Error al actualizar el APT de higiene");
        }
    };

    const handleApprove = async () => {
        try {
            setApproving(true);
            const result = await ApproveAPTHygiene(id);
            if (result.data.exito) {
                toast.success("APT aprobado con éxito");
                const response = await GetAPTHygieneById(id, 2);
                if (response.data.exito && response.data.datos) {
                    const data = response.data.datos;
                    data.idAPTHigiene = data.idAPTHigiene || data.id || id;
                    reset(data);
                }
            } else {
                toast.error(result.data.mensaje || "Error al aprobar el APT");
            }
        } catch (error) {
            toast.error(error.message || "Error al aprobar el APT");
        } finally {
            setApproving(false);
        }
    };

    if (loadingData) {
        return (
            <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.AsignacionInvestigacion}>
                <Box
                    sx={{
                        minHeight: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                    }}
                >
                    <Cargando title="Cargando análisis de higiene..." size={150} />
                </Box>
            </ValidateActionSkeleton>
        );
    }

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            disabled
                            errors={errors}
                            title="Actualizar análisis de puesto de trabajo (APT) - Higiene"
                            key={modelEmployee?.documento}
                            documento={documento}
                            onChange={(e) => setValue("documento", e.target.value)}
                            lsEmployee={modelEmployee}
                            handleDocumento={(e) => handleLoadingDocument(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <StickyActionBar
                            mainTitle="Acciones"
                            showButton={false}
                            showButtonAction={false}
                            threshold={455}
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
                                            <Button fullWidth color="primary" variant="outlined" onClick={() => navigate("/apt-hygiene/list")}>
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

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <APTHSignature />
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ApproveAPTHButton
                                        onClick={handleApprove}
                                        loading={approving}
                                        approved={apthAprobado}
                                        disabled={apthAprobado}
                                    />
                                    {apthAprobado && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            {nameAPTHAprobadoUsuario && (
                                                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                                    Aprobado por: {nameAPTHAprobadoUsuario.toLowerCase()}
                                                </Typography>
                                            )}
                                            {apthAprobadoFecha && (
                                                <Typography variant="body2" color="textSecondary">
                                                    Fecha: {new Date(apthAprobadoFecha).toLocaleDateString('es-CO', {
                                                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </StickyActionBar>
                    </Grid>
                </Grid>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default UpdateAPTHygiene;