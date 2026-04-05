import { Divider, Grid } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetComboCompany } from "api/clients/CompanyClient";
import { CodCatalogo } from "components/helpers/Enums";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import InputTextEditor from "components/input/InputTextEditor";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SubCard from "ui-component/cards/SubCard";
import ActivityTable from "./ActivityTable";
import PhotographicEvidence from "./PhotographicEvidence";
import { CategoryTableSegment, OrganizationalFactorTable, TableControlMethods, TableReferenceValuesSegment } from "./TableAPT";
import BiomechanicalRiskAssessment from "./BiomechanicalRiskAssessment";
import ImageDropzone from "./ImageDropzone";

export const CompanyInformation = ({ dataModel }) => {
    const { setValue } = useFormContext();

    const [lsCompany, setLsCompany] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsDepartamento, setLsDepartamento] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);

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
        }

        getData();
    }, []);

    const handleEmpresaChange = (event) => {
        setValue('empresa', event.target.value);
        setValue('actividadEconomica', lsCompany.find((item) => item.value === event.target.value).codigo);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="empresa"
                    label="Empresa"
                    defaultValue={dataModel?.empresa}
                    options={lsCompany}
                    onChange={handleEmpresaChange}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    defaultValue={dataModel?.actividadEconomica}
                    fullWidth
                    name="actividadEconomica"
                    label="Actividad económica"
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="sede"
                    label="Sede"
                    defaultValue={dataModel?.sede}
                    options={lsSede}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="departamento"
                    label="Departamento"
                    defaultValue={dataModel?.departamento}
                    options={lsDepartamento}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="area"
                    label="Área"
                    defaultValue={dataModel?.area}
                    options={lsArea}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="cargo"
                    label="Cargo"
                    defaultValue={dataModel?.cargo}
                    options={lsCargo}
                />
            </Grid>
        </Grid>
    )
}

export const OrganizationalAspects = ({ dataModel }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    name="jornadaLaboralHoras"
                    label="Jornada de trabajo (horas)"
                    type="number"
                    defaultValue={dataModel?.jornadaLaboralHoras}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="turno"
                    label="Turno"
                    defaultValue={dataModel?.turno}
                    options={[]}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    name="rotaciones"
                    label="Rotaciones"
                    defaultValue={dataModel?.rotaciones}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputText
                    name="ritmoTrabajo"
                    label="Ritmo de trabajo"
                    defaultValue={dataModel?.ritmoTrabajo}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="tiempoPausa"
                    label="Tiempos de pausa"
                    defaultValue={dataModel?.tiempoPausa}
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    showAI
                    showVoice
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="categoriaCargo"
                    label="Categoría del cargo"
                    defaultValue={dataModel?.categoriaCargo}
                    options={[]}
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="organizacionTrabajo"
                    label="Organización del trabajo"
                    defaultValue={dataModel?.organizacionTrabajo}
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    showAI
                    showVoice
                />
            </Grid>
        </Grid>
    )
}

export const WorkActivity = ({ dataModel }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <InputTextEditor label="Objetivo del cargo" name="objetivoCargo" defaultValue={dataModel?.objetivoCargo} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Descripción del lugar donde se realiza la labor" name="descripcionLugar" defaultValue={dataModel?.descripcionLugar} />
            </Grid>
        </Grid>
    )
}

export const JobDescription = ({ dataModel }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <InputTextEditor label="Características de diseño del puesto de trabajo" name="caracteristicasDisenoPuesto" defaultValue={dataModel?.caracteristicasDisenoPuesto} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Evidencias fotográficas de las características de diseño del puesto de trabajo">
                    <PhotographicEvidence name="fotosCaracteristicasDisenoPuesto" />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Mobiliario" name="mobiliario" defaultValue={dataModel?.mobiliario} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Evidencias fotográficas del mobiliario">
                    <PhotographicEvidence name="fotosMobiliario" />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Herramientas, equipos y materiales" name="herramientasEquipos" defaultValue={dataModel?.herramientasEquipos} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Ayudas mecánicas" name="ayudasMecanicas" defaultValue={dataModel?.ayudasMecanicas} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Elementos de confort" name="elementosConfort" defaultValue={dataModel?.elementosConfort} />
            </Grid>
        </Grid>
    )
}

export const EnvironmentalAspects = ({ dataModel }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="condicionesOrdenAseo"
                    label="Condiciones de orden y aseo"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.condicionesOrdenAseo}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="agentesBiologicos"
                    label="Agentes biológicos"
                    defaultValue={dataModel?.agentesBiologicos}
                    options={[]}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="agentesQuimicos"
                    label="Agentes químicos"
                    defaultValue={dataModel?.agentesQuimicos}
                    options={[]}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="iluminacion"
                    label="Iluminación"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.iluminacion}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="materialParticulado"
                    label="Material particulado"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.materialParticulado}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="ruido"
                    label="Ruido"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.ruido}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="temperatura"
                    label="Temperatura"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.temperatura}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="ventilacion"
                    label="Ventilación"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.ventilacion}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="vibracion"
                    label="Vibración"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.vibracion}
                    fullWidth
                />
            </Grid>
        </Grid>
    )
}

export const WorkActivityTwo = ({ dataModel }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <InputTextEditor label="Descripción general del cargo" name="descripcionGeneralCargo" defaultValue={dataModel?.descripcionGeneralCargo} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Rotaciones establecidas para el cargo" name="rotacionesCargo" defaultValue={dataModel?.rotacionesCargo} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Ciclo de trabajo">
                    Pendiente de revisar si existe alguna libreria para integrar un paint o algo parecido.
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <ActivityTable />
            </Grid>
        </Grid>
    )
}

export const AssessmentPhysicalLoad = ({ dataModel }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <SubCard darkTitle title="Aplicación del método OWAS">
                    <CategoryTableSegment />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Aplicación de la metodología ANSI">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <OrganizationalFactorTable />
                        </Grid>

                        <Grid item xs={12}><Divider /></Grid>

                        <Grid item xs={12}>
                            <TableReferenceValuesSegment />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Valoración">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            Pendiente de realizar
                        </Grid>

                        <Grid item xs={12}>
                            <InputTextEditor label="Observación de los resultados" name="observacionResultados" defaultValue={dataModel?.observacionResultados} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Valoración consolidada del riesgo biomecánico">
                    <BiomechanicalRiskAssessment />
                </SubCard>
            </Grid>
        </Grid>
    )
}

export const ApplicableEnvironmentalMeasurements = ({ dataModel }) => {
    const { control } = useFormContext();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a vibración">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="vibrationImage" control={control} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="vibrationInterpretation" defaultValue={dataModel?.vibrationInterpretation} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a ruido">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="noiseImage" control={control} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="noiseInterpretation" defaultValue={dataModel?.noiseInterpretation} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a material particulado">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="particulateImage" control={control} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="particulateInterpretation" defaultValue={dataModel?.particulateInterpretation} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    )
}

export const AvailableControlMethods = () => {
    return (
        <TableControlMethods />
    )
}

export const ConclusionAndSource = ({ dataModel }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Conclusiones" name="conclusiones" defaultValue={dataModel?.conclusiones} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Fuentes de información" name="fuentesInformacion" defaultValue={dataModel?.fuentesInformacion} />
            </Grid>
        </Grid>
    )
}