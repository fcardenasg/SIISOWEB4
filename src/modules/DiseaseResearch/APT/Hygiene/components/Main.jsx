import ReactDOM from "react-dom";
import { Alert, Divider, Grid, Box, Typography, Paper, Button } from "@mui/material";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animation from 'assets/img/animation.json';
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetByIdCompany, GetComboCompany } from "api/clients/CompanyClient";
import { CodCatalogo, DefaultData } from "components/helpers/Enums";
import InputCheckBox from "components/input/InputCheckBox";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import InputTextEditor from "components/input/InputTextEditor";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import SubCard from "ui-component/cards/SubCard";
import ActivityTable from "./ActivityTable";
import PhotographicEvidence from "./PhotographicEvidence";
import { OWASMethodTables, OrganizationalFactorTable, TableControlMethods, TableReferenceValuesSegment } from "./TableAPT";
import BiomechanicalRiskAssessment from "./BiomechanicalRiskAssessment";
import ImageDropzone from "./ImageDropzone";
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";
import ViewExcalidraw from "./ViewExcalidraw";
import TableValues from "./TableValues";

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
    )
}

export const OrganizationalAspects = ({ dataModel }) => {
    const [lsTurno, setLsTurno] = useState([]);
    const [lsCategoriaCargo, setLsCategoriaCargo] = useState([]);

    useEffect(() => {
        async function getData() {
            const lsServerTurno = await GetByTipoCatalogoCombo(CodCatalogo.Turno);
            setLsTurno(lsServerTurno.data);

            const lsServerCategoriaCargo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_CATEGORIA_CARGO);
            setLsCategoriaCargo(lsServerCategoriaCargo.data);

            const lsServerJornadaTrabajo = await GetByTipoCatalogoCombo(CodCatalogo.APTPH_JORNADATRABAJO);
            setLsCategoriaCargo(lsServerJornadaTrabajo.data);
        }

        getData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <InputText
                    name="jornadaLaboralHoras"
                    label="Jornada de trabajo (horas)"
                    type="number"
                    defaultValue={dataModel?.jornadaLaboralHoras || null}
                    fullWidth
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

            <Grid item xs={12} md={12} lg={12}>
                <InputText
                    name="organizacionTrabajo"
                    label="Organización del trabajo"
                    defaultValue={dataModel?.organizacionTrabajo || null}
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Objetivo del cargo" name="objetivoCargo" defaultValue={dataModel?.objetivoCargo || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Descripción del lugar donde se realiza la labor" name="descripcionLugar" defaultValue={dataModel?.descripcionLugar || null} />
            </Grid>
        </Grid>
    )
}

