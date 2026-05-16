import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Button, Divider, Grid } from "@mui/material";
import { ActivityRecordsExist, ValorRefeSegmentoRecordsExist } from "api/clients/APTHigienePlantillaClient";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetByIdCompany } from "api/clients/CompanyClient";
import { CodCatalogo, DefaultData } from "components/helpers/Enums";
import InputCheckBox from "components/input/InputCheckBox";
import InputSelect from "components/input/InputSelect";
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";
import InputText from "components/input/InputText";
import InputTextEditor from "components/input/InputTextEditor";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import SubCard from "ui-component/cards/SubCard";
import ActivityTable from "./ActivityTable";
import BiomechanicalRiskAssessment from "./BiomechanicalRiskAssessment";
import CustomAlert from "./CustomAlert";
import ImageDropzone from "./ImageDropzone";
import PhotographicEvidence from "./PhotographicEvidence";
import { OWASMethodTables, OrganizationalFactorTable, TableControlMethods, TableReferenceValuesSegment } from "./TableAPT";
import TableValues from "./TableValues";
import WorkCycleDropzone from "./WorkCycleDropzone";

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

            const lsServerCargo = await GetByTipoCatalogoCombo(CodCatalogo.DescripcionRosterPosition);
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
                    name="jornadaLaboralHoras"
                    label="Jornada de trabajo"
                    defaultValue={dataModel?.jornadaLaboralHoras || null}
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
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const disenoObjImage = { idAPT, idItemAcordeon: 3, idSegundarioModulo: 1, tipoLogica };
    const mobiliariorObjImage = { idAPT, idItemAcordeon: 3, idSegundarioModulo: 2, tipoLogica };

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
    const { watch: watchMain, control } = useFormContext();
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <WorkCycleDropzone name="fotoCicloTrabajo" control={control} idAPT={idAPT} tipoLogica={tipoLogica} />
                        </Grid>

                        <Grid item xs={12}>
                            <InputTextEditor
                                label="Interpretación del ciclo de trabajo"
                                name="interpretacionCicloTrabajo"
                                defaultValue={dataModel?.interpretacionCicloTrabajo || null}
                            />
                        </Grid>
                    </Grid>
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
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const valoresPopupRef = useRef(null);

    const [hasActivities, setHasActivities] = useState(false);
    const [hasReferenceValues, setHasReferenceValues] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    const checkValidations = useCallback(async () => {
        if (!idAPT) return;

        try {
            // Verificar actividades
            const resActivities = await ActivityRecordsExist(idAPT, tipoLogica);
            const existsActivities = resActivities.data.datos || false;
            setHasActivities(existsActivities);

            // Verificar valores de referencia
            const resRefValues = await ValorRefeSegmentoRecordsExist(idAPT, tipoLogica);
            const existsRefValues = resRefValues.data.datos || false;
            setHasReferenceValues(existsRefValues);

            // Determinar alerta
            if (!existsActivities) {
                setAlert({
                    open: true,
                    message: "No se han registrado actividades aún, por favor complete ese paso primero para habilitar la valoración.",
                    severity: "warning"
                });
            } else if (!existsRefValues) {
                setAlert({
                    open: true,
                    message: "Debe guardar los 'Valores de referencia por segmento' para habilitar las tablas de valoración.",
                    severity: "warning"
                });
            } else {
                setAlert({ open: false, message: '', severity: 'info' });
            }
        } catch (error) {
            console.error("Error en validaciones de valoración:", error);
        }
    }, [idAPT]);

    useEffect(() => {
        checkValidations();
    }, [checkValidations]);

    // Escuchar eventos de actualización (por ejemplo, cuando se guarda una actividad o valor de referencia)
    useEffect(() => {
        const handleRefresh = () => checkValidations();
        window.addEventListener('refresh-assessment-validations', handleRefresh);
        window.addEventListener('refresh-owas-table', handleRefresh); // Reutilizar este evento si aplica
        return () => {
            window.removeEventListener('refresh-assessment-validations', handleRefresh);
            window.removeEventListener('refresh-owas-table', handleRefresh);
        };
    }, [checkValidations]);

    const closePopup = useCallback(() => {
        if (valoresPopupRef.current && !valoresPopupRef.current.closed) {
            valoresPopupRef.current.close();
            valoresPopupRef.current = null;
        }
    }, []);

    // Cerrar popup al navegar fuera o desmontar
    useEffect(() => {
        return () => closePopup();
    }, [location.pathname, closePopup]);

    // Escuchar expiración de JWT o cierre de sesión
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'serviceToken' && !e.newValue) {
                closePopup();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [closePopup]);

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
                    <TableValues idAPT={idAPT} tipoLogica={tipoLogica} />
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
                        {alert.open && (
                            <Grid item xs={12}>
                                <CustomAlert
                                    message={alert.message}
                                    severity={alert.severity}
                                    open={alert.open}
                                    onClose={() => setAlert({ ...alert, open: false })}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                onClick={handleOpenPopup}
                                disabled={!hasActivities || !hasReferenceValues}
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
    const location = useLocation();

    const idAPT = watchMain("idAPTHigienePlantilla") || watchMain("idAPTHigiene");
    const tipoLogica = location.pathname.toLowerCase().includes('template') ? 1 : 2;

    const habilitadoVibracion = watchMain("habilitadoVibracion");
    const habilitadoRuido = watchMain("habilitadoRuido");
    const habilitadoMateriaParticulado = watchMain("habilitadoMateriaParticulado");

    const vibrationObjImage = { idAPT, idItemAcordeon: 6, idSegundarioModulo: 1, tipoLogica };
    const noiseObjImage = { idAPT, idItemAcordeon: 6, idSegundarioModulo: 2, tipoLogica };
    const particulateObjImage = { idAPT, idItemAcordeon: 6, idSegundarioModulo: 3, tipoLogica };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SubCard darkTitle title="Exposición a vibración" secondary={<InputCheckBox name="habilitadoVibracion" label="Habilitar exposición" defaultValue={false} />}>
                    {!habilitadoVibracion && (
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <CustomAlert severity="warning" message="Para registrar la exposición a vibración debe habilitarla dando en el check, de lo contrario se interpretará como no aplica." />
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
                            <CustomAlert severity="warning" message="Para registrar la exposición a ruido debe habilitarla dando en el check, de lo contrario se interpretará como no aplica." />
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
                            <CustomAlert severity="warning" message="Para registrar la exposición a material particulado debe habilitarla dando en el check, de lo contrario se interpretará como no aplica." />
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