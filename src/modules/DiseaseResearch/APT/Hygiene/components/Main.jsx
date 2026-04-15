import { Divider, Grid, Typography } from "@mui/material";
import { motion } from 'framer-motion';
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetByIdCompany, GetComboCompany } from "api/clients/CompanyClient";
import { CodCatalogo, DefaultData } from "components/helpers/Enums";
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
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";

export const CompanyInformation = ({ dataModel }) => {
    const { setValue, formState: { errors } } = useFormContext();

    const [lsCompany, setLsCompany] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsDepartamento, setLsDepartamento] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerCompany = await GetByIdCompany(DefaultData.EmpresaDrummond);
            const lsCompany = [{ value: lsServerCompany.data?.codigo, label: lsServerCompany.data?.descripcionSpa, codigo: lsServerCompany.data?.actividadEconomica }];
            setLsCompany(lsCompany);
            setValue('actividadEconomica', lsServerCompany.data?.actividadEconomica || '');
            setValue('empresa', lsServerCompany.data?.codigo || '');

            const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_SEDE);
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

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <InputSelect
                        disabled
                        name="empresa"
                        label="Empresa"
                        defaultValue={dataModel?.empresa}
                        options={lsCompany}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputText
                        disabled
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
                        defaultValue={dataModel?.sede || ""}
                        options={lsSede}
                        bug={errors.sede}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputSelectAutocomplete
                        defaultValue={dataModel?.departamento}
                        name="departamentoAuto"
                        label="Departamento"
                        options={lsDepartamento}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputSelectAutocomplete
                        defaultValue={dataModel?.area}
                        name="areaAuto"
                        label="Área"
                        options={lsArea}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputSelectAutocomplete
                        defaultValue={dataModel?.cargo}
                        name="cargoAuto"
                        label="Cargo"
                        options={lsCargo}
                    />
                </Grid>
            </Grid>
        </motion.div>
    )
}