export const JobDescription = ({ dataModel }) => {
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");

    const disenoObjImage = { idAPT, idItemAcordeon: 3, idSegundarioModulo: 1 };
    const mobiliariorObjImage = { idAPT, idItemAcordeon: 3, idSegundarioModulo: 2 };

    return (
        <Grid container spacing={2}>
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
    const { setValue } = useFormContext();

    const handleOpenPopup = () => {
        const width = window.screen.availWidth;
        const height = window.screen.availHeight;
        const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=0,top=0`);
        if (popupWindow) {
            popupWindow.document.title = "Ciclo de trabajo";
            popupWindow.document.body.innerHTML = '<div id="popup-root"></div>';
            popupWindow.document.body.style.margin = '0';

            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(styleNode => {
                popupWindow.document.head.appendChild(styleNode.cloneNode(true));
            });

            const popupCache = createCache({
                key: 'popup-mui-excalidraw',
                container: popupWindow.document.head,
            });

            ReactDOM.render(
                <CacheProvider value={popupCache}>
                    <ViewExcalidraw />
                </CacheProvider>,
                popupWindow.document.getElementById('popup-root')
            );
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <InputTextEditor label="Descripción general del cargo" name="descripcionGeneralCargo" defaultValue={dataModel?.descripcionGeneralCargo || null} />
            </Grid>

            <Grid item xs={12}>
                <InputTextEditor label="Rotaciones establecidas para el cargo" name="rotacionesCargo" defaultValue={dataModel?.rotacionesCargo || null} />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Ciclo de trabajo">
                    <Paper
                        variant="outlined"
                        onClick={handleOpenPopup}
                        sx={{
                            height: 400,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderStyle: 'dashed',
                            borderWidth: 2,
                            borderColor: '#e0e0e0',
                            backgroundColor: '#fcfcfc',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 4,
                            p: 1.5,
                            transition: 'border-color 0.2s, background-color 0.2s',
                            '&:hover': {
                                borderColor: 'primary.main',
                                backgroundColor: 'rgba(25, 118, 210, 0.02)'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <Box sx={{ width: 220, height: 220 }}>
                                <Lottie
                                    animationData={animation}
                                    loop={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Box>
                            <Typography variant="h5" color="text.primary" sx={{ mt: 2, fontWeight: 600 }}>
                                Aún no se ha creado o cargado un ciclo de trabajo
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Haz clic aquí para abrir el área de trabajo
                            </Typography>
                        </Box>
                    </Paper>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <ActivityTable />
            </Grid>
        </Grid>
    )
}

export const AssessmentPhysicalLoad = ({ dataModel }) => {
    const { watch: watchMain } = useFormContext();
    const idAPT = watchMain("idAPTHigienePlantilla");
    const valoresPopupRef = useRef(null);

    const handleOpenPopup = () => {
        // Si la ventana ya existe y no ha sido cerrada, solo traerla al frente
        if (valoresPopupRef.current && !valoresPopupRef.current.closed) {
            valoresPopupRef.current.focus();
            return;
        }

        const width = window.screen.availWidth;
        const height = window.screen.availHeight;
        const popupWindow = window.open('', '_blank', `width=${width},height=${height},left=0,top=0`);
        if (popupWindow) {
            valoresPopupRef.current = popupWindow;
            popupWindow.document.title = "Valoración";
            popupWindow.document.body.innerHTML = '<div id="popup-root-valores"></div>';
            popupWindow.document.body.style.margin = '0';

            // Copiar los estilos del documento principal a la nueva ventana para los estilos globales base
            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(styleNode => {
                popupWindow.document.head.appendChild(styleNode.cloneNode(true));
            });

            // Crear un caché de Emotion específico para la nueva ventana, para que Material UI inyecte los estilos dinámicos aquí
            const popupCache = createCache({
                key: 'popup-mui',
                container: popupWindow.document.head,
            });

            ReactDOM.render(
                <CacheProvider value={popupCache}>
                    <TableValues idAPT={idAPT} />
                </CacheProvider>,
                popupWindow.document.getElementById('popup-root-valores')
            );
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OWASMethodTables />
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Aplicación de la metodología ANSI">
                    <Grid container spacing={2}>
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
                            <Button
                                variant="outlined"
                                onClick={handleOpenPopup}
                            >
                                Ver tablas de valoración
                            </Button>
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

    const habilitadoVibracion = watchMain("habilitadoVibracion");
    const habilitadoRuido = watchMain("habilitadoRuido");
    const habilitadoMateriaParticulado = watchMain("habilitadoMateriaParticulado");

    const vibrationObjImage = { idAPT, idItemAcordeon: 7, idSegundarioModulo: 1 };
    const noiseObjImage = { idAPT, idItemAcordeon: 7, idSegundarioModulo: 2 };
    const particulateObjImage = { idAPT, idItemAcordeon: 7, idSegundarioModulo: 3 };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a vibración" secondary={<InputCheckBox name="habilitadoVibracion" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoVibracion && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Alert severity="warning">Para registrar la exposición a vibración debe habilitarla dando en el check, de lo contrario se interpretará como no aplica.</Alert>
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="vibrationImage" control={control} objImage={vibrationObjImage} disabled={!habilitadoVibracion} exposureType="vibración" targetInput="interpretacionVibracion" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionVibracion" defaultValue={dataModel?.interpretacionVibracion || null} disabled={!habilitadoVibracion} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a ruido" secondary={<InputCheckBox name="habilitadoRuido" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoRuido && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Alert severity="warning">Para registrar la exposición a ruido debe habilitarla dando en el check, de lo contrario se interpretará como no aplica.</Alert>
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="ruidoImage" control={control} objImage={noiseObjImage} disabled={!habilitadoRuido} exposureType="ruido" targetInput="interpretacionRuido" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionRuido" defaultValue={dataModel?.interpretacionRuido || null} disabled={!habilitadoRuido} />
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a material particulado" secondary={<InputCheckBox name="habilitadoMateriaParticulado" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoMateriaParticulado && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Alert severity="warning">Para registrar la exposición a material particulado debe habilitarla dando en el check, de lo contrario se interpretará como no aplica.</Alert>
                        </Grid>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ImageDropzone name="particulateImage" control={control} objImage={particulateObjImage} disabled={!habilitadoMateriaParticulado} exposureType="material particulado" targetInput="interpretacionMaterialParticulado" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InputTextEditor label="Interpretación" name="interpretacionMaterialParticulado" defaultValue={dataModel?.interpretacionMaterialParticulado || null} disabled={!habilitadoMateriaParticulado} />
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