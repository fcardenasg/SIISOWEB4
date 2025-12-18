import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetComboCompany } from "api/clients/CompanyClient";
import Accordion from 'components/accordion/Accordion';
import { AccionMenu, CodCatalogo, Modulo } from "components/helpers/Enums";
import Iconify from "components/iconify/iconify";
import InputSelect from "components/input/InputSelect";
import InputText from 'components/input/InputText';
import StickyActionBar from "components/StickyActionBar/StickyActionBar";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import { useBoolean } from "hooks/use-boolean";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ActivityPercentageDistribution, EnvironmentalAspects, JobDescription, NonRoutineActivities, OrganizationalAspects, PhotographicRecord, WorkActivity, WorkCycle } from "./OthersHygiene";
import TableHygiene from "./TableHygiene";

const APTHygiene = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const methods = useForm();
    const { handleSubmit, getValues, formState: { errors }, setValue } = methods;

    const disabledButton = useBoolean(false);

    const listaArchivo = getValues("listaArchivo");

    const [lsCompany, setLsCompany] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsDepartamento, setLsDepartamento] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsTurno, setLsTurno] = useState([]);
    const [lsCategoria, setLsCategoria] = useState([]);
    const [lsRitmoTrabajo, setLsRitmoTrabajo] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerCompany = await GetComboCompany();
            setLsCompany(lsServerCompany.data);

            const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
            setLsSede(lsServerSede.data);

            const lsServerArea = await GetByTipoCatalogoCombo(CodCatalogo.Area);
            setLsArea(lsServerArea.data);

            const lsServerDepartamento = await GetByTipoCatalogoCombo(CodCatalogo.DepartEmpresa);
            setLsDepartamento(lsServerDepartamento.data);

            const lsServerCargo = await GetByTipoCatalogoCombo(CodCatalogo.RosterPosition);
            setLsCargo(lsServerCargo.data);

            const lsServerTurno = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
            setLsTurno(lsServerTurno.data);

            /* Agregar info y otros datos */
            const lsServerCategoria = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
            setLsCategoria(lsServerCategoria.data);

            const lsServerRitmoTrabajo = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
            setLsRitmoTrabajo(lsServerRitmoTrabajo.data);
        }

        getData();
    }, []);

    const handleEmpresaChange = (event) => {
        setValue('empresa', event.target.value);
        setValue('actividadEconomica', lsCompany.find((item) => item.value === event.target.value).codigo);
    };

    const handleClick = () => {
        console.log(getValues());
    };

    const ArrayAccordion = [
        {
            title: { icon: "solar:buildings-2-linear", text: "Aspectos organizacionales" },
            content: <OrganizationalAspects />
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
            title: { icon: "solar:user-id-linear", text: "Actividad laboral" },
            content: <WorkActivity />
        },
        {
            title: { icon: "solar:refresh-linear", text: "Ciclo de trabajo" },
            content: <WorkCycle />
        },
        {
            title: { icon: "lucide:pie-chart", text: "Distribución porcentual de las actividades" },
            content: <ActivityPercentageDistribution />
        },
        {
            title: { icon: "hugeicons:computer-activity", text: "Descripción biomecánica de la actividad" },
            content: <TableHygiene />
        },
        {
            title: { icon: "solar:danger-triangle-linear", text: "Actividades no rutinarias" },
            content: <NonRoutineActivities />
        },
        {
            title: { icon: "solar:camera-linear", text: "Registro fotográfico" },
            content: <PhotographicRecord />
        },
        {
            title: { icon: "solar:shield-warning-linear", text: "Valoración del riesgo" },
            content: <></>
        },
        {
            title: { icon: "solar:file-check-linear", text: "Aplicación de la metodología (ANSI)" },
            content: <></>
        },
        {
            title: { icon: "solar:list-check-linear", text: "Análisis de las tareas por segmento" },
            content: <></>
        },
        {
            title: { icon: "solar:file-check-linear", text: "Aplicación de la metodología (OWAS)" },
            content: <></>
        },
        {
            title: { icon: "solar:ranking-linear", text: "Calificación por segmento" },
            content: <></>
        },
        {
            title: { icon: "solar:flag-linear", text: "Conclusiones" },
            content: <></>
        },
        {
            title: { icon: "solar:settings-linear", text: "Métodos de control disponibles" },
            content: <></>
        },
        {
            title: { icon: "solar:book-linear", text: "Fuentes de información" },
            content: <></>
        },
        {
            title: { icon: "solar:users-group-rounded-linear", text: "Participantes" },
            content: <></>
        }
    ];

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.AsignacionInvestigacion}>
            <FormProvider {...methods}>
                <StickyActionBar
                    mainTitle="Registrar APT - Higiene"
                    onClickSave={handleSubmit(handleClick)}
                    onClickUpdate={handleSubmit(handleClick)}
                    disabledUpdate={!disabledButton.value}
                    disabledSave={disabledButton.value}
                    showButton={false}
                    threshold={27}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mb: 1.5 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="empresa"
                                        label="Empresa"
                                        defaultValue=""
                                        options={lsCompany}
                                        onChange={handleEmpresaChange}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="actividadEconomica"
                                        label="Actividad económica"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="sede"
                                        label="Sede"
                                        defaultValue=""
                                        options={lsSede}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="departamento"
                                        label="Departamento"
                                        defaultValue=""
                                        options={lsDepartamento}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="area"
                                        label="Área"
                                        defaultValue=""
                                        options={lsArea}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="cargo"
                                        label="Cargo"
                                        defaultValue=""
                                        options={lsCargo}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                            </Grid>
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

export default APTHygiene;