export const OrganizationalAspects = ({ dataModel }) => {
    const [lsTurno, setLsTurno] = useState([]);
    const [lsCategoriaCargo, setLsCategoriaCargo] = useState([]);
    const [lsJornadaTrabajo, setLsJornadaTrabajo] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerTurno = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
            setLsTurno(lsServerTurno.data);

            const lsServerCategoriaCargo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_CATEGORIA_CARGO);
            setLsCategoriaCargo(lsServerCategoriaCargo.data);

            const lsServerJornadaTrabajo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_JORNADATRABAJO);
            setLsJornadaTrabajo(lsServerJornadaTrabajo.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="jornadaLaboral"
                    label="Jornada de trabajo"
                    defaultValue={dataModel?.jornadaLaboral || null}
                    options={lsJornadaTrabajo}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputSelect
                    name="turno"
                    label="Turno"
                    defaultValue={dataModel?.turno || null}
                    options={lsTurno}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="rotaciones"
                    label="Rotaciones"
                    defaultValue={dataModel?.rotaciones || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="ritmoTrabajo"
                    label="Ritmo de trabajo"
                    defaultValue={dataModel?.ritmoTrabajo || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="tiempoPausa"
                    label="Tiempos de pausa"
                    defaultValue={dataModel?.tiempoPausa || null}
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
                    defaultValue={dataModel?.categoriaCargo || null}
                    options={lsCategoriaCargo}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h4">Organización del trabajo</Typography>
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="organizacionTrabajoIndividual"
                    label="Individual"
                    defaultValue={dataModel?.organizacionTrabajoIndividual || null}
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    showAI
                    showVoice
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="organizacionTrabajoEquipo"
                    label="Equipo"
                    defaultValue={dataModel?.organizacionTrabajoEquipo || null}
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
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const disenoObjImage = { idAPT, idItemAcordeon: 2, idSegundarioModulo: 1 };
    const mobiliariorObjImage = { idAPT, idItemAcordeon: 2, idSegundarioModulo: 2 };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <InputTextEditor label="Objetivo del cargo" name="objetivoCargo" defaultValue={dataModel?.objetivoCargo || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Características de diseño del puesto de trabajo" name="caracteristicasDisenoPuesto" defaultValue={dataModel?.caracteristicasDisenoPuesto || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Características de diseño del puesto de trabajo" name="caracteristicasDisenoPuesto" defaultValue={dataModel?.caracteristicasDisenoPuesto || null} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Evidencias fotográficas de las características de diseño del puesto de trabajo">
                    <PhotographicEvidence name="fotosCaracteristicasDisenoPuesto" objImage={disenoObjImage} />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Mobiliario" name="mobiliario" defaultValue={dataModel?.mobiliario || null} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Evidencias fotográficas del mobiliario">
                    <PhotographicEvidence name="fotosMobiliario" objImage={mobiliariorObjImage} />
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Herramientas, equipos y materiales" name="herramientasEquipos" defaultValue={dataModel?.herramientasEquipos || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Ayudas mecánicas" name="ayudasMecanicas" defaultValue={dataModel?.ayudasMecanicas || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Elementos de confort" name="elementosConfort" defaultValue={dataModel?.elementosConfort || null} />
            </Grid>
        </Grid>
    )
}

export const EnvironmentalAspects = ({ dataModel }) => {
    const [lsAgenteBiologico, setLsAgenteBiologico] = useState([]);
    const [lsAgenteQuimico, setLsAgenteQuimico] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerAgenteBiologico = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_AGENTE_BIOLOGICO);
            setLsAgenteBiologico(lsServerAgenteBiologico.data);

            const lsServerAgenteQuimico = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_AGENTE_QUIMICO);
            setLsAgenteQuimico(lsServerAgenteQuimico.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputText
                    name="condicionesOrdenAseo"
                    label="Condiciones de orden y aseo"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.condicionesOrdenAseo || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="agentesBiologicos"
                    label="Agentes biológicos"
                    defaultValue={dataModel?.agentesBiologicos || null}
                    options={lsAgenteBiologico}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                    name="agentesQuimicos"
                    label="Agentes químicos"
                    defaultValue={dataModel?.agentesQuimicos || null}
                    options={lsAgenteQuimico}
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="iluminacion"
                    label="Iluminación"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.iluminacion || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="materialParticulado"
                    label="Material particulado"
                    multiline
                    rows={2}
                    defaultValue={dataModel?.materialParticulado || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="ruido"
                    label="Ruido"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.ruido || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="temperatura"
                    label="Temperatura"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.temperatura || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="ventilacion"
                    label="Ventilación"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.ventilacion || null}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <InputText
                    name="vibracion"
                    label="Vibración"
                    multiline
                    rows={3}
                    defaultValue={dataModel?.vibracion || null}
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
                <InputTextEditor label="Descripción general del cargo" name="descripcionGeneralCargo" defaultValue={dataModel?.descripcionGeneralCargo || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Rotaciones establecidas para el cargo" name="rotacionesCargo" defaultValue={dataModel?.rotacionesCargo || null} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Ciclo de trabajo">
                    Pendiente de revisar si existe alguna biblioteca para integrar un paint o algo parecido.
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
                <CategoryTableSegment />
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
                            <InputTextEditor label="Observación de los resultados" name="observacionResultadosValoracion" defaultValue={dataModel?.observacionResultados || null} />
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
    const { watch: watchMain, control } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const vibrationObjImage = { idAPT, idItemAcordeon: 7, idSegundarioModulo: 1 };
    const noiseObjImage = { idAPT, idItemAcordeon: 7, idSegundarioModulo: 2 };
    const particulateObjImage = { idAPT, idItemAcordeon: 7, idSegundarioModulo: 3 };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a vibración">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="vibrationImage" control={control} objImage={vibrationObjImage} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionVibracion" defaultValue={dataModel?.interpretacionVibracion || null} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a ruido">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="noiseImage" control={control} objImage={noiseObjImage} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionRuido" defaultValue={dataModel?.interpretacionRuido || null} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a material particulado">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="particulateImage" control={control} objImage={particulateObjImage} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionMaterialParticulado" defaultValue={dataModel?.interpretacionMaterialParticulado || null} />
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
                <InputTextEditor label="Conclusiones" name="conclusion" defaultValue={dataModel?.conclusion || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Fuentes de información" name="fuenteInformacion" defaultValue={dataModel?.fuenteInformacion || null} />
            </Grid>
        </Grid>
    )
